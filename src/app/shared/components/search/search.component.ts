import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() public searchEmitter = new EventEmitter<string>();

  public searchControl: FormControl = new FormControl('');

  public onSearch(): void {
    const searchTerm = this.searchControl.value;
    this.searchEmitter.emit(searchTerm);
  }
}
