/**
 * 🏛️ IMPERIUM - Système de Progression Strict
 * Progression linéaire niveau par niveau avec déblocages
 */

class ImperiumProgression {
    constructor() {
        this.playerLevel = 1;
        this.playerXP = 0;
        this.playerTitle = 'Citoyen';
        this.unlockedFeatures = ['city']; // Fonctionnalités débloquées
        this.levelRequirements = this.initLevelRequirements();
        this.featureUnlocks = this.initFeatureUnlocks();
        this.currentObjectives = this.initObjectives();
    }

    initLevelRequirements() {
        return {
            1: { xp: 0, title: 'Citoyen' },
            2: { xp: 200, title: 'Citoyen Honoré' },
            3: { xp: 500, title: 'Décurion' },
            4: { xp: 1000, title: 'Centurion' },
            5: { xp: 1800, title: 'Édile' },
            6: { xp: 2800, title: 'Questeur' },
            7: { xp: 4200, title: 'Préteur' },
            8: { xp: 6000, title: 'Préteur Urbain' },
            9: { xp: 8500, title: 'Proconsul' },
            10: { xp: 12000, title: 'Consul' },
            11: { xp: 16500, title: 'Consul Suffect' },
            12: { xp: 22000, title: 'Procurateur' },
            13: { xp: 29000, title: 'Légat' },
            14: { xp: 37500, title: 'Gouverneur' },
            15: { xp: 47500, title: 'Imperator' },
            16: { xp: 60000, title: 'Caesar' },
            17: { xp: 75000, title: 'Augustus' },
            18: { xp: 93000, title: 'Divus' },
            19: { xp: 115000, title: 'Pater Patriae' },
            20: { xp: 142000, title: 'Imperator Maximus' }
        };
    }

    initFeatureUnlocks() {
        return {
            1: ['city', 'basic_buildings'], // Niveau 1 : Cité de base
            2: ['resources_management'], // Niveau 2 : Gestion des ressources
            3: ['military_basic', 'barracks'], // Niveau 3 : Militaire de base
            4: ['research', 'academy'], // Niveau 4 : Recherche
            5: ['trade_basic', 'market'], // Niveau 5 : Commerce de base
            6: ['diplomacy_basic'], // Niveau 6 : Diplomatie de base
            7: ['naval', 'shipyard'], // Niveau 7 : Naval
            8: ['provinces', 'expansion'], // Niveau 8 : Expansion territoriale
            9: ['alliance_basic'], // Niveau 9 : Alliances
            10: ['advanced_military'], // Niveau 10 : Militaire avancé
            11: ['espionage'], // Niveau 11 : Espionnage
            12: ['advanced_trade'], // Niveau 12 : Commerce avancé
            13: ['cultural_buildings'], // Niveau 13 : Bâtiments culturels
            14: ['advanced_diplomacy'], // Niveau 14 : Diplomatie avancée
            15: ['imperial_buildings'], // Niveau 15 : Bâtiments impériaux
            16: ['legendary_units'], // Niveau 16 : Unités légendaires
            17: ['world_wonders'], // Niveau 17 : Merveilles du monde
            18: ['divine_powers'], // Niveau 18 : Pouvoirs divins
            19: ['time_manipulation'], // Niveau 19 : Manipulation du temps
            20: ['ultimate_power'] // Niveau 20 : Pouvoir ultime
        };
    }

