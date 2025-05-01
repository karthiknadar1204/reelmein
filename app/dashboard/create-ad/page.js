'use client';

import { Wand2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { createVideoData } from "@/app/actions/video";

export default function CreateAd() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useUserStore();
  const router = useRouter();

  const handleGenerateAd = async () => {
    if (!inputText.trim()) {
      console.log("Please enter some text");
      return;
    }

    if (!userId) {
      console.log("User not authenticated");
      return;
    }

    setIsLoading(true);
    try {

      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topic: inputText
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const scripts = await response.json();
      console.log("Generated Scripts:", scripts);


      const videoId = await createVideoData({
        topic: inputText,
        scripts,
        userId
      });

      console.log("Video created with ID:", videoId);
      

      router.push(`/dashboard/create-ad/${videoId}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Ad</h1>
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your ad topic or description..."
            className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute bottom-4 right-4">
            <button 
              onClick={handleGenerateAd}
              disabled={isLoading || !userId}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl ${(isLoading || !userId) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Wand2 className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="font-medium">{isLoading ? 'Generating...' : 'Generate Ad'}</span>
            </button>
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