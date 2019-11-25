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
            txtWord = wordLine.toUpperCase().split('').sort().join("").replace(/ /g, "");
            userWord = word.split('').sort().join("").replace(/ /g , "");

            // Verifica se as palavras são iguais
            if(txtWord === userWord){
                // Se forem iguais, ele adiciona a palavra no Array de exibição
                list.push(wordLine.toUpperCase());
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
    // Transforma a letra em ASCII e verifica se é letra, espaço ou backspace, se não, retorna false.
    var charCode = (letter.charCode) ? letter.charCode : ((letter.keyCode) ? letter.keyCode : ((letter.which) ? letter.which : 0));
        if (charCode > 31 && (charCode < 65 || charCode > 90) &&
            (charCode < 97 || charCode > 122)  && (charCode != 32)) {
            alert("O campo aceita apenas Letras e Espaço!");
            return false;
        }
    return true
}
