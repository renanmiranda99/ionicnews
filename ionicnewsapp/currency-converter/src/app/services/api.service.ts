import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = environment.exchangeRateApiKey;
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getRates(baseCurrency: string = 'USD'): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest/${baseCurrency}`);
  }

  getSupportedCurrencies(ratesApiResponse: any): string[] {
    if (ratesApiResponse && ratesApiResponse.conversion_rates) {
      return Object.keys(ratesApiResponse.conversion_rates);
    }
    return [];
  }
}