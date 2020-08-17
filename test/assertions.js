const chai = require("chai") // for older versions of node

describe("test some assertions", () => {

    it("is equal", () => {
        let x = "1"
        chai.assert.deepEqual(1, x, "x should equal 1")
    })

    it("is above", () => {
        let x = 1
        chai.assert.isAbove(x, 10, "x should be more than 10")
    })

    it("is at most", () => {
        let x = x10
        chai.assert.isAtMost(1, x, "x is no larger than 1")
    })

    it("is true", () => {
        let x = false | true;
        chai.assert.isTrue(x, "x should be true")
    })

})
