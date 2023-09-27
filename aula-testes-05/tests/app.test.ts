import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return fibonacci sequence when ask /fibonacci", async () => {
    expect((await api.get("/fibonacci")).status).toBe(400);

    const stackOverflowIndex = (Number.MAX_VALUE + 1).toString();
    const arr: Array<string> = ["a1", "-1", "0.99", "0", stackOverflowIndex];
    for (let i = 0; i < arr.length - 1; i++) {
      expect((await api.get(`/fibonacci?elements=${arr[i]}`)).status).toBe(400);
    }
  });
});

describe.skip("can be implemented", () => {
  it("should return status 400", async () => {
    expect((await api.get("/fibonacci?elements=1.1")).status).toBe(400);
  });
});