    initObjectives() {
        return {
            1: [
                {
                    id: 'build_forum',
                    name: 'Construire un Forum',
                    description: 'Le cœur de toute cité romaine',
                    xpReward: 100,
                    goldReward: 50,
                    completed: false,
                    required: true
                },
                {
                    id: 'reach_100_wood',
                    name: 'Accumuler 100 unités de bois',
                    description: 'Ressource de base pour la construction',
                    xpReward: 50,
                    goldReward: 25,
                    completed: false,
                    required: false
                }
            ],
            2: [
                {
                    id: 'build_warehouse',
                    name: 'Construire un Entrepôt',
                    description: 'Sécuriser vos ressources',
                    xpReward: 150,
                    goldReward: 75,
                    completed: false,
                    required: true
                },
                {
                    id: 'upgrade_forum',
                    name: 'Améliorer le Forum au niveau 2',
                    description: 'Augmenter la capacité administrative',
                    xpReward: 100,
                    goldReward: 50,
                    completed: false,
                    required: false
                }
            ],
            3: [
                {
                    id: 'build_barracks',
                    name: 'Construire une Caserne',
                    description: 'Base militaire pour recruter des troupes',
                    xpReward: 200,
                    goldReward: 100,
                    completed: false,
                    required: true
                },
                {
                    id: 'recruit_10_units',
                    name: 'Recruter 10 unités militaires',
                    description: 'Former votre première légion',
                    xpReward: 150,
                    goldReward: 75,
                    completed: false,
                    required: true
                }
            ],
            4: [
                {
                    id: 'build_academy',
                    name: 'Construire une Académie',
                    description: 'Centre de recherche et d\'innovation',
                    xpReward: 250,
                    goldReward: 125,
                    completed: false,
                    required: true
                },
                {
                    id: 'research_first_tech',
                    name: 'Rechercher votre première technologie',
                    description: 'Débloquer les innovations',
                    xpReward: 200,
                    goldReward: 100,
                    completed: false,
                    required: true
                }
            ],
            5: [
                {
                    id: 'build_market',
                    name: 'Construire un Marché',
                    description: 'Centre commercial de la cité',
                    xpReward: 300,
                    goldReward: 150,
                    completed: false,
                    required: true
                },
                {
                    id: 'complete_trade',
                    name: 'Effectuer 5 échanges commerciaux',
                    description: 'Établir des relations commerciales',
                    xpReward: 200,
                    goldReward: 100,
                    completed: false,
                    required: false
                }
            ]
            // Continuer pour les autres niveaux...
        };
    }

    // Vérifier et mettre à jour le niveau du joueur
    checkLevelUp() {
        const currentLevel = this.getCurrentLevel();
        
        if (currentLevel > this.playerLevel) {
            this.levelUp(currentLevel);
        }
    }

    getCurrentLevel() {
        let level = 1;
        
        for (let i = 2; i <= 20; i++) {
            if (this.playerXP >= this.levelRequirements[i].xp) {
                level = i;
            } else {
                break;
            }
        }
        
        return level;
    }

    levelUp(newLevel) {
        const oldLevel = this.playerLevel;
        this.playerLevel = newLevel;
        this.playerTitle = this.levelRequirements[newLevel].title;
        
        // Débloquer les nouvelles fonctionnalités
        const newFeatures = this.featureUnlocks[newLevel] || [];
        newFeatures.forEach(feature => {
            if (!this.unlockedFeatures.includes(feature)) {
                this.unlockedFeatures.push(feature);
            }
        });
        
        // Mettre à jour gameState
        gameState.player.level = this.playerLevel;
        gameState.player.title = this.playerTitle;
        gameState.progression.unlockedFeatures = this.unlockedFeatures;
        
        // Notification de montée de niveau
        this.showLevelUpNotification(oldLevel, newLevel, newFeatures);
        
        // Débloquer l'interface utilisateur
        this.updateUIAccess();
        
        console.log(`🎉 Montée de niveau ! ${oldLevel} → ${newLevel} (${this.playerTitle})`);
    }

