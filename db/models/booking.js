const mongoose = require("mongoose")
const schema = mongoose.Schema

const bookingSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pickupLocation: {
        type: String,
        require: true
    },
    dropoffLocation: {
        type: String,
        require: true
    },
    startDateTime: {
        type: Date,
        require: true
    },
    returnDateTime: {
        type: Date,
        require: true
    },
    distance: {
        type: Number,
        require: true
    },
    transferType: {
        type: String,
        require: true
    },
    vehicleId: {
        type: schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    extrasId: {
        type: schema.Types.ObjectId,
        ref: "Extras"
    },
    passengerName: {
        type: String,
        require: true
    },
    passengerEmail: {
        type: String,
        require: true
    },
    passengerNumber: {
        type: Number,
        require: true
    },
    totalPassengers: {
        type: Number,
        require: true
    },
    totalBags: {
        type: Number,
        require: true
    },
    pickupFlightNumber: {
        type: Number
    },
    returnFlightNumber: {
        type: Number
    },
    totalPrice: {
        type: Number,
        require: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

exports.Booking = mongoose.model("Booking", bookingSchema)