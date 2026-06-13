import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

interface AppContextType {
  progress: UserProgress[];
  updateProgress: (unitId: string, section: string, score?: number) => void;
  getUnitProgress: (unitId: string) => UserProgress | undefined;
  totalScore: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem('wizard-progress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wizard-progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (unitId: string, section: string, score = 0) => {
    setProgress(prev => {
      const existing = prev.find(p => p.unitId === unitId);
      if (existing) {
        const updatedSections = existing.completedSections.includes(section)
          ? existing.completedSections
          : [...existing.completedSections, section];
        return prev.map(p =>
          p.unitId === unitId
            ? { ...p, completedSections: updatedSections, score: p.score + score, lastStudied: new Date().toISOString() }
            : p
        );
      }
      return [...prev, { unitId, completedSections: [section], score, lastStudied: new Date().toISOString() }];
    });
  };

  const getUnitProgress = (unitId: string) => progress.find(p => p.unitId === unitId);

  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);

  return (
    <AppContext.Provider value={{ progress, updateProgress, getUnitProgress, totalScore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
