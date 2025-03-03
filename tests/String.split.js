import { isArray } from "@locustjs/base";
import { configureStringExtensions, SplitOptions } from "../src";

configureStringExtensions("split");

const tests = [
  [
    "String.prototype.split: 1 (use string transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(7);
    },
  ],
  [
    "String.prototype.split: 1 (use string transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",", "trim,lower,free");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "String.prototype.split: 2 (use multi-string transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",", "trim", "lower", "free");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "String.prototype.split: 3 (use array transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",", [
        "trim",
        "lower",
        "free",
      ]);

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "String.prototype.split: 4 (use shortcut string transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",", "t,l,f");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "String.prototype.split: 1 (use enum transforms)",
    function (expect) {
      const x = "Red, Green,  ,\t, Blue,,".split(",", [SplitOptions.trimToLowerAndRemoveEmpties]);

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
];

export default tests;
