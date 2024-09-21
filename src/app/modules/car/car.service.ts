import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import mongoose from "mongoose";
import { Booking } from "../booking/booking.model";
import { calculationTotalDurationTime } from "../booking/booking.utils";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const deleteCarFromDB = async (id: string) => {
  const car = await Car.findById(id);
  if (!car || car?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const returnCarFromDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { bookingId } = payload;
    const findBook = await Booking.findById({ _id: bookingId });
    if (!findBook) {
      throw new AppError(httpStatus.NOT_FOUND, "Bookings is not Found");
    }
    const { carId } = findBook;

    const findCar = await Car.findOneAndUpdate(
      { _id: carId },
      { status: "available" },
      { new: true, runValidators: true },
    );
    if (!findCar) {
      throw new AppError(httpStatus.NOT_FOUND, "Car is not found");
    }
    const { pricePerHour } = findCar;

    const FilterBooked = await Booking.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!FilterBooked) {
      throw new AppError(httpStatus.NOT_FOUND, "booked not found");
    }
    const { startTime, endTime } = FilterBooked;

    const filterTotalCost = calculationTotalDurationTime(
      startTime,
      endTime as string,
      pricePerHour,
    );
    payload.totalCost = filterTotalCost;
    const result = await Booking.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
      .populate("user")
      .populate("carId");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarFromDB,
};
