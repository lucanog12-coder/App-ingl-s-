import { useState } from 'react';
import { VocabWord } from '../../types';
import { Volume2, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface Props {
  words: VocabWord[];
  onComplete: () => void;
}

export default function VocabularySection({ words, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const word = words[current];

  const handleFlip = () => setFlipped(f => !f);

  const handleNext = () => {
    setSeen(s => new Set([...s, current]));
    setFlipped(false);
    if (current < words.length - 1) {
      setCurrent(c => c + 1);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrent(c => Math.max(0, c - 1));
  };

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.english);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-wizard-blue">Vocabulário</h2>
        <span className="text-sm text-gray-500">{current + 1} / {words.length}</span>
      </div>

      {/* Progress */}
      <div className="bg-gray-200 rounded-full h-2">
        <div className="bg-wizard-blue h-2 rounded-full transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      {/* Flashcard */}
      <div
        className="card cursor-pointer select-none min-h-64 flex flex-col items-center justify-center text-center gap-4 hover:shadow-xl transition-shadow border-2 border-blue-100"
        onClick={handleFlip}
      >
        {!flipped ? (
          <>
            <div className="text-5xl font-bold text-wizard-blue">{word.english}</div>
            <div className="text-gray-400 text-lg font-mono">{word.phonetic}</div>
            <button
              onClick={(e) => { e.stopPropagation(); speakWord(); }}
              className="flex items-center gap-2 bg-blue-50 text-wizard-blue px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Volume2 size={18} /> Ouvir pronúncia
            </button>
            <p className="text-gray-400 text-sm mt-2">Clique para ver a tradução</p>
          </>
        ) : (
          <>
            <div className="text-3xl font-bold text-wizard-green">{word.portuguese}</div>
            <div className="w-full border-t pt-4 space-y-1">
              <p className="text-gray-700 font-medium italic">"{word.example}"</p>
              <p className="text-gray-500 text-sm">"{word.examplePt}"</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{word.category}</span>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        <button onClick={handlePrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors">
          <ChevronLeft size={18} /> Anterior
        </button>
        {current < words.length - 1 ? (
          <button onClick={handleNext} className="flex items-center gap-2 btn-primary">
            Próxima <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => { setSeen(s => new Set([...s, current])); onComplete(); }}
            className="flex items-center gap-2 btn-success"
          >
            <CheckCircle size={18} /> Concluir Vocabulário
          </button>
        )}
      </div>

      {/* Word list */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {words.map((w, i) => (
          <button
            key={w.id}
            onClick={() => { setCurrent(i); setFlipped(false); }}
            className={`text-sm p-2 rounded-lg border transition-colors ${
              i === current ? 'border-wizard-blue bg-blue-50 font-bold' :
              seen.has(i) ? 'border-green-300 bg-green-50 text-green-700' :
              'border-gray-200 hover:border-gray-300'
            }`}
          >
            {w.english}
          </button>
        ))}
      </div>
    </div>
  );
}
