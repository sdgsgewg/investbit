import {
  BarChart3,
  CandlestickChart,
  ChartArea,
  LineChart,
  LucideIcon,
  Target,
  Wallet,
} from "lucide-react";

export type Topic = {
  titleKey: string;
  contentKey: string;
};

export type Lesson = {
  titleKey: string;
  descriptionKey: string;
  contentKey?: string;
  topics?: Topic[];
};

export type Chapter = {
  titleKey: string;
  slug: string;
  icon: LucideIcon;
  descriptionKey: string;
  contentTitleKey: string;
  lessons: Lesson[];
};

export type ChapterData = Chapter[];

export const CHAPTER_DATA: ChapterData = [
  {
    titleKey: "chapter1.title",
    slug: "chart-pattern",
    icon: ChartArea,
    descriptionKey: "chapter1.description",
    contentTitleKey: "chapter1.content_title",
    lessons: [
      {
        titleKey: "chapter1.lessons.bullish.title",
        descriptionKey: "chapter1.lessons.bullish.description",
        topics: [
          {
            titleKey:
              "chapter1.lessons.bullish.topics.ascending_triangle.title",
            contentKey: "ascending_triangle",
          },
          {
            titleKey:
              "chapter1.lessons.bullish.topics.inverted_head_and_shoulders.title",
            contentKey: "inverted_head_and_shoulders",
          },
          {
            titleKey: "chapter1.lessons.bullish.topics.cup_and_handle.title",
            contentKey: "cup_and_handle",
          },
          {
            titleKey: "chapter1.lessons.bullish.topics.double_bottom.title",
            contentKey: "double_bottom",
          },
          {
            titleKey: "chapter1.lessons.bullish.topics.bullish_flag.title",
            contentKey: "bullish_flag",
          },
          {
            titleKey: "chapter1.lessons.bullish.topics.bullish_pennant.title",
            contentKey: "bullish_pennant",
          },
          {
            titleKey: "chapter1.lessons.bullish.topics.falling_wedge.title",
            contentKey: "falling_wedge",
          },
        ],
      },
      {
        titleKey: "chapter1.lessons.bearish.title",
        descriptionKey: "chapter1.lessons.bearish.description",
        topics: [
          {
            titleKey:
              "chapter1.lessons.bearish.topics.descending_triangle.title",
            contentKey: "descending_triangle",
          },
          {
            titleKey:
              "chapter1.lessons.bearish.topics.head_and_shoulders.title",
            contentKey: "head_and_shoulders",
          },
          {
            titleKey:
              "chapter1.lessons.bearish.topics.inverted_cup_and_handle.title",
            contentKey: "inverted_cup_and_handle",
          },
          {
            titleKey: "chapter1.lessons.bearish.topics.double_top.title",
            contentKey: "double_top",
          },
          {
            titleKey: "chapter1.lessons.bearish.topics.bearish_flag.title",
            contentKey: "bearish_flag",
          },
          {
            titleKey: "chapter1.lessons.bearish.topics.bearish_pennant.title",
            contentKey: "bearish_pennant",
          },
        ],
      },
      {
        titleKey: "chapter1.lessons.sideways.title",
        descriptionKey: "chapter1.lessons.sideways.description",
        topics: [
          {
            titleKey:
              "chapter1.lessons.sideways.topics.symmetrical_triangle.title",
            contentKey: "symmetrical_triangle",
          },
          {
            titleKey: "chapter1.lessons.sideways.topics.rectangle.title",
            contentKey: "rectangle",
          },
        ],
      },
      {
        titleKey: "chapter1.lessons.false_break.title",
        descriptionKey: "chapter1.lessons.false_break.description",
        contentKey: "false_break",
      },
      {
        titleKey: "chapter1.lessons.key_takeaways_c1.title",
        descriptionKey: "chapter1.lessons.key_takeaways_c1.description",
        contentKey: "key_takeaways_c1",
      },
    ],
  },
  {
    titleKey: "chapter2.title",
    slug: "volume",
    icon: BarChart3,
    descriptionKey: "chapter2.description",
    contentTitleKey: "chapter2.content_title",
    lessons: [
      {
        titleKey: "chapter2.lessons.volume_indicators.title",
        descriptionKey: "chapter2.lessons.volume_indicators.description",
        contentKey: "volume_indicators",
      },
      {
        titleKey: "chapter2.lessons.how_to_read_volumes.title",
        descriptionKey: "chapter2.lessons.how_to_read_volumes.description",
        contentKey: "how_to_read_volumes",
      },
      {
        titleKey: "chapter2.lessons.volume_on_trend.title",
        descriptionKey: "chapter2.lessons.volume_on_trend.description",
        contentKey: "volume_on_trend",
      },
      {
        titleKey: "chapter2.lessons.important_things_in_trends.title",
        descriptionKey:
          "chapter2.lessons.important_things_in_trends.description",
        contentKey: "important_things_in_trends",
      },
      {
        titleKey: "chapter2.lessons.volume_on_breakout_breakdown.title",
        descriptionKey:
          "chapter2.lessons.volume_on_breakout_breakdown.description",
        contentKey: "volume_on_breakout_breakdown",
      },
      {
        titleKey: "chapter2.lessons.volume_on_chart_pattern.title",
        descriptionKey: "chapter2.lessons.volume_on_chart_pattern.description",
        contentKey: "volume_on_chart_pattern",
      },
      {
        titleKey: "chapter2.lessons.determining_volume_size.title",
        descriptionKey: "chapter2.lessons.determining_volume_size.description",
        contentKey: "determining_volume_size",
      },
    ],
  },
  {
    titleKey: "chapter3.title",
    slug: "candlestick-pattern",
    icon: CandlestickChart,
    descriptionKey: "chapter3.description",
    contentTitleKey: "chapter3.content_title",
    lessons: [
      {
        titleKey: "chapter3.lessons.candlestick_pattern.title",
        descriptionKey: "chapter3.lessons.candlestick_pattern.description",
        topics: [
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.marubozu.title",
            contentKey: "marubozu",
          },
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.hammer.title",
            contentKey: "hammer",
          },
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.inverted_hammer.title",
            contentKey: "inverted_hammer",
          },
          {
            titleKey: "chapter3.lessons.candlestick_pattern.topics.doji.title",
            contentKey: "doji",
          },
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.bullish_or_bearish_engulfing.title",
            contentKey: "bullish_or_bearish_engulfing",
          },
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.morning_star.title",
            contentKey: "morning_star",
          },
          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.evening_star.title",
            contentKey: "evening_star",
          },

          {
            titleKey:
              "chapter3.lessons.candlestick_pattern.topics.harami.title",
            contentKey: "harami",
          },
        ],
      },
      {
        titleKey: "chapter3.lessons.key_takeaways_c3.title",
        descriptionKey: "chapter3.lessons.key_takeaways_c3.description",
        contentKey: "key_takeaways_c3",
      },
    ],
  },
  {
    titleKey: "chapter4.title",
    slug: "indicator",
    icon: LineChart,
    descriptionKey: "chapter4.description",
    contentTitleKey: "chapter4.content_title",
    lessons: [
      {
        titleKey: "chapter4.lessons.introduction.title",
        descriptionKey: "chapter4.lessons.introduction.description",
        contentKey: "introduction",
      },
      {
        titleKey: "chapter4.lessons.key_takeaways.title",
        descriptionKey: "chapter4.lessons.key_takeaways.description",
        contentKey: "key_takeaways",
      },
    ],
  },
  {
    titleKey: "chapter5.title",
    slug: "trading-tactics",
    icon: Target,
    descriptionKey: "chapter5.description",
    contentTitleKey: "chapter5.content_title",
    lessons: [
      {
        titleKey: "chapter5.lessons.buy_on_weakness.title",
        descriptionKey: "chapter5.lessons.buy_on_weakness.description",
        contentKey: "buy_on_weakness",
      },
      {
        titleKey: "chapter5.lessons.buy_on_breakout.title",
        descriptionKey: "chapter5.lessons.buy_on_breakout.description",
        contentKey: "buy_on_breakout",
      },
      {
        titleKey: "chapter5.lessons.sell_on_breakdown.title",
        descriptionKey: "chapter5.lessons.sell_on_breakdown.description",
        contentKey: "sell_on_breakdown",
      },
      {
        titleKey: "chapter5.lessons.sell_on_strength.title",
        descriptionKey: "chapter5.lessons.sell_on_strength.description",
        contentKey: "sell_on_strength",
      },
      {
        titleKey: "chapter5.lessons.key_takeaways.title",
        descriptionKey: "chapter5.lessons.key_takeaways.description",
        contentKey: "key_takeaways",
      },
    ],
  },
  {
    titleKey: "chapter6.title",
    slug: "financial-management",
    icon: Wallet,
    descriptionKey: "chapter6.description",
    contentTitleKey: "chapter6.content_title",
    lessons: [
      {
        titleKey: "chapter6.lessons.money_management.title",
        descriptionKey: "chapter6.lessons.money_management.description",
        topics: [
          {
            titleKey:
              "chapter6.lessons.money_management.topics.stop_loss.title",
            contentKey: "stop_loss",
          },
          {
            titleKey:
              "chapter6.lessons.money_management.topics.avoid_using_hot_money.title",
            contentKey: "avoid_using_hot_money",
          },
          {
            titleKey:
              "chapter6.lessons.money_management.topics.trading_plan.title",
            contentKey: "trading_plan",
          },
          {
            titleKey:
              "chapter6.lessons.money_management.topics.position_sizing.title",
            contentKey: "position_sizing",
          },
          {
            titleKey:
              "chapter6.lessons.money_management.topics.risk_reward_ratio.title",
            contentKey: "risk_reward_ratio",
          },
        ],
      },
    ],
  },
];
