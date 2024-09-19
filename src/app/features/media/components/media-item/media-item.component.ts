import { Component, Input } from '@angular/core'
import { Movie } from '../../../../shared/types/movie.type'
import { imagesBaseUrl } from '../../../../shared/constants/images-sizes.constant'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss',
})
export class MediaItemComponent {
  @Input() public mediaItem: Movie | null = null
  @Input() public mediaType: 'movie' | 'tv' = 'movie'

  public imagesBaseUrl = imagesBaseUrl
}
