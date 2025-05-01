'use server';

import { db } from '@/configs/db';
import { videoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function createVideoData(data) {
  try {
    const newVideo = await db
      .insert(videoData)
      .values({
        topic: data.topic,
        scriptVariant: JSON.stringify(data.scripts),
        script: '',
        assets: '',
        avatar: '',
        voice: '',
        uid: data.userId,
        voiceUrl: '',
        avatarUrl: '',
        videoUrl: ''
      })
      .returning();

    return newVideo[0].id;
  } catch (error) {
    console.error('Error creating video data:', error);
    throw error;
  }
}

export async function getVideoDetails(videoId) {
  try {
    const videoDetails = await db
      .select()
      .from(videoData)
      .where(eq(videoData.id, videoId))
      .limit(1);

    if (videoDetails.length === 0) {
      return null;
    }

    return {
      ...videoDetails[0],
      scriptVariant: JSON.parse(videoDetails[0].scriptVariant)
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
} 