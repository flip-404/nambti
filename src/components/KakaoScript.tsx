'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoScript = () => {
  const handleLoadKakao = () => {
    // window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
    window.Kakao.init('e45ea7abfda4350e0d066c29f20e4a17');
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={handleLoadKakao}
    />
  );
};

export default KakaoScript;
