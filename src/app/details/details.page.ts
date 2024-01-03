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
  private movieService = inject(MoviesService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
      console.log(movieId)
    })
  }
  constructor() { 
    addIcons({cashOutline, calendarOutline})
  }

}
