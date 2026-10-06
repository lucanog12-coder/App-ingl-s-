import { useRef } from 'react';
import { WizardLesson } from '../../../types/wizard';
import PhasedStep from '../PhasedStep';
import DrillRunner from '../DrillRunner';
import SpeakButton from '../SpeakButton';

interface Props {
  lesson: WizardLesson;
  onComplete: (score: number) => void;
}

export default function CheckItOutStep({ lesson, onComplete }: Props) {
  const score = useRef(0);
  return (
    <PhasedStep
      onComplete={() => onComplete(score.current)}
      phases={[
        {
          title: 'Combinações',
          render: next => (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Expressões que andam juntas. Ouça e repita cada uma em voz alta.</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {lesson.checkItOut.blocks.map((b, i) => (
                  <div
                    key={b.title}
                    className={`rounded-2xl p-4 text-white ${['bg-purple-700', 'bg-blue-600', 'bg-purple-400'][i % 3]}`}
                  >
                    <div className="mb-2 text-sm font-bold uppercase tracking-wide opacity-80">{b.title}</div>
                    <ul className="space-y-2">
                      {b.lines.map(l => (
                        <li key={l.en} className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold">{l.en}</div>
                            <div className="text-xs italic opacity-80">{l.pt}</div>
                          </div>
                          <SpeakButton text={l.en} className="!text-white hover:!bg-white/20" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <button className="btn-primary" onClick={next}>
                  Praticar →
                </button>
              </div>
            </div>
          ),
        },
        {
          title: 'Usar',
          render: next => (
            <DrillRunner
              items={lesson.checkItOut.drill}
              instructions="Use as combinações para montar as frases em inglês."
              onComplete={r => {
                score.current += r.firstTry;
                next();
              }}
            />
          ),
        },
      ]}
    />
  );
}
