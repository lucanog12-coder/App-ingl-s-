import { useMemo, useRef } from 'react';
import { DrillItem, WizardLesson } from '../../../types/wizard';
import { shuffle } from '../../../lib/answer';
import PhasedStep from '../PhasedStep';
import ListenRepeat from '../ListenRepeat';
import DrillRunner from '../DrillRunner';

interface Props {
  lesson: WizardLesson;
  onComplete: (score: number) => void;
}

export default function NewWordsStep({ lesson, onComplete }: Props) {
  const score = useRef(0);

  const [round4, round5] = useMemo(() => {
    const toItem = (suffix: string) => (w: WizardLesson['newWords'][number], i: number): DrillItem => ({
      id: `nw-${suffix}-${i}`,
      prompt: w.pt,
      answers: [w.en],
    });
    return [shuffle(lesson.newWords.map(toItem('r4'))), shuffle(lesson.newWords.map(toItem('r5')))];
  }, [lesson]);

  return (
    <PhasedStep
      onComplete={() => onComplete(score.current)}
      phases={[
        {
          title: 'Ouvir e repetir 3x',
          render: next => (
            <ListenRepeat
              items={lesson.newWords}
              rounds={['en', 'en', 'en']}
              instructions="Ouça cada palavra e repita 3 vezes. Se usar o microfone e a pronúncia sair diferente, o app fala a forma certa: repita de novo."
              onComplete={next}
            />
          ),
        },
        {
          title: '4ª vez: português → inglês',
          render: next => (
            <DrillRunner
              items={round4}
              instructions="Agora aparece a palavra em português. Responda em inglês."
              onComplete={r => {
                score.current += r.firstTry;
                next();
              }}
            />
          ),
        },
        {
          title: '5ª vez: português → inglês',
          render: next => (
            <DrillRunner
              items={round5}
              instructions="Mais uma rodada, em outra ordem. Responda rápido!"
              onComplete={r => {
                score.current += r.firstTry;
                next();
              }}
            />
          ),
        },
        {
          title: 'Frases com o verbo',
          render: next => (
            <DrillRunner
              items={lesson.newWordsSentences}
              instructions="Monte frases com as palavras novas e o verbo da lição."
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
