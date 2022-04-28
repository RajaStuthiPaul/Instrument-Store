const { Router } = require("express");

const User = require("../models/user");
const auth = require("../middlewares/auth");

const redisClient = require('./../config');

const router = Router();

router.get("/users", async (req, res) => {
  try {
    if (req.query.username !== undefined) {
      const user = await User.find({ username: req.query.username });
      res.json(user);
    } else {
      res.status(400).json({ message: "no parameters found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:item", async (req, res) => {
  const item = req.params.item;
  const results = await redisClient.get(item);
  if(results != null){
    res.json(JSON.parse(results));
  }
  else{
    let filter = {};
    const model = require(`../models/${req.params['item']}`)
    for (let key in req.query) {
      filter[key] = { $regex: req.query[key], $options: "i" };
    }
    try {
      const items = await model.find(filter);
      await redisClient.set(item, JSON.stringify(items));
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;


