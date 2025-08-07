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
window.explorerMonde = explorerMonde;
window.fermerModal = fermerModal;
window.showNotification = showNotification;

console.log('✅ Toutes les fonctions de jeu sont maintenant disponibles');