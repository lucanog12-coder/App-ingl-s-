# Método Wizard: roteiro de uma lição (W2 · Lesson 43 "Eating Out")

Montado a partir das anotações do Lucas (20/06/26) e das páginas 122–123 do livro.
As gravações ainda não foram transcritas.

## Princípios

1. **Ouvir e repetir 3 vezes.** Tudo novo é dito 3 vezes em inglês antes de qualquer outra coisa.
2. **Ir e voltar entre português e inglês.** O professor diz a frase em português e o aluno monta em inglês. O português é só o gatilho; a resposta é sempre em inglês.
3. **Trocar uma peça e remontar.** Depois que o aluno já fala a frase do livro, o professor troca uma peça (pronome, verbo, substantivo) e o aluno remonta a frase inteira.
4. **Corrigir só repetindo o certo.** Se a pronúncia sai errada, o professor só fala a forma certa, sem explicar. O aluno repete.
5. **Avançar quando sai fácil.** Só passa para a próxima etapa quando o aluno responde rápido e sem esforço. Quem decide é o professor (no app, uma regra de acerto e tempo).
6. **Verbo da lição em todas as etapas.** O verbo do dia (to make / to give) aparece em cada etapa.

## Sequência da aula

| # | Etapa | O que o professor faz | O que o aluno faz | Quando avança |
|---|-------|----------------------|-------------------|---------------|
| 1 | **Verbs** | Apresenta o verbo (to make = fazer *com as mãos*; to give = dar) e troca pronomes: I, you, he/she, we, they | Monta frases simples mudando pronome e verbo ("I make a cake" → "She makes a cake" → "We give…") | Quando responde com facilidade |
| 2 | **New Words** | Fala cada palavra 3x. Na 4ª e 5ª vez diz a palavra em **português** | Repete 3x. Na 4ª e 5ª vez diz a palavra em inglês. Depois monta frases com a palavra nova + verbo da lição | Quando acerta todas sem hesitar |
| 3 | **Useful Phrases** | Lê, explica, repete em português e em inglês. Depois troca pronomes e verbos | Repete e remonta em inglês ("This is the best restaurant in the city" → "…in the block") | Quando remonta a frase trocada |
| 4 | **Grammar** | Lê 3x em inglês e 1–2x em português. Faz pequenas mudanças | Remonta substituindo o que foi pedido (some/any: "I don't have any money" → "…any friends") | Quando acerta as trocas |
| 5 | **Real Life** | Mesma dinâmica, em **todas** as frases: inglês → português → troca uma peça | Remonta a frase com a troca | Quando faz todas as frases |
| 6 | **Check it out!** | Mostra combinações fixas (to make a cake / coffee / friends; May I see the menu? – Here you are) | Usa as combinações | — |
| 7 | **Fluency** | Dá uma frase modelo e depois só dicas curtas | Segue o padrão da primeira frase *(a confirmar)* | — |
| 8 | **Questions** | Faz as perguntas da lição | Responde e cria mais 10 variações | — |
| Casa | **Wiz.me** | Dubbing (dublagem das Useful Phrases) e Speaking Practice | Grava a própria voz | — |

## Exemplos reais de troca (anotados no livro, Real Life)

| Frase do livro | Troca pedida |
|---|---|
| Do you know how to make chocolate popcorn? | → cake |
| We want to give you this book. | → ice cream |
| Do you usually give tips to the waiters? | → waitress |
| This is the best restaurant in the city. | → block (quarteirão) |
| I love that place! Their food is very good! | → hamburger |
| We clean our house every Friday. | → office |
| I want some tomato sauce, please. | → soup |
| Do you want some coffee? | → ice cream |
| We don't have any food. Let's go to the grocery store. | → pizza |
| Do you have any salad? | → hamburger |

## Como está no app

A Lesson 43 está em `/lessons/lesson-43` (conteúdo em `src/data/lessons.ts`).

| Etapa | Fases no app |
|---|---|
| Verbs | Apresentação do verbo (com o "fazer com as mãos") → drill trocando pronomes |
| New Words | Ouvir e repetir 3x → 4ª vez português → inglês → 5ª vez em outra ordem → frases com o verbo |
| Useful Phrases | Ler e entender → repetir EN / PT / EN → trocar e remontar |
| Grammar | Ler (explicação some/any) → 3x EN + 1x PT → pequenas trocas |
| Real Life | EN + PT em todas as frases → trocas anotadas em aula (popcorn → cake, city → block…) |
| Check it out! | Combinações (to make + …, menu, pizza place) → usar em frases |
| Fluency | 3 sequências: frase modelo + dica; cada resposta vira a base da próxima |
| Questions | Responder com frase completa → criar 10 variações |

Regras do método no app:
- **Correção:** resposta errada mostra e fala só a forma certa, e a frase volta para o fim da fila até sair certa.
- **Avanço:** uma etapa libera a próxima só depois de concluída; respostas em menos de 7 s ganham "⚡ Rápido!".
- **Voz:** botão de microfone (Chrome/Edge/Safari) para responder falando; o botão "Ouvir" usa a voz do navegador.
- **Respostas aceitas:** ignora maiúsculas, pontuação e contrações ("don't" = "do not").

Para criar outra lição, adicione um objeto em `src/data/lessons.ts` seguindo o tipo `WizardLesson` (`src/types/wizard.ts`).
