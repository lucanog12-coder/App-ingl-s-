import { useState } from 'react';
import { Exercise } from '../../types';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface Props {
  exercises: Exercise[];
  onComplete: (score: number) => void;
}

export default function ExercisesSection({ exercises, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const exercise = exercises[current];
  const normalize = (s: string) => s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, ' ');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const isCorrect = normalize(answer) === normalize(exercise.correctAnswer);
    setResults(r => [...r, isCorrect]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (current < exercises.length - 1) {
      setCurrent(c => c + 1);
      setAnswer('');
      setSubmitted(false);
    } else {
      setShowSummary(true);
    }
  };

  const score = results.filter(Boolean).length;

  if (showSummary) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="card text-center space-y-6">
        <Trophy size={64} className={`mx-auto ${pct >= 70 ? 'text-wizard-gold' : 'text-gray-400'}`} />
        <div>
          <h2 className="text-3xl font-bold text-wizard-blue">{score}/{exercises.length}</h2>
          <p className="text-gray-500">acertos — {pct}%</p>
        </div>
        <div className={`text-lg font-bold ${pct >= 70 ? 'text-wizard-green' : 'text-red-500'}`}>
          {pct >= 90 ? 'Excelente!' : pct >= 70 ? 'Muito bom!' : 'Continue praticando!'}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => { setCurrent(0); setAnswer(''); setSubmitted(false); setResults([]); setShowSummary(false); }}
            className="flex items-center gap-2 btn-gold"
          >
            <RotateCcw size={16} /> Refazer
          </button>
          <button onClick={() => onComplete(score * 5)} className="btn-success flex items-center gap-2">
            <CheckCircle size={16} /> Concluir Unidade
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = submitted && normalize(answer) === normalize(exercise.correctAnswer);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-wizard-blue">Exercícios</h2>
        <span className="text-sm text-gray-500">{current + 1} / {exercises.length}</span>
      </div>

      <div className="bg-gray-200 rounded-full h-2">
        <div className="bg-wizard-blue h-2 rounded-full transition-all" style={{ width: `${(current / exercises.length) * 100}%` }} />
      </div>

      <div className="card border-2 border-gray-100 space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-wizard-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {exercise.type === 'transform' ? 'Transforme' :
             exercise.type === 'multiple-choice' ? 'Múltipla escolha' :
             exercise.type === 'fill-blank' ? 'Complete' : 'Exercício'}
          </span>
        </div>

        <p className="text-lg font-medium text-gray-800">{exercise.question}</p>
        {exercise.questionPt && <p className="text-sm text-gray-500 italic">{exercise.questionPt}</p>}

        {exercise.type === 'multiple-choice' && exercise.options ? (
          <div className="grid gap-2">
            {exercise.options.map(opt => (
              <button
                key={opt}
                onClick={() => !submitted && setAnswer(opt)}
                disabled={submitted}
                className={`text-left px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                  submitted
                    ? opt === exercise.correctAnswer
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : opt === answer
                        ? 'border-red-400 bg-red-50 text-red-800'
                        : 'border-gray-200 text-gray-400'
                    : answer === opt
                      ? 'border-wizard-blue bg-blue-50 text-wizard-blue'
                      : 'border-gray-200 hover:border-wizard-blue'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={answer}
            onChange={e => !submitted && setAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !submitted && handleSubmit()}
            placeholder="Digite sua resposta..."
            disabled={submitted}
            className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 font-medium outline-none transition-colors ${
              submitted
                ? isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                : 'border-gray-300 focus:border-wizard-blue'
            }`}
          />
        )}

        {submitted && (
          <div className={`rounded-xl p-4 flex items-start gap-3 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {isCorrect
              ? <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              : <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className={`font-bold text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correto! Excelente!' : `Resposta correta: "${exercise.correctAnswer}"`}
              </p>
              <p className="text-sm text-gray-600 mt-1">{exercise.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={handleSubmit} disabled={!answer.trim()} className="btn-primary disabled:opacity-50">
            Verificar Resposta
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary flex items-center gap-2">
            {current < exercises.length - 1 ? 'Próximo Exercício →' : 'Ver Resultado →'}
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full flex-1 ${
              i < results.length
                ? results[i] ? 'bg-wizard-green' : 'bg-red-400'
                : i === current ? 'bg-wizard-blue' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
