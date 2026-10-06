import { Link } from 'react-router-dom';
import { BookOpen, Brain, MessageCircle, Mic, TrendingUp, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { units } from '../data/units';
import { lessons } from '../data/lessons';

export default function Home() {
  const { progress, totalScore } = useApp();
  const completedUnits = progress.filter(p => units.some(u => u.id === p.unitId) && p.completedSections.length >= 4).length;

  const features = [
    { icon: BookOpen, title: 'Vocabulário', desc: 'Aprenda palavras com fonética e exemplos', color: 'bg-blue-100 text-blue-700' },
    { icon: MessageCircle, title: 'Diálogos', desc: 'Pratique conversas reais do dia a dia', color: 'bg-green-100 text-green-700' },
    { icon: Brain, title: 'Gramática', desc: 'Afirmativa, interrogativa e negativa', color: 'bg-yellow-100 text-yellow-700' },
    { icon: Mic, title: 'Pronúncia', desc: 'Transcrição fonética de cada palavra', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-wizard-blue to-blue-700 rounded-3xl p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-3">Bem-vindo ao Wizard English!</h1>
        <p className="text-blue-100 text-lg mb-6">Aprenda inglês com o método Wizard — o mais completo do Brasil</p>
        <Link to="/units" className="inline-block bg-wizard-gold text-white font-bold px-8 py-3 rounded-2xl hover:bg-yellow-500 transition-colors text-lg">
          Começar a Estudar
        </Link>
      </div>

      {lessons.map(lesson => (
        <Link
          key={lesson.id}
          to={`/lessons/${lesson.id}`}
          className="card flex items-center gap-4 border-2 border-wizard-gold/50 hover:shadow-lg transition-shadow"
        >
          <div className="w-14 h-14 bg-wizard-gold text-white rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0">{lesson.number}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold uppercase tracking-wide text-wizard-gold">Novo · Roteiro da aula Wizard</div>
            <div className="font-bold text-gray-800">Lesson {lesson.number}: {lesson.title}</div>
            <div className="text-sm text-gray-500">Verbs → New Words → Useful Phrases → Grammar → Real Life → Check it out → Fluency → Questions</div>
          </div>
          <span className="text-wizard-blue font-bold">→</span>
        </Link>
      ))}

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: 'Unidades', value: `${completedUnits}/${units.length}`, icon: BookOpen },
          { label: 'Pontos', value: totalScore, icon: Star },
          { label: 'Nível', value: completedUnits < 2 ? 'Iniciante' : 'Básico', icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card min-w-0 px-2 py-4 text-center sm:p-6">
            <Icon size={24} className="mx-auto text-wizard-blue mb-2" />
            <div className="text-lg font-bold text-wizard-blue break-words sm:text-2xl">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-wizard-blue">O Método Wizard</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card flex items-start gap-4">
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-wizard-blue">Unidades Disponíveis</h2>
        <div className="space-y-3">
          {units.map(unit => {
            const unitProgress = progress.find(p => p.unitId === unit.id);
            const done = unitProgress?.completedSections.length ?? 0;
            const pct = Math.round((done / 4) * 100);
            return (
              <Link key={unit.id} to={`/units/${unit.id}`} className="card flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-wizard-blue text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {unit.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800">{unit.title}</div>
                  <div className="text-sm text-gray-500">{unit.titlePt}</div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-wizard-green h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-sm font-bold text-wizard-blue">{pct}%</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
