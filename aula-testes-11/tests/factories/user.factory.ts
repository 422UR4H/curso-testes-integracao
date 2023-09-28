import { User } from "@prisma/client";
import prisma from "database";
import { UserInput } from "repository";

export function createUser(user: UserInput): Promise<User>;
export function createUser(email: string, password: string): Promise<User>;
export function createUser(userOrEmail: UserInput | string, password?: string): Promise<User> {
    if (typeof userOrEmail === "string" && password !== undefined) {
        return prisma.user.create({ data: { email: userOrEmail, password } });
    } else if (typeof userOrEmail !== "string") {
        const { email, password } = userOrEmail;
        return prisma.user.create({ data: { email, password } });
    }
}
