/**
 * 📖 IMPERIUM - Système de Storyline Contextuelle
 * Gère les événements narratifs basés sur les actions du joueur
 */

class ContextualStorylineSystem {
    constructor() {
        this.currentChapter = 1;
        this.storyEvents = this.initStoryEvents();
        this.playerActions = new Set();
        this.triggeredEvents = new Set();
        this.storyState = this.loadStoryState();
    }

    initStoryEvents() {
        return {
            // Événements du Chapitre 1 - Les Premiers Pas
            chapter1: {
                'first_building': {
                    trigger: 'building_constructed',
                    condition: (data) => data.buildingType === 'forum',
                    story: {
                        title: 'Les Fondations de l\'Empire',
                        content: `
                            <div class="story-event">
                                <h3>🏛️ Le Premier Forum</h3>
                                <p>Excellent travail, Gouverneur ! Votre premier Forum s'élève fièrement au centre de votre cité. 
                                Les citoyens se rassemblent déjà autour de cette merveille architecturale.</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Marcus Flavius (Architecte en Chef) :</strong><br>
                                        "Gouverneur, ce Forum rivalise avec ceux de Rome ! Les colonnes de marbre que nous avons 
                                        utilisées impressionneront même les sénateurs de la capitale."
                                    </div>
                                </div>
                                
                                <p>Votre réputation grandit. Les nouvelles de votre compétence administrative 
                                commencent à se répandre dans les provinces voisines.</p>
                                
                                <div class="story-impact">
                                    <strong>Impact :</strong> +50 Réputation, +25 Population maximale
                                </div>
                            </div>
                        `,
                        rewards: {
                            reputation: 50,
                            populationMax: 25
                        }
                    }
                },
                'population_growth': {
                    trigger: 'population_milestone',
                    condition: (data) => data.population >= 200,
                    story: {
                        title: 'Une Cité qui Grandit',
                        content: `
                            <div class="story-event">
                                <h3>👥 L'Afflux de Nouveaux Citoyens</h3>
                                <p>Votre cité attire de plus en plus de colons ! Des familles entières arrivent 
                                chaque jour, attirées par la prospérité et la sécurité que vous offrez.</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Lucius Maximus (Censeur) :</strong><br>
                                        "Gouverneur, nous avons dépassé les 200 citoyens ! Des artisans, des marchands, 
                                        même quelques nobles mineurs s'installent dans notre cité. C'est un succès remarquable !"
                                    </div>
                                </div>
                                
                                <p>Avec cette croissance vient de nouveaux défis : il faudra bientôt penser à 
                                l'approvisionnement en eau, aux routes, et à la sécurité.</p>
                                
                                <div class="story-choice">
                                    <p><strong>Comment réagissez-vous ?</strong></p>
                                    <button onclick="contextualStory.makeChoice('expand_infrastructure')">
                                        Développer les infrastructures
                                    </button>
                                    <button onclick="contextualStory.makeChoice('focus_military')">
                                        Renforcer la sécurité
                                    </button>
                                </div>
                            </div>
                        `
                    }
                },
                'first_military': {
                    trigger: 'unit_recruited',
                    condition: (data) => data.unitType === 'velites' && data.isFirst,
                    story: {
                        title: 'Les Premières Légions',
                        content: `
                            <div class="story-event">
                                <h3>⚔️ Naissance d'une Armée</h3>
                                <p>Vos premiers soldats ont terminé leur entraînement ! Ces jeunes Vélites, 
                                armés de javelots et de boucliers légers, représentent l'embryon de votre future légion.</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Centurion Gaius Brutus :</strong><br>
                                        "Gouverneur, ces hommes sont prêts à mourir pour Rome et pour vous ! 
                                        Ils ne sont peut-être que des Vélites, mais leur courage vaut celui des Hastati."
                                    </div>
                                </div>
                                
                                <p>Avec une force militaire, même modeste, votre cité peut maintenant se défendre 
                                et envisager d'étendre son influence.</p>
                                
                                <div class="story-impact">
                                    <strong>Impact :</strong> +30 Sécurité, Déblocage des missions militaires
                                </div>
                            </div>
                        `,
                        rewards: {
                            security: 30,
                            unlocks: ['military_missions']
                        }
                    }
                }
            },
            
            // Événements du Chapitre 2 - L'Expansion
            chapter2: {
                'trade_route': {
                    trigger: 'trade_established',
                    condition: (data) => data.routeType === 'commercial',
                    story: {
                        title: 'Les Routes du Commerce',
                        content: `
                            <div class="story-event">
                                <h3>🛣️ Ouverture des Marchés</h3>
                                <p>Votre première route commerciale est établie ! Les marchands affluent, 
                                apportant des biens exotiques et de nouvelles opportunités.</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Marcus Mercator (Maître des Guildes) :</strong><br>
                                        "Gouverneur, les caravanes arrivent déjà ! Soie de Chine, épices d'Orient, 
                                        ambre du Nord... Notre cité devient un carrefour commercial !"
                                    </div>
                                </div>
                                
                                <p>Cette prospérité économique attire l'attention... et parfois la convoitise.</p>
                            </div>
                        `
                    }
                },
                'barbarian_threat': {
                    trigger: 'threat_detected',
                    condition: (data) => data.threatType === 'barbarian_raid',
                    story: {
                        title: 'Menace Barbare',
                        content: `
                            <div class="story-event">
                                <h3>⚡ Nuages à l'Horizon</h3>
                                <p>Vos éclaireurs rapportent des mouvements suspects aux frontières. 
                                Des tribus barbares semblent s'organiser...</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Centurion Gaius Brutus :</strong><br>
                                        "Gouverneur, nos espions confirment : une coalition de tribus germaniques 
                                        se forme. Ils convoitent nos richesses. Nous devons nous préparer !"
                                    </div>
                                </div>
                                
                                <div class="story-choice">
                                    <p><strong>Quelle est votre stratégie ?</strong></p>
                                    <button onclick="contextualStory.makeChoice('diplomatic_solution')">
                                        Tenter la diplomatie
                                    </button>
                                    <button onclick="contextualStory.makeChoice('military_preparation')">
                                        Préparer la guerre
                                    </button>
                                    <button onclick="contextualStory.makeChoice('fortify_city')">
                                        Fortifier la cité
                                    </button>
                                </div>
                            </div>
                        `
                    }
                }
            },
            
            // Événements spéciaux et aléatoires
            special: {
                'imperial_visit': {
                    trigger: 'random_event',
                    condition: (data) => data.playerLevel >= 5 && Math.random() < 0.1,
                    story: {
                        title: 'Visite Impériale',
                        content: `
                            <div class="story-event">
                                <h3>👑 L'Empereur en Personne !</h3>
                                <p>Incroyable ! Un messager impérial annonce la visite prochaine de l'Empereur Auguste 
                                en personne dans votre cité !</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Messager Impérial :</strong><br>
                                        "Par ordre de Sa Majesté Auguste, Empereur de Rome, Père de la Patrie : 
                                        Sa Majesté honorera votre cité de sa présence dans trois jours. 
                                        Préparez-vous dignement !"
                                    </div>
                                </div>
                                
                                <p>C'est l'honneur suprême ! Mais aussi une pression énorme. 
                                L'Empereur jugera votre travail...</p>
                                
                                <div class="story-impact">
                                    <strong>Préparatifs nécessaires :</strong> Organiser des festivités, 
                                    améliorer l'apparence de la cité, préparer des cadeaux
                                </div>
                            </div>
                        `
                    }
                },
                'natural_disaster': {
                    trigger: 'random_event',
                    condition: (data) => Math.random() < 0.05,
                    story: {
                        title: 'Colère des Dieux',
                        content: `
                            <div class="story-event">
                                <h3>🌪️ Catastrophe Naturelle</h3>
                                <p>Les dieux semblent en colère ! Un tremblement de terre a secoué votre cité, 
                                causant des dégâts aux bâtiments et semant la panique parmi la population.</p>
                                
                                <div class="story-dialogue">
                                    <div class="character-speak">
                                        <strong>Grand Prêtre Lucius Pius :</strong><br>
                                        "Gouverneur, nous devons apaiser les dieux ! Peut-être avons-nous négligé 
                                        les sacrifices ou offensé une divinité. Il faut agir vite !"
                                    </div>
                                </div>
                                
                                <div class="story-choice">
                                    <p><strong>Comment réagissez-vous ?</strong></p>
                                    <button onclick="contextualStory.makeChoice('religious_ceremony')">
                                        Organiser des cérémonies religieuses
                                    </button>
                                    <button onclick="contextualStory.makeChoice('rebuild_quickly')">
                                        Se concentrer sur la reconstruction
                                    </button>
                                    <button onclick="contextualStory.makeChoice('help_citizens')">
                                        Aider directement les citoyens
                                    </button>
                                </div>
                            </div>
                        `
                    }
                }
            }
        };
    }

