import { Request, Response } from "express";
import { pool } from "../../config/db";
import { authServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email, password, phone, role } = body;
  try {
    const result = await authServices.signupUser(
      name,
      email,
      password,
      phone,
      role
    );

    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "User registration failed",
    });
  }
};
//Signin user
const signInUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const result = await authServices.signInUser(email, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User signin successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "User signIn failed",
    });
  }
};

export const authController = {
  signupUser,
  signInUser,
};
