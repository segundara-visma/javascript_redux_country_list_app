import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryData } from './features/country/Country';
import './App.css';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryData />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
