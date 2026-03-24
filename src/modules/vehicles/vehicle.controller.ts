import { Request ,Response} from "express";
import { vehicleServices } from "./vehicle.services";

const createVehicle = async (req: Request, res: Response) => {
  const body = req.body;
  
  try {
    const result = await vehicleServices.createVehicle(body)
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle creation failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle creation failed",
    });
  }
};
const getAllvehicles = async (req: Request, res: Response) => {

  
  try {
    const result = await vehicleServices.getAllvehicles()
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle retrieved failed",
    });
  }
};
const getvehicleById = async (req: Request, res: Response) => {

  const id=req.params.vehicleId
  try {
    
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }
    const result = await vehicleServices.getvehicleById(id)
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle retrieved failed",
    });
  }
};
const updateVehicleById = async (req: Request, res: Response) => {

  const id=req.params.vehicleId
  const body=req.body
  try {
    
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }
    const result = await vehicleServices.updateVehicleById(body,id)
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle updated failed",
    });
  }
};
const deleteVehicleById = async (req: Request, res: Response) => {

  const id=req.params.vehicleId
  try {
    
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }
    const result = await vehicleServices.deleteVehicleById(id)
    
    if (result.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Vehicle deleted failed",
    });
  }
};
export const vehicleController={
    createVehicle,getAllvehicles,getvehicleById,updateVehicleById,deleteVehicleById
}