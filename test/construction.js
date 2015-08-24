var assert = require('assert')
var BitArray = require('../BitArray.js')

suite('BitArray contruction')

test('BitArray()', function() {
	var ba = BitArray()
	assert(ba.constructor === BitArray)
	assert(ba instanceof Array)
})

test('new BitArray()', function() {
	var ba = new BitArray()
	assert(ba.constructor === BitArray)
	assert(ba instanceof Array)
})