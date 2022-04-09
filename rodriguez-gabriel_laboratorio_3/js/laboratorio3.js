document.getElementById("palindromeButton").addEventListener("click", VerifyPalindrome);
document.getElementById("charactersAmountbutton").addEventListener("click", charactersAmount);
document.getElementById("leapYearButton").addEventListener("click", verifyLeapYear);
document.getElementById("primeNumberButton").addEventListener("click", verifyPrimeNumber);
function VerifyPalindrome() {
    var inputNumber = parseInt(document.getElementById("palindromeInput").value);
    var binaryNumber = inputNumber.toString(2);
    var stringLength = 0;
    var invertedInputNumber = "";
    var invertedBinaryNumber = "";
    stringLength = inputNumber.toString().length;
    while (stringLength > 0) {
        stringLength = stringLength - 1;
        invertedInputNumber = invertedInputNumber + inputNumber.toString().charAt(stringLength);
    }
    stringLength = binaryNumber.length;
    while (stringLength > 0) {
        stringLength = stringLength - 1;
        invertedBinaryNumber = invertedBinaryNumber + binaryNumber.charAt(stringLength);
    }
    if ((invertedInputNumber == inputNumber) && (invertedBinaryNumber == binaryNumber)) {
        enteredNumber.value = inputNumber;
        binaryPalindrome.value = binaryNumber;
        invertedPalindrome.value = "Si es palindromo de doble base";
    }
    else {
        enteredNumber.value = inputNumber;
        binaryPalindrome.value = binaryNumber;
        invertedPalindrome.value = "No es palindromo de doble base";
    }
}
function charactersAmount() {
    document.getElementById('charactersResult').innerHTML = "";
    var inputString = document.getElementById("inputString").value.trim().split('');
    const repeatedCharacters = {};
    inputString.forEach(letter => {
        repeatedCharacters[letter] = (repeatedCharacters[letter] || 0) + 1;
    });
    for (let letter in repeatedCharacters) {
        document.getElementById('charactersResult').innerHTML += `${letter} = ${repeatedCharacters[letter]}<br>`;
    }
}
function verifyLeapYear() {
    var year = parseInt(document.getElementById("leapYearInput").value);
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        leapYearResponse.value = year + " es biciesto";
    }
    else {
        leapYearResponse.value = year + " no es biciesto";
    }
}
function verifyPrimeNumber() {
    var primeNumberInput = parseInt(document.getElementById("primeNumberInput").value);
    var primeNumberBase = 1;
    if(primeNumberInput >= 1 && primeNumberInput <= 1000000) {
        document.getElementById('primosval').innerHTML = "";
        for (let c = 2; c <= primeNumberInput; c++) {
            if (prime(c)) {
                primeNumberBase = primeNumberBase + c;
            }
        }
        function prime(number) {
            for (var i = 2; i < number; i++) {
                if (number % i === 0) {
                    return false;
                }
            }
            return number !== 1;
        }
        primeNumberResponse.value = primeNumberBase;
    }
    else {
        document.getElementById('errorInput').innerHTML = "Ingrese un numero entre 1 - 1000000";
    }
}