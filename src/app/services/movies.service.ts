import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3'; // this is the principal part of the url that will be used many times
const API_KEY = environment.apiKey; // thats my api key

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient) // ang17 we can inject like that, it mustnt being on the constructor

  constructor() { }

  // at this function, we get the top rated movies from the API
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
  }

  // at this function, we get only one movie and its content, so we can display in another page
  // to create pages at ionic: 'ionic g page [page_name]'
  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
  }
}
