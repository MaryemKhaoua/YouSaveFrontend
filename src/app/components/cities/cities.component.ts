import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { City } from '../../models/city.model';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { selectFilteredCities } from '../../store/cities/city.reducer';
import { CityActions } from '../../store/cities/city.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-city',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, NavbarComponent, SidebarComponent, CommonModule],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities$: Observable<City[]>;


  newCity: City = { name: '' };
  selectedCity: City | null = null;

  isModalOpen = false;
  isUpdateFormOpen = false;

  constructor(private store: Store) {
    this.cities$ = this.store.select(selectFilteredCities);
  
  }
  ngOnInit(): void {
    console.log('CitiesComponent initialized');
    this.store.dispatch(CityActions.loadCities());
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newCity = { name: '' };
  }

  openUpdateForm(city: City): void {
    this.selectedCity = { ...city, id: city.id };
    this.isUpdateFormOpen = true;
  }

  closeUpdateForm(): void {
    this.isUpdateFormOpen = false;
    this.selectedCity = null;
  }

  addCity(): void {
    if (this.newCity.name.trim()) {
      let existingCities: City[] = [];
  
      this.cities$.subscribe((cities) => {
        existingCities = cities;
      }).unsubscribe();
  
      const cityExists = existingCities.some(
        (city) => city.name.toLowerCase() === this.newCity.name.toLowerCase()
      );
  
      if (cityExists) {
        Swal.fire({
          icon: 'warning',
          title: 'City Already Exists',
          text: `The city "${this.newCity.name}" already exists.`,
          confirmButtonText: 'OK'
        });
      } else {
        this.store.dispatch(CityActions.saveCity({ city: this.newCity }));
        this.closeModal();
      }
    }
  }
  updateCity(): void {
    if (this.selectedCity && this.selectedCity.name.trim()) {
      this.store.dispatch(CityActions.updateCity({ city: this.selectedCity }));
      this.closeUpdateForm();
    }
  }

  deleteCity(id: number): void {
    this.store.dispatch(CityActions.deleteCity({ id }));
  }
}
