import {PolynomParser} from "../src/polynomParser";
import {PolynomLexer} from "../src/polynomLexer";

describe("polynom parser class", () => {
  test("supports linear polynoms with +", () => {
    const polynomStr = "2*x + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["2", "3"])
  })
  
  test("supports linear polynom with plus in reverse", () => {
    const polynomStr = "3 + 2*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["2", "3"])
  })

  test("supports linear polynom with minus at the end", () => {
    const polynomStr = "3 - 2*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["-2", "3"])
  })

  test("supports linear polynom with minus in the middle", () => {
    const polynomStr = "3 - 2*x + 2"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["-2", "5"])
  })

  test("supports polynom with unary minus in the first term", () => {
    const polynomStr = "-2*x + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["-2", "3"])
  })

  test("supports polynom with unary minus in the middle term", () => {
    const polynomStr = "2*x + -2 + 3"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["2", "1"])
  })

  test("supports non-linear polynom", () => {
    const polynomStr = "2*x^2 - 3*x + 4"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toEqual(["2", "-3", "4"])
  })

  test("returns null for string with unexpected token in first term", () => {
    const polynomStr = "3 * @ - 4 "
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  })

  test("returns null for string with unexpected token in first term", () => {
    const polynomStr = "24 + @*x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  })

  test("returns null for string with unexpected + operator", () => {
    const polynomStr = "24 + + 2 * x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  })

  test("returns null for string with missing operator", () => {
    const polynomStr = "24 x"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  }) 

  test("returns null for string with variable in power index", () => {
    const polynomStr = "x^y + 4"
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  }) 

  test("returns null for string with missing operand for operator", () => {
    const polynomStr = "2*x^2 - "
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const coefs = parser.parseBy("x")
    expect(coefs).toBe(null)
  })
})