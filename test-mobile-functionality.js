// Script de test automatique pour les fonctionnalités mobiles
// À exécuter dans la console du navigateur mobile

console.log('🔥 Début des tests mobiles IMPERIUM');

// Test 1: Vérifier la détection mobile
function testMobileDetection() {
    console.log('📱 Test 1: Détection mobile');
    
    const isMobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('- Largeur écran:', window.innerWidth);
    console.log('- User Agent:', navigator.userAgent.substring(0, 50) + '...');
    console.log('- Mobile détecté:', isMobile ? '✅ OUI' : '❌ NON');
    
    return isMobile;
}

// Test 2: Vérifier le chargement des scripts
function testScriptLoading() {
    console.log('📜 Test 2: Chargement des scripts');
    
    const tests = [
        { name: 'MobileTouchHandler', available: typeof MobileTouchHandler !== 'undefined' },
        { name: 'MobileNavigation', available: typeof MobileNavigation !== 'undefined' },
        { name: 'navigateTo', available: typeof navigateTo === 'function' },
        { name: 'window.mobileTouchHandler', available: !!window.mobileTouchHandler },
        { name: 'window.mobileNav', available: !!window.mobileNav }
    ];
    
    tests.forEach(test => {
        console.log(`- ${test.name}: ${test.available ? '✅ OK' : '❌ MANQUANT'}`);
    });
    
    return tests.every(test => test.available);
}

// Test 3: Vérifier les éléments DOM
function testDOMElements() {
    console.log('🏗️ Test 3: Éléments DOM');
    
    const elements = [
        { name: 'Header', selector: '.imperium-header' },
        { name: 'Navigation', selector: '.imperium-sidebar' },
        { name: 'Ressources', selector: '.resources-display' },
        { name: 'Bâtiments', selector: '.building-slot' },
        { name: 'Boutons action', selector: '.quick-action-btn' }
    ];
    
    elements.forEach(element => {
        const found = document.querySelector(element.selector);
        console.log(`- ${element.name}: ${found ? '✅ TROUVÉ' : '❌ MANQUANT'}`);
    });
    
    return elements.every(element => document.querySelector(element.selector));
}

// Test 4: Tester les événements tactiles
function testTouchEvents() {
    console.log('👆 Test 4: Événements tactiles');
    
    let touchEventsWorking = 0;
    const totalEvents = 3;
    
    // Écouter les événements personnalisés
    document.addEventListener('mobileTap', () => {
        console.log('- mobileTap: ✅ FONCTIONNE');
        touchEventsWorking++;
    });
    
    document.addEventListener('mobileDoubleTap', () => {
        console.log('- mobileDoubleTap: ✅ FONCTIONNE');
        touchEventsWorking++;
    });
    
    document.addEventListener('mobileLongPress', () => {
        console.log('- mobileLongPress: ✅ FONCTIONNE');
        touchEventsWorking++;
    });
    
    // Simuler un événement tactile sur le premier élément interactif
    const interactiveElement = document.querySelector('.touch-interactive, .building-slot, button');
    if (interactiveElement) {
        console.log('- Simulation d\'événement tactile sur:', interactiveElement.className);
        
        // Créer un événement tactile simulé
        const touchEvent = new TouchEvent('touchstart', {
            touches: [new Touch({
                identifier: 1,
                target: interactiveElement,
                clientX: 100,
                clientY: 100
            })]
        });
        
        interactiveElement.dispatchEvent(touchEvent);
        
        setTimeout(() => {
            const touchEndEvent = new TouchEvent('touchend', {
                changedTouches: [new Touch({
                    identifier: 1,
                    target: interactiveElement,
                    clientX: 100,
                    clientY: 100
                })]
            });
            interactiveElement.dispatchEvent(touchEndEvent);
        }, 100);
    }
    
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`- Événements tactiles fonctionnels: ${touchEventsWorking}/${totalEvents}`);
            resolve(touchEventsWorking > 0);
        }, 1000);
    });
}

// Test 5: Tester la navigation mobile
function testMobileNavigation() {
    console.log('🧭 Test 5: Navigation mobile');
    
    if (!window.mobileNav) {
        console.log('- Navigation mobile: ❌ NON INITIALISÉE');
        return false;
    }
    
    console.log('- Navigation mobile: ✅ INITIALISÉE');
    console.log('- Onglet actuel:', window.mobileNav.currentTab);
    console.log('- Onglets disponibles:', window.mobileNav.tabs.map(t => t.id).join(', '));
    
    // Tester le changement d'onglet
    try {
        const originalTab = window.mobileNav.currentTab;
        window.mobileNav.switchTab('military');
        console.log('- Changement d\'onglet: ✅ FONCTIONNE');
        window.mobileNav.switchTab(originalTab); // Revenir à l'onglet original
        return true;
    } catch (error) {
        console.log('- Changement d\'onglet: ❌ ERREUR', error.message);
        return false;
    }
}

// Fonction principale de test
async function runAllTests() {
    console.log('🚀 Lancement de tous les tests...\n');
    
    const results = {
        mobileDetection: testMobileDetection(),
        scriptLoading: testScriptLoading(),
        domElements: testDOMElements(),
        touchEvents: await testTouchEvents(),
        mobileNavigation: testMobileNavigation()
    };
    
    console.log('\n📊 RÉSULTATS FINAUX:');
    Object.entries(results).forEach(([test, result]) => {
        console.log(`${result ? '✅' : '❌'} ${test}: ${result ? 'SUCCÈS' : 'ÉCHEC'}`);
    });
    
    const successCount = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log(`\n🎯 Score: ${successCount}/${totalTests} tests réussis`);
    
    if (successCount === totalTests) {
        console.log('🎉 TOUS LES TESTS SONT PASSÉS ! Le jeu devrait fonctionner sur mobile.');
    } else {
        console.log('⚠️ Certains tests ont échoué. Vérifiez les erreurs ci-dessus.');
    }
    
    return results;
}

// Exporter les fonctions pour utilisation manuelle
window.mobileTests = {
    runAllTests,
    testMobileDetection,
    testScriptLoading,
    testDOMElements,
    testTouchEvents,
    testMobileNavigation
};

// Lancer automatiquement les tests si on est sur mobile
if (window.innerWidth <= 768) {
    console.log('📱 Mobile détecté - Lancement automatique des tests dans 2 secondes...');
    setTimeout(runAllTests, 2000);
} else {
    console.log('💻 Desktop détecté - Utilisez mobileTests.runAllTests() pour lancer les tests manuellement');
}