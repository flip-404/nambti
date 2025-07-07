'use client';

import React, { useState } from 'react';

export default function Step1Page() {
  const h3Style = 'text-lg font-bold';

  const [contentsIdx, setContentsIdx] = useState(0);
  const [nickName, setNickName] = useState('');

  const handleKeyDownNickNameInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setContentsIdx(contentsIdx + 1);
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">
        <h3 className={h3Style}>이름(닉네임)을 입력해주세요.</h3>
      </div>
      <div>
        <input
          className="px-4 py-2 rounded border-1 bg-sky-100 border-sky-500"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          onKeyDown={handleKeyDownNickNameInput}
        />
      </div>
    </main>
  );
}
