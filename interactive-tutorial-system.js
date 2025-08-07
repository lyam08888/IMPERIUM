/**
 * 🎓 IMPERIUM - Système de Tutoriel Interactif avec Overlay
 * Tutoriel avec bulles d'aide qui apparaissent sur chaque élément
 */

class InteractiveTutorialSystem {
    constructor() {
        this.isActive = false;
        this.currentStep = 0;
        this.tutorialSteps = this.initTutorialSteps();
        this.overlay = null;
        this.tooltip = null;
        this.highlightedElement = null;
        this.completedSteps = new Set();
    }

    initTutorialSteps() {
        return [
            {
                id: 'welcome_to_city',
                title: 'Bienvenue dans votre Cité !',
                content: `
                    <div class="tutorial-welcome">
                        <h3>🏛️ Votre Cité Romaine</h3>
                        <p>Félicitations ! Vous voici arrivé dans votre nouvelle cité. 
                        Cette vue d'ensemble vous permet de gérer tous les aspects de votre territoire.</p>
                        <p><strong>Conseil :</strong> Observez les différentes sections de l'interface.</p>
                    </div>
                `,
                target: '.page-container',
                position: 'center',
                action: 'highlight',
                nextButton: 'Découvrir les statistiques'
            },
            {
                id: 'city_stats',
                title: 'Statistiques de la Cité',
                content: `
                    <div class="tutorial-stats">
                        <h3>📊 Vos Indicateurs Clés</h3>
                        <p>Ces cartes affichent les informations essentielles de votre cité :</p>
                        <ul>
                            <li><strong>Population :</strong> Nombre de citoyens</li>
                            <li><strong>Bonheur :</strong> Moral de vos citoyens</li>
                            <li><strong>Bâtiments :</strong> Nombre de constructions</li>
                            <li><strong>Armée :</strong> Force militaire</li>
                        </ul>
                        <p>Ces valeurs évoluent en temps réel selon vos actions.</p>
                    </div>
                `,
                target: '.city-stats-section',
                position: 'left',
                action: 'highlight',
                nextButton: 'Voir la carte de la cité'
            },
            {
                id: 'city_map',
                title: 'Plan de votre Cité',
                content: `
                    <div class="tutorial-map">
                        <h3>🗺️ Vue d'Ensemble</h3>
                        <p>Cette zone représente le plan de votre cité. Pour l'instant, elle est vide, 
                        mais vous pourrez bientôt y voir vos bâtiments s'élever !</p>
                        <p><strong>Astuce :</strong> Cliquez sur "Bâtiments" dans les actions rapides 
                        pour commencer à construire.</p>
                    </div>
                `,
                target: '.city-map-section',
                position: 'right',
                action: 'highlight',
                nextButton: 'Découvrir les actions rapides'
            },
            {
                id: 'quick_actions',
                title: 'Actions Rapides',
                content: `
                    <div class="tutorial-actions">
                        <h3>⚡ Raccourcis Essentiels</h3>
                        <p>Ces boutons vous donnent accès aux fonctions les plus importantes :</p>
                        <ul>
                            <li><strong>Bâtiments :</strong> Construire et améliorer</li>
                            <li><strong>Citoyens :</strong> Gérer votre population</li>
                            <li><strong>Production :</strong> Voir vos ressources</li>
                            <li><strong>Impôts :</strong> Collecter de l'or</li>
                            <li><strong>Soldats :</strong> Recruter des troupes</li>
                            <li><strong>Festival :</strong> Améliorer le bonheur</li>
                        </ul>
                    </div>
                `,
                target: '.quick-actions',
                position: 'top',
                action: 'highlight',
                nextButton: 'Première construction'
            },
            {
                id: 'first_building',
                title: 'Votre Premier Bâtiment',
                content: `
                    <div class="tutorial-building">
                        <h3>🏗️ Commençons à Construire !</h3>
                        <p>Il est temps de construire votre premier bâtiment. 
                        Je recommande de commencer par un <strong>Forum</strong>.</p>
                        <p><strong>Le Forum :</strong></p>
                        <ul>
                            <li>Augmente la population maximale</li>
                            <li>Débloque d'autres bâtiments</li>
                            <li>Centre administratif de votre cité</li>
                        </ul>
                        <p><strong>Action :</strong> Cliquez sur "Gérer les Bâtiments" !</p>
                    </div>
                `,
                target: 'a[href="Bâtiments.html"]',
                position: 'top',
                action: 'pulse',
                nextButton: null,
                requiredAction: 'click_buildings'
            },
            {
                id: 'navigation_header',
                title: 'Navigation Principale',
                content: `
                    <div class="tutorial-nav">
                        <h3>🧭 Se Déplacer dans l'Empire</h3>
                        <p>En haut de l'écran, vous trouverez la navigation principale qui vous permet 
                        d'accéder aux différentes sections de votre empire :</p>
                        <ul>
                            <li><strong>Empire :</strong> Vos cités et provinces</li>
                            <li><strong>Militaire :</strong> Légions et flottes</li>
                            <li><strong>Développement :</strong> Recherche et commerce</li>
                            <li><strong>Social :</strong> Alliances et diplomatie</li>
                        </ul>
                    </div>
                `,
                target: '.imperium-header-2025',
                position: 'bottom',
                action: 'highlight',
                nextButton: 'Comprendre les ressources'
            },
            {
                id: 'resources_system',
                title: 'Système de Ressources',
                content: `
                    <div class="tutorial-resources">
                        <h3>💰 L'Économie Romaine</h3>
                        <p>Votre empire fonctionne grâce à 6 ressources principales :</p>
                        <div class="resource-grid">
                            <div class="resource-item">
                                <span>🌲</span> <strong>Bois</strong> - Construction de base
                            </div>
                            <div class="resource-item">
                                <span>🪨</span> <strong>Pierre</strong> - Monuments et fortifications
                            </div>
                            <div class="resource-item">
                                <span>⛏️</span> <strong>Fer</strong> - Armes et outils
                            </div>
                            <div class="resource-item">
                                <span>🍇</span> <strong>Vin</strong> - Bonheur et commerce
                            </div>
                            <div class="resource-item">
                                <span>💰</span> <strong>Or</strong> - Monnaie universelle
                            </div>
                            <div class="resource-item">
                                <span>📚</span> <strong>Savoir</strong> - Recherche et technologies
                            </div>
                        </div>
                        <p>Gérez-les avec sagesse pour faire prospérer votre empire !</p>
                    </div>
                `,
                target: '.resources-display-2025',
                position: 'bottom',
                action: 'highlight',
                nextButton: 'Navigation mobile'
            },
            {
                id: 'mobile_navigation',
                title: 'Navigation Mobile',
                content: `
                    <div class="tutorial-mobile">
                        <h3>📱 Interface Mobile</h3>
                        <p>En bas de l'écran, vous avez accès à la navigation mobile optimisée :</p>
                        <ul>
                            <li><strong>Onglets principaux :</strong> Accès rapide aux sections</li>
                            <li><strong>Bouton central :</strong> Actions importantes</li>
                            <li><strong>Notifications :</strong> Alertes et messages</li>
                        </ul>
                        <p><strong>Astuce :</strong> Balayez horizontalement pour changer d'onglet !</p>
                    </div>
                `,
                target: '.mobile-tabs-2025',
                position: 'top',
                action: 'highlight',
                nextButton: 'Terminer le tutoriel'
            },
            {
                id: 'tutorial_complete',
                title: 'Tutoriel Terminé !',
                content: `
                    <div class="tutorial-complete">
                        <h3>🎉 Félicitations !</h3>
                        <p>Vous avez terminé le tutoriel de base ! Vous connaissez maintenant 
                        les éléments essentiels pour gouverner votre cité romaine.</p>
                        
                        <div class="next-steps">
                            <h4>Prochaines étapes recommandées :</h4>
                            <ol>
                                <li>Construire un Forum pour augmenter votre population</li>
                                <li>Construire des bâtiments de production (Scierie, Carrière)</li>
                                <li>Recruter vos premières troupes</li>
                                <li>Explorer les autres sections de l'empire</li>
                            </ol>
                        </div>
                        
                        <p><strong>Que les dieux vous accompagnent dans votre règne !</strong></p>
                    </div>
                `,
                target: null,
                position: 'center',
                action: 'none',
                nextButton: 'Commencer à jouer'
            }
        ];
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.currentStep = 0;
        this.createOverlay();
        this.showCurrentStep();
        
        console.log('🎓 Tutoriel interactif démarré');
    }

