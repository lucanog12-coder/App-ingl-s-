import { useState } from 'react';
import { GrammarRule } from '../../types';
import { CheckCircle, ArrowRight, Brain } from 'lucide-react';

interface Props {
  rules: GrammarRule[];
  onComplete: () => void;
}

export default function GrammarSection({ rules, onComplete }: Props) {
  const [currentRule, setCurrentRule] = useState(0);
  const rule = rules[currentRule];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-wizard-blue flex items-center gap-2">
        <Brain size={24} /> Gramática
      </h2>

      {rules.length > 1 && (
        <div className="flex gap-2">
          {rules.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setCurrentRule(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === currentRule ? 'bg-wizard-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {r.title}
            </button>
          ))}
        </div>
      )}

      <div className="card border-t-4 border-wizard-gold">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{rule.title}</h3>
        <div className="bg-blue-50 rounded-xl p-4 text-gray-700 text-sm leading-relaxed">
          {rule.explanation}
        </div>
      </div>

      {/* Formula */}
      <div className="grid gap-3">
        {[
          { label: 'Afirmativa', formula: rule.affirmative, bg: 'bg-green-50 border-green-200 text-green-800' },
          { label: 'Interrogativa', formula: rule.interrogative, bg: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
          { label: 'Negativa', formula: rule.negative, bg: 'bg-red-50 border-red-200 text-red-800' },
        ].map(({ label, formula, bg }) => (
          <div key={label} className={`border rounded-xl p-4 ${bg}`}>
            <p className="text-xs font-bold uppercase mb-1">{label}</p>
            <p className="font-mono font-medium">{formula}</p>
          </div>
        ))}
      </div>

      {/* Examples */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3">Exemplos — veja a transformação:</h3>
        <div className="space-y-4">
          {rule.examples.map((ex, i) => (
            <div key={i} className="card space-y-3 border border-gray-100">
              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">AFF</span>
                <div>
                  <p className="font-medium text-gray-800">{ex.affirmative}</p>
                  <p className="text-sm text-gray-500 italic">{ex.affirmativePt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-4 text-gray-300">
                <ArrowRight size={16} />
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">INT</span>
                <div>
                  <p className="font-medium text-gray-800">{ex.interrogative}</p>
                  <p className="text-sm text-gray-500 italic">{ex.interrogativePt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">NEG</span>
                <div>
                  <p className="font-medium text-gray-800">{ex.negative}</p>
                  <p className="text-sm text-gray-500 italic">{ex.negativePt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-sm font-bold text-purple-800">Lembre-se:</p>
        <p className="text-sm text-purple-700 mt-1">Na interrogativa, o auxiliar vem ANTES do sujeito. Na negativa, o NOT vem logo após o auxiliar. Pratique transformando frases!</p>
      </div>

      <button onClick={onComplete} className="btn-success flex items-center gap-2">
        <CheckCircle size={18} /> Entendi! Próxima seção
      </button>
    </div>
  );
}
