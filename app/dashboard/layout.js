'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

export default function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { setUserId, setUserData } = useUserStore();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/');
    } else if (isLoaded && user) {
      setUserId(user.id);
      setUserData({
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl
      });
    }
  }, [isLoaded, user, router, setUserId, setUserData]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar will be rendered here */}
      <div className="flex-1 pl-[280px]">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
} 