"use strict";
// Клас для управління модальними вікнами
class ModalManager {
    constructor() {
        this.modalContainer = null;
        this.createModalContainer();
    }
    createModalContainer() {
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
    addModalListeners() {
        var _a, _b;
        const closeBtn = ((_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.querySelector('.btn-close')) || null;
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }
        (_b = this.modalContainer) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.hideModal();
            }
        });
    }
    showModal(title, content) {
        var _a;
        const titleEl = document.getElementById('modal-title');
        const bodyEl = document.getElementById('modal-body');
        if (titleEl && bodyEl) {
            titleEl.textContent = title;
            bodyEl.innerHTML = content;
        }
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.add('show');
        if (this.modalContainer) {
            this.modalContainer.style.display = 'block';
        }
    }
    hideModal() {
        var _a;
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
        if (this.modalContainer) {
            this.modalContainer.style.display = 'none';
        }
    }
    showImageModal(imageUrl, title) {
        const content = `<img src="${imageUrl}" alt="${title}" class="img-fluid">`;
        this.showModal(title, content);
    }
}
// Клас для управління scroll listeners
class ScrollManager {
    constructor() {
        this.navbar = null;
        this.animatedElements = null;
        this.navbar = document.querySelector('nav.navbar');
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.initScrollListeners();
        this.initLazyLoading();
    }
    initScrollListeners() {
        window.addEventListener('scroll', () => {
            this.handleStickyNav();
            this.handleScrollAnimations();
        });
    }
    handleStickyNav() {
        const scrollY = window.scrollY;
        if (scrollY > 100 && this.navbar) {
            this.navbar.classList.add('sticky-nav');
        }
        else if (this.navbar) {
            this.navbar.classList.remove('sticky-nav');
        }
    }
    handleScrollAnimations() {
        if (!this.animatedElements)
            return;
        this.animatedElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.8) {
                element.classList.add('fade-in');
            }
        });
    }
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach((img) => {
            imageObserver.observe(img);
        });
    }
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
// Клас для роботи з API
class APIManager {
    constructor() {
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }
    async fetchPosts(limit = 6) {
        try {
            const response = await fetch(`${this.baseUrl}/posts?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }
    async fetchUsers(limit = 6) {
        try {
            const response = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }
    async fetchPhotos(limit = 12) {
        try {
            const response = await fetch(`${this.baseUrl}/photos?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching photos:', error);
            return [];
        }
    }
}
// Клас для анімацій
class AnimationManager {
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        let opacity = 0;
        const increment = 50 / duration;
        const timer = window.setInterval(() => {
            opacity += increment;
            element.style.opacity = opacity.toString();
            if (opacity >= 1) {
                window.clearInterval(timer);
                element.style.opacity = '1';
            }
        }, 50);
    }
    fadeOut(element, duration = 300) {
        let opacity = 1;
        const decrement = 50 / duration;
        const timer = window.setInterval(() => {
            opacity -= decrement;
            element.style.opacity = opacity.toString();
            if (opacity <= 0) {
                window.clearInterval(timer);
                element.style.display = 'none';
                element.style.opacity = '0';
            }
        }, 50);
    }
    slideDown(element, duration = 300) {
        element.style.display = 'block';
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.maxHeight = `${element.scrollHeight}px`;
        }, 10);
    }
    slideUp(element, duration = 300) {
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
    constructor() {
        this.modalManager = new ModalManager();
        this.scrollManager = new ScrollManager();
        this.apiManager = new APIManager();
        this.animationManager = new AnimationManager();
        this.init();
    }
    init() {
        this.initClickListeners();
        this.loadDynamicContent();
        this.initMobileMenu();
    }
    initClickListeners() {
        // Smooth scroll для навігації
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.length > 1) {
                    this.scrollManager.smoothScrollTo(href.substring(1));
                }
            });
        });
        // Відкриття модальних вікон для галереї
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    const imgSrc = img.src;
                    const imgAlt = img.alt;
                    this.modalManager.showImageModal(imgSrc, imgAlt);
                }
            });
        });
        // Кнопки дій
        const actionButtons = document.querySelectorAll('.btn-action');
        actionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                if (action) {
                    this.handleAction(action);
                }
            });
        });
    }
    handleAction(action) {
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
    async loadDynamicContent() {
        // Завантаження постів на головній сторінці
        const postsContainer = document.getElementById('posts-container');
        if (postsContainer) {
            const posts = await this.apiManager.fetchPosts(6);
            this.renderPosts(posts, postsContainer);
        }
        // Завантаження користувачів на сторінці about
        const usersContainer = document.getElementById('users-container');
        if (usersContainer) {
            const users = await this.apiManager.fetchUsers(6);
            this.renderUsers(users, usersContainer);
        }
        // Завантаження фото на сторінці gallery
        const photosContainer = document.getElementById('photos-container');
        if (photosContainer) {
            const photos = await this.apiManager.fetchPhotos(12);
            this.renderPhotos(photos, photosContainer);
        }
    }
    renderPosts(posts, container) {
        container.innerHTML = '';
        posts.forEach((post) => {
            const postCard = `
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
    renderUsers(users, container) {
        container.innerHTML = '';
        users.forEach((user) => {
            const userCard = `
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
    renderPhotos(photos, container) {
        container.innerHTML = '';
        photos.forEach((photo) => {
            const photoCard = `
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
        const galleryItems = container.querySelectorAll('.gallery-item');
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    const fullUrl = img.getAttribute('data-full');
                    if (fullUrl) {
                        this.modalManager.showImageModal(fullUrl, img.alt);
                    }
                }
            });
        });
    }
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isVisible = mobileMenu.style.display === 'block';
                if (isVisible) {
                    this.animationManager.slideUp(mobileMenu, 300);
                }
                else {
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
    const style = document.createElement('style');
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
