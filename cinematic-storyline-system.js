/**
 * 🎬 IMPERIUM - Système de Cinématique et Storyline
 * Gère les cinématiques d'introduction et la narration du jeu
 */

class ImperiumCinematicSystem {
    constructor() {
        this.isPlaying = false;
        this.currentScene = 0;
        this.cinematicContainer = null;
        this.storylineData = this.initStorylineData();
        this.dialogueSystem = new DialogueSystem();
    }

    initStorylineData() {
        return {
            introduction: {
                title: "L'Ascension d'un Patricien",
                scenes: [
                    {
                        id: 'opening',
                        background: 'linear-gradient(135deg, #8B0000 0%, #2F1B14 100%)',
                        duration: 4000,
                        content: `
                            <div class="cinematic-scene">
                                <div class="scene-title">Anno Domini 27</div>
                                <div class="scene-subtitle">L'Empire Romain à son Apogée</div>
                                <div class="scene-description">
                                    Auguste règne sur un empire qui s'étend de l'Atlantique à l'Euphrate...
                                </div>
                            </div>
                        `,
                        audio: null
                    },
                    {
                        id: 'character_intro',
                        background: 'linear-gradient(135deg, #4A4A4A 0%, #1A1A1A 100%)',
                        duration: 5000,
                        content: `
                            <div class="cinematic-scene">
                                <div class="character-portrait">
                                    <div class="portrait-frame">
                                        <div class="portrait-image">👤</div>
                                    </div>
                                </div>
                                <div class="character-intro">
                                    <h2>Marcus Aurelius Imperialis</h2>
                                    <p>Jeune patricien romain, fils d'une famille noble mais sans territoire...</p>
                                    <p>Votre père vous confie une petite cité aux confins de l'Empire.</p>
                                </div>
                            </div>
                        `,
                        audio: null
                    },
                    {
                        id: 'mission_briefing',
                        background: 'linear-gradient(135deg, #8B4513 0%, #2F1B14 100%)',
                        duration: 6000,
                        content: `
                            <div class="cinematic-scene">
                                <div class="mission-scroll">
                                    <div class="scroll-header">📜 Décret Impérial</div>
                                    <div class="scroll-content">
                                        <p><strong>Par ordre de l'Empereur Auguste,</strong></p>
                                        <p>Il est confié au citoyen Marcus Aurelius Imperialis 
                                        la gouvernance de la cité de <strong>Nova Roma</strong>.</p>
                                        <p><strong>Mission :</strong></p>
                                        <ul>
                                            <li>Développer et fortifier la cité</li>
                                            <li>Étendre l'influence romaine</li>
                                            <li>Assurer la prospérité des citoyens</li>
                                            <li>Défendre l'Empire contre ses ennemis</li>
                                        </ul>
                                        <p><em>Que les dieux vous accompagnent !</em></p>
                                    </div>
                                </div>
                            </div>
                        `,
                        audio: null
                    }
                ]
            },
            chapters: [
                {
                    id: 'chapter_1',
                    title: 'Les Premiers Pas',
                    description: 'Établissez les fondations de votre empire',
                    objectives: [
                        'Construire un Forum',
                        'Atteindre 100 citoyens',
                        'Construire 3 bâtiments de production'
                    ],
                    reward: {
                        xp: 500,
                        gold: 200,
                        title: 'Fondateur de Cité'
                    }
                },
                {
                    id: 'chapter_2',
                    title: 'L\'Art de la Guerre',
                    description: 'Formez vos premières légions',
                    objectives: [
                        'Construire une Caserne',
                        'Recruter 50 soldats',
                        'Remporter votre première bataille'
                    ],
                    reward: {
                        xp: 750,
                        gold: 300,
                        title: 'Commandant Militaire'
                    }
                },
                {
                    id: 'chapter_3',
                    title: 'La Sagesse de l\'Empire',
                    description: 'Développez les sciences et technologies',
                    objectives: [
                        'Construire une Académie',
                        'Rechercher 3 technologies',
                        'Atteindre le rang d\'Édile'
                    ],
                    reward: {
                        xp: 1000,
                        gold: 500,
                        title: 'Érudit de l\'Empire'
                    }
                }
            ]
        };
    }

