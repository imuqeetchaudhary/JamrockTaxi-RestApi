const mongoose = require("mongoose")
const schema = mongoose.Schema

const vehicleSchema = new schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    passengerCapacity: {
        type: Number,
        require: true
    },
    luggageCapacity: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

exports.Vehicle = mongoose.model("Vehicle", vehicleSchema)