import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDetails } from '../../models/CustomerDetails';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { MusicalDetails } from '../../models/MusicalDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../services/event/event.service';
import { IEvent } from '../../models/Event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contract-create',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormField, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.css'
})
export class ContractCreateComponent implements OnInit {
  customer!: CustomerDetails;
  musical!: MusicalDetails;
  myForm!: FormGroup;
  constructor(private eventService: EventService, private formBuilder: FormBuilder, private userService: UserService, private activated: ActivatedRoute, private snack: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.getCustomer();
    this.getMusical();
    this.load()
  }
  load() {
    this.myForm = this.formBuilder.group({
      initialDate: ['', Validators.required],
      address: ['', Validators.required],
      reason: ['', Validators.required],
      typeContract: ['', Validators.required],
      hours: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }
  create() {
    let event: IEvent = {
      id: 0,
      address: this.myForm.get('address')?.value,
      reason: this.myForm.get('reason')?.value,
      typeContact: this.myForm.get('typeContract')?.value,
      hours: this.myForm.get('hours')?.value,
      amount: this.myForm.get('amount')?.value,
      customer: { id: this.customer.id },
      musical: { id: this.musical.id },
      initialDate: this.myForm.get('initialDate')?.value,
      status: '0'
    }
    this.eventService.create(event).subscribe(
      (data: IEvent) => {
        this.snack.open('Contrato creado', 'OK', { duration: 4000 })
        this.router.navigate(['contract-view'])
      }, error => {
        console.log(error)
        this.snack.open('Ocurrio un  error', 'OK', { duration: 40000 });
      }
    )
  }
  getCustomer() {
    let id = localStorage.getItem('token')
    this.userService.getCustomer(Number(id)).subscribe(
      (data: CustomerDetails) => {
        this.customer = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getMusical() {
    let id = this.activated.snapshot.params['id'];
    this.userService.getMusical(Number(id)).subscribe(
      (data: MusicalDetails) => {
        this.musical = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
