// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpacecraftsPage from './pages/SpacecraftsPage';
import SpacecraftPage from './pages/SpacecraftPage';
import SpacecraftConstructionPage from './pages/SpacecraftConstructionPage';
import PlanetsPage from './pages/PlanetsPage';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />  {/* Header with navigation buttons appears on every page */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecraft/:id" element={<SpacecraftPage />} />
        <Route path="/spacecrafts/new" element={<SpacecraftConstructionPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        {/* Fallback route: redirect unmatched routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
