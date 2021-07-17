const { Booking } = require("../db/models/booking")
const { User } = require("../db/models/user")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")

exports.addBooking = promise(async (req, res) => {
    const body = req.body

    const user = await User.findOne({_id: req.user._id})
    if(!user) throw new Exceptions.NotFound("User not found")

    const admin = await User.findOne({ _id: "60f12b73de4ad9284ca58890" })
    if (!admin) throw new Exceptions.NotFound("Admin not found")

    const newBooking = new Booking({
        ...body,
        userId: req.user._id,
        totalPrice: (body.distance * body.vehiclePrice * body.extrasPrice)
    })
    await newBooking.save()

    const userBookingSlip = `Dear user ${user.name}, You have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`
    const adminBookingSlip = `Dear admin ${admin.name}, The user ${user.name} have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`

    await sendMail(user.email, userBookingSlip)
    await sendMail(admin.email, adminBookingSlip)

    res.status(200).json({ message: "Successfully added a new booking", newBooking })
})