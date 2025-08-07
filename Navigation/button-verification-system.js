/**
 * 🏛️ IMPERIUM - Système de Vérification des Boutons
 * Vérifie que tous les boutons ont des fonctions et les lie automatiquement
 */

class ImperiumButtonVerification {
    constructor() {
        this.buttonMappings = new Map();
        this.missingFunctions = [];
        this.connectedButtons = 0;
        this.init();
    }

    init() {
        this.setupButtonMappings();
        this.verifyAllButtons();
        this.setupMutationObserver();
        console.log('🔍 Système de vérification des boutons initialisé');
    }

    setupButtonMappings() {
        // Mapping des boutons vers leurs fonctions
        this.buttonMappings.set('start-game-btn', () => this.startGame());
        this.buttonMappings.set('save-btn', () => manualSaveSystem.showSaveMenu());
        this.buttonMappings.set('load-btn', () => manualSaveSystem.showLoadMenu());
        this.buttonMappings.set('tutorial-btn', () => tutorial.restartTutorial());
        this.buttonMappings.set('objectives-btn', () => progression.showCurrentObjectives());
        this.buttonMappings.set('modal-cancel-btn', () => fermerModal());

        // Boutons de navigation
        this.setupNavigationMappings();
        
        // Boutons de construction
        this.setupBuildingMappings();
        
        // Boutons de vues
        this.setupViewMappings();
        
        // Boutons dynamiques
        this.setupDynamicMappings();
    }

    setupNavigationMappings() {
        const navItems = [
            'city', 'world', 'island', 'research', 'military', 
            'navy', 'battle', 'trade', 'diplomacy', 'alliance', 'messages'
        ];

        navItems.forEach(view => {
            this.buttonMappings.set(`nav-${view}`, () => switchView(view));
        });
    }

    setupBuildingMappings() {
        // Boutons de construction génériques
        this.buttonMappings.set('build-forum', () => this.buildBuilding('forum'));
        this.buttonMappings.set('build-warehouse', () => this.buildBuilding('warehouse'));
        this.buttonMappings.set('build-barracks', () => this.buildBuilding('barracks'));
        this.buttonMappings.set('build-academy', () => this.buildBuilding('academy'));
        this.buttonMappings.set('build-market', () => this.buildBuilding('market'));
        
        // Boutons d'amélioration - vérifier que BUILDINGS_CONFIG existe
        if (typeof BUILDINGS_CONFIG !== 'undefined' && BUILDINGS_CONFIG) {
            Object.keys(BUILDINGS_CONFIG).forEach(buildingType => {
                this.buttonMappings.set(`upgrade-${buildingType}`, () => buildingSystem.upgradeBuilding(buildingType));
                this.buttonMappings.set(`info-${buildingType}`, () => buildingSystem.showBuildingInfo(buildingType));
            });
        } else {
            console.warn('BUILDINGS_CONFIG not defined, skipping building mappings');
        }
    }

    setupViewMappings() {
        // Boutons spécifiques aux vues
        const viewActions = {
            // Vue Monde
            'explore-region': () => completeViews.exploreNewRegion(),
            'send-expedition': () => completeViews.sendExpedition(),
            
            // Vue Province
            'collect-taxes': () => completeViews.collectTaxes(),
            'organize-games': () => completeViews.organizeGames(),
            'build-roads': () => completeViews.buildRoads(),
            'recruit-legion': () => completeViews.recruitLegion(),
            
            // Vue Recherche
            'research-tech': (techId, cost) => completeViews.researchTechnology(techId, cost),
            
            // Vue Navale
            'build-bireme': () => completeViews.buildShip('bireme'),
            'build-trireme': () => completeViews.buildShip('trireme'),
            'send-trade-mission': () => completeViews.sendTradeMission(),
            'send-exploration-mission': () => completeViews.sendExplorationMission(),
            
            // Vue Bataille
            'start-battle': () => completeViews.startBattle(),
            'simulate-battle': () => completeViews.simulateBattle(),
            
            // Vue Commerce
            'buy-resources': () => completeViews.buyResources(),
            'sell-resources': () => completeViews.sellResources(),
            'send-caravan': () => completeViews.sendCaravan(),
            'establish-trade-route': () => completeViews.establishTradeRoute(),
            
            // Vue Diplomatie
            'send-ambassador': () => completeViews.sendAmbassador(),
            'propose-alliance': () => completeViews.proposeAlliance(),
            'declare-tribute': () => completeViews.declareTribute(),
            
            // Vue Alliance
            'create-alliance': () => completeViews.createAlliance(),
            'join-alliance': () => completeViews.joinAlliance(),
            'send-support': () => completeViews.sendSupport(),
            
            // Vue Messages
            'compose-message': () => completeViews.composeMessage(),
            'mark-all-read': () => completeViews.markAllRead(),
            'filter-messages': (category) => completeViews.filterMessages(category)
        };

        Object.entries(viewActions).forEach(([key, func]) => {
            this.buttonMappings.set(key, func);
        });
    }

