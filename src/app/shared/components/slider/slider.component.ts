import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MediaItem } from '../../types/media-item.type';
import { imagesBaseUrl } from '../../constants/images-sizes.constant';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])],
})
export class SliderComponent implements OnInit {
  @Input() public isHeader = false;
  @Input() public slides: MediaItem[] = [];

  public imagesBaseUrl = imagesBaseUrl;
  public slideIndex = 0;

  constructor() { }

  public ngOnInit(): void {
    if (!this.isHeader) {
      this.changeSlide();
    }
  }

  public changeSlide(): void {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex >= this.slides.length) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}
