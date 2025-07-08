'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const h3Style = 'text-lg font-bold';
  const buttonStyle = 'px-4 py-2 rounded bg-sky-100 text-sky-700';

  const [contentsIdx, setContentsIdx] = useState(0);
  const [nickName, setNickName] = useState('');
  const [mbti, setMbti] = useState(['', '', '', '']);
  const [userURL, setUserURL] = useState('');

  const moveNextPage = () => {
    setContentsIdx(contentsIdx + 1);
  };

  const handleKeyDownNickNameInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (nickName.length === 0) return;
      else setContentsIdx(contentsIdx + 1);
    }
  };

  const handleChangeMbtiInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newMBTI = [...mbti];
    const input = e.target.value.toUpperCase();

    if (input.length > 1) return;
    newMBTI[idx] = input;

    setMbti(newMBTI);
  };

  const handleClickMbtiSubmit = () => {
    if (mbti.some((value) => !value)) return;
    if (mbti.some((_, idx) => !isValidMbti(idx))) return;

    moveNextPage();
  };

  const handleClickMbtiInputJump = () => {
    setMbti(['', '', '', '']);
    moveNextPage();
  };

  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(userURL).then(() => alert('복사 성공!'));
  };

  const handleClickShare = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };

  const isValidMbti = (idx: number) => {
    if (idx === 0 && (mbti[idx] === 'E' || mbti[idx] === 'I')) return true;
    else if (idx === 1 && (mbti[idx] === 'S' || mbti[idx] === 'N')) return true;
    else if (idx === 2 && (mbti[idx] === 'F' || mbti[idx] === 'T')) return true;
    else if (idx === 3 && (mbti[idx] === 'J' || mbti[idx] === 'P')) return true;
    else return false;
  };

  const generateUserURL = () => {
    const prefix = 'www.nambiti.com/';
    const uniqueId = uuidv4();
    setUserURL(`${prefix}${uniqueId}`);
  };

  useEffect(() => {
    if (contentsIdx === 3) {
      generateUserURL();
    }
  }, [contentsIdx]);

  const contents = [
    {
      idx: 0,
      descEl: (
        <>
          <h1 className="text-2xl font-bold">남비티아이</h1>
          <p>친구들이 보는 내 MBTI는 과연?</p>
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
            {Array.from({ length: 4 }, (_, idx) => (
              <input
                key={idx}
                value={mbti[idx]}
                tabIndex={idx}
                className={`w-10 h-10 rounded border-1 text-center ${isValidMbti(idx) ? 'bg-sky-100 border-sky-500' : 'bg-red-100 border-red-500'}`}
                onChange={(e) => handleChangeMbtiInput(e, idx)}
              />
            ))}
          </div>
          <button className={buttonStyle} onClick={handleClickMbtiInputJump}>
            건너뛰기
          </button>
          <button className={buttonStyle} onClick={handleClickMbtiSubmit}>
            입력완료
          </button>
        </div>
      ),
    },
    {
      idx: 3,
      descEl: <h3 className={h3Style}>친구들에게 링크를 공유해주세요.</h3>,
      actionEl: (
        <div className="flex flex-col items-center">
          <div className="w-100 text-center text-xs pb-5">{userURL}</div>
          <div className="flex gap-3">
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
