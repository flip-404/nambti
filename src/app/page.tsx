import TestClientComponent from '@/components/TestClientComponent';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hello`);
  // 이건 서버 컴포넌트로 서버에서 fetch를 사용할 때는 절대경로를 사용해야 함.

  const data = await res.json();
  console.log(data);

  return (
    <div>
      이건 서버 컴포넌트야. <br />
      {data.message}
      <TestClientComponent />
      <br />
      <Link
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        href="/testing">
        MBTI 시작하기
      </Link>
    </div>
  );
}
