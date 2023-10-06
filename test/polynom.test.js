import {Polynom} from "../src/polynom"

describe("polynom comparasion", () => {
  test("polynoms with equal coefs and equal variable are equal", () => {
    const p1 = new Polynom("x", ["1", "2", "-1"])
    const p2 = new Polynom("x", ["1", "2", "-1"])

    expect(p1).toEqual(p2)
  })

  test("polynoms on different variables are not equal", () => {
    const p1 = new Polynom("x", ["1", "2", "-1"])
    const p2 = new Polynom("y", ["1", "2", "-1"])

    expect(p1).not.toEqual(p2)
  })

  test("polynoms with differen coefs are not equal", () => {
    const p1 = new Polynom("x", ["1", "2", "-1"])
    const p2 = new Polynom("x", ["-1", "2", "-1"])

    expect(p1).not.toEqual(p2)
  })
})

describe("polynom toString", () => {
  test("polynom with the power of 0", () => {
    const p = new Polynom("x", ["4"])

    expect(p.toString()).toEqual("4")
  })

  test("polynom with the positive power and coefs", () => {
    const p = new Polynom("x", ["2", "3", "27"])

    expect(p.toString()).toEqual("2*x^2 + 3*x + 27")
  })

  test("polynom with the negative coefs", () => {
    const p = new Polynom("x", ["-2", "3", "-27"])

    expect(p.toString()).toEqual("-2*x^2 + 3*x - 27")
  })

  test("polyom with zero coef in the middle", () => {
    const p = new Polynom("x", ["2", "0", "3", "-27"])

    expect(p.toString()).toEqual("2*x^3 + 3*x - 27")
  })

  test("polynom with coef of 1", () => {
    const p = new Polynom("x", ["1", "0", "3", "-1"])

    expect(p.toString()).toEqual("x^3 + 3*x - 1")
  })
})

describe("polynom class plus operator", () => {
  test("supports number coefs", () => {
    const p1 = new Polynom(["1", "2", "1"])
    const p2 = new Polynom(["3", "0"])

    expect((p1 + p2).coefs).toEqual(["1", "5", "1"])
  })

  test("supports variable coefs", () => {
    const p1 = new Polynom(["y", "c*d"])
    const p2 = new Polynom(["y"])

    expect((p1 + p2).coefs).toEqual(["y", "c*d + y"])
  })
})