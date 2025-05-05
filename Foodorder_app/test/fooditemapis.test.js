const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;
const { app } = require("../server");
const FoodItemsModel = require("../app/models/fooditemModel");

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe("Food Items APIs Tests", function () {
  var sessionToken;
  before(async () => {
    console.log = function () {};
    console.error = function () {};

    await FoodItemsModel.deleteMany();
    let credentials = {
      username: "testuser",
      password: "testpassword",
    };

    const res = await request(app).post("/api/v1/users/login").send(credentials);

    sessionToken = res.body.data.sessionToken;
    console.log("Token Generated", sessionToken);
  });

  after(async () => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  const testFoodItem = {
    name: "testFoodItem",
    description: "Test Food Item description",
    image: "Test Food Item Image URL",
    categoryId: "67a3c6ff8994438dd9587610",
    cuisineId: "67a3c6ff8994438dd9587606",
    isVeg: "false"
  };

  describe("POST /api/v1/fooditems/", async () => {
    it("should add a new fooditem", async () => {
      const res = await request(app)
        .post("/api/v1/fooditems/")
        .set("Authorization", `Bearer ${sessionToken}`)
        .send(testFoodItem);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("Fooditem created successfully");
    });

    it("should return 401 incase token is not provided in request", async () => {
      const res = await request(app)
        .post("/api/v1/fooditems/")
        .send(testFoodItem);

      expect(res.status).to.equal(401);
    });
  });
  describe("GET /api/v1/fooditems", function () {
    it("should return 200 OK with fooditems", async function () {
      const response = await request(app)
        .get("/api/v1/fooditems")
        .expect(200)
        .expect("Content-Type", /json/);

      const fooditems = response.body.data;
      expect(fooditems).to.be.an("array");
      expect(fooditems).length.greaterThanOrEqual(0);

      fooditems.forEach((fooditems) => {
        expect(fooditems.name).to.be.an("string");
        expect(fooditems.description).to.be.an("string");
        expect(fooditems.image).to.be.an("string");
      });
    });
  });
});