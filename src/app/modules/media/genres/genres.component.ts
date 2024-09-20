import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MediaItemComponent } from '../media-item/media-item.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MediaService } from '../../../shared/services/media.service';
import { Genre, MediaItemsDto } from '../../../shared/types/media-item.type';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaItemComponent, PaginatorComponent, SkeletonModule],
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  public genres$: Observable<Genre[]> | null = null;
  public media$: Observable<MediaItemsDto> | null = null;
  public mediaType: 'movie' | 'tv' = 'movie';
  public genreId = '';
  public isActiveMovies: boolean = true;
  public isActiveTvshows: boolean = false;
  public mediaItemCount = Array(10).fill(0);
  public genresCount = Array(12).fill(0);

  private activeRoute = inject(ActivatedRoute);
  private mediaService = inject(MediaService);

  constructor() {}

  public ngOnInit(): void {
    this.genres$ = this.mediaService.getGenres('movie');

    this.activeRoute.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.onPageChange(1);
    });
  }

  public toggleActive(media: 'movie' | 'tv'): void {
    this.mediaType = media;
    this.isActiveMovies = media === 'movie';
    this.isActiveTvshows = media === 'tv';
    this.genres$ = this.mediaService.getGenres(media);
    this.onPageChange(1);
  }

  public onPageChange(page: number): void {
    this.media$ = this.mediaService.getMediaByGenre(this.mediaType, page, this.genreId);
  }
}