    loadStoryState() {
        const saved = localStorage.getItem('imperium_story_state');
        return saved ? JSON.parse(saved) : {
            currentChapter: 1,
            playerChoices: {},
            characterRelationships: {},
            reputation: 0,
            storyFlags: {}
        };
    }

    saveStoryState() {
        localStorage.setItem('imperium_story_state', JSON.stringify(this.storyState));
    }

    triggerEvent(eventType, data = {}) {
        console.log(`📖 Événement déclenché: ${eventType}`, data);
        
        // Chercher les événements correspondants
        const matchingEvents = this.findMatchingEvents(eventType, data);
        
        matchingEvents.forEach(event => {
            if (!this.triggeredEvents.has(event.id)) {
                this.showStoryEvent(event);
                this.triggeredEvents.add(event.id);
            }
        });
    }

    findMatchingEvents(eventType, data) {
        const matchingEvents = [];
        const chapterKey = `chapter${this.currentChapter}`;
        
        // Vérifier les événements du chapitre actuel
        if (this.storyEvents[chapterKey]) {
            Object.entries(this.storyEvents[chapterKey]).forEach(([eventId, event]) => {
                if (event.trigger === eventType && event.condition(data)) {
                    matchingEvents.push({ id: eventId, ...event });
                }
            });
        }
        
        // Vérifier les événements spéciaux
        if (this.storyEvents.special) {
            Object.entries(this.storyEvents.special).forEach(([eventId, event]) => {
                if (event.trigger === eventType && event.condition(data)) {
                    matchingEvents.push({ id: eventId, ...event });
                }
            });
        }
        
        return matchingEvents;
    }

