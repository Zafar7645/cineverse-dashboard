import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() searchQueryChange = new EventEmitter<string>();

  onSearchChange(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQueryChange.emit(query);
  }
}
