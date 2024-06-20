import { pascalCase, camelCase, changeCase, capitalize } from "../index.esm.js";

const tests = [
  [
    "pascalCase",
    function (expect) {
      const x = pascalCase("hello world");

      expect(x).toBeDefined().toBe('HelloWorld');
    },
  ],
  [
    "camelCase",
    function (expect) {
      const x = camelCase("hello world");

      expect(x).toBeDefined().toBe('helloWorld');
    },
  ],
  [
    "changeCase",
    function (expect) {
      const x = changeCase("Hello World!");

      expect(x).toBeDefined().toBe('hELLO wORLD!');
    },
  ],
  [
    "capitalize",
    function (expect) {
      const x = capitalize("to be or not to be");

      expect(x).toBeDefined().toBe('To Be Or Not To Be');
    },
  ]
];

export default tests;