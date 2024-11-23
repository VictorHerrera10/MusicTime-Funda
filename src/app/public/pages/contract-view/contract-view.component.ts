import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event/event.service';
import { IEvent } from '../../models/Event';

@Component({
  selector: 'app-contract-view',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './contract-view.component.html',
  styleUrl: './contract-view.component.css'
})
export class ContractViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'date', 'options'];
  dataSource = new MatTableDataSource<IEvent>([]);
  status = ['Pendiente', 'Activo'];
  events: IEvent[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eventService: EventService) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getContracts()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: IEvent, filter: string) =>
      data.musical.musicalName.toLowerCase().includes(filter);
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getContracts() {
    let id = localStorage.getItem('token');
    this.eventService.getAll(Number(id)).subscribe(
      (data: IEvent[]) => {
        this.events = data;
        this.dataSource = new MatTableDataSource<IEvent>(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}