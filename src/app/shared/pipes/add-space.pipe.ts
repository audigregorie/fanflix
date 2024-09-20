import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../types/media-item.type';

@Pipe({
  name: 'addSpace',
  standalone: true,
})
export class AddSpacePipe implements PipeTransform {
  transform(genres: Genre[] | undefined): string {
    if (!genres || genres.length === 0) {
      return '';
    }
    return genres.map((genre) => genre.name).join(' ');
  }
}