    showLevelUpNotification(oldLevel, newLevel, newFeatures) {
        const levelUpModal = document.createElement('div');
        levelUpModal.className = 'modal-overlay level-up-modal';
        levelUpModal.innerHTML = `
            <div class="modal-content level-up-content">
                <div class="level-up-header">
                    <h2 class="level-up-title">🎉 PROMOTION IMPÉRIALE ! 🎉</h2>
                    <div class="level-progression">
                        <span class="old-level">Niveau ${oldLevel}</span>
                        <span class="arrow">→</span>
                        <span class="new-level">Niveau ${newLevel}</span>
                    </div>
                    <h3 class="new-title">${this.playerTitle}</h3>
                </div>
                
                <div class="level-up-body">
                    <div class="rank-description">
                        ${this.getRankDescription(newLevel)}
                    </div>
                    
                    ${newFeatures.length > 0 ? `
                        <div class="new-features">
                            <h4>🔓 Nouvelles Fonctionnalités Débloquées :</h4>
                            <ul class="features-list">
                                ${newFeatures.map(feature => `
                                    <li class="feature-item">
                                        ${this.getFeatureIcon(feature)} ${this.getFeatureName(feature)}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="level-rewards">
                        <h4>🎁 Récompenses de Promotion :</h4>
                        <div class="rewards-list">
                            <div class="reward-item">💰 +${newLevel * 100} Or</div>
                            <div class="reward-item">📚 +${newLevel * 50} Points de Recherche</div>
                            <div class="reward-item">🏛️ Nouveaux bâtiments disponibles</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button onclick="progression.closeLevelUpModal()" class="modal-btn confirm">
                        Continuer à régner !
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(levelUpModal);
        levelUpModal.style.display = 'flex';
        
        // Donner les récompenses
        gameState.resources.gold += newLevel * 100;
        gameState.resources.research += newLevel * 50;
        updateResourcesDisplay();
    }

    getRankDescription(level) {
        const descriptions = {
            1: "Citoyen de l'Empire, vous commencez votre ascension vers la grandeur.",
            2: "Votre dévouement à l'Empire est reconnu par vos pairs.",
            3: "Décurion, vous dirigez maintenant un conseil local.",
            4: "Centurion, commandant respecté de cent hommes.",
            5: "Édile, responsable des bâtiments publics et des festivités.",
            6: "Questeur, gestionnaire des finances publiques.",
            7: "Préteur, magistrat avec pouvoir judiciaire.",
            8: "Préteur Urbain, gardien de la justice dans la capitale.",
            9: "Proconsul, gouverneur d'une province importante.",
            10: "Consul, l'un des deux dirigeants suprêmes de l'Empire.",
            11: "Consul Suffect, remplaçant honoré d'un consul.",
            12: "Procurateur, administrateur impérial de haut rang.",
            13: "Légat, représentant personnel de l'Empereur.",
            14: "Gouverneur, maître d'un territoire étendu.",
            15: "Imperator, commandant victorieux acclamé par ses troupes.",
            16: "Caesar, titre réservé aux membres de la famille impériale.",
            17: "Augustus, titre suprême de majesté et de vénération.",
            18: "Divus, élevé au rang des dieux par le Sénat.",
            19: "Pater Patriae, Père de la Patrie, protecteur de tous les Romains.",
            20: "Imperator Maximus, souverain absolu de l'Empire éternel."
        };
        
        return descriptions[level] || "Rang légendaire dans l'histoire de Rome.";
    }

    getFeatureIcon(feature) {
        const icons = {
            'city': '🏛️',
            'basic_buildings': '🏗️',
            'resources_management': '📊',
            'military_basic': '⚔️',
            'barracks': '🏺',
            'research': '📚',
            'academy': '🎓',
            'trade_basic': '⚖️',
            'market': '🏪',
            'diplomacy_basic': '🤝',
            'naval': '🚢',
            'shipyard': '⚓',
            'provinces': '🗺️',
            'expansion': '📈',
            'alliance_basic': '🛡️',
            'advanced_military': '🏹',
            'espionage': '🕵️',
            'advanced_trade': '💰',
            'cultural_buildings': '🎭',
            'advanced_diplomacy': '👑',
            'imperial_buildings': '🏰',
            'legendary_units': '⭐',
            'world_wonders': '🌟',
            'divine_powers': '⚡',
            'time_manipulation': '⏰',
            'ultimate_power': '💫'
        };
        
        return icons[feature] || '🔓';
    }

    getFeatureName(feature) {
        const names = {
            'city': 'Gestion de Cité',
            'basic_buildings': 'Bâtiments de Base',
            'resources_management': 'Gestion des Ressources',
            'military_basic': 'Militaire de Base',
            'barracks': 'Casernes',
            'research': 'Recherche',
            'academy': 'Académies',
            'trade_basic': 'Commerce de Base',
            'market': 'Marchés',
            'diplomacy_basic': 'Diplomatie de Base',
            'naval': 'Forces Navales',
            'shipyard': 'Chantiers Navals',
            'provinces': 'Gestion des Provinces',
            'expansion': 'Expansion Territoriale',
            'alliance_basic': 'Alliances de Base',
            'advanced_military': 'Militaire Avancé',
            'espionage': 'Espionnage',
            'advanced_trade': 'Commerce Avancé',
            'cultural_buildings': 'Bâtiments Culturels',
            'advanced_diplomacy': 'Diplomatie Avancée',
            'imperial_buildings': 'Bâtiments Impériaux',
            'legendary_units': 'Unités Légendaires',
            'world_wonders': 'Merveilles du Monde',
            'divine_powers': 'Pouvoirs Divins',
            'time_manipulation': 'Manipulation Temporelle',
            'ultimate_power': 'Pouvoir Ultime'
        };
        
        return names[feature] || feature;
    }

    closeLevelUpModal() {
        const modal = document.querySelector('.level-up-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Vérifier si une fonctionnalité est débloquée
    isFeatureUnlocked(feature) {
        return this.unlockedFeatures.includes(feature);
    }

    // Vérifier si le joueur peut accéder à une page
    canAccessPage(page) {
        const pageRequirements = {
            'city': 'city',
            'world': 'provinces',
            'research': 'research',
            'military': 'military_basic',
            'trade': 'trade_basic',
            'diplomacy': 'diplomacy_basic',
            'alliance': 'alliance_basic',
            'naval': 'naval'
        };
        
        const requiredFeature = pageRequirements[page];
        return !requiredFeature || this.isFeatureUnlocked(requiredFeature);
    }

    // Mettre à jour l'accès à l'interface utilisateur
    updateUIAccess() {
        // Désactiver/activer les liens de navigation selon le niveau
        const navLinks = document.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page && !this.canAccessPage(page)) {
                link.classList.add('locked');
                link.style.opacity = '0.5';
                link.style.pointerEvents = 'none';
                
                // Ajouter un tooltip
                link.title = `Débloqué au niveau ${this.getRequiredLevel(page)}`;
            } else {
                link.classList.remove('locked');
                link.style.opacity = '1';
                link.style.pointerEvents = 'auto';
                link.title = '';
            }
        });
        
        // Mettre à jour l'affichage du niveau du joueur
        this.updatePlayerDisplay();
    }

    getRequiredLevel(page) {
        const requirements = {
            'provinces': 8,
            'research': 4,
            'military_basic': 3,
            'trade_basic': 5,
            'diplomacy_basic': 6,
            'alliance_basic': 9,
            'naval': 7
        };
        
        return requirements[page] || 1;
    }

    updatePlayerDisplay() {
        const playerName = document.querySelector('.player-name');
        const playerLevel = document.querySelector('.player-level');
        
        if (playerName) {
            playerName.textContent = gameState.player.name;
        }
        
        if (playerLevel) {
            const nextLevelXP = this.levelRequirements[this.playerLevel + 1]?.xp || this.playerXP;
            const progress = Math.floor((this.playerXP / nextLevelXP) * 100);
            playerLevel.textContent = `${this.playerTitle} - Niv. ${this.playerLevel} (${progress}%)`;
        }
    }

    // Ajouter de l'XP et vérifier la montée de niveau
    addXP(amount) {
        this.playerXP += amount;
        gameState.player.xp = this.playerXP;
        
        this.checkLevelUp();
        this.updatePlayerDisplay();
        
        showNotification(`+${amount} XP`, 'success');
    }

    // Compléter un objectif
    completeObjective(objectiveId) {
        const currentLevelObjectives = this.currentObjectives[this.playerLevel] || [];
        const objective = currentLevelObjectives.find(obj => obj.id === objectiveId);
        
        if (objective && !objective.completed) {
            objective.completed = true;
            
            // Donner les récompenses
            this.addXP(objective.xpReward);
            gameState.resources.gold += objective.goldReward;
            
            // Ajouter à la liste des tâches complétées
            if (!gameState.progression.completedTasks.includes(objectiveId)) {
                gameState.progression.completedTasks.push(objectiveId);
            }
            
            updateResourcesDisplay();
            showNotification(`Objectif accompli: ${objective.name}!`, 'success');
            
            // Vérifier si tous les objectifs requis sont complétés
            this.checkLevelObjectives();
        }
    }

    checkLevelObjectives() {
        const currentLevelObjectives = this.currentObjectives[this.playerLevel] || [];
        const requiredObjectives = currentLevelObjectives.filter(obj => obj.required);
        const completedRequired = requiredObjectives.filter(obj => obj.completed);
        
        if (completedRequired.length === requiredObjectives.length) {
            // Tous les objectifs requis sont complétés, débloquer le niveau suivant
            const bonusXP = 200 * this.playerLevel;
            this.addXP(bonusXP);
            showNotification(`Niveau ${this.playerLevel} maîtrisé ! +${bonusXP} XP bonus`, 'success');
        }
    }

    // Afficher les objectifs actuels
    showCurrentObjectives() {
        const objectives = this.currentObjectives[this.playerLevel] || [];
        
        const objectivesModal = document.createElement('div');
        objectivesModal.className = 'modal-overlay';
        objectivesModal.innerHTML = `
            <div class="modal-content">
                <h3 class="modal-title">Objectifs - Niveau ${this.playerLevel}</h3>
                <div class="modal-body">
                    <div class="objectives-list">
                        ${objectives.map(obj => `
                            <div class="objective-item ${obj.completed ? 'completed' : ''} ${obj.required ? 'required' : 'optional'}">
                                <div class="objective-header">
                                    <span class="objective-status">${obj.completed ? '✅' : '⏳'}</span>
                                    <span class="objective-name">${obj.name}</span>
                                    <span class="objective-type">${obj.required ? '(Requis)' : '(Optionnel)'}</span>
                                </div>
                                <div class="objective-description">${obj.description}</div>
                                <div class="objective-rewards">
                                    Récompenses: ${obj.xpReward} XP, ${obj.goldReward} Or
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(objectivesModal);
        objectivesModal.style.display = 'flex';
    }

    // Initialiser le système de progression
    init() {
        this.playerLevel = gameState.player.level || 1;
        this.playerXP = gameState.player.xp || 0;
        this.playerTitle = gameState.player.title || 'Citoyen';
        this.unlockedFeatures = gameState.progression.unlockedFeatures || ['city'];
        
        this.updateUIAccess();
        this.updatePlayerDisplay();
        
        console.log('📈 Système de progression initialisé');
    }
}

// Styles CSS pour le système de progression
const progressionStyles = `
    .level-up-modal .modal-content {
        max-width: 700px;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        border: 3px solid #d97706;
    }
    
    .level-up-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .level-up-title {
        color: #f59e0b;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    
    .level-progression {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .old-level, .new-level {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: bold;
    }
    
    .old-level {
        background: #6b7280;
        color: white;
    }
    
    .new-level {
        background: linear-gradient(135deg, #d97706, #f59e0b);
        color: white;
        animation: levelGlow 2s infinite;
    }
    
    .arrow {
        font-size: 1.5rem;
        color: #d97706;
    }
    
    .new-title {
        color: #f59e0b;
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .rank-description {
        background: rgba(217, 119, 6, 0.1);
        border: 1px solid rgba(217, 119, 6, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1.5rem;
        font-style: italic;
        color: #e2e8f0;
    }
    
    .new-features {
        margin-bottom: 1.5rem;
    }
    
    .new-features h4 {
        color: #22c55e;
        margin-bottom: 1rem;
    }
    
    .features-list {
        list-style: none;
        padding: 0;
    }
    
    .feature-item {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        color: #e2e8f0;
    }
    
    .level-rewards h4 {
        color: #f59e0b;
        margin-bottom: 1rem;
    }
    
    .rewards-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
    }
    
    .reward-item {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 0.5rem;
        padding: 0.75rem;
        text-align: center;
        color: #e2e8f0;
        font-weight: bold;
    }
    
    .objectives-list {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .objective-item {
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
        background: rgba(30, 41, 59, 0.5);
    }
    
    .objective-item.completed {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.1);
    }
    
    .objective-item.required {
        border-left: 4px solid #d97706;
    }
    
    .objective-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .objective-name {
        font-weight: bold;
        color: #e2e8f0;
        flex-grow: 1;
    }
    
    .objective-type {
        font-size: 0.8rem;
        color: #94a3b8;
    }
    
    .objective-description {
        color: #94a3b8;
        margin-bottom: 0.5rem;
    }
    
    .objective-rewards {
        font-size: 0.9rem;
        color: #f59e0b;
        font-weight: bold;
    }
    
    .nav-item a.locked {
        position: relative;
    }
    
    .nav-item a.locked::after {
        content: '🔒';
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
    }
    
    @keyframes levelGlow {
        0%, 100% { box-shadow: 0 0 10px rgba(217, 119, 6, 0.5); }
        50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.8); }
    }
`;

// Injecter les styles
const progressionStyleSheet = document.createElement('style');
progressionStyleSheet.textContent = progressionStyles;
document.head.appendChild(progressionStyleSheet);

// Créer l'instance globale
const progression = new ImperiumProgression();

// Export global
window.progression = progression;
window.ImperiumProgression = ImperiumProgression;

console.log('📈 Système de progression strict chargé');