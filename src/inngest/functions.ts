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
      return prompt.match(URL_REGEX) ?? [];
    });

    const context = await step.run("scrape-urls", async () => {
      if (urls.length === 0) return "";

      const stringUrls = urls.filter((url): url is string => typeof url === "string");

      const results = await Promise.all(
        stringUrls.map(async (url) => {
          const result = await firecrawl.scrape(url, { formats: ["markdown"] });
          return result.markdown ?? "";
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
      });

      return text;
    });

    return { message: "Generation complete", result };
  },
);