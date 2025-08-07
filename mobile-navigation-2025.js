/**
 * 🏛️ IMPERIUM - Navigation Mobile Gaming 2025
 * Système de navigation par onglets avec animations fluides et effets gaming
 */

class ImperiumMobileNavigation2025 {
    constructor() {
        this.isMobile = this.detectMobile();
        this.currentTab = 'empire';
        this.currentView = 'city';
        this.isInitialized = false;
        this.swipeThreshold = 80;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isScrolling = false;
        
        // Configuration des onglets avec sous-vues
        this.tabs = [
            {
                id: 'empire',
                icon: '🏛️',
                label: 'Empire',
                color: '#FFD700',
                views: [
                    { id: 'city', name: 'Ma Cité', icon: '🏛️', path: 'Navigation/Empire/Cite.html' },
                    { id: 'province', name: 'Province', icon: '🏝️', path: 'Navigation/Empire/Province.html' },
                    { id: 'world', name: 'Monde', icon: '🌍', path: 'Navigation/Empire/Monde.html' }
                ]
            },
            {
                id: 'military',
                icon: '⚔️',
                label: 'Militaire',
                color: '#FF4444',
                views: [
                    { id: 'legions', name: 'Légions', icon: '🛡️', path: 'Navigation/Militaire/Légions.html' },
                    { id: 'fleets', name: 'Flottes', icon: '⛵', path: 'Navigation/Militaire/Flotte.html' },
                    { id: 'simulator', name: 'Simulateur', icon: '🎯', path: 'Navigation/Militaire/Simulateur.html' }
                ]
            },
            {
                id: 'development',
                icon: '📚',
                label: 'Développement',
                color: '#00BFFF',
                views: [
                    { id: 'academy', name: 'Académie', icon: '🎓', path: 'Navigation/Developpement/Academie.html' },
                    { id: 'commerce', name: 'Commerce', icon: '💰', path: 'Navigation/Developpement/Commerce.html' }
                ]
            },
            {
                id: 'social',
                icon: '👥',
                label: 'Social',
                color: '#8A2BE2',
                views: [
                    { id: 'alliance', name: 'Alliance', icon: '🤝', path: 'Navigation/Social/Alliance.html' },
                    { id: 'diplomacy', name: 'Diplomatie', icon: '🕊️', path: 'Navigation/Social/Diplomatie.html' },
                    { id: 'messages', name: 'Messages', icon: '📜', path: 'Navigation/Social/Messsages.html' }
                ]
            },
            {
                id: 'premium',
                icon: '💎',
                label: 'Premium',
                color: '#FF69B4',
                views: [
                    { id: 'premium', name: 'Premium', icon: '💎', path: 'Navigation/Premium/Premium.html' }
                ]
            }
        ];
        
        this.notifications = {
            military: 2,
            social: 5,
            development: 1
        };
        
        this.init();
    }
    
    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    init() {
        if (this.isMobile && !this.isInitialized) {
            this.createMobileInterface();
            this.setupEventListeners();
            this.setupSwipeNavigation();
            this.setupTouchFeedback();
            this.adaptBodyLayout();
            this.isInitialized = true;
            console.log('🚀 Navigation mobile 2025 initialisée');
        }
    }
    
    createMobileInterface() {
        this.createBottomTabs();
        this.createViewSwitcher();
        this.createQuickActionFab();
    }
    
    createBottomTabs() {
        // Supprimer les anciens onglets
        const existingTabs = document.querySelector('.mobile-tabs-2025');
        if (existingTabs) existingTabs.remove();
        
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'mobile-tabs-2025';
        
        // Indicateur de tab actif
        const activeIndicator = document.createElement('div');
        activeIndicator.className = 'tab-active-indicator';
        tabsContainer.appendChild(activeIndicator);
        
        // Créer les onglets
        this.tabs.forEach((tab, index) => {
            const tabElement = document.createElement('div');
            tabElement.className = `mobile-tab-2025 ${tab.id === this.currentTab ? 'active' : ''}`;
            tabElement.dataset.tab = tab.id;
            tabElement.dataset.index = index;
            
            const notificationCount = this.notifications[tab.id] || 0;
            const hasNotification = notificationCount > 0;
            
            tabElement.innerHTML = `
                <div class="tab-glow" style="--tab-color: ${tab.color}"></div>
                <div class="tab-content">
                    <div class="tab-icon-container">
                        <span class="tab-icon">${tab.icon}</span>
                        ${hasNotification ? `<span class="tab-notification" style="background: ${tab.color}">${notificationCount > 99 ? '99+' : notificationCount}</span>` : ''}
                    </div>
                    <span class="tab-label">${tab.label}</span>
                    <div class="tab-ripple"></div>
                </div>
            `;
            
            tabElement.addEventListener('click', (e) => this.handleTabClick(e, tab.id, index));
            tabsContainer.appendChild(tabElement);
        });
        
        document.body.appendChild(tabsContainer);
        this.updateActiveIndicator();
    }
    
