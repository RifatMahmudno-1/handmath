function isLargest(num1, num2) {
	let [int1, dec1] = num1.split('.')
	let [int2, dec2] = num2.split('.')
	if ((!int1 && !int2) || int1 === int2) {
		if (dec1 && !dec2) return true
		if (!dec1 && dec2) return false
		if (dec1 === dec2) return true
		for (let i = 0; i < dec1.length; i++) {
			let n1 = Number(dec1?.[i] || 0)
			let n2 = Number(dec2?.[i] || 0)
			if (n1 > n2) return true
			if (n1 < n2) return false
		}
		if (dec1.length > dec2.length) return true
		if (dec1.length < dec2.length) return false
		return true
	}
	if (int1 && !int2) return true
	if (!int1 && int2) return false
	if (int1.length > int2.length) return true
	if (int1.length < int2.length) return false
	for (let i = 0; i < int1.length; i++) {
		let n1 = Number(int1[i])
		let n2 = Number(int2[i])
		if (n1 > n2) return true
		if (n1 < n2) return false
	}
	return true
}

function removeZeroes(n = '0') {
	let neg = false
	if (n.startsWith('+')) n = n.slice(1)
	if (n.startsWith('-')) {
		neg = true
		n = n.slice(1)
	}
	if (n.replace(/\d*\.?\d*/, '')) throw { error: `Invalid Number was provided \`${n}\`` }
	n = n.replace(/^0+/, '')
	if (n.includes('.')) n = n.replace(/0+$/, '')
	if (n === '.') n = '0'
	if (n.startsWith('.')) n = '0' + n
	if (n.endsWith('.')) n = n.slice(0, n.length - 1)
	return (neg ? '-' : '') + (n ? n : '0')
}

function addition(num1, num2) {
	let isNeg = false

	if (num1.startsWith('-') && num2.startsWith('-')) {
		isNeg = true
		num1 = num1.slice(1)
		num2 = num2.slice(1)
	} else if (!num1.startsWith('-') && num2.startsWith('-')) {
		num2 = num2.slice(1)
		return subtraction(num1, num2)
	} else if (num1.startsWith('-') && !num2.startsWith('-')) {
		num1 = num1.slice(1)
		let temp = num1
		num1 = num2
		num2 = temp
		return subtraction(num1, num2)
	}

	if (num1 === '0') return (isNeg ? '-' : '') + num2
	if (num2 === '0') return (isNeg ? '-' : '') + num1

	let [int1, dec1] = num1.split('.')
	let [int2, dec2] = num2.split('.')
	let result = ''
	let carry = 0

	// calculate decimal
	let largestDec = Math.max(dec1?.length || 0, dec2?.length || 0)
	for (let i = largestDec - 1; i > -1; i--) {
		let res = Number(dec1?.[i] || 0) + Number(dec2?.[i] || 0) + carry
		carry = 0
		if (res <= 9) result = res + result
		else {
			result = res - 10 + result
			carry = 1
		}
	}
	if (result) result = '.' + result

	// calculate integer
	if (int1.length > int2.length) int2 = '0'.repeat(int1.length - int2.length) + int2
	else if (int1.length < int2.length) int1 = '0'.repeat(int2.length - int1.length) + int1
	let intLen = int1.length || int2.length
	for (let i = intLen - 1; i > -1; i--) {
		let res = Number(int1[i] || 0) + Number(int2[i] || 0) + carry
		carry = 0
		if (res <= 9) result = res + result
		else {
			result = res - 10 + result
			carry = 1
		}
	}
	if (carry) result = carry + result
	result = (isNeg ? '-' : '') + result
	return removeZeroes(result)
}

function subtraction(num1, num2) {
	let isNeg = false

	if (num1.startsWith('-') && num2.startsWith('-')) {
		let temp = num1
		num1 = num2
		num2 = temp
		num1 = num1.slice(1)
		num2 = num2.slice(1)
	} else if (!num1.startsWith('-') && num2.startsWith('-')) {
		num2 = num2.slice(1)
		return addition(num1, num2)
	} else if (num1.startsWith('-') && !num2.startsWith('-')) {
		num2 = '-' + num2
		return addition(num1, num2)
	}

	if (!isLargest(num1, num2)) {
		isNeg = true
		let temp = num1
		num1 = num2
		num2 = temp
	}

	if (num2 === '0') return (isNeg ? '-' : '') + num1

	let [int1, dec1] = num1.split('.')
	let [int2, dec2] = num2.split('.')
	let result = ''
	let carry = 0

	// calculate decimal
	let largestDec = Math.max(dec1?.length || 0, dec2?.length || 0)
	for (let i = largestDec - 1; i > -1; i--) {
		let n1 = Number(dec1?.[i] || 0)
		let n2 = Number(dec2?.[i] || 0) + carry
		carry = 0
		if (n1 >= n2) result = n1 - n2 + result
		else {
			n1 = n1 + 10
			result = n1 - n2 + result
			carry = 1
		}
	}
	if (result) result = '.' + result

	// calculate integer
	if (int1 && int2) {
		if (int1.length > int2.length) int2 = '0'.repeat(int1.length - int2.length) + int2
		else if (int1.length < int2.length) int1 = '0'.repeat(int2.length - int1.length) + int1
	}
	let intLen = int1.length || int2.length
	for (let i = intLen - 1; i > -1; i--) {
		let n1 = Number(int1[i] || 0)
		let n2 = Number(int2[i] || 0) + carry
		carry = 0
		if (n1 >= n2) result = n1 - n2 + result
		else {
			n1 = n1 + 10
			result = n1 - n2 + result
			carry = 1
		}
	}
	if (carry) result = carry + result
	result = (isNeg ? '-' : '') + result
	return removeZeroes(result)
}

