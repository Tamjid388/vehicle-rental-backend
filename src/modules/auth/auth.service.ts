import { pool } from "../../config/db";

const signupUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,phone,role)
        VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role
        `,
    [name, email, password, phone, role]
  );

  return result;
};

export const authServices = {
  signupUser,
};
