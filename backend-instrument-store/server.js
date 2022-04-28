const cors = require("cors");
const YAML = require("yamljs");
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();

let app = express();

const URL = process.env.DATABASE_URL;
mongoose.connect(URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("MongoDB Database connection established");
});

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/userRoutes");
const drumRouter = require("./routes/drumRoutes");
const guitarRouter = require("./routes/guitarRoutes");
const harmoniumRouter = require("./routes/harmoniumRoutes");
const keyboardRouter = require("./routes/keyboardRoutes");
const musicbooksRouter = require("./routes/musicbooksRoutes");


app.use("/users", userRouter);
app.use("/drum", drumRouter);
app.use("/guitar", guitarRouter);
app.use("/harmonium", harmoniumRouter);
app.use("/keyboard", keyboardRouter);
app.use("/musicbook", musicbooksRouter);

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const search = require("./routes/searchRoutes");
app.use("/search", search);

const loginRouter = require("./routes/loginRoutes");
app.use("/login", loginRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app