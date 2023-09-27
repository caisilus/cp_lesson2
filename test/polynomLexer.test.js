import { PolynomLexer } from "../src/polynomLexer";

describe("polynom lexer class", () => {
  test("supports identifiers", () => {
    const input = "id"
    const lexer = new PolynomLexer(input)
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "identifier", value: "id", position: 0})
  })

  test("supports positive numbers", () => {
    const input = "20"
    const lexer = new PolynomLexer(input)
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "number", value: "20", position: 0})
  })
  
  test("support plus operator", () => {
    const input = "13 + x"
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "plus operator", value: "+", position: 3})
  })
})
