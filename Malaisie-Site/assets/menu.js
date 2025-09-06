document.addEventListener('DOMContentLoaded', function () {
    const btn  = document.getElementById('menuBtn');
    const menu = document.getElementById('menuDropdown');
    const bar  = document.getElementById('movingBar');
    const wrap = document.getElementById('menuWrap');

    let open = false;

    function openMenu() {
        open = true;
        menu.style.opacity = '1';
        menu.style.maxHeight = '500px';

    // déplacer la barre DANS le menu et la coller en bas
    menu.appendChild(bar);
    bar.classList.remove('w-full');
    bar.classList.add('absolute','left-0','bottom-0');
    // garder ta largeur spéciale / petit décalage si tu veux
    bar.style.width = '100.65%';
    bar.style.left  = '-4px';
    }

    function closeMenu() {
        open = false;
        menu.style.opacity = '0';
        menu.style.maxHeight = '0';

    // remonter la barre SOUS le bouton
    wrap.insertBefore(bar, menu);
    bar.classList.remove('absolute','left-0','bottom-0');
    bar.classList.add('w-full');
    bar.style.width = '';
    bar.style.left  = '';
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        open ? closeMenu() : openMenu();
    });

    document.addEventListener('click', function (e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            if (open) closeMenu();
        }
    });

  // état initial
    closeMenu();
});

