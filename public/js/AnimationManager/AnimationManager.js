// Клас для анімацій
export default class AnimationManager {
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
