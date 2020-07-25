import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public introMusic = new Audio("assets/sounds/avengers.mp3");
  public spidermanMusic = new Audio("assets/sounds/spiderman.mp3");
  public supermanMusic = new Audio("assets/sounds/superman.mp3");
  public gameOver = new Audio("assets/sounds/gameover.wav");


  constructor() { 
    this.introMusic.volume = 0.06;
    this.spidermanMusic.volume = 0.06;
    this.supermanMusic.volume = 0.06;
    this.gameOver.volume = 1;
    this.spidermanMusic.currentTime = 2;
    this.supermanMusic.currentTime = 2;
  }

  public stopAll() {
    this.spidermanMusic.pause();
    this.supermanMusic.pause();
    this.introMusic.currentTime = 0;
    this.spidermanMusic.currentTime = 2;
    this.supermanMusic.currentTime = 2;
  }

}
