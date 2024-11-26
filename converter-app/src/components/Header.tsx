import React from 'react';
import { Link } from 'react-router-dom';
import { Main } from './Main';

function Header(): JSX.Element {
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
          <Link
            to="/services"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Послуги
          </Link>
          <Link
            to="/converter"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Конвертер валют
          </Link>
          <Link
            to="/contacts"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Контакти
          </Link>
          <Link
            to="/faq"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Задати питання
          </Link>
        </nav>
        <Link to="/account" className="px-4 py-2 rounded flex items-center">
          <img
            src="/icons/arrow_header.svg"
            alt="Logo"
            className="h-5 w-5 mr-2"
          />
          Особистий кабінет
        </Link>
      </header>

      <Main />
    </>
  );
}

export default Header;
