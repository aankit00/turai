import { generateText } from "ai";
import { inngest } from "./client";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { firecrawl } from "@/lib/firecrawl";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string };

    const urls = await step.run("extract-urls", async () => {
      return (prompt.match(URL_REGEX) ?? []) as string[];
    });

    const context = await step.run("scrape-urls", async () => {
      if (urls.length === 0) return "";

      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const result = await firecrawl.scrape(url, { formats: ["markdown"] });
            return result.markdown ?? "";
          } catch (e) {
            return null;
          }
        }),
      );

      return results.filter(Boolean).join("\n\n---\n\n");
    });

    const finalPrompt = context
      ? `Context:\n${context}\n\nQuestion: ${prompt}`
      : prompt;

    const result = await step.run("generate-text", async () => {
      const { text } = await generateText({
        model: openrouter("allenai/molmo-2-8b:free"),
        prompt: finalPrompt,
        experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    },
      });

      return text;
    });

    return { message: "Generation complete", result };
  },
);

export const demoError = inngest.createFunction(
  { id: "demo-error" },
  { event: "demo/error" },
  async ({ step }) => {
    await step.run("fail", async () => {
      throw new Error("Inngest error: Background job failed!");
    });
  }
);