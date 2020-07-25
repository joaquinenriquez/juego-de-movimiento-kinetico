import { AudioService } from './../../services/audio.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.page.html',
  styleUrls: ['./select-player.page.scss'],
})
export class SelectPlayerPage implements OnInit {

  constructor(private navController: NavController,
    private audioService: AudioService) { }

  ngOnInit() {
  }

  startGame(heroeName: string)
  {
    let parametrosGET: NavigationExtras = {
      queryParams: {
        selectedHeroe: heroeName //JSON.stringify(idioma),
      }
    };

    this.audioService.introMusic.pause();

    this.navController.navigateForward('game', parametrosGET);
  }

}
