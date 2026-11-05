document.addEventListener("DOMContentLoaded", () => {
    // 1. Detectar el rol activo para redirecciones internas
    const urlParams = new URLSearchParams(window.location.search);
    let rolActivo = urlParams.get('rol');

    if (rolActivo) {
        localStorage.setItem('rolActivo', rolActivo);
    } else {
        rolActivo = localStorage.getItem('rolActivo') || 'administracion';
    }

    const linkConRol = (url) => `${url}?rol=${rolActivo}`;

    // 2. Inyectar HEADER
    const mainHeader = document.getElementById("main-header");
    if (mainHeader) {
        mainHeader.className = "main-header";
        mainHeader.innerHTML = `
            <div class="header-logo">
                <a href="${linkConRol('portada.html')}" class="logo-link">
                    <span class="brand">INFOMEX</span>
                    <span class="separator">|</span>
                    <span class="tagline">Sistema de acceso<br>a la información</span>
                </a>
            </div>

            <nav class="header-nav" id="headerNav" aria-label="Navegación principal">
                <a href="${linkConRol('guias.html')}">Guías de usuario</a>
                <a href="${linkConRol('tutorial.html')}">Tutorial de<br>versión pública</a>
                <a href="${linkConRol('documentosApoyo.html')}">Documentos<br>de apoyo</a>
                <a href="${linkConRol('glosario.html')}">Glosario</a>
            </nav>

            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Abrir menú" aria-expanded="false" aria-controls="headerNav">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }

    // 3. Inyectar PANEL DE ACCESIBILIDAD
    const accWrapper = document.getElementById("acc-wrapper");
    if (accWrapper) {
        accWrapper.className = "acc-wrapper";
        accWrapper.innerHTML = `
            <div id="accBtn" class="acc-button" role="button" tabindex="0" aria-label="Abrir panel de accesibilidad" aria-expanded="false" aria-controls="accPanel">
                <i class="fa-solid fa-universal-access"></i>
            </div>
            <div id="accPanel" class="acc-panel">
                <div class="acc-header">
                    <i class="fa-solid fa-universal-access"></i>
                    <span>Accesibilidad</span>
                </div>
                <div class="acc-content">
                    <div class="font-size-row">
                        <button id="fontSmall" class="fs-btn">a -</button>
                        <input type="range" min="12" max="30" value="16" id="fontRange">
                        <button id="fontBig" class="fs-btn">A+</button>
                    </div>
                    <div class="darkmode-row">
                        <span>Modo nocturno</span>
                        <label class="switch">
                            <input type="checkbox" id="darkToggle" role="switch" aria-label="Modo nocturno">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. Inyectar FOOTER
    const siteFooter = document.getElementById("site-footer");
    if (siteFooter) {
        siteFooter.className = "site-footer";
        siteFooter.innerHTML = `
            <div class="footer-content">
                <img src="images/ineFooter.png" alt="Logo INE" class="footer-logo">
                <span class="footer-rights">© Derechos Reservados | Instituto Nacional Electoral 2027 | México</span>
            </div>
        `;
}

    // --- FUNCIONALIDADES ---
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const headerNav = document.getElementById('headerNav');
    if (mobileBtn && headerNav) {
        mobileBtn.addEventListener('click', function () {
            headerNav.classList.toggle('active');
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    const accBtn = document.getElementById("accBtn");
    const accPanel = document.getElementById("accPanel");
    if (accBtn && accPanel) {
        accBtn.onclick = () => accPanel.classList.toggle("open");
    }

    const range = document.getElementById("fontRange");
    const small = document.getElementById("fontSmall");
    const big = document.getElementById("fontBig");
    if (range) {
        const applyFont = () => { document.documentElement.style.fontSize = range.value + "px"; };
        range.oninput = applyFont;
        if (small) small.onclick = () => { range.value = Math.max(12, parseInt(range.value) - 2); applyFont(); };
        if (big) big.onclick = () => { range.value = Math.min(30, parseInt(range.value) + 2); applyFont(); };
    }

    const darkToggle = document.getElementById("darkToggle");
    if (darkToggle) {
        if (localStorage.getItem("darkmode") === "1") {
            document.body.classList.add("dark-mode");
            darkToggle.checked = true;
        }

        darkToggle.onchange = () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkmode", document.body.classList.contains("dark-mode") ? "1" : "0");
        };
    }
});