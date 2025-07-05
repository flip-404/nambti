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
  return (
    <div className="w-full flex flex-col text-center gap-4 items-center rounded-2xl py-5 px-5 bg-white shadow-lg relative">
      <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-[var(--secondary)]" />
      <div className="text-sm text-[var(--primary)]">내가 생각하는 {userName}은?</div>
      <div className="text-xl font-bold text-center break-keep w-[90%]">{question}</div>
      <div className="mt-10 flex flex-col items-center gap-3 w-full">
        {scores.map((score) => (
          <button
            key={score.value}
            className={`w-full h-14 rounded-2xl border-2 border-gray-200 ${score.value === answer && 'bg-[var(--primary)] text-white'}`}
            style={{
              borderColor: score.value === answer ? 'var(--primary)' : '',
            }}
            onClick={() => setAnswer(score.value)}>
            <span>{score.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
