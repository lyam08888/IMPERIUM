/**
 * 🏛️ IMPERIUM - Intégration Mobile 2025
 * Script d'intégration automatique pour toutes les pages du site
 * Assure la cohérence de l'interface mobile sur toutes les pages
 */

class ImperiumMobileIntegration2025 {
    constructor() {
        this.isInitialized = false;
        this.currentPage = this.detectCurrentPage();
        this.isMobile = this.detectMobile();
        this.resourceUpdateInterval = null;
        
        // Configuration des pages
        this.pageConfigs = {
            'index': { tab: 'empire', view: 'city', color: '#FFD700' },
            'cite': { tab: 'empire', view: 'city', color: '#FFD700' },
            'province': { tab: 'empire', view: 'province', color: '#32CD32' },
            'monde': { tab: 'empire', view: 'world', color: '#4169E1' },
            'legions': { tab: 'military', view: 'legions', color: '#FF4444' },
            'flotte': { tab: 'military', view: 'fleets', color: '#00CED1' },
            'simulateur': { tab: 'military', view: 'simulator', color: '#FF6347' },
            'academie': { tab: 'development', view: 'academy', color: '#9370DB' },
            'commerce': { tab: 'development', view: 'commerce', color: '#32CD32' },
            'alliance': { tab: 'social', view: 'alliance', color: '#FF69B4' },
            'diplomatie': { tab: 'social', view: 'diplomacy', color: '#20B2AA' },
            'messages': { tab: 'social', view: 'messages', color: '#DDA0DD' },
            'premium': { tab: 'premium', view: 'premium', color: '#FF1493' }
        };
        
        this.init();
    }
    
    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '').toLowerCase();
        
        // Mapping des noms de fichiers
        const pageMap = {
            'index': 'index',
            'cite': 'cite',
            'cite-2025': 'cite',
            'province': 'province',
            'monde': 'monde',
            'légions': 'legions',
            'legions': 'legions',
            'flotte': 'flotte',
            'simulateur': 'simulateur',
            'academie': 'academie',
            'académie': 'academie',
            'commerce': 'commerce',
            'alliance': 'alliance',
            'diplomatie': 'diplomatie',
            'messsages': 'messages',
            'messages': 'messages',
            'premium': 'premium'
        };
        
        return pageMap[filename] || 'index';
    }
    
    init() {
        if (this.isMobile && !this.isInitialized) {
            this.loadRequiredSystems();
            this.setupPageIntegration();
            this.startResourceSync();
            this.setupGlobalEventListeners();
            this.isInitialized = true;
            
            console.log('🚀 Intégration mobile 2025 initialisée pour:', this.currentPage);
        }
    }
    
    loadRequiredSystems() {
        // Vérifier et charger les systèmes requis s'ils ne sont pas déjà présents
        if (!document.querySelector('link[href*="mobile-header-2025.css"]')) {
            this.loadCSS('mobile-header-2025.css');
        }
        
        if (!document.querySelector('link[href*="mobile-navigation-2025.css"]')) {
            this.loadCSS('mobile-navigation-2025.css');
        }
        
        if (!window.imperiumHeader) {
            this.loadJS('mobile-header-2025.js');
        }
        
        if (!window.imperiumNavigation) {
            this.loadJS('mobile-navigation-2025.js');
        }
        
        if (!window.chromeMobileFix) {
            this.loadJS('chrome-mobile-fix.js');
        }
    }
    
    loadCSS(filename) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.getResourcePath(filename);
        document.head.appendChild(link);
    }
    
    loadJS(filename) {
        const script = document.createElement('script');
        script.src = this.getResourcePath(filename);
        script.async = true;
        document.head.appendChild(script);
    }
    
    getResourcePath(filename) {
        // Déterminer le chemin relatif selon la profondeur de la page
        const depth = (window.location.pathname.match(/\//g) || []).length - 1;
        const prefix = depth > 1 ? '../../' : depth === 1 ? '../' : '';
        return prefix + filename;
    }
    
    setupPageIntegration() {
        // Attendre que les systèmes soient chargés
        const checkSystems = () => {
            if (window.imperiumHeader && window.imperiumNavigation) {
                this.integrateWithCurrentPage();
            } else {
                setTimeout(checkSystems, 100);
            }
        };
        
        setTimeout(checkSystems, 500);
    }
    
    integrateWithCurrentPage() {
        const pageConfig = this.pageConfigs[this.currentPage];
        if (!pageConfig) return;
        
        // Configurer la navigation
        if (window.imperiumNavigation) {
            window.imperiumNavigation.currentTab = pageConfig.tab;
            window.imperiumNavigation.currentView = pageConfig.view;
            
            // Mettre à jour l'affichage des onglets
            setTimeout(() => {
                const activeTab = document.querySelector(`[data-tab="${pageConfig.tab}"]`);
                if (activeTab) {
                    document.querySelectorAll('.mobile-tab-2025').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    activeTab.classList.add('active');
                    
                    const tabIndex = Array.from(activeTab.parentNode.children).indexOf(activeTab) - 1; // -1 pour l'indicateur
                    window.imperiumNavigation.updateActiveIndicator(tabIndex);
                }
            }, 1000);
        }
        
        // Configurer les couleurs de la page
        this.applyPageTheme(pageConfig.color);
        
        // Adapter le contenu existant
        this.adaptExistingContent();
    }
    
    applyPageTheme(primaryColor) {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --page-primary-color: ${primaryColor} !important;
                --page-secondary-color: ${this.adjustColor(primaryColor, -20)} !important;
            }
            
            /* Adapter les éléments existants à la couleur de la page */
            .mobile-tab-2025.active .tab-glow {
                --tab-color: ${primaryColor};
            }
            
            .tab-active-indicator {
                background: ${primaryColor} !important;
                box-shadow: 0 0 15px ${primaryColor} !important;
            }
            
            /* Boutons et éléments interactifs */
            .btn, .action-btn, .feature-card:hover {
                border-color: ${primaryColor} !important;
            }
            
            .btn-primary, .btn-upgrade {
                background: linear-gradient(135deg, ${primaryColor}, ${this.adjustColor(primaryColor, -20)}) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    adjustColor(color, percent) {
        // Fonction utilitaire pour ajuster la luminosité d'une couleur
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    adaptExistingContent() {
        // Adapter le contenu existant pour le mobile 2025
        setTimeout(() => {
            // Ajouter les classes mobiles aux éléments existants
            document.body.classList.add('mobile-2025-integrated');
            
            // Adapter les conteneurs existants
            const containers = document.querySelectorAll('.page-container, .content-container, .main-content');
            containers.forEach(container => {
                if (!container.classList.contains('page-container-2025')) {
                    container.classList.add('mobile-adapted');
                }
            });
            
            // Adapter les boutons existants
            const buttons = document.querySelectorAll('button:not(.mobile-tab-2025):not(.action-btn):not(.fab-button)');
            buttons.forEach(button => {
                if (!button.classList.contains('btn-2025')) {
                    button.classList.add('btn-mobile-adapted');
                }
            });
            
            // Adapter les cartes existantes
            const cards = document.querySelectorAll('.card, .feature-card, .building-card');
            cards.forEach(card => {
                if (!card.classList.contains('building-card-2025')) {
                    card.classList.add('card-mobile-adapted');
                }
            });
            
            // Ajouter les styles d'adaptation
            this.addAdaptationStyles();
        }, 1500);
    }
    
    addAdaptationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Styles d'adaptation pour les éléments existants */
            body.mobile-2025-integrated {
                padding-top: 65px !important;
                padding-bottom: 80px !important;
            }
            
            .mobile-adapted {
                padding: 20px 16px !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
            }
            
            .btn-mobile-adapted {
                min-height: 48px !important;
                border-radius: 12px !important;
                font-weight: 600 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
            }
            
            .btn-mobile-adapted:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
            }
            
            .btn-mobile-adapted:active {
                transform: translateY(0) scale(0.98) !important;
            }
            
            .card-mobile-adapted {
                border-radius: 16px !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .card-mobile-adapted::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, 
                    rgba(255, 215, 0, 0.05) 0%, 
                    transparent 50%, 
                    rgba(0, 191, 255, 0.05) 100%);
                pointer-events: none;
                z-index: 0;
            }
            
            .card-mobile-adapted > * {
                position: relative;
                z-index: 1;
            }
            
            .card-mobile-adapted:hover {
                transform: translateY(-4px) !important;
                border-color: var(--page-primary-color, #FFD700) !important;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
            }
            
            /* Adaptation des formulaires */
            input, select, textarea {
                min-height: 48px !important;
                border-radius: 12px !important;
                font-size: 16px !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
            
            /* Adaptation des listes */
            .nav-list, .resource-list, .building-list {
                gap: 12px !important;
            }
            
            .nav-item, .list-item {
                border-radius: 12px !important;
                min-height: 48px !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    startResourceSync() {
        // Synchroniser les ressources entre le header et les pages
        this.resourceUpdateInterval = setInterval(() => {
            this.syncResources();
        }, 5000); // Toutes les 5 secondes
    }
    
    syncResources() {
        if (!window.imperiumHeader) return;
        
        // Simuler la production de ressources selon la page
        const productionRates = {
            'cite': { gold: 2, food: 3, stone: 1, iron: 1, wood: 2, population: 0 },
            'province': { gold: 5, food: 8, stone: 3, iron: 2, wood: 4, population: 1 },
            'commerce': { gold: 8, food: 2, stone: 0, iron: 0, wood: 1, population: 0 },
            'academie': { gold: -1, food: -1, stone: 0, iron: 0, wood: 0, population: 0 }
        };
        
        const rates = productionRates[this.currentPage];
        if (rates) {
            Object.entries(rates).forEach(([resource, rate]) => {
                if (rate !== 0) {
                    window.imperiumHeader.updateResource(resource, rate);
                }
            });
        }
    }
    
    setupGlobalEventListeners() {
        // Écouter les changements de page
        window.addEventListener('beforeunload', () => {
            if (this.resourceUpdateInterval) {
                clearInterval(this.resourceUpdateInterval);
            }
        });
        
        // Écouter les changements d'orientation
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Écouter les changements de taille d'écran
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = this.detectMobile();
            
            if (wasMobile !== this.isMobile) {
                if (this.isMobile && !this.isInitialized) {
                    this.init();
                } else if (!this.isMobile && this.isInitialized) {
                    this.cleanup();
                }
            }
        });
        
        // Améliorer les performances
        this.optimizePerformance();
    }
    
    handleOrientationChange() {
        // Réajuster l'interface après changement d'orientation
        if (window.imperiumNavigation) {
            setTimeout(() => {
                window.imperiumNavigation.updateActiveIndicator();
                window.imperiumNavigation.createViewSwitcher();
            }, 300);
        }
    }
    
    optimizePerformance() {
        // Optimisations de performance
        
        // Lazy loading pour les images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
        
        // Optimiser les animations
        const animatedElements = document.querySelectorAll('.mobile-tab-2025, .building-card-2025, .feature-card-2025');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
        
        // Précharger les pages importantes
        this.preloadImportantPages();
    }
    
    preloadImportantPages() {
        const importantPages = ['cite', 'legions', 'commerce'];
        const currentPageConfig = this.pageConfigs[this.currentPage];
        
        if (currentPageConfig) {
            const relatedPages = importantPages.filter(page => 
                this.pageConfigs[page].tab === currentPageConfig.tab
            );
            
            relatedPages.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = this.getPagePath(page);
                document.head.appendChild(link);
            });
        }
    }
    
    getPagePath(pageName) {
        // Mapping des chemins de pages
        const pagePaths = {
            'cite': '../Empire/Cite.html',
            'province': '../Empire/Province.html',
            'monde': '../Empire/Monde.html',
            'legions': '../Militaire/Légions.html',
            'flotte': '../Militaire/Flotte.html',
            'simulateur': '../Militaire/Simulateur.html',
            'academie': '../Developpement/Academie.html',
            'commerce': '../Developpement/Commerce.html',
            'alliance': '../Social/Alliance.html',
            'diplomatie': '../Social/Diplomatie.html',
            'messages': '../Social/Messsages.html',
            'premium': '../Premium/Premium.html'
        };
        
        return pagePaths[pageName] || '#';
    }
    
    cleanup() {
        // Nettoyer les ressources
        if (this.resourceUpdateInterval) {
            clearInterval(this.resourceUpdateInterval);
            this.resourceUpdateInterval = null;
        }
        
        document.body.classList.remove('mobile-2025-integrated');
        this.isInitialized = false;
    }
    
    // API publique
    updatePageConfig(config) {
        Object.assign(this.pageConfigs[this.currentPage], config);
        this.integrateWithCurrentPage();
    }
    
    getCurrentPageConfig() {
        return this.pageConfigs[this.currentPage];
    }
    
    forceResourceUpdate() {
        this.syncResources();
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour que les autres scripts se chargent
    setTimeout(() => {
        window.imperiumIntegration = new ImperiumMobileIntegration2025();
        console.log('🔗 Intégration mobile 2025 prête');
    }, 100);
});