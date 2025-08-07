/* ===== SYSTÈME DE NAVIGATION POPUP 2025 ===== */

class NavigationPopupSystem {
    constructor() {
        this.isOpen = false;
        this.navigationConfig = this.getNavigationConfig();
        this.init();
    }

    getNavigationConfig() {
        return {
            'Empire': {
                icon: '🏛️',
                title: 'Empire',
                description: 'Gérez votre territoire et vos provinces',
                pages: [
                    { key: 'index', title: 'Accueil', file: 'index.html', icon: '🏛️', desc: 'Vue d\'ensemble de votre empire' },
                    { key: 'cite', title: 'Ma Cité', file: 'Navigation/Empire/Cite.html', icon: '🏛️', desc: 'Développez votre cité principale' },
                    { key: 'monde', title: 'Monde', file: 'Navigation/Empire/Monde.html', icon: '🌍', desc: 'Explorez le monde romain' },
                    { key: 'province', title: 'Province', file: 'Navigation/Empire/Province.html', icon: '🏝️', desc: 'Administrez vos provinces' }
                ]
            },
            'Développement': {
                icon: '📚',
                title: 'Développement',
                description: 'Recherche et commerce pour votre empire',
                pages: [
                    { key: 'academie', title: 'Académie', file: 'Navigation/Developpement/Academie.html', icon: '📚', desc: 'Recherchez de nouvelles technologies' },
                    { key: 'commerce', title: 'Commerce', file: 'Navigation/Developpement/Commerce.html', icon: '⚖️', desc: 'Gérez vos routes commerciales' }
                ]
            },
            'Militaire': {
                icon: '⚔️',
                title: 'Militaire',
                description: 'Armées et stratégies de guerre',
                pages: [
                    { key: 'legions', title: 'Légions', file: 'Navigation/Militaire/Légions.html', icon: '⚔️', desc: 'Commandez vos légions' },
                    { key: 'flotte', title: 'Flotte', file: 'Navigation/Militaire/Flotte.html', icon: '🚢', desc: 'Contrôlez vos navires de guerre' },
                    { key: 'simulateur', title: 'Simulateur', file: 'Navigation/Militaire/Simulateur.html', icon: '💥', desc: 'Simulez vos batailles' }
                ]
            },
            'Social': {
                icon: '🤝',
                title: 'Social',
                description: 'Diplomatie et relations avec les autres joueurs',
                pages: [
                    { key: 'diplomatie', title: 'Diplomatie', file: 'Navigation/Social/Diplomatie.html', icon: '🤝', desc: 'Négociez avec les autres empires' },
                    { key: 'alliance', title: 'Alliance', file: 'Navigation/Social/Alliance.html', icon: '🛡️', desc: 'Rejoignez ou créez une alliance' },
                    { key: 'messages', title: 'Messages', file: 'Navigation/Social/Messsages.html', icon: '✉️', desc: 'Communiquez avec les autres joueurs' }
                ]
            },
            'Premium': {
                icon: '👑',
                title: 'Premium',
                description: 'Fonctionnalités et avantages premium',
                pages: [
                    { key: 'premium', title: 'Premium', file: 'Navigation/Premium/Premium.html', icon: '👑', desc: 'Découvrez les avantages premium' }
                ]
            }
        };
    }

    init() {
        this.createHelmButton();
        this.createPopupOverlay();
        this.bindEvents();
        console.log('🚀 Système de navigation popup 2025 initialisé');
    }

    createHelmButton() {
        // Supprimer le bouton existant s'il y en a un
        const existingButton = document.querySelector('.navigation-helm-button');
        if (existingButton) {
            existingButton.remove();
        }

        const helmButton = document.createElement('div');
        helmButton.className = 'navigation-helm-button';
        helmButton.innerHTML = `
            <div class="helm-icon">⚓</div>
        `;
        
        document.body.appendChild(helmButton);
        
        helmButton.addEventListener('click', () => this.togglePopup());
    }

