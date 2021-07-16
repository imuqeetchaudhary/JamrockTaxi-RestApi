const { Vehicle } = require("../db/models/vehicle")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addVehicle = promise(async (req, res) => {
    const body = req.body

    const newVehicle = new Vehicle({
        ...req.body,
        image: req.file.filename
    })

    await newVehicle.save()
    res.status(200).json({ message: "Successfully added a new product" })
})

exports.getAllVehicles = promise(async (req, res) => {
    const vehicles = await Vehicle.find()
    if (!vehicles) throw new Exceptions.NotFound("No vehicle found")

    res.status(200).json({ vehicles })
})

exports.getSingleVehicle = promise(async (req, res) => {
    const body = req.body

    const vehicle = await Vehicle.findOne({ _id: body.vehicleId })
    if (!vehicle) throw new Exceptions.NotFound("No vehicle found")

    res.status(200).json({ vehicle })
})

exports.updateVehicle = promise(async (req, res) => {
    const body = req.body

    const vehicle = await Vehicle.updateOne(
        { 
            _id: body.vehicleId
        },
        {
            $set: {
                ...req.body
            }
        })

    res.status(200).json({ message: "Successfully updated vehicle" })
})