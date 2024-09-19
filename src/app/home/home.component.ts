import { Component, inject } from '@angular/core'
import { MovieService } from '../shared/services/movie.service'
import { TvshowService } from '../shared/services/tvshow.service'
import { mapToMovies } from '../shared/types/tvshow.type'
import { Observable, map } from 'rxjs'
import { CommonModule } from '@angular/common'
import { SliderComponent } from '../shared/components/slider/slider.component'
import { BannerComponent } from '../shared/components/banner/banner.component'
import { SkeletonModule } from 'primeng/skeleton'
import { Movie } from '../shared/types/movie.type'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SliderComponent, BannerComponent, SkeletonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private movieService = inject(MovieService)
  private tvshowService = inject(TvshowService)

  public popularMovies$: Observable<Movie[]>
  public upcomingMovies$: Observable<Movie[]>
  public topRatedMovies$: Observable<Movie[]>
  public popularTvshows$: Observable<Movie[]>
  public mediaSkeletonCount = Array(8).fill(0)

  constructor() {
    this.popularMovies$ = this.movieService.getMoviesByType('popular', 12)
    this.upcomingMovies$ = this.movieService.getMoviesByType('upcoming', 12)
    this.topRatedMovies$ = this.movieService.getMoviesByType('top_rated', 12)
    // the detail does not match the image clicked of populartvshows
    this.popularTvshows$ = this.tvshowService.getTvshowsByType('popular', 12).pipe(map(mapToMovies))
  }
}