    async startIntroductionCinematic() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.createCinematicContainer();
        
        // Jouer chaque scène de l'introduction
        for (let i = 0; i < this.storylineData.introduction.scenes.length; i++) {
            await this.playScene(this.storylineData.introduction.scenes[i]);
        }
        
        // Transition vers le tutoriel
        await this.transitionToTutorial();
        
        this.isPlaying = false;
    }

    createCinematicContainer() {
        this.cinematicContainer = document.createElement('div');
        this.cinematicContainer.className = 'cinematic-container';
        this.cinematicContainer.innerHTML = `
            <div class="cinematic-overlay">
                <div class="cinematic-content"></div>
                <div class="cinematic-controls">
                    <button class="skip-button" onclick="cinematicSystem.skipCinematic()">
                        Passer ⏭️
                    </button>
                </div>
                <div class="cinematic-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.cinematicContainer);
        
        // Ajouter les styles
        this.addCinematicStyles();
    }

    addCinematicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cinematic-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .cinematic-overlay {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .cinematic-content {
                width: 90%;
                max-width: 800px;
                text-align: center;
                color: white;
                animation: fadeIn 1s ease-in-out;
            }
            
            .cinematic-scene {
                padding: 2rem;
            }
            
            .scene-title {
                font-size: 3rem;
                font-weight: bold;
                color: #FFD700;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                animation: slideInFromTop 1s ease-out;
            }
            
            .scene-subtitle {
                font-size: 1.5rem;
                color: #FFA500;
                margin-bottom: 2rem;
                font-style: italic;
                animation: slideInFromBottom 1s ease-out 0.5s both;
            }
            
            .scene-description {
                font-size: 1.2rem;
                line-height: 1.6;
                color: #E0E0E0;
                animation: fadeIn 1s ease-in-out 1s both;
            }
            
            .character-portrait {
                margin-bottom: 2rem;
            }
            
            .portrait-frame {
                width: 150px;
                height: 150px;
                margin: 0 auto 2rem;
                border: 4px solid #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #8B4513, #D2691E);
                animation: scaleIn 1s ease-out;
            }
            
            .portrait-image {
                font-size: 4rem;
                color: white;
            }
            
            .character-intro h2 {
                font-size: 2.5rem;
                color: #FFD700;
                margin-bottom: 1rem;
                animation: slideInFromLeft 1s ease-out 0.5s both;
            }
            
            .character-intro p {
                font-size: 1.2rem;
                color: #E0E0E0;
                margin-bottom: 1rem;
                animation: slideInFromRight 1s ease-out 1s both;
            }
            
            .mission-scroll {
                background: linear-gradient(135deg, #8B4513, #D2691E);
                border: 3px solid #FFD700;
                border-radius: 1rem;
                padding: 2rem;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
                animation: unfoldScroll 1.5s ease-out;
            }
            
            .scroll-header {
                font-size: 2rem;
                color: #FFD700;
                margin-bottom: 1.5rem;
                text-align: center;
                font-weight: bold;
            }
            
            .scroll-content {
                text-align: left;
                color: white;
                line-height: 1.6;
            }
            
            .scroll-content ul {
                margin: 1rem 0;
                padding-left: 2rem;
            }
            
            .scroll-content li {
                margin-bottom: 0.5rem;
            }
            
            .cinematic-controls {
                position: absolute;
                top: 2rem;
                right: 2rem;
            }
            
            .skip-button {
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: 2px solid #FFD700;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .skip-button:hover {
                background: rgba(255, 215, 0, 0.2);
                transform: scale(1.05);
            }
            
            .cinematic-progress {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #FFD700, #FFA500);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            /* Animations */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInFromTop {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInFromBottom {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInFromLeft {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes slideInFromRight {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.5); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes unfoldScroll {
                from { opacity: 0; transform: scale(0.8) rotateX(90deg); }
                to { opacity: 1; transform: scale(1) rotateX(0deg); }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .scene-title {
                    font-size: 2rem;
                }
                
                .scene-subtitle {
                    font-size: 1.2rem;
                }
                
                .character-intro h2 {
                    font-size: 2rem;
                }
                
                .mission-scroll {
                    padding: 1.5rem;
                }
                
                .cinematic-controls {
                    top: 1rem;
                    right: 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    async playScene(scene) {
        const content = this.cinematicContainer.querySelector('.cinematic-content');
        const progressBar = this.cinematicContainer.querySelector('.progress-bar');
        
        // Changer le fond
        this.cinematicContainer.style.background = scene.background;
        
        // Afficher le contenu de la scène
        content.innerHTML = scene.content;
        
        // Animer la barre de progression
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 100 / (scene.duration / 50);
                progressBar.style.width = `${Math.min(progress, 100)}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
            }, 50);
        });
    }

    async transitionToTutorial() {
        // Transition fluide vers le tutoriel
        const content = this.cinematicContainer.querySelector('.cinematic-content');
        content.innerHTML = `
            <div class="cinematic-scene">
                <div class="scene-title">Votre Règne Commence</div>
                <div class="scene-description">
                    Préparez-vous à découvrir les secrets de l'administration romaine...
                </div>
                <button class="start-tutorial-btn" onclick="cinematicSystem.startTutorial()">
                    Commencer le Tutoriel 🏛️
                </button>
            </div>
        `;
        
        // Ajouter le style du bouton
        const buttonStyle = document.createElement('style');
        buttonStyle.textContent = `
            .start-tutorial-btn {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #8B4513;
                border: none;
                padding: 1rem 2rem;
                font-size: 1.2rem;
                font-weight: bold;
                border-radius: 0.5rem;
                cursor: pointer;
                margin-top: 2rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            }
            
            .start-tutorial-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
            }
        `;
        document.head.appendChild(buttonStyle);
        
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    startTutorial() {
        // Fermer la cinématique
        this.closeCinematic();
        
        // Démarrer le tutoriel interactif
        if (window.imperiumTutorial) {
            window.imperiumTutorial.start();
        }
        
        // Naviguer vers la page Ma Cité
        this.navigateToMaCite();
    }

    navigateToMaCite() {
        // Rediriger vers la page Ma Cité avec le paramètre fromStart
        window.location.href = 'Navigation/Empire/Ma Cité/Ma Cité Romaine.html?fromStart=true';
    }

    skipCinematic() {
        if (confirm('Êtes-vous sûr de vouloir passer la cinématique d\'introduction ?')) {
            this.startTutorial();
        }
    }

    closeCinematic() {
        if (this.cinematicContainer) {
            this.cinematicContainer.style.opacity = '0';
            setTimeout(() => {
                if (this.cinematicContainer && this.cinematicContainer.parentNode) {
                    this.cinematicContainer.parentNode.removeChild(this.cinematicContainer);
                }
                this.cinematicContainer = null;
            }, 500);
        }
        this.isPlaying = false;
    }

    // Système de chapitres et progression narrative
    getCurrentChapter() {
        // Déterminer le chapitre actuel basé sur la progression du joueur
        if (!window.gameState) return this.storylineData.chapters[0];
        
        const playerLevel = window.gameState.player?.level || 1;
        const buildingsCount = Object.keys(window.gameState.buildings || {}).length;
        
        if (playerLevel >= 5 && buildingsCount >= 5) {
            return this.storylineData.chapters[2]; // Chapitre 3
        } else if (playerLevel >= 3 && buildingsCount >= 3) {
            return this.storylineData.chapters[1]; // Chapitre 2
        } else {
            return this.storylineData.chapters[0]; // Chapitre 1
        }
    }

    showChapterIntro(chapterId) {
        const chapter = this.storylineData.chapters.find(c => c.id === chapterId);
        if (!chapter) return;
        
        // Afficher l'introduction du chapitre
        this.dialogueSystem.showDialogue({
            title: chapter.title,
            content: `
                <div class="chapter-intro">
                    <h3>${chapter.title}</h3>
                    <p>${chapter.description}</p>
                    <div class="chapter-objectives">
                        <h4>Objectifs :</h4>
                        <ul>
                            ${chapter.objectives.map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="chapter-reward">
                        <h4>Récompenses :</h4>
                        <p>+${chapter.reward.xp} XP, +${chapter.reward.gold} Or</p>
                        <p>Titre : "${chapter.reward.title}"</p>
                    </div>
                </div>
            `,
            buttons: [
                {
                    text: 'Commencer le Chapitre',
                    action: () => this.dialogueSystem.close()
                }
            ]
        });
    }
}

