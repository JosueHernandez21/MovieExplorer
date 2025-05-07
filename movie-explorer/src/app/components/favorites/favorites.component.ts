import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites: Movie[] = [];

  constructor() {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const favoritesStr = localStorage.getItem('favoriteMovies');
    this.favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
  }

  removeFavorite(movie: Movie): void {
    const index = this.favorites.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
    }
  }
}
