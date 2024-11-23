import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { Enterprice } from '../../models/Enterprice';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-register-enterprice',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register-enterprice.component.html',
  styleUrl: './register-enterprice.component.css'
})
export class RegisterEnterpriceComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private comunicacionService: ComunicacionService, private userService: UserService, private formBuilder: FormBuilder, private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.myForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
      businessLocation: ['', Validators.required],
    })
  }
  crear() {
    let user: Enterprice = {
      id: Number(localStorage.getItem('token')) || 0,
      businessName: this.myForm.get('businessName')?.value,
      businessType: this.myForm.get('businessType')?.value,
      businessLocation: this.myForm.get('businessLocation')?.value,
    }
    this.userService.createEnterprice(user).subscribe(
      (data: Enterprice) => {
        this.comunicacionService.emitirLogin();
        this.router.navigate(['home']);
      },
      error => {
        this.snack.open(error.error.message, 'OK', { duration: 4000 });
      }
    )
  }
}
