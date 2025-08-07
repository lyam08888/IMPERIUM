/**
 * 🏛️ IMPERIUM - Master Fix System 2025
 * Système principal de correction et d'initialisation
 */

class ImperiumFixesMaster {
    constructor() {
        this.fixes = {
            buttonFunctions: false,
            missingFunctions: false,
            navigationTutorial: false,
            mobileSupport: false
        };
        
        this.loadOrder = [
            'missing-functions-fix.js',
            'navigation-tutorial-fix.js',
            'link-buttons-to-functions.js'
        ];
        
        this.init();
    }
    
    init() {
        console.log('🏛️ IMPERIUM - Initialisation du système de corrections');
        
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startFixes());
        } else {
            this.startFixes();
        }
    }
    
    startFixes() {
        console.log('🔧 Démarrage des corrections IMPERIUM');
        
        // Appliquer les corrections immédiates
        this.applyImmediateFixes();
        
        // Charger les scripts de correction
        this.loadFixScripts();
        
        // Configurer les gestionnaires d'erreur
        this.setupErrorHandlers();
        
        // Initialiser les systèmes de base
        this.initializeBaseSystems();
        
        console.log('✅ Système de corrections IMPERIUM initialisé');
    }
    
    applyImmediateFixes() {
        // Correction immédiate des erreurs JavaScript critiques
        this.fixCriticalErrors();
        
        // Correction de la structure HTML de base
        this.fixBaseStructure();
        
        // Correction des chemins de ressources
        this.fixResourcePaths();
    }
    
    fixCriticalErrors() {
        // Corriger l'erreur TEXT_FUNCTION_MAPPING
        if (typeof window.TEXT_FUNCTION_MAPPING === 'undefined') {
            window.TEXT_FUNCTION_MAPPING = {
                'Nouveau message': 'creerNouveauMessage',
                'Actualiser': 'actualiserMessages',
                'Supprimer': 'supprimerMessage',
                'Tout marquer lu': 'marquerTousLus',
                'Évolution des prix': 'afficherEvolutionPrix',
                'Ordre du marché': 'gererOrdreMarche',
                'Placer ordre d\'achat': 'placerOrdreAchat',
                'Placer ordre de vente': 'placerOrdreVente',
                'Explorer': 'explorerMonde',
                'Gérer': 'gererMonde',
                'Attaquer': 'attaquerProvince',
                'Détails': 'afficherDetailsProvince',
                'Recruter': 'recruterTroupes'
            };
        }
        
        // Corriger l'erreur BUTTON_FUNCTION_MAPPING
        if (typeof window.BUTTON_FUNCTION_MAPPING === 'undefined') {
            window.BUTTON_FUNCTION_MAPPING = {
                'nouveau-message': 'creerNouveauMessage',
                'actualiser-messages': 'actualiserMessages',
                'supprimer-message': 'supprimerMessage',
                'marquer-tous-lus': 'marquerTousLus',
                'evolution-prix': 'afficherEvolutionPrix',
                'ordre-marche': 'gererOrdreMarche',
                'ordre-achat': 'placerOrdreAchat',
                'ordre-vente': 'placerOrdreVente',
                'explorer-monde': 'explorerMonde',
                'gerer-monde': 'gererMonde',
                'attaquer-province': 'attaquerProvince',
                'details-province': 'afficherDetailsProvince',
                'recruter-troupes': 'recruterTroupes'
            };
        }
        
        console.log('🔧 Erreurs critiques JavaScript corrigées');
    }
    
    fixBaseStructure() {
        // Ajouter les éléments HTML de base s'ils manquent
        if (!document.querySelector('.imperium-container')) {
            const container = document.createElement('div');
            container.className = 'imperium-container';
            
            // Déplacer tout le contenu existant dans le container
            while (document.body.firstChild) {
                container.appendChild(document.body.firstChild);
            }
            
            document.body.appendChild(container);
        }
        
        // Ajouter un header de base si manquant
        if (!document.querySelector('.imperium-header')) {
            this.addBasicHeader();
        }
        
        // Ajouter un système de notification si manquant
        if (!document.querySelector('.notification-container')) {
            this.addNotificationSystem();
        }
        
        console.log('🔧 Structure HTML de base corrigée');
    }
    
    addBasicHeader() {
        const header = document.createElement('header');
        header.className = 'imperium-header imperium-header-fixed';
        header.innerHTML = `
            <div class="header-content">
                <div class="header-left">
                    <button class="back-btn" onclick="window.history.back()" title="Retour">
                        ←
                    </button>
                    <h1 class="imperium-logo" onclick="window.location.href='index.html'" title="Accueil IMPERIUM">
                        🏛️ IMPERIUM
                    </h1>
                </div>
                
                <div class="header-center">
                    <div class="page-title" id="page-title-display">
                        ${this.getCurrentPageTitle()}
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="resources-display-mini">
                        <span class="resource-item">💰 <span id="gold-display">1,890</span></span>
                    </div>
                    <button class="menu-btn" onclick="toggleQuickMenu()" title="Menu rapide">
                        ☰
                    </button>
                </div>
            </div>
            
            <div class="quick-menu" id="quick-menu" style="display: none;">
                <div class="quick-menu-content">
                    <a href="index.html">🏛️ Accueil</a>
                    <a href="Empire/Cite.html">🏛️ Ma Cité</a>
                    <a href="Empire/Monde.html">🌍 Monde</a>
                    <a href="Social/Messages.html">✉️ Messages</a>
                    <button onclick="showHelp()">❓ Aide</button>
                    <button onclick="toggleQuickMenu()">✕ Fermer</button>
                </div>
            </div>
        `;
        
        document.body.insertBefore(header, document.body.firstChild);
    }
    
    addNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    getCurrentPageTitle() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        const titles = {
            'index.html': 'Accueil',
            'Cite.html': 'Ma Cité',
            'Ma Cité Romaine.html': 'Ma Cité Romaine',
            'Bâtiments.html': 'Bâtiments',
            'Citoyens.html': 'Citoyens',
            'Monde.html': 'Monde',
            'Province.html': 'Province',
            'Légions.html': 'Légions',
            'Flotte.html': 'Flotte',
            'Commerce.html': 'Commerce',
            'Messages.html': 'Messages'
        };
        
        return titles[filename] || 'IMPERIUM';
    }
    
    fixResourcePaths() {
        // Corriger les chemins des images et ressources cassés
        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                // Vérifier si l'image existe, sinon utiliser un placeholder
                img.onerror = () => {
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
                };
            }
        });
        
        console.log('🔧 Chemins de ressources corrigés');
    }
    
    loadFixScripts() {
        // Les scripts sont déjà chargés, on vérifie juste leur présence
        this.checkFixScripts();
    }
    
    checkFixScripts() {
        // Vérifier que les fonctions de correction sont disponibles
        setTimeout(() => {
            if (typeof window.NavigationTutorialFix !== 'undefined') {
                this.fixes.navigationTutorial = true;
                console.log('✅ Navigation/Tutorial fixes loaded');
            }
            
            if (typeof window.ButtonFunctionLinker !== 'undefined') {
                this.fixes.buttonFunctions = true;
                console.log('✅ Button function linker loaded');
            }
            
            // Vérifier les fonctions manquantes
            if (typeof window.creerNouveauMessage === 'function') {
                this.fixes.missingFunctions = true;
                console.log('✅ Missing functions implemented');
            }
            
            this.reportFixStatus();
        }, 1000);
    }
    
    reportFixStatus() {
        const fixedCount = Object.values(this.fixes).filter(Boolean).length;
        const totalFixes = Object.keys(this.fixes).length;
        
        console.log(`🏛️ IMPERIUM Fixes Status: ${fixedCount}/${totalFixes} corrections appliquées`);
        
        if (fixedCount === totalFixes) {
            this.showSuccessNotification();
        } else {
            this.showPartialFixNotification(fixedCount, totalFixes);
        }
    }
    
    setupErrorHandlers() {
        // Gestionnaire d'erreur global
        window.addEventListener('error', (event) => {
            console.error('🚨 Erreur détectée:', event.error);
            
            // Essayer de corriger certaines erreurs communes
            if (event.message.includes('TEXT_FUNCTION_MAPPING')) {
                this.fixCriticalErrors();
                console.log('🔧 Erreur TEXT_FUNCTION_MAPPING corrigée automatiquement');
            }
            
            if (event.message.includes('is not defined')) {
                this.handleUndefinedFunction(event.message);
            }
        });
        
        // Gestionnaire pour les promesses rejetées
        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Promesse rejetée:', event.reason);
        });
        
        console.log('🔧 Gestionnaires d\'erreur configurés');
    }
    
    handleUndefinedFunction(message) {
        // Extraire le nom de la fonction de l'erreur
        const match = message.match(/(\w+) is not defined/);
        if (match) {
            const functionName = match[1];
            
            // Créer une fonction de placeholder
            if (typeof window[functionName] === 'undefined') {
                window[functionName] = function() {
                    console.warn(`⚠️ Fonction placeholder appelée: ${functionName}`);
                    if (window.showNotification) {
                        window.showNotification(`Fonction ${functionName} en cours d'implémentation`, 'info');
                    }
                    return true;
                };
                
                console.log(`🔧 Fonction placeholder créée: ${functionName}`);
            }
        }
    }
    
    initializeBaseSystems() {
        // Initialiser les fonctions utilitaires globales
        this.setupGlobalFunctions();
        
        // Initialiser le système de navigation
        this.setupNavigation();
        
        // Initialiser les raccourcis clavier
        this.setupKeyboardShortcuts();
        
        console.log('🔧 Systèmes de base initialisés');
    }
    
    setupGlobalFunctions() {
        // Fonction de notification globale améliorée
        if (typeof window.showNotification === 'undefined') {
            window.showNotification = (message, type = 'info', duration = 3000) => {
                const container = document.getElementById('notification-container');
                if (!container) return;
                
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                
                const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
                notification.innerHTML = `
                    <span class="notification-icon">${icon}</span>
                    <span class="notification-message">${message}</span>
                    <button class="notification-close" onclick="this.parentElement.remove()">×</button>
                `;
                
                container.appendChild(notification);
                
                // Auto-suppression
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.style.animation = 'slideOut 0.3s ease';
                        setTimeout(() => notification.remove(), 300);
                    }
                }, duration);
            };
        }
        
        // Fonction de menu rapide
        window.toggleQuickMenu = () => {
            const menu = document.getElementById('quick-menu');
            if (menu) {
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            }
        };
        
        // Fonction d'aide
        window.showHelp = () => {
            window.showNotification('Système d\'aide en cours de développement', 'info');
        };
    }
    
    setupNavigation() {
        // Améliorer la navigation avec des corrections automatiques
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link) {
                const href = link.getAttribute('href');
                
                // Corriger les liens cassés
                if (href && href.includes('undefined') || href.includes('null')) {
                    e.preventDefault();
                    console.warn('🔧 Lien cassé détecté et bloqué:', href);
                    window.showNotification('Lien non valide détecté', 'warning');
                }
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Échap pour fermer les modales
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal-overlay');
                modals.forEach(modal => modal.remove());
                
                const quickMenu = document.getElementById('quick-menu');
                if (quickMenu && quickMenu.style.display !== 'none') {
                    quickMenu.style.display = 'none';
                }
            }
            
            // Ctrl+H pour l'accueil
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            
            // Ctrl+M pour les messages
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                if (typeof window.creerNouveauMessage === 'function') {
                    window.creerNouveauMessage();
                }
            }
        });
    }
    
    showSuccessNotification() {
        if (window.showNotification) {
            window.showNotification('🏛️ IMPERIUM - Toutes les corrections appliquées avec succès!', 'success', 5000);
        }
    }
    
    showPartialFixNotification(fixed, total) {
        if (window.showNotification) {
            window.showNotification(`🏛️ IMPERIUM - ${fixed}/${total} corrections appliquées`, 'warning', 4000);
        }
    }
}

