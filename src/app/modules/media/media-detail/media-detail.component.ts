import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { VideoEmbedComponent } from '../../../shared/components/video-embed/video-embed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { AddSpacePipe } from '../../../shared/pipes/add-space.pipe';
import { MediaItem } from '../../../shared/types/media-item.type';
import { Actor } from '../../../shared/types/credits.type';
import { Video } from '../../../shared/types/video.type';
import { Image } from '../../../shared/types/image.type';
import { IMAGES_SIZES } from '../../../shared/constants/images-sizes.constant';
import { MediaService } from '../../../shared/services/media.service';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  imports: [CommonModule, VideoEmbedComponent, BannerComponent, SliderComponent, TabViewModule, ImageModule, CarouselModule, SkeletonModule, AddSpacePipe],
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent implements OnInit {
  public media$: Observable<MediaItem> | null = null;
  public mediaCast$: Observable<Actor[]> | null = null;
  public mediaImages$: Observable<Image[]> | null = null;
  public mediaVideos$: Observable<Video[]> | null = null;
  public mediaSimilarShows$: Observable<MediaItem[]> | null = null;
  public imagesSizes = IMAGES_SIZES;
  public mediaId = '';
  public mediaType: 'movie' | 'tv' = 'movie';
  public castSkeletonCount = Array(5).fill(0);
  public mediaSkeletonCount = Array(8).fill(0);
  public overviewSkeletonCount = Array(8).fill(0);
  public videoSkeletonCount = Array(6).fill(0);
  public photoSkeletonCount = Array(8).fill(0);

  private activeRoute = inject(ActivatedRoute);
  private mediaService = inject(MediaService);

  constructor() {}

  public ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.mediaId = params['id'];
      this.mediaType = params['type'];

      this.media$ = this.mediaService.getMediaById(this.mediaType, this.mediaId);
      this.mediaVideos$ = this.mediaService.getMediaVideos(this.mediaType, this.mediaId);
      this.mediaImages$ = this.mediaService.getMediaImages(this.mediaType, this.mediaId);
      this.mediaCast$ = this.mediaService.getMediaCast(this.mediaType, this.mediaId);
      this.mediaSimilarShows$ = this.mediaService.getSimilarMedia(this.mediaType, this.mediaId);
    });
  }
}
