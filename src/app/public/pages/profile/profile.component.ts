import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { MusicalDetails } from '../../models/MusicalDetails';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../services/comment/comment.service';
import { Comment } from '../../models/Comment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingService } from '../../../services/rating/rating.service';
import { Rating } from '../../models/Rating';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  musical!: MusicalDetails;
  id!: Number;
  myForm!: FormGroup;
  comments: Comment[] = [];
  points = 0;
  constructor(private formBuilder: FormBuilder, private activated: ActivatedRoute, private userService: UserService, private commentService: CommentService, private ratingService: RatingService) { }

  givePoint(_points: Number) {
    let customerId = Number(localStorage.getItem('token'));
    let rating: Rating = {
      id: customerId + Number(this.id),
      customer: { id: customerId },
      points: _points,
      musical: { id: this.musical.id }
    }
    this.ratingService.create(rating).subscribe(
      (data: Rating) => {
        this.points = Number(data.points);
      },
      error => {
        console.log(error)
      }
    )
  }
  getPoint() {
    this.ratingService.getRating(this.id).subscribe(
      (data: Number) => {
        this.points = Number(data);
      }, error => {
        console.log(error)
      }
    )
  }
  ngOnInit(): void {
    this.id = Number(this.activated.snapshot.paramMap.get('id'))
    this.getMusical(this.id);
    this.getComments();
    this.load();
    this.getPoint()
  }
  load() {
    this.myForm = this.formBuilder.group({
      description: ['', Validators.required]
    })
  }
  getMusical(id: Number) {
    this.userService.getMusical(id).subscribe(
      (data: MusicalDetails) => {
        this.musical = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getComments() {
    this.commentService.getAll(this.id).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      error => {
        console.log(error)
      }
    )
  }
  addComment() {
    let comment: Comment = {
      id: 0,
      author: { id: Number(localStorage.getItem('token')) },
      musical: { id: this.id },
      createdAt: new Date(),
      description: this.myForm.get('description')?.value
    }
    this.commentService.create(comment).subscribe(
      (data: Comment) => {
        this.getComments()
      },
      error => {
        console.log(error);
      }
    )
  }
}
