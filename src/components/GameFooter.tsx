import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';

const FooterContainer = styled(Box)({
  background: 'linear-gradient(135deg, var(--dark-marble) 0%, var(--dark-stone) 100%)',
  borderTop: '2px solid var(--border-gold)',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  zIndex: 100,
  '@media (max-width: 768px)': {
    padding: '0.75rem 1rem',
    flexDirection: 'column',
    gap: '0.5rem'
  }
});

const EventLog = styled(Typography)({
  color: 'var(--text-muted)',
  fontStyle: 'italic',
  fontSize: '0.9rem',
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
    textAlign: 'center'
  }
});

const GameActions = styled(Stack)({
  direction: 'row',
  gap: '1rem',
  '@media (max-width: 768px)': {
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

const FooterButton = styled(Button)({
  background: 'rgba(30, 41, 59, 0.8)',
  border: '1px solid var(--border-gold)',
  color: 'var(--text-light)',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  transition: 'all 0.3s ease',
  fontSize: '0.9rem',
  minWidth: 'auto',
  '&:hover': {
    background: 'var(--gold-primary)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px var(--shadow-gold)'
  },
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
    padding: '0.4rem 0.8rem'
  }
});

interface GameFooterProps {
  eventLog?: string;
  onSave?: () => void;
  onLoad?: () => void;
  onTutorial?: () => void;
  onObjectives?: () => void;
}

const GameFooter: React.FC<GameFooterProps> = ({
  eventLog = 'Bienvenue dans IMPERIUM !',
  onSave,
  onLoad,
  onTutorial,
  onObjectives
}) => {
  return (
    <FooterContainer>
      <EventLog>
        {eventLog}
      </EventLog>
      
      <GameActions direction="row" spacing={1}>
        <FooterButton
          startIcon={<SaveIcon />}
          onClick={onSave}
          variant="outlined"
        >
          Sauvegarder
        </FooterButton>
        
        <FooterButton
          startIcon={<FolderOpenIcon />}
          onClick={onLoad}
          variant="outlined"
        >
          Charger
        </FooterButton>
        
        <FooterButton
          startIcon={<HelpIcon />}
          onClick={onTutorial}
          variant="outlined"
        >
          Tutoriel
        </FooterButton>
        
        <FooterButton
          startIcon={<AssignmentIcon />}
          onClick={onObjectives}
          variant="outlined"
        >
          Objectifs
        </FooterButton>
      </GameActions>
    </FooterContainer>
  );
};

export default GameFooter;