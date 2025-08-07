# Script d'intégration du système de navigation popup 2025
Write-Host "🚀 INTÉGRATION DU SYSTÈME DE NAVIGATION POPUP 2025" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Fonction pour ajouter les liens CSS/JS à un fichier HTML
function Add-NavigationPopupToHTML {
    param(
        [string]$FilePath
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw
        
        # Vérifier si déjà intégré
        if ($content -match "navigation-popup-2025\.css") {
            Write-Host "✅ $FilePath - Déjà intégré" -ForegroundColor Green
            return
        }
        
        # Ajouter le CSS
        $cssLink = '    <!-- Nouveau système de navigation popup 2025 -->' + "`n" + 
                   '    <link rel="stylesheet" href="navigation-popup-2025.css">'
        
        if ($content -match '(<link rel="stylesheet" href="mobile-navigation-2025\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="mobile-navigation-2025\.css">)', 
                       "`$1`n`n$cssLink"
        }
        
        # Ajouter le JS
        $jsScript = '    <!-- Nouveau système de navigation popup 2025 -->' + "`n" + 
                    '    <script src="navigation-popup-2025.js"></script>'
        
        if ($content -match '(<script src="mobile-integration-2025\.js"></script>)') {
            $content = $content -replace '(<script src="mobile-integration-2025\.js"></script>)', 
                       "`$1`n`n$jsScript"
        }
        
        # Sauvegarder
        Set-Content $FilePath $content -Encoding UTF8
        Write-Host "✅ $FilePath - Intégré avec succès" -ForegroundColor Green
    } else {
        Write-Host "❌ $FilePath - Fichier non trouvé" -ForegroundColor Red
    }
}

# Fonction pour ajuster les chemins dans les sous-dossiers
function Update-NavigationPopupPaths {
    param(
        [string]$FilePath,
        [int]$Depth = 1
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw
        $prefix = "../" * $Depth
        
        # Mettre à jour les chemins CSS et JS
        $content = $content -replace 'href="navigation-popup-2025\.css"', "href=`"${prefix}navigation-popup-2025.css`""
        $content = $content -replace 'src="navigation-popup-2025\.js"', "src=`"${prefix}navigation-popup-2025.js`""
        
        Set-Content $FilePath $content -Encoding UTF8
        Write-Host "✅ $FilePath - Chemins mis à jour (profondeur: $Depth)" -ForegroundColor Green
    }
}

Write-Host "`n1. Intégration dans index.html..." -ForegroundColor Yellow
Add-NavigationPopupToHTML "c:\Users\T.LAMARA\IMPERIUM\index.html"

Write-Host "`n2. Intégration dans les pages Empire..." -ForegroundColor Yellow
$empireFiles = @(
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Empire\Cite.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Empire\Monde.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Empire\Province.html"
)

foreach ($file in $empireFiles) {
    Add-NavigationPopupToHTML $file
    Update-NavigationPopupPaths $file 2
}

Write-Host "`n3. Intégration dans les pages Développement..." -ForegroundColor Yellow
$devFiles = @(
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Developpement\Academie.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Developpement\Commerce.html"
)

foreach ($file in $devFiles) {
    Add-NavigationPopupToHTML $file
    Update-NavigationPopupPaths $file 2
}

Write-Host "`n4. Intégration dans les pages Militaire..." -ForegroundColor Yellow
$militaryFiles = @(
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Militaire\Légions.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Militaire\Flotte.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Militaire\Simulateur.html"
)

foreach ($file in $militaryFiles) {
    Add-NavigationPopupToHTML $file
    Update-NavigationPopupPaths $file 2
}

Write-Host "`n5. Intégration dans les pages Social..." -ForegroundColor Yellow
$socialFiles = @(
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Social\Diplomatie.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Social\Alliance.html",
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Social\Messsages.html"
)

foreach ($file in $socialFiles) {
    Add-NavigationPopupToHTML $file
    Update-NavigationPopupPaths $file 2
}

Write-Host "`n6. Intégration dans les pages Premium..." -ForegroundColor Yellow
$premiumFiles = @(
    "c:\Users\T.LAMARA\IMPERIUM\Navigation\Premium\Premium.html"
)

foreach ($file in $premiumFiles) {
    Add-NavigationPopupToHTML $file
    Update-NavigationPopupPaths $file 2
}

Write-Host "`n7. Création d'un fichier de test complet..." -ForegroundColor Yellow

