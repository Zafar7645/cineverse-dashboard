import { catchError, Observable, throwError } from 'rxjs';
import { secrets } from 'src/environments/environment.secrets';

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IMovieList } from '../models/movie-list';
import { IMovieDetails } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieDbService {
  private apiKey = secrets.tmdbAPIKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<IMovieList> {
    const endpoint = '/movie/popular';
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.httpClient
      .get<IMovieList>(this.baseUrl + endpoint, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  getMovieDetails(id: number): Observable<IMovieDetails> {
    const endpoint = `/movie/${id}`;
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.httpClient
      .get<IMovieDetails>(this.baseUrl + endpoint, { params: params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occured: ', error.message);
    return throwError(
      () => new Error('Something went wrong, please try again later.')
    );
  }
}
