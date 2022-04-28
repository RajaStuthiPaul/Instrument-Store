const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing drum instrument", function () {
    this.timeout(10000)
  it("get all drums", (done) => {
    chai
      .request(app)
      .get("/drum")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = ''

  it("post drum", (done) => {
    let drum = {
      name: "roland spd-20x",
      price: "45,000",
      link: "https://www.amazon.in/Roland-SPD-20X-Digital-Percussion-White/dp/B07GLPDZD8/ref=sr_1_3?crid=35W6TENORMLAN&keywords=roland+spd+20&qid=1651060439&sprefix=roland+spd+20%2Caps%2C1425&sr=8-3",
    };
    chai
      .request(app)
      .post("/drum")
      .send(drum)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id
        done();
      });
  });

  it("get drum by id", (done) => {
    chai
      .request(app)
      .get("/drum/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch drum", (done) => {
    chai
      .request(app)
      .patch("/drum/" + id)
      .send({ name: "roland spd-10x" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete drum", (done) => {
    chai
      .request(app)
      .delete("/drum/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});