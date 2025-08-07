/**
 * 🧭 IMPERIUM - Système de Navigation pour Tutoriel
 * Gère la navigation guidée pendant le tutoriel
 */

class TutorialNavigationSystem {
    constructor() {
        this.isActive = false;
        this.currentPage = null;
        this.tutorialFlow = this.initTutorialFlow();
        this.navigationOverlay = null;
    }

    initTutorialFlow() {
        return {
            'ma-cite': {
                name: 'Ma Cité Romaine',
                path: 'Navigation/Empire/Ma Cité/Ma Cité Romaine.html',
                tutorialSteps: [
                    'welcome_to_city',
                    'city_stats',
                    'city_map',
                    'quick_actions'
                ],
                nextPage: 'buildings'
            },
            'buildings': {
                name: 'Gestion des Bâtiments',
                path: 'Navigation/Empire/Ma Cité/Bâtiments.html',
                tutorialSteps: [
                    'buildings_overview',
                    'construction_slots',
                    'build_forum',
                    'building_upgrades'
                ],
                nextPage: 'citizens'
            },
            'citizens': {
                name: 'Gestion des Citoyens',
                path: 'Navigation/Empire/Ma Cité/Citoyens.html',
                tutorialSteps: [
                    'population_overview',
                    'happiness_system',
                    'citizen_management'
                ],
                nextPage: 'military'
            },
            'military': {
                name: 'Forces Militaires',
                path: 'Navigation/Empire/Ma Cité/Recruter Soldats.html',
                tutorialSteps: [
                    'military_overview',
                    'unit_types',
                    'recruitment_process'
                ],
                nextPage: 'complete'
            }
        };
    }

    startGuidedTour() {
        this.isActive = true;
        this.currentPage = 'ma-cite';
        this.createNavigationOverlay();
        console.log('🧭 Tour guidé démarré');
    }

