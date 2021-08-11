const { Vehicle } = require("../db/models/vehicle");
const Exceptions = require("../utils/custom-exceptions");
const { promise } = require("../middlewares/promises");
const mongoSerializer = require("../utils/mongo-serializer");

exports.addVehicle = promise(async (req, res) => {
  const body = req.body;

  const newVehicle = new Vehicle({
    ...req.body,
    image: req.file.filename,
  });

  await newVehicle.save();
  res.status(200).json({ message: "Successfully added a new product" });
});

exports.getAllVehicles = promise(async (req, res) => {
  const vehicles = await Vehicle.find();
  if (!vehicles) throw new Exceptions.NotFound("No vehicle found");

  const _vehicles = vehicles.map((vehicle) => mongoSerializer(vehicle._doc));
  res.status(200).json({ vehicles: _vehicles });
});

exports.getSingleVehicle = promise(async (req, res) => {
  const body = req.body;

  const vehicle = await Vehicle.findOne({ _id: body.vehicleId });
  if (!vehicle) throw new Exceptions.NotFound("No vehicle found");

  const _vehicle = mongoSerializer(vehicle._doc);
  res.status(200).json({ vehicle: _vehicle });
});

exports.updateVehicle = promise(async (req, res) => {
  console.log("vehicle id: ", req.body);
  let vehicleFields;
  let body = req.body;

  if (req.file) {
    console.log("inside req.file condition: ", req.file);
    vehicleFields = { ...body, image: req.file.filename };
  } else {
    const { image, ..._vehicleFields } = req.body;
    vehicleFields = _vehicleFields;
  }

  const vehicle = await Vehicle.updateOne(
    {
      _id: body.vehicleId,
    },
    {
      $set: {
        ...vehicleFields,
      },
    }
  );

  res.status(200).json({ message: "Successfully updated vehicle" });
});
