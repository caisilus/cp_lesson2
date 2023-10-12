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

    expect(p.toString()).toEqual("2 * x^2 + 3 * x + 27")
  })

  test("polynom with the negative coefs", () => {
    const p = new Polynom("x", ["-2", "3", "-27"])

    expect(p.toString()).toEqual("-2 * x^2 + 3 * x - 27")
  })

  test("polyom with zero coef in the middle", () => {
    const p = new Polynom("x", ["2", "0", "3", "-27"])

    expect(p.toString()).toEqual("2 * x^3 + 3 * x - 27")
  })

  test("polynom with coef of 1", () => {
    const p = new Polynom("x", ["1", "0", "3", "-1"])

    expect(p.toString()).toEqual("x^3 + 3 * x - 1")
  })

  test("returns empty string for polynom with no coefs", () => {
    const p = new Polynom("x", [])

    expect(p.toString()).toEqual("")
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

  test("doesn't support polynoms with different variable", () => {
    const p1 = new Polynom("x", ["2*y", "5*c*d"])
    const p2 = new Polynom("y", ["y", "0"])

    const sum = p1.add(p2) 
    expect(sum).toBe(null)
  })
})

describe("polynom first coef multiplication with coef", () => {
  test("supports numerical coefs", () => {
    const p = new Polynom("x", ["11", "0", "1", "2"])
    const coef = "2"

    const result = p.muliplyFirstByCoef(coef)
    const actualResult = new Polynom("x", ["22", "0", "1", "2"])
    expect(result).toEqual(actualResult)
  })

  test("supports variable coefs", () => {
    const p = new Polynom("x", ["y", "0", "1", "2"])
    const coef = "y"

    const result = p.muliplyFirstByCoef(coef)
    const actualResult = new Polynom("x", ["y * y", "0", "1", "2"])
    expect(result).toEqual(actualResult)
  })

  test("supports both numerical and variable coefs", () => {
    const p = new Polynom("x", ["2 * y", "0", "1", "2"])
    const coef = "3 * c"

    const result = p.muliplyFirstByCoef(coef)
    const actualResult = new Polynom("x", ["3 * c * 2 * y", "0", "1", "2"])
    expect(result).toEqual(actualResult)
  })

  test("supports zero coefs", () => {
    const p = new Polynom("x", ["2 * y", "0", "1", "2"])
    const coef = "0"

    const result = p.muliplyFirstByCoef(coef)
    const actualResult = new Polynom("x", ["1", "2"])
    expect(result).toEqual(actualResult)
  })
})

describe("polynom power method", () => {
  test("returns power index for linear polynom", () => {
    const polynom = new Polynom("x", ["2", "-4"])
    expect(polynom.power()).toBe(1)
  })

  test("returns power index for constant polynom", () => {
    const polynom = new Polynom("x", ["4 * c"])
    expect(polynom.power()).toBe(0)
  })

  test("returns power index for polynom with high power", () => {
    const polynom = new Polynom("x", ["4 * y", "0", "-3", "7 * c"])
    expect(polynom.power()).toBe(3)
  })
})

describe("polynom scalar multiplication", () => {
  test("supports numerical coefs", () => {
    const p1 = new Polynom("x", ["11", "0", "1", "2"])
    const p2 = new Polynom("x", ["2", "0", "3", "4"])

    const result = p1.scalarMultiply(p2)
    const actualResult = new Polynom("x", ["22", "0", "3", "8"])
    expect(result).toEqual(actualResult)
  })

  test("supports variable coefs", () => {
    const p1 = new Polynom("x", ["y", "c"])
    const p2 = new Polynom("x", ["c", "z"])

    const result = p1.scalarMultiply(p2)
    const actualResult = new Polynom("x", ["y * c", "c * z"])
    expect(result).toEqual(actualResult)
  })

  test("supports both numerical and variable coefs", () => {
    const p1 = new Polynom("x", ["3", "2 * c", "z"])
    const p2 = new Polynom("x", ["2", "y", "4"])

    const result = p1.scalarMultiply(p2)
    const actualResult = new Polynom("x", ["6", "2 * c * y", "z * 4"])
    expect(result).toEqual(actualResult)
  })

  test("supports zero coefs", () => {
    const p1 = new Polynom("x", ["3", "0", "z"])
    const p2 = new Polynom("x", ["2", "y", "4"])

    const result = p1.scalarMultiply(p2)
    const actualResult = new Polynom("x", ["6", "0", "z * 4"])
    expect(result).toEqual(actualResult)
  })

  test("doesn't support polynoms with different variable", () => {
    const p1 = new Polynom("x", ["3", "2 * c", "z"])
    const p2 = new Polynom("z", ["2", "y", "4"])

    const result = p1.scalarMultiply(p2)
    expect(result).toBe(null)
  })

  test("doesn't support polynoms with different powers", () => {
    const p1 = new Polynom("x", ["3", "2 * c", "z"])
    const p2 = new Polynom("x", ["y", "4"])

    const result = p1.scalarMultiply(p2)
    expect(result).toBe(null)
  })
})