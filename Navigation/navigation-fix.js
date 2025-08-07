// Fix pour la navigation IMPERIUM
// Ce script s'assure que la navigation est toujours visible et fonctionnelle

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initialisation du fix de navigation');
    
    // Attendre que les autres scripts se chargent
    setTimeout(() => {
        fixNavigationVisibility();
        setupNavigationEvents();
    }, 500);
});

function fixNavigationVisibility() {
    const sidebar = document.querySelector('.imperium-sidebar');
    
    if (!sidebar) {
        console.warn('⚠️ Sidebar non trouvée, création...');
        createSidebar();
        return;
    }
    
    // Vérifier si la navigation est vide
    if (!sidebar.innerHTML.trim() || sidebar.innerHTML === '<!-- Navigation générée dynamiquement par common-navigation.js -->') {
        console.log('🔧 Navigation vide détectée, génération...');
        generateNavigationContent();
    }
    
    // S'assurer que la sidebar est visible sur desktop
    if (window.innerWidth > 1024) {
        sidebar.style.display = 'block';
        sidebar.style.position = 'static';
    }
}

function createSidebar() {
    const imperiumBody = document.querySelector('.imperium-body');
    const mainContent = document.querySelector('.main-content');
    
    if (imperiumBody && mainContent) {
        const sidebar = document.createElement('aside');
        sidebar.className = 'imperium-sidebar';
        sidebar.style.cssText = `
            width: 280px;
            flex-shrink: 0;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
            border-radius: 1rem;
            border: 2px solid var(--border-gold);
            padding: 1.5rem;
            overflow-y: auto;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
        `;
        
        imperiumBody.insertBefore(sidebar, mainContent);
        generateNavigationContent();
    }
}

function generateNavigationContent() {
    const sidebar = document.querySelector('.imperium-sidebar');
    if (!sidebar) return;
    
    const navigationHTML = `
        <div class="nav-section">
            <h2 class="nav-title">Empire</h2>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" data-page="cite" onclick="navigateToPage('cite'); return false;">
                        <span class="nav-icon">🏛️</span> Ma Cité
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="monde" onclick="navigateToPage('monde'); return false;">
                        <span class="nav-icon">🌍</span> Monde
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="province" onclick="navigateToPage('province'); return false;">
                        <span class="nav-icon">🏝️</span> Province
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav-section">
            <h2 class="nav-title">Développement</h2>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" data-page="academie" onclick="navigateToPage('academie'); return false;">
                        <span class="nav-icon">📚</span> Académie
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="commerce" onclick="navigateToPage('commerce'); return false;">
                        <span class="nav-icon">⚖️</span> Commerce
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav-section">
            <h2 class="nav-title">Militaire</h2>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" data-page="legions" onclick="navigateToPage('legions'); return false;">
                        <span class="nav-icon">⚔️</span> Légions
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="flotte" onclick="navigateToPage('flotte'); return false;">
                        <span class="nav-icon">🚢</span> Flotte
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="simulateur" onclick="navigateToPage('simulateur'); return false;">
                        <span class="nav-icon">💥</span> Simulateur
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav-section">
            <h2 class="nav-title">Social</h2>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" data-page="diplomatie" onclick="navigateToPage('diplomatie'); return false;">
                        <span class="nav-icon">🤝</span> Diplomatie
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="alliance" onclick="navigateToPage('alliance'); return false;">
                        <span class="nav-icon">🛡️</span> Alliance
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" data-page="messages" onclick="navigateToPage('messages'); return false;">
                        <span class="nav-icon">✉️</span> Messages
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav-section">
            <h2 class="nav-title">Premium</h2>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" data-page="premium" onclick="navigateToPage('premium'); return false;">
                        <span class="nav-icon">👑</span> Premium
                    </a>
                </li>
            </ul>
        </div>
    `;
    
    sidebar.innerHTML = navigationHTML;
    
    // Ajouter les styles CSS nécessaires
    addNavigationStyles();
    
    // Mettre en surbrillance la page actuelle
    highlightCurrentPage();
    
    console.log('✅ Navigation générée avec succès');
}

