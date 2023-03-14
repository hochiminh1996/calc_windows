
const previousOperationText = document.querySelector("#previous-operation");
// visor com os números da operação anterior

const currentOperationText = document.querySelector("current-operation");
// visor com os números digitados agora ou operação atual

const buttons = document.querySelectorAll("#buttons-container button");
// todos os nossos elementos button


class Calculator{

}

// atribuindo evento aos buttons
buttons.forEach((btn)=>{
    btn.addEventListener("click",(e) =>{
        const value = e.target.innerText;//acessando o valor html do button. Irá exibir o texto clicado. 

        // se o valor for ponto ou númerico, eu quero fazer um determinado processamento
        // +variável converte para número 
        if(+value>=0 || value === "."){
            alert(`Número ou ponto ${value}`)
        }else{
            // se entrar aqui se trata de uma operação (+, -, *, /)
            alert(`Operação ${value}`)
        }
    })
})