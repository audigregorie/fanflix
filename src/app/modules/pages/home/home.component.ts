import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { MediaItem } from '../../../shared/types/media-item.type';
import { MediaService } from '../../../shared/services/media.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SliderComponent, BannerComponent, SkeletonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public popularMovies$: Observable<MediaItem[]>;
  public upcomingMovies$: Observable<MediaItem[]>;
  public topRatedMovies$: Observable<MediaItem[]>;
  public popularTvshows$: Observable<MediaItem[]>;
  public mediaSkeletonCount = Array(8).fill(0);

  private mediaService = inject(MediaService);

  constructor() {
    this.popularMovies$ = this.mediaService.getMediaByType('movie', 'popular', 12);
    this.upcomingMovies$ = this.mediaService.getMediaByType('movie', 'upcoming', 12);
    this.topRatedMovies$ = this.mediaService.getMediaByType('movie', 'top_rated', 12);
    this.popularTvshows$ = this.mediaService.getMediaByType('tv', 'popular', 12);
  }
}
