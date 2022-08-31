const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connect = require("./config/database/connection");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const IN_DEVELOPMENT = true;
const DEV_PATH = path.join(__dirname, "config/environment/dev.env");
const PROD_PATH = path.join(__dirname, "/config/environment/prod.env");
if (IN_DEVELOPMENT) {
  dotenv.config({ path: DEV_PATH });
} else {
  dotenv.config({ path: PROD_PATH });
}
app.use(express.static('upload'));
const userRoutes = express.Router();
app.use("/api", userRoutes);
require("./routes/userRoutes")(userRoutes);
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`PORT listening on: ${PORT}`);
});
