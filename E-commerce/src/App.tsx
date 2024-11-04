import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage/MainPage';
import ProductPage from 'pages/ProductPage/ProductPage';
import Header from 'pages/components/Header/Header';
import './styles/styles.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
  
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>

    </div>
  );
}

export default App;
