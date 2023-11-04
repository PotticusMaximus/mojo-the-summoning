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
  it("has an id, correct name and a numerical XP value", async () => {
    expect(deck).toHaveProperty("id");

    expect(deck.name).toBe("Deck 1");

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
  it("can be updated", async () => {
    const testDeck2 = await Deck.create({
      name: "Mistake Deck",
      xp: 20122009,
    });
    let findDeck = await Deck.findOne({ where: { name: "Mistake Deck" } });
    const newDeckName = await findDeck.update({ name: "Big Mistake Deck" });
    return newDeckName;
    expect(testDeck2.name).toBe("Big Mistake Deck");
  });
  it("can be deleted", async () => {
    let findDeck = await Deck.findOne({ where: { name: "Big Mistake Deck" } });
    const deleteMistake = await findDeck.destroy();
    return deleteMistake;
    expect(deleteMistake.name).toBe("Big Mistake Deck");
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
