# Script de vérification du système de navigation popup 2025
Write-Host "🔍 VÉRIFICATION DU SYSTÈME DE NAVIGATION POPUP 2025" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

$errors = @()
$warnings = @()
$success = @()

# Vérifier les fichiers principaux
Write-Host "`n📁 Vérification des fichiers..." -ForegroundColor Yellow

$requiredFiles = @(
    "navigation-popup-2025.css",
    "navigation-popup-2025.js",
    "test-navigation-popup.html",
    "demo-navigation-popup.html",
    "NAVIGATION-POPUP-2025-README.md"
)

foreach ($file in $requiredFiles) {
    $fullPath = "c:\Users\T.LAMARA\IMPERIUM\$file"
    if (Test-Path $fullPath) {
        $success += "✅ $file - Présent"
    } else {
        $errors += "❌ $file - Manquant"
    }
}

# Vérifier l'intégration dans index.html
Write-Host "`n🔗 Vérification de l'intégration..." -ForegroundColor Yellow

$indexPath = "c:\Users\T.LAMARA\IMPERIUM\index.html"
if (Test-Path $indexPath) {
    $indexContent = Get-Content $indexPath -Raw
    
    if ($indexContent -match "navigation-popup-2025\.css") {
        $success += "✅ CSS intégré dans index.html"
    } else {
        $errors += "❌ CSS non intégré dans index.html"
    }
    
    if ($indexContent -match "navigation-popup-2025\.js") {
        $success += "✅ JavaScript intégré dans index.html"
    } else {
        $errors += "❌ JavaScript non intégré dans index.html"
    }
} else {
    $errors += "❌ index.html non trouvé"
}

# Vérifier la structure des fichiers CSS et JS
Write-Host "`n🎨 Vérification du contenu CSS..." -ForegroundColor Yellow

$cssPath = "c:\Users\T.LAMARA\IMPERIUM\navigation-popup-2025.css"
if (Test-Path $cssPath) {
    $cssContent = Get-Content $cssPath -Raw
    
    $cssChecks = @(
        @{ Pattern = "\.navigation-helm-button"; Name = "Bouton gouvernail" },
        @{ Pattern = "\.navigation-popup-overlay"; Name = "Overlay popup" },
        @{ Pattern = "\.nav-section-popup"; Name = "Sections navigation" },
        @{ Pattern = "@media.*max-width.*768px"; Name = "Responsive mobile" }
    )
    
    foreach ($check in $cssChecks) {
        if ($cssContent -match $check.Pattern) {
            $success += "✅ CSS - $($check.Name) défini"
        } else {
            $warnings += "⚠️ CSS - $($check.Name) manquant"
        }
    }
}

Write-Host "`n⚙️ Vérification du contenu JavaScript..." -ForegroundColor Yellow

$jsPath = "c:\Users\T.LAMARA\IMPERIUM\navigation-popup-2025.js"
if (Test-Path $jsPath) {
    $jsContent = Get-Content $jsPath -Raw
    
    $jsChecks = @(
        @{ Pattern = "class NavigationPopupSystem"; Name = "Classe principale" },
        @{ Pattern = "createHelmButton"; Name = "Création bouton gouvernail" },
        @{ Pattern = "createPopupOverlay"; Name = "Création popup" },
        @{ Pattern = "togglePopup"; Name = "Fonction toggle" },
        @{ Pattern = "navigateToPage"; Name = "Navigation entre pages" }
    )
    
    foreach ($check in $jsChecks) {
        if ($jsContent -match $check.Pattern) {
            $success += "✅ JS - $($check.Name) implémenté"
        } else {
            $warnings += "⚠️ JS - $($check.Name) manquant"
        }
    }
}

# Vérifier la configuration de navigation
Write-Host "`n🗺️ Vérification de la configuration..." -ForegroundColor Yellow

if (Test-Path $jsPath) {
    $jsContent = Get-Content $jsPath -Raw
    
    $sections = @("Empire", "Développement", "Militaire", "Social", "Premium")
    foreach ($section in $sections) {
        if ($jsContent -match "'$section'") {
            $success += "✅ Section '$section' configurée"
        } else {
            $warnings += "⚠️ Section '$section' manquante"
        }
    }
}

# Afficher les résultats
Write-Host "`n📊 RÉSULTATS DE LA VÉRIFICATION" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

if ($success.Count -gt 0) {
    Write-Host "`n✅ SUCCÈS ($($success.Count)):" -ForegroundColor Green
    foreach ($item in $success) {
        Write-Host "   $item" -ForegroundColor Green
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "`n⚠️ AVERTISSEMENTS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($item in $warnings) {
        Write-Host "   $item" -ForegroundColor Yellow
    }
}

if ($errors.Count -gt 0) {
    Write-Host "`n❌ ERREURS ($($errors.Count)):" -ForegroundColor Red
    foreach ($item in $errors) {
        Write-Host "   $item" -ForegroundColor Red
    }
}

# Résumé final
Write-Host "`n🎯 RÉSUMÉ FINAL" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan

$totalChecks = $success.Count + $warnings.Count + $errors.Count
$successRate = [math]::Round(($success.Count / $totalChecks) * 100, 1)

Write-Host "Total des vérifications : $totalChecks" -ForegroundColor White
Write-Host "Taux de réussite : $successRate%" -ForegroundColor White

if ($errors.Count -eq 0 -and $warnings.Count -le 2) {
    Write-Host "`n🎉 SYSTÈME PRÊT À UTILISER !" -ForegroundColor Green
    Write-Host "Le système de navigation popup 2025 est correctement installé." -ForegroundColor Green
    
    Write-Host "`n🚀 PROCHAINES ÉTAPES :" -ForegroundColor Yellow
    Write-Host "1. Ouvrez demo-navigation-popup.html pour voir la démo" -ForegroundColor White
    Write-Host "2. Testez avec test-navigation-popup.html" -ForegroundColor White
    Write-Host "3. Vérifiez index.html pour l'intégration complète" -ForegroundColor White
    
    # Ouvrir la démo
    Write-Host "`n🎭 Ouverture de la démo..." -ForegroundColor Cyan
    Start-Process "c:\Users\T.LAMARA\IMPERIUM\demo-navigation-popup.html"
    
} elseif ($errors.Count -eq 0) {
    Write-Host "`n⚠️ SYSTÈME FONCTIONNEL AVEC AVERTISSEMENTS" -ForegroundColor Yellow
    Write-Host "Le système devrait fonctionner mais quelques éléments pourraient être optimisés." -ForegroundColor Yellow
} else {
    Write-Host "`n❌ PROBLÈMES DÉTECTÉS" -ForegroundColor Red
    Write-Host "Veuillez corriger les erreurs avant d'utiliser le système." -ForegroundColor Red
}

Write-Host "`n📚 Documentation complète disponible dans :" -ForegroundColor Cyan
Write-Host "   NAVIGATION-POPUP-2025-README.md" -ForegroundColor White