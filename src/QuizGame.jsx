import React, { useState, useEffect } from 'react';
import './QuizGame.css';
import { useGamePersistence } from './hooks/useGamePersistence';

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
    { id: 5, title: "Capítulo 5", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 6, title: "Capítulo 6", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 7, title: "Capítulo 7", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 8, title: "Capítulo 8", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 9, title: "Capítulo 9", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 10, title: "Capítulo 10", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
    { id: 11, title: "Capítulo 11", description: "Em desenvolvimento", icon: "🔒", unlocked: false },
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

  // Integrar persistência de dados com localStorage
  useGamePersistence({
    chaptersCompleted,
    inventory,
    totalScore,
    setChaptersCompleted,
    setInventory,
    setTotalScore
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
