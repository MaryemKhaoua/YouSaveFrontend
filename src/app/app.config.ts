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
import { postReducer, postFeatureKey } from './store/posts/post.reducer';
import { PostEffects } from './store/posts/post.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      [cityFeatureKey]: cityReducer, 
      [postFeatureKey]: postReducer,
    }), 
    provideEffects([CityEffects, PostEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
