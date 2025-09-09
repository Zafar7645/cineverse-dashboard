import { IMovie } from './moive';

export interface IMovieList {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
