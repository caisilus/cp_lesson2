function arrayBinaryOp(a, b, op, fillFunc = fillArrToLenAtBegining) {
  let aa = [...a]
  let bb = [...b]

  if (aa.length > bb.length) {
    bb = fillFunc(bb, aa.length)
  }
  if (aa.length < bb.length) {
    aa = fillFunc(aa, bb.length)
  }

  return aa.map((_, i) => op(aa[i], bb[i])) 
}

function applyOpToCoefs(floatOp, strOp) {
  return (c1, c2) => {
    const f1 = parseFloat(c1)
    const f2 = parseFloat(c2)

    if (!isNaN(f1) && !isNaN(f2)) {
      return floatOp(f1, f2).toString()
    }

    return strOp(c1, c2)
  }
}

function fillArrToLen(arr, len, fillIn="start") {
  const missingCount = len - arr.length
  const zeros = Array(missingCount).fill(0)
  return fillIn === "start" ? zeros.concat(arr) : arr.concat(zeros) 
}

class PolynomParser {
  constructor(polynomLexer) {
    this.lexer = polynomLexer
  }

  parseBy(variableName) {
    const left = this.parseTerm(variableName) 
    if (left == null) {
      return null
    }

    const lexem = this.lexer.nextLexem()
    if (lexem.type == "end of file") {
      return left
    }

    if (!this.correctTermOperator(lexem)) {
      return null
    }

    const operationFunc = applyOpToCoefs((f1, f2) => f1 + f2, (c1, c2) => `${c1} + ${c2}`)
    if (lexem.value === "-") {
      operationFunc = applyOpToCoefs((f1, f2) => f1 - f2, (c1, c2) => `${c1} - ${c2}`)
    }

    const right = this.parseBy(variableName)
    if (right == null) {
      return null
    }

    return arrayBinaryOp(left, right, operationFunc, fillArrToLen)
  }

  correctTermOperator(lexem) {
    return lexem !== null && (lexem.type !== "plus operator" || lexem.type !== "minus operator") 
  }

  parseTerm(variableName) {
    const left = this.parseFactor(variableName)
    if (left === null) {
      return null
    }

    const operationLexem = this.lexer.peekLexem()
    if (operationLexem.type !== "star operator") {
      return left
    }

    this.lexer.nextLexem()

    const operationFunc = applyOpToCoefs((f1, f2) => f1 * f2, (c1, c2) => `${c1} * ${c2}`) 
    const right = this.parseTerm(variableName)
    if (right === null) {
      return null
    }

    return arrayBinaryOp(left, right, operationFunc, (a, n) => fillArrToLen(a, n, "end"))
  }

  parseFactor(variableName) {
    const firstLexem = this.lexer.nextLexem()
    if (!this.isFactor(firstLexem)) {
      return null
    }

    if (firstLexem.type === "identifier") {
      return this.parseIdentifier(firstLexem, variableName)
    }

    if (firstLexem.type === "number") {
      return this.parseNumber(firstLexem)
    }

    return null
  }

  parseIdentifier(firstLexem, variableName) {
    if (firstLexem.value !== variableName) {
      return [firstLexem.value]
    }

    const nextLexem = this.lexer.peekLexem()
    if (nextLexem.type !== "power operator") {
      return firstLexem.value == variableName ? [1,0] : [firstLexem.value] 
    }

    this.lexer.nextLexem()
    const powerIndexLexem = this.lexer.nextLexem()
    if (powerIndexLexem === null || powerIndexLexem.type !== "number") {
      return null
    }    
    const powerIndex = parseFloat(powerIndexLexem.value) 
    
    const resultArray = Array(powerIndex + 1).fill(0)
    resultArray[0] = firstLexem.value

    return resultArray
  }

  parseNumber(lexem) {
    if (lexem.type !== "number") {
      return null
    }

    return [lexem.value]
  }

  isFactor(token) {
    return token !== null && (token.type === "identifier" || token.type === "number")
  }
}

export {PolynomParser}