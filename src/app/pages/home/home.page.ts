import { ScoreRecord } from './../../model/score-record';
import { ScoreTableComponent } from './../../components/score-table/score-table.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,
              private modalController: ModalController,
              private loadingController: LoadingController) {}


  goToSelectPlayer() {
    this.router.navigateByUrl('select-player');
  }


  async showScoreTable() {
    
    this.showLoading();

    const modal = await this.modalController.create(
      {
        component: ScoreTableComponent
      }
    );

    modal.present();

  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: '<ion-img src="/assets/img/loading.gif" alt="loading..."></ion-img>',
      cssClass: 'loading',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 4000
    });

    loading.present();

  }

  getOut() {
    navigator["app"].exitApp();
  }




}
