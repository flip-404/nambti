import StartSurveyCard from '@/components/survey/StartSurveyCard';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';

const prisma = new PrismaClient();

export default async function SurveyStartPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  const user = await prisma.user.findUnique({
    where: { token: tokenId },
  });

  if (!user) {
    redirect('/');
  }

  return <StartSurveyCard user={user} />;
}
