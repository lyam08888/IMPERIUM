import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, LinearProgress, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ConstructionIcon from '@mui/icons-material/Construction';
import UpgradeIcon from '@mui/icons-material/TrendingUp';
import BuildingSlot from './BuildingSlot';
import TutorialPopup from './TutorialPopup';

const CityMapContainer = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    rgba(15, 23, 42, 0.9) 0%, 
    rgba(30, 41, 59, 0.8) 100%)`,
  borderRadius: '1rem',
  border: '2px solid var(--border-gold)',
  padding: '1.5rem',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '500px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><pattern id="grid" patternUnits="userSpaceOnUse" width="10" height="10"><rect width="10" height="10" fill="none" stroke="%23d97706" stroke-width="0.2" opacity="0.3"/></pattern><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
    opacity: 0.3,
    pointerEvents: 'none'
  }
}));

const BuildingsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gridTemplateRows: 'repeat(6, 1fr)',
  gap: '0.5rem',
  minHeight: '400px',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
  }
});

const MapHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: '1.5rem',
  position: 'relative',
  zIndex: 2
});

const MapTitle = styled(Typography)({
  color: 'var(--gold-primary)',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
});

const ResourceBar = styled(Box)({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginBottom: '1rem',
  flexWrap: 'wrap'
});

const ResourceChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
  color: 'white',
  fontWeight: 'bold',
  '& .MuiChip-icon': {
    color: 'white'
  }
}));

export interface Building {
  id: number;
  type: string;
  name: string;
  icon: string;
  level: number;
  maxLevel: number;
  occupied: boolean;
  x: number;
  y: number;
  upgrading: boolean;
  upgradeTimeLeft?: number;
  cost?: {
    gold: number;
    wood: number;
    stone: number;
  };
  production?: {
    type: string;
    amount: number;
  };
}

export interface GameResources {
  gold: number;
  wood: number;
  stone: number;
  population: number;
  happiness: number;
}

interface CityMapProps {
  onTutorialStep?: (step: number) => void;
  tutorialActive?: boolean;
  currentTutorialStep?: number;
}

const initialBuildings: Building[] = [
  { id: 1, type: 'townhall', name: 'Hôtel de Ville', icon: '🏛️', level: 1, maxLevel: 10, occupied: true, x: 2, y: 2, upgrading: false, cost: { gold: 1000, wood: 500, stone: 300 } },
  { id: 2, type: 'house', name: 'Maison', icon: '🏠', level: 1, maxLevel: 5, occupied: true, x: 1, y: 1, upgrading: false, cost: { gold: 200, wood: 100, stone: 50 } },
  { id: 3, type: 'barracks', name: 'Caserne', icon: '⚔️', level: 1, maxLevel: 8, occupied: true, x: 4, y: 1, upgrading: false, cost: { gold: 800, wood: 400, stone: 200 } },
  { id: 4, type: 'goldmine', name: 'Mine d\'Or', icon: '💰', level: 2, maxLevel: 12, occupied: true, x: 0, y: 3, upgrading: false, cost: { gold: 500, wood: 200, stone: 400 }, production: { type: 'gold', amount: 100 } },
  { id: 5, type: 'sawmill', name: 'Scierie', icon: '🌲', level: 1, maxLevel: 10, occupied: true, x: 5, y: 4, upgrading: false, cost: { gold: 300, wood: 150, stone: 100 }, production: { type: 'wood', amount: 80 } },
  { id: 6, type: 'quarry', name: 'Carrière', icon: '🪨', level: 1, maxLevel: 10, occupied: true, x: 1, y: 5, upgrading: false, cost: { gold: 400, wood: 100, stone: 200 }, production: { type: 'stone', amount: 60 } },
];

const initialResources: GameResources = {
  gold: 5000,
  wood: 2500,
  stone: 1800,
  population: 150,
  happiness: 85
};

const CityMap: React.FC<CityMapProps> = ({ 
  onTutorialStep, 
  tutorialActive = false, 
  currentTutorialStep = 0 
}) => {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [resources, setResources] = useState<GameResources>(initialResources);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showTutorial, setShowTutorial] = useState(tutorialActive);

  useEffect(() => {
    // Simulate resource production
    const interval = setInterval(() => {
      setResources(prev => {
        const newResources = { ...prev };
        buildings.forEach(building => {
          if (building.production && building.occupied && !building.upgrading) {
            const productionRate = building.production.amount * building.level * 0.1; // 10% per second
            if (building.production.type === 'gold') {
              newResources.gold += productionRate;
            } else if (building.production.type === 'wood') {
              newResources.wood += productionRate;
            } else if (building.production.type === 'stone') {
              newResources.stone += productionRate;
            }
          }
        });
        return newResources;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [buildings]);

  useEffect(() => {
    // Handle building upgrades
    const upgradeInterval = setInterval(() => {
      setBuildings(prev => prev.map(building => {
        if (building.upgrading && building.upgradeTimeLeft) {
          const newTimeLeft = building.upgradeTimeLeft - 1;
          if (newTimeLeft <= 0) {
            return {
              ...building,
              upgrading: false,
              upgradeTimeLeft: undefined,
              level: building.level + 1
            };
          }
          return { ...building, upgradeTimeLeft: newTimeLeft };
        }
        return building;
      }));
    }, 1000);

    return () => clearInterval(upgradeInterval);
  }, []);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    if (tutorialActive && onTutorialStep) {
      if (currentTutorialStep === 0 && building.type === 'townhall') {
        onTutorialStep(1);
      } else if (currentTutorialStep === 2 && building.type === 'goldmine') {
        onTutorialStep(3);
      }
    }
  };

  const handleUpgradeBuilding = (buildingId: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building || !building.cost) return;

    const canAfford = resources.gold >= building.cost.gold &&
                     resources.wood >= building.cost.wood &&
                     resources.stone >= building.cost.stone;

    if (canAfford && building.level < building.maxLevel) {
      setResources(prev => ({
        ...prev,
        gold: prev.gold - building.cost!.gold,
        wood: prev.wood - building.cost!.wood,
        stone: prev.stone - building.cost!.stone
      }));

      setBuildings(prev => prev.map(b => 
        b.id === buildingId 
          ? { ...b, upgrading: true, upgradeTimeLeft: 30 + (b.level * 10) } // Upgrade time increases with level
          : b
      ));

      if (tutorialActive && onTutorialStep && currentTutorialStep === 3) {
        onTutorialStep(4);
      }
    }
  };

  const handleConstructBuilding = (x: number, y: number, buildingType: string) => {
    const newBuilding: Building = {
      id: Date.now(),
      type: buildingType,
      name: getBuildingName(buildingType),
      icon: getBuildingIcon(buildingType),
      level: 1,
      maxLevel: getBuildingMaxLevel(buildingType),
      occupied: true,
      x,
      y,
      upgrading: false,
      cost: getBuildingCost(buildingType, 1)
    };

    if (newBuilding.cost) {
      const canAfford = resources.gold >= newBuilding.cost.gold &&
                       resources.wood >= newBuilding.cost.wood &&
                       resources.stone >= newBuilding.cost.stone;

      if (canAfford) {
        setResources(prev => ({
          ...prev,
          gold: prev.gold - newBuilding.cost!.gold,
          wood: prev.wood - newBuilding.cost!.wood,
          stone: prev.stone - newBuilding.cost!.stone
        }));

        setBuildings(prev => [...prev, newBuilding]);

        if (tutorialActive && onTutorialStep && currentTutorialStep === 1) {
          onTutorialStep(2);
        }
      }
    }
  };

  const getBuildingName = (type: string): string => {
    const names: { [key: string]: string } = {
      house: 'Maison',
      barracks: 'Caserne',
      goldmine: 'Mine d\'Or',
      sawmill: 'Scierie',
      quarry: 'Carrière',
      farm: 'Ferme',
      tower: 'Tour de Défense'
    };
    return names[type] || 'Bâtiment';
  };

  const getBuildingIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      house: '🏠',
      barracks: '⚔️',
      goldmine: '💰',
      sawmill: '🌲',
      quarry: '🪨',
      farm: '🌾',
      tower: '🗼'
    };
    return icons[type] || '🏗️';
  };

  const getBuildingMaxLevel = (type: string): number => {
    const maxLevels: { [key: string]: number } = {
      house: 5,
      barracks: 8,
      goldmine: 12,
      sawmill: 10,
      quarry: 10,
      farm: 8,
      tower: 15
    };
    return maxLevels[type] || 5;
  };

  const getBuildingCost = (type: string, level: number) => {
    const baseCosts: { [key: string]: { gold: number; wood: number; stone: number } } = {
      house: { gold: 200, wood: 100, stone: 50 },
      barracks: { gold: 800, wood: 400, stone: 200 },
      goldmine: { gold: 500, wood: 200, stone: 400 },
      sawmill: { gold: 300, wood: 150, stone: 100 },
      quarry: { gold: 400, wood: 100, stone: 200 },
      farm: { gold: 250, wood: 200, stone: 100 },
      tower: { gold: 1000, wood: 300, stone: 800 }
    };

    const baseCost = baseCosts[type] || { gold: 100, wood: 50, stone: 25 };
    const multiplier = Math.pow(1.5, level - 1);

    return {
      gold: Math.floor(baseCost.gold * multiplier),
      wood: Math.floor(baseCost.wood * multiplier),
      stone: Math.floor(baseCost.stone * multiplier)
    };
  };

  const renderGridSlots = () => {
    const slots = [];
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const building = buildings.find(b => b.x === x && b.y === y);
        slots.push(
          <BuildingSlot
            key={`${x}-${y}`}
            x={x}
            y={y}
            building={building}
            onBuildingClick={handleBuildingClick}
            onUpgrade={handleUpgradeBuilding}
            onConstruct={handleConstructBuilding}
            resources={resources}
            tutorialActive={tutorialActive}
            currentTutorialStep={currentTutorialStep}
          />
        );
      }
    }
    return slots;
  };

  const getTutorialContent = () => {
    switch (currentTutorialStep) {
      case 0:
        return {
          title: "Bienvenue dans votre cité !",
          content: "Cliquez sur l'Hôtel de Ville pour commencer votre aventure.",
          target: "townhall"
        };
      case 1:
        return {
          title: "Construire des bâtiments",
          content: "Cliquez sur un emplacement vide pour construire votre premier bâtiment.",
          target: "empty"
        };
      case 2:
        return {
          title: "Gérer les ressources",
          content: "Cliquez sur votre mine d'or pour voir sa production.",
          target: "goldmine"
        };
      case 3:
        return {
          title: "Améliorer les bâtiments",
          content: "Améliorez votre mine d'or pour augmenter sa production !",
          target: "upgrade"
        };
      case 4:
        return {
          title: "Félicitations !",
          content: "Vous maîtrisez maintenant les bases de la gestion de votre cité !",
          target: "complete"
        };
      default:
        return null;
    }
  };

  return (
    <CityMapContainer elevation={3}>
      <MapHeader>
        <MapTitle>🏛️ Ma Cité : Roma Aeterna</MapTitle>
        <ResourceBar>
          <ResourceChip
            icon={<span>💰</span>}
            label={`${Math.floor(resources.gold).toLocaleString()}`}
            variant="filled"
          />
          <ResourceChip
            icon={<span>🌲</span>}
            label={`${Math.floor(resources.wood).toLocaleString()}`}
            variant="filled"
          />
          <ResourceChip
            icon={<span>🪨</span>}
            label={`${Math.floor(resources.stone).toLocaleString()}`}
            variant="filled"
          />
          <ResourceChip
            icon={<span>👥</span>}
            label={`${resources.population}`}
            variant="filled"
          />
          <ResourceChip
            icon={<span>😊</span>}
            label={`${resources.happiness}%`}
            variant="filled"
          />
        </ResourceBar>
      </MapHeader>

      <BuildingsGrid>
        {renderGridSlots()}
      </BuildingsGrid>

      {tutorialActive && (
        <TutorialPopup
          step={currentTutorialStep}
          content={getTutorialContent()}
          onNext={() => onTutorialStep && onTutorialStep(currentTutorialStep + 1)}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </CityMapContainer>
  );
};

export default CityMap;