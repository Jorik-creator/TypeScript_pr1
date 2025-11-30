// Клас для управління scroll listeners
export default class ScrollManager {
  private navbar: HTMLElement | null = null;
  private animatedElements: NodeListOf<Element> | null = null;

  constructor() {
    this.navbar = document.querySelector('nav.navbar');
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.initScrollListeners();
    this.initLazyLoading();
  }

  private initScrollListeners(): void {
    window.addEventListener('scroll', () => {
      this.handleStickyNav();
      this.handleScrollAnimations();
    });
  }

  private handleStickyNav(): void {
    const scrollY: number = window.scrollY;

    if (scrollY > 100 && this.navbar) {
      this.navbar.classList.add('sticky-nav');
    } else if (this.navbar) {
      this.navbar.classList.remove('sticky-nav');
    }
  }

  private handleScrollAnimations(): void {
    if (!this.animatedElements) return;

    this.animatedElements.forEach((element: Element) => {
      const rect: DOMRect = element.getBoundingClientRect();
      const windowHeight: number = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        element.classList.add('fade-in');
      }
    });
  }

  private initLazyLoading(): void {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-src]');

    const imageObserver: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const img: HTMLImageElement = entry.target as HTMLImageElement;
          const dataSrc: string | null = img.getAttribute('data-src');

          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img: HTMLImageElement) => {
      imageObserver.observe(img);
    });
  }

  public smoothScrollTo(targetId: string): void {
    const target: HTMLElement | null = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