    showStoryEvent(event) {
        if (!window.dialogueSystem) return;
        
        console.log(`📖 Affichage de l'événement: ${event.story.title}`);
        
        window.dialogueSystem.showDialogue({
            title: event.story.title,
            content: event.story.content,
            buttons: event.story.choices ? [] : [
                {
                    text: 'Continuer',
                    action: () => {
                        if (event.story.rewards) {
                            this.applyRewards(event.story.rewards);
                        }
                    }
                }
            ]
        });
        
        // Jouer un son d'événement si disponible
        this.playEventSound(event.story.soundEffect);
    }

    makeChoice(choiceId) {
        console.log(`📖 Choix fait: ${choiceId}`);
        
        // Enregistrer le choix du joueur
        this.storyState.playerChoices[choiceId] = Date.now();
        
        // Appliquer les conséquences du choix
        this.applyChoiceConsequences(choiceId);
        
        // Fermer le dialogue
        if (window.dialogueSystem) {
            window.dialogueSystem.close();
        }
        
        this.saveStoryState();
    }

    applyChoiceConsequences(choiceId) {
        const consequences = {
            'expand_infrastructure': {
                message: 'Vous investissez dans les infrastructures. La population est ravie !',
                effects: { happiness: 20, populationGrowth: 1.5 }
            },
            'focus_military': {
                message: 'Vous renforcez la sécurité. Les citoyens se sentent protégés.',
                effects: { security: 30, militaryMorale: 15 }
            },
            'diplomatic_solution': {
                message: 'Vos émissaires partent négocier avec les barbares...',
                effects: { reputation: 25, diplomaticInfluence: 10 }
            },
            'military_preparation': {
                message: 'Vos légions se préparent au combat. L\'ennemi sera repoussé !',
                effects: { militaryStrength: 40, citizenFear: 10 }
            },
            'fortify_city': {
                message: 'Les fortifications sont renforcées. Votre cité devient imprenable !',
                effects: { defense: 50, constructionCost: 200 }
            },
            'religious_ceremony': {
                message: 'Les cérémonies apaisent les dieux et le peuple.',
                effects: { happiness: 30, religiousFavor: 20 }
            },
            'rebuild_quickly': {
                message: 'La reconstruction rapide impressionne les citoyens.',
                effects: { efficiency: 25, resources: -100 }
            },
            'help_citizens': {
                message: 'Votre compassion touche le cœur de vos sujets.',
                effects: { loyalty: 40, personalReputation: 30 }
            }
        };
        
        const consequence = consequences[choiceId];
        if (consequence) {
            // Afficher le message
            if (window.addImperiumLog) {
                window.addImperiumLog(consequence.message, 'story');
            }
            
            // Appliquer les effets
            this.applyEffects(consequence.effects);
        }
    }

