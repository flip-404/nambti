import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, SendHorizonal } from 'lucide-react';

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
      <Button
        variant="normal"
        className="w-[calc(50%-0.5rem)] h-12 text-base"
        disabled={step === 0}
        onClick={() => {
          if (step > 0) setStep(step - 1);
        }}>
        <div className="flex flex-row w-full items-center justify-center pr-3.5">
          <ChevronLeft />
          <span>이전</span>
        </div>
      </Button>
      <Button
        variant="normal"
        disabled={disableNext()}
        onClick={() => {
          if (step < totalSteps) setStep(step + 1);
          else {
            // Submit logic here
            console.log('submit:', scores);
            alert('남비티아이를 완료했습니다');
          }
        }}
        className="w-[calc(50%-0.5rem)] h-12 text-base"
        style={{
          backgroundColor: step === totalSteps && !disableNext() ? 'var(--primary)' : '',
          color: step === totalSteps && !disableNext() ? 'white' : '',
        }}>
        {step === totalSteps ? (
          <div className="flex flex-row w-full items-center justify-center pl-2 gap-1">
            완료하기
            <SendHorizonal />
          </div>
        ) : (
          <div className="flex flex-row w-full items-center justify-center pl-3.5">
            다음
            <ChevronRight />
          </div>
        )}
      </Button>
    </div>
  );
}
