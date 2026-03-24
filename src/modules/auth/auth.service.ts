import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const signupUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,phone,role)
        VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role
        `,
    [name, email, hashpassword, phone, role]
  );

  return result;
};

const signInUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );
  const currentUser = result.rows[0];
  const matchpassword = await bcrypt.compare(password, currentUser.password);
  if (!matchpassword) {
    return false;
  }
  const payload = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  };
  const token = jwt.sign(payload, config.secret as string, { expiresIn: "7d" });
  const { password: pwd, ...user } = currentUser;
  return { token, user };
};

export const authServices = {
  signupUser,
  signInUser,
};