/**
 * Système de Dialogues Contextuels
 */
class DialogueSystem {
    constructor() {
        this.isActive = false;
        this.dialogueContainer = null;
        this.currentDialogue = null;
    }

    showDialogue(dialogueData) {
        if (this.isActive) return;
        
        this.isActive = true;
        this.currentDialogue = dialogueData;
        this.createDialogueContainer();
        this.displayDialogue(dialogueData);
    }

    createDialogueContainer() {
        this.dialogueContainer = document.createElement('div');
        this.dialogueContainer.className = 'dialogue-container';
        this.dialogueContainer.innerHTML = `
            <div class="dialogue-overlay">
                <div class="dialogue-box">
                    <div class="dialogue-content"></div>
                    <div class="dialogue-buttons"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.dialogueContainer);
        this.addDialogueStyles();
    }

    addDialogueStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .dialogue-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2500;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .dialogue-overlay {
                background: rgba(0, 0, 0, 0.8);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease-out;
            }
            
            .dialogue-box {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border: 2px solid #FFD700;
                border-radius: 1rem;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                animation: scaleIn 0.3s ease-out;
            }
            
            .dialogue-content {
                color: white;
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .dialogue-content h3 {
                color: #FFD700;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            
            .dialogue-content h4 {
                color: #FFA500;
                margin: 1rem 0 0.5rem 0;
            }
            
            .dialogue-content ul {
                margin: 0.5rem 0;
                padding-left: 2rem;
            }
            
            .dialogue-buttons {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .dialogue-btn {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #8B4513;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .dialogue-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
            }
            
            .chapter-intro {
                text-align: center;
            }
            
            .chapter-objectives, .chapter-reward {
                background: rgba(0, 0, 0, 0.3);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
            }
        `;
        
        document.head.appendChild(style);
    }

