import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SavedCities } from './saved-cities/saved-cities';
export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'saved', component: SavedCities},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