function multiplication(num1, num2) {
	let totalNeg = 0
	let deciPos = 0
	if (num1.startsWith('-')) {
		num1 = num1.slice(1)
		totalNeg++
	}
	if (num2.startsWith('-')) {
		num2 = num2.slice(1)
		totalNeg++
	}

	if (num1 === '0' || num2 === '0') return '0'
	if (num1 === '1') return (totalNeg === 1 ? '-' : '') + num2
	if (num2 === '1') return (totalNeg === 1 ? '-' : '') + num1

	if (num1.includes('.')) {
		deciPos += num1.length - 1 - num1.indexOf('.')
		num1 = num1.replace('.', '')
	}
	if (num2.includes('.')) {
		deciPos += num2.length - 1 - num2.indexOf('.')
		num2 = num2.replace('.', '')
	}
	let result = ''
	let n2Ind = num2.length - 1
	for (let i = n2Ind; i > -1; i--) {
		let current = '0'.repeat(n2Ind - i)
		let carry = 0
		let n2 = Number(num2[i])
		let n1Ind = num1.length - 1
		for (let j = n1Ind; j > -1; j--) {
			let n1 = Number(num1[j])
			let res = (n1 * n2 + carry).toString()
			carry = 0
			if (res.length == 1) current = res + current
			else {
				current = res[1] + current
				carry = Number(res[0])
			}
		}
		if (carry) current = carry + current
		result = addition(current, result || '0')
	}
	if (result.length < deciPos) {
		result = '0'.repeat(deciPos - result.length) + result
	}
	result = result.slice(0, result.length - deciPos) + '.' + result.slice(result.length - deciPos, result.length)
	return (totalNeg === 1 ? '-' : '') + removeZeroes(result)
}

function division(num1, n2, count = 10) {
	if (isNaN(count)) throw { error: `Invalid decimal limit provided. \`${count}\`` }
	else count = Number(count)
	let totalNeg = 0
	let deciPos = 0
	if (num1.startsWith('-')) {
		num1 = num1.slice(1)
		totalNeg++
	}
	if (n2.startsWith('-')) {
		n2 = n2.slice(1)
		totalNeg++
	}

	if (n2 === '0') throw { error: "Can't divide by zero." }
	if (num1 === '0') return '0'
	if (n2 === '1') return (totalNeg === 1 ? '-' : '') + num1

	if (num1.includes('.')) {
		deciPos += num1.length - 1 - num1.indexOf('.')
		num1 = removeZeroes(num1.replace('.', ''))
	}
	if (n2.includes('.')) {
		deciPos -= n2.length - 1 - n2.indexOf('.')
		n2 = removeZeroes(n2.replace('.', ''))
	}
	//main calculation
	let result = ''
	let remain = ''
	let addedDeci = false
	let n2L = n2.length
	let selected = false
	let n2M = []
	for (let i = 1; i <= 10; i++) {
		n2M.push(multiplication(n2, i.toString()))
	}

	while (remain !== '0' || num1) {
		//select number to divide
		let n1 = (num => {
			if (num === '0') num = ''
			let AFN = false
			let AFZ = false
			let wasNum1 = num1 ? true : false

			if (!selected) {
				if (num1.length >= n2L) {
					num = num1.slice(0, n2L)
					num1 = num1.slice(n2L)
				} else {
					let need = n2L - num1.length
					num = num1 + '0'.repeat(need)
					result = '.' + '0'.repeat(need - 1)
					addedDeci = true
					num1 = ''
				}
				selected = true
			}
			while (!isLargest(num, n2)) {
				if (num1) {
					let n = num1[0]
					num1 = num1.slice(1)
					num += n
					if (n === '0') result += '0'
					else {
						if (!AFN) AFN = true
						else result += '0'
					}
				} else {
					if (wasNum1 && !num1) result += '0'
					if (!addedDeci) {
						addedDeci = true
						result += '.'
					}
					num += '0'
					if (!AFZ) AFZ = true
					else {
						result += '0'
					}
				}
				if (num === '0' && !num1) return null
				num = num.replace(/^0+/, '')
			}
			return num
		})(remain)
		if (n1 === null) break
		for (let i = 0; i <= 9; i++) {
			let got = n2M[i]
			if (got === n1) {
				remain = '0'
				result += (i + 1).toString()
				break
			}
			if (isLargest(got, n1)) {
				remain = subtraction(n1, n2M[i - 1])
				result += i.toString()
				break
			}
		}
		if (addedDeci) {
			let deciL = result.split('.')[1]?.length || 0
			if (deciL >= count) break
		}
	}

	if (deciPos) {
		let currPos = result.split('.')[1]?.length || 0
		result = result.replace('.', '')
		let newPos = deciPos + currPos
		if (newPos > 0) {
			if (result.length >= newPos) result = result.slice(0, newPos) + '.' + result.slice(newPos, result.length)
			else {
				result = '.' + '0'.repeat(newPos - result.length) + result
			}
		} else result += '0'.repeat(Math.abs(newPos))
	}
	return (totalNeg === 1 ? '-' : '') + removeZeroes(result)
}

class HandMath {
	constructor(num1) {
		this.result = removeZeroes(num1)
	}
	add(num2) {
		num2 = removeZeroes(num2)
		this.result = addition(this.result, num2)
		return this
	}
	sub(num2) {
		num2 = removeZeroes(num2)
		this.result = subtraction(this.result, num2)
		return this
	}
	multiply(num2) {
		num2 = removeZeroes(num2)
		this.result = multiplication(this.result, num2)
		return this
	}
	divide(num2, count) {
		num2 = removeZeroes(num2)
		this.result = division(this.result, num2, count)
		return this
	}
}

export default HandMath
export { HandMath }
