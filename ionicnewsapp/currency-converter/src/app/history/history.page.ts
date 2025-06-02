import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { StorageService, ConversionRecord } from '../services/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  providers: [DatePipe]
})
export class HistoryPage {
  conversionHistory: ConversionRecord[] = [];

  constructor(
    private storageService: StorageService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadHistory();
  }

  async loadHistory() {
    this.conversionHistory = await this.storageService.getConversionHistory();
  }

  async confirmClearHistory() {
    const alert = await this.alertCtrl.create({
      header: 'Limpar Histórico?',
      message: 'Tem certeza que deseja apagar todo o histórico de conversões?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Limpar',
          handler: () => {
            this.clearHistory();
          }
        }
      ]
    });
    await alert.present();
  }

  async clearHistory() {
    await this.storageService.clearConversionHistory();
    this.loadHistory();
  }
}