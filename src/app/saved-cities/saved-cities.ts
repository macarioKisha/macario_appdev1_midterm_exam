import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CityService } from '../service/city';

@Component({
  selector: 'app-saved-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-cities.html',
  styleUrls: ['./saved-cities.css']
})
export class SavedCities implements OnInit {
  savedCities: any[] = [];

  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.loadSaved();
  }

  private loadSaved() {
    this.savedCities = this.cityService.getSavedCities() || [];
  }

  remove(index: number) {
    this.cityService.removeSavedCity(index);
    this.loadSaved();
  }

  clearAll() {
    this.cityService.clearSaved();
    this.loadSaved();
  }

  back() {
    this.router.navigate(['/home']);
  }
}
