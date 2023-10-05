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
})