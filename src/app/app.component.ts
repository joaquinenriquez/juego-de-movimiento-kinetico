import { AudioService } from './services/audio.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  mostrarSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private audioService: AudioService
  ) {
    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }
  initializeApp() 
  {
    
  this.platform.ready().then(() => 
  {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });

  this.audioService.introMusic.play();

  // if (this.platform.is('cordova')) {

  //   this.smartAudioService.preload('alarmaActivada', 'assets/audio/alarmaActivada.mp3');
  //   this.smartAudioService.preload('izquierda', 'assets/audio/izquierda.mp3');
  //   this.smartAudioService.preload('arriba', 'assets/audio/arriba.mp3');
  //   this.smartAudioService.preload('derecha', 'assets/audio/derecha.mp3');
  //   this.smartAudioService.preload('confirmation', 'assets/audio/confirmation.wav');


  // } else {

  //   this.smartAudioService.preload('alarmaActivada', 'assets/audio/alarmaActivada.mp3');
  //   this.smartAudioService.preload('izquierda', 'assets/audio/izquierda.mp3');
  //   this.smartAudioService.preload('arriba', 'assets/audio/arriba.mp3');
  //   this.smartAudioService.preload('derecha', 'assets/audio/derecha.mp3');
  //   this.smartAudioService.preload('confirmation', 'assets/audio/confirmation.wav');

  // }


  // setTimeout(() => 
  // {
  //   sonido.play();
    setTimeout( () => this.mostrarSplash = false, 10000);
  // }, 2800);

}




  
}
