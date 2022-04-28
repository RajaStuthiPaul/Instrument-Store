const { Router } = require("express");
const Guitar = require("../models/guitar");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const guitars = await Guitar.find();
    res.json(guitars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const guitar = new Guitar({
    name: req.body.name,
    price: req.body.price,
    link: req.body.link,
  });
  try {
    const newGuitar = await guitar.save();
    res.status(201).json(newGuitar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getGuitarById, (req, res) => {
  res.status(200).json(res.guitar);
});

// update individual
router.patch("/:id", getGuitarById, async (req, res) => {
    if (req.body.name != null) {
        res.guitar.name = req.body.name;
    }
    if (req.body.price != null) {
        res.guitar.price = req.body.price;
    }
    if (req.body.link != null) {
        res.guitar.link = req.body.link;
    }
  try {
    const updatedGuitar = await res.guitar.save();
    res.status(200).json(updatedGuitar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getGuitarById, async (req, res) => {
  try {
    await res.guitar.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getGuitarById(req, res, nxt) {
  let guitar;
  try {
    guitar = await Guitar.findById(req.params.id);
    if (guitar == null) {
      return res.status(400).json({ message: "guitar does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.guitar = guitar;
  nxt();
}

module.exports = router;
