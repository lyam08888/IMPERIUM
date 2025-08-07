import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip, 
  LinearProgress, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ConstructionIcon from '@mui/icons-material/Construction';
import UpgradeIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import { Building, GameResources } from './CityMap';

const SlotContainer = styled(Box)<{ occupied?: boolean; upgrading?: boolean; tutorialHighlight?: boolean }>(({ occupied, upgrading, tutorialHighlight }) => ({
  background: occupied 
    ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.3), rgba(245, 158, 11, 0.2))'
    : 'rgba(30, 41, 59, 0.6)',
  border: tutorialHighlight 
    ? '3px solid #fbbf24'
    : occupied 
      ? '2px solid var(--border-gold)' 
      : '2px dashed var(--text-muted)',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minHeight: '100px',
  padding: '0.5rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: tutorialHighlight ? '0 0 20px rgba(251, 191, 36, 0.5)' : 'none',
  animation: tutorialHighlight ? 'pulse 2s infinite' : 'none',
  '&:hover': {
    borderColor: 'var(--gold-light)',
    background: occupied 
      ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.4), rgba(245, 158, 11, 0.3))'
      : 'rgba(217, 119, 6, 0.1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
  },
  '&::before': upgrading ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
    animation: 'shimmer 2s infinite'
  } : {},
  '@keyframes pulse': {
    '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' },
    '50%': { boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)' }
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  }
}));

const BuildingIcon = styled(Typography)({
  fontSize: '2.5rem',
  marginBottom: '0.3rem',
  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
  '@media (max-width: 768px)': {
    fontSize: '2rem'
  }
});

const BuildingName = styled(Typography)({
  color: 'var(--text-light)',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  textAlign: 'center',
  lineHeight: 1.2,
  '@media (max-width: 768px)': {
    fontSize: '0.7rem'
  }
});

const BuildingLevel = styled(Chip)({
  position: 'absolute',
  top: '4px',
  right: '4px',
  background: 'var(--gold-primary)',
  color: 'white',
  fontSize: '0.7rem',
  height: '20px',
  minWidth: '20px'
});

const UpgradeProgress = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0,0,0,0.7)',
  padding: '4px 8px'
});

const ActionButton = styled(IconButton)({
  position: 'absolute',
  bottom: '4px',
  left: '4px',
  background: 'rgba(217, 119, 6, 0.8)',
  color: 'white',
  width: '24px',
  height: '24px',
  '&:hover': {
    background: 'var(--gold-primary)',
    transform: 'scale(1.1)'
  }
});

interface BuildingSlotProps {
  x: number;
  y: number;
  building?: Building;
  onBuildingClick: (building: Building) => void;
  onUpgrade: (buildingId: number) => void;
  onConstruct: (x: number, y: number, buildingType: string) => void;
  resources: GameResources;
  tutorialActive?: boolean;
  currentTutorialStep?: number;
}

