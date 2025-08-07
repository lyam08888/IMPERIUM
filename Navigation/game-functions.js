/**
 * 🏛️ IMPERIUM - Fonctions de Jeu Complètes
 * Toutes les fonctions nécessaires pour les boutons et interactions
 */

// ===== ÉTAT GLOBAL DU JEU =====
let gameState = {
    player: {
        name: 'Marcus Aurelius',
        level: 1,
        xp: 0,
        title: 'Citoyen',
        tutorialCompleted: false,
        currentTutorialStep: 0
    },
    resources: {
        wood: 100,
        stone: 50,
        iron: 25,
        wine: 10,
        gold: 200,
        research: 0
    },
    buildings: {},
    technologies: [],
    units: {},
    messages: [],
    gameStarted: Date.now(),
    lastSave: null,
    progression: {
        unlockedFeatures: ['city'],
        completedTasks: [],
        currentObjectives: ['build_forum']
    }
};

// ===== FONCTIONS DE MESSAGERIE =====
function creerNouveauMessage() {
    console.log('📝 Création d\'un nouveau message');
    
    const messageModal = document.createElement('div');
    messageModal.className = 'modal-overlay';
    messageModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Nouveau Message</h3>
            <div class="modal-body">
                <div class="form-group">
                    <label>Destinataire:</label>
                    <input type="text" id="message-recipient" placeholder="Nom du joueur">
                </div>
                <div class="form-group">
                    <label>Sujet:</label>
                    <input type="text" id="message-subject" placeholder="Sujet du message">
                </div>
                <div class="form-group">
                    <label>Message:</label>
                    <textarea id="message-content" rows="5" placeholder="Votre message..."></textarea>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="envoyerMessage()" class="modal-btn confirm">Envoyer</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(messageModal);
    messageModal.style.display = 'flex';
    
    showNotification('Interface de messagerie ouverte', 'info');
    return true;
}

function envoyerMessage() {
    const recipient = document.getElementById('message-recipient').value;
    const subject = document.getElementById('message-subject').value;
    const content = document.getElementById('message-content').value;
    
    if (!recipient || !subject || !content) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return false;
    }
    
    const message = {
        id: Date.now(),
        from: gameState.player.name,
        to: recipient,
        subject: subject,
        content: content,
        timestamp: Date.now(),
        read: false
    };
    
    gameState.messages.push(message);
    fermerModal();
    showNotification(`Message envoyé à ${recipient}`, 'success');
    updateMessagesDisplay();
    return true;
}

function actualiserMessages() {
    console.log('🔄 Actualisation des messages');
    
    // Simuler la réception de nouveaux messages
    const newMessages = [
        {
            id: Date.now() + 1,
            from: 'Système',
            to: gameState.player.name,
            subject: 'Bienvenue dans IMPERIUM',
            content: 'Félicitations pour avoir rejoint l\'Empire ! Construisez votre première cité et étendez votre influence.',
            timestamp: Date.now(),
            read: false
        }
    ];
    
    gameState.messages.push(...newMessages);
    updateMessagesDisplay();
    showNotification(`${newMessages.length} nouveaux messages reçus`, 'success');
    return true;
}

function supprimerMessage(messageId) {
    console.log(`🗑️ Suppression du message ${messageId}`);
    
    gameState.messages = gameState.messages.filter(msg => msg.id !== messageId);
    updateMessagesDisplay();
    showNotification('Message supprimé', 'success');
    return true;
}

function marquerTousLus() {
    console.log('✅ Marquage de tous les messages comme lus');
    
    gameState.messages.forEach(msg => msg.read = true);
    updateMessagesDisplay();
    showNotification('Tous les messages marqués comme lus', 'success');
    return true;
}

// ===== FONCTIONS DE COMMERCE =====
function afficherEvolutionPrix() {
    console.log('📈 Affichage de l\'évolution des prix');
    
    const priceModal = document.createElement('div');
    priceModal.className = 'modal-overlay';
    priceModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Évolution des Prix du Marché</h3>
            <div class="modal-body">
                <div class="price-chart">
                    <div class="resource-price">
                        <span class="resource-icon">🌲</span>
                        <span class="resource-name">Bois</span>
                        <span class="price-trend up">+5% (12 or)</span>
                    </div>
                    <div class="resource-price">
                        <span class="resource-icon">🪨</span>
                        <span class="resource-name">Pierre</span>
                        <span class="price-trend down">-3% (8 or)</span>
                    </div>
                    <div class="resource-price">
                        <span class="resource-icon">⛏️</span>
                        <span class="resource-name">Fer</span>
                        <span class="price-trend up">+8% (25 or)</span>
                    </div>
                    <div class="resource-price">
                        <span class="resource-icon">🍇</span>
                        <span class="resource-name">Vin</span>
                        <span class="price-trend stable">0% (15 or)</span>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(priceModal);
    priceModal.style.display = 'flex';
    
    showNotification('Évolution des prix affichée', 'info');
    return true;
}

function gererOrdreMarche() {
    console.log('⚖️ Gestion des ordres du marché');
    
    const orderModal = document.createElement('div');
    orderModal.className = 'modal-overlay';
    orderModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Ordres du Marché</h3>
            <div class="modal-body">
                <div class="order-tabs">
                    <button class="tab-btn active" onclick="showOrderTab('buy')">Ordres d'Achat</button>
                    <button class="tab-btn" onclick="showOrderTab('sell')">Ordres de Vente</button>
                </div>
                <div id="order-content">
                    <div class="order-list">
                        <div class="order-item">
                            <span>100 Bois à 12 or/unité</span>
                            <button onclick="annulerOrdre(1)" class="btn-small">Annuler</button>
                        </div>
                        <div class="order-item">
                            <span>50 Pierre à 8 or/unité</span>
                            <button onclick="annulerOrdre(2)" class="btn-small">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(orderModal);
    orderModal.style.display = 'flex';
    
    showNotification('Ordres du marché affichés', 'info');
    return true;
}

