const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing harmonium instrument", function () {
  it("get all harmonium", (done) => {
    chai
      .request(app)
      .get("/harmonium")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = ''

  it("post harmonium", (done) => {
    let harmonium = {
      name: "roland harmonium-20x",
      price: "45,000",
      link: "https://www.amazon.in/Roland-SPD-20X-Digital-Percussion-White/dp/B07GLPDZD8/ref=sr_1_3?crid=35W6TENORMLAN&keywords=roland+spd+20&qid=1651060439&sprefix=roland+spd+20%2Caps%2C1425&sr=8-3",
    };
    chai
      .request(app)
      .post("/harmonium")
      .send(harmonium)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id
        done();
      });
  });

  it("get harmonium by id", (done) => {
    chai
      .request(app)
      .get("/harmonium/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch harmonium", (done) => {
    chai
      .request(app)
      .patch("/harmonium/" + id)
      .send({ name: "roland harmonium-10x" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete harmonium", (done) => {
    chai
      .request(app)
      .delete("/harmonium/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});