import { Component, Input } from '@angular/core';
import { MediaItem } from '../../types/media-item.type';
import { CommonModule } from '@angular/common';
import { MediaItemComponent } from '../../../modules/media/media-item/media-item.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MediaItemComponent],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() public media: MediaItem[] = [];
  @Input() public mediaType: 'movie' | 'tv' = 'movie';
  @Input() public title = '';
}