function placerOrdreAchat() {
    console.log('💰 Placement d\'un ordre d\'achat');
    
    const buyModal = document.createElement('div');
    buyModal.className = 'modal-overlay';
    buyModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Placer un Ordre d'Achat</h3>
            <div class="modal-body">
                <div class="form-group">
                    <label>Ressource:</label>
                    <select id="buy-resource">
                        <option value="wood">Bois</option>
                        <option value="stone">Pierre</option>
                        <option value="iron">Fer</option>
                        <option value="wine">Vin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quantité:</label>
                    <input type="number" id="buy-quantity" min="1" value="100">
                </div>
                <div class="form-group">
                    <label>Prix par unité (or):</label>
                    <input type="number" id="buy-price" min="1" value="10">
                </div>
                <div class="total-cost">
                    Total: <span id="buy-total">1000</span> or
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="confirmerAchat()" class="modal-btn confirm">Placer l'Ordre</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(buyModal);
    buyModal.style.display = 'flex';
    
    // Calculer le total automatiquement
    const quantityInput = document.getElementById('buy-quantity');
    const priceInput = document.getElementById('buy-price');
    const totalSpan = document.getElementById('buy-total');
    
    function updateTotal() {
        const total = (quantityInput.value || 0) * (priceInput.value || 0);
        totalSpan.textContent = total;
    }
    
    quantityInput.addEventListener('input', updateTotal);
    priceInput.addEventListener('input', updateTotal);
    
    showNotification('Interface d\'achat ouverte', 'info');
    return true;
}

function placerOrdreVente() {
    console.log('💸 Placement d\'un ordre de vente');
    
    const sellModal = document.createElement('div');
    sellModal.className = 'modal-overlay';
    sellModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Placer un Ordre de Vente</h3>
            <div class="modal-body">
                <div class="form-group">
                    <label>Ressource:</label>
                    <select id="sell-resource">
                        <option value="wood">Bois (${gameState.resources.wood})</option>
                        <option value="stone">Pierre (${gameState.resources.stone})</option>
                        <option value="iron">Fer (${gameState.resources.iron})</option>
                        <option value="wine">Vin (${gameState.resources.wine})</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quantité:</label>
                    <input type="number" id="sell-quantity" min="1" max="${gameState.resources.wood}" value="50">
                </div>
                <div class="form-group">
                    <label>Prix par unité (or):</label>
                    <input type="number" id="sell-price" min="1" value="12">
                </div>
                <div class="total-gain">
                    Gain total: <span id="sell-total">600</span> or
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="confirmerVente()" class="modal-btn confirm">Placer l'Ordre</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(sellModal);
    sellModal.style.display = 'flex';
    
    showNotification('Interface de vente ouverte', 'info');
    return true;
}

// ===== FONCTIONS MILITAIRES =====
function recruterTroupes() {
    console.log('⚔️ Recrutement de troupes');
    
    if (!gameState.buildings.barracks) {
        showNotification('Vous devez construire une caserne d\'abord !', 'error');
        return false;
    }
    
    const recruitModal = document.createElement('div');
    recruitModal.className = 'modal-overlay';
    recruitModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Recrutement de Troupes</h3>
            <div class="modal-body">
                <div class="unit-recruitment">
                    <div class="unit-option">
                        <div class="unit-info">
                            <span class="unit-icon">🏃‍♂️</span>
                            <div class="unit-details">
                                <h4>Vélites</h4>
                                <p>Troupes légères et rapides</p>
                                <div class="unit-cost">Coût: 10 fer, 5 or</div>
                            </div>
                        </div>
                        <div class="recruit-controls">
                            <input type="number" id="velites-count" min="0" max="10" value="0">
                            <button onclick="recruterUnite('velites')" class="btn-small">Recruter</button>
                        </div>
                    </div>
                    
                    <div class="unit-option">
                        <div class="unit-info">
                            <span class="unit-icon">🛡️</span>
                            <div class="unit-details">
                                <h4>Hastati</h4>
                                <p>Fantassins lourds</p>
                                <div class="unit-cost">Coût: 20 fer, 10 or</div>
                            </div>
                        </div>
                        <div class="recruit-controls">
                            <input type="number" id="hastati-count" min="0" max="5" value="0">
                            <button onclick="recruterUnite('hastati')" class="btn-small">Recruter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(recruitModal);
    recruitModal.style.display = 'flex';
    
    showNotification('Interface de recrutement ouverte', 'info');
    return true;
}

function recruterUnite(unitType) {
    const countInput = document.getElementById(`${unitType}-count`);
    const count = parseInt(countInput.value) || 0;
    
    if (count <= 0) {
        showNotification('Quantité invalide', 'error');
        return false;
    }
    
    const unitCosts = {
        velites: { iron: 10, gold: 5 },
        hastati: { iron: 20, gold: 10 }
    };
    
    const cost = unitCosts[unitType];
    const totalIron = cost.iron * count;
    const totalGold = cost.gold * count;
    
    if (gameState.resources.iron < totalIron || gameState.resources.gold < totalGold) {
        showNotification('Ressources insuffisantes !', 'error');
        return false;
    }
    
    gameState.resources.iron -= totalIron;
    gameState.resources.gold -= totalGold;
    gameState.units[unitType] = (gameState.units[unitType] || 0) + count;
    
    updateResourcesDisplay();
    showNotification(`${count} ${unitType} recrutés !`, 'success');
    
    // Progression
    if (!gameState.progression.completedTasks.includes('recruit_first_unit')) {
        gameState.progression.completedTasks.push('recruit_first_unit');
        checkProgression();
    }
    
    return true;
}

function defenreCite() {
    console.log('🛡️ Défense de la cité');
    
    const totalUnits = Object.values(gameState.units).reduce((sum, count) => sum + count, 0);
    
    if (totalUnits === 0) {
        showNotification('Aucune troupe disponible pour la défense !', 'error');
        return false;
    }
    
    const defenseModal = document.createElement('div');
    defenseModal.className = 'modal-overlay';
    defenseModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Défense de la Cité</h3>
            <div class="modal-body">
                <p>Vos troupes défendent actuellement la cité :</p>
                <div class="defense-status">
                    ${Object.entries(gameState.units).map(([unit, count]) => 
                        `<div class="unit-defense">
                            <span class="unit-icon">${unit === 'velites' ? '🏃‍♂️' : '🛡️'}</span>
                            <span>${count} ${unit}</span>
                        </div>`
                    ).join('')}
                </div>
                <div class="defense-power">
                    <strong>Puissance défensive totale: ${calculateDefensePower()}</strong>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(defenseModal);
    defenseModal.style.display = 'flex';
    
    showNotification('État de défense affiché', 'info');
    return true;
}

function entrainementRapide() {
    console.log('🏃‍♂️ Entraînement rapide des troupes');
    
    const totalUnits = Object.values(gameState.units).reduce((sum, count) => sum + count, 0);
    
    if (totalUnits === 0) {
        showNotification('Aucune troupe à entraîner !', 'error');
        return false;
    }
    
    const trainingCost = totalUnits * 5; // 5 or par unité
    
    if (gameState.resources.gold < trainingCost) {
        showNotification(`Coût d'entraînement: ${trainingCost} or. Ressources insuffisantes !`, 'error');
        return false;
    }
    
    gameState.resources.gold -= trainingCost;
    
    // Améliorer les statistiques des unités (simulation)
    showNotification(`Entraînement terminé ! ${totalUnits} unités entraînées pour ${trainingCost} or.`, 'success');
    updateResourcesDisplay();
    
    return true;
}

