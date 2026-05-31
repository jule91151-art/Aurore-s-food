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
// DATA DES RECETTES & MODAL IMMERSIF (SUCRÉ & SALÉ BÉNIN)
// ==========================================================================
const dishesData = {
    burger: {
        tag: "Burger Signature • Salé",
        title: "Le Grand Burger Impérial",
        price: "8 500 CFA",
        img: "assets/hero.png",
        desc: "Le chef-d'œuvre salé d'Aurore. Un pain brioché croustillant préparé par nos artisans boulangers, abritant un généreux steak de bœuf local maturé et haché minute, nappé de véritable cheddar fondu premium, de tranches de bacon croustillant, et de notre emblématique sauce barbecue au miel sauvage local.",
        ingredients: "Pain brioché doré au beurre, steak de bœuf maturé 150g, tranches de cheddar premium, bacon croustillant, sauce barbecue au miel béninois, oignons confits, roquette fraîche.",
        pairing: "Milkshake Chocolat Intense ou Jus d'Ananas local pressé",
        time: "10 minutes de préparation minutieuse"
    },
    lamb: {
        tag: "Plateau Bistronomique • Salé",
        title: "L'Agneau Rôti en Croûte Fine",
        price: "15 000 CFA",
        img: "assets/main.png",
        desc: "Une interprétation raffinée pour nos amateurs de viandes nobles à Porto-Novo. Notre filet d'agneau ultra-tendre est rôti sous un fin manteau de chapelure croustillante parfumée aux herbes locales, accompagné d'une purée fine et onctueuse de petits pois parfumée à la menthe pour un contraste sublime.",
        ingredients: "Filet d'agneau de première qualité, chapelure parfumée, mousseline de petits pois fins à la menthe poivrée, carottes glacées, réduction de jus corsé d'agneau au romarin.",
        pairing: "Jus de Bissap Glacé maison ou Cocktail Passion infusé au Gingembre",
        time: "20 minutes de cuisson"
    },
    chocolateDome: {
        tag: "Douceur Divine • Sucré",
        title: "Le Dôme en Chocolat et Or Noir",
        price: "5 500 CFA",
        img: "assets/dessert.png",
        desc: "Le summum absolu du plaisir sucré chez Aurore's Food. Une coque sphérique brillante miroir en chocolat noir Criollo extra-raffiné, saupoudrée de feuilles d'or 24 carats comestibles. À l'intérieur, un cœur fondant chaud et voluptueux de framboises sauvages sur un lit craquant de sablé breton pur beurre.",
        ingredients: "Chocolat noir Criollo 72% d'exception, coulis de framboises fraîches acidulées, sablé breton croustillant à la fleur de sel, éclats de feuilles d'or pur.",
        pairing: "Jus de Passion frais pressé ou Boisson exotique glacée",
        time: "15 minutes d'orfèvrerie pâtissière"
    },
    crepe: {
        tag: "Douceur Fine • Sucré",
        title: "La Crêpe Dentelle et Caramel d'Or",
        price: "4 500 CFA",
        img: "assets/starter.png",
        desc: "Une douceur bretonne revisitée à la mode béninoise. Une crêpe fine croustillante dorée au beurre de baratte, rehaussée d'un généreux coulis de caramel fait maison au beurre salé et d'éclats de noix de cajou locales torréfiées.",
        ingredients: "Pâte à crêpe fine artisanale, sucre de canne local, crème de caramel au beurre de Guérande, éclats croquants de noix de cajou du Bénin.",
        pairing: "Milkshake Vanille Macadamia ou Thé Glacé à la Citronnelle",
        time: "8 minutes de préparation express"
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
