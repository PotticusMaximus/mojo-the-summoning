const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
const { db } = require("../db/config");

// define in global scopel
let card;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: "Pit Beast",
    mojo: 2,
    stamina: 60,
    imgUrl: "someURL",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));
describe("Card", () => {
  it("has an id", async () => {
    expect(card).toHaveProperty("id");
  });

  it("has the correct name", () => {
    expect(card.name).toBe("Pit Beast");
  });
  it("Mojo to be correct number", () => {
    expect(card.mojo).toBe(2);
  });
  it("Stamina to be correct number", () => {
    expect(card.stamina).toBe(60);
  });
  it("holds a string value url", () => {
    expect(typeof card.imgUrl).toBe("string");
  });

  it("associates one Deck to many cards", async () => {
    const testDeck2 = await Deck.create({
      name: "Poop Deck",
      xp: "330",
    });
    const testCard1 = await Card.create({
      name: "Maird muncher",
      mojo: 450,
      stamina: 35,
    });
    await testDeck2.setCards([testCard1]);
    const association = await testDeck2.getCards();
    expect(association[0].name).toBe("Maird muncher");
  });
  test("A deck can be loaded with its cards", async () => {
    const findDeck = await Deck.findOne({
      where: { name: "Poop Deck" },
      include: Card,
    });
    //console.log(findDeck.Cards[0].name);
    expect(findDeck.name).toBe("Poop Deck");
    expect(findDeck.Cards[0].name).toEqual("Maird muncher");
  });
});
