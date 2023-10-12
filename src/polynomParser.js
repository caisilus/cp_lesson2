import { Polynom } from "./polynom"

class PolynomParser {
  constructor(polynomLexer) {
    this.lexer = polynomLexer
  }

  parseBy(variableName) {
    const left = this.parseTerm(variableName) 
    if (left == null) {
      return null
    }

    const lexem = this.lexer.peekLexem()
    if (lexem.type == "end of file") {
      return left
    }

    if (!this.correctTermOperator(lexem)) {
      return null
    }

    if (lexem.value === "+") {
      this.lexer.nextLexem()
    }

    const right = this.parseBy(variableName)
    if (right == null) {
      return null
    }

    return left.add(right)
  }

  correctTermOperator(lexem) {
    return lexem !== null && (lexem.type === "plus operator" || lexem.type === "minus operator") 
  }

  parseTerm(variableName) {
    const firstLexem = this.lexer.peekLexem()

    if (firstLexem.type == "minus operator") {
      this.lexer.nextLexem()
      const term = this.parseTerm(variableName)

      if (term === null) {
        return null
      }

      return term.muliplyFirstByCoef("-1")
    }

    const left = this.parseFactor(variableName)
    if (left === null) {
      return null
    }

    const operationLexem = this.lexer.peekLexem()
    if (operationLexem.type !== "star operator") {
      return left
    }

    this.lexer.nextLexem()

    const right = this.parseTerm(variableName)
    if (right === null) {
      return null
    }

    let coef = null
    let polynom = null
    if (left.coefs.length === 1) {
      coef = left.coefs[0]
      polynom = right
    }
    else {
      coef = right.coefs[0]
      polynom = left
    }
    return polynom.muliplyFirstByCoef(coef)
  }

  parseFactor(variableName) {
    const firstLexem = this.lexer.nextLexem()
    if (!this.isFactor(firstLexem)) {
      return null
    }

    if (firstLexem.type === "identifier") {
      return this.parseIdentifier(firstLexem, variableName)
    }

    return this.parseNumber(firstLexem, variableName)
  }

  parseIdentifier(firstLexem, variableName) {
    const nextLexem = this.lexer.peekLexem()
    if (nextLexem.type !== "power operator") {
      if (firstLexem.value === variableName) {
        return new Polynom(variableName, ["1", "0"]) 
      }
      return new Polynom(variableName, [firstLexem.value])
    }

    this.lexer.nextLexem()
    const powerIndexLexem = this.lexer.nextLexem()
    if (powerIndexLexem === null || powerIndexLexem.type !== "number") {
      return null
    }    

    if (firstLexem.value !== variableName) {
      return new Polynom(variableName, [`${firstLexem.value}^${powerIndexLexem.value}`])
    }

    const powerIndex = parseFloat(powerIndexLexem.value) 
    
    const resultArray = Array(powerIndex + 1).fill("0")
    resultArray[0] = "1"

    return new Polynom(variableName, resultArray)
  }

  parseNumber(lexem, variableName) {
    return new Polynom(variableName, [lexem.value])
  }

  isFactor(token) {
    return token !== null && (token.type === "identifier" || token.type === "number")
  }
}

export {PolynomParser}