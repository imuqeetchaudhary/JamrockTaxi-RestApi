const yup = require("yup")

exports.addBookingSchema = yup.object({
    pickupLocation: yup.string().required(),
    dropoffLocation: yup.string().required(),
    startDateTime: yup.date().required(),
    returnDateTime: yup.date(),
    distance: yup.number().required(),
    transferType: yup.string().required(),
    vehicleId: yup.string().required(),
    vehiclePrice: yup.string().required(),
    extrasId: yup.string(),
    extrasPrice: yup.string(),
    passengerName: yup.string().required(),
    passengerEmail: yup.string().required(),
    passengerNumber: yup.number().required(),
    totalPassengers: yup.number().required(),
    totalBags: yup.number().required(),
    pickupFlightNumber: yup.string(),
    returnFlightNumber: yup.string(),
})