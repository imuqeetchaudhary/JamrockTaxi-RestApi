const { Extras } = require("../db/models/extras");
const Exceptions = require("../utils/custom-exceptions");
const { promise } = require("../middlewares/promises");
const mongoSerializer = require("../utils/mongo-serializer");

exports.addExtras = promise(async (req, res) => {
  const body = req.body;

  const newExtras = new Extras({
    ...body,
  });
  await newExtras.save();
  res.status(200).json({ message: "Successfully added new extras" });
});

exports.getAllExtras = promise(async (req, res) => {
  const extras = await Extras.find();
  if (!extras) throw new Exceptions.NotFound("No extras found");

  const _extras = extras.map((extra) => mongoSerializer(extra._doc));
  res.status(200).json({ extras: _extras });
});

exports.getAllExtrasByArray = promise(async (req, res) => {
  const body = req.body;

  const extras = await Extras.find({ _id: { $in: body.extrasId } });
  if (!extras) throw new Exceptions.NotFound("No extras found");

  // console.log(extras[0].price);
  // console.log(extras[1].price);
  // console.log(extras[2].price);
  // console.log(extras[3].price);

  // let price = 0
  // extras.forEach((extra) => {
  //     price = price + extra.price
  // })
  // console.log("Total Extras Price", price);

  res.status(200).json({ extras });
});

exports.getSingleExtras = promise(async (req, res) => {
  const body = req.body;

  const extras = await Extras.findOne({ _id: body.extrasId });
  if (!extras) throw new Exceptions.NotFound("No extras found");

  res.status(200).json({ extras });
});

exports.updateExtras = promise(async (req, res) => {
  const body = req.body;

  const extras = await Extras.updateOne(
    {
      _id: body.extrasId,
    },
    {
      $set: {
        ...req.body,
      },
    }
  );

  res.status(200).json({ message: "Successfully updated extras" });
});
