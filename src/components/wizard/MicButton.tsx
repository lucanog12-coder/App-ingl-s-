import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../../lib/speech';

interface Props {
  onResult: (alternatives: string[]) => void;
  disabled?: boolean;
}

/** Botão de microfone; some sozinho se o navegador não tiver reconhecimento de voz. */
export default function MicButton({ onResult, disabled }: Props) {
  const { supported, listening, listen, stop } = useSpeechRecognition('en');
  if (!supported) return null;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => (listening ? stop() : listen(onResult))}
      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors disabled:opacity-40 ${
        listening ? 'bg-wizard-red text-white animate-pulse' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
      }`}
      title="Responder falando"
    >
      {listening ? <MicOff size={18} /> : <Mic size={18} />}
      <span className="hidden sm:inline">{listening ? 'Ouvindo…' : 'Falar'}</span>
    </button>
  );
}
