const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing guitar instrument", function () {
  it("get all guitar", (done) => {
    chai
      .request(app)
      .get("/guitar")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = ''

  it("post guitar", (done) => {
    let guitar = {
      name: "roland guitar-20x",
      price: "45,000",
      link: "https://www.amazon.in/Roland-SPD-20X-Digital-Percussion-White/dp/B07GLPDZD8/ref=sr_1_3?crid=35W6TENORMLAN&keywords=roland+spd+20&qid=1651060439&sprefix=roland+spd+20%2Caps%2C1425&sr=8-3",
    };
    chai
      .request(app)
      .post("/guitar")
      .send(guitar)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id
        done();
      });
  });

  it("get guitar by id", (done) => {
    chai
      .request(app)
      .get("/guitar/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch guitar", (done) => {
    chai
      .request(app)
      .patch("/guitar/" + id)
      .send({ name: "roland guitar-10x" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete guitar", (done) => {
    chai
      .request(app)
      .delete("/guitar/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});