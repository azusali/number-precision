
/**
 * 判断num是否为一个整数
 *
 * @param {number} num
 * @returns {boolean}
 */
function isInteger (num: number): boolean {
  return Math.floor(num) === num
}

/**
 * 将一个浮点数转换为整数，返回整数和倍数
 *
 * @param {number} floatNum
 * @returns {{ times: number, num: number }}
 */
function toInteger (floatNum: number): { times: number, num: number } {
  let ret = { times: 1, num: 0 }

  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }

  let strfi = floatNum.toString()
  let dotPos = strfi.indexOf('.')
  let len = strfi.substr(dotPos + 1).length
  let times = Math.pow(10, len)
  let intNum = floatNum > 0 ? floatNum * times + 0.5 : floatNum * times
  intNum = parseInt(intNum.toString(), 10)
  
  ret.times = times
  ret.num = intNum
  return ret
}

/**
 * 实现四则运算。将小数放大为整数相乘。
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {string} type
 * @returns {number}
 */
function operation (firstNum: number, secondNum: number, type: string): number {
  let firstObj = toInteger(firstNum)
  let secondObj = toInteger(secondNum)

  let { num: num1, times: times1 } = firstObj
  let { num: num2, times: times2 } = secondObj

  let maxTimes = times1 > times2 ? times1 : times2

  let result = null

  switch (type) {
    case 'add':
      if (times1 === times2) {
        result = num1 + num2
      } else if (times1 > times2) {
        result = num1 + num2 * (times1 / times2)
      } else {
        result = num1 * (times2 / times1) + num2
      }
      break
    
    case 'subtract':
      if (times1 === times2) {
        result = num1 - num2
      } else if (times1 > times2) {
        result = num1 - num2 * (times1 / times2)
      } else {
        result = num1 * (times2 / times1) - num2
      }
      break
    
    case 'multiply':
      result = (num1 * num2) / (times1 * times2)
      break
    
    case 'divide':
      result = (num1 / num2) * times2 / times1
      break
  }

  return ['add', 'subtract'].includes(type) ? (result / maxTimes) : result
}

/**
 * 加法。支持多个参数进行相加
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function add (firstNum: number, secondNum: number, ...others: number[]): number {
  if (others.length > 0) {
    return add(operation(firstNum, secondNum, 'add'), others[0], ...others.splice(1))
  }

  return operation(firstNum, secondNum, 'add')
}

/**
 * 减法，支持多个参数相减
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function subtract (firstNum: number, secondNum: number, ...others: number[]): number {
  if (others.length > 0) {
    return subtract(operation(firstNum, secondNum, 'subtract'), others[0], ...others.slice(1))
  }

  return operation(firstNum, secondNum, 'subtract')
}

/**
 * 乘法，支持多个参数相乘
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function multiply (firstNum: number, secondNum: number, ...others: number[]): number {
  if (others.length > 0) {
    return multiply(operation(firstNum, secondNum, 'multiply'), others[0], ...others.slice(1))
  }

  return operation(firstNum, secondNum, 'multiply')
}

/**
 * 除法，支持多个参数相除
 *
 * @param {number} firstNum
 * @param {number} secondNum
 * @param {...number[]} others 除前两位外的所有参数
 * @returns {number}
 */
function divide (firstNum: number, secondNum: number, ...others: number[]): number {
  if (others.length > 0) {
    return divide(operation(firstNum, secondNum, 'divide'), others[0], ...others.slice(1))
  }

  return operation(firstNum, secondNum, 'divide')
}

/**
 * 四舍五入
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function round (num: number, percision = 2): number {
  const base = Math.pow(10, percision)
  return divide(Math.round(multiply(num, base)), base)
}

/**
 * 向上取整
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function ceil (num: number, percision = 2): number {
  const base = Math.pow(10, percision)
  return divide(Math.ceil(multiply(num, base)), base)
}

/**
 * 向下取整
 *
 * @param {number} num
 * @param {number} [percision=2]
 * @returns {number}
 */
function floor (num: number, percision = 2): number {
  const base = Math.pow(10, percision)
  return divide(Math.floor(multiply(num, base)), base)
}
