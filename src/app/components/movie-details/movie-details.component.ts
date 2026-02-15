import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetails } from '../../models/movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.movieService.getMovieDetailsAsPromise(+id)
        .then(movie => { // Callback de éxito
          this.movie = movie;
          this.isLoading = false;
        })
        .catch(err => { // Callback de fallo
          this.error = 'Failed to load movie details.';
          this.isLoading = false;
          console.error(err);
        });
    } else {
      this.error = 'No movie ID provided.';
      this.isLoading = false;
    }
  }

  getBackdropUrl(): string {
    return this.movie?.backdrop_path 
      ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
      : '';
  }

  getVoteAverage(): number {
    return this.movie ? parseFloat(this.movie.vote_average.toFixed(1)) : 0;
  }

  getPosterUrl(path: string | null): string {
    return path 
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'assets/no-image.jpg';
  }
}