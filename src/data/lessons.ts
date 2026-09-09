import { QuizData, LessonMaterial } from "@/types";

export const INITIAL_QUIZZES: QuizData[] = [
  {
    id: "clase-02",
    lesson_number: 2,
    title: "Quiz - Clase 2 de Chino",
    description: "Saludos formales/informales, plurales con 们 (-men), despedida 再见, presentaciones y preguntas (什么 / 哪里).",
    total_questions: 10,
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
      },
      {
        id: 9,
        question: "¿Cómo preguntás '¿Cómo te llamás?' en chino?",
        options: [
          "Nǐ zhù nǎlǐ? (你住哪里？)",
          "Nǐ jiào shénme míngzi? (你叫什么名字？)",
          "Wǒ jiào shénme míngzi? (我叫什么名字？)",
          "Nǐ shì shénme? (你是什么？)"
        ],
        correct_answer: "Nǐ jiào shénme míngzi? (你叫什么名字？)",
        explanation: "Literal: 'Vos llamarte qué nombre?'. En chino la palabra interrogativa 什么 (shénme = qué) va en el lugar donde iría la respuesta, no al principio como en español.",
        hanzi: "你叫什么名字？",
        pinyin: "Nǐ jiào shénme míngzi?"
      },
      {
        id: 10,
        question: "¿Qué palabra usás para preguntar 'dónde' en '你住___？' (¿Dónde vivís?)",
        options: [
          "shénme (什么)",
          "nǎlǐ (哪里)",
          "zàijiàn (再见)",
          "míngzi (名字)"
        ],
        correct_answer: "nǎlǐ (哪里)",
        explanation: "'Nǎlǐ' (哪里) significa 'dónde'. 你住哪里？= '¿Vos vivís dónde?' → se responde con 我住 + lugar (Wǒ zhù Ezeiza).",
        hanzi: "你住哪里？",
        pinyin: "Nǐ zhù nǎlǐ?"
      }
    ]
  },
  {
    id: "clase-03",
    lesson_number: 3,
    title: "Quiz - Clase 3 de Chino",
    description: "Pronombres personales (我/你/他/她/它), plural con 们 en sustantivos de personas y reglas de orden de trazos.",
    total_questions: 10,
    questions: [
      {
        id: 1,
        question: "¿Cuál es el pronombre para 'ella'?",
        options: [
          "他 (tā)",
          "她 (tā)",
          "它 (tā)",
          "我 (wǒ)"
        ],
        correct_answer: "她 (tā)",
        explanation: "他 / 她 / 它 se pronuncian IGUAL (tā). Solo se distinguen por escrito: 亻(persona) para él, 女 (mujer) para ella, 宀 para cosas.",
        hanzi: "她",
        pinyin: "tā"
      },
      {
        id: 2,
        question: "PREGUNTA DE EXAMEN: ¿a qué pronombre NO se le puede agregar el sufijo 们?",
        options: [
          "我 (wǒ)",
          "你 (nǐ)",
          "它 (tā — eso)",
          "他 (tā — él)"
        ],
        correct_answer: "它 (tā — eso)",
        explanation: "它 se refiere a cosas y animales, y 们 pluraliza PERSONAS. Por eso 它们 no se usa: no existe 'esos' con 们.",
        hanzi: "它",
        pinyin: "tā"
      },
      {
        id: 3,
        question: "¿Cómo se dice 'profesores' (plural) en chino?",
        options: [
          "老师们 (lǎoshīmen)",
          "老师好 (lǎoshī hǎo)",
          "们老师 (men lǎoshī)",
          "老师二 (lǎoshī èr)"
        ],
        correct_answer: "老师们 (lǎoshīmen)",
        explanation: "们 va SIEMPRE DESPUÉS del sustantivo o pronombre: 老师 + 们 = 老师们.",
        hanzi: "老师们",
        pinyin: "lǎoshīmen"
      },
      {
        id: 4,
        question: "¿Qué significa 同学们 (tóngxuémen)?",
        options: [
          "Profesores",
          "Compañeros de clase",
          "Estudiantes",
          "Amigos"
        ],
        correct_answer: "Compañeros de clase",
        explanation: "同学 (tóngxué) = compañero de clase. Con 们 pasa a plural: 同学们.",
        hanzi: "同学们",
        pinyin: "tóngxuémen"
      },
      {
        id: 5,
        question: "¿Cómo se dice 'ustedes'?",
        options: [
          "我们 (wǒmen)",
          "他们 (tāmen)",
          "你们 (nǐmen)",
          "您们 (nínmen)"
        ],
        correct_answer: "你们 (nǐmen)",
        explanation: "你 (vos) + 们 = 你们 (ustedes).",
        hanzi: "你们",
        pinyin: "nǐmen"
      },
      {
        id: 6,
        question: "Orden de trazos: en 十 (shí), ¿qué trazo se escribe primero?",
        options: [
          "El vertical",
          "El horizontal",
          "Da igual",
          "Los dos a la vez"
        ],
        correct_answer: "El horizontal",
        explanation: "先横后竖 (xiān héng hòu shù): primero el horizontal, después el vertical. Ejemplos: 十, 干, 丰.",
        hanzi: "十",
        pinyin: "shí"
      },
      {
        id: 7,
        question: "En 明 (míng), ¿qué componente se escribe primero?",
        options: [
          "月 (el de la derecha)",
          "日 (el de la izquierda)",
          "El de abajo",
          "El más grande"
        ],
        correct_answer: "日 (el de la izquierda)",
        explanation: "从左到右 (cóng zuǒ dào yòu): los radicales de la izquierda van antes que los de la derecha. Ejemplos: 位, 林, 明.",
        hanzi: "明",
        pinyin: "míng"
      },
      {
        id: 8,
        question: "¿Qué regla de trazos se aplica al escribir 三 (sān)?",
        options: [
          "De arriba hacia abajo (从上到下)",
          "De izquierda a derecha (从左到右)",
          "Primero horizontal, luego vertical (先横后竖)",
          "Primero diagonal izquierda (先撇后捺)"
        ],
        correct_answer: "De arriba hacia abajo (从上到下)",
        explanation: "从上到下 (cóng shàng dào xià): primero los trazos de arriba, después los de abajo. Ejemplos: 言, 茶, 三.",
        hanzi: "三",
        pinyin: "sān"
      },
      {
        id: 9,
        question: "En 人 (rén), ¿qué trazo va primero?",
        options: [
          "El piě (撇 — diagonal hacia la izquierda)",
          "El nà (捺 — diagonal hacia la derecha)",
          "El horizontal",
          "El vertical"
        ],
        correct_answer: "El piě (撇 — diagonal hacia la izquierda)",
        explanation: "先撇后捺 (xiān piě hòu nà): la diagonal izquierda antes que la derecha. Ejemplos: 八, 人, 文.",
        hanzi: "人",
        pinyin: "rén"
      },
      {
        id: 10,
        question: "他 y 她 se escriben distinto. ¿Cómo se pronuncian?",
        options: [
          "他 = tā · 她 = tǎ",
          "Los dos igual: tā",
          "他 = tā · 她 = shē",
          "他 = tā · 她 = nǚ"
        ],
        correct_answer: "Los dos igual: tā",
        explanation: "La diferencia entre él y ella en chino es SOLO visual (radical 亻 vs 女). Al hablar suenan idénticos y se entiende por contexto.",
        hanzi: "他 / 她",
        pinyin: "tā / tā"
      }
    ]
  }
];

