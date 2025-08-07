/**
 * 🏛️ IMPERIUM - Header Mobile Gaming 2025
 * Interface mobile moderne avec animations fluides et effets visuels avancés
 */

class ImperiumMobileHeader2025 {
    constructor() {
        this.isVisible = true;
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
        this.resourcesExpanded = false;
        this.notificationsCount = 0;
        
        // Ressources du joueur
        this.resources = {
            gold: { value: 15200, icon: '💰', name: 'Or', color: '#FFD700' },
            food: { value: 4560, icon: '🍇', name: 'Nourriture', color: '#8B4513' },
            stone: { value: 2340, icon: '🏛️', name: 'Pierre', color: '#708090' },
            iron: { value: 8900, icon: '⚔️', name: 'Fer', color: '#C0C0C0' },
            wood: { value: 3200, icon: '🌲', name: 'Bois', color: '#8B4513' },
            population: { value: 1250, icon: '👥', name: 'Population', color: '#4169E1' }
        };
        
        // Ressources prioritaires pour l'affichage compact
        this.priorityResources = ['gold', 'food', 'population'];
        
        this.init();
    }
    
    init() {
        this.createModernHeader();
        this.setupScrollBehavior();
        this.setupResourceSystem();
        this.setupNotifications();
        this.startResourceUpdates();
        this.setupTouchInteractions();
    }
    
    createModernHeader() {
        // Supprimer l'ancien header s'il existe
        const oldHeader = document.querySelector('.imperium-header');
        if (oldHeader) oldHeader.remove();
        
        const header = document.createElement('header');
        header.className = 'imperium-header-2025';
        header.innerHTML = `
            <div class="header-glass-bg"></div>
            <div class="header-content-2025">
                <!-- Logo avec effet néon -->
                <div class="logo-container" onclick="this.navigateHome()">
                    <div class="logo-glow"></div>
                    <h1 class="imperium-logo-2025">
                        <span class="logo-letter">I</span>
                        <span class="logo-text">MPERIUM</span>
                    </h1>
                </div>
                
                <!-- Ressources compactes -->
                <div class="resources-compact" id="resources-compact">
                    <div class="resources-display-2025" id="resources-display">
                        ${this.generateCompactResources()}
                    </div>
                    <button class="resources-expand-btn" id="resources-expand-btn">
                        <span class="expand-icon">⚡</span>
                    </button>
                </div>
                
                <!-- Actions rapides -->
                <div class="quick-actions">
                    <button class="action-btn notification-btn" id="notification-btn">
                        <span class="btn-icon">🔔</span>
                        <span class="notification-badge" id="notification-badge">0</span>
                    </button>
                    <button class="action-btn menu-btn" id="menu-btn">
                        <span class="btn-icon">⚙️</span>
                    </button>
                </div>
            </div>
            
            <!-- Popup des ressources détaillées -->
            <div class="resources-popup" id="resources-popup">
                <div class="popup-header">
                    <h3>📊 Ressources de l'Empire</h3>
                    <button class="popup-close" id="resources-popup-close">✕</button>
                </div>
                <div class="popup-content">
                    <div class="resources-grid">
                        ${this.generateDetailedResources()}
                    </div>
                    <div class="resources-production">
                        <h4>📈 Production par heure</h4>
                        <div class="production-stats" id="production-stats">
                            <!-- Sera rempli dynamiquement -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Overlay pour fermer les popups -->
            <div class="header-overlay" id="header-overlay"></div>
        `;
        
        document.body.insertBefore(header, document.body.firstChild);
        this.bindEvents();
    }
    
    generateCompactResources() {
        return this.priorityResources.map(key => {
            const resource = this.resources[key];
            return `
                <div class="resource-compact" data-resource="${key}">
                    <span class="resource-icon-2025">${resource.icon}</span>
                    <span class="resource-value-2025" style="color: ${resource.color}">
                        ${this.formatNumber(resource.value)}
                    </span>
                </div>
            `;
        }).join('');
    }
    
