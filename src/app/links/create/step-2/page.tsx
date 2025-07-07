'use client';

import { Button } from '@/components/ui/button';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Step2Page() {
  const h3Style = 'text-lg font-bold';

  const router = useRouter();
  const { mbti, setMbti } = useLinkBuilderStore();
  const [errors, setErrors] = useState<string[]>(['', '', '', '']);

  // 각 위치별 유효한 문자 정의
  const validChars = [
    ['I', 'E'], // 첫 번째: I 또는 E
    ['N', 'S'], // 두 번째: N 또는 S
    ['T', 'F'], // 세 번째: T 또는 F
    ['J', 'P'], // 네 번째: J 또는 P
  ];

  const handleInputChange = (index: number, value: string) => {
    const upperValue = value.toUpperCase();
    const newMbti = [...mbti];
    const newErrors = [...errors];

    // 입력값이 비어있으면 에러 없음
    if (upperValue === '') {
      newMbti[index] = '';
      newErrors[index] = '';
    } else if (validChars[index].includes(upperValue)) {
      // 유효한 문자인 경우
      newMbti[index] = upperValue;
      newErrors[index] = '';
    } else {
      // 유효하지 않은 문자인 경우
      newMbti[index] = upperValue;
      newErrors[index] = `${validChars[index].join(' 또는 ')}만 입력 가능합니다.`;
    }

    setMbti(newMbti);
    setErrors(newErrors);
  };

  const handleConfirm = () => {
    // 모든 필드가 올바르게 입력되었는지 확인
    const hasErrors = errors.some((error) => error !== '');
    const isComplete = mbti.every((char) => char !== '');

    if (hasErrors) {
      alert('올바르지 않은 입력이 있습니다. 다시 확인해주세요.');
      return;
    }

    if (!isComplete) {
      alert('모든 MBTI 문자를 입력해주세요.');
      return;
    }

    alert(`MBTI: ${mbti.join('')}로 설정되었습니다.`);
    // 다음 단계로 이동하는 로직 추가
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

          {/* 에러 메시지 표시 */}
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
