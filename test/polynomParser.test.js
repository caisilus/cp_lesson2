import {PolynomParser} from "../src/polynomParser";
import {PolynomLexer} from "../src/polynomLexer";
import { Polynom } from "../src/polynom";

describe("polynom parser class", () => {
  test("supports linear polynoms with +", () => {
    const polynomStr = "2*x + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["2", "3"])
    expect(polynom).toEqual(resultPolynom)
  })
  
  test("supports linear polynom with plus in reverse", () => {
    const polynomStr = "3 + 2*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["2", "3"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("supports linear polynom with minus at the end", () => {
    const polynomStr = "3 - 2*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["-2", "3"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("supports linear polynom with minus in the middle", () => {
    const polynomStr = "3 - 2*x + 2"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["-2", "5"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("supports polynom with unary minus in the first term", () => {
    const polynomStr = "-2*x + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["-2", "3"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("supports polynom with unary minus in the middle term", () => {
    const polynomStr = "2*x + -2 + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["2", "1"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("supports non-linear polynom", () => {
    const polynomStr = "2*x^2 - 3*x + 4"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    const resultPolynom = new Polynom("x", ["2", "-3", "4"])
    expect(polynom).toEqual(resultPolynom)
  })

  test("returns null for string with unexpected token in first term", () => {
    const polynomStr = "3 * @ - 4 "
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  })

  test("returns null for string with unexpected token in first term", () => {
    const polynomStr = "24 + @*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  })

  test("returns null for string with unexpected + operator", () => {
    const polynomStr = "24 + + 2 * x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  })

  test("returns null for string with missing operator", () => {
    const polynomStr = "24 x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  }) 

  test("returns null for string with variable in power index", () => {
    const polynomStr = "x^y + 4"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  }) 

  test("returns null for string with missing operand for operator", () => {
    const polynomStr = "2*x^2 - "
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy("x")
    expect(polynom).toBe(null)
  })

  test("supports polynoms with multiple variables", () => {
    const polynomStr = "x^2 + 2*x*y - y^3"
    let lexer = new PolynomLexer(polynomStr) 
    let parser = new PolynomParser(lexer)

    let polynom = parser.parseBy("x")
    let resultPolynom = new Polynom("x", ["1", "2 * y", "-1 * y^3"])
    expect(polynom).toEqual(resultPolynom)

    lexer = new PolynomLexer(polynomStr)
    parser = new PolynomParser(lexer)

    polynom = parser.parseBy("y")
    resultPolynom = new Polynom("y", ["-1", "0", "2 * x", "x^2"])
    expect(polynom).toEqual(resultPolynom)
  })
})