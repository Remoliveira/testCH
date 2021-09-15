import request from "supertest";
import { Connection } from "typeorm";
import { app } from '../../../../app';
import createConnection from "../../../../database"

let conn: Connection;
describe("Create User Controller", () => {

  beforeAll(async() => {
      conn = await createConnection()
      await conn.runMigrations()
  })

  afterAll(async() =>{
    await conn.dropDatabase();
    await conn.close();
  });
  it("should be able to create a new user", async () => {

    const response = await request(app).post("/api/v1/users").send({
      name:"test",
      email:"test@",
      password: "1234"
    });

    expect(response.status).toBe(201)

  })
})
