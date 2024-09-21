import { z } from "zod";
const timeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  { message: '"invalid time formet expected HH.MM in 24 hour format" !' },
);

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    color: z.string({ required_error: "Description is required" }),
    isElectric: z.boolean({ required_error: "Description is required" }),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z.array(z.string({ required_error: "Description is required" })),
    pricePerHour: z.number({ required_error: "Description is required" }),
    isDeleted: z
      .boolean({ required_error: "Description is required" })
      .optional(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    color: z.string({ required_error: "Description is required" }).optional(),
    isElectric: z
      .boolean({ required_error: "Description is required" })
      .optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(z.string({ required_error: "Description is required" }))
      .optional(),
    pricePerHour: z
      .number({ required_error: "Description is required" })
      .optional(),
    isDeleted: z
      .boolean({ required_error: "Description is required" })
      .optional(),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    user: z.string().optional(),
    carId: z.string().optional(),
    startTime: timeSchema.optional(),
    bookingId: z.string({ required_error: "Name is required" }),
    endTime: timeSchema,
    totalCost: z.number().optional(),
  }),
});
export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
