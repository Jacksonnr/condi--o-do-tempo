// criação das constantes que irão receber os itens do documento HTML 

const form = document.querySelector('#formulario-de-busca > form');
const input = document.querySelector('#input-localizacao');
const sectionInfos = document.querySelector('#info-tempo');

// função assincrona para obter os dados informados pelo usuário dentro da aplicação e assim 
// podendo exibir em tela as condições climáticas da região informada. 


form.addEventListener('submit', async (event) =>{
    event.preventDefault();

    const localizacao = input.value;
    if(localizacao.length < 3){
        alert('O local informado precisa ter, pelo menos, 3 letras');
        return;
    }
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=5595659dea66343de44b772aefb9081c&lang=pt_br&units=metric`)
    const dados = await resposta.json();

    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    };

    sectionInfos.innerHTML = `
     <div class="tempo-dados">
                <h2>${infos.local}</h2>

                <span>${infos.temperatura}ºC</span>

            </div>
        
            <img src="${infos.icone}" alt="">`
    } catch (error) {
        alert('Houve um erro na obtenção dos dados através da API', error)
    }
    
});


