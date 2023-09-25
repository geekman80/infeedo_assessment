const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
apiKey = "SAMPLEAPIKEY";
chai.use(chaiHttp);

describe("Test Delete Task API", () => {
  it("should delete a task with valid id", (done) => {
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
          .delete(`/api/tasks/${taskId}`)
          .set({ "x-api-key": `${apiKey}` })
          .end((err, res) => {
            expect(res.body).to.be.an("object");
            expect(res.body.message).equals("Task Deleted successfully");
            done();
          });
      });
  });
  it("should return 404 when try to delete a task with invalid id", (done) => {
    chai
      .request(app)
      .delete("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ id: 10000 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
