import { createTheme, alpha } from "@mui/material/styles";

// Tailscale-inspired warm crème color palette
const getDesignTokens = (mode: 'light' | 'dark') => ({
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(","),
    h1: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "hsl(0, 0%, 12%)" : "hsl(40, 10%, 92%)",
      light: mode === "light" ? "hsl(0, 0%, 20%)" : "hsl(40, 10%, 85%)",
      dark: mode === "light" ? "hsl(0, 0%, 8%)" : "hsl(40, 10%, 95%)",
      contrastText: mode === "light" ? "#fff" : "hsl(0, 0%, 12%)",
    },
    secondary: {
      main: mode === "light" ? "hsl(40, 15%, 93%)" : "hsl(0, 0%, 16%)",
      light: mode === "light" ? "hsl(40, 15%, 95%)" : "hsl(0, 0%, 20%)",
      dark: mode === "light" ? "hsl(40, 15%, 90%)" : "hsl(0, 0%, 12%)",
      contrastText: mode === "light" ? "hsl(0, 0%, 16%)" : "hsl(40, 10%, 92%)",
    },
    background: {
      default: mode === "light" ? "hsl(40, 20%, 97%)" : "hsl(0, 0%, 8%)",
      paper: mode === "light" ? "hsl(40, 20%, 98%)" : "hsl(0, 0%, 10%)",
    },
    text: {
      primary: mode === "light" ? "hsl(0, 0%, 16%)" : "hsl(40, 10%, 92%)",
      secondary: mode === "light" ? "hsl(0, 0%, 42%)" : "rgba(255, 255, 255, 0.7)",
    },
    divider: mode === "light" ? "hsl(40, 15%, 90%)" : "hsl(0, 0%, 16%)",
    action: {
      hover: mode === "light" ? alpha("hsl(0, 0%, 0%)", 0.04) : alpha("#fff", 0.08),
      selected: mode === "light" ? alpha("hsl(0, 0%, 0%)", 0.08) : alpha("#fff", 0.16),
    },
    info: {
      main: mode === "light" ? "hsl(200, 70%, 60%)" : "hsl(200, 70%, 60%)",
      light: mode === "light" ? "hsl(200, 60%, 94%)" : "hsl(200, 60%, 20%)",
    },
    success: {
      main: mode === "light" ? "hsl(150, 60%, 50%)" : "hsl(150, 60%, 50%)",
      light: mode === "light" ? "hsl(150, 50%, 93%)" : "hsl(150, 50%, 20%)",
    },
    warning: {
      main: mode === "light" ? "hsl(40, 95%, 55%)" : "hsl(40, 95%, 55%)",
      light: mode === "light" ? "hsl(40, 90%, 93%)" : "hsl(40, 90%, 20%)",
    },
    error: {
      main: mode === "light" ? "hsl(0, 70%, 60%)" : "hsl(0, 70%, 60%)",
      light: mode === "light" ? "hsl(0, 60%, 94%)" : "hsl(0, 60%, 20%)",
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: mode === 'light' ? [
    'none',
    '0 1px 2px rgba(0,0,0,0.03)',
    '0 2px 4px rgba(0,0,0,0.04)',
    '0 4px 6px rgba(0,0,0,0.05)',
    '0 6px 10px rgba(0,0,0,0.05)',
    '0 10px 15px rgba(0,0,0,0.05)',
    '0 15px 20px rgba(0,0,0,0.06)',
    '0 20px 25px rgba(0,0,0,0.06)',
    '0 20px 40px rgba(0,0,0,0.08)',
    '0 25px 50px rgba(0,0,0,0.08)',
    'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'
  ] : [
    'none',
    '0 1px 2px rgba(0,0,0,0.2)',
    '0 2px 4px rgba(0,0,0,0.25)',
    '0 4px 6px rgba(0,0,0,0.3)',
    '0 6px 10px rgba(0,0,0,0.3)',
    '0 10px 15px rgba(0,0,0,0.3)',
    '0 15px 20px rgba(0,0,0,0.35)',
    '0 20px 25px rgba(0,0,0,0.35)',
    '0 20px 40px rgba(0,0,0,0.4)',
    '0 25px 50px rgba(0,0,0,0.4)',
    'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        html, body {
          background-color: ${mode === "light" ? "hsl(40, 20%, 97%)" : "hsl(0, 0%, 8%)"};
          scroll-behavior: smooth;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${mode === "light" ? alpha("#000", 0.15) : alpha("#fff", 0.15)};
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background-color: ${mode === "light" ? alpha("#000", 0.25) : alpha("#fff", 0.25)};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: mode === 'light' ? '0 1px 2px rgba(0,0,0,0.03)' : '0 1px 2px rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: mode === 'light' ? '0 4px 6px rgba(0,0,0,0.05)' : '0 4px 6px rgba(0,0,0,0.3)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.85rem',
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid",
          borderColor: mode === "light" ? alpha("hsl(40, 15%, 90%)", 0.5) : alpha("hsl(0, 0%, 16%)", 0.5),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: mode === "light" ? "hsl(40, 15%, 90%)" : "hsl(0, 0%, 16%)",
            boxShadow: mode === 'light' ? '0 4px 6px rgba(0,0,0,0.05)' : '0 4px 6px rgba(0,0,0,0.3)',
          },
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: mode === 'light' ? '0 1px 2px rgba(0,0,0,0.03)' : '0 1px 2px rgba(0,0,0,0.2)',
        },
        elevation2: {
          boxShadow: mode === 'light' ? '0 4px 6px rgba(0,0,0,0.05)' : '0 4px 6px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: mode === "light" ? alpha("hsl(40, 15%, 90%)", 0.8) : alpha("hsl(0, 0%, 16%)", 0.8),
            },
            '&:hover fieldset': {
              borderColor: mode === "light" ? "hsl(40, 15%, 85%)" : "hsl(0, 0%, 20%)",
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.8rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === "light" ? alpha("#212121", 0.92) : alpha("#424242", 0.92),
          color: "#fff",
          fontSize: "0.875rem",
          padding: "10px 14px",
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          boxShadow: mode === 'light' ? '0 10px 15px rgba(0,0,0,0.1)' : '0 10px 15px rgba(0,0,0,0.5)',
        },
        arrow: {
          color: mode === "light" ? alpha("#212121", 0.92) : alpha("#424242", 0.92),
        },
      },
      defaultProps: {
        arrow: true,
        enterDelay: 300,
        leaveDelay: 200,
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

const getTheme = (mode: 'light' | 'dark') => {
  const tokens = getDesignTokens(mode);
  return createTheme(tokens);
};

export const theme = getTheme('light');
export default getTheme;
