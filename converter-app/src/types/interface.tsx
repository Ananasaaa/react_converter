export interface IStore {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  convertedAmount: number;
  conversionDate: string;
  history: { date: string; from: string; to: string }[];
  rates: Record<string, number>;

  fetchRates: () => Promise<void>;
  setAmount: (amount: number) => void;
  setCurrencyFrom: (currency: string) => void;
  setCurrencyTo: (currency: string) => void;
  setConvertedAmount: (amount: number) => void;
  setConversionDate: (date: string) => void;
  addToHistory: () => void;
  clearHistory: () => void;
  loadExchangeRates: (date: string) => Promise<void>;
}

export interface ExchangeRate {
  currency?: string;
  saleRate?: number;
  saleRateNB?: number;
}
