import { mysqlConnection } from "../../../app/utils/database/mysqlConnection";
import mysql from "mysql2/promise";

// Mock the mysql2/promise module
jest.mock("mysql2/promise", () => ({
  createPool: jest.fn(),
}));

describe("mysqlConnection", () => {
  it("creates a MySQL pool with the correct configuration", () => {
    process.env.MYSQL_HOST = "localhost";
    process.env.MYSQL_USER = "user";
    process.env.MYSQL_PASSWORD = "password";
    process.env.MYSQL_DATABASE = "database";
    process.env.MYSQL_PORT = "3306";

    mysqlConnection();

    expect(mysql.createPool).toHaveBeenCalledWith({
      connectionLimit: 10,
      host: "localhost",
      user: "user",
      password: "password",
      database: "database",
      port: 3306,
    });
  });
});
