interface Props {
  step: number;
  totalSteps: number;
}

export default function SurveyHeader({ step, totalSteps }: Props) {
  return (
    <div className="w-full h-20 flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between items-center text-sm">
        <span className="text-primary">설문 진행중</span>
        <span>
          {step + 1}/{totalSteps}
        </span>
      </div>
      <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((step + 1) / totalSteps) * 100}%`,
            background: 'linear-gradient(90deg, #AB53D6, #D74891 100%)',
          }}
        />
      </div>
    </div>
  );
}
