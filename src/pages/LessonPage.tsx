import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { units } from '../data/units';
import { useApp } from '../context/AppContext';
import VocabularySection from '../components/lessons/VocabularySection';
import DialogueSection from '../components/lessons/DialogueSection';
import GrammarSection from '../components/lessons/GrammarSection';
import ExercisesSection from '../components/lessons/ExercisesSection';
import { BookOpen, MessageCircle, Brain, PenLine, ChevronLeft, Trophy } from 'lucide-react';

const SECTIONS = [
  { id: 'vocabulary', label: 'Vocabulário', icon: BookOpen },
  { id: 'dialogue', label: 'Diálogo', icon: MessageCircle },
  { id: 'grammar', label: 'Gramática', icon: Brain },
  { id: 'exercises', label: 'Exercícios', icon: PenLine },
];

export default function LessonPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const { updateProgress, getUnitProgress } = useApp();
  const [currentSection, setCurrentSection] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const unit = units.find(u => u.id === unitId);
  if (!unit) return <div className="text-center py-20 text-gray-500">Unidade não encontrada.</div>;

  const prog = getUnitProgress(unit.id);
  const completedSections = prog?.completedSections ?? [];

  const handleSectionComplete = (sectionId: string, score = 10) => {
    updateProgress(unit.id, sectionId, score);
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(s => s + 1);
    } else {
      setShowComplete(true);
    }
  };

  if (showComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="card">
          <Trophy size={64} className="mx-auto text-wizard-gold mb-4" />
          <h1 className="text-3xl font-bold text-wizard-blue mb-2">Parabéns!</h1>
          <p className="text-gray-600 mb-2">Você completou a unidade:</p>
          <p className="text-xl font-bold text-gray-800 mb-6">"{unit.title}"</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/units')} className="btn-primary">Ver Todas as Unidades</button>
            <button onClick={() => { setCurrentSection(0); setShowComplete(false); }} className="btn-gold">Revisar Unidade</button>
          </div>
        </div>
      </div>
    );
  }

  const section = SECTIONS[currentSection];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <button onClick={() => navigate('/units')} className="text-sm text-wizard-blue hover:underline mb-2 flex items-center gap-1">
          <ChevronLeft size={16} /> Voltar para Unidades
        </button>
        <h1 className="text-2xl font-bold text-wizard-blue">Unit {unit.number}: {unit.title}</h1>
        <p className="text-gray-500">{unit.titlePt}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {SECTIONS.map((s, i) => {
          const Icon = s.icon;
          const isDone = completedSections.includes(s.id);
          const isActive = i === currentSection;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                isActive ? 'bg-wizard-blue text-white shadow-md' :
                isDone ? 'bg-green-100 text-green-700' :
                'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              {s.label}
              {isDone && !isActive && <span className="text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      <div>
        {section.id === 'vocabulary' && (
          <VocabularySection words={unit.vocabulary} onComplete={() => handleSectionComplete('vocabulary')} />
        )}
        {section.id === 'dialogue' && (
          <DialogueSection dialogues={unit.dialogues} onComplete={() => handleSectionComplete('dialogue')} />
        )}
        {section.id === 'grammar' && (
          <GrammarSection rules={unit.grammar} onComplete={() => handleSectionComplete('grammar')} />
        )}
        {section.id === 'exercises' && (
          <ExercisesSection exercises={unit.exercises} onComplete={(score) => handleSectionComplete('exercises', score)} />
        )}
      </div>
    </div>
  );
}
