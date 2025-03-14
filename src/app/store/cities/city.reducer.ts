import { createFeature, createReducer, on } from '@ngrx/store';
import { CityActions } from './city.actions';
import { City } from '../../models/city.model';

export interface CityState {
  cities: City[];
  filteredCities: City[];
  searchTerm: string;
  error: string | null;
  loading: boolean;
}

const initialState: CityState = {
  cities: [],
  filteredCities: [],
  searchTerm: '',
  error: null,
  loading: false,
};

export const cityFeature = createFeature({
  name: 'citiesFeatureKey',
  reducer: createReducer(
    initialState,

    on(CityActions.loadCities, (state) => ({
      ...state,
      loading: true,
      error: null
    })),

    on(CityActions.loadCitiesSuccess, (state, { cities }) => ({
      ...state,
      cities,
      filteredCities: cities,
      loading: false,
      error: null
    })),

    on(CityActions.loadCitiesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(CityActions.saveCity, (state, { city }) => ({
      ...state,
      cities: [...state.cities, city],
      filteredCities: [...state.filteredCities, city]
    })),

    on(CityActions.updateCitySuccess, (state, { city }) => ({
        ...state,
        cities: state.cities.map(c => c.id === city.id ? city : c),
        filteredCities: state.filteredCities.map(c => c.id === city.id ? city : c)
      })),      

    on(CityActions.deleteCity, (state, { id }) => ({
      ...state,
      cities: state.cities.filter(city => city.id !== id),
      filteredCities: state.filteredCities.filter(city => city.id !== id)
    })),

  )
});

export const { name: cityFeatureKey, reducer: cityReducer, selectCities, selectFilteredCities, selectLoading, selectError } = cityFeature;
