import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../../models/Customer';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';
@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private comunicacionService: ComunicacionService, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }
  create() {
    let user: Customer = {
      id: Number(localStorage.getItem('token')) || 0,
      firstName: this.myForm.get('firstName')?.value,
      lastName: this.myForm.get('lastName')?.value,
      phone: this.myForm.get('phone')?.value
    }
    this.userService.createCustomer(user).subscribe(
      (data: Customer) => {
        this.comunicacionService.emitirLogin();
        this.router.navigate(['home']);
      },
      error => {
        this.snack.open(error.error.message, 'OK', { duration: 4000 });
      }
    )
  }

}
