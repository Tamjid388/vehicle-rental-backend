import { pool } from "../../config/db";

interface TBooking {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (body: TBooking) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = body;
  const start = new Date(rent_start_date).getTime();
  const end = new Date(rent_end_date).getTime();
  const total_days_booked = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  if (total_days_booked <= 0) {
    throw new Error("Invalid booking dates");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const vehicleDetails = await client.query(
      `
  SELECT vehicle_name,daily_rent_price,availability_status
   FROM vehicles WHERE id=$1
  `,
      [vehicle_id],
    );
    const vehicle = vehicleDetails.rows[0];

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle Not Available");
    }

    const total_price = vehicle.daily_rent_price * total_days_booked;

    const values = [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
    ];

    const bookingResult = await client.query(
      `
    INSERT INTO bookings (customer_id,
     vehicle_id, rent_start_date, rent_end_date,total_price)
    VALUES(
    $1,$2,$3,$4,$5
    ) RETURNING *
    `,
      values,
    );
    if (bookingResult.rowCount !== 1) {
      throw new Error("Booking Insert Failed");
    }
    const updateVehicleStatus = await client.query(
      `
      UPDATE vehicles
      SET availability_status=$1
      WHERE id=$2
    `,
      ["booked", vehicle_id],
    );
    if (updateVehicleStatus.rowCount !== 1) {
      throw new Error("Vehicle status update failed");
    }
    const booking = bookingResult.rows[0];
    await client.query("COMMIT");
    return {
      ...booking,

      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getAllBookings = async () => {
  return await pool.query(`
    SELECT * FROM bookings 
    INNER JOIN vehicles ON
    bookings.vehicle_id= vehicles.id
    `);
};
type TBookingUpdate = {
  status: "cancelled" | "returned";
};

const updateBooking = async (
  bookingId: string,
  role: string,
  body: TBookingUpdate,
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    //---> Fetch the booking
    const bookingResult = await client.query(
      `SELECT * FROM bookings WHERE id = $1`,
      [bookingId],
    );
    const booking = bookingResult.rows[0];

    if (!booking) {
      throw new Error("Booking not found");
    }
    const isAdmin = role === "admin";
    const customer_id = booking.customer_id;


    //for customer
//     if (!isAdmin && booking.customer_id !== loggedInUserId) {
//   throw new Error("Unauthorized");
// }
    if (!isAdmin && body.status === "cancelled") {
      const startDate = booking.rent_start_date;
      const today = new Date().toISOString().split("T")[0]!;
      if (startDate > today) {
        console.log("You can cancel the booking");
        await client.query(
          `
      UPDATE bookings
      SET status=$1
      WHERE id=$2
      `,
          [body.status, bookingId],
        );
      } else {
        throw new Error(
          "Cancellation not allowed. You needed to cancel at least 1 day before start date.",
        );
      }
    }

    // for admin
    if (isAdmin && body.status === "returned") {
      await client.query(
        `
      UPDATE bookings
      SET status=$1
      WHERE id=$2
      `,
        [body.status, bookingId],
      );
      //Update vehicle availability
      const updateVehicleResult = await client.query(
        `UPDATE vehicles
         SET availability_status='available'
          WHERE id=$1 RETURNING *`,
        [booking.vehicle_id],
      );
      
    }
    await client.query("COMMIT")
  } catch (error) {
     await client.query("ROLLBACK");
    throw error;
  }finally{
     client.release();
  }
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
