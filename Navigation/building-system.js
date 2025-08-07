/**
 * 🏛️ IMPERIUM - Système de Construction Interactif
 * Gestion complète de la construction et amélioration des bâtiments
 */

class ImperiumBuildingSystem {
    constructor() {
        this.buildingQueue = [];
        this.isBuilding = false;
        this.availableSlots = 20; // 4x5 grille
        this.init();
    }

    init() {
        this.setupBuildingGrid();
        this.setupBuildingInterface();
        console.log('🏗️ Système de construction initialisé');
    }

    setupBuildingGrid() {
        const buildingsGrid = document.getElementById('buildings-grid');
        if (!buildingsGrid) return;

        buildingsGrid.innerHTML = '';

        // Créer une grille 4x5 (20 emplacements)
        for (let i = 0; i < 20; i++) {
            const slot = document.createElement('div');
            slot.className = 'building-slot';
            slot.dataset.slotId = i;
            
            // Vérifier s'il y a un bâtiment à cet emplacement
            const building = this.getBuildingAtSlot(i);
            
            if (building) {
                this.renderBuilding(slot, building);
            } else {
                this.renderEmptySlot(slot, i);
            }
            
            buildingsGrid.appendChild(slot);
        }
    }

    getBuildingAtSlot(slotId) {
        // Chercher dans gameState.buildings un bâtiment avec cette position
        for (const [buildingType, buildingData] of Object.entries(gameState.buildings)) {
            if (buildingData.slotId === slotId) {
                return {
                    type: buildingType,
                    ...buildingData,
                    config: BUILDINGS_CONFIG[buildingType]
                };
            }
        }
        return null;
    }

    renderBuilding(slot, building) {
        slot.className = 'building-slot occupied';
        slot.innerHTML = `
            <div class="building-icon">${building.config.icon}</div>
            <div class="building-name">${building.config.name}</div>
            <div class="building-level">Niv. ${building.level}</div>
            <div class="building-actions">
                <button class="building-btn upgrade" onclick="buildingSystem.upgradeBuilding('${building.type}')">
                    ⬆️ Améliorer
                </button>
                <button class="building-btn info" onclick="buildingSystem.showBuildingInfo('${building.type}')">
                    ℹ️ Info
                </button>
            </div>
        `;
        
        // Ajouter les événements
        slot.addEventListener('click', () => {
            this.showBuildingDetails(building);
        });
    }

    renderEmptySlot(slot, slotId) {
        slot.className = 'building-slot empty';
        slot.innerHTML = `
            <div class="empty-slot-content">
                <div class="empty-icon">➕</div>
                <div class="empty-text">Construire</div>
            </div>
        `;
        
        slot.addEventListener('click', () => {
            this.showBuildingMenu(slotId);
        });
    }

    showBuildingMenu(slotId) {
        const availableBuildings = this.getAvailableBuildings();
        
        if (availableBuildings.length === 0) {
            showNotification('Aucun bâtiment disponible à votre niveau', 'warning');
            return;
        }

        const buildingModal = document.createElement('div');
        buildingModal.className = 'modal-overlay building-menu-modal';
        buildingModal.innerHTML = `
            <div class="modal-content building-menu-content">
                <h3 class="modal-title">Choisir un Bâtiment</h3>
                <div class="modal-body">
                    <div class="buildings-list">
                        ${availableBuildings.map(building => `
                            <div class="building-option" onclick="buildingSystem.startConstruction('${building.type}', ${slotId})">
                                <div class="building-option-header">
                                    <span class="building-icon">${building.config.icon}</span>
                                    <div class="building-info">
                                        <h4 class="building-name">${building.config.name}</h4>
                                        <p class="building-description">${building.config.description}</p>
                                    </div>
                                </div>
                                <div class="building-costs">
                                    ${this.renderBuildingCosts(building.config.costs(1))}
                                </div>
                                <div class="building-time">
                                    ⏱️ ${this.formatTime(building.config.buildTime(1))}
                                </div>
                                ${this.canAffordBuilding(building.config.costs(1)) ? 
                                    '<div class="can-build">✅ Constructible</div>' : 
                                    '<div class="cannot-build">❌ Ressources insuffisantes</div>'
                                }
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(buildingModal);
        buildingModal.style.display = 'flex';
    }

    getAvailableBuildings() {
        const available = [];
        
        for (const [buildingType, config] of Object.entries(BUILDINGS_CONFIG)) {
            // Vérifier les prérequis de niveau
            if (this.meetsLevelRequirements(buildingType)) {
                // Vérifier les prérequis de bâtiments
                if (this.meetsBuildingRequirements(config.requirements(1))) {
                    available.push({
                        type: buildingType,
                        config: config
                    });
                }
            }
        }
        
        return available;
    }

