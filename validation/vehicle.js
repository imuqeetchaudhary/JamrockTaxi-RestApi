const yup = require("yup")

exports.addVehicleSchema = yup.object({
    name: yup.string(),
    image: yup.string(),
    passengerCapacity: yup.number(),
    luggageCapacity: yup.number(),
    type: yup.string(),
    isAvailable: yup.boolean()
})

exports.getVehicleSchema = yup.object({
    vehicleId: yup.string().required()
})

exports.updateVehicleSchema = yup.object({
    vehicleId: yup.string().required(),
    name: yup.string(),
    image: yup.string(),
    passengerCapacity: yup.number(),
    luggageCapacity: yup.number(),
    pricePerKM: yup.number(),
    isAvailable: yup.boolean()
})