'use client';

import { Button } from '@/components/ui/button';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Step1Page() {
  const h3Style = 'text-lg font-bold';

  const { username, setUsername } = useLinkBuilderStore();
  const router = useRouter();

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    // 한글만 허용
    if (!koreanRegex.test(value)) {
      setError('한글만 입력해주세요.');
    } else if (value.length > 0 && value.length < 2) {
      setError('이름은 2자 이상 입력해주세요.');
    } else {
      setError('');
    }

    setUsername(value);
  };

  const isValid = !error && username.length >= 2;

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center">
        <h3 className={h3Style}>이름(닉네임)을 입력해주세요.</h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <input
          className="px-4 py-2 rounded border-1 bg-sky-100 border-sky-500"
          value={username}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push('/')}>
          이전
        </Button>
        <Button disabled={!isValid} onClick={() => router.push('/links/create/step-2')}>
          다음
        </Button>
      </div>
    </main>
  );
}