    setupDynamicMappings() {
        // Boutons qui peuvent être créés dynamiquement
        this.buttonMappings.set('recruit-confirm-btn', () => this.confirmRecruitment());
        this.buttonMappings.set('upgrade-confirm-btn', () => this.confirmUpgrade());
        this.buttonMappings.set('trade-confirm-btn', () => this.confirmTrade());
    }

    verifyAllButtons() {
        const allButtons = document.querySelectorAll('button, [role="button"], .btn, .action-btn, .footer-btn');
        let connectedCount = 0;
        let missingCount = 0;

        allButtons.forEach(button => {
            const isConnected = this.verifyButton(button);
            if (isConnected) {
                connectedCount++;
            } else {
                missingCount++;
            }
        });

        this.connectedButtons = connectedCount;
        
        console.log(`🔍 Vérification des boutons terminée:`);
        console.log(`✅ Boutons connectés: ${connectedCount}`);
        console.log(`❌ Boutons manquants: ${missingCount}`);
        
        if (this.missingFunctions.length > 0) {
            console.warn('⚠️ Fonctions manquantes:', this.missingFunctions);
        }
    }

    verifyButton(button) {
        // Vérifier si le bouton a déjà un onclick
        if (button.onclick || button.getAttribute('onclick')) {
            return true;
        }

        // Vérifier si le bouton a un event listener
        if (this.hasEventListener(button)) {
            return true;
        }

        // Essayer de trouver une fonction basée sur l'ID
        const buttonId = button.id;
        if (buttonId && this.buttonMappings.has(buttonId)) {
            this.connectButton(button, this.buttonMappings.get(buttonId));
            return true;
        }

        // Essayer de trouver une fonction basée sur les classes
        const buttonClasses = Array.from(button.classList);
        for (const className of buttonClasses) {
            if (this.buttonMappings.has(className)) {
                this.connectButton(button, this.buttonMappings.get(className));
                return true;
            }
        }

        // Essayer de trouver une fonction basée sur le texte
        const buttonText = button.textContent.trim().toLowerCase();
        const textMapping = this.getTextMapping(buttonText);
        if (textMapping) {
            this.connectButton(button, textMapping);
            return true;
        }

        // Essayer de trouver une fonction basée sur les attributs data
        const dataAction = button.getAttribute('data-action');
        if (dataAction && this.buttonMappings.has(dataAction)) {
            this.connectButton(button, this.buttonMappings.get(dataAction));
            return true;
        }

        // Bouton non connecté
        this.missingFunctions.push({
            id: buttonId,
            text: button.textContent.trim(),
            classes: buttonClasses,
            element: button
        });

        // Créer une fonction par défaut
        this.createDefaultFunction(button);
        return false;
    }

    hasEventListener(element) {
        // Méthode approximative pour détecter les event listeners
        return element._listeners || 
               element.hasAttribute('data-has-listener') ||
               element.classList.contains('has-listener');
    }

    getTextMapping(text) {
        const textMappings = {
            'sauvegarder': () => manualSaveSystem.showSaveMenu(),
            'charger': () => manualSaveSystem.showLoadMenu(),
            'tutoriel': () => tutorial.restartTutorial(),
            'objectifs': () => progression.showCurrentObjectives(),
            'fermer': () => fermerModal(),
            'annuler': () => fermerModal(),
            'confirmer': () => this.confirmAction(),
            'construire': () => this.showBuildingMenu(),
            'améliorer': () => this.showUpgradeMenu(),
            'recruter': () => this.showRecruitmentMenu(),
            'rechercher': () => this.showResearchMenu(),
            'explorer': () => completeViews.exploreNewRegion(),
            'commercer': () => completeViews.buyResources(),
            'négocier': () => completeViews.sendAmbassador(),
            'attaquer': () => completeViews.startBattle()
        };

        return textMappings[text] || null;
    }

