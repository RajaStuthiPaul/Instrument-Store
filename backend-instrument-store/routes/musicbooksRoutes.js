const { Router } = require("express");
const Musicbook = require("../models/musicbooks");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const musicbooks = await Musicbook.find();
    res.json(musicbooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const musicbook = new Musicbook({
    name: req.body.name,
    price: req.body.price,
    link: req.body.link,
  });
  try {
    const newMusicbook = await musicbook.save();
    res.status(201).json(newMusicbook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getMusicBookById, (req, res) => {
  res.status(200).json(res.musicbook);
});

// update individual
router.patch("/:id", getMusicBookById, async (req, res) => {
  if (req.body.name != null) {
    res.musicbook.name = req.body.name;
  }
  if (req.body.price != null) {
    res.musicbook.price = req.body.price;
  }
  if (req.body.link != null) {
    res.musicbook.link = req.body.link;
  }
  try {
    const updatedMusicbook = await res.musicbook.save();
    res.status(200).json(updatedMusicbook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getMusicBookById, async (req, res) => {
  try {
    await res.musicbook.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getMusicBookById(req, res, nxt) {
  let musicbook;
  try {
    musicbook = await Musicbook.findById(req.params.id);
    if (user == null) {
      return res.status(400).json({ message: "user does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.musicbook = musicbook;
  nxt();
}

module.exports = router;
