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
      expect(diff).toBe("6*x^2 - 3")
   })

   test("diffs by x for non-linear function of x with multiple inclusions of the same power", () => {
      const polynom = "2*x^3 - x^3 - 3*x + 4"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom, "x")
      expect(diff).toBe("3*x^2 - 3")
   })
})