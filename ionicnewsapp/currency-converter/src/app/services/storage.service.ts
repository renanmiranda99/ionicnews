import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface ConversionRecord {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: number;
}

const RATES_KEY = 'latest_rates';
const HISTORY_KEY = 'conversion_history';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async saveLatestRates(ratesData: any): Promise<void> {
    await Preferences.set({
      key: RATES_KEY,
      value: JSON.stringify(ratesData)
    });
  }

  async getLatestRates(): Promise<any | null> {
    const { value } = await Preferences.get({ key: RATES_KEY });
    return value ? JSON.parse(value) : null;
  }

  async addConversionToHistory(conversion: Omit<ConversionRecord, 'id' | 'timestamp'>): Promise<void> {
    let history = await this.getConversionHistory();
    const newRecord: ConversionRecord = {
      ...conversion,
      id: new Date().getTime().toString(), 
      timestamp: new Date().getTime()
    };
    history.unshift(newRecord);
    if (history.length > 20) { 
        history = history.slice(0, 20);
    }
    await Preferences.set({
      key: HISTORY_KEY,
      value: JSON.stringify(history)
    });
  }

  async getConversionHistory(): Promise<ConversionRecord[]> {
    const { value } = await Preferences.get({ key: HISTORY_KEY });
    return value ? JSON.parse(value) : [];
  }

  async clearConversionHistory(): Promise<void> {
    await Preferences.remove({ key: HISTORY_KEY });
  }
}