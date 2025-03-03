import { isArray } from "@locustjs/base";
import { toArray } from "../src";

const tests = [
  [
    "toArray",
    function (expect) {
      const x = toArray("abc");

      expect(x).toBeDefined();
      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe(97);
      expect(x[1]).toBe(98);
      expect(x[2]).toBe(99);
    },
  ],
];

export default tests;
