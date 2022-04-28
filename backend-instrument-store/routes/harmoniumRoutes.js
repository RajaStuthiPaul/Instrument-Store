const { Router } = require("express");
const Harmonium = require("../models/harmonium");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const harmoniums = await Harmonium.find();
    res.json(harmoniums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const harmonium = new Harmonium({
    name: req.body.name,
    price: req.body.price,
    link: req.body.link,
  });
  try {
    const newHarmonium = await harmonium.save();
    res.status(201).json(newHarmonium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getHarmoniumById, (req, res) => {
  res.status(200).json(res.harmonium);
});

// update individual
router.patch("/:id", getHarmoniumById, async (req, res) => {
  if (req.body.name != null) {
    res.harmonium.name = req.body.name;
  }
  if (req.body.price != null) {
    res.harmonium.price = req.body.price;
  }
  if (req.body.link != null) {
    res.harmonium.link = req.body.link;
  }
  try {
    const updatedHarmonium = await res.harmonium.save();
    res.status(200).json(updatedHarmonium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getHarmoniumById, async (req, res) => {
  try {
    await res.harmonium.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getHarmoniumById(req, res, nxt) {
  let harmonium;
  try {
    harmonium = await Harmonium.findById(req.params.id);
    if (harmonium == null) {
      return res.status(400).json({ message: "harmonium does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.harmonium = harmonium;
  nxt();
}

module.exports = router;
