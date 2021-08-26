const { Booking } = require("../db/models/booking");
const { Vehicle } = require("../db/models/vehicle");
const { Extras } = require("../db/models/extras");
const { User } = require("../db/models/user");
const Exceptions = require("../utils/custom-exceptions");
const { promise } = require("../middlewares/promises");
const { sendMail } = require("../middlewares/sendMail");
const stripe = require("stripe")(
  "sk_test_51J1POvClkiKKoyU1EwrqRkPchsMA2eXdwSeI7VCQiqCOzOVwqOWoWGS8qCEj1fVQA7WCx1nnoeJD3KfPJHEE0XOG00uMs4G6yS"
);

exports.addBooking = promise(async (req, res) => {
  const body = req.body;

  // const vehicle = await Vehicle.findById(body.vehicleId);
  // if (!vehicle) throw new Exceptions.NotFound("No vehicle found");

  // const vehicleType = vehicle.type
  // console.log(vehicleType)

  const totalPrice = (body.vehiclePrice + body.extrasPrice)

  const adminId = "60f12b73de4ad9284ca58890"
  const admin = await findUserById(adminId);
  if (!admin) throw new Exceptions.NotFound("Admin not found");

  const newBooking = new Booking({
    ...body,
    userId: req.user._id,
    totalPrice: totalPrice,
  });
  await newBooking.save();

  const userBookingSlip = `Dear user ${req.user.name}, You have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`;
  const adminBookingSlip = `Dear admin ${admin.name}, The user ${req.user.name} have booked a ride from ${newBooking.pickupLocation} to ${newBooking.dropoffLocation}. The total payable amount is $${newBooking.totalPrice}`;

  await sendMail(req.user.email, userBookingSlip);
  await sendMail(admin.email, adminBookingSlip);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "usd",
    metadata: {
      integration_check: "accept_a_payment_for_jamrock_taxi_booking",
    },
    receipt_email: req.user.email,
    payment_method_types: ["card"],
  });

  res.status(200).json({
    message: "Successfully added a new booking",
    client_secret: paymentIntent["client_secret"],
    newBooking,
  });
});

exports.getAllBookingsOfSingleUser = promise(async (req, res) => {
  const body = req.body;

  const bookings = await Booking.find({ userId: req.user._id });
  if (!bookings) throw new Exceptions.NotFound("No bookings found");

  res.status(200).json({ bookings });
});

exports.getSingleBookingOfSingleUser = promise(async (req, res) => {
  const body = req.body;

  const booking = await Booking.findOne({
    _id: body.bookingId,
    // userId: req.user._id,
  });
  if (!booking) throw new Exceptions.NotFound("No booking found");

  res.status(200).json({ booking });
});

exports.getAllBookingsOfAllUsers = promise(async (req, res) => {
  const body = req.body;

  const bookings = await Booking.find();
  if (!bookings) throw new Exceptions.NotFound("No bookings found");

  res.status(200).json({ bookings });
});

exports.updateBooking = promise(async (req, res) => {
  const body = req.body;

  const updateBooking = await Booking.updateOne(
    { _id: body.bookingId },
    {
      $set: {
        ...body,
        totalPrice: body.distance * body.vehiclePrice,
      },
    }
  );

  const booking = await Booking.findOne({
    _id: body.bookingId,
    userId: req.user._id,
  });
  if (!booking) throw new Exceptions.NotFound("No booking found");

  const admin = await findUserById(req.user._id);
  if (!admin) throw new Exceptions.NotFound("Admin not found");

  const userBookingSlip = `Dear user ${req.user.name}, You have updated a booking ride from ${booking.pickupLocation} to ${booking.dropoffLocation}. The total payable amount is $${booking.totalPrice}`;
  const adminBookingSlip = `Dear admin ${admin.name}, The user ${req.user.name} have updated a booking ride from ${booking.pickupLocation} to ${booking.dropoffLocation}. The total payable amount is $${booking.totalPrice}`;

  await sendMail(req.user.email, userBookingSlip);
  await sendMail(admin.email, adminBookingSlip);

  res.status(200).json({ message: "Successfully updated Booking", booking });
});

exports.deleteBooking = promise(async (req, res) => {
  const body = req.body;

  const deleteBooking = await Booking.deleteOne({ _id: body.bookingId });
  res.status(200).json({ message: "Successfully deleted booking" });
});

exports.confirmPayment = promise(async (req, res) => {
  const body = req.body;

  const updateBooking = await Booking.updateOne(
    { _id: body.bookingId },
    {
      $set: {
        isPaid: true,
      },
    }
  );

  const booking = await Booking.findById(body.bookingId);
  if (!booking) throw new Exceptions.NotFound("No booking found");

  res.json({ message: "Successfully updated booking", booking });
});

async function findUserById(id) {
  return User.findOne({ _id: id });
}
