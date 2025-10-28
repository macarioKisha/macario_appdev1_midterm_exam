import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private STORAGE_KEY = 'savedCities';

  getSavedCities(): any[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveCities(cities: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cities));
  }

  addCity(city: any): void {
    const list = this.getSavedCities();
    list.push(city);
    this.saveCities(list);
  }

  removeSavedCity(index: number): void {
    const list = this.getSavedCities();
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
      this.saveCities(list);
    }
  }

  clearSaved(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
