/* ============================================
   data.js — TOUTES les données du portfolio.
   Pour ajouter un projet, une certification ou un article de veille,
   il suffit de modifier ce fichier : le rendu (main.js) s'adapte seul.
   Aucune donnée confidentielle d'entreprise ou de client ici.
   ============================================ */
window.PORTFOLIO = {

    liens: {
        github: 'https://github.com/Elea-G',
        linkedin: 'https://www.linkedin.com/in/el%C3%A9a-guilmot-a7667738a',
        depot: 'https://github.com/Elea-G/PORTFOLIO_Elea',
        ficheE5: 'documents/Epreuve E5 - BTS SIO 2026.pdf'
    },

    /* Les 6 blocs de compétences du tableau de synthèse E5 (BTS SIO 2026) */
    blocs: [
        { id: 'patrimoine', court: 'Patrimoine informatique', titre: 'Gérer le patrimoine informatique', icone: 'database' },
        { id: 'incidents',  court: 'Incidents et demandes',   titre: 'Répondre aux incidents et aux demandes d’assistance et d’évolution', icone: 'lifebuoy' },
        { id: 'presence',   court: 'Présence en ligne',       titre: 'Développer la présence en ligne de l’organisation', icone: 'globe' },
        { id: 'projet',     court: 'Mode projet',             titre: 'Travailler en mode projet', icone: 'kanban' },
        { id: 'service',    court: 'Mise à disposition',      titre: 'Mettre à disposition des utilisateurs un service informatique', icone: 'package' },
        { id: 'devpro',     court: 'Développement professionnel', titre: 'Organiser son développement professionnel', icone: 'cap' }
    ],

    /* Parcours (frise chronologique) */
    parcours: [
        {
            periode: '2025',
            titre: 'Baccalauréat Général',
            lieu: 'Lycée Marguerite Filhol, Fumel',
            texte: 'Spécialités Sciences de l’Ingénieur et Mathématiques : de bonnes bases pour me diriger vers l’informatique.'
        },
        {
            periode: 'En cours',
            titre: 'BTS SIO option SLAM — 2ème année',
            lieu: 'Campus Ermitage, Agen',
            texte: 'Solutions Logicielles et Applications Métiers : cahier des charges, spécifications, développement et intégration.'
        },
        {
            periode: 'En alternance',
            titre: 'Apprentie au Cabinet PAGOS',
            lieu: 'Cabinet PAGOS',
            texte: 'Projets clients autour des progiciels ERP : requêtes SQL, tableaux de bord, configurateurs, site WebTask.'
        },
        {
            periode: 'Objectif',
            titre: 'Poursuite d’études jusqu’au Master',
            lieu: '',
            texte: 'Me spécialiser dans les applications logicielles et le système d’information.'
        }
    ],

    /* Compétences techniques, regroupées (aucun niveau chiffré : rien d'inventé) */
    competences: [
        {
            categorie: 'Développement web',
            description: 'Création de sites web responsives et interactifs.',
            items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Symfony', 'Twig', 'MySQL']
        },
        {
            categorie: 'Base de données',
            description: 'Gestion et exploitation de bases de données relationnelles.',
            items: ['Requêtes SQL', 'MySQL']
        },
        {
            categorie: 'Business Intelligence',
            description: 'Conception et réalisation de tableaux de bord dynamiques.',
            items: ['Tableaux de bord', 'JasperSoft', 'États d’édition']
        },
        {
            categorie: 'ERP & logique applicative',
            description: 'Création de configurateurs basés sur des scénarios de questions et l’application de formules.',
            items: ['ERP', 'Configurateurs', 'Modélisation de processus métiers']
        },
        {
            categorie: 'Outils & versionnage',
            description: 'Dépôt de code, sauvegarde et mise en ligne.',
            items: ['Git', 'GitHub', 'GitHub Pages']
        },
        {
            categorie: 'Sécurité & conformité',
            description: 'Formations suivies auprès de l’ANSSI et de la CNIL.',
            items: ['Cybersécurité', 'EBIOS Risk Manager', 'RGPD']
        }
    ],

    /* Réalisations professionnelles — rattachées au tableau E5 */
    projets: [
        {
            id: 'nva',
            categorie: 'Entreprise',
            titre: 'Réalisation d’un flux NVA',
            sousTitre: 'Cabinet PAGOS · ERP',
            resume: 'Conception et développement d’un flux complet permettant d’assurer le suivi de la non valeur ajoutée (NVA) par employé.',
            periode: '01/10/2025 – 01/05/2026',
            bloc: 'incidents',
            image: 'images/FLUX NVA.png',
            tags: ['ERP', 'Reporting', 'Tableau de bord', 'JasperSoft'],
            realisations: [
                'Tableau de bord NVA par employé : suivi sur un mois glissant, tâches refusées, heures de reprises en cours, graphique par rapport à l’objectif.',
                'Tableau de bord NVA globale : vue d’ensemble sur tous les employés, avec tableaux donnant accès aux requêtes de détail.',
                'Configurateur « NVA Mesure » : lance le calcul de la NVA et liste les NVA par employé et par mois.',
                'État d’édition créé sur JasperSoft pour sortir la mesure de la performance par employé et par mois.'
            ],
            livrables: [{ label: 'Dossier de réalisation (PDF)', href: 'documents/Projet 1_Construction du flux NVA_EG.pdf' }],
            code: null
        },
        {
            id: 'webtask',
            categorie: 'Entreprise',
            titre: 'Amélioration d’un site Web',
            sousTitre: 'Cabinet PAGOS · Site WebTask',
            resume: 'Le projet WebTask vise à développer le site de suivi de projet interne à PAGOS, également utilisé par les clients du Cabinet.',
            periode: '16/04/2026 – 17/04/2026',
            bloc: 'presence',
            image: 'images/SITE WTK.png',
            tags: ['PHP', 'Symfony', 'Twig', 'JavaScript'],
            realisations: [
                'Page de connexion et création d’un rôle « développeur ».',
                'Bas de page : modification de la version possible uniquement pour certains rôles attribués.',
                'Page d’historique des versions, visible uniquement pour certains rôles attribués.'
            ],
            livrables: [{ label: 'Dossier de réalisation (PDF)', href: 'documents/Projet 2_Développement et amélioration du site Webtask_EG.pdf' }],
            code: null
        },
        {
            id: 'stock',
            categorie: 'Entreprise',
            titre: 'Déploiement d’un configurateur',
            sousTitre: 'Cabinet PAGOS · ERP · pour un client',
            resume: 'Créer un configurateur permettant de faire des mouvements de stocks, et plus particulièrement des transferts et des sorties.',
            periode: '01/02/2026 – 01/03/2026',
            bloc: 'service',
            image: 'images/MOUVEMENT DE STOCKS.png',
            tags: ['ERP', 'Configurateur', 'Gestion de stock'],
            realisations: [
                'Demande du client : transferts et sorties de stock, avec une cause saisie pour garder une trace.',
                'Configurateur « tronc commun » qui redirige vers le configurateur adapté (entrer, transférer, sortir du stock, etc.).',
                'Configurateur « Sortir du stock » : sélection par n° de série ou de lot, saisie de la quantité et du motif, mise à jour de l’entité « Mouvementer les stocks ».'
            ],
            livrables: [{ label: 'Dossier de réalisation (PDF)', href: 'documents/Projet 3_Déploiement d’un configurateur de gestion des mouvements de stock_EG.pdf' }],
            code: null
        },
        {
            id: 'portfolio',
            categorie: 'Campus Ermitage',
            titre: 'Sauvegarde et sécurisation du portfolio',
            sousTitre: 'Campus Ermitage · Ce site',
            resume: 'Site statique déployé sur GitHub Pages, avec sauvegarde locale du dépôt GitHub.',
            periode: '01/05/2026 – 22/05/2026',
            bloc: 'patrimoine',
            image: 'images/PORTFOLIO.png',
            tags: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub Pages'],
            realisations: [
                'Site statique en HTML, CSS et JavaScript, déployé sur GitHub Pages.',
                'Sauvegarde locale : clone du dépôt GitHub avec la commande « git clone » dans le dossier « SAUVEGARDE_GITHUB ».'
            ],
            livrables: [{ label: 'Dossier de réalisation (PDF)', href: 'documents/Projet 4_Sauvegarde GITHUB du Portfolio en local.pdf' }],
            code: { href: 'https://github.com/Elea-G/PORTFOLIO_Elea', prive: false }
        },
        {
            id: 'vitrine',
            categorie: 'Projets E6',
            titre: 'Site vitrine de voyage (POC)',
            sousTitre: 'Campus Ermitage · Travail en équipe',
            resume: 'Projet d’équipe : site vitrine interactif pour une start-up de voyages sur mesure, avec simulation de voyage et espace d’administration.',
            periode: '01/01/2026 – 22/05/2026',
            bloc: 'projet',
            image: 'images/SITE VITRINE.png',
            tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            realisations: [
                'Cahier des charges : analyse du besoin, objectifs SMART, architecture, maquettes, MCD/MLD.',
                'Simulation de voyage à deux niveaux (anonyme puis membre), espace membre et tableau de bord d’administration.',
                'Exigences RGPD : consentement, mentions légales, politique de confidentialité.'
            ],
            livrables: [{ label: 'Cahier des charges (PDF)', href: 'documents/CAHIER DES CHARGES_TP SITE VITRINE.pdf' }],
            code: { href: 'https://github.com/Campus-Ermitage/PROJET-SITE-VITRINE/tree/main/09012025_CODE_SITE%20VITRINE_Elea%20Guilmot', prive: true }
        }
    ],

    certifications: [
        {
            titre: 'MOOC de l’ANSSI',
            organisme: 'ANSSI',
            date: '25 février 2026',
            description: 'Formation aux fondamentaux de la cybersécurité dispensée par l’Agence Nationale de la Sécurité des Systèmes d’Information.',
            icone: 'shield',
            lienSite: 'https://secnumacademie.gouv.fr/',
            lienCertif: 'documents/Certification MOOC ANSSI_Elea GUILMOT_25022026.pdf'
        },
        {
            titre: 'MOOC EBIOS Risk Manager',
            organisme: 'ANSSI',
            date: '4 mars 2026',
            description: 'Méthode d’appréciation et de traitement des risques numériques publiée par l’ANSSI, référence en analyse de risques cyber.',
            icone: 'target',
            lienSite: 'https://cyber.gouv.fr/la-methode-ebios-risk-manager',
            lienCertif: 'documents/Test_final___ANSSI_x_Club_EBIOS_04-03-2026.pdf'
        },
        {
            titre: 'MOOC de la CNIL',
            organisme: 'CNIL',
            date: '8 juillet 2026',
            description: 'Formation à la protection des données personnelles et au Règlement Général sur la Protection des Données (RGPD), dispensée par la CNIL.',
            icone: 'lock',
            lienSite: 'https://atelier-rgpd.cnil.fr/',
            lienCertif: 'documents/Certification MOOC CNIL_Elea GUILMOT_08072026.pdf'
        }
    ],

    veille: {
        sujet: 'L’Intelligence Artificielle Générative',
        misAJour: 'Novembre 2026',
        outils: [
            { nom: 'Feedly', texte: 'regroupe dans un seul flux RSS les sites que je suis' },
            { nom: 'Google Alertes', texte: 'sur les mots-clés « IA générative », « LLM », « Copilot » et « AI Act »' },
            { nom: 'Newsletters', texte: 'des sites d’actualité informatique' }
        ],
        sources: [
            { nom: 'Solutions Numériques', lien: 'https://www.solutions-numeriques.com/' },
            { nom: 'Blog du Modérateur', lien: 'https://www.blogdumoderateur.com/' },
            { nom: 'Banque de France', lien: 'https://www.banque-france.fr/' },
            { nom: 'Blog d’Anthropic', lien: 'https://www.anthropic.com/news' }
        ],
        demarche: 'Chaque semaine, je collecte les nouveautés, je garde les articles récents issus de sources fiables, puis je rédige un résumé et une analyse personnelle.',
        articles: [
            {
                titre: 'Google repère un agent IA qui transforme seul des correctifs en attaques',
                source: 'Solutions Numériques & Cybersécurité',
                date: '18 novembre 2026',
                resume: 'Le Threat Intelligence Group de Google et Mandiant ont repéré un outil piloté par IA qui mène seul une attaque complète : il compare le code d’un logiciel web avant et après chaque correctif pour trouver la faille, puis écrit et lance l’exploit. Les attaquants misent sur la vitesse et le volume plutôt que sur des failles inédites.',
                analyse: 'Appliquer rapidement les mises à jour devient un vrai critère de sécurité, y compris pour les frameworks et les dépendances des applications que je développe.',
                lien: 'https://www.solutions-numeriques.com/google-repere-un-agent-ia-qui-transforme-seul-des-correctifs-en-attaques/'
            },
            {
                titre: 'Le Français OVHcloud se lance dans les LLM avec Olala, un petit modèle ouvert',
                source: 'Blog du Modérateur',
                date: '17 novembre 2026',
                resume: 'OVHcloud présente Olala, son premier modèle de langage ouvert. La version compacte (7 milliards de paramètres) fonctionne en local, même sans GPU dédié, et sera publiée sous licence Apache 2.0. Aucun benchmark n’a encore été publié.',
                analyse: 'Un modèle ouvert qui tourne en local permet d’intégrer de l’IA dans une application sans envoyer les données à un service tiers, ce qui compte pour le RGPD. Ses performances restent à vérifier.',
                lien: 'https://www.blogdumoderateur.com/ovhcloud-llm-olala-petit-modele-ouvert/'
            },
            {
                titre: 'AVIS D’EXPERT – Comment l’IA agentique redéfinit la valeur des logiciels métiers',
                source: 'Solutions Numériques & Cybersécurité',
                date: '16 novembre 2026',
                resume: 'Avec l’IA agentique, les utilisateurs accèdent aux données de leurs logiciels métiers via un agent, sans passer par l’interface, ce qui oblige les éditeurs à ouvrir leurs applications (par exemple avec un serveur MCP). L’auteur estime que leur valeur reste dans la qualité des données, les règles de gestion et le contrôle des accès.',
                analyse: 'Cela rejoint mon travail : dans un ERP ou dans WebTask, ce sont les règles de gestion et les droits d’accès par rôle qui rendent l’outil fiable.',
                lien: 'https://www.solutions-numeriques.com/avis-dexpert-comment-lia-agentique-redefinit-la-valeur-des-logiciels-metiers/'
            },
            {
                titre: 'Donating Agent Skills to the Agentic AI Foundation',
                source: 'Anthropic (source primaire, en anglais)',
                date: '22 octobre 2026',
                resume: 'Anthropic donne le standard ouvert Agent Skills à l’Agentic AI Foundation, hébergée par la Linux Foundation. Un « skill » est un dossier avec un fichier SKILL.md qui apprend une procédure à un agent IA. Plus de 70 plateformes l’ont déjà intégré depuis décembre 2025.',
                analyse: 'Un standard ouvert et neutre limite la dépendance à un fournisseur : c’est un critère à prendre en compte pour choisir un outil d’IA dans une application métier.',
                lien: 'https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation'
            },
            {
                titre: 'L’IA s’installe dans les entreprises françaises : une diffusion rapide, mais des gains de productivité encore limités',
                source: 'Banque de France — Bulletin n° 266',
                date: '3 septembre 2026',
                resume: 'Début 2026, 67 % des entreprises françaises de 20 salariés ou plus utilisent l’IA générative, surtout pour des usages simples. Les gains de productivité restent limités pour l’instant.',
                analyse: 'L’enjeu est d’intégrer l’IA dans les logiciels métiers, ce qui correspond à la spécialité SLAM et à mon travail chez PAGOS.',
                lien: 'https://www.banque-france.fr/fr/publications-et-statistiques/publications/lia-sinstalle-dans-les-entreprises-francaises-une-diffusion-rapide-mais-des-gains-de-productivite'
            },
            {
                titre: 'IA Act : ce qui change le 2 août 2026',
                source: 'Blog du Modérateur',
                date: '29 juillet 2026',
                resume: 'Le « Digital Omnibus » reporte les obligations des systèmes à haut risque à décembre 2027 (août 2028 pour certains). Les règles de transparence (chatbots, contenus générés par IA) s’appliquent bien depuis le 2 août 2026.',
                analyse: 'Si j’intègre un chatbot dans une application, je devrai indiquer qu’il s’agit d’une IA, comme je le fais pour le RGPD dans mon formulaire de contact.',
                lien: 'https://www.blogdumoderateur.com/ia-act-2-aout-2026/'
            }
        ]
    }
};