    createViewSwitcher() {
        // Créer le sélecteur de vues pour l'onglet actuel
        const existingSwitcher = document.querySelector('.view-switcher-2025');
        if (existingSwitcher) existingSwitcher.remove();
        
        const currentTabData = this.tabs.find(tab => tab.id === this.currentTab);
        if (!currentTabData || currentTabData.views.length <= 1) return;
        
        const switcher = document.createElement('div');
        switcher.className = 'view-switcher-2025';
        
        switcher.innerHTML = `
            <div class="switcher-background"></div>
            <div class="switcher-content">
                <div class="switcher-title">
                    <span class="switcher-icon">${currentTabData.icon}</span>
                    <span class="switcher-text">${currentTabData.label}</span>
                </div>
                <div class="view-options">
                    ${currentTabData.views.map(view => `
                        <button class="view-option ${view.id === this.currentView ? 'active' : ''}" 
                                data-view="${view.id}" 
                                data-path="${view.path}">
                            <span class="view-icon">${view.icon}</span>
                            <span class="view-name">${view.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Positionner sous le header
        const header = document.querySelector('.imperium-header-2025');
        if (header) {
            header.insertAdjacentElement('afterend', switcher);
        } else {
            document.body.appendChild(switcher);
        }
        
        // Bind events pour les options de vue
        switcher.querySelectorAll('.view-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const viewId = e.currentTarget.dataset.view;
                const viewPath = e.currentTarget.dataset.path;
                this.switchView(viewId, viewPath);
            });
        });
    }
    
    createQuickActionFab() {
        // Bouton d'action flottant pour accès rapide
        const existingFab = document.querySelector('.quick-action-fab');
        if (existingFab) existingFab.remove();
        
        const fab = document.createElement('div');
        fab.className = 'quick-action-fab';
        fab.innerHTML = `
            <div class="fab-glow"></div>
            <button class="fab-button" id="quick-action-btn">
                <span class="fab-icon">⚡</span>
            </button>
            <div class="fab-menu" id="fab-menu">
                <button class="fab-menu-item" data-action="home">
                    <span class="fab-menu-icon">🏠</span>
                    <span class="fab-menu-label">Accueil</span>
                </button>
                <button class="fab-menu-item" data-action="save">
                    <span class="fab-menu-icon">💾</span>
                    <span class="fab-menu-label">Sauvegarder</span>
                </button>
                <button class="fab-menu-item" data-action="settings">
                    <span class="fab-menu-icon">⚙️</span>
                    <span class="fab-menu-label">Paramètres</span>
                </button>
            </div>
        `;
        
        document.body.appendChild(fab);
        
        // Events pour le FAB
        const fabButton = fab.querySelector('#quick-action-btn');
        const fabMenu = fab.querySelector('#fab-menu');
        
        fabButton.addEventListener('click', () => {
            fab.classList.toggle('fab-expanded');
        });
        
        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target)) {
                fab.classList.remove('fab-expanded');
            }
        });
        
        // Actions du menu
        fab.querySelectorAll('.fab-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
                fab.classList.remove('fab-expanded');
            });
        });
    }
    
    handleTabClick(event, tabId, index) {
        if (tabId === this.currentTab) {
            // Si on clique sur l'onglet actuel, afficher le sélecteur de vues
            this.toggleViewSwitcher();
            return;
        }
        
        // Effet de ripple
        this.createRippleEffect(event.currentTarget, event);
        
        // Vibration tactile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Changer d'onglet
        this.switchTab(tabId, index);
    }
    
    switchTab(tabId, index) {
        const previousTab = this.currentTab;
        this.currentTab = tabId;
        
        // Mettre à jour l'apparence des onglets
        document.querySelectorAll('.mobile-tab-2025').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Mettre à jour l'indicateur
        this.updateActiveIndicator(index);
        
        // Recréer le sélecteur de vues
        this.createViewSwitcher();
        
        // Naviguer vers la première vue de l'onglet
        const tabData = this.tabs.find(tab => tab.id === tabId);
        if (tabData && tabData.views.length > 0) {
            const firstView = tabData.views[0];
            this.switchView(firstView.id, firstView.path);
        }
        
        // Animation de transition
        this.animateTabTransition(previousTab, tabId);
    }
    
    switchView(viewId, viewPath) {
        this.currentView = viewId;
        
        // Mettre à jour l'apparence du sélecteur de vues
        document.querySelectorAll('.view-option').forEach(option => {
            option.classList.remove('active');
        });
        
        const activeOption = document.querySelector(`[data-view="${viewId}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
        
        // Navigation vers la page
        if (viewPath) {
            this.navigateToPage(viewPath);
        }
        
        // Fermer le sélecteur de vues
        const switcher = document.querySelector('.view-switcher-2025');
        if (switcher) {
            switcher.classList.remove('expanded');
        }
    }
    
    navigateToPage(path) {
        // Animation de sortie
        document.body.classList.add('page-transitioning');
        
        setTimeout(() => {
            window.location.href = path;
        }, 300);
    }
    
    updateActiveIndicator(index = null) {
        const indicator = document.querySelector('.tab-active-indicator');
        if (!indicator) return;
        
        if (index === null) {
            index = this.tabs.findIndex(tab => tab.id === this.currentTab);
        }
        
        const tabWidth = 100 / this.tabs.length;
        const translateX = index * tabWidth;
        
        indicator.style.transform = `translateX(${translateX}%)`;
        indicator.style.width = `${tabWidth}%`;
        
        // Couleur de l'indicateur
        const currentTabData = this.tabs[index];
        if (currentTabData) {
            indicator.style.background = currentTabData.color;
            indicator.style.boxShadow = `0 0 20px ${currentTabData.color}`;
        }
    }
    
    toggleViewSwitcher() {
        const switcher = document.querySelector('.view-switcher-2025');
        if (switcher) {
            switcher.classList.toggle('expanded');
        }
    }
    
    createRippleEffect(element, event) {
        const ripple = element.querySelector('.tab-ripple');
        if (!ripple) return;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-active');
        
        setTimeout(() => {
            ripple.classList.remove('ripple-active');
        }, 600);
    }
    
    animateTabTransition(fromTab, toTab) {
        // Animation de transition entre onglets
        const body = document.body;
        body.classList.add('tab-transitioning');
        
        setTimeout(() => {
            body.classList.remove('tab-transitioning');
        }, 500);
    }
    
    setupEventListeners() {
        // Écouter les changements d'orientation
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });
        
        // Écouter les changements de taille
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = this.detectMobile();
            
            if (wasMobile !== this.isMobile) {
                if (this.isMobile) {
                    this.init();
                } else {
                    this.destroyMobileInterface();
                }
            }
        });
        
        // Prévenir le zoom sur double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
    
    setupSwipeNavigation() {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = Math.abs(e.touches[0].clientX - startX);
            const diffY = Math.abs(e.touches[0].clientY - startY);
            
            if (diffY > diffX) {
                isScrolling = true;
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY || isScrolling) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > this.swipeThreshold) {
                if (diffX > 0) {
                    this.switchToNextTab();
                } else {
                    this.switchToPreviousTab();
                }
            }
            
            startX = 0;
            startY = 0;
        }, { passive: true });
    }
    
    switchToNextTab() {
        const currentIndex = this.tabs.findIndex(tab => tab.id === this.currentTab);
        const nextIndex = (currentIndex + 1) % this.tabs.length;
        this.switchTab(this.tabs[nextIndex].id, nextIndex);
    }
    
    switchToPreviousTab() {
        const currentIndex = this.tabs.findIndex(tab => tab.id === this.currentTab);
        const prevIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
        this.switchTab(this.tabs[prevIndex].id, prevIndex);
    }
    
    setupTouchFeedback() {
        // Améliorer le feedback tactile pour tous les éléments interactifs
        const touchElements = document.querySelectorAll('.mobile-tab-2025, .view-option, .fab-button, .fab-menu-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
            }, { passive: true });
            
            element.addEventListener('touchcancel', () => {
                element.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }
    
    adaptBodyLayout() {
        // Adapter le layout du body pour la navigation mobile
        document.body.classList.add('mobile-navigation-2025');
        
        // Ajouter les marges pour le header et les onglets
        const style = document.createElement('style');
        style.textContent = `
            body.mobile-navigation-2025 {
                padding-top: 65px; /* Header height */
                padding-bottom: 80px; /* Tabs height */
            }
            
            body.mobile-navigation-2025 .imperium-body {
                margin-top: 0;
                margin-bottom: 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleOrientationChange() {
        // Réajuster l'interface après changement d'orientation
        setTimeout(() => {
            this.updateActiveIndicator();
            this.createViewSwitcher();
        }, 300);
    }
    
    handleQuickAction(action) {
        switch (action) {
            case 'home':
                window.location.href = 'index.html';
                break;
            case 'save':
                this.saveGameState();
                break;
            case 'settings':
                this.showSettings();
                break;
        }
    }
    
    saveGameState() {
        // Sauvegarder l'état du jeu
        console.log('💾 Sauvegarde en cours...');
        // TODO: Implémenter la sauvegarde
    }
    
    showSettings() {
        // Afficher les paramètres
        console.log('⚙️ Ouverture des paramètres...');
        // TODO: Implémenter les paramètres
    }
    
    destroyMobileInterface() {
        // Nettoyer l'interface mobile
        const elements = [
            '.mobile-tabs-2025',
            '.view-switcher-2025',
            '.quick-action-fab'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.remove();
        });
        
        document.body.classList.remove('mobile-navigation-2025');
        this.isInitialized = false;
    }
    
    // API publique
    updateNotification(tabId, count) {
        this.notifications[tabId] = count;
        this.createBottomTabs(); // Recréer pour mettre à jour
    }
    
    getCurrentTab() {
        return this.currentTab;
    }
    
    getCurrentView() {
        return this.currentView;
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.imperiumNavigation = new ImperiumMobileNavigation2025();
        console.log('🚀 Navigation mobile 2025 prête');
    }
});