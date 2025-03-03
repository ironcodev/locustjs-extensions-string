import { pascalCase, camelCase, changeCase, capitalize } from "../src";

const tests = [
  [
    "pascalCase 1",
    function (expect) {
      const x = pascalCase("hello world");

      expect(x).toBeDefined().toBe('HelloWorld');
    },
  ],
  [
    "pascalCase 2",
    function (expect) {
      const x = pascalCase("hello world", false);

      expect(x).toBeDefined().toBe('Hello World');
    },
  ],
  [
    "pascalCase 3",
    function (expect) {
      const x = pascalCase("hello world", "-");

      expect(x).toBeDefined().toBe('Hello-World');
    },
  ],
  [
    "camelCase 1",
    function (expect) {
      const x = camelCase("hello world");

      expect(x).toBeDefined().toBe('helloWorld');
    },
  ],
  [
    "camelCase 2",
    function (expect) {
      const x = camelCase("hello world", false);

      expect(x).toBeDefined().toBe('hello World');
    },
  ],
  [
    "camelCase 3",
    function (expect) {
      const x = camelCase("hello world", "-");

      expect(x).toBeDefined().toBe('hello-World');
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