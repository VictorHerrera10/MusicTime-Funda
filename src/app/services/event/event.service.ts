import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEvent } from '../../public/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  uri = environment.baseUrl + '/events';
  constructor(private http: HttpClient) { }
  create(comment: IEvent) {
    return this.http.post<IEvent>(`${this.uri}`, comment);
  }
  getAll(id: Number) {
    return this.http.get<IEvent[]>(`${this.uri}/${id}`);
  }
  getEvent(id: Number) {
    return this.http.get<IEvent>(`${this.uri}/retrieve/${id}`);
  }
}
