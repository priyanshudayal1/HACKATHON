import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return <div>Home Page</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
