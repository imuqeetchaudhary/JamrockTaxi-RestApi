const express = require("express")
const router = express.Router()
const booking = require("../controllers/booking")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addBookingSchema } = require("../validation/booking")

router
    .post("/add", validation(addBookingSchema), authentication, booking.addBooking)

module.exports = router