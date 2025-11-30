import InteractiveWebsite from './InteractiveWebsite/InteractiveWebsite.js';
import { injectAnimationStyles } from './Styles/animations.js';
// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    injectAnimationStyles();
    new InteractiveWebsite();
});
