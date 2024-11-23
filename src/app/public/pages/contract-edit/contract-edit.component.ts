import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from '../../../services/event/event.service';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEvent } from '../../models/Event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormField, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contract-edit.component.html',
  styleUrl: './contract-edit.component.css'
})
export class ContractEditComponent implements OnInit {
  myForm!: FormGroup;
  event!: IEvent;
  constructor(private eventService: EventService, private formBuilder: FormBuilder, private userService: UserService, private activated: ActivatedRoute, private snack: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
    this.load()
    this.getEvent()
  }
  getEvent() {
    let id = this.activated.snapshot.params['id'];
    this.eventService.getEvent(Number(id)).subscribe(
      (data: IEvent) => {
        this.event = data;
        this.myForm.get('address')?.setValue(data.address);
        this.myForm.get('amount')?.setValue(data.amount);
        this.myForm.get('initialDate')?.setValue(data.initialDate);
        this.myForm.get('hours')?.setValue(data.hours);
        this.myForm.get('typeContract')?.setValue(data.typeContact);
        this.myForm.get('reason')?.setValue(data.reason);
      },
      error => {
        console.log(error);
      }
    )
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
      id: this.event.id,
      address: this.myForm.get('address')?.value,
      reason: this.myForm.get('reason')?.value,
      typeContact: this.myForm.get('typeContract')?.value,
      hours: this.myForm.get('hours')?.value,
      amount: this.myForm.get('amount')?.value,
      customer: { id: this.event.customer.id },
      musical: { id: this.event.musical.id },
      initialDate: this.myForm.get('initialDate')?.value,
      status: '0'
    }
    this.eventService.create(event).subscribe(
      (data: IEvent) => {
        this.snack.open('Contract Updated', 'OK', { duration: 4000 })
        this.router.navigate(['contract-view'])
      }, error => {
        console.log(error)
        this.snack.open('Error on server  ', 'OK', { duration: 40000 });
      }
    )
  }
}
