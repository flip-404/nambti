// store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LinkBuilderStore {
  username: string;
  setUsername: (name: string) => void;
  mbti: string[];
  setMbti: (mbti: string[]) => void;
}

export const useLinkBuilderStore = create<LinkBuilderStore>()(
  persist(
    (set) => ({
      username: '',
      setUsername: (name) => set({ username: name }),
      mbti: ['', '', '', ''],
      setMbti: (mbti) => set({ mbti }),
    }),
    {
      name: 'link-builder-storage', // localStorage에 저장될 key 이름
    }
  )
);