// ===== FONCTIONS D'EXPLORATION =====
function explorerMonde() {
    console.log('🌍 Exploration du monde');
    
    if (!gameState.buildings.shipyard) {
        showNotification('Vous devez construire un chantier naval pour explorer !', 'error');
        return false;
    }
    
    const exploreModal = document.createElement('div');
    exploreModal.className = 'modal-overlay';
    exploreModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Exploration du Monde</h3>
            <div class="modal-body">
                <div class="exploration-options">
                    <div class="explore-option" onclick="lancerExploration('north')">
                        <h4>🧭 Exploration Nord</h4>
                        <p>Terres inconnues au nord de l'Empire</p>
                        <div class="explore-cost">Coût: 100 or, 2 heures</div>
                    </div>
                    
                    <div class="explore-option" onclick="lancerExploration('south')">
                        <h4>🏝️ Îles du Sud</h4>
                        <p>Archipel mystérieux au sud</p>
                        <div class="explore-cost">Coût: 150 or, 3 heures</div>
                    </div>
                    
                    <div class="explore-option" onclick="lancerExploration('west')">
                        <h4>🌊 Océan Occidental</h4>
                        <p>Vastes étendues océaniques</p>
                        <div class="explore-cost">Coût: 200 or, 4 heures</div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(exploreModal);
    exploreModal.style.display = 'flex';
    
    showNotification('Options d\'exploration disponibles', 'info');
    return true;
}

function lancerExploration(direction) {
    const costs = {
        north: { gold: 100, time: 2 },
        south: { gold: 150, time: 3 },
        west: { gold: 200, time: 4 }
    };
    
    const cost = costs[direction];
    
    if (gameState.resources.gold < cost.gold) {
        showNotification(`Coût: ${cost.gold} or. Ressources insuffisantes !`, 'error');
        return false;
    }
    
    gameState.resources.gold -= cost.gold;
    updateResourcesDisplay();
    
    fermerModal();
    showNotification(`Exploration ${direction} lancée ! Retour dans ${cost.time}h.`, 'success');
    
    // Simuler le retour d'exploration
    setTimeout(() => {
        const discoveries = [
            'Nouvelle île découverte !',
            'Ressources rares trouvées !',
            'Route commerciale établie !',
            'Tribu alliée rencontrée !'
        ];
        
        const discovery = discoveries[Math.floor(Math.random() * discoveries.length)];
        showNotification(`Exploration terminée: ${discovery}`, 'success');
        
        // Récompenses
        gameState.resources.gold += Math.floor(cost.gold * 1.5);
        updateResourcesDisplay();
        
    }, cost.time * 1000); // Simulé en secondes au lieu d'heures
    
    return true;
}

