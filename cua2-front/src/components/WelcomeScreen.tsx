import { fetchAvailableModels, generateRandomQuestion } from '@/services/api';
import { selectAvailableModels, selectIsDarkMode, selectIsLoadingModels, selectSelectedModelId, useAgentStore } from '@/stores/agentStore';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import SendIcon from '@mui/icons-material/Send';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Box, Button, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface WelcomeScreenProps {
  onStartTask: (instruction: string, modelId: string) => void;
  isConnected: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartTask, isConnected }) => {
  const [customTask, setCustomTask] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isDarkMode = useAgentStore(selectIsDarkMode);
  const toggleDarkMode = useAgentStore((state) => state.toggleDarkMode);
  const selectedModelId = useAgentStore(selectSelectedModelId);
  const setSelectedModelId = useAgentStore((state) => state.setSelectedModelId);
  const availableModels = useAgentStore(selectAvailableModels);
  const isLoadingModels = useAgentStore(selectIsLoadingModels);
  const setAvailableModels = useAgentStore((state) => state.setAvailableModels);
  const setIsLoadingModels = useAgentStore((state) => state.setIsLoadingModels);

  // Load available models on mount
  useEffect(() => {
    const loadModels = async () => {
      setIsLoadingModels(true);
      try {
        const models = await fetchAvailableModels();
        setAvailableModels(models);

        // Set first model as default if current selection is not in the list
        if (models.length > 0 && !models.includes(selectedModelId)) {
          setSelectedModelId(models[0]);
        }
      } catch (error) {
        console.error('Failed to load models:', error);
        setAvailableModels([]);
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clean up typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleWriteRandomTask = async () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setIsGeneratingQuestion(true);
    try {
      const randomTask = await generateRandomQuestion();
      setCustomTask('');
      setIsTyping(true);

      let currentIndex = 0;
      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < randomTask.length) {
          setCustomTask(randomTask.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
        }
      }, 10);
    } catch (error) {
      console.error('Failed to generate question:', error);
      setIsTyping(false);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleCustomTask = () => {
    if (customTask.trim() && !isTyping) {
      onStartTask(customTask.trim(), selectedModelId);
    }
  };

  return (
    <>
      {/* Dark Mode Toggle - Top Right */}
      <Box sx={{ position: 'absolute', top: 32, right: 32, zIndex: 1000 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <IconButton
            onClick={toggleDarkMode}
            size="large"
            sx={{
              color: 'text.primary',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              '&:hover': {
                backgroundColor: 'background.paper',
                borderColor: 'text.primary',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </motion.div>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 4 },
        }}
      >
        {/* Logo with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="SideAI Logo"
            sx={{
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              mb: 4,
              filter: isDarkMode ? 'brightness(0.9)' : 'none',
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              letterSpacing: '-0.025em',
              mb: 2,
              color: 'text.primary',
            }}
          >
            SideAI
          </Typography>
        </motion.div>

        {/* Powered by badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Powered by
            </Typography>

            {/* smolagents */}
            <Box
              component="a"
              href="https://github.com/huggingface/smolagents"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                backgroundColor: 'secondary.main',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  borderColor: 'text.secondary',
                },
              }}
            >
              <Box
                component="img"
                src="https://cdn-avatars.huggingface.co/v1/production/uploads/63d10d4e8eaa4831005e92b5/a3R8vs2eGE578q4LEpaHB.png"
                alt="smolagents"
                sx={{ width: 20, height: 20 }}
              />
              <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.9rem' }}>
                smolagents
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              &
            </Typography>

            {/* E2B */}
            <Box
              component="a"
              href="https://e2b.dev/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                backgroundColor: 'secondary.main',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  borderColor: 'text.secondary',
                },
              }}
            >
              <Box
                component="img"
                src="https://avatars.githubusercontent.com/u/129434473?s=200&v=4"
                alt="E2B"
                sx={{ width: 20, height: 20, borderRadius: '50%' }}
              />
              <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.9rem' }}>
                E2B
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              mb: 2,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            AI-Powered Computer Use Automation
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '650px',
              mb: 5,
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}
          >
            Experience AI automation as agents operate computers in real time. Built for research,
            enabling visualization and annotation for agentic AI development.
          </Typography>
        </motion.div>

        {/* Task Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ width: '100%', maxWidth: '725px' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              border: '1.5px solid',
              borderColor: isConnected ? 'primary.main' : 'divider',
              borderRadius: 3,
              backgroundColor: 'background.paper',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isConnected ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <TextField
              fullWidth
              placeholder="Describe your task here..."
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && isConnected && customTask.trim() && !isTyping) {
                  handleCustomTask();
                }
              }}
              disabled={!isConnected || isTyping}
              multiline
              rows={3}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'secondary.light',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 240 } }}>
                <InputLabel>Model</InputLabel>
                <Select
                  value={availableModels.length > 0 && availableModels.includes(selectedModelId) ? selectedModelId : ''}
                  label="Model"
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  disabled={!isConnected || isTyping || isLoadingModels}
                >
                  {isLoadingModels ? (
                    <MenuItem disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2">Loading...</Typography>
                      </Box>
                    </MenuItem>
                  ) : availableModels.length === 0 ? (
                    <MenuItem disabled>No models available</MenuItem>
                  ) : (
                    availableModels.map((modelId) => (
                      <MenuItem key={modelId} value={modelId}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SmartToyIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {modelId.split('/').pop()}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 1.5, flex: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleWriteRandomTask}
                  disabled={!isConnected || isTyping || isGeneratingQuestion}
                  startIcon={isGeneratingQuestion ? <CircularProgress size={16} /> : <ShuffleIcon />}
                  sx={{
                    flex: { xs: 1, sm: 'none' },
                    fontWeight: 600,
                    borderWidth: '1.5px',
                    '&:hover': { borderWidth: '1.5px' },
                  }}
                >
                  {isGeneratingQuestion ? 'Generating...' : 'Random'}
                </Button>

                <Button
                  variant="contained"
                  onClick={handleCustomTask}
                  disabled={!isConnected || !customTask.trim() || isTyping}
                  endIcon={<SendIcon />}
                  sx={{
                    flex: { xs: 1, sm: 'none' },
                    fontWeight: 600,
                    px: 4,
                  }}
                >
                  Run Task
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* Research Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mt: 4,
              lineHeight: 1.6,
              opacity: 0.8,
              fontSize: '0.85rem',
            }}
          >
            By using this demo, you agree that traces are stored for research purposes.
            <strong> Please do not write any personal information.</strong>
          </Typography>
        </motion.div>

        {/* Connection status */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Box
              sx={{
                mt: 3,
                px: 3,
                py: 1.5,
                backgroundColor: 'warning.light',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'warning.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'warning.main',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Backend not connected. Make sure it's running on port 8000
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </>
  );
};
