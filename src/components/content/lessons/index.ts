import DeterminingVolumeSize from "./volume/determining_volume_size";
import HowToReadVolumes from "./volume/how_to_read_volumes";
import ImportantThingsInTrends from "./volume/important_things_in_trends";
import VolumeOnTrend from "./volume/volume_on_trend";
import VolumeOnBreakoutBreakdown from "./volume/volume_on_breakout_breakdown";
import VolumeIndicators from "./volume/volume_indicators";
import VolumeOnChartPattern from "./volume/volume_on_chart_pattern";
import FalseBreak from "./chart-pattern/false-break";
import KeyTakeawaysC1 from "./chart-pattern/key-takeaways";
import KeyTakeawaysC3 from "./candlestick-pattern/key-takeaways";
import KeyTakeawaysC4 from "./indicator/key-takeaways";
import Introduction from "./indicator/introduction";
import BuyOnWeakness from "./trading-tactic/buy-on-weakness";
import SellOnStrength from "./trading-tactic/sell-on-strength";
import SellOnBreakdown from "./trading-tactic/sell-on-breakdown";
import BuyOnBreakout from "./trading-tactic/buy-on-breakout";
import KeyTakeawaysC5 from "./trading-tactic/key-takeaways";

export const LESSON_COMPONENTS = {
  //Chapter 1: Chart Pattern
  false_break: FalseBreak,
  key_takeaways_c1: KeyTakeawaysC1,

  // Chapter 2: Volume
  volume_indicators: VolumeIndicators,
  how_to_read_volumes: HowToReadVolumes,
  volume_on_trend: VolumeOnTrend,
  important_things_in_trends: ImportantThingsInTrends,
  volume_on_breakout_breakdown: VolumeOnBreakoutBreakdown,
  volume_on_chart_pattern: VolumeOnChartPattern,
  determining_volume_size: DeterminingVolumeSize,

  // Chapter 3: Candlestick Pattern
  key_takeaways_c3: KeyTakeawaysC3,

  // Chapter 4: Indicator
  introduction: Introduction,
  key_takeaways_c4: KeyTakeawaysC4,
  
  // Chapter 5: Trading Tactic
  buy_on_weakness: BuyOnWeakness,
  buy_on_breakout: BuyOnBreakout,
  sell_on_breakdown: SellOnBreakdown,
  sell_on_strength: SellOnStrength,
  key_takeaways_c5: KeyTakeawaysC5,
};
