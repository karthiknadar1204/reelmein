'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAd() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Ad</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Ad Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your ad title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your ad description"
              />
            </div>

            <div>
              <label htmlFor="video" className="block text-sm font-medium mb-2">
                Upload Video
              </label>
              <input
                type="file"
                id="video"
                accept="video/*"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Ad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 