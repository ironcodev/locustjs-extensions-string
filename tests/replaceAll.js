import { replaceAll } from "../index.esm.js";

const tests = [
  [
    "replaceAll",
    function (expect) {
      const str1 = "to be or not to be";
      const str2 = replaceAll(str1, "to", "2");
      const str3 = replaceAll(str1, "To", "2");
      const r1 = "2 be or not 2 be";

      expect(str2).toBe(r1);
      expect(str3).toBe(str1);
    },
  ],
];

export default tests;
