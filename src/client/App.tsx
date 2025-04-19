import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';  // Import Header
import Footer from './components/Footer';  // Import Footer
import Home from './pages/Home';  // Import Home

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
