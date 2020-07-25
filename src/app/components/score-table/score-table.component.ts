import { Collections } from './../../model/enums/collections.enum';
import { ScoreRecord } from './../../model/score-record';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss'],
})
export class ScoreTableComponent implements OnInit {

  scoredList: ScoreRecord[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll2('puntaje_juego').subscribe(scoreData => {
      this.scoredList = scoreData as ScoreRecord[];
      console.log(scoreData);
    });
  }

}
