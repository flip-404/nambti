'use client';

import React, { useState } from 'react';

export default function Home() {
  const h3Style = 'text-lg font-bold';
  const buttonStyle = 'px-4 py-2 rounded bg-sky-100 text-sky-700';

  const [contentsIdx, setContentsIdx] = useState(0);
  const [nickName, setNickName] = useState('');
  const [mbti, setMbti] = useState(['', '', '', '']);

  const moveNextPage = () => {
    setContentsIdx(contentsIdx + 1);
  };

  const handleKeyDownNickNameInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setContentsIdx(contentsIdx + 1);
  };

  const handleChangeMbtiInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newMBTI = [...mbti];
    newMBTI[idx] = e.target.value;

    setMbti(newMBTI);
  };

  const handleClickMbtiInputJump = () => {
    setContentsIdx(contentsIdx + 1);
    setMbti(['', '', '', '']);
  };

  const handleClickCopyLink = () => {
    navigator.clipboard
      .writeText('http://www.nambiti.com/abcd1234dfgh5678')
      .then(() => alert('복사 성공!')); // 토스트 open
  };

  const handleClickShare = () => {};

  const contents = [
    {
      idx: 0,
      descEl: (
        <>
          <h1 className="text-2xl font-bold">Nambti</h1>
          <p>남비티아이가 뭔지 대충 설명 어쩌고 저쩌고</p>
        </>
      ),
      actionEl: (
        <button className={buttonStyle} onClick={moveNextPage}>
          내 Nambti 링크 생성하기
        </button>
      ),
    },
    {
      idx: 1,
      descEl: <h3 className={h3Style}>이름(닉네임)을 입력해주세요.</h3>,
      actionEl: (
        <input
          className="px-4 py-2 rounded border-1 bg-sky-100 border-sky-500"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          onKeyDown={handleKeyDownNickNameInput}
        />
      ),
    },
    {
      idx: 2,
      descEl: <h3 className={h3Style}>MBTI를 입력해주세요.</h3>,
      actionEl: (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <input
                key={idx}
                className="w-10 h-10 rounded border-1 bg-sky-100 border-sky-500"
                onChange={(e) => handleChangeMbtiInput(e, idx)}
              />
            ))}
          </div>
          <button className={buttonStyle} onClick={handleClickMbtiInputJump}>
            건너뛰기
          </button>
          <button className={buttonStyle} onClick={moveNextPage}>
            확인
          </button>
        </div>
      ),
    },
    {
      idx: 3,
      descEl: <h3 className={h3Style}>친구들에게 링크를 공유해주세요.</h3>,
      actionEl: (
        <div className="flex flex-col items-center">
          <div>www.nambiti.com/abcd1234efgh5678</div>
          <div className="flex gap-1">
            <button className={buttonStyle} onClick={handleClickCopyLink}>
              클립보드로 복사
            </button>
            <button className={buttonStyle} onClick={handleClickShare}>
              카톡으로 공유
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">{contents[contentsIdx].descEl}</div>
      <div>{contents[contentsIdx].actionEl}</div>
    </main>
  );
}
