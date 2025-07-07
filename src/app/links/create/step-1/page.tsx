'use client';

import { Button } from '@/components/ui/button';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Step1Page() {
  const h3Style = 'text-lg font-bold';

  const { username, setUsername } = useLinkBuilderStore();
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">
        <h3 className={h3Style}>이름(닉네임)을 입력해주세요.</h3>
      </div>
      <div>
        <input
          className="px-4 py-2 rounded border-1 bg-sky-100 border-sky-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push('/')}>
          이전
        </Button>
        <Button disabled={!username} onClick={() => router.push('/links/create/step-2')}>
          다음
        </Button>
      </div>
    </main>
  );
}
