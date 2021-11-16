let name;
let aux;


function tratarSucesso(){
}

function tratarError(erro){
    if (erro.response.status != 200)
    {
        alert("Erro ao carregar o nome :/");
        carregar();
    }
}

function carregarmensagens(objetos){

    aux = objetos;

    
    for (let i = 0; i < aux.data.length; i++)
    {
        var ul = document.getElementById("msgs");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(aux.data[i].time +" "+ aux.data[i].from + "   "+aux.data[i].text));
        if (aux.data[i].type == "status")
        {
            li.style.backgroundColor = "#DCDCDC";
        }
        else if(aux.data[i].type == "private_message")
        {
            li.style.backgroundColor = "#FFDEDE;";
        }
        ul.appendChild(li);
        li.scrollIntoView();

    }
}

function msgerro(){
    alert("Nao achei mensagens...");
}

function carregar(){
    name = prompt("Digite seu nome!");
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name});
    
    request.then(tratarSucesso);
    request.catch(tratarError);

    const mensagens = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagens.then(carregarmensagens);
    mensagens.catch(msgerro);
}

function checaronline(){

    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name});

    setTimeout(checaronline, 5000);
}

checaronline();

function atualizar(){
    const mensagens = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    mensagens.then(carregarmensagens);
    mensagens.catch(msgerro);
    setTimeout(atualizar, 3000);
}

atualizar();

function enviamensagem(){
    var texto = document.getElementById("caixatexto").value;

    let envio = {
        from: name,
        to: "Todos",
        text: texto,
        type: "message"
};

    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', {envio});
    
}

