const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);
apiKey = "SAMPLEAPIKEY";

describe("Update Task API", () => {
  it("should update an existing task with valid data", (done) => {
    // let's create a new task first to have an existing task to update
    chai
      .request(app)
      .post("/api/tasks")
      .set({ "x-api-key": `${apiKey}` })
      .send({ title: "New Task", description: "Sample task", status: "open" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        const taskId = res.body.body.id;
        // update the existing task with new data
        chai
          .request(app)
          .put(`/api/tasks/${taskId}`)
          .set({ "x-api-key": `${apiKey}` })
          .send({
            title: "Updated Task",
            description: "Updated description",
            status: "in_progress",
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.body).to.be.an("object");
            expect(res.body.body).to.have.property("id", taskId);
            expect(res.body.body).to.have.property("title", "Updated Task");
            expect(res.body.body).to.have.property(
              "description",
              "Updated description"
            );
            expect(res.body.body).to.have.property("status", "in_progress");
            done();
          });
      });
  });

  it("should return an error when updating a non-existent task", (done) => {
    const taskId = 123456;
    chai
      .request(app)
      .put(`/api/tasks/${taskId}`)
      .set({ "x-api-key": `${apiKey}` })
      .send({
        title: "Updated Task",
        description: "Updated description",
        status: "in_progress",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property(
          "error",
          "Given task does not exists."
        );
        done();
      });
  });

  it("should update the task even if a field is not present", (done) => {
    chai
      .request(app)
      .put("/api/tasks/1")
      .set({ "x-api-key": `${apiKey}` })
      .send({ description: "Updated description", status: "in_progress" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