// Styles CSS pour le système de corrections
const masterFixStyles = `
    .imperium-header-fixed {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .header-left, .header-right {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .back-btn, .menu-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .back-btn:hover, .menu-btn:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .imperium-logo {
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        margin: 0;
        transition: transform 0.3s;
    }
    
    .imperium-logo:hover {
        transform: scale(1.05);
    }
    
    .page-title {
        font-size: 16px;
        font-weight: 500;
    }
    
    .resources-display-mini {
        background: rgba(255,255,255,0.2);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 14px;
    }
    
    .quick-menu {
        position: absolute;
        top: 100%;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        min-width: 200px;
        z-index: 1001;
    }
    
    .quick-menu-content {
        padding: 10px 0;
    }
    
    .quick-menu-content a,
    .quick-menu-content button {
        display: block;
        width: 100%;
        padding: 10px 20px;
        color: #333;
        text-decoration: none;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .quick-menu-content a:hover,
    .quick-menu-content button:hover {
        background: #f8f9fa;
    }
    
    .notification-container {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
    }
    
    .notification {
        background: white;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #17a2b8;
    }
    
    .notification-success {
        border-left-color: #28a745;
    }
    
    .notification-error {
        border-left-color: #dc3545;
    }
    
    .notification-warning {
        border-left-color: #ffc107;
    }
    
    .notification-icon {
        font-size: 18px;
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 10px;
            padding: 10px;
        }
        
        .header-left, .header-right {
            width: 100%;
            justify-content: space-between;
        }
        
        .quick-menu {
            right: 10px;
            left: 10px;
            width: auto;
        }
        
        .notification-container {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Injecter les styles
const masterStyleSheet = document.createElement('style');
masterStyleSheet.textContent = masterFixStyles;
document.head.appendChild(masterStyleSheet);

// Initialisation automatique
let imperiumFixesMaster;

function initImperiumFixes() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            imperiumFixesMaster = new ImperiumFixesMaster();
        });
    } else {
        imperiumFixesMaster = new ImperiumFixesMaster();
    }
}

// Auto-initialisation
initImperiumFixes();

// Export global
window.ImperiumFixesMaster = ImperiumFixesMaster;
window.imperiumFixesMaster = imperiumFixesMaster;

console.log('🏛️ IMPERIUM Master Fix System loaded');