    displayDialogue(dialogueData) {
        const content = this.dialogueContainer.querySelector('.dialogue-content');
        const buttonsContainer = this.dialogueContainer.querySelector('.dialogue-buttons');
        
        content.innerHTML = dialogueData.content;
        
        // Créer les boutons
        if (dialogueData.buttons) {
            dialogueData.buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.className = 'dialogue-btn';
                btn.textContent = button.text;
                btn.onclick = () => {
                    if (button.action) button.action();
                    this.close();
                };
                buttonsContainer.appendChild(btn);
            });
        } else {
            // Bouton par défaut
            const btn = document.createElement('button');
            btn.className = 'dialogue-btn';
            btn.textContent = 'Continuer';
            btn.onclick = () => this.close();
            buttonsContainer.appendChild(btn);
        }
    }

    close() {
        if (this.dialogueContainer) {
            this.dialogueContainer.style.opacity = '0';
            setTimeout(() => {
                if (this.dialogueContainer && this.dialogueContainer.parentNode) {
                    this.dialogueContainer.parentNode.removeChild(this.dialogueContainer);
                }
                this.dialogueContainer = null;
                this.isActive = false;
                this.currentDialogue = null;
            }, 300);
        }
    }
}

// Initialisation globale
window.cinematicSystem = new ImperiumCinematicSystem();
window.dialogueSystem = new DialogueSystem();

console.log('🎬 Système de cinématique et storyline initialisé');