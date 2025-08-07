/**
 * 🏛️ IMPERIUM - Système d'Interconnexion des Données
 * Assure la synchronisation et la cohérence de toutes les données du jeu
 */

class ImperiumDataInterconnection {
    constructor() {
        this.dataWatchers = new Map();
        this.updateQueue = [];
        this.isUpdating = false;
        this.validationRules = new Map();
        this.init();
    }

    init() {
        this.setupDataWatchers();
        this.setupValidationRules();
        this.setupAutoSave();
        this.validateGameState();
        console.log('🔗 Système d\'interconnexion des données initialisé');
    }

    setupDataWatchers() {
        // Surveiller les changements de ressources
        this.watchProperty('resources', (oldValue, newValue) => {
            this.onResourcesChanged(oldValue, newValue);
        });

        // Surveiller les changements de bâtiments
        this.watchProperty('buildings', (oldValue, newValue) => {
            this.onBuildingsChanged(oldValue, newValue);
        });

        // Surveiller les changements de niveau du joueur
        this.watchProperty('player.level', (oldValue, newValue) => {
            this.onPlayerLevelChanged(oldValue, newValue);
        });

        // Surveiller les changements d'XP
        this.watchProperty('player.xp', (oldValue, newValue) => {
            this.onPlayerXPChanged(oldValue, newValue);
        });

        // Surveiller les changements d'unités
        this.watchProperty('units', (oldValue, newValue) => {
            this.onUnitsChanged(oldValue, newValue);
        });

        // Surveiller les changements de technologies
        this.watchProperty('technologies', (oldValue, newValue) => {
            this.onTechnologiesChanged(oldValue, newValue);
        });
    }