export const LESSON_MATERIALS: LessonMaterial[] = [
  {
    id: "mat-clase-02",
    lesson_number: 2,
    title: "Clase 2: Saludos, Despedidas y Presentación",
    summary: "Saludos singular/plural/formal, pronunciación de Zàijiàn, presentaciones personales, preguntas con 什么 / 哪里 y vocabulario clave visto en clase.",
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
      },
      {
        title: "4. Preguntas para conocer a alguien",
        description: "La palabra interrogativa (什么 / 哪里) va en el MISMO lugar donde iría la respuesta. No se invierte el orden como en español.",
        items: [
          {
            pinyin: "Nǐ jiào shénme míngzi?",
            hanzi: "你叫什么名字？",
            type: "Pregunta → Wǒ jiào…",
            pronunciation: "Ni dyiao shénme mingdsz? (literal: vos llamarte qué nombre)",
            meaning: "¿Cómo te llamás?"
          },
          {
            pinyin: "Nǐ zhù nǎlǐ?",
            hanzi: "你住哪里？",
            type: "Pregunta → Wǒ zhù…",
            pronunciation: "Ni dshu na-li? (literal: vos vivir dónde)",
            meaning: "¿Dónde vivís?"
          },
          {
            pinyin: "Nǐ zuò shénme gōngzuò?",
            hanzi: "你做什么工作？",
            type: "Pregunta → Wǒ shì…",
            pronunciation: "Ni dsuo shénme gong-dsuo? (literal: vos hacer qué trabajo)",
            meaning: "¿En qué trabajás? / ¿A qué te dedicás?"
          },
          {
            pinyin: "shénme",
            hanzi: "什么",
            type: "Interrogativo",
            pronunciation: "shénme",
            meaning: "Qué"
          },
          {
            pinyin: "nǎlǐ",
            hanzi: "哪里",
            type: "Interrogativo",
            pronunciation: "na-li",
            meaning: "Dónde"
          },
          {
            pinyin: "míngzi",
            hanzi: "名字",
            type: "Sustantivo",
            pronunciation: "mingdsz",
            meaning: "Nombre"
          }
        ]
      }
    ],
    grammar_tips: [
      "El sufijo -men (们) convierte pronombres a plural: Wǒmen (nosotros), Nǐmen (ustedes), Tāmen (ellos).",
      "Nín (您) se compone del caracter 你 (tú) + 心 (corazón) en la base.",
      "La 'Z' en pinyin suena como 'ds' o 'ts' (como en pizza).",
      "Ambas sílabas de Zàijiàn (再见) llevan 4to tono (descendente y decidido).",
      "En chino NO se invierte el orden para preguntar: la palabra interrogativa ocupa el lugar de la respuesta. 你叫什么名字？→ 我叫 Jorge。",
      "什么 (shénme) = qué · 哪里 (nǎlǐ) = dónde. Son las dos interrogativas de esta clase.",
      "Cada pregunta se responde con el mismo verbo: 叫 → 我叫…, 住 → 我住…, 是 → 我是…"
    ]
  },
  {
    id: "mat-clase-03",
    lesson_number: 3,
    title: "Clase 3: Pronombres Personales, Plural con 们 y Orden de Trazos",
    summary: "Los 8 pronombres personales, el sufijo 们 aplicado a sustantivos de personas (老师们, 同学们, 学生们), la excepción de 它 y las 4 reglas de orden de trazos.",
    sections: [
      {
        title: "1. Pronombres Personales — Singular",
        description: "他 / 她 / 它 suenan IGUAL (tā). La diferencia es solo el caracter escrito.",
        items: [
          {
            pinyin: "wǒ",
            hanzi: "我",
            type: "1ra persona",
            pronunciation: "uo (3er tono)",
            meaning: "Yo"
          },
          {
            pinyin: "nǐ",
            hanzi: "你",
            type: "2da persona",
            pronunciation: "ni (3er tono)",
            meaning: "Tú / Vos"
          },
          {
            pinyin: "tā",
            hanzi: "他",
            type: "3ra persona — masculino",
            pronunciation: "ta (1er tono) · radical 亻 = persona",
            meaning: "Él"
          },
          {
            pinyin: "tā",
            hanzi: "她",
            type: "3ra persona — femenino",
            pronunciation: "ta (1er tono) · radical 女 = mujer",
            meaning: "Ella"
          },
          {
            pinyin: "tā",
            hanzi: "它",
            type: "3ra persona — cosas / animales",
            pronunciation: "ta (1er tono) · NO lleva 们",
            meaning: "Eso / Ello"
          }
        ]
      },
      {
        title: "2. Pronombres Personales — Plural (+ 们)",
        description: "们 (-men) se agrega DESPUÉS del pronombre para pluralizarlo.",
        items: [
          {
            pinyin: "wǒmen",
            hanzi: "我们",
            type: "我 + 们",
            pronunciation: "uo-men",
            meaning: "Nosotros / Nosotras"
          },
          {
            pinyin: "nǐmen",
            hanzi: "你们",
            type: "你 + 们",
            pronunciation: "ni-men",
            meaning: "Ustedes"
          },
          {
            pinyin: "tāmen",
            hanzi: "他们",
            type: "他 + 们",
            pronunciation: "ta-men",
            meaning: "Ellos (o grupo mixto)"
          },
          {
            pinyin: "tāmen",
            hanzi: "她们",
            type: "她 + 们",
            pronunciation: "ta-men",
            meaning: "Ellas (grupo solo de mujeres)"
          }
        ]
      },
      {
        title: "3. ⚠️ Pregunta de examen: la excepción 它",
        description: "它 (eso) NO acepta 们. El sufijo 们 pluraliza PERSONAS, no cosas ni animales.",
        items: [
          {
            pinyin: "tā → ✗ tāmen",
            hanzi: "它 → 它们 ✗",
            type: "EXCEPCIÓN",
            pronunciation: "Si te preguntan '¿al caracter de eso se le puede agregar 们?' → NO",
            meaning: "它 no se pluraliza con 们"
          }
        ]
      },
      {
        title: "4. 们 con Sustantivos de Personas",
        description: "La misma regla de los pronombres aplica a sustantivos que designan personas.",
        items: [
          {
            pinyin: "lǎoshī → lǎoshīmen",
            hanzi: "老师 → 老师们",
            type: "Sustantivo + 们",
            pronunciation: "lao-shi → lao-shi-men",
            meaning: "Profesor/Maestra → Profesores/Maestras"
          },
          {
            pinyin: "tóngxué → tóngxuémen",
            hanzi: "同学 → 同学们",
            type: "Sustantivo + 们",
            pronunciation: "tong-shüe → tong-shüe-men",
            meaning: "Compañero de clase → Compañeros de clase"
          },
          {
            pinyin: "xuéshēng → xuéshēngmen",
            hanzi: "学生 → 学生们",
            type: "Sustantivo + 们",
            pronunciation: "shüe-sheng → shüe-sheng-men",
            meaning: "Estudiante/Alumno → Estudiantes/Alumnos"
          },
          {
            pinyin: "nǐ → nǐmen",
            hanzi: "你 → 你们",
            type: "Pronombre + 们",
            pronunciation: "ni → ni-men",
            meaning: "Tú → Ustedes"
          }
        ]
      },
      {
        title: "5. Orden de Trazos — Las 4 Reglas",
        description: "El orden de trazos no es decorativo: define cómo se busca un caracter en el diccionario y cómo se lee la escritura a mano.",
        items: [
          {
            pinyin: "cóng shàng dào xià",
            hanzi: "从上到下",
            type: "Regla 1",
            pronunciation: "Ejemplos: 言 (yán), 茶 (chá), 三 (sān)",
            meaning: "De arriba hacia abajo — primero los trazos superiores, luego los inferiores"
          },
          {
            pinyin: "cóng zuǒ dào yòu",
            hanzi: "从左到右",
            type: "Regla 2",
            pronunciation: "Ejemplos: 位 (wèi), 林 (lín), 明 (míng)",
            meaning: "De izquierda a derecha — los radicales de la izquierda van primero"
          },
          {
            pinyin: "xiān héng hòu shù",
            hanzi: "先横后竖",
            type: "Regla 3",
            pronunciation: "Ejemplos: 十 (shí), 干 (gān), 丰 (fēng)",
            meaning: "Primero horizontal, luego vertical — cuando se cruzan, el horizontal va primero"
          },
          {
            pinyin: "xiān piě hòu nà",
            hanzi: "先撇后捺",
            type: "Regla 4",
            pronunciation: "Ejemplos: 八 (bā), 人 (rén), 文 (wén)",
            meaning: "Primero la diagonal izquierda (撇), después la derecha (捺)"
          }
        ]
      }
    ],
    grammar_tips: [
      "⚠️ EXAMEN: a 它 (eso) NO se le agrega 们. 们 pluraliza personas — cosas y animales quedan afuera.",
      "他 / 她 / 它 se pronuncian los tres tā. La diferencia es SOLO escrita: 亻(persona), 女 (mujer), 宀 (cosa).",
      "们 va siempre DESPUÉS de la palabra: 老师们, nunca 们老师.",
      "她们 se usa cuando el grupo es solo de mujeres. Si hay al menos un hombre, se usa 他们.",
      "Orden de trazos: arriba→abajo, izquierda→derecha, horizontal antes que vertical, 撇 antes que 捺."
    ]
  }
];
