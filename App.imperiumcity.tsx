import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './src/theme';
import TutorialManager from './src/components/TutorialManager';

const App: React.FC = () => {
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
          fontFamily: '"Times New Roman", serif',
          overflow: 'hidden'
        }}
      >
        {/* Particles Background */}
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

        {/* Main Application */}
        <Box sx={{ position: 'relative', zIndex: 10, height: '100vh', padding: 2 }}>
          <TutorialManager autoStart={true} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;