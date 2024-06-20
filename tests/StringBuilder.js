import { StringBuilder } from "../index.esm.js";

const tests = [
  [
    "StringBuilder",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");

      const length = sb.length;
      const result = sb.toString();

      expect(length).toBe(6);
      expect(result).toBe("a1a2a3");
      expect(sb.length).toBe(0);
    },
  ],
];

export default tests;
