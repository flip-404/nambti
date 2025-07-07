'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLinkBuilderStore } from '@/store/useLinkBuilderStore';
import { Shield, Share2, Lock, Info, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Step3Page() {
  const { setUsername, setMbti, isPublic, setIsPublic, username, mbti } = useLinkBuilderStore();
  const router = useRouter();

  const handleContinue = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, mbti, isPublic }),
    });

    if (!response.ok) {
      alert('남비티아이 링크 생성에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    const data = await response.json();
    router.push(`/links/complete/${data.token}`);

    // Reset the store after successful creation
    setUsername('');
    setMbti(['', '', '', '']);
    setIsPublic(true);
    // Optionally, you can also reset the local storage
    localStorage.removeItem('link-builder-storage');
  };

  return (
    <>
      {/* Main Card */}
      <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NamBTI</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          </div>

          {/* Privacy Icon */}
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>

          {/* Main Text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              내 MBTI 공유여부를 선택해 주세요
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              비공개시 다른사람에게 절대 나의 <strong>MBTI</strong>는 보이지 않습니다.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {/* Public Option */}
            <div
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                isPublic
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
              onClick={() => setIsPublic(true)}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isPublic ? 'border-purple-500' : 'border-gray-300'
                  }`}>
                  {isPublic && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>}
                </div>
                <Share2 className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">공유</div>
                  <div className="text-sm text-gray-600">내 MBTI를 다른 사람들과 공유합니다</div>
                </div>
              </div>
            </div>

            {/* Private Option */}
            <div
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                !isPublic
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
              onClick={() => setIsPublic(false)}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    !isPublic ? 'border-purple-500' : 'border-gray-300'
                  }`}>
                  {!isPublic && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>}
                </div>
                <Lock className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-900">비공개</div>
                  <div className="text-sm text-gray-600">내 MBTI를 비공개로 유지합니다</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>안내사항</strong>
                <br />
                공유 설정은 언제든지 변경할 수 있으며, 비공개 선택시에도 <strong>
                  NamBTI
                </strong>{' '}
                기능은 정상적으로 이용 가능합니다.
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105"
            size="lg"
            onClick={handleContinue}>
            계속하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
