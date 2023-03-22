import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit, Output } from "@angular/core";
import { firstValueFrom, map, Observable, Subject, Subscription } from "rxjs";
import { Weather } from "./model/model";
import { environment } from "../environments/environment";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
// https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=710af3a3a5d63f4d5f76ee556a353751

@Injectable() // can put provider here or in module.ts
export class WeatherService implements OnDestroy, OnInit {

    onGettingWeather = new Subject<string>
    onGettingWeatherSub$!: Subscription
    gettingWeatherSub$!: Subscription
    onReturningResult = new Subject<Weather>

    constructor(private http: HttpClient) {
        this.initialise()
    }

    // works with directives and components, not on service
    ngOnInit(): void {
    }

    initialise() {

        // this cannot be used in ngOnInit as it is not a component. 
        // has to be in the constructor
        this.onGettingWeatherSub$ = this.onGettingWeather.subscribe((city) => {
            this.gettingWeatherSub$ = this.getWeatherObservable(city).subscribe(
                (result) => this.onReturningResult.next(result)
            )
        }
        )

    }

    ngOnDestroy(): void {
        this.onGettingWeatherSub$.unsubscribe()
        this.gettingWeatherSub$.unsubscribe()
    }

    getWeatherObservable(city: string): Observable<Weather> {
        const params = new HttpParams()
            .set('q', city)
            .set('units', 'metric')
            .set('appid', environment.WEATHER_API_KEY)

        return this.http.get<Weather>(WEATHER_URL, { params })
            .pipe(
                map((jsonData: any) => {
                    // console.log(jsonData)
                    let res: Weather = {
                        description: jsonData.weather[0].description,
                        name: jsonData.name,
                        icon: jsonData.weather[0].icon,
                        country: jsonData.sys.country
                    }
                    return res
                })
            )
    }
}