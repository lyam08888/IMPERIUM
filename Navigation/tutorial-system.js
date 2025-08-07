/**
 * 🏛️ IMPERIUM - Système de Tutoriel avec Histoire Romaine
 * Tutoriel interactif complet avec narration historique
 */

class ImperiumTutorial {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.tutorialData = this.initTutorialSteps();
        this.overlay = null;
        this.highlightedElement = null;
    }

    initTutorialSteps() {
        return [
            {
                id: 'welcome',
                title: 'Bienvenue dans l\'Empire Romain',
                content: `
                    <div class="tutorial-story">
                        <h3>🏛️ Anno Domini 27</h3>
                        <p>Vous êtes <strong>Marcus Aurelius</strong>, un jeune patricien romain ambitieux. 
                        Auguste vient de devenir le premier empereur, et l'Empire s'étend à travers la Méditerranée.</p>
                        
                        <p>Votre famille vous a confié une <strong>petite cité</strong> aux confins de l'Empire. 
                        Votre mission : la développer, la fortifier, et étendre l'influence de Rome !</p>
                        
                        <div class="tutorial-objective">
                            <strong>🎯 Votre Objectif :</strong> Devenir un gouverneur respecté et étendre votre territoire.
                        </div>
                    </div>
                `,
                action: 'none',
                highlight: null,
                nextButton: 'Commencer mon règne'
            },
            {
                id: 'city_overview',
                title: 'Votre Première Cité',
                content: `
                    <div class="tutorial-story">
                        <h3>🏘️ Votre Domaine</h3>
                        <p>Voici votre cité ! Comme toute colonie romaine, elle suit le plan traditionnel :</p>
                        
                        <ul class="tutorial-list">
                            <li><strong>Forum</strong> - Le cœur administratif (comme à Rome)</li>
                            <li><strong>Entrepôts</strong> - Pour stocker vos ressources</li>
                            <li><strong>Caserne</strong> - Pour recruter vos légions</li>
                            <li><strong>Bâtiments de production</strong> - Bois, pierre, fer, vin</li>
                        </ul>
                        
                        <p>Chaque bâtiment peut être <strong>amélioré</strong> pour augmenter son efficacité.</p>
                    </div>
                `,
                action: 'highlight',
                highlight: '.buildings-grid',
                nextButton: 'Comprendre les ressources'
            },
            {
                id: 'resources',
                title: 'Les Ressources de l\'Empire',
                content: `
                    <div class="tutorial-story">
                        <h3>💰 L'Économie Romaine</h3>
                        <p>L'Empire fonctionne grâce à <strong>6 ressources essentielles</strong> :</p>
                        
                        <div class="resource-explanation">
                            <div class="resource-item">
                                <span class="resource-icon">🌲</span>
                                <div>
                                    <strong>Lignum (Bois)</strong><br>
                                    Pour les bâtiments de base, navires et machines de siège
                                </div>
                            </div>
                            <div class="resource-item">
                                <span class="resource-icon">🪨</span>
                                <div>
                                    <strong>Lapis (Pierre)</strong><br>
                                    Pour les monuments, fortifications et aqueducs
                                </div>
                            </div>
                            <div class="resource-item">
                                <span class="resource-icon">⛏️</span>
                                <div>
                                    <strong>Ferrum (Fer)</strong><br>
                                    Pour les armes, armures et outils
                                </div>
                            </div>
                            <div class="resource-item">
                                <span class="resource-icon">🍇</span>
                                <div>
                                    <strong>Vinum (Vin)</strong><br>
                                    Pour le bonheur des citoyens et le commerce
                                </div>
                            </div>
                            <div class="resource-item">
                                <span class="resource-icon">💰</span>
                                <div>
                                    <strong>Aurum (Or)</strong><br>
                                    Pour l'entretien, le commerce et la corruption
                                </div>
                            </div>
                            <div class="resource-item">
                                <span class="resource-icon">📚</span>
                                <div>
                                    <strong>Scientia (Savoir)</strong><br>
                                    Pour les technologies et innovations
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                action: 'highlight',
                highlight: '.resources-display',
                nextButton: 'Construire mon premier bâtiment'
            },
            {
                id: 'first_building',
                title: 'Construire le Forum',
                content: `
                    <div class="tutorial-story">
                        <h3>🏛️ Le Forum Romanum</h3>
                        <p>Chaque cité romaine commence par son <strong>Forum</strong> - le centre de la vie civique.</p>
                        
                        <p>Le Forum permet :</p>
                        <ul class="tutorial-list">
                            <li>D'augmenter la <strong>population maximale</strong></li>
                            <li>De débloquer d'autres bâtiments</li>
                            <li>D'administrer votre territoire</li>
                        </ul>
                        
                        <div class="tutorial-task">
                            <strong>📋 Tâche :</strong> Cliquez sur un emplacement vide pour construire votre Forum !
                        </div>
                    </div>
                `,
                action: 'highlight',
                highlight: '.building-slot:not(.occupied)',
                nextButton: null, // Attendre l'action du joueur
                requiredAction: 'build_forum'
            },
            {
                id: 'building_complete',
                title: 'Félicitations !',
                content: `
                    <div class="tutorial-story">
                        <h3>🎉 Excellent Travail !</h3>
                        <p>Votre Forum est maintenant construit ! Vous venez de poser la première pierre 
                        de ce qui deviendra peut-être une grande métropole romaine.</p>
                        
                        <p>Remarquez que :</p>
                        <ul class="tutorial-list">
                            <li>Vos ressources ont diminué</li>
                            <li>Votre population maximale a augmenté</li>
                            <li>De nouveaux bâtiments sont maintenant disponibles</li>
                        </ul>
                        
                        <div class="tutorial-reward">
                            <strong>🏆 Récompense :</strong> +100 XP, +50 Or
                        </div>
                    </div>
                `,
                action: 'none',
                highlight: null,
                nextButton: 'Continuer le développement'
            },
            {
                id: 'warehouse',
                title: 'Sécuriser vos Ressources',
                content: `
                    <div class="tutorial-story">
                        <h3>📦 Les Horrea (Entrepôts)</h3>
                        <p>Dans l'Empire romain, la sécurité des ressources était cruciale. 
                        Les <strong>Horrea</strong> étaient des entrepôts fortifiés qui protégeaient 
                        les biens contre le vol et les intempéries.</p>
                        
                        <p>Vos entrepôts :</p>
                        <ul class="tutorial-list">
                            <li>Augmentent votre <strong>capacité de stockage</strong></li>
                            <li>Protègent vos ressources contre le pillage</li>
                            <li>Permettent de stocker plus pour les grands projets</li>
                        </ul>
                        
                        <div class="tutorial-task">
                            <strong>📋 Tâche :</strong> Construisez un Entrepôt pour sécuriser vos biens !
                        </div>
                    </div>
                `,
                action: 'highlight',
                highlight: '.building-slot:not(.occupied)',
                nextButton: null,
                requiredAction: 'build_warehouse'
            },
            {
                id: 'military',
                title: 'Lever vos Premières Légions',
                content: `
                    <div class="tutorial-story">
                        <h3>⚔️ Les Légions Romaines</h3>
                        <p>L'Empire romain s'est bâti sur la force de ses légions. 
                        Chaque gouverneur doit pouvoir défendre son territoire et 
                        étendre l'influence de Rome.</p>
                        
                        <p>Pour recruter des soldats, vous devez d'abord construire une <strong>Caserne</strong>.</p>
                        
                        <p>Les unités disponibles :</p>
                        <ul class="tutorial-list">
                            <li><strong>Vélites</strong> - Troupes légères, rapides et peu coûteuses</li>
                            <li><strong>Hastati</strong> - Fantassins lourds, épine dorsale de l'armée</li>
                            <li><strong>Légionnaires</strong> - Élite militaire (débloqués plus tard)</li>
                        </ul>
                        
                        <div class="tutorial-task">
                            <strong>📋 Tâche :</strong> Construisez une Caserne puis recrutez vos premières troupes !
                        </div>
                    </div>
                `,
                action: 'highlight',
                highlight: '.building-slot:not(.occupied)',
                nextButton: null,
                requiredAction: 'recruit_first_unit'
            },
            {
                id: 'research',
                title: 'La Sagesse de l\'Empire',
                content: `
                    <div class="tutorial-story">
                        <h3>📚 L'Academia (Académie)</h3>
                        <p>Rome ne s'est pas contentée de conquérir par l'épée. 
                        L'Empire a aussi brillé par ses <strong>innovations</strong> : 
                        aqueducs, routes, architecture, tactiques militaires...</p>
                        
                        <p>L'Académie vous permet de rechercher des <strong>technologies</strong> qui amélioreront 
                        tous les aspects de votre cité :</p>
                        
                        <ul class="tutorial-list">
                            <li><strong>Urbanisme</strong> - Aqueducs, forums avancés</li>
                            <li><strong>Art Militaire</strong> - Nouvelles formations, unités d'élite</li>
                            <li><strong>Économie</strong> - Routes commerciales, systèmes bancaires</li>
                            <li><strong>Diplomatie</strong> - Espionnage, alliances</li>
                        </ul>
                        
                        <div class="tutorial-task">
                            <strong>📋 Tâche :</strong> Construisez une Académie pour débloquer les technologies !
                        </div>
                    </div>
                `,
                action: 'highlight',
                highlight: '.building-slot:not(.occupied)',
                nextButton: 'Comprendre la progression'
            },
            {
                id: 'progression',
                title: 'Votre Ascension dans l\'Empire',
                content: `
                    <div class="tutorial-story">
                        <h3>🏆 Le Cursus Honorum</h3>
                        <p>Dans la Rome antique, le <strong>Cursus Honorum</strong> était la carrière 
                        politique traditionnelle. Vous commencez comme simple <strong>Citoyen</strong>, 
                        mais vous pouvez gravir les échelons :</p>
                        
                        <div class="progression-ladder">
                            <div class="rank">🥉 <strong>Citoyen</strong> - Votre rang actuel</div>
                            <div class="rank">🥈 <strong>Édile</strong> - Gestionnaire de cité</div>
                            <div class="rank">🥇 <strong>Préteur</strong> - Gouverneur de province</div>
                            <div class="rank">👑 <strong>Consul</strong> - Dirigeant de l'Empire</div>
                            <div class="rank">⭐ <strong>Imperator</strong> - Empereur légendaire</div>
                        </div>
                        
                        <p>Chaque rang débloque de nouvelles fonctionnalités et privilèges !</p>
                        
                        <div class="tutorial-objective">
                            <strong>🎯 Objectif actuel :</strong> Atteindre le rang d'Édile en développant votre cité
                        </div>
                    </div>
                `,
                action: 'none',
                highlight: null,
                nextButton: 'Découvrir la sauvegarde'
            },
            {
                id: 'save_system',
                title: 'Préserver votre Héritage',
                content: `
                    <div class="tutorial-story">
                        <h3>📜 Sauvegarder votre Empire</h3>
                        <p>Comme les scribes romains consignaient les actes de l'Empire, 
                        vous devez <strong>sauvegarder</strong> régulièrement vos progrès.</p>
                        
                        <p>Le système de sauvegarde :</p>
                        <ul class="tutorial-list">
                            <li><strong>Sauvegarde manuelle</strong> - Cliquez sur "Sauvegarder" quand vous voulez</li>
                            <li><strong>Multiples slots</strong> - Gardez plusieurs sauvegardes</li>
                            <li><strong>Progression complète</strong> - Tous vos bâtiments, ressources, technologies</li>
                        </ul>
                        
                        <div class="tutorial-task">
                            <strong>📋 Conseil :</strong> Sauvegardez avant les grandes décisions !
                        </div>
                        
                        <p>Le bouton "Sauvegarder" se trouve en bas de l'écran.</p>
                    </div>
                `,
                action: 'highlight',
                highlight: '#save-btn',
                nextButton: 'Terminer le tutoriel'
            },
            {
                id: 'conclusion',
                title: 'Ave, Imperator !',
                content: `
                    <div class="tutorial-story">
                        <h3>🏛️ Votre Règne Commence</h3>
                        <p>Félicitations ! Vous maîtrisez maintenant les bases de la gestion d'empire. 
                        Votre cité n'attend plus que vos décisions pour prospérer.</p>
                        
                        <div class="tutorial-summary">
                            <h4>Ce que vous avez appris :</h4>
                            <ul class="tutorial-list">
                                <li>✅ Gérer les 6 ressources de l'Empire</li>
                                <li>✅ Construire et améliorer des bâtiments</li>
                                <li>✅ Recruter et commander des légions</li>
                                <li>✅ Rechercher des technologies</li>
                                <li>✅ Comprendre la progression et les rangs</li>
                                <li>✅ Sauvegarder votre progression</li>
                            </ul>
                        </div>
                        
                        <div class="tutorial-final-reward">
                            <strong>🎁 Récompense finale :</strong><br>
                            +500 XP, +200 Or, +100 de chaque ressource
                        </div>
                        
                        <p><strong>Ave atque vale !</strong> (Salut et adieu !)<br>
                        Que les dieux vous accompagnent dans votre quête de grandeur !</p>
                    </div>
                `,
                action: 'none',
                highlight: null,
                nextButton: 'Commencer à régner !'
            }
        ];
    }

    startTutorial() {
        if (gameState.player.tutorialCompleted) {
            showNotification('Tutoriel déjà terminé !', 'info');
            return;
        }

        this.isActive = true;
        this.currentStep = 0;
        this.showStep();
        
        console.log('🎓 Tutoriel démarré');
    }

    showStep() {
        const step = this.tutorialData[this.currentStep];
        if (!step) {
            this.completeTutorial();
            return;
        }

        // Créer l'overlay du tutoriel
        this.createTutorialOverlay(step);
        
        // Appliquer l'action (highlight, etc.)
        this.applyStepAction(step);
        
        console.log(`📖 Étape du tutoriel: ${step.id}`);
    }

    createTutorialOverlay(step) {
        // Supprimer l'overlay précédent
        if (this.overlay) {
            this.overlay.remove();
        }

        this.overlay = document.createElement('div');
        this.overlay.className = 'tutorial-overlay';
        this.overlay.innerHTML = `
            <div class="tutorial-modal">
                <div class="tutorial-header">
                    <h2 class="tutorial-title">${step.title}</h2>
                    <div class="tutorial-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${((this.currentStep + 1) / this.tutorialData.length) * 100}%"></div>
                        </div>
                        <span class="progress-text">${this.currentStep + 1} / ${this.tutorialData.length}</span>
                    </div>
                </div>
                
                <div class="tutorial-content">
                    ${step.content}
                </div>
                
                <div class="tutorial-actions">
                    ${this.currentStep > 0 ? '<button class="tutorial-btn secondary" onclick="tutorial.previousStep()">Précédent</button>' : ''}
                    ${step.nextButton ? `<button class="tutorial-btn primary" onclick="tutorial.nextStep()">${step.nextButton}</button>` : ''}
                    <button class="tutorial-btn skip" onclick="tutorial.skipTutorial()">Passer le tutoriel</button>
                </div>
            </div>
        `;

        // Styles CSS intégrés
        this.overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(this.overlay);
    }

    applyStepAction(step) {
        // Supprimer le highlight précédent
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('tutorial-highlight');
            this.highlightedElement = null;
        }

        if (step.action === 'highlight' && step.highlight) {
            const element = document.querySelector(step.highlight);
            if (element) {
                element.classList.add('tutorial-highlight');
                this.highlightedElement = element;
                
                // Scroll vers l'élément
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    nextStep() {
        const currentStepData = this.tutorialData[this.currentStep];
        
        // Vérifier si une action est requise
        if (currentStepData.requiredAction) {
            if (!gameState.progression.completedTasks.includes(currentStepData.requiredAction)) {
                showNotification('Complétez d\'abord la tâche demandée !', 'warning');
                return;
            }
        }

        this.currentStep++;
        
        if (this.currentStep >= this.tutorialData.length) {
            this.completeTutorial();
        } else {
            this.showStep();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    skipTutorial() {
        if (confirm('Êtes-vous sûr de vouloir passer le tutoriel ? Vous pourrez le relancer plus tard.')) {
            this.completeTutorial();
        }
    }

    completeTutorial() {
        // Marquer le tutoriel comme terminé
        gameState.player.tutorialCompleted = true;
        
        // Donner les récompenses finales
        gameState.player.xp += 500;
        gameState.resources.gold += 200;
        gameState.resources.wood += 100;
        gameState.resources.stone += 100;
        gameState.resources.iron += 100;
        gameState.resources.wine += 100;
        
        // Nettoyer l'interface
        if (this.overlay) {
            this.overlay.remove();
        }
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('tutorial-highlight');
        }
        
        this.isActive = false;
        
        // Notification de fin
        showNotification('Tutoriel terminé ! Bienvenue dans IMPERIUM !', 'success');
        updateResourcesDisplay();
        
        console.log('🎓 Tutoriel terminé avec succès');
    }

    // Méthode pour relancer le tutoriel
    restartTutorial() {
        gameState.player.tutorialCompleted = false;
        this.currentStep = 0;
        this.startTutorial();
    }
}

// Styles CSS pour le tutoriel
const tutorialStyles = `
    .tutorial-overlay {
        font-family: 'Times New Roman', serif;
    }
    
    .tutorial-modal {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        border: 2px solid #d97706;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    
    .tutorial-title {
        color: #d97706;
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .tutorial-progress {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .progress-bar {
        flex-grow: 1;
        height: 8px;
        background: rgba(217, 119, 6, 0.2);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #d97706, #f59e0b);
        transition: width 0.3s ease;
    }
    
    .progress-text {
        color: #e2e8f0;
        font-size: 0.9rem;
        font-weight: bold;
    }
    
    .tutorial-content {
        color: #e2e8f0;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .tutorial-story h3 {
        color: #f59e0b;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .tutorial-list {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .tutorial-list li {
        margin-bottom: 0.5rem;
    }
    
    .tutorial-objective, .tutorial-task, .tutorial-reward {
        background: rgba(217, 119, 6, 0.1);
        border: 1px solid rgba(217, 119, 6, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .resource-explanation .resource-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: rgba(30, 41, 59, 0.5);
        border-radius: 0.5rem;
    }
    
    .resource-explanation .resource-icon {
        font-size: 1.5rem;
    }
    
    .progression-ladder .rank {
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        background: rgba(30, 41, 59, 0.5);
        border-radius: 0.5rem;
        border-left: 3px solid #d97706;
    }
    
    .tutorial-summary {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .tutorial-final-reward {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
        text-align: center;
        font-weight: bold;
    }
    
    .tutorial-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    
    .tutorial-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Times New Roman', serif;
    }
    
    .tutorial-btn.primary {
        background: linear-gradient(135deg, #d97706, #f59e0b);
        color: white;
    }
    
    .tutorial-btn.secondary {
        background: #6b7280;
        color: white;
    }
    
    .tutorial-btn.skip {
        background: transparent;
        color: #94a3b8;
        border: 1px solid #6b7280;
    }
    
    .tutorial-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    .tutorial-highlight {
        position: relative;
        z-index: 9999;
        box-shadow: 0 0 0 4px #d97706, 0 0 20px rgba(217, 119, 6, 0.5) !important;
        border-radius: 0.5rem;
        animation: tutorialPulse 2s infinite;
    }
    
    @keyframes tutorialPulse {
        0%, 100% { box-shadow: 0 0 0 4px #d97706, 0 0 20px rgba(217, 119, 6, 0.5); }
        50% { box-shadow: 0 0 0 8px #f59e0b, 0 0 30px rgba(245, 158, 11, 0.7); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Injecter les styles
const tutorialStyleSheet = document.createElement('style');
tutorialStyleSheet.textContent = tutorialStyles;
document.head.appendChild(tutorialStyleSheet);

// Créer l'instance globale du tutoriel
const tutorial = new ImperiumTutorial();

// Export global
window.tutorial = tutorial;
window.ImperiumTutorial = ImperiumTutorial;

console.log('🎓 Système de tutoriel avec histoire romaine chargé');