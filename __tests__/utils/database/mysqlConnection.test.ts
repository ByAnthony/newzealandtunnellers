import { Connection } from "node_modules/mysql2/typings/mysql/lib/Connection";
import { mysqlConnection } from "../../../app/utils/database/mysqlConnection";
import * as mysql from "mysql2/promise";
import { Prepare } from "node_modules/mysql2/typings/mysql/lib/protocol/sequences/Prepare";

jest.mock("mysql2/promise");

describe("mysqlConnection function", () => {
  it("creates a MySQL connection with the correct environment variables", async () => {
    process.env.MYSQL_HOST = "localhost";
    process.env.MYSQL_USER = "user";
    process.env.MYSQL_PASSWORD = "password";
    process.env.MYSQL_DATABASE = "database";
    process.env.MYSQL_PORT = "3306";

    const mockConnection = {} as any;
    jest.spyOn(mysql, "createConnection").mockResolvedValue(mockConnection);

    const connection = await mysqlConnection();

    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: "localhost",
      user: "user",
      password: "password",
      database: "database",
      port: 3306,
    });

    expect(connection).toEqual(mockConnection);
  });
});
