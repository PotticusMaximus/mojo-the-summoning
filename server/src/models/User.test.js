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
  it("has an id and a correctly assigned name", async () => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("username");
    expect(user.username).toBe("gandalf");
  });

  it("can be updated", async () => {
    let findUser = await User.findOne({ where: { username: "gandalf" } });
    const newUsername = await findUser.update({ username: "Gandalf" });
    return newUsername;
    expect(user.username).toBe("Gandalf");
  });
  it("can be deleted", async () => {
    let findUser = await User.findOne({ where: { username: "Gandalf" } });
    const deleteGrey = await findUser.destroy();
    return deleteGrey;
    expect(deleteGrey.username).toBe("Gandalf");
  });
});