    generateDetailedResources() {
        return Object.entries(this.resources).map(([key, resource]) => `
            <div class="resource-detailed" data-resource="${key}">
                <div class="resource-header">
                    <span class="resource-icon-large">${resource.icon}</span>
                    <div class="resource-info">
                        <h4 class="resource-name">${resource.name}</h4>
                        <span class="resource-value-large" style="color: ${resource.color}">
                            ${this.formatNumberDetailed(resource.value)}
                        </span>
                    </div>
                </div>
                <div class="resource-bar">
                    <div class="resource-progress" style="background: ${resource.color}; width: ${Math.min(100, (resource.value / 10000) * 100)}%"></div>
                </div>
                <div class="resource-capacity">
                    <span class="capacity-text">Capacité: ${this.formatNumber(10000)}</span>
                </div>
            </div>
        `).join('');
    }
    
    bindEvents() {
        // Bouton d'expansion des ressources
        const expandBtn = document.getElementById('resources-expand-btn');
        const popup = document.getElementById('resources-popup');
        const popupClose = document.getElementById('resources-popup-close');
        const overlay = document.getElementById('header-overlay');
        
        expandBtn?.addEventListener('click', () => this.toggleResourcesPopup());
        popupClose?.addEventListener('click', () => this.closeResourcesPopup());
        overlay?.addEventListener('click', () => this.closeAllPopups());
        
        // Bouton de notifications
        const notificationBtn = document.getElementById('notification-btn');
        notificationBtn?.addEventListener('click', () => this.showNotifications());
        
        // Bouton menu
        const menuBtn = document.getElementById('menu-btn');
        menuBtn?.addEventListener('click', () => this.showQuickMenu());
        
        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllPopups();
            }
        });
    }
    
    setupScrollBehavior() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('.imperium-header-2025');
        
        if (!header) return;
        
        // Masquer/afficher selon le scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
            // Scroll vers le bas - masquer
            if (this.isVisible) {
                header.classList.add('header-hidden');
                this.isVisible = false;
            }
        } else if (currentScrollY < this.lastScrollY || currentScrollY <= this.scrollThreshold) {
            // Scroll vers le haut ou en haut de page - afficher
            if (!this.isVisible) {
                header.classList.remove('header-hidden');
                this.isVisible = true;
            }
        }
        
        // Effet de transparence selon la position
        const opacity = Math.max(0.85, 1 - (currentScrollY / 200));
        header.style.setProperty('--header-opacity', opacity);
        
        this.lastScrollY = currentScrollY;
    }
    
    setupResourceSystem() {
        // Animation des ressources au changement
        this.setupResourceAnimations();
        
        // Mise à jour périodique
        setInterval(() => {
            this.updateResourcesDisplay();
        }, 1000);
    }
    
    setupResourceAnimations() {
        const resources = document.querySelectorAll('.resource-compact');
        resources.forEach(resource => {
            resource.addEventListener('click', (e) => {
                e.stopPropagation();
                this.animateResourceClick(resource);
            });
        });
    }
    
    animateResourceClick(element) {
        element.style.transform = 'scale(1.1)';
        element.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.filter = 'brightness(1)';
        }, 200);
        
        // Vibration tactile
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    toggleResourcesPopup() {
        const popup = document.getElementById('resources-popup');
        const overlay = document.getElementById('header-overlay');
        
        if (this.resourcesExpanded) {
            this.closeResourcesPopup();
        } else {
            popup.classList.add('popup-visible');
            overlay.classList.add('overlay-visible');
            this.resourcesExpanded = true;
            
            // Animation d'entrée
            popup.style.transform = 'translateY(-20px)';
            popup.style.opacity = '0';
            
            requestAnimationFrame(() => {
                popup.style.transform = 'translateY(0)';
                popup.style.opacity = '1';
            });
            
            // Mettre à jour les stats de production
            this.updateProductionStats();
        }
    }
    
    closeResourcesPopup() {
        const popup = document.getElementById('resources-popup');
        const overlay = document.getElementById('header-overlay');
        
        popup.classList.remove('popup-visible');
        overlay.classList.remove('overlay-visible');
        this.resourcesExpanded = false;
    }
    
    closeAllPopups() {
        this.closeResourcesPopup();
        // Fermer d'autres popups si nécessaire
    }
    
    updateResourcesDisplay() {
        // Mettre à jour l'affichage compact
        this.priorityResources.forEach(key => {
            const element = document.querySelector(`[data-resource="${key}"] .resource-value-2025`);
            if (element) {
                const newValue = this.formatNumber(this.resources[key].value);
                if (element.textContent !== newValue) {
                    element.textContent = newValue;
                    this.animateValueChange(element);
                }
            }
        });
        
        // Mettre à jour l'affichage détaillé si ouvert
        if (this.resourcesExpanded) {
            this.updateDetailedResources();
        }
    }
    
    updateDetailedResources() {
        Object.entries(this.resources).forEach(([key, resource]) => {
            const valueElement = document.querySelector(`[data-resource="${key}"] .resource-value-large`);
            const progressElement = document.querySelector(`[data-resource="${key}"] .resource-progress`);
            
            if (valueElement) {
                valueElement.textContent = this.formatNumberDetailed(resource.value);
            }
            
            if (progressElement) {
                const percentage = Math.min(100, (resource.value / 10000) * 100);
                progressElement.style.width = percentage + '%';
            }
        });
    }
    
    updateProductionStats() {
        const statsContainer = document.getElementById('production-stats');
        if (!statsContainer) return;
        
        const productionData = {
            gold: '+125/h',
            food: '+89/h',
            stone: '+45/h',
            iron: '+67/h',
            wood: '+52/h'
        };
        
        statsContainer.innerHTML = Object.entries(productionData).map(([key, production]) => `
            <div class="production-item">
                <span class="production-icon">${this.resources[key].icon}</span>
                <span class="production-value" style="color: ${this.resources[key].color}">${production}</span>
            </div>
        `).join('');
    }
    
    animateValueChange(element) {
        element.classList.add('value-updated');
        setTimeout(() => {
            element.classList.remove('value-updated');
        }, 600);
    }
    
    startResourceUpdates() {
        // Simulation de production de ressources
        setInterval(() => {
            Object.keys(this.resources).forEach(key => {
                const increase = Math.floor(Math.random() * 20) + 5;
                this.resources[key].value += increase;
            });
        }, 30000); // Toutes les 30 secondes
    }
    
    setupTouchInteractions() {
        // Améliorer les interactions tactiles
        const touchElements = document.querySelectorAll('.action-btn, .resource-compact, .resources-expand-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
            }, { passive: true });
        });
    }
    
    setupNotifications() {
        // Système de notifications moderne
        this.notifications = [];
        this.updateNotificationBadge();
    }
    
    addNotification(message, type = 'info', priority = 'normal') {
        const notification = {
            id: Date.now(),
            message,
            type,
            priority,
            timestamp: new Date(),
            read: false
        };
        
        this.notifications.unshift(notification);
        this.updateNotificationBadge();
        
        // Animation de notification
        this.animateNewNotification();
    }
    
    updateNotificationBadge() {
        const badge = document.getElementById('notification-badge');
        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        if (badge) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }
    
    animateNewNotification() {
        const btn = document.getElementById('notification-btn');
        if (btn) {
            btn.classList.add('notification-pulse');
            setTimeout(() => {
                btn.classList.remove('notification-pulse');
            }, 1000);
        }
    }
    
    showNotifications() {
        // Créer et afficher le panneau de notifications
        console.log('Affichage des notifications:', this.notifications);
        // TODO: Implémenter le panneau de notifications
    }
    
    showQuickMenu() {
        // Afficher le menu rapide
        console.log('Affichage du menu rapide');
        // TODO: Implémenter le menu rapide
    }
    
    navigateHome() {
        window.location.href = 'index.html';
    }
    
    // Utilitaires
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    formatNumberDetailed(num) {
        return num.toLocaleString('fr-FR');
    }
    
    // API publique pour les autres modules
    updateResource(resourceType, amount) {
        if (this.resources[resourceType]) {
            this.resources[resourceType].value = Math.max(0, this.resources[resourceType].value + amount);
            this.updateResourcesDisplay();
        }
    }
    
    getResource(resourceType) {
        return this.resources[resourceType]?.value || 0;
    }
    
    setResource(resourceType, value) {
        if (this.resources[resourceType]) {
            this.resources[resourceType].value = Math.max(0, value);
            this.updateResourcesDisplay();
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur mobile
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.imperiumHeader = new ImperiumMobileHeader2025();
        console.log('🚀 Header mobile 2025 initialisé');
    }
});