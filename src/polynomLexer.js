function isNumber(str) {
  return str.match(/\d+/) !== null
}

class PolynomLexer {
  constructor(input) {
    this.input = input
    this.currentIndex = 0
  }
  
  nextLexem() {
    const numberToken = this.getNumber()
    if (numberToken !== null) {
      return numberToken
    }
  }

  getNumber() {
    const startingIndex = this.currentIndex

    while (!this.inputEnded() && isNumber(this.currentChar())) {
      this.nextChar()
    } 

    if (this.currentIndex == startingIndex) {
      return null
    }

    return {
      type: "number",
      position: startingIndex,
      value: this.input.slice(startingIndex, this.currentIndex)
    }
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