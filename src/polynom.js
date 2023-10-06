class Polynom {
  constructor(variable_name, coefs) {
    this.variable_name = variable_name
    this.coefs = coefs
  }

  toString() {
    if (!this.coefs) {
      return ""
    }

    return this.coefs.map(((coef, i) => {
      const p = this.coefs.length - i - 1 
      const termStr = this.termString(coef, p)
      if (i === 0 || termStr === "") 
        return termStr 

      return termStr[0] === '-' ? " - " + termStr.slice(1) : " + " + termStr
    }).bind(this)).join("") 
  }

  termString(coef, power) {
    if (coef === "0") {
      return ""
    }

    if (power === 0){
      return coef
    }

    let coefStr = coef + "*"
    if (coef === "1") {
      coefStr = ""
    }

    if (power === 1) {
      return coefStr + this.variable_name
    }

    return `${coefStr}${this.variable_name}^${power}`
  }
}

export {Polynom}