import AvoidUsingHotMoney from "../lessons/money-management/avoid-using-hot-money";
import PositionSizing from "../lessons/money-management/position-sizing";
import RiskToRewardRatio from "../lessons/money-management/risk-to-reward-ratio";
import StopLoss from "../lessons/money-management/stop-loss";
import TradingPlan from "../lessons/money-management/trading-plan";
import BullishOrBearishEngulfing from "./candlestick-pattern/bullish-or-bearish-engulfing";
import Doji from "./candlestick-pattern/doji";
import EveningStar from "./candlestick-pattern/evening-star";
import Hammer from "./candlestick-pattern/hammer";
import Harami from "./candlestick-pattern/harami";
import InvertedHammer from "./candlestick-pattern/inverted-hammer";
import Marubozu from "./candlestick-pattern/marubozu";
import MorningStar from "./candlestick-pattern/morning-star";
import BearishFlag from "./chart-pattern/bearish/bearish-flag";
import BearishPennant from "./chart-pattern/bearish/bearish-pennant";
import DescendingTriangle from "./chart-pattern/bearish/descending-triangle.";
import DoubleTop from "./chart-pattern/bearish/double-top";
import HeadAndShoulders from "./chart-pattern/bearish/head-and-shoulders";
import InvertedCupAndHandle from "./chart-pattern/bearish/inverted-cup-and-handle";
import AscendingTriangle from "./chart-pattern/bullish/ascending-triangle";
import BullishFlag from "./chart-pattern/bullish/bullish-flag";
import BullishPennant from "./chart-pattern/bullish/bullish-pennant";
import CupAndHandle from "./chart-pattern/bullish/cup-and-handle";
import DoubleBottom from "./chart-pattern/bullish/double-bottom";
import FallingWedge from "./chart-pattern/bullish/falling-wedge";
import InvertedHeadAndShoulders from "./chart-pattern/bullish/inverted-head-and-shoulders";
import Rectangle from "./chart-pattern/sideways/rectangle";
import SymmetricalTriangle from "./chart-pattern/sideways/symmetrical-triangle";
import BollingerBands from "./indicator/lagging/bollinger-bands";
import MovingAverage from "./indicator/lagging/moving-average";
import MovingAverageConvergenceDivergence from "./indicator/lagging/moving-average-convergence-divergence";
import FibonacciRetracement from "./indicator/leading/fibonacci-retracement";
import RelativeStrengthIndex from "./indicator/leading/relative-strength-index";

export const TOPIC_COMPONENTS = {
  // Chapter 1: Chart Pattern

  // Bullish
  ascending_triangle: AscendingTriangle,
  inverted_head_and_shoulders: InvertedHeadAndShoulders,
  cup_and_handle: CupAndHandle,
  double_bottom: DoubleBottom,
  bullish_flag: BullishFlag,
  bullish_pennant: BullishPennant,
  falling_wedge: FallingWedge,

  // Bearish
  descending_triangle: DescendingTriangle,
  head_and_shoulders: HeadAndShoulders,
  inverted_cup_and_handle: InvertedCupAndHandle,
  double_top: DoubleTop,
  bearish_flag: BearishFlag,
  bearish_pennant: BearishPennant,

  // Sideways
  symmetrical_triangle: SymmetricalTriangle,
  rectangle: Rectangle,

  // Chapter 3: Candlestick Pattern
  marubozu: Marubozu,
  hammer: Hammer,
  inverted_hammer: InvertedHammer,
  doji: Doji,
  bullish_or_bearish_engulfing: BullishOrBearishEngulfing,
  morning_star: MorningStar,
  evening_star: EveningStar,
  harami: Harami,

  //Chapter 4: Indicator
  // Lagging
  moving_average: MovingAverage,
  moving_average_convergence_divergence: MovingAverageConvergenceDivergence,
  bollinger_bands: BollingerBands,

  // Leading
  relative_strength_index: RelativeStrengthIndex,
  fibonacci_retracement: FibonacciRetracement,

  //Chapter 6: Money Management
  stop_loss: StopLoss,
  avoid_using_hot_money: AvoidUsingHotMoney,
  trading_plan: TradingPlan,
  risk_to_reward_ratio: RiskToRewardRatio,
  position_sizing: PositionSizing,
};
