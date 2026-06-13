import { useState } from 'react';
import { Dialogue } from '../../types';
import { Volume2, Eye, EyeOff, CheckCircle, MessageCircle } from 'lucide-react';

interface Props {
  dialogues: Dialogue[];
  onComplete: () => void;
}

export default function DialogueSection({ dialogues, onComplete }: Props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentDialogue] = useState(0);

  const dialogue = dialogues[currentDialogue];

  const speakLine = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakAll = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    dialogue.lines.forEach((line) => {
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-wizard-blue flex items-center gap-2">
          <MessageCircle size={24} /> Diálogo
        </h2>
        <div className="flex gap-2">
          <button onClick={speakAll} className="flex items-center gap-1.5 text-sm bg-blue-50 text-wizard-blue px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            <Volume2 size={16} /> Ouvir tudo
          </button>
          <button onClick={() => setShowTranslation(s => !s)} className="flex items-center gap-1.5 text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
            {showTranslation ? <EyeOff size={16} /> : <Eye size={16} />}
            {showTranslation ? 'Ocultar' : 'Ver'} tradução
          </button>
        </div>
      </div>

      <div className="card border-l-4 border-wizard-blue">
        <p className="text-sm text-gray-500 mb-1">Situação:</p>
        <p className="text-gray-700 font-medium">{dialogue.situation}</p>
      </div>

      <div className="space-y-4">
        {dialogue.lines.map((line, i) => (
          <div key={i} className={`flex gap-3 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${line.speaker === 'A' ? 'bg-wizard-blue' : 'bg-wizard-green'}`}>
              {line.speaker}
            </div>
            <div className={`max-w-md ${line.speaker === 'B' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`p-4 rounded-2xl ${line.speaker === 'A' ? 'bg-blue-50 rounded-tl-sm' : 'bg-green-50 rounded-tr-sm'}`}>
                <p className="font-medium text-gray-800">{line.text}</p>
                {showTranslation && <p className="text-sm text-gray-500 mt-1 italic">{line.translation}</p>}
              </div>
              <button onClick={() => speakLine(line.text)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-wizard-blue transition-colors">
                <Volume2 size={12} /> ouvir
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-medium text-yellow-800">Dica da Professora:</p>
        <p className="text-sm text-yellow-700 mt-1">Leia o diálogo em voz alta 3 vezes. Na 1ª vez, leia junto com o áudio. Na 2ª, sem o áudio. Na 3ª, tente memorizar!</p>
      </div>

      <button onClick={onComplete} className="btn-success flex items-center gap-2">
        <CheckCircle size={18} /> Concluir Diálogo
      </button>
    </div>
  );
}
