(() => {
    const fibonacciForm = document.getElementById('fibonacciForm');
    const fibonacciInput = document.getElementById('fibonacciInput');
    const fibonacciCardSection = document.getElementById('fibonacciCardSection');    
    const fibonacciFormSubmitHandler = (e) => {
        e.preventDefault();
        let numberOne, numberTwo, response, cardNumber, fibonacciNumber;
        numberOne = 0;
        numberTwo = 1;
        fibonacciNumber = fibonacciInput.value
        if (fibonacciNumber >= 1) {
            fibonacciCardSection.innerHTML = '';
            for (let i = 1; i <= fibonacciNumber; i++) {
                cardNumber = numberOne;
                response = numberOne + numberTwo;
                numberOne = numberTwo;
                numberTwo = response;
                fibonacciCardSection.innerHTML +=
                `<div id="fibonacciCards" class="fibonacciCardClass" name="cards">
                    <div id="cardNumber"class="container">${cardNumber}</div>
                </div>`;
            }
        } else {
            window.alert("El numero ingresado " + fibonacciNumber + " debe ser mayor a 1")
        }
    };
    const fibonacciCardClickHandler = (e) => {
        const eventNode = e.target;
        const cardNode = document.getElementById('fibonacciCards')
        if (eventNode.nodeName==cardNode.nodeName) {
            if (window.confirm("¿Esta seguro de que desea eliminar esta tarjeta?")) {
                fibonacciCardSection.removeChild(eventNode.parentNode)
            }
        }
    }
    fibonacciForm.addEventListener('submit', fibonacciFormSubmitHandler);
    fibonacciCardSection.addEventListener('click', fibonacciCardClickHandler);
})();
