/**
 * 🔧 IMPERIUM - Correctif des Chemins Empire
 * Résout le problème des chemins qui cherchent "Empire" au lieu de "Imperium"
 */

class EmpirePathsFixer {
    constructor() {
        this.pathMappings = new Map();
        this.initPathMappings();
    }

    initPathMappings() {
        // Mappings des anciens chemins vers les nouveaux
        this.pathMappings.set('/Empire/', '/Navigation/Empire/');
        this.pathMappings.set('Empire/', 'Navigation/Empire/');
        this.pathMappings.set('../Empire/', '../Navigation/Empire/');
        this.pathMappings.set('../../Empire/', '../../Navigation/Empire/');
        this.pathMappings.set('../../../Empire/', '../../../Navigation/Empire/');
    }

    fixAllPaths() {
        console.log('🔧 Correction des chemins Empire en cours...');
        
        // Corriger les liens href
        this.fixHrefLinks();
        
        // Corriger les sources de scripts
        this.fixScriptSources();
        
        // Corriger les liens CSS
        this.fixCSSLinks();
        
        // Corriger les chemins dans le JavaScript
        this.fixJavaScriptPaths();
        
        console.log('✅ Correction des chemins Empire terminée');
    }

    fixHrefLinks() {
        const links = document.querySelectorAll('a[href*="Empire"]');
        links.forEach(link => {
            const originalHref = link.getAttribute('href');
            const correctedHref = this.correctPath(originalHref);
            if (correctedHref !== originalHref) {
                link.setAttribute('href', correctedHref);
                console.log(`🔗 Lien corrigé: ${originalHref} → ${correctedHref}`);
            }
        });
    }

    fixScriptSources() {
        const scripts = document.querySelectorAll('script[src*="Empire"]');
        scripts.forEach(script => {
            const originalSrc = script.getAttribute('src');
            const correctedSrc = this.correctPath(originalSrc);
            if (correctedSrc !== originalSrc) {
                script.setAttribute('src', correctedSrc);
                console.log(`📜 Script corrigé: ${originalSrc} → ${correctedSrc}`);
            }
        });
    }

