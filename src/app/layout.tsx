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
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex-grow p-4 flex justify-center items-center">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
