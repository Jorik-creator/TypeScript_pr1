// Клас для управління scroll listeners
export default class ScrollManager {
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
