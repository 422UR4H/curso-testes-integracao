import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "repository";

const api = supertest(app);

const password = "123";
const email = "user@example.com"
const user = { email, password } as UserInput;


beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { status, body } = await api.post("/users").send(user);
    expect(bcrypt.compareSync(password, body.password)).toBeTruthy();
    expect(status).toBe(201);
    expect(body).toEqual({
      email,
      id: expect.any(Number),
      password: expect.any(String)
    });
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await api.post("/users").send(user);
    const { status, body } = await api.post("/users").send(user);
    expect(status).toBe(409);
    expect(body).toEqual({});
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const { id } = (await api.post("/users").send(user)).body;
    const { status, body } = await api.get(`/users/${id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id,
      email,
      password: expect.any(String)
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status, body } = await api.get("/users/1");
    expect(status).toBe(404);
    expect(body).toEqual({});
  });

  it("should return all users", async () => {
    await api.post("/users").send(user);
    await api.post("/users").send({
      email: "test@example.com",
      password
    });
    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
      ])
    );
    expect(body).toHaveLength(2);
  });
});