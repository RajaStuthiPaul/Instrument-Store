const { Router } = require("express");
const Drum = require("../models/drum");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const drums = await Drum.find();
    res.json(drums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const drum = new Drum({
    name: req.body.name,
    price: req.body.price,
    link: req.body.link,
  });
  try {
    const newDrum = await drum.save();
    res.status(201).json(newDrum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getDrumById, (req, res) => {
  res.status(200).json(res.drum);
});

// update individual
router.patch("/:id", getDrumById, async (req, res) => {
  if (req.body.name != null) {
    res.drum.name = req.body.name;
  }
  if (req.body.price != null) {
    res.drum.price = req.body.price;
  }
  if (req.body.link != null) {
    res.drum.link = req.body.link;
  }
  try {
    const updatedDrum = await res.drum.save();
    res.status(200).json(updatedDrum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getDrumById, async (req, res) => {
  try {
    await res.drum.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getDrumById(req, res, nxt) {
  let drum;
  try {
    drum = await Drum.findById(req.params.id);
    if (drum == null) {
      return res.status(400).json({ message: "drum does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.drum = drum;
  nxt();
}

module.exports = router;
