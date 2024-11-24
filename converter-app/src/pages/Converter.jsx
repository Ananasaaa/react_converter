import React from 'react';
import { useConverterStore } from '../store';

export function Converter() {
  const {
    amount,
    currencyFrom,
    currencyTo,
    convertedAmount,
    conversionDate,
    history,
    setAmount,
    setCurrencyFrom,
    setCurrencyTo,
    setConvertedAmount,
    setConversionDate,
    addToHistory,
    clearHistory,
  } = useConverterStore();

  const handleConvert = () => {
    addToHistory({
      date: conversionDate,
      from: `${amount} ${currencyFrom}`,
      to: `${convertedAmount} ${currencyTo}`,
    });
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Конвертер валют</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              В мене є:
            </label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-grow px-4 py-2 border-r focus:outline-none text-center"
                placeholder="1000"/>
              <select
                value={currencyFrom}
                onChange={(e) => setCurrencyFrom(e.target.value)}
                className="px-4 py-2 bg-gray-100 focus:outline-none" >
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Хочу придбати:
            </label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="number"
                value={convertedAmount}
                onChange={(e) => setConvertedAmount(e.target.value)}
                className="flex-grow px-4 py-2 border-r focus:outline-none text-center"
                placeholder="38.7"/>
              <select
                value={currencyTo}
                onChange={(e) => setCurrencyTo(e.target.value)}
                className="px-4 py-2 bg-gray-100 focus:outline-none" >
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Дата:
          </label>
          <div className="flex items-center border rounded-lg px-4 py-2" style={{ width: '200px' }}>
            <input
              type="date"
              value={conversionDate}
              onChange={(e) => setConversionDate(e.target.value)}
              className="flex-grow border-none focus:outline-none"/>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6">
          <button
            onClick={handleConvert}
            className="px-6 py-3 text-white font-semibold rounded-lg"
            style={{ background: '#2C36F2' }}>
             Зберегти результат
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mt-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Історія конвертації</h3>
          <button
            onClick={clearHistory}
            className="px-6 py-3 text-white font-semibold rounded-lg"
            style={{ background: '#2C36F2' }}>
            Очистити історію
          </button>
        </div>
        {history.length === 0 ? (
          <p className="text-gray-700">Історія порожня</p>
        ) : (
          <div className="space-y-4">
            {history.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-700">{entry.date}</span>
                <span className="text-sm text-gray-700">{entry.from}</span>
                <span className="text-sm text-gray-700">→</span>
                <span className="text-sm text-gray-700">{entry.to}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
