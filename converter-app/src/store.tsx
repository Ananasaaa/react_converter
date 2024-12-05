import { create } from 'zustand';
import { ExchangeRate, IStore } from './types/interface';

export const useConverterStore = create<IStore>((set) => ({
  amount: 0,
  currencyFrom: 'UAH',
  currencyTo: 'USD',
  convertedAmount: 0,
  conversionDate: new Date().toISOString().split('T')[0],
  history: JSON.parse(localStorage.getItem('conversionHistory') || '[]'),
  rates: {},

  fetchRates: async () => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      const rates: Record<string, number> = {};
      data.forEach((rate: { ccy: string; buy: string }) => {
        if (['USD', 'EUR', 'GBP', 'CNY'].includes(rate.ccy)) {
          rates[rate.ccy] = parseFloat(rate.buy);
        }
      });

      set({ rates });
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  },

  setAmount: (amount) =>
    set((state) => {
      const rate =
        state.rates[state.currencyTo] / state.rates[state.currencyFrom] || 1;
      return {
        amount,
        convertedAmount: parseFloat((amount * rate).toFixed(2)),
      };
    }),

  setCurrencyFrom: (currency) =>
    set((state) => {
      const rate = state.rates[state.currencyTo] / state.rates[currency] || 1;
      return {
        currencyFrom: currency,
        convertedAmount: parseFloat((state.amount * rate).toFixed(2)),
      };
    }),

  setCurrencyTo: (currency) =>
    set((state) => {
      const rate = state.rates[currency] / state.rates[state.currencyFrom] || 1;
      return {
        currencyTo: currency,
        convertedAmount: parseFloat((state.amount * rate).toFixed(2)),
      };
    }),

  setConvertedAmount: (convertedAmount) =>
    set((state) => {
      const rate =
        state.rates[state.currencyTo] / state.rates[state.currencyFrom] || 1;
      return {
        convertedAmount,
        amount: parseFloat((convertedAmount / rate).toFixed(2)),
      };
    }),

  setConversionDate: (date) => set({ conversionDate: date }),

  addToHistory: () =>
    set((state) => {
      const newItem = {
        date: state.conversionDate,
        from: `${state.amount} ${state.currencyFrom}`,
        to: `${state.convertedAmount} ${state.currencyTo}`,
      };
      const updatedHistory = [newItem, ...state.history].slice(0, 10);
      localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
      return { history: updatedHistory };
    }),

  clearHistory: () =>
    set(() => {
      localStorage.removeItem('conversionHistory');
      return { history: [] };
    }),

  loadExchangeRates: async (date: string) => {
    try {
      const formattedDate = new Date(date)
        .toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '.');

      console.log('Formatted date for API:', formattedDate);

      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/exchange_rates?date=${formattedDate}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch exchange rates: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('API Response:', data);
      if (!data.exchangeRate) {
        throw new Error('Exchange rate data is missing');
      }

      const rates = data.exchangeRate.reduce(
        (acc: Record<string, number>, rate: ExchangeRate) => {
          const saleRate = rate.saleRate || rate.saleRateNB;
          if (saleRate && rate.currency) {
            acc[rate.currency] = saleRate;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      set({ rates });
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  },
}));
