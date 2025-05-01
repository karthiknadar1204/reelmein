import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: null,
  userData: null,
  setUserId: (id) => set({ userId: id }),
  setUserData: (data) => set({ userData: data }),
  clearUser: () => set({ userId: null, userData: null }),
}));

export default useUserStore; 