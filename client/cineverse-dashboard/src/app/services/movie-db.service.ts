import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IMovieDetails } from '../components/models/movie';
import { IMovieList } from '../components/models/movie-list';

@Injectable({
  providedIn: 'root',
})
export class MovieDbService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<IMovieList> {
    const endpoint = '/api/popular-movies';
    return this.httpClient
      .get<IMovieList>(this.baseUrl + endpoint)
      .pipe(catchError(this.handleError));
  }

  getMovieDetails(id: number): Observable<IMovieDetails> {
    const endpoint = `/api/movie/${id}`;
    return this.httpClient
      .get<IMovieDetails>(this.baseUrl + endpoint)
      .pipe(catchError(this.handleError));
  }

  searchMovie(query: string): Observable<IMovieList> {
    const endpoint = '/api/search/movie';
    const params = new HttpParams().set('query', query);
    return this.httpClient
      .get<IMovieList>(this.baseUrl + endpoint, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occured: ', error.message);
    return throwError(
      () => new Error('Something went wrong, please try again later.')
    );
  }
}
