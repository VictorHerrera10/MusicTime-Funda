import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInput, MatFormFieldModule, MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private comunicacionService: ComunicacionService, private userService: UserService, private formBilder: FormBuilder, private router: Router, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.myForm = this.formBilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }
  login() {
    let user: User = {
      id: 0,
      userType: "",
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value
    }
    this.userService.login(user).subscribe(
      (data: User) => {
        localStorage.setItem('token', data.id.toString());
        this.comunicacionService.emitirLogin();
        this.router.navigate(['home']);
      },
      error => {
        console.log(error);
        this.snack.open(error.error.message, 'OK', { duration: 4000 });
      }
    )
  }

}
