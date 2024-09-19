import { Component, Input } from '@angular/core'
import { Movie } from '../../types/movie.type'
import { MediaItemComponent } from '../../../features/media/components/media-item/media-item.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MediaItemComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() public media: Movie[] = []
  @Input() public mediaType: 'movie' | 'tv' = 'movie'
  @Input() public title = ''
}
