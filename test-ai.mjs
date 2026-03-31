import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load env from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

async function listModels() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error("No GOOGLE_AI_API_KEY found in .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const models = [
    "gemini-1.5-flash",
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-1.5-pro",
  ];

  for (const modelName of models) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log(`SUCCESS: '${modelName}' is working!`);
      console.log("Response:", result.response.text());
      return; // Exit on first success
    } catch (e) {
      console.log(
        `FAILED: '${modelName}' - ${e.message ? e.message.split("\n")[0] : e}`
      );
    }
  }
  console.error("All models failed.");
}

listModels();
