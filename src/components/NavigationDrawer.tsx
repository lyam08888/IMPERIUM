import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Collapse,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DrawerContainer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'linear-gradient(135deg, var(--dark-marble) 0%, var(--dark-stone) 100%)',
    borderRight: '2px solid var(--border-gold)',
    color: 'var(--text-light)',
    overflow: 'hidden'
  }
});

const DrawerHeader = styled(Box)({
  padding: '1rem',
  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid var(--border-gold)'
});

const DrawerTitle = styled(Typography)({
  fontFamily: 'Cinzel, serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  letterSpacing: '1px'
});

const SectionHeader = styled(Typography)({
  color: 'var(--gold-light)',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  padding: '0.75rem 1rem 0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '1px'
});

const NavListItem = styled(ListItemButton)({
  padding: '0.5rem 1rem',
  margin: '0.25rem 0.5rem',
  borderRadius: '0.5rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(217, 119, 6, 0.2)',
    transform: 'translateX(5px)'
  },
  '&.active': {
    background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white'
    }
  }
});

const NavIcon = styled(Box)({
  fontSize: '1.2rem',
  minWidth: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const MenuButton = styled(IconButton)({
  color: 'var(--gold-light)',
  background: 'rgba(30, 41, 59, 0.8)',
  border: '1px solid var(--border-gold)',
  borderRadius: '0.5rem',
  padding: '0.5rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'var(--gold-primary)',
    color: 'white',
    transform: 'scale(1.05)'
  }
});

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface NavigationItem {
  key: string;
  title: string;
  icon: string;
  file: string;
  section: string;
}

const NAVIGATION_CONFIG: NavigationItem[] = [
  // Empire
  { key: 'cite', title: 'Ma Cité', icon: '🏛️', file: 'Empire/Cite.html', section: 'Empire' },
  { key: 'monde', title: 'Monde', icon: '🌍', file: 'Empire/Monde.html', section: 'Empire' },
  { key: 'province', title: 'Province', icon: '🏝️', file: 'Empire/Province.html', section: 'Empire' },
  
  // Développement
  { key: 'academie', title: 'Académie', icon: '📚', file: 'Developpement/Academie.html', section: 'Développement' },
  { key: 'commerce', title: 'Commerce', icon: '⚖️', file: 'Developpement/Commerce.html', section: 'Développement' },
  
  // Militaire
  { key: 'legions', title: 'Légions', icon: '⚔️', file: 'Militaire/Légions.html', section: 'Militaire' },
  { key: 'flotte', title: 'Flotte', icon: '🚢', file: 'Militaire/Flotte.html', section: 'Militaire' },
  { key: 'simulateur', title: 'Simulateur', icon: '💥', file: 'Militaire/Simulateur.html', section: 'Militaire' },
  
  // Social
  { key: 'diplomatie', title: 'Diplomatie', icon: '🤝', file: 'Social/Diplomatie.html', section: 'Social' },
  { key: 'alliance', title: 'Alliance', icon: '🛡️', file: 'Social/Alliance.html', section: 'Social' },
  { key: 'messages', title: 'Messages', icon: '✉️', file: 'Social/Messages.html', section: 'Social' },
  
  // Premium
  { key: 'premium', title: 'Premium', icon: '👑', file: 'Premium/Premium.html', section: 'Premium' }
];

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  currentPage?: string;
  onNavigate?: (pageKey: string) => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  open,
  onClose,
  currentPage = 'cite',
  onNavigate
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Empire']);

  // Group navigation items by section
  const sections: NavigationSection[] = NAVIGATION_CONFIG.reduce((acc, item) => {
    const existingSection = acc.find(section => section.title === item.section);
    if (existingSection) {
      existingSection.items.push(item);
    } else {
      acc.push({
        title: item.section,
        items: [item]
      });
    }
    return acc;
  }, [] as NavigationSection[]);

  const handleSectionToggle = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleNavigate = (item: NavigationItem) => {
    if (onNavigate) {
      onNavigate(item.key);
    } else {
      // Default navigation behavior
      const currentPath = window.location.pathname;
      const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
      
      let url = item.file;
      if (currentDir.includes('/')) {
        url = '../' + item.file;
      }
      
      window.location.href = url;
    }
    onClose();
  };

  return (
    <DrawerContainer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true // Better mobile performance
      }}
    >
      <DrawerHeader>
        <DrawerTitle>IMPERIUM</DrawerTitle>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>

      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <List>
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleSectionToggle(section.title)}
                  sx={{
                    padding: '0.75rem 1rem',
                    '&:hover': {
                      background: 'rgba(217, 119, 6, 0.1)'
                    }
                  }}
                >
                  <SectionHeader component="span" sx={{ flexGrow: 1, padding: 0 }}>
                    {section.title}
                  </SectionHeader>
                  {expandedSections.includes(section.title) ? 
                    <ExpandLessIcon sx={{ color: 'var(--gold-light)' }} /> : 
                    <ExpandMoreIcon sx={{ color: 'var(--gold-light)' }} />
                  }
                </ListItemButton>
              </ListItem>

              <Collapse in={expandedSections.includes(section.title)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.items.map((item) => (
                    <NavListItem
                      key={item.key}
                      onClick={() => handleNavigate(item)}
                      className={currentPage === item.key ? 'active' : ''}
                    >
                      <ListItemIcon>
                        <NavIcon>{item.icon}</NavIcon>
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.title}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: currentPage === item.key ? 'bold' : 'normal'
                        }}
                      />
                    </NavListItem>
                  ))}
                </List>
              </Collapse>

              {section.title !== 'Premium' && <Divider sx={{ 
                borderColor: 'var(--border-gold)', 
                margin: '0.5rem 0',
                opacity: 0.3 
              }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </DrawerContainer>
  );
};

export { NavigationDrawer, MenuButton };
export default NavigationDrawer;