import { ltrim, rtrim } from "../index.esm.js";

const tests = [
  [
    "ltrim: 1",
    function (expect) {
      const str1 = "  hello";
      const str2 = ltrim(str1);
      const r1 = "hello";

      expect(str2).toBe(r1);
    },
  ],
  [
    "ltrim: 2",
    function (expect) {
      const str1 = "  hello ";
      const str2 = ltrim(str1);
      const r1 = "hello ";

      expect(str2).toBe(r1);
    },
  ],
  [
    "rtrim: 1",
    function (expect) {
      const str1 = "hello  ";
      const str2 = rtrim(str1);
      const r1 = "hello";

      expect(str2).toBe(r1);
    },
  ],
  [
    "rtrim: 2",
    function (expect) {
      const str1 = " hello  ";
      const str2 = rtrim(str1);
      const r1 = " hello";

      expect(str2).toBe(r1);
    },
  ],
];

export default tests;
