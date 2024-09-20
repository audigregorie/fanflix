import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MediaItem } from '../../../shared/types/media-item.type';
import { imagesBaseUrl } from '../../../shared/constants/images-sizes.constant';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss'],
})
export class MediaItemComponent {
  @Input() public mediaItem: MediaItem | null = null;
  @Input() public mediaType: 'movie' | 'tv' = 'movie';

  public imagesBaseUrl = imagesBaseUrl;
}