    watchProperty(path, callback) {
        this.dataWatchers.set(path, {
            callback,
            lastValue: this.getNestedProperty(gameState, path)
        });
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    setNestedProperty(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    checkDataChanges() {
        if (this.isUpdating) return;

        this.dataWatchers.forEach((watcher, path) => {
            const currentValue = this.getNestedProperty(gameState, path);
            const lastValue = watcher.lastValue;

            if (JSON.stringify(currentValue) !== JSON.stringify(lastValue)) {
                watcher.callback(lastValue, currentValue);
                watcher.lastValue = JSON.parse(JSON.stringify(currentValue));
            }
        });
    }

    // === GESTIONNAIRES DE CHANGEMENTS ===

    onResourcesChanged(oldResources, newResources) {
        console.log('💰 Ressources modifiées:', { old: oldResources, new: newResources });
        
        // Mettre à jour l'affichage des ressources
        this.queueUpdate(() => {
            if (typeof updateResourcesDisplay === 'function') {
                updateResourcesDisplay();
            }
        });

        // Vérifier les capacités de stockage
        this.validateStorageCapacity();

        // Vérifier les objectifs liés aux ressources
        this.checkResourceObjectives(newResources);

        // Mettre à jour les boutons selon les ressources disponibles
        this.updateButtonStates();
    }

    onBuildingsChanged(oldBuildings, newBuildings) {
        console.log('🏗️ Bâtiments modifiés:', { old: oldBuildings, new: newBuildings });
        
        // Recalculer les effets des bâtiments
        this.recalculateBuildingEffects();

        // Mettre à jour la grille de construction
        this.queueUpdate(() => {
            if (typeof buildingSystem !== 'undefined') {
                buildingSystem.setupBuildingGrid();
            }
        });

        // Vérifier les objectifs de construction
        this.checkBuildingObjectives(newBuildings);

        // Mettre à jour les capacités débloquées
        this.updateUnlockedCapabilities();
    }

    onPlayerLevelChanged(oldLevel, newLevel) {
        console.log('📈 Niveau du joueur modifié:', { old: oldLevel, new: newLevel });
        
        // Mettre à jour le système de progression
        this.queueUpdate(() => {
            if (typeof progression !== 'undefined') {
                progression.playerLevel = newLevel;
                progression.updateUIAccess();
                progression.updatePlayerDisplay();
            }
        });

        // Débloquer de nouvelles fonctionnalités
        this.unlockFeaturesByLevel(newLevel);

        // Mettre à jour les objectifs disponibles
        this.updateAvailableObjectives(newLevel);
    }

    onPlayerXPChanged(oldXP, newXP) {
        console.log('⭐ XP du joueur modifiée:', { old: oldXP, new: newXP });
        
        // Vérifier si le joueur peut monter de niveau
        this.queueUpdate(() => {
            if (typeof progression !== 'undefined') {
                progression.playerXP = newXP;
                progression.checkLevelUp();
            }
        });
    }

    onUnitsChanged(oldUnits, newUnits) {
        console.log('⚔️ Unités modifiées:', { old: oldUnits, new: newUnits });
        
        // Mettre à jour l'affichage militaire
        this.queueUpdate(() => {
            if (typeof updateMilitaryDisplay === 'function') {
                updateMilitaryDisplay();
            }
        });

        // Vérifier les objectifs militaires
        this.checkMilitaryObjectives(newUnits);

        // Recalculer la puissance militaire
        this.recalculateMilitaryPower();
    }

    onTechnologiesChanged(oldTechs, newTechs) {
        console.log('🔬 Technologies modifiées:', { old: oldTechs, new: newTechs });
        
        // Appliquer les effets des nouvelles technologies
        this.applyTechnologyEffects(newTechs);

        // Mettre à jour l'affichage de recherche
        this.queueUpdate(() => {
            if (typeof completeViews !== 'undefined') {
                completeViews.updateResearchView();
            }
        });

        // Débloquer de nouveaux bâtiments/unités
        this.unlockContentByTechnology(newTechs);
    }

    // === VALIDATION ET COHÉRENCE ===

    setupValidationRules() {
        // Règles de validation pour les ressources
        this.validationRules.set('resources', (resources) => {
            const errors = [];
            
            Object.entries(resources).forEach(([resource, amount]) => {
                if (typeof amount !== 'number' || amount < 0) {
                    errors.push(`Ressource ${resource} invalide: ${amount}`);
                }
                if (amount > 999999) {
                    errors.push(`Ressource ${resource} trop élevée: ${amount}`);
                }
            });
            
            return errors;
        });

        // Règles de validation pour les bâtiments
        this.validationRules.set('buildings', (buildings) => {
            const errors = [];
            
            Object.entries(buildings).forEach(([buildingType, buildingData]) => {
                if (!BUILDINGS_CONFIG[buildingType]) {
                    errors.push(`Type de bâtiment inconnu: ${buildingType}`);
                }
                
                if (buildingData.level < 1 || buildingData.level > (BUILDINGS_CONFIG[buildingType]?.maxLevel || 10)) {
                    errors.push(`Niveau de bâtiment invalide pour ${buildingType}: ${buildingData.level}`);
                }
            });
            
            return errors;
        });

        // Règles de validation pour le joueur
        this.validationRules.set('player', (player) => {
            const errors = [];
            
            if (player.level < 1 || player.level > 20) {
                errors.push(`Niveau de joueur invalide: ${player.level}`);
            }
            
            if (player.xp < 0) {
                errors.push(`XP négative: ${player.xp}`);
            }
            
            return errors;
        });
    }

    validateGameState() {
        const errors = [];
        
        this.validationRules.forEach((validator, property) => {
            const value = gameState[property];
            if (value) {
                const propertyErrors = validator(value);
                errors.push(...propertyErrors);
            }
        });

        if (errors.length > 0) {
            console.warn('⚠️ Erreurs de validation détectées:', errors);
            this.fixGameStateErrors(errors);
        } else {
            console.log('✅ État du jeu validé avec succès');
        }

        return errors.length === 0;
    }

    fixGameStateErrors(errors) {
        errors.forEach(error => {
            console.log('🔧 Correction automatique:', error);
            
            // Corrections automatiques basiques
            if (error.includes('Ressource') && error.includes('invalide')) {
                const resource = error.match(/Ressource (\w+) invalide/)?.[1];
                if (resource && gameState.resources[resource] < 0) {
                    gameState.resources[resource] = 0;
                }
            }
            
            if (error.includes('XP négative')) {
                gameState.player.xp = 0;
            }
            
            if (error.includes('Niveau de joueur invalide')) {
                gameState.player.level = Math.max(1, Math.min(20, gameState.player.level));
            }
        });
    }

    // === CALCULS ET MISES À JOUR ===

    recalculateBuildingEffects() {
        // Recalculer la population maximale
        const forumLevel = gameState.buildings.forum?.level || 0;
        const newPopMax = 50 + (25 * forumLevel);
        
        if (gameState.provinces[0]) {
            gameState.provinces[0].populationMax = newPopMax;
        }

        // Recalculer la capacité de stockage
        const warehouseLevel = gameState.buildings.warehouse?.level || 0;
        const baseCapacity = 1000;
        const bonusCapacity = warehouseLevel * 500;
        
        Object.keys(gameState.resources).forEach(resource => {
            if (resource !== 'gold') { // L'or n'a pas de limite
                const capacity = baseCapacity + bonusCapacity;
                if (gameState.resources[resource] > capacity) {
                    gameState.resources[resource] = capacity;
                }
            }
        });

        // Recalculer le bonheur
        this.recalculateHappiness();
    }

    recalculateHappiness() {
        if (!gameState.provinces[0]) return;

        let happiness = 50; // Base
        
        // Bonus de la taverne
        if (gameState.buildings.tavern) {
            happiness += gameState.buildings.tavern.level * 10;
        }
        
        // Malus de surpopulation
        const popMax = gameState.provinces && gameState.provinces[0] ? gameState.provinces[0].populationMax || 50 : 50;
        const currentPop = gameState.provinces && gameState.provinces[0] ? gameState.provinces[0].population || 0 : 0;
        const populationRatio = currentPop / popMax;
        
        if (populationRatio > 0.9) {
            happiness -= (populationRatio - 0.9) * 100;
        }
        
        if (gameState.provinces && gameState.provinces[0]) {
            gameState.provinces[0].happiness = Math.max(0, Math.min(100, Math.round(happiness)));
        }
    }

    recalculateMilitaryPower() {
        const units = gameState.units;
        let totalPower = 0;
        
        totalPower += (units.velites || 0) * 1;
        totalPower += (units.hastati || 0) * 2;
        totalPower += (units.legionnaires || 0) * 3;
        
        gameState.militaryPower = totalPower;
    }

    validateStorageCapacity() {
        const warehouseLevel = gameState.buildings.warehouse?.level || 0;
        const capacity = 1000 + (warehouseLevel * 500);
        
        Object.entries(gameState.resources).forEach(([resource, amount]) => {
            if (resource !== 'gold' && amount > capacity) {
                gameState.resources[resource] = capacity;
                showNotification(`${resource} limité par la capacité de stockage !`, 'warning');
            }
        });
    }

    // === OBJECTIFS ET PROGRESSION ===

    checkResourceObjectives(resources) {
        // Vérifier l'objectif de 100 bois
        if (resources.wood >= 100 && typeof progression !== 'undefined') {
            progression.completeObjective('reach_100_wood');
        }
    }

    checkBuildingObjectives(buildings) {
        Object.keys(buildings).forEach(buildingType => {
            const objectiveId = `build_${buildingType}`;
            if (typeof progression !== 'undefined') {
                progression.completeObjective(objectiveId);
            }
        });
    }

    checkMilitaryObjectives(units) {
        const totalUnits = Object.values(units).reduce((sum, count) => sum + count, 0);
        
        if (totalUnits >= 10 && typeof progression !== 'undefined') {
            progression.completeObjective('recruit_10_units');
        }
    }

    unlockFeaturesByLevel(level) {
        if (typeof progression !== 'undefined') {
            const newFeatures = progression.featureUnlocks[level] || [];
            newFeatures.forEach(feature => {
                if (!gameState.progression.unlockedFeatures.includes(feature)) {
                    gameState.progression.unlockedFeatures.push(feature);
                    console.log(`🔓 Fonctionnalité débloquée: ${feature}`);
                }
            });
        }
    }

    updateAvailableObjectives(level) {
        if (typeof progression !== 'undefined') {
            const levelObjectives = progression.currentObjectives[level] || [];
            console.log(`🎯 Objectifs du niveau ${level}:`, levelObjectives);
        }
    }

    applyTechnologyEffects(technologies) {
        technologies.forEach(techId => {
            switch (techId) {
                case 'currency':
                    // Augmente les revenus de 15%
                    gameState.technologyBonuses = gameState.technologyBonuses || {};
                    gameState.technologyBonuses.goldBonus = 1.15;
                    break;
                    
                case 'iron_weapons':
                    // Améliore l'efficacité militaire
                    gameState.technologyBonuses = gameState.technologyBonuses || {};
                    gameState.technologyBonuses.militaryBonus = 1.10;
                    break;
                    
                case 'aqueducts':
                    // Augmente la population maximale
                    if (gameState.provinces[0]) {
                        gameState.provinces[0].populationMax += 50;
                    }
                    break;
            }
        });
    }

    unlockContentByTechnology(technologies) {
        technologies.forEach(techId => {
            switch (techId) {
                case 'siege_engines':
                    // Débloque les catapultes
                    if (!gameState.unlockedUnits) gameState.unlockedUnits = [];
                    if (!gameState.unlockedUnits.includes('catapult')) {
                        gameState.unlockedUnits.push('catapult');
                    }
                    break;
                    
                case 'arts':
                    // Débloque l'amphithéâtre
                    if (!gameState.unlockedBuildings) gameState.unlockedBuildings = [];
                    if (!gameState.unlockedBuildings.includes('amphitheater')) {
                        gameState.unlockedBuildings.push('amphitheater');
                    }
                    break;
            }
        });
    }

    updateButtonStates() {
        // Mettre à jour l'état des boutons selon les ressources
        document.querySelectorAll('.action-btn').forEach(button => {
            const action = button.getAttribute('data-action') || button.textContent.toLowerCase();
            
            // Exemple: désactiver les boutons de construction si pas assez de ressources
            if (action.includes('construire') || action.includes('améliorer')) {
                // Logique de vérification des ressources
                const hasResources = this.checkResourcesForAction(action);
                button.disabled = !hasResources;
                button.classList.toggle('disabled', !hasResources);
            }
        });
    }

    checkResourcesForAction(action) {
        // Vérification basique des ressources pour une action
        const minResources = {
            wood: 50,
            stone: 30,
            gold: 100
        };

        return Object.entries(minResources).every(([resource, min]) => {
            return gameState.resources[resource] >= min;
        });
    }

    // === SYSTÈME DE MISE À JOUR EN QUEUE ===

    queueUpdate(updateFunction) {
        this.updateQueue.push(updateFunction);
        this.processUpdateQueue();
    }

    processUpdateQueue() {
        if (this.isUpdating || this.updateQueue.length === 0) return;

        this.isUpdating = true;
        
        const update = this.updateQueue.shift();
        try {
            update();
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
        
        this.isUpdating = false;
        
        // Traiter le prochain élément de la queue
        if (this.updateQueue.length > 0) {
            setTimeout(() => this.processUpdateQueue(), 10);
        }
    }

    // === SAUVEGARDE AUTOMATIQUE ===

    setupAutoSave() {
        // Sauvegarder automatiquement toutes les 5 minutes
        setInterval(() => {
            this.autoSave();
        }, 5 * 60 * 1000);

        // Sauvegarder avant de quitter la page
        window.addEventListener('beforeunload', () => {
            this.autoSave();
        });
    }

    autoSave() {
        try {
            localStorage.setItem('imperium_autosave', JSON.stringify({
                gameState: gameState,
                timestamp: Date.now(),
                version: '1.0.0'
            }));
            console.log('💾 Sauvegarde automatique effectuée');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde automatique:', error);
        }
    }

    loadAutoSave() {
        try {
            const autoSave = localStorage.getItem('imperium_autosave');
            if (autoSave) {
                const saveData = JSON.parse(autoSave);
                Object.assign(gameState, saveData.gameState);
                console.log('📂 Sauvegarde automatique chargée');
                return true;
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la sauvegarde automatique:', error);
        }
        return false;
    }

    // === MÉTHODES PUBLIQUES ===

    forceDataSync() {
        this.checkDataChanges();
        this.validateGameState();
        this.recalculateBuildingEffects();
        showNotification('Synchronisation des données effectuée !', 'success');
    }

    getDataReport() {
        const report = {
            watchers: this.dataWatchers.size,
            updateQueue: this.updateQueue.length,
            validationRules: this.validationRules.size,
            gameStateValid: this.validateGameState(),
            lastAutoSave: localStorage.getItem('imperium_autosave') ? 'Disponible' : 'Aucune'
        };

        console.table(report);
        return report;
    }

    startDataMonitoring() {
        // Vérifier les changements toutes les secondes
        setInterval(() => {
            this.checkDataChanges();
        }, 1000);
        
        console.log('🔍 Surveillance des données démarrée');
    }
}

// Créer l'instance globale
const dataInterconnection = new ImperiumDataInterconnection();

// Démarrer la surveillance
dataInterconnection.startDataMonitoring();

// Export global
window.dataInterconnection = dataInterconnection;
window.ImperiumDataInterconnection = ImperiumDataInterconnection;

// Commandes de console pour le debug
window.syncData = () => dataInterconnection.forceDataSync();
window.dataReport = () => dataInterconnection.getDataReport();

console.log('🔗 Système d\'interconnexion des données chargé');
console.log('💡 Utilisez syncData() ou dataReport() dans la console pour diagnostiquer');