import DeterminingVolumeSize from "./volume/determining_volume_size";
import HowToReadVolumes from "./volume/how_to_read_volumes";
import ImportantThingsInTrends from "./volume/important_things_in_trends";
import VolumeOnTrend from "./volume/volume_on_trend";
import VolumeOnBreakoutBreakdown from "./volume/volume_on_breakout_breakdown";
import VolumeIndicators from "./volume/volume_indicators";
import VolumeOnChartPattern from "./volume/volume_on_chart_pattern";
import FalseBreak from "./chart-pattern/false-break";
import KeyTakeaways from "./chart-pattern/key-takeaways";

export const LESSON_COMPONENTS = {
  //Chapter 1: Chart Pattern
  false_break: FalseBreak,
  key_takeaways_c1: KeyTakeaways,

  // Chapter 2: Volume
  volume_indicators: VolumeIndicators,
  how_to_read_volumes: HowToReadVolumes,
  volume_on_trend: VolumeOnTrend,
  important_things_in_trends: ImportantThingsInTrends,
  volume_on_breakout_breakdown: VolumeOnBreakoutBreakdown,
  volume_on_chart_pattern: VolumeOnChartPattern,
  determining_volume_size: DeterminingVolumeSize,
};
