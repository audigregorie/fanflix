import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Observable, map } from 'rxjs'
import { MovieService } from '../../../../shared/services/movie.service'
import { TvshowService } from '../../../../shared/services/tvshow.service'
import { Genre, MoviesDto } from '../../../../shared/types/movie.type'
import { mapToMoviesDto } from '../../../../shared/types/tvshow.type'
import { CommonModule } from '@angular/common'
import { MediaItemComponent } from '../media-item/media-item.component'
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component'
import { SkeletonModule } from 'primeng/skeleton'

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaItemComponent, PaginatorComponent, SkeletonModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private tvshowService = inject(TvshowService)

  public genres$: Observable<Genre[]> | null = null
  public media$: Observable<MoviesDto> | null = null
  public mediaType: 'movie' | 'tv' = 'movie'
  public genreId = ''
  public isActiveMovies: boolean = true
  public isActiveTvshows: boolean = false
  public mediaItemCount = Array(10).fill(0)
  public genresCount = Array(12).fill(0)

  constructor() {}

  // Get the movie genres. Get the id of the genre as an activated route param. Initialize the component with the first page.
  ngOnInit() {
    this.genres$ = this.movieService.getMovieGenres()
    this.activeRoute.params.subscribe((params) => {
      this.genreId = params['genreId']
      this.onPageChange(1)
    })
  }

  // Toggle between movie and tvshow.
  public toggleActive(media: 'movie' | 'tv') {
    this.mediaType = media
    this.isActiveMovies = media === 'movie'
    this.isActiveTvshows = media === 'tv'
    this.onPageChange(1)
  }

  // Get media by genre based on the media selected.
  public onPageChange(page: number) {
    this.mediaType === 'movie' ? (this.media$ = this.movieService.getMoviesByGenre(page, this.genreId)) : (this.media$ = this.tvshowService.getTvshowsByGenre(page, this.genreId).pipe(map(mapToMoviesDto)))
  }
}
