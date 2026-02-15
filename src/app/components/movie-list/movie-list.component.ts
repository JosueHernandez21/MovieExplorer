import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { forkJoin } from 'rxjs';
import { Movie } from '../../models/movie';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [DatePipe, TruncatePipe, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/no-image.jpg'; // Ruta a tu imagen por defecto
    imgElement.style.objectFit = 'contain'; // Ajusta el estilo si es necesario
  }

  loadPopularMovies(): void {
    this.isLoading = true;
    this.error = null;
    
    // Ejemplo de forkJoin (rxjs operator)
    forkJoin([
      this.movieService.getPopularMovies(),
      this.movieService.getPopularMovies() // Simulando múltiples llamadas en un entorno prod seria mas como una llamada a un endpoint diferente
    ]).subscribe({
      next: ([movies1, movies2]) => {
        this.movies = [...movies1, ...movies2].slice(0, 20); // Limitar a 20 películas
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load movies. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  toggleFavorite(movie: Movie): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === movie.id);
    
    if (index === -1) {
      favorites.push(movie);
    } else {
      favorites.splice(index, 1);
    }
    
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }

  isFavorite(movie: Movie): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === movie.id);
  }

  private getFavorites(): Movie[] {
    const favoritesStr = localStorage.getItem('favoriteMovies');
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  }
}
