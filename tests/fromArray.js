import { isSomeString } from "@locustjs/base";
import { fromArray } from "../index.esm.js";

const tests = [
  [
    "fromArray",
    function (expect) {
      const x = fromArray([97, 98, 99]);

      expect(x).toBeDefined();
      expect(isSomeString(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x).toBe("abc");
    },
  ],
];

export default tests;
