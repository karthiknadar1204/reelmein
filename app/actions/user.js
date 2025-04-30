'use server';

import { db } from '@/configs/db';
import { users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function createOrUpdateUser(userData) {
  try {
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    if (existingUser.length > 0) {
      // User exists, return the existing user
      return existingUser[0];
    }

    // Create new user
    const newUser = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        paymentId: userData.paymentId || '',
        credits: 0
      })
      .returning();

    return newUser[0];
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
} 