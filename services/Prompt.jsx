export const GENERATE_SCRIPT_PROMPT = `Topic: {topic}

Generate 3 different 30-second video scripts for the given topic. Each script should be unique in style and approach. Return the response in a clean JSON array format with the following structure:

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
- Return ONLY the JSON array, no additional text or explanations

The content should be engaging, natural, and suitable for a 30-second video script.`