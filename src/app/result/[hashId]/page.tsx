async function ResultPage({ params }: { params: Promise<{ hashId: string }> }) {
  const { hashId } = await params;
  console.log('hashId:', hashId);

  return (
    <div>
      <h1>Result Page</h1>
      <p>Hash ID: {hashId}</p>
    </div>
  );
}
export default ResultPage;
