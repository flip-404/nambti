'use client';

import React from 'react';

export default function Step3Page() {
  const buttonStyle = 'px-4 py-2 rounded bg-sky-100 text-sky-700';
  const h3Style = 'text-lg font-bold';

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">
        <h3 className={h3Style}>친구들에게 링크를 공유해주세요.</h3>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <div>www.nambiti.com/abcd1234efgh5678</div>
          <div className="flex gap-1">
            <button className={buttonStyle} onClick={() => {}}>
              클립보드로 복사
            </button>
            <button className={buttonStyle} onClick={() => {}}>
              카톡으로 공유
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
