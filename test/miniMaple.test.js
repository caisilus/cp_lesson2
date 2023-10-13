import {MiniMaple} from "../src/miniMaple";

describe("diff module", () => {
   test("diffs by x for the linear function of x", () => {
      const polynom = "2*x + 3"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("2")
   })

   test("diffs by x for non-linear function of x", () => {
      const polynom = "2*x^3 - 3*x + 4"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("6 * x^2 - 3")
   })

   test("diffs by x for non-linear function of x with multiple inclusions of the same power", () => {
      const polynom = "2*x^3 - x^3 - 3*x + 4"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("3 * x^2 - 3")
   })

   test("diffs by x for constant", () => {
      const polynom = "3*c"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("0")
   })

   test("diffs by x for polynom with both x and y", () => {
      const polynom = "3 * x^3 + 9 * x * y - 4 * x^2 + 2*y"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("9 * x^2 - 8 * x + 9 * y")
   })

   test("returns null for incorrect polynom", () => {
      const polynom = "3x + @"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe(null)
   })
})