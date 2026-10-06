import { useCallback, useEffect, useRef, useState } from 'react';

// Voz do navegador (Web Speech API): leitura em voz alta e reconhecimento de fala.

export type Lang = 'en' | 'pt';

const LANG_CODE: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' };

function pickVoice(code: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang === code) ?? voices.find(v => v.lang.startsWith(code.slice(0, 2)));
}

export function speak(text: string, lang: Lang = 'en', rate = 0.9): Promise<void> {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window)) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_CODE[lang];
    u.rate = rate;
    const voice = pickVoice(u.lang);
    if (voice) u.voice = voice;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRecognitionCtor(): any {
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function useSpeechRecognition(lang: Lang = 'en') {
  const supported = typeof window !== 'undefined' && !!getRecognitionCtor();
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => () => recRef.current?.abort?.(), []);

  const listen = useCallback(
    (onResult: (transcripts: string[]) => void) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) return;
      recRef.current?.abort?.();
      const rec = new Ctor();
      rec.lang = LANG_CODE[lang];
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      rec.onresult = (e: any) => {
        const alts: string[] = [];
        const result = e.results[0];
        for (let i = 0; i < result.length; i++) alts.push(result[i].transcript);
        onResult(alts);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recRef.current = rec;
      setListening(true);
      rec.start();
    },
    [lang],
  );

  const stop = useCallback(() => recRef.current?.stop?.(), []);

  return { supported, listening, listen, stop };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
