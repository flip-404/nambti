import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NamBTI : 남비티아이',
  description: '남이 해주는 MBTI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <div className="flex flex-col w-full h-full bg-[var(--secondary)]">
          <Header />
          <main className="w-full h-full p-4">{children}</main>
          <Footer />
        </div>
        {children}
      </body>
    </html>
  );
}
