/* ============================================
   layout.js — barre de navigation et pied de page
   communs à toutes les pages du portfolio.

   Pour modifier le menu ou le pied de page,
   il suffit de changer ce fichier : toutes les pages
   sont mises à jour automatiquement.

   Chaque page contient :
     <div id="site-header"></div>   (en haut du <body>)
     <div id="site-footer"></div>   (en bas, après </main>)
     <script src="layout.js"></script>
   ============================================ */
(function () {
    'use strict';

    // Pages du menu : [fichier, libellé]
    var PAGES = [
        ['index.html', 'Accueil'],
        ['apropos.html', 'À propos'],
        ['campusErmitage.html', 'Campus Ermitage'],
        ['entreprise.html', 'Entreprise'],
        ['projets.html', 'Projets'],
        ['competences.html', 'Compétences'],
        ['certifications.html', 'Certifications'],
        ['veille.html', 'Veille'],
        ['contact.html', 'Contact']
    ];

    var GITHUB_URL = 'https://github.com/Elea-G';
    // « é » encodé (%C3%A9) pour que le lien fonctionne partout
    var LINKEDIN_URL = 'https://www.linkedin.com/in/el%C3%A9a-guilmot-a7667738a';

    // Largeur (en px) en dessous de laquelle le menu devient un burger
    // (doit correspondre au @media (max-width: 1024px) de styles.css)
    var BURGER_MAX_WIDTH = 1024;

    // Page courante, sans ".html" ("index" si on est à la racine du site)
    var current = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';

    // --- Barre de navigation ---
    var links = PAGES.map(function (page) {
        var isActive = page[0].replace(/\.html$/, '') === current;
        return '<li><a href="' + page[0] + '" class="nav-link' + (isActive ? ' active" aria-current="page' : '') + '">' +
            page[1] + '</a></li>';
    }).join('\n                    ');

    var headerHTML =
        '<header class="fixed-header">\n' +
        '        <div class="header-container">\n' +
        '            <a href="index.html" class="nav-brand">Eléa Guilmot</a>\n' +
        '            <button type="button" class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav">\n' +
        '                <span class="nav-toggle-bar"></span>\n' +
        '                <span class="nav-toggle-bar"></span>\n' +
        '                <span class="nav-toggle-bar"></span>\n' +
        '            </button>\n' +
        '            <nav id="main-nav" aria-label="Navigation principale">\n' +
        '                <ul>\n' +
        '                    ' + links + '\n' +
        '                </ul>\n' +
        '            </nav>\n' +
        '        </div>\n' +
        '    </header>';

    // --- Pied de page ---
    var footerHTML =
        '<footer>\n' +
        '        <div class="container">\n' +
        '            <div class="footer-content">\n' +
        '                <div class="social-links">\n' +
        '                    <a href="' + GITHUB_URL + '" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">\n' +
        '                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">\n' +
        '                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>\n' +
        '                        </svg>\n' +
        '                    </a>\n' +
        '                    <a href="' + LINKEDIN_URL + '" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">\n' +
        '                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">\n' +
        '                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>\n' +
        '                        </svg>\n' +
        '                    </a>\n' +
        '                </div>\n' +
        '                <div class="footer-bottom">\n' +
        '                    <p>&copy; ' + new Date().getFullYear() + ' Eléa Guilmot · Tous droits réservés</p>\n' +
        '                    <div class="footer-links">\n' +
        '                        <a href="mentions-legales.html">Mentions légales et confidentialité</a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </footer>';

    // --- Insertion dans la page ---
    var headerSlot = document.getElementById('site-header');
    var footerSlot = document.getElementById('site-footer');
    if (headerSlot) { headerSlot.outerHTML = headerHTML; }
    if (footerSlot) { footerSlot.outerHTML = footerHTML; }

    // --- Menu burger (tablettes et téléphones) ---
    var header = document.querySelector('.fixed-header');
    var toggle = header ? header.querySelector('.nav-toggle') : null;

    if (header && toggle) {
        var setOpen = function (open) {
            header.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        };

        // Clic sur le burger : ouvre / ferme
        toggle.addEventListener('click', function () {
            setOpen(!header.classList.contains('nav-open'));
        });

        // Clic en dehors du menu ou touche Échap : ferme
        document.addEventListener('click', function (event) {
            if (!header.contains(event.target)) { setOpen(false); }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') { setOpen(false); }
        });

        // Retour en affichage ordinateur : on referme le menu
        var desktop = window.matchMedia('(min-width: ' + (BURGER_MAX_WIDTH + 1) + 'px)');
        var onChange = function (event) { if (event.matches) { setOpen(false); } };
        if (desktop.addEventListener) { desktop.addEventListener('change', onChange); }
        else if (desktop.addListener) { desktop.addListener(onChange); }
    }
})();
