const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
apiKey = "SAMPLEAPIKEY";
chai.use(chaiHttp);

describe("Fetch all Task API", () => {
  it("should return tasks as per pagination", (done) => {
    chai
      .request(app)
      .get("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .query({ page: 2, totalPageSize: 4 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.body.length).equal(4);
        done();
      });
  });
  it("should return all tasks if api is called without query params", (done) => {
    chai
      .request(app)
      .get("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.message).equals("InFeedo, Displaying all tasks.");
        done();
      });
  });
});
