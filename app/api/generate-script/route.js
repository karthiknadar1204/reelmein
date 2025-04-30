import { GENERATE_SCRIPT_PROMPT } from "@/services/Prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai"

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
})
export async function POST(req,res){
    const {topic}=await req.json();
    console.log("topic",topic);
    const PROMPT=GENERATE_SCRIPT_PROMPT.replace('{topic}',topic);

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3-1b-it:free",
    messages: [
      { role: "user", content: PROMPT }
    ],
  })

  console.log(completion.choices[0].message)

  return NextResponse.json({
    message: completion.choices[0].message,
  })

}