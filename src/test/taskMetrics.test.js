const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
apiKey = "SAMPLEAPIKEY";
chai.use(chaiHttp);

describe("Task Metrics API", () => {
  it("should calculate task metrics for a valid date range", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "2023-07", endDate: "2023-08" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should calculate task metrics for a edge date range", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "2020-02", endDate: "2023-02" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
  it("should calculate task metrics for single digit month", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "2020-2", endDate: "2023-2" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
  it("should handle an invalid date range", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "08", endDate: "07" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });
  it("should handle an date range other than `YYYY-MM`", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "INVALID", endDate: "INVALID" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });
  it("should handle server errors", (done) => {
    chai
      .request(app)
      .get("/api/task-metrics")
      .set({ "x-api-key": `${apiKey}` })
      .send({ startDate: "invalid-date-format", endDate: "2023-08" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });
});
