import Link from 'next/link';
import React from 'react';

export default function Home() {
  const buttonStyle = 'px-4 py-2 rounded bg-sky-100 text-sky-700';

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justfy-center items-center">
        <h1 className="text-2xl font-bold">Nambti</h1>
        <p>남비티아이가 뭔지 대충 설명 어쩌고 저쩌고</p>
      </div>
      <div>
        <Link className={buttonStyle} href="/links/create/step-1">
          내 Nambti 링크 생성하기
        </Link>
      </div>
    </main>
  );
}
