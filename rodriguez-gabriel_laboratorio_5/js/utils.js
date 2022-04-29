(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                const arr = [];
                for (let i = 0; i < n; i++) {
                    arr.push(Utils.methods.fibonacciRecursive(i));
                }
                return arr;
            },
            fibonacciRecursive: (n) => {
                const fibonacciNumber = n < 2 ? n : Utils.methods.fibonacciRecursive(n - 1) + Utils.methods.fibonacciRecursive(n - 2);
                return fibonacciNumber;
            }
        }
    }
    document.Utils = Utils;
})();