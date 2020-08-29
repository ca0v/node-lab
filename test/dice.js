var assert = require("chai").assert;

function strip(value) {
    if (value == "-_") return "_"
    return (value.substring(0, 2) === "--") ? value.substring(2) : value;
}

function asCode(tail) {
    return tail.charCodeAt(0) - "♿".charCodeAt(0)
}

function increment(value) {
    if (value == "_") return "⚀"
    if (value == "") return "⚀"
    if (value[0] == "-") return strip("-" + decrement(value.substring(1)));
    const head = value.substring(0, value.length - 1)
    const tail = value.substring(value.length - 1)
    if (tail == "⚅") return increment(head) + "⚀"
    return head + dice(1 + asCode(tail))
}

function decrement(value) {
    if (value == "⚀") return "_"
    if (value == "") return "-⚀"
    if (value == "_") return "-⚀"
    if (value[0] == "-") return strip("-" + increment(value.substring(1)));

    const head = value.substring(0, value.length - 1)
    const tail = value.substring(value.length - 1)
    if (tail == "⚀") return decrement(head) + "⚅"
    return head + dice(asCode(tail) - 1)
}

function dice(value) {
    if (0 == value) return "_";
    const ones = 1 + (value - 1) % 6
    const six = (value - ones) / 6
    return (six ? dice(six) : "") + String.fromCharCode(ones + 9855)
}

function stringToDice(name) {
    return name.split("")
        .map(l => 1 + l.charCodeAt(0) - "A".charCodeAt(0))
        .map(l => dice(l)).join(".")
}

describe("print die", () => {
    it("prints 1", () => {
        assert.equal("_", dice(0))
        assert.equal("⚀", dice(1))
        assert.equal("⚁", dice(2))
        assert.equal("⚂", dice(3))
        assert.equal("⚃", dice(4))
        assert.equal("⚄", dice(5))
        assert.equal("⚅", dice(6))
        assert.equal("⚀⚀", dice(7), "dice 7")
        assert.equal("⚀⚅", dice(12))
        assert.equal("⚅⚅", dice(42), "dice = 42")
        assert.equal("⚀⚀⚀", dice(43), "dice = 43")
        assert.equal("⚀⚀⚀⚀", dice(259), "dice = 304")
        assert.equal("⚁⚀⚅⚅⚁⚂⚃⚁⚄⚀⚀⚁⚀⚃⚄⚀", dice(1111111111111), "dice = big")

    })

    it("prints words as dice", () => {
        assert.equal(stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅")
    })

    it("prints words as dice", () => {
        assert.equal(stringToDice("DANIEL"), "⚃.⚀.⚁⚁.⚀⚂.⚄.⚀⚅")
    })

    it("increments the dice", () => {
        assert.equal(increment(""), "⚀")
        assert.equal(increment("⚀"), "⚁")
        assert.equal(increment("-⚀"), "_")
        assert.equal(increment("⚁"), "⚂")
        assert.equal(increment("⚂"), "⚃")
        assert.equal(increment("⚃"), "⚄")
        assert.equal(increment("⚄"), "⚅")
        assert.equal(increment("⚅"), "⚀⚀")
        assert.equal(increment("⚀⚀"), "⚀⚁")
        assert.equal(increment("-⚂"), "-⚁")
    })

    it("decrements the dice", () => {
        assert.equal(decrement(""), "-⚀")
        assert.equal(decrement("_"), "-⚀")
        assert.equal(decrement("⚀"), "_")
        assert.equal(decrement("⚁"), "⚀")
        assert.equal(decrement("⚂"), "⚁")
        assert.equal(decrement("-⚂"), "-⚃")
        assert.equal(decrement("--⚂"), "⚁")
        assert.equal(decrement("------⚂"), "⚁")
        assert.equal(decrement("-----⚂"), "-⚃")
        assert.equal(decrement("----⚂"), "⚁")
    })
})