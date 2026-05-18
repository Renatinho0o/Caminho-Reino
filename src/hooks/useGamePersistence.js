import { useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar a persistência dos dados do jogo no localStorage
 * Salva automaticamente o progresso do usuário (chapters concluídos, inventário, pontuação total)
 * Os dados são salvos vinculados ao usuário logado (por user ID)
 */
export function useGamePersistence({
  chaptersCompleted,
  inventory,
  totalScore,
  setChaptersCompleted,
  setInventory,
  setTotalScore,
  userId = null // ID do usuário para vincular os dados
}) {
  // Criar chave de armazenamento específica do usuário
  const STORAGE_KEY = userId ? `caminhoReinoGameData_${userId}` : 'caminhoReinoGameData';

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const { chaptersCompleted: savedChapters, inventory: savedInventory, totalScore: savedScore } = JSON.parse(savedData);
          
          // Restaurar dados salvos
          if (savedChapters && Array.isArray(savedChapters)) {
            setChaptersCompleted(savedChapters);
          }
          if (savedInventory && Array.isArray(savedInventory)) {
            setInventory(savedInventory);
          }
          if (typeof savedScore === 'number') {
            setTotalScore(savedScore);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do jogo:', error);
      }
    };

    loadSavedData();
  }, []); // Executar apenas uma vez ao montar o componente

  // Salvar dados sempre que mudam
  useEffect(() => {
    const saveData = () => {
      try {
        const gameData = {
          chaptersCompleted,
          inventory,
          totalScore,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
      } catch (error) {
        console.error('Erro ao salvar dados do jogo:', error);
      }
    };

    // Adicionar pequeno delay para evitar salvamentos muito frequentes
    const timer = setTimeout(saveData, 500);
    return () => clearTimeout(timer);
  }, [chaptersCompleted, inventory, totalScore]);

  /**
   * Função para limpar dados salvos (útil para resetar o progresso)
   */
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setChaptersCompleted([]);
      setInventory([]);
      setTotalScore(0);
    } catch (error) {
      console.error('Erro ao limpar dados do jogo:', error);
    }
  };

  /**
   * Função para exportar dados do jogo (para backup)
   */
  const exportGameData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const dataStr = JSON.stringify(JSON.parse(savedData), null, 2);
        return dataStr;
      }
      return null;
    } catch (error) {
      console.error('Erro ao exportar dados do jogo:', error);
      return null;
    }
  };

  /**
   * Função para importar dados do jogo
   */
  const importGameData = (dataStr) => {
    try {
      const importedData = JSON.parse(dataStr);
      if (importedData.chaptersCompleted && importedData.inventory !== undefined) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(importedData));
        
        // Restaurar dados importados
        if (Array.isArray(importedData.chaptersCompleted)) {
          setChaptersCompleted(importedData.chaptersCompleted);
        }
        if (Array.isArray(importedData.inventory)) {
          setInventory(importedData.inventory);
        }
        if (typeof importedData.totalScore === 'number') {
          setTotalScore(importedData.totalScore);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao importar dados do jogo:', error);
      return false;
    }
  };

  return {
    clearSavedData,
    exportGameData,
    importGameData
  };
}
