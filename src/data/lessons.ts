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
        question: "¿Cómo se dice «ellos / ellas» cuando son animales o cosas?",
        options: [
          "它们 (tāmen)",
          "他们 (tāmen)",
          "她们 (tāmen)",
          "我们 (wǒmen)"
        ],
        correct_answer: "它们 (tāmen)",
        explanation: "它 (cosa o animal) también se pluraliza con 们: 它们. Los tres plurales 他们 / 她们 / 它们 suenan igual (tāmen); cambia solo el caracter.",
        hanzi: "它们",
        pinyin: "tāmen"
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
  },
  {
    id: "clase-04",
    lesson_number: 4,
    title: "Quiz - Clase 4 de Chino",
    description: "Números 0–10 (零 一 二 三 四 五 六 七 八 九 十) y la composición hasta 99 con 十 (十五 vs 五十, 二十一, 九十九).",
    total_questions: 16,
    questions: [
      {
        id: 1,
        question: "¿Cuál es el caracter del número 5?",
        options: [
          "四 (sì)",
          "五 (wǔ)",
          "六 (liù)",
          "九 (jiǔ)"
        ],
        correct_answer: "五 (wǔ)",
        explanation: "五 (wǔ) es 5, en 3er tono. En clase se aproximó como «uu».",
        hanzi: "五",
        pinyin: "wǔ"
      },
      {
        id: 2,
        question: "¿Qué número es 七?",
        options: [
          "6",
          "7",
          "8",
          "10"
        ],
        correct_answer: "7",
        explanation: "七 (qī) es 7 y suena parecido a «chi». No confundir con 十 (shí, 10).",
        hanzi: "七",
        pinyin: "qī"
      },
      {
        id: 3,
        question: "¿Cómo se escribe el 15?",
        options: [
          "五十 (wǔshí)",
          "十五 (shíwǔ)",
          "一五 (yīwǔ)",
          "十五十 (shíwǔshí)"
        ],
        correct_answer: "十五 (shíwǔ)",
        explanation: "Del 11 al 19 el 十 va PRIMERO: 十五 = 10 + 5 = 15. Al revés, 五十 sería 5 × 10 = 50.",
        hanzi: "十五",
        pinyin: "shíwǔ"
      },
      {
        id: 4,
        question: "¿Qué número es 二十一?",
        options: [
          "12",
          "21",
          "201",
          "210"
        ],
        correct_answer: "21",
        explanation: "二十一 (èr shí yī) = 2 × 10 + 1 = 21. La fórmula es decena + 十 + unidad.",
        hanzi: "二十一",
        pinyin: "èr shí yī"
      },
      {
        id: 5,
        question: "¿Cómo se dice 50?",
        options: [
          "十五 (shíwǔ)",
          "五十 (wǔshí)",
          "五五 (wǔwǔ)",
          "十十五 (shíshíwǔ)"
        ],
        correct_answer: "五十 (wǔshí)",
        explanation: "Las decenas son unidad + 十: 五十 = 5 × 10 = 50. El 十 atrás multiplica, adelante suma.",
        hanzi: "五十",
        pinyin: "wǔshí"
      },
      {
        id: 6,
        question: "¿Cómo se escribe el número 10?",
        options: [
          "一十 (yīshí)",
          "十 (shí)",
          "十零 (shílíng)",
          "零十 (língshí)"
        ],
        correct_answer: "十 (shí)",
        explanation: "El 10 es 十 solo. Aunque sea una decena, nunca se le pone 一 adelante.",
        hanzi: "十",
        pinyin: "shí"
      },
      {
        id: 7,
        question: "En jiǔ (九, nueve), ¿cómo suena la 'j' del pīnyīn?",
        options: [
          "Como la jota española de 'jarra'",
          "Como una 'y' suave: «yioo»",
          "Como una 'sh': «shioo»",
          "Como una 'g' de 'gato'"
        ],
        correct_answer: "Como una 'y' suave: «yioo»",
        explanation: "La j del pīnyīn nunca es la jota española: es palatal y suave. Misma j que en 叫 (jiào, llamarse) de la clase 2.",
        hanzi: "九",
        pinyin: "jiǔ"
      },
      {
        id: 8,
        question: "¿Cómo se escribe el 99?",
        options: [
          "九九 (jiǔjiǔ)",
          "九十九 (jiǔshíjiǔ)",
          "十九九 (shíjiǔjiǔ)",
          "九十 (jiǔshí)"
        ],
        correct_answer: "九十九 (jiǔshíjiǔ)",
        explanation: "九十九 = 9 × 10 + 9 = 99. Es el número más alto que se arma solo con 十.",
        hanzi: "九十九",
        pinyin: "jiǔshíjiǔ"
      },
      {
        id: 9,
        question: "四 (sì) y 十 (shí) se confunden al escuchar. ¿Cuál de los dos es el 4?",
        options: [
          "十 (shí)",
          "四 (sì)",
          "四 es 10 y 十 es 4",
          "Los dos significan 4"
        ],
        correct_answer: "四 (sì)",
        explanation: "四 = 4, con s suave («ss»). 十 = 10, con sh («shi»). Es la confusión clásica de los números.",
        hanzi: "四 / 十",
        pinyin: "sì / shí"
      },
      {
        id: 10,
        question: "¿Cómo se dice 'cero'?",
        options: [
          "六 (liù)",
          "零 (líng)",
          "七 (qī)",
          "十 (shí)"
        ],
        correct_answer: "零 (líng)",
        explanation: "零 (líng) es el 0, en 2do tono. No confundir con 六 (liù, 6), que suena «lio».",
        hanzi: "零",
        pinyin: "líng"
      },
      {
        id: 11,
        question: "¿Cómo se convierte 你好 (hola) en la pregunta «¿cómo estás?»",
        options: [
          "Agregando 吗 al final: 你好吗？",
          "Agregando 呢 al final: 你好呢？",
          "Cambiando el orden: 好你？",
          "Agregando 很 adelante: 很你好？"
        ],
        correct_answer: "Agregando 吗 al final: 你好吗？",
        explanation: "吗 (ma) al final convierte una afirmación en pregunta de sí/no. El orden de la oración no se toca.",
        hanzi: "你好吗？",
        pinyin: "Nǐ hǎo ma?"
      },
      {
        id: 12,
        question: "林娜 contesta «我很好，你呢？». ¿Qué hace el 呢?",
        options: [
          "Devuelve la misma pregunta sin repetirla entera",
          "Niega lo que se dijo antes",
          "Marca el plural, como 们",
          "Indica que la acción ya pasó"
        ],
        correct_answer: "Devuelve la misma pregunta sin repetirla entera",
        explanation: "呢 (ne) rebota la pregunta: 你呢？ equivale a «¿y vos?». Alcanza con el pronombre + 呢.",
        hanzi: "你呢？",
        pinyin: "Nǐ ne?"
      },
      {
        id: 13,
        question: "¿Cómo se dice «yo también estoy muy bien»?",
        options: [
          "我也很好。",
          "也我很好。",
          "我很好也。",
          "很好我也。"
        ],
        correct_answer: "我也很好。",
        explanation: "也 (yě, también) va DESPUÉS del sujeto y ANTES del adjetivo: sujeto + 也 + 很 + adjetivo.",
        hanzi: "我也很好",
        pinyin: "Wǒ yě hěn hǎo"
      },
      {
        id: 14,
        question: "Si el sujeto de 你好吗？ pasa a ser 他们 (ellos), ¿cómo queda la oración?",
        options: [
          "他们好吗？",
          "他好吗们？",
          "好吗他们？",
          "他们好们吗？"
        ],
        correct_answer: "他们好吗？",
        explanation: "Se cambia solo el pronombre: el verbo no se conjuga, así que 好吗？ queda intacto.",
        hanzi: "他们好吗？",
        pinyin: "Tāmen hǎo ma?"
      },
      {
        id: 15,
        question: "¿Cómo se dice «no estoy bien»?",
        options: [
          "我不好。",
          "我不很好。",
          "我好不。",
          "不我好。"
        ],
        correct_answer: "我不好。",
        explanation: "不 (bù) va entre el sujeto y el adjetivo. Al negar, el 很 desaparece: 我很好 → 我不好.",
        hanzi: "我不好",
        pinyin: "Wǒ bù hǎo"
      },
      {
        id: 16,
        question: "Si te preguntan 你好吗？ y NO estás bien, ¿qué contestás?",
        options: [
          "我不好。",
          "我不好吗？",
          "不很好我。",
          "我们不好吗？"
        ],
        correct_answer: "我不好。",
        explanation: "El 吗 es la partícula que arma la pregunta: en la respuesta no va. Queda 我不好。",
        hanzi: "我不好",
        pinyin: "Wǒ bù hǎo"
      }
    ]
  },
  {
    id: "clase-05",
    lesson_number: 5,
    title: "Quiz - Clase 5 de Chino",
    description: "Pronombres con 您 y el plural 它们, ¿de qué país sos? (哪国人), el orden sujeto + verbo + objeto (我吃苹果), la familia del HSK 1 y saludos útiles.",
    total_questions: 15,
    questions: [
      {
        id: 1,
        question: "¿Cuál es el «usted» formal?",
        options: [
          "您 (nín)",
          "你 (nǐ)",
          "你们 (nǐmen)",
          "他 (tā)"
        ],
        correct_answer: "您 (nín)",
        explanation: "您 es el 你 de respeto: el mismo caracter con 心 (corazón) debajo. Se usa con profesores y personas mayores.",
        hanzi: "您",
        pinyin: "nín"
      },
      {
        id: 2,
        question: "¿En qué se diferencian 他们, 她们 y 它们?",
        options: [
          "Solo en el caracter: los tres suenan tāmen",
          "En el tono de la primera sílaba",
          "En el orden: 们 va adelante en 它们",
          "它们 no existe"
        ],
        correct_answer: "Solo en el caracter: los tres suenan tāmen",
        explanation: "他们 = ellos (o grupo mixto), 她们 = ellas, 它们 = ellos/ellas para animales o cosas. Al oído son idénticos.",
        hanzi: "它们",
        pinyin: "tāmen"
      },
      {
        id: 3,
        question: "¿Cómo preguntás «¿De qué país sos?»",
        options: [
          "你是哪国人？",
          "你叫哪国人？",
          "你住哪国人？",
          "哪国人是你？"
        ],
        correct_answer: "你是哪国人？",
        explanation: "Literal: «¿Vos sos persona de qué país?». 哪 (cuál) + 国 (país) + 人 (persona), con el verbo 是 (ser).",
        hanzi: "你是哪国人？",
        pinyin: "Nǐ shì nǎ guó rén?"
      },
      {
        id: 4,
        question: "¿Qué significa 他是中国人？",
        options: [
          "Él es chino",
          "Él vive en China",
          "¿De qué país es él?",
          "Él es mi papá"
        ],
        correct_answer: "Él es chino",
        explanation: "中国 (Zhōngguó) = China, + 人 (rén) = persona → 中国人, chino. 是 une el sujeto con lo que es.",
        hanzi: "他是中国人",
        pinyin: "Tā shì Zhōngguó rén"
      },
      {
        id: 5,
        question: "¿Qué significa 她是我妈妈？",
        options: [
          "Ella es mi mamá",
          "Ella es mi hermana",
          "Yo soy su mamá",
          "¿Ella es tu mamá?"
        ],
        correct_answer: "Ella es mi mamá",
        explanation: "她 (ella) + 是 (es) + 我妈妈 (mi mamá). Con la familia cercana el pronombre va pegado: 我妈妈.",
        hanzi: "她是我妈妈",
        pinyin: "Tā shì wǒ māma"
      },
      {
        id: 6,
        question: "¿Cómo se dice «Yo como manzana»?",
        options: [
          "我吃苹果",
          "我苹果吃",
          "吃苹果我",
          "苹果吃我"
        ],
        correct_answer: "我吃苹果",
        explanation: "Sujeto + verbo + objeto, como en castellano: 我 (yo) + 吃 (como) + 苹果 (manzana). 苹果吃我 sería «la manzana me come».",
        hanzi: "我吃苹果",
        pinyin: "Wǒ chī píngguǒ"
      },
      {
        id: 7,
        question: "En 我吃苹果, ¿cuál es el verbo?",
        options: [
          "吃 (chī)",
          "我 (wǒ)",
          "苹果 (píngguǒ)",
          "果 (guǒ)"
        ],
        correct_answer: "吃 (chī)",
        explanation: "吃 (chī) = comer. Va en el medio, entre el sujeto 我 y el objeto 苹果, y no se conjuga: 我吃, 他吃, 我们吃.",
        hanzi: "吃",
        pinyin: "chī"
      },
      {
        id: 8,
        question: "¿Qué significa 哥哥 (gēge)?",
        options: [
          "Hermano mayor",
          "Hermano menor",
          "Hermana mayor",
          "Abuelo"
        ],
        correct_answer: "Hermano mayor",
        explanation: "En chino los hermanos se nombran por edad: 哥哥 mayor, 弟弟 (dìdi) menor.",
        hanzi: "哥哥",
        pinyin: "gēge"
      },
      {
        id: 9,
        question: "¿Cómo se dice «hermana menor»?",
        options: [
          "妹妹 (mèimei)",
          "姐姐 (jiějie)",
          "弟弟 (dìdi)",
          "奶奶 (nǎinai)"
        ],
        correct_answer: "妹妹 (mèimei)",
        explanation: "姐姐 = hermana mayor, 妹妹 = hermana menor. Las dos llevan el radical 女 (mujer) a la izquierda.",
        hanzi: "妹妹",
        pinyin: "mèimei"
      },
      {
        id: 10,
        question: "¿Qué significa 女儿 (nǚ'ér)?",
        options: [
          "Hija",
          "Hijo",
          "Mamá",
          "Novia"
        ],
        correct_answer: "Hija",
        explanation: "儿子 (érzi) = hijo, 女儿 (nǚ'ér) = hija. El 女 adelante marca que es mujer.",
        hanzi: "女儿",
        pinyin: "nǚ'ér"
      },
      {
        id: 11,
        question: "¿Quién es 爷爷 (yéye)?",
        options: [
          "El abuelo paterno",
          "El papá",
          "El tío",
          "El hermano mayor"
        ],
        correct_answer: "El abuelo paterno",
        explanation: "爷爷 (yéye) = abuelo paterno, 奶奶 (nǎinai) = abuela paterna.",
        hanzi: "爷爷",
        pinyin: "yéye"
      },
      {
        id: 12,
        question: "¿Cuáles son las dos formas de decir «esposo» que vimos?",
        options: [
          "丈夫 y 老公",
          "妻子 y 老婆",
          "爸爸 y 儿子",
          "男朋友 y 哥哥"
        ],
        correct_answer: "丈夫 y 老公",
        explanation: "丈夫 (zhàngfu) y 老公 (lǎogōng) = esposo. Para esposa: 妻子 (qīzi) y 老婆 (lǎopo).",
        hanzi: "老公",
        pinyin: "lǎogōng"
      },
      {
        id: 13,
        question: "¿Qué significa 男朋友 (nánpéngyou)?",
        options: [
          "Novio",
          "Amigo",
          "Esposo",
          "Hijo"
        ],
        correct_answer: "Novio",
        explanation: "男 (hombre) + 朋友 (amigo) = novio. Con 女 adelante: 女朋友, novia.",
        hanzi: "男朋友",
        pinyin: "nánpéngyou"
      },
      {
        id: 14,
        question: "¿Qué significa 欢迎你 (huānyíng nǐ)?",
        options: [
          "Bienvenido / Bienvenida",
          "Hola",
          "Gracias",
          "Adiós"
        ],
        correct_answer: "Bienvenido / Bienvenida",
        explanation: "欢迎 (huānyíng) = dar la bienvenida, + 你 = a vos. Sirve igual para hombre o mujer.",
        hanzi: "欢迎你",
        pinyin: "huānyíng nǐ"
      },
      {
        id: 15,
        question: "¿Qué significa 阿姨 (āyí)?",
        options: [
          "Tía",
          "Abuela",
          "Mamá",
          "Hermana mayor"
        ],
        correct_answer: "Tía",
        explanation: "阿姨 (āyí) = tía y 叔叔 (shūshu) = tío, como aparecen en la guía del HSK 1.",
        hanzi: "阿姨",
        pinyin: "āyí"
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
    summary: "Los pronombres personales, el sufijo 们 (también con 它: 它们) y aplicado a sustantivos de personas (老师们, 同学们, 学生们), y las 4 reglas de orden de trazos.",
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
            pronunciation: "ta (1er tono) · plural 它们",
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
          },
          {
            pinyin: "tāmen",
            hanzi: "它们",
            type: "它 + 们",
            pronunciation: "ta-men",
            meaning: "Ellos / Ellas (animales o cosas)"
          }
        ]
      },
      {
        title: "3. ⚠️ Corrección: 它们 SÍ existe",
        description: "Acá decía que a 它 no se le agrega 们. Es incorrecto: 它们 es el plural para animales y cosas (lo confirmó la slide de la clase 5).",
        items: [
          {
            pinyin: "tā → tāmen",
            hanzi: "它 → 它们",
            type: "Plural de cosas / animales",
            pronunciation: "他们 / 她们 / 它们 suenan igual (tāmen)",
            meaning: "Ellos / Ellas (animales o cosas)"
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
      "它 también se pluraliza: 它们 (tāmen) = ellos/ellas para animales o cosas. (Corregido: antes figuraba como que no existía.)",
      "他 / 她 / 它 se pronuncian los tres tā. La diferencia es SOLO escrita: 亻(persona), 女 (mujer), 宀 (cosa).",
      "们 va siempre DESPUÉS de la palabra: 老师们, nunca 们老师.",
      "她们 se usa cuando el grupo es solo de mujeres. Si hay al menos un hombre, se usa 他们.",
      "Orden de trazos: arriba→abajo, izquierda→derecha, horizontal antes que vertical, 撇 antes que 捺."
    ]
  },
  {
    id: "mat-clase-04",
    lesson_number: 4,
    title: "Clase 4: Los Números (0–99) y el saludo 你好吗？",
    summary: "Los once caracteres base (零 一 二 三 四 五 六 七 八 九 十) con la pronunciación aproximada dada en clase y la regla de composición (十 adelante suma, atrás multiplica), más el diálogo 你好吗？ del libro y el ejercicio de sustituir el pronombre.",
    sections: [
      {
        title: "1. Números 0–10",
        description: "La base de todo el sistema. Entre paréntesis, la aproximación fonética que se dio en clase.",
        items: [
          {
            pinyin: "líng",
            hanzi: "零",
            type: "0",
            pronunciation: "«ling» (2do tono)",
            meaning: "Cero"
          },
          {
            pinyin: "yī",
            hanzi: "一",
            type: "1",
            pronunciation: "«ii» — i larga (1er tono)",
            meaning: "Uno"
          },
          {
            pinyin: "èr",
            hanzi: "二",
            type: "2",
            pronunciation: "«ar» — la r va enroscada, no la r española (4to tono)",
            meaning: "Dos"
          },
          {
            pinyin: "sān",
            hanzi: "三",
            type: "3",
            pronunciation: "«san» (1er tono)",
            meaning: "Tres"
          },
          {
            pinyin: "sì",
            hanzi: "四",
            type: "4",
            pronunciation: "«ss» / «se» con la s suave (4to tono)",
            meaning: "Cuatro"
          },
          {
            pinyin: "wǔ",
            hanzi: "五",
            type: "5",
            pronunciation: "«uu» (3er tono)",
            meaning: "Cinco"
          },
          {
            pinyin: "liù",
            hanzi: "六",
            type: "6",
            pronunciation: "«lio» (4to tono)",
            meaning: "Seis"
          },
          {
            pinyin: "qī",
            hanzi: "七",
            type: "7",
            pronunciation: "«chi» (1er tono)",
            meaning: "Siete"
          },
          {
            pinyin: "bā",
            hanzi: "八",
            type: "8",
            pronunciation: "«baa» (1er tono)",
            meaning: "Ocho"
          },
          {
            pinyin: "jiǔ",
            hanzi: "九",
            type: "9",
            pronunciation: "«yioo» — la j no es jota (3er tono)",
            meaning: "Nueve"
          },
          {
            pinyin: "shí",
            hanzi: "十",
            type: "10",
            pronunciation: "«shi» (2do tono)",
            meaning: "Diez"
          }
        ]
      },
      {
        title: "2. Del 11 al 19 — 十 + unidad",
        description: "El 十 va adelante y la unidad atrás. No se agrega 一 delante del 十.",
        items: [
          {
            pinyin: "shíyī",
            hanzi: "十一",
            type: "10 + 1",
            pronunciation: "shi-ii",
            meaning: "Once"
          },
          {
            pinyin: "shí'èr",
            hanzi: "十二",
            type: "10 + 2",
            pronunciation: "shi-ar",
            meaning: "Doce"
          },
          {
            pinyin: "shíwǔ",
            hanzi: "十五",
            type: "10 + 5",
            pronunciation: "shi-uu",
            meaning: "Quince"
          },
          {
            pinyin: "shíqī",
            hanzi: "十七",
            type: "10 + 7",
            pronunciation: "shi-chi",
            meaning: "Diecisiete"
          },
          {
            pinyin: "shíbā",
            hanzi: "十八",
            type: "10 + 8",
            pronunciation: "shi-baa",
            meaning: "Dieciocho"
          },
          {
            pinyin: "shíjiǔ",
            hanzi: "十九",
            type: "10 + 9",
            pronunciation: "shi-yioo",
            meaning: "Diecinueve"
          }
        ]
      },
      {
        title: "3. Las decenas — unidad + 十",
        description: "Acá el 十 va atrás y multiplica: 五十 = 5 × 10.",
        items: [
          {
            pinyin: "èrshí",
            hanzi: "二十",
            type: "2 × 10",
            pronunciation: "ar-shi",
            meaning: "Veinte"
          },
          {
            pinyin: "sānshí",
            hanzi: "三十",
            type: "3 × 10",
            pronunciation: "san-shi",
            meaning: "Treinta"
          },
          {
            pinyin: "sìshí",
            hanzi: "四十",
            type: "4 × 10",
            pronunciation: "ss-shi",
            meaning: "Cuarenta"
          },
          {
            pinyin: "wǔshí",
            hanzi: "五十",
            type: "5 × 10",
            pronunciation: "uu-shi",
            meaning: "Cincuenta"
          },
          {
            pinyin: "liùshí",
            hanzi: "六十",
            type: "6 × 10",
            pronunciation: "lio-shi",
            meaning: "Sesenta"
          },
          {
            pinyin: "qīshí",
            hanzi: "七十",
            type: "7 × 10",
            pronunciation: "chi-shi",
            meaning: "Setenta"
          },
          {
            pinyin: "bāshí",
            hanzi: "八十",
            type: "8 × 10",
            pronunciation: "baa-shi",
            meaning: "Ochenta"
          },
          {
            pinyin: "jiǔshí",
            hanzi: "九十",
            type: "9 × 10",
            pronunciation: "yioo-shi",
            meaning: "Noventa"
          }
        ]
      },
      {
        title: "4. De 21 a 99 — decena + 十 + unidad",
        description: "Una sola fórmula cubre todo el tramo: se lee igual que la cuenta aritmética.",
        items: [
          {
            pinyin: "èr shí yī",
            hanzi: "二十一",
            type: "2 × 10 + 1",
            pronunciation: "ar-shi-ii",
            meaning: "Veintiuno"
          },
          {
            pinyin: "sānshíwǔ",
            hanzi: "三十五",
            type: "3 × 10 + 5",
            pronunciation: "san-shi-uu",
            meaning: "Treinta y cinco"
          },
          {
            pinyin: "sìshíbā",
            hanzi: "四十八",
            type: "4 × 10 + 8",
            pronunciation: "ss-shi-baa",
            meaning: "Cuarenta y ocho"
          },
          {
            pinyin: "liùshíqī",
            hanzi: "六十七",
            type: "6 × 10 + 7",
            pronunciation: "lio-shi-chi",
            meaning: "Sesenta y siete"
          },
          {
            pinyin: "jiǔshíjiǔ",
            hanzi: "九十九",
            type: "9 × 10 + 9",
            pronunciation: "yioo-shi-yioo",
            meaning: "Noventa y nueve — el tope que se arma solo con 十"
          }
        ]
      },
      {
        title: "5. Trazos de los números",
        description: "Son los caracteres más simples del idioma y repiten las reglas de orden de la clase 3.",
        items: [
          {
            pinyin: "yī",
            hanzi: "一",
            type: "1 trazo",
            pronunciation: "Un solo 横 (horizontal), de izquierda a derecha",
            meaning: "Uno — el trazo básico de todo el sistema"
          },
          {
            pinyin: "èr",
            hanzi: "二",
            type: "2 trazos",
            pronunciation: "Dos horizontales: primero el de arriba (从上到下)",
            meaning: "Dos"
          },
          {
            pinyin: "sān",
            hanzi: "三",
            type: "3 trazos",
            pronunciation: "Tres horizontales, siempre de arriba hacia abajo",
            meaning: "Tres"
          },
          {
            pinyin: "shí",
            hanzi: "十",
            type: "2 trazos",
            pronunciation: "先横后竖: primero el horizontal, después el vertical",
            meaning: "Diez — el ejemplo de la regla 3 de la clase pasada"
          },
          {
            pinyin: "bā",
            hanzi: "八",
            type: "2 trazos",
            pronunciation: "先撇后捺: primero la diagonal izquierda, después la derecha",
            meaning: "Ocho — el ejemplo de la regla 4"
          },
          {
            pinyin: "sì",
            hanzi: "四",
            type: "5 trazos",
            pronunciation: "Caja 囗: vertical izquierdo, horizontal+vertical derecho, el interior, y el cierre de abajo AL FINAL",
            meaning: "Cuatro — la caja se cierra último"
          }
        ]
      },
      {
        title: "6. El diálogo del libro — 你好吗？",
        description: "力波 (Lì Bō) saluda a 林娜 (Lín Nà). Tres líneas que se usan enteras.",
        items: [
          {
            pinyin: "Lín Nà, nǐ hǎo ma?",
            hanzi: "林娜，你好吗？",
            type: "力波",
            pronunciation: "lin na, ni hao ma",
            meaning: "Lín Nà, ¿cómo estás?"
          },
          {
            pinyin: "Wǒ hěn hǎo, nǐ ne?",
            hanzi: "我很好，你呢？",
            type: "林娜",
            pronunciation: "uo hen hao, ni ne",
            meaning: "Estoy muy bien, ¿y vos?"
          },
          {
            pinyin: "Yě hěn hǎo.",
            hanzi: "也很好。",
            type: "力波",
            pronunciation: "ie hen hao",
            meaning: "(Yo) también estoy muy bien"
          }
        ]
      },
      {
        title: "7. Palabras nuevas del diálogo",
        description: "Cuatro piezas que arman preguntas y respuestas sin tocar el orden de la oración.",
        items: [
          {
            pinyin: "ma",
            hanzi: "吗",
            type: "Partícula de pregunta",
            pronunciation: "ma (tono neutro, al final de la oración)",
            meaning: "Convierte una afirmación en pregunta de sí/no: 你好 → 你好吗？"
          },
          {
            pinyin: "ne",
            hanzi: "呢",
            type: "Partícula",
            pronunciation: "ne (tono neutro, al final)",
            meaning: "Devuelve la pregunta sin repetirla: 你呢？= ¿y vos?"
          },
          {
            pinyin: "hěn",
            hanzi: "很",
            type: "Adverbio",
            pronunciation: "hen (3er tono)",
            meaning: "Muy — acompaña al adjetivo: 我很好"
          },
          {
            pinyin: "yě",
            hanzi: "也",
            type: "Adverbio",
            pronunciation: "ie (3er tono)",
            meaning: "También — va ANTES del adjetivo o verbo: 我也很好"
          }
        ]
      },
      {
        title: "8. Sustitución de pronombres",
        description: "El ejercicio de la clase: cambiar el pronombre y dejar el resto igual.",
        items: [
          {
            pinyin: "nǐ hǎo ma → tā hǎo ma",
            hanzi: "你好吗？→ 他好吗？",
            type: "Singular",
            pronunciation: "ni hao ma → ta hao ma",
            meaning: "¿Cómo estás? → ¿Cómo está él?"
          },
          {
            pinyin: "nǐ hǎo ma → nǐmen hǎo ma",
            hanzi: "你好吗？→ 你们好吗？",
            type: "Plural con 们",
            pronunciation: "ni hao ma → ni-men hao ma",
            meaning: "¿Cómo estás? → ¿Cómo están ustedes?"
          },
          {
            pinyin: "wǒ hěn hǎo → wǒmen hěn hǎo",
            hanzi: "我很好。→ 我们很好。",
            type: "Plural con 们",
            pronunciation: "uo hen hao → uo-men hen hao",
            meaning: "Estoy muy bien → Estamos muy bien"
          },
          {
            pinyin: "nǐ ne → tāmen ne",
            hanzi: "你呢？→ 他们呢？",
            type: "Plural con 们",
            pronunciation: "ni ne → ta-men ne",
            meaning: "¿Y vos? → ¿Y ellos?"
          },
          {
            pinyin: "tāmen hǎo ma",
            hanzi: "它们好吗？",
            type: "Plural de cosas / animales",
            pronunciation: "ta-men hao ma",
            meaning: "¿Cómo están (los animales)? — 它 también lleva 们"
          }
        ]
      },
      {
        title: "9. La negación con 不",
        description: "不 (bù) va delante del adjetivo o el verbo — y se lleva puesto el 很.",
        items: [
          {
            pinyin: "Wǒ bù hǎo.",
            hanzi: "我不好。",
            type: "Negación",
            pronunciation: "uo bu hao",
            meaning: "No estoy bien"
          },
          {
            pinyin: "wǒ hěn hǎo → wǒ bù hǎo",
            hanzi: "我很好。→ 我不好。",
            type: "⚠️ El 很 se cae",
            pronunciation: "我不很好 NO se dice",
            meaning: "Al negar, 不 ocupa el lugar de 很"
          },
          {
            pinyin: "Tā bù hǎo.",
            hanzi: "他不好。",
            type: "Otro sujeto",
            pronunciation: "ta bu hao",
            meaning: "Él no está bien"
          },
          {
            pinyin: "Wǒmen bù hǎo.",
            hanzi: "我们不好。",
            type: "Plural",
            pronunciation: "uo-men bu hao",
            meaning: "No estamos bien — 不 va después del 们"
          },
          {
            pinyin: "Nǐ hǎo ma? → Wǒ bù hǎo.",
            hanzi: "你好吗？→ 我不好。",
            type: "Respuesta al diálogo",
            pronunciation: "el 吗 no vuelve en la respuesta",
            meaning: "¿Cómo estás? → No estoy bien"
          }
        ]
      }
    ],
    grammar_tips: [
      "La fórmula es aritmética pura: 二十一 = 2 × 10 + 1 = 21. Decena + 十 + unidad, sin excepciones hasta el 99.",
      "⚠️ El orden cambia el número: 十五 = 15 (10 + 5) pero 五十 = 50 (5 × 10). El 十 adelante SUMA, atrás MULTIPLICA.",
      "El 10 es 十 solo. Nunca 一十, aunque sea una decena.",
      "⚠️ 四 (sì, 4) vs 十 (shí, 10) es la confusión clásica: 四 va con s suave, 十 con sh.",
      "九 (jiǔ) no lleva jota española — la j del pīnyīn es suave, «yioo». Es la misma j de 叫 (jiào) de la clase 2.",
      "二 (èr, 2) es el único número con esa r enroscada: «ar», nada que ver con la r española.",
      "吗 al final convierte una afirmación en pregunta de sí/no: 你好 → 你好吗？ El orden no se toca.",
      "呢 rebota la pregunta sin repetirla: 我很好，你呢？ = «estoy muy bien, ¿y vos?».",
      "很 acompaña al adjetivo: se dice 我很好, no 我好 pelado.",
      "也 (también) va después del sujeto y antes del adjetivo: 我也很好. Nunca 也我很好 ni 我很好也.",
      "⚠️ La clave del ejercicio de sustitución: en chino el verbo NO se conjuga. Cambiás el pronombre y 好吗？/ 很好 / 呢？ quedan igual.",
      "不 (bù) niega: va entre el sujeto y el adjetivo — 我不好 = no estoy bien.",
      "⚠️ Al negar, el 很 se cae: 我很好 → 我不好. 我不很好 no se dice.",
      "El 吗 no vuelve en la respuesta: 你好吗？ se contesta 我很好 o 我不好, sin 吗.",
      "Dato de pronunciación (no salió en clase): 不 es 4to tono (bù), pero delante de otro 4to tono se dice bú — 不是 bú shì."
    ],
    resources: [
      {
        label: "数字歌 — Number Song (Little Fox)",
        url: "https://www.youtube.com/watch?v=NcLNmRgCpAE",
        note: "Canción de los números para fijar 一 … 十 de oído."
      }
    ]
  },
  {
    id: "mat-clase-05",
    lesson_number: 5,
    title: "Clase 5: Pronombres con 您 y 它们, ¿de qué país sos?, orden S+V+O y la familia",
    summary: "Repaso de pronombres con el formal 您 y el plural 它们, la pregunta 你是哪国人？, el orden sujeto + verbo + objeto (我吃苹果), los miembros de la familia del HSK 1 y saludos útiles.",
    sections: [
      {
        title: "1. Pronombres — Singular",
        description: "您 es el 你 de respeto. 他 / 她 / 它 suenan igual (tā).",
        items: [
          { pinyin: "wǒ", hanzi: "我", type: "Yo", pronunciation: "uo (3er tono)", meaning: "Yo" },
          { pinyin: "nǐ", hanzi: "你", type: "Tú (informal)", pronunciation: "ni (3er tono)", meaning: "Tú / Vos" },
          { pinyin: "nín", hanzi: "您", type: "Usted (formal)", pronunciation: "nin (2do tono) · 你 + 心 debajo", meaning: "Usted" },
          { pinyin: "tā", hanzi: "他", type: "Él", pronunciation: "ta (1er tono)", meaning: "Él" },
          { pinyin: "tā", hanzi: "她", type: "Ella", pronunciation: "ta (1er tono)", meaning: "Ella" },
          { pinyin: "tā", hanzi: "它", type: "Eso (objetos o animales)", pronunciation: "ta (1er tono)", meaning: "Eso / Ello" }
        ]
      },
      {
        title: "2. Pronombres — Plural con 们 (men)",
        description: "们 va después del pronombre. Con 它 también: 它们.",
        items: [
          { pinyin: "wǒmen", hanzi: "我们", type: "我 + 们", pronunciation: "uo-men", meaning: "Nosotros" },
          { pinyin: "nǐmen", hanzi: "你们", type: "你 + 们", pronunciation: "ni-men", meaning: "Ustedes" },
          { pinyin: "tāmen", hanzi: "他们", type: "他 + 们", pronunciation: "ta-men", meaning: "Ellos" },
          { pinyin: "tāmen", hanzi: "她们", type: "她 + 们", pronunciation: "ta-men", meaning: "Ellas" },
          { pinyin: "tāmen", hanzi: "它们", type: "它 + 们", pronunciation: "ta-men", meaning: "Ellos / Ellas (para cosas o animales)" }
        ]
      },
      {
        title: "3. ¿De qué país sos? — 哪国人",
        description: "Las oraciones de la slide: el verbo 是 (ser) une al sujeto con lo que es.",
        items: [
          { pinyin: "Nǐ shì nǎ guó rén?", hanzi: "你是哪国人？", type: "Pregunta", pronunciation: "ni shi na guo ren", meaning: "¿De qué país sos?" },
          { pinyin: "Tā shì nǎ guó rén?", hanzi: "他是哪国人？", type: "Pregunta", pronunciation: "ta shi na guo ren", meaning: "¿De qué país es él?" },
          { pinyin: "Tā shì Zhōngguó rén.", hanzi: "他是中国人。", type: "Respuesta", pronunciation: "ta shi chong-guo ren", meaning: "Él es chino" },
          { pinyin: "Tā shì wǒ māma.", hanzi: "她是我妈妈。", type: "Presentar a alguien", pronunciation: "ta shi uo ma-ma", meaning: "Ella es mi mamá" },
          { pinyin: "nǎ + guó + rén", hanzi: "哪 + 国 + 人", type: "Desarmado", pronunciation: "cuál + país + persona", meaning: "Persona de qué país" }
        ]
      },
      {
        title: "4. Orden de la oración — Sujeto + Verbo + Objeto",
        description: "Igual que en castellano, y el verbo no se conjuga.",
        items: [
          { pinyin: "Wǒ chī píngguǒ.", hanzi: "我吃苹果。", type: "Ejemplo", pronunciation: "uo chi ping-guo", meaning: "Yo como manzana" },
          { pinyin: "wǒ", hanzi: "我", type: "Sujeto", pronunciation: "uo", meaning: "Yo" },
          { pinyin: "chī", hanzi: "吃", type: "Verbo", pronunciation: "chi (1er tono)", meaning: "Comer" },
          { pinyin: "píngguǒ", hanzi: "苹果", type: "Objeto", pronunciation: "ping-guo (2do + 3er tono)", meaning: "Manzana" }
        ]
      },
      {
        title: "5. La familia — Padres e hijos",
        description: "Guía útil HSK 1.",
        items: [
          { pinyin: "bàba", hanzi: "爸爸", type: "Familia", pronunciation: "ba-ba (4to + neutro)", meaning: "Padre / Papá" },
          { pinyin: "māma", hanzi: "妈妈", type: "Familia", pronunciation: "ma-ma (1er + neutro)", meaning: "Madre / Mamá" },
          { pinyin: "érzi", hanzi: "儿子", type: "Familia", pronunciation: "ar-ds (2do + neutro)", meaning: "Hijo" },
          { pinyin: "nǚ'ér", hanzi: "女儿", type: "Familia", pronunciation: "nü-ar (3er + 2do)", meaning: "Hija" }
        ]
      },
      {
        title: "6. La familia — Hermanos",
        description: "Se nombran por edad: mayor o menor que vos.",
        items: [
          { pinyin: "gēge", hanzi: "哥哥", type: "Mayor", pronunciation: "gue-gue", meaning: "Hermano mayor" },
          { pinyin: "dìdi", hanzi: "弟弟", type: "Menor", pronunciation: "di-di", meaning: "Hermano menor" },
          { pinyin: "jiějie", hanzi: "姐姐", type: "Mayor", pronunciation: "llie-llie", meaning: "Hermana mayor" },
          { pinyin: "mèimei", hanzi: "妹妹", type: "Menor", pronunciation: "mei-mei", meaning: "Hermana menor" }
        ]
      },
      {
        title: "7. La familia — Abuelos y tíos",
        items: [
          { pinyin: "yéye", hanzi: "爷爷", type: "Familia", pronunciation: "ie-ie", meaning: "Abuelo paterno" },
          { pinyin: "nǎinai", hanzi: "奶奶", type: "Familia", pronunciation: "nai-nai", meaning: "Abuela paterna" },
          { pinyin: "shūshu", hanzi: "叔叔", type: "Familia", pronunciation: "shu-shu", meaning: "Tío" },
          { pinyin: "āyí", hanzi: "阿姨", type: "Familia", pronunciation: "a-i", meaning: "Tía" }
        ]
      },
      {
        title: "8. Pareja",
        description: "Esposo y esposa tienen dos formas cada uno.",
        items: [
          { pinyin: "zhàngfu", hanzi: "丈夫", type: "Esposo", pronunciation: "chang-fu", meaning: "Esposo" },
          { pinyin: "lǎogōng", hanzi: "老公", type: "Esposo", pronunciation: "lao-gung", meaning: "Esposo" },
          { pinyin: "qīzi", hanzi: "妻子", type: "Esposa", pronunciation: "chi-ds", meaning: "Esposa" },
          { pinyin: "lǎopo", hanzi: "老婆", type: "Esposa", pronunciation: "lao-po", meaning: "Esposa" },
          { pinyin: "nánpéngyou", hanzi: "男朋友", type: "Pareja", pronunciation: "nan-pong-iou", meaning: "Novio" },
          { pinyin: "nǚpéngyou", hanzi: "女朋友", type: "Pareja", pronunciation: "nü-pong-iou", meaning: "Novia" }
        ]
      },
      {
        title: "9. Saludos útiles",
        items: [
          { pinyin: "nǐ hǎo", hanzi: "你好", type: "Saludo", pronunciation: "ni hao", meaning: "Hola" },
          { pinyin: "huānyíng nǐ", hanzi: "欢迎你", type: "Saludo", pronunciation: "juan-ing ni", meaning: "Bienvenido / Bienvenida" },
          { pinyin: "zàijiàn", hanzi: "再见", type: "Despedida", pronunciation: "dsai-llien", meaning: "Adiós / Hasta luego" },
          { pinyin: "xièxie", hanzi: "谢谢", type: "Cortesía", pronunciation: "shie-shie", meaning: "Gracias" }
        ]
      }
    ],
    grammar_tips: [
      "您 (nín) es el «usted»: se usa con profesores y personas mayores. Es 你 con 心 (corazón) abajo.",
      "他们 / 她们 / 它们 suenan igual (tāmen). 它们 es el plural para animales y cosas.",
      "是 (shì) = ser. Une dos cosas y no se conjuga: 我是, 他是, 我们是.",
      "La palabra de pregunta va donde iría la respuesta: 你是哪国人？ → 他是中国人。",
      "Con la familia cercana, el pronombre va pegado: 我妈妈 = mi mamá, 我哥哥 = mi hermano mayor.",
      "Orden fijo: sujeto + verbo + objeto (我吃苹果). Si cambiás el orden, cambia el significado: 苹果吃我 = la manzana me come.",
      "Los hermanos se nombran por edad: 哥哥 / 弟弟 (varones), 姐姐 / 妹妹 (mujeres). Los que llevan 女 a la izquierda son mujeres.",
      "En los familiares con caracter repetido (爸爸, 妈妈, 哥哥…) la segunda sílaba va en tono neutro."
    ]
  }
];
