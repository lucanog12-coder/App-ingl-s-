import { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, Zap, ArrowRight } from 'lucide-react';
import { DrillItem } from '../../types/wizard';
import { isCorrect } from '../../lib/answer';
import { speak, stopSpeaking } from '../../lib/speech';
import MicButton from './MicButton';
import SpeakButton from './SpeakButton';

export interface DrillResult {
  firstTry: number;
  total: number;
  fast: number;
}

interface Props {
  items: DrillItem[];
  instructions: string;
  /**
   * true (padrão): item errado volta para o fim da fila até sair certo.
   * false: segue em frente (usado no Fluency, onde a frase seguinte depende da anterior).
   */
  requeue?: boolean;
  /** Mostra o gatilho em português em destaque (padrão) ou só a dica de troca. */
  promptLabel?: string;
  onComplete: (result: DrillResult) => void;
}

const FAST_MS = 7000;

type Status = 'asking' | 'right' | 'wrong';

export default function DrillRunner({ items, instructions, requeue = true, promptLabel = 'Diga em inglês', onComplete }: Props) {
  const [queue, setQueue] = useState<DrillItem[]>(items);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('asking');
  const [wasFast, setWasFast] = useState(false);
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [fast, setFast] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const current = queue[0];
  const solved = items.length - new Set(queue.map(q => q.id)).size;

  useEffect(() => () => stopSpeaking(), []);

  useEffect(() => {
    startedAt.current = Date.now();
    inputRef.current?.focus();
  }, [current?.id, queue.length]);

  const check = (candidates: string[]) => {
    if (status !== 'asking' || !current) return;
    const ok = candidates.some(c => isCorrect(c, current.answers));
    if (ok) {
      const quick = Date.now() - startedAt.current < FAST_MS;
      setWasFast(quick);
      if (quick && !missed.has(current.id)) setFast(f => f + 1);
      setStatus('right');
    } else {
      setMissed(m => new Set(m).add(current.id));
      setStatus('wrong');
    }
    speak(current.answers[0]);
  };

  const next = () => {
    if (!current) return;
    stopSpeaking();
    const [head, ...rest] = queue;
    const newQueue = status === 'wrong' && requeue ? [...rest, head] : rest;
    setInput('');
    setStatus('asking');
    setWasFast(false);
    if (newQueue.length === 0) setFinished(true);
    setQueue(newQueue);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (status === 'asking') {
      if (input.trim()) check([input]);
    } else next();
  };

  if (finished) {
    const firstTry = items.length - missed.size;
    return (
      <div className="card text-center space-y-4">
        <CheckCircle size={48} className="mx-auto text-wizard-green" />
        <h3 className="text-xl font-bold text-gray-800">Etapa dominada!</h3>
        <p className="text-gray-600">
          Acertos de primeira: <strong>{firstTry}</strong> de {items.length}
          {fast > 0 && (
            <>
              {' '}
              · respostas rápidas: <strong>{fast}</strong>
            </>
          )}
        </p>
        <button className="btn-success" onClick={() => onComplete({ firstTry, total: items.length, fast })}>
          Continuar <ArrowRight size={16} className="inline" />
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600">{instructions}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {solved} / {items.length} dominadas
        </span>
        {requeue && status === 'asking' && missed.has(current.id) && <span className="text-yellow-600 font-medium">Tentando de novo</span>}
      </div>
      <div className="bg-gray-200 rounded-full h-2">
        <div className="bg-wizard-green h-2 rounded-full transition-all" style={{ width: `${(solved / items.length) * 100}%` }} />
      </div>

      <div className="card space-y-4 border-2 border-blue-100">
        {current.base && (
          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Frase base</div>
            <div className="flex items-center gap-2 text-gray-700">
              <span>{current.base}</span>
              <SpeakButton text={current.base} />
            </div>
          </div>
        )}
        {current.cue && (
          <div className="inline-block rounded-full bg-wizard-gold/15 px-3 py-1 text-sm font-bold text-yellow-700">Troque: {current.cue}</div>
        )}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{promptLabel}</div>
          <div className="text-2xl font-bold text-gray-800">{current.prompt}</div>
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={status !== 'asking'}
            placeholder="Escreva ou fale em inglês…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 min-w-0 rounded-xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-wizard-blue focus:outline-none disabled:bg-gray-50"
          />
          <MicButton
            disabled={status !== 'asking'}
            onResult={alts => {
              setInput(alts[0] ?? '');
              check(alts);
            }}
          />
        </div>

        {status === 'right' && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-green-800">
            <CheckCircle size={20} />
            <span className="font-semibold">{current.answers[0]}</span>
            {wasFast && !missed.has(current.id) && (
              <span className="ml-auto flex items-center gap-1 text-sm font-bold text-wizard-gold">
                <Zap size={14} /> Rápido!
              </span>
            )}
          </div>
        )}
        {status === 'wrong' && (
          <div className="flex items-start gap-2 rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-yellow-900">
            <XCircle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold">{current.answers[0]}</div>
              <div className="text-sm">Ouça, repita em voz alta. {requeue ? 'Essa frase volta no fim.' : ''}</div>
            </div>
            <SpeakButton text={current.answers[0]} className="ml-auto" />
          </div>
        )}

        <div className="flex gap-2 justify-end">
          {status === 'asking' ? (
            <>
              <button type="button" onClick={() => check([''])} className="rounded-xl px-4 py-3 font-semibold text-gray-500 hover:bg-gray-100">
                Não sei
              </button>
              <button type="button" onClick={() => check([input])} disabled={!input.trim()} className="btn-primary disabled:opacity-40">
                Conferir
              </button>
            </>
          ) : (
            <button type="button" onClick={next} className="btn-primary" autoFocus>
              Próxima <ArrowRight size={16} className="inline" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
