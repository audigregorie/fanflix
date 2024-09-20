import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  @Input() public key: string | null = null;

  public videoUrl: SafeResourceUrl = '';

  private sanitizer = inject(DomSanitizer);

  constructor() { }

  public ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.key);
  }
}
