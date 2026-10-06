import { useRef, useState } from 'react';
import { CheckCircle, Lightbulb } from 'lucide-react';
import { WizardLesson } from '../../../types/wizard';
import { normalize } from '../../../lib/answer';
import PhasedStep from '../PhasedStep';
import SpeakButton from '../SpeakButton';
import MicButton from '../MicButton';

interface Props {
  lesson: WizardLesson;
  onComplete: (score: number) => void;
}

const QUESTION_START = /^(do|does|did|is|are|am|can|may|what|where|when|who|why|how|which|would|will|have|has)\b/;
const VARIATIONS_NEEDED = 10;

function AnswerQuestions({ lesson, onDone }: { lesson: WizardLesson; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showModel, setShowModel] = useState(false);
  const q = lesson.questions.items[idx];
  const valid = normalize(answer).split(' ').filter(Boolean).length >= 3;

  const next = () => {
    setAnswer('');
    setShowModel(false);
    if (idx < lesson.questions.items.length - 1) setIdx(idx + 1);
    else onDone();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Responda com frase completa (não só "yes" ou "no"). Use as palavras e o verbo da lição.</p>
      <div className="text-sm text-gray-500">
        Pergunta {idx + 1} / {lesson.questions.items.length}
      </div>
      <div className="card space-y-4 border-2 border-blue-100">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-wizard-blue">{q.question}</div>
          <SpeakButton text={q.question} />
        </div>
        <div className="text-sm italic text-gray-400">{q.questionPt}</div>
        <div className="flex gap-2">
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && valid && setShowModel(true)}
            placeholder="Sua resposta em inglês…"
            className="flex-1 min-w-0 rounded-xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-wizard-blue focus:outline-none"
          />
          <MicButton onResult={alts => setAnswer(alts[0] ?? '')} />
        </div>
        {showModel && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-green-900">
            <div className="text-xs font-semibold uppercase">Exemplo de resposta</div>
            <div className="flex items-center gap-2 font-semibold">
              {q.modelAnswer} <SpeakButton text={q.modelAnswer} />
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {!showModel ? (
            <button className="btn-primary disabled:opacity-40" disabled={!valid} onClick={() => setShowModel(true)}>
              Responder
            </button>
          ) : (
            <button className="btn-primary" onClick={next}>
              Próxima →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Variations({ lesson, onDone }: { lesson: WizardLesson; onDone: (count: number) => void }) {
  const [list, setList] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const model = lesson.questions.variationsModel;

  const add = (text: string) => {
    const n = normalize(text);
    if (n.split(' ').length < 3) return setError('Escreva uma pergunta completa (pelo menos 3 palavras).');
    if (!QUESTION_START.test(n)) return setError('Comece como pergunta: Do / Does / What / Where / How…');
    if (n === normalize(model)) return setError('Essa é a frase modelo. Troque alguma coisa!');
    if (list.some(l => normalize(l) === n)) return setError('Você já escreveu essa. Crie uma diferente.');
    setError('');
    const clean = text.trim().replace(/[.!]*$/, '');
    setList([...list, clean.endsWith('?') ? clean : `${clean}?`]);
    setDraft('');
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Crie <strong>{VARIATIONS_NEEDED} variações</strong> da pergunta abaixo, trocando pronome, verbo ou palavra (some ↔ any, want ↔ have, you ↔ she…).
      </p>
      <div className="rounded-xl bg-purple-50 border border-purple-100 p-4 flex items-center gap-2 text-xl font-bold text-purple-900">
        {model} <SpeakButton text={model} />
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && draft.trim() && add(draft)}
          placeholder={`Variação ${Math.min(list.length + 1, VARIATIONS_NEEDED)}…`}
          disabled={list.length >= VARIATIONS_NEEDED}
          className="flex-1 min-w-0 rounded-xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-wizard-blue focus:outline-none disabled:bg-gray-50"
        />
        <MicButton disabled={list.length >= VARIATIONS_NEEDED} onResult={alts => setDraft(alts[0] ?? '')} />
        <button className="btn-primary disabled:opacity-40" disabled={!draft.trim() || list.length >= VARIATIONS_NEEDED} onClick={() => add(draft)}>
          Adicionar
        </button>
      </div>
      {error && <div className="text-sm font-medium text-wizard-red">{error}</div>}

      <div className="bg-gray-200 rounded-full h-2">
        <div className="bg-wizard-green h-2 rounded-full transition-all" style={{ width: `${(list.length / VARIATIONS_NEEDED) * 100}%` }} />
      </div>
      <ol className="card list-decimal space-y-1 pl-10">
        {list.length === 0 && <li className="list-none -ml-6 text-gray-400">Suas variações aparecem aqui.</li>}
        {list.map(l => (
          <li key={l} className="text-gray-800">
            <span className="inline-flex items-center gap-1">
              {l} <SpeakButton text={l} />
            </span>
          </li>
        ))}
      </ol>

      <button type="button" className="flex items-center gap-1 text-sm text-wizard-blue hover:underline" onClick={() => setShowExamples(s => !s)}>
        <Lightbulb size={14} /> {showExamples ? 'Esconder exemplos' : 'Ver exemplos'}
      </button>
      {showExamples && (
        <ul className="text-sm text-gray-600 list-disc pl-6">
          {lesson.questions.variationsExamples.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {list.length >= VARIATIONS_NEEDED && (
        <div className="text-right">
          <button className="btn-success" onClick={() => onDone(list.length)}>
            <CheckCircle size={16} className="inline" /> Concluir
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuestionsStep({ lesson, onComplete }: Props) {
  const score = useRef(0);
  return (
    <PhasedStep
      onComplete={() => onComplete(score.current)}
      phases={[
        {
          title: 'Responder',
          render: next => (
            <AnswerQuestions
              lesson={lesson}
              onDone={() => {
                score.current += lesson.questions.items.length;
                next();
              }}
            />
          ),
        },
        {
          title: '10 variações',
          render: next => (
            <Variations
              lesson={lesson}
              onDone={count => {
                score.current += count;
                next();
              }}
            />
          ),
        },
      ]}
    />
  );
}
