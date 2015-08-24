/**
* Provides the BitArray type
*
* A seamless implementation of a BitArray for Javascript
*
* @module BitArray
*/
var BitArray = (function (Object, Array, Date, module) {
/**
* Array methods what will be punched out
*
* Includes ES6 methods as they are not implemented (gotta shim it)
*
* @property ARRAY_METHODS
* @type Array
* @private
* @final
*/
var ARRAY_METHODS = [
	'concat', 'copyWithin', 'entries', 'every', 'fill', 'filter', 'find', 'findIndex', 
	'forEach', 'includes', 'indexOf', 'isArray', 'join', 'keys', 'lastIndexOf', 'map', 
	'observe', 'of', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 
	'some', 'sort', 'splice', 'toLocaleString', 'toSource', 'toString', 'unshift', 'values'
]

/**
* Potfix specifiers to specify size and type of data what will be worked with array-like
* methods
* @property SPECIFIERS
* @type Array
* @private
* @final
*/
var SPECIFIERS = {
	'Bit':           {bitsize: 1, 	type: 'number', alias: ['Bits', 'BIT']},
	'Char':          {bitsize: 16, 	type: 'string', alias: ['Character', 'Letter', 'CHAR']},
	'String':        {bitsize: 16, 	type: 'string', alias: ['Str', 'STR']},
	'Date':       	 {bitsize: 64, 	type: 'number', alias: ['Timestamp']},
	'Number':        {bitsize: 64, 	type: 'number', alias: ['Num', 'Numbers', 'UInt64', 'Qword', 'QWORD' ]},
	'UInt32':        {bitsize: 32, 	type: 'number', alias: ['Dword', 'DWORD']},
	'UInt16':        {bitsize: 16, 	type: 'number', alias: ['Word', 'WORD']},
	'UInt8':         {bitsize: 8, 	type: 'number', alias: ['Byte', 'BYTE']},
	'Array':         {bitsize: 1, 	type: 'object', alias: []},
	'BitArray':      {bitsize: 1, 	type: 'object', alias: []},
}

/**
* Used to resolve a value when using Array-like methods where
* input type can be any one listed in SPECIFIERS array.
* 
* returns `false` if type could not be resolved
* returns `Error` if type is explicit and input value is not accepted
* returns `Array` of 0 and 1s if value could be parsed into bits
* 
* @method resolveValue
* @param value {Mixed}
* @param specifier {String} use a SPECIFIERS entry to force resolution of a specific type
* @return Array|Boolean|Error
* @private
*/
function resolveValue(value, specifier)
{
	var type = typeof value
	var spec_def 
	if (spec_def = SPECIFIERS[specifier])
	{

	}
	else
	{
		if (type === 'number')
		{
			if (value === 0 || value === 1)
			{
				return [+value]
			}
			else
			{
				return BitArray.fromNumber().slice()
			}
		}
		else if (type === 'boolean')
		{
			return [+value]
		}
		else if (type === 'string')
		{
			return BitArray.fromString(value).slice()
		}
		else if (type === 'object')
		{
			if (value instanceof Array)
			{
				if (BitArray.isBitArray(value))
				{
					return value.splice()
				}
				else
				{
					return BitArray.fromArray(value).slice()
				}
			}
			else if (value instanceof Date)
			{
				return BitArray.fromDate(value).slice()
			}
		}
		else
		{
			return false
		}
	}
}

// -------------------------------------------------------------------------------------------------

/**
* @class BitArray
*
* @constructor
* @param [values] {Mixed} ...
*/
function BitArray()
{
	/**
	* Internal Array object
	* @property ARRAY
	* @type Array
	* @private
	*/	
	var INTERNAL_ARRAY = new Array()
	INTERNAL_ARRAY.constructor = BitArray // Replace contructor

	/**
	* Backup Array methods
	*/
	for (var j = ARRAY_METHODS.length - 1; j >= 0; j--) {
		var methodName = ARRAY_METHODS[j]
		if (typeof INTERNAL_ARRAY[methodName] === 'function')
		{
			Object.defineProperty(INTERNAL_ARRAY, '__' + methodName, {
				enumerable: false,
				value: INTERNAL_ARRAY[methodName]
			})
		}
		else
		{
			// shim it ... Todo: ES6 support
		}
	}

	// ---------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------------------
	// Array like methods
 
	/**
	* The push() method adds one or more bits to the end of the bitarray
	* and returns the new length of the array.
	*
	* @method push
	* @param element {Mixed} ...
	* @return Number
	*/
	INTERNAL_ARRAY.push = function()
	{
		var argc = arguments.length
		var argv = Array.prototype.slice.call(arguments)
		var bits = []
		for (var k = 0; k < argc; k++) {
			var arg = argv[k]
			var result = resolveValue(arg)
			if (result)
			{
				if (Array.isArray(result))
				{
					bits.push.apply(bits, result)
				}
				else
				{
					throw result
				}
			}
		}
		return this.__push.apply(this,bits)
	}
	
	/**
	* The shift() method removes the first element from a bitarray and returns 
	* that bit. This method changes the size of the bitarray.
	*
	* @method shift
	* @return Number
	*/
	INTERNAL_ARRAY.shift = function()
	{
		return this.__shift() | 0
	}

	/**
	* The unshift() method adds one or more elements to the 
	* beginning of a bitarray and returns the new length of the bitarray.
	*
	* @method unshift
	* @param element {Mixed} ...
	* @return Number
	*/
	INTERNAL_ARRAY.unshift = function()
	{
		var argc = arguments.length
		var argv = Array.prototype.slice.call(arguments)
		var bits = []
		for (var k = 0; k < argc; k++) {
			var arg = argv[k]
			var result = resolveValue(arg)
			if (result)
			{
				if (Array.isArray(result))
				{
					bits.push.apply(bits, result)
				}
				else
				{
					throw result
				}
			}
		}
		return this.__unshift.apply(this, bits)
	}

	/**
	* The concat() method returns a new bitarray comprised of the bitarray on 
	* which it is called joined with the bitarray(s) and/or value(s) provided as arguments.
	*
	* @method concat
	* @param value {Mixed} ...
	* @return BitArray
	*/
	INTERNAL_ARRAY.concat = function()
	{
		var argc = arguments.length
		var argv = Array.prototype.slice.call(arguments)
		var bits = this.slice()
		for (var k = 0; k < argc; k++) {
			var arg = argv[k]
			var result = resolveValue(arg)
			if (result)
			{
				if (Array.isArray(result))
				{
					bits.push.apply(bits, result)
				}
				else
				{
					throw result
				}
			}
		}
		return BitArray.fromArray(bits)
	}

	/**
	* The every() method tests whether all elements in the bitarray pass the test 
	* implemented by the provided function.
	*
	* @method every
	* @param callback {Function}
	* @param [thisArg] {Object}
	* @return Boolean
	*/
	INTERNAL_ARRAY.every = function()
	{
		return this.__every.apply(this, arguments)
	}

	/**
	* @method filter
	* @return BitArray
	*/
	INTERNAL_ARRAY.filter = function()
	{
		return BitArray.fromArray(this.__filter.apply(this, arguments))
	}

	/**
	* @method forEach
	*/
	INTERNAL_ARRAY.forEach = function()
	{
		this.__forEach.apply(this, arguments)
	}

	/**
	* @method indexOf
	* @return Number
	*/
	INTERNAL_ARRAY.indexOf = function()
	{
		var of = resolveValue(arguments[0])
		if (of)
		{
			if (Array.isArray(of))
			{
				var binary = of.join('')
				var tmp = this.join('')
				return tmp.indexOf(binary)
			}
			else
			{
				throw of
			}
		}
		else
		{
			return -1
		}
	}

	/**
	* @method lastIndexOf
	* @return Number
	*/
	INTERNAL_ARRAY.lastIndexOf = function()
	{
		var of = resolveValue(arguments[0])
		if (of)
		{
			if (Array.isArray(of))
			{
				var binary = of.join('')
				var tmp = this.join('')
				return tmp.lastIndexOf(binary)
			}
			else
			{
				throw of
			}
		}
		else
		{
			return -1
		}
	}

	/**
	* @method map
	* @return BitArray
	*/
	INTERNAL_ARRAY.map = function()
	{
		var res = this.__map.apply(this, arguments)
		return BitArray.fromArray(res)
	}

	/**
	* @method pop
	* @return Number
	*/
	INTERNAL_ARRAY.pop = function()
	{
		var res = this.__pop.apply(this, arguments)
		return res|0
	}

	/**
	* @method reduce
	* @return Number
	*/
	INTERNAL_ARRAY.reduce = function()
	{
		return this.__reduce.apply(this, arguments)
	}

	/**
	* @method reduceRight
	* @return Number
	*/
	INTERNAL_ARRAY.reduceRight = function()
	{
		return this.__reduceRight.apply(this, arguments)
	}

	/**
	* @method reverse
	* @return BitArray
	*/
	INTERNAL_ARRAY.reverse = function()
	{
		this.__reverse.apply(this, arguments)
		return this
	}

	/**
	* The slice() method returns a shallow copy of a portion of a bitarray 
	* into a new bitarray object.
	*
	* @method slice
	* @param [begin] {Number}
	* @param [end] {Number}
	* @return BitArray
	*/
	INTERNAL_ARRAY.slice = function()
	{
		return BitArray.fromArray(this.__slice.apply(this, arguments))
	}

	/**
	* Test whether some bits in the bitarray passes the callback
	* function provided.
	*
	* @method some
	* @param callback {Function}
	* @param [thisArg] {Object}
	* @return Boolean
	*/
	INTERNAL_ARRAY.some = function()
	{
		return this.__some.apply(this, arguments)
	}

	/**
	* @method sort
	* @return BitArray
	*/
	INTERNAL_ARRAY.sort = function()
	{
		this.__sort.apply(this, arguments)
		return this
	}

	/**
	* @method splice
	* @return BitArray
	*/
	INTERNAL_ARRAY.splice = function()
	{
		return BitArray.fromArray(this.__splice.apply(this, arguments))
	}

	/**
	* @method toLocaleString
	* @return String
	*/
	INTERNAL_ARRAY.toLocaleString = function()
	{
		return this.__toLocaleString.apply(this, arguments)
	}

	/**
	* @method toString
	* @return String
	*/
	INTERNAL_ARRAY.toString = function()
	{
		return this.__toString.apply(this, arguments)
	}

	// Apply Constructor arguments
	INTERNAL_ARRAY.push.apply(INTERNAL_ARRAY, arguments)

	return INTERNAL_ARRAY
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// Static Methods

/**
* Test if object is a native Array
*
* @method isArray
* @param o {Object}
* @return Boolean
* @static
*/
BitArray.isArray = function(o)
{
	return Array.isArray.apply(Array,arguments)
}

/**
* Test if object is a BitArray
*
* @method isBitArray
* @param o {Object}
* @return Boolean
* @static
*/
BitArray.isBitArray = function(o)
{
	return o.constructor === BitArray
}

/**
* Convert Number into BitArray with 64 bits
*
* @method fromNumber
* @param n {Number} ...
* @return BitArray
* @static
*/
BitArray.fromNumber = function(n)
{
	var argv = Array.prototype.slice.call(arguments)
	var argc = arguments.length
	var bitarray = []
	for (var k = 0; k < argc; k++) 
	{
		n = +argv[k]
		if (typeof n !== 'number' || n > 0xFFFFFFFFFFFFFBFF)
		{
			throw new Error('invalid argument, NaN or larger than 18446744073709550000')
		}
		var bits = n.toString(2)
		var mag = bits.length - 1
		var dif = 64 - mag
		if (dif)
		{
			bits = Array(dif).join('0') + bits
		}
		bitarray.push.apply(bitarray, bits.split(''))
	}

	return BitArray.fromArray(bitarray)
}

/**
* Convert String into BitArray, each character takes up 16 bits
*
* @method fromString
* @param s {String}
* @return BitArray
* @static
*/
BitArray.fromString = function(s)
{
	if (typeof s !== 'string') throw new Error('argument must be a string')
	var len = s.length 
	var bitarray = []
	for (var n = 0; n < len; n++) 
	{
		var character = s[n]
		var code = character.charCodeAt(0) // 16 bits
		var bits = code.toString(2)
		var mag = bits.length -1
		var dif = 16 - mag
		if (dif)
		{
			bits = Array(dif).join('0') + bits
		}
		bitarray.push.apply(bitarray, bits.split(''))
	}
	for (var k = bitarray.length - 1; k >= 0; k--) 
	{
		bitarray[k] = (+bitarray[k])|0
	}
	return BitArray.fromArray(bitarray)
}

/**
* Convert an Array of 1s and 0s into a BitArray
*
* @method fromArray
* @param a {Array}
* @return BitArray
* @static
*/
BitArray.fromArray = function(a)
{
	for (var i = a.length - 1; i >= 0; i--) a[i] = a[i] | 0;
	var ret = new BitArray()
	ret.push.apply(ret, a)
	return ret
}

/**
* Convert an Array of any value and depending on value types
* a BitArray with n number of bits is returned
*
* @method fromMixedArray
* @param a {Array} ...
* @return BitArray
* @static
*/
BitArray.fromMixedArray = function(a)
{
	var argc = arguments.length
	var argv = Array.prototype.slice.call(arguments)
	var bitarray = []
	for (var i = 0; i < argc; i++) 
	{
		var marray = argv[i]
		if (!Array.isArray(marray))
		{
			throw new Error('argument[' + i + '] is must be an array')
		}
		else
		{
			var mlen = marray.length 
			for (var k = 0; k < mlen; k++) 
			{
				var bits = resolveValue(marray[k])
				if (bits)
				{
					if (Array.isArray(bits))
					{
						bitarray.push.apply(bitarray, bits)
					}
					else
					{
						throw bits
					}
				}
			}
		}
	}
	return BitArray.fromArray(bitarray)
}

/**
* Convert a Date object into a BitArray. 64  bits
*
* @method fromDate
* @param d {Date}
* @return BitArray
* @static
*/
BitArray.fromDate = function(d)
{
	var n = +d
	if (!n) throw new Error('argument must be a date object')
	return BitArray.fromNumber(n)
}

/**
* Convert a Boolean into a BitArray. 1  bit
*
* @method fromBoolean
* @param b {Boolean} ...
* @return BitArray
* @static
*/
BitArray.fromBoolean = function(b)
{
	var argv = Array.prototype.slice.call(arguments)
	return BitArray.fromArray(argv)
}

// -------------------------------------------------------------------------------------------------

if (module)
{
	module.exports = BitArray
}
else
{
	return BitArray	
}
})(Object, Array, Date, (module && module.exports) ? module : null);
