import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-get-weather',
  templateUrl: './get-weather.component.html',
  styleUrls: ['./get-weather.component.css']
})
export class GetWeatherComponent implements OnInit {

  ARR_OF_CITIES = ["singapore", "Kushima", "Okinawa"]
  inputForm!: FormGroup

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      city: this.fb.control<string>('', Validators.required)
    })
  }

  submit() {
    let value = this.inputForm.get('city')!.value
    console.log(value)
    // this.weatherSvc.getWeather(value)
    // this.weatherSvc.getWeatherObservable(value)
    this.weatherSvc.onGettingWeather.next(value)
  }


}
