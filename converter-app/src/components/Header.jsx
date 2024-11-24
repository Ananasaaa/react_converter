import React from 'react';
import { Link } from 'react-router-dom';
import { Main } from './Main';


function Header() {
  return (
    <>
    <header className="flex justify-between items-center p-4 bg-white shadow-md max-w-screen-xl mx-auto">
      <div className="text-xl font-bold flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/icons/logo.svg" alt="" className="h-5 w-5 mr-2" />
          Чіп Чендж
        </Link>
      </div>
      <nav className="space-x-4">
        <Link to="/services" className="text-gray-600 hover:text-blue-600 transition">Послуги</Link>
        <Link to="/converter" className="text-gray-600 hover:text-blue-600 transition">Конвертер валют</Link>
        <Link to="/contacts" className="text-gray-600 hover:text-blue-600 transition">Контакти</Link>
        <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition">Задати питання</Link>
      </nav>
      <Link to="/account" className="px-4 py-2 rounded flex items-center">
        <img src="/icons/arrow_header.svg" alt="Logo" className="h-5 w-5 mr-2"/>
        Особистий кабінет
      </Link>
    </header>

    <Main />
    </>
  );
}

export default Header; 

/*
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-md max-w-screen-xl mx-auto">
        <div className="text-xl font-bold flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/icons/logo.svg" alt="Logo" className="h-5 w-5 mr-2" />
            Чіп Чендж
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/services" className="text-gray-600 hover:text-blue-600 transition">Послуги</Link>
          <Link to="/converter" className="text-gray-600 hover:text-blue-600 transition">Конвертер валют</Link>
          <Link to="/contacts" className="text-gray-600 hover:text-blue-600 transition">Контакти</Link>
          <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition">Задати питання</Link>
        </nav>
        <Link to="/account" className="hidden md:flex px-4 py-2 rounded items-center">
          <img src="/icons/arrow_header.svg" alt="Account Icon" className="h-5 w-5 mr-2" />
          Особистий кабінет
        </Link>

        <button 
          className="md:hidden text-gray-600" 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 z-10">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link 
                to="/services" 
                className="text-gray-600 hover:text-blue-600 transition" 
                onClick={toggleMenu}
              >
                Послуги
              </Link>
            </li>
            <li>
              <Link 
                to="/converter" 
                className="text-gray-600 hover:text-blue-600 transition" 
                onClick={toggleMenu}
              >
                Конвертер валют
              </Link>
            </li>
            <li>
              <Link 
                to="/contacts" 
                className="text-gray-600 hover:text-blue-600 transition" 
                onClick={toggleMenu}
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link 
                to="/faq" 
                className="text-gray-600 hover:text-blue-600 transition" 
                onClick={toggleMenu}
              >
                Задати питання
              </Link>
            </li>
            <li>
              <Link 
                to="/account" 
                className="text-gray-600 hover:text-blue-600 transition flex items-center" 
                onClick={toggleMenu}
              >
                <img src="/icons/arrow_header.svg" alt="Account Icon" className="h-5 w-5 mr-2" />
                Особистий кабінет
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header; 
*/
