import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.createBookingIntoDB(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  // console.log("test", req.user);
  const { carId, date } = req.query;
  const result = await BookingServices.getAllBookingFromDB(
    carId as string,
    date as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const getMyAllBookings = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.getMYAllBookingFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

const returnBookings = catchAsync(async (req, res) => {
  const { bookingId: id } = req.body;
  const result = await BookingServices.returnBookingsFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyAllBookings,
  returnBookings,
};
