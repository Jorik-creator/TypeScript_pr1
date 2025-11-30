// Клас для анімацій
export default class AnimationManager {
  public fadeIn(element: HTMLElement, duration: number = 300): void {
    element.style.opacity = '0';
    element.style.display = 'block';

    let opacity: number = 0;
    const increment: number = 50 / duration;

    const timer: number = window.setInterval(() => {
      opacity += increment;
      element.style.opacity = opacity.toString();

      if (opacity >= 1) {
        window.clearInterval(timer);
        element.style.opacity = '1';
      }
    }, 50);
  }

  public fadeOut(element: HTMLElement, duration: number = 300): void {
    let opacity: number = 1;
    const decrement: number = 50 / duration;

    const timer: number = window.setInterval(() => {
      opacity -= decrement;
      element.style.opacity = opacity.toString();

      if (opacity <= 0) {
        window.clearInterval(timer);
        element.style.display = 'none';
        element.style.opacity = '0';
      }
    }, 50);
  }

  public slideDown(element: HTMLElement, duration: number = 300): void {
    element.style.display = 'block';
    element.style.maxHeight = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease-in-out`;

    setTimeout(() => {
      element.style.maxHeight = `${element.scrollHeight}px`;
    }, 10);
  }

  public slideUp(element: HTMLElement, duration: number = 300): void {
    element.style.maxHeight = `${element.scrollHeight}px`;
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease-in-out`;

    setTimeout(() => {
      element.style.maxHeight = '0';
    }, 10);

    setTimeout(() => {
      element.style.display = 'none';
    }, duration);
  }
}
