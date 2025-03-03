import { StringBuilder } from "../src";

const tests = [
  [
    "StringBuilder 1: basic",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");

      const length = sb.length;
      const count = sb.count;
      const result = sb.toString();

      expect(count).toBe(3);
      expect(length).toBe(6);
      expect(result).toBe("a1a2a3");
      expect(sb.length).toBe(0);
    },
  ],
  [
    "StringBuilder 2: various items",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append(123);
      sb.append(null);
      sb.append(true);
      sb.append(undefined);
      sb.append([10,20,30]);
      sb.append(new Object());

      const length = sb.length;
      const result = sb.toString();

      expect(length).toBe(32);
      expect(result).toBe("a1123true10,20,30[object Object]");
      expect(sb.length).toBe(0);
    },
  ],
  [
    "StringBuilder 3: removeAt()",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      const i = sb.append("a3");
      sb.append("a4");
      sb.append("a5");
      sb.append("a6");

      expect(sb.count).toBe(6);
      expect(sb.length).toBe(12);

      sb.removeAt(i, 2);

      expect(sb.count).toBe(4);
      expect(sb.length).toBe(8);

      const result = sb.toString();

      expect(i).toBe(2);
      expect(result.length).toBe(8);
      expect(result).toBe("a1a2a5a6");
      expect(sb.length).toBe(0);
    },
  ],
  [
    "StringBuilder 4: multiple removeAt()",
    function (expect) {
      const sb = new StringBuilder(4);

      sb.append("a1");
      sb.append("a2");
      const i = sb.append("a3");
      sb.append("a4");
      sb.append("a5");
      sb.append("a6");

      sb.removeAt(i, 2);

      sb.append("a7");
      sb.append("a8");

      expect(sb.count).toBe(6);
      expect(sb.length).toBe(12);

      const result = sb.toString();

      expect(i).toBe(2);
      expect(result.length).toBe(12);
      expect(result).toBe("a1a2a5a6a7a8");
      expect(sb.length).toBe(0);
    },
  ],
  [
    "StringBuilder 5: removeAt() errors",
    function (expect) {
      const sb = new StringBuilder(3);

      sb.append("a1");
      sb.append("a2");
      const i = sb.append("a3");
      sb.append("a4");
      sb.append("a5");
      sb.append("a6");

      sb.removeAt(i, 2);

      expect(() => sb.removeAt(-1)).toThrow();
      expect(() => sb.removeAt(0, 10)).toThrow();
      expect(() => sb.removeAt(0, 4)).notToThrow();
      expect(sb.count).toBe(0);
      expect(sb.length).toBe(0);
    },
  ],
  [
    "StringBuilder 6: getString(): all",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");

      const result = sb.getString();

      expect(result).toBe("a1a2a3");
      expect(sb.length).toBe(6);
    },
  ],
  [
    "StringBuilder 7: getString(): range",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");
      sb.append("a4");
      sb.append("a5");
      sb.append("a6");
      sb.append("a7");

      const r1 = sb.getString(2);
      const r2 = sb.getString(2, 5);

      expect(r1).toBe("a3a4a5a6a7");
      expect(r2).toBe("a3a4a5");
    },
  ],
  [
    "StringBuilder 8: getString(): range: reverse",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");
      sb.append("a4");
      sb.append("a5");
      sb.append("a6");
      sb.append("a7");

      const r1 = sb.getString(5, 2);
      const r2 = sb.getString(7, 2);
      const r3 = sb.getString(7, 0);

      expect(r1).toBe("a5a4a3");
      expect(r2).toBe("a7a6a5a4a3");
      expect(r3).toBe("a7a6a5a4a3a2a1");
    },
  ],
  [
    "StringBuilder 9: getString(): range error",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");
      sb.append("a4");

      expect(() => sb.getString(-1)).toThrow();
      expect(() => sb.getString(0, -1)).toThrow();
    },
  ],
  [
    "StringBuilder 10: appendAt()",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");
      sb.append("a4");
      
      sb.appendAt(0, "a5");
      sb.appendAt(1, "a6");
      sb.appendAt(sb.count, "a7");

      const result = sb.toString();

      expect(result).toBe("a5a6a1a2a3a4a7");
    },
  ],
  [
    "StringBuilder 10: replaceAt()",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");
      sb.append("a4");
      
      sb.replaceAt(0, "123");
      sb.replaceAt(1, null);

      expect(sb.length).toBe(7);

      const result = sb.toString();

      expect(result).toBe("123a3a4");
    },
  ],
  [
    "StringBuilder 10: clear()",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("a3");

      sb.clear();

      expect(sb.count).toBe(0);
      expect(sb.length).toBe(0);

      sb.append("123");
      sb.append("abc");

      expect(sb.count).toBe(2);
      expect(sb.length).toBe(6);

      const result = sb.toString();

      expect(result).toBe("123abc");
    },
  ],
  [
    "StringBuilder 10: toUpper()",
    function (expect) {
      const sb = new StringBuilder();

      sb.append("a1");
      sb.append("a2");
      sb.append("A3");
      sb.append("A4");
      sb.append("a5");
      sb.append("a6");

      sb.toUpper(0, 1);
      sb.toLower(2, 4);
      sb.toUpper(5, 6);

      expect(sb.itemAt(0)).toBe("A1");
      expect(sb.itemAt(1)).toBe("a2");
      expect(sb.itemAt(sb.count - 1)).toBe("A6");

      const result = sb.toString();

      expect(result).toBe("A1a2a3a4a5A6");
    },
  ],
];

export default tests;
