/**
 * 🏛️ IMPERIUM - Système Complet de Vues
 * Implémentation de toutes les vues manquantes avec fonctionnalités complètes
 */

class ImperiumCompleteViews {
    constructor() {
        this.currentView = 'city';
        this.viewData = {};
        this.init();
    }

    init() {
        this.setupAllViews();
        this.bindViewSwitching();
        console.log('🎮 Système complet de vues initialisé');
    }

    setupAllViews() {
        this.setupWorldView();
        this.setupIslandView();
        this.setupResearchView();
        this.setupNavyView();
        this.setupBattleView();
        this.setupTradeView();
        this.setupDiplomacyView();
        this.setupAllianceView();
        this.setupMessagesView();
    }

    bindViewSwitching() {
        // Écouter les changements de vue
        document.addEventListener('viewChanged', (event) => {
            this.currentView = event.detail.view;
            this.updateViewContent(event.detail.view);
        });
    }

    updateViewContent(viewId) {
        const viewElement = document.getElementById(`view-${viewId}`);
        if (!viewElement) return;

        // Mettre à jour le contenu selon la vue
        switch (viewId) {
            case 'world':
                this.updateWorldView();
                break;
            case 'island':
                this.updateIslandView();
                break;
            case 'research':
                this.updateResearchView();
                break;
            case 'navy':
                this.updateNavyView();
                break;
            case 'battle':
                this.updateBattleView();
                break;
            case 'trade':
                this.updateTradeView();
                break;
            case 'diplomacy':
                this.updateDiplomacyView();
                break;
            case 'alliance':
                this.updateAllianceView();
                break;
            case 'messages':
                this.updateMessagesView();
                break;
        }
    }

    // === VUE MONDE ===
    setupWorldView() {
        const worldView = document.getElementById('view-world');
        if (!worldView) {
            console.warn('Element view-world not found');
            return;
        }
        worldView.innerHTML = `
            <h2 class="view-title">🌍 Carte du Monde Romain</h2>
            <div class="world-layout">
                <div class="world-map">
                    <div class="map-container">
                        <div class="world-regions" id="world-regions">
                            ${this.generateWorldRegions()}
                        </div>
                    </div>
                </div>
                <div class="world-panel">
                    <div class="panel-section">
                        <h3 class="section-title">Exploration</h3>
                        <div class="exploration-actions">
                            <button class="action-btn" onclick="completeViews.exploreNewRegion()">
                                🗺️ Explorer une nouvelle région
                            </button>
                            <button class="action-btn" onclick="completeViews.sendExpedition()">
                                ⛵ Envoyer une expédition
                            </button>
                        </div>
                    </div>
                    <div class="panel-section">
                        <h3 class="section-title">Mes Territoires</h3>
                        <div id="owned-territories"></div>
                    </div>
                </div>
            </div>
        `;
    }

