// POST localhost:3000/api/demo/blocking

import { generateText } from "ai";
import { google } from "@ai-sdk/google";



export async function POST() {
  const response = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
  return Response.json({ response });
}