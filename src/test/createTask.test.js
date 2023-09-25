const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
apiKey = "SAMPLEAPIKEY";
chai.use(chaiHttp);

describe("Test Create Task API", () => {
  it("should create a new task with valid data", (done) => {
    chai
      .request(app)
      .post("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ title: "New Task", description: "Sample task", status: "open" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.body).to.have.property("title", "New Task");
        done();
      });
  });

  it("should create a new task without description", (done) => {
    chai
      .request(app)
      .post("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ title: "New Task", status: "open" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.body).to.have.property("title", "New Task");
        done();
      });
  });

  it("should return an error for missing required fields", (done) => {
    chai
      .request(app)
      .post("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ description: "Sample task", status: "open" })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});
