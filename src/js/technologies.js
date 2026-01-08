// Array de tecnologias
const technologies = [
    {
        name: 'Angular',
        src: 'src/assets/icons/techs/angular.svg',
        width: '50%'
    },
    {
        name: 'IONIC',
        src: 'src/assets/icons/techs/ionic.svg',
        width: '50%'
    },
    {
        name: '.NET',
        src: 'src/assets/icons/techs/dotnet.svg',
        width: '50%'
    },
    {
        name: 'NodeJS',
        src: 'src/assets/icons/techs/nodejs.svg',
        width: '60%'
    },
    {
        name: 'MySQL',
        src: 'src/assets/icons/techs/mysql.svg',
        width: '50%'
    },
    {
        name: 'MongoDb',
        src: 'src/assets/icons/techs/mongodb.svg',
        width: '50%'
    },
    {
        name: 'React',
        src: 'src/assets/icons/techs/react.svg',
        width: '50%'
    },
    {
        name: 'Nest.js',
        src: 'src/assets/icons/techs/nestjs.svg',
        width: '50%'
    },
    {
        name: 'JAVA',
        src: 'src/assets/icons/techs/java.svg',
        width: '50%'
    },
    {
        name: 'Docker',
        src: 'src/assets/icons/techs/docker.svg',
        width: '50%'
    },
    {
        name: 'AWS',
        src: 'src/assets/icons/techs/aws.svg',
        width: '50%'
    },
    {
        name: 'Azure',
        src: 'src/assets/icons/techs/azure.svg',
        width: '50%'
    }
];

// Função para renderizar as tecnologias
function renderTechnologies() {
    const container = document.getElementById('technologies-grid');
    
    if (!container) return;
    
    let currentRow;
    
    technologies.forEach((tech, index) => {
        // Cria uma nova linha a cada 3 itens
        if (index % 3 === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row card-body';
            container.appendChild(currentRow);
        }
        
        // Cria o elemento da tecnologia
        const techItem = document.createElement('div');
        techItem.className = 'col-lg-4 col-xl-4 align-middle';
        techItem.style.marginTop = '1em';
        
        techItem.innerHTML = `
            <div class="text-center text-uppercase text-secondary">
                <a data-toggle="tooltip" data-placement="top" title="${tech.name}">
                    <img class="techs" src="${tech.src}" alt="${tech.name}" 
                         width="${tech.width}" style="max-width: 100px;" />
                </a>
            </div>
        `;
        
        currentRow.appendChild(techItem);
    });
}

// A função será chamada pelo components-loader após o carregamento dos componentes
