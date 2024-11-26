import { create } from 'zustand';

export const useConverterStore = create((set) => ({
  amount: 1000,
  currencyFrom: 'UAH',
  currencyTo: 'USD',
  convertedAmount: 38.7,
  conversionDate: '2020-12-01',
  history: [],
  rates: {},

  setAmount: (amount) => set({ amount }),
  setCurrencyFrom: (currency) => set({ currencyFrom: currency }),
  setCurrencyTo: (currency) => set({ currencyTo: currency }),
  setConvertedAmount: (amount) => set({ convertedAmount: amount }),
  setConversionDate: (date) => set({ conversionDate: date }),

  addToHistory: (entry) =>
    set((state) => ({ history: [...state.history, entry] })),

  clearHistory: () => set({ history: [] }),
}));
