import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await bookingService.createBooking(body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Booking created failed",
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id;

    
    const data = await bookingService.getAllBookings(role as string, userId as string);

    
    const message = role === "admin" 
      ? "Bookings retrieved successfully" 
      : "Your bookings retrieved successfully";

    return res.status(200).json({
      success: true,
      message,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Bookings retrieval failed",
    });
  }
};
const updateBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const role = req.user?.role;
  const body = req.body;
  console.log(role);

  console.log(bookingId);
  try {
    if (!bookingId) {
      return res.status(404).json({
        success: false,
        message: " ID is required",
      });
    }
    const result = await bookingService.updateBooking(bookingId, role, body);

    return res.status(201).json({
      success: true,
       message: "Booking cancelled successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || " failed",
    });
  }
};
export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
