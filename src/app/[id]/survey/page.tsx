'use client';

import surveyData from './survey.json';
import QuestionItem from '@/components/survey/QuestionItem';
import SurveyHeader from '@/components/survey/SurveyHeader';
import { useState } from 'react';

interface Problem {
  id: number;
  description: string;
  factor: 'EI' | 'SN' | 'TF' | 'JP';
}

const surveys = surveyData as Problem[];

export default function Survey() {
  const [userName, setUserName] = useState<string>('userName');
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<number, number>>({});

  const handleAnswer = (value: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [step]: value,
    }));

    if (step < surveys.length - 1) setStep(step + 1);
  };

  const disableNext = () => {
    return scores[step] === undefined;
  };

  return (
    <div className="w-full h-full flex flex-col items-center rounded-md">
      <div className="w-full p-4">
        <SurveyHeader step={step} totalSteps={surveys.length} />
        <QuestionItem
          userName={userName}
          question={surveyData[step].description}
          answer={scores[step]}
          setAnswer={handleAnswer}
        />
      </div>
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
            if (step < surveyData.length - 1) setStep(step + 1);
            else {
              // Submit logic here
              console.log('submit:', scores);
              alert('설문이 제출되었습니다!');
            }
          }}
          className="bg-gray-300 px-4 py-2 rounded-xl w-[calc(50%-0.5rem)] h-12 disabled:opacity-50"
          style={{
            backgroundColor:
              step === surveyData.length - 1 && !disableNext() ? 'var(--primary)' : '',
            color: step === surveyData.length - 1 && !disableNext() ? 'white' : '',
          }}>
          {step === surveys.length - 1 ? '제출' : '다음'}
        </button>
      </div>
    </div>
  );
}
