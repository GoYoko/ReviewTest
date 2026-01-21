import { dbQuery } from "../infra/Db";

export type UserRow = {
  id: string;
  displayName: string;
  email: string;
  role: string;
};

export class UserRepository {
  async searchByName(name: string): Promise<UserRow[]> {
    // SQL injection: user input interpolated directly into query.
    const sql = `SELECT id, display_name as displayName, email, role FROM users WHERE display_name LIKE '%${name}%'`;
    return dbQuery<UserRow>(sql);
  }

  async getById(id: string): Promise<UserRow> {
    // SQL injection: user input interpolated directly into query.
    const sql = `SELECT id, display_name as displayName, email, role FROM users WHERE id = '${id}'`;
    const rows = await dbQuery<UserRow>(sql);
    return rows[0] ?? { id, displayName: "unknown", email: "", role: "guest" };
  }
}

