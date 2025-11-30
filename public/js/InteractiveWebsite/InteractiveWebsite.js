import ModalManager from '../ModalManager/ModalManager.js';
import ScrollManager from '../ScrollManager/ScrollManager.js';
import APIManager from '../APIManager/APIManager.js';
import AnimationManager from '../AnimationManager/AnimationManager.js';
import { renderPosts } from '../Renders/PostsRender/PostsRender.js';
import { renderUsers } from '../Renders/UsersRender/UsersRender.js';
import { renderPhotos } from '../Renders/PhotosRender/PhotosRender.js';
// Головний клас для інтерактивного веб-сайту
export default class InteractiveWebsite {
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
            renderPosts(posts, postsContainer);
        }
        // Завантаження користувачів на сторінці about
        const usersContainer = document.getElementById('users-container');
        if (usersContainer) {
            const users = await this.apiManager.fetchUsers(6);
            renderUsers(users, usersContainer);
        }
        // Завантаження фото на сторінці gallery
        const photosContainer = document.getElementById('photos-container');
        if (photosContainer) {
            const photos = await this.apiManager.fetchPhotos(12);
            renderPhotos(photos, photosContainer, this.modalManager);
        }
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