    meetsLevelRequirements(buildingType) {
        const levelRequirements = {
            'forum': 1,
            'warehouse': 1,
            'lumbercamp': 1,
            'quarry': 2,
            'vineyard': 2,
            'ironmine': 3,
            'barracks': 3,
            'academy': 4,
            'mint': 4,
            'tavern': 2,
            'shipyard': 7,
            'wall': 2,
            'amphitheater': 5,
            'library': 4
        };
        
        const requiredLevel = levelRequirements[buildingType] || 1;
        return gameState.player.level >= requiredLevel;
    }

    meetsBuildingRequirements(requirements) {
        for (const [requiredBuilding, requiredLevel] of Object.entries(requirements)) {
            const playerBuilding = gameState.buildings[requiredBuilding];
            if (!playerBuilding || playerBuilding.level < requiredLevel) {
                return false;
            }
        }
        return true;
    }

    renderBuildingCosts(costs) {
        return Object.entries(costs).map(([resource, amount]) => {
            const hasEnough = gameState.resources[resource] >= amount;
            return `
                <span class="cost-item ${hasEnough ? 'affordable' : 'unaffordable'}">
                    ${this.getResourceIcon(resource)} ${amount}
                </span>
            `;
        }).join(' ');
    }

    getResourceIcon(resource) {
        const icons = {
            wood: '🌲',
            stone: '🪨',
            iron: '⛏️',
            wine: '🍇',
            gold: '💰',
            research: '📚'
        };
        return icons[resource] || '❓';
    }

    canAffordBuilding(costs) {
        for (const [resource, amount] of Object.entries(costs)) {
            if (gameState.resources[resource] < amount) {
                return false;
            }
        }
        return true;
    }

