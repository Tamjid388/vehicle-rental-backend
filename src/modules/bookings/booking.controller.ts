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
      message: error.message || "Vehicle retrieved failed",
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookings();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle retrieved failed",
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
