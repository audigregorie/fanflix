import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, map } from 'rxjs'
import { PaginatorState } from 'primeng/paginator'
import { MovieService } from '../../../../shared/services/movie.service'
import { TvshowService } from '../../../../shared/services/tvshow.service'
import { MoviesDto } from '../../../../shared/types/movie.type'
import { mapToMoviesDto } from '../../../../shared/types/tvshow.type'
import { CommonModule } from '@angular/common'
import { MediaItemComponent } from '../media-item/media-item.component'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component'
import { PaginatorModule } from 'primeng/paginator'
import { SkeletonModule } from 'primeng/skeleton'

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, MediaItemComponent, PaginatorComponent, PaginatorModule, SkeletonModule],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private tvshowService = inject(TvshowService)

  public media$: Observable<MoviesDto> | null = null
  public searchValue = ''
  public mediaType: 'movie' | 'tv' = 'movie'
  public mediaItemCount = Array(10).fill(0)

  constructor() {}

  // Get the type of show as an activated route param. Initialize the component by its type and its first page.
  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.mediaType = params['type']
      this.getPagedShows(this.mediaType, 1)
    })
  }

  // Search data received from Emitter
  public searchEmitted(searchValue: string) {
    this.searchValue = searchValue
    this.getPagedShows(this.mediaType, 1, this.searchValue)
  }

  // Get shows by their type, page, and search keyword.
  public getPagedShows(mediaType: 'movie' | 'tv', page: number, searchKeyword?: string) {
    mediaType === 'movie' ? (this.media$ = this.movieService.searchMovies(page, searchKeyword)) : (this.media$ = this.tvshowService.searchTvshows(page, searchKeyword).pipe(map(mapToMoviesDto)))
  }

  // Everytime the input changes, get the new search keyword and page number.
  public searchChanged() {
    this.getPagedShows(this.mediaType, 1, this.searchValue)
  }

  // Get the shows in referrence to its page number
  public pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1
    if (event.page) {
      this.getPagedShows(this.mediaType, pageNumber, this.searchValue)
    }
  }
}
