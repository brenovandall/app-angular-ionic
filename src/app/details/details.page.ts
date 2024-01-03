import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResult } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  private movieService = inject(MoviesService); // injecting the service, that is getting data from API
  public imageBaseUrl = 'https://image.tmdb.org/t/p'; // thats the base URL for the banner images
  public movie: WritableSignal<MovieResult | null> = signal(null); // a signal to get the id from another component from the Input() method

  // so here i can take the id and use the function [getMovieDetails()] to get all the details of a single movie by the id
  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie); // i set the result of the function as the [WritableSignal] response
      console.log(movieId)
    })
  }
  constructor() { 
    addIcons({cashOutline, calendarOutline})
  }

}
