import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/Mainpage';
import InfoPage from './pages/InfoPage/InfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