    createNavigationOverlay() {
        this.navigationOverlay = document.createElement('div');
        this.navigationOverlay.className = 'tutorial-navigation-overlay';
        this.navigationOverlay.innerHTML = `
            <div class="tutorial-nav-header">
                <div class="tutorial-nav-title">
                    <span class="nav-icon">🎓</span>
                    <span class="nav-text">Tutoriel Guidé</span>
                </div>
                <div class="tutorial-nav-progress">
                    <div class="progress-steps">
                        <div class="step active" data-page="ma-cite">Cité</div>
                        <div class="step" data-page="buildings">Bâtiments</div>
                        <div class="step" data-page="citizens">Citoyens</div>
                        <div class="step" data-page="military">Militaire</div>
                    </div>
                </div>
                <div class="tutorial-nav-controls">
                    <button class="nav-btn" onclick="tutorialNav.previousPage()">← Précédent</button>
                    <button class="nav-btn primary" onclick="tutorialNav.nextPage()">Suivant →</button>
                    <button class="nav-btn secondary" onclick="tutorialNav.exitTutorial()">Quitter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.navigationOverlay);
        this.addNavigationStyles();
        this.updateProgressIndicator();
    }

    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .tutorial-navigation-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1900;
                background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%);
                backdrop-filter: blur(10px);
                border-bottom: 2px solid #FFD700;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                animation: slideDownIn 0.5s ease-out;
            }
            
            .tutorial-nav-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 2rem;
                max-width: 1400px;
                margin: 0 auto;
            }
            
            .tutorial-nav-title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #FFD700;
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .nav-icon {
                font-size: 1.5rem;
                animation: pulse 2s infinite;
            }
            
            .tutorial-nav-progress {
                flex: 1;
                max-width: 400px;
                margin: 0 2rem;
            }
            
            .progress-steps {
                display: flex;
                justify-content: space-between;
                position: relative;
            }
            
            .progress-steps::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                z-index: 1;
            }
            
            .step {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.6);
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                font-size: 0.9rem;
                font-weight: bold;
                position: relative;
                z-index: 2;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .step.active {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #8B4513;
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            }
            
            .step.completed {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
            }
            
            .tutorial-nav-controls {
                display: flex;
                gap: 1rem;
            }
            
            .nav-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 0.5rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }
            
            .nav-btn.primary {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #8B4513;
            }
            
            .nav-btn.primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
            }
            
            .nav-btn:not(.primary) {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .nav-btn:not(.primary):hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-1px);
            }
            
            .nav-btn.secondary {
                background: rgba(220, 38, 38, 0.2);
                border-color: rgba(220, 38, 38, 0.5);
                color: #fca5a5;
            }
            
            .nav-btn.secondary:hover {
                background: rgba(220, 38, 38, 0.3);
            }
            
            @keyframes slideDownIn {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .tutorial-nav-header {
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                }
                
                .tutorial-nav-progress {
                    margin: 0;
                    width: 100%;
                }
                
                .progress-steps {
                    justify-content: space-around;
                }
                
                .step {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
                
                .tutorial-nav-controls {
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .nav-btn {
                    padding: 0.6rem 1.2rem;
                    font-size: 0.8rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.step');
        const currentPageData = this.tutorialFlow[this.currentPage];
        
        steps.forEach(step => {
            const stepPage = step.getAttribute('data-page');
            step.classList.remove('active', 'completed');
            
            if (stepPage === this.currentPage) {
                step.classList.add('active');
            } else if (this.isPageCompleted(stepPage)) {
                step.classList.add('completed');
            }
        });
    }

    isPageCompleted(pageName) {
        // Vérifier si une page a été complétée
        const completedPages = JSON.parse(localStorage.getItem('tutorial_completed_pages') || '[]');
        return completedPages.includes(pageName);
    }

    markPageCompleted(pageName) {
        const completedPages = JSON.parse(localStorage.getItem('tutorial_completed_pages') || '[]');
        if (!completedPages.includes(pageName)) {
            completedPages.push(pageName);
            localStorage.setItem('tutorial_completed_pages', JSON.stringify(completedPages));
        }
    }

    nextPage() {
        const currentPageData = this.tutorialFlow[this.currentPage];
        if (!currentPageData) return;
        
        // Marquer la page actuelle comme complétée
        this.markPageCompleted(this.currentPage);
        
        if (currentPageData.nextPage === 'complete') {
            this.completeTutorial();
            return;
        }
        
        // Naviguer vers la page suivante
        this.navigateToPage(currentPageData.nextPage);
    }

    previousPage() {
        const pages = Object.keys(this.tutorialFlow);
        const currentIndex = pages.indexOf(this.currentPage);
        
        if (currentIndex > 0) {
            const previousPageKey = pages[currentIndex - 1];
            this.navigateToPage(previousPageKey);
        }
    }

    navigateToPage(pageKey) {
        const pageData = this.tutorialFlow[pageKey];
        if (!pageData) return;
        
        console.log(`🧭 Navigation vers: ${pageData.name}`);
        
        // Mettre à jour la page actuelle
        this.currentPage = pageKey;
        this.updateProgressIndicator();
        
        // Naviguer vers la page
        const correctedPath = window.fixEmpirePath ? window.fixEmpirePath(pageData.path) : pageData.path;
        window.location.href = `${correctedPath}?tutorial=true&page=${pageKey}`;
    }

    jumpToPage(pageKey) {
        if (this.tutorialFlow[pageKey]) {
            this.navigateToPage(pageKey);
        }
    }

    completeTutorial() {
        console.log('🎉 Tutoriel guidé terminé !');
        
        // Marquer le tutoriel comme complété
        localStorage.setItem('imperium_guided_tutorial_completed', 'true');
        
        // Afficher un message de félicitations
        if (window.dialogueSystem) {
            window.dialogueSystem.showDialogue({
                title: 'Tutoriel Terminé !',
                content: `
                    <div class="tutorial-completion">
                        <h3>🎉 Félicitations, Gouverneur !</h3>
                        <p>Vous avez terminé le tutoriel guidé d'IMPERIUM ! 
                        Vous maîtrisez maintenant les bases de l'administration romaine.</p>
                        
                        <div class="completion-rewards">
                            <h4>🏆 Récompenses :</h4>
                            <ul>
                                <li>+500 XP</li>
                                <li>+200 Or</li>
                                <li>+100 de chaque ressource</li>
                                <li>Titre : "Maître Administrateur"</li>
                            </ul>
                        </div>
                        
                        <p><strong>Votre empire vous attend !</strong> 
                        Continuez à développer votre cité et étendez votre influence à travers la Méditerranée.</p>
                    </div>
                `,
                buttons: [
                    {
                        text: 'Commencer à gouverner !',
                        action: () => {
                            this.exitTutorial();
                            this.giveCompletionRewards();
                        }
                    }
                ]
            });
        } else {
            this.exitTutorial();
            this.giveCompletionRewards();
        }
    }

    giveCompletionRewards() {
        // Donner les récompenses de fin de tutoriel
        if (window.gameState) {
            window.gameState.player.xp = (window.gameState.player.xp || 0) + 500;
            window.gameState.resources.gold = (window.gameState.resources.gold || 0) + 200;
            window.gameState.resources.wood = (window.gameState.resources.wood || 0) + 100;
            window.gameState.resources.stone = (window.gameState.resources.stone || 0) + 100;
            window.gameState.resources.iron = (window.gameState.resources.iron || 0) + 100;
            window.gameState.resources.wine = (window.gameState.resources.wine || 0) + 100;
            window.gameState.resources.knowledge = (window.gameState.resources.knowledge || 0) + 100;
            
            // Sauvegarder l'état
            if (window.saveGame) {
                window.saveGame();
            }
        }
        
        console.log('🎁 Récompenses de tutoriel accordées');
    }

    exitTutorial() {
        if (confirm('Êtes-vous sûr de vouloir quitter le tutoriel guidé ?')) {
            this.isActive = false;
            
            // Supprimer l'overlay
            if (this.navigationOverlay) {
                this.navigationOverlay.style.opacity = '0';
                setTimeout(() => {
                    if (this.navigationOverlay && this.navigationOverlay.parentNode) {
                        this.navigationOverlay.parentNode.removeChild(this.navigationOverlay);
                    }
                    this.navigationOverlay = null;
                }, 300);
            }
            
            // Nettoyer les données temporaires
            localStorage.removeItem('tutorial_completed_pages');
            
            console.log('🚪 Tutoriel guidé quitté');
        }
    }

    // Méthode pour reprendre le tutoriel à partir d'une page spécifique
    resumeFromPage(pageKey) {
        if (this.tutorialFlow[pageKey]) {
            this.isActive = true;
            this.currentPage = pageKey;
            this.createNavigationOverlay();
            console.log(`🔄 Tutoriel repris depuis: ${this.tutorialFlow[pageKey].name}`);
        }
    }

    // Vérifier si le tutoriel guidé est actif
    isGuidedTutorialActive() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('tutorial') === 'true' || this.isActive;
    }

    // Initialiser le tutoriel sur une page spécifique
    initializeOnPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const tutorialActive = urlParams.get('tutorial') === 'true';
        const pageKey = urlParams.get('page');
        
        if (tutorialActive && pageKey && this.tutorialFlow[pageKey]) {
            this.isActive = true;
            this.currentPage = pageKey;
            this.createNavigationOverlay();
            
            // Démarrer le tutoriel interactif pour cette page
            setTimeout(() => {
                if (window.interactiveTutorial) {
                    window.interactiveTutorial.startFromPage(pageKey);
                }
            }, 1000);
        }
    }
}

// Initialisation globale
window.tutorialNav = new TutorialNavigationSystem();

// Auto-initialisation sur chaque page
document.addEventListener('DOMContentLoaded', () => {
    if (window.tutorialNav) {
        window.tutorialNav.initializeOnPage();
    }
});

console.log('🧭 Système de navigation tutoriel initialisé');