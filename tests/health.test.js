let app;
const request = require("supertest");

describe("GET /health", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "microservices-in-anger-course-rulz";
    app = require("../app/app");
  });

  it("It should return 404 for an invalid path", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ code: 404, message: "Not Found" });
  });

  it("It should retrieve the status of the app", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });
});
