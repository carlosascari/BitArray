# Bit Array - A Javascript Data Type extension

A **BitArray** works like a regular **Array** object. In fact, anything you can do with [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
`index.Of` `lastIndexOf` `slice` `splice` `join` `reverse` `filter` `sort` *etc*
you can do with a BitArray instance. Keep in mind that the elements will always be a numeric `0` or a `1`.

As it's still **impossible** to inherit from the **Array** object, to take advantage of the bracket syntax i.e. `customArray[index]`, as explained in the article by [perfectionkills](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array):

	
> Subclassing an array in Javascript has never been a trivial task. 
> At least for a certain meaning of “subclassing an array”. Curiously, 
> new edition of the language — ECMAScript 5 — still does not allow 
> to fully subclass an array.
	

[Direct property injection](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_direct_property_injection) is used, as it is the only reliable choice.

## Intallation

#### Browser 

```html
<script src="pathto/bitarray.js"></script>
```

## Usage

*All ES5 Array methods are supported*

```js
var buffer = new BitArray(1,1,0,0)
console.log(buffer[0], buffer[1], buffer[2], buffer[3]) // 1 1 0 0

buffer.push(1, 0, 1, 0, 1)
console.log(buffer) // [1,1,0,0,1,0,1,0,1]

buffer.push(1, 1, 1, 1, 1)
console.log(buffer) // [1,1,0,0,1,0,1,0,1,1,1,1,1,1]

buffer.length = 0 // []

buffer.push('A') // 65. characters are stored in 16 bits
console.log(buffer) // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1]

buffer.pop()
buffer.pop()
console.log(buffer) // [0,0,0,0,0,0,0,0,0,1,0,0,0,0]

buffer.unshift(1,1,1)
console.log(buffer) // [1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0]

// Lets go nuts
buffer.length = 0 // []

buffer.push(1,0,1,1,1, 'Hello World', 255, 0xFFFF, 0, true, false, 1, 0, 1, 0)
console.log(buffer) // See **Accepted Types**
			// [1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
			// 0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,
			// 0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
			// 0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,
			// 0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,
			// 0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,1,0]

```

**NOTE**
Javasciript uses 16 bits for a single character from the most common characters defined by the UCS-2 standard a subset of UTF-16. All characters are treated as 16 bits. [reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#Getting_it_to_work_with_higher_values)

## Accepted Types

The **Array** equivalant methods defined by the **BitArray**, will resolve values in the following order:

	typeof value === 'string' 
	Treat each character as its 16 bit character code

	typeof value === 'boolean'
	Treat each value as either a 1 or a 0

	typeof value === 'number'
		If number is a 0 or 1, it is treated as a single bit.
		else
			The number is treated as a ~64 bit number...
			almost 64bits, the number has to be less than 0xFFFFFFFFFFFFFBFF
			(18446744073709550000. instead of 18446744073709552000.)

#### When in doubt, be specific:

**NOTICE** Specifiers **have not been implemented** yet, they are in the kitchen, on their way out. Specifiers will become a postfix to common Array-equivalent methods, this is simply to enforce a particular type of input, since a **Number**, for example can be a single bit or 64 bits depending on it's value, this may cause conflift, hence the specifiers.

```
buffer.pushBit(1)         	 // 1 bit
buffer.pushBit(1, 0, 1)      // 3 bits
buffer.pushChar('A')         // 16 bits
buffer.pushString('Awesome') // (16 * `Awesome`.length) bits
buffer.pushNumber(1)         // 64 bits
buffer.pushUInt32(0xFFFF44)  // 32 bits
```
All The **Array** equivalant methods *will* have **more specific** counterparts where the type is explicit, e.g.

`unshiftBit` `popBit` `spliceBit` `joinNumber` `forEachBit` `sliceNumber` `join32UInt`  `indexOfString` `sliceBit` `spliceString` `joinChar` `findBit`

Everything is treated as bits internally, so when using `lastIndexOfString` for example, the string being searched for will be converted to binary, and a binary search will be done. This is true for all **iterating** methods: `indexOfChar` `forEachString` `findChar` *etc*

The idea is to iterate the internal bits in a BitArray while treating them as bytes, words and even strings, depending on the postfix applied. 

## Specific Methods

Use any postfix on a method if you want to work on the internal bits as specific bit structure

	BitArray.<method>[<postfix>]()

| postfix  | bit size         |  alias                      | accepted types
|----------|------------------|-----------------------------|------------------------------------|
| Bit      | 1                | Bits                        | *number*
| Char     | 16               | Character                   | *string* (only first character)
| String   | length * 16      | Str                         | *string*
| Date     | 64               |                             | **instanceof** `Date`
| Number   | 64               | 64Uint Qword QWORD          | *number* (0 - 18446744073709550000) 
| UInt32   | 32               | Dword DWORD                 | *number* (0 - 4294967295)
| UInt16   | 16               | Word WORD                   | *number* (0 - 65535)
| UInt8    | 8                | Byte BYTE                   | *number* (0 - 255)
| Array    | length * 1       |                             | **instanceof** `Array` *each element is a bit*
| BitArray | length * 1       |                             | *BitArray.isBitArray()*


**Note** When only a *number* is an accepted type, it can be a Numeric *string* as well as a *boolean*, as it will be casted into a number.
When using a specifier, if the argument is not a supported type, it will throw

## Static Methods

BitArray has the following static methods that allow you to create a new BitArray from different  types:

*Boolean*   **BitArray.isBitArray**(Object)
Test if object is a BitArray

*BitArray*   **BitArray.fromNumber**(Number)
Convert a number into a 64 bit BitArray

*BitArray*   **BitArray.fromString**(String)
Convert a string into a BitArray

*BitArray*   **BitArray.fromArray**(Array)
Convert an array of 0s and 1s into a BitArray

*BitArray*   **BitArray.fromMixedArray**(Array)
Convert an array of mixed element types (and bit sizes), into a BitArray

*BitArray*   **BitArray.fromDate**(Date)
Convert a date into a 64 bit BitArray

*BitArray*   **BitArray.fromBoolean**(Boolean)
Convert a boolean into a 1 bit BitArray

## Documentation

Documentation is generated with the very awesome `yuidoc`

make sure it's installed:

	npm yuidoc -g

And run the following command in the root folder to create a folder called *documentation*

	yuidoc

## Testing

Testing is done with `mocha`, make sure it's installed:

	npm i mocha -g

and run the tests found inside the `test` folder with

	mocha

## Todo

- Include Specifiers and their alias
- Conversion from and to types including Typed Arrays
- Bit manipulation methods (rotr, xor, etc)
- Node.js streaming
- ES6 support (shims & implementation)
- ES5 shims, in case they are ever needed

## License

[The MIT License](http://opensource.org/licenses/MIT)
