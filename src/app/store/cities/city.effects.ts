import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CityService } from '../../services/cities.service';
import { CityActions } from './city.actions';

@Injectable()
export class CityEffects {

  private actions$ = inject(Actions);
  private cityService = inject(CityService);

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCities),
      tap(() => console.log('loadCities action dispatched')),
      mergeMap(() =>
        this.cityService.getCities().pipe(
          map((cities) => CityActions.loadCitiesSuccess({ cities })),
          catchError((error) =>
            of(CityActions.loadCitiesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.saveCity),
      mergeMap(({ city }) =>
        this.cityService.saveCity(city).pipe(
          map(savedCity => CityActions.saveCitySuccess({ city: savedCity })),
          catchError(error => of(CityActions.saveCityFailure({ error: error.message })))
        )
      )
    )
  );

  updateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.updateCity),
      mergeMap(({ city }) =>
        this.cityService.updateCity(city).pipe(
          map(updatedCity => CityActions.updateCitySuccess({ city: updatedCity })),
          catchError(error => of(CityActions.updateCityFailure({ error: error.message })))
        )
      )
    )
  );
  

  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.deleteCity),
      mergeMap(({ id }) =>
        this.cityService.deleteCity(id).pipe(
          map(() => CityActions.deleteCitySuccess({ id })),
          catchError(error => of(CityActions.deleteCityFailure({ error: error.message })))
        )
      )
    )
  );
}
