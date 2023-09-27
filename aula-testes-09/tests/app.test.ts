import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  const pass = "123";
  it("should create a user", async () => {
    const { body } = await api.post("/users").send({
      email: "user@example.com",
      password: pass
    });
    expect(bcrypt.compareSync(pass, body.password)).toBeTruthy();
    expect(body).toEqual({
      id: expect.any(Number),
      email: "user@example.com",
      password: expect.any(String)
    })
  });

  it.skip("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = await prisma.user.create({
      data: {
        email: "user@example.com",
        password: "123"
      }
    });
    expect(user).toEqual({
      data: {
        email: "user@example.com",
        password: "123"
      }
    })
  });

});

describe.skip("GET /users tests", () => {
  it("should return a single user", async () => {
    // TODO
  });

  it("should return 404 when can't find a user by id", async () => {
    // TODO
  });

  it("should return all users", async () => {
    // TODO
  });

})