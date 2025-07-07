// app/api/users/route.ts
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// username과 현재시간(난수)을 합성하여 hash token 생성 함수
function generateHashToken(username: string): string {
  const timestamp = Date.now().toString();
  const randomValue = Math.random().toString(36).substring(2, 15);
  const combinedString = `${username}_${timestamp}_${randomValue}`;

  return crypto.createHash('sha256').update(combinedString).digest('hex');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get('tokenId');

  if (!tokenId) {
    return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { token: tokenId },
  });

  if (!user) {
    return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, mbti, isPublic } = body;

    // 입력값 검증
    if (!username || !mbti || typeof isPublic !== 'boolean') {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // username 길이 검증 (20자 이하)
    if (username.length > 20) {
      return NextResponse.json({ error: '사용자명은 20자 이하여야 합니다.' }, { status: 400 });
    }

    // mbti 배열 검증 (4개 요소)
    if (!Array.isArray(mbti) || mbti.length !== 4) {
      return NextResponse.json(
        { error: 'MBTI는 4개의 요소를 가진 배열이어야 합니다.' },
        { status: 400 }
      );
    }

    // mbti 배열을 문자열로 변환 (예: ['E', 'N', 'F', 'P'] -> 'ENFP')
    const mbtiString = mbti.join('').toUpperCase();

    // mbti 문자열 길이 검증 (4자)
    if (mbtiString.length !== 4) {
      return NextResponse.json({ error: 'MBTI 문자열은 4자여야 합니다.' }, { status: 400 });
    }

    // 고유한 토큰 생성 (중복 방지)
    const token = generateHashToken(username);
    const existingUser = await prisma.user.findUnique({
      where: { token },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '토큰 생성에 실패했습니다. 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        username,
        mbti: mbtiString,
        token: token!,
        isMbtiPublic: isPublic,
      },
    });

    const { token: userToken, ...userResponse } = user;

    return NextResponse.json(
      {
        message: '사용자가 성공적으로 생성되었습니다.',
        user: userResponse,
        token: userToken, // 클라이언트가 필요한 경우 포함
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('User creation error:', error);

    // Prisma 고유 제약 조건 에러 처리
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: '이미 존재하는 토큰입니다. 다시 시도해주세요.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
