import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';
@Component({
  selector: 'app-toolbar-content',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule],
  templateUrl: './toolbar-content.component.html',
  styleUrl: './toolbar-content.component.css'
})
export class ToolbarContentComponent implements OnInit {
  user!: User;
  constructor(private comunicacionService: ComunicacionService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.getUser();
    this.comunicacionService.loginEvent$.subscribe(() => {
      this.getUser();
    });
  }
  getUser() {
    const id = localStorage.getItem('token');
    if (!id) return;
    this.userService.getUser(Number(id)).subscribe(
      (data: User) => {
        this.user = data;
        if (data.userType == '0') {
          this.router.navigate(['register-customer'])
        }
      }
    )
  }
  getProfile() {
    if (this.user.userType == '1') {
      this.router.navigate(['customer-view']);
    } else if (this.user.userType == '2') {
      this.router.navigate(['musical-view']);
    } else if (this.user.userType == '3') {
      this.router.navigate(['enterprice-view']);
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
    window.location.reload()
  }
}
