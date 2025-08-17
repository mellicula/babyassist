import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home';
import Chat from './pages/chat';
import Milestones from './pages/milestones';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/milestones" element={<Milestones />} />
      </Routes>
    </Layout>
  );
}

export default App; 