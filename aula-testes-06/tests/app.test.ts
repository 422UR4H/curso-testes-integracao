import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("GET /event", async () => {
    const result = await api.get("/event");
    const parsed = JSON.parse(result.text);
    // const parsed = JSON.parse(result.body);
    // const result = await api.get("/event");
    // const result = JSON.parse((await api.get("/event")).text);
    expect(parsed).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: "Super Event!",
          image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
          date: "2023-07-21T00:00:00.000Z"
        })
      ])
    );
  });
});