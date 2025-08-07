import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const StartScreenContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'var(--dark-bg)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  transition: 'opacity 1s ease, visibility 1s ease'
});

const StartTitle = styled(Typography)({
  fontSize: '8vw',
  fontWeight: 'bold',
  fontFamily: 'Cinzel, serif',
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-light))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '4px 4px 10px rgba(0,0,0,0.7)',
  letterSpacing: '5px',
  animation: 'titleAppear 2s ease-out forwards',
  opacity: 0,
  transform: 'scale(0.8)',
  '@keyframes titleAppear': {
    to: {
      opacity: 1,
      transform: 'scale(1)'
    }
  },
  '@media (max-width: 768px)': {
    fontSize: '12vw'
  }
});

const StartButton = styled(Button)({
  marginTop: '3rem',
  padding: '1rem 2.5rem',
  fontSize: '1.5rem',
  fontFamily: 'Cormorant Garamond, serif',
  color: 'white',
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
  border: '2px solid var(--gold-light)',
  borderRadius: '1rem',
  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
  boxShadow: '0 5px 20px var(--shadow-gold)',
  transition: 'all 0.3s ease',
  animation: 'buttonAppear 2s ease-out 1s forwards',
  opacity: 0,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px var(--shadow-gold)',
    background: 'linear-gradient(135deg, var(--gold-secondary), var(--gold-light))'
  },
  '@keyframes buttonAppear': {
    to: {
      opacity: 1
    }
  }
});

const LoaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '2rem'
});

const LoaderText = styled(Typography)({
  color: 'var(--gold-light)',
  fontStyle: 'italic',
  fontSize: '1.2rem',
  textAlign: 'center'
});

interface StartScreenProps {
  onStart: () => void;
  visible: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, visible }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    
    // Simulate loading time then start the game
    setTimeout(() => {
      onStart();
    }, 2500);
  };

  if (!visible) return null;

  return (
    <Fade in={visible} timeout={1000}>
      <StartScreenContainer>
        <StartTitle variant="h1">
          IMPERIUM
        </StartTitle>
        
        {!loading ? (
          <StartButton
            variant="contained"
            size="large"
            onClick={handleStart}
          >
            Commencez à jouer
          </StartButton>
        ) : (
          <LoaderContainer>
            <LinearProgress 
              sx={{ 
                width: '300px', 
                height: '8px',
                borderRadius: '4px',
                backgroundColor: 'var(--border-gold)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, var(--gold-primary), var(--gold-light))'
                }
              }} 
            />
            <LoaderText>
              Bâtiment de l'Empire...
            </LoaderText>
          </LoaderContainer>
        )}
      </StartScreenContainer>
    </Fade>
  );
};

export default StartScreen;