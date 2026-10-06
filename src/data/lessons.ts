import { WizardLesson } from '../types/wizard';

// Lesson 43 — "Eating Out" (W2, páginas 122–123).
// As trocas do Real Life são as que o professor pediu em aula (anotadas no livro).

export const lessons: WizardLesson[] = [
  {
    id: 'lesson-43',
    number: 43,
    book: 'W2',
    title: 'Eating Out',
    titlePt: 'Comendo fora',

    verbs: [
      { en: 'to make', pt: 'fazer', note: 'Fazer com as mãos, preparar, produzir (a cake, popcorn, coffee). Diferente de "to do" (fazer uma tarefa, uma atividade).' },
      { en: 'to give', pt: 'dar', note: 'Dar algo a alguém: give a gift TO my mother / give my mother a gift.' },
    ],
    verbDrill: [
      { id: 'vd1', prompt: 'Eu faço um bolo.', answers: ['I make a cake.'] },
      { id: 'vd2', prompt: 'Você faz um bolo.', answers: ['You make a cake.'] },
      { id: 'vd3', prompt: 'Ela faz um bolo.', answers: ['She makes a cake.'] },
      { id: 'vd4', prompt: 'Ele faz pipoca.', answers: ['He makes popcorn.'] },
      { id: 'vd5', prompt: 'Nós fazemos pipoca.', answers: ['We make popcorn.'] },
      { id: 'vd6', prompt: 'Eles fazem pizza.', answers: ['They make pizza.', 'They make pizzas.'] },
      { id: 'vd7', prompt: 'Eu dou um presente.', answers: ['I give a gift.', 'I give a present.'] },
      { id: 'vd8', prompt: 'Ela dá um presente.', answers: ['She gives a gift.', 'She gives a present.'] },
      { id: 'vd9', prompt: 'Nós damos gorjetas.', answers: ['We give tips.'] },
      { id: 'vd10', prompt: 'Ele dá gorjetas.', answers: ['He gives tips.'] },
      { id: 'vd11', prompt: 'Você faz sorvete?', answers: ['Do you make ice cream?'] },
      { id: 'vd12', prompt: 'Ela faz sorvete?', answers: ['Does she make ice cream?'] },
      { id: 'vd13', prompt: 'Eu não dou gorjetas.', answers: ["I don't give tips."] },
      { id: 'vd14', prompt: 'Ele não faz bolos.', answers: ["He doesn't make cakes."] },
    ],

    newWords: [
      { en: 'dish', pt: 'prato', phonetic: '/dɪʃ/' },
      { en: 'hamburger', pt: 'hambúrguer', phonetic: '/ˈhæmbɜːrɡər/' },
      { en: 'pizza', pt: 'pizza', phonetic: '/ˈpiːtsə/' },
      { en: 'popcorn', pt: 'pipoca', phonetic: '/ˈpɑːpkɔːrn/' },
      { en: 'cake', pt: 'bolo', phonetic: '/keɪk/' },
      { en: 'ice cream', pt: 'sorvete', phonetic: '/ˈaɪs kriːm/' },
      { en: 'fast food', pt: 'comida rápida', phonetic: '/ˌfæst ˈfuːd/' },
      { en: 'tip', pt: 'gorjeta, dica', phonetic: '/tɪp/' },
      { en: 'waiter', pt: 'garçom', phonetic: '/ˈweɪtər/' },
      { en: 'waitress', pt: 'garçonete', phonetic: '/ˈweɪtrəs/' },
      { en: 'favorite', pt: 'favorito(a)', phonetic: '/ˈfeɪvərɪt/' },
      { en: 'hot', pt: 'quente, calor', phonetic: '/hɑːt/' },
      { en: 'cold', pt: 'frio(a)', phonetic: '/koʊld/' },
      { en: 'our', pt: 'nosso(s), nossa(s)', phonetic: '/ˈaʊər/' },
      { en: 'their', pt: 'deles, delas', phonetic: '/ðer/' },
      { en: 'any', pt: 'algum(ns), alguma(s), nenhum(a), qualquer', phonetic: '/ˈeni/' },
    ],
    newWordsSentences: [
      { id: 'nw1', prompt: 'Eu quero fazer um hambúrguer.', answers: ['I want to make a hamburger.'] },
      { id: 'nw2', prompt: 'Meu prato favorito é pizza.', answers: ['My favorite dish is pizza.'] },
      { id: 'nw3', prompt: 'Ela faz o melhor bolo.', answers: ['She makes the best cake.'] },
      { id: 'nw4', prompt: 'Nós damos uma gorjeta ao garçom.', answers: ['We give a tip to the waiter.', 'We give the waiter a tip.'] },
      { id: 'nw5', prompt: 'Eles fazem pizza toda sexta-feira.', answers: ['They make pizza every Friday.'] },
      { id: 'nw6', prompt: 'Eu quero dar sorvete para a garçonete.', answers: ['I want to give ice cream to the waitress.', 'I want to give the waitress ice cream.', 'I want to give some ice cream to the waitress.'] },
      { id: 'nw7', prompt: 'Nossa pizza está quente.', answers: ['Our pizza is hot.'] },
      { id: 'nw8', prompt: 'O sorvete deles está frio.', answers: ['Their ice cream is cold.'] },
      { id: 'nw9', prompt: 'Você tem alguma pipoca?', answers: ['Do you have any popcorn?'] },
      { id: 'nw10', prompt: 'Ele não come fast food.', answers: ["He doesn't eat fast food."] },
    ],

    usefulPhrases: [
      { en: 'This is the best restaurant in the city.', pt: 'Este é o melhor restaurante da cidade.' },
      { en: 'I want a slice of pie for dessert.', pt: 'Eu quero uma fatia de torta de sobremesa.' },
    ],
    usefulPhrasesDrill: [
      { id: 'up1', base: 'This is the best restaurant in the city.', cue: 'restaurant → pizza', prompt: 'Esta é a melhor pizza da cidade.', answers: ['This is the best pizza in the city.'] },
      { id: 'up2', base: 'This is the best restaurant in the city.', cue: 'restaurant → hamburger', prompt: 'Este é o melhor hambúrguer da cidade.', answers: ['This is the best hamburger in the city.'] },
      { id: 'up3', base: 'This is the best restaurant in the city.', cue: 'city → neighborhood', prompt: 'Este é o melhor restaurante do bairro.', answers: ['This is the best restaurant in the neighborhood.'] },
      { id: 'up4', base: 'I want a slice of pie for dessert.', cue: 'pie → cake', prompt: 'Eu quero uma fatia de bolo de sobremesa.', answers: ['I want a slice of cake for dessert.'] },
      { id: 'up5', base: 'I want a slice of pie for dessert.', cue: 'I → he', prompt: 'Ele quer uma fatia de torta de sobremesa.', answers: ['He wants a slice of pie for dessert.'] },
      { id: 'up6', base: 'I want a slice of pie for dessert.', cue: 'I → she / pie → pizza', prompt: 'Ela quer uma fatia de pizza.', answers: ['She wants a slice of pizza.'] },
      { id: 'up7', base: 'I want a slice of pie for dessert.', cue: 'I → we / a slice of pie → ice cream', prompt: 'Nós queremos sorvete de sobremesa.', answers: ['We want ice cream for dessert.', 'We want some ice cream for dessert.'] },
    ],

    grammar: {
      explanation:
        'SOME = algum(ns), alguma(s), um pouco de → frases afirmativas e ofertas/pedidos ("Do you want some popcorn?"). ' +
        'ANY = algum, nenhum, qualquer → frases negativas e perguntas ("I don\'t have any money." / "Do you have any tips?").',
      lines: [
        { en: 'I have some friends in Germany.', pt: 'Eu tenho alguns amigos na Alemanha.' },
        { en: "Some people don't like to eat fast food.", pt: 'Algumas pessoas não gostam de comer comida rápida.' },
        { en: "I don't have any money here.", pt: 'Eu não tenho nenhum dinheiro aqui.' },
        { en: "He still doesn't have any children.", pt: 'Ele ainda não tem nenhum filho.' },
        { en: 'Do you have any tips?', pt: 'Você tem alguma dica?' },
        { en: 'Do you know any good TV series?', pt: 'Você conhece alguma série de TV boa?' },
        { en: 'Do you want some popcorn?', pt: 'Você quer um pouco de pipoca?' },
      ],
      drill: [
        { id: 'g1', base: 'I have some friends in Germany.', cue: 'Germany → Brazil', prompt: 'Eu tenho alguns amigos no Brasil.', answers: ['I have some friends in Brazil.'] },
        { id: 'g2', base: 'I have some friends in Germany.', cue: 'I → she', prompt: 'Ela tem alguns amigos na Alemanha.', answers: ['She has some friends in Germany.'] },
        { id: 'g3', base: "Some people don't like to eat fast food.", cue: 'fast food → pizza', prompt: 'Algumas pessoas não gostam de comer pizza.', answers: ["Some people don't like to eat pizza."] },
        { id: 'g4', base: "I don't have any money here.", cue: 'I → we', prompt: 'Nós não temos nenhum dinheiro aqui.', answers: ["We don't have any money here."] },
        { id: 'g5', base: "He still doesn't have any children.", cue: 'he → she', prompt: 'Ela ainda não tem nenhum filho.', answers: ["She still doesn't have any children."] },
        { id: 'g6', base: 'Do you have any tips?', cue: 'you → they', prompt: 'Eles têm alguma dica?', answers: ['Do they have any tips?'] },
        { id: 'g7', base: 'Do you know any good TV series?', cue: 'TV series → restaurants', prompt: 'Você conhece algum restaurante bom?', answers: ['Do you know any good restaurants?', 'Do you know any good restaurant?'] },
        { id: 'g8', base: 'Do you want some popcorn?', cue: 'popcorn → ice cream', prompt: 'Você quer um pouco de sorvete?', answers: ['Do you want some ice cream?'] },
        { id: 'g9', base: 'Do you want some popcorn?', cue: 'you → she', prompt: 'Ela quer um pouco de pipoca?', answers: ['Does she want some popcorn?'] },
      ],
    },

    realLife: {
      lines: [
        { en: 'Do you know how to make chocolate popcorn?', pt: 'Você sabe fazer pipoca de chocolate?' },
        { en: 'I want to make your favorite dish tonight.', pt: 'Eu quero fazer seu prato favorito hoje à noite.' },
        { en: 'We want to give you this book.', pt: 'Nós queremos te dar este livro.' },
        { en: 'I want to give a gift to my mother.', pt: 'Eu quero dar um presente para minha mãe.' },
        { en: 'Do you usually give tips to the waiters?', pt: 'Você geralmente dá gorjetas aos garçons?' },
        { en: 'This is the best restaurant in the city.', pt: 'Este é o melhor restaurante da cidade.' },
        { en: 'I love that place! Their food is very good!', pt: 'Eu amo aquele lugar! A comida deles é muito boa!' },
        { en: 'We clean our house every Friday.', pt: 'Nós limpamos nossa casa toda sexta-feira.' },
        { en: 'I want some tomato sauce, please.', pt: 'Eu quero um pouco de molho de tomate, por favor.' },
        { en: 'Do you want some coffee?', pt: 'Você quer um pouco de café?' },
        { en: "We don't have any food. Let's go to the grocery store.", pt: 'Nós não temos nenhuma comida. Vamos ao mercado.' },
        { en: 'Do you have any salad?', pt: 'Você tem alguma salada?' },
      ],
      drill: [
        { id: 'rl1', base: 'Do you know how to make chocolate popcorn?', cue: 'popcorn → cake', prompt: 'Você sabe fazer bolo de chocolate?', answers: ['Do you know how to make chocolate cake?', 'Do you know how to make a chocolate cake?'] },
        { id: 'rl2', base: 'I want to make your favorite dish tonight.', cue: 'dish → pizza', prompt: 'Eu quero fazer sua pizza favorita hoje à noite.', answers: ['I want to make your favorite pizza tonight.'] },
        { id: 'rl3', base: 'We want to give you this book.', cue: 'book → ice cream', prompt: 'Nós queremos te dar este sorvete.', answers: ['We want to give you this ice cream.'] },
        { id: 'rl4', base: 'I want to give a gift to my mother.', cue: 'a gift → a cake', prompt: 'Eu quero dar um bolo para minha mãe.', answers: ['I want to give a cake to my mother.', 'I want to give my mother a cake.'] },
        { id: 'rl5', base: 'Do you usually give tips to the waiters?', cue: 'the waiters → the waitress', prompt: 'Você geralmente dá gorjetas para a garçonete?', answers: ['Do you usually give tips to the waitress?'] },
        { id: 'rl6', base: 'This is the best restaurant in the city.', cue: 'city → block (quarteirão)', prompt: 'Este é o melhor restaurante do quarteirão.', answers: ['This is the best restaurant on the block.', 'This is the best restaurant in the block.'] },
        { id: 'rl7', base: 'I love that place! Their food is very good!', cue: 'food → hamburger', prompt: 'Eu amo aquele lugar! O hambúrguer deles é muito bom!', answers: ['I love that place! Their hamburger is very good!'] },
        { id: 'rl8', base: 'We clean our house every Friday.', cue: 'house → office', prompt: 'Nós limpamos nosso escritório toda sexta-feira.', answers: ['We clean our office every Friday.'] },
        { id: 'rl9', base: 'I want some tomato sauce, please.', cue: 'tomato sauce → soup', prompt: 'Eu quero um pouco de sopa, por favor.', answers: ['I want some soup, please.'] },
        { id: 'rl10', base: 'Do you want some coffee?', cue: 'coffee → ice cream', prompt: 'Você quer um pouco de sorvete?', answers: ['Do you want some ice cream?'] },
        { id: 'rl11', base: "We don't have any food. Let's go to the grocery store.", cue: 'food → pizza / grocery store → pizza place', prompt: 'Nós não temos nenhuma pizza. Vamos à pizzaria.', answers: ["We don't have any pizza. Let's go to the pizza place."] },
        { id: 'rl12', base: 'Do you have any salad?', cue: 'salad → hamburgers', prompt: 'Você tem algum hambúrguer?', answers: ['Do you have any hamburgers?', 'Do you have any hamburger?'] },
      ],
    },

    checkItOut: {
      blocks: [
        {
          title: 'to make + …',
          lines: [
            { en: 'to make a cake', pt: 'fazer um bolo' },
            { en: 'to make popcorn', pt: 'fazer pipoca' },
            { en: 'to make a dessert', pt: 'fazer uma sobremesa' },
            { en: 'to make some coffee', pt: 'fazer café' },
            { en: 'to make cookies', pt: 'fazer biscoitos' },
            { en: 'to make soup', pt: 'fazer sopa' },
            { en: 'to make friends', pt: 'fazer amigos' },
          ],
        },
        {
          title: 'No restaurante',
          lines: [
            { en: 'May I see the menu, please?', pt: 'Posso ver o cardápio, por favor?' },
            { en: 'Sure, here you are.', pt: 'Claro, aqui está.' },
          ],
        },
        {
          title: 'Convite',
          lines: [{ en: "Let's go to a pizza place!", pt: 'Vamos a uma pizzaria!' }],
        },
      ],
      drill: [
        { id: 'ck1', prompt: 'Ela faz amigos facilmente.', answers: ['She makes friends easily.'] },
        { id: 'ck2', prompt: 'Eu quero fazer biscoitos.', answers: ['I want to make cookies.', 'I want to make some cookies.'] },
        { id: 'ck3', prompt: 'Nós queremos fazer uma sobremesa.', answers: ['We want to make a dessert.'] },
        { id: 'ck4', prompt: 'Ele faz sopa todo domingo.', answers: ['He makes soup every Sunday.'] },
        { id: 'ck5', prompt: 'Posso ver o cardápio, por favor?', answers: ['May I see the menu, please?'] },
        { id: 'ck6', prompt: 'Claro, aqui está.', answers: ['Sure, here you are.'] },
        { id: 'ck7', prompt: 'Vamos a uma pizzaria!', answers: ["Let's go to a pizza place!"] },
      ],
    },

    fluency: [
      {
        id: 'fl1',
        model: 'I want to make a cake.',
        modelPt: 'Eu quero fazer um bolo.',
        steps: [
          { cue: 'she', answers: ['She wants to make a cake.'] },
          { cue: 'a pizza', answers: ['She wants to make a pizza.'] },
          { cue: 'they', answers: ['They want to make a pizza.'] },
          { cue: 'soup', answers: ['They want to make soup.', 'They want to make some soup.'] },
          { cue: 'he', answers: ['He wants to make soup.', 'He wants to make some soup.'] },
          { cue: 'negativa', answers: ["He doesn't want to make soup.", "He doesn't want to make any soup."] },
          { cue: 'pergunta', answers: ['Does he want to make soup?', 'Does he want to make some soup?', 'Does he want to make any soup?'] },
        ],
      },
      {
        id: 'fl2',
        model: 'Do you have any tips?',
        modelPt: 'Você tem alguma dica?',
        steps: [
          { cue: 'she', answers: ['Does she have any tips?'] },
          { cue: 'money', answers: ['Does she have any money?'] },
          { cue: 'they', answers: ['Do they have any money?'] },
          { cue: 'negativa', answers: ["They don't have any money."] },
          { cue: 'we', answers: ["We don't have any money."] },
          { cue: 'afirmativa (some)', answers: ['We have some money.'] },
          { cue: 'friends in Germany', answers: ['We have some friends in Germany.'] },
        ],
      },
      {
        id: 'fl3',
        model: 'I want to give a gift to my mother.',
        modelPt: 'Eu quero dar um presente para minha mãe.',
        steps: [
          { cue: 'a cake', answers: ['I want to give a cake to my mother.', 'I want to give my mother a cake.'] },
          { cue: 'my father', answers: ['I want to give a cake to my father.', 'I want to give my father a cake.'] },
          { cue: 'we', answers: ['We want to give a cake to my father.', 'We want to give my father a cake.', 'We want to give a cake to our father.', 'We want to give our father a cake.'] },
          { cue: 'to make', answers: ['We want to make a cake for my father.', 'We want to make a cake for our father.', 'We want to make my father a cake.', 'We want to make our father a cake.'] },
          { cue: 'she', answers: ['She wants to make a cake for my father.', 'She wants to make a cake for her father.', 'She wants to make her father a cake.'] },
        ],
      },
    ],

    questions: {
      items: [
        { id: 'q1', question: 'What is your favorite dish?', questionPt: 'Qual é o seu prato favorito?', modelAnswer: 'My favorite dish is lasagna.' },
        { id: 'q2', question: 'Do you know how to make a cake?', questionPt: 'Você sabe fazer um bolo?', modelAnswer: "Yes, I do. I know how to make a chocolate cake." },
        { id: 'q3', question: 'Do you usually give tips to the waiters?', questionPt: 'Você geralmente dá gorjeta aos garçons?', modelAnswer: 'Yes, I usually give tips to the waiters.' },
        { id: 'q4', question: 'What is the best restaurant in your city?', questionPt: 'Qual é o melhor restaurante da sua cidade?', modelAnswer: 'I think the best restaurant in my city is a pizza place downtown.' },
        { id: 'q5', question: 'Do you have any friends in another country?', questionPt: 'Você tem algum amigo em outro país?', modelAnswer: 'Yes, I have some friends in Portugal.' },
        { id: 'q6', question: 'Do you like fast food?', questionPt: 'Você gosta de fast food?', modelAnswer: "Yes, I do. I like hamburgers and pizza." },
        { id: 'q7', question: 'Do you prefer hot or cold food?', questionPt: 'Você prefere comida quente ou fria?', modelAnswer: 'I prefer hot food.' },
        { id: 'q8', question: 'What do you want for dessert?', questionPt: 'O que você quer de sobremesa?', modelAnswer: 'I want a slice of pie for dessert.' },
      ],
      variationsModel: 'Do you want some popcorn?',
      variationsExamples: [
        'Do you want some ice cream?',
        'Does she want some popcorn?',
        'Do they want some coffee?',
        'Do you have any popcorn?',
        'Do you know how to make popcorn?',
      ],
    },
  },
];
