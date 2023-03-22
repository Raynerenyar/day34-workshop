import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../model/model';
import { WeatherService } from "../weather.service"

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  returningResultSub$!: Subscription

  weather!: Weather

  constructor(private weatherSvc: WeatherService) { }

  ngOnInit(): void {

    this.returningResultSub$ = this.weatherSvc.onReturningResult.subscribe(
      (result) => {
        this.weather = result
        console.log(result)
      }
    )
  }

  ngOnDestroy(): void {
    this.returningResultSub$.unsubscribe()
  }



}
