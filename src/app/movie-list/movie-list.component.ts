import { Component, OnInit } from '@angular/core';

import { IMovie } from '../models/movie';
import { MovieDbService } from '../services/movie-db.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList: IMovie[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private movieDbService: MovieDbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    this.movieDbService.getPopularMovies().subscribe({
      next: (movies) => {
        this.movieList = movies.results;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }
}
