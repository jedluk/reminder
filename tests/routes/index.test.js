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

  it("should redirect to google auth when user try to add event without authorization", done => {
    request(app)
      .get("/dashboard")
      .expect(302)
      .expect("Location", "/auth/google")
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
});
