import { assert } from "chai";
import { describe, it } from "mocha";
import { Calculator } from "../app/Calculator.js";

describe("print die", () => {
  const calculator = new Calculator();
  it("prints 1", () => {
    assert.equal("♿", calculator.dice(0));
    assert.equal("⚀", calculator.dice(1));
    assert.equal("⚁", calculator.dice(2));
    assert.equal("⚂", calculator.dice(3));
    assert.equal("⚃", calculator.dice(4));
    assert.equal("⚄", calculator.dice(5));
    assert.equal("⚅", calculator.dice(6));
    assert.equal("⚀⚀", calculator.dice(7), "dice 7");
    assert.equal("⚀⚅", calculator.dice(12));
    assert.equal("⚅⚅", calculator.dice(42), "dice = 42");
    assert.equal("⚀⚀⚀", calculator.dice(43), "dice = 43");
    assert.equal("⚀⚀⚀⚀", calculator.dice(259), "dice = 304");
    assert.equal(
      "⚁⚀⚅⚅⚁⚂⚃⚁⚄⚀⚀⚁⚀⚃⚄⚀",
      calculator.dice(1111111111111),
      "dice = big"
    );
  });

  it("prints words as dice", () => {
    assert.equal(calculator.stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅");
  });

  it("prints words as dice", () => {
    assert.equal(calculator.stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅");
  });

  it("increments the dice", () => {
    assert.equal(calculator.increment(""), "⚀");
    assert.equal(calculator.increment("⚀"), "⚁");
    assert.equal(calculator.increment("-⚀"), "♿");
    assert.equal(calculator.increment("⚁"), "⚂");
    assert.equal(calculator.increment("⚂"), "⚃");
    assert.equal(calculator.increment("⚃"), "⚄");
    assert.equal(calculator.increment("⚄"), "⚅");
    assert.equal(calculator.increment("⚅"), "⚀⚀");
    assert.equal(calculator.increment("⚀⚀"), "⚀⚁");
    assert.equal(calculator.increment("-⚂"), "-⚁");
  });

  it("decrements the dice", () => {
    assert.equal(calculator.decrement(""), "-⚀");
    assert.equal(calculator.decrement("♿"), "-⚀");
    assert.equal(calculator.decrement("⚀"), "♿");
    assert.equal(calculator.decrement("⚀⚀"), "⚅");
    assert.equal(calculator.decrement("⚁"), "⚀");
    assert.equal(calculator.decrement("⚂"), "⚁");
    assert.equal(calculator.decrement("-⚂"), "-⚃");
    assert.equal(calculator.decrement("--⚂"), "⚁");
    assert.equal(calculator.decrement("------⚂"), "⚁");
    assert.equal(calculator.decrement("-----⚂"), "-⚃");
    assert.equal(calculator.decrement("----⚂"), "⚁");
  });

  it("adds two dice", () => {
    assert.equal(calculator.add("♿", "⚀"), "⚀");
    assert.equal(calculator.add("⚀", "⚀"), "⚁");
    assert.equal(calculator.add("⚁", "⚁"), "⚃");
    assert.equal(calculator.add("⚃", "⚃"), "⚀⚁");
  });

  it("multiply two dice", () => {
    assert.equal(calculator.mult("♿", "⚀"), "♿");
    assert.equal(calculator.mult("⚀", "♿"), "♿");
    assert.equal(calculator.mult("⚀", "⚀"), "⚀");
    assert.equal(calculator.mult("⚀", "⚁"), "⚁");
    assert.equal(calculator.mult("⚁", "⚁"), "⚃");
    assert.equal(calculator.mult("⚂", "⚁"), "⚅");
    assert.equal(calculator.mult("⚃", "⚃"), "⚁⚃");
  });
});
