function normalParseFloat(str) {
  const floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/
  if (floatRegex.test(str)) {
    return parseFloat(str)
  }

  return NaN
}

class Polynom {
  constructor(variable_name, coefs) {
    this.variable_name = variable_name
    this.coefs = coefs
  }

  add(p) {
    if (p.variable_name !== this.variable_name)
      return null

    const addOp = this.operationWithCoefs((x, y) => x + y, this.addStringCoefs)
    const newCoefs = this.arrayBinaryOp(this.coefs, p.coefs, addOp, "begining")
    return new Polynom(this.variable_name, newCoefs)
  }

  addStringCoefs(c1, c2) {
    if (c1 === "0") {
      return c2
    }

    if (c2 === "0") {
      return c1
    }

    return `${c1} + ${c2}`
  }

  arrayBinaryOp(a, b, op, fillAt="begining") {
    let aa = [...a]
    let bb = [...b]

    if (aa.length > bb.length) {
      bb = this.fillArrToLen(bb, aa.length, fillAt)
    }

    if (aa.length < bb.length) {
      aa = this.fillArrToLen(aa, bb.length, fillAt)
    }

    return aa.map((_, i) => op(aa[i], bb[i])) 
  }

  operationWithCoefs(floatOp, strOp) {
    return (c1, c2) => {
      const f1 = normalParseFloat(c1)
      const f2 = normalParseFloat(c2)

      if (!isNaN(f1) && !isNaN(f2)) {
        return floatOp(f1, f2).toString()
      }

      return strOp(c1, c2)
    }
  }

  fillArrToLen(arr, len, fillAt="begining") {
    const missingCount = len - arr.length
    const zeros = Array(missingCount).fill("0")
    return fillAt === "begining" ? zeros.concat(arr) : arr.concat(zeros) 
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