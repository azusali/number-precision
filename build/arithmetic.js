"use strict";
/**
 * 判断num是否为一个整数
 *
 * @param {number} num
 * @returns {boolean}
 */
function isInteger(num) {
    return Math.floor(num) === num;
}
/**
 * 将一个浮点数转换为整数，返回整数和倍数
 *
 * @param {number} floatNum
 * @returns {{ times: number, num: number }}
 */
function toInteger(floatNum) {
    var ret = { times: 1, num: 0 };
    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
    }
    var strfi = floatNum.toString();
    var dotPos = strfi.indexOf('.');
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = floatNum > 0 ? floatNum * times + 0.5 : floatNum * times;
    intNum = parseInt(intNum.toString(), 10);
    ret.times = times;
    ret.num = intNum;
    return ret;
}
/**
 * 实现四则运算。将小数放大为整数相乘。
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {string} type
 * @returns {number}
 */
function operation(firstNum, secondNum, type) {
    var firstObj = toInteger(firstNum);
    var secondObj = toInteger(secondNum);
    var num1 = firstObj.num, times1 = firstObj.times;
    var num2 = secondObj.num, times2 = secondObj.times;
    var maxTimes = times1 > times2 ? times1 : times2;
    var result = 0;
    switch (type) {
        case 'add':
            if (times1 === times2) {
                result = num1 + num2;
            }
            else if (times1 > times2) {
                result = num1 + num2 * (times1 / times2);
            }
            else {
                result = num1 * (times2 / times1) + num2;
            }
            break;
        case 'subtract':
            if (times1 === times2) {
                result = num1 - num2;
            }
            else if (times1 > times2) {
                result = num1 - num2 * (times1 / times2);
            }
            else {
                result = num1 * (times2 / times1) - num2;
            }
            break;
        case 'multiply':
            result = (num1 * num2) / (times1 * times2);
            break;
        case 'divide':
            result = (num1 / num2) * times2 / times1;
            break;
    }
    return type === 'add' || type === 'subtract' ? (result / maxTimes) : result;
}
/**
 * 加法。支持多个参数进行相加
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function add(firstNum, secondNum) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return add.apply(void 0, [operation(firstNum, secondNum, 'add'), others[0]].concat(others.splice(1)));
    }
    return operation(firstNum, secondNum, 'add');
}
/**
 * 减法，支持多个参数相减
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function subtract(firstNum, secondNum) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return subtract.apply(void 0, [operation(firstNum, secondNum, 'subtract'), others[0]].concat(others.slice(1)));
    }
    return operation(firstNum, secondNum, 'subtract');
}
/**
 * 乘法，支持多个参数相乘
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function multiply(firstNum, secondNum) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return multiply.apply(void 0, [operation(firstNum, secondNum, 'multiply'), others[0]].concat(others.slice(1)));
    }
    return operation(firstNum, secondNum, 'multiply');
}
/**
 * 除法，支持多个参数相除
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function divide(firstNum, secondNum) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return divide.apply(void 0, [operation(firstNum, secondNum, 'divide'), others[0]].concat(others.slice(1)));
    }
    return operation(firstNum, secondNum, 'divide');
}
/**
 * 四舍五入
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function round(num, percision) {
    if (percision === void 0) { percision = 2; }
    var base = Math.pow(10, percision);
    return divide(Math.round(multiply(num, base)), base);
}
/**
 * 向上取整
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function ceil(num, percision) {
    if (percision === void 0) { percision = 2; }
    var base = Math.pow(10, percision);
    return divide(Math.ceil(multiply(num, base)), base);
}
/**
 * 向下取整
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function floor(num, percision) {
    if (percision === void 0) { percision = 2; }
    var base = Math.pow(10, percision);
    return divide(Math.floor(multiply(num, base)), base);
}
//# sourceMappingURL=arithmetic.js.map