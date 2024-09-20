import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { MediaItemComponent } from '../media-item/media-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { MediaItemsDto } from '../../../shared/types/media-item.type';
import { MediaService } from '../../../shared/services/media.service';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, MediaItemComponent, PaginatorComponent, PaginatorModule, SkeletonModule],
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent implements OnInit {
  public media$: Observable<MediaItemsDto> | null = null;
  public searchValue = '';
  public mediaType: 'movie' | 'tv' = 'movie';
  public mediaItemCount = Array(10).fill(0);

  private activeRoute = inject(ActivatedRoute);
  private mediaService = inject(MediaService);

  constructor() {}

  public ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.mediaType = params['type'];
      this.getPagedMedia(this.mediaType, 1);
    });
  }

  public searchEmitted(searchValue: string): void {
    this.searchValue = searchValue;
    this.getPagedMedia(this.mediaType, 1, this.searchValue);
  }

  public getPagedMedia(mediaType: 'movie' | 'tv', page: number, searchKeyword?: string): void {
    this.media$ = this.mediaService.searchMedia(mediaType, page, searchKeyword);
  }

  public searchChanged(): void {
    this.getPagedMedia(this.mediaType, 1, this.searchValue);
  }

  public pageChanged(event: PaginatorState): void {
    const pageNumber = event.page ? event.page + 1 : 1;
    if (event.page) {
      this.getPagedMedia(this.mediaType, pageNumber, this.searchValue);
    }
  }
}
