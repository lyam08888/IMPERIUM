import React, { useState, useEffect } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpIcon from '@mui/icons-material/Help';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CityMap from './CityMap';

const TutorialContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%'
});

const TutorialFab = styled(Fab)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
  color: 'white',
  zIndex: 1000,
  '&:hover': {
    background: 'linear-gradient(135deg, var(--gold-secondary), var(--gold-light))',
    transform: 'scale(1.1)'
  }
});

const TutorialOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  zIndex: 999,
  pointerEvents: 'none'
});

interface TutorialManagerProps {
  autoStart?: boolean;
}

const TutorialManager: React.FC<TutorialManagerProps> = ({ autoStart = false }) => {
  const [tutorialActive, setTutorialActive] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    // Check if tutorial was already completed
    const completed = localStorage.getItem('imperiumTutorialCompleted');
    if (completed === 'true') {
      setTutorialCompleted(true);
    } else if (autoStart) {
      // Auto-start tutorial for new users
      setTimeout(() => {
        setTutorialActive(true);
      }, 1000);
    }
  }, [autoStart]);

  const handleTutorialStep = (step: number) => {
    setCurrentStep(step);
    
    // Complete tutorial when reaching the end
    if (step >= 5) {
      setTutorialActive(false);
      setTutorialCompleted(true);
      localStorage.setItem('imperiumTutorialCompleted', 'true');
    }
  };

  const startTutorial = () => {
    setCurrentStep(0);
    setTutorialActive(true);
  };

  const stopTutorial = () => {
    setTutorialActive(false);
  };

  return (
    <TutorialContainer>
      {tutorialActive && <TutorialOverlay />}
      
      <CityMap
        tutorialActive={tutorialActive}
        currentTutorialStep={currentStep}
        onTutorialStep={handleTutorialStep}
      />

      {!tutorialActive && (
        <Tooltip title={tutorialCompleted ? "Rejouer le tutoriel" : "Commencer le tutoriel"}>
          <TutorialFab onClick={startTutorial}>
            {tutorialCompleted ? <PlayArrowIcon /> : <HelpIcon />}
          </TutorialFab>
        </Tooltip>
      )}
    </TutorialContainer>
  );
};

export default TutorialManager;