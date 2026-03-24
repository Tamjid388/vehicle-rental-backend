import { Request, Response } from "express";
import { usersServices } from "./users.services";

const getAllusers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllusers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Users Reterieved Failed",
    });
  }
};
const updateUserByuserId = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const userInfo = req.body;
  const user = req?.user?.id;
  const userRole = req?.user?.role;

  try {
    if (!id) {
      return res.json({
        success: false,
        message: "User Id Required",
      });
    }
    if (userRole === "customer") {
      if (id !== user) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You can only update your own account",
        });
      }
    }

    const result = await usersServices.updateUserByuserId(id, userInfo);
    if (result === null) {
      return res.status(400).json({
        message: "Provide all the fields",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "User update Failed",
    });
  }
};

const DeleteUserByuserId = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    if (!id) {
      return res.json({
        success: false,
        message: "User Id Required",
      });
    }

    const result = await usersServices.DeleteUserByuserId(id);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User mot found or already deleted",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "User delete Failed",
    });
  }
};

export const userControllers = {
  getAllusers,
  updateUserByuserId,
  DeleteUserByuserId,
};
