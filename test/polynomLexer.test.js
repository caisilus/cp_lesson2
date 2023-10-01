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

  test("supports minus operator", () => {
    const input = "y + x - 24"
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    lexer.nextLexem()
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "minus operator", value: "-", position: 6})
  })

  test("supports power operator", () => {
    const input = "3 + x^5"
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    lexer.nextLexem()
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "power operator", value: "^", position: 5})
  })

  test("supports star operator", () => {
    const input = "3*z + 4"
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "star operator", value: "*", position: 1})
  })

  test("supports end of file", () => {
    const input = "3 + x"
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    lexer.nextLexem()
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "end of file", value: null, position: 5})
  })
  
  test("supports trimming at end of file", () => {
    const input = "3 + x  "
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    lexer.nextLexem()
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "end of file", value: null, position: 7})
  })

  test("returns error token for unsupported input", () => {
    const input = "3 ' x  "
    const lexer = new PolynomLexer(input)
    lexer.nextLexem()
    const lexem = lexer.nextLexem()

    expect(lexem).toEqual({type: "error", value: "unexpected symbol '", position: 2})
  })
})
