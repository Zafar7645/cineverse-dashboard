import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { IMovie } from '../models/movie';
import { MovieDbService } from '../services/movie-db.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  popularMoviesList: IMovie[] = [];
  displayedMovieList: IMovie[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  private searchQuery = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(private movieDbService: MovieDbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    this.movieDbService.getPopularMovies().subscribe({
      next: (movies) => {
        this.popularMoviesList = movies.results;
        this.displayedMovieList = this.popularMoviesList;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });

    this.searchSubscription = this.searchQuery
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) {
            this.displayedMovieList = this.popularMoviesList;
            return of(null);
          }

          this.isLoading = true;
          return this.movieDbService.searchMovie(query);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.displayedMovieList = response.results;
        }
        this.isLoading = false;
      });
  }

  handleSearch(query: string): void {
    this.searchQuery.next(query);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
