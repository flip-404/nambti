'use client';

import { Button } from '@/components/ui/button';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

export default function Step2Page() {
  const h3Style = 'text-lg font-bold';

  const router = useRouter();
  const { mbti, setMbti } = useLinkBuilderStore();
  const [errors, setErrors] = useState<string[]>(['', '', '', '']);

  // input refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validChars = [
    ['I', 'E'],
    ['N', 'S'],
    ['T', 'F'],
    ['J', 'P'],
  ];

  const handleInputChange = (index: number, value: string) => {
    const upperValue = value.toUpperCase();
    const newMbti = [...mbti];
    const newErrors = [...errors];

    if (upperValue === '') {
      newMbti[index] = '';
      newErrors[index] = '';
    } else if (validChars[index].includes(upperValue)) {
      newMbti[index] = upperValue;
      newErrors[index] = '';

      // 다음 input으로 포커스 이동
      if (index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      newMbti[index] = upperValue;
      newErrors[index] = `${validChars[index].join(' 또는 ')}만 입력 가능합니다.`;
    }

    setMbti(newMbti);
    setErrors(newErrors);
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center">
        <h3 className={h3Style}>MBTI를 입력해주세요.</h3>
        <p className="text-sm text-gray-600 mt-2">I/E, N/S, T/F, J/P 순서로 입력해주세요.</p>
      </div>
      <div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <input
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  className={`w-10 h-10 rounded border-1 text-center font-bold ${
                    errors[idx]
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-sky-100 border-sky-500'
                  }`}
                  value={mbti[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  maxLength={1}
                  placeholder={validChars[idx].join('/')}
                />
                <span className="text-xs text-gray-500 mt-1">{validChars[idx].join('/')}</span>
              </div>
            ))}
          </div>

          {errors.some((error) => error !== '') && (
            <div className="flex flex-col items-center gap-1 mt-2">
              {errors.map(
                (error, idx) =>
                  error && (
                    <p key={idx} className="text-red-500 text-xs">
                      {idx + 1}번째: {error}
                    </p>
                  )
              )}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => router.push('/links/create/step-1')}>
              이전
            </Button>
            <Button
              disabled={!mbti.every((char) => char !== '')}
              onClick={() => router.push('/links/create/step-3')}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
