import { useRef } from 'react';
import { WizardLesson } from '../../../types/wizard';
import PhasedStep from '../PhasedStep';
import DrillRunner, { DrillResult } from '../DrillRunner';
import SpeakButton from '../SpeakButton';

interface Props {
  lesson: WizardLesson;
  onComplete: (score: number) => void;
}

export default function VerbsStep({ lesson, onComplete }: Props) {
  const score = useRef(0);
  return (
    <PhasedStep
      onComplete={() => onComplete(score.current)}
      phases={[
        {
          title: 'O verbo',
          render: next => (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Conheça os verbos da lição. Depois você vai montar frases trocando os pronomes: I, you, he, she, we, they.
              </p>
              {lesson.verbs.map(v => (
                <div key={v.en} className="card flex items-start gap-4">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-wizard-blue">
                      {v.en} <span className="text-lg font-normal text-gray-500">| {v.pt}</span>
                    </div>
                    {v.note && <p className="mt-1 text-sm text-gray-600">{v.note}</p>}
                  </div>
                  <SpeakButton text={v.en} times={3} label="3x" />
                </div>
              ))}
              <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-900">
                Lembre: com <strong>he / she / it</strong> o verbo ganha <strong>-s</strong> (makes, gives). Na pergunta e na negativa use{' '}
                <strong>does / doesn't</strong> e o verbo volta ao normal.
              </div>
              <div className="text-right">
                <button className="btn-primary" onClick={next}>
                  Montar frases →
                </button>
              </div>
            </div>
          ),
        },
        {
          title: 'Trocar pronomes',
          render: next => (
            <DrillRunner
              items={lesson.verbDrill}
              instructions="Monte a frase em inglês. Repare no pronome e no verbo. Só avança quando sair com facilidade."
              onComplete={(r: DrillResult) => {
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
