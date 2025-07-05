interface Props {
  step: number;
  setStep: (step: number) => void;
  scores: Record<number, number>;
  totalSteps: number;
}

export default function SurveyFooter({ step, setStep, scores, totalSteps }: Props) {
  const disableNext = () => {
    return scores[step] === undefined;
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 mt-auto">
      <button
        className="bg-gray-300 px-4 py-2 rounded-xl w-[calc(50%-0.5rem)] h-12"
        onClick={() => {
          if (step > 0) setStep(step - 1);
        }}>
        이전
      </button>
      <button
        disabled={disableNext()}
        onClick={() => {
          if (step < totalSteps) setStep(step + 1);
          else {
            // Submit logic here
            console.log('submit:', scores);
            alert('설문이 제출되었습니다!');
          }
        }}
        className="bg-gray-300 px-4 py-2 rounded-xl w-[calc(50%-0.5rem)] h-12 disabled:opacity-50"
        style={{
          backgroundColor: step === totalSteps && !disableNext() ? 'var(--primary)' : '',
          color: step === totalSteps && !disableNext() ? 'white' : '',
        }}>
        {step === totalSteps ? '완료하기' : '다음'}
      </button>
    </div>
  );
}
