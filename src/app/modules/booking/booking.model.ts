import mongoose, { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookedSchema = new Schema<TBooking>(
  {
    date: { type: String, required: [true, "date is requierd"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    startTime: { type: String },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
export const Booking = model<TBooking>("Booking", bookedSchema);
