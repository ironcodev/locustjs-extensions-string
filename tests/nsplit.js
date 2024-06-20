import { isArray } from "@locustjs/base";
import { nsplit } from "../index.esm.js";

const tests = [
  [
    "nsplit: 1",
    function (expect) {
      const x = nsplit("name=ali&age=23", ['&', '=']);
      /*
      [
        [ 'name', 'ali' ],
        [ 'age', '23' ]
      ]
      */
     
      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(2);
      expect(x[0].length).toBe(2);
      expect(x[1].length).toBe(2);
    },
  ],
  [
    "nsplit: 2",
    function (expect) {
      const x = nsplit("name=ali%20reza&age=23", ['&', '='], ({ level, value }) => level == 1 ? decodeURI(value): value);

      expect(isArray(x)).toBeTrue();
      expect(x.length).toBe(2);
      expect(x[0].length).toBe(2);
      expect(x[1].length).toBe(2);
      expect(x[0][1]).toBe('ali reza');
    },
  ],
];

export default tests;
