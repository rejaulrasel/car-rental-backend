import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import { bookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(bookingValidations.newBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.getMyAllOrders,
);

router.put(
  "/return",
  auth(USER_ROLE.admin),
  validateRequest(bookingValidations.updateBookingValidationSchema),
  BookingControllers.returnBookings,
);
export const BookingRoutes = router;
