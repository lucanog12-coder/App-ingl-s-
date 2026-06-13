import { Unit } from '../types';

export const units: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Hello! Nice to Meet You!',
    titlePt: 'Olá! Prazer em conhecê-lo!',
    difficulty: 'beginner',
    vocabulary: [
      { id: 'v1-1', english: 'Hello', portuguese: 'Olá', phonetic: '/həˈloʊ/', example: 'Hello! How are you?', examplePt: 'Olá! Como vai você?', category: 'greetings' },
      { id: 'v1-2', english: 'Goodbye', portuguese: 'Tchau / Adeus', phonetic: '/ˌɡʊdˈbaɪ/', example: 'Goodbye! See you tomorrow.', examplePt: 'Tchau! Te vejo amanhã.', category: 'greetings' },
      { id: 'v1-3', english: 'Please', portuguese: 'Por favor', phonetic: '/pliːz/', example: 'Please sit down.', examplePt: 'Por favor, sente-se.', category: 'courtesy' },
      { id: 'v1-4', english: 'Thank you', portuguese: 'Obrigado(a)', phonetic: '/θæŋk juː/', example: 'Thank you very much!', examplePt: 'Muito obrigado!', category: 'courtesy' },
      { id: 'v1-5', english: 'Sorry', portuguese: 'Desculpe', phonetic: '/ˈsɒri/', example: "I'm sorry, I don't understand.", examplePt: 'Desculpe, não entendo.', category: 'courtesy' },
      { id: 'v1-6', english: 'Name', portuguese: 'Nome', phonetic: '/neɪm/', example: 'My name is Ana.', examplePt: 'Meu nome é Ana.', category: 'personal' },
      { id: 'v1-7', english: 'Student', portuguese: 'Estudante', phonetic: '/ˈstjuːdənt/', example: 'She is a student.', examplePt: 'Ela é uma estudante.', category: 'people' },
      { id: 'v1-8', english: 'Teacher', portuguese: 'Professor(a)', phonetic: '/ˈtiːtʃər/', example: 'My teacher is very good.', examplePt: 'Meu professor é muito bom.', category: 'people' },
    ],
    dialogues: [
      {
        id: 'd1-1',
        title: 'First Meeting',
        titlePt: 'Primeiro Encontro',
        situation: 'Two people meeting for the first time at school / Duas pessoas se encontrando pela primeira vez na escola',
        lines: [
          { speaker: 'A', text: 'Hello! My name is Carlos. What is your name?', translation: 'Olá! Meu nome é Carlos. Qual é o seu nome?' },
          { speaker: 'B', text: 'Hi, Carlos! My name is Sarah. Nice to meet you!', translation: 'Oi, Carlos! Meu nome é Sarah. Prazer em conhecê-lo!' },
          { speaker: 'A', text: 'Nice to meet you too, Sarah. Are you a student here?', translation: 'Prazer em conhecê-la também, Sarah. Você é estudante aqui?' },
          { speaker: 'B', text: 'Yes, I am. I am in level one. And you?', translation: 'Sim, sou. Estou no nível um. E você?' },
          { speaker: 'A', text: 'Me too! See you in class!', translation: 'Eu também! Até a aula!' },
        ]
      }
    ],
    grammar: [
      {
        id: 'g1-1',
        title: 'Verbo TO BE — Presente Simples',
        explanation: 'O verbo "to be" significa SER ou ESTAR. É o verbo mais importante do inglês! Usamos AM com I, IS com he/she/it e ARE com you/we/they.',
        affirmative: 'Sujeito + AM/IS/ARE + complemento',
        interrogative: 'AM/IS/ARE + Sujeito + complemento?',
        negative: 'Sujeito + AM/IS/ARE + NOT + complemento',
        examples: [
          {
            affirmative: 'I am a student.',
            affirmativePt: 'Eu sou um(a) estudante.',
            interrogative: 'Am I a student?',
            interrogativePt: 'Sou eu um(a) estudante?',
            negative: 'I am not a student.',
            negativePt: 'Eu não sou um(a) estudante.',
          },
          {
            affirmative: 'She is a teacher.',
            affirmativePt: 'Ela é uma professora.',
            interrogative: 'Is she a teacher?',
            interrogativePt: 'Ela é uma professora?',
            negative: 'She is not a teacher.',
            negativePt: 'Ela não é uma professora.',
          },
          {
            affirmative: 'They are students.',
            affirmativePt: 'Eles são estudantes.',
            interrogative: 'Are they students?',
            interrogativePt: 'Eles são estudantes?',
            negative: 'They are not students.',
            negativePt: 'Eles não são estudantes.',
          },
        ]
      }
    ],
    exercises: [
      {
        id: 'e1-1',
        type: 'transform',
        question: 'He is happy. → Make it INTERROGATIVE:',
        correctAnswer: 'Is he happy?',
        explanation: 'Na interrogativa, invertemos o verbo TO BE com o sujeito: IS + HE + complemento?'
      },
      {
        id: 'e1-2',
        type: 'transform',
        question: 'We are at school. → Make it NEGATIVE:',
        correctAnswer: 'We are not at school.',
        explanation: 'Na negativa, adicionamos NOT depois do verbo TO BE: ARE + NOT.'
      },
      {
        id: 'e1-3',
        type: 'multiple-choice',
        question: 'Choose the correct form: "She ___ a doctor."',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'is',
        explanation: 'Com she/he/it usamos IS.'
      },
      {
        id: 'e1-4',
        type: 'fill-blank',
        question: 'I ___ not a teacher. I ___ a student.',
        questionPt: 'Eu não sou professor(a). Eu sou um(a) estudante.',
        correctAnswer: 'am | am',
        explanation: 'Com I, sempre usamos AM.'
      },
      {
        id: 'e1-5',
        type: 'transform',
        question: 'You are from Brazil. → Make it INTERROGATIVE:',
        correctAnswer: 'Are you from Brazil?',
        explanation: 'Com YOU, o verbo TO BE é ARE. Na interrogativa: ARE + YOU + complemento?'
      },
    ]
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'My Daily Routine',
    titlePt: 'Minha Rotina Diária',
    difficulty: 'beginner',
    vocabulary: [
      { id: 'v2-1', english: 'Wake up', portuguese: 'Acordar', phonetic: '/weɪk ʌp/', example: 'I wake up at 7 am.', examplePt: 'Eu acordo às 7h.', category: 'routine' },
      { id: 'v2-2', english: 'Breakfast', portuguese: 'Café da manhã', phonetic: '/ˈbrekfəst/', example: 'I eat breakfast every day.', examplePt: 'Eu tomo café da manhã todo dia.', category: 'food' },
      { id: 'v2-3', english: 'Work', portuguese: 'Trabalhar / Trabalho', phonetic: '/wɜːrk/', example: 'I work from home.', examplePt: 'Eu trabalho de casa.', category: 'routine' },
      { id: 'v2-4', english: 'Study', portuguese: 'Estudar / Estudo', phonetic: '/ˈstʌdi/', example: 'I study English every night.', examplePt: 'Eu estudo inglês toda noite.', category: 'routine' },
      { id: 'v2-5', english: 'Sleep', portuguese: 'Dormir', phonetic: '/sliːp/', example: 'I sleep 8 hours a day.', examplePt: 'Eu durmo 8 horas por dia.', category: 'routine' },
      { id: 'v2-6', english: 'Always', portuguese: 'Sempre', phonetic: '/ˈɔːlweɪz/', example: 'I always drink coffee.', examplePt: 'Eu sempre bebo café.', category: 'adverbs' },
      { id: 'v2-7', english: 'Never', portuguese: 'Nunca', phonetic: '/ˈnevər/', example: 'I never eat fast food.', examplePt: 'Eu nunca como fast food.', category: 'adverbs' },
      { id: 'v2-8', english: 'Sometimes', portuguese: 'Às vezes', phonetic: '/ˈsʌmtaɪmz/', example: 'I sometimes watch TV.', examplePt: 'Eu às vezes assisto TV.', category: 'adverbs' },
    ],
    dialogues: [
      {
        id: 'd2-1',
        title: 'Morning Conversation',
        titlePt: 'Conversa Matinal',
        situation: 'Two coworkers talking about their morning routine / Dois colegas de trabalho falando sobre sua rotina matinal',
        lines: [
          { speaker: 'A', text: 'Good morning! What time do you usually wake up?', translation: 'Bom dia! A que horas você geralmente acorda?' },
          { speaker: 'B', text: "Good morning! I usually wake up at six o'clock.", translation: 'Bom dia! Eu geralmente acordo às seis horas.' },
          { speaker: 'A', text: "Wow, that's early! Do you eat breakfast before work?", translation: 'Uau, isso é cedo! Você toma café da manhã antes do trabalho?' },
          { speaker: 'B', text: "Yes, I always eat breakfast. It's very important!", translation: 'Sim, eu sempre tomo café da manhã. É muito importante!' },
          { speaker: 'A', text: 'I agree. I sometimes skip breakfast and feel terrible.', translation: 'Concordo. Eu às vezes pulo o café da manhã e me sinto péssimo.' },
        ]
      }
    ],
    grammar: [
      {
        id: 'g2-1',
        title: 'Simple Present — Verbos de Ação',
        explanation: 'O Simple Present descreve hábitos e rotinas. Com he/she/it, adicionamos -S ou -ES ao verbo. O auxiliar DO/DOES ajuda a formar perguntas e negativas.',
        affirmative: 'I/You/We/They + VERBO | He/She/It + VERBO+S',
        interrogative: 'DO/DOES + Sujeito + VERBO (base)?',
        negative: "Sujeito + DO NOT (don't) / DOES NOT (doesn't) + VERBO (base)",
        examples: [
          {
            affirmative: 'I study English every day.',
            affirmativePt: 'Eu estudo inglês todo dia.',
            interrogative: 'Do I study English every day?',
            interrogativePt: 'Eu estudo inglês todo dia?',
            negative: "I don't study English every day.",
            negativePt: 'Eu não estudo inglês todo dia.',
          },
          {
            affirmative: 'She works at a hospital.',
            affirmativePt: 'Ela trabalha em um hospital.',
            interrogative: 'Does she work at a hospital?',
            interrogativePt: 'Ela trabalha em um hospital?',
            negative: "She doesn't work at a hospital.",
            negativePt: 'Ela não trabalha em um hospital.',
          },
        ]
      }
    ],
    exercises: [
      {
        id: 'e2-1',
        type: 'transform',
        question: 'He works every day. → Make it INTERROGATIVE:',
        correctAnswer: 'Does he work every day?',
        explanation: 'Com he/she/it, usamos DOES na interrogativa. O verbo volta para a forma base (sem S).'
      },
      {
        id: 'e2-2',
        type: 'transform',
        question: 'They study at night. → Make it NEGATIVE:',
        correctAnswer: "They don't study at night.",
        explanation: "Com I/you/we/they, usamos DON'T (do not) na negativa."
      },
      {
        id: 'e2-3',
        type: 'multiple-choice',
        question: '"She ___ coffee every morning."',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        correctAnswer: 'drinks',
        explanation: 'Com she/he/it no Simple Present, adicionamos -S ao verbo.'
      },
    ]
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'At the Restaurant',
    titlePt: 'No Restaurante',
    difficulty: 'beginner',
    vocabulary: [
      { id: 'v3-1', english: 'Menu', portuguese: 'Cardápio', phonetic: '/ˈmenjuː/', example: 'Can I see the menu, please?', examplePt: 'Posso ver o cardápio, por favor?', category: 'restaurant' },
      { id: 'v3-2', english: 'Order', portuguese: 'Pedir / Pedido', phonetic: '/ˈɔːrdər/', example: 'Are you ready to order?', examplePt: 'Você está pronto para pedir?', category: 'restaurant' },
      { id: 'v3-3', english: 'Waiter', portuguese: 'Garçom', phonetic: '/ˈweɪtər/', example: 'Excuse me, waiter!', examplePt: 'Com licença, garçom!', category: 'restaurant' },
      { id: 'v3-4', english: 'Delicious', portuguese: 'Delicioso', phonetic: '/dɪˈlɪʃəs/', example: 'This food is delicious!', examplePt: 'Esta comida é deliciosa!', category: 'adjectives' },
      { id: 'v3-5', english: 'Bill', portuguese: 'Conta', phonetic: '/bɪl/', example: 'Can I have the bill, please?', examplePt: 'Posso ter a conta, por favor?', category: 'restaurant' },
      { id: 'v3-6', english: 'Hungry', portuguese: 'Com fome', phonetic: '/ˈhʌŋɡri/', example: 'I am very hungry!', examplePt: 'Estou com muita fome!', category: 'adjectives' },
    ],
    dialogues: [
      {
        id: 'd3-1',
        title: 'Ordering Food',
        titlePt: 'Pedindo Comida',
        situation: 'A customer ordering food at a restaurant / Um cliente pedindo comida em um restaurante',
        lines: [
          { speaker: 'A', text: 'Good evening! Welcome to La Bella. Can I help you?', translation: 'Boa noite! Bem-vindo ao La Bella. Posso ajudá-lo?' },
          { speaker: 'B', text: 'Good evening! Can I see the menu, please?', translation: 'Boa noite! Posso ver o cardápio, por favor?' },
          { speaker: 'A', text: 'Of course! Here you are. Are you ready to order?', translation: 'Claro! Aqui está. Você está pronto para pedir?' },
          { speaker: 'B', text: "I'd like the grilled chicken and a salad, please.", translation: 'Eu gostaria do frango grelhado e uma salada, por favor.' },
          { speaker: 'A', text: 'Excellent choice! And to drink?', translation: 'Excelente escolha! E para beber?' },
          { speaker: 'B', text: 'Water, please. And can I have the bill after?', translation: 'Água, por favor. E posso pegar a conta depois?' },
        ]
      }
    ],
    grammar: [
      {
        id: 'g3-1',
        title: 'Would Like — Pedidos Educados',
        explanation: '"Would like" é a forma educada de pedir algo. É muito usado em restaurantes, lojas e situações formais. É equivalente a "Eu gostaria de..."',
        affirmative: 'I/You/He/She/We/They + WOULD LIKE + substantivo/infinitivo',
        interrogative: 'WOULD + Sujeito + LIKE + substantivo/infinitivo?',
        negative: "Sujeito + WOULD NOT (wouldn't) + LIKE + substantivo/infinitivo",
        examples: [
          {
            affirmative: 'I would like a coffee.',
            affirmativePt: 'Eu gostaria de um café.',
            interrogative: 'Would you like a coffee?',
            interrogativePt: 'Você gostaria de um café?',
            negative: "I wouldn't like a coffee.",
            negativePt: 'Eu não gostaria de um café.',
          },
        ]
      }
    ],
    exercises: [
      {
        id: 'e3-1',
        type: 'multiple-choice',
        question: '"___ you like some dessert?"',
        options: ['Do', 'Would', 'Are', 'Have'],
        correctAnswer: 'Would',
        explanation: 'Usamos WOULD LIKE para pedidos educados. Would you like = Você gostaria?'
      },
      {
        id: 'e3-2',
        type: 'transform',
        question: 'I would like the pasta. → Make it INTERROGATIVE:',
        correctAnswer: 'Would you like the pasta?',
        explanation: 'Na interrogativa com WOULD, invertemos: WOULD + sujeito + LIKE...'
      },
    ]
  }
];
