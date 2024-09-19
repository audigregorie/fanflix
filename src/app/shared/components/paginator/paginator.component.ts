import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { PaginatorState } from 'primeng/paginator'
import { CommonModule } from '@angular/common'
import { MoviesDto } from '../../types/movie.type'
import { PaginatorModule } from 'primeng/paginator'

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() public media$: Observable<MoviesDto> | null = null
  @Input() public genreId = ''
  @Input() public mediaType: string | undefined = ''

  @Output() pageEmitter = new EventEmitter<number>()

  // Get the page of shows by its genre
  public sendPageNumber(page: number) {
    this.pageEmitter.emit(page) // Emit the current page number
  }

  // Get the shows by its genre in referrence to its page number
  public pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1
    this.sendPageNumber(pageNumber)
  }
}
