import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('bgVideo') video!: ElementRef<HTMLVideoElement>;

  spotlightGradient =
    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.9) 60%)';

  messageVisible = false;

  currentTitle = '';
  currentDescription = '';

  private messages = [
    { title: 'Explore the World Sustainably', desc: 'Unique eco-friendly travel experiences' },
    { title: 'Adventure Awaits', desc: 'Plan your next journey today' },
    { title: 'Discover Hidden Gems', desc: 'Off-the-beaten-path destinations' },
  ];
  private messageIndex = 0;
  private fadeDuration = 500; // ms

  ngAfterViewInit() {
    const vid = this.video.nativeElement;
    vid.muted = true;

    setTimeout(() => {
      vid.play().catch(() => {
        const playVideo = () => {
          vid.play().catch(() => console.error('Video playback blocked'));
          document.removeEventListener('click', playVideo);
        };
        document.addEventListener('click', playVideo);
      });

      this.currentTitle = this.messages[0].title;
      this.currentDescription = this.messages[0].desc;
      this.messageVisible = true;

      this.startMessageRotation();
    }, 0);

    // ✅ Add passive touchmove listener
    document.addEventListener(
      'touchmove',
      (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        this.updateSpotlight(touch.clientX, touch.clientY);
      },
      { passive: true } // <-- passive listener
    );
  }

  // ✅ Mouse move for spotlight
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.updateSpotlight(event.clientX, event.clientY);
  }

  private updateSpotlight(x: number, y: number) {
    this.spotlightGradient = `
      radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,0.25) 0%,
        rgba(255,255,255,0.05) 40%,
        rgba(0,0,0,0.95) 80%)
    `;
  }

  onScreenTap() {
    this.nextMessage();
  }

  private nextMessage() {
    const titleEl = document.querySelector('.overlay-container .title .fade-text') as HTMLElement;
    const descEl = document.querySelector(
      '.overlay-container .description .fade-text'
    ) as HTMLElement;

    if (titleEl && descEl) {
      titleEl.style.opacity = '0';
      descEl.style.opacity = '0';

      setTimeout(() => {
        this.messageIndex = (this.messageIndex + 1) % this.messages.length;
        this.currentTitle = this.messages[this.messageIndex].title;
        this.currentDescription = this.messages[this.messageIndex].desc;

        titleEl.style.opacity = '1';
        descEl.style.opacity = '1';
      }, this.fadeDuration);
    }
  }

  private startMessageRotation() {
    setInterval(() => this.nextMessage(), 7000);
  }
}
