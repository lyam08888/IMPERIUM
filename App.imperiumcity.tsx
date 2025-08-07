import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Snackbar, Alert } from '@mui/material';
import theme from './src/theme';
import StartScreen from './src/components/StartScreen';
import GameHeader from './src/components/GameHeader';
import GameFooter from './src/components/GameFooter';
import TutorialManager from './src/components/TutorialManager';
import { GameResources } from './src/components/CityMap';

interface GameState {
  resources: GameResources;
  player: {
    name: string;
    title: string;
    level: number;
  };
  tutorial: {
    completed: boolean;
  };
}

const initialGameState: GameState = {
  resources: {
    gold: 5000,
    wood: 2500,
    stone: 1800,
    population: 150,
    happiness: 85
  },
  player: {
    name: 'Marcus Aurelius',
    title: 'Consul',
    level: 12
  },
  tutorial: {
    completed: localStorage.getItem('imperiumTutorialCompleted') === 'true'
  }
};

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [eventLog, setEventLog] = useState('Bienvenue dans IMPERIUM !');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    // Load saved game state
    const savedState = localStorage.getItem('imperiumGameState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setGameState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load saved game state:', error);
      }
    }
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
    setEventLog('🏛️ Empire initialisé avec succès !');
    
    // Auto-start tutorial for new players
    if (!gameState.tutorial.completed) {
      setTimeout(() => {
        showNotification('Tutoriel disponible ! Cliquez sur le bouton d\'aide pour commencer.', 'info');
      }, 2000);
    }
  };

  const handleSaveGame = () => {
    try {
      localStorage.setItem('imperiumGameState', JSON.stringify(gameState));
      showNotification('Partie sauvegardée avec succès !', 'success');
      setEventLog('💾 Partie sauvegardée');
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error');
      console.error('Save failed:', error);
    }
  };

  const handleLoadGame = () => {
    try {
      const savedState = localStorage.getItem('imperiumGameState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState(prev => ({ ...prev, ...parsed }));
        showNotification('Partie chargée avec succès !', 'success');
        setEventLog('📂 Partie chargée');
      } else {
        showNotification('Aucune sauvegarde trouvée', 'info');
      }
    } catch (error) {
      showNotification('Erreur lors du chargement', 'error');
      console.error('Load failed:', error);
    }
  };

  const handleTutorial = () => {
    showNotification('Tutoriel démarré ! Suivez les instructions.', 'info');
    setEventLog('📚 Tutoriel en cours...');
  };

  const handleObjectives = () => {
    showNotification('Objectifs : Développez votre cité et votre empire !', 'info');
    setEventLog('🎯 Consultation des objectifs');
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const updateResources = (newResources: Partial<GameResources>) => {
    setGameState(prev => ({
      ...prev,
      resources: { ...prev.resources, ...newResources }
    }));
  };

  const updateEventLog = (message: string) => {
    setEventLog(message);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `
            radial-gradient(circle at 20% 20%, rgba(217, 119, 6, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
          `,
          color: '#e2e8f0',
          fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Animated particles background */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="particles" patternUnits="userSpaceOnUse" width="50" height="50"><circle cx="10" cy="10" r="1" fill="%23fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></circle><circle cx="40" cy="25" r="0.5" fill="%23d97706" opacity="0.4"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/></circle><circle cx="25" cy="40" r="0.8" fill="%23fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="5s" repeatCount="indefinite"/></circle></pattern></defs><rect width="100" height="100" fill="url(%23particles)"/></svg>')`,
              opacity: 0.3
            }
          }}
        />

        {/* Start Screen */}
        <StartScreen 
          visible={!gameStarted} 
          onStart={handleStartGame} 
        />

        {/* Main Game Interface */}
        {gameStarted && (
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 10, 
              height: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Game Header */}
            <GameHeader
              resources={gameState.resources}
              playerName={gameState.player.name}
              playerTitle={gameState.player.title}
              playerLevel={gameState.player.level}
            />

            {/* Main Game Content */}
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <TutorialManager 
                autoStart={!gameState.tutorial.completed}
                onResourceUpdate={updateResources}
                onEventLog={updateEventLog}
              />
            </Box>

            {/* Game Footer */}
            <GameFooter
              eventLog={eventLog}
              onSave={handleSaveGame}
              onLoad={handleLoadGame}
              onTutorial={handleTutorial}
              onObjectives={handleObjectives}
            />
          </Box>
        )}

        {/* Notification System */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{
              background: notification.severity === 'success' 
                ? 'linear-gradient(135deg, var(--success-green), #16a34a)'
                : notification.severity === 'error'
                ? 'linear-gradient(135deg, var(--roman-red), #ef4444)'
                : 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;