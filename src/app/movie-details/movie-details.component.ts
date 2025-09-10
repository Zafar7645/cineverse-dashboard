import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovieDetails } from '../components/models/movie';
import { MovieDbService } from '../services/movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
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
