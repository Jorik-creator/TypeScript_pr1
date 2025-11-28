// Інтерфейси для даних з API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
  };
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Клас для управління модальними вікнами
class ModalManager {
  private modalContainer: HTMLElement | null = null;

  constructor() {
    this.createModalContainer();
  }

  private createModalContainer(): void {
    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'custom-modal';
    this.modalContainer.className = 'modal fade';
    this.modalContainer.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-title">Modal Title</h5>
            <button type="button" class="btn-close" data-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="modal-body">
            <p>Modal content goes here</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.modalContainer);
    this.addModalListeners();
  }

  private addModalListeners(): void {
    const closeBtn: HTMLElement | null = this.modalContainer?.querySelector('.btn-close') || null;
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideModal());
    }

    this.modalContainer?.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.modalContainer) {
        this.hideModal();
      }
    });
  }

  public showModal(title: string, content: string): void {
    const titleEl: HTMLElement | null = document.getElementById('modal-title');
    const bodyEl: HTMLElement | null = document.getElementById('modal-body');

    if (titleEl && bodyEl) {
      titleEl.textContent = title;
      bodyEl.innerHTML = content;
    }

    this.modalContainer?.classList.add('show');
    if (this.modalContainer) {
      this.modalContainer.style.display = 'block';
    }
  }

  public hideModal(): void {
    this.modalContainer?.classList.remove('show');
    if (this.modalContainer) {
      this.modalContainer.style.display = 'none';
    }
  }

  public showImageModal(imageUrl: string, title: string): void {
    const content: string = `<img src="${imageUrl}" alt="${title}" class="img-fluid">`;
    this.showModal(title, content);
  }
}

// Клас для управління scroll listeners
class ScrollManager {
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

// Клас для роботи з API
class APIManager {
  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';

  public async fetchPosts(limit: number = 6): Promise<Post[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/posts?_limit=${limit}`);
      const data: Post[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  public async fetchUsers(limit: number = 6): Promise<User[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  public async fetchPhotos(limit: number = 12): Promise<Photo[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/photos?_limit=${limit}`);
      const data: Photo[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }
}

// Клас для анімацій
class AnimationManager {
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

// Головний клас для інтерактивного веб-сайту
class InteractiveWebsite {
  private modalManager: ModalManager;
  private scrollManager: ScrollManager;
  private apiManager: APIManager;
  private animationManager: AnimationManager;

  constructor() {
    this.modalManager = new ModalManager();
    this.scrollManager = new ScrollManager();
    this.apiManager = new APIManager();
    this.animationManager = new AnimationManager();

    this.init();
  }

  private init(): void {
    this.initClickListeners();
    this.loadDynamicContent();
    this.initMobileMenu();
  }

  private initClickListeners(): void {
    // Smooth scroll для навігації
    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const href: string | null = link.getAttribute('href');
        if (href && href.length > 1) {
          this.scrollManager.smoothScrollTo(href.substring(1));
        }
      });
    });

    // Відкриття модальних вікон для галереї
    const galleryItems: NodeListOf<HTMLElement> = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        const img: HTMLImageElement | null = item.querySelector('img');
        if (img) {
          const imgSrc: string = img.src;
          const imgAlt: string = img.alt;
          this.modalManager.showImageModal(imgSrc, imgAlt);
        }
      });
    });

    // Кнопки дій
    const actionButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn-action');
    actionButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        const action: string | null = button.getAttribute('data-action');
        if (action) {
          this.handleAction(action);
        }
      });
    });
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'contact':
        this.modalManager.showModal('Contact Us', '<p>Contact form will be here</p>');
        break;
      case 'info':
        this.modalManager.showModal('Information', '<p>More information about our services</p>');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  private async loadDynamicContent(): Promise<void> {
    // Завантаження постів на головній сторінці
    const postsContainer: HTMLElement | null = document.getElementById('posts-container');
    if (postsContainer) {
      const posts: Post[] = await this.apiManager.fetchPosts(6);
      this.renderPosts(posts, postsContainer);
    }

    // Завантаження користувачів на сторінці about
    const usersContainer: HTMLElement | null = document.getElementById('users-container');
    if (usersContainer) {
      const users: User[] = await this.apiManager.fetchUsers(6);
      this.renderUsers(users, usersContainer);
    }

    // Завантаження фото на сторінці gallery
    const photosContainer: HTMLElement | null = document.getElementById('photos-container');
    if (photosContainer) {
      const photos: Photo[] = await this.apiManager.fetchPhotos(12);
      this.renderPhotos(photos, photosContainer);
    }
  }

  private renderPosts(posts: Post[], container: HTMLElement): void {
    container.innerHTML = '';

    posts.forEach((post: Post) => {
      const postCard: string = `
        <div class="col-md-4 mb-4 animate-on-scroll">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body.substring(0, 100)}...</p>
              <button class="btn btn-primary btn-sm" onclick="alert('Post ID: ${post.id}')">
                Read More
              </button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += postCard;
    });
  }

  private renderUsers(users: User[], container: HTMLElement): void {
    container.innerHTML = '';

    users.forEach((user: User) => {
      const userCard: string = `
        <div class="col-md-4 mb-4 animate-on-scroll">
          <div class="card h-100 text-center">
            <div class="card-body">
              <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px; font-size: 2rem;">
                ${user.name.charAt(0)}
              </div>
              <h5 class="card-title mt-3">${user.name}</h5>
              <p class="card-text">
                <strong>Email:</strong> ${user.email}<br>
                <strong>Phone:</strong> ${user.phone}<br>
                <strong>Website:</strong> ${user.website}
              </p>
              ${user.company ? `<p class="text-muted">Works at ${user.company.name}</p>` : ''}
            </div>
          </div>
        </div>
      `;
      container.innerHTML += userCard;
    });
  }

  private renderPhotos(photos: Photo[], container: HTMLElement): void {
    container.innerHTML = '';

    photos.forEach((photo: Photo) => {
      const photoCard: string = `
        <div class="col-md-3 col-sm-6 mb-4 animate-on-scroll">
          <div class="card gallery-item" style="cursor: pointer;">
            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}" data-full="${photo.url}">
            <div class="card-body">
              <p class="card-text small">${photo.title.substring(0, 30)}...</p>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += photoCard;
    });

    // Додати слухачі після рендерингу
    const galleryItems: NodeListOf<HTMLElement> = container.querySelectorAll('.gallery-item');
    galleryItems.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        const img: HTMLImageElement | null = item.querySelector('img');
        if (img) {
          const fullUrl: string | null = img.getAttribute('data-full');
          if (fullUrl) {
            this.modalManager.showImageModal(fullUrl, img.alt);
          }
        }
      });
    });
  }

  private initMobileMenu(): void {
    const mobileMenuBtn: HTMLElement | null = document.querySelector('.mobile-menu-btn');
    const mobileMenu: HTMLElement | null = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isVisible: boolean = mobileMenu.style.display === 'block';

        if (isVisible) {
          this.animationManager.slideUp(mobileMenu, 300);
        } else {
          this.animationManager.slideDown(mobileMenu, 300);
        }
      });
    }
  }
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveWebsite();

  // Додати CSS для анімацій
  const style: HTMLStyleElement = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    .sticky-nav {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      overflow: auto;
    }

    .modal.show {
      display: block;
    }

    .modal-dialog {
      margin: 5% auto;
      max-width: 600px;
    }

    .modal-content {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
    }

    .btn-close:before {
      content: '×';
    }

    .gallery-item:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});
