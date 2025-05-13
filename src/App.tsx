import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import FoodPyramid from './pages/FoodPyramid';
import EnvironmentalImpact from './pages/EnvironmentalImpact';
import SmartShopping from './pages/SmartShopping';
import MenuPlanner from './pages/MenuPlanner';
import './styles/App.css';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container bg-primary">
        <nav className="nav-bar">
          <div className="nav-content">
            <h1 className="nav-title">Ed Civica - Alimentazione</h1>
            <div className="nav-links">
              <NavLink to="/pyramid">Piramide Alimentare</NavLink>
              <NavLink to="/impact">Impatto Ambientale</NavLink>
              <NavLink to="/shopping">Spesa smart</NavLink>
              <NavLink to="/menu">Menù Equilibrato (Beta)</NavLink>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/pyramid" replace />} />
            <Route path="/pyramid" element={<FoodPyramid />} />
            <Route path="/impact" element={<EnvironmentalImpact />} />
            <Route path="/shopping" element={<SmartShopping />} />
            <Route path="/menu" element={<MenuPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
