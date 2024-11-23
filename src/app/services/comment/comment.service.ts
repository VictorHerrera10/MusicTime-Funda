import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../public/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  uri = environment.baseUrl + '/comments';
  constructor(private http: HttpClient) { }
  create(comment: Comment) {
    return this.http.post<Comment>(`${this.uri}`, comment);
  }
  getAll(id: Number) {
    return this.http.get<Comment[]>(`${this.uri}/${id}`);
  }
}