function addNavigationStyles() {
    if (document.getElementById('navigation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'navigation-styles';
    style.textContent = `
        .nav-section {
            margin-bottom: 2rem;
        }

        .nav-title {
            color: var(--gold-primary);
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid var(--border-gold);
            padding-bottom: 0.5rem;
        }

        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .nav-item a {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: var(--text-light);
            text-decoration: none;
            padding: 0.75rem 1rem;
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            cursor: pointer;
        }

        .nav-item a:hover, .nav-item a.active {
            background: linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(245, 158, 11, 0.1));
            border-color: var(--gold-primary);
            transform: translateX(5px);
            color: var(--gold-light);
        }

        .nav-icon {
            font-size: 1.3rem;
            width: 24px;
            text-align: center;
        }

        @media (max-width: 1024px) {
            .imperium-sidebar {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                z-index: 1000;
                width: 280px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function setupNavigationEvents() {
    // Ajouter l'événement pour le bouton menu mobile
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileNavigation);
    }
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        const sidebar = document.querySelector('.imperium-sidebar');
        if (sidebar && window.innerWidth > 1024) {
            sidebar.style.display = 'block';
            sidebar.style.position = 'static';
            removeMobileOverlay();
        }
    });
}

function navigateToPage(pageKey) {
    const pages = {
        'cite': 'Empire/Cite.html',
        'monde': 'Empire/Monde.html',
        'province': 'Empire/Province.html',
        'academie': 'Developpement/Academie.html',
        'commerce': 'Developpement/Commerce.html',
        'legions': 'Militaire/Légions.html',
        'flotte': 'Militaire/Flotte.html',
        'simulateur': 'Militaire/Simulateur.html',
        'diplomatie': 'Social/Diplomatie.html',
        'alliance': 'Social/Alliance.html',
        'messages': 'Social/Messages.html',
        'premium': 'Premium/Premium.html'
    };
    
    const targetPage = pages[pageKey];
    if (targetPage) {
        // Déterminer le chemin relatif correct
        const currentPath = window.location.pathname;
        let basePath = '';
        
        if (currentPath.includes('/Empire/')) {
            basePath = '../';
        } else if (currentPath.includes('/Navigation/')) {
            basePath = '';
        } else {
            basePath = 'Navigation/';
        }
        
        const fullPath = basePath + targetPage;
        console.log(`🔗 Navigation vers: ${fullPath}`);
        
        // Fermer la navigation mobile si ouverte
        if (window.innerWidth <= 1024) {
            toggleMobileNavigation();
        }
        
        // Naviguer vers la page
        window.location.href = fullPath;
    }
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // Mapping des fichiers vers les clés de page
    const pageMapping = {
        'Cite.html': 'cite',
        'Monde.html': 'monde',
        'Province.html': 'province',
        'Academie.html': 'academie',
        'Commerce.html': 'commerce',
        'Légions.html': 'legions',
        'Flotte.html': 'flotte',
        'Simulateur.html': 'simulateur',
        'Diplomatie.html': 'diplomatie',
        'Alliance.html': 'alliance',
        'Messages.html': 'messages',
        'Premium.html': 'premium'
    };
    
    const currentPageKey = pageMapping[filename];
    if (currentPageKey) {
        const activeLink = document.querySelector(`[data-page="${currentPageKey}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function toggleMobileNavigation() {
    const sidebar = document.querySelector('.imperium-sidebar');
    if (!sidebar) return;
    
    if (window.innerWidth <= 1024) {
        if (sidebar.style.display === 'block') {
            sidebar.style.display = 'none';
            removeMobileOverlay();
        } else {
            sidebar.style.display = 'block';
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0';
            sidebar.style.height = '100vh';
            sidebar.style.zIndex = '1000';
            createMobileOverlay();
        }
    }
}

function createMobileOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-nav-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        backdrop-filter: blur(5px);
    `;
    overlay.onclick = toggleMobileNavigation;
    document.body.appendChild(overlay);
}

function removeMobileOverlay() {
    const overlay = document.getElementById('mobile-nav-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Exposer les fonctions globalement
window.navigateToPage = navigateToPage;
window.toggleMobileNavigation = toggleMobileNavigation;