import React from 'react';

export function Main(): JSX.Element {
  return (
    <section
      className="flex flex-col md:flex-row justify-center items-center text-white py-20 bg-cover bg-center"
      style={{ backgroundImage: 'url("/img/bg_img.png")' }}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left md:mr-10">
        <h1 className="text-3xl md:text-4xl font-bold">Чіп Чендж</h1>
        <p className="text-lg mt-4 md:text-xl">Обмінник валют - навчальний</p>
        <button className="mt-8 px-6 py-3 bg-white text-gray-600 hover:text-blue-700 font-semibold rounded text-sm md:text-base">
          Конвертер валют
        </button>
      </div>
      <div className="mt-10 md:mt-0">
        <img
          src="/img/img_card.png"
          alt="Credit Card"
          className="mx-auto w-64"
        />
      </div>
    </section>
  );
}
