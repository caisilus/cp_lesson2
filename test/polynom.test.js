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

describe("polynom sum", () => {
  test("supports number coefs", () => {
    const p1 = new Polynom("x", ["1", "2", "1"])
    const p2 = new Polynom("x", ["3", "0"])

    const sum = p1.add(p2) 
    const actualSum = new Polynom("x", ["1", "5", "1"])

    expect(sum).toEqual(actualSum)
  })

  test("supports variable coefs", () => {
    const p1 = new Polynom("x", ["y", "c*d"])
    const p2 = new Polynom("x", ["y"])

    const sum = p1.add(p2) 
    const actualSum = new Polynom("x", ["y", "c*d + y"])

    expect(sum).toEqual(actualSum)
  })

  test("supports coefs with both numbers and variables", () => {
    const p1 = new Polynom("x", ["2*y", "5*c*d"])
    const p2 = new Polynom("x", ["y", "0"])

    const sum = p1.add(p2) 
    const actualSum = new Polynom("x", ["2*y + y", "5*c*d"])

    expect(sum).toEqual(actualSum)
  })
})