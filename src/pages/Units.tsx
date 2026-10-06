import { Link } from 'react-router-dom';
import { BookOpen, Lock, Sparkles } from 'lucide-react';
import { lessons } from '../data/lessons';
import { WIZARD_STEPS } from '../data/wizardSteps';
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

      <h2 className="flex items-center gap-2 text-xl font-bold text-wizard-blue mb-3">
        <Sparkles size={20} className="text-wizard-gold" /> Lições do livro: roteiro da aula
      </h2>
      <div className="grid gap-4 mb-10">
        {lessons.map(lesson => {
          const done = getUnitProgress(lesson.id)?.completedSections.length ?? 0;
          return (
            <div key={lesson.id} className="card border-2 border-wizard-gold/40">
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 bg-wizard-gold text-white rounded-2xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold leading-none">{lesson.book}</span>
                  <span className="text-xl font-bold leading-tight">{lesson.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gray-800">Lesson {lesson.number}: {lesson.title}</h3>
                  <p className="text-gray-500 text-sm">{lesson.titlePt}</p>
                  <p className="mt-1 hidden text-xs text-gray-500 sm:block">{WIZARD_STEPS.map(s => s.label).join(' → ')}</p>
                </div>
                <Link to={`/lessons/${lesson.id}`} className="btn-primary text-sm w-full text-center sm:w-auto">
                  {done === 0 ? 'Iniciar' : done >= WIZARD_STEPS.length ? 'Refazer' : 'Continuar'} →
                </Link>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-wizard-green h-2 rounded-full transition-all" style={{ width: `${Math.round((done / WIZARD_STEPS.length) * 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold text-wizard-blue mb-3">Unidades básicas</h2>
      <div className="grid gap-4">
        {units.map((unit, i) => {
          const prog = getUnitProgress(unit.id);
          const done = prog?.completedSections.length ?? 0;
          const isUnlocked = i === 0 || (getUnitProgress(units[i - 1].id)?.completedSections.length ?? 0) >= 2;

          return (
            <div key={unit.id} className={`card ${!isUnlocked ? 'opacity-60' : ''}`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 bg-wizard-blue text-white rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {unit.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-xl text-gray-800">{unit.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[unit.difficulty]}`}>
                      {difficultyLabel[unit.difficulty]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{unit.titlePt}</p>
                  <div className="flex flex-wrap gap-x-4 mt-2 text-xs text-gray-500">
                    <span>{unit.vocabulary.length} palavras</span>
                    <span>{unit.dialogues.length} diálogo(s)</span>
                    <span>{unit.exercises.length} exercícios</span>
                  </div>
                </div>
                <div className="w-full text-center sm:w-auto">
                  {!isUnlocked ? (
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-sm">
                      <Lock size={16} /> Bloqueada
                    </div>
                  ) : (
                    <Link to={`/units/${unit.id}`} className="btn-primary text-sm block sm:inline-block">
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
