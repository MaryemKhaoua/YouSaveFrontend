import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodService } from '../../../services/blood.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-blood-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, FormsModule],
  templateUrl: './blood-list.component.html',
  styleUrls: ['./blood-list.component.css']
})
export class BloodListComponent implements OnInit {
  bloodTypes: any[] = [];
   userCounts: { [key: string]: number } = {};
   newBlood = { type: '' };
   selectedBloodType: any = { type: '' };
 
   isModalOpen = false;
   isUpdateFormOpen = false;
 
   constructor(private bloodService: BloodService) {}
 
   ngOnInit(): void {
     this.fetchBloodTypes();
     this.fetchUserCounts();
   }
 
   openModal(): void {
     this.isModalOpen = true; 
   }
 
   closeModal(): void {
     this.isModalOpen = false;
   }
 
   openUpdateForm(blood: any): void {
     console.log(blood);
     this.selectedBloodType = { ...blood }; 
     this.isUpdateFormOpen = true;
   }
   
 
   closeUpdateForm(): void {
     this.isUpdateFormOpen = false;
   }
 
   addBloodType(): void {
    if (!this.newBlood.type.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please provide a valid blood type.',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    const bloodTypeExists = this.bloodTypes.some(
      (blood) => blood.type.toLowerCase() === this.newBlood.type.toLowerCase()
    );
  
    if (bloodTypeExists) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Blood Type',
        text: `The blood type "${this.newBlood.type}" already exists.`,
        confirmButtonText: 'OK'
      });
    } else {
      this.bloodService.addBloodType(this.newBlood).subscribe({
        next: () => {
          this.fetchBloodTypes();
          this.newBlood = { type: '' };
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Blood type added successfully.',
            confirmButtonText: 'OK'
          });
        },
        error: (err) => {
          console.error('Failed to add blood type', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add blood type. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
  
   updateBloodType(): void {
     if (!this.selectedBloodType.type) {
       alert('Please provide a valid blood type.');
       return;
     }
 
     this.bloodService.updateBloodType(this.selectedBloodType.id, { type: this.selectedBloodType.type }).subscribe({
       next: () => {
         this.fetchBloodTypes();
         this.closeUpdateForm();
       },
       error: (err) => console.error('Failed to update blood type', err)
     });
   }
 
   fetchBloodTypes(): void {
     this.bloodService.getBloodTypes().subscribe({
       next: (data) => {
         this.bloodTypes = data.map((blood) => ({
           ...blood,
           amount: this.userCounts[blood.type] || 0,
           status: this.getStatus(this.userCounts[blood.type] || 0)
         }));
       },
       error: (err) => console.error('Failed to fetch blood types', err)
     });
   }
 
   fetchUserCounts(): void {
     this.bloodService.getUserCountsByBloodType().subscribe({
       next: (counts) => {
         this.userCounts = counts;
         this.bloodTypes = this.bloodTypes.map((blood) => ({
           ...blood,
           amount: counts[blood.type] || 0,
           status: this.getStatus(counts[blood.type] || 0)
         }));
       },
       error: (err) => console.error('Failed to fetch user counts', err)
     });
   }
 
   getStatus(count: number): string {
     if (count > 5) return 'Available';
     if (count > 0 && count <= 5) return 'Low';
     return 'Unavailable';
   }
 
   deleteBloodType(id: number): void {
     Swal.fire({
       title: 'Are you sure?',
       text: 'You won\'t be able to revert this!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#d33',
       cancelButtonColor: '#3085d6',
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
     }).then((result) => {
       if (result.isConfirmed) {
         this.bloodService.deleteBloodType(id).subscribe({
           next: () => {
             Swal.fire(
               'Deleted!',
               'Your blood type has been deleted.',
               'success'
             );
             this.fetchBloodTypes();
           },
           error: (err) => {
             console.error('Failed to delete blood type', err);
             Swal.fire(
               'Error!',
               'There was an error deleting the blood type.',
               'error'
             );
           }
         });
       }
     });
   }
 }
 
 