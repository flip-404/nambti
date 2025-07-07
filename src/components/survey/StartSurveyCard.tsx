'use client';

import { Card } from '../ui/card';
import { User } from '@prisma/client';
import { Heart, MoreHorizontal, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function StartSurveyCard({ user }: { user: User }) {
  return (
    <>
      <Card className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">NamBTI</h1>
          </div>
          <MoreHorizontal className="w-6 h-6 text-gray-400" />
        </div>

        {/* Profile Section */}
        <div className="px-6 py-8 text-center">
          {/* User Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              {user.username} 사용자의
            </h2>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              남비티아이
            </h3>
            <p className="text-gray-600 mb-2">친구가 보는 나의 모습은 어떨까요?</p>
            <p className="text-gray-600">재미있는 설문을 통해 알아보세요!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 space-y-4">
          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <Link href={`/${user.token}/survey`}>설문하기</Link>
          </button>

          <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
            <X className="w-5 h-5" />
            <Link href={`/${user.token}/result`}>결과보기</Link>
          </button>
        </div>

        {/* Statistics */}
        <div className="px-6 pb-6 flex justify-center space-x-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">24</div>
            <div className="text-sm text-gray-600">참여자</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-1">156</div>
            <div className="text-sm text-gray-600">총 응답</div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="px-6 pb-8 text-center">
          <p className="text-sm text-gray-500">친구들이 보는 나의 진짜 모습을 발견해보세요</p>
        </div>
      </Card>
    </>
  );
}
