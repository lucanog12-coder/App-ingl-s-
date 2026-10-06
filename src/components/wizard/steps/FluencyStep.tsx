import { useRef } from 'react';
import { DrillItem, FluencyChain, WizardLesson } from '../../../types/wizard';
import PhasedStep from '../PhasedStep';
import DrillRunner from '../DrillRunner';
import SpeakButton from '../SpeakButton';

interface Props {
  lesson: WizardLesson;
  onComplete: (score: number) => void;
}

/** Cada dica muda só uma parte da frase anterior; o resto segue o sentido da primeira frase. */
function chainToItems(chain: FluencyChain): DrillItem[] {
  return chain.steps.map((s, i) => ({
    id: `${chain.id}-${i}`,
    base: i === 0 ? chain.model : chain.steps[i - 1].answers[0],
    cue: s.cue,
    prompt: 'Diga a frase inteira',
    answers: s.answers,
  }));
}

export default function FluencyStep({ lesson, onComplete }: Props) {
  const score = useRef(0);
  return (
    <PhasedStep
      onComplete={() => onComplete(score.current)}
      phases={lesson.fluency.map((chain, i) => ({
        title: `Sequência ${i + 1}`,
        render: next => (
          <div className="space-y-4">
            <div className="rounded-xl bg-purple-50 border border-purple-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-purple-500">Frase modelo</div>
              <div className="flex items-center gap-2 text-xl font-bold text-purple-900">
                {chain.model} <SpeakButton text={chain.model} />
              </div>
              <div className="text-sm italic text-purple-700">{chain.modelPt}</div>
            </div>
            <DrillRunner
              items={chainToItems(chain)}
              requeue={false}
              promptLabel="Agora"
              instructions="Siga o sentido da primeira frase: a cada dica, troque só aquela parte e diga a frase inteira. Se errar, a frase certa vira a base da próxima."
              onComplete={r => {
                score.current += r.firstTry;
                next();
              }}
            />
          </div>
        ),
      }))}
    />
  );
}
