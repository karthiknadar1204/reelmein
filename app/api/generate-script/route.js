import { grokClient } from '@/lib/grokClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const messages = [
      {
        role: "system",
        content: `You are a creative script writer specializing in short-form video content. Your task is to generate engaging, concise, and impactful 30-second video scripts.`
      },
      {
        role: "user",
        content: `Generate 3 different 30-second video scripts for the topic: ${topic}. Each script should be unique in style and approach. Return the response in a clean JSON array format with the following structure:

[
  {
    "scriptId": 1,
    "content": "A creative and engaging 30-second script that focuses on [specific style/approach]",
    "duration": "30 seconds"
  },
  {
    "scriptId": 2, 
    "content": "A different style 30-second script that emphasizes [different aspect/approach]",
    "duration": "30 seconds"
  },
  {
    "scriptId": 3,
    "content": "A unique 30-second script that takes a [third distinct approach/style]",
    "duration": "30 seconds"
  }
]

Requirements:
- Each script must be exactly 30 seconds in length
- Each script should be a complete, flowing narrative
- Focus on different styles and approaches for each script
- Keep the content concise and impactful
- No timestamps or technical details
- Pure narrative content only
- Return ONLY the JSON array, no additional text or explanations`
      }
    ];

    const completion = await grokClient.generateCompletion(messages);
    const scripts = JSON.parse(completion.choices[0].message.content);
    
    return NextResponse.json(scripts);
  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}