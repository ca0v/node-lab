const chai = require("chai") // for older versions of node

describe("test some assertions", () => {

    it("is equal", () => {
        let x = 1
        chai.assert.deepEqual(1, x, "x should equal 1")
    })

    it("is above", () => {
        let x = 11
        chai.assert.isAbove(x, 10, "x should be more than 10")
    })

    it("is at most", () => {
        let x = 1
        chai.assert.isAtMost(x, 1, "x is no larger than 1")
    })

    it("is true", () => {
        let x = true;
        chai.assert.isTrue(x, "x should be true")
    })

})


describe("math ops", () => {

    it("adds numbers", () => {
        const a = 2
        const b = 12.5
        let x = a * b // change operator to *
        chai.assert.equal(x, 25)
    })

    it("bit ops", () => {
        let a = 5
        let b = 6
        let x = a & b // change operator to &
        chai.assert.equal(x, 4)
    })

    it("subtract numbers", () => {
        const a = 50
        const b = 50
        const x = a - b // change operator to -
        chai.assert.equal(x, 0)
    })

})

describe("string ops", () => {

    const upper = str => str.toUpperCase()
    const len = str => str.length;

    it("upper case", () => {
        chai.assert.equal(upper("cAsE"), "CASE")
    })

    it("length", () => {
        chai.assert.equal(len(""), 0);
        chai.assert.equal(len("00"), 2);
        chai.assert.equal(len("00000"), 5);
    })

    //DAD I DONT WANT TO DO THIS
})