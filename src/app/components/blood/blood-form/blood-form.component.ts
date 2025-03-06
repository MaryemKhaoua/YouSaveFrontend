import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloodService } from '../../../services/blood.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blood-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blood-form.component.html',
  styleUrls: ['./blood-form.component.css']
})
export class BloodFormComponent implements OnInit {
  bloodForm!: FormGroup;
  isEdit = false;
  bloodId?: number;

  constructor(
    private fb: FormBuilder,
    private bloodService: BloodService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bloodForm = this.fb.group({
      type: ['', Validators.required]
    });

    this.bloodId = this.route.snapshot.params['id'];
    if (this.bloodId) {
      this.isEdit = true;
      this.bloodService.getBloodTypeById(this.bloodId).subscribe({
        next: (blood) => this.bloodForm.patchValue(blood),
        error: (err) => console.error('Error fetching blood type', err)
      });
    }
  }

  onSubmit(): void {
    if (this.bloodForm.valid) {
      const bloodData = this.bloodForm.value;
      if (this.isEdit) {
        this.bloodService.updateBloodType(this.bloodId!, bloodData).subscribe(() => {
          this.router.navigate(['/blood']);
        });
      } else {
        this.bloodService.addBloodType(bloodData).subscribe(() => {
          this.router.navigate(['/blood']);
        });
      }
    }
  }
}
