import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule)
  ]
}).catch(err => console.error(err));