    connectButton(button, func) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                func();
                this.showButtonFeedback(button);
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la fonction du bouton:', error);
                showNotification('Erreur lors de l\'action', 'error');
            }
        });

        button.setAttribute('data-has-listener', 'true');
        button.classList.add('has-listener');
    }

    createDefaultFunction(button) {
        const defaultAction = () => {
            const buttonText = button.textContent.trim();
            showNotification(`Action "${buttonText}" en développement !`, 'info');
            console.log(`🔧 Action par défaut pour: ${buttonText}`);
        };

        this.connectButton(button, defaultAction);
    }

    showButtonFeedback(button) {
        // Effet visuel de clic
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Ajouter une classe temporaire
        button.classList.add('button-clicked');
        setTimeout(() => {
            button.classList.remove('button-clicked');
        }, 300);
    }

    setupMutationObserver() {
        // Observer les changements dans le DOM pour les nouveaux boutons
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newButtons = node.querySelectorAll ? 
                            node.querySelectorAll('button, [role="button"], .btn, .action-btn') : 
                            [];
                        
                        newButtons.forEach(button => {
                            if (!button.hasAttribute('data-has-listener')) {
                                this.verifyButton(button);
                            }
                        });

                        // Vérifier si le nœud lui-même est un bouton
                        if (node.tagName === 'BUTTON' || node.classList.contains('btn') || node.classList.contains('action-btn')) {
                            if (!node.hasAttribute('data-has-listener')) {
                                this.verifyButton(node);
                            }
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Fonctions par défaut pour les actions communes
    startGame() {
        console.log('🎮 Démarrage du jeu avec cinématique et tutoriel...');
        
        // Démarrer la cinématique d'introduction
        if (window.cinematicSystem) {
            window.cinematicSystem.startIntroductionCinematic();
        } else {
            // Fallback : démarrer directement le tutoriel
            if (window.interactiveTutorial && !window.interactiveTutorial.isCompleted()) {
                window.interactiveTutorial.start();
            }
            // Naviguer vers Ma Cité
            window.location.href = 'Navigation/Empire/Ma Cité/Ma Cité Romaine.html';
        }
    }

    confirmAction() {
        showNotification('Action confirmée !', 'success');
        fermerModal();
    }

    showBuildingMenu() {
        if (typeof buildingSystem !== 'undefined') {
            buildingSystem.showBuildingMenu(0);
        } else {
            showNotification('Système de construction non disponible', 'warning');
        }
    }

    showUpgradeMenu() {
        showNotification('Menu d\'amélioration ouvert !', 'info');
    }

    showRecruitmentMenu() {
        showNotification('Menu de recrutement ouvert !', 'info');
    }

    showResearchMenu() {
        if (typeof completeViews !== 'undefined') {
            completeViews.switchResearchCategory('military');
        } else {
            showNotification('Système de recherche non disponible', 'warning');
        }
    }

    confirmRecruitment() {
        showNotification('Recrutement confirmé !', 'success');
        fermerModal();
    }

    confirmUpgrade() {
        showNotification('Amélioration confirmée !', 'success');
        fermerModal();
    }

    confirmTrade() {
        showNotification('Échange confirmé !', 'success');
        fermerModal();
    }

    // Méthode pour forcer la vérification de tous les boutons
    recheckAllButtons() {
        this.missingFunctions = [];
        this.verifyAllButtons();
        showNotification(`Vérification terminée: ${this.connectedButtons} boutons connectés`, 'info');
    }

    // Méthode pour obtenir un rapport détaillé
    getButtonReport() {
        const report = {
            totalButtons: document.querySelectorAll('button, [role="button"], .btn, .action-btn').length,
            connectedButtons: this.connectedButtons,
            missingFunctions: this.missingFunctions.length,
            mappings: this.buttonMappings.size
        };

        console.table(report);
        return report;
    }

    // Méthode pour ajouter manuellement un mapping
    addButtonMapping(selector, func) {
        this.buttonMappings.set(selector, func);
        
        // Appliquer immédiatement aux boutons existants
        const buttons = document.querySelectorAll(`#${selector}, .${selector}, [data-action="${selector}"]`);
        buttons.forEach(button => {
            if (!button.hasAttribute('data-has-listener')) {
                this.connectButton(button, func);
            }
        });
    }
}

// Styles CSS pour les effets de boutons
const buttonVerificationStyles = `
    .button-clicked {
        animation: buttonClick 0.3s ease;
    }
    
    @keyframes buttonClick {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    .has-listener {
        position: relative;
    }
    
    .has-listener::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 6px;
        height: 6px;
        background: #22c55e;
        border-radius: 50%;
        opacity: 0.7;
        pointer-events: none;
    }
    
    /* Masquer l'indicateur sur les boutons principaux */
    .footer-btn.has-listener::after,
    .modal-btn.has-listener::after {
        display: none;
    }
`;

// Fonction d'initialisation qui attend que le DOM et BUILDINGS_CONFIG soient prêts
function initializeButtonVerification() {
    // Vérifier si BUILDINGS_CONFIG est disponible
    if (typeof BUILDINGS_CONFIG === 'undefined') {
        // Réessayer dans 100ms
        setTimeout(initializeButtonVerification, 100);
        return;
    }

    // Injecter les styles
    const buttonVerificationStyleSheet = document.createElement('style');
    buttonVerificationStyleSheet.textContent = buttonVerificationStyles;
    document.head.appendChild(buttonVerificationStyleSheet);

    // Créer l'instance globale
    const buttonVerification = new ImperiumButtonVerification();

    // Export global
    window.buttonVerification = buttonVerification;
    window.ImperiumButtonVerification = ImperiumButtonVerification;

    // Commande de console pour vérifier les boutons
    window.checkButtons = () => buttonVerification.recheckAllButtons();
    window.buttonReport = () => buttonVerification.getButtonReport();
}

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeButtonVerification);
} else {
    // Le DOM est déjà prêt
    initializeButtonVerification();
}

console.log('🔍 Système de vérification des boutons chargé');
console.log('💡 Utilisez checkButtons() ou buttonReport() dans la console pour diagnostiquer');