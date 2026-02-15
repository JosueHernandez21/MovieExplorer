import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie, MovieDetails } from '../models/movie';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.apiKey;
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) { }

  getPopularMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<{ results: Movie[] }>(url).pipe(
      map(response => response.results),
      catchError(error => {
        console.error('Error fetching popular movies:', error);
        return of([]);
      })
    );
  }

  searchMovies(query: string): Observable<Movie[]> {
    const encryptedQuery = this.encryptionService.encrypt(query);
    console.log('Encrypted search query:', encryptedQuery);
    
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<{ results: Movie[] }>(url).pipe(
      map(response => response.results),
      catchError(error => {
        console.error('Error searching movies:', error);
        return of([]);
      })
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get<MovieDetails>(url).pipe(
      catchError(error => {
        console.error('Error fetching movie details:', error);
        throw error;
      })
    );
  }

  // Ejemplo de Promise
  getMovieDetailsAsPromise(id: number): Promise<MovieDetails> {
    return new Promise((resolve, reject) => {
      this.getMovieDetails(id).subscribe({
        next: movie => resolve(movie),
        error: err => reject(err)
      });
    });
  }
}