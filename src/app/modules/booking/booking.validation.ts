import { z } from "zod";

const timeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  { message: '"invalid time formet expected HH.MM in 24 hour format" !' },
);
const newBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string().optional(),
    carId: z.string(),
    startTime: timeSchema,
    endTime: timeSchema.optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
  }),
});

export const bookingValidations = {
  newBookingValidationSchema,
};
