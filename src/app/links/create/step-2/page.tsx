'use client';

import { Button } from '@/components/ui/button';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

export default function Step2Page() {
  const h3Style = 'text-lg font-bold';

  const router = useRouter();
  const { mbti, setMbti } = useLinkBuilderStore();
  const [errors, setErrors] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // 숨겨진 input ref
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const validChars = [
    ['I', 'E'],
    ['N', 'S'],
    ['T', 'F'],
    ['J', 'P'],
  ];

  const handleInputChange = (value: string) => {
    const upperValue = value.toUpperCase();
    const newMbti = ['', '', '', ''];
    const newErrors = ['', '', '', ''];

    // 입력된 문자들을 하나씩 검증
    for (let i = 0; i < Math.min(upperValue.length, 4); i++) {
      const char = upperValue[i];
      if (validChars[i].includes(char)) {
        newMbti[i] = char;
      } else {
        newMbti[i] = char;
        newErrors[i] = `${validChars[i].join(' 또는 ')}만 입력 가능합니다.`;
      }
    }

    // 포커스 인덱스 업데이트
    const nextFocusIndex = Math.min(upperValue.length, 4);
    setFocusedIndex(nextFocusIndex);

    setMbti(newMbti);
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && focusedIndex > 0) {
      e.preventDefault();
      const currentValue = mbti.join('');
      if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        handleInputChange(newValue);
      }
    }
  };

  const handleBoxClick = (index: number) => {
    // 클릭한 위치로 커서 이동
    const currentValue = mbti.join('');
    const newCursorPosition = Math.min(index, currentValue.length);
    setFocusedIndex(newCursorPosition);

    // 숨겨진 input에 포커스
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
      // 커서 위치 설정
      setTimeout(() => {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
  };

  const handleFocus = () => {
    const currentValue = mbti.join('');
    setFocusedIndex(currentValue.length);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [focusedIndex]);

  useEffect(() => {
    const firstEmptyIndex = mbti.findIndex((char) => char === '');
    if (firstEmptyIndex !== -1) {
      setFocusedIndex(firstEmptyIndex);
    } else {
      setFocusedIndex(3);
    }
  }, [mbti]);

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center">
        <h3 className={h3Style}>MBTI를 입력해주세요.</h3>
        <p className="text-sm text-gray-600 mt-2">I/E, N/S, T/F, J/P 순서로 입력해주세요.</p>
      </div>
      <div>
        <div className="flex flex-col items-center gap-2">
          {/* 숨겨진 실제 input */}
          <input
            ref={hiddenInputRef}
            className="absolute opacity-0 pointer-events-none"
            value={mbti.join('')}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={4}
            autoComplete="off"
          />

          {/* 시각적 input 박스들 */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded border-1 text-center font-bold cursor-text flex items-center justify-center ${
                    errors[idx]
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-sky-100 border-sky-500'
                  } ${focusedIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleBoxClick(idx)}>
                  {mbti[idx] || ''}
                </div>
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