const BuildingSlot: React.FC<BuildingSlotProps> = ({
  x,
  y,
  building,
  onBuildingClick,
  onUpgrade,
  onConstruct,
  resources,
  tutorialActive = false,
  currentTutorialStep = 0
}) => {
  const [showBuildingDialog, setShowBuildingDialog] = useState(false);
  const [showConstructDialog, setShowConstructDialog] = useState(false);

  const isTutorialHighlight = () => {
    if (!tutorialActive) return false;
    
    if (currentTutorialStep === 0 && building?.type === 'townhall') return true;
    if (currentTutorialStep === 1 && !building) return true;
    if (currentTutorialStep === 2 && building?.type === 'goldmine') return true;
    
    return false;
  };

  const handleClick = () => {
    if (building) {
      onBuildingClick(building);
      setShowBuildingDialog(true);
    } else {
      setShowConstructDialog(true);
    }
  };

  const handleUpgrade = () => {
    if (building) {
      onUpgrade(building.id);
      setShowBuildingDialog(false);
    }
  };

  const handleConstruct = (buildingType: string) => {
    onConstruct(x, y, buildingType);
    setShowConstructDialog(false);
  };

  const canAffordUpgrade = () => {
    if (!building?.cost) return false;
    return resources.gold >= building.cost.gold &&
           resources.wood >= building.cost.wood &&
           resources.stone >= building.cost.stone;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const buildingOptions = [
    { type: 'house', name: 'Maison', icon: '🏠', cost: { gold: 200, wood: 100, stone: 50 } },
    { type: 'barracks', name: 'Caserne', icon: '⚔️', cost: { gold: 800, wood: 400, stone: 200 } },
    { type: 'goldmine', name: 'Mine d\'Or', icon: '💰', cost: { gold: 500, wood: 200, stone: 400 } },
    { type: 'sawmill', name: 'Scierie', icon: '🌲', cost: { gold: 300, wood: 150, stone: 100 } },
    { type: 'quarry', name: 'Carrière', icon: '🪨', cost: { gold: 400, wood: 100, stone: 200 } },
    { type: 'farm', name: 'Ferme', icon: '🌾', cost: { gold: 250, wood: 200, stone: 100 } },
    { type: 'tower', name: 'Tour de Défense', icon: '🗼', cost: { gold: 1000, wood: 300, stone: 800 } }
  ];

  return (
    <>
      <SlotContainer
        occupied={!!building}
        upgrading={building?.upgrading}
        tutorialHighlight={isTutorialHighlight()}
        onClick={handleClick}
      >
        {building ? (
          <>
            <BuildingIcon>{building.icon}</BuildingIcon>
            <BuildingName>{building.name}</BuildingName>
            <BuildingLevel label={`${building.level}`} size="small" />
            
            {building.upgrading && building.upgradeTimeLeft && (
              <UpgradeProgress>
                <LinearProgress 
                  variant="determinate" 
                  value={((30 + (building.level * 10)) - building.upgradeTimeLeft) / (30 + (building.level * 10)) * 100}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="caption" color="white">
                  {formatTime(building.upgradeTimeLeft)}
                </Typography>
              </UpgradeProgress>
            )}
            
            {!building.upgrading && building.level < building.maxLevel && (
              <ActionButton size="small" onClick={(e) => { e.stopPropagation(); handleUpgrade(); }}>
                <UpgradeIcon fontSize="small" />
              </ActionButton>
            )}
          </>
        ) : (
          <>
            <BuildingIcon sx={{ opacity: 0.5 }}>
              <AddIcon fontSize="large" />
            </BuildingIcon>
            <BuildingName sx={{ color: 'var(--text-muted)' }}>
              Construire
            </BuildingName>
          </>
        )}
      </SlotContainer>

      {/* Building Details Dialog */}
      <Dialog open={showBuildingDialog} onClose={() => setShowBuildingDialog(false)} maxWidth="sm" fullWidth>
        {building && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6">{building.icon} {building.name}</Typography>
                <Chip label={`Niveau ${building.level}`} color="primary" />
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                {building.production && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Production:</Typography>
                    <Typography>
                      {building.production.type === 'gold' ? '💰' : 
                       building.production.type === 'wood' ? '🌲' : '🪨'} 
                      +{building.production.amount * building.level}/h
                    </Typography>
                  </Box>
                )}
                
                {building.cost && building.level < building.maxLevel && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Coût d'amélioration (Niveau {building.level + 1}):
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip 
                        icon={<span>💰</span>} 
                        label={building.cost.gold.toLocaleString()} 
                        color={resources.gold >= building.cost.gold ? "success" : "error"}
                        size="small"
                      />
                      <Chip 
                        icon={<span>🌲</span>} 
                        label={building.cost.wood.toLocaleString()} 
                        color={resources.wood >= building.cost.wood ? "success" : "error"}
                        size="small"
                      />
                      <Chip 
                        icon={<span>🪨</span>} 
                        label={building.cost.stone.toLocaleString()} 
                        color={resources.stone >= building.cost.stone ? "success" : "error"}
                        size="small"
                      />
                    </Stack>
                  </Box>
                )}
                
                {building.upgrading && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Amélioration en cours:</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={building.upgradeTimeLeft ? 
                        ((30 + (building.level * 10)) - building.upgradeTimeLeft) / (30 + (building.level * 10)) * 100 : 0}
                    />
                    <Typography variant="caption">
                      Temps restant: {building.upgradeTimeLeft ? formatTime(building.upgradeTimeLeft) : '0:00'}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowBuildingDialog(false)}>Fermer</Button>
              {!building.upgrading && building.level < building.maxLevel && (
                <Button 
                  variant="contained" 
                  onClick={handleUpgrade}
                  disabled={!canAffordUpgrade()}
                  startIcon={<UpgradeIcon />}
                >
                  Améliorer
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Construction Dialog */}
      <Dialog open={showConstructDialog} onClose={() => setShowConstructDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Choisir un bâtiment à construire</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {buildingOptions.map((option) => {
              const canAfford = resources.gold >= option.cost.gold &&
                               resources.wood >= option.cost.wood &&
                               resources.stone >= option.cost.stone;
              
              return (
                <Box
                  key={option.type}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    border: '1px solid var(--border-gold)',
                    borderRadius: 1,
                    cursor: canAfford ? 'pointer' : 'not-allowed',
                    opacity: canAfford ? 1 : 0.5,
                    '&:hover': canAfford ? {
                      backgroundColor: 'rgba(217, 119, 6, 0.1)'
                    } : {}
                  }}
                  onClick={() => canAfford && handleConstruct(option.type)}
                >
                  <Typography variant="h4">{option.icon}</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{option.name}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip 
                        icon={<span>💰</span>} 
                        label={option.cost.gold.toLocaleString()} 
                        color={resources.gold >= option.cost.gold ? "success" : "error"}
                        size="small"
                      />
                      <Chip 
                        icon={<span>🌲</span>} 
                        label={option.cost.wood.toLocaleString()} 
                        color={resources.wood >= option.cost.wood ? "success" : "error"}
                        size="small"
                      />
                      <Chip 
                        icon={<span>🪨</span>} 
                        label={option.cost.stone.toLocaleString()} 
                        color={resources.stone >= option.cost.stone ? "success" : "error"}
                        size="small"
                      />
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConstructDialog(false)}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BuildingSlot;