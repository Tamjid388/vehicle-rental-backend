import { pool } from "../../config/db";
import { UpdateVehicleType, VehicleType } from "./vehicle.interface";


const createVehicle = async (
  vehicle: VehicleType
) => {
const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicle;

const result = await pool.query(
    `INSERT INTO vehicles(
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result
};

const getAllvehicles=async()=>{
  const result=await pool.query(`
      SELECT * FROM vehicles
    `)
  return result
}
const getvehicleById=async(vehicleId:string)=>{
  const result=await pool.query(`
      SELECT * FROM vehicles WHERE id=$1
    `,[vehicleId])
  return result
}
const updateVehicleById=async(payload:UpdateVehicleType,id:string)=>{
  const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload
  const result=await pool.query(`
      UPDATE vehicles SET
      vehicle_name=$1,
      type=$2,
      registration_number=$3,
      daily_rent_price=$4,
      availability_status=$5
      WHERE id=$6
      RETURNING *
    `,[
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id
    ])
  return result
}

const deleteVehicleById=async(id:string)=>{
  const result=await pool.query(`
      DELETE FROM vehicles WHERE id=$1
    `,[id])
  return result
}

export const vehicleServices = {
  createVehicle,getAllvehicles,getvehicleById,updateVehicleById,deleteVehicleById
};
