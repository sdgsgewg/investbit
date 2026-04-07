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
};
