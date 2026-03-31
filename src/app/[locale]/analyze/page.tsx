"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_STOCKS } from "@/lib/mock-data";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyzePage() {
  const t = useTranslations("Nav");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = MOCK_STOCKS.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{t("analyze")}</h1>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stock..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Filter</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredStocks.map((stock) => (
            <Card
              key={stock.symbol}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-bold text-xl">{stock.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    Rp {stock.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Top Movers (Mock Data)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_STOCKS}>
                    <XAxis
                      dataKey="symbol"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar
                      dataKey="price"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>AI Insight</CardTitle>
              <CardDescription>
                Get AI analysis for selected stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select a stock to see detailed AI-powered analysis and
                recommendations.
              </p>
              <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0">
                Analyze with AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
