import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { MediaItemsDto } from '../../types/media-item.type';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() public media$: Observable<MediaItemsDto> | null = null;
  @Input() public genreId = '';
  @Input() public mediaType: string | undefined = '';

  @Output() pageEmitter = new EventEmitter<number>();

  public currentPage: number = 1;

  public sendPageNumber(page: number): void {
    this.pageEmitter.emit(page);
    this.currentPage = page;
  }

  public pageChanged(event: PaginatorState): void {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.sendPageNumber(pageNumber);
  }
}