    createPopupOverlay() {
        // Supprimer l'overlay existant s'il y en a un
        const existingOverlay = document.querySelector('.navigation-popup-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'navigation-popup-overlay';
        overlay.innerHTML = this.generatePopupHTML();
        
        document.body.appendChild(overlay);
    }

    generatePopupHTML() {
        let sectionsHTML = '';
        
        Object.entries(this.navigationConfig).forEach(([sectionKey, section]) => {
            let buttonsHTML = '';
            
            section.pages.forEach(page => {
                buttonsHTML += `
                    <div class="nav-button" data-page="${page.key}" data-file="${page.file}">
                        <div class="nav-button-icon">${page.icon}</div>
                        <div class="nav-button-content">
                            <div class="nav-button-title">${page.title}</div>
                            <div class="nav-button-desc">${page.desc}</div>
                        </div>
                    </div>
                `;
            });

            sectionsHTML += `
                <div class="nav-section-popup">
                    <div class="section-header">
                        <div class="section-icon">${section.icon}</div>
                        <div>
                            <div class="section-title">${section.title}</div>
                            <div class="popup-subtitle">${section.description}</div>
                        </div>
                    </div>
                    <div class="nav-buttons-grid">
                        ${buttonsHTML}
                    </div>
                </div>
            `;
        });

        return `
            <div class="navigation-popup">
                <div class="popup-close-btn">×</div>
                <div class="popup-header">
                    <div class="popup-title">NAVIGATION IMPERIUM</div>
                    <div class="popup-subtitle">Choisissez votre destination dans l'empire</div>
                </div>
                <div class="navigation-sections">
                    ${sectionsHTML}
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Événement pour fermer la popup
        document.addEventListener('click', (e) => {
            const overlay = document.querySelector('.navigation-popup-overlay');
            const popup = document.querySelector('.navigation-popup');
            const closeBtn = document.querySelector('.popup-close-btn');
            
            if (e.target === overlay || e.target === closeBtn) {
                this.closePopup();
            }
        });

        // Événements pour les boutons de navigation
        document.addEventListener('click', (e) => {
            const navButton = e.target.closest('.nav-button');
            if (navButton) {
                const file = navButton.getAttribute('data-file');
                const pageKey = navButton.getAttribute('data-page');
                this.navigateToPage(file, pageKey);
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePopup();
            }
        });

        // Empêcher la fermeture lors du clic sur la popup elle-même
        document.addEventListener('click', (e) => {
            const popup = document.querySelector('.navigation-popup');
            if (popup && popup.contains(e.target) && !e.target.classList.contains('popup-close-btn')) {
                e.stopPropagation();
            }
        });
    }

    togglePopup() {
        if (this.isOpen) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }

    openPopup() {
        const overlay = document.querySelector('.navigation-popup-overlay');
        if (overlay) {
            overlay.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden'; // Empêcher le scroll du body
            
            // Animation d'entrée pour les sections
            const sections = overlay.querySelectorAll('.nav-section-popup');
            sections.forEach((section, index) => {
                section.style.animationDelay = `${0.1 + (index * 0.1)}s`;
            });
        }
    }

    closePopup() {
        const overlay = document.querySelector('.navigation-popup-overlay');
        if (overlay) {
            overlay.classList.add('closing');
            
            setTimeout(() => {
                overlay.classList.remove('active', 'closing');
                this.isOpen = false;
                document.body.style.overflow = ''; // Restaurer le scroll du body
            }, 400);
        }
    }

    navigateToPage(file, pageKey) {
        console.log(`Navigation vers: ${file} (${pageKey})`);
        
        // Fermer la popup avant de naviguer
        this.closePopup();
        
        // Attendre un peu pour que l'animation de fermeture se termine
        setTimeout(() => {
            // Déterminer l'URL correcte en fonction de la page actuelle
            let targetUrl = file;
            const currentPath = window.location.pathname;
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            
            // Si nous sommes dans un sous-dossier, ajuster le chemin
            if (currentDir.includes('/Navigation/') || currentDir.includes('/')) {
                if (file === 'index.html') {
                    // Retour à l'accueil depuis un sous-dossier
                    const depth = (currentPath.match(/\//g) || []).length - 1;
                    targetUrl = '../'.repeat(depth) + 'index.html';
                } else if (file.startsWith('Navigation/')) {
                    // Navigation vers une autre page depuis un sous-dossier
                    const depth = (currentPath.match(/\//g) || []).length - 1;
                    targetUrl = '../'.repeat(depth) + file;
                }
            }
            
            // Effectuer la navigation
            window.location.href = targetUrl;
        }, 200);
    }

    // Méthode pour mettre à jour la configuration si nécessaire
    updateNavigationConfig(newConfig) {
        this.navigationConfig = { ...this.navigationConfig, ...newConfig };
        this.createPopupOverlay(); // Recréer la popup avec la nouvelle configuration
    }

    // Méthode pour ajouter une nouvelle page
    addPage(section, pageData) {
        if (this.navigationConfig[section]) {
            this.navigationConfig[section].pages.push(pageData);
            this.createPopupOverlay();
        }
    }

    // Méthode pour supprimer une page
    removePage(section, pageKey) {
        if (this.navigationConfig[section]) {
            this.navigationConfig[section].pages = this.navigationConfig[section].pages.filter(
                page => page.key !== pageKey
            );
            this.createPopupOverlay();
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour s'assurer que tous les autres scripts sont chargés
    setTimeout(() => {
        window.navigationPopupSystem = new NavigationPopupSystem();
    }, 500);
});

// Fonction globale pour ouvrir la popup (utilisable depuis d'autres scripts)
function openNavigationPopup() {
    if (window.navigationPopupSystem) {
        window.navigationPopupSystem.openPopup();
    }
}

// Fonction globale pour fermer la popup
function closeNavigationPopup() {
    if (window.navigationPopupSystem) {
        window.navigationPopupSystem.closePopup();
    }
}

// Fonction globale pour basculer la popup
function toggleNavigationPopup() {
    if (window.navigationPopupSystem) {
        window.navigationPopupSystem.togglePopup();
    }
}