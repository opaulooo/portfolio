// Carregador de componentes HTML
async function loadComponent(componentName, targetId) {
    try {
        const response = await fetch(`src/components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erro ao carregar componente ${componentName}:`, error);
    }
}

// Carregar todos os componentes
async function loadAllComponents() {
    const components = [
        { name: 'navigation', target: 'navigation-container' },
        { name: 'header', target: 'header-container' },
        { name: 'about', target: 'about-container' },
        { name: 'technologies', target: 'technologies-container' },
        { name: 'hobbies', target: 'hobbies-container' },
        { name: 'portfolio', target: 'portfolio-container' },
        { name: 'footer', target: 'footer-container' },
        { name: 'modals/stockflow-modal', target: 'modals-container' },
        { name: 'modals/spendlist-modal', target: 'modals-container' }
    ];

    // Carregar todos os componentes em paralelo
    await Promise.all(
        components.map(comp => loadComponent(comp.name, comp.target))
    );

    // Após carregar todos os componentes, renderizar tecnologias e inicializar traduções
    if (typeof renderTechnologies === 'function') {
        renderTechnologies();
    }
    
    if (typeof initializeLanguage === 'function') {
        initializeLanguage();
    }
}

// Carregar componentes quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
