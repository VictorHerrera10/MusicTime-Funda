import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { EnterpriceDatails } from '../../models/EnterpriceDatails';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDetails } from '../../models/CustomerDetails';
import { Customer } from '../../models/Customer';
import { SafeUrl } from '@angular/platform-browser';
import { MusicalDetails } from '../../models/MusicalDetails';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent {
  myForm!: FormGroup;
  user!: CustomerDetails;
  selectedfile!: any;
  photo!: SafeUrl | undefined;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.load();
    this.getUser();
  }
  onChangedFile(event: any) {
    this.selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result;
    };
    reader.readAsDataURL(this.selectedfile);
  }

  updatePhoto() {
    const _data = new FormData();
    const id = localStorage.getItem('token');
    _data.append('photo', this.selectedfile);
    this.userService.updatePhoto(Number(id), _data).subscribe({
      next: (data: MusicalDetails) => {
        this.selectedfile = null;
      },
      error: e => console.log(e)
    });
  }
  load() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  getUser() {
    let id = localStorage.getItem('token');
    if (!id) {
      this.router.navigate(['home']);
      return;
    }
    this.userService.getCustomer(Number(id)).subscribe(
      (data: CustomerDetails) => {
        if (data.photo) {
          this.photo = `data:image/jpg;base64,${data.photo}`;
        }
        this.user = data;
        this.myForm.get('email')?.setValue(data.email);
        this.myForm.get('password')?.setValue(data.password);
        this.myForm.get('firstName')?.setValue(data.firstName);
        this.myForm.get('lastName')?.setValue(data.lastName);
        this.myForm.get('phone')?.setValue(data.phone);
        this.myForm.get('description')?.setValue(data.description);
      },
      error => {
        this.router.navigate(['home']);
      }
    )
  }
  updateCustomer() {
    let customer: CustomerDetails = {
      id: Number(localStorage.getItem('token')),
      firstName: this.myForm.get('firstName')?.value,
      lastName: this.myForm.get('lastName')?.value,
      phone: this.myForm.get('phone')?.value,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value,
      description: this.myForm.get('description')?.value,
      userType: '',
      photo: ''
    }
    this.updatePhoto()
    this.userService.updateCustomer(customer.id, customer).subscribe(
      (data: CustomerDetails) => {
        this.snack.open('Actualización exitosa', 'OK', { duration: 4000 });
        this.router.navigate(['home']);
      }, error => {
        console.log(error);
      }
    )
  }
}
