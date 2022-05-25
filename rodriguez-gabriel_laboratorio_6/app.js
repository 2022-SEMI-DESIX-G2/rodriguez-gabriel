const baseNumber = 7;
let numberOne = 0, numberTwo = 1, nextTerm;

console.log('Fibonacci Series:');

for (let i = 1; i <= baseNumber; i++) {
    console.log(numberOne);
    nextTerm = numberOne + numberTwo;
    numberOne = numberTwo;
    numberTwo = nextTerm;
}