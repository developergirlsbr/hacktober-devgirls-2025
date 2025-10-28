const previsoes = [
      {
        "cidade": "São Paulo",
        "temperatura": "22°C",
        "condicao": "Ensolarado",
        "icone": "☀️"
      },
      {
        "cidade": "Rio de Janeiro",
        "temperatura": "28°C",
        "condicao": "Parcialmente Nublado",
        "icone": "⛅"
      },
      {
        "cidade": "Porto Alegre",
        "temperatura": "18°C",
        "condicao": "Chuva",
        "icone": "🌧️"
      }
    ];

    let indice = 0;

    const cidadeEl = document.getElementById('cidade');
    const condicaoEl = document.getElementById('condicao');
    const temperaturaEl = document.getElementById('temperatura');
    const iconeEl = document.getElementById('icone');
    const btnProxima = document.getElementById('btnProxima');

    function atualizarPrevisao() {
      const p = previsoes[indice];
      cidadeEl.textContent = p.cidade;
      condicaoEl.textContent = p.condicao;
      temperaturaEl.textContent = p.temperatura;
      iconeEl.textContent = p.icone;
    }

    btnProxima.addEventListener('click', () => {
      indice = (indice + 1) % previsoes.length;
      atualizarPrevisao();
    });