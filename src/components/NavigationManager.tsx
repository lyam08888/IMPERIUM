import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

const NavigationContainer = styled(Paper)({
  background: 'linear-gradient(135deg, var(--dark-marble) 0%, var(--dark-stone) 100%)',
  borderRadius: '1rem',
  border: '2px solid var(--border-gold)',
  padding: '2rem',
  margin: '2rem auto',
  maxWidth: '800px',
  textAlign: 'center'
});

const SectionTitle = styled(Typography)({
  color: 'var(--gold-primary)',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontFamily: 'Cinzel, serif'
});

const SectionDescription = styled(Typography)({
  color: 'var(--text-muted)',
  fontSize: '1.1rem',
  marginBottom: '2rem',
  lineHeight: 1.6
});

const SectionGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem'
});

const SectionCard = styled(Paper)({
  background: 'rgba(15, 23, 42, 0.8)',
  border: '1px solid var(--border-gold)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px var(--shadow-gold)',
    background: 'rgba(217, 119, 6, 0.1)'
  }
});

const SectionIcon = styled(Box)({
  fontSize: '3rem',
  marginBottom: '1rem',
  color: 'var(--gold-light)'
});

const SectionCardTitle = styled(Typography)({
  color: 'var(--gold-light)',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
});

const SectionCardDescription = styled(Typography)({
  color: 'var(--text-muted)',
  fontSize: '0.9rem',
  lineHeight: 1.4
});

const ComingSoonBadge = styled(Box)({
  background: 'linear-gradient(135deg, var(--roman-red), #ef4444)',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '1rem',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  marginTop: '0.5rem',
  display: 'inline-block'
});

interface NavigationSection {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  pages: string[];
}

const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    key: 'empire',
    title: 'Empire',
    description: 'Gérez votre cité, explorez le monde et développez vos provinces',
    icon: <HomeIcon sx={{ fontSize: 'inherit' }} />,
    available: true,
    pages: ['Ma Cité', 'Monde', 'Province']
  },
  {
    key: 'development',
    title: 'Développement',
    description: 'Recherchez de nouvelles technologies et développez votre commerce',
    icon: <SchoolIcon sx={{ fontSize: 'inherit' }} />,
    available: false,
    pages: ['Académie', 'Commerce']
  },
  {
    key: 'military',
    title: 'Militaire',
    description: 'Entraînez vos légions, construisez votre flotte et planifiez vos batailles',
    icon: <SecurityIcon sx={{ fontSize: 'inherit' }} />,
    available: false,
    pages: ['Légions', 'Flotte', 'Simulateur']
  },
  {
    key: 'social',
    title: 'Social',
    description: 'Négociez avec d\'autres joueurs, formez des alliances et communiquez',
    icon: <PeopleIcon sx={{ fontSize: 'inherit' }} />,
    available: false,
    pages: ['Diplomatie', 'Alliance', 'Messages']
  },
  {
    key: 'premium',
    title: 'Premium',
    description: 'Accédez aux fonctionnalités avancées et aux bonus exclusifs',
    icon: <StarIcon sx={{ fontSize: 'inherit' }} />,
    available: false,
    pages: ['Premium']
  }
];

interface NavigationManagerProps {
  onSectionSelect?: (sectionKey: string) => void;
  currentSection?: string;
}

const NavigationManager: React.FC<NavigationManagerProps> = ({
  onSectionSelect,
  currentSection = 'empire'
}) => {
  const [selectedSection, setSelectedSection] = useState<NavigationSection | null>(
    NAVIGATION_SECTIONS.find(s => s.key === currentSection) || NAVIGATION_SECTIONS[0]
  );

  const handleSectionClick = (section: NavigationSection) => {
    if (section.available) {
      setSelectedSection(section);
      onSectionSelect?.(section.key);
    }
  };

  const handleBackToGame = () => {
    // This would typically navigate back to the main game interface
    window.location.reload();
  };

  return (
    <NavigationContainer elevation={3}>
      <SectionTitle>
        🏛️ Navigation IMPERIUM
      </SectionTitle>
      
      <SectionDescription>
        Choisissez une section pour accéder aux différentes fonctionnalités de votre empire.
        Actuellement, seule la section Empire est disponible dans cette version de démonstration.
      </SectionDescription>

      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={handleBackToGame}
        sx={{
          background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--gold-secondary), var(--gold-light))',
            transform: 'translateY(-2px)'
          }
        }}
      >
        Retour au Jeu
      </Button>

      <SectionGrid>
        {NAVIGATION_SECTIONS.map((section) => (
          <SectionCard
            key={section.key}
            onClick={() => handleSectionClick(section)}
            elevation={2}
            sx={{
              opacity: section.available ? 1 : 0.7,
              cursor: section.available ? 'pointer' : 'not-allowed'
            }}
          >
            <SectionIcon>
              {section.icon}
            </SectionIcon>
            
            <SectionCardTitle>
              {section.title}
            </SectionCardTitle>
            
            <SectionCardDescription>
              {section.description}
            </SectionCardDescription>

            <Stack spacing={0.5} sx={{ marginTop: '1rem' }}>
              {section.pages.map((page, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem'
                  }}
                >
                  • {page}
                </Typography>
              ))}
            </Stack>

            {!section.available && (
              <ComingSoonBadge>
                Bientôt disponible
              </ComingSoonBadge>
            )}
          </SectionCard>
        ))}
      </SectionGrid>

      {selectedSection && (
        <Box sx={{ marginTop: '2rem', padding: '1rem', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '0.5rem' }}>
          <Typography variant="body2" sx={{ color: 'var(--gold-light)', fontWeight: 'bold' }}>
            Section sélectionnée : {selectedSection.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
            {selectedSection.description}
          </Typography>
        </Box>
      )}
    </NavigationContainer>
  );
};

export default NavigationManager;