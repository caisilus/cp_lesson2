import {MiniMaple} from "../src/miniMaple";

describe("diff module", () => {
   test("diffs by x for the linear function of x", () => {
      const polynom = "2*x + 3"
      const miniMaple = new MiniMaple()

      const diff = miniMaple.diff(polynom)
      expect(diff).toBe("2")
   })
})