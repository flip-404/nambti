'use client';

import { useEffect, useState } from 'react';

export default function TestClientComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  return (
    <div>
      이건 클라이언트 컴포넌트야. <br />
      {message ? message : '로딩 중...'}
    </div>
  );
}
