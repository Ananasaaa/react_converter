import React, { useEffect, useState } from 'react';
import { useConverterStore } from '../store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const converterSchema = z.object({
  amount: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .pipe(
      z
        .number()
        .min(0.01, { message: 'Мінімальне значення 0.01' })
        .max(999999, { message: 'Максимальне значення 999999' })
    ),
  convertedAmount: z
    .string()
    .transform((value) => parseFloat(value.replace(',', '.')))
    .pipe(
      z
        .number()
        .min(0.01, { message: 'Мінімальне значення 0.01' })
        .max(999999, { message: 'Максимальне значення 999999' })
    ),
});

interface ConverterFormValues {
  amount: number;
  convertedAmount: number;
}

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
    loadExchangeRates,
    clearHistory,
    rates,
  } = useConverterStore();

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const debounceDelay = 500;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ConverterFormValues>({
    resolver: zodResolver(converterSchema),
    defaultValues: {
      amount: amount || 0,
      convertedAmount: convertedAmount || 0,
    },
  });

  useEffect(() => {
    loadExchangeRates(conversionDate);
  }, [conversionDate, loadExchangeRates]);

  const handleAmountChange = (value: string): void => {
    const normalizedValue = value.replace(',', '.');
    if (/^\d*\.?\d*$/.test(normalizedValue)) {
      const parsedValue = parseFloat(normalizedValue) || 0;
      setAmount(parsedValue);
      setValue('amount', parsedValue);

      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(() => {
        const rate = rates[currencyFrom] / rates[currencyTo] || 1;
        const result = parseFloat((parsedValue * rate).toFixed(2));
        setConvertedAmount(result);
        setValue('convertedAmount', result);
      }, debounceDelay);

      setDebounceTimer(timer);
    }
  };

  const handleConvertedAmountChange = (value: string): void => {
    const normalizedValue = value.replace(',', '.');
    if (/^\d*\.?\d*$/.test(normalizedValue)) {
      const parsedValue = parseFloat(normalizedValue) || 0;
      setConvertedAmount(parsedValue);
      setValue('convertedAmount', parsedValue);

      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(() => {
        const rate = rates[currencyFrom] / rates[currencyTo] || 1;
        const result = parseFloat((parsedValue / rate).toFixed(2));
        setAmount(result);
        setValue('amount', result);
      }, debounceDelay);

      setDebounceTimer(timer);
    }
  };

  const handleDateChange = (date: string): void => {
    setConversionDate(date);
    loadExchangeRates(date);
  };

  const handleConvert = (): void => {
    const rate = rates[currencyFrom] / rates[currencyTo] || 1;
    const result = parseFloat((getValues('amount') * rate).toFixed(2));
    setConvertedAmount(result);
    setValue('convertedAmount', result);
    addToHistory();
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Конвертер валют</h2>
        <form onSubmit={handleSubmit(handleConvert)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                У мене є:
              </label>
              <div className="flex border rounded-lg overflow-hidden">
                <input
                  type="text"
                  {...register('amount')}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className={`flex-grow px-4 py-2 border-r focus:outline-none text-center ${
                    errors.amount ? 'border-red-500' : ''
                  }`}
                  placeholder="1000"
                />
                <select
                  value={currencyFrom}
                  onChange={(e) => setCurrencyFrom(e.target.value)}
                  className="px-4 py-2 bg-gray-100 focus:outline-none"
                >
                  {Object.keys(rates).map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              {errors.amount && (
                <span className="text-red-500 text-sm mt-1">
                  {String(errors.amount.message)}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Хочу придбати:
              </label>
              <div className="flex border rounded-lg overflow-hidden">
                <input
                  type="text"
                  {...register('convertedAmount')}
                  onChange={(e) => handleConvertedAmountChange(e.target.value)}
                  className={`flex-grow px-4 py-2 border-r focus:outline-none text-center ${
                    errors.convertedAmount ? 'border-red-500' : ''
                  }`}
                  placeholder="38.7"
                />
                <select
                  value={currencyTo}
                  onChange={(e) => setCurrencyTo(e.target.value)}
                  className="px-4 py-2 bg-gray-100 focus:outline-none"
                >
                  {Object.keys(rates).map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              {errors.convertedAmount && (
                <span className="text-red-500 text-sm mt-1">
                  {String(errors.convertedAmount.message)}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Дата:
            </label>
            <input
              type="date"
              value={conversionDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-white font-semibold rounded-lg"
              style={{ background: '#2C36F2' }}
            >
              Зберегти результат
            </button>
          </div>
        </form>
        <div className="bg-white p-8 rounded-lg shadow-md mt-8 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Історія конвертації</h3>
            <button
              onClick={clearHistory}
              className="px-6 py-3 text-white font-semibold rounded-lg"
              style={{ background: '#2C36F2' }}
            >
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
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
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
    </div>
  );
}
