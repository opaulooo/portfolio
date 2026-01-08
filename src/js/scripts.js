/*!
 * Start Bootstrap - Freelancer v7.0.4 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Inicializar traduções quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}

i = 0;

function createBubble() {
    const animatedsection = document.querySelector("animatedsection");
    if (!animatedsection) return;

    const createElement = document.createElement("span");
    var size = Math.random() * 20;

    // Usar as dimensões do container animatedsection
    const containerWidth = animatedsection.offsetWidth;
    const maxBubbleSize = 100 + size;

    createElement.style.animation = "animation 20s linear infinite";
    createElement.style.width = maxBubbleSize + "px";
    createElement.style.height = maxBubbleSize + "px";

    // Garantir que a bolha não ultrapasse os limites do container
    const maxLeft = containerWidth - maxBubbleSize;
    createElement.style.left = Math.random() * Math.max(0, maxLeft) + "px";

    animatedsection.appendChild(createElement);

    setTimeout(() => {
        createElement.remove();
    }, 10000);
}
setInterval(createBubble, 350);

