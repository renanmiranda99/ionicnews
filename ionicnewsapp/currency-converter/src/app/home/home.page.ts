import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { StorageService, ConversionRecord } from '../services/storage.service';
import { ExchangeRateResponse } from '../interfaces/exchange-response'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class HomePage implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';
  conversionResult: number | null = null;
  currentRate: number | null = null;

  availableCurrencies: string[] = ['USD', 'EUR', 'BRL', 'JPY', 'GBP'];
  allRates: { [key: string]: number } = {};

  isLoading: boolean = false;
  errorMessage: string | null = null;
  lastUpdateTimestamp: number | null = null;


  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadRates();
  }

  ionViewWillEnter() {
    if (!this.lastUpdateTimestamp || (Date.now() - this.lastUpdateTimestamp > 3600 * 1000 * 3)) { 
        this.loadRates(true); 
    }
  }

  async loadRates(forceRefresh: boolean = false) {
    this.isLoading = true;
    this.errorMessage = null;
    const loading = await this.loadingCtrl.create({ message: 'Carregando taxas...' });
    await loading.present();

    let ratesData = await this.storageService.getLatestRates();

    if (forceRefresh || !ratesData || !ratesData.conversion_rates) {
      try {
        console.log('Fetching rates from API...');
        const apiResponse = await this.apiService.getRates(this.fromCurrency).toPromise() as ExchangeRateResponse;
        if (apiResponse && apiResponse.conversion_rates) {
          this.allRates = apiResponse.conversion_rates;
          this.availableCurrencies = Object.keys(this.allRates).sort();
          this.lastUpdateTimestamp = apiResponse.time_last_update_unix * 1000; // Convert to ms
          await this.storageService.saveLatestRates({
            conversion_rates: this.allRates,
            base_code: apiResponse.base_code,
            time_last_update_unix: apiResponse.time_last_update_unix
          });
          this.presentToast('Taxas atualizadas da API.', 'success');
        } else {
          throw new Error('Resposta da API inválida.');
        }
      } catch (error: any) {
        console.error('Error fetching from API:', error);
        this.errorMessage = 'Falha ao buscar taxas da API. ';
        if (ratesData && ratesData.conversion_rates) {
          this.allRates = ratesData.conversion_rates;
          this.availableCurrencies = Object.keys(this.allRates).sort();
          this.lastUpdateTimestamp = ratesData.time_last_update_unix * 1000;
          this.errorMessage += 'Usando últimas taxas salvas.';
          this.presentToast('Usando taxas offline.', 'warning');
        } else {
          this.errorMessage += 'Sem taxas offline disponíveis.';
          this.presentToast('Falha total ao carregar taxas.', 'danger');
        }
      }
    } else {
      console.log('Using stored rates...');
      this.allRates = ratesData.conversion_rates;
      this.availableCurrencies = Object.keys(this.allRates).sort();
      this.lastUpdateTimestamp = ratesData.time_last_update_unix * 1000;
      this.presentToast('Taxas carregadas do cache.', 'medium');
    }

    this.isLoading = false;
    await loading.dismiss();
    this.updateDefaultsIfNeeded();
  }

  updateDefaultsIfNeeded() {
    if (this.availableCurrencies.length > 0) {
      if (!this.availableCurrencies.includes(this.fromCurrency)) {
        this.fromCurrency = this.availableCurrencies.includes('USD') ? 'USD' : this.availableCurrencies[0];
      }
      if (!this.availableCurrencies.includes(this.toCurrency)) {
        this.toCurrency = this.availableCurrencies.includes('BRL') ? 'BRL' : this.availableCurrencies[1] || this.availableCurrencies[0];
      }
    }
  }

  convert() {
    this.errorMessage = null;
    if (!this.amount || !this.fromCurrency || !this.toCurrency || !this.allRates) {
      this.errorMessage = 'Por favor, preencha todos os campos e aguarde o carregamento das taxas.';
      return;
    }

    if (Object.keys(this.allRates).length === 0) {
        this.errorMessage = 'Taxas de câmbio não carregadas. Tente recarregar.';
        this.loadRates(true); 
        return;
    }


    const rateFrom = this.allRates[this.fromCurrency]; 
    const rateTo = this.allRates[this.toCurrency];  

    if (rateFrom === undefined || rateTo === undefined) {
        this.errorMessage = `Não foi possível encontrar a taxa para ${this.fromCurrency} ou ${this.toCurrency}. A API gratuita pode ter USD como única base.`;
        this.currentRate = this.allRates[this.toCurrency] / this.allRates[this.fromCurrency];
        this.conversionResult = this.amount * this.currentRate;
    } else {
         this.currentRate = this.allRates[this.toCurrency]; 
         this.conversionResult = this.amount * this.currentRate;
    }


    if (this.conversionResult !== null && this.currentRate !== null) {
        this.storageService.addConversionToHistory({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        amount: this.amount,
        result: this.conversionResult,
        rate: this.currentRate
        });
    } else {
        this.errorMessage = "Não foi possível calcular a conversão. Verifique as moedas ou tente mais tarde."
    }

  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.conversionResult = null; 
    this.currentRate = null;
  }

  async presentToast(message: string, color: 'success' | 'warning' | 'danger' | 'medium' = 'medium') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}