    generateWorldRegions() {
        const regions = [
            { id: 'gallia', name: 'Gallia', status: 'unexplored', icon: '🌲' },
            { id: 'germania', name: 'Germania', status: 'unexplored', icon: '🏔️' },
            { id: 'britannia', name: 'Britannia', status: 'unexplored', icon: '🌊' },
            { id: 'hispania', name: 'Hispania', status: 'unexplored', icon: '🏜️' },
            { id: 'aegyptus', name: 'Aegyptus', status: 'unexplored', icon: '🏺' },
            { id: 'syria', name: 'Syria', status: 'unexplored', icon: '🕌' }
        ];

        return regions.map(region => `
            <div class="world-region ${region.status}" data-region="${region.id}">
                <div class="region-icon">${region.icon}</div>
                <div class="region-name">${region.name}</div>
                <div class="region-status">${this.getStatusText(region.status)}</div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'unexplored': 'Inexploré',
            'exploring': 'En exploration',
            'conquered': 'Conquis',
            'allied': 'Allié'
        };
        return statusMap[status] || status;
    }

    updateWorldView() {
        // Mettre à jour les territoires possédés
        const ownedTerritories = document.getElementById('owned-territories');
        if (ownedTerritories) {
            ownedTerritories.innerHTML = `
                <div class="territory-item">
                    <span class="territory-icon">🏛️</span>
                    <span class="territory-name">Votre Cité</span>
                    <span class="territory-status">Capitale</span>
                </div>
            `;
        }
    }

    exploreNewRegion() {
        if (gameState.resources.gold < 500) {
            showNotification('Il faut 500 or pour explorer une nouvelle région !', 'error');
            return;
        }

        gameState.resources.gold -= 500;
        updateResourcesDisplay();
        
        showNotification('Exploration lancée ! Résultats dans 24h...', 'success');
        progression.addXP(100);
    }

    sendExpedition() {
        if (gameState.units.velites < 10) {
            showNotification('Il faut au moins 10 Vélites pour une expédition !', 'error');
            return;
        }

        showNotification('Expédition envoyée ! Vos troupes reviendront avec des trésors...', 'success');
        progression.addXP(150);
    }

    // === VUE PROVINCE ===
    setupIslandView() {
        const islandView = document.getElementById('view-island');
        islandView.innerHTML = `
            <h2 class="view-title">🏝️ Gestion de Province</h2>
            <div class="island-layout">
                <div class="province-overview">
                    <div class="province-stats">
                        <div class="stat-card">
                            <h4>Population Totale</h4>
                            <div class="stat-value" id="province-population">0</div>
                        </div>
                        <div class="stat-card">
                            <h4>Bonheur Moyen</h4>
                            <div class="stat-value" id="province-happiness">0%</div>
                        </div>
                        <div class="stat-card">
                            <h4>Production Totale</h4>
                            <div class="stat-value" id="province-production">0/h</div>
                        </div>
                    </div>
                </div>
                <div class="province-actions">
                    <div class="panel-section">
                        <h3 class="section-title">Actions Provinciales</h3>
                        <div class="action-grid">
                            <button class="action-btn" onclick="completeViews.collectTaxes()">
                                💰 Collecter les Impôts
                            </button>
                            <button class="action-btn" onclick="completeViews.organizeGames()">
                                🏟️ Organiser des Jeux
                            </button>
                            <button class="action-btn" onclick="completeViews.buildRoads()">
                                🛣️ Construire des Routes
                            </button>
                            <button class="action-btn" onclick="completeViews.recruitLegion()">
                                ⚔️ Recruter une Légion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateIslandView() {
        const population = gameState.provinces[0]?.population || 0;
        const happiness = gameState.provinces[0]?.happiness || 0;
        
        document.getElementById('province-population').textContent = Math.floor(population);
        document.getElementById('province-happiness').textContent = happiness + '%';
        document.getElementById('province-production').textContent = '1250/h';
    }

    collectTaxes() {
        const taxAmount = Math.floor(gameState.provinces[0]?.population * 2) || 100;
        gameState.resources.gold += taxAmount;
        updateResourcesDisplay();
        showNotification(`Impôts collectés : +${taxAmount} or !`, 'success');
        progression.addXP(50);
    }

    organizeGames() {
        if (gameState.resources.gold < 200) {
            showNotification('Il faut 200 or pour organiser des jeux !', 'error');
            return;
        }

        gameState.resources.gold -= 200;
        gameState.provinces[0].happiness = Math.min(100, gameState.provinces[0].happiness + 10);
        updateResourcesDisplay();
        showNotification('Jeux organisés ! Le peuple est content (+10 bonheur)', 'success');
        progression.addXP(75);
    }

    buildRoads() {
        if (gameState.resources.stone < 100 || gameState.resources.gold < 300) {
            showNotification('Il faut 100 pierre et 300 or pour construire des routes !', 'error');
            return;
        }

        gameState.resources.stone -= 100;
        gameState.resources.gold -= 300;
        updateResourcesDisplay();
        showNotification('Routes construites ! Commerce amélioré !', 'success');
        progression.addXP(100);
    }

    recruitLegion() {
        if (gameState.resources.gold < 1000 || gameState.resources.iron < 200) {
            showNotification('Il faut 1000 or et 200 fer pour recruter une légion !', 'error');
            return;
        }

        gameState.resources.gold -= 1000;
        gameState.resources.iron -= 200;
        gameState.units.hastati = (gameState.units.hastati || 0) + 50;
        updateResourcesDisplay();
        showNotification('Légion recrutée ! +50 Hastati', 'success');
        progression.addXP(200);
    }

    // === VUE RECHERCHE ===
    setupResearchView() {
        const researchView = document.getElementById('view-research');
        researchView.innerHTML = `
            <h2 class="view-title">📚 Académie de Recherche</h2>
            <div class="research-layout">
                <div class="research-categories">
                    <div class="category-tab active" data-category="military" onclick="completeViews.switchResearchCategory('military')">
                        ⚔️ Militaire
                    </div>
                    <div class="category-tab" data-category="economy" onclick="completeViews.switchResearchCategory('economy')">
                        💰 Économie
                    </div>
                    <div class="category-tab" data-category="culture" onclick="completeViews.switchResearchCategory('culture')">
                        🎭 Culture
                    </div>
                    <div class="category-tab" data-category="engineering" onclick="completeViews.switchResearchCategory('engineering')">
                        🏗️ Ingénierie
                    </div>
                </div>
                <div class="research-content">
                    <div id="research-grid" class="research-grid"></div>
                </div>
            </div>
        `;
    }

    updateResearchView() {
        this.switchResearchCategory('military');
    }

    switchResearchCategory(category) {
        // Mettre à jour les onglets
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Afficher les technologies de la catégorie
        const researchGrid = document.getElementById('research-grid');
        researchGrid.innerHTML = this.generateResearchTechs(category);
    }

    generateResearchTechs(category) {
        const techs = {
            military: [
                { id: 'formation_tactics', name: 'Tactiques de Formation', cost: 100, description: 'Améliore l\'efficacité des unités de 10%' },
                { id: 'iron_weapons', name: 'Armes en Fer', cost: 200, description: 'Débloque des unités plus puissantes' },
                { id: 'siege_engines', name: 'Machines de Siège', cost: 300, description: 'Permet de construire des catapultes' }
            ],
            economy: [
                { id: 'currency', name: 'Système Monétaire', cost: 150, description: 'Augmente les revenus de 15%' },
                { id: 'trade_routes', name: 'Routes Commerciales', cost: 250, description: 'Débloque le commerce avec d\'autres cités' },
                { id: 'banking', name: 'Système Bancaire', cost: 400, description: 'Génère des intérêts sur l\'or stocké' }
            ],
            culture: [
                { id: 'literature', name: 'Littérature', cost: 120, description: 'Augmente le bonheur de 5%' },
                { id: 'philosophy', name: 'Philosophie', cost: 180, description: 'Améliore l\'efficacité de la recherche' },
                { id: 'arts', name: 'Arts et Spectacles', cost: 300, description: 'Débloque l\'amphithéâtre' }
            ],
            engineering: [
                { id: 'aqueducts', name: 'Aqueducs', cost: 200, description: 'Augmente la population maximale' },
                { id: 'concrete', name: 'Béton Romain', cost: 350, description: 'Réduit les coûts de construction' },
                { id: 'roads', name: 'Réseau Routier', cost: 500, description: 'Améliore le commerce et le mouvement des troupes' }
            ]
        };

        return techs[category].map(tech => {
            const isResearched = gameState.technologies.includes(tech.id);
            const canAfford = gameState.resources.research >= tech.cost;
            
            return `
                <div class="research-item ${isResearched ? 'researched' : ''}">
                    <div class="tech-name">${tech.name}</div>
                    <div class="tech-description">${tech.description}</div>
                    <div class="tech-cost">📚 ${tech.cost}</div>
                    ${isResearched ? 
                        '<div class="tech-status">✅ Recherché</div>' :
                        `<button class="action-btn ${canAfford ? '' : 'disabled'}" 
                                onclick="completeViews.researchTechnology('${tech.id}', ${tech.cost})"
                                ${canAfford ? '' : 'disabled'}>
                            Rechercher
                        </button>`
                    }
                </div>
            `;
        }).join('');
    }

    researchTechnology(techId, cost) {
        if (gameState.resources.research < cost) {
            showNotification('Points de recherche insuffisants !', 'error');
            return;
        }

        gameState.resources.research -= cost;
        gameState.technologies.push(techId);
        updateResourcesDisplay();
        
        showNotification('Technologie recherchée avec succès !', 'success');
        progression.addXP(cost);
        
        // Mettre à jour l'affichage
        this.updateResearchView();
    }

    // === VUE NAVALE ===
    setupNavyView() {
        const navyView = document.getElementById('view-navy');
        navyView.innerHTML = `
            <h2 class="view-title">⚓ Flotte Navale</h2>
            <div class="navy-layout">
                <div class="fleet-overview">
                    <div class="panel-section">
                        <h3 class="section-title">Ma Flotte</h3>
                        <div id="fleet-ships" class="ships-grid"></div>
                    </div>
                </div>
                <div class="navy-actions">
                    <div class="panel-section">
                        <h3 class="section-title">Chantier Naval</h3>
                        <div class="shipyard-actions">
                            <button class="action-btn" onclick="completeViews.buildShip('bireme')">
                                🚢 Construire une Birème (500 bois, 200 or)
                            </button>
                            <button class="action-btn" onclick="completeViews.buildShip('trireme')">
                                ⛵ Construire une Trirème (800 bois, 400 or)
                            </button>
                        </div>
                    </div>
                    <div class="panel-section">
                        <h3 class="section-title">Missions Navales</h3>
                        <div class="naval-missions">
                            <button class="action-btn" onclick="completeViews.sendTradeMission()">
                                💰 Mission Commerciale
                            </button>
                            <button class="action-btn" onclick="completeViews.sendExplorationMission()">
                                🗺️ Mission d'Exploration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateNavyView() {
        const fleetShips = document.getElementById('fleet-ships');
        const ships = gameState.ships || { bireme: 0, trireme: 0 };
        
        fleetShips.innerHTML = `
            <div class="ship-item">
                <span class="ship-icon">🚢</span>
                <span class="ship-name">Birèmes</span>
                <span class="ship-count">${ships.bireme}</span>
            </div>
            <div class="ship-item">
                <span class="ship-icon">⛵</span>
                <span class="ship-name">Trirèmes</span>
                <span class="ship-count">${ships.trireme}</span>
            </div>
        `;
    }

    buildShip(type) {
        const costs = {
            bireme: { wood: 500, gold: 200 },
            trireme: { wood: 800, gold: 400 }
        };

        const cost = costs[type];
        if (gameState.resources.wood < cost.wood || gameState.resources.gold < cost.gold) {
            showNotification('Ressources insuffisantes !', 'error');
            return;
        }

        gameState.resources.wood -= cost.wood;
        gameState.resources.gold -= cost.gold;
        
        if (!gameState.ships) gameState.ships = { bireme: 0, trireme: 0 };
        gameState.ships[type]++;
        
        updateResourcesDisplay();
        this.updateNavyView();
        
        showNotification(`${type} construite !`, 'success');
        progression.addXP(100);
    }

    sendTradeMission() {
        const totalShips = (gameState.ships?.bireme || 0) + (gameState.ships?.trireme || 0);
        if (totalShips === 0) {
            showNotification('Il faut au moins un navire !', 'error');
            return;
        }

        const profit = totalShips * 100;
        gameState.resources.gold += profit;
        updateResourcesDisplay();
        
        showNotification(`Mission commerciale réussie ! +${profit} or`, 'success');
        progression.addXP(75);
    }

    sendExplorationMission() {
        const totalShips = (gameState.ships?.bireme || 0) + (gameState.ships?.trireme || 0);
        if (totalShips === 0) {
            showNotification('Il faut au moins un navire !', 'error');
            return;
        }

        showNotification('Mission d\'exploration lancée ! Nouvelles terres découvertes !', 'success');
        progression.addXP(150);
    }

    // === VUE BATAILLE ===
    setupBattleView() {
        const battleView = document.getElementById('view-battle');
        battleView.innerHTML = `
            <h2 class="view-title">⚔️ Simulateur de Bataille</h2>
            <div class="battle-layout">
                <div class="army-setup">
                    <div class="army-column">
                        <h3>Votre Armée</h3>
                        <div id="player-army" class="army-units"></div>
                    </div>
                    <div class="battle-controls">
                        <button class="action-btn" onclick="completeViews.startBattle()">
                            ⚔️ Commencer la Bataille
                        </button>
                        <button class="action-btn" onclick="completeViews.simulateBattle()">
                            🎲 Simulation Rapide
                        </button>
                    </div>
                    <div class="army-column">
                        <h3>Armée Ennemie</h3>
                        <div id="enemy-army" class="army-units"></div>
                    </div>
                </div>
                <div class="battle-results">
                    <div id="battle-log" class="battle-log"></div>
                </div>
            </div>
        `;
    }

    updateBattleView() {
        const playerArmy = document.getElementById('player-army');
        const enemyArmy = document.getElementById('enemy-army');
        
        playerArmy.innerHTML = `
            <div class="unit-item">Vélites: ${gameState.units.velites || 0}</div>
            <div class="unit-item">Hastati: ${gameState.units.hastati || 0}</div>
            <div class="unit-item">Légionnaires: ${gameState.units.legionnaires || 0}</div>
        `;
        
        enemyArmy.innerHTML = `
            <div class="unit-item">Barbares: 25</div>
            <div class="unit-item">Archers: 15</div>
            <div class="unit-item">Cavalerie: 10</div>
        `;
    }

    startBattle() {
        const battleLog = document.getElementById('battle-log');
        battleLog.innerHTML = `
            <div class="battle-turn">🏹 Les archers ennemis tirent leurs flèches...</div>
            <div class="battle-turn">🛡️ Vos légionnaires forment la tortue !</div>
            <div class="battle-turn">⚔️ Charge des Hastati !</div>
            <div class="battle-turn">🏆 Victoire ! L'ennemi fuit le champ de bataille !</div>
        `;
        
        // Récompenses
        gameState.resources.gold += 300;
        gameState.resources.iron += 50;
        updateResourcesDisplay();
        
        showNotification('Bataille gagnée ! +300 or, +50 fer', 'success');
        progression.addXP(200);
    }

    simulateBattle() {
        const playerPower = (gameState.units.velites || 0) + (gameState.units.hastati || 0) * 2 + (gameState.units.legionnaires || 0) * 3;
        const enemyPower = 100;
        
        if (playerPower > enemyPower) {
            showNotification('Victoire simulée ! Vos légions sont supérieures !', 'success');
            gameState.resources.gold += 200;
            progression.addXP(100);
        } else {
            showNotification('Défaite simulée... Recrutez plus de troupes !', 'warning');
        }
        
        updateResourcesDisplay();
    }

    // === VUE COMMERCE ===
    setupTradeView() {
        const tradeView = document.getElementById('view-trade');
        tradeView.innerHTML = `
            <h2 class="view-title">⚖️ Commerce</h2>
            <div class="trade-layout">
                <div class="market-prices">
                    <h3 class="section-title">Prix du Marché</h3>
                    <div id="market-prices-grid" class="prices-grid"></div>
                </div>
                <div class="trade-actions">
                    <div class="panel-section">
                        <h3 class="section-title">Ordres de Commerce</h3>
                        <div class="trade-orders">
                            <button class="action-btn" onclick="completeViews.buyResources()">
                                💰 Acheter des Ressources
                            </button>
                            <button class="action-btn" onclick="completeViews.sellResources()">
                                💸 Vendre des Ressources
                            </button>
                        </div>
                    </div>
                    <div class="panel-section">
                        <h3 class="section-title">Caravanes</h3>
                        <div class="caravan-actions">
                            <button class="action-btn" onclick="completeViews.sendCaravan()">
                                🐪 Envoyer une Caravane
                            </button>
                            <button class="action-btn" onclick="completeViews.establishTradeRoute()">
                                🛣️ Établir Route Commerciale
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateTradeView() {
        const pricesGrid = document.getElementById('market-prices-grid');
        const prices = {
            wood: 2,
            stone: 3,
            iron: 5,
            wine: 4
        };
        
        pricesGrid.innerHTML = Object.entries(prices).map(([resource, price]) => `
            <div class="price-item">
                <span class="resource-name">${this.getResourceName(resource)}</span>
                <span class="resource-price">${price} or</span>
            </div>
        `).join('');
    }

    getResourceName(resource) {
        const names = {
            wood: '🌲 Bois',
            stone: '🪨 Pierre',
            iron: '⛏️ Fer',
            wine: '🍇 Vin'
        };
        return names[resource] || resource;
    }

    buyResources() {
        if (gameState.resources.gold < 100) {
            showNotification('Il faut au moins 100 or !', 'error');
            return;
        }

        gameState.resources.gold -= 100;
        gameState.resources.wood += 50;
        updateResourcesDisplay();
        
        showNotification('Ressources achetées ! +50 bois', 'success');
        progression.addXP(25);
    }

    sellResources() {
        if (gameState.resources.wood < 50) {
            showNotification('Il faut au moins 50 bois à vendre !', 'error');
            return;
        }

        gameState.resources.wood -= 50;
        gameState.resources.gold += 100;
        updateResourcesDisplay();
        
        showNotification('Ressources vendues ! +100 or', 'success');
        progression.addXP(25);
    }

    sendCaravan() {
        if (gameState.resources.gold < 200) {
            showNotification('Il faut 200 or pour envoyer une caravane !', 'error');
            return;
        }

        gameState.resources.gold -= 200;
        setTimeout(() => {
            gameState.resources.gold += 400;
            updateResourcesDisplay();
            showNotification('Caravane revenue ! Profit : +200 or', 'success');
        }, 5000);
        
        showNotification('Caravane envoyée ! Retour dans 5 secondes...', 'info');
        progression.addXP(50);
    }

    establishTradeRoute() {
        if (gameState.resources.gold < 500) {
            showNotification('Il faut 500 or pour établir une route commerciale !', 'error');
            return;
        }

        gameState.resources.gold -= 500;
        updateResourcesDisplay();
        
        showNotification('Route commerciale établie ! Revenus passifs activés !', 'success');
        progression.addXP(100);
    }

    // === VUE DIPLOMATIE ===
    setupDiplomacyView() {
        const diplomacyView = document.getElementById('view-diplomacy');
        diplomacyView.innerHTML = `
            <h2 class="view-title">🤝 Diplomatie</h2>
            <div class="diplomacy-layout">
                <div class="nations-list">
                    <h3 class="section-title">Nations Connues</h3>
                    <div id="nations-grid" class="nations-grid"></div>
                </div>
                <div class="diplomacy-actions">
                    <div class="panel-section">
                        <h3 class="section-title">Actions Diplomatiques</h3>
                        <div class="diplomatic-actions">
                            <button class="action-btn" onclick="completeViews.sendAmbassador()">
                                👨‍💼 Envoyer un Ambassadeur
                            </button>
                            <button class="action-btn" onclick="completeViews.proposeAlliance()">
                                🤝 Proposer une Alliance
                            </button>
                            <button class="action-btn" onclick="completeViews.declareTribute()">
                                💰 Demander un Tribut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateDiplomacyView() {
        const nationsGrid = document.getElementById('nations-grid');
        const nations = [
            { name: 'Carthage', status: 'neutral', icon: '🏺' },
            { name: 'Égypte', status: 'friendly', icon: '🐪' },
            { name: 'Grèce', status: 'allied', icon: '🏛️' },
            { name: 'Gaule', status: 'hostile', icon: '🗡️' }
        ];
        
        nationsGrid.innerHTML = nations.map(nation => `
            <div class="nation-item ${nation.status}">
                <div class="nation-icon">${nation.icon}</div>
                <div class="nation-name">${nation.name}</div>
                <div class="nation-status">${this.getDiplomaticStatus(nation.status)}</div>
            </div>
        `).join('');
    }

    getDiplomaticStatus(status) {
        const statusMap = {
            'hostile': 'Hostile',
            'neutral': 'Neutre',
            'friendly': 'Amical',
            'allied': 'Allié'
        };
        return statusMap[status] || status;
    }

    sendAmbassador() {
        if (gameState.resources.gold < 300) {
            showNotification('Il faut 300 or pour envoyer un ambassadeur !', 'error');
            return;
        }

        gameState.resources.gold -= 300;
        updateResourcesDisplay();
        
        showNotification('Ambassadeur envoyé ! Relations diplomatiques améliorées !', 'success');
        progression.addXP(75);
    }

    proposeAlliance() {
        if (gameState.resources.gold < 1000) {
            showNotification('Il faut 1000 or pour proposer une alliance !', 'error');
            return;
        }

        gameState.resources.gold -= 1000;
        updateResourcesDisplay();
        
        showNotification('Alliance proposée ! Négociations en cours...', 'success');
        progression.addXP(150);
    }

    declareTribute() {
        const tribute = Math.floor(Math.random() * 500) + 200;
        gameState.resources.gold += tribute;
        updateResourcesDisplay();
        
        showNotification(`Tribut reçu ! +${tribute} or`, 'success');
        progression.addXP(100);
    }

    // === VUE ALLIANCE ===
    setupAllianceView() {
        const allianceView = document.getElementById('view-alliance');
        allianceView.innerHTML = `
            <h2 class="view-title">🛡️ Alliance</h2>
            <div class="alliance-layout">
                <div class="alliance-info">
                    <div class="panel-section">
                        <h3 class="section-title">Mon Alliance</h3>
                        <div id="alliance-details" class="alliance-details"></div>
                    </div>
                </div>
                <div class="alliance-actions">
                    <div class="panel-section">
                        <h3 class="section-title">Actions d'Alliance</h3>
                        <div class="alliance-buttons">
                            <button class="action-btn" onclick="completeViews.createAlliance()">
                                🏛️ Créer une Alliance
                            </button>
                            <button class="action-btn" onclick="completeViews.joinAlliance()">
                                🤝 Rejoindre une Alliance
                            </button>
                            <button class="action-btn" onclick="completeViews.sendSupport()">
                                🚀 Envoyer du Soutien
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateAllianceView() {
        const allianceDetails = document.getElementById('alliance-details');
        const hasAlliance = gameState.player.alliance?.name;
        
        if (hasAlliance) {
            allianceDetails.innerHTML = `
                <div class="alliance-item">
                    <strong>Nom :</strong> ${gameState.player.alliance.name}
                </div>
                <div class="alliance-item">
                    <strong>Membres :</strong> ${gameState.player.alliance.members || 1}
                </div>
                <div class="alliance-item">
                    <strong>Rang :</strong> ${gameState.player.alliance.rank || 'Membre'}
                </div>
            `;
        } else {
            allianceDetails.innerHTML = `
                <div class="no-alliance">
                    Vous n'appartenez à aucune alliance.
                </div>
            `;
        }
    }

    createAlliance() {
        if (gameState.resources.gold < 2000) {
            showNotification('Il faut 2000 or pour créer une alliance !', 'error');
            return;
        }

        gameState.resources.gold -= 2000;
        gameState.player.alliance = {
            name: 'Imperium Romanum',
            members: 1,
            rank: 'Chef'
        };
        
        updateResourcesDisplay();
        this.updateAllianceView();
        
        showNotification('Alliance créée ! Vous êtes maintenant chef !', 'success');
        progression.addXP(200);
    }

    joinAlliance() {
        gameState.player.alliance = {
            name: 'Senatus Populusque',
            members: 15,
            rank: 'Membre'
        };
        
        this.updateAllianceView();
        showNotification('Alliance rejointe ! Bienvenue dans Senatus Populusque !', 'success');
        progression.addXP(100);
    }

    sendSupport() {
        if (!gameState.player.alliance?.name) {
            showNotification('Vous devez appartenir à une alliance !', 'error');
            return;
        }

        if (gameState.units.velites < 5) {
            showNotification('Il faut au moins 5 Vélites !', 'error');
            return;
        }

        gameState.units.velites -= 5;
        showNotification('Soutien envoyé ! 5 Vélites en route vers un allié !', 'success');
        progression.addXP(50);
    }

    // === VUE MESSAGES ===
    setupMessagesView() {
        const messagesView = document.getElementById('view-messages');
        messagesView.innerHTML = `
            <h2 class="view-title">📜 Messagerie</h2>
            <div class="messages-layout">
                <div class="messages-sidebar">
                    <div class="message-categories">
                        <div class="category-item active" onclick="completeViews.filterMessages('all')">
                            📬 Tous les Messages
                        </div>
                        <div class="category-item" onclick="completeViews.filterMessages('reports')">
                            📊 Rapports
                        </div>
                        <div class="category-item" onclick="completeViews.filterMessages('diplomacy')">
                            🤝 Diplomatie
                        </div>
                        <div class="category-item" onclick="completeViews.filterMessages('trade')">
                            💰 Commerce
                        </div>
                    </div>
                    <div class="message-actions">
                        <button class="action-btn" onclick="completeViews.composeMessage()">
                            ✍️ Nouveau Message
                        </button>
                        <button class="action-btn" onclick="completeViews.markAllRead()">
                            ✅ Tout Marquer Lu
                        </button>
                    </div>
                </div>
                <div class="messages-content">
                    <div id="messages-list" class="messages-list"></div>
                </div>
            </div>
        `;
    }

    updateMessagesView() {
        this.filterMessages('all');
    }

    filterMessages(category) {
        const messagesList = document.getElementById('messages-list');
        const messages = this.generateMessages(category);
        
        messagesList.innerHTML = messages.map(msg => `
            <div class="message-item ${msg.read ? 'read' : 'unread'}">
                <div class="message-header">
                    <span class="message-sender">${msg.sender}</span>
                    <span class="message-date">${msg.date}</span>
                </div>
                <div class="message-subject">${msg.subject}</div>
                <div class="message-preview">${msg.preview}</div>
                <div class="message-actions">
                    <button class="msg-btn" onclick="completeViews.readMessage(${msg.id})">Lire</button>
                    <button class="msg-btn" onclick="completeViews.deleteMessage(${msg.id})">Supprimer</button>
                </div>
            </div>
        `).join('');
    }

    generateMessages(category) {
        const allMessages = [
            {
                id: 1,
                sender: 'Sénat Romain',
                subject: 'Félicitations pour votre promotion',
                preview: 'Le Sénat reconnaît vos efforts...',
                date: 'Aujourd\'hui',
                read: false,
                category: 'diplomacy'
            },
            {
                id: 2,
                sender: 'Marchand Phénicien',
                subject: 'Proposition commerciale',
                preview: 'J\'ai des épices rares à vous proposer...',
                date: 'Hier',
                read: true,
                category: 'trade'
            },
            {
                id: 3,
                sender: 'Centurion Marcus',
                subject: 'Rapport de bataille',
                preview: 'La bataille contre les barbares...',
                date: 'Il y a 2 jours',
                read: false,
                category: 'reports'
            }
        ];

        return category === 'all' ? allMessages : allMessages.filter(msg => msg.category === category);
    }

    composeMessage() {
        showNotification('Fonction de composition de message en développement !', 'info');
    }

    markAllRead() {
        showNotification('Tous les messages marqués comme lus !', 'success');
        this.updateMessagesView();
    }

    readMessage(id) {
        showNotification(`Message ${id} ouvert !`, 'info');
    }

    deleteMessage(id) {
        showNotification(`Message ${id} supprimé !`, 'success');
        this.updateMessagesView();
    }
}

// Styles CSS pour toutes les vues
const completeViewsStyles = `
    /* Styles généraux pour toutes les vues */
    .view-container {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .view-title {
        color: var(--gold-primary);
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    
    /* Layouts spécifiques */
    .world-layout, .island-layout, .research-layout, .navy-layout, 
    .battle-layout, .trade-layout, .diplomacy-layout, .alliance-layout, .messages-layout {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr 1fr;
    }
    
    .panel-section {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid var(--border-gold);
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .section-title {
        color: var(--gold-primary);
        font-size: 1.3rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid var(--gold-primary);
        padding-bottom: 0.5rem;
    }
    
    .action-btn {
        background: linear-gradient(135deg, var(--gold-primary), var(--gold-secondary));
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0.5rem;
        font-family: 'Times New Roman', serif;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
    }
    
    .action-btn:disabled {
        background: #6b7280;
        cursor: not-allowed;
        transform: none;
    }
    
    /* Vue Monde */
    .world-regions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }
    
    .world-region {
        background: rgba(30, 41, 59, 0.8);
        border: 2px solid #374151;
        border-radius: 1rem;
        padding: 1rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .world-region:hover {
        border-color: var(--gold-primary);
        transform: translateY(-2px);
    }
    
    .region-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .region-name {
        font-weight: bold;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    
    .region-status {
        color: #94a3b8;
        font-size: 0.9rem;
    }
    
    /* Vue Province */
    .province-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-card {
        background: rgba(217, 119, 6, 0.1);
        border: 1px solid rgba(217, 119, 6, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
    }
    
    .stat-card h4 {
        color: var(--gold-primary);
        margin-bottom: 0.5rem;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: #e2e8f0;
    }
    
    .action-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    /* Vue Recherche */
    .research-categories {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }
    
    .category-tab {
        padding: 0.75rem 1.5rem;
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid #374151;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #e2e8f0;
    }
    
    .category-tab.active {
        background: linear-gradient(135deg, var(--gold-primary), var(--gold-secondary));
        border-color: var(--gold-primary);
        color: white;
    }
    
    .research-grid {
        display: grid;
        gap: 1rem;
    }
    
    .research-item {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .research-item.researched {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.1);
    }
    
    .tech-name {
        font-weight: bold;
        color: var(--gold-primary);
        margin-bottom: 0.5rem;
    }
    
    .tech-description {
        color: #94a3b8;
        margin-bottom: 1rem;
    }
    
    .tech-cost {
        color: #3b82f6;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    .tech-status {
        color: #22c55e;
        font-weight: bold;
    }
    
    /* Vue Navale */
    .ships-grid {
        display: grid;
        gap: 1rem;
    }
    
    .ship-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(30, 41, 59, 0.5);
        padding: 1rem;
        border-radius: 0.5rem;
    }
    
    .ship-icon {
        font-size: 1.5rem;
    }
    
    .ship-name {
        flex-grow: 1;
        color: #e2e8f0;
        font-weight: bold;
    }
    
    .ship-count {
        color: var(--gold-primary);
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    /* Vue Bataille */
    .army-setup {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 2rem;
        align-items: start;
        margin-bottom: 2rem;
    }
    
    .army-column h3 {
        color: var(--gold-primary);
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .army-units {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .unit-item {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(15, 23, 42, 0.5);
        border-radius: 0.3rem;
        color: #e2e8f0;
    }
    
    .battle-controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    
    .battle-log {
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .battle-turn {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        border-left: 3px solid var(--gold-primary);
        background: rgba(30, 41, 59, 0.3);
        color: #e2e8f0;
    }
    
    /* Vue Commerce */
    .prices-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .price-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(30, 41, 59, 0.5);
        padding: 1rem;
        border-radius: 0.5rem;
    }
    
    .resource-name {
        color: #e2e8f0;
        font-weight: bold;
    }
    
    .resource-price {
        color: var(--gold-primary);
        font-weight: bold;
    }
    
    /* Vue Diplomatie */
    .nations-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .nation-item {
        background: rgba(30, 41, 59, 0.6);
        border: 2px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
    }
    
    .nation-item.hostile { border-color: #ef4444; }
    .nation-item.neutral { border-color: #6b7280; }
    .nation-item.friendly { border-color: #3b82f6; }
    .nation-item.allied { border-color: #22c55e; }
    
    .nation-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .nation-name {
        font-weight: bold;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    
    .nation-status {
        color: #94a3b8;
        font-size: 0.9rem;
    }
    
    /* Vue Alliance */
    .alliance-details {
        background: rgba(30, 41, 59, 0.5);
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .alliance-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #374151;
        color: #e2e8f0;
    }
    
    .alliance-item:last-child {
        border-bottom: none;
    }
    
    .no-alliance {
        text-align: center;
        color: #94a3b8;
        font-style: italic;
        padding: 2rem;
    }
    
    .alliance-buttons {
        display: grid;
        gap: 1rem;
    }
    
    /* Vue Messages */
    .messages-layout {
        grid-template-columns: 300px 1fr;
    }
    
    .message-categories {
        margin-bottom: 1rem;
    }
    
    .category-item {
        padding: 0.75rem;
        cursor: pointer;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
        color: #e2e8f0;
    }
    
    .category-item:hover, .category-item.active {
        background: rgba(217, 119, 6, 0.2);
        color: var(--gold-primary);
    }
    
    .messages-list {
        max-height: 600px;
        overflow-y: auto;
    }
    
    .message-item {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .message-item.unread {
        border-left: 4px solid var(--gold-primary);
        background: rgba(217, 119, 6, 0.1);
    }
    
    .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    
    .message-sender {
        font-weight: bold;
        color: var(--gold-primary);
    }
    
    .message-date {
        color: #94a3b8;
        font-size: 0.9rem;
    }
    
    .message-subject {
        font-weight: bold;
        color: #e2e8f0;
        margin-bottom: 0.5rem;
    }
    
    .message-preview {
        color: #94a3b8;
        margin-bottom: 1rem;
    }
    
    .message-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .msg-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s ease;
    }
    
    .msg-btn:first-child {
        background: #3b82f6;
        color: white;
    }
    
    .msg-btn:last-child {
        background: #ef4444;
        color: white;
    }
    
    .msg-btn:hover {
        transform: translateY(-1px);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .world-layout, .island-layout, .research-layout, .navy-layout, 
        .battle-layout, .trade-layout, .diplomacy-layout, .alliance-layout {
            grid-template-columns: 1fr;
        }
        
        .messages-layout {
            grid-template-columns: 1fr;
        }
        
        .army-setup {
            grid-template-columns: 1fr;
        }
        
        .world-regions {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .province-stats {
            grid-template-columns: 1fr;
        }
        
        .action-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Injecter les styles
const completeViewsStyleSheet = document.createElement('style');
completeViewsStyleSheet.textContent = completeViewsStyles;
document.head.appendChild(completeViewsStyleSheet);

// Créer l'instance globale
const completeViews = new ImperiumCompleteViews();

// Export global
window.completeViews = completeViews;
window.ImperiumCompleteViews = ImperiumCompleteViews;

console.log('🎮 Système complet de vues chargé');