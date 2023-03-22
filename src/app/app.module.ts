import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { GetWeatherComponent } from './components/get-weather.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './components/result.component'

@NgModule({
  declarations: [
    AppComponent,
    GetWeatherComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
