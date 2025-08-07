/**
 * 🏛️ IMPERIUM - Fonctions Manquantes Fix 2025
 * Implémentation des fonctions manquantes pour les boutons
 */

// Vérifier que les fonctions de base existent
if (typeof window.showNotification === 'undefined') {
    window.showNotification = function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // Créer une notification visuelle simple
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    };
}

if (typeof window.fermerModal === 'undefined') {
    window.fermerModal = function() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.remove());
    };
}

// ===== FONCTIONS DE COMMERCE =====
if (typeof window.gererCommerceMonde === 'undefined') {
    window.gererCommerceMonde = function() {
        console.log('🌍 Gestion du commerce mondial');
        showNotification('Interface de commerce mondial ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🌍 Commerce Mondial</h3>
                <div class="modal-body">
                    <div class="commerce-tabs">
                        <button class="tab-btn active">Routes Commerciales</button>
                        <button class="tab-btn">Marchés Régionaux</button>
                        <button class="tab-btn">Caravanes</button>
                    </div>
                    <div class="commerce-content">
                        <div class="route-item">
                            <span class="route-name">🏛️ Rome → Alexandrie</span>
                            <span class="route-profit">+150 or/jour</span>
                            <button class="btn-small">Gérer</button>
                        </div>
                        <div class="route-item">
                            <span class="route-name">🏛️ Athènes → Carthage</span>
                            <span class="route-profit">+200 or/jour</span>
                            <button class="btn-small">Gérer</button>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.gererDiplomatieMonde === 'undefined') {
    window.gererDiplomatieMonde = function() {
        console.log('🤝 Gestion de la diplomatie mondiale');
        showNotification('Interface de diplomatie mondiale ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🤝 Diplomatie Mondiale</h3>
                <div class="modal-body">
                    <div class="diplomacy-sections">
                        <div class="diplomacy-section">
                            <h4>Alliances Actives</h4>
                            <div class="alliance-item">
                                <span class="alliance-name">🛡️ Pax Romana</span>
                                <span class="alliance-status">Actif</span>
                            </div>
                        </div>
                        <div class="diplomacy-section">
                            <h4>Relations</h4>
                            <div class="relation-item">
                                <span class="nation-name">🏛️ République Grecque</span>
                                <span class="relation-status friendly">Amical</span>
                            </div>
                            <div class="relation-item">
                                <span class="nation-name">🏛️ Empire Perse</span>
                                <span class="relation-status neutral">Neutre</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.explorerMonde === 'undefined') {
    window.explorerMonde = function() {
        console.log('🗺️ Exploration du monde');
        showNotification('Mode exploration activé', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🗺️ Exploration du Monde</h3>
                <div class="modal-body">
                    <div class="exploration-map">
                        <div class="map-region discovered">
                            <span class="region-name">🏛️ Latium</span>
                            <span class="region-status">Découvert</span>
                        </div>
                        <div class="map-region exploring">
                            <span class="region-name">🌊 Mare Nostrum</span>
                            <span class="region-status">En exploration...</span>
                        </div>
                        <div class="map-region unknown">
                            <span class="region-name">❓ Région Inconnue</span>
                            <span class="region-status">Non découvert</span>
                        </div>
                    </div>
                    <div class="exploration-actions">
                        <button class="exploration-btn">Envoyer Éclaireurs</button>
                        <button class="exploration-btn">Établir Avant-poste</button>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.gererMonde === 'undefined') {
    window.gererMonde = function() {
        console.log('🌍 Gestion du monde');
        showNotification('Interface de gestion mondiale ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🌍 Gestion du Monde</h3>
                <div class="modal-body">
                    <div class="world-management">
                        <div class="management-section">
                            <h4>Territoires Contrôlés</h4>
                            <div class="territory-list">
                                <div class="territory-item">
                                    <span class="territory-name">🏛️ Roma Nova</span>
                                    <span class="territory-type">Capitale</span>
                                    <button class="btn-small">Gérer</button>
                                </div>
                            </div>
                        </div>
                        <div class="management-section">
                            <h4>Actions Globales</h4>
                            <div class="global-actions">
                                <button class="action-btn">Collecter Tributs</button>
                                <button class="action-btn">Déployer Légions</button>
                                <button class="action-btn">Établir Routes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

// ===== FONCTIONS D'EXPÉDITION =====
if (typeof window.creerNouvelleExpedition === 'undefined') {
    window.creerNouvelleExpedition = function() {
        console.log('🚢 Création d\'une nouvelle expédition');
        showNotification('Interface d\'expédition ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🚢 Nouvelle Expédition</h3>
                <div class="modal-body">
                    <div class="expedition-form">
                        <div class="form-group">
                            <label>Type d'Expédition:</label>
                            <select id="expedition-type">
                                <option value="exploration">Exploration</option>
                                <option value="commerce">Commerce</option>
                                <option value="militaire">Militaire</option>
                                <option value="colonisation">Colonisation</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Destination:</label>
                            <select id="expedition-destination">
                                <option value="sicilia">Sicile</option>
                                <option value="sardinia">Sardaigne</option>
                                <option value="corsica">Corse</option>
                                <option value="hispania">Hispanie</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Troupes à envoyer:</label>
                            <input type="number" id="expedition-troops" min="10" max="1000" value="100">
                        </div>
                        <div class="form-group">
                            <label>Durée estimée:</label>
                            <span id="expedition-duration">7 jours</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="lancerExpedition()" class="modal-btn confirm">Lancer l'Expédition</button>
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.lancerExpedition === 'undefined') {
    window.lancerExpedition = function() {
        const type = document.getElementById('expedition-type').value;
        const destination = document.getElementById('expedition-destination').value;
        const troops = document.getElementById('expedition-troops').value;
        
        console.log(`🚢 Lancement d'expédition: ${type} vers ${destination} avec ${troops} troupes`);
        showNotification(`Expédition ${type} lancée vers ${destination}!`, 'success');
        fermerModal();
        return true;
    };
}

if (typeof window.creerNouvelleFlotte === 'undefined') {
    window.creerNouvelleFlotte = function() {
        console.log('⛵ Création d\'une nouvelle flotte');
        showNotification('Interface de création de flotte ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>⛵ Nouvelle Flotte</h3>
                <div class="modal-body">
                    <div class="fleet-builder">
                        <div class="ship-types">
                            <div class="ship-type">
                                <h4>🚢 Galères de Guerre</h4>
                                <p>Navires de combat rapides</p>
                                <div class="ship-controls">
                                    <input type="number" id="warships" min="0" max="20" value="5">
                                    <span class="cost">Coût: 500 or/unité</span>
                                </div>
                            </div>
                            <div class="ship-type">
                                <h4>🛳️ Navires Marchands</h4>
                                <p>Transport de ressources</p>
                                <div class="ship-controls">
                                    <input type="number" id="merchants" min="0" max="50" value="10">
                                    <span class="cost">Coût: 300 or/unité</span>
                                </div>
                            </div>
                            <div class="ship-type">
                                <h4>🚤 Navires d'Exploration</h4>
                                <p>Découverte de nouvelles terres</p>
                                <div class="ship-controls">
                                    <input type="number" id="explorers" min="0" max="10" value="2">
                                    <span class="cost">Coût: 800 or/unité</span>
                                </div>
                            </div>
                        </div>
                        <div class="fleet-summary">
                            <h4>Résumé de la Flotte</h4>
                            <div id="fleet-total">Coût total: 6,100 or</div>
                            <div id="fleet-time">Temps de construction: 14 jours</div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="construireFlotte()" class="modal-btn confirm">Construire la Flotte</button>
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.construireFlotte === 'undefined') {
    window.construireFlotte = function() {
        const warships = document.getElementById('warships').value || 0;
        const merchants = document.getElementById('merchants').value || 0;
        const explorers = document.getElementById('explorers').value || 0;
        
        console.log(`⛵ Construction de flotte: ${warships} galères, ${merchants} marchands, ${explorers} explorateurs`);
        showNotification('Construction de la flotte commencée!', 'success');
        fermerModal();
        return true;
    };
}

// ===== FONCTIONS DE PROVINCE =====
if (typeof window.attaquerProvince === 'undefined') {
    window.attaquerProvince = function() {
        console.log('⚔️ Attaque de province');
        showNotification('Interface d\'attaque ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>⚔️ Attaquer une Province</h3>
                <div class="modal-body">
                    <div class="attack-planning">
                        <div class="target-selection">
                            <h4>Cible</h4>
                            <select id="target-province">
                                <option value="gallia">Gallia Cisalpina</option>
                                <option value="hispania">Hispania Citerior</option>
                                <option value="africa">Africa Proconsularis</option>
                            </select>
                        </div>
                        <div class="force-selection">
                            <h4>Forces d'Attaque</h4>
                            <div class="unit-selector">
                                <label>Légionnaires:</label>
                                <input type="number" id="attack-legions" min="0" max="10" value="3">
                            </div>
                            <div class="unit-selector">
                                <label>Auxiliaires:</label>
                                <input type="number" id="attack-auxiliaries" min="0" max="20" value="5">
                            </div>
                            <div class="unit-selector">
                                <label>Cavalerie:</label>
                                <input type="number" id="attack-cavalry" min="0" max="5" value="2">
                            </div>
                        </div>
                        <div class="attack-summary">
                            <div class="success-chance">Chances de succès: 75%</div>
                            <div class="estimated-losses">Pertes estimées: 15%</div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="lancerAttaque()" class="modal-btn confirm">Lancer l'Attaque</button>
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.lancerAttaque === 'undefined') {
    window.lancerAttaque = function() {
        const target = document.getElementById('target-province').value;
        const legions = document.getElementById('attack-legions').value;
        
        console.log(`⚔️ Attaque lancée sur ${target} avec ${legions} légions`);
        showNotification(`Attaque lancée sur ${target}!`, 'success');
        fermerModal();
        return true;
    };
}

if (typeof window.afficherDetailsProvince === 'undefined') {
    window.afficherDetailsProvince = function() {
        console.log('📊 Affichage des détails de province');
        showNotification('Détails de la province affichés', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>📊 Détails de la Province</h3>
                <div class="modal-body">
                    <div class="province-details">
                        <div class="detail-section">
                            <h4>Informations Générales</h4>
                            <div class="detail-item">
                                <span class="detail-label">Nom:</span>
                                <span class="detail-value">Gallia Cisalpina</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Population:</span>
                                <span class="detail-value">45,000 habitants</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Bonheur:</span>
                                <span class="detail-value">78%</span>
                            </div>
                        </div>
                        <div class="detail-section">
                            <h4>Ressources</h4>
                            <div class="resource-details">
                                <div class="resource-detail">🌲 Bois: 2,500/h</div>
                                <div class="resource-detail">🪨 Pierre: 1,800/h</div>
                                <div class="resource-detail">⛏️ Fer: 900/h</div>
                                <div class="resource-detail">🍇 Vin: 1,200/h</div>
                            </div>
                        </div>
                        <div class="detail-section">
                            <h4>Défenses</h4>
                            <div class="defense-details">
                                <div class="defense-item">Murailles: Niveau 3</div>
                                <div class="defense-item">Garnison: 2,000 soldats</div>
                                <div class="defense-item">Tours de guet: 8</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

if (typeof window.gererProvince === 'undefined') {
    window.gererProvince = function() {
        console.log('🏛️ Gestion de province');
        showNotification('Interface de gestion de province ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🏛️ Gestion de Province</h3>
                <div class="modal-body">
                    <div class="province-management">
                        <div class="management-tabs">
                            <button class="tab-btn active">Administration</button>
                            <button class="tab-btn">Économie</button>
                            <button class="tab-btn">Militaire</button>
                        </div>
                        <div class="tab-content">
                            <div class="management-actions">
                                <button class="management-btn">Nommer Gouverneur</button>
                                <button class="management-btn">Ajuster Taxes</button>
                                <button class="management-btn">Construire Infrastructure</button>
                                <button class="management-btn">Organiser Festival</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

// ===== FONCTIONS MILITAIRES AVANCÉES =====
if (typeof window.ameliorerPort === 'undefined') {
    window.ameliorerPort = function() {
        console.log('🏗️ Amélioration du port');
        showNotification('Interface d\'amélioration du port ouverte', 'info');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🏗️ Amélioration du Port</h3>
                <div class="modal-body">
                    <div class="port-upgrades">
                        <div class="upgrade-option">
                            <h4>🚢 Agrandir les Quais</h4>
                            <p>Permet d'accueillir plus de navires</p>
                            <div class="upgrade-cost">Coût: 2,000 or, 500 pierre</div>
                            <button class="upgrade-btn">Améliorer</button>
                        </div>
                        <div class="upgrade-option">
                            <h4>🏗️ Construire Chantier Naval</h4>
                            <p>Accélère la construction de navires</p>
                            <div class="upgrade-cost">Coût: 5,000 or, 1,000 bois</div>
                            <button class="upgrade-btn">Construire</button>
                        </div>
                        <div class="upgrade-option">
                            <h4>🛡️ Fortifier le Port</h4>
                            <p>Améliore les défenses navales</p>
                            <div class="upgrade-cost">Coût: 3,000 or, 800 fer</div>
                            <button class="upgrade-btn">Fortifier</button>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return true;
    };
}

// Ajouter les styles CSS pour les modales
const modalStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .modal-content {
        background: white;
        border-radius: 10px;
        padding: 0;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: modalAppear 0.3s ease;
    }
    
    @keyframes modalAppear {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .modal-content h3 {
        background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
        color: white;
        margin: 0;
        padding: 20px;
        border-radius: 10px 10px 0 0;
        font-size: 18px;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .modal-actions {
        padding: 20px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
    
    .modal-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
    }
    
    .modal-btn.confirm {
        background: #28a745;
        color: white;
    }
    
    .modal-btn.confirm:hover {
        background: #218838;
    }
    
    .modal-btn.cancel {
        background: #6c757d;
        color: white;
    }
    
    .modal-btn.cancel:hover {
        background: #5a6268;
    }
    
    .modal-btn:not(.confirm):not(.cancel) {
        background: #8B4513;
        color: white;
    }
    
    .modal-btn:not(.confirm):not(.cancel):hover {
        background: #A0522D;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .form-group textarea {
        resize: vertical;
        min-height: 80px;
    }
    
    .btn-small {
        padding: 5px 10px;
        font-size: 12px;
        background: #8B4513;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .btn-small:hover {
        background: #A0522D;
    }
    
    .tab-btn {
        padding: 8px 16px;
        background: #f8f9fa;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .tab-btn.active {
        background: #8B4513;
        color: white;
        border-color: #8B4513;
    }
    
    .tab-btn:hover:not(.active) {
        background: #e9ecef;
    }
`;

// Injecter les styles
const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);

console.log('🔧 Fonctions manquantes implémentées avec succès');