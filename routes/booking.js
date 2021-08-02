const express = require("express")
const router = express.Router()
const booking = require("../controllers/booking")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const {
    addBookingSchema,
    updateBookingSchema,
    getBookingSchema
} = require("../validation/booking")

router
    .post("/add", validation(addBookingSchema), authentication, booking.addBooking)
    .get("/all-bookings-of-single-user", authentication, booking.getAllBookingsOfSingleUser)
    .post("/single-booking-of-single-user", validation(getBookingSchema), authentication, booking.getSingleBookingOfSingleUser)
    .get("/all-bookings-of-all-users", authentication, booking.getAllBookingsOfAllUsers)
    .patch("/update", validation(updateBookingSchema), authentication, booking.updateBooking)
    .delete("/delete", validation(getBookingSchema), authentication, booking.deleteBooking)
    .patch("/confirm-payment", validation(getBookingSchema), authentication, booking.confirmPayment)

module.exports = router