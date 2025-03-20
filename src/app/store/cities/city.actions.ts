import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { City } from '../../models/city.model';

export const CityActions = createActionGroup({
  source: 'City/API',
  events: {
    'Load Cities': emptyProps(), 
    'Load Cities Success': props<{ cities: City[] }>(),
    'Load Cities Failure': props<{ error: string }>(),

    'Save City': props<{ city: City }>(),
    'Save City Success': props<{ city: City }>(),
    'Save City Failure': props<{ error: string }>(),

    'Update City': props<{ city: City }>(),
    'Update City Success': props<{ city: City }>(),
    'Update City Failure': props<{ error: string }>(),

    'Delete City': props<{ id: number }>(),
    'Delete City Success': props<{ id: number }>(),
    'Delete City Failure': props<{ error: string }>(),


  }
});
