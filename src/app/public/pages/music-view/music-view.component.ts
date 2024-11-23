import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Musical } from '../../models/Musical';
import { MusicalDetails } from '../../models/MusicalDetails';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.css'] // Aquí está la corrección
})
export class MusicViewComponent implements OnInit {
  myForm!: FormGroup;
  selectedfile!: any;
  photo!: SafeUrl | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getUser();
  }

  loadForm() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      musicalName: ['', Validators.required],
      description: ['', Validators.required],
      soloist: ['', Validators.required],
      managerFirstName: ['', Validators.required],
      phone: ['', Validators.required],
      managerLastName: ['', Validators.required],
      members: ['', Validators.required],
      genre: ['', Validators.required],
      typeContract: ['', Validators.required],
    });
  }

  getUser() {
    const id = localStorage.getItem('token');
    if (!id) {
      this.router.navigate(['home']);
      return;
    }
    this.userService.getMusical(Number(id)).subscribe(
      (data: MusicalDetails) => {
        if (data.photo) {
          this.photo = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${data.photo}`);
        }
        this.myForm.patchValue(data);
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }

  onChangedFile(event: any) {
    this.selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
    };
    reader.readAsDataURL(this.selectedfile);
  }

  updateMusical() {
    const musical: MusicalDetails = {
      ...this.myForm.value,
      id: Number(localStorage.getItem('token')),
      photo: ''
    };
    this.updatePhoto();
    this.userService.updateMusical(musical.id, musical).subscribe(
      (data: MusicalDetails) => {
        this.snack.open('Actualización exitosa', 'OK', { duration: 4000 });
        this.router.navigate(['home']);
      },
      error => {
        console.log(error);
      }
    );
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
}
