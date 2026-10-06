// Estrutura de uma lição no formato da aula Wizard (Verbs → New Words → … → Questions).

export interface BilingualLine {
  en: string;
  pt: string;
}

export interface NewWord extends BilingualLine {
  phonetic: string;
}

/**
 * Um item de drill: o aluno vê o gatilho (frase em português ou dica de troca)
 * e precisa montar a frase em inglês.
 */
export interface DrillItem {
  id: string;
  /** Gatilho mostrado ao aluno (normalmente em português). */
  prompt: string;
  /** Frase original do livro, quando o drill é "troque e remonte". */
  base?: string;
  /** O que deve ser trocado, ex.: "popcorn → cake". */
  cue?: string;
  /** Respostas aceitas; a primeira é a forma "oficial" mostrada na correção. */
  answers: string[];
}

export interface VerbEntry {
  en: string;
  pt: string;
  note?: string;
}

export interface FluencyChain {
  id: string;
  model: string;
  modelPt: string;
  steps: { cue: string; answers: string[] }[];
}

export interface QuestionItem {
  id: string;
  question: string;
  questionPt: string;
  modelAnswer: string;
}

export interface CheckItOutBlock {
  title: string;
  lines: BilingualLine[];
}

export interface WizardLesson {
  id: string;
  number: number;
  book: string;
  title: string;
  titlePt: string;
  verbs: VerbEntry[];
  verbDrill: DrillItem[];
  newWords: NewWord[];
  newWordsSentences: DrillItem[];
  usefulPhrases: BilingualLine[];
  usefulPhrasesDrill: DrillItem[];
  grammar: {
    explanation: string;
    lines: BilingualLine[];
    drill: DrillItem[];
  };
  realLife: {
    lines: BilingualLine[];
    drill: DrillItem[];
  };
  checkItOut: {
    blocks: CheckItOutBlock[];
    drill: DrillItem[];
  };
  fluency: FluencyChain[];
  questions: {
    items: QuestionItem[];
    variationsModel: string;
    variationsExamples: string[];
  };
}

export type WizardStepId =
  | 'verbs'
  | 'new-words'
  | 'useful-phrases'
  | 'grammar'
  | 'real-life'
  | 'check-it-out'
  | 'fluency'
  | 'questions';
