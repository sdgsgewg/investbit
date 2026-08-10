import { TimeFrame } from "@/enums/TimeFrame";
import { Option } from "@/types/option";
import { getTimeFrameLabel } from "./labels";
import { Translate } from "@/types/translate";

export const getTimeFrameOptions = (t: Translate): Option[] =>
  Object.values(TimeFrame).map((timeFrame) => ({
    label: getTimeFrameLabel(timeFrame, t),
    value: timeFrame,
  }));