    applyEffects(effects) {
        Object.entries(effects).forEach(([effect, value]) => {
            switch (effect) {
                case 'happiness':
                    if (window.gameState && window.gameState.provinces[0]) {
                        window.gameState.provinces[0].happiness += value;
                    }
                    break;
                case 'reputation':
                    this.storyState.reputation += value;
                    break;
                case 'resources':
                    if (window.gameState) {
                        window.gameState.resources.gold = Math.max(0, 
                            (window.gameState.resources.gold || 0) + value);
                    }
                    break;
                // Ajouter d'autres effets selon les besoins
            }
        });
        
        this.saveStoryState();
    }

    applyRewards(rewards) {
        if (rewards.reputation) {
            this.storyState.reputation += rewards.reputation;
        }
        
        if (rewards.populationMax && window.gameState && window.gameState.provinces[0]) {
            window.gameState.provinces[0].populationMax += rewards.populationMax;
        }
        
        if (rewards.unlocks) {
            rewards.unlocks.forEach(unlock => {
                this.storyState.storyFlags[unlock] = true;
            });
        }
        
        this.saveStoryState();
        
        // Afficher les récompenses
        if (window.addImperiumLog) {
            window.addImperiumLog('Récompenses d\'histoire reçues !', 'success');
        }
    }

    playEventSound(soundEffect) {
        if (!soundEffect) return;
        
        // Jouer un effet sonore si le système audio est disponible
        try {
            const audio = new Audio(`sounds/${soundEffect}.mp3`);
            audio.volume = 0.3;
            audio.play().catch(() => {
                // Ignorer les erreurs audio
            });
        } catch (e) {
            // Ignorer les erreurs audio
        }
    }

    // Méthodes pour déclencher des événements spécifiques
    onBuildingConstructed(buildingType, isFirst = false) {
        this.triggerEvent('building_constructed', { buildingType, isFirst });
    }

    onPopulationMilestone(population) {
        this.triggerEvent('population_milestone', { population });
    }

    onUnitRecruited(unitType, isFirst = false) {
        this.triggerEvent('unit_recruited', { unitType, isFirst });
    }

    onTradeEstablished(routeType) {
        this.triggerEvent('trade_established', { routeType });
    }

    onThreatDetected(threatType) {
        this.triggerEvent('threat_detected', { threatType });
    }

    onRandomEvent() {
        const playerLevel = window.gameState?.player?.level || 1;
        this.triggerEvent('random_event', { playerLevel });
    }

    // Progression de chapitre
    advanceChapter() {
        this.currentChapter++;
        this.storyState.currentChapter = this.currentChapter;
        this.saveStoryState();
        
        console.log(`📖 Progression vers le chapitre ${this.currentChapter}`);
        
        // Afficher l'introduction du nouveau chapitre
        if (window.cinematicSystem) {
            window.cinematicSystem.showChapterIntro(`chapter_${this.currentChapter}`);
        }
    }

    // Obtenir l'état actuel de l'histoire
    getStoryState() {
        return { ...this.storyState };
    }

    // Réinitialiser l'histoire
    resetStory() {
        this.currentChapter = 1;
        this.storyState = {
            currentChapter: 1,
            playerChoices: {},
            characterRelationships: {},
            reputation: 0,
            storyFlags: {}
        };
        this.triggeredEvents.clear();
        this.saveStoryState();
        
        console.log('📖 Histoire réinitialisée');
    }
}

// Initialisation globale
window.contextualStory = new ContextualStorylineSystem();

// Intégration avec les systèmes existants
document.addEventListener('DOMContentLoaded', () => {
    // Déclencher des événements aléatoires périodiquement
    setInterval(() => {
        if (Math.random() < 0.02) { // 2% de chance toutes les minutes
            window.contextualStory.onRandomEvent();
        }
    }, 60000); // Chaque minute
    
    console.log('📖 Système de storyline contextuelle initialisé');
});

console.log('📖 Système de storyline contextuelle chargé');