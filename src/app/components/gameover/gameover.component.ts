import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})
export class GameoverComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}



  closeModal(continuar: Boolean)
  {
    this.modalController.dismiss(continuar);
  }

}
