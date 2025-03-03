import { reverse } from "../src";

const tests = [
  [
    "reverse",
    function (expect) {
      const str1 = "hello";
      const str2 = reverse(str1);
      const r1 = "olleh";

      expect(str2).toBe(r1);
    },
  ],
];

export default tests;
