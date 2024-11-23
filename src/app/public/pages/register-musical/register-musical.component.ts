import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user/user.service';
import { Musical } from '../../models/Musical';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-register-musical',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register-musical.component.html',
  styleUrl: './register-musical.component.css'
})
export class RegisterMusicalComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private comunicacionService: ComunicacionService, private userService: UserService, private formBuilder: FormBuilder, private router: Router,
    private snack: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.myForm = this.formBuilder.group({
      musicalName: ['', Validators.required],
      description: ['', Validators.required],
      soloist: ['', Validators.required],
    })
  }
  crear() {
    let user: Musical = {
      id: Number(localStorage.getItem('token')) || 0,
      musicalName: this.myForm.get('musicalName')?.value,
      description: this.myForm.get('description')?.value,
      soloist: this.myForm.get('soloist')?.value,
    }

    this.userService.createMusical(user).subscribe(
      (data: Musical) => {
        this.comunicacionService.emitirLogin();
        this.router.navigate(['home']);
      },
      error => {
        this.snack.open(error.error.message, 'OK', { duration: 4000 });
      }
    )
  }
}
