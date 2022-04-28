const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing keyboard instrument", function () {
  it("get all keyboard", (done) => {
    chai
      .request(app)
      .get("/keyboard")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = ''

  it("post keyboard", (done) => {
    let keyboard = {
      name: "roland xps10",
      price: "53,900",
      link: "https://www.amazon.in/Roland-XPS-10-Expandable-Synthesizer-Red/dp/B08HSBLG4Q/ref=sr_1_1?crid=1MPZGHANH6PSS&keywords=roland+xps+10&qid=1651060712&sprefix=roland+xps+10%2Caps%2C695&sr=8-1",
    };
    chai
      .request(app)
      .post("/keyboard")
      .send(keyboard)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id
        done();
      });
  });

  it("get keyboard by id", (done) => {
    chai
      .request(app)
      .get("/keyboard/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch keyboard", (done) => {
    chai
      .request(app)
      .patch("/keyboard/" + id)
      .send({ name: "roland xps30" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete keyboard", (done) => {
    chai
      .request(app)
      .delete("/keyboard/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});