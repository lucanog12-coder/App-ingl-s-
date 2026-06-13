import { Link } from 'react-router-dom';
import { BookOpen, Lock } from 'lucide-react';
import { units } from '../data/units';
import { useApp } from '../context/AppContext';

export default function Units() {
  const { getUnitProgress } = useApp();

  const difficultyLabel: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };
  const difficultyColor: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={32} className="text-wizard-blue" />
        <div>
          <h1 className="text-3xl font-bold text-wizard-blue">Unidades de Estudo</h1>
          <p className="text-gray-500">Cada unidade segue o método Wizard completo</p>
        </div>
      </div>

      <div className="grid gap-4">
        {units.map((unit, i) => {
          const prog = getUnitProgress(unit.id);
          const done = prog?.completedSections.length ?? 0;
          const isUnlocked = i === 0 || (getUnitProgress(units[i - 1].id)?.completedSections.length ?? 0) >= 2;

          return (
            <div key={unit.id} className={`card ${!isUnlocked ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-wizard-blue text-white rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {unit.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-xl text-gray-800">{unit.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[unit.difficulty]}`}>
                      {difficultyLabel[unit.difficulty]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{unit.titlePt}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>{unit.vocabulary.length} palavras</span>
                    <span>{unit.dialogues.length} diálogo(s)</span>
                    <span>{unit.exercises.length} exercícios</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {!isUnlocked ? (
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Lock size={16} /> Bloqueada
                    </div>
                  ) : (
                    <Link to={`/units/${unit.id}`} className="btn-primary text-sm">
                      {done > 0 ? 'Continuar' : 'Iniciar'} →
                    </Link>
                  )}
                </div>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-wizard-green h-2 rounded-full transition-all" style={{ width: `${Math.round((done / 4) * 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
