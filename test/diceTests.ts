import { assert } from "chai";
import { describe, it } from "mocha";
import { Calculator } from "../app/Calculator2.js";

describe("print die", () => {
  const c = new Calculator();
  it("dice tests", () => {
    assert.equal("♿", c.dice(0));
    assert.equal("⚀", c.dice(1));
    assert.equal("⚁", c.dice(2));
    assert.equal("⚂", c.dice(3));
    assert.equal("⚃", c.dice(4));
    assert.equal("⚄", c.dice(5));
    assert.equal("⚅", c.dice(6));
    assert.equal("⚀⚀", c.dice(7), "dice 7");
    assert.equal("⚀⚅", c.dice(12));
    assert.equal("⚅⚅", c.dice(42), "dice = 42");
    assert.equal("⚀⚀⚀", c.dice(43), "dice = 43");
    assert.equal("⚀⚀⚀⚀", c.dice(259), "dice = 304");
    assert.equal("⚁⚀⚅⚅⚁⚂⚃⚁⚄⚀⚀⚁⚀⚃⚄⚀", c.dice(1111111111111), "dice = big");
    assert.equal("-⚀", c.dice(-1));
  });

  it("prints words as dice", () => {
    assert.equal(c.stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅");
  });

  it("prints words as dice", () => {
    assert.equal(c.stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅");
  });

  it("increments the dice", () => {
    assert.equal(c.increment(""), "⚀");
    assert.equal(c.increment("⚀"), "⚁");
    assert.equal(c.increment("-⚀"), "♿");
    assert.equal(c.increment("⚁"), "⚂");
    assert.equal(c.increment("⚂"), "⚃");
    assert.equal(c.increment("⚃"), "⚄");
    assert.equal(c.increment("⚄"), "⚅");
    assert.equal(c.increment("⚅"), "⚀⚀");
    assert.equal(c.increment("⚀⚀"), "⚀⚁");
    assert.equal(c.increment("-⚂"), "-⚁");
  });

  it("decrements the dice", () => {
    assert.equal(c.decrement(""), "-⚀");
    assert.equal(c.decrement("♿"), "-⚀");
    assert.equal(c.decrement("⚀"), "♿");
    assert.equal(c.decrement("⚀⚀"), "⚅");
    assert.equal(c.decrement("⚁"), "⚀");
    assert.equal(c.decrement("⚂"), "⚁");
    assert.equal(c.decrement("-⚂"), "-⚃");
    assert.equal(c.decrement("--⚂"), "⚁");
    assert.equal(c.decrement("------⚂"), "⚁");
    assert.equal(c.decrement("-----⚂"), "-⚃");
    assert.equal(c.decrement("----⚂"), "⚁");
  });

  it("negates dice", () => {
    assert.equal(c.negate("♿"), "♿");
    assert.equal(c.negate("-♿"), "♿");
    assert.equal(c.negate("⚀"), "-⚀");
    assert.equal(c.negate("-⚀"), "⚀");
    assert.equal(c.negate("--⚀"), "-⚀");
  });

  it("is negative test", () => {
    assert.isFalse(c.isNegative("♿"));
    assert.isFalse(c.isNegative("-♿"));
    assert.isTrue(c.isNegative("-⚀"));
    assert.isFalse(c.isNegative("⚀"));
  });

  it("sign tests", () => {
    assert.equal(c.sign("⚀"), "");
    assert.equal(c.sign("-⚀"), "-");
  });

  it("adds two dice", () => {
    assert.equal(c.add("♿", "⚀"), "⚀");
    assert.equal(c.add("⚀", "⚀"), "⚁");
    assert.equal(c.add("⚁", "⚁"), "⚃");
    assert.equal(c.add("⚃", "⚃"), "⚀⚁");
    assert.equal(c.add("⚃", "-⚃"), "♿");
    assert.equal(c.add("-⚃", "⚃"), "♿");
  });

  it("subtracts two dice", () => {
    assert.equal(c.subtract("♿", "⚀"), "-⚀");
    assert.equal(c.subtract("⚀", "⚀"), "♿");
    assert.equal(c.subtract("⚁", "⚁"), "♿");
    assert.equal(c.subtract("⚃", "⚃"), "♿");
    assert.equal(c.subtract("⚃", "-⚃"), "⚀⚁");
    assert.equal(c.subtract("-⚃", "⚃"), "-⚀⚁");
  });

  it("multiply two dice", () => {
    assert.equal(c.mult("♿", "⚀"), "♿");
    assert.equal(c.mult("⚀", "♿"), "♿");
    assert.equal(c.mult("⚀", "⚀"), "⚀");
    assert.equal(c.mult("⚀", "⚁"), "⚁");
    assert.equal(c.mult("⚁", "⚁"), "⚃");
    assert.equal(c.mult("⚂", "⚁"), "⚅");
    assert.equal(c.mult("⚃", "⚃"), "⚁⚃");
    assert.equal(c.mult("⚃", "-⚃"), "-⚁⚃");
  });

  it("tests heads and tails methods", () => {
    assert.equal(c.head(c.dice(-1)), c.dice(-1), "head 1");
    assert.equal(c.head(c.dice(1)), c.dice(1), "head 1");
    assert.equal(c.tail(c.dice(1)), c.dice(1), "tail 1");
    assert.equal(c.heads(c.dice(1)), "", "heads 1");
    assert.equal(c.tails(c.dice(1)), "", "tails 1");
    assert.equal(c.head(c.dice(10)), c.dice(1), "head 10");
    assert.equal(c.heads(c.dice(10)), c.dice(1), "heads 10");

    for (let i = 1; i <= 50; i++) {
      const die = c.dice(i);
      const head = c.head(die);
      const heads = c.heads(die);
      const tail = c.tail(die);
      const tails = c.tails(die);
      assert.equal(head + tails, die, "head+tails");
      assert.equal(heads + tail, die, "heads+tail");
    }
  });

  it("add 2.0 tests", () => {
    assert.equal(c.add2(c.dice(1), c.dice(1)), c.dice(2), "here we are");

    for (let i = 1; i <= 4000; i++) {
      assert.equal(c.add2(c.dice(i), c.dice(i)), c.dice(2 * i), i + "");
    }
  });

  it("fromDice tests", () => {
    assert.equal(c.fromDice("⚃"), 4);
    assert.equal(c.fromDice("⚁⚃"), 16);
    assert.equal(c.fromDice("-⚁⚃"), -16);
    for (let i = 1; i <= 4000; i++) {
      assert.equal(c.fromDice(c.dice(i)), i, i + "");
    }
  });
});
