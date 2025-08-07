import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  IconButton,
  Paper,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TutorialDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(135deg, var(--dark-marble) 0%, var(--dark-stone) 100%)',
    border: '3px solid var(--gold-primary)',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    maxWidth: '500px',
    position: 'relative',
    overflow: 'visible'
  }
}));

const TutorialArrow = styled(Box)({
  position: 'absolute',
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '20px solid transparent',
  borderRight: '20px solid transparent',
  borderBottom: '20px solid var(--gold-primary)',
  zIndex: 1
});

const TutorialTitle = styled(DialogTitle)({
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-light))',
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  padding: '1rem 2rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpattern id=\'sparkle\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'white\' opacity=\'0.3\'/%3E%3C/pattern%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23sparkle)\'/%3E%3C/svg%3E")',
    opacity: 0.2,
    pointerEvents: 'none'
  }
});

const TutorialContent = styled(DialogContent)({
  padding: '2rem',
  color: 'var(--text-light)',
  fontSize: '1.1rem',
  lineHeight: 1.6,
  textAlign: 'center'
});

const StepIndicator = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem'
});

const StepDot = styled(Box)<{ active?: boolean; completed?: boolean }>(({ active, completed }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: completed ? 'var(--success-green)' : active ? 'var(--gold-primary)' : 'var(--text-muted)',
  transition: 'all 0.3s ease',
  transform: active ? 'scale(1.3)' : 'scale(1)'
}));

const NextButton = styled(Button)({
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.75rem 2rem',
  borderRadius: '2rem',
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    background: 'linear-gradient(135deg, var(--gold-secondary), var(--gold-light))',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px var(--shadow-gold)'
  }
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

interface TutorialContent {
  title: string;
  content: string;
  target: string;
}

interface TutorialPopupProps {
  step: number;
  content: TutorialContent | null;
  onNext: () => void;
  onClose: () => void;
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ step, content, onNext, onClose }) => {
  if (!content) return null;

  const totalSteps = 5;
  const isLastStep = step >= totalSteps - 1;

  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < step) return <CheckCircleIcon fontSize="small" />;
    if (stepIndex === step) return <span>🎯</span>;
    return <span>⭕</span>;
  };

  const getStepTitle = () => {
    const titles = [
      "🏛️ Découverte de la Cité",
      "🏗️ Construction",
      "💰 Gestion des Ressources", 
      "⬆️ Amélioration",
      "🎉 Félicitations !"
    ];
    return titles[step] || content.title;
  };

  return (
    <TutorialDialog
      open={true}
      onClose={onClose}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
    >
      <TutorialArrow />
      <CloseButton onClick={onClose}>
        <ClearIcon />
      </CloseButton>
      
      <TutorialTitle>
        {getStepTitle()}
      </TutorialTitle>
      
      <TutorialContent>
        <StepIndicator>
          {Array.from({ length: totalSteps }, (_, index) => (
            <React.Fragment key={index}>
              <StepDot 
                active={index === step} 
                completed={index < step}
              />
              {index < totalSteps - 1 && (
                <Box 
                  sx={{ 
                    width: '20px', 
                    height: '2px', 
                    background: index < step ? 'var(--success-green)' : 'var(--text-muted)',
                    transition: 'all 0.3s ease'
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </StepIndicator>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {content.content}
        </Typography>

        {step === 0 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(217, 119, 6, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              💡 <strong>Astuce :</strong> L'Hôtel de Ville est le cœur de votre cité. 
              Plus son niveau est élevé, plus vous pouvez construire de bâtiments !
            </Typography>
          </Box>
        )}

        {step === 1 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(217, 119, 6, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              🏗️ <strong>Conseil :</strong> Commencez par construire des maisons pour augmenter 
              votre population, puis des mines pour générer des ressources !
            </Typography>
          </Box>
        )}

        {step === 2 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(217, 119, 6, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              💰 <strong>Info :</strong> Chaque mine produit des ressources en continu. 
              Plus le niveau est élevé, plus la production est importante !
            </Typography>
          </Box>
        )}

        {step === 3 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(217, 119, 6, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              ⬆️ <strong>Stratégie :</strong> Améliorez vos bâtiments de production en priorité 
              pour avoir plus de ressources pour vos futures constructions !
            </Typography>
          </Box>
        )}

        {step === 4 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'var(--success-green)' }}>
              🎉 Vous maîtrisez maintenant les bases ! Continuez à développer votre cité 
              pour devenir le plus grand empereur romain de tous les temps !
            </Typography>
          </Box>
        )}
      </TutorialContent>
      
      <DialogActions sx={{ padding: '1rem 2rem 2rem', justifyContent: 'center' }}>
        <NextButton
          onClick={isLastStep ? onClose : onNext}
          endIcon={isLastStep ? <CheckCircleIcon /> : <ArrowForwardIcon />}
          variant="contained"
        >
          {isLastStep ? 'Terminer le tutoriel' : 'Suivant'}
        </NextButton>
      </DialogActions>
    </TutorialDialog>
  );
};

export default TutorialPopup;