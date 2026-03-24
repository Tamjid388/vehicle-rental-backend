export interface VehicleType  {
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string,
};

export interface UpdateVehicleType {
  vehicle_name?: string,
  type?: string,
  registration_number?: string,
  daily_rent_price?: number,
  availability_status?: string,
};