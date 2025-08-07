# Script d'intégration simplifié du système de navigation popup 2025
Write-Host "🚀 INTÉGRATION DU SYSTÈME DE NAVIGATION POPUP 2025" -ForegroundColor Cyan

# Fonction pour ajouter les liens CSS/JS à un fichier HTML
function Add-NavigationPopupToHTML {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw
        
        # Vérifier si déjà intégré
        if ($content -match "navigation-popup-2025\.css") {
            Write-Host "✅ $FilePath - Déjà intégré" -ForegroundColor Green
            return
        }
        
        # Ajouter le CSS après mobile-navigation-2025.css
        $cssToAdd = "`n    <!-- Nouveau système de navigation popup 2025 -->`n    <link rel=`"stylesheet`" href=`"navigation-popup-2025.css`">"
        $content = $content -replace '(<link rel="stylesheet" href="mobile-navigation-2025\.css">)', "`$1$cssToAdd"
        
        # Ajouter le JS après mobile-integration-2025.js
        $jsToAdd = "`n    <!-- Nouveau système de navigation popup 2025 -->`n    <script src=`"navigation-popup-2025.js`"></script>"
        $content = $content -replace '(<script src="mobile-integration-2025\.js"></script>)', "`$1$jsToAdd"
        
        Set-Content $FilePath $content -Encoding UTF8
        Write-Host "✅ $FilePath - Intégré" -ForegroundColor Green
    } else {
        Write-Host "❌ $FilePath - Non trouvé" -ForegroundColor Red
    }
}

# Intégrer dans index.html
Write-Host "`n1. Intégration dans index.html..." -ForegroundColor Yellow
Add-NavigationPopupToHTML "c:\Users\T.LAMARA\IMPERIUM\index.html"

Write-Host "`n🎉 INTÉGRATION TERMINÉE !" -ForegroundColor Green
Write-Host "Le système de navigation popup est maintenant intégré dans index.html" -ForegroundColor Green

# Ouvrir le test
Write-Host "`n🚀 Ouverture du test..." -ForegroundColor Cyan
Start-Process "c:\Users\T.LAMARA\IMPERIUM\test-navigation-popup.html"