export function palindrome(str) {
    const formattedStr = str.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const reversedStr = formattedStr.split('').reverse().join('');
    return formattedStr === reversedStr;
}

export function convertToRoman(num) {
    let numCopy = num;
    const romanNums = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    let convertedNum = '';

    // loop fine tuning from: https://stackoverflow.com/a/41358305
    for (const numeral of Object.keys(romanNums)) {
        const multiplier = Math.floor(numCopy / romanNums[numeral]);
        numCopy -= romanNums[numeral] * multiplier;
        convertedNum += numeral.repeat(multiplier);
    }

    return convertedNum;
}

export function rot13(str) {
    // modulo use taken from https://forum.freecodecamp.org/t/caesars-cipher-other-approaches/82127/25
    return str.toUpperCase().replace(/[A-Z]/g, (letter) => String.fromCharCode((letter.charCodeAt(0) % 26) + 65));
}

export function telephoneCheck(str) {
    const regex1 = /^(1\s?)?\d{3}([-\s]?)\d{3}\2\d{4}$/;
    const regex2 = /^(1\s?)?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/;

    if (regex1.test(str)) {
        return true;
    }
    return !!regex2.test(str);
}
