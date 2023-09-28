import prisma from "../../src/database";
import { User } from "@prisma/client";
import { UserInput } from "../../src/repository";
import { faker, simpleFaker } from "@faker-js/faker";

export async function buildUser(email: string, password?: string): Promise<User> {
  const userData: UserInput = {
    email,
    password: password || new Date().getTime().toString()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}

export async function createRandomUser(): Promise<User> {
  const email = faker.internet.email();
  const password = simpleFaker.string.uuid();
  return buildUser(email, password);
}