'use client';

import React from 'react';

export default function Step2Page() {
  const buttonStyle = 'px-4 py-2 rounded bg-sky-100 text-sky-700';
  const h3Style = 'text-lg font-bold';

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">
        <h3 className={h3Style}>MBTI를 입력해주세요.</h3>
      </div>
      <div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <input
                key={idx}
                className="w-10 h-10 rounded border-1 bg-sky-100 border-sky-500"
                onChange={() => {}}
              />
            ))}
          </div>
          <button className={buttonStyle} onClick={() => {}}>
            건너뛰기
          </button>
          <button className={buttonStyle} onClick={() => {}}>
            확인
          </button>
        </div>
      </div>
    </main>
  );
}
