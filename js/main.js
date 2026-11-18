/* ============================================
   main.js — rendu du portfolio à partir de js/data.js
   + navigation, animations, fenêtre de détail, formulaire.
   Aucune bibliothèque externe.
   ============================================ */
(function () {
    'use strict';

    var D = window.PORTFOLIO;
    if (!D) { return; }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Outils ---------- */
    function $(selector, root) { return (root || document).querySelector(selector); }
    function $$(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }

    // Échappe le texte avant de l'insérer dans du HTML
    function esc(value) {
        return String(value).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // Les chemins locaux contiennent des espaces et des accents : on les encode
    function local(path) { return encodeURI(path); }

    function blocById(id) {
        return D.blocs.filter(function (b) { return b.id === id; })[0];
    }

    /* ---------- Icônes (SVG, trait) ---------- */
    var ICONS = {
        database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
        lifebuoy: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
        globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
        kanban: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v10"/>',
        package: '<path d="M12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
        cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
        shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
        lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/>'
    };

    function icon(name) {
        return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
    }

    /* ---------- À propos / Parcours ---------- */
    function renderTimeline() {
        $('#timeline').innerHTML = D.parcours.map(function (step) {
            return '<li class="tl-item reveal">' +
                '<span class="tl-date">' + esc(step.periode) + '</span>' +
                '<h3>' + esc(step.titre) + '</h3>' +
                (step.lieu ? '<p class="tl-place">' + esc(step.lieu) + '</p>' : '') +
                '<p>' + esc(step.texte) + '</p>' +
                '</li>';
        }).join('');
    }

    /* ---------- Compétences ---------- */
    function renderSkills() {
        $('#skills-grid').innerHTML = D.competences.map(function (group) {
            return '<article class="skill-card reveal">' +
                '<h3>' + esc(group.categorie) + '</h3>' +
                '<p>' + esc(group.description) + '</p>' +
                '<ul class="pills">' + group.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
                '</article>';
        }).join('');
    }

    /* ---------- Bandeau des technologies (reprend les compétences) ---------- */
    function renderMarquee() {
        var track = $('#marquee-track');
        if (!track) { return; }
        var seen = {}, items = [];
        D.competences.forEach(function (g) {
            g.items.forEach(function (i) { if (!seen[i]) { seen[i] = true; items.push(i); } });
        });
        var html = items.map(function (i) { return '<span>' + esc(i) + '</span>'; }).join('');
        track.innerHTML = html + html; // doublé pour une boucle sans coupure
    }

    /* ---------- Halo doré qui suit la souris sur l'accueil ---------- */
    function setupHeroGlow() {
        var hero = $('.hero');
        if (!hero || reduceMotion) { return; }
        hero.addEventListener('pointermove', function (event) {
            var r = hero.getBoundingClientRect();
            hero.style.setProperty('--mx', (event.clientX - r.left) + 'px');
            hero.style.setProperty('--my', (event.clientY - r.top) + 'px');
        });
    }

    /* ---------- Projets ---------- */
    var activeFilter = 'Tous';

    function renderFilters() {
        var cats = ['Tous'];
        D.projets.forEach(function (p) { if (cats.indexOf(p.categorie) === -1) { cats.push(p.categorie); } });
        $('#filters').innerHTML = cats.map(function (c) {
            return '<button type="button" class="filter' + (c === activeFilter ? ' is-active' : '') + '" aria-pressed="' + (c === activeFilter) + '" data-filter="' + esc(c) + '">' + esc(c) + '</button>';
        }).join('');
    }

    function projectCard(p) {
        return '<article class="project-card" data-id="' + esc(p.id) + '" data-category="' + esc(p.categorie) + '">' +
            '<div class="project-media">' +
                '<img src="' + local(p.image) + '" alt="Aperçu du projet : ' + esc(p.titre) + '" loading="lazy">' +
                '<span class="badge">' + esc(p.categorie) + '</span>' +
            '</div>' +
            '<div class="project-body">' +
                '<p class="project-meta">' + esc(p.sousTitre) + '</p>' +
                '<h3>' + esc(p.titre) + '</h3>' +
                '<p class="project-resume">' + esc(p.resume) + '</p>' +
                '<ul class="pills pills-sm">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
                '<div class="project-actions">' +
                    '<button type="button" class="btn btn-dark btn-sm" data-open="' + esc(p.id) + '">Voir le détail</button>' +
                    '<a class="text-link" href="' + local(p.livrables[0].href) + '" target="_blank" rel="noopener noreferrer">PDF →</a>' +
                '</div>' +
            '</div>' +
        '</article>';
    }

    function renderProjects() {
        var list = D.projets.filter(function (p) { return activeFilter === 'Tous' || p.categorie === activeFilter; });
        $('#projects-grid').innerHTML = list.map(projectCard).join('');
    }

    /* ---------- Fenêtre de détail d'un projet ---------- */
    var modal = $('#project-modal');
    var lastTrigger = null;

    function openProject(id, trigger) {
        var p = D.projets.filter(function (x) { return x.id === id; })[0];
        if (!p || !modal) { return; }
        var bloc = blocById(p.bloc);
        lastTrigger = trigger || null;

        var code = '';
        if (p.code) {
            code = p.code.prive
                ? '<li class="muted">Code privé (projet scolaire en cours)</li>'
                : '<li><a class="text-link" href="' + esc(p.code.href) + '" target="_blank" rel="noopener noreferrer">Voir le code sur GitHub →</a></li>';
        }

        $('#modal-content').innerHTML =
            '<button type="button" class="modal-close" data-close aria-label="Fermer la fenêtre">×</button>' +
            '<img class="modal-img" src="' + local(p.image) + '" alt="Aperçu du projet : ' + esc(p.titre) + '">' +
            '<div class="modal-body">' +
                '<p class="project-meta">' + esc(p.sousTitre) + '</p>' +
                '<h3 id="modal-title">' + esc(p.titre) + '</h3>' +
                '<p>' + esc(p.resume) + '</p>' +
                '<dl class="facts">' +
                    '<div><dt>Période</dt><dd>' + esc(p.periode) + '</dd></div>' +
                    '<div><dt>Compétence du référentiel</dt><dd>' + esc(bloc ? bloc.titre : '') + '</dd></div>' +
                '</dl>' +
                '<h4>Ce que j’ai réalisé</h4>' +
                '<ul class="checklist">' + p.realisations.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
                '<ul class="pills pills-sm">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
                '<ul class="modal-links">' +
                    p.livrables.map(function (l) {
                        return '<li><a class="btn btn-gold btn-sm" href="' + local(l.href) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + '</a></li>';
                    }).join('') + code +
                '</ul>' +
            '</div>';

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
        document.body.classList.add('no-scroll');
    }

    function closeProject() {
        if (!modal) { return; }
        if (typeof modal.close === 'function') { modal.close(); } else { modal.removeAttribute('open'); }
    }

    if (modal) {
        // Clic sur le fond ou sur la croix : fermeture
        modal.addEventListener('click', function (event) {
            if (event.target === modal || event.target.hasAttribute('data-close')) { closeProject(); }
        });
        modal.addEventListener('close', function () {
            document.body.classList.remove('no-scroll');
            if (/^#projet-/.test(window.location.hash) && window.history && history.replaceState) {
                history.replaceState(null, '', window.location.pathname + window.location.search + '#projets');
            }
            if (lastTrigger && document.contains(lastTrigger)) { lastTrigger.focus(); }
        });
    }

    // Délégation : tous les boutons « data-open » ouvrent le projet correspondant
    document.addEventListener('click', function (event) {
        var opener = event.target.closest ? event.target.closest('[data-open]') : null;
        if (opener) { openProject(opener.getAttribute('data-open'), opener); return; }

        var filter = event.target.closest ? event.target.closest('[data-filter]') : null;
        if (filter) {
            activeFilter = filter.getAttribute('data-filter');
            renderFilters();
            renderProjects();
            observeReveals();
        }
    });

    /* ---------- Lien direct vers un projet : #projet-<id> (utilisé par la fiche E5) ---------- */
    function openFromHash() {
        var m = /^#projet-([a-z0-9-]+)$/.exec(window.location.hash);
        if (!m) { return; }
        if (activeFilter !== 'Tous') {
            activeFilter = 'Tous';
            renderFilters();
            renderProjects();
            observeReveals();
        }
        var card = document.querySelector('.project-card[data-id="' + m[1] + '"]');
        if (!card) { return; }
        card.classList.add('in');
        card.scrollIntoView({ block: 'center', behavior: 'auto' });
        openProject(m[1], card.querySelector('[data-open]'));
    }
    window.addEventListener('hashchange', openFromHash);

    /* ---------- Certifications ---------- */
    function renderCerts() {
        $('#certs-grid').innerHTML = D.certifications.map(function (c) {
            return '<article class="cert-card reveal">' +
                '<div class="cert-icon">' + icon(c.icone) + '</div>' +
                '<div class="cert-meta"><span>' + esc(c.organisme) + '</span><time>' + esc(c.date) + '</time></div>' +
                '<h3>' + esc(c.titre) + '</h3>' +
                '<p>' + esc(c.description) + '</p>' +
                '<div class="cert-links">' +
                    '<a class="text-link" href="' + local(c.lienCertif) + '" target="_blank" rel="noopener noreferrer">Voir le certificat →</a>' +
                    '<a class="text-link text-link-soft" href="' + esc(c.lienSite) + '" target="_blank" rel="noopener noreferrer">Site officiel</a>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    /* ---------- Veille ---------- */
    function renderVeille() {
        var v = D.veille;
        $('#veille-sujet').textContent = v.sujet;

        $('#veille-method').innerHTML =
            '<div><h3>Mes outils</h3><ul class="method-list">' +
                v.outils.map(function (o) { return '<li><strong>' + esc(o.nom) + '</strong> — ' + esc(o.texte) + '</li>'; }).join('') +
            '</ul></div>' +
            '<div><h3>Mes sources</h3><ul class="pills">' +
                v.sources.map(function (s) { return '<li><a href="' + esc(s.lien) + '" target="_blank" rel="noopener noreferrer">' + esc(s.nom) + '</a></li>'; }).join('') +
            '</ul></div>' +
            '<div><h3>Ma démarche</h3><p>' + esc(v.demarche) + '</p></div>';

        $('#veille-grid').innerHTML = v.articles.map(function (a) {
            return '<article class="veille-card reveal">' +
                '<p class="veille-source">' + esc(a.source) + '<time>Publié : ' + esc(a.date) + '</time></p>' +
                '<h4>' + esc(a.titre) + '</h4>' +
                '<p><strong>Résumé.</strong> ' + esc(a.resume) + '</p>' +
                '<p class="veille-analyse"><strong>Mon analyse.</strong> ' + esc(a.analyse) + '</p>' +
                '<a class="text-link" href="' + esc(a.lien) + '" target="_blank" rel="noopener noreferrer">Lire l’article →</a>' +
            '</article>';
        }).join('');

        $('#veille-update').textContent = 'Dernière mise à jour : ' + v.misAJour;
    }

    /* ---------- Navigation ---------- */
    function setupNav() {
        var header = $('#site-header');
        var toggle = $('#nav-toggle');
        var progress = $('#scroll-progress');

        function onScroll() {
            var y = window.pageYOffset || document.documentElement.scrollTop;
            header.classList.toggle('is-top', y < 40);
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        function setOpen(open) {
            header.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        }
        toggle.addEventListener('click', function () { setOpen(!header.classList.contains('nav-open')); });
        $$('#main-nav a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
        document.addEventListener('click', function (e) { if (!header.contains(e.target)) { setOpen(false); } });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });

        // Lien actif selon la section visible
        if ('IntersectionObserver' in window) {
            var links = {};
            $$('[data-spy]').forEach(function (a) { links[a.getAttribute('data-spy')] = a; });
            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) { return; }
                    Object.keys(links).forEach(function (k) {
                        var active = k === entry.target.getAttribute('data-section');
                        links[k].classList.toggle('active', active);
                        if (active) { links[k].setAttribute('aria-current', 'true'); } else { links[k].removeAttribute('aria-current'); }
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            $$('[data-section]').forEach(function (s) { spy.observe(s); });
        }
    }

    /* ---------- Animation d'apparition au défilement ---------- */
    var revealObserver = null;
    function observeReveals() {
        var items = $$('.reveal:not(.in), .project-card:not(.reveal)');
        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('in'); });
            return;
        }
        if (!revealObserver) {
            revealObserver = new IntersectionObserver(function (entries) {
                var rank = 0;
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        // Léger décalage entre éléments apparaissant ensemble
                        el.style.transitionDelay = (rank * 90) + 'ms';
                        rank += 1;
                        el.classList.add('in');
                        revealObserver.unobserve(el);
                        window.setTimeout(function () { el.style.transitionDelay = ''; }, 1200);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        }
        items.forEach(function (el) {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    /* ---------- Formulaire de contact (Formspree) ---------- */
    function setupForm() {
        var form = $('#contact-form');
        var status = $('#form-status');
        var submit = $('#submit-btn');
        if (!form) { return; }

        function show(message, ok) {
            status.hidden = false;
            status.className = 'form-status ' + (ok ? 'is-success' : 'is-error');
            status.textContent = message;
        }

        $('#reset-btn').addEventListener('click', function () {
            form.reset();
            status.hidden = true;
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            status.hidden = true;
            submit.disabled = true;
            submit.textContent = 'Envoi en cours…';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    form.reset();
                    show('✓ Message envoyé ! Je vous répondrai par e-mail.', true);
                } else {
                    show('✗ Une erreur est survenue. Merci de réessayer.', false);
                }
            }).catch(function () {
                show('✗ Une erreur est survenue. Vérifiez votre connexion et réessayez.', false);
            }).then(function () {
                submit.disabled = false;
                submit.textContent = 'Envoyer';
            });
        });
    }

    /* ---------- Initialisation ---------- */
    renderTimeline();
    renderSkills();
    renderMarquee();
    setupHeroGlow();
    renderFilters();
    renderProjects();
    renderCerts();
    renderVeille();
    setupNav();
    setupForm();
    observeReveals();
    openFromHash();

    var year = $('#year');
    if (year) { year.textContent = new Date().getFullYear(); }
})();
