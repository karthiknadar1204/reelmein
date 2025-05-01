'use client';

import { useEffect, useState } from 'react';
import { db } from '@/configs/db';
import { videoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export default function VideoDetails({ params }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideoDetails() {
      try {
        const videoDetails = await db
          .select()
          .from(videoData)
          .where(eq(videoData.id, params.videoId))
          .limit(1);

        if (videoDetails.length > 0) {
          setVideo(videoDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideoDetails();
  }, [params.videoId]);

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

  const scripts = JSON.parse(video.scriptVariant);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{video.topic}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scripts.map((script) => (
          <div key={script.scriptId} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Script {script.scriptId}</h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
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