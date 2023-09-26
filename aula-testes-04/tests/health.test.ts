import supertest from "supertest";
import app from "app";

const server = supertest(app);

describe("server", () => {
    it("should create a server", async () => {
        const result = await server.get("/health");
        expect(result.status).toEqual(200);
    });
});