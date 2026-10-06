import { Volume2 } from 'lucide-react';
import { Lang, speak } from '../../lib/speech';

interface Props {
  text: string;
  lang?: Lang;
  times?: number;
  label?: string;
  className?: string;
}

export default function SpeakButton({ text, lang = 'en', times = 1, label, className = '' }: Props) {
  const play = async () => {
    for (let i = 0; i < times; i++) await speak(text, lang);
  };
  return (
    <button
      type="button"
      onClick={play}
      title={lang === 'en' ? 'Ouvir em inglês' : 'Ouvir em português'}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium transition-colors ${
        lang === 'en' ? 'text-wizard-blue hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-100'
      } ${className}`}
    >
      <Volume2 size={16} />
      {label}
    </button>
  );
}
