
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
        // verifica se o valor atual é vazio
        if (this.currentOperationText.innerText === "") {
            // possibilita a mudança de operação
            if (this.previousOperationText.innerText !== "") {
                // se o previous não tiver vazio, ou seja, já foi inserido valores da primeira parte da operação, ai ele vai permitir a mudança de operador 

                this.changeOperation(operation);


            }

            return;
            // se o usuário tentar adicionar uma operação sem digitar valores. Ou seja, apenas inserindo operadores (+,-, *,/)
        }


        let operationValue;//armazena o resultado da operação

        const previous = +this.previousOperationText.innerText.split(" ")[0];//observe a conversão (+). Foi usado o split para pegar apenas os valores. Ou seja, ele vai retornar um array, onde cada posição se dará através do espaço vazio. Logo, o array de posição 0 é o número digitado. O array de posição 1 é 0 sinal.


        const current = +this.currentOperationText.innerText;


        // operações 
        switch (operation) {
            case "+":
                operationValue = previous + current;
                //operação
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "-":
                operationValue = previous - current;
                //operação
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current;
                //operação
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current;
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
        } else {
            // se não for nulo
            //verificar se o valor é zero, se é adiciona o valor atual
            if (previous === 0) {
                operationValue = current;
            }

            //adicionando o valor atual para o previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            //ele joga o valor digitado antes do sinal com o sinal. Por exemplo, você digitou 25, depois colocou um +. Esse valor (25+) será jogado na tela

            this.currentOperationText.innerText = "";//zerando. Ele vai apagar o visor de digitado agora
        }
    }

    // vai permitir a mudança de operação
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];// array com as operações permmitidas

        // verifica se a operação digitada pelo usuário é permitida, segundo o nosso array de operação
        if(!mathOperations.includes(operation)){
            return;
        }

        
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
        // vai pegar o valor da primeira operação, e vai remover o último elemento e substituir pelo nosso operador
        
        // 25 + = ai o usuário quer trocar para um -, ele vai remover o + anterior e adicionar o - => 25 -

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