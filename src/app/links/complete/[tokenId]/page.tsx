import CompleteCard from '@/components/link/CompleteCard';
import React from 'react';

export default async function CompletePage({ params }: { params: Promise<{ tokenId: string }> }) {
  return <CompleteCard params={params} />;
}