    fixCSSLinks() {
        const cssLinks = document.querySelectorAll('link[href*="Empire"]');
        cssLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            const correctedHref = this.correctPath(originalHref);
            if (correctedHref !== originalHref) {
                link.setAttribute('href', correctedHref);
                console.log(`🎨 CSS corrigé: ${originalHref} → ${correctedHref}`);
            }
        });
    }

    fixJavaScriptPaths() {
        // Intercepter les appels fetch et XMLHttpRequest
        this.interceptFetch();
        this.interceptXHR();
        
        // Corriger window.location.href si nécessaire
        this.interceptLocationChanges();
    }

    correctPath(path) {
        if (!path) return path;
        
        let correctedPath = path;
        
        // Appliquer les mappings
        for (const [oldPath, newPath] of this.pathMappings) {
            if (correctedPath.includes(oldPath)) {
                correctedPath = correctedPath.replace(oldPath, newPath);
            }
        }
        
        // Vérifications spéciales
        if (correctedPath.includes('Empire/') && !correctedPath.includes('Navigation/Empire/')) {
            // Si le chemin contient Empire/ mais pas Navigation/Empire/, l'ajouter
            correctedPath = correctedPath.replace('Empire/', 'Navigation/Empire/');
        }
        
        return correctedPath;
    }

    interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = (url, options) => {
            const correctedUrl = this.correctPath(url);
            if (correctedUrl !== url) {
                console.log(`🌐 Fetch corrigé: ${url} → ${correctedUrl}`);
            }
            return originalFetch(correctedUrl, options);
        };
    }

    interceptXHR() {
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            const correctedUrl = window.empirePathsFixer.correctPath(url);
            if (correctedUrl !== url) {
                console.log(`📡 XHR corrigé: ${url} → ${correctedUrl}`);
            }
            return originalOpen.call(this, method, correctedUrl, ...args);
        };
    }

    interceptLocationChanges() {
        // Intercepter les changements de location
        const originalAssign = window.location.assign;
        const originalReplace = window.location.replace;
        
        window.location.assign = function(url) {
            const correctedUrl = window.empirePathsFixer.correctPath(url);
            if (correctedUrl !== url) {
                console.log(`🔄 Location.assign corrigé: ${url} → ${correctedUrl}`);
            }
            return originalAssign.call(this, correctedUrl);
        };
        
        window.location.replace = function(url) {
            const correctedUrl = window.empirePathsFixer.correctPath(url);
            if (correctedUrl !== url) {
                console.log(`🔄 Location.replace corrigé: ${url} → ${correctedUrl}`);
            }
            return originalReplace.call(this, correctedUrl);
        };
        
        // Intercepter les changements de href
        Object.defineProperty(window.location, 'href', {
            set: function(url) {
                const correctedUrl = window.empirePathsFixer.correctPath(url);
                if (correctedUrl !== url) {
                    console.log(`🔄 Location.href corrigé: ${url} → ${correctedUrl}`);
                }
                window.location.assign(correctedUrl);
            },
            get: function() {
                return window.location.toString();
            }
        });
    }

    // Méthode pour corriger dynamiquement les éléments ajoutés
    observeNewElements() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Corriger les nouveaux liens
                        if (node.tagName === 'A' && node.href && node.href.includes('Empire')) {
                            const correctedHref = this.correctPath(node.href);
                            if (correctedHref !== node.href) {
                                node.href = correctedHref;
                                console.log(`🔗 Nouveau lien corrigé: ${node.href} → ${correctedHref}`);
                            }
                        }
                        
                        // Corriger les nouveaux scripts
                        if (node.tagName === 'SCRIPT' && node.src && node.src.includes('Empire')) {
                            const correctedSrc = this.correctPath(node.src);
                            if (correctedSrc !== node.src) {
                                node.src = correctedSrc;
                                console.log(`📜 Nouveau script corrigé: ${node.src} → ${correctedSrc}`);
                            }
                        }
                        
                        // Corriger les éléments dans les nouveaux nœuds
                        const childLinks = node.querySelectorAll && node.querySelectorAll('a[href*="Empire"]');
                        if (childLinks) {
                            childLinks.forEach(link => {
                                const correctedHref = this.correctPath(link.href);
                                if (correctedHref !== link.href) {
                                    link.href = correctedHref;
                                    console.log(`🔗 Lien enfant corrigé: ${link.href} → ${correctedHref}`);
                                }
                            });
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Méthode pour vérifier et corriger les chemins de navigation
    fixNavigationPaths() {
        // Corriger les chemins dans les systèmes de navigation
        if (window.commonNavigation) {
            const originalNavigate = window.commonNavigation.navigate;
            if (originalNavigate) {
                window.commonNavigation.navigate = (path) => {
                    const correctedPath = this.correctPath(path);
                    if (correctedPath !== path) {
                        console.log(`🧭 Navigation corrigée: ${path} → ${correctedPath}`);
                    }
                    return originalNavigate.call(window.commonNavigation, correctedPath);
                };
            }
        }
        
        // Corriger les chemins dans les systèmes mobiles
        if (window.mobileNav) {
            const originalNavigateTo = window.mobileNav.navigateTo;
            if (originalNavigateTo) {
                window.mobileNav.navigateTo = (path) => {
                    const correctedPath = this.correctPath(path);
                    if (correctedPath !== path) {
                        console.log(`📱 Navigation mobile corrigée: ${path} → ${correctedPath}`);
                    }
                    return originalNavigateTo.call(window.mobileNav, correctedPath);
                };
            }
        }
    }

    // Méthode pour diagnostiquer les problèmes de chemins
    diagnose() {
        console.log('🔍 Diagnostic des chemins Empire...');
        
        const issues = [];
        
        // Vérifier les liens
        const links = document.querySelectorAll('a[href*="Empire"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.includes('Navigation/Empire/')) {
                issues.push({
                    type: 'link',
                    element: link,
                    path: href,
                    suggested: this.correctPath(href)
                });
            }
        });
        
        // Vérifier les scripts
        const scripts = document.querySelectorAll('script[src*="Empire"]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (!src.includes('Navigation/Empire/')) {
                issues.push({
                    type: 'script',
                    element: script,
                    path: src,
                    suggested: this.correctPath(src)
                });
            }
        });
        
        if (issues.length > 0) {
            console.warn(`⚠️ ${issues.length} problème(s) de chemin détecté(s):`, issues);
        } else {
            console.log('✅ Aucun problème de chemin détecté');
        }
        
        return issues;
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.empirePathsFixer = new EmpirePathsFixer();
    
    // Corriger immédiatement les chemins existants
    window.empirePathsFixer.fixAllPaths();
    
    // Observer les nouveaux éléments
    window.empirePathsFixer.observeNewElements();
    
    // Corriger les systèmes de navigation
    setTimeout(() => {
        window.empirePathsFixer.fixNavigationPaths();
    }, 1000);
    
    console.log('🔧 Système de correction des chemins Empire initialisé');
});

// Fonction utilitaire globale pour corriger un chemin
window.fixEmpirePath = function(path) {
    return window.empirePathsFixer ? window.empirePathsFixer.correctPath(path) : path;
};

console.log('🔧 Correctif des chemins Empire chargé');