import React, { useState } from 'react';
import './App.css';
import QuizGame from './QuizGame';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Ícones simples em SVG
const HomeIcon = () => (<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>);
const DiscoverIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>);
const CreateIcon = () => (<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>);
const LibraryIcon = () => (<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>);
const ProfileIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>);
const SearchIcon = () => (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>);
const NotificationsIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>);

// Componente interno que usa useAuth
function AppContent() {
  const { user, loading, isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // login, register
  const [activeTab, setActiveTab] = useState('play'); // Começar direto no jogo

  // Se carregando, mostra loading
  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo">
            <h1>👑 Caminho do Reino</h1>
          </div>
          <p style={{textAlign: 'center', color: '#888'}}>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se NÃO está autenticado, mostra telas de auth
  if (!isAuthenticated) {
    return (
      <>
        {authView === 'login' && (
          <LoginPage 
            onSwitchToRegister={() => setAuthView('register')}
            onLoginSuccess={() => setActiveTab('play')}
            onSwitchToForgot={() => {}}
          />
        )}
        {authView === 'register' && (
          <RegisterPage 
            onSwitchToLogin={() => setAuthView('login')}
            onRegisterSuccess={() => setAuthView('login')}
          />
        )}
      </>
    );
  }

  // App principal (logado)
  return (
    <div className="app-container">
      
      {/* Top Navigation Bar */}
      {activeTab !== 'play' && (
        <div className="top-bar">
          <div className="top-bar-logo">Caminho do Reino</div>
          <div className="top-bar-actions">
            <button className="icon-btn"><SearchIcon /></button>
            <button className="icon-btn"><NotificationsIcon /></button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === 'home' && <HomePage onPlay={() => setActiveTab('play')} />}
        {activeTab === 'discover' && <DiscoverPage onPlay={() => setActiveTab('play')} />}
        {activeTab === 'play' && <QuizGame onQuit={() => setActiveTab('discover')} />}
        
        {activeTab !== 'discover' && activeTab !== 'play' && (
          <div style={{ padding: 20, textAlign:'center', color: '#fff', marginTop: '50px' }}>
            <h2>Em Desenvolvimento</h2>
            <p>Você está na aba {activeTab}. Apenas a tela "Descobrir" está implementada como modelo inicial.</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      {activeTab !== 'play' && (
        <div className="bottom-nav">
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <HomeIcon /> Início
          </button>
          <button className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`} onClick={() => setActiveTab('discover')}>
            <DiscoverIcon /> Descobrir
          </button>
          
          <button className="nav-create-btn" onClick={() => setActiveTab('play')}>
            <span>+</span>
          </button>

          <button className={`nav-item ${activeTab === 'criar' ? 'active' : ''}`} onClick={() => setActiveTab('criar')}>
            <CreateIcon /> Criar
          </button>
          <button className={`nav-item ${activeTab === 'biblioteca' ? 'active' : ''}`} onClick={() => setActiveTab('biblioteca')}>
            <LibraryIcon /> Estudos
          </button>
        </div>
      )}

    </div>
  );
}

// ---------------------------
// Home Page Components
// ---------------------------
function HomePage({ onPlay }) {
  return (
    <div className="discover-container">
      
      {/* Hero Banner */}
      <div className="hero-card" onClick={onPlay} style={{cursor: 'pointer'}}>
        <img 
          src="/caminho_banner_bible.png" 
          alt="Trilha do Reino" 
          className="hero-card-image"
        />
        <div className="hero-card-content">
          <div className="tags">
            <span className="tag">Início</span>
          </div>
          <h2>Bem-vindo ao Caminho do Reino!</h2>
          <p>Continue sua jornada espiritual. Complete trilhas, ganhe badges e cresça no conhecimento bíblico.</p>
          <button className="hero-btn" onClick={(e) => { e.stopPropagation(); onPlay(); }}>Continuar Jogando</button>
        </div>
      </div>

      {/* Stats Overview - Side by Side with Activity */}
      <h3 className="section-title">Seu Progresso</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        
        {/* Left Column - Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
            <div className="game-card-image" style={{backgroundColor: '#6c5ce7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div className="game-card-content">
              <h3>Quests</h3>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#6c5ce7'}}>12</p>
            </div>
          </div>

          <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
            <div className="game-card-image" style={{backgroundColor: '#00b894', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="game-card-content">
              <h3>Badges</h3>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#00b894'}}>5</p>
            </div>
          </div>

          <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
            <div className="game-card-image" style={{backgroundColor: '#fdcb6e', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            </div>
            <div className="game-card-content">
              <h3>Tempo</h3>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#fdcb6e'}}>4h 30m</p>
            </div>
          </div>

          <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
            <div className="game-card-image" style={{backgroundColor: '#e17055', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div className="game-card-content">
              <h3>Grupo</h3>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#e17055'}}>8</p>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div>
          <h3 className="section-title" style={{marginBottom: '12px'}}>Atividade Recente</h3>
          <div style={{ backgroundColor: '#1e1e2e', borderRadius: '12px', padding: '16px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#6c5ce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📖</div>
              <div>
                <p style={{ color: '#fff', margin: 0, fontWeight: 'bold', fontSize: '14px' }}>Trilha completada</p>
                <p style={{ color: '#888', margin: 0, fontSize: '11px' }}>Há 2 horas</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#00b894', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏆</div>
              <div>
                <p style={{ color: '#fff', margin: 0, fontWeight: 'bold', fontSize: '14px' }}>Badge: "Estudioso"</p>
                <p style={{ color: '#888', margin: 0, fontSize: '11px' }}>Há 1 dia</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fdcb6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⭐</div>
              <div>
                <p style={{ color: '#fff', margin: 0, fontWeight: 'bold', fontSize: '14px' }}>100 pontos</p>
                <p style={{ color: '#888', margin: 0, fontSize: '11px' }}>Há 3 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="section-title">Ações Rápidas</h3>
      
      <div className="category-tabs">
        <button className="tab-btn active" onClick={onPlay}>Continuar Última Partida</button>
        <button className="tab-btn">Ver Estatísticas</button>
        <button className="tab-btn">Convidar Amigos</button>
      </div>

    </div>
  );
}

// ---------------------------
// Discover Page Components
// ---------------------------
function DiscoverPage({ onPlay }) {
  return (
    <div className="discover-container">
      
      {/* Hero Banner */}
      <div className="hero-card" onClick={onPlay} style={{cursor: 'pointer'}}>
        <img 
          src="/caminho_banner_bible.png" 
          alt="Trilha do Reino" 
          className="hero-card-image"
        />
        <div className="hero-card-content">
          <div className="tags">
            <span className="tag">Destaque</span>
            <span className="tag">Novo</span>
          </div>
          <h2>Boas-vindas ao Reino!</h2>
          <p>Comemore o aprendizado coletivo e ganhe recompensas ao trabalhar em conjunto. Explore trilhas temáticas espirituais.</p>
          <button className="hero-btn" onClick={(e) => { e.stopPropagation(); onPlay(); }}>Conheça o Caminho!</button>
        </div>
      </div>

      {/* Título de Seção */}
      <h3 className="section-title">Modos de Estudo</h3>
      
      {/* Sub Categorias (Tabs Horizontais) */}
      <div className="category-tabs">
        <button className="tab-btn active">Tudo</button>
        <button className="tab-btn">Participação</button>
        <button className="tab-btn">Competição em equipe</button>
        <button className="tab-btn">Colaboração</button>
      </div>

      <div style={{ height: '16px' }} />

      {/* Área de Cards na Grade */}
      <div className="grid-cards">
        
        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_classic.png" alt="Clássico" className="game-card-image" style={{backgroundColor: '#e21b3c'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg></div>
          <div className="game-card-content">
            <h3>Clássico (Estudo Individual)</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_reinos.png" alt="Reinos" className="game-card-image" style={{backgroundColor: '#25c0e8'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>
          <div className="game-card-content">
            <h3>Reinos das Cores</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_tesouro.png" alt="Tesouro" className="game-card-image" style={{backgroundColor: '#ffa602'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg></div>
          <div className="game-card-content">
            <h3>Baú do Tesouro</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_torre.png" alt="Torre" className="game-card-image" style={{backgroundColor: '#26890c'}} />
          <div className="shape-badge" style={{backgroundColor: '#e21b3c'}}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div className="game-card-content">
            <h3>Torre Mais Alta</h3>
          </div>
        </div>

      </div>

    </div>
  );
}

// Export wrapper
export default function App() {
  return <AppContent />;
}
