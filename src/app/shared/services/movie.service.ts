import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Video, VideosDto } from '../types/video.type';
import { Image, ImagesDto } from '../types/image.type';
import { Genre, GenresDto, Movie, MoviesDto } from '../types/movie.type';
import { Actor, CreditsDto } from '../types/credits.type';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  private apiUrl = 'https://api.themoviedb.org/3';
  private baseParam = new HttpParams().set('api_key', environment.tmdbApiKey);

  constructor() {}

  // Get all movies by type
  public getMoviesByType(type: string, count = 20): Observable<Movie[]> {
    const params = this.baseParam;
    return this.http.get<MoviesDto>(`${this.apiUrl}/movie/${type}`, { params }).pipe(map((data) => data.results.slice(0, count)));
  }

  // Get a movie by its Id
  public getMovieById(id: string): Observable<Movie> {
    const params = this.baseParam;
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, { params });
  }

  // Get videos of selected movie
  public getMovieVideos(id: string): Observable<Video[]> {
    const params = this.baseParam;
    return this.http.get<VideosDto>(`${this.apiUrl}/movie/${id}/videos`, { params }).pipe(map((data) => data.results));
  }

  // Get images of selected movie
  public getMovieImages(id: string): Observable<Image[]> {
    const params = this.baseParam;
    return this.http.get<ImagesDto>(`${this.apiUrl}/movie/${id}/images`, { params }).pipe(map((data) => data.backdrops));
  }

  // Get all cast members of selected movie
  public getMovieCast(id: string): Observable<Actor[]> {
    const params = this.baseParam;
    return this.http.get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits?`, { params }).pipe(map((data) => data.cast));
  }

  // Get similar movies
  public getSimilarMovies(id: string): Observable<Movie[]> {
    const params = this.baseParam;
    return this.http.get<MoviesDto>(`${this.apiUrl}/movie/${id}/similar`, { params }).pipe(map((data) => data.results.slice(0, 12)));
  }

  // Find movies by search
  public searchMovies(page: number, searchValue?: string): Observable<MoviesDto> {
    const params = this.baseParam.set('page', page.toString());
    const uri = searchValue ? 'search/movie' : 'movie/popular';
    return this.http.get<MoviesDto>(`${this.apiUrl}/${uri}?query=${searchValue}`, { params });
  }

  // Get the genres of different movies
  public getMovieGenres(): Observable<Genre[]> {
    const params = this.baseParam;
    return this.http.get<GenresDto>(`${this.apiUrl}/genre/movie/list`, { params }).pipe(map((data) => data.genres));
  }

  // Get movies by its genre
  public getMoviesByGenre(page: number, genreId: string): Observable<MoviesDto> {
    const params = this.baseParam.set('page', page.toString()).set('with_genres', genreId);
    const uri = genreId ? 'discover/movie' : 'movie/popular';
    return this.http.get<MoviesDto>(`${this.apiUrl}/${uri}`, { params }).pipe(map((data) => data));
  }
}
