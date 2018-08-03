let app;
const request = require("supertest");
const publishSNS = require("../app/lib/aws/aws").publishSNS;
jest.mock("../app/lib/aws/aws");

describe.only("PATCH /flights", () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.JWT_SECRET;
  });

  afterEach(() => {
    delete require.cache["../app/app"];
  });

  it("It should return 404 when path param is missing", async () => {
    process.env.JWT_SECRET = "microservices-in-anger-course-rulz";
    app = require("../app/app");

    const response = await request(app)
      .get("/flights/")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FuZC5kaWdpdGFsIiwiaWF0IjoxNTMxNzQxMTcwLCJleHAiOjE1NjMyNzcyMjksImF1ZCI6Im1pY3Jvc2VydmljZXMtaW4tYW5nZXItY291cnNlIiwic3ViIjoiMWU3ZDIzYTItZWVlMi00OWJmLWJhM2YtZGY1ZDFkYzQ0NzA4IiwiaHR0cHM6Ly9hbmQuZGlnaXRhbC9yb2xlIjoiVVNFUiJ9.1RMv8Z0Jk1MwVF3CrC59kRXjzf8MG7opmxZemwbOoDo"
      );

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ code: 404, message: "Not Found" });
  });

  it("It should return Message with flight details", async () => {
    process.env.JWT_SECRET = "microservices-in-anger-course-rulz";
    app = require("../app/app");

    const response = await request(app)
      .patch("/flights/200")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FuZC5kaWdpdGFsIiwiaWF0IjoxNTMxNzQxMTcwLCJleHAiOjE1NjMyNzcyMjksImF1ZCI6Im1pY3Jvc2VydmljZXMtaW4tYW5nZXItY291cnNlIiwic3ViIjoiMWU3ZDIzYTItZWVlMi00OWJmLWJhM2YtZGY1ZDFkYzQ0NzA4IiwiaHR0cHM6Ly9hbmQuZGlnaXRhbC9yb2xlIjoiVVNFUiJ9.1RMv8Z0Jk1MwVF3CrC59kRXjzf8MG7opmxZemwbOoDo"
      )
      .send({
        departureTime: "2018-12-01 06:50:00"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Flight id:200, departureTime: 2018-12-01 06:50:00"
    });
  });

  it("It should return 401  when incorrect JWT secret is used", async () => {
    process.env.JWT_SECRET = "incorrect-secret";
    app = require("../app/app");

    const response = await request(app)
      .patch("/flights/200")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FuZC5kaWdpdGFsIiwiaWF0IjoxNTMxNzQxMTcwLCJleHAiOjE1NjMyNzcyMjksImF1ZCI6Im1pY3Jvc2VydmljZXMtaW4tYW5nZXItY291cnNlIiwic3ViIjoiMWU3ZDIzYTItZWVlMi00OWJmLWJhM2YtZGY1ZDFkYzQ0NzA4IiwiaHR0cHM6Ly9hbmQuZGlnaXRhbC9yb2xlIjoiVVNFUiJ9.1RMv8Z0Jk1MwVF3CrC59kRXjzf8MG7opmxZemwbOoDo"
      );

    expect(response.statusCode).toBe(401);
  });
});
