// Comparação tolerante: ignora maiúsculas, pontuação e contrações
// ("don't" = "do not"), para aceitar tanto texto digitado quanto reconhecimento de voz.

const CONTRACTIONS: Record<string, string> = {
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "isn't": 'is not',
  "aren't": 'are not',
  "can't": 'cannot',
  "won't": 'will not',
  "let's": 'let us',
  "i'm": 'i am',
  "it's": 'it is',
  "he's": 'he is',
  "she's": 'she is',
  "we're": 'we are',
  "they're": 'they are',
  "you're": 'you are',
  "what's": 'what is',
};

const SPELLING: Record<string, string> = {
  favourite: 'favorite',
  neighbourhood: 'neighborhood',
  icecream: 'ice cream',
  hamburguer: 'hamburger',
  // contrações digitadas sem apóstrofo
  dont: 'do not',
  doesnt: 'does not',
  didnt: 'did not',
  isnt: 'is not',
  arent: 'are not',
  cant: 'cannot',
  lets: 'let us',
  im: 'i am',
};

export function normalize(text: string): string {
  let t = text.toLowerCase().replace(/[’‘`´]/g, "'");
  t = t.replace(/[a-z]+'[a-z]+/g, w => CONTRACTIONS[w] ?? w);
  t = t.replace(/[^a-z0-9\s]/g, ' ');
  t = t
    .split(/\s+/)
    .filter(Boolean)
    .map(w => SPELLING[w] ?? w)
    .join(' ');
  return t.replace(/\bcan not\b/g, 'cannot').trim();
}

export function isCorrect(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some(a => normalize(a) === n);
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
