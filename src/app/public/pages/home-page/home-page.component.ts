import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MusicalDetails } from '../../models/MusicalDetails';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  musicals: MusicalDetails[] = []
  filter: MusicalDetails[] = []
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getMusicals();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = this.musicals.filter(x => x.musicalName.toLowerCase().includes(filterValue.toLowerCase()) || x.genre.includes(filterValue) || x.description.includes(filterValue));
  }
  getMusicals() {
    this.userService.getAllMusicals().subscribe(
      (data: MusicalDetails[]) => {
        this.musicals = data;
        this.filter = data;
      },
      error => {
        console.log(error)
      }
    )
  }
}
