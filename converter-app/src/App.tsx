import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import { Services } from './pages/Services';
import { Contacts } from './pages/Contacts';
import { Faq } from './pages/Faq';
import { Account } from './pages/Account';
import { Converter } from './pages/Converter';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/account" element={<Account />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
