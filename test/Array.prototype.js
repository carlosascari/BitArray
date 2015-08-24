process.stdout.write("\u001b[2J\u001b[0;0H")
var assert = require('assert')
var BitArray = require('../BitArray.js')

suite('Array-like methods ES6')

test.skip('#from', function(){})

test.skip('#copyWithin', function(){
	var bitArrayA = BitArray.fromArray([1, 0, 0, 5])
	bitArrayA.copyWithin(0, 3)
	assert(bitArrayA.join('') === '')
})

test.skip('#entries', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.entries()
	assert(bitArrayA.join('') === '')
})

test.skip('#fill', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.fill()
	assert(bitArrayA.join('') === '')
})

test.skip('#find', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.find()
	assert(bitArrayA.join('') === '')
})

test.skip('#findIndex', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.findIndex()
	assert(bitArrayA.join('') === '')
})

test.skip('#includes', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.includes()
	assert(bitArrayA.join('') === '')
})

test.skip('#keys', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.keys()
	assert(bitArrayA.join('') === '')
})

test.skip('#observe', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.observe()
	assert(bitArrayA.join('') === '')
})

test.skip('#of', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.of()
	assert(bitArrayA.join('') === '')
})

test.skip('#toSource', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.toSource()
	assert(bitArrayA.join('') === '')
})

test.skip('#values', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.values()
	assert(bitArrayA.join('') === '')
})

test.skip('#unobserve', function(){
	var bitArrayA = new BitArray()
	// bitArrayA.unobserve()
	assert(bitArrayA.join('') === '')
})

suite('Array-like methods ES5')

test('#concat', function() {
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1)
	var bitArrayB = bitArrayA.concat(0,0,0)
	assert(bitArrayB.join('') === '111000')
})

test('#every', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,1,1,1)
	assert(bitArrayA.every(function(bit, index, bitarray){
		return bit
	}) === true)
	bitArrayA.length = 0 
	bitArrayA.push(1,1,0,1,1,1)
	assert(bitArrayA.every(function(bit, index, bitarray){
		return bit
	}) === false)
})

test('#filter', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(0,0,1,0,1)
	bitArrayA = bitArrayA.filter(function(bit, index, bitarray){
		return bit === 1
	})
	assert(bitArrayA.join('') === '11')
})

test('#forEach', function(){
	var bitArrayA = new BitArray()
	var bitArrayB = new BitArray()
	bitArrayA.push(1,1,1)
	bitArrayB.push(0,0,0)
	bitArrayA.forEach(function(bit, index, bitarray){
		bitArrayB.push(bit)
	})
	assert(bitArrayB.join('') === '000111')
})

test('#indexOf', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,0,1,0)
	var result = bitArrayA.indexOf(0)
	assert(result === 1)
	bitArrayA.push('Hello world')
	var result = bitArrayA.indexOf('Hello')
	assert(result === 4)
})

test('#isArray', function(){
	var bitArrayA = new BitArray()
	
	assert(BitArray.isArray([]) === true)
})

test('#join', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,0,0,0,0,1)
	assert(bitArrayA.join('') === '100001')
})

test('#lastIndexOf', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,0,1,0)
	var result = bitArrayA.lastIndexOf(0)
	assert(result === 3)
	bitArrayA.push('Hello world')
	var result = bitArrayA.lastIndexOf('Hello')
	assert(result === 4)
})

test('#map', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,1)
	bitArrayB = bitArrayA.map(function(bit, index, bitarray){
		if (index === 0) return 0 
		return bit
	})
	assert(bitArrayB.join('') === '0111')
})

test('#pop', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,0,1,0,1)
	bitArrayA.pop()
	bitArrayA.pop()
	assert(bitArrayA.join('') === '101')
})

test('#push', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,0,0,0)	
	assert(bitArrayA.join('') === '111000')
	bitArrayA.push(1,1,1,1)
	assert(bitArrayA.join('') === '1110001111')
	var bitArrayB = new BitArray()
	bitArrayB.push('A')
	assert(bitArrayB.join('') === '0000000001000001')
	var bitArrayC = new BitArray('AA')
	bitArrayC.push('A')
	assert(bitArrayC.join('') === '000000000100000100000000010000010000000001000001')
	var buffer = new BitArray()
	buffer.push(1,0,1,1,1, 'Hello World', 255, 0xFFFF, 0, 1, 0, 1, 0, 1, 0)
	assert(buffer.join('') === '10111000000000100100000000000011001010000000001101100000000000110110000000000011011110000000000100000000000000101011100000000011011110000000001110010000000000110110000000000011001000101010')
})

test('#reduce', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,0,0,0)
	var result = bitArrayA.reduce(function(prevBit, currBit, index, bitarray){
		return prevBit + currBit
	})
	assert(result === 2)
})

test('#reduceRight', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,0,0,0)
	var result = bitArrayA.reduceRight(function(prevBit, currBit, index, bitarray){
		return prevBit + currBit
	})
	assert(result === 2)
})

test('#reverse', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,0,0)
	bitArrayA.reverse()
	assert(bitArrayA.join('') === '0011')
})

test('#shift', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,0,0,0)	
	bitArrayA.shift()
	assert(bitArrayA.join('') === '11000')
	bitArrayA.shift()
	bitArrayA.shift()
	assert(bitArrayA.join('') === '000')
})

test('#slice', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(0,0,1,1,1,0,0)
	bitArrayB = bitArrayA.slice(2, 5)
	assert(bitArrayB.join('') === '111')
	assert(BitArray.isBitArray(bitArrayB) === true)
})

test('#some', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,1,1)
	var result = bitArrayA.some(function(bit, index, bitarray){
		return bit === 0
	})
	assert(result === false)
	var result = bitArrayA.some(function(bit, index, bitarray){
		return bit === 1
	})
	assert(result === true)
})

test('#sort', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,0,1,0,1,1,1,1,0)
	bitArrayA.sort(function(bitA, bitB){
		return bitA - bitB
	})
	assert(bitArrayA.join('') === '000111111')
})

test('#splice', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(0,1,1,1,0,0,0,0,1)
	bitArrayB = bitArrayA.splice(1, 3)
	assert(bitArrayA.join('') === '000001')
	assert(bitArrayB.join('') === '111')
})

test('#toLocaleString', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1,0,0)
	var result = bitArrayA.toLocaleString()
	assert(result === bitArrayA.__slice().toLocaleString())
})

test('#toString', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(0,0,1,0)
	var result = bitArrayA.toString()
	assert(result === '0,0,1,0')
})

test('#unshift', function(){
	var bitArrayA = new BitArray()
	bitArrayA.push(1,1,1)
	bitArrayA.unshift(0, 0)
	assert(bitArrayA.join('') === '00111')
})