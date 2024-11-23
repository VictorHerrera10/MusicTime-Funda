import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/User';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormField, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private comunicacionService: ComunicacionService, private userService: UserService, private formBuilder: FormBuilder, private router: Router,
    private snack: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  create() {
    let user: User = {
      id: 0,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value,
      userType: '0'
    };
    this.userService.createUser(user).subscribe(
      (data: User) => {
        localStorage.setItem('token', `${data.id}`);
        this.comunicacionService.emitirLogin();
        this.router.navigate(['register-customer']);
      },
      error => {
        this.snack.open(error.error.message, 'OK', { duration: 5000 })
      }
    )
  }
}
