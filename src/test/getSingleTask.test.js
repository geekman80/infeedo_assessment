const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
apiKey = "SAMPLEAPIKEY";
chai.use(chaiHttp);

describe("Fetch single Task API", () => {
  it("should return task by id", (done) => {
    chai
      .request(app)
      .post("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ title: "New Task", description: "Sample task", status: "open" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        const taskId = res.body.body.id;

        chai
          .request(app)
          .get(`/api/tasks/${taskId}`)
          .set({ "x-api-key": `${apiKey}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          });
      });
  });
  it("should return 404 if task is not present", (done) => {
    chai
      .request(app)
      .get(`/api/tasks/1000000`)
      .set({ "x-api-key": `${apiKey}` })
      .send({ title: "Just a title" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
