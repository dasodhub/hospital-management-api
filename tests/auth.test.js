const request = require("supertest");
const app = require("../src/app");

describe("Auth Module", () => {
  it("should reject login without email and password", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should reject register without required fields", async () => {
    const res = await request(app).post("/api/auth/register").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
