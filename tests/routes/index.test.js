const request = require("supertest");
const app = require("../../app").app;

describe("server main routes", () => {
  it("should response with HTML and status 200 on index page", done => {
    request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(done);
  });

  it("should redirect to index while user is not authenticated on dashboard page", done => {
    request(app)
      .get("/dashboard")
      .expect(302)
      .expect("Location", "/")
      .end(done);
  });

  it("should response with HTML and status 200 on about page", done => {
    request(app)
      .get("/about")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(done);
  });

  it("should response with HTML and status 200 on calendar page", done => {
    request(app)
      .get("/calendar")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(done);
  });

  it("should response with status 404 and msg not found on uknown route", done => {
    request(app)
      .get("/somethingverywrong")
      .expect(404)
      .expect({ msg: "Not Found" })
      .end(done);
  });
});
