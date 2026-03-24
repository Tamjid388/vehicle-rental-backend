import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL  ,
       email VARCHAR(100) UNIQUE NOT NULL,
       password TEXT NOT NULL,
       phone VARCHAR(50) NOT NULL,
       role VARCHAR(50)
 ) 
        `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(150),
      type VARCHAR(100),
      registration_number VARCHAR(150),
      daily_rent_price FLOAT,
      availability_status VARCHAR(100)
      )
      `);
  //booking table
  await pool.query(`
      
     CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id),
    vehicle_id INT REFERENCES vehicles(id),
    total_price INT not null,
    rent_start_date DATE,
    rent_end_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active'

      )
      `);
};
export default initDB;
