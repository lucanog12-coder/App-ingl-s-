import { useApp } from '../context/AppContext';
import { units } from '../data/units';
import { Trophy, Star, BookOpen, TrendingUp } from 'lucide-react';

export default function Progress() {
  const { progress, totalScore } = useApp();

  const totalSections = units.reduce((sum) => sum + 4, 0);
  const completedSections = progress.reduce((sum, p) => sum + p.completedSections.length, 0);
  const overallPct = Math.round((completedSections / totalSections) * 100);

  const level = totalScore < 50 ? 'Iniciante' : totalScore < 150 ? 'Básico' : totalScore < 300 ? 'Intermediário' : 'Avançado';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Trophy size={32} className="text-wizard-gold" />
        <h1 className="text-3xl font-bold text-wizard-blue">Meu Progresso</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pontuação Total', value: totalScore, icon: Star, color: 'text-wizard-gold' },
          { label: 'Seções Concluídas', value: `${completedSections}/${totalSections}`, icon: BookOpen, color: 'text-wizard-blue' },
          { label: 'Seu Nível', value: level, icon: TrendingUp, color: 'text-wizard-green' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card text-center">
            <Icon size={28} className={`mx-auto mb-2 ${color}`} />
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Overall */}
      <div className="card">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-gray-700">Progresso Geral</span>
          <span className="font-bold text-wizard-blue">{overallPct}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-4">
          <div className="bg-wizard-blue h-4 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Per unit */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-700">Por Unidade</h2>
        {units.map(unit => {
          const prog = progress.find(p => p.unitId === unit.id);
          const done = prog?.completedSections ?? [];
          const pct = Math.round((done.length / 4) * 100);
          return (
            <div key={unit.id} className="card">
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-bold text-gray-800">Unit {unit.number}: {unit.title}</span>
                  <p className="text-sm text-gray-500">{unit.titlePt}</p>
                </div>
                <span className="font-bold text-wizard-blue">{pct}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div className="bg-wizard-green h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['vocabulary', 'dialogue', 'grammar', 'exercises'].map(s => (
                  <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${done.includes(s) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    {done.includes(s) ? '✓ ' : ''}{s === 'vocabulary' ? 'Vocab' : s === 'dialogue' ? 'Diálogo' : s === 'grammar' ? 'Gramática' : 'Exercícios'}
                  </span>
                ))}
              </div>
              {prog && <p className="text-xs text-gray-400 mt-2">Último estudo: {new Date(prog.lastStudied).toLocaleDateString('pt-BR')}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
