import ModalManager from '../ModalManager/ModalManager.js';
import ScrollManager from '../ScrollManager/ScrollManager.js';
import APIManager from '../APIManager/APIManager.js';
import AnimationManager from '../AnimationManager/AnimationManager.js';
import { Post, User, Photo } from '../Types/api.js';
import { renderPosts } from '../Renders/PostsRender/PostsRender.js';
import { renderUsers } from '../Renders/UsersRender/UsersRender.js';
import { renderPhotos } from '../Renders/PhotosRender/PhotosRender.js';

// Головний клас для інтерактивного веб-сайту
export default class InteractiveWebsite {
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
      renderPosts(posts, postsContainer);
    }

    // Завантаження користувачів на сторінці about
    const usersContainer: HTMLElement | null = document.getElementById('users-container');
    if (usersContainer) {
      const users: User[] = await this.apiManager.fetchUsers(6);
      renderUsers(users, usersContainer);
    }

    // Завантаження фото на сторінці gallery
    const photosContainer: HTMLElement | null = document.getElementById('photos-container');
    if (photosContainer) {
      const photos: Photo[] = await this.apiManager.fetchPhotos(12);
      renderPhotos(photos, photosContainer, this.modalManager);
    }
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
