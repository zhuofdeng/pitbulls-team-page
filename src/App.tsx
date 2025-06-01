import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import StatsPage from './pages/StatsPage';
import { TeamProvider } from './context/TeamContext';

function App() {
  return (
    <TeamProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TeamProvider>
  );
}

export default App;