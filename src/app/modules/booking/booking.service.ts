import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { calculationTotalDurationTime } from "./booking.utils";
import isValidDate from "../../middlewares/checkValidDate";

interface TBookeded extends Document {
    carId: mongoose.Types.ObjectId;
    user?: mongoose.Types.ObjectId;
    [key: string]: any;
}
const createBookingIntoDB = async (
    user: Record<string, unknown>,
    payload: TBooking
) => {
    const filterLoginUser = await User.findOne({ email: user.email });
    // console.log(filterLoginUser);
    if (!filterLoginUser) {
        throw new AppError(httpStatus.NOT_FOUND, "user not Found");
    }
    const newUser = filterLoginUser._id;
    payload.user = newUser as mongoose.Types.ObjectId;
    // console.log(payload);

    const filterCar = await Car.findOne({ _id: payload.carId });
    if (!filterCar) {
        throw new AppError(httpStatus.NOT_FOUND, "Car not Found");
    }
    const { _id } = filterCar;
    const statusUpdateCar = await Car.findByIdAndUpdate(
        _id,
        {
            status: "unavailable",
        },
        {
            new: true,
            runValidators: true,
        }
    );
    const result = (
        await (await Booking.create(payload)).populate("user")
    ).populate("carId");
    return result;
};

const getAllBookingFromDB = async (carId: string, date: string) => {
    if (carId && !date) {
        const result = await Booking.find({ carId }).populate("carId").populate("user");
        return result;
    }


    else if (date && !carId) {
        if (isValidDate(date)) {
            const result = await Booking.find({ date }).populate("carId").populate("user");
            return result;
        } else {
            throw new AppError(httpStatus.BAD_REQUEST, 'Date Not Valid')
        }
    }


    else if (date && carId) {

        if (isValidDate(date)) {
            const result = await Booking.find({ carId, date }).populate("carId").populate("user");
            return result;

        } else {
            throw new AppError(httpStatus.BAD_REQUEST, 'Date Not Valid')
        }
    }



    const result = await Booking.find().populate("carId").populate("user");

    if (!result.length) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    return result;
};
const getMYAllBookingFromDB = async (email: string) => {
    // console.log(email);
    const filterLoginUser = await User.findOne({ email });
    // console.log(filterLoginUser);
    if (!filterLoginUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const userId = filterLoginUser._id;
    const result = await Booking.find({ user: userId })
        .populate("carId")
        .populate("user");
    // console.log(result);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    return result;
};

const getSingleBookingFromDB = async (id: string) => {
    const result = await Booking.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }
    return result;
};


export const BookingServices = {
    getAllBookingFromDB,
    createBookingIntoDB,
    getSingleBookingFromDB,
    getMYAllBookingFromDB,

};
