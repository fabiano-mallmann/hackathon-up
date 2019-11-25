function drawList(valor){
    // DOM
    var listElement = document.querySelector("ul");
    // Limpando HTML da tag <ul>
    listElement.innerHTML = "";

    // Percorrendo array
    for(linha of valor){
        // Criando tag <li>
        var itemElement = document.createElement('li');
        // Setando o texto
        var itemText = document.createTextNode(linha);
        // Colocando o texto dentro da tag <li>
        itemElement.appendChild(itemText);
        // Colocando o <li> dentro do <ul>
        listElement.appendChild(itemElement);
    }
    
}


function searchAnagrams() {
    // Palavra dita pelo usuário
    var word = document.getElementById("word").value.toUpperCase();
    // Lista de itens
    var list = [];
    
    
    var requisicion = function(){
        return new Promise(function(resolve, reject){
            // Faz um request e abre o arquivo em questão
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'palavras.txt', true);
            xhr.send(null);
            
            // Verifica se está tudo ok e retorna um response.
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(xhr.responseText);
                    }else{
                        reject('Não consegui encontrar o dicionário de anagramas!');
                    }
                }
            }
        });
    }

    // Le o response
    requisicion()
    .then(function(response){

        // Explode o documento de texto em um array
        txtLine = response.split('\n'); 

        // Percorre o Array
        for(wordLine of txtLine){

            // Explode, ordena, junta novamente e limpa espaços 
            txtWord = wordLine.split('').sort().join("").replace(/ /g, "");
            userWord = word.split('').sort().join("").replace(/ /g , "");

            // Verifica se as palavras são iguais
            if(txtWord === userWord){
                // Se forem iguais, ele adiciona a palavra no Array de exibição
                list.push(wordLine);
            }
        }

        // Verifica se houve palavras dentro do Array para ser impresso
        if(list.length === 0){
            drawList(["Nada encontrado"]);
        }else{
            drawList(list);
        }
    })
    .catch(function(error){
        // Retorna mensagem de erro caso não encontre o dicionário de anagramas
        alert(error);
    });
}

function onlyText(letter){
    // Transforma a letra em ASCII
    var key = letter.which || letter.keyCode;

    // Verifica se é letras de "a" a "z" maiusculas ou minusculas ou se é a tecla espaço
    if ((key >= 65 && key <= 90) || (key >= 97 && key <= 117) || (key === 32)){
        return true;
    }else{
        alert("O campo aceita apenas Letras e Espaço!");
        return false;
    }
}