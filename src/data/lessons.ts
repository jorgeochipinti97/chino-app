import { QuizData, LessonMaterial } from "@/types";

export const INITIAL_QUIZZES: QuizData[] = [
  {
    id: "clase-02",
    lesson_number: 2,
    title: "Quiz - Clase 2 de Chino",
    description: "Saludos formales/informales, plurales con 们 (-men), despedida 再见 y presentaciones.",
    total_questions: 8,
    questions: [
      {
        id: 1,
        question: "¿Cómo saludas formalmente a un profesor o persona mayor en chino?",
        options: [
          "Nǐ hǎo (你好)",
          "Nín hǎo (您好)",
          "Nǐmen hǎo (你们好)",
          "Zàijiàn (再见)"
        ],
        correct_answer: "Nín hǎo (您好)",
        explanation: "'Nín' (您) es la forma de respeto y cortesía de 'Nǐ' (tú/vos).",
        hanzi: "您好",
        pinyin: "Nín hǎo"
      },
      {
        id: 2,
        question: "¿Qué sufijo se utiliza para convertir pronombres a su forma plural (ej. nosotros, ustedes, ellos)?",
        options: [
          "-hǎo (好)",
          "-zài (在)",
          "-men (们)",
          "-shì (是)"
        ],
        correct_answer: "-men (们)",
        explanation: "El sufijo '-men' pluraliza personas: wǒmen (nosotros), nǐmen (ustedes), tāmen (ellos/ellas).",
        hanzi: "们",
        pinyin: "-men"
      },
      {
        id: 3,
        question: "¿Qué significa literalmente la despedida '再见' (Zàijiàn)?",
        options: [
          "Hasta nunca",
          "Vernos de nuevo / Otra vez ver",
          "Buen viaje",
          "Buenas noches"
        ],
        correct_answer: "Vernos de nuevo / Otra vez ver",
        explanation: "'Zài' (再) significa 'de nuevo / otra vez' y 'Jiàn' (见) significa 'ver / encontrarse'.",
        hanzi: "再见",
        pinyin: "Zàijiàn"
      },
      {
        id: 4,
        question: "¿Cómo se pronuncia de manera aproximada en español la 'Z' inicial de 'Zàijiàn'?",
        options: [
          "Como una 's' suave (Sai)",
          "Como una 'ds' / 'ts' suave (Dsay / Tsay)",
          "Como una 'z' española interdental (Zai)",
          "Como una 'ch' fuerte (Chai)"
        ],
        correct_answer: "Como una 'ds' / 'ts' suave (Dsay / Tsay)",
        explanation: "En pīnyīn, la letra 'z' suena similar a 'ds' o 'ts' (como en pizza o tsunami).",
        hanzi: "再",
        pinyin: "Zài"
      },
      {
        id: 5,
        question: "¿Cómo se dice 'Soy programador(a)' en chino?",
        options: [
          "Wǒ jiào chéngxùyuán (我叫程序员)",
          "Wǒ zhù chéngxùyuán (我住程序员)",
          "Wǒ shì chéngxùyuán (我是程序员)",
          "Wǒmen hǎo chéngxùyuán (我们好程序员)"
        ],
        correct_answer: "Wǒ shì chéngxùyuán (我是程序员)",
        explanation: "'Shì' (是) es el verbo ser en chino y 'chéngxùyuán' (程序员) significa programador.",
        hanzi: "我是程序员",
        pinyin: "Wǒ shì chéngxùyuán"
      },
      {
        id: 6,
        question: "¿Qué verbo utilizas para presentarte diciendo tu nombre (ej. 'Me llamo Jorge')?",
        options: [
          "Jiào (叫)",
          "Zhù (住)",
          "Shì (是)",
          "Hǎo (好)"
        ],
        correct_answer: "Jiào (叫)",
        explanation: "'Wǒ jiào [Nombre]' significa 'Me llamo [Nombre]' o 'Me llaman [Nombre]'.",
        hanzi: "叫",
        pinyin: "Jiào"
      },
      {
        id: 7,
        question: "¿Qué tono llevan las dos sílabas de 'Zàijiàn' (再见)?",
        options: [
          "1er tono (alto y plano)",
          "2do tono (ascendente)",
          "3er tono (baja y sube)",
          "4to tono (descendente y cortante)"
        ],
        correct_answer: "4to tono (descendente y cortante)",
        explanation: "Tanto 'Zài' como 'jiàn' llevan 4to tono (ˋ), pronunciándose con fuerza hacia abajo.",
        hanzi: "再见",
        pinyin: "Zàijiàn"
      },
      {
        id: 8,
        question: "Si querés decir 'Nosotros', ¿cuál es la palabra correcta?",
        options: [
          "Nǐmen (你们)",
          "Tāmen (他们)",
          "Wǒmen (我们)",
          "Nínmen (您们)"
        ],
        correct_answer: "Wǒmen (我们)",
        explanation: "'Wǒ' (Yo) + 'men' (plural) = Wǒmen (Nosotros).",
        hanzi: "我们",
        pinyin: "Wǒmen"
      }
    ]
  }
];

