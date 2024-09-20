import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Video, VideosDto } from '../types/video.type';
import { Image, ImagesDto } from '../types/image.type';
import { MediaItem, MediaItemsDto, Genre, GenresDto, mapApiDataArrayToMediaItems, mapApiDataToMediaItem } from '../types/media-item.type';
import { Actor, CreditsDto } from '../types/credits.type';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3';
  private baseParam = new HttpParams().set('api_key', environment.tmdbApiKey);

  constructor() {}

  public getMediaByType(mediaType: 'movie' | 'tv', type: string, count = 20): Observable<MediaItem[]> {
    const params = this.baseParam;
    return this.http
      .get<any>(`${this.apiUrl}/${mediaType}/${type}`, { params })
      .pipe(map((data: any) => mapApiDataArrayToMediaItems(data.results.slice(0, count), mediaType)));
  }

  public getMediaById(mediaType: 'movie' | 'tv', id: string): Observable<MediaItem> {
    const params = this.baseParam;
    return this.http.get<any>(`${this.apiUrl}/${mediaType}/${id}`, { params }).pipe(map((data: any) => mapApiDataToMediaItem(data, mediaType)));
  }

  public getMediaVideos(mediaType: 'movie' | 'tv', id: string): Observable<Video[]> {
    const params = this.baseParam;
    return this.http.get<VideosDto>(`${this.apiUrl}/${mediaType}/${id}/videos`, { params }).pipe(map((data) => data.results));
  }

  public getMediaImages(mediaType: 'movie' | 'tv', id: string): Observable<Image[]> {
    const params = this.baseParam;
    return this.http.get<ImagesDto>(`${this.apiUrl}/${mediaType}/${id}/images`, { params }).pipe(map((data) => data.backdrops));
  }

  public getMediaCast(mediaType: 'movie' | 'tv', id: string): Observable<Actor[]> {
    const params = this.baseParam;
    return this.http.get<CreditsDto>(`${this.apiUrl}/${mediaType}/${id}/credits`, { params }).pipe(map((data) => data.cast));
  }

  public getSimilarMedia(mediaType: 'movie' | 'tv', id: string): Observable<MediaItem[]> {
    const params = this.baseParam;
    return this.http
      .get<any>(`${this.apiUrl}/${mediaType}/${id}/similar`, { params })
      .pipe(map((data: any) => mapApiDataArrayToMediaItems(data.results.slice(0, 12), mediaType)));
  }

  public searchMedia(mediaType: 'movie' | 'tv', page: number, searchValue?: string): Observable<MediaItemsDto> {
    const params = this.baseParam.set('page', page.toString());
    const uri = searchValue ? `search/${mediaType}` : `${mediaType}/popular`;
    return this.http.get<any>(`${this.apiUrl}/${uri}?query=${searchValue}`, { params }).pipe(
      map((data: any) => ({
        ...data,
        results: mapApiDataArrayToMediaItems(data.results, mediaType),
      }))
    );
  }

  public getMediaByGenre(mediaType: 'movie' | 'tv', page: number, genreId: string): Observable<MediaItemsDto> {
    const params = this.baseParam.set('page', page.toString()).set('with_genres', genreId);
    const uri = genreId ? `discover/${mediaType}` : `${mediaType}/popular`;
    return this.http.get<any>(`${this.apiUrl}/${uri}`, { params }).pipe(
      map((data: any) => ({
        ...data,
        results: mapApiDataArrayToMediaItems(data.results, mediaType),
      }))
    );
  }

  public getGenres(mediaType: 'movie' | 'tv'): Observable<Genre[]> {
    const params = this.baseParam;
    return this.http.get<GenresDto>(`${this.apiUrl}/genre/${mediaType}/list`, { params }).pipe(map((data) => data.genres));
  }
}
