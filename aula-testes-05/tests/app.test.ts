import supertest from "supertest";
import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });
});

describe("/fibonacci", () => {
  it("should return an array and status 200 when parameter is a valid number", async () => {
    const { status, body } = await api.get(`/fibonacci?elements=10`);
    expect(status).toBe(200);
    expect(body).toHaveLength(10);
    expect(body).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("should return status 400 when parameter is not send", async () => {
    expect((await api.get("/fibonacci")).status).toBe(400);
  });

  it("should return status 400 when parameter is not send", async () => {
    const stackOverflowIndex = (Number.MAX_VALUE + Number.MIN_VALUE).toString();
    const arr: Array<string> = ["NaN", "a1", "-1", "0", "0.99", stackOverflowIndex];
    for (let i = 0; i < arr.length - 1; i++) {
      expect((await api.get(`/fibonacci?elements=${arr[i]}`)).status).toBe(400);
    }
  });
});

describe.skip("can be implemented", () => {
  it("should return status 400", async () => {
    const arr: Array<string> = ["", "1", "1.1"];
    for (let i = 0; i < arr.length; i++) {
      expect((await api.get(`/fibonacci?elements=${arr[i]}`)).status).toBe(400);
    }
  });
});