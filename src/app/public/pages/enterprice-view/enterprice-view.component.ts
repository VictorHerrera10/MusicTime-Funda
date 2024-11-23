import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Enterprice } from '../../models/Enterprice';
import { EnterpriceDatails } from '../../models/EnterpriceDatails';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicalDetails } from '../../models/MusicalDetails';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-enterprice-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './enterprice-view.component.html',
  styleUrl: './enterprice-view.component.css'
})
export class EnterpriceViewComponent implements OnInit {
  myForm!: FormGroup;
  user!: EnterpriceDatails;
  selectedfile!: any;
  photo!: SafeUrl | undefined;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private snack: MatSnackBar, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.load();
    this.getUser();
  }
  onChangedFile(event: any) {
    this.selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
    };
    reader.readAsDataURL(this.selectedfile);
  }

  load() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      businessName: ['', Validators.required],
      businessLocation: ['', Validators.required],
      businessType: ['', Validators.required],
      description: ['', Validators.required],
      phone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }
  getUser() {
    let id = localStorage.getItem('token');
    if (!id) {
      this.router.navigate(['home']);
      return;
    }
    this.userService.getEnterpice(Number(id)).subscribe(
      (data: EnterpriceDatails) => {
        if (data.photo) {
          this.photo = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${data.photo}`);
        }
        this.user = data;
        this.myForm.get('email')?.setValue(data.email);
        this.myForm.get('password')?.setValue(data.password);
        this.myForm.get('businessName')?.setValue(data.businessName);
        this.myForm.get('businessLocation')?.setValue(data.businessLocation);
        this.myForm.get('businessType')?.setValue(data.businessType);
        this.myForm.get('phone')?.setValue(data.phone);
        this.myForm.get('firstName')?.setValue(data.firstName);
        this.myForm.get('lastName')?.setValue(data.lastName);
        this.myForm.get('description')?.setValue(data.description);
      },
      error => {
        this.router.navigate(['home']);
      }
    )
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
  updateEnterprice() {
    let enterprice: EnterpriceDatails = {
      id: Number(localStorage.getItem('token')),
      firstName: this.myForm.get('firstName')?.value,
      lastName: this.myForm.get('lastName')?.value,
      businessName: this.myForm.get('businessName')?.value,
      phone: this.myForm.get('phone')?.value,
      businessLocation: this.myForm.get('businessLocation')?.value,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value,
      description: this.myForm.get('description')?.value,
      userType: '',
      businessType: this.myForm.get('businessType')?.value,
      photo: ''
    }
    this.updatePhoto()
    this.userService.updateEnteprice(enterprice.id, enterprice).subscribe(
      (data: EnterpriceDatails) => {
        this.snack.open('Actualización exitosa', 'OK', { duration: 4000 });
        this.router.navigate(['home']);
      }, error => {
        console.log(error);
      }
    )
  }
}