export const LESSON_MATERIALS: LessonMaterial[] = [
  {
    id: "mat-clase-02",
    lesson_number: 2,
    title: "Clase 2: Saludos, Despedidas y Presentación",
    summary: "Saludos singular/plural/formal, pronunciación de Zàijiàn, presentaciones personales y vocabulario clave visto en clase.",
    sections: [
      {
        title: "1. Saludos: Singular, Plural y Formal",
        description: "El sufijo 们 (-men) se usa para pluralizar personas.",
        items: [
          {
            pinyin: "Nǐ hǎo",
            hanzi: "你好",
            type: "Singular (Informal)",
            pronunciation: "Ni jao (tono 3+3 -> 2+3)",
            meaning: "Hola (a una persona)"
          },
          {
            pinyin: "Nǐmen hǎo",
            hanzi: "你们好",
            type: "Plural",
            pronunciation: "Nimen jao",
            meaning: "Hola a todos / ustedes"
          },
          {
            pinyin: "Nín hǎo",
            hanzi: "您好",
            type: "Formal / Respeto",
            pronunciation: "Nin jao",
            meaning: "Hola a Usted (profesor, mayor)"
          }
        ]
      },
      {
        title: "2. Despedidas",
        description: "再 (Zài: de nuevo) + 见 (Jiàn: ver) = Vernos de nuevo.",
        items: [
          {
            pinyin: "Zàijiàn!",
            hanzi: "再见！",
            type: "Despedida",
            pronunciation: "Dsay-yien! (ambos 4to tono: hacia abajo)",
            meaning: "¡Adiós! / ¡Chau! / ¡Hasta luego!"
          }
        ]
      },
      {
        title: "3. Presentación Personal",
        items: [
          {
            pinyin: "Wǒ jiào Jorge.",
            hanzi: "我叫 Jorge。",
            pronunciation: "Uo dyiao Jorge",
            meaning: "Me llamo Jorge."
          },
          {
            pinyin: "Wǒ zhù Ezeiza.",
            hanzi: "我住 Ezeiza。",
            pronunciation: "Uo dshu Ezeiza",
            meaning: "Vivo en Ezeiza."
          },
          {
            pinyin: "Wǒ shì chéngxùyuán.",
            hanzi: "我是程序员。",
            pronunciation: "Uo shi cheng-shü-üan",
            meaning: "Soy programador(a)."
          }
        ]
      }
    ],
    grammar_tips: [
      "El sufijo -men (们) convierte pronombres a plural: Wǒmen (nosotros), Nǐmen (ustedes), Tāmen (ellos).",
      "Nín (您) se compone del caracter 你 (tú) + 心 (corazón) en la base.",
      "La 'Z' en pinyin suena como 'ds' o 'ts' (como en pizza).",
      "Ambas sílabas de Zàijiàn (再见) llevan 4to tono (descendente y decidido)."
    ]
  }
];
