'use client';

import { useState } from 'react';
import { getVideoDetails } from '@/app/actions/video';
import Scripts from './_components/scripts';

export default function VideoDetails({ params }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useState(() => {
    async function loadVideoDetails() {
      try {
        const videoData = await getVideoDetails(params.videoId);
        if (videoData) {
          setVideo(videoData);
        }
      } catch (error) {
        console.error('Error loading video details:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVideoDetails();
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

  return (
    <div className="p-8">
      <Scripts video={video} />
    </div>
  );
}