import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },

    features: { type: [String], required: true },
    pricePerHour: { type: Number },
    status: {
      type: String,
      required: true,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// carSchema.pre("find", function (next) {
//     this.find({ isDeleted: { $ne: true } });
//     next();
// });
// carSchema.pre("findOne", function (next) {
//     this.find({ isDeleted: { $ne: true } });
//     next();
// });
export const Car = model<TCar>("Car", carSchema);
