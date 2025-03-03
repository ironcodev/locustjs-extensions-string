import { toBytes } from "../src";

const tests = [
  [
    "toBytes (fa)",
    function (expect) {
      const x = toBytes("سلام");

      expect(x).toBeDefined();
      expect(x instanceof Uint8Array).toBeTruthy();
      expect(x.length).toBe(8);
    },
  ],
  [
    "toBytes (en)",
    function (expect) {
      const x = toBytes("hi");

      expect(x).toBeDefined();
      expect(x instanceof Uint8Array).toBeTruthy();
      expect(x.length).toBe(2);
    },
  ],
];

export default tests;