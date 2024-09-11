import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user?: Types.ObjectId;
  carId?: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
  isBooked?: "unconfirmed" | "confirmed";
};
