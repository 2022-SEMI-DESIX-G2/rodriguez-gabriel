const getFibonacciSequence = (n) => {
    const stack = [0, 1];
    for (let i = 2; i < n; i++) {
        stack[i] = stack[i - 1] + stack[i - 2];
    }
    return JSON.stringify({ sequence: [stack] });
};

module.exports = {
    getFibonacciSequence,
};