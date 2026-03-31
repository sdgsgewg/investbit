import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    console.log("Prompt:", prompt);

    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error generating AI response:", error);

    const status =
      error?.status === 429 || error?.message?.includes("429") ? 429 : 500;
    const message =
      status === 429
        ? "AI is currently overloaded. Please try again later."
        : "Failed to generate AI response";

    return NextResponse.json(
      {
        error: message,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status }
    );
  }
}
