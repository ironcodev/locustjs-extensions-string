import { format } from "../index.esm.js";

const tests = [
  [
    "format: test 1 - array 01",
    function (expect) {
      const str1 = "hello {0}.";
      const str2 = format(str1, "John");
      const r1 = "hello John.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 1 - array 02",
    function (expect) {
      const str1 = "hello {0}. It is {1} today.";
      const str2 = format(str1, "John");
      const r1 = "hello John. It is {1} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 1 - array 1",
    function (expect) {
      const str1 = "hello {0}. It is {1} today.";
      const str2 = format(str1, "John", "Sunday");
      const r1 = "hello John. It is Sunday today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 1 - array 2",
    function (expect) {
      const str1 = "hello {0}. It is {1} today.";
      const str2 = format(str1, ["John", "Sunday"]);
      const r1 = "hello John. It is Sunday today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 1 - array 3",
    function (expect) {
      const str1 = "hello {0}{1}";
      const str2 = format(str1, ["John", (_) => "."]);
      const r1 = "hello John.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 2 - object 1",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, { name: "John", day: "Sunday" });
      const r1 = "hello John. It is Sunday today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 2 - object 2",
    function (expect) {
      const str1 = "hello {person.name}.";
      const str2 = format(str1, { person: { name: "John" } });
      const r1 = "hello John.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 3 - function 1",
    function (expect) {
      const str1 = "hello {yourName}. I am {myName}.";
      const str2 = format(str1, ({ key }) => {
        if (key == "yourName") {
          return "ali";
        }
        if (key == "myName") {
          return "reza";
        }
      });
      const r1 = "hello ali. I am reza.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 3 - function 2",
    function (expect) {
      const str1 = "hello {0}. I am {1}.";
      const str2 = format(str1, ({ index }) => {
        if (index == 0) {
          return "ali";
        }
        if (index == 1) {
          return "reza";
        }
      });
      const r1 = "hello ali. I am reza.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 4 - escaping",
    function (expect) {
      const str1 =
        "Hello {0} {1}. Interpolation in format() function is done through {{ and }} characters, e.g. {{0}} or {{name}}.";
      const str2 = format(str1, "John", "Doe");
      const r1 =
        "Hello John Doe. Interpolation in format() function is done through { and } characters, e.g. {0} or {name}.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: array 1",
    function (expect) {
      const str1 = "hello {0}.";
      const str2 = format(str1, undefined);
      const r1 = "hello {0}.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: array 2",
    function (expect) {
      const str1 = "hello {0}. It is {1} today.";
      const str2 = format(str1);
      const r1 = "hello {0}. It is {1} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: array 3",
    function (expect) {
      const str1 = "hello {0}. It is {1} today.";
      const str2 = format(str1, undefined, undefined);
      const r1 = "hello {0}. It is {1} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 1",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1);
      const r1 = "hello {name}. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 2",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, { name: "John" });
      const r1 = "hello John. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 3",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, undefined);
      const r1 = "hello {name}. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 4",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, undefined, undefined);
      const r1 = "hello {name}. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 5",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, null);
      const r1 = "hello {name}. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
  [
    "format: test 5 - missing args: object 6",
    function (expect) {
      const str1 = "hello {name}. It is {day} today.";
      const str2 = format(str1, null, undefined);
      const r1 = "hello {name}. It is {day} today.";

      expect(str2).toBe(r1);
    },
  ],
];

export default tests;
