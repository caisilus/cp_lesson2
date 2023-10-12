import { Polynom } from "./polynom"
import { PolynomLexer } from "./polynomLexer"
import { PolynomParser } from "./polynomParser"

class MiniMaple{
  diff(polynomStr, variableName) {
    const lexer = new PolynomLexer(polynomStr) 
    const parser = new PolynomParser(lexer)
    const polynom = parser.parseBy(variableName)
    const power = polynom.power()
    if (power === 0)
      return "0"

    const powers = this.getPowers(power)
    const powersPolynom = new Polynom(variableName, powers)
    const shortened = new Polynom(variableName, polynom.coefs.slice(0, -1))
    return powersPolynom.scalarMultiply(shortened).toString()
  }

  getPowers(power) {
    const powerCoefs = Array(power).fill(0)
    for (let p = 0; p < power; p++) {
      powerCoefs[p] = power - p
    }

    return powerCoefs
  }
}
export {MiniMaple}