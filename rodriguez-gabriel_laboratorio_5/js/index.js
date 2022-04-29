((Utils) => {
    const App = {
        htmlElements: {
            fibonacciForm: document.getElementById('fibonacciForm'),
            fibonacciInput: document.getElementById('fibonacciInput'),
            fibonacciCardSection: document.getElementById('fibonacciCardSection')
        },
        init: () => {
            App.htmlElements.fibonacciForm.addEventListener('submit', App.handlers.onFibonacciFormSubmitHandler);
            App.htmlElements.fibonacciCardSection.addEventListener('click', App.handlers.onFibonacciCardClickHandler);
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            card: (n) => {
                return `<div id="card"class="cardClass">${n}</div>`;
            }
        },
        handlers: {
            onFibonacciCardClickHandler: (e) => {
                if(e.target.className ==='cardClass' && window.confirm("¿Esta seguro de que desea eliminar esta tarjeta?")) {
                    e.target.remove();
                }
            },
            onFibonacciFormSubmitHandler: (e) => {
                e.preventDefault();
                const fibonacciInput = App.htmlElements.fibonacciInput.value;
                if(fibonacciInput >= 1) {
                    App.htmlElements.fibonacciCardSection.innerHTML = '';
                    App.utils.fibonacci(fibonacciInput).forEach(value => {
                        App.htmlElements.fibonacciCardSection.innerHTML += App.templates.card(value);
                    })
                } else {
                    window.alert("El numero ingresado " + fibonacciInput + " debe ser mayor a 1");
                }
            }
        }
    };
    App.init();
})(document.Utils);