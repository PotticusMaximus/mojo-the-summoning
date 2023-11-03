const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Card, Attack, Deck } = require("./index");
const { db } = require("../db/config");

// define in global scopel
let deck;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: "Deck 1", xp: 50 });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));
describe("Deck", () => {
  it("has an id", async () => {
    expect(deck).toHaveProperty("id");
  });
  it("has the correct name", () => {
    expect(deck.name).toBe("Deck 1");
  });
  it("XP to be number", () => {
    expect(typeof deck.xp).toBe("number");
  });
  it("associates one Deck to each user", async () => {
    const testUser1 = await User.create({
      username: "MojoPro",
    });
    const testDeck1 = await Deck.create({
      name: "Triumph Deck",
      xp: 450,
    });
    await testUser1.setDeck(testDeck1);
    const association = await testUser1.getDeck();
    expect(association.name).toBe("Triumph Deck");
  });
  test("A user can be loaded with its deck", async () => {
    const findUser = await User.findOne({
      where: { username: "MojoPro" },
      include: Deck,
    });
    //console.log(findUser);
    expect(findUser.username).toBe("MojoPro");
    expect(findUser.Deck.name).toBe("Triumph Deck");
  });
});
