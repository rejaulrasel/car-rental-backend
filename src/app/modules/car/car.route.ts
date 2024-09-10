import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarControllers } from "./car.controller";
import { CarValidations } from "./car.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();
router.post(
    "/",
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar,
);
router.get("/", CarControllers.getAllCar);
router.get("/:id", CarControllers.getSingleCar);

router.put(
    "/:id",
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.updateCarValidationSchema),
    CarControllers.updateCar,
);
router.delete("/:id", auth(USER_ROLE.admin), CarControllers.deleteCar);
export const CarRoutes = router;
