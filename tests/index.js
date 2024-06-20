import test1 from "./format";
import test2 from "./fromBytes";
import test3 from "./toBytes";
import test4 from "./StringBuilder";
import test5 from "./replaceAll";
import test6 from "./reverse";
import test7 from "./trim";
import test8 from "./case";
import test9 from "./left-right";
import test10 from "./toArray";
import test11 from "./fromArray";
import test12 from "./stringify-unstring";
import test13 from "./nsplit";
import test14 from "./xsplit";
import TestRunner from "@locustjs/test";

const tests = [
  ...test1,
  ...test2,
  ...test3,
  ...test4,
  ...test5,
  ...test6,
  ...test7,
  ...test8,
  ...test9,
  ...test10,
  ...test11,
  ...test12,
  ...test13,
  ...test14,
];

TestRunner.start(tests)