import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/converter');
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-24 bg-gray-100">
      <div className="text-center md:text-left max-w-md md:max-w-lg">
        <h2 className="text-3xl font-semibold">Конвертер валют</h2>
        <p className="mt-4 text-gray-700">
          Переважна діяльність банківської <br /> групи за останні чотири звітні
          квартали <br /> становить 50 і більше відсотків.
        </p>
        <button
          onClick={handleButtonClick}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white font-semibold rounded"
        >
          Конвертувати валюту
        </button>
      </div>
      <img
        src="/img/img_main.jpg"
        alt="Hand holding a card"
        className="w-80 h-auto mt-8 md:mt-0 md:ml-12"
      />
    </section>
  );
}

export default Home;
