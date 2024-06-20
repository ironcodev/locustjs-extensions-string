import { isArray } from "@locustjs/base";
import { SplitOptions, xsplit } from "../index.esm.js";

const tests = [
  [
    "xsplit: 1 (use string transforms)",
    function (expect) {
      const x = xsplit("Red, Green,  ,\t, Blue,,", ",", "trim,lower,free");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "xsplit: 2 (use multi-string transforms)",
    function (expect) {
      const x = xsplit(
        "Red, Green,  ,\t, Blue,,",
        ",",
        "trim",
        "lower",
        "free"
      );

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "xsplit: 3 (use array transforms)",
    function (expect) {
      const x = xsplit("Red, Green,  ,\t, Blue,,", ",", [
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
    "xsplit: 4 (use shortcut string transforms)",
    function (expect) {
      const x = xsplit("Red, Green,  ,\t, Blue,,", ",", "t,l,f");

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
  [
    "xsplit: 1 (use enum transforms)",
    function (expect) {
      const x = xsplit("Red, Green,  ,\t, Blue,,", ",", SplitOptions.trimToLowerAndRemoveEmpties);

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(3);
      expect(x[0]).toBe("red");
      expect(x[1]).toBe("green");
      expect(x[2]).toBe("blue");
    },
  ],
];

export default tests;
