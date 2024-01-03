import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  private movieService = inject(MoviesService); // inject the service, that is getting data from API
  private currentPage = 1; // the current page that user is
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = []; // array of movies, the inferface MovieResult is located  at -->angular-with-ionic\app\src\app\services\interfaces.ts
  public imageBaseUrl = 'https://image.tmdb.org/t/p'; // where the image is comming for
  public helpArray = new Array(10); // this is the array that will helps us to make and display the skeletoon loading page

  // the constructor calls the load movies, im doing two calls btw, at the ctor and at the angular OnInit function
  constructor() {
    this.loadMovies()
  }
  
  ngOnInit(): void {
    this.loadMovies();
  }

  // the event param tehre, is the scroll event, the data wont be loaded even the user gets at the bottom of scrolling range
  loadMovies(event?: InfiniteScrollCustomEvent) {
    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);

        this.error = err.error.status_message; // getting the status of error message

        return [];
      })
    ).subscribe({
      next: (res) => {
        this.movies.push(...res.results); // pushing at the array of movies, the same will be used to display all the movies on the page
        if(event) {
          event.target.disabled = res.total_pages == this.currentPage;
        }
      }
    })
  }

  // to load more data at the loading scrolling page
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
