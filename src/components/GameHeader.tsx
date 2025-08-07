import React, { useState } from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { GameResources } from './CityMap';
import NavigationDrawer, { MenuButton } from './NavigationDrawer';

const HeaderContainer = styled(Box)({
  background: 'linear-gradient(135deg, var(--dark-marble) 0%, var(--dark-stone) 100%)',
  backdropFilter: 'blur(10px)',
  borderBottom: '2px solid var(--border-gold)',
  padding: '1rem 2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  zIndex: 100
});

const HeaderContent = styled(Box)({
  maxWidth: '1600px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '1rem'
  }
});

const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
});

const Logo = styled(Typography)({
  fontFamily: 'Cinzel, serif',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-light))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  letterSpacing: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'drop-shadow(0 0 10px var(--shadow-gold))'
  },
  '@media (max-width: 768px)': {
    fontSize: '2rem'
  }
});

const ResourcesDisplay = styled(Box)({
  display: 'flex',
  gap: '1rem',
  background: 'rgba(15, 23, 42, 0.8)',
  padding: '0.75rem 1.5rem',
  borderRadius: '1rem',
  border: '2px solid var(--border-gold)',
  backdropFilter: 'blur(10px)',
  '@media (max-width: 768px)': {
    flexWrap: 'wrap',
    gap: '0.5rem'
  }
});

const ResourceChip = styled(Chip)({
  background: 'rgba(217, 119, 6, 0.1)',
  color: 'var(--gold-light)',
  fontWeight: 'bold',
  padding: '0.3rem 0.8rem',
  borderRadius: '0.5rem',
  border: '1px solid var(--border-gold)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(217, 119, 6, 0.2)',
    transform: 'translateY(-2px)'
  },
  '& .MuiChip-icon': {
    fontSize: '1.3rem',
    filter: 'drop-shadow(0 0 5px var(--shadow-gold))'
  },
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
    padding: '0.2rem 0.5rem'
  }
});

const PlayerInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  '@media (max-width: 768px)': {
    display: 'none'
  }
});

const PlayerAvatar = styled(Avatar)({
  width: '40px',
  height: '40px',
  background: 'linear-gradient(135deg, var(--roman-red), var(--roman-purple))',
  border: '2px solid var(--gold-primary)',
  fontSize: '1.2rem',
  fontWeight: 'bold'
});

const PlayerDetails = styled(Box)({
  fontSize: '0.9rem'
});

const PlayerName = styled(Typography)({
  color: 'var(--gold-light)',
  fontWeight: 'bold'
});

const PlayerLevel = styled(Typography)({
  color: 'var(--text-muted)'
});

interface GameHeaderProps {
  resources: GameResources;
  playerName?: string;
  playerTitle?: string;
  playerLevel?: number;
  onNavigate?: (pageKey: string) => void;
  currentPage?: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  resources,
  playerName = 'Marcus Aurelius',
  playerTitle = 'Consul',
  playerLevel = 12,
  onNavigate,
  currentPage = 'cite'
}) => {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const handleNavigationToggle = () => {
    setNavigationOpen(!navigationOpen);
  };

  const handleNavigationClose = () => {
    setNavigationOpen(false);
  };
  const resourcesData = [
    { key: 'gold', icon: '💰', value: resources.gold },
    { key: 'wood', icon: '🌲', value: resources.wood },
    { key: 'stone', icon: '🪨', value: resources.stone },
    { key: 'population', icon: '👥', value: resources.population },
    { key: 'happiness', icon: '😊', value: `${resources.happiness}%` }
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <MenuButton onClick={handleNavigationToggle}>
            <MenuIcon />
          </MenuButton>
          <Logo variant="h1">
            IMPERIUM
          </Logo>
        </LeftSection>
        
        <ResourcesDisplay>
          {resourcesData.map((resource) => (
            <ResourceChip
              key={resource.key}
              icon={<span>{resource.icon}</span>}
              label={typeof resource.value === 'number' ? 
                Math.floor(resource.value).toLocaleString() : 
                resource.value
              }
              variant="filled"
            />
          ))}
        </ResourcesDisplay>
        
        <PlayerInfo>
          <PlayerAvatar>
            {playerName.charAt(0)}
          </PlayerAvatar>
          <PlayerDetails>
            <PlayerName variant="body2">
              {playerName}
            </PlayerName>
            <PlayerLevel variant="caption">
              {playerTitle} - Niv. {playerLevel}
            </PlayerLevel>
          </PlayerDetails>
        </PlayerInfo>
      </HeaderContent>

      <NavigationDrawer
        open={navigationOpen}
        onClose={handleNavigationClose}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </HeaderContainer>
  );
};

export default GameHeader;