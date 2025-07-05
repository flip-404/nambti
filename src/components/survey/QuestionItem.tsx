import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const scores = [
  { value: -2, label: '매우 아니다' },
  { value: -1, label: '아니다' },
  { value: 0, label: '보통이다' },
  { value: 1, label: '그렇다' },
  { value: 2, label: '매우 그렇다' },
];

interface Props {
  userName: string;
  question: string;
  answer?: number;
  setAnswer: (value: number) => void;
}

export default function QuestionItem({ userName, question, answer, setAnswer }: Props) {
  const [animate, setAnimate] = useState<boolean>(false);
  const [localAnswer, setLocalAnswer] = useState<number | undefined>(answer);
  const $timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalAnswer(answer);
  }, [question, answer]);

  const handleAnswer = (value: number) => {
    setAnimate(true);
    setLocalAnswer(value);

    if ($timeoutRef.current) clearTimeout($timeoutRef.current);
    $timeoutRef.current = setTimeout(() => {
      setAnimate(false);
      setAnswer(value);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col text-center gap-4 items-center rounded-2xl py-5 px-5 bg-white shadow-lg relative">
      <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-[var(--secondary)]" />
      <div className="text-sm font-semibold text-primary">내가 생각하는 {userName}은?</div>
      <div className="text-xl font-extrabold text-center break-keep w-[90%]">{question}</div>
      <div className="mt-10 flex flex-col items-center gap-3 w-full">
        {scores.map((score) => (
          <Button
            key={score.value}
            variant={'outline'}
            className={cn(
              `w-full h-14 text-base rounded-2xl border-2 border-gray-200 ${score.value === localAnswer && 'bg-primary text-white'}`,
              score.value === localAnswer && animate && 'animate-pop animate-duration-300'
            )}
            style={{
              borderColor: score.value === localAnswer ? 'var(--primary)' : '',
            }}
            onClick={() => handleAnswer(score.value)}>
            {score.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
