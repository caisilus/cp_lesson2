function isDigit(c) {
  return /\d/.test(c)
}

function isLetter(c) {
  return /[a-z]/.test(c)
}

class PolynomLexer {
  constructor(input) {
    this.input = input
    this.currentIndex = 0
  }
  
  nextLexem() {
    this.skipDummy()

    const numberToken = this.getNumber()
    if (numberToken !== null) {
      return numberToken
    }

    const identifier = this.getIdentifier()
    if (identifier !== null) {
      return identifier
    }

    const operation = this.getOperation()
    if (operation !== null) {
      return operation
    }

    return null
  }

  skipDummy() {
    while (this.currentChar().trim().length === 0) {
      this.nextChar()
    }
  }

  getNumber() {
    const startingIndex = this.currentIndex

    const number = this.takeWhile((c) => isDigit(c))

    if (this.currentIndex === startingIndex) {
      return null
    }

    return {
      type: "number",
      position: startingIndex,
      value: number
    }
  }
 
  getIdentifier() {
    const startingIndex = this.currentIndex

    const id = this.takeWhile((c) => isLetter(c))
    
    if (id == null) {
      return null
    }
    
    return {
      type: "identifier",
      position: startingIndex,
      value: id 
    }
  }
  getOperation() {
    switch (this.currentChar()) {
      case "+": return {
        type: "plus operator", 
        position: this.currentIndex++,
        value: "+"
      } 
      default: return null
    }
  }

  takeWhile(condition) {
    const startingIndex = this.currentIndex

    const cond = !this.inputEnded() && condition(this.currentChar())
    const test = this
    while (!this.inputEnded() && condition(this.currentChar())) {
      this.nextChar()
    } 

    const slice = this.input.slice(startingIndex, this.currentIndex)

    return slice.length > 0 ? slice : null
  }

  inputEnded() {
    return this.currentIndex === this.input.length
  }
  
  currentChar() {
    if (this.inputEnded()) {
      return null
    }

    return this.input[this.currentIndex]
  }
  
  nextChar() {
    if (this.inputEnded()) {
      return null
    }

    return this.input[++this.currentIndex]
  }
}

export {PolynomLexer}