// ===== FONCTIONS UTILITAIRES =====
function fermerModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.remove());
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles inline pour assurer l'affichage
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Couleurs selon le type
    const colors = {
        success: '#22c55e',
        error: '#dc2626',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateResourcesDisplay() {
    const resourcesDisplay = document.querySelector('.resources-display');
    if (resourcesDisplay) {
        resourcesDisplay.innerHTML = `
            <div class="resource-item">
                <span class="resource-icon">🌲</span>
                <span class="resource-value">${gameState.resources.wood}</span>
            </div>
            <div class="resource-item">
                <span class="resource-icon">🪨</span>
                <span class="resource-value">${gameState.resources.stone}</span>
            </div>
            <div class="resource-item">
                <span class="resource-icon">🍇</span>
                <span class="resource-value">${gameState.resources.wine}</span>
            </div>
            <div class="resource-item">
                <span class="resource-icon">⛏️</span>
                <span class="resource-value">${gameState.resources.iron}</span>
            </div>
            <div class="resource-item">
                <span class="resource-icon">💰</span>
                <span class="resource-value">${gameState.resources.gold}</span>
            </div>
            <div class="resource-item">
                <span class="resource-icon">📚</span>
                <span class="resource-value">${gameState.resources.research}</span>
            </div>
        `;
    }
}

function calculateDefensePower() {
    let power = 0;
    const unitPowers = {
        velites: 7,  // 5 attaque + 2 défense
        hastati: 16  // 10 attaque + 6 défense
    };
    
    Object.entries(gameState.units).forEach(([unit, count]) => {
        power += (unitPowers[unit] || 0) * count;
    });
    
    return power;
}

// ===== SYSTÈME DE PROGRESSION =====
function checkProgression() {
    const objectives = {
        'build_forum': {
            description: 'Construire un Forum',
            reward: { xp: 100, gold: 50 },
            nextObjective: 'build_warehouse'
        },
        'build_warehouse': {
            description: 'Construire un Entrepôt',
            reward: { xp: 150, gold: 75 },
            nextObjective: 'recruit_first_unit'
        },
        'recruit_first_unit': {
            description: 'Recruter votre première unité',
            reward: { xp: 200, gold: 100 },
            nextObjective: 'research_first_tech'
        }
    };
    
    gameState.progression.currentObjectives.forEach(objective => {
        if (gameState.progression.completedTasks.includes(objective)) {
            const obj = objectives[objective];
            if (obj) {
                // Donner les récompenses
                gameState.player.xp += obj.reward.xp;
                gameState.resources.gold += obj.reward.gold;
                
                // Passer à l'objectif suivant
                if (obj.nextObjective) {
                    gameState.progression.currentObjectives = [obj.nextObjective];
                }
                
                showNotification(`Objectif accompli: ${obj.description}! +${obj.reward.xp} XP`, 'success');
                updateResourcesDisplay();
            }
        }
    });
}

// ===== FONCTIONS MONDE ET EMPIRE =====
function gererCommerceMonde() {
    console.log('🌍 Gestion du commerce mondial');
    
    const commerceModal = document.createElement('div');
    commerceModal.className = 'modal-overlay';
    commerceModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Commerce Mondial</h3>
            <div class="modal-body">
                <div class="world-trade-info">
                    <h4>Routes Commerciales Actives</h4>
                    <div class="trade-route">
                        <span class="route-name">Rome ↔ Alexandrie</span>
                        <span class="route-profit">+50 or/jour</span>
                    </div>
                    <div class="trade-route">
                        <span class="route-name">Carthage ↔ Hispanie</span>
                        <span class="route-profit">+30 or/jour</span>
                    </div>
                    <h4>Nouvelles Opportunités</h4>
                    <div class="trade-opportunity">
                        <span class="opportunity-name">Route vers la Gaule</span>
                        <button onclick="etablirRoute('gaule')" class="btn-small">Établir (100 or)</button>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(commerceModal);
    commerceModal.style.display = 'flex';
    
    showNotification('Commerce mondial ouvert', 'info');
    return true;
}

function gererDiplomatieMonde() {
    console.log('🤝 Gestion de la diplomatie mondiale');
    
    const diplomacyModal = document.createElement('div');
    diplomacyModal.className = 'modal-overlay';
    diplomacyModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Diplomatie Mondiale</h3>
            <div class="modal-body">
                <div class="diplomacy-info">
                    <h4>Relations Actuelles</h4>
                    <div class="relation-item">
                        <span class="nation-name">République de Carthage</span>
                        <span class="relation-status neutral">Neutre</span>
                        <button onclick="proposerAlliance('carthage')" class="btn-small">Alliance</button>
                    </div>
                    <div class="relation-item">
                        <span class="nation-name">Royaume d'Égypte</span>
                        <span class="relation-status friendly">Amical</span>
                        <button onclick="proposerTraite('egypte')" class="btn-small">Traité</button>
                    </div>
                    <div class="relation-item">
                        <span class="nation-name">Tribus Gauloises</span>
                        <span class="relation-status hostile">Hostile</span>
                        <button onclick="declareGuerre('gaule')" class="btn-small">Guerre</button>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(diplomacyModal);
    diplomacyModal.style.display = 'flex';
    
    showNotification('Diplomatie mondiale ouverte', 'info');
    return true;
}

function gererMonde() {
    console.log('🗺️ Gestion du monde');
    
    const worldModal = document.createElement('div');
    worldModal.className = 'modal-overlay';
    worldModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Gestion du Monde</h3>
            <div class="modal-body">
                <div class="world-management">
                    <div class="world-tabs">
                        <button class="tab-btn active" onclick="showWorldTab('overview')">Vue d'ensemble</button>
                        <button class="tab-btn" onclick="showWorldTab('provinces')">Provinces</button>
                        <button class="tab-btn" onclick="showWorldTab('trade')">Commerce</button>
                        <button class="tab-btn" onclick="showWorldTab('military')">Militaire</button>
                    </div>
                    <div id="world-content">
                        <div class="world-overview">
                            <div class="stat-card">
                                <h4>Provinces Contrôlées</h4>
                                <span class="stat-value">3</span>
                            </div>
                            <div class="stat-card">
                                <h4>Population Totale</h4>
                                <span class="stat-value">15,000</span>
                            </div>
                            <div class="stat-card">
                                <h4>Revenus Quotidiens</h4>
                                <span class="stat-value">120 or</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(worldModal);
    worldModal.style.display = 'flex';
    
    showNotification('Gestion du monde ouverte', 'info');
    return true;
}

// ===== FONCTIONS D'EXPÉDITION ET FLOTTE =====
function creerNouvelleExpedition() {
    console.log('🚢 Création d\'une nouvelle expédition');
    
    const expeditionModal = document.createElement('div');
    expeditionModal.className = 'modal-overlay';
    expeditionModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Nouvelle Expédition</h3>
            <div class="modal-body">
                <div class="expedition-form">
                    <div class="form-group">
                        <label>Nom de l'expédition:</label>
                        <input type="text" id="expedition-name" placeholder="Ex: Expédition vers l'Orient">
                    </div>
                    <div class="form-group">
                        <label>Destination:</label>
                        <select id="expedition-destination">
                            <option value="britannia">Britannia</option>
                            <option value="germania">Germania</option>
                            <option value="africa">Africa</option>
                            <option value="asia">Asia Minor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Troupes assignées:</label>
                        <div class="troop-selection">
                            <div class="troop-option">
                                <span>Légionnaires: </span>
                                <input type="number" id="legionnaires" min="0" max="100" value="50">
                            </div>
                            <div class="troop-option">
                                <span>Auxiliaires: </span>
                                <input type="number" id="auxiliaires" min="0" max="50" value="20">
                            </div>
                        </div>
                    </div>
                    <div class="expedition-cost">
                        Coût estimé: <span id="expedition-cost">500</span> or
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="lancerExpedition()" class="modal-btn confirm">Lancer l'Expédition</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(expeditionModal);
    expeditionModal.style.display = 'flex';
    
    showNotification('Interface d\'expédition ouverte', 'info');
    return true;
}

function creerNouvelleFlotte() {
    console.log('⛵ Création d\'une nouvelle flotte');
    
    const fleetModal = document.createElement('div');
    fleetModal.className = 'modal-overlay';
    fleetModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Nouvelle Flotte</h3>
            <div class="modal-body">
                <div class="fleet-form">
                    <div class="form-group">
                        <label>Nom de la flotte:</label>
                        <input type="text" id="fleet-name" placeholder="Ex: Flotte de la Méditerranée">
                    </div>
                    <div class="form-group">
                        <label>Type de mission:</label>
                        <select id="fleet-mission">
                            <option value="exploration">Exploration</option>
                            <option value="commerce">Commerce</option>
                            <option value="guerre">Guerre</option>
                            <option value="transport">Transport</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Composition de la flotte:</label>
                        <div class="ship-selection">
                            <div class="ship-option">
                                <span>Trirèmes: </span>
                                <input type="number" id="trireme" min="0" max="10" value="3">
                                <span class="ship-cost">(100 or chacune)</span>
                            </div>
                            <div class="ship-option">
                                <span>Navires marchands: </span>
                                <input type="number" id="merchant-ships" min="0" max="20" value="5">
                                <span class="ship-cost">(50 or chacun)</span>
                            </div>
                            <div class="ship-option">
                                <span>Navires d'exploration: </span>
                                <input type="number" id="scout-ships" min="0" max="5" value="2">
                                <span class="ship-cost">(75 or chacun)</span>
                            </div>
                        </div>
                    </div>
                    <div class="fleet-cost">
                        Coût total: <span id="fleet-cost">800</span> or
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="construireFlotte()" class="modal-btn confirm">Construire la Flotte</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(fleetModal);
    fleetModal.style.display = 'flex';
    
    showNotification('Interface de flotte ouverte', 'info');
    return true;
}

// ===== FONCTIONS DE PROVINCE =====
function attaquerProvince() {
    console.log('⚔️ Attaque d\'une province');
    
    const attackModal = document.createElement('div');
    attackModal.className = 'modal-overlay';
    attackModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Attaquer une Province</h3>
            <div class="modal-body">
                <div class="attack-form">
                    <div class="form-group">
                        <label>Province cible:</label>
                        <select id="target-province">
                            <option value="gallia">Gallia Narbonensis</option>
                            <option value="hispania">Hispania Tarraconensis</option>
                            <option value="britannia">Britannia</option>
                            <option value="germania">Germania Inferior</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Forces d'attaque:</label>
                        <div class="army-composition">
                            <div class="unit-selection">
                                <span>Légionnaires: </span>
                                <input type="number" id="attack-legionnaires" min="0" max="200" value="100">
                            </div>
                            <div class="unit-selection">
                                <span>Auxiliaires: </span>
                                <input type="number" id="attack-auxiliaires" min="0" max="100" value="50">
                            </div>
                            <div class="unit-selection">
                                <span>Cavalerie: </span>
                                <input type="number" id="attack-cavalry" min="0" max="50" value="20">
                            </div>
                        </div>
                    </div>
                    <div class="battle-prediction">
                        <h4>Prédiction de bataille:</h4>
                        <div class="prediction-stats">
                            <span class="win-chance">Chances de victoire: 75%</span>
                            <span class="casualties">Pertes estimées: 15-25%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="lancerAttaque()" class="modal-btn confirm">Lancer l'Attaque</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(attackModal);
    attackModal.style.display = 'flex';
    
    showNotification('Interface d\'attaque ouverte', 'info');
    return true;
}

function afficherDetailsProvince() {
    console.log('📋 Affichage des détails de province');
    
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal-overlay';
    detailsModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Détails de la Province</h3>
            <div class="modal-body">
                <div class="province-details">
                    <div class="province-header">
                        <h4>Gallia Narbonensis</h4>
                        <span class="province-status controlled">Contrôlée</span>
                    </div>
                    <div class="province-stats">
                        <div class="stat-row">
                            <span class="stat-label">Population:</span>
                            <span class="stat-value">25,000 habitants</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Revenus:</span>
                            <span class="stat-value">80 or/jour</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Garnison:</span>
                            <span class="stat-value">150 légionnaires</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Bonheur:</span>
                            <span class="stat-value happiness-high">85%</span>
                        </div>
                    </div>
                    <div class="province-resources">
                        <h5>Ressources Produites:</h5>
                        <div class="resource-production">
                            <span class="resource-item">🌾 Blé: +20/jour</span>
                            <span class="resource-item">🍇 Vin: +15/jour</span>
                            <span class="resource-item">🌲 Bois: +10/jour</span>
                        </div>
                    </div>
                    <div class="province-buildings">
                        <h5>Bâtiments:</h5>
                        <div class="building-list">
                            <span class="building-item">🏛️ Forum (Niveau 2)</span>
                            <span class="building-item">🏰 Fortifications (Niveau 1)</span>
                            <span class="building-item">🏪 Marché (Niveau 3)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="gererProvince()" class="modal-btn confirm">Gérer</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
    detailsModal.style.display = 'flex';
    
    showNotification('Détails de province affichés', 'info');
    return true;
}

function gererProvince() {
    console.log('🏛️ Gestion de province');
    
    const manageModal = document.createElement('div');
    manageModal.className = 'modal-overlay';
    manageModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Gestion de Province</h3>
            <div class="modal-body">
                <div class="province-management">
                    <div class="management-tabs">
                        <button class="tab-btn active" onclick="showProvinceTab('buildings')">Bâtiments</button>
                        <button class="tab-btn" onclick="showProvinceTab('military')">Militaire</button>
                        <button class="tab-btn" onclick="showProvinceTab('economy')">Économie</button>
                        <button class="tab-btn" onclick="showProvinceTab('population')">Population</button>
                    </div>
                    <div id="province-content">
                        <div class="buildings-management">
                            <h4>Constructions Disponibles</h4>
                            <div class="building-options">
                                <div class="building-option">
                                    <span class="building-name">🏛️ Améliorer Forum</span>
                                    <span class="building-cost">200 pierre, 100 or</span>
                                    <button onclick="construireBatiment('forum')" class="btn-small">Construire</button>
                                </div>
                                <div class="building-option">
                                    <span class="building-name">🏰 Renforcer Fortifications</span>
                                    <span class="building-cost">300 pierre, 150 fer</span>
                                    <button onclick="construireBatiment('fortifications')" class="btn-small">Construire</button>
                                </div>
                                <div class="building-option">
                                    <span class="building-name">🏪 Agrandir Marché</span>
                                    <span class="building-cost">150 bois, 100 or</span>
                                    <button onclick="construireBatiment('marche')" class="btn-small">Construire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(manageModal);
    manageModal.style.display = 'flex';
    
    showNotification('Gestion de province ouverte', 'info');
    return true;
}

// ===== FONCTIONS NAVALES =====
function ameliorerPort() {
    console.log('🏗️ Amélioration du port');
    
    if (gameState.resources.stone < 200 || gameState.resources.wood < 150 || gameState.resources.gold < 300) {
        showNotification('Ressources insuffisantes pour améliorer le port !', 'error');
        return false;
    }
    
    gameState.resources.stone -= 200;
    gameState.resources.wood -= 150;
    gameState.resources.gold -= 300;
    
    showNotification('Port amélioré avec succès ! Capacité navale augmentée.', 'success');
    updateResourcesDisplay();
    return true;
}

function afficherConstructionsEnCours() {
    console.log('🔨 Affichage des constructions en cours');
    
    const constructionModal = document.createElement('div');
    constructionModal.className = 'modal-overlay';
    constructionModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Constructions en Cours</h3>
            <div class="modal-body">
                <div class="construction-list">
                    <div class="construction-item">
                        <div class="construction-info">
                            <span class="construction-name">⛵ Trirème "Aquila"</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 65%"></div>
                            </div>
                            <span class="construction-time">2 jours restants</span>
                        </div>
                        <button onclick="accelererConstruction('trireme1')" class="btn-small">Accélérer (50 or)</button>
                    </div>
                    <div class="construction-item">
                        <div class="construction-info">
                            <span class="construction-name">🚢 Navire Marchand</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 30%"></div>
                            </div>
                            <span class="construction-time">4 jours restants</span>
                        </div>
                        <button onclick="accelererConstruction('merchant1')" class="btn-small">Accélérer (30 or)</button>
                    </div>
                    <div class="construction-item">
                        <div class="construction-info">
                            <span class="construction-name">🏗️ Extension du Port</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 80%"></div>
                            </div>
                            <span class="construction-time">1 jour restant</span>
                        </div>
                        <button onclick="accelererConstruction('port1')" class="btn-small">Accélérer (100 or)</button>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(constructionModal);
    constructionModal.style.display = 'flex';
    
    showNotification('Constructions en cours affichées', 'info');
    return true;
}

function construireNavireMarchand() {
    console.log('🚢 Construction d\'un navire marchand');
    
    if (gameState.resources.wood < 100 || gameState.resources.iron < 50 || gameState.resources.gold < 200) {
        showNotification('Ressources insuffisantes pour construire un navire marchand !', 'error');
        return false;
    }
    
    gameState.resources.wood -= 100;
    gameState.resources.iron -= 50;
    gameState.resources.gold -= 200;
    
    showNotification('Construction d\'un navire marchand lancée ! Terminé dans 3 jours.', 'success');
    updateResourcesDisplay();
    return true;
}

function gererGaleresGuerre() {
    console.log('⚔️ Gestion des galères de guerre');
    
    const warshipsModal = document.createElement('div');
    warshipsModal.className = 'modal-overlay';
    warshipsModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Galères de Guerre</h3>
            <div class="modal-body">
                <div class="warships-management">
                    <h4>Flotte de Guerre Actuelle</h4>
                    <div class="ship-list">
                        <div class="ship-item">
                            <span class="ship-name">⛵ Trirème "Imperator"</span>
                            <span class="ship-status ready">Prête</span>
                            <div class="ship-actions">
                                <button onclick="reparerNavire('imperator')" class="btn-small">Réparer</button>
                                <button onclick="ameliorerNavire('imperator')" class="btn-small">Améliorer</button>
                            </div>
                        </div>
                        <div class="ship-item">
                            <span class="ship-name">⛵ Trirème "Victoria"</span>
                            <span class="ship-status damaged">Endommagée</span>
                            <div class="ship-actions">
                                <button onclick="reparerNavire('victoria')" class="btn-small">Réparer (50 or)</button>
                                <button onclick="ameliorerNavire('victoria')" class="btn-small disabled">Améliorer</button>
                            </div>
                        </div>
                        <div class="ship-item">
                            <span class="ship-name">🚢 Quinquérème "Aquila"</span>
                            <span class="ship-status ready">Prête</span>
                            <div class="ship-actions">
                                <button onclick="reparerNavire('aquila')" class="btn-small">Réparer</button>
                                <button onclick="ameliorerNavire('aquila')" class="btn-small">Améliorer</button>
                            </div>
                        </div>
                    </div>
                    <div class="fleet-actions">
                        <button onclick="construireGalere()" class="modal-btn">Construire Nouvelle Galère</button>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(warshipsModal);
    warshipsModal.style.display = 'flex';
    
    showNotification('Gestion des galères de guerre ouverte', 'info');
    return true;
}

function gererRoutesNavales() {
    console.log('🗺️ Gestion des routes navales');
    
    const routesModal = document.createElement('div');
    routesModal.className = 'modal-overlay';
    routesModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Routes Navales</h3>
            <div class="modal-body">
                <div class="naval-routes">
                    <h4>Routes Actives</h4>
                    <div class="route-list">
                        <div class="route-item active">
                            <span class="route-name">Rome → Carthage</span>
                            <span class="route-profit">+40 or/jour</span>
                            <span class="route-status">Active</span>
                            <button onclick="suspendreRoute('rome-carthage')" class="btn-small">Suspendre</button>
                        </div>
                        <div class="route-item active">
                            <span class="route-name">Ostie → Alexandrie</span>
                            <span class="route-profit">+60 or/jour</span>
                            <span class="route-status">Active</span>
                            <button onclick="suspendreRoute('ostie-alexandrie')" class="btn-small">Suspendre</button>
                        </div>
                    </div>
                    <h4>Nouvelles Routes Possibles</h4>
                    <div class="route-opportunities">
                        <div class="route-opportunity">
                            <span class="route-name">Rome → Massilia</span>
                            <span class="route-cost">Coût: 200 or</span>
                            <span class="route-potential">Profit estimé: +25 or/jour</span>
                            <button onclick="etablirRoute('rome-massilia')" class="btn-small">Établir</button>
                        </div>
                        <div class="route-opportunity">
                            <span class="route-name">Brundisium → Athènes</span>
                            <span class="route-cost">Coût: 300 or</span>
                            <span class="route-potential">Profit estimé: +35 or/jour</span>
                            <button onclick="etablirRoute('brundisium-athenes')" class="btn-small">Établir</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(routesModal);
    routesModal.style.display = 'flex';
    
    showNotification('Routes navales affichées', 'info');
    return true;
}

function gererNaviresExploration() {
    console.log('🧭 Gestion des navires d\'exploration');
    
    const explorationModal = document.createElement('div');
    explorationModal.className = 'modal-overlay';
    explorationModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Navires d'Exploration</h3>
            <div class="modal-body">
                <div class="exploration-fleet">
                    <h4>Flotte d'Exploration</h4>
                    <div class="explorer-ships">
                        <div class="ship-item">
                            <span class="ship-name">🧭 "Discoverer"</span>
                            <span class="ship-status exploring">En exploration</span>
                            <span class="ship-location">Océan Atlantique</span>
                            <button onclick="rappelerNavire('discoverer')" class="btn-small">Rappeler</button>
                        </div>
                        <div class="ship-item">
                            <span class="ship-name">🧭 "Navigator"</span>
                            <span class="ship-status ready">Disponible</span>
                            <span class="ship-location">Port de Rome</span>
                            <button onclick="envoyerExploration('navigator')" class="btn-small">Explorer</button>
                        </div>
                    </div>
                    <div class="exploration-results">
                        <h4>Découvertes Récentes</h4>
                        <div class="discovery-item">
                            <span class="discovery-name">🏝️ Île mystérieuse</span>
                            <span class="discovery-reward">+100 or, +50 XP</span>
                        </div>
                        <div class="discovery-item">
                            <span class="discovery-name">🗺️ Nouvelle route commerciale</span>
                            <span class="discovery-reward">+20 or/jour</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="construireNavireExploration()" class="modal-btn">Construire Navire d'Exploration</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(explorationModal);
    explorationModal.style.display = 'flex';
    
    showNotification('Navires d\'exploration affichés', 'info');
    return true;
}

function creerExpeditionNavale() {
    console.log('⛵ Création d\'une expédition navale');
    
    const navalExpeditionModal = document.createElement('div');
    navalExpeditionModal.className = 'modal-overlay';
    navalExpeditionModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Expédition Navale</h3>
            <div class="modal-body">
                <div class="naval-expedition-form">
                    <div class="form-group">
                        <label>Type d'expédition:</label>
                        <select id="naval-expedition-type">
                            <option value="exploration">Exploration</option>
                            <option value="commerce">Mission commerciale</option>
                            <option value="militaire">Expédition militaire</option>
                            <option value="colonisation">Colonisation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Destination:</label>
                        <select id="naval-destination">
                            <option value="atlantique">Océan Atlantique</option>
                            <option value="mer-noire">Mer Noire</option>
                            <option value="mer-rouge">Mer Rouge</option>
                            <option value="iles-britanniques">Îles Britanniques</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Navires assignés:</label>
                        <div class="ship-assignment">
                            <div class="ship-type">
                                <span>Trirèmes: </span>
                                <input type="number" id="naval-trireme" min="0" max="5" value="2">
                            </div>
                            <div class="ship-type">
                                <span>Navires marchands: </span>
                                <input type="number" id="naval-merchant" min="0" max="10" value="3">
                            </div>
                            <div class="ship-type">
                                <span>Navires d'exploration: </span>
                                <input type="number" id="naval-scout" min="0" max="3" value="1">
                            </div>
                        </div>
                    </div>
                    <div class="expedition-duration">
                        Durée estimée: <span id="naval-duration">15 jours</span>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="lancerExpeditionNavale()" class="modal-btn confirm">Lancer l'Expédition</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(navalExpeditionModal);
    navalExpeditionModal.style.display = 'flex';
    
    showNotification('Interface d\'expédition navale ouverte', 'info');
    return true;
}

function afficherRapportNaval() {
    console.log('📊 Affichage du rapport naval');
    
    const navalReportModal = document.createElement('div');
    navalReportModal.className = 'modal-overlay';
    navalReportModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Rapport Naval</h3>
            <div class="modal-body">
                <div class="naval-report">
                    <div class="report-section">
                        <h4>État de la Flotte</h4>
                        <div class="fleet-stats">
                            <div class="stat-item">
                                <span class="stat-label">Navires totaux:</span>
                                <span class="stat-value">23</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Navires opérationnels:</span>
                                <span class="stat-value">20</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">En réparation:</span>
                                <span class="stat-value">3</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">En mission:</span>
                                <span class="stat-value">8</span>
                            </div>
                        </div>
                    </div>
                    <div class="report-section">
                        <h4>Revenus Navals</h4>
                        <div class="revenue-stats">
                            <div class="revenue-item">
                                <span class="revenue-source">Commerce maritime:</span>
                                <span class="revenue-amount">+120 or/jour</span>
                            </div>
                            <div class="revenue-item">
                                <span class="revenue-source">Expéditions:</span>
                                <span class="revenue-amount">+80 or/jour</span>
                            </div>
                            <div class="revenue-item">
                                <span class="revenue-source">Pêche:</span>
                                <span class="revenue-amount">+30 or/jour</span>
                            </div>
                        </div>
                    </div>
                    <div class="report-section">
                        <h4>Missions en Cours</h4>
                        <div class="active-missions">
                            <div class="mission-item">
                                <span class="mission-name">Exploration Atlantique</span>
                                <span class="mission-progress">60% complété</span>
                                <span class="mission-eta">5 jours restants</span>
                            </div>
                            <div class="mission-item">
                                <span class="mission-name">Route commerciale Égypte</span>
                                <span class="mission-progress">En cours</span>
                                <span class="mission-eta">Permanent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(navalReportModal);
    navalReportModal.style.display = 'flex';
    
    showNotification('Rapport naval affiché', 'info');
    return true;
}

// ===== FONCTIONS MILITAIRES SUPPLÉMENTAIRES =====
function creerNouvelleCampagne() {
    console.log('🏛️ Création d\'une nouvelle campagne militaire');
    
    const campaignModal = document.createElement('div');
    campaignModal.className = 'modal-overlay';
    campaignModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Nouvelle Campagne Militaire</h3>
            <div class="modal-body">
                <div class="campaign-form">
                    <div class="form-group">
                        <label>Nom de la campagne:</label>
                        <input type="text" id="campaign-name" placeholder="Ex: Conquête de la Gaule">
                    </div>
                    <div class="form-group">
                        <label>Objectif:</label>
                        <select id="campaign-objective">
                            <option value="conquest">Conquête territoriale</option>
                            <option value="defense">Défense des frontières</option>
                            <option value="suppression">Suppression de révolte</option>
                            <option value="exploration">Exploration militaire</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Région cible:</label>
                        <select id="campaign-region">
                            <option value="gallia">Gallia</option>
                            <option value="germania">Germania</option>
                            <option value="britannia">Britannia</option>
                            <option value="hispania">Hispania</option>
                            <option value="africa">Africa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Forces assignées:</label>
                        <div class="army-assignment">
                            <div class="legion-option">
                                <span>Légion I Augusta: </span>
                                <input type="checkbox" id="legion-1" checked>
                                <span class="legion-strength">(2000 hommes)</span>
                            </div>
                            <div class="legion-option">
                                <span>Légion II Victrix: </span>
                                <input type="checkbox" id="legion-2">
                                <span class="legion-strength">(1800 hommes)</span>
                            </div>
                            <div class="legion-option">
                                <span>Auxiliaires Gaulois: </span>
                                <input type="checkbox" id="auxiliaires" checked>
                                <span class="legion-strength">(500 hommes)</span>
                            </div>
                        </div>
                    </div>
                    <div class="campaign-cost">
                        Coût de la campagne: <span id="campaign-cost">1500</span> or
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="lancerCampagne()" class="modal-btn confirm">Lancer la Campagne</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(campaignModal);
    campaignModal.style.display = 'flex';
    
    showNotification('Interface de campagne ouverte', 'info');
    return true;
}

function afficherRapportBataille() {
    console.log('⚔️ Affichage du rapport de bataille');
    
    const battleReportModal = document.createElement('div');
    battleReportModal.className = 'modal-overlay';
    battleReportModal.innerHTML = `
        <div class="modal-content large-modal">
            <h3 class="modal-title">Rapport de Bataille</h3>
            <div class="modal-body">
                <div class="battle-report">
                    <div class="battle-header">
                        <h4>Bataille de Gergovie</h4>
                        <span class="battle-result victory">VICTOIRE</span>
                        <span class="battle-date">15 Mars, An 702</span>
                    </div>
                    <div class="battle-summary">
                        <div class="army-comparison">
                            <div class="army-side roman">
                                <h5>Forces Romaines</h5>
                                <div class="army-composition">
                                    <div class="unit-count">Légionnaires: 1200</div>
                                    <div class="unit-count">Auxiliaires: 400</div>
                                    <div class="unit-count">Cavalerie: 200</div>
                                </div>
                                <div class="casualties">
                                    <span class="casualties-label">Pertes:</span>
                                    <span class="casualties-count">180 hommes</span>
                                </div>
                            </div>
                            <div class="battle-vs">VS</div>
                            <div class="army-side enemy">
                                <h5>Forces Gauloises</h5>
                                <div class="army-composition">
                                    <div class="unit-count">Guerriers: 2000</div>
                                    <div class="unit-count">Cavalerie: 300</div>
                                    <div class="unit-count">Archers: 150</div>
                                </div>
                                <div class="casualties">
                                    <span class="casualties-label">Pertes:</span>
                                    <span class="casualties-count">800 hommes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="battle-rewards">
                        <h5>Butin de Guerre</h5>
                        <div class="reward-list">
                            <span class="reward-item">💰 500 or</span>
                            <span class="reward-item">⚔️ 50 armes</span>
                            <span class="reward-item">🏆 200 XP</span>
                            <span class="reward-item">🗺️ Territoire conquis</span>
                        </div>
                    </div>
                    <div class="battle-description">
                        <h5>Déroulement de la Bataille</h5>
                        <p>Nos légions ont brillamment manœuvré pour encercler les forces gauloises. 
                        La discipline romaine a triomphé de la bravoure barbare. 
                        La victoire ouvre la voie à la conquête de toute la région.</p>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="fermerModal()" class="modal-btn confirm">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(battleReportModal);
    battleReportModal.style.display = 'flex';
    
    showNotification('Rapport de bataille affiché', 'info');
    return true;
}

// ===== FONCTIONS D'ALLIANCE =====
function gererDescriptionAlliance() {
    console.log('📝 Gestion de la description d\'alliance');
    
    const descriptionModal = document.createElement('div');
    descriptionModal.className = 'modal-overlay';
    descriptionModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Description de l'Alliance</h3>
            <div class="modal-body">
                <div class="alliance-description-form">
                    <div class="form-group">
                        <label>Description publique:</label>
                        <textarea id="alliance-public-desc" rows="4" placeholder="Description visible par tous les joueurs...">
Alliance des Sénateurs Romains - Nous cherchons à restaurer la gloire de Rome et à étendre notre influence sur toute la Méditerranée.
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label>Message de recrutement:</label>
                        <textarea id="alliance-recruitment" rows="3" placeholder="Message pour attirer de nouveaux membres...">
Rejoignez-nous pour conquérir le monde ! Nous recherchons des joueurs actifs et ambitieux.
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label>Règles internes:</label>
                        <textarea id="alliance-rules" rows="4" placeholder="Règles pour les membres de l'alliance...">
1. Participation active aux guerres d'alliance
2. Respect mutuel entre membres
3. Partage des ressources en cas de besoin
4. Communication sur Discord obligatoire
                        </textarea>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="sauvegarderDescriptionAlliance()" class="modal-btn confirm">Sauvegarder</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(descriptionModal);
    descriptionModal.style.display = 'flex';
    
    showNotification('Édition de la description d\'alliance ouverte', 'info');
    return true;
}

function gererNomAlliance() {
    console.log('✏️ Gestion du nom d\'alliance');
    
    const nameModal = document.createElement('div');
    nameModal.className = 'modal-overlay';
    nameModal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Changer le Nom de l'Alliance</h3>
            <div class="modal-body">
                <div class="alliance-name-form">
                    <div class="current-name">
                        <label>Nom actuel:</label>
                        <span class="current-alliance-name">Sénateurs de Rome</span>
                    </div>
                    <div class="form-group">
                        <label>Nouveau nom:</label>
                        <input type="text" id="new-alliance-name" placeholder="Nouveau nom de l'alliance" maxlength="50">
                        <div class="name-requirements">
                            <small>• Maximum 50 caractères</small>
                            <small>• Pas de caractères spéciaux</small>
                            <small>• Doit être unique</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Tag de l'alliance (optionnel):</label>
                        <input type="text" id="alliance-tag" placeholder="Ex: [SPQR]" maxlength="6">
                        <div class="tag-requirements">
                            <small>• Maximum 6 caractères</small>
                            <small>• Sera affiché entre crochets</small>
                        </div>
                    </div>
                    <div class="change-cost">
                        <strong>Coût du changement: 1000 or</strong>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="changerNomAlliance()" class="modal-btn confirm">Changer le Nom (1000 or)</button>
                <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(nameModal);
    nameModal.style.display = 'flex';
    
    showNotification('Interface de changement de nom ouverte', 'info');
    return true;
}

// ===== INITIALISATION =====
function initGameFunctions() {
    console.log('🎮 Fonctions de jeu initialisées');
    
    // Mettre à jour l'affichage initial
    updateResourcesDisplay();
    
    // Démarrer les mises à jour périodiques
    setInterval(() => {
        updateResourcesDisplay();
    }, 5000);
}

// Auto-initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameFunctions);
} else {
    initGameFunctions();
}

// Export global
window.gameState = gameState;
window.creerNouveauMessage = creerNouveauMessage;
window.actualiserMessages = actualiserMessages;
window.supprimerMessage = supprimerMessage;
window.marquerTousLus = marquerTousLus;
window.afficherEvolutionPrix = afficherEvolutionPrix;
window.gererOrdreMarche = gererOrdreMarche;
window.placerOrdreAchat = placerOrdreAchat;
window.placerOrdreVente = placerOrdreVente;
window.recruterTroupes = recruterTroupes;
window.defenreCite = defenreCite;
window.entrainementRapide = entrainementRapide;
window.explorerMonde = explorerMonde;
window.gererCommerceMonde = gererCommerceMonde;
window.gererDiplomatieMonde = gererDiplomatieMonde;
window.gererMonde = gererMonde;
window.creerNouvelleExpedition = creerNouvelleExpedition;
window.creerNouvelleFlotte = creerNouvelleFlotte;
window.attaquerProvince = attaquerProvince;
window.afficherDetailsProvince = afficherDetailsProvince;
window.gererProvince = gererProvince;
window.ameliorerPort = ameliorerPort;
window.afficherConstructionsEnCours = afficherConstructionsEnCours;
window.construireNavireMarchand = construireNavireMarchand;
window.gererGaleresGuerre = gererGaleresGuerre;
window.gererRoutesNavales = gererRoutesNavales;
window.gererNaviresExploration = gererNaviresExploration;
window.creerExpeditionNavale = creerExpeditionNavale;
window.afficherRapportNaval = afficherRapportNaval;
window.creerNouvelleCampagne = creerNouvelleCampagne;
window.afficherRapportBataille = afficherRapportBataille;
window.gererDescriptionAlliance = gererDescriptionAlliance;
window.gererNomAlliance = gererNomAlliance;
window.fermerModal = fermerModal;
window.showNotification = showNotification;

console.log('✅ Toutes les fonctions de jeu sont maintenant disponibles');