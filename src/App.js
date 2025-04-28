import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CustomThemeProvider, ThemeContext } from './context/ThemeContext';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import { CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeToggleButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
          <ThemeToggleButton />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
