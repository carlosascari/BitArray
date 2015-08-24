var assert = require('assert')
var BitArray = require('../BitArray.js')

suite('Static methods')

test('BitArray.isBitArray', function() {
	var bitarray = BitArray()
	assert(BitArray.isBitArray(bitarray) === true)
	assert(BitArray.isBitArray([]) === false)
})

test('BitArray.fromNumber', function() {
	var bitarray = BitArray.fromNumber(1)
	assert(bitarray.join('') === '0000000000000000000000000000000000000000000000000000000000000001')
	assert(BitArray.isBitArray(bitarray) === true)
})

test('BitArray.fromString', function() {
	var bitarray = BitArray.fromString('A')
	assert(bitarray.join('') === '0000000001000001')
	assert(BitArray.isBitArray(bitarray) === true)
})

test('BitArray.fromArray', function() {
	var bitarray = BitArray.fromArray([1,0,0,1])
	assert(bitarray.join('') === '1001')
	assert(BitArray.isBitArray(bitarray) === true)
})

test('BitArray.fromMixedArray', function() {
	var bitarray = BitArray.fromMixedArray([1, 1, true, 'A'])
	assert(bitarray.join('') === '1110000000001000001')
	assert(BitArray.isBitArray(bitarray) === true)
})

test('BitArray.fromDate', function() {
	var bitarray = BitArray.fromDate(new Date('Aug 1, 2015'))
	assert(bitarray.join('') === '0000000000000000000000010100111011100111101000011000100010000000')
	assert(BitArray.isBitArray(bitarray) === true)
})

test('BitArray.fromBoolean', function() {
	var bitarray = BitArray.fromBoolean(true, false, true)
	assert(bitarray.join('') === '101')
	assert(BitArray.isBitArray(bitarray) === true)
})
