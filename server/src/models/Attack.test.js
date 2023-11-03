const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
const { db } = require("../db/config");

// define in global scopel
let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: "Murderous swipe",
    mojoCost: 0,
    staminaCost: 10,
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));
describe("Attack", () => {
  it("has an id", async () => {
    expect(attack).toHaveProperty("id");
  });

  it("has the correct name", () => {
    expect(attack.title).toBe("Murderous swipe");
  });
  it("Mojo to be correct number", () => {
    expect(attack.mojoCost).toBe(0);
  });
  it("Stamina to be correct number", () => {
    expect(attack.staminaCost).toBe(10);
  });
  it("associates many cards to many attacks", async () => {
    const testCard2 = await Card.create({
      name: "Fitzchivalry Farseer",
      mojo: 450,
      stamina: 100,
    });
    const testCard3 = await Card.create({
      name: "Burrich",
      mojo: 300,
      stamina: 200,
    });
    const testAttack1 = await Attack.create({
      title: "Wit repel",
      mojoCost: 25,
      staminaCost: 5,
    });
    const testAttack2 = await Attack.create({
      title: "Skill push",
      mojoCost: 250,
      staminaCost: 50,
    });
    await testCard2.setAttacks([testAttack1, testAttack2]);
    await testCard3.setAttacks([testAttack1, testAttack2]);
    //
    const tc2 = (await testCard2.getAttacks()).map((attack) => attack.title);
    const tc3 = (await testCard3.getAttacks()).map((attack) => attack.title);
    const association = [tc2, tc3];
    expect(association).toEqual([
      ["Wit repel", "Skill push"],
      ["Wit repel", "Skill push"],
    ]);
  });
});
