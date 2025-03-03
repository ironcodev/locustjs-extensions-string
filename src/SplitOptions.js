import { Enum } from "@locustjs/enum";

const SplitOptions = Enum.define(
  {
    none: 0,
    removeEmpties: 1,
    trim: 2,
    trimAndRemoveEmpties: 3,
    toLower: 4,
    trimToLowerAndRemoveEmpties: 5,
    toUpper: 6,
    trimToUpperAndRemoveEmpties: 7,
  },
  "SplitOptions"
);

export default SplitOptions;
