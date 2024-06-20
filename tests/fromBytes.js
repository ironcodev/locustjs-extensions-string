import { toBytes, fromBytes } from "../index.esm.js";

const tests = [
  [
    "fromBytes (fa)",
    function (expect) {
      const text = "سلام";
      const x = toBytes(text);
      const y = fromBytes(x);

      expect(y).toBeDefined();
      expect(y).toBe(text);
    },
  ],
  [
    "fromBytes (en)",
    function (expect) {
      const text = "hi";
      const x = toBytes(text);
      const y = fromBytes(x);

      expect(y).toBeDefined();
      expect(y).toBe(text);
    },
  ],
];

export default tests;
