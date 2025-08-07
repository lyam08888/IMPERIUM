/**
 * 🏛️ IMPERIUM - Système de Sauvegarde Manuelle
 * Sauvegarde et chargement manuel avec slots multiples
 */

class ImperiumManualSaveSystem {
    constructor() {
        this.maxSaveSlots = 5;
        this.currentSaveSlot = 1;
        this.savePrefix = 'imperium_manual_save_';
        this.init();
    }

    init() {
        this.setupSaveButtons();
        console.log('💾 Système de sauvegarde manuelle initialisé');
    }

    setupSaveButtons() {
        // Bouton de sauvegarde principal
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.showSaveMenu();
            });
        }

        // Bouton de chargement
        const loadBtn = document.getElementById('load-btn');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => {
                this.showLoadMenu();
            });
        }
    }

    showSaveMenu() {
        const saveSlots = this.getAllSaveSlots();
        
        const saveModal = document.createElement('div');
        saveModal.className = 'modal-overlay save-menu-modal';
        saveModal.innerHTML = `
            <div class="modal-content save-menu-content">
                <h3 class="modal-title">💾 Sauvegarder la Partie</h3>
                <div class="modal-body">
                    <div class="save-slots">
                        ${this.renderSaveSlots(saveSlots, 'save')}
                    </div>
                    <div class="save-options">
                        <div class="save-description">
                            <label for="save-description-input">Description de la sauvegarde :</label>
                            <input type="text" id="save-description-input" 
                                   placeholder="Ex: Avant la grande expansion..." 
                                   maxlength="100">
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(saveModal);
        saveModal.style.display = 'flex';
    }

    showLoadMenu() {
        const saveSlots = this.getAllSaveSlots();
        const hasAnySave = Object.keys(saveSlots).length > 0;
        
        if (!hasAnySave) {
            showNotification('Aucune sauvegarde trouvée !', 'warning');
            return;
        }

        const loadModal = document.createElement('div');
        loadModal.className = 'modal-overlay load-menu-modal';
        loadModal.innerHTML = `
            <div class="modal-content load-menu-content">
                <h3 class="modal-title">📂 Charger une Partie</h3>
                <div class="modal-body">
                    <div class="save-slots">
                        ${this.renderSaveSlots(saveSlots, 'load')}
                    </div>
                    <div class="load-warning">
                        ⚠️ <strong>Attention :</strong> Charger une sauvegarde remplacera votre progression actuelle !
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(loadModal);
        loadModal.style.display = 'flex';
    }

    renderSaveSlots(saveSlots, mode) {
        let html = '';
        
        for (let i = 1; i <= this.maxSaveSlots; i++) {
            const saveData = saveSlots[i];
            const isEmpty = !saveData;
            
            html += `
                <div class="save-slot ${isEmpty ? 'empty' : 'occupied'}" 
                     onclick="manualSaveSystem.${mode}Game(${i})">
                    <div class="slot-header">
                        <span class="slot-number">Slot ${i}</span>
                        ${!isEmpty ? `
                            <button class="delete-save-btn" 
                                    onclick="event.stopPropagation(); manualSaveSystem.deleteSave(${i})"
                                    title="Supprimer cette sauvegarde">
                                🗑️
                            </button>
                        ` : ''}
                    </div>
                    
                    ${isEmpty ? `
                        <div class="empty-slot-content">
                            <div class="empty-icon">${mode === 'save' ? '💾' : '📂'}</div>
                            <div class="empty-text">
                                ${mode === 'save' ? 'Sauvegarder ici' : 'Slot vide'}
                            </div>
                        </div>
                    ` : `
                        <div class="save-info">
                            <div class="save-title">${saveData.description || 'Sans titre'}</div>
                            <div class="save-details">
                                <div class="save-player">
                                    👤 ${saveData.playerName} - ${saveData.playerTitle}
                                </div>
                                <div class="save-level">
                                    🏆 Niveau ${saveData.playerLevel}
                                </div>
                                <div class="save-date">
                                    📅 ${this.formatDate(saveData.timestamp)}
                                </div>
                                <div class="save-playtime">
                                    ⏱️ ${this.formatPlayTime(saveData.playTime)}
                                </div>
                            </div>
                            ${mode === 'save' ? `
                                <div class="overwrite-warning">
                                    ⚠️ Écraser cette sauvegarde
                                </div>
                            ` : ''}
                        </div>
                    `}
                </div>
            `;
        }
        
        return html;
    }

    getAllSaveSlots() {
        const saves = {};
        
        for (let i = 1; i <= this.maxSaveSlots; i++) {
            const saveKey = this.savePrefix + i;
            const saveData = localStorage.getItem(saveKey);
            
            if (saveData) {
                try {
                    saves[i] = JSON.parse(saveData);
                } catch (error) {
                    console.error(`Erreur lors du chargement du slot ${i}:`, error);
                }
            }
        }
        
        return saves;
    }

    saveGame(slotNumber) {
        const description = document.getElementById('save-description-input')?.value || '';
        
        try {
            const saveData = this.createSaveData(description);
            const saveKey = this.savePrefix + slotNumber;
            
            localStorage.setItem(saveKey, JSON.stringify(saveData));
            
            fermerModal();
            showNotification(`Partie sauvegardée dans le slot ${slotNumber} !`, 'success');
            
            console.log(`💾 Sauvegarde réussie dans le slot ${slotNumber}`);
            
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            showNotification('Erreur lors de la sauvegarde !', 'error');
        }
    }

    loadGame(slotNumber) {
        const saveKey = this.savePrefix + slotNumber;
        const saveData = localStorage.getItem(saveKey);
        
        if (!saveData) {
            showNotification('Aucune sauvegarde dans ce slot !', 'warning');
            return;
        }

        // Confirmation avant chargement
        const confirmModal = document.createElement('div');
        confirmModal.className = 'modal-overlay';
        confirmModal.innerHTML = `
            <div class="modal-content">
                <h3 class="modal-title">⚠️ Confirmer le Chargement</h3>
                <div class="modal-body">
                    <p>Êtes-vous sûr de vouloir charger cette sauvegarde ?</p>
                    <p><strong>Votre progression actuelle sera perdue !</strong></p>
                    
                    <div class="current-vs-save">
                        <div class="comparison-column">
                            <h4>Progression Actuelle</h4>
                            <div class="progress-info">
                                <div>👤 ${gameState.player.name}</div>
                                <div>🏆 Niveau ${gameState.player.level}</div>
                                <div>💰 ${gameState.resources.gold} or</div>
                            </div>
                        </div>
                        
                        <div class="comparison-arrow">→</div>
                        
                        <div class="comparison-column">
                            <h4>Sauvegarde à Charger</h4>
                            <div class="progress-info">
                                <div>👤 ${JSON.parse(saveData).playerName}</div>
                                <div>🏆 Niveau ${JSON.parse(saveData).playerLevel}</div>
                                <div>💰 ${JSON.parse(saveData).gameState.resources.gold} or</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="manualSaveSystem.confirmLoad(${slotNumber})" class="modal-btn confirm">
                        Oui, charger
                    </button>
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        // Fermer le modal de chargement d'abord
        fermerModal();
        
        document.body.appendChild(confirmModal);
        confirmModal.style.display = 'flex';
    }

    confirmLoad(slotNumber) {
        const saveKey = this.savePrefix + slotNumber;
        const saveData = localStorage.getItem(saveKey);
        
        try {
            const parsedData = JSON.parse(saveData);
            
            // Restaurer l'état du jeu
            this.restoreGameState(parsedData);
            
            fermerModal();
            showNotification(`Partie chargée depuis le slot ${slotNumber} !`, 'success');
            
            // Recharger la page pour appliquer tous les changements
            setTimeout(() => {
                location.reload();
            }, 1000);
            
            console.log(`📂 Chargement réussi depuis le slot ${slotNumber}`);
            
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            showNotification('Erreur lors du chargement !', 'error');
        }
    }

    deleteSave(slotNumber) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la sauvegarde du slot ${slotNumber} ?`)) {
            const saveKey = this.savePrefix + slotNumber;
            localStorage.removeItem(saveKey);
            
            showNotification(`Sauvegarde du slot ${slotNumber} supprimée !`, 'success');
            
            // Rafraîchir le menu
            fermerModal();
            setTimeout(() => {
                this.showLoadMenu();
            }, 100);
        }
    }

    createSaveData(description) {
        const timestamp = Date.now();
        
        return {
            // Métadonnées
            timestamp: timestamp,
            description: description,
            playerName: gameState.player.name,
            playerLevel: gameState.player.level,
            playerTitle: gameState.player.title,
            playTime: this.calculatePlayTime(),
            version: '1.0.0',
            
            // État complet du jeu
            gameState: {
                player: { ...gameState.player },
                resources: { ...gameState.resources },
                buildings: JSON.parse(JSON.stringify(gameState.buildings)),
                technologies: [...gameState.technologies],
                units: { ...gameState.units },
                progression: { ...gameState.progression },
                lastUpdate: gameState.lastUpdate,
                gameStarted: gameState.gameStarted
            }
        };
    }

    restoreGameState(saveData) {
        // Restaurer l'état principal
        Object.assign(gameState, saveData.gameState);
        
        // Mettre à jour l'affichage
        if (typeof updateResourcesDisplay === 'function') {
            updateResourcesDisplay();
        }
        
        if (typeof progression !== 'undefined') {
            progression.playerLevel = gameState.player.level;
            progression.playerXP = gameState.player.xp;
            progression.playerTitle = gameState.player.title;
            progression.unlockedFeatures = gameState.progression.unlockedFeatures;
            progression.updateUIAccess();
            progression.updatePlayerDisplay();
        }
        
        if (typeof buildingSystem !== 'undefined') {
            buildingSystem.setupBuildingGrid();
        }
    }

    calculatePlayTime() {
        const gameStarted = gameState.gameStarted || Date.now();
        return Date.now() - gameStarted;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatPlayTime(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}min`;
        } else {
            return `${minutes}min`;
        }
    }

    // Sauvegarde rapide (Ctrl+S)
    quickSave() {
        this.saveGame(1); // Toujours sauvegarder dans le slot 1
    }

    // Chargement rapide (Ctrl+L)
    quickLoad() {
        const saveKey = this.savePrefix + 1;
        const saveData = localStorage.getItem(saveKey);
        
        if (saveData) {
            this.confirmLoad(1);
        } else {
            showNotification('Aucune sauvegarde rapide trouvée !', 'warning');
        }
    }

    // Exporter une sauvegarde
    exportSave(slotNumber) {
        const saveKey = this.savePrefix + slotNumber;
        const saveData = localStorage.getItem(saveKey);
        
        if (!saveData) {
            showNotification('Aucune sauvegarde dans ce slot !', 'warning');
            return;
        }

        const blob = new Blob([saveData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `imperium_save_slot_${slotNumber}_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Sauvegarde exportée !', 'success');
    }

    // Importer une sauvegarde
    importSave() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const saveData = JSON.parse(e.target.result);
                    
                    // Valider la structure de la sauvegarde
                    if (!saveData.gameState || !saveData.playerName) {
                        throw new Error('Format de sauvegarde invalide');
                    }
                    
                    // Demander dans quel slot sauvegarder
                    this.showImportSlotSelection(saveData);
                    
                } catch (error) {
                    console.error('Erreur lors de l\'importation:', error);
                    showNotification('Fichier de sauvegarde invalide !', 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    showImportSlotSelection(importedSave) {
        const saveSlots = this.getAllSaveSlots();
        
        const importModal = document.createElement('div');
        importModal.className = 'modal-overlay';
        importModal.innerHTML = `
            <div class="modal-content">
                <h3 class="modal-title">📥 Importer la Sauvegarde</h3>
                <div class="modal-body">
                    <div class="import-info">
                        <h4>Sauvegarde à importer :</h4>
                        <div class="imported-save-info">
                            <div>👤 ${importedSave.playerName} - ${importedSave.playerTitle}</div>
                            <div>🏆 Niveau ${importedSave.playerLevel}</div>
                            <div>📅 ${this.formatDate(importedSave.timestamp)}</div>
                        </div>
                    </div>
                    
                    <div class="slot-selection">
                        <h4>Choisir le slot de destination :</h4>
                        <div class="import-slots">
                            ${Array.from({length: this.maxSaveSlots}, (_, i) => i + 1).map(slotNum => `
                                <button class="import-slot-btn ${saveSlots[slotNum] ? 'occupied' : 'empty'}"
                                        onclick="manualSaveSystem.confirmImport(${slotNum}, '${btoa(JSON.stringify(importedSave))}')">
                                    <div class="slot-header">Slot ${slotNum}</div>
                                    ${saveSlots[slotNum] ? `
                                        <div class="slot-occupied">
                                            <div>⚠️ Occupé</div>
                                            <div class="small-text">${saveSlots[slotNum].playerName}</div>
                                        </div>
                                    ` : `
                                        <div class="slot-empty">✅ Libre</div>
                                    `}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="fermerModal()" class="modal-btn cancel">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(importModal);
        importModal.style.display = 'flex';
    }

    confirmImport(slotNumber, encodedSave) {
        try {
            const importedSave = JSON.parse(atob(encodedSave));
            const saveKey = this.savePrefix + slotNumber;
            
            localStorage.setItem(saveKey, JSON.stringify(importedSave));
            
            fermerModal();
            showNotification(`Sauvegarde importée dans le slot ${slotNumber} !`, 'success');
            
        } catch (error) {
            console.error('Erreur lors de l\'importation:', error);
            showNotification('Erreur lors de l\'importation !', 'error');
        }
    }
}

// Styles CSS pour le système de sauvegarde
const saveSystemStyles = `
    .save-menu-content, .load-menu-content {
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .save-slots {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
        max-height: 400px;
        overflow-y: auto;
    }
    
    .save-slot {
        border: 2px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(30, 41, 59, 0.5);
        position: relative;
    }
    
    .save-slot.empty:hover {
        border-color: #d97706;
        background: rgba(217, 119, 6, 0.1);
    }
    
    .save-slot.occupied:hover {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.1);
    }
    
    .slot-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .slot-number {
        font-weight: bold;
        color: #d97706;
        font-size: 1.1rem;
    }
    
    .delete-save-btn {
        background: #ef4444;
        border: none;
        border-radius: 0.3rem;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .delete-save-btn:hover {
        background: #dc2626;
        transform: scale(1.1);
    }
    
    .empty-slot-content {
        text-align: center;
        color: #94a3b8;
        padding: 2rem 0;
    }
    
    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .empty-text {
        font-size: 1.1rem;
        font-weight: bold;
    }
    
    .save-info {
        color: #e2e8f0;
    }
    
    .save-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #d97706;
        margin-bottom: 1rem;
    }
    
    .save-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .save-details > div {
        background: rgba(15, 23, 42, 0.5);
        padding: 0.5rem;
        border-radius: 0.3rem;
        font-size: 0.9rem;
    }
    
    .overwrite-warning {
        color: #f59e0b;
        font-weight: bold;
        text-align: center;
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 0.3rem;
        padding: 0.5rem;
    }
    
    .save-description {
        margin-bottom: 1rem;
    }
    
    .save-description label {
        display: block;
        margin-bottom: 0.5rem;
        color: #e2e8f0;
        font-weight: bold;
    }
    
    .save-description input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #374151;
        border-radius: 0.5rem;
        background: rgba(30, 41, 59, 0.8);
        color: #e2e8f0;
        font-family: 'Times New Roman', serif;
    }
    
    .save-description input:focus {
        outline: none;
        border-color: #d97706;
        box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
    }
    
    .load-warning {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        color: #f59e0b;
        text-align: center;
        margin-top: 1rem;
    }
    
    .current-vs-save {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 1rem;
        align-items: center;
        margin: 1rem 0;
    }
    
    .comparison-column {
        text-align: center;
    }
    
    .comparison-column h4 {
        color: #d97706;
        margin-bottom: 0.5rem;
    }
    
    .progress-info {
        background: rgba(30, 41, 59, 0.5);
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .progress-info > div {
        margin-bottom: 0.3rem;
    }
    
    .comparison-arrow {
        font-size: 2rem;
        color: #d97706;
        font-weight: bold;
    }
    
    .import-slots {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .import-slot-btn {
        border: 2px solid #374151;
        border-radius: 0.5rem;
        padding: 1rem;
        background: rgba(30, 41, 59, 0.5);
        color: #e2e8f0;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .import-slot-btn.empty:hover {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.1);
    }
    
    .import-slot-btn.occupied:hover {
        border-color: #f59e0b;
        background: rgba(245, 158, 11, 0.1);
    }
    
    .import-slot-btn .slot-header {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .slot-occupied {
        color: #f59e0b;
    }
    
    .slot-empty {
        color: #22c55e;
    }
    
    .small-text {
        font-size: 0.8rem;
        opacity: 0.8;
    }
`;

// Injecter les styles
const saveSystemStyleSheet = document.createElement('style');
saveSystemStyleSheet.textContent = saveSystemStyles;
document.head.appendChild(saveSystemStyleSheet);

// Créer l'instance globale
const manualSaveSystem = new ImperiumManualSaveSystem();

// Raccourcis clavier
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
            case 's':
                event.preventDefault();
                manualSaveSystem.quickSave();
                break;
            case 'l':
                event.preventDefault();
                manualSaveSystem.quickLoad();
                break;
        }
    }
});

// Export global
window.manualSaveSystem = manualSaveSystem;
window.ImperiumManualSaveSystem = ImperiumManualSaveSystem;

console.log('💾 Système de sauvegarde manuelle chargé');