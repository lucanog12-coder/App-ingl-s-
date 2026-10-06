import { useRef } from 'react';
import { BilingualLine, DrillItem } from '../../../types/wizard';
import { Lang } from '../../../lib/speech';
import PhasedStep, { Phase } from '../PhasedStep';
import TeachList from '../TeachList';
import ListenRepeat from '../ListenRepeat';
import DrillRunner from '../DrillRunner';

interface Props {
  lines: BilingualLine[];
  drill: DrillItem[];
  /** Explicação mostrada na leitura (omitir pula a fase de leitura). */
  teachIntro?: string;
  teach?: boolean;
  /** Rodadas de ouvir e repetir (omitir pula a fase). */
  rounds?: Lang[];
  repeatInstructions?: string;
  drillInstructions: string;
  onComplete: (score: number) => void;
}

export default function TeachRepeatDrillStep({
  lines,
  drill,
  teachIntro,
  teach = true,
  rounds,
  repeatInstructions = '',
  drillInstructions,
  onComplete,
}: Props) {
  const score = useRef(0);
  const phases: Phase[] = [];

  if (teach) {
    phases.push({ title: 'Ler e entender', render: next => <TeachList lines={lines} intro={teachIntro} onDone={next} /> });
  }
  if (rounds) {
    phases.push({
      title: 'Repetir',
      render: next => <ListenRepeat items={lines} rounds={rounds} instructions={repeatInstructions} onComplete={next} />,
    });
  }
  phases.push({
    title: 'Trocar e remontar',
    render: next => (
      <DrillRunner
        items={drill}
        instructions={drillInstructions}
        onComplete={r => {
          score.current += r.firstTry;
          next();
        }}
      />
    ),
  });

  return <PhasedStep phases={phases} onComplete={() => onComplete(score.current)} />;
}
