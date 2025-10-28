import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../service/weather';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CityWeather {
  city: string;
  weather?: any; 
  error?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  cityInput = '';
  cities: CityWeather[] = [];
  displayCount: string = 'all';
  temperatureFilter: 'all' | 'hot' | 'cold' = 'all';
  apiError = '';

  constructor(private weatherService: Weather, private router: Router) {}

  addCity() {
    this.apiError = '';
    if (!this.cityInput.trim()) {
      return;
    }

    if (this.cities.some(c => c.city.toLowerCase() === this.cityInput.toLowerCase())) {
      this.apiError = 'City is already added to the dashboard';
      return;
    }

    const newCity: CityWeather = { city: this.cityInput };
    this.cities.push(newCity);

    this.weatherService.getWeather(this.cityInput).subscribe({
      next: (data) => {
        newCity.weather = data;
      },
      error: (error) => {
        newCity.error = 'Failed to load weather data';
        console.error('Weather API error:', error);
        this.apiError = 'Failed to fetch weather data. Please check the city name and try again.';
      }
    });

    this.cityInput = '';
  }

  saveCities() {
    this.apiError = '';
    if (this.cities.length === 0) {
      this.apiError = 'No cities to save';
      return;
    }
    const payload = this.cities.map(c => ({
      city: c.city,
      weather: c.weather ?? null,
      error: c.error ?? null
    }));
    localStorage.setItem('savedCities', JSON.stringify(payload));
    this.router.navigate(['/saved']);
  }
  removeCity(index: number) {
    this.cities.splice(index, 1);
  }

  removeCityByName(name: string) {
    const idx = this.cities.findIndex(c => c.city.toLowerCase() === name.toLowerCase());
    if (idx > -1) {
      this.cities.splice(idx, 1);
    }
  }
}

