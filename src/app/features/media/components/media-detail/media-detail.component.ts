import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, map } from 'rxjs'
import { MovieService } from '../../../../shared/services/movie.service'
import { TvshowService } from '../../../../shared/services/tvshow.service'
import { Actor } from '../../../../shared/types/credits.type'
import { Movie } from '../../../../shared/types/movie.type'
import { Video } from '../../../../shared/types/video.type'
import { Image } from '../../../../shared/types/image.type'
import { IMAGES_SIZES } from '../../../../shared/constants/images-sizes.constant'
import { mapToMovie, mapToMovies } from '../../../../shared/types/tvshow.type'
import { CommonModule } from '@angular/common'
import { BannerComponent } from '../../../../shared/components/banner/banner.component'
import { SliderComponent } from '../../../../shared/components/slider/slider.component'
import { TabViewModule } from 'primeng/tabview'
import { ImageModule } from 'primeng/image'
import { CarouselModule } from 'primeng/carousel'
import { SkeletonModule } from 'primeng/skeleton'
import { VideoEmbedComponent } from '../video-embed/video-embed.component'
import { AddSpacePipe } from '../../../../shared/pipes/add-space.pipe'

@Component({
  selector: 'app-media-detail',
  standalone: true,
  imports: [CommonModule, VideoEmbedComponent, BannerComponent, SliderComponent, TabViewModule, ImageModule, CarouselModule, SkeletonModule, AddSpacePipe],
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss',
})
export class MediaDetailComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private tvshowService = inject(TvshowService)

  public media$: Observable<Movie> | null = null
  public mediaCast$: Observable<Actor[]> | null = null
  public mediaImages$: Observable<Image[]> | null = null
  public mediaVideos$: Observable<Video[]> | null = null
  public mediaSimilarShows$: Observable<Movie[]> | null = null
  public imagesSizes = IMAGES_SIZES
  public mediaId = ''
  public mediaType: 'movie' | 'tv' = 'movie'
  public castSkeletonCount = Array(5).fill(0)
  public mediaSkeletonCount = Array(8).fill(0)
  public overviewSkeletonCount = Array(8).fill(0)
  public videoSkeletonCount = Array(6).fill(0)
  public photoSkeletonCount = Array(8).fill(0)

  constructor() { }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        map((params) => {
          this.mediaId = params['id']
          this.mediaType = params['type']

          if (this.mediaType === 'movie') {
            this.media$ = this.movieService.getMovieById(this.mediaId)
            this.mediaVideos$ = this.movieService.getMovieVideos(this.mediaId)
            this.mediaImages$ = this.movieService.getMovieImages(this.mediaId)
            this.mediaCast$ = this.movieService.getMovieCast(this.mediaId)
            this.mediaSimilarShows$ = this.movieService.getSimilarMovies(this.mediaId)
          }

          if (this.mediaType === 'tv') {
            this.media$ = this.tvshowService.getTvshowById(this.mediaId).pipe(map(mapToMovie))
            this.mediaVideos$ = this.tvshowService.getTvshowVideos(this.mediaId)
            this.mediaImages$ = this.tvshowService.getTvshowImages(this.mediaId)
            this.mediaCast$ = this.tvshowService.getTvshowCast(this.mediaId)
            this.mediaSimilarShows$ = this.tvshowService.getSimilarTvshows(this.mediaId).pipe(map(mapToMovies))
          }
        }),
      )
      .subscribe()
  }
}
