import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import "./app.css"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);


export default App;
