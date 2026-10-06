import { ReactNode, useState } from 'react';

export interface Phase {
  title: string;
  render: (next: () => void) => ReactNode;
}

interface Props {
  phases: Phase[];
  onComplete: () => void;
}

/** Executa as fases de uma etapa em ordem fixa (ex.: ouvir → português → montar frases). */
export default function PhasedStep({ phases, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const next = () => (idx < phases.length - 1 ? setIdx(idx + 1) : onComplete());

  return (
    <div className="space-y-4">
      {phases.length > 1 && (
        <ol className="flex flex-wrap gap-2 text-xs font-semibold">
          {phases.map((p, i) => (
            <li
              key={p.title}
              className={`rounded-full px-3 py-1 ${
                i < idx ? 'bg-green-100 text-green-700' : i === idx ? 'bg-wizard-blue text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i + 1}. {p.title}
            </li>
          ))}
        </ol>
      )}
      <div key={idx}>{phases[idx].render(next)}</div>
    </div>
  );
}
