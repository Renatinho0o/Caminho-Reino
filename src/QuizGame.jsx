import React, { useState, useEffect } from 'react';
import './QuizGame.css';
import { useGamePersistence } from './hooks/useGamePersistence';
import { useAuth } from './contexts/AuthContext';

// Dados da lição: Jesus se fez carne por amor
const lessonData = {
  title: "Caminho do Reino",
  theme: "Jornada espiritual através da Bíblia",
  chapters: [
    {
      id: 1,
      title: "A Encarnação",
      description: "Jesus deixa a glória celestial e se torna humano",
      icon: "👶",
      unlocked: true,
      questions: [
        {
          question: "Segundo João 1:14, o Verbo se fez carne e habitou entre nós. O que significa 'habitou entre nós'?",
          answers: [
            { text: "Jesus morou em uma tenda", color: "red", shape: "triangle", isCorrect: false },
            { text: "Jesus morou entre as pessoas, como um de nós", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Jesus construiu uma casa em Belém", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Jesus morou no templo", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em Filipenses 2:5-8, Paulo diz que Jesus se esvaziou. O que Jesus abriu mão ao se encarnar?",
          answers: [
            { text: "Sua divindade", color: "red", shape: "triangle", isCorrect: false },
            { text: "Sua glória celestial e status de igualdade com Deus", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Seu conhecimento divino", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Sua onisciência", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Por que Jesus escolheu nascer de uma virgem em Belém?",
          answers: [
            { text: "Para cumprir profecias e mostrar humilhação", color: "red", shape: "triangle", isCorrect: true },
            { text: "Porque não havia outro lugar disponível", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Para impressionar os reis magos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Porque Maria preferiu Belém", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Estrela de Belém",
        description: "A estrela que guiou os magos ao Salvador",
        icon: "⭐"
      }
    },
    {
      id: 2,
      title: "A Cruz Intencional",
      description: "Jesus escolhe ir à cruz por amor a nós",
      icon: "✝️",
      unlocked: true,
      questions: [
        {
          question: "O que Jesus quis dizer quando afirmou em João 10:17-18 que ninguém tira Sua vida voluntariamente?",
          answers: [
            { text: "Que foi um acidente", color: "red", shape: "triangle", isCorrect: false },
            { text: "Que Ele escolheu livremente entregar Sua vida por nós", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Que foi imposta pelos líderes religiosos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que foi uma derrota para o reino de Deus", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em Mateus 16:21, Jesus prediz Sua morte e ressurreição. Por que Jesus precisava sofrer?",
          answers: [
            { text: "Como punição por nossos pecados e para nos redimir", color: "red", shape: "triangle", isCorrect: true },
            { text: "Para ser igual aos profetas do Antigo Testamento", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Para demonstrar poder sobre Seus inimigos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Para cumprir a lei de Moisés", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo Hebreus 9:26, qual era o propósito final do sacrifício de Jesus na cruz?",
          answers: [
            { text: "Trazer condenação sobre o povo judeu", color: "red", shape: "triangle", isCorrect: false },
            { text: "Eliminar o pecado do mundo de uma vez por todas", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Estabelecer um governo político", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Restaurar apenas o povo de Israel", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Cruz de Luz",
        description: "Símbolo do amor sacrificial de Cristo",
        icon: "🕊️"
      }
    },
    {
      id: 3,
      title: "O Amor Sacrificial",
      description: "O amor de Deus se manifesta plenamente na cruz",
      icon: "❤️",
      unlocked: true,
      questions: [
        {
          question: "O que Romanos 5:8 nos ensina ao dizer que Cristo morreu por nós enquanto éramos ainda pecadores?",
          answers: [
            { text: "Que Deus nos ama incondicionalmente, não por mérito", color: "red", shape: "triangle", isCorrect: true },
            { text: "Que Deus só ama pessoas boas e virtuosas", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Que éramos dignos do amor de Deus", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que o pecado nos impede de ser amados", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em 1 Tessalonicenses 5:9-10, Paulo diz que Jesus morreu para que vivamos com Ele. O que isso significa?",
          answers: [
            { text: "Que devemos viver com medo do julgamento", color: "red", shape: "triangle", isCorrect: false },
            { text: "Que através da morte de Jesus temos comunhão eterna com Deus", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Que viveremos em abundância material", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que devemos viver escondidos do mundo", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "De acordo com Efésios 2:4-7, qual é o resultado do amor sacrificial de Deus manifestado na cruz?",
          answers: [
            { text: "Sofrimento contínuo e sofrimento eterno", color: "red", shape: "triangle", isCorrect: false },
            { text: "Ressurreição espiritual conosco e vida nos lugares celestiais", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Punição eterna sem redenção", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Esquecimento de nossos pecados passados", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Coração Divino",
        description: "O amor eterno de Deus por nós",
        icon: "💖"
      }
    },
    // Capítulos bloqueados (placeholders)
    {
      id: 4,
      title: "O Mistério do Novo Nascimento",
      description: "Jesus Pode Nos Transformar",
      icon: "🔥",
      unlocked: true,
      questions: [
        {
          question: "Nicodemos era descrito como 'mestre em Israel', porém demonstrou desconhecimento sobre o Novo Nascimento. Segundo a lição, qual verdade teológica é enfatizada por essa reação de Nicodemos?",
          answers: [
            { text: "O conhecimento da Lei é suficiente para alcançar a salvação", color: "red", shape: "triangle", isCorrect: false },
            { text: "A tradição religiosa substitui a experiência espiritual", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A religiosidade sem regeneração não conduz ao Reino de Deus", color: "yellow", shape: "circle", isCorrect: true },
            { text: "O Reino de Deus pertence apenas aos judeus instruídos", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Ao relacionar João 3 com Efésios 2.1, a lição ensina que o Novo Nascimento é necessário porque:",
          answers: [
            { text: "O homem perdeu apenas parte de sua comunhão com Deus", color: "red", shape: "triangle", isCorrect: false },
            { text: "A humanidade estava espiritualmente morta em ofensas e pecados", color: "blue", shape: "diamond", isCorrect: true },
            { text: "O pecado afeta somente aqueles que rejeitam explicitamente a Lei", color: "yellow", shape: "circle", isCorrect: false },
            { text: "O homem possui capacidade própria de restaurar sua natureza caída", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Comparando Nicodemos e o jovem rico, qual contraste a lição destaca?",
          answers: [
            { text: "Nicodemos rejeitou a eternidade, enquanto o homem rico rejeitou os milagres", color: "red", shape: "triangle", isCorrect: false },
            { text: "Nicodemos confiava em riquezas, enquanto o homem rico confiava na Lei", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Nicodemos possuía conhecimento sem compreensão espiritual, enquanto o homem rico possuía interesse sem renúncia verdadeira", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Nicodemos não cria em Deus, enquanto o homem rico não obedecia aos mandamentos", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a lição, por que o amor descrito em 1 Coríntios 13 está diretamente ligado à evidência do Novo Nascimento?",
          answers: [
            { text: "Porque o amor é um dom reservado apenas aos líderes espirituais", color: "red", shape: "triangle", isCorrect: false },
            { text: "Porque o amor substitui a necessidade da santificação", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Porque o verdadeiro amor demonstra externamente a transformação operada por Cristo", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Porque a salvação é alcançada através de obras de caridade", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A afirmação 'a obra de Cristo foi consumada no Calvário' está ligada a qual conclusão central da lição?",
          answers: [
            { text: "O homem pode alcançar a salvação por mérito próprio após o sacrifício de Cristo", color: "red", shape: "triangle", isCorrect: false },
            { text: "A decisão humana determina se a graça recebida será aceita ou rejeitada", color: "blue", shape: "diamond", isCorrect: true },
            { text: "O Novo Nascimento depende exclusivamente de tradições religiosas", color: "yellow", shape: "circle", isCorrect: false },
            { text: "A vida eterna é herdada automaticamente pelos filhos de cristãos", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Chama da Regeneração",
        description: "O fogo espiritual que simboliza a nova vida concedida pelo Espírito Santo",
        icon: "🔥"
      }
    },
    {
      id: 5,
      title: "A Autoridade do Rei Sobre as Trevas",
      description: "Jesus tem poder sobre os demônios",
      icon: "👑",
      unlocked: true,
      questions: [
        {
          question: "Segundo a lição, qual evento bíblico é apresentado como a primeira evidência da atuação satânica contra o propósito divino para a humanidade?",
          answers: [
            { text: "A corrupção da humanidade nos dias de Noé", color: "red", shape: "triangle", isCorrect: false },
            { text: "A rebelião de Corá contra Moisés", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A tentação no deserto contra Jesus", color: "yellow", shape: "circle", isCorrect: false },
            { text: "A indução de Adão e Eva ao pecado no Éden", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "Ao relacionar Gênesis 3.15 com a missão de Cristo, a lição ensina que:",
          answers: [
            { text: "Satanás recebeu domínio eterno sobre a Terra", color: "red", shape: "triangle", isCorrect: false },
            { text: "A vitória de Cristo sobre o império das trevas já havia sido anunciada desde o Éden", color: "blue", shape: "diamond", isCorrect: true },
            { text: "O homem seria capaz de vencer o Diabo sem intervenção divina", color: "yellow", shape: "circle", isCorrect: false },
            { text: "A derrota de Satanás ocorreu definitivamente nos dias de Jó", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Qual alternativa expressa corretamente a relação entre a vinda de Jesus e a intensificação da atuação maligna no Novo Testamento?",
          answers: [
            { text: "A presença de Jesus eliminou completamente a atuação demoníaca durante Seu ministério", color: "red", shape: "triangle", isCorrect: false },
            { text: "O Novo Testamento ignora a atuação espiritual do Maligno", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A manifestação de Cristo revelou e confrontou diretamente o reino das trevas", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Satanás recebeu atributos divinos temporários para enfrentar Jesus", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a lição, qual característica diferencia Satanás do Deus Todo-Poderoso?",
          answers: [
            { text: "Satanás desconhece totalmente a humanidade", color: "red", shape: "triangle", isCorrect: false },
            { text: "Satanás possui autoridade absoluta sobre os demônios e os céus", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Satanás atua apenas no Inferno e não na Terra", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Satanás é um ser limitado, sem onisciência, onipotência e onipresença", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "No episódio do endemoninhado de Cafarnaum em Lucas 4.31-36, qual verdade teológica é enfatizada pela lição?",
          answers: [
            { text: "Os demônios podem resistir à autoridade de Cristo quando encontram fé fraca", color: "red", shape: "triangle", isCorrect: false },
            { text: "A libertação espiritual depende exclusivamente do conhecimento humano", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A simples presença e palavra de Jesus são suficientes para subjugar o poder maligno", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A possessão demoníaca ocorre apenas por influência hereditária", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Coroa da Libertação",
        description: "Símbolo da vitória absoluta de Cristo sobre o reino das trevas",
        icon: "👑"
      }
    },
    {
      id: 6,
      title: "O Médico dos Impossíveis",
      description: "Jesus tem poder sobre as doenças",
      icon: "💊",
      unlocked: true,
      questions: [
        {
          question: "Segundo a lição, qual relação teológica é estabelecida entre Romanos 5.12 e a origem das enfermidades?",
          answers: [
            { text: "As doenças surgiram exclusivamente por ações demoníacas individuais", color: "red", shape: "triangle", isCorrect: false },
            { text: "Toda enfermidade é consequência direta de pecados pessoais", color: "blue", shape: "diamond", isCorrect: false },
            { text: "O pecado original introduziu deterioração e fragilidade em toda a criação", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Deus criou as enfermidades para testar espiritualmente a humanidade", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A expressão grega \"sozo\", utilizada por Jesus ao declarar \"a tua fé te salvou\", revela qual aspecto profundo do milagre da mulher do fluxo de sangue?",
          answers: [
            { text: "Uma libertação exclusivamente emocional", color: "red", shape: "triangle", isCorrect: false },
            { text: "Uma restauração integral envolvendo salvação, cura e dignidade", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Apenas a interrupção física da enfermidade", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Uma recompensa reservada somente aos judeus", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "De acordo com a lição, por que as curas realizadas por Jesus eram consideradas sinais do Reino de Deus?",
          answers: [
            { text: "Porque substituíam totalmente a necessidade de arrependimento", color: "red", shape: "triangle", isCorrect: false },
            { text: "Porque provavam superioridade política sobre Roma", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Porque revelavam a chegada do Messias e a reversão dos efeitos da Queda", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Porque beneficiavam exclusivamente os discípulos escolhidos", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Qual alternativa expressa corretamente o equilíbrio ensinado pela lição entre cura divina e responsabilidade humana?",
          answers: [
            { text: "Buscar tratamento médico demonstra falta de fé", color: "red", shape: "triangle", isCorrect: false },
            { text: "O cuidado com o corpo é irrelevante diante da soberania divina", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A oração substitui completamente hábitos saudáveis e acompanhamento médico", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Deus continua curando, mas o cristão também deve cuidar do corpo como templo do Espírito Santo", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "Ao apresentar diferentes formas de cura realizadas por Jesus — toque, palavra e cura à distância — a lição enfatiza principalmente que:",
          answers: [
            { text: "Apenas milagres públicos possuem validade espiritual", color: "red", shape: "triangle", isCorrect: false },
            { text: "O poder de Cristo não está limitado a métodos, distância ou circunstâncias", color: "blue", shape: "diamond", isCorrect: true },
            { text: "As curas dependiam exclusivamente da intensidade emocional das multidões", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Somente pessoas fisicamente presentes poderiam experimentar milagres", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Fragmento de Yahweh-Rafa",
        description: "Relíquia sagrada que simboliza o poder restaurador do Deus que cura",
        icon: "✨"
      }
    },
    {
      id: 7,
      title: "O Chamado da Consagração",
      description: "Oração e jejum como caminhos de comunhão, fortalecimento espiritual e dependência de Deus",
      icon: "🙏",
      unlocked: true,
      questions: [
        {
          question: "Ao relacionar Mateus 9.15 com a prática cristã do jejum, a lição enfatiza que:",
          answers: [
            { text: "O jejum foi abolido após a ressurreição de Cristo", color: "red", shape: "triangle", isCorrect: false },
            { text: "O jejum pertence apenas ao contexto judaico do Antigo Testamento", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A ausência física de Cristo inauguraria um período de busca intensa através da oração e do jejum", color: "yellow", shape: "circle", isCorrect: true },
            { text: "O jejum seria necessário somente para líderes espirituais da Igreja", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a perspectiva pentecostal apresentada na lição, qual é a principal função espiritual do jejum?",
          answers: [
            { text: "Produzir mérito espiritual capaz de garantir respostas divinas", color: "red", shape: "triangle", isCorrect: false },
            { text: "Submeter a carne, aumentar a sensibilidade espiritual e fortalecer a comunhão com Deus", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Demonstrar publicamente santidade diante da comunidade cristã", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Substituir a necessidade de oração constante e leitura bíblica", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A lição utiliza o rasgar do véu do Templo como símbolo teológico de qual realidade espiritual?",
          answers: [
            { text: "O encerramento definitivo das práticas de oração coletiva", color: "red", shape: "triangle", isCorrect: false },
            { text: "O acesso direto do crente ao Pai por meio da obra de Cristo", color: "blue", shape: "diamond", isCorrect: true },
            { text: "A transferência da presença de Deus exclusivamente para Jerusalém", color: "yellow", shape: "circle", isCorrect: false },
            { text: "A necessidade de novos sacrifícios contínuos para alcançar comunhão com Deus", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Ao ensinar sobre \"orar sem cessar\", a lição estabelece que:",
          answers: [
            { text: "A eficácia da oração depende de horários e posições corporais específicas", color: "red", shape: "triangle", isCorrect: false },
            { text: "Apenas orações longas demonstram verdadeira espiritualidade", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A oração deve tornar-se um estilo contínuo de comunhão e dependência de Deus", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Deus responde somente às orações realizadas dentro do templo", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "O exemplo de Acabe no Antigo Testamento foi utilizado na lição para demonstrar principalmente que:",
          answers: [
            { text: "O jejum possui poder automático para remover qualquer juízo divino", color: "red", shape: "triangle", isCorrect: false },
            { text: "Deus ignora completamente atos externos de humilhação", color: "blue", shape: "diamond", isCorrect: false },
            { text: "O quebrantamento sincero pode despertar misericórdia divina mesmo em alguém profundamente pecador", color: "yellow", shape: "circle", isCorrect: true },
            { text: "O arrependimento verdadeiro depende exclusivamente de jejuns públicos coletivos", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Véu Rasgado da Comunhão",
        description: "Fragmento sagrado que representa o acesso direto ao Pai através da oração e da consagração",
        icon: "🙏"
      }
    },
    {
      id: 8,
      title: "O Peso da Dívida Impagável",
      description: "Posso Perdoar e Amar",
      icon: "⛓️",
      unlocked: true,
      questions: [
        {
          question: "Na parábola do credor incompassivo, qual é o principal contraste teológico construído por Jesus entre as duas dívidas apresentadas?",
          answers: [
            { text: "A diferença entre justiça romana e justiça judaica na cobrança de impostos", color: "red", shape: "triangle", isCorrect: false },
            { text: "A incapacidade humana de compreender valores financeiros espirituais", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A desproporção entre a dívida espiritual perdoada por Deus e as ofensas humanas que nos recusamos a perdoar", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A distinção entre pecados conscientes e pecados involuntários", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a interpretação pentecostal apresentada na lição, por que a falta de perdão é considerada espiritualmente perigosa?",
          answers: [
            { text: "Porque reduz a autoridade ministerial do crente diante da igreja", color: "red", shape: "triangle", isCorrect: false },
            { text: "Porque impede o acesso ao conhecimento teológico profundo", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Porque rompe tradições religiosas e compromete a disciplina eclesiástica", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Porque entristece o Espírito Santo, produz amargura e compromete a comunhão com Deus", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "Ao responder \"setenta vezes sete\" a Pedro, Jesus combate diretamente qual conceito predominante no pensamento judaico da época?",
          answers: [
            { text: "A ideia de que somente Deus poderia exercer misericórdia", color: "red", shape: "triangle", isCorrect: false },
            { text: "A crença rabínica de que o perdão possuía limites contáveis", color: "blue", shape: "diamond", isCorrect: true },
            { text: "A tradição de que o Messias julgaria sem compaixão", color: "yellow", shape: "circle", isCorrect: false },
            { text: "O ensino de que apenas os sacerdotes tinham autoridade para liberar perdão", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "De acordo com a lição, qual relação existe entre o novo nascimento e a capacidade de amar em um contexto de crescente iniquidade?",
          answers: [
            { text: "O novo nascimento remove completamente os conflitos emocionais humanos", color: "red", shape: "triangle", isCorrect: false },
            { text: "O amor cristão surge naturalmente através do amadurecimento psicológico", color: "blue", shape: "diamond", isCorrect: false },
            { text: "O novo nascimento, operado pelo Espírito Santo, capacita o crente a vencer a frieza espiritual e responder à maldade com graça", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A prática religiosa constante substitui a necessidade de transformação interior", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a lição, por que o perdão divino não pode ser entendido como resultado de mérito humano?",
          answers: [
            { text: "Porque a dívida espiritual possui natureza moral e somente a graça manifestada em Cristo pode cancelá-la", color: "red", shape: "triangle", isCorrect: true },
            { text: "Porque Deus decidiu ignorar completamente a existência do pecado humano", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Porque o perdão foi concedido apenas aos personagens bíblicos do Novo Testamento", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Porque boas obras possuem maior valor que arrependimento e misericórdia", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Corrente Quebrada da Graça",
        description: "Símbolo da dívida espiritual cancelada por Cristo e do coração liberto para perdoar",
        icon: "⛓️"
      }
    },
    {
      id: 9,
      title: "Guardiões do Coração",
      description: "Posso ser Puro de Coração",
      icon: "🏮",
      unlocked: true,
      questions: [
        {
          question: "A lição estabelece um contraste entre os valores cristãos e os valores culturais contemporâneos. Considerando esse contraste, qual afirmação melhor expressa a razão pela qual os valores cristãos são apresentados como eternos?",
          answers: [
            { text: "Porque foram preservados pela tradição da igreja ao longo dos séculos, independentemente das Escrituras.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Porque derivam de princípios revelados por Deus na Sua Palavra, permanecendo imutáveis mesmo quando a cultura se transforma.", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Porque são aceitos pela maioria das sociedades ocidentais e orientais ao longo da história.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Porque refletem apenas costumes religiosos desenvolvidos durante o período do Novo Testamento.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Ao relacionar o relativismo moral com a pureza do coração, a lição sugere que o maior perigo espiritual da ideia de que \"nada é certo ou errado\" consiste em:",
          answers: [
            { text: "Impedir o desenvolvimento intelectual dos cristãos.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Produzir divergências entre diferentes denominações cristãs.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Normalizar o pecado, eliminar referências morais absolutas e enfraquecer a consciência diante da verdade divina.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Tornar impossível a convivência entre pessoas de diferentes culturas.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A lição afirma que Satanás tentou distorcer as Escrituras e, por isso, o conhecimento bíblico é indispensável. Qual conclusão está mais alinhada com esse ensino?",
          answers: [
            { text: "A pureza do coração depende principalmente da capacidade humana de interpretar textos religiosos complexos.", color: "red", shape: "triangle", isCorrect: false },
            { text: "O conhecimento das Escrituras serve apenas para debates teológicos e apologéticos.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "O estudo da Palavra protege contra enganos espirituais, permitindo discernir distorções da verdade e permanecer fiel aos valores de Cristo.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "O conhecimento bíblico substitui a necessidade de relacionamento pessoal com Deus.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a advertência feita a partir do exemplo dos escribas e fariseus, qual era a contradição fundamental presente em sua espiritualidade?",
          answers: [
            { text: "Possuíam zelo missionário, mas rejeitavam a oração comunitária.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Conheciam profundamente as tradições judaicas, mas desconheciam os textos bíblicos.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Demonstravam grande interesse pela justiça social, mas negligenciavam os rituais religiosos.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Dominavam o conteúdo das Escrituras, porém não reconheceram o Verbo nem permitiram que a verdade transformasse o interior.", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "A analogia entre sintomas físicos e sintomas espirituais é utilizada para diagnosticar a saúde do coração. De acordo com a lição, qual situação revela um risco de adoecimento espiritual mesmo em alguém que continua estudando a Bíblia?",
          answers: [
            { text: "Ler diferentes traduções das Escrituras para ampliar a compreensão do texto.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Transformar o estudo bíblico em mera aquisição de informação, sem relacionamento genuíno com Cristo.", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Buscar orientação de líderes espirituais para compreender passagens difíceis.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Dedicar tempo à meditação e reflexão sobre os ensinos de Jesus.", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Lâmpada dos Valores Eternos",
        description: "Artefato raro que ilumina o caminho da verdade e protege o coração contra os enganos do relativismo.",
        icon: "🏮"
      }
    },
    {
      id: 10,
      title: "🕊️  Ecos do Cenáculo",
      subtitle: "Capacitados para Testemunhar em um Mundo que Silencia a Verdade",
      description: "Posso ser uma Testemunha?",
      icon: "🔥",
      unlocked: true,
      questions: [
        {
          question: "Segundo a lição, qual alternativa expressa corretamente a relação entre Atos 1.8, a transformação dos discípulos e a natureza do testemunho cristão?",
          answers: [
            { text: "O testemunho nasce principalmente do conhecimento teológico acumulado ao longo dos anos.", color: "red", shape: "triangle", isCorrect: false },
            { text: "O testemunho eficaz resulta da combinação entre experiência pessoal com Cristo e capacitação do Espírito Santo.", color: "blue", shape: "diamond", isCorrect: true },
            { text: "O testemunho depende da posição ocupada dentro da igreja e do reconhecimento da liderança.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "O testemunho é uma responsabilidade exclusiva daqueles que receberam dons ministeriais específicos.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A lição apresenta Paulo como modelo de testemunha cristã. Qual aspecto de sua experiência em Damasco recebe maior ênfase teológica dentro da perspectiva pentecostal apresentada?",
          answers: [
            { text: "A substituição do judaísmo pelo cristianismo como sistema religioso.", color: "red", shape: "triangle", isCorrect: false },
            { text: "A aquisição de maior conhecimento intelectual das Escrituras.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A transformação sobrenatural operada por Cristo e potencializada pela capacitação do Espírito para uma nova missão.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A mudança geográfica de seu campo de atuação missionária.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Ao relacionar os exemplos do gadareno, de Zaqueu e da mulher samaritana, a lição conclui que a nova maneira de viver oferecida por Jesus demonstra que:",
          answers: [
            { text: "A restauração divina é reservada aos que já possuem boa reputação moral.", color: "red", shape: "triangle", isCorrect: false },
            { text: "O Evangelho deve priorizar pessoas socialmente influentes.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Jesus acolhe diferentes tipos de pessoas, mas exige transformação interior que produza uma vida restaurada.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A mudança espiritual ocorre independentemente da resposta pessoal ao chamado de Cristo.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "De acordo com a lição, qual foi o principal erro dos cristãos que cedem à pressão do 'politicamente correto'?",
          answers: [
            { text: "Defender a verdade bíblica sem amor.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Priorizar ações sociais em vez da evangelização.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Esconder ou suavizar a mensagem do Evangelho para evitar rejeição ou críticas.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Buscar diálogo com pessoas de opiniões diferentes.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Considerando os exemplos de Jesus, dos discípulos após Pentecostes e do apóstolo Paulo, qual princípio sintetiza a definição de testemunho apresentada em toda a lição?",
          answers: [
            { text: "Testemunhar consiste principalmente em transmitir informações corretas sobre a fé cristã.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Testemunhar é defender valores religiosos diante da sociedade.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Testemunhar é unir palavras e vida transformada, revelando Cristo por meio da ação do Espírito Santo.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "Testemunhar é participar regularmente das atividades da igreja local.", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Chama do Cenáculo",
        description: "Uma centelha espiritual que simboliza a ousadia concedida pelo Espírito Santo às testemunhas fiéis de Cristo.",
        icon: "🔥🕊️"
      }
    },
    {
      id: 11,
      title: "O Reflexo do Espírito em Ações de Misericórdia",
      subtitle: "Posso Fazer a Diferença",
      description: "Posso Fazer a Diferença",
      icon: "🤝",
      unlocked: true,
      questions: [
        {
          question: "De acordo com a lição, qual alternativa expressa corretamente a relação entre Efésios 2.10 e Tiago 2.14–17?",
          answers: [
            { text: "As boas obras são o meio pelo qual o cristão conquista sua salvação diante de Deus.", color: "red", shape: "triangle", isCorrect: false },
            { text: "As boas obras substituem a necessidade da fé quando realizadas em favor dos necessitados.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "As boas obras são evidências externas da transformação produzida pela graça, revelando uma fé autêntica.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A prática de boas obras possui importância apenas social, sem relação com a vida espiritual.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo a interpretação apresentada na lição sobre a parábola do Bom Samaritano, qual foi o contraste teológico central entre o sacerdote, o levita e o samaritano?",
          answers: [
            { text: "O samaritano possuía maior conhecimento da Lei do que os líderes religiosos.", color: "red", shape: "triangle", isCorrect: false },
            { text: "O sacerdote e o levita não tinham condições materiais de ajudar o ferido.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "O samaritano demonstrou que a verdadeira espiritualidade se manifesta em misericórdia prática, enquanto a religiosidade sem compaixão é vazia.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "O samaritano foi escolhido porque pertencia ao povo da aliança e possuía autoridade religiosa.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "A lição afirma que o pentecostalismo histórico associa experiência espiritual e responsabilidade social. Qual exemplo bíblico é utilizado para demonstrar essa integração entre fé, unidade e cuidado mútuo?",
          answers: [
            { text: "A reconstrução dos muros de Jerusalém sob a liderança de Neemias.", color: "red", shape: "triangle", isCorrect: false },
            { text: "A comunidade cristã do primeiro século que compartilhava bens e cuidava dos necessitados.", color: "blue", shape: "diamond", isCorrect: true },
            { text: "A peregrinação de Israel pelo deserto sob a liderança de Moisés.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "A organização dos turnos sacerdotais no templo de Jerusalém.", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Com base na lição, qual característica distingue o cuidado de Jesus pelos necessitados de uma simples assistência social?",
          answers: [
            { text: "Jesus limitava Seu ministério aos necessitados que demonstravam fé suficiente.", color: "red", shape: "triangle", isCorrect: false },
            { text: "Jesus priorizava exclusivamente as necessidades espirituais das pessoas.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Jesus atendia apenas aqueles que pertenciam ao povo judeu.", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Jesus exercia um cuidado integral, alcançando necessidades físicas, emocionais e espirituais.", color: "green", shape: "square", isCorrect: true }
          ]
        },
        {
          question: "Considerando o exemplo de Barnabé e a conclusão geral da lição, qual afirmação melhor sintetiza a compreensão pentecostal sobre generosidade cristã?",
          answers: [
            { text: "A generosidade é válida somente quando envolve grandes quantias financeiras.", color: "red", shape: "triangle", isCorrect: false },
            { text: "A generosidade é uma estratégia para alcançar reconhecimento e influência na igreja.", color: "blue", shape: "diamond", isCorrect: false },
            { text: "A generosidade é fruto da ação do Espírito Santo, manifestando-se em recursos, tempo, apoio, encorajamento e serviço.", color: "yellow", shape: "circle", isCorrect: true },
            { text: "A generosidade deve ser praticada apenas por líderes e pessoas com dons ministeriais específicos.", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Manto da Compaixão do Samaritano",
        description: "Relíquia rara que simboliza a fé que se transforma em misericórdia, serviço e amor ao próximo.",
        icon: "🕊️✨"
      }
    },
    { id: 12, title: "Capítulo 12", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 13, title: "Capítulo 13", description: "Em desenvolvimento", icon: "🔒", unlocked: false }
  ]
};

const bonusReward = {
  id: 100,
  title: "Bênção do Reino",
  name: "Bênção do Reino",
  description: "Recompensa extra por coletar todos os itens sagrados.",
  icon: "✨"
};

export default function QuizGame({ onQuit }) {
  const { user, logout } = useAuth(); // Obter dados do usuário logado
  const [gameState, setGameState] = useState('menu'); // menu, map, quiz, result, inventory
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [chaptersCompleted, setChaptersCompleted] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [miniPosition, setMiniPosition] = useState({ row: 3, col: 0 });
  const [miniStatus, setMiniStatus] = useState('ready');
  const [miniMessage, setMiniMessage] = useState('');
  const [showItemMessage, setShowItemMessage] = useState(false);
  const [capturedItem, setCapturedItem] = useState(null);
  const [capturedChapter, setCapturedChapter] = useState(null);
  const [miniObstacles, setMiniObstacles] = useState([]);

  // Integrar persistência de dados com localStorage - vinculado ao usuário
  useGamePersistence({
    chaptersCompleted,
    inventory,
    totalScore,
    setChaptersCompleted,
    setInventory,
    setTotalScore,
    userId: user?.id // Vincular dados ao ID do usuário
  });

  const itemSlotCount = 14;
  const allCapturedChapterItems = inventory.filter(item => typeof item.chapterId === 'number').length;
  const bonusUnlocked = allCapturedChapterItems >= lessonData.chapters.length;
  const inventorySlots = Array.from({ length: itemSlotCount }, (_, index) => {
    if (index < inventory.length) {
      return inventory[index];
    }

    if (index === lessonData.chapters.length) {
      return bonusUnlocked
        ? { ...bonusReward, chapterId: 'bonus' }
        : { locked: true, name: 'Item Bônus', icon: '🔒', description: 'Colete todos os itens para desbloquear' };
    }

    return { locked: true, name: `Item ${index + 1}`, icon: '🔒', description: 'Indisponível / em desenvolvimento' };
  });

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const chapter = lessonData.chapters[currentChapter];
    const isCorrect = chapter.questions[currentQIndex].answers[answerIndex].isCorrect;
    
    if (isCorrect) {
      setScore(score + 1000);
      setCorrectAnswers(prev => [...prev, true]);
    } else {
      setCorrectAnswers(prev => [...prev, false]);
    }
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQIndex + 1 < chapter.questions.length) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        // Capítulo completo - verificar se acertou todas as perguntas
        const allAnswers = correctAnswers.concat([isCorrect]);
        const allCorrect = allAnswers.length === chapter.questions.length && 
                          allAnswers.every(answer => answer === true);
        
        if (allCorrect) {
          setChaptersCompleted(prev => [...prev, currentChapter]);
          setTotalScore(prev => prev + score + 1000);
        }
        setGameState('result');
      }
    }, 2500);
  };

  const startChapter = (chapterId) => {
    const chapter = lessonData.chapters[chapterId];
    if (!chapter.unlocked) return; // Não permitir iniciar capítulos bloqueados
    
    setCurrentChapter(chapterId);
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setCorrectAnswers([]);
    setGameState('quiz');
  };

  const seedRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const hasPath = (obstacles) => {
    const gridRows = 4;
    const gridCols = 6;
    const start = { row: 3, col: 0 };
    const goal = { row: 0, col: 5 };
    const blocked = new Set(obstacles.map(ob => `${ob.row},${ob.col}`));
    const queue = [start];
    const visited = new Set([`${start.row},${start.col}`]);

    while (queue.length) {
      const { row, col } = queue.shift();
      if (row === goal.row && col === goal.col) return true;
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = row + dr;
        const nc = col + dc;
        const key = `${nr},${nc}`;
        if (nr < 0 || nr >= gridRows || nc < 0 || nc >= gridCols) continue;
        if (blocked.has(key)) continue;
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push({ row: nr, col: nc });
      }
    }
    return false;
  };

  const buildObstacles = () => {
    const width = 6;
    const height = 4;
    const start = { row: 3, col: 0 };
    const goal = { row: 0, col: 5 };
    const allCells = [];
    for (let row = 0; row < height; row += 1) {
      for (let col = 0; col < width; col += 1) {
        if ((row === start.row && col === start.col) || (row === goal.row && col === goal.col)) continue;
        allCells.push({ row, col });
      }
    }

    let attempt = 0;
    while (attempt < 20) {
      const seed = Math.floor(Math.random() * 1000000) + attempt;
      const shuffled = allCells
        .map((cell, idx) => ({ cell, score: seedRandom(seed + idx) }))
        .sort((a, b) => a.score - b.score)
        .map(item => item.cell);
      const obstacleCount = 5;
      const obstacles = shuffled.slice(0, obstacleCount);
      if (hasPath(obstacles)) return obstacles;
      attempt += 1;
    }

    return [
      { row: 3, col: 2 },
      { row: 2, col: 2 },
      { row: 1, col: 1 },
      { row: 1, col: 3 },
      { row: 0, col: 3 }
    ];
  };

  const startMiniGame = () => {
    setMiniPosition({ row: 3, col: 0 });
    setMiniStatus('playing');
    setMiniMessage('Use as setas para chegar ao item sem tocar nos obstáculos.');
    const hour = new Date().getHours();
    setMiniObstacles(buildObstacles());
    setGameState('mini');
  };

  const movePlayer = (direction) => {
    if (miniStatus !== 'playing') return;

    const obstacles = miniObstacles;
    const goal = { row: 0, col: 5 };
    let next = { ...miniPosition };

    if (direction === 'up') next.row -= 1;
    if (direction === 'down') next.row += 1;
    if (direction === 'left') next.col -= 1;
    if (direction === 'right') next.col += 1;

    if (next.row < 0 || next.row > 3 || next.col < 0 || next.col > 5) {
      setMiniMessage('Não é possível sair do caminho.');
      return;
    }

    const hitObstacle = obstacles.some(ob => ob.row === next.row && ob.col === next.col);
    if (hitObstacle) {
      setMiniMessage('Você bateu em um obstáculo! Retornando ao início.');
      setMiniPosition({ row: 3, col: 0 });
      return;
    }

    setMiniPosition(next);

    if (next.row === goal.row && next.col === goal.col) {
      const chapter = lessonData.chapters[currentChapter];
      const reward = chapter.reward;
      const alreadyCaptured = inventory.some(item => item.chapterId === currentChapter);
      if (!alreadyCaptured) {
        setCapturedItem(reward);
        setCapturedChapter(currentChapter);
        setShowItemMessage(true);
      }
      setMiniStatus('captured');
      setMiniMessage('Item capturado! Parabéns!');
    }
  };

  const getShapeSvg = (shape) => {
    switch(shape) {
      case 'triangle': return <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>;
      case 'diamond': return <svg viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" transform="rotate(45 12 12)"/></svg>;
      case 'circle': return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
      case 'square': return <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>;
      default: return null;
    }
  };

  // Tela de Menu Inicial
  if (gameState === 'menu') {
    return (
      <div className="quiz-container menu-bg">
        <div className="menu-content menu-content-compact">
          <div className="menu-buttons">
            <button className="menu-btn primary" onClick={() => setGameState('map')}>
              🎮 Iniciar
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('inventory')}>
              🎒 Inventário {inventory.length > 0 && <span className="badge">{inventory.length}</span>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela do Mapa (Trilha dos Capítulos)
  if (gameState === 'map') {
    return (
      <div className="quiz-container map-bg">
        <div className="map-header">
          <button className="back-btn" onClick={() => setGameState('menu')}>← Voltar</button>
          <h2>🗺️ Trilha do Reino</h2>
          <div className="score-display">⭐ {totalScore}</div>
        </div>
        
        <div className="trail-container">
          {lessonData.chapters.map((chapter, index) => {
            const isCompleted = chaptersCompleted.includes(index);
            const isUnlocked = chapter.unlocked;
            return (
              <div key={chapter.id} className={`trail-step ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}>
                <div className="trail-line"></div>
                <div className="chapter-node" onClick={isUnlocked ? () => startChapter(index) : null}>
                  <div className="chapter-icon">{isUnlocked ? chapter.icon : '🔒'}</div>
                  <div className="chapter-number">{index + 1}</div>
                </div>
                <div className="chapter-info">
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  {isCompleted && <span className="completed-badge">✓ Concluído</span>}
                  {!isUnlocked && <span className="locked-badge">Bloqueado</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Tela de Resultado do Capítulo
  if (gameState === 'result') {
    const chapter = lessonData.chapters[currentChapter];
    const reward = chapter.reward;
    const isChapterCompleted = chaptersCompleted.includes(currentChapter);
    const hasCapturedItem = inventory.some(item => item.chapterId === currentChapter);
    
    return (
      <div className="quiz-container result-bg">
        <div className="result-content">
          {isChapterCompleted ? (
            <>
              <h1>🎉 Capítulo Completo!</h1>
              <div className="chapter-title">{chapter.title}</div>
              
              <div className="score-section">
                <div className="score-label">Pontuação deste capítulo</div>
                <div className="score-value">{score}</div>
              </div>
              
              <div className="reward-section">
                <h3>Recompensa Obtida!</h3>
                <div className="reward-card">
                  <div className="reward-icon">{reward.icon}</div>
                  <div className="reward-name">{reward.name}</div>
                  <div className="reward-desc">{reward.description}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>❌ Capítulo Não Concluído</h1>
              <div className="chapter-title">{chapter.title}</div>
              
              <div className="score-section">
                <div className="score-label">Você errou uma ou mais perguntas</div>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>Acerte todas as 3 perguntas para ganhar a recompensa!</p>
              </div>
            </>
          )}
          
          <div className="result-buttons">
            {!isChapterCompleted && (
              <button className="menu-btn primary" onClick={() => startChapter(currentChapter)}>
                🔄 Tentar Novamente
              </button>
            )}
            {isChapterCompleted && !hasCapturedItem && (
              <button className="menu-btn primary" onClick={startMiniGame}>
                🕹️ Jogar Minijogo
              </button>
            )}
            <button className="menu-btn primary" onClick={() => setGameState('map')}>
              Ver Mapa
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('inventory')}>
              Ver Inventário
            </button>
            <button className="menu-btn secondary" onClick={() => { setGameState('menu'); setCurrentChapter(null); }}>
              🏠 Menu Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela do Minijogo
  if (gameState === 'mini' && currentChapter !== null) {
    if (showItemMessage && capturedItem) {
      return (
        <div className="quiz-container mini-bg">
          <div className="item-message">
            <h2>🎉 Parabéns! Você capturou o item!</h2>
            <div className="item-icon">{capturedItem.icon}</div>
            <p><strong>{capturedItem.name}</strong></p>
            <p>{capturedItem.description}</p>
            <button className="menu-btn primary" onClick={() => {
              setInventory(prev => [...prev, { ...capturedItem, chapterId: capturedChapter }]);
              setShowItemMessage(false);
              setCapturedItem(null);
              setCapturedChapter(null);
              setMiniStatus('completed');
              setGameState('map');
            }}>Continuar</button>
          </div>
        </div>
      );
    }

    const obstacles = miniObstacles.length ? miniObstacles : buildObstacles();
    const goal = { row: 0, col: 5 };
    const chapter = lessonData.chapters[currentChapter];

    return (
      <div className="quiz-container mini-bg">
        <div className="map-header">
          <button className="back-btn" onClick={() => setGameState('result')}>← Voltar</button>
          <h2>🕹️ Minijogo do Capítulo</h2>
          <div className="score-display">⭐ {totalScore}</div>
        </div>

        <div className="mini-content">
          <div className="mini-instructions">
            <p>{miniMessage || 'Ande pelo caminho até o item evitando os obstáculos.'}</p>
            <p className="mini-hint">Começo: 🌟 / Item: 🎁 / Obstáculos: ⛰️</p>
            <p className="mini-hint">Capítulo: {chapter.title}</p>
          </div>

          <div className="mini-grid">
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="mini-row">
                {Array.from({ length: 6 }).map((_, col) => {
                  const isPlayer = miniPosition.row === row && miniPosition.col === col;
                  const isObstacle = obstacles.some(ob => ob.row === row && ob.col === col);
                  const isGoal = goal.row === row && goal.col === col;
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`mini-cell ${isPlayer ? 'player' : ''} ${isObstacle ? 'obstacle' : ''} ${isGoal ? 'goal' : ''}`}
                    >
                      {isPlayer ? '🌟' : isGoal ? '🎁' : isObstacle ? '⛰️' : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mini-controls">
            <button className="mini-btn" onClick={() => movePlayer('up')}>↑</button>
            <div className="mini-horizontal-controls">
              <button className="mini-btn" onClick={() => movePlayer('left')}>←</button>
              <button className="mini-btn" onClick={() => movePlayer('down')}>↓</button>
              <button className="mini-btn" onClick={() => movePlayer('right')}>→</button>
            </div>
          </div>

          {miniStatus === 'won' && (
            <div className="mini-win">
              <p>🎉 Parabéns! O item foi capturado e agora está no inventário.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Inventário
  if (gameState === 'inventory') {
    return (
      <div className="quiz-container inventory-bg">
        <div className="inventory-header">
          <button className="back-btn" onClick={() => setGameState('map')}>← Voltar</button>
          <h2>🎒 Meu Inventário</h2>
          <button className="back-btn" onClick={() => { setGameState('menu'); setCurrentChapter(null); }} style={{ float: 'right' }}>🏠 Menu</button>
        </div>
        
        <div className="inventory-stats">
          <div className="stat">
            <span className="stat-value">{totalScore}</span>
            <span className="stat-label">Pontos Totais</span>
          </div>
          <div className="stat">
            <span className="stat-value">{chaptersCompleted.length}/{lessonData.chapters.length}</span>
            <span className="stat-label">Capítulos</span>
          </div>
          <div className="stat">
            <span className="stat-value">{inventory.length}</span>
            <span className="stat-label">Itens</span>
          </div>
        </div>
        
        <div className="inventory-grid">
          {inventorySlots.map((item, index) => (
            <div key={index} className={`inventory-item ${item.locked ? 'locked-item' : ''}`}>
              <div className="item-icon">{item.icon}</div>
              <div className="item-name">{item.locked ? 'Bloqueado' : item.name}</div>
              <div className="item-desc">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tela de Quiz (Perguntas)
  if (currentChapter === null) {
    return null; // Prevenir erro se currentChapter não for definido
  }
  
  const chapter = lessonData.chapters[currentChapter];
  const q = chapter.questions[currentQIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={() => setGameState('map')}>← Mapa</button>
        <div className="chapter-name">{chapter.title}</div>
        <div className="score-display">⭐ {score}</div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${((currentQIndex + 1) / chapter.questions.length) * 100}%`}}
          ></div>
        </div>
        <div className="question-counter">Pergunta {currentQIndex + 1} de {chapter.questions.length}</div>
      </div>

      <div className="question-box">
        {q.question}
      </div>

      {showResult && (
        <div className={`result-overlay ${q.answers[selectedAnswer].isCorrect ? 'correct' : 'wrong'}`}>
          <h2>{q.answers[selectedAnswer].isCorrect ? '✅ Correto!' : '❌ Incorreto!'}</h2>
          <p>Pontuação: {score}</p>
        </div>
      )}

      <div className="answers-grid">
        {q.answers.map((ans, idx) => (
          <button 
            key={idx} 
            className={`answer-btn color-${ans.color} ${showResult && selectedAnswer !== idx ? 'dimmed' : ''}`}
            onClick={() => handleAnswer(idx)}
            disabled={showResult}
          >
            <div className="shape-icon">
              {getShapeSvg(ans.shape)}
            </div>
            <span className="answer-text">{ans.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
