var assert = require("chai").assert;

describe("bits", () => {

    const f = value => value
        .split("")
        .map(v => v.charCodeAt(0) + 1)
        .map(v => v ^ (8 + 4 + 1))
        .map((v, i) => v ^ (32 * (i % 2)))
        .map(v => String.fromCharCode(v))
        .reverse()
        .join("")

    it("PASSWORD MAKER", () => {
        assert.equal(f("alix"), "Tg@o")
        assert.equal(f("daniel"), "@kGbOh")
    })

})

describe("temperature converter", () => {

    const f = value => (value - 32) * 5 / 9

    it("converts to celcius from farenheit", () => {
        assert.equal(f(32), 0, 'freezing')
        assert.equal(f(212), 100, 'boiling')
        assert.equal(Math.round(f(120)), 49, 'bath')
    })

})

describe("temperature converter", () => {

    const f = value => (value * 9 / 5) + 32

    it("converts to farenheit celcius", () => {
        assert.equal(f(0), 32, 'freezing')
        assert.equal(f(100), 212, 'boiling')
        assert.equal(Math.round(f(49)), 120, 'bath')
    })

})