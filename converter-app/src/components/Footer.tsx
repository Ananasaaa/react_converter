import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto p-6 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <img src="/icons/logo.svg" alt="" className="mr-2 w-6 h-6" />
              <Link to="/" className="font-bold text-lg">
                Чіп Чендж
              </Link>
            </div>
            <p>04128, м. Київ, вул. Хрещатик, 19</p>
            <p>Ліцензія НБУ №115</p>
            <p>© ПАТ ЧіпЧендж, 2019-2023</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Link to="/services" className="hover:text-blue-600">
              Послуги
            </Link>
            <Link to="/converter" className="hover:text-blue-600">
              Конвертер валют
            </Link>
            <Link to="/contacts" className="hover:text-blue-600">
              Контакти
            </Link>
            <Link to="/faq" className="hover:text-blue-600">
              Задати питання
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src="/icons/phone.svg" alt="" className="w-6 h-6" />
              <p className="font-bold">3773</p>
            </div>
            <p>Цілодобова підтримка</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src="/icons/phone2.svg" alt="" className="w-6 h-6" />
              <p className="font-bold">8 800 111 22 33</p>
            </div>
            <p>Безкоштовно для дзвінків в межах України</p>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <Link to="#" aria-label="Facebook" className="text-gray-600">
              <img src="/icons/facebook.svg" alt="" className="w-6 h-6" />
            </Link>
            <Link to="#" aria-label="Twitter" className="text-gray-600">
              <img src="/icons/twitter.svg" alt="" className="w-6 h-6" />
            </Link>
            <Link to="#" aria-label="Instagram" className="text-gray-600">
              <img src="/icons/instagram.svg" alt="" className="w-6 h-6" />
            </Link>
            <Link to="#" aria-label="Youtube" className="text-gray-600">
              <img src="/icons/youtube.svg" alt="" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
