import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d97706',
      light: '#fbbf24',
      dark: '#b45309',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f59e0b',
      light: '#fcd34d',
      dark: '#d97706',
      contrastText: '#ffffff'
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff'
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff'
    },
    info: {
      main: '#7c3aed',
      light: '#8b5cf6',
      dark: '#6d28d9',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      disabled: '#64748b'
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b'
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    divider: 'rgba(217, 119, 6, 0.3)'
  },
  typography: {
    fontFamily: '"Times New Roman", serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#d97706'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#d97706'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#d97706'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#fbbf24'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#fbbf24'
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#fbbf24'
    },
    body1: {
      fontSize: '1rem',
      color: '#e2e8f0'
    },
    body2: {
      fontSize: '0.875rem',
      color: '#94a3b8'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    '0 8px 25px rgba(217, 119, 6, 0.4)',
    '0 10px 30px rgba(217, 119, 6, 0.4)',
    '0 12px 35px rgba(217, 119, 6, 0.4)',
    '0 14px 40px rgba(217, 119, 6, 0.4)',
    '0 16px 45px rgba(217, 119, 6, 0.4)',
    '0 18px 50px rgba(217, 119, 6, 0.4)',
    '0 20px 55px rgba(217, 119, 6, 0.4)',
    '0 22px 60px rgba(217, 119, 6, 0.4)',
    '0 24px 65px rgba(217, 119, 6, 0.4)',
    '0 26px 70px rgba(217, 119, 6, 0.4)',
    '0 28px 75px rgba(217, 119, 6, 0.4)',
    '0 30px 80px rgba(217, 119, 6, 0.4)',
    '0 32px 85px rgba(217, 119, 6, 0.4)',
    '0 34px 90px rgba(217, 119, 6, 0.4)',
    '0 36px 95px rgba(217, 119, 6, 0.4)',
    '0 38px 100px rgba(217, 119, 6, 0.4)',
    '0 40px 105px rgba(217, 119, 6, 0.4)',
    '0 42px 110px rgba(217, 119, 6, 0.4)',
    '0 44px 115px rgba(217, 119, 6, 0.4)'
  ]
});

export default theme;