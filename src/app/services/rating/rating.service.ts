import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../../public/models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  uri = environment.baseUrl + '/ratings';
  constructor(private http: HttpClient) { }
  create(rating: Rating) {
    return this.http.post<Rating>(`${this.uri}`, rating);
  }
  getRating(id: Number) {
    return this.http.get<Number>(`${this.uri}/${id}`);
  }
}
