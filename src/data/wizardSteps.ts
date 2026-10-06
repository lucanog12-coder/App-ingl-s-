import { WizardStepId } from '../types/wizard';

// Ordem fixa da aula Wizard.
export const WIZARD_STEPS: { id: WizardStepId; label: string; goal: string }[] = [
  { id: 'verbs', label: 'Verbs', goal: 'Apresentar o verbo e trocar os pronomes até sair fácil.' },
  { id: 'new-words', label: 'New Words', goal: 'Ouvir e repetir 3x; na 4ª e 5ª vez, português → inglês; depois frases com o verbo.' },
  { id: 'useful-phrases', label: 'Useful Phrases', goal: 'Ler e entender, repetir em inglês e português, trocar pronomes e palavras.' },
  { id: 'grammar', label: 'Grammar', goal: 'Ler 3x em inglês e 1x em português; fazer pequenas trocas e remontar.' },
  { id: 'real-life', label: 'Real Life', goal: 'Inglês e português em todas as frases; trocar uma peça e remontar.' },
  { id: 'check-it-out', label: 'Check it out!', goal: 'Combinações fixas da lição.' },
  { id: 'fluency', label: 'Fluency', goal: 'Seguir o sentido da primeira frase trocando uma parte por vez.' },
  { id: 'questions', label: 'Questions', goal: 'Responder as perguntas e criar 10 variações.' },
];
