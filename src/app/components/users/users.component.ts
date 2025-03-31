  import { Component, OnInit } from '@angular/core';
  import { UserService } from '../../services/user.service';
  import { NavbarComponent } from '../../layout/navbar/navbar.component';
  import { NgClass, NgFor, NgIf } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
  import Swal from 'sweetalert2';


  @Component({
    selector: 'app-user',
    standalone:true,
    imports: [NavbarComponent, NgClass, NgFor, NgIf, FormsModule, SidebarComponent],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
  })
  export class UserComponent implements OnInit {
    users: any[] = [];
    roles: string[] = [];
    isRoleChangeModalOpen = false;
    selectedUser: any = null;
    selectedRole: string = '';

    constructor(private userService: UserService) {}

    ngOnInit(): void {
      this.loadUsers();
      this.loadRoles();
    }

    loadUsers(): void {
      this.userService.getAllUsersWithRoles().subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    }

    loadRoles(): void {
      this.userService.getRoles().subscribe(
        (roles) => {
          this.roles = roles;
        },
        (error) => {
          console.error('Error loading roles:', error);
        }
      );
    }

    openRoleChangeModal(user: any): void {
      this.selectedUser = user;
      this.selectedRole = user.roles[0];
      this.isRoleChangeModalOpen = true;
    }

    closeRoleChangeModal(): void {
      this.isRoleChangeModalOpen = false;
      this.selectedUser = null;
      this.selectedRole = '';
    }

    updateUserRole(): void {
      if (!this.selectedUser || !this.selectedRole) return;
    
      const roleChangeRequest = { newRoleName: this.selectedRole };
    
      this.userService.updateUserRole(this.selectedUser.id, roleChangeRequest).subscribe({
        next: (response) => {
          console.log(response); 
    
          const updatedUserIndex = this.users.findIndex(u => u.id === this.selectedUser.id);
          if (updatedUserIndex !== -1) {
            this.users[updatedUserIndex].roles = [this.selectedRole];
          }
    
          this.closeRoleChangeModal();
    
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Role updated successfully!',
            confirmButtonColor: '#D32F2F'
          });
        },
        error: (error) => {
          console.error('Error updating user role:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error updating role. Please try again.',
            confirmButtonColor: '#D32F2F'
          });
        }
      });
    }
    

  }