    formatTime(seconds) {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
        return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}min`;
    }

    startConstruction(buildingType, slotId) {
        const config = BUILDINGS_CONFIG[buildingType];
        const costs = config.costs(1);
        
        if (!this.canAffordBuilding(costs)) {
            showNotification('Ressources insuffisantes !', 'error');
            return;
        }

        // Déduire les ressources
        for (const [resource, amount] of Object.entries(costs)) {
            gameState.resources[resource] -= amount;
        }

        // Ajouter le bâtiment à l'état du jeu
        gameState.buildings[buildingType] = {
            level: 1,
            slotId: slotId,
            constructionStarted: Date.now(),
            constructionTime: config.buildTime(1) * 1000 // en millisecondes
        };

        // Fermer le modal
        fermerModal();

        // Mettre à jour l'affichage
        updateResourcesDisplay();
        this.setupBuildingGrid();

        // Notification
        showNotification(`Construction de ${config.name} commencée !`, 'success');

        // Vérifier les objectifs
        this.checkBuildingObjectives(buildingType);

        // Simuler la fin de construction
        setTimeout(() => {
            this.completeBuildingConstruction(buildingType);
        }, config.buildTime(1) * 1000);
    }

    completeBuildingConstruction(buildingType) {
        const building = gameState.buildings[buildingType];
        if (building) {
            delete building.constructionStarted;
            delete building.constructionTime;
            
            const config = BUILDINGS_CONFIG[buildingType];
            showNotification(`${config.name} construction terminée !`, 'success');
            
            // Mettre à jour l'affichage
            this.setupBuildingGrid();
            
            // Vérifier les objectifs de progression
            this.checkBuildingObjectives(buildingType);
        }
    }

    checkBuildingObjectives(buildingType) {
        // Vérifier les objectifs de construction
        const objectiveMap = {
            'forum': 'build_forum',
            'warehouse': 'build_warehouse',
            'barracks': 'build_barracks',
            'academy': 'build_academy'
        };

        const objectiveId = objectiveMap[buildingType];
        if (objectiveId && progression) {
            progression.completeObjective(objectiveId);
        }

        // Marquer dans les tâches complétées
        if (!gameState.progression.completedTasks.includes(`build_${buildingType}`)) {
            gameState.progression.completedTasks.push(`build_${buildingType}`);
        }
    }

    upgradeBuilding(buildingType) {
        const building = gameState.buildings[buildingType];
        const config = BUILDINGS_CONFIG[buildingType];
        
        if (!building) {
            showNotification('Bâtiment non trouvé !', 'error');
            return;
        }

        const currentLevel = building.level;
        const nextLevel = currentLevel + 1;

        if (nextLevel > config.maxLevel) {
            showNotification('Niveau maximum atteint !', 'warning');
            return;
        }

        const costs = config.costs(nextLevel);
        
        if (!this.canAffordBuilding(costs)) {
            showNotification('Ressources insuffisantes pour l\'amélioration !', 'error');
            return;
        }

        // Confirmation
        const confirmModal = document.createElement('div');
        confirmModal.className = 'modal-overlay';
        confirmModal.innerHTML = `
            <div class="modal-content">
                <h3 class="modal-title">Améliorer ${config.name}</h3>
                <div class="modal-body">
                    <p>Améliorer de niveau ${currentLevel} à niveau ${nextLevel}</p>
                    <div class="upgrade-costs">
                        <h4>Coût :</h4>
                        ${this.renderBuildingCosts(costs)}
                    </div>
                    <div class="upgrade-time">
                        <h4>Temps : ${this.formatTime(config.buildTime(nextLevel))}</h4>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="buildingSystem.confirmUpgrade('${buildingType}', ${nextLevel})" class="modal-btn confirm">
                        Améliorer
                    </button>
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(confirmModal);
        confirmModal.style.display = 'flex';
    }

    confirmUpgrade(buildingType, nextLevel) {
        const building = gameState.buildings[buildingType];
        const config = BUILDINGS_CONFIG[buildingType];
        const costs = config.costs(nextLevel);

        // Déduire les ressources
        for (const [resource, amount] of Object.entries(costs)) {
            gameState.resources[resource] -= amount;
        }

        // Mettre à jour le niveau
        building.level = nextLevel;

        // Fermer le modal
        fermerModal();

        // Mettre à jour l'affichage
        updateResourcesDisplay();
        this.setupBuildingGrid();

        showNotification(`${config.name} amélioré au niveau ${nextLevel} !`, 'success');

        // Vérifier les objectifs d'amélioration
        if (buildingType === 'forum' && nextLevel === 2) {
            progression.completeObjective('upgrade_forum');
        }
    }

    showBuildingDetails(building) {
        const detailsModal = document.createElement('div');
        detailsModal.className = 'modal-overlay';
        detailsModal.innerHTML = `
            <div class="modal-content building-details-content">
                <h3 class="modal-title">
                    ${building.config.icon} ${building.config.name}
                </h3>
                <div class="modal-body">
                    <div class="building-stats">
                        <div class="stat-item">
                            <strong>Niveau :</strong> ${building.level} / ${building.config.maxLevel}
                        </div>
                        <div class="stat-item">
                            <strong>Catégorie :</strong> ${building.config.category}
                        </div>
                        <div class="stat-item">
                            <strong>Description :</strong> ${building.config.description}
                        </div>
                    </div>
                    
                    ${this.renderBuildingEffects(building)}
                    
                    ${building.level < building.config.maxLevel ? `
                        <div class="upgrade-preview">
                            <h4>Amélioration suivante (Niveau ${building.level + 1}) :</h4>
                            <div class="upgrade-costs">
                                ${this.renderBuildingCosts(building.config.costs(building.level + 1))}
                            </div>
                            <div class="upgrade-time">
                                Temps : ${this.formatTime(building.config.buildTime(building.level + 1))}
                            </div>
                        </div>
                    ` : '<div class="max-level">🏆 Niveau maximum atteint</div>'}
                </div>
                <div class="modal-actions">
                    ${building.level < building.config.maxLevel ? 
                        `<button onclick="buildingSystem.upgradeBuilding('${building.type}')" class="modal-btn confirm">
                            Améliorer
                        </button>` : ''
                    }
                    <button onclick="fermerModal()" class="modal-btn cancel">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(detailsModal);
        detailsModal.style.display = 'flex';
    }

    renderBuildingEffects(building) {
        const effects = building.config.effects(building.level);
        let html = '<div class="building-effects"><h4>Effets actuels :</h4>';
        
        for (const [effect, value] of Object.entries(effects)) {
            html += `<div class="effect-item">`;
            
            switch (effect) {
                case 'populationMax':
                    html += `👥 Population max : +${value}`;
                    break;
                case 'storageCapacity':
                    html += `📦 Capacité de stockage : ${value}`;
                    break;
                case 'happiness':
                    html += `😊 Bonheur : +${value}`;
                    break;
                case 'production':
                    html += `📈 Production : +${value[Object.keys(value)[0]]} ${Object.keys(value)[0]}`;
                    break;
                case 'defense':
                    html += `🛡️ Défense : +${value}`;
                    break;
                case 'researchSpeed':
                    html += `🔬 Vitesse de recherche : +${Math.round(value * 100)}%`;
                    break;
                default:
                    html += `${effect} : ${value}`;
            }
            
            html += `</div>`;
        }
        
        html += '</div>';
        return html;
    }

    showBuildingInfo(buildingType) {
        const building = gameState.buildings[buildingType];
        if (building) {
            this.showBuildingDetails({
                type: buildingType,
                ...building,
                config: BUILDINGS_CONFIG[buildingType]
            });
        }
    }
}

// Styles CSS pour le système de construction
const buildingStyles = `
    .building-slot {
        background: rgba(30, 41, 59, 0.6);
        border: 2px dashed #6b7280;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        min-height: 120px;
        padding: 0.5rem;
        position: relative;
    }
    
    .building-slot.empty:hover {
        border-color: #d97706;
        background: rgba(217, 119, 6, 0.1);
        transform: translateY(-2px);
    }
    
    .building-slot.occupied {
        border: 2px solid #d97706;
        background: rgba(217, 119, 6, 0.1);
    }
    
    .building-slot.occupied:hover {
        background: rgba(217, 119, 6, 0.2);
        transform: translateY(-2px);
    }
    
    .empty-slot-content {
        text-align: center;
        color: #94a3b8;
    }
    
    .empty-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .empty-text {
        font-size: 0.9rem;
        font-weight: bold;
    }
    
    .building-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
    }
    
    .building-name {
        color: #e2e8f0;
        font-weight: bold;
        font-size: 0.9rem;
        text-align: center;
        margin-bottom: 0.3rem;
    }
    
    .building-level {
        color: #d97706;
        font-size: 0.8rem;
        font-weight: bold;
        padding: 0.2rem 0.5rem;
        background: rgba(217, 119, 6, 0.2);
        border-radius: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .building-actions {
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .building-btn {
        padding: 0.3rem 0.6rem;
        border: none;
        border-radius: 0.3rem;
        font-size: 0.7rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: bold;
    }
    
    .building-btn.upgrade {
        background: #22c55e;
        color: white;
    }
    
    .building-btn.info {
        background: #3b82f6;
        color: white;
    }
    
    .building-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    
    .building-menu-content {
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .buildings-list {
        display: grid;
        gap: 1rem;
        max-height: 500px;
        overflow-y: auto;
    }
    
    .building-option {
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(30, 41, 59, 0.5);
    }
    
    .building-option:hover {
        border-color: #d97706;
        background: rgba(217, 119, 6, 0.1);
        transform: translateY(-2px);
    }
    
    .building-option-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .building-option .building-icon {
        font-size: 2rem;
        margin: 0;
    }
    
    .building-info {
        flex-grow: 1;
    }
    
    .building-option .building-name {
        color: #d97706;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    
    .building-description {
        color: #94a3b8;
        font-size: 0.9rem;
        margin: 0;
    }
    
    .building-costs {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
    }
    
    .cost-item {
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .cost-item.affordable {
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
    }
    
    .cost-item.unaffordable {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }
    
    .building-time {
        color: #f59e0b;
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .can-build {
        color: #22c55e;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .cannot-build {
        color: #ef4444;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .building-details-content {
        max-width: 600px;
    }
    
    .building-stats {
        margin-bottom: 1.5rem;
    }
    
    .stat-item {
        margin-bottom: 0.5rem;
        color: #e2e8f0;
    }
    
    .building-effects {
        margin-bottom: 1.5rem;
    }
    
    .building-effects h4 {
        color: #d97706;
        margin-bottom: 1rem;
    }
    
    .effect-item {
        background: rgba(217, 119, 6, 0.1);
        border: 1px solid rgba(217, 119, 6, 0.3);
        border-radius: 0.3rem;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        color: #e2e8f0;
    }
    
    .upgrade-preview {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .upgrade-preview h4 {
        color: #22c55e;
        margin-bottom: 1rem;
    }
    
    .max-level {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
        color: #f59e0b;
        font-weight: bold;
    }
`;

// Injecter les styles
const buildingStyleSheet = document.createElement('style');
buildingStyleSheet.textContent = buildingStyles;
document.head.appendChild(buildingStyleSheet);

// Créer l'instance globale
const buildingSystem = new ImperiumBuildingSystem();

// Export global
window.buildingSystem = buildingSystem;
window.ImperiumBuildingSystem = ImperiumBuildingSystem;

console.log('🏗️ Système de construction interactif chargé');