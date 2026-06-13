export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface VocabWord {
  id: string;
  english: string;
  portuguese: string;
  phonetic: string;
  example: string;
  examplePt: string;
  category: string;
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  text: string;
  translation: string;
}

export interface Dialogue {
  id: string;
  title: string;
  titlePt: string;
  situation: string;
  lines: DialogueLine[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  affirmative: string;
  interrogative: string;
  negative: string;
  examples: {
    affirmative: string;
    affirmativePt: string;
    interrogative: string;
    interrogativePt: string;
    negative: string;
    negativePt: string;
  }[];
}

export interface Exercise {
  id: string;
  type: 'transform' | 'fill-blank' | 'multiple-choice' | 'match';
  question: string;
  questionPt?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  titlePt: string;
  difficulty: Difficulty;
  vocabulary: VocabWord[];
  dialogues: Dialogue[];
  grammar: GrammarRule[];
  exercises: Exercise[];
}

export interface UserProgress {
  unitId: string;
  completedSections: string[];
  score: number;
  lastStudied: string;
}
