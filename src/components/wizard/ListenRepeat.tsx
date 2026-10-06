import { useEffect, useState } from 'react';
import { CheckCircle, Volume2 } from 'lucide-react';
import { Lang, speak, stopSpeaking } from '../../lib/speech';
import { isCorrect } from '../../lib/answer';
import MicButton from './MicButton';

interface Item {
  en: string;
  pt: string;
  phonetic?: string;
}

interface Props {
  items: Item[];
  /** Sequência de rodadas por item, ex.: ['en','en','en','pt']. */
  rounds: Lang[];
  instructions: string;
  onComplete: () => void;
}

/**
 * Ouvir e repetir: cada item passa pelas rodadas definidas (3x em inglês, depois português…).
 * Pronúncia errada no microfone → o app só fala a forma certa e o aluno tenta de novo.
 */
export default function ListenRepeat({ items, rounds, instructions, onComplete }: Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [recast, setRecast] = useState(false);
  const [heardOk, setHeardOk] = useState(false);

  const item = items[itemIdx];
  const lang = rounds[roundIdx];
  const text = lang === 'en' ? item.en : item.pt;
  const ptShown = rounds.slice(0, roundIdx + 1).includes('pt');

  useEffect(() => () => stopSpeaking(), []);

  const play = () => speak(text, lang);

  const advance = () => {
    setRecast(false);
    setHeardOk(false);
    if (roundIdx < rounds.length - 1) {
      const next = roundIdx + 1;
      setRoundIdx(next);
      speak(rounds[next] === 'en' ? item.en : item.pt, rounds[next]);
    } else if (itemIdx < items.length - 1) {
      const nextItem = items[itemIdx + 1];
      setItemIdx(itemIdx + 1);
      setRoundIdx(0);
      speak(rounds[0] === 'en' ? nextItem.en : nextItem.pt, rounds[0]);
    } else {
      onComplete();
    }
  };

  const onSpoken = (alts: string[]) => {
    if (alts.some(a => isCorrect(a, [item.en]))) {
      setRecast(false);
      setHeardOk(true);
      setTimeout(advance, 700);
    } else {
      setRecast(true);
      speak(item.en, 'en', 0.8);
    }
  };

  const enCountSoFar = rounds.slice(0, roundIdx + 1).filter(r => r === 'en').length;
  const enTotal = rounds.filter(r => r === 'en').length;

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600">{instructions}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Item {itemIdx + 1} / {items.length}
        </span>
        <div className="flex gap-1.5">
          {rounds.map((r, i) => (
            <span
              key={i}
              className={`h-7 min-w-7 px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${
                i < roundIdx ? 'bg-wizard-green text-white' : i === roundIdx ? 'bg-wizard-blue text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {r.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-wizard-blue h-2 rounded-full transition-all"
          style={{ width: `${((itemIdx * rounds.length + roundIdx) / (items.length * rounds.length)) * 100}%` }}
        />
      </div>

      <div className="card text-center space-y-3 border-2 border-blue-100 min-h-52 flex flex-col justify-center">
        <div className={`font-bold text-wizard-blue ${item.en.length > 30 ? 'text-2xl' : 'text-4xl'}`}>{item.en}</div>
        {item.phonetic && <div className="font-mono text-gray-400">{item.phonetic}</div>}
        {ptShown && <div className="text-lg text-gray-500 italic">{item.pt}</div>}
        <div className="text-sm font-semibold text-gray-400">
          {lang === 'en' ? `Ouça e repita em inglês (${enCountSoFar}ª de ${enTotal})` : 'Ouça em português'}
        </div>
        {recast && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-yellow-800">
            Forma certa: <strong>{item.en}</strong>. Repita.
          </div>
        )}
        {heardOk && (
          <div className="flex items-center justify-center gap-2 text-wizard-green font-semibold">
            <CheckCircle size={18} /> Very good!
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button type="button" onClick={play} className="flex items-center gap-2 rounded-xl bg-blue-100 px-5 py-3 font-semibold text-wizard-blue hover:bg-blue-200">
          <Volume2 size={18} /> Ouvir
        </button>
        {lang === 'en' && <MicButton onResult={onSpoken} />}
        <button type="button" onClick={advance} className="btn-primary">
          {lang === 'en' ? 'Repeti ✓' : 'Próximo →'}
        </button>
      </div>
    </div>
  );
}
