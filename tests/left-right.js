import { left, right } from "../index.esm.js";

const tests = [
  [
    "left: 1",
    function (expect) {
      const x = left("pronunciation", 3);

      expect(x).toBe("pro");
    },
  ],
  [
    "left: 2",
    function (expect) {
      const x = left("", 3);

      expect(x).toBe("");
    },
  ],
  [
    "left: 3",
    function (expect) {
      const x = left("pronunciation", 0);

      expect(x).toBe("");
    },
  ],
  [
    "left: 4",
    function (expect) {
      const x = left("", 0);

      expect(x).toBe("");
    },
  ],
  [
    "left: 5",
    function (expect) {
      const x = left("abc", 5);

      expect(x).toBe("abc");
    },
  ],
  [
    "right: 1",
    function (expect) {
      const x = right("pronunciation", 3);

      expect(x).toBe("ion");
    },
  ],
  [
    "right: 2",
    function (expect) {
      const x = right("", 3);

      expect(x).toBe("");
    },
  ],
  [
    "right: 3",
    function (expect) {
      const x = right("pronunciation", 0);

      expect(x).toBe("");
    },
  ],
  [
    "right: 4",
    function (expect) {
      const x = right("", 0);

      expect(x).toBe("");
    },
  ],
  [
    "right: 5",
    function (expect) {
      const x = right("abc", 5);

      expect(x).toBe("abc");
    },
  ]
];

export default tests;
