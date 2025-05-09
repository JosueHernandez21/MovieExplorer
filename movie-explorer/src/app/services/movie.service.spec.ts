import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [MovieService]
  //   });
    
  //   service = TestBed.inject(MovieService);
  //   httpMock = TestBed.inject(HttpTestingController);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Configuración moderna del HttpClient
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        MovieService
      ]
    });
    
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch popular movies', () => {
    const mockMovies = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' }
      ] as Movie[]
    };

    service.getPopularMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies.results);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should handle error when fetching popular movies', () => {
    service.getPopularMovies().subscribe(movies => {
      expect(movies).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should search movies', () => {
    const query = 'test';
    const mockResponse = {
      results: [
        { id: 1, title: 'Test Movie 1' },
        { id: 2, title: 'Test Movie 2' }
      ] as Movie[]
    };

    service.searchMovies(query).subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockResponse.results);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
