const { Router } = require("express");
const Keyboard = require("../models/keyboard");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const keyboards = await Keyboard.find();
    res.json(keyboards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const keyboard = new Keyboard({
    name: req.body.name,
    price: req.body.price,
    link: req.body.link,
  });
  try {
    const newKeyboard = await keyboard.save();
    res.status(201).json(newKeyboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getKeyboardById, (req, res) => {
  res.status(200).json(res.keyboard);
});

// update individual
router.patch("/:id", getKeyboardById, async (req, res) => {
  if (req.body.name != null) {
    res.keyboard.name = req.body.name;
  }
  if (req.body.price != null) {
    res.keyboard.price = req.body.price;
  }
  if (req.body.link != null) {
    res.keyboard.link = req.body.link;
  }
  try {
    const updatedKeyboard = await res.keyboard.save();
    res.status(200).json(updatedKeyboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getKeyboardById, async (req, res) => {
  try {
    await res.keyboard.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getKeyboardById(req, res, nxt) {
  let keyboard;
  try {
    keyboard = await Keyboard.findById(req.params.id);
    if (keyboard == null) {
      return res.status(400).json({ message: "Keyboard does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.keyboard = keyboard;
  nxt();
  0;
}

module.exports = router;
