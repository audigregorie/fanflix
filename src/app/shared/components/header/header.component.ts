import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public menuOpen = false;

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public closeMenu(): void {
    this.menuOpen = false;
  }
}
