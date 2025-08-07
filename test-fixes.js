/**
 * Script de test pour vérifier les corrections IMPERIUM
 */

console.log('🔧 Démarrage des tests de correction...');

// Test 1: Vérifier que gameState.provinces existe
function testProvinces() {
    console.log('\n=== Test 1: Provinces ===');
    
    if (typeof gameState !== 'undefined') {
        console.log('✅ gameState existe');
        
        if (gameState.provinces) {
            console.log('✅ gameState.provinces existe');
            
            if (gameState.provinces[0]) {
                console.log('✅ gameState.provinces[0] existe');
                console.log('📊 Province:', gameState.provinces[0]);
                
                // Test d'accès sécurisé
                try {
                    const happiness = gameState.provinces[0].happiness;
                    const population = gameState.provinces[0].population;
                    console.log(`✅ Accès sécurisé: bonheur=${happiness}, population=${population}`);
                } catch (e) {
                    console.error('❌ Erreur d\'accès:', e.message);
                }
            } else {
                console.error('❌ gameState.provinces[0] n\'existe pas');
            }
        } else {
            console.error('❌ gameState.provinces n\'existe pas');
        }
    } else {
        console.error('❌ gameState n\'existe pas');
    }
}

// Test 2: Vérifier BUILDINGS_CONFIG
function testBuildingsConfig() {
    console.log('\n=== Test 2: BUILDINGS_CONFIG ===');
    
    if (typeof BUILDINGS_CONFIG !== 'undefined') {
        console.log('✅ BUILDINGS_CONFIG existe');
        console.log('📊 Nombre de bâtiments:', Object.keys(BUILDINGS_CONFIG).length);
        
        // Lister quelques bâtiments
        Object.keys(BUILDINGS_CONFIG).slice(0, 3).forEach(building => {
            const config = BUILDINGS_CONFIG[building];
            console.log(`✅ ${building}: ${config.name} ${config.icon}`);
        });
    } else {
        console.error('❌ BUILDINGS_CONFIG n\'existe pas');
    }
}

// Test 3: Simuler la boucle de jeu
function testGameLoop() {
    console.log('\n=== Test 3: Boucle de jeu ===');
    
    try {
        // Simuler les vérifications de la boucle de jeu
        if (!gameState.provinces || !gameState.provinces[0]) {
            console.warn('⚠️ Provinces manquantes, initialisation nécessaire');
            return false;
        }
        
        // Test d'accès aux propriétés
        const happiness = gameState.provinces[0].happiness;
        const population = gameState.provinces[0].population;
        
        console.log('✅ Simulation de boucle de jeu réussie');
        console.log(`📊 Bonheur: ${happiness}, Population: ${population}`);
        return true;
    } catch (e) {
        console.error('❌ Erreur dans la simulation de boucle:', e.message);
        return false;
    }
}

// Test 4: Vérifier les éléments DOM
function testDOMElements() {
    console.log('\n=== Test 4: Éléments DOM ===');
    
    const elementsToTest = ['view-world', 'view-city', 'view-trade'];
    
    elementsToTest.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            console.log(`✅ ${elementId} trouvé`);
        } else {
            console.warn(`⚠️ ${elementId} non trouvé`);
        }
    });
}

// Test 5: Vérifier les fonctions de correction
function testFixFunctions() {
    console.log('\n=== Test 5: Fonctions de correction ===');
    
    // Tester initializeProvinces si elle existe
    if (typeof initializeProvinces === 'function') {
        console.log('✅ initializeProvinces existe');
        
        // Sauvegarder l'état actuel
        const originalProvinces = gameState.provinces;
        
        // Supprimer les provinces pour tester
        gameState.provinces = null;
        console.log('⚠️ Provinces supprimées pour test');
        
        // Appeler la fonction de correction
        initializeProvinces();
        
        if (gameState.provinces && gameState.provinces[0]) {
            console.log('✅ initializeProvinces fonctionne correctement');
        } else {
            console.error('❌ initializeProvinces a échoué');
        }
        
        // Restaurer l'état original
        gameState.provinces = originalProvinces;
    } else {
        console.warn('⚠️ initializeProvinces n\'existe pas (normal si pas encore chargée)');
    }
}

// Exécuter tous les tests
function runAllTests() {
    console.log('🚀 Exécution de tous les tests...');
    
    testProvinces();
    testBuildingsConfig();
    testGameLoop();
    testDOMElements();
    testFixFunctions();
    
    console.log('\n✅ Tests terminés');
}

// Exporter les fonctions pour utilisation dans la console
window.testFixes = {
    testProvinces,
    testBuildingsConfig,
    testGameLoop,
    testDOMElements,
    testFixFunctions,
    runAllTests
};

// Exécuter automatiquement si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000); // Attendre 1 seconde pour que tout soit chargé
    });
} else {
    setTimeout(runAllTests, 1000);
}

console.log('💡 Utilisez testFixes.runAllTests() dans la console pour relancer les tests');