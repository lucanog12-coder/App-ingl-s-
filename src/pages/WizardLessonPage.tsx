import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Lock, Trophy } from 'lucide-react';
import { lessons } from '../data/lessons';
import { WIZARD_STEPS } from '../data/wizardSteps';
import { useApp } from '../context/AppContext';
import VerbsStep from '../components/wizard/steps/VerbsStep';
import NewWordsStep from '../components/wizard/steps/NewWordsStep';
import TeachRepeatDrillStep from '../components/wizard/steps/TeachRepeatDrillStep';
import CheckItOutStep from '../components/wizard/steps/CheckItOutStep';
import FluencyStep from '../components/wizard/steps/FluencyStep';
import QuestionsStep from '../components/wizard/steps/QuestionsStep';


export default function WizardLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { updateProgress, getUnitProgress } = useApp();
  const lesson = lessons.find(l => l.id === lessonId);

  const completed = (lesson && getUnitProgress(lesson.id)?.completedSections) ?? [];
  const firstPending = WIZARD_STEPS.findIndex(s => !completed.includes(s.id));
  const [current, setCurrent] = useState(firstPending === -1 ? 0 : firstPending);
  const [finished, setFinished] = useState(false);
  const [run, setRun] = useState(0);

  if (!lesson) return <div className="text-center py-20 text-gray-500">Lição não encontrada.</div>;

  const step = WIZARD_STEPS[current];
  const isUnlocked = (i: number) => i === 0 || completed.includes(WIZARD_STEPS[i - 1].id) || completed.includes(WIZARD_STEPS[i].id);

  const finishStep = (score: number) => {
    updateProgress(lesson.id, step.id, score);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (current < WIZARD_STEPS.length - 1) {
      setCurrent(current + 1);
      setRun(r => r + 1);
    } else setFinished(true);
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="card">
          <Trophy size={64} className="mx-auto text-wizard-gold mb-4" />
          <h1 className="text-3xl font-bold text-wizard-blue mb-2">Lesson {lesson.number} concluída!</h1>
          <p className="text-gray-600 mb-6">
            Você passou por todas as etapas da aula: {lesson.title}. Para fixar, refaça amanhã sem olhar o português.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigate('/units')} className="btn-primary">
              Ver aulas
            </button>
            <button
              onClick={() => {
                setCurrent(0);
                setRun(r => r + 1);
                setFinished(false);
              }}
              className="btn-gold"
            >
              Refazer a lição
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepKey = `${step.id}-${run}`;
  const props = { lesson, onComplete: finishStep };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <button onClick={() => navigate('/units')} className="text-sm text-wizard-blue hover:underline mb-2 flex items-center gap-1">
          <ChevronLeft size={16} /> Voltar para Aulas
        </button>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{lesson.book}</div>
        <h1 className="text-2xl font-bold text-wizard-blue">
          Lesson {lesson.number}: {lesson.title}
        </h1>
        <p className="text-gray-500">{lesson.titlePt}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {WIZARD_STEPS.map((s, i) => {
          const done = completed.includes(s.id);
          const active = i === current;
          const unlocked = isUnlocked(i);
          return (
            <button
              key={s.id}
              disabled={!unlocked}
              onClick={() => {
                setCurrent(i);
                setRun(r => r + 1);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                active ? 'bg-wizard-blue text-white shadow-md' : done ? 'bg-green-100 text-green-700' : unlocked ? 'bg-white text-gray-600 hover:bg-gray-100' : 'bg-gray-100 text-gray-300'
              }`}
            >
              <span className="text-xs opacity-70">{i + 1}</span>
              {s.label}
              {!unlocked && <Lock size={12} />}
              {done && !active && <span className="text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-white border-l-4 border-wizard-gold px-4 py-3 shadow-sm">
        <div className="font-bold text-gray-800">
          {current + 1}. {step.label}
        </div>
        <div className="text-sm text-gray-500">{step.goal}</div>
      </div>

      <div key={stepKey}>
        {step.id === 'verbs' && <VerbsStep {...props} />}
        {step.id === 'new-words' && <NewWordsStep {...props} />}
        {step.id === 'useful-phrases' && (
          <TeachRepeatDrillStep
            lines={lesson.usefulPhrases}
            drill={lesson.usefulPhrasesDrill}
            teachIntro="Leia as frases e entenda o sentido. Depois repita em inglês e em português e, por último, monte versões com outros pronomes e palavras."
            rounds={['en', 'pt', 'en']}
            repeatInstructions="Repita em inglês, ouça em português e repita em inglês de novo."
            drillInstructions="Troque o que a dica pede e monte a frase em inglês."
            onComplete={finishStep}
          />
        )}
        {step.id === 'grammar' && (
          <TeachRepeatDrillStep
            lines={lesson.grammar.lines}
            drill={lesson.grammar.drill}
            teachIntro={lesson.grammar.explanation}
            rounds={['en', 'en', 'en', 'pt']}
            repeatInstructions="Cada frase: 3 vezes em inglês e 1 vez em português."
            drillInstructions="Pequenas mudanças: remonte a frase substituindo o que foi pedido, em inglês."
            onComplete={finishStep}
          />
        )}
        {step.id === 'real-life' && (
          <TeachRepeatDrillStep
            lines={lesson.realLife.lines}
            drill={lesson.realLife.drill}
            teach={false}
            rounds={['en', 'pt']}
            repeatInstructions="Ouça e repita cada frase em inglês, depois veja em português."
            drillInstructions="Em todas as frases: troque a palavra indicada e remonte a frase inteira em inglês."
            onComplete={finishStep}
          />
        )}
        {step.id === 'check-it-out' && <CheckItOutStep {...props} />}
        {step.id === 'fluency' && <FluencyStep {...props} />}
        {step.id === 'questions' && <QuestionsStep {...props} />}
      </div>
    </div>
  );
}
