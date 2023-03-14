
const previousOperationText = document.querySelector("#previous-operation");
// visor com os números digitados antes do sinal. Por exemplo, vocÊ digitou 25 +. O 25 vai ficar nesse visor e o próximo valor será o current

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
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;//Se ele entrou aqui, significa que já tinha um ponto. Neste caso, ele apenas encerra.
        }

        this.currentOperation = digit;
        this.updateScreen();
    }



    // método que processa todas as operações da calculadora
    processOperation(operation) {
        //pegando o valor atual e o anterior
        let operationValue;

        const previous = +this.previousOperationText.innerText;//observe a conversão (+)
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                //operação
                this.updateScreen(operationValue, operation, current, previous)
                break;
            default:
                return;
        }

    }

    //método que atualiza os valores no visor da claculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {

        console.log(operationValue, operation, current, previous);
        //se o operationValue for nulo, ele adiciona o valor digitado
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            // se não for nulo
            //verificar se o valor é zero, se é adiciona o valor atual
            if(previous===0){
                operationValue = current;
            }

            //adicionando o valor atual para o previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            //ele joga o valor digitado antes do sinal com o sinal. Por exemplo, você digitou 25, depois colocou um +. Esse valor (25+) será jogado na tela

            this.currentOperationText.innerText = ""; //zerando
        }
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