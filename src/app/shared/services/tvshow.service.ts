import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { VideosDto } from '../types/video.type'
import { Tvshow, TvshowsDto } from '../types/tvshow.type'
import { ImagesDto } from '../types/image.type'
import { environment } from '../../../environments/environment.development'
import { CreditsDto } from '../types/credits.type'

@Injectable({
  providedIn: 'root',
})
export class TvshowService {
  private http = inject(HttpClient)

  private apiUrl = 'https://api.themoviedb.org/3'
  private baseParam = new HttpParams().set('api_key', environment.tmdbApiKey)

  constructor() {}

  // Get tvshows by type
  public getTvshowsByType(type: string, count = 20) {
    const params = this.baseParam
    return this.http.get<TvshowsDto>(`${this.apiUrl}/tv/${type}`, { params }).pipe(map((data) => data.results.slice(0, count)))
  }

  // Get tvshows by id
  public getTvshowById(id: string) {
    const params = this.baseParam
    return this.http.get<Tvshow>(`${this.apiUrl}/tv/${id}`, { params })
  }

  // Get tvshow videos
  public getTvshowVideos(id: string) {
    const params = this.baseParam
    return this.http.get<VideosDto>(`${this.apiUrl}/tv/${id}/videos`, { params }).pipe(map((data) => data.results))
  }

  // Get tvshow images
  public getTvshowImages(id: string) {
    const params = this.baseParam
    return this.http.get<ImagesDto>(`${this.apiUrl}/tv/${id}/images`, { params }).pipe(map((data) => data.backdrops))
  }

  // Get the tvshow cast
  public getTvshowCast(id: string) {
    const params = this.baseParam
    return this.http.get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits`, { params }).pipe(map((data) => data.cast))
  }

  // Get similar tvshows
  public getSimilarTvshows(id: string) {
    const params = this.baseParam
    return this.http.get<TvshowsDto>(`${this.apiUrl}/tv/${id}/similar`, { params }).pipe(map((data) => data.results.slice(0, 12)))
  }

  // Search tvshows
  public searchTvshows(page: number, searchValue?: string) {
    const params = this.baseParam.set('page', page.toString())
    const uri = searchValue ? '/search/tv' : '/tv/popular'
    return this.http.get<TvshowsDto>(`${this.apiUrl}${uri}?query=${searchValue}`, { params })
  }

  // Get tv shows by its genre
  public getTvshowsByGenre(page = 1, genreId: string): Observable<TvshowsDto> {
    const params = this.baseParam.set('page', page.toString()).set('with_genres', genreId)
    const uri = genreId ? 'discover/tv' : 'tv/popular'
    return this.http.get<TvshowsDto>(`${this.apiUrl}/${uri}`, { params }).pipe(map((data) => data))
  }
}
