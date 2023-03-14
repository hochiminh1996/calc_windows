
const previousOperationText = document.querySelector("#previous-operation");
// visor com os números da operação anterior

const currentOperationText = document.querySelector("#current-operation");
// visor com os números digitados agora ou operação atual

const buttons = document.querySelectorAll("#buttons-container button");
// todos os nossos elementos button


// aplicando os conceitos de OOP.
class Calculator {
    //nosso método construtor
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;// tendo que já foi inserido
        this.currentOperation = "";//atributo que terá as operações que estão sendo realizadas agora
    }

    //nosso método que adiciona digitos na tela
    addDigit(digit) {

        //verificando  se já tem um ponto. Ou seja, se foi digitado um ponto e já contém ponto no nosso currentOperation que já foi inserido
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;//Se ele entrou aqui, significa que já tinha um ponto. Neste caso, ele apenas encerra.
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //método que atualiza os valores no visor da claculadora
    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation;
    }

    // método que processa todas as operações da calculadora
    processOperation(operation){
        alert("Chegou aqui:"+operation);

        //pegando o valor atual e o anterior
        let operationValue = 0;
        let previous =+this.previousOperationText.innerText;//observe a conversão (+)
        let current =+this.currentOperationText.innerText;
        

    }

}

const calc = new Calculator(previousOperationText, currentOperationText)


// atribuindo evento aos buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;//acessando o valor html do button. Irá exibir o texto clicado. 

        // se o valor for ponto ou númerico, eu quero fazer um determinado processamento
        // +variável converte para número 
        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            // se entrar aqui se trata de uma operação (+, -, *, /)
            calc.processOperation(value);
        }
    })
})