'use server';

import { db } from '@/configs/db';
import { videoData } from '@/configs/schema';

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