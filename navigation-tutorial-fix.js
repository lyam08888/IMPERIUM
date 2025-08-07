/**
 * 🏛️ IMPERIUM - Fix Navigation et Tutoriel 2025
 * Correction des problèmes de navigation et du système de tutoriel
 */

class NavigationTutorialFix {
    constructor() {
        this.isInitialized = false;
        this.tutorialActive = false;
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    init() {
        console.log('🔧 Initialisation des corrections navigation/tutoriel');
        
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeFixes());
        } else {
            this.initializeFixes();
        }
    }
    
    initializeFixes() {
        this.fixNavigationStructure();
        this.fixTutorialSystem();
        this.fixPageNavigation();
        this.addNavigationHelpers();
        this.fixMobileNavigation();
        this.isInitialized = true;
        
        console.log('✅ Corrections navigation/tutoriel appliquées');
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }
    
    fixNavigationStructure() {
        // Corriger la structure de navigation manquante
        if (!document.querySelector('.imperium-header')) {
            this.createMissingHeader();
        }
        
        // Corriger les liens de navigation
        this.fixNavigationLinks();
        
        // Ajouter un bouton de retour universel
        this.addBackButton();
    }
    
    createMissingHeader() {
        const header = document.createElement('header');
        header.className = 'imperium-header-2025';
        header.innerHTML = `
            <div class="header-content">
                <div class="header-left">
                    <button class="back-btn" onclick="navigateBack()">
                        <span class="back-icon">←</span>
                        Retour
                    </button>
                    <h1 class="imperium-logo" onclick="navigateToHome()">
                        <span class="logo-icon">🏛️</span>
                        IMPERIUM
                    </h1>
                </div>
                
                <div class="header-center">
                    <div class="page-title" id="current-page-title">
                        ${this.getPageTitle()}
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="resources-mini" id="resources-mini">
                        <div class="resource-item">
                            <span class="resource-icon">💰</span>
                            <span class="resource-value">1,890</span>
                        </div>
                    </div>
                    <button class="menu-toggle" onclick="toggleMainMenu()">
                        <span class="menu-icon">☰</span>
                    </button>
                </div>
            </div>
        `;
        
        // Insérer au début du body
        document.body.insertBefore(header, document.body.firstChild);
    }
    
    getPageTitle() {
        const pageTitles = {
            'index': 'Accueil',
            'Cite': 'Ma Cité',
            'Ma Cité Romaine': 'Ma Cité Romaine',
            'Bâtiments': 'Bâtiments',
            'Citoyens': 'Citoyens',
            'Monde': 'Monde',
            'Province': 'Province',
            'Légions': 'Légions',
            'Flotte': 'Flotte',
            'Commerce': 'Commerce',
            'Diplomatie': 'Diplomatie',
            'Messages': 'Messages',
            'Premium': 'Premium'
        };
        
        return pageTitles[this.currentPage] || 'IMPERIUM';
    }
    
    fixNavigationLinks() {
        // Corriger tous les liens de navigation cassés
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Corriger les chemins relatifs
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToPage(href);
                });
            }
        });
    }
    
    addBackButton() {
        // Ajouter un bouton de retour si pas déjà présent
        if (!document.querySelector('.back-btn') && this.currentPage !== 'index') {
            const backBtn = document.createElement('button');
            backBtn.className = 'floating-back-btn';
            backBtn.innerHTML = `
                <span class="back-icon">←</span>
                <span class="back-text">Retour</span>
            `;
            backBtn.onclick = () => this.navigateBack();
            
            document.body.appendChild(backBtn);
        }
    }
    
    fixTutorialSystem() {
        // Corriger le système de tutoriel
        if (window.ImperiumTutorial) {
            this.patchTutorialSystem();
        }
        
        // Ajouter des contrôles de tutoriel
        this.addTutorialControls();
    }
    
    patchTutorialSystem() {
        // Corriger les problèmes du tutoriel
        const originalTutorial = window.ImperiumTutorial.prototype;
        
        // Sauvegarder la méthode originale
        const originalStart = originalTutorial.start;
        
        // Patcher la méthode start
        originalTutorial.start = function() {
            console.log('🎓 Démarrage du tutoriel corrigé');
            
            // Ajouter un bouton de sortie
            this.addExitButton();
            
            // Appeler la méthode originale
            if (originalStart) {
                originalStart.call(this);
            }
        };
        
        // Ajouter une méthode d'exit
        originalTutorial.exit = function() {
            console.log('🚪 Sortie du tutoriel');
            this.isActive = false;
            this.currentStep = 0;
            
            // Supprimer l'overlay
            const overlay = document.querySelector('.tutorial-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Retourner à la page principale
            window.location.href = 'index.html';
        };
        
        // Ajouter le bouton de sortie
        originalTutorial.addExitButton = function() {
            const exitBtn = document.createElement('button');
            exitBtn.className = 'tutorial-exit-btn';
            exitBtn.innerHTML = '✕ Quitter le tutoriel';
            exitBtn.onclick = () => this.exit();
            
            document.body.appendChild(exitBtn);
        };
    }
    
    addTutorialControls() {
        // Ajouter des contrôles de tutoriel si on est dans le tutoriel
        if (this.isTutorialPage()) {
            const controls = document.createElement('div');
            controls.className = 'tutorial-controls';
            controls.innerHTML = `
                <button onclick="skipTutorial()" class="tutorial-btn skip">
                    Passer le tutoriel
                </button>
                <button onclick="restartTutorial()" class="tutorial-btn restart">
                    Recommencer
                </button>
                <button onclick="exitTutorial()" class="tutorial-btn exit">
                    Quitter
                </button>
            `;
            
            document.body.appendChild(controls);
        }
    }
    
    isTutorialPage() {
        return document.querySelector('.tutorial-overlay') || 
               document.querySelector('.tutorial-step') ||
               window.location.search.includes('tutorial=true');
    }
    
    fixPageNavigation() {
        // Corriger la navigation entre les pages
        this.addPageNavigationFixes();
        this.fixMaCiteNavigation();
    }
    
    addPageNavigationFixes() {
        // Intercepter les erreurs de navigation
        window.addEventListener('error', (e) => {
            if (e.message.includes('404') || e.message.includes('not found')) {
                console.warn('🔧 Page non trouvée, redirection vers l\'accueil');
                this.navigateToHome();
            }
        });
        
        // Corriger les liens cassés
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const href = link.getAttribute('href');
                if (href && !this.isValidPage(href)) {
                    e.preventDefault();
                    console.warn(`🔧 Lien cassé détecté: ${href}`);
                    this.showPageNotFoundDialog(href);
                }
            }
        });
    }
    
    fixMaCiteNavigation() {
        // Corriger spécifiquement la navigation de Ma Cité
        if (this.currentPage.includes('Cité') || this.currentPage.includes('cite')) {
            this.addMaCiteNavigationFix();
        }
    }
    
    addMaCiteNavigationFix() {
        // Ajouter une navigation de secours pour Ma Cité
        const maCiteNav = document.createElement('nav');
        maCiteNav.className = 'ma-cite-nav-fix';
        maCiteNav.innerHTML = `
            <div class="nav-fix-content">
                <h3>🏛️ Ma Cité - Navigation</h3>
                <div class="nav-fix-buttons">
                    <button onclick="navigateToMaCite('Ma Cité Romaine.html')">Vue d'ensemble</button>
                    <button onclick="navigateToMaCite('Bâtiments.html')">Bâtiments</button>
                    <button onclick="navigateToMaCite('Citoyens.html')">Citoyens</button>
                    <button onclick="navigateToMaCite('Entrepôts.html')">Entrepôts</button>
                    <button onclick="navigateToHome()">Retour Accueil</button>
                </div>
            </div>
        `;
        
        // Insérer après le header
        const header = document.querySelector('.imperium-header, .imperium-header-2025');
        if (header) {
            header.insertAdjacentElement('afterend', maCiteNav);
        } else {
            document.body.insertBefore(maCiteNav, document.body.firstChild);
        }
    }
    
    fixMobileNavigation() {
        // Corriger la navigation mobile
        if (window.innerWidth <= 768) {
            this.addMobileNavigationFixes();
        }
    }
    
    addMobileNavigationFixes() {
        // Ajouter un menu mobile de secours
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-fix';
        mobileMenu.innerHTML = `
            <button class="mobile-menu-toggle" onclick="toggleMobileMenuFix()">
                <span class="menu-icon">☰</span>
                Menu
            </button>
            <div class="mobile-menu-content" id="mobile-menu-fix">
                <div class="mobile-menu-header">
                    <h3>🏛️ IMPERIUM</h3>
                    <button onclick="closeMobileMenuFix()">✕</button>
                </div>
                <div class="mobile-menu-items">
                    <a href="index.html">🏛️ Accueil</a>
                    <a href="Empire/Cite.html">🏛️ Ma Cité</a>
                    <a href="Empire/Monde.html">🌍 Monde</a>
                    <a href="Militaire/Légions.html">⚔️ Légions</a>
                    <a href="Militaire/Flotte.html">🚢 Flotte</a>
                    <a href="Social/Messages.html">✉️ Messages</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
    }
    
    addNavigationHelpers() {
        // Ajouter des fonctions d'aide à la navigation
        window.navigateBack = () => this.navigateBack();
        window.navigateToHome = () => this.navigateToHome();
        window.navigateToMaCite = (page) => this.navigateToMaCite(page);
        window.skipTutorial = () => this.skipTutorial();
        window.restartTutorial = () => this.restartTutorial();
        window.exitTutorial = () => this.exitTutorial();
        window.toggleMainMenu = () => this.toggleMainMenu();
        window.toggleMobileMenuFix = () => this.toggleMobileMenuFix();
        window.closeMobileMenuFix = () => this.closeMobileMenuFix();
    }
    
    // Méthodes de navigation
    navigateBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            this.navigateToHome();
        }
    }
    
    navigateToHome() {
        window.location.href = this.getHomePath();
    }
    
    getHomePath() {
        const currentPath = window.location.pathname;
        const depth = (currentPath.match(/\//g) || []).length - 1;
        
        if (depth === 0) return 'index.html';
        return '../'.repeat(depth) + 'index.html';
    }
    
    navigateToMaCite(page) {
        const basePath = this.getMaCiteBasePath();
        window.location.href = basePath + page;
    }
    
    getMaCiteBasePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/Empire/Ma Cité/')) {
            return '';
        } else if (currentPath.includes('/Empire/')) {
            return 'Ma Cité/';
        } else {
            return 'Empire/Ma Cité/';
        }
    }
    
    navigateToPage(href) {
        // Navigation sécurisée vers une page
        try {
            window.location.href = href;
        } catch (error) {
            console.error('Erreur de navigation:', error);
            this.showNavigationError(href);
        }
    }
    
    isValidPage(href) {
        // Vérifier si une page existe (basique)
        return !href.includes('undefined') && 
               !href.includes('null') && 
               href.length > 0;
    }
    
    // Méthodes de tutoriel
    skipTutorial() {
        if (window.ImperiumTutorial && window.imperiumTutorial) {
            window.imperiumTutorial.exit();
        } else {
            this.navigateToHome();
        }
    }
    
    restartTutorial() {
        if (window.ImperiumTutorial && window.imperiumTutorial) {
            window.imperiumTutorial.currentStep = 0;
            window.imperiumTutorial.start();
        }
    }
    
    exitTutorial() {
        this.skipTutorial();
    }
    
    // Méthodes d'interface
    toggleMainMenu() {
        const menu = document.querySelector('.imperium-sidebar, .main-menu');
        if (menu) {
            menu.classList.toggle('open');
        }
    }
    
    toggleMobileMenuFix() {
        const menu = document.getElementById('mobile-menu-fix');
        if (menu) {
            menu.classList.toggle('open');
        }
    }
    
    closeMobileMenuFix() {
        const menu = document.getElementById('mobile-menu-fix');
        if (menu) {
            menu.classList.remove('open');
        }
    }
    
    // Méthodes d'affichage d'erreurs
    showPageNotFoundDialog(href) {
        const dialog = document.createElement('div');
        dialog.className = 'error-dialog';
        dialog.innerHTML = `
            <div class="error-content">
                <h3>🚫 Page non trouvée</h3>
                <p>La page "${href}" n'existe pas ou n'est pas accessible.</p>
                <div class="error-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); navigateToHome()">
                        Retour à l'accueil
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">
                        Fermer
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (dialog.parentElement) {
                dialog.remove();
            }
        }, 5000);
    }
    
    showNavigationError(href) {
        console.error(`Erreur de navigation vers: ${href}`);
        this.showPageNotFoundDialog(href);
    }
}

