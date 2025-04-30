'use client';

import { Wand2 } from "lucide-react";
import { useState } from "react";

export default function CreateAd() {
  const [inputText, setInputText] = useState("");

  const handleGenerateAd = () => {
    console.log("Input Text:", inputText);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Create AI Ads in One Click
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Market your product with AI-generated ads effortlessly. No editing skills required - just describe your product and let our AI work its magic.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-64 p-6 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-3xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
              placeholder="Describe your product or service in detail. The more details you provide, the better the AI can create your ad..."
            />
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={handleGenerateAd}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Wand2 className="h-5 w-5" />
                <span className="font-medium">Generate Ad</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Powered by advanced AI technology to create engaging and effective ads
          </p>
        </div>
      </div>
    </div>
  );
} 