'use client';

import { useState } from 'react';
import { getVideoDetails } from '@/app/actions/video';

export default function VideoDetails({ params }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState(null);

  // Fetch data on component mount
  useState(() => {
    async function loadVideoDetails() {
      try {
        const videoData = await getVideoDetails(params.videoId);
        if (videoData) {
          setVideo(videoData);
          setSelectedScript(videoData.scriptVariant[0]);
        }
      } catch (error) {
        console.error('Error loading video details:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVideoDetails();
  }, [params.videoId]);

  const handleScriptSelect = (script) => {
    setSelectedScript(script);
    console.log('Selected Script ID:', script.scriptId);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Video not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{video.topic}</h1>
        <p className="text-gray-500">Select a script variant to proceed</p>
      </div>

      {/* Main Script Display */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Selected Script</h2>
          {selectedScript ? (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {selectedScript.content}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Duration: {selectedScript.duration}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a script variant</p>
          )}
        </div>
      </div>

      {/* Script Variants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {video.scriptVariant.map((script) => (
          <div
            key={script.scriptId}
            onClick={() => handleScriptSelect(script)}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
              selectedScript?.scriptId === script.scriptId
                ? 'border-blue-500 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Script {script.scriptId}</h2>
              {selectedScript?.scriptId === script.scriptId && (
                <span className="text-blue-500 dark:text-blue-400">✓ Selected</span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-4">
              {script.content}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Duration: {script.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}