import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router=Router()


router.post("/",bookingController.createBooking)
router.get("/",bookingController.getAllBookings)
router.put("/:bookingId",auth("admin","customer"),bookingController.updateBooking)

export const bookingsRouter=router;