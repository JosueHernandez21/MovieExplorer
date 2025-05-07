import { Component} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';



@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, TruncatePipe],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.scss'
})
export class SearchMovieComponent {
  searchResults: Movie[] = [];
  searchTerm = '';
  isLoading = false;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300), // espera 300ms después de cada pulsación
      distinctUntilChanged(), // ignora si el término no cambió
      switchMap(term => { // cambia a nueva búsqueda observable cada vez que el término cambia
        this.isLoading = true;
        return term ? this.movieService.searchMovies(term) : of([]);
      })
    ).subscribe({
      next: movies => {
        this.searchResults = movies;
        this.isLoading = false;
      },
      error: err => {
        console.error('Search error:', err);
        this.isLoading = false;
      }
    });
  }

  search(): void {
    this.searchTerms.next(this.searchTerm);
  }
}
