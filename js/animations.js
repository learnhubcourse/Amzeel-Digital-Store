// تحسينات الأداء والحركات
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupObservers();
        this.setupScrollEvents();
    }
    
    cacheElements() {
        this.elements = {
            navbar: document.querySelector('.navbar'),
            hero: document.querySelector('.hero'),
            sections: document.querySelectorAll('section'),
            cards: document.querySelectorAll('.service-card, .product-card, .beat-card')
        };
    }
    
    setupObservers() {
        // Intersection Observer للعناصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        // مراقبة جميع البطاقات والعناصر
        this.elements.cards.forEach(card => {
            observer.observe(card);
        });
        
        this.elements.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupScrollEvents() {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateNavbar = () => {
            const scrolled = window.scrollY > 100;
            this.elements.navbar.classList.toggle('scrolled', scrolled);
            ticking = false;
        };
        
        const onScroll = () => {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
}

// تأثيرات التحميل
class LoaderAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupPageLoad();
        this.setupImageLazyLoad();
    }
    
    setupPageLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
            
            // تأثير ظهور تدريجي
            setTimeout(() => {
                document.querySelector('.hero-content').classList.add('animate-in');
            }, 300);
        });
    }
    
    setupImageLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// تهيئة جميع الحركات
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new LoaderAnimations();
});

// تأثيرات CSS إضافية
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .service-card,
    .product-card,
    .beat-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .service-card.animate-in,
    .product-card.animate-in,
    .beat-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-content {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease-out 0.3s forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img:not(.lazy) {
        opacity: 1;
    }
`;
document.head.appendChild(style);
// تأثيرات ظهور الهيرو
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    
    // تأثير الكتابة للنص
    const title = document.querySelector('.hero-title');
    const description = document.querySelector('.hero-description');
    
    // إضافة classes للحركات
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    
    description.style.opacity = '0';
    description.style.transform = 'translateY(30px)';
    
    // تأثير الظهور المتدرج
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        description.style.transition = 'all 0.8s ease 0.3s';
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
    }, 600);
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initHeroAnimations);