# Créer un test plus avancé
$testContent = @"
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Complet - Navigation Popup 2025</title>
    <link rel="stylesheet" href="Navigation/common-styles.css">
    <link rel="stylesheet" href="navigation-popup-2025.css">
    <style>
        :root {
            --gold-primary: #d97706;
            --gold-secondary: #f59e0b;
            --gold-light: #fbbf24;
            --dark-bg: #0f172a;
            --dark-stone: #1e293b;
            --dark-marble: #334155;
            --text-light: #e2e8f0;
            --text-muted: #94a3b8;
            --border-gold: rgba(217, 119, 6, 0.3);
            --shadow-gold: rgba(217, 119, 6, 0.4);
        }
        body {
            font-family: 'Times New Roman', serif;
            background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-stone) 100%);
            color: var(--text-light);
            min-height: 100vh;
            padding: 2rem;
        }
        .test-results {
            background: rgba(15, 23, 42, 0.8);
            padding: 2rem;
            border-radius: 1rem;
            border: 2px solid var(--border-gold);
            margin-bottom: 2rem;
        }
        .test-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-gold);
        }
        .test-status {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .success { background: #22c55e; color: white; }
        .error { background: #ef4444; color: white; }
        .warning { background: #f59e0b; color: white; }
    </style>
</head>
<body>
    <h1 style="text-align: center; color: var(--gold-primary); margin-bottom: 2rem;">
        🧪 TEST COMPLET - NAVIGATION POPUP 2025
    </h1>
    
    <div class="test-results">
        <h2 style="color: var(--gold-primary); margin-bottom: 1rem;">Résultats des Tests</h2>
        <div id="test-results-container">
            <!-- Les résultats seront injectés ici -->
        </div>
    </div>
    
    <div style="text-align: center;">
        <button onclick="runTests()" style="padding: 1rem 2rem; font-size: 1.2rem; background: var(--gold-primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
            Lancer les Tests
        </button>
        <button onclick="toggleNavigationPopup()" style="padding: 1rem 2rem; font-size: 1.2rem; background: var(--roman-red); color: white; border: none; border-radius: 0.5rem; cursor: pointer; margin-left: 1rem;">
            Tester la Navigation
        </button>
    </div>

    <script src="navigation-popup-2025.js"></script>
    <script>
        function runTests() {
            const results = [];
            
            // Test 1: Vérifier l'initialisation
            if (window.navigationPopupSystem) {
                results.push({ name: 'Initialisation du système', status: 'success', message: 'Système initialisé correctement' });
            } else {
                results.push({ name: 'Initialisation du système', status: 'error', message: 'Système non initialisé' });
            }
            
            // Test 2: Vérifier la présence du bouton
            const helmButton = document.querySelector('.navigation-helm-button');
            if (helmButton) {
                results.push({ name: 'Bouton gouvernail', status: 'success', message: 'Bouton présent et visible' });
            } else {
                results.push({ name: 'Bouton gouvernail', status: 'error', message: 'Bouton non trouvé' });
            }
            
            // Test 3: Vérifier la popup
            const popup = document.querySelector('.navigation-popup-overlay');
            if (popup) {
                results.push({ name: 'Popup de navigation', status: 'success', message: 'Popup créée correctement' });
            } else {
                results.push({ name: 'Popup de navigation', status: 'error', message: 'Popup non trouvée' });
            }
            
            // Test 4: Vérifier les sections
            const sections = document.querySelectorAll('.nav-section-popup');
            if (sections.length >= 5) {
                results.push({ name: 'Sections de navigation', status: 'success', message: `${sections.length} sections trouvées` });
            } else {
                results.push({ name: 'Sections de navigation', status: 'warning', message: `Seulement ${sections.length} sections trouvées` });
            }
            
            // Test 5: Vérifier les boutons de navigation
            const navButtons = document.querySelectorAll('.nav-button');
            if (navButtons.length >= 10) {
                results.push({ name: 'Boutons de navigation', status: 'success', message: `${navButtons.length} boutons trouvés` });
            } else {
                results.push({ name: 'Boutons de navigation', status: 'warning', message: `Seulement ${navButtons.length} boutons trouvés` });
            }
            
            // Afficher les résultats
            displayResults(results);
        }
        
        function displayResults(results) {
            const container = document.getElementById('test-results-container');
            container.innerHTML = '';
            
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'test-item';
                
                const statusIcon = result.status === 'success' ? '✓' : result.status === 'error' ? '✗' : '⚠';
                
                item.innerHTML = `
                    <div class="test-status ${result.status}">${statusIcon}</div>
                    <div>
                        <strong>${result.name}</strong><br>
                        <small>${result.message}</small>
                    </div>
                `;
                
                container.appendChild(item);
            });
        }
        
        // Lancer les tests automatiquement après un délai
        setTimeout(runTests, 1000);
    </script>
</body>
</html>
"@

Set-Content "c:\Users\T.LAMARA\IMPERIUM\test-navigation-complete.html" $testContent -Encoding UTF8
Write-Host "✅ Test complet créé : test-navigation-complete.html" -ForegroundColor Green

Write-Host "`n🎉 INTÉGRATION TERMINÉE !" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host "✅ Système de navigation popup 2025 intégré dans toutes les pages" -ForegroundColor Green
Write-Host "✅ Chemins mis à jour pour les sous-dossiers" -ForegroundColor Green
Write-Host "✅ Tests créés pour vérifier le fonctionnement" -ForegroundColor Green
Write-Host "`n📋 PROCHAINES ÉTAPES :" -ForegroundColor Yellow
Write-Host "1. Ouvrez test-navigation-complete.html pour tester" -ForegroundColor White
Write-Host "2. Vérifiez que le bouton gouvernail apparaît" -ForegroundColor White
Write-Host "3. Testez la navigation entre les pages" -ForegroundColor White
Write-Host "4. Consultez NAVIGATION-POPUP-2025-README.md pour la documentation" -ForegroundColor White

# Ouvrir le test automatiquement
Write-Host "`n🚀 Ouverture du test complet..." -ForegroundColor Cyan
Start-Process "c:\Users\T.LAMARA\IMPERIUM\test-navigation-complete.html"