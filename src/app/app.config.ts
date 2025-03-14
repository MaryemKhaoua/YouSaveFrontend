import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cityReducer, cityFeatureKey } from './store/cities/city.reducer';
import { CityEffects } from './store/cities/city.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ [cityFeatureKey]: cityReducer }), 
    provideEffects([CityEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};