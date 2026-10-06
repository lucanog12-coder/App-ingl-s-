import { BilingualLine } from '../../types/wizard';
import SpeakButton from './SpeakButton';

interface Props {
  lines: BilingualLine[];
  intro?: string;
  onDone: () => void;
  doneLabel?: string;
}

/** Leitura e explicação: o aluno vê inglês + português e pode ouvir cada frase. */
export default function TeachList({ lines, intro, onDone, doneLabel = 'Entendi, vamos praticar →' }: Props) {
  return (
    <div className="space-y-4">
      {intro && <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-900">{intro}</div>}
      <div className="card divide-y divide-gray-100 p-0">
        {lines.map(l => (
          <div key={l.en} className="flex items-start gap-3 p-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{l.en}</div>
              <div className="text-sm italic text-gray-500">{l.pt}</div>
            </div>
            <SpeakButton text={l.en} label="EN" />
            <SpeakButton text={l.pt} lang="pt" label="PT" />
          </div>
        ))}
      </div>
      <div className="text-right">
        <button className="btn-primary" onClick={onDone}>
          {doneLabel}
        </button>
      </div>
    </div>
  );
}