// Styles CSS pour les corrections
const fixStyles = `
    .imperium-header-2025 {
        background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
        color: white;
        padding: 10px 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .header-left {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .back-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: background 0.3s;
    }
    
    .back-btn:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .imperium-logo {
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
    }
    
    .page-title {
        font-size: 18px;
        font-weight: 500;
    }
    
    .resources-mini {
        display: flex;
        gap: 10px;
    }
    
    .resource-item {
        display: flex;
        align-items: center;
        gap: 5px;
        background: rgba(255,255,255,0.2);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 14px;
    }
    
    .menu-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 8px;
    }
    
    .floating-back-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        background: #8B4513;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s;
    }
    
    .floating-back-btn:hover {
        background: #A0522D;
        transform: translateY(-2px);
    }
    
    .tutorial-controls {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1001;
    }
    
    .tutorial-btn {
        background: #8B4513;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.3s;
    }
    
    .tutorial-btn:hover {
        background: #A0522D;
    }
    
    .tutorial-btn.exit {
        background: #dc3545;
    }
    
    .tutorial-btn.exit:hover {
        background: #c82333;
    }
    
    .tutorial-exit-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1002;
        font-weight: bold;
    }
    
    .ma-cite-nav-fix {
        background: #f8f9fa;
        border-bottom: 2px solid #8B4513;
        padding: 15px;
    }
    
    .nav-fix-content h3 {
        margin: 0 0 15px 0;
        color: #8B4513;
    }
    
    .nav-fix-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .nav-fix-buttons button {
        background: #8B4513;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .nav-fix-buttons button:hover {
        background: #A0522D;
    }
    
    .mobile-menu-fix {
        display: none;
    }
    
    .error-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }
    
    .error-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .error-actions {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    
    .error-actions button {
        background: #8B4513;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 10px;
        }
        
        .header-left, .header-right {
            width: 100%;
            justify-content: space-between;
        }
        
        .mobile-menu-fix {
            display: block;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .mobile-menu-toggle {
            background: #8B4513;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .mobile-menu-content {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            min-width: 200px;
            display: none;
        }
        
        .mobile-menu-content.open {
            display: block;
        }
        
        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .mobile-menu-items {
            padding: 10px 0;
        }
        
        .mobile-menu-items a {
            display: block;
            padding: 12px 20px;
            color: #333;
            text-decoration: none;
            transition: background 0.3s;
        }
        
        .mobile-menu-items a:hover {
            background: #f8f9fa;
        }
    }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = fixStyles;
document.head.appendChild(styleSheet);

// Initialisation automatique
let navigationTutorialFix;

function initNavigationTutorialFix() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            navigationTutorialFix = new NavigationTutorialFix();
        });
    } else {
        navigationTutorialFix = new NavigationTutorialFix();
    }
}

// Auto-initialisation
initNavigationTutorialFix();

// Export global
window.NavigationTutorialFix = NavigationTutorialFix;
window.navigationTutorialFix = navigationTutorialFix;

console.log('🔧 Système de correction navigation/tutoriel chargé');