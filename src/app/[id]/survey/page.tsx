'use client';

import surveyData from './survey.json';
import { useState } from 'react';

interface Problem {
  id: number;
  description: string;
  factor: 'EI' | 'SN' | 'TF' | 'JP';
}

const surveys = surveyData as Problem[];

export default function Survey() {
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<number, number>>({});

  const disableNext = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => step * 5 + index + 1)
      .some((index) => scores[index] === undefined);
  };

  return (
    <main className="w-[500px] h-screen overflow-auto flex flex-col items-center gap-8">
      {surveys.slice(step * 5, step * 5 + 5).map((survey) => (
        <div key={survey.id} className="flex flex-col text-center gap-2  items-center">
          <span>{survey.description}</span>
          <div className="w-[300px] flex flex-row justify-between items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{
                  width: Math.abs(index - 2) * 0.5 + 1.25 + 'rem',
                  height: Math.abs(index - 2) * 0.5 + 1.25 + 'rem',
                  backgroundColor: scores[survey.id] === index ? '#628ba9' : '#f0f0f0',
                }}
                onClick={() => {
                  setScores((prev) => ({ ...prev, [survey.id]: index }));
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-row justify-between w-full">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => {
            if (step > 0) setStep(step - 1);
          }}>
          이전
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          disabled={disableNext()}
          onClick={() => {
            if (step < Math.ceil(surveys.length / 5) - 1) setStep(step + 1);
            else {
              // Submit logic here
              console.log('submit:', scores);
              alert('설문이 제출되었습니다!');
            }
          }}>
          {step === Math.ceil(surveys.length / 5) - 1 ? '제출' : '다음'}
        </button>
      </div>
    </main>
  );
}
