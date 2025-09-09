import { Component, Input, OnInit } from '@angular/core';
import { IMovie, IMovieDetails } from '../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDbService } from '../services/movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: IMovieDetails;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.getMovie(params['id']);
    });
  }

  private getMovie(id: number): void {
    this.movieDbService.getMovieDetails(id).subscribe({
      next: (movieDetails) => {
        this.movieDetails = movieDetails;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }
}
