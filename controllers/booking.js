const { Booking } = require("../db/models/booking")
const { User } = require("../db/models/user")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")

exports.addBooking = promise(async (req, res) => {
    const body = req.body

    const admin = await User.findOne({ _id: "60f12b73de4ad9284ca58890" })
    if (!admin) throw new Exceptions.NotFound("Admin not found")

    const newBooking = new Booking({
        ...body,
        userId: req.user._id,
        totalPrice: (body.distance * body.vehiclePrice * body.extrasPrice)
    })
    await newBooking.save()

    const userBookingSlip = `Dear user ${req.user.name}, You have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`
    const adminBookingSlip = `Dear admin ${admin.name}, The user ${req.user.name} have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`

    await sendMail(req.user.email, userBookingSlip)
    await sendMail(admin.email, adminBookingSlip)

    res.status(200).json({ message: "Successfully added a new booking", newBooking })
})

exports.getAllBookingsOfSingleUser = promise(async (req, res) => {
    const body = req.body

    const bookings = await Booking.find({ userId: req.user._id })
    if (!bookings) throw new Exceptions.NotFound("No bookings found")

    res.status(200).json({ bookings })
})

exports.getSingleBookingOfSingleUser = promise(async (req, res) => {
    const body = req.body

    const booking = await Booking.findOne({ _id: body.bookingId, userId: req.user._id })
    if (!booking) throw new Exceptions.NotFound("No booking found")

    res.status(200).json({ booking })
})

exports.getAllBookingsOfAllUsers = promise(async (req, res) => {
    const body = req.body

    const bookings = await Booking.find()
    if (!bookings) throw new Exceptions.NotFound("No bookings found")

    res.status(200).json({ bookings })
})

exports.updateBooking = promise(async (req, res) => {
    const body = req.body

    const updateBooking = await Booking.updateOne(
        { _id: body.bookingId },
        {
            $set: {
                ...body,
                totalPrice: (body.distance * body.vehiclePrice)
            }
        })

    const booking = await Booking.findOne({ _id: body.bookingId, userId: req.user._id })
    if (!booking) throw new Exceptions.NotFound("No booking found")

    const admin = await User.findOne({ _id: "60f12b73de4ad9284ca58890" })
    if (!admin) throw new Exceptions.NotFound("Admin not found")

    const userBookingSlip = `Dear user ${req.user.name}, You have updated a booking ride from ${booking.pickupLocation} to ${booking.dropoffLocation}. The total payable amount is $${booking.totalPrice}`
    const adminBookingSlip = `Dear admin ${admin.name}, The user ${req.user.name} have updated a booking ride from ${booking.pickupLocation} to ${booking.dropoffLocation}. The total payable amount is $${booking.totalPrice}`

    await sendMail(req.user.email, userBookingSlip)
    await sendMail(admin.email, adminBookingSlip)

    res.status(200).json({ message: "Successfully updated Booking", booking })
})

exports.deleteBooking = promise(async (req, res) => {
    const body = req.body

    const deleteBooking = await Booking.deleteOne({ _id: body.bookingId })
    res.status(200).json({ message: "Successfully deleted booking" })
})