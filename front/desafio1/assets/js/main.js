const container = document.getElementById('circle-container');
const total = MelhoresFilmes.length;
const radius = 220;

MelhoresFilmes.forEach((filme, i) => {
    const angle = (i / total) * 2 * Math.PI;
    const centerX = 275;
    const centerY = 275;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const film = document.createElement('div');
    film.classList.add('film');
    film.style.left = `${x - 30}px`;
    film.style.top = `${y - 45}px`;
    film.style.backgroundImage = `url(${filme.Imagem})`;

    // Cria SVG para texto curvado (corrigido)
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.style.position = "absolute";
    svg.style.top = "50%";
    svg.style.left = "50%";
    svg.style.transform = "translate(-50%, -50%)";
    svg.style.pointerEvents = "none";

    const path = document.createElementNS(svgNS, "path");
    const pathId = `path-${filme.Id}`;
    path.setAttribute("id", pathId);
    path.setAttribute("d", "M 50,100 A 50,50 0 1,1 150,100 A 50,50 0 1,1 50,100");
    path.setAttribute("fill", "none");

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "#000");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dy", "-15"); // desloca o texto acima da bolinha

    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${pathId}`);
    textPath.setAttribute("startOffset", "50%");
    textPath.textContent = filme.Nome;

    text.appendChild(textPath);
    svg.appendChild(path);
    svg.appendChild(text);
    film.appendChild(svg);
    container.appendChild(film);

    film.classList.add('rotate');

});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function scrollToElemen(sec) {
    const section = document.getElementById(sec);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

const lista = document.getElementById('lista');
const modal = document.getElementById('modal');
const modalNome = document.getElementById('modal-nome');
const modalImagem = document.getElementById('modal-imagem');
const modalClassificacao = document.getElementById('modal-classificacao');
const modalDescricao = document.getElementById('modal-descricao');
const modalLegendado = document.getElementById('modal-legendado');
const modalDublado = document.getElementById('modal-dublado');
const closeBtn = document.querySelector('.close');

FilmesCartaz.forEach((filme) => {
    // Cria o container do item
    let div = document.createElement('div');
    div.classList.add('item');

    // Cria a imagem
    let img = document.createElement('img');
    img.src = filme.Imagem;
    img.alt = filme.Nome;

    // Cria o div com informações básicas
    let divFilho = document.createElement('div');

    let h3 = document.createElement('h3');
    h3.textContent = filme.Nome;

    let divClass = document.createElement('div');
    divClass.classList.add('class');
    divClass.textContent = filme.Classificacao;

    divFilho.appendChild(h3);
    divFilho.appendChild(divClass);

    div.appendChild(img);
    div.appendChild(divFilho);

    // Adiciona clique para abrir modal
    div.addEventListener('click', () => {
        modal.style.display = 'block';
        modalNome.textContent = filme.Nome;
        modalImagem.src = filme.Imagem;
        modalClassificacao.textContent = filme.Classificacao;
        modalDescricao.textContent = filme.Descricao;
        modalLegendado.textContent = filme.Legendado ? 'Sim' : 'Não';
        modalDublado.textContent = filme.Dublado ? 'Sim' : 'Não';
    });

    lista.appendChild(div);
});

// Fecha o modal ao clicar no "x"
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora da área
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
