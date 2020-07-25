import { Collections } from './../../model/enums/collections.enum';
import { DataService } from './../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { GameoverComponent } from './../../components/gameover/gameover.component';
import { Heroe } from '../../model/heroe';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx'

import { Subscription } from 'rxjs';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  /* #region  atributos */

  acelerometerOptions: DeviceMotionAccelerometerOptions = { frequency: 10 } // Velocidad de lectura de los datos del acelerometro

  horizontalPosition: any;
  verticalPosition: any;
  horizontalSpeed: any;
  verticalSpeed: any;

  initialHorizontalPosition: any;
  initialVerticalPosition: any;

  canvasWidth: any;
  canvasHeight: any;

  hereoImgWidth: any;
  hereoImgHeight: any;

  heroe: Heroe = new Heroe();

  subscription: Subscription;
  @ViewChild('canvas', { read: ElementRef, static: false }) canvas: ElementRef<any>;
  @ViewChild('heroeImg', { read: ElementRef, static: false }) heroeImg: ElementRef<any>;
  @ViewChild('timer') timer: TimerComponent;

  /* #endregion */

  constructor(private deviceMotion: DeviceMotion,
    private screenOrientation: ScreenOrientation,
    private ruta: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); // Bloqueamos la pantalla para dejarla en vertical 
    this.ruta.queryParams.subscribe(parametrosGET => {
      this.heroe.name = parametrosGET["selectedHeroe"];
      this.heroe.img = `assets/img/${this.heroe.name}_game.png`
    });
  }


  // Se ejecuta cuando la pagina se cargó y este activa
  ionViewDidEnter() {

    setTimeout(() => {

      this.canvasHeight = this.canvas.nativeElement.offsetHeight;
      this.canvasWidth = this.canvas.nativeElement.offsetWidth;
      this.hereoImgHeight = this.heroeImg.nativeElement.height;
      this.hereoImgWidth = this.heroeImg.nativeElement.width;

      // Definimos la posición inicial del heroe en el medio de la pantalla
      this.initialHorizontalPosition = (this.canvasHeight - this.hereoImgHeight) / 2;
      this.initialVerticalPosition = (this.canvasWidth - this.hereoImgWidth) / 2;

      this.restart();

    }, 500);

  }

  goToStartPosition() {
    this.verticalPosition = this.initialVerticalPosition;
    this.horizontalPosition = this.initialHorizontalPosition;
  }


  startWatchingAcelerometer() {
    // Nos subscribimos al servicio del acelerometro que nos va a reportar cada vez que cambie algun valor de x o y
    this.subscription = this.deviceMotion.watchAcceleration(this.acelerometerOptions).subscribe((accelerationData: DeviceMotionAccelerationData) => {
      this.verticalSpeed = accelerationData.y;
      this.horizontalSpeed = accelerationData.x;
      this.moveHeroe();
    });
  }

  moveHeroe() {

    this.horizontalPosition -= this.horizontalSpeed;
    this.verticalPosition += this.verticalSpeed;
    this.heroeImg.nativeElement.style.left = this.horizontalPosition + "px";
    this.heroeImg.nativeElement.style.top = this.verticalPosition + "px";

    if (this.horizontalPosition <= 10) {
      this.gameOver();
    }

    if ((this.horizontalPosition + this.hereoImgWidth + 10) >= this.canvasWidth) {
      this.gameOver();
    }

    if (this.verticalPosition + (this.hereoImgHeight * 1.5) >= this.canvasHeight) {
      this.gameOver();
    }

    if (this.verticalPosition <= -100) {
      this.gameOver();
    }

  }

  stopWatching() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.stopWatching();
  }

  gameOver() {
    this.timer.stop();
    this.stopWatching();
    this.saveScoreData();
    this.showGameOverModal();
  }

  saveScoreData() {
    let scoreData = 
    {
      userName: this.authService.currentUser.email,
      score: this.timer.time
    }

    this.dataService.create(Collections.score, scoreData);
  }

  restart() {
    this.timer.reset();
    this.timer.start();
    this.goToStartPosition();
    this.startWatchingAcelerometer();
  }

  async showGameOverModal() {
    
    const modal = await this.modalController.create(
      {
        component: GameoverComponent
      }
    );

    modal.onDidDismiss().then(modalData => {
      
      if (modalData.data) {
        this.restart();
      } else {
        this.router.navigateByUrl('/home');
      }

    }); 

    modal.present();
  }
}
