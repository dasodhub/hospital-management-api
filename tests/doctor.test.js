const request = require("supertest");
const app = require("../src/app");

describe("Doctor Module", () => {
  it("should reject creating doctor without token", async () => {
    const res = await request(app).post("/api/doctors").send({});

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should reject getting doctors without token", async () => {
    const res = await request(app).get("/api/doctors");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
