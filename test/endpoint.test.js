const supertest = require("supertest");
const app = require("../app.js");

const request = supertest(app);

describe("Endpoints respond to  request", () => {
  it('Returns data and status 200 on request to "/users"', () => {
    return request.get("/users").then((response) => {
      console.log(response);
      expect(response.status).toBe(200);
    });
  });

  it('returns a user by its userId "/users/:id"', () => {
    return request.get("/users/dbfe53c3c4d568240378b0c6").then((response) => {
      expect(response.status).toBe(200);
    });
  });
});
