const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
//const Deck = require("./index");
const { db } = require("../db/config");

// define in global scopel
let user;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: "gandalf" });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));
describe("User", () => {
  it("has an id", async () => {
    expect(user).toHaveProperty("id");
  });

  it("has the correct name", () => {
    expect(user.username).toBe("gandalf");
  });
});
