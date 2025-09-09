import { Component, Input } from '@angular/core';

import { IMovie } from '../models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie!: IMovie;

  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
}
