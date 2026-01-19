import { pool } from "../../config/db";

interface TUser {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const getAllusers = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  return result;
};

const updateUserByuserId = async (id: string, userInfo: TUser) => {
  const { name, email, phone, role } = userInfo;
  if (!name || !email || !phone || !role) {
    return null;
  }
  const query = `
    UPDATE users
    SET 
      name=$1,
      email=$2,
      phone=$3,
      role=$4
    WHERE id=$5
    RETURNING *
    `;
  const values = [name, email, phone, role, id];
  const result = await pool.query(query, values);
  return result;
};

const DeleteUserByuserId = async (id: string) => {
  const query = `
    DELETE FROM users
    WHERE id=$1
    RETURNING *
    `;
  const result = await pool.query(query, [id]);
  return result;
};
export const usersServices = {
  getAllusers,
  updateUserByuserId,
  DeleteUserByuserId,
};