    createOverlay() {
        // Créer l'overlay principal
        this.overlay = document.createElement('div');
        this.overlay.className = 'tutorial-overlay';
        this.overlay.innerHTML = `
            <div class="tutorial-backdrop"></div>
            <div class="tutorial-controls">
                <button class="tutorial-skip" onclick="interactiveTutorial.skip()">
                    Passer le tutoriel
                </button>
                <div class="tutorial-progress">
                    <span class="progress-text">Étape <span class="current-step">1</span> sur <span class="total-steps">${this.tutorialSteps.length}</span></span>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        this.addTutorialStyles();
    }

    addTutorialStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .tutorial-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                pointer-events: none;
            }
            
            .tutorial-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                transition: all 0.3s ease;
            }
            
            .tutorial-controls {
                position: absolute;
                top: 1rem;
                right: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                pointer-events: auto;
            }
            
            .tutorial-skip {
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border: 2px solid #FFD700;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .tutorial-skip:hover {
                background: rgba(255, 215, 0, 0.2);
                transform: scale(1.05);
            }
            
            .tutorial-progress {
                background: rgba(0, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #FFD700;
                min-width: 200px;
            }
            
            .progress-text {
                color: white;
                font-size: 0.9rem;
                display: block;
                margin-bottom: 0.5rem;
                text-align: center;
            }
            
            .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #FFD700, #FFA500);
                width: 0%;
                transition: width 0.5s ease;
            }
            
            .tutorial-tooltip {
                position: absolute;
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border: 2px solid #FFD700;
                border-radius: 1rem;
                padding: 1.5rem;
                max-width: 400px;
                color: white;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 2001;
                pointer-events: auto;
                animation: tooltipAppear 0.3s ease-out;
            }
            
            .tutorial-tooltip::before {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
            }
            
            .tutorial-tooltip.position-top::before {
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 10px 10px 0 10px;
                border-color: #FFD700 transparent transparent transparent;
            }
            
            .tutorial-tooltip.position-bottom::before {
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 0 10px 10px 10px;
                border-color: transparent transparent #FFD700 transparent;
            }
            
            .tutorial-tooltip.position-left::before {
                right: -10px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 10px 0 10px 10px;
                border-color: transparent transparent transparent #FFD700;
            }
            
            .tutorial-tooltip.position-right::before {
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 10px 10px 10px 0;
                border-color: transparent #FFD700 transparent transparent;
            }
            
            .tutorial-tooltip h3 {
                color: #FFD700;
                margin-bottom: 1rem;
                font-size: 1.3rem;
            }
            
            .tutorial-tooltip p {
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            
            .tutorial-tooltip ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            .tutorial-tooltip li {
                margin-bottom: 0.5rem;
            }
            
            .tutorial-buttons {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1.5rem;
            }
            
            .tutorial-btn {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #8B4513;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .tutorial-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
            }
            
            .tutorial-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .tutorial-highlight {
                position: relative;
                z-index: 2001;
                box-shadow: 0 0 0 4px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5) !important;
                border-radius: 0.5rem;
                animation: tutorialPulse 2s infinite;
            }
            
            .tutorial-highlight-center {
                position: relative;
                z-index: 2001;
                background: rgba(255, 215, 0, 0.1) !important;
                border: 2px solid #FFD700 !important;
                border-radius: 1rem;
            }
            
            .resource-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            
            .resource-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .tutorial-welcome, .tutorial-complete {
                text-align: center;
            }
            
            .next-steps {
                background: rgba(0, 0, 0, 0.3);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
                text-align: left;
            }
            
            .next-steps ol {
                margin: 0.5rem 0;
                padding-left: 1.5rem;
            }
            
            .next-steps li {
                margin-bottom: 0.5rem;
            }
            
            @keyframes tooltipAppear {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes tutorialPulse {
                0%, 100% {
                    box-shadow: 0 0 0 4px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5);
                }
                50% {
                    box-shadow: 0 0 0 8px #FFD700, 0 0 30px rgba(255, 215, 0, 0.8);
                }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .tutorial-tooltip {
                    max-width: 300px;
                    padding: 1rem;
                }
                
                .tutorial-controls {
                    top: 0.5rem;
                    right: 0.5rem;
                }
                
                .tutorial-progress {
                    padding: 0.75rem;
                    min-width: 150px;
                }
                
                .resource-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    showCurrentStep() {
        const step = this.tutorialSteps[this.currentStep];
        if (!step) {
            this.complete();
            return;
        }
        
        // Mettre à jour la progression
        this.updateProgress();
        
        // Supprimer l'ancien tooltip et highlight
        this.clearHighlight();
        this.removeTooltip();
        
        // Appliquer l'action de l'étape
        if (step.action === 'highlight' && step.target) {
            this.highlightElement(step.target);
        } else if (step.action === 'pulse' && step.target) {
            this.pulseElement(step.target);
        }
        
        // Afficher le tooltip
        this.showTooltip(step);
        
        console.log(`🎓 Étape ${this.currentStep + 1}: ${step.title}`);
    }

    highlightElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.highlightedElement = element;
            if (selector === '.page-container') {
                element.classList.add('tutorial-highlight-center');
            } else {
                element.classList.add('tutorial-highlight');
            }
            
            // Faire défiler vers l'élément
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    pulseElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.highlightedElement = element;
            element.classList.add('tutorial-highlight');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    showTooltip(step) {
        this.tooltip = document.createElement('div');
        this.tooltip.className = `tutorial-tooltip position-${step.position}`;
        
        const buttonsHtml = step.nextButton ? `
            <div class="tutorial-buttons">
                ${this.currentStep > 0 ? '<button class="tutorial-btn secondary" onclick="interactiveTutorial.previousStep()">Précédent</button>' : ''}
                <button class="tutorial-btn" onclick="interactiveTutorial.nextStep()">${step.nextButton}</button>
            </div>
        ` : '';
        
        this.tooltip.innerHTML = `
            ${step.content}
            ${buttonsHtml}
        `;
        
        // Positionner le tooltip
        this.positionTooltip(step);
        
        document.body.appendChild(this.tooltip);
    }

    positionTooltip(step) {
        if (!step.target || step.position === 'center') {
            // Centrer le tooltip
            this.tooltip.style.position = 'fixed';
            this.tooltip.style.top = '50%';
            this.tooltip.style.left = '50%';
            this.tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        const targetElement = document.querySelector(step.target);
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (step.position) {
            case 'top':
                top = rect.top - tooltipRect.height - 20;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = rect.bottom + 20;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 20;
                break;
            case 'right':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 20;
                break;
        }
        
        // Ajuster si le tooltip sort de l'écran
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentStepSpan = document.querySelector('.current-step');
        
        if (progressFill) {
            const progress = ((this.currentStep + 1) / this.tutorialSteps.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentStepSpan) {
            currentStepSpan.textContent = this.currentStep + 1;
        }
    }

    nextStep() {
        const currentStepData = this.tutorialSteps[this.currentStep];
        
        // Marquer l'étape comme complétée
        this.completedSteps.add(currentStepData.id);
        
        // Vérifier si une action spécifique est requise
        if (currentStepData.requiredAction) {
            this.waitForAction(currentStepData.requiredAction);
            return;
        }
        
        this.currentStep++;
        this.showCurrentStep();
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
        }
    }

    waitForAction(actionType) {
        // Attendre une action spécifique du joueur
        switch (actionType) {
            case 'click_buildings':
                this.waitForBuildingsClick();
                break;
            // Ajouter d'autres actions si nécessaire
        }
    }

    waitForBuildingsClick() {
        const buildingsLink = document.querySelector('a[href="Bâtiments.html"]');
        if (buildingsLink) {
            const originalHref = buildingsLink.href;
            buildingsLink.onclick = (e) => {
                e.preventDefault();
                this.nextStep();
                // Rediriger après un court délai
                setTimeout(() => {
                    window.location.href = originalHref;
                }, 500);
            };
        }
    }

    clearHighlight() {
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('tutorial-highlight', 'tutorial-highlight-center');
            this.highlightedElement = null;
        }
    }

    removeTooltip() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    }

    skip() {
        if (confirm('Êtes-vous sûr de vouloir passer le tutoriel ? Vous pourrez le relancer plus tard depuis les paramètres.')) {
            this.complete();
        }
    }

    complete() {
        console.log('🎉 Tutoriel terminé !');
        
        // Nettoyer l'interface
        this.clearHighlight();
        this.removeTooltip();
        
        if (this.overlay) {
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 300);
        }
        
        this.isActive = false;
        
        // Sauvegarder que le tutoriel a été complété
        localStorage.setItem('imperium_tutorial_completed', 'true');
        
        // Afficher un message de félicitations
        if (window.dialogueSystem) {
            window.dialogueSystem.showDialogue({
                title: 'Tutoriel Terminé !',
                content: `
                    <div class="tutorial-completion">
                        <h3>🎉 Félicitations !</h3>
                        <p>Vous maîtrisez maintenant les bases de l'administration romaine !</p>
                        <p><strong>Récompense :</strong> +100 XP, +50 Or, Titre "Apprenti Gouverneur"</p>
                        <p>Votre aventure dans l'Empire romain ne fait que commencer...</p>
                    </div>
                `,
                buttons: [
                    {
                        text: 'Commencer à gouverner !',
                        action: () => {
                            // Donner les récompenses
                            if (window.gameState) {
                                window.gameState.player.xp = (window.gameState.player.xp || 0) + 100;
                                window.gameState.resources.gold = (window.gameState.resources.gold || 0) + 50;
                            }
                        }
                    }
                ]
            });
        }
    }

    // Méthode pour relancer le tutoriel
    restart() {
        this.currentStep = 0;
        this.completedSteps.clear();
        localStorage.removeItem('imperium_tutorial_completed');
        this.start();
    }

    // Vérifier si le tutoriel a déjà été complété
    isCompleted() {
        return localStorage.getItem('imperium_tutorial_completed') === 'true';
    }
}

// Initialisation globale
window.interactiveTutorial = new InteractiveTutorialSystem();

console.log('🎓 Système de tutoriel interactif initialisé');