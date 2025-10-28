import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
  };
  location: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = '10d4ed9e7b4aba044f087548598d864f';
  private baseUrl = 'https://api.weatherstack.com/current';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?access_key=${this.apiKey}&query=${city}`;
    return this.http.get<WeatherData>(url);
  }
}
