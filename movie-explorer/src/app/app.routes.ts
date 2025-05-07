import { Routes } from '@angular/router';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/popular', pathMatch: 'full' },
    { path: 'popular', component: MovieListComponent },
    { path: 'search', component: SearchMovieComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: '**', redirectTo: '/popular' }
  ];
