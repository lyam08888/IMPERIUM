/* ===== CHROME MOBILE NAVIGATION FIXES & INTEGRATION 2025 ===== */
class ChromeMobileNavigationFix {
    constructor() {
        this.isMobile = this.detectMobile();
        this.modernSystemsLoaded = false;
        this.init();
    }
    
    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    init() {
        if (this.isMobile) {
            this.loadModernSystems();
            this.applyChromeFixes();
            this.setupViewportFixes();
            this.optimizePerformance();
        }
    }
    
    loadModernSystems() {
        // Charger les nouveaux systèmes mobiles 2025
        this.loadCSS('mobile-header-2025.css');
        this.loadCSS('mobile-navigation-2025.css');
        this.loadJS('mobile-header-2025.js');
        this.loadJS('mobile-navigation-2025.js');
        
        console.log('🚀 Systèmes mobiles 2025 chargés');
        this.modernSystemsLoaded = true;
    }
    
    loadCSS(filename) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = filename;
        document.head.appendChild(link);
    }
    
    loadJS(filename) {
        const script = document.createElement('script');
        script.src = filename;
        script.async = true;
        document.head.appendChild(script);
    }
    
    applyChromeFixes() {
        // Fixes spécifiques pour Chrome mobile
        this.fixViewportHeight();
        this.fixScrollBehavior();
        this.fixTouchEvents();
        this.fixAddressBarHiding();
    }
    
    fixViewportHeight() {
        // Fix pour la hauteur de viewport avec la barre d'adresse Chrome
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }
    
    fixScrollBehavior() {
        // Améliorer le scroll sur Chrome mobile
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';
        
        // Prévenir le bounce scroll
        document.addEventListener('touchmove', (e) => {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    fixTouchEvents() {
        // Optimiser les événements tactiles
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
        document.addEventListener('touchend', () => {}, { passive: true });
        
        // Désactiver le zoom sur double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    fixAddressBarHiding() {
        // Gérer le masquage de la barre d'adresse Chrome
        let ticking = false;
        let lastScrollY = 0;
        
        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            
            document.body.setAttribute('data-scroll-direction', scrollDirection);
            lastScrollY = scrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollDirection);
                ticking = true;
            }
        }, { passive: true });
    }
    
    setupViewportFixes() {
        // CSS personnalisé pour les fixes viewport
        const style = document.createElement('style');
        style.textContent = `
            /* Fix pour la hauteur de viewport Chrome mobile */
            .full-height {
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
            }
            
            /* Prévenir le zoom sur les inputs */
            input, select, textarea {
                font-size: 16px !important;
            }
            
            /* Améliorer le scroll momentum */
            .scroll-container {
                -webkit-overflow-scrolling: touch;
                overflow-scrolling: touch;
            }
            
            /* Fix pour les éléments fixes avec la barre d'adresse */
            .fixed-element {
                position: fixed;
                top: env(safe-area-inset-top);
                bottom: env(safe-area-inset-bottom);
            }
        `;
        document.head.appendChild(style);
    }
    
    optimizePerformance() {
        // Optimisations de performance pour Chrome mobile
        
        // Utiliser will-change pour les éléments animés
        const animatedElements = document.querySelectorAll('.mobile-tab-2025, .imperium-header-2025, .quick-action-fab');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
        
        // Optimiser les images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
        
        // Précharger les ressources critiques
        this.preloadCriticalResources();
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            'mobile-header-2025.css',
            'mobile-navigation-2025.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.chromeMobileFix = new ChromeMobileNavigationFix();
});
