'use client';

import surveyData from './survey.json';
import QuestionItem from '@/components/survey/QuestionItem';
import SurveyFooter from '@/components/survey/SurveyFooter';
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
      <SurveyFooter scores={scores} step={step} setStep={setStep} totalSteps={surveys.length - 1} />
    </div>
  );
}
