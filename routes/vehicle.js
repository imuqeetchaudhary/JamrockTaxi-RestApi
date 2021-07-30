const express = require("express");
const router = express.Router();
const vehicle = require("../controllers/vehicle");
const { authentication } = require("../middlewares/isAuth");
const { validation } = require("../middlewares/validation");
const {
  addVehicleSchema,
  getVehicleSchema,
  updateVehicleSchema,
} = require("../validation/vehicle");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: (req, file, fileName) => {
    return fileName(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

router
  .post(
    "/add",
    validation(addVehicleSchema),
    authentication,
    upload.single("image"),
    vehicle.addVehicle
  )
  .get("/all", authentication, vehicle.getAllVehicles)
  .post(
    "/single",
    validation(getVehicleSchema),
    authentication,
    vehicle.getSingleVehicle
  )
  .patch(
    "/update",
    validation(updateVehicleSchema),
    authentication,
    vehicle.updateVehicle
  );
module.exports = router;
