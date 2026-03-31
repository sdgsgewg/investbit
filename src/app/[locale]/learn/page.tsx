import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LearnPage() {
  const t = useTranslations("Nav"); // Using Nav for title for now

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{t("learn")}</h1>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="basics">Stock Basics</TabsTrigger>
          <TabsTrigger value="analysis">Analysis 101</TabsTrigger>
          <TabsTrigger value="indonesia">IDX Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is a Stock?</CardTitle>
              <CardDescription>
                Understanding ownership in a company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                A stock (also known as equity) is a security that represents the
                ownership of a fraction of a corporation. This entitles the
                owner of the stock to a proportion of the corporation's assets
                and profits equal to how much stock they own. Units of stock are
                called "shares."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Why Invest in Stocks?</CardTitle>
              <CardDescription>
                The power of compounding and growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                Investing in stocks provides an opportunity to grow your money
                over time. Historically, the stock market has delivered generous
                returns to investors over time, but the stock market also goes
                down, providing investors with the possibility of losing money.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fundamental Analysis</CardTitle>
              <CardDescription>
                Evaluating a company's intrinsic value.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                Fundamental analysis involves looking at any data that is
                expected to impact the price or perceived value of a stock. This
                includes financial ratios like P/E (Price-to-Earnings), PBV
                (Price-to-Book Value), and ROE (Return on Equity).
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technical Analysis</CardTitle>
              <CardDescription>
                Studying price patterns and trends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                Technical analysis is a trading discipline employed to evaluate
                investments and identify trading opportunities in price trends
                and patterns seen on charts. Technical analysts believe past
                trading activity and price changes of a security can be valuable
                indicators of the security's future price movements.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indonesia" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Indonesia Stock Exchange (IDX)</CardTitle>
              <CardDescription>
                Getting started with investing in Indonesia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                The Indonesia Stock Exchange (IDX) or Bursa Efek Indonesia (BEI)
                is the stock exchange based in Jakarta, Indonesia. To start
                investing, you need to open an RDN (Rekening Dana Nasabah)
                account through a securities company (Sekuritas).
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Blue Chip Stocks (LQ45)</CardTitle>
              <CardDescription>
                The most liquid and large-cap stocks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                In Indonesia, the LQ45 index consists of 45 companies that have
                high liquidity and large market capitalization. These are often
                considered safer investments for beginners compared to second or
                third-liner stocks.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
