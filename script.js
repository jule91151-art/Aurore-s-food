/* ==========================================================================
   AURORE'S FOOD - INTERACTIVE LOGIC & ANIMATIONS (BÉNIN CONCEPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTION DU PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
        }, 1500);
    });

    // Cas de secours si le chargement prend trop de temps
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 4000);

    // 2. CONSOLE BRAND LOGGING
    console.log(
        '%c AURORE\'S FOOD %c Street-Gourmet à Porto-Novo, Bénin • Directrice: GUENDEHOU I.V. Aurore %c',
        'background:#d4af37;color:#09090a;padding:5px 10px;border-radius:4px 0 0 4px;font-weight:bold;',
        'background:#1c1c1f;color:#f0f0f2;padding:5px 10px;border-radius:0 4px 4px 0;',
        'background:transparent'
    );

    // 3. CURSEUR PERSONNALISÉ (Désactivé sur Android, actif sur PC)
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    
    if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const updateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        const hoverables = document.querySelectorAll('a, button, .menu-card, input, select, textarea, .category-btn');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    } else {
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // 4. HEADER AU DEFILEMENT (Header Scrolled)
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. NAVIGATION MOBILE TOGGLE
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 7. SURVEILLANCE DES LIENS ACTIFS DANS LE MENU
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const activeMenuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(sec => activeMenuObserver.observe(sec));

    // 8. FILTRAGE INTERACTIF DE LA CARTE (MENU)
    const filterButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                        
                        card.offsetHeight; 
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('show');
                    }
                }, 300);
            });
        });
    });

    // Auto-remplissage de la date & heure de réservation
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        const minDateTime = now.toISOString().slice(0, 16);
        dateInput.min = minDateTime;
        dateInput.value = minDateTime;
    }
});

// ==========================================================================
// DATA DES RECETTES & MODAL IMMERSIF (MENU ACTUEL COMPLET)
// ==========================================================================
const dishesData = {
    // --- ENTRÉES & PARTAGES ---
    grandPlatter: {
        tag: "Plateau à Partager • Entrée",
        title: "Aurore’s Grand Platter",
        price: "9 500 CFA",
        img: "assets/main.png",
        desc: "Le roi incontesté de la convivialité chez Aurore's Food. Un plateau géant garni d'un maxi assortiment doré de nos meilleures spécialités : frites de poulet croustillantes, aiguillettes de poulet extra-tendres panées, ailes de poulet épicées (wings) bien enrobées, et rondelles d'oignons (onion rings) fondantes à la bière. Idéal pour débuter ensemble.",
        ingredients: "Frites de poulet dorées, aiguillettes croustillantes, ailes de poulet épicées (wings), onion rings, servis avec notre fameuse sauce crémeuse signature.",
        pairing: "Jus de Bissap Glacé au romarin ou Cocktail Passion",
        time: "15 minutes de confection minute"
    },
    chickenWings: {
        tag: "Entrée Croustillante • Wings",
        title: "Zesty Chicken Wings",
        price: "4 500 CFA",
        img: "assets/starter.png",
        desc: "Ailes de poulet fraîches, frites minute jusqu'à obtenir une peau délicieusement soufflée et croustillante. Elles sont ensuite enrobées généreusement selon votre choix : soit d'une sauce BBQ piquante au miel béninois et piments doux, soit d'un mélange crémeux d'ail confit et de parmesan râpé.",
        ingredients: "Ailes de poulet de qualité, marinade épicée, sauce BBQ piquante maison ou sauce onctueuse ail-parmesan.",
        pairing: "Limonade fraîche pressée à la menthe ou Soda glacé",
        time: "10 minutes de grillade intense"
    },
    chickenTenders: {
        tag: "Le Croustillant Pur • Salé",
        title: "Crispy Chicken Tenders",
        price: "4 000 CFA",
        img: "assets/main.png",
        desc: "Nos filets de poulet ultra-tendres sont marinés durant 12 heures dans du lait de babeurre et des épices cajun, puis enrobés individuellement d'une panure dorée croustillante et frits minute sous vos yeux pour garantir un croustillant d'exception.",
        ingredients: "Filets de poulet fermier marinés, panure secrète croustillante, sauce au choix.",
        pairing: "Jus d'Ananas frais pressé ou Sauce Algérienne",
        time: "8 minutes de friture dorée"
    },

    // --- BURGERS PREMIUM ---
    auroreClassic: {
        tag: "Burger d'Exception",
        title: "The Aurore Classic",
        price: "5 500 CFA",
        img: "assets/hero.png",
        desc: "Le pilier salé de notre gamme. Un steak de bœuf juteux haché à la minute, surmonté d'une double tranche de cheddar mature fondu, de salade romaine croquante, de tomates fraîches juteuses et d'oignons rouges, le tout nappé de notre sauce spéciale maison dans un pain brioché artisanal toasté au beurre.",
        ingredients: "Pain brioché artisanal de Porto-Novo, steak de bœuf 150g, double cheddar, tomates fraîches, oignons, salade romaine, sauce spéciale maison.",
        pairing: "Milkshake Vanille-Macadamia onctueux ou jus frais",
        time: "10 minutes de cuisson minutieuse"
    },
    smokyBbq: {
        tag: "Burger Fumé Premium",
        title: "Smoky BBQ Burger",
        price: "6 500 CFA",
        img: "assets/hero.png",
        desc: "Une expérience puissante pour les amateurs de grillades. Un steak de bœuf juteux surmonté de cheddar mature fondu, de tranches de bacon de dinde grillées croustillantes, d'onion rings croustillants disposés directement dans le burger, nappé d'une sauce BBQ richement fumée au miel sauvage du Bénin.",
        ingredients: "Steak de bœuf premium, cheddar fondu, tranches de bacon de dinde fumé, onion rings croustillants, sauce BBQ fumée au miel, pain brioché.",
        pairing: "Cocktail Passion-Gingembre frais",
        time: "12 minutes de préparation"
    },
    crunchyChicken: {
        tag: "Burger Croustillant Volaille",
        title: "Crunchy Chicken Burger",
        price: "6 000 CFA",
        img: "assets/hero.png",
        desc: "Pour les adeptes du poulet d'exception. Un filet de poulet mariné pané extra-croustillant, surmonté d'une salade de chou Coleslaw crémeuse et acidulée faite maison, de cornichons croquants et nappé d'une mayonnaise légèrement épicée d'Aurore.",
        ingredients: "Filet de poulet mariné croustillant, salade de chou Coleslaw maison, cornichons fins, sauce mayonnaise spicy d'Aurore, pain brioché doré.",
        pairing: "Thé Glacé maison à la Citronnelle",
        time: "10 minutes"
    },

    // --- WRAPS & TACOS ---
    streetTacos: {
        tag: "Inspiration Mexico • Wraps",
        title: "Street Style Tacos",
        price: "4 500 CFA",
        img: "assets/tacos.png",
        desc: "Trois tortillas de blé souples garnies généreusement de bœuf effiloché cuit à basse température pendant 8 heures ou de poulet grillé au charbon de bois, d'oignons rouges marinés au vinaigre de cidre et d'une crème fraîche acidulée au citron vert.",
        ingredients: "3 tortillas de blé souples, bœuf effiloché juteux ou poulet grillé, coriandre fraîche, oignons pickles maison, crème de citron vert.",
        pairing: "Jus d'Ananas frais pressé bien glacé",
        time: "12 minutes de dressage"
    },
    auroreWrap: {
        tag: "Le Roulé Toasté • Wraps",
        title: "The Big Aurore Wrap",
        price: "5 000 CFA",
        img: "assets/starter.png",
        desc: "Une tortilla de blé géante garnie de nos tenders de poulet croustillants chauds, de dés de tomates fraîches juteuses, d'une salade romaine croquante et d'un filet de notre sauce miel-moutarde onctueuse. Roulé serré et toasté sous la presse.",
        ingredients: "Tortilla de blé géante, tenders croustillants panés, dés de tomates fraîches, salade romaine, sauce miel-moutarde maison.",
        pairing: "Jus de Bissap Glacé de Porto-Novo",
        time: "8 minutes"
    },
    frenchTacos: {
        tag: "Le Gourmand Absolu • Tacos",
        title: "French Tacos Double",
        price: "6 500 CFA",
        img: "assets/starter.png",
        desc: "L'incontournable de la street-culture scellé sous la presse. Une double galette de blé garnie généreusement de tenders de poulet croustillants et de frites maison chaudes à l'intérieur, le tout entièrement noyé sous notre célèbre sauce fromagère onctueuse secrète faite maison et gratinée sous une couche de cheddar mature.",
        ingredients: "Double galette de blé, tenders croustillants de poulet, frites dorées maison, sauce fromagère chaude maison, cheddar gratiné.",
        pairing: "Boisson fraîche gazeuse classique",
        time: "15 minutes de gratinage"
    },

    // --- SIDES & ACCOMPAGNEMENTS ---
    garlicFries: {
        tag: "Accompagnement Signature",
        title: "Cheese & Garlic Fries",
        price: "3 500 CFA",
        img: "assets/garlic_fries.png",
        desc: "Vos frites de pommes de terre classiques transformées en expérience divine. Une portion généreuse de nos frites de pommes de terre maison croustillantes, entièrement nappées d'une onctueuse sauce fromagère chaude au cheddar fondu et saupoudrées d'ail rôti croustillant et d'herbes fraîches.",
        ingredients: "Frites de pommes de terre fraîches maison, sauce fromagère chaude, ail rôti croustillant, persil plat.",
        pairing: "Idéal pour accompagner tous nos burgers premium",
        time: "8 minutes"
    },
    alloco: {
        tag: "Incontournable Bénin • Salé-Sucré",
        title: "Spicy Fried Plantains (Alloco)",
        price: "2 500 CFA",
        img: "assets/alloco.png",
        desc: "Notre fierté locale à Porto-Novo. Des bananes plantains sélectionnées à parfaite maturité chez nos maraîchers locaux, découpées et frites jusqu'à obtention d'une magnifique couleur caramel dorée. Moelleuses et sucrées à l'intérieur, elles sont relevées d'un subtil sel d'épices douces.",
        ingredients: "Bananes plantains mûres béninoises, frites dorées minute, mélange d'épices douces locales.",
        pairing: "Se marie parfaitement avec nos Chicken Wings croustillantes !",
        time: "8 minutes"
    },

    // --- DESSERTS & SWEETS ---
    chocolateDome: {
        tag: "Douceur Divine • Sucré",
        title: "Le Dôme en Chocolat et Or Noir",
        price: "5 500 CFA",
        img: "assets/dessert.png",
        desc: "La signature finale d'Aurore's Food. Une coque miroir étincelante faite du meilleur chocolat Criollo, ornée de délicats éclats d'or pur. À l'intérieur, découvrez un cœur voluptueux et tiède de framboises sauvages sur un lit de sablé breton croustillant à la fleur de sel.",
        ingredients: "Chocolat noir Criollo 72% d'exception, coulis de framboises fraîches acidulées, sablé breton croustillant à la fleur de sel, éclats de feuilles d'or pur.",
        pairing: "Milkshake Vanille ou jus de fruits exotiques frais de saison",
        time: "15 minutes d'orfèvrerie pâtissière"
    }
};

function openDishDetail(dishKey) {
    const dish = dishesData[dishKey];
    if (!dish) return;

    document.getElementById('modalImg').src = dish.img;
    document.getElementById('modalImg').alt = dish.title;
    document.getElementById('modalTag').innerText = dish.tag;
    document.getElementById('modalTitle').innerText = dish.title;
    document.getElementById('modalPrice').innerText = dish.price;
    document.getElementById('modalDesc').innerText = dish.desc;
    document.getElementById('modalIngredients').innerText = dish.ingredients;
    document.getElementById('modalPairing').innerText = dish.pairing;
    document.getElementById('modalTime').innerText = dish.time;

    const modal = document.getElementById('dishModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDishModal() {
    const modal = document.getElementById('dishModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDishModal();
    }
});

// ==========================================================================
// CONCIERGERIE & RÉSERVATION SYSTEME (+229 BENIN)
// ==========================================================================
function handleReservation(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Transmission à Aurore...</span>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        const toast = document.getElementById('successToast');
        toast.classList.add('show');
        
        document.getElementById('resForm').reset();
        
        setTimeout(() => {
            closeToast();
        }, 8000);
        
    }, 1500);
}

function closeToast() {
    const toast = document.getElementById('successToast');
    toast.classList.remove('show');
}
