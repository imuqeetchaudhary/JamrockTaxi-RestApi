const mongoose = require("mongoose")
const schema = mongoose.Schema

const extrasSchema = new schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

exports.Extras = mongoose.model("Extras", extrasSchema)