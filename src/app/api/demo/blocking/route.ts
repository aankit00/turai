// POST localhost:3000/api/demo/blocking

import { generateText } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});



export async function POST() {
  const response = await generateText({
     model: openrouter("allenai/molmo-2-8b:free"),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    },
  });

  return Response.json({ response });
};