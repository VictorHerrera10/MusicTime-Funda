import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-suscription',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './suscription.component.html',
  styleUrl: './suscription.component.css'
})
export class SuscriptionComponent {

}
