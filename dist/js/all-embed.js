/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

/**
 * @license
 * Video.js 5.19.0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.videojs=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-big-play-button"},b.prototype.handleClick=function(a){this.player_.play();var b=this.player_.getChild("controlBar"),c=b&&b.getChild("playToggle");if(!c)return void this.player_.focus();this.setTimeout(function(){c.focus()},1)},b}(i["default"]);l.prototype.controlText_="Play Video",k["default"].registerComponent("BigPlayButton",l),c["default"]=l},{2:2,5:5}],2:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(86),m=d(l),n=a(88),o=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"button",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};b=(0,n.assign)({className:this.buildCSSClass()},b),"button"!==a&&(m["default"].warn("Creating a Button with an HTML element of "+a+" is deprecated; use ClickableComponent instead."),b=(0,n.assign)({tabIndex:0},b),c=(0,n.assign)({role:"button"},c)),c=(0,n.assign)({type:"button","aria-live":"polite"},c);var d=k["default"].prototype.createEl.call(this,a,b,c);return this.createControlTextEl(d),d},b.prototype.addChild=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=this.constructor.name;return m["default"].warn("Adding an actionable (user controllable) child to a Button ("+c+") is not supported; use a ClickableComponent instead."),k["default"].prototype.addChild.call(this,a,b)},b.prototype.enable=function(){a.prototype.enable.call(this),this.el_.removeAttribute("disabled")},b.prototype.disable=function(){a.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},b.prototype.handleKeyPress=function(b){32!==b.which&&13!==b.which&&a.prototype.handleKeyPress.call(this,b)},b}(i["default"]);k["default"].registerComponent("Button",o),c["default"]=o},{3:3,5:5,86:86,88:88}],3:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(82),n=d(m),o=a(83),p=d(o),q=a(86),r=e(q),s=a(94),t=e(s),u=a(88),v=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.emitTapEvents(),e.enable(),e}return h(b,a),b.prototype.createEl=function(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};c=(0,u.assign)({className:this.buildCSSClass(),tabIndex:0},c),"button"===b&&r["default"].error("Creating a ClickableComponent with an HTML element of "+b+" is not supported; use a Button instead."),d=(0,u.assign)({role:"button","aria-live":"polite"},d),this.tabIndex_=c.tabIndex;var e=a.prototype.createEl.call(this,b,c,d);return this.createControlTextEl(e),e},b.prototype.createControlTextEl=function(a){return this.controlTextEl_=l.createEl("span",{className:"vjs-control-text"}),a&&a.appendChild(this.controlTextEl_),this.controlText(this.controlText_,a),this.controlTextEl_},b.prototype.controlText=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el();if(!a)return this.controlText_||"Need Text";var c=this.localize(a);return this.controlText_=a,this.controlTextEl_.innerHTML=c,this.nonIconControl||b.setAttribute("title",c),this},b.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+a.prototype.buildCSSClass.call(this)},b.prototype.enable=function(){return this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),"undefined"!=typeof this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on("tap",this.handleClick),this.on("click",this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this},b.prototype.disable=function(){return this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),"undefined"!=typeof this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off("tap",this.handleClick),this.off("click",this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur),this},b.prototype.handleClick=function(a){},b.prototype.handleFocus=function(a){n.on(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b.prototype.handleKeyPress=function(b){32===b.which||13===b.which?(b.preventDefault(),this.handleClick(b)):a.prototype.handleKeyPress&&a.prototype.handleKeyPress.call(this,b)},b.prototype.handleBlur=function(a){n.off(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b}(j["default"]);j["default"].registerComponent("ClickableComponent",v),c["default"]=v},{5:5,81:81,82:82,83:83,86:86,88:88,94:94}],4:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.controlText(d&&d.controlText||g.localize("Close")),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-close-button "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.trigger({type:"close",bubbles:!1})},b}(i["default"]);k["default"].registerComponent("CloseButton",l),c["default"]=l},{2:2,5:5}],5:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(95),h=e(g),i=a(81),j=d(i),k=a(83),l=d(k),m=a(85),n=d(m),o=a(82),p=d(o),q=a(86),r=e(q),s=a(91),t=e(s),u=a(87),v=e(u),w=function(){function a(b,c,d){if(f(this,a),!b&&this.play?this.player_=b=this:this.player_=b,this.options_=(0,v["default"])({},this.options_),c=this.options_=(0,v["default"])(this.options_,c),this.id_=c.id||c.el&&c.el.id,!this.id_){var e=b&&b.id&&b.id()||"no_player";this.id_=e+"_component_"+n.newGUID()}this.name_=c.name||null,c.el?this.el_=c.el:c.createEl!==!1&&(this.el_=this.createEl()),this.children_=[],this.childIndex_={},this.childNameIndex_={},c.initChildren!==!1&&this.initChildren(),this.ready(d),c.reportTouchActivity!==!1&&this.enableTouchActivity()}return a.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var a=this.children_.length-1;a>=0;a--)this.children_[a].dispose&&this.children_[a].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),j.removeElData(this.el_),this.el_=null},a.prototype.player=function(){return this.player_},a.prototype.options=function(a){return r["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),a?(this.options_=(0,v["default"])(this.options_,a),this.options_):this.options_},a.prototype.el=function(){return this.el_},a.prototype.createEl=function(a,b,c){return j.createEl(a,b,c)},a.prototype.localize=function(a){var b=this.player_.language&&this.player_.language(),c=this.player_.languages&&this.player_.languages();if(!b||!c)return a;var d=c[b];if(d&&d[a])return d[a];var e=b.split("-")[0],f=c[e];return f&&f[a]?f[a]:a},a.prototype.contentEl=function(){return this.contentEl_||this.el_},a.prototype.id=function(){return this.id_},a.prototype.name=function(){return this.name_},a.prototype.children=function(){return this.children_},a.prototype.getChildById=function(a){return this.childIndex_[a]},a.prototype.getChild=function(a){if(a)return a=(0,t["default"])(a),this.childNameIndex_[a]},a.prototype.addChild=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.children_.length,e=void 0,f=void 0;if("string"==typeof b){f=(0,t["default"])(b),c||(c={}),c===!0&&(r["default"].warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."),c={});var g=c.componentClass||f;c.name=f;var h=a.getComponent(g);if(!h)throw new Error("Component "+g+" does not exist");if("function"!=typeof h)return null;e=new h(this.player_||this,c)}else e=b;if(this.children_.splice(d,0,e),"function"==typeof e.id&&(this.childIndex_[e.id()]=e),f=f||e.name&&(0,t["default"])(e.name()),f&&(this.childNameIndex_[f]=e),"function"==typeof e.el&&e.el()){var i=this.contentEl().children,j=i[d]||null;this.contentEl().insertBefore(e.el(),j)}return e},a.prototype.removeChild=function(a){if("string"==typeof a&&(a=this.getChild(a)),a&&this.children_){for(var b=!1,c=this.children_.length-1;c>=0;c--)if(this.children_[c]===a){b=!0,this.children_.splice(c,1);break}if(b){this.childIndex_[a.id()]=null,this.childNameIndex_[a.name()]=null;var d=a.el();d&&d.parentNode===this.contentEl()&&this.contentEl().removeChild(a.el())}}},a.prototype.initChildren=function(){var b=this,c=this.options_.children;if(c){var d=this.options_,e=function(a){var c=a.name,e=a.opts;if(void 0!==d[c]&&(e=d[c]),e!==!1){e===!0&&(e={}),e.playerOptions=b.options_.playerOptions;var f=b.addChild(c,e);f&&(b[c]=f)}},f=void 0,g=a.getComponent("Tech");f=Array.isArray(c)?c:Object.keys(c),f.concat(Object.keys(this.options_).filter(function(a){return!f.some(function(b){return"string"==typeof b?a===b:a===b.name})})).map(function(a){var d=void 0,e=void 0;return"string"==typeof a?(d=a,e=c[d]||b.options_[d]||{}):(d=a.name,e=a),{name:d,opts:e}}).filter(function(b){var c=a.getComponent(b.opts.componentClass||(0,t["default"])(b.name));return c&&!g.isTech(c)}).forEach(e)}},a.prototype.buildCSSClass=function(){return""},a.prototype.on=function(a,b,c){var d=this;if("string"==typeof a||Array.isArray(a))p.on(this.el_,a,l.bind(this,b));else{var e=a,f=b,g=l.bind(this,c),h=function(){return d.off(e,f,g)};h.guid=g.guid,this.on("dispose",h);var i=function(){return d.off("dispose",h)};i.guid=g.guid,a.nodeName?(p.on(e,f,g),p.on(e,"dispose",i)):"function"==typeof a.on&&(e.on(f,g),e.on("dispose",i))}return this},a.prototype.off=function(a,b,c){if(!a||"string"==typeof a||Array.isArray(a))p.off(this.el_,a,b);else{var d=a,e=b,f=l.bind(this,c);this.off("dispose",f),a.nodeName?(p.off(d,e,f),p.off(d,"dispose",f)):(d.off(e,f),d.off("dispose",f))}return this},a.prototype.one=function(a,b,c){var d=this,e=arguments;if("string"==typeof a||Array.isArray(a))p.one(this.el_,a,l.bind(this,b));else{var f=a,g=b,h=l.bind(this,c),i=function j(){d.off(f,g,j),h.apply(null,e)};i.guid=h.guid,this.on(f,g,i)}return this},a.prototype.trigger=function(a,b){return p.trigger(this.el_,a,b),this},a.prototype.ready=function(a){var b=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a&&(this.isReady_?b?a.call(this):this.setTimeout(a,1):(this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(a))),this},a.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var a=this.readyQueue_;this.readyQueue_=[],a&&a.length>0&&a.forEach(function(a){a.call(this)},this),this.trigger("ready")},1)},a.prototype.$=function(a,b){return j.$(a,b||this.contentEl())},a.prototype.$$=function(a,b){return j.$$(a,b||this.contentEl())},a.prototype.hasClass=function(a){return j.hasElClass(this.el_,a)},a.prototype.addClass=function(a){return j.addElClass(this.el_,a),this},a.prototype.removeClass=function(a){return j.removeElClass(this.el_,a),this},a.prototype.toggleClass=function(a,b){return j.toggleElClass(this.el_,a,b),this},a.prototype.show=function(){return this.removeClass("vjs-hidden"),this},a.prototype.hide=function(){return this.addClass("vjs-hidden"),this},a.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},a.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},a.prototype.getAttribute=function(a){return j.getAttribute(this.el_,a)},a.prototype.setAttribute=function(a,b){return j.setAttribute(this.el_,a,b),this},a.prototype.removeAttribute=function(a){return j.removeAttribute(this.el_,a),this},a.prototype.width=function(a,b){return this.dimension("width",a,b)},a.prototype.height=function(a,b){return this.dimension("height",a,b)},a.prototype.dimensions=function(a,b){return this.width(a,!0).height(b)},a.prototype.dimension=function(a,b,c){if(void 0!==b)return null!==b&&b===b||(b=0),(""+b).indexOf("%")!==-1||(""+b).indexOf("px")!==-1?this.el_.style[a]=b:this.el_.style[a]="auto"===b?"":b+"px",c||this.trigger("resize"),this;if(!this.el_)return 0;var d=this.el_.style[a],e=d.indexOf("px");return e!==-1?parseInt(d.slice(0,e),10):parseInt(this.el_["offset"+(0,t["default"])(a)],10)},a.prototype.currentDimension=function(a){var b=0;if("width"!==a&&"height"!==a)throw new Error("currentDimension only accepts width or height value");if("function"==typeof h["default"].getComputedStyle){var c=h["default"].getComputedStyle(this.el_);b=c.getPropertyValue(a)||c[a]}if(b=parseFloat(b),0===b){var d="offset"+(0,t["default"])(a);b=this.el_[d]}return b},a.prototype.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},a.prototype.currentWidth=function(){return this.currentDimension("width")},a.prototype.currentHeight=function(){return this.currentDimension("height")},a.prototype.focus=function(){this.el_.focus()},a.prototype.blur=function(){this.el_.blur()},a.prototype.emitTapEvents=function(){var a=0,b=null,c=void 0;this.on("touchstart",function(d){1===d.touches.length&&(b={pageX:d.touches[0].pageX,pageY:d.touches[0].pageY},a=(new Date).getTime(),c=!0)}),this.on("touchmove",function(a){if(a.touches.length>1)c=!1;else if(b){var d=a.touches[0].pageX-b.pageX,e=a.touches[0].pageY-b.pageY,f=Math.sqrt(d*d+e*e);f>10&&(c=!1)}});var d=function(){c=!1};this.on("touchleave",d),this.on("touchcancel",d),this.on("touchend",function(d){if(b=null,c===!0){(new Date).getTime()-a<200&&(d.preventDefault(),this.trigger("tap"))}})},a.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var a=l.bind(this.player(),this.player().reportUserActivity),b=void 0;this.on("touchstart",function(){a(),this.clearInterval(b),b=this.setInterval(a,250)});var c=function(c){a(),this.clearInterval(b)};this.on("touchmove",a),this.on("touchend",c),this.on("touchcancel",c)}},a.prototype.setTimeout=function(a,b){a=l.bind(this,a);var c=h["default"].setTimeout(a,b),d=function(){this.clearTimeout(c)};return d.guid="vjs-timeout-"+c,this.on("dispose",d),c},a.prototype.clearTimeout=function(a){h["default"].clearTimeout(a);var b=function(){};return b.guid="vjs-timeout-"+a,this.off("dispose",b),a},a.prototype.setInterval=function(a,b){a=l.bind(this,a);var c=h["default"].setInterval(a,b),d=function(){this.clearInterval(c)};return d.guid="vjs-interval-"+c,this.on("dispose",d),c},a.prototype.clearInterval=function(a){h["default"].clearInterval(a);var b=function(){};return b.guid="vjs-interval-"+a,this.off("dispose",b),a},a.registerComponent=function(b,c){if(b){if(b=(0,t["default"])(b),a.components_||(a.components_={}),"Player"===b&&a.components_[b]){var d=a.components_[b];if(d.players&&Object.keys(d.players).length>0&&Object.keys(d.players).map(function(a){return d.players[a]}).every(Boolean))throw new Error("Can not register Player component after player has been created")}return a.components_[b]=c,c}},a.getComponent=function(b){if(b)return b=(0,t["default"])(b),a.components_&&a.components_[b]?a.components_[b]:h["default"]&&h["default"].videojs&&h["default"].videojs[b]?(r["default"].warn("The "+b+" component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"),h["default"].videojs[b]):void 0},a.extend=function(b){b=b||{},r["default"].warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");var c=b.init||b.init||this.prototype.init||this.prototype.init||function(){},d=function(){c.apply(this,arguments)};d.prototype=Object.create(this.prototype),d.prototype.constructor=d,d.extend=a.extend;for(var e in b)b.hasOwnProperty(e)&&(d.prototype[e]=b[e]);return d},a}();w.registerComponent("Component",w),c["default"]=w},{81:81,82:82,83:83,85:85,86:86,87:87,91:91,95:95}],6:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(7),m=d(l),n=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b),d.tracks=c.audioTracks&&c.audioTracks();var g=f(this,a.call(this,c,d));return g.el_.setAttribute("aria-label","Audio Menu"),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-audio-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.hideThreshold_=1;var b=this.player_.audioTracks&&this.player_.audioTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);n.prototype.controlText_="Audio Track",k["default"].registerComponent("AudioTrackButton",n),c["default"]=n},{36:36,5:5,7:7}],7:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=c.audioTracks();d.label=e.label||e.language||"Unknown",d.selected=e.enabled;var i=g(this,a.call(this,c,d));if(i.track=e,h){var j=n.bind(i,i.handleTracksChange);h.addEventListener("change",j),i.on("dispose",function(){h.removeEventListener("change",j)})}return i}return h(b,a),b.prototype.handleClick=function(b){var c=this.player_.audioTracks();if(a.prototype.handleClick.call(this,b),c)for(var d=0;d<c.length;d++){var e=c[d];e.enabled=e===this.track}},b.prototype.handleTracksChange=function(a){this.selected(this.track.enabled)},b}(j["default"]);l["default"].registerComponent("AudioTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],8:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(12),a(32),a(33),a(35),a(34),a(10),a(18),a(9),a(38),a(40),a(11),a(25),a(27),a(29),a(24),a(6),a(13),a(21);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"},{role:"group"})},b}(i["default"]);j.prototype.options_={children:["playToggle","volumeMenuButton","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subtitlesButton","captionsButton","audioTrackButton","fullscreenToggle"]},i["default"].registerComponent("ControlBar",j),c["default"]=j},{10:10,11:11,12:12,13:13,18:18,21:21,24:24,25:25,27:27,29:29,32:32,33:33,34:34,35:35,38:38,40:40,5:5,6:6,9:9}],9:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"fullscreenchange",g.handleFullscreenChange),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleFullscreenChange=function(a){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},b.prototype.handleClick=function(a){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},b}(i["default"]);l.prototype.controlText_="Fullscreen",k["default"].registerComponent("FullscreenToggle",l),c["default"]=l},{2:2,5:5}],10:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateShowing(),e.on(e.player(),"durationchange",e.updateShowing),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateShowing=function(a){this.player().duration()===1/0?this.show():this.hide()},b}(j["default"]);j["default"].registerComponent("LiveDisplay",m),c["default"]=m},{5:5,81:81}],11:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(2),j=e(i),k=a(5),l=e(k),m=a(81),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.update),c.tech_&&c.tech_.featuresVolumeControl===!1&&e.addClass("vjs-hidden"),e.on(c,"loadstart",function(){this.update(),c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),e}return h(b,a),b.prototype.buildCSSClass=function(){return"vjs-mute-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.muted(!this.player_.muted())},b.prototype.update=function(a){var b=this.player_.volume(),c=3;0===b||this.player_.muted()?c=0:b<.33?c=1:b<.67&&(c=2);var d=this.player_.muted()?"Unmute":"Mute";this.controlText()!==d&&this.controlText(d);for(var e=0;e<4;e++)n.removeElClass(this.el_,"vjs-vol-"+e);n.addElClass(this.el_,"vjs-vol-"+c)},b}(j["default"]);o.prototype.controlText_="Mute",l["default"].registerComponent("MuteToggle",o),c["default"]=o},{2:2,5:5,81:81}],12:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"play",g.handlePlay),g.on(c,"pause",g.handlePause),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-play-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.paused()?this.player_.play():this.player_.pause()},b.prototype.handlePlay=function(a){this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},b.prototype.handlePause=function(a){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},b}(i["default"]);l.prototype.controlText_="Play",k["default"].registerComponent("PlayToggle",l),c["default"]=l},{2:2,5:5}],13:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(49),l=e(k),m=a(14),n=e(m),o=a(5),p=e(o),q=a(81),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateVisibility(),e.updateLabel(),e.on(c,"loadstart",e.updateVisibility),e.on(c,"ratechange",e.updateLabel),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this);return this.labelEl_=r.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),b.appendChild(this.labelEl_),b},b.prototype.buildCSSClass=function(){return"vjs-playback-rate "+a.prototype.buildCSSClass.call(this)},b.prototype.createMenu=function(){var a=new l["default"](this.player()),b=this.playbackRates()
;if(b)for(var c=b.length-1;c>=0;c--)a.addChild(new n["default"](this.player(),{rate:b[c]+"x"}));return a},b.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},b.prototype.handleClick=function(a){for(var b=this.player().playbackRate(),c=this.playbackRates(),d=c[0],e=0;e<c.length;e++)if(c[e]>b){d=c[e];break}this.player().playbackRate(d)},b.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},b.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},b.prototype.updateVisibility=function(a){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},b.prototype.updateLabel=function(a){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},b}(j["default"]);s.prototype.controlText_="Playback Rate",p["default"].registerComponent("PlaybackRateMenuButton",s),c["default"]=s},{14:14,47:47,49:49,5:5,81:81}],14:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(48),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=d.rate,h=parseFloat(g,10);d.label=g,d.selected=1===h,d.selectable=!0;var i=f(this,a.call(this,c,d));return i.label=g,i.rate=h,i.on(c,"ratechange",i.update),i}return g(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},b.prototype.update=function(a){this.selected(this.player().playbackRate()===this.rate)},b}(i["default"]);l.prototype.contentElType="button",k["default"].registerComponent("PlaybackRateMenuItem",l),c["default"]=l},{48:48,5:5}],15:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.partEls_=[],e.on(c,"progress",e.update),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},b.prototype.update=function(a){var b=this.player_.buffered(),c=this.player_.duration(),d=this.player_.bufferedEnd(),e=this.partEls_,f=function(a,b){var c=a/b||0;return 100*(c>=1?1:c)+"%"};this.el_.style.width=f(d,c);for(var g=0;g<b.length;g++){var h=b.start(g),i=b.end(g),j=e[g];j||(j=this.el_.appendChild(l.createEl()),e[g]=j),j.style.left=f(h,d),j.style.width=f(i-h,d)}for(var k=e.length;k>b.length;k--)this.el_.removeChild(e[k-1]);e.length=b.length},b}(j["default"]);j["default"].registerComponent("LoadProgressBar",m),c["default"]=m},{5:5,81:81}],16:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltip=l.createEl("div",{className:"vjs-time-tooltip"}),e.el().appendChild(e.tooltip),e.addClass("vjs-keep-tooltips-inside")),e.update(0,0),c.on("ready",function(){e.on(c.controlBar.progressControl.el(),"mousemove",n.throttle(n.bind(e,e.handleMouseMove),25))}),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},b.prototype.handleMouseMove=function(a){var b=this.player_.duration(),c=this.calculateDistance(a)*b,d=a.pageX-l.findElPosition(this.el().parentNode).left;this.update(c,d)},b.prototype.update=function(a,b){var c=(0,p["default"])(a,this.player_.duration());if(this.el().style.left=b+"px",this.el().setAttribute("data-current-time",c),this.keepTooltipsInside){var d=this.clampPosition_(b),e=b-d+1,f=parseFloat((0,r["default"])(this.tooltip,"width")),g=f/2;this.tooltip.innerHTML=c,this.tooltip.style.right="-"+(g-e)+"px"}},b.prototype.calculateDistance=function(a){return l.getPointerPosition(this.el().parentNode,a).x},b.prototype.clampPosition_=function(a){if(!this.keepTooltipsInside)return a;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltip,"width")),d=c/2,e=a;return a<d?e=Math.ceil(d):a>b-d&&(e=Math.floor(b-d)),e},b}(j["default"]);j["default"].registerComponent("MouseTimeDisplay",s),c["default"]=s},{5:5,80:80,81:81,83:83,84:84}],17:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&e.addClass("vjs-keep-tooltips-inside"),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("data-current-time",(0,n["default"])(b,this.player_.duration()))},b}(j["default"]);j["default"].registerComponent("PlayProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],18:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(19),a(16);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["seekBar"]},i["default"].registerComponent("ProgressControl",j),c["default"]=j},{16:16,19:19,5:5}],19:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q);a(15),a(17),a(20);var s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateProgress),e.on(c,"ended",e.updateProgress),c.ready(n.bind(e,e.updateProgress)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltipProgressBar=e.addChild("TooltipProgressBar")),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":"progress bar"})},b.prototype.updateProgress=function(a){if(this.updateAriaAttributes(this.el_),this.keepTooltipsInside){this.updateAriaAttributes(this.tooltipProgressBar.el_),this.tooltipProgressBar.el_.style.width=this.bar.el_.style.width;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltipProgressBar.tooltip,"width")),d=this.tooltipProgressBar.el().style;d.maxWidth=Math.floor(b-c/2)+"px",d.minWidth=Math.ceil(c/2)+"px",d.right="-"+c/2+"px"}},b.prototype.updateAriaAttributes=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();a.setAttribute("aria-valuenow",(100*this.getPercent()).toFixed(2)),a.setAttribute("aria-valuetext",(0,p["default"])(b,this.player_.duration()))},b.prototype.getPercent=function(){var a=this.player_.currentTime()/this.player_.duration();return a>=1?1:a},b.prototype.handleMouseDown=function(b){this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),a.prototype.handleMouseDown.call(this,b)},b.prototype.handleMouseMove=function(a){var b=this.calculateDistance(a)*this.player_.duration();b===this.player_.duration()&&(b-=.1),this.player_.currentTime(b)},b.prototype.handleMouseUp=function(b){a.prototype.handleMouseUp.call(this,b),this.player_.scrubbing(!1),this.videoWasPlaying&&this.player_.play()},b.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},b.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},b}(j["default"]);s.prototype.options_={children:["loadProgressBar","mouseTimeDisplay","playProgressBar"],barName:"playProgressBar"},s.prototype.playerEvent="timeupdate",l["default"].registerComponent("SeekBar",s),c["default"]=s},{15:15,17:17,20:20,5:5,57:57,80:80,83:83,84:84}],20:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-tooltip-progress-bar vjs-slider-bar",innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"});return this.tooltip=b.querySelector(".vjs-time-tooltip"),b},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=(0,n["default"])(b,this.player_.duration());this.el_.setAttribute("data-current-time",c),this.tooltip.innerHTML=c},b}(j["default"]);j["default"].registerComponent("TooltipProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],21:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(22),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,{className:this.buildCSSClass()});return b.innerHTML="&nbsp;",b},b}(i["default"]);k["default"].registerComponent("CustomControlSpacer",l),c["default"]=l},{22:22,5:5}],22:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b}(i["default"]);i["default"].registerComponent("Spacer",j),c["default"]=j},{5:5}],23:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" settings",selectable:!1,"default":!1,mode:"disabled"},d.selectable=!1;var g=f(this,a.call(this,c,d));return g.addClass("vjs-texttrack-settings"),g.controlText(", opens "+d.kind+" settings dialog"),g}return g(b,a),b.prototype.handleClick=function(a){this.player().getChild("textTrackSettings").show(),this.player().getChild("textTrackSettings").el_.focus()},b}(i["default"]);k["default"].registerComponent("CaptionSettingsMenuItem",l),c["default"]=l},{31:31,5:5}],24:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(23),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Captions Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-captions-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var b=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(b.push(new m["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1),a.prototype.createItems.call(this,b)},b}(i["default"]);n.prototype.kind_="captions",n.prototype.controlText_="Captions",k["default"].registerComponent("CaptionsButton",n),c["default"]=n},{23:23,30:30,5:5}],25:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(26),m=d(l),n=a(91),o=d(n),p=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Chapters Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-chapters-button "+a.prototype.buildCSSClass.call(this)},b.prototype.update=function(b){this.track_&&(!b||"addtrack"!==b.type&&"removetrack"!==b.type)||this.setTrack(this.findChaptersTrack()),a.prototype.update.call(this)},b.prototype.setTrack=function(a){if(this.track_!==a){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var b=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);b&&b.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=a,this.track_){this.track_.mode="hidden";var c=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);c&&c.addEventListener("load",this.updateHandler_)}}},b.prototype.findChaptersTrack=function(){for(var a=this.player_.textTracks()||[],b=a.length-1;b>=0;b--){var c=a[b];if(c.kind===this.kind_)return c}},b.prototype.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize((0,o["default"])(this.kind_))},b.prototype.createMenu=function(){return this.options_.title=this.getMenuCaption(),a.prototype.createMenu.call(this)},b.prototype.createItems=function(){var a=[];if(!this.track_)return a;var b=this.track_.cues;if(!b)return a;for(var c=0,d=b.length;c<d;c++){var e=b[c],f=new m["default"](this.player_,{track:this.track_,cue:e});a.push(f)}return a},b}(i["default"]);p.prototype.kind_="chapters",p.prototype.controlText_="Chapters",k["default"].registerComponent("ChaptersButton",p),c["default"]=p},{26:26,30:30,5:5,91:91}],26:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=d.cue,i=c.currentTime();d.selectable=!0,d.label=h.text,d.selected=h.startTime<=i&&i<h.endTime;var j=g(this,a.call(this,c,d));return j.track=e,j.cue=h,e.addEventListener("cuechange",n.bind(j,j.update)),j}return h(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},b.prototype.update=function(a){var b=this.cue,c=this.player_.currentTime();this.selected(b.startTime<=c&&c<b.endTime)},b}(j["default"]);l["default"].registerComponent("ChaptersTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],27:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(30),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));h.el_.setAttribute("aria-label","Descriptions Menu");var i=c.textTracks();if(i){var j=n.bind(h,h.handleTracksChange);i.addEventListener("change",j),h.on("dispose",function(){i.removeEventListener("change",j)})}return h}return h(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!1,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind!==this.kind_&&"showing"===f.mode){c=!0;break}}c?this.disable():this.enable()},b.prototype.buildCSSClass=function(){return"vjs-descriptions-button "+a.prototype.buildCSSClass.call(this)},b}(j["default"]);o.prototype.kind_="descriptions",o.prototype.controlText_="Descriptions",l["default"].registerComponent("DescriptionsButton",o),c["default"]=o},{30:30,5:5,83:83}],28:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" off","default":!1,mode:"disabled"},d.selectable=!0;var g=f(this,a.call(this,c,d));return g.selected(!0),g}return g(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!0,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind===this.track.kind&&"showing"===f.mode){c=!1;break}}this.selected(c)},b}(i["default"]);k["default"].registerComponent("OffTextTrackMenuItem",l),c["default"]=l},{31:31,5:5}],29:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Subtitles Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);l.prototype.kind_="subtitles",l.prototype.controlText_="Subtitles",k["default"].registerComponent("SubtitlesButton",l),c["default"]=l},{30:30,5:5}],30:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(31),m=d(l),n=a(28),o=d(n),p=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(this,b),d.tracks=c.textTracks(),f(this,a.call(this,c,d))}return g(b,a),b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];a.push(new o["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1;var b=this.player_.textTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];d.kind===this.kind_&&a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);k["default"].registerComponent("TextTrackButton",p),c["default"]=p},{28:28,31:31,36:36,5:5}],31:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},j=a(48),k=e(j),l=a(5),m=e(l),n=a(83),o=d(n),p=a(95),q=e(p),r=a(94),s=e(r),t=function(a){function b(c,d){f(this,b);var e=d.track,h=c.textTracks();d.label=e.label||e.language||"Unknown",d.selected=e["default"]||"showing"===e.mode;var j=g(this,a.call(this,c,d));if(j.track=e,h){var k=o.bind(j,j.handleTracksChange);h.addEventListener("change",k),j.on("dispose",function(){h.removeEventListener("change",k)})}if(h&&void 0===h.onchange){var l=void 0;j.on(["tap","click"],function(){if("object"!==i(q["default"].Event))try{l=new q["default"].Event("change")}catch(a){}l||(l=s["default"].createEvent("Event"),l.initEvent("change",!0,!0)),h.dispatchEvent(l)})}return j}return h(b,a),b.prototype.handleClick=function(b){var c=this.track.kind,d=this.player_.textTracks();if(a.prototype.handleClick.call(this,b),d)for(var e=0;e<d.length;e++){var f=d[e];f.kind===c&&(f===this.track?f.mode="showing":f.mode="disabled")}},b.prototype.handleTracksChange=function(a){this.selected("showing"===this.track.mode)},b}(k["default"]);m["default"].registerComponent("TextTrackMenuItem",t),c["default"]=t},{48:48,5:5,83:83,94:94,95:95}],32:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,
configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=this.localize("Current Time"),d=(0,n["default"])(b,this.player_.duration());d!==this.formattedTime_&&(this.formattedTime_=d,this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d)},b}(j["default"]);j["default"].registerComponent("CurrentTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],33:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"durationchange",e.updateContent),e.on(c,"timeupdate",e.updateContent),e.on(c,"loadedmetadata",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.duration();if(b&&this.duration_!==b){this.duration_=b;var c=this.localize("Duration Time"),d=(0,n["default"])(b);this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d}},b}(j["default"]);j["default"].registerComponent("DurationDisplay",o),c["default"]=o},{5:5,81:81,84:84}],34:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e.on(c,"durationchange",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){if(this.player_.duration()){var b=this.localize("Remaining Time"),c=(0,n["default"])(this.player_.remainingTime());c!==this.formattedTime_&&(this.formattedTime_=c,this.contentEl_.innerHTML='<span class="vjs-control-text">'+b+"</span> -"+c)}},b}(j["default"]);j["default"].registerComponent("RemainingTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],35:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},b}(i["default"]);i["default"].registerComponent("TimeDivider",j),c["default"]=j},{5:5}],36:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.tracks,h=g(this,a.call(this,c,d));if(h.items.length<=1&&h.hide(),!e)return g(h);var i=n.bind(h,h.update);return e.addEventListener("removetrack",i),e.addEventListener("addtrack",i),h.player_.on("dispose",function(){e.removeEventListener("removetrack",i),e.removeEventListener("addtrack",i)}),h}return h(b,a),b}(j["default"]);l["default"].registerComponent("TrackButton",o),c["default"]=o},{47:47,5:5,83:83}],37:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m);a(39);var o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.updateARIAAttributes),c.ready(n.bind(e,e.updateARIAAttributes)),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":"volume level"})},b.prototype.handleMouseMove=function(a){this.checkMuted(),this.player_.volume(this.calculateDistance(a))},b.prototype.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},b.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},b.prototype.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},b.prototype.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},b.prototype.updateARIAAttributes=function(a){var b=(100*this.player_.volume()).toFixed(2);this.el_.setAttribute("aria-valuenow",b),this.el_.setAttribute("aria-valuetext",b+"%")},b}(j["default"]);o.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},o.prototype.playerEvent="volumechange",l["default"].registerComponent("VolumeBar",o),c["default"]=o},{39:39,5:5,57:57,83:83}],38:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(37);var j=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return c.tech_&&c.tech_.featuresVolumeControl===!1&&g.addClass("vjs-hidden"),g.on(c,"loadstart",function(){c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),g}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["volumeBar"]},i["default"].registerComponent("VolumeControl",j),c["default"]=j},{37:37,5:5}],39:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},b}(i["default"]);i["default"].registerComponent("VolumeLevel",j),c["default"]=j},{5:5}],40:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(83),j=e(i),k=a(5),l=d(k),m=a(54),n=d(m),o=a(53),p=d(o),q=a(11),r=d(q),s=a(37),t=d(s),u=function(a){function b(c){function d(){c.tech_&&c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b),void 0===e.inline&&(e.inline=!0),void 0===e.vertical&&(e.inline?e.vertical=!1:e.vertical=!0),e.volumeBar=e.volumeBar||{},e.volumeBar.vertical=!!e.vertical;var h=g(this,a.call(this,c,e));return h.on(c,"volumechange",h.volumeUpdate),h.on(c,"loadstart",h.volumeUpdate),d.call(h),h.on(c,"loadstart",d),h.on(h.volumeBar,["slideractive","focus"],function(){this.addClass("vjs-slider-active")}),h.on(h.volumeBar,["sliderinactive","blur"],function(){this.removeClass("vjs-slider-active")}),h.on(h.volumeBar,["focus"],function(){this.addClass("vjs-lock-showing")}),h.on(h.volumeBar,["blur"],function(){this.removeClass("vjs-lock-showing")}),h}return h(b,a),b.prototype.buildCSSClass=function(){var b="";return b=this.options_.vertical?"vjs-volume-menu-button-vertical":"vjs-volume-menu-button-horizontal","vjs-volume-menu-button "+a.prototype.buildCSSClass.call(this)+" "+b},b.prototype.createPopup=function(){var a=new n["default"](this.player_,{contentElType:"div"}),b=new t["default"](this.player_,this.options_.volumeBar);return a.addChild(b),this.menuContent=a,this.volumeBar=b,this.attachVolumeBarEvents(),a},b.prototype.handleClick=function(b){r["default"].prototype.handleClick.call(this),a.prototype.handleClick.call(this)},b.prototype.attachVolumeBarEvents=function(){this.menuContent.on(["mousedown","touchdown"],j.bind(this,this.handleMouseDown))},b.prototype.handleMouseDown=function(a){this.on(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove)),this.on(this.el_.ownerDocument,["mouseup","touchend"],this.handleMouseUp)},b.prototype.handleMouseUp=function(a){this.off(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove))},b}(p["default"]);u.prototype.volumeUpdate=r["default"].prototype.update,u.prototype.controlText_="Mute",l["default"].registerComponent("VolumeMenuButton",u),c["default"]=u},{11:11,37:37,5:5,53:53,54:54,83:83}],41:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(50),k=d(j),l=a(87),m=d(l),n=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"error",g.open),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-error-display "+a.prototype.buildCSSClass.call(this)},b.prototype.content=function(){var a=this.player().error();return a?this.localize(a.message):""},b}(k["default"]);n.prototype.options_=(0,m["default"])(k["default"].prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),i["default"].registerComponent("ErrorDisplay",n),c["default"]=n},{5:5,50:50,87:87}],42:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var e=a(82),f=d(e),g=function(){};g.prototype.allowedEvents_={},g.prototype.on=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.on(this,a,b),this.addEventListener=c},g.prototype.addEventListener=g.prototype.on,g.prototype.off=function(a,b){f.off(this,a,b)},g.prototype.removeEventListener=g.prototype.off,g.prototype.one=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.one(this,a,b),this.addEventListener=c},g.prototype.trigger=function(a){var b=a.type||a;"string"==typeof a&&(a={type:b}),a=f.fixEvent(a),this.allowedEvents_[b]&&this["on"+b]&&this["on"+b](a),f.trigger(this,a)},g.prototype.dispatchEvent=g.prototype.trigger,c["default"]=g},{82:82}],43:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=a(86),g=d(f),h=a(88),i=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+(void 0===b?"undefined":e(b)));a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(a.super_=b)},j=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=function(){a.apply(this,arguments)},d={};(0,h.isObject)(b)?("function"==typeof b.init&&(g["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."),b.constructor=b.init),b.constructor!==Object.prototype.constructor&&(c=b.constructor),d=b):"function"==typeof b&&(c=b),i(c,a);for(var e in d)d.hasOwnProperty(e)&&(c.prototype[e]=d[e]);return c};c["default"]=j},{86:86,88:88}],44:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;for(var e=a(94),f=d(e),g={},h=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i=h[0],j=void 0,k=0;k<h.length;k++)if(h[k][1]in f["default"]){j=h[k];break}if(j)for(var l=0;l<j.length;l++)g[i[l]]=j[l];c["default"]=g},{94:94}],45:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})},b}(i["default"]);i["default"].registerComponent("LoadingSpinner",j),c["default"]=j},{5:5}],46:[function(a,b,c){"use strict";function d(a){if(a instanceof d)return a;"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:(0,e.isObject)(a)&&("number"==typeof a.code&&(this.code=a.code),(0,e.assign)(this,a)),this.message||(this.message=d.defaultMessages[this.code]||"")}c.__esModule=!0;var e=a(88);d.prototype.code=0,d.prototype.message="",d.prototype.status=null,d.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],d.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var f=0;f<d.errorTypes.length;f++)d[d.errorTypes[f]]=f,d.prototype[d.errorTypes[f]]=f;c["default"]=d},{88:88}],47:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(49),n=e(m),o=a(81),p=d(o),q=a(83),r=d(q),s=a(91),t=e(s),u=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b);var e=g(this,a.call(this,c,d));return e.update(),e.enabled_=!0,e.el_.setAttribute("aria-haspopup","true"),e.el_.setAttribute("role","menuitem"),e.on("keydown",e.handleSubmenuKeyPress),e}return h(b,a),b.prototype.update=function(){var a=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=a,this.addChild(a),this.buttonPressed_=!1,this.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},b.prototype.createMenu=function(){var a=new n["default"](this.player_);if(this.hideThreshold_=0,this.options_.title){var b=p.createEl("li",{className:"vjs-menu-title",innerHTML:(0,t["default"])(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,a.children_.unshift(b),p.insertElFirst(b,a.contentEl())}if(this.items=this.createItems(),this.items)for(var c=0;c<this.items.length;c++)a.addItem(this.items[c]);return a},b.prototype.createItems=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.one(this.menu.contentEl(),"mouseleave",r.bind(this,function(a){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},b.prototype.handleKeyPress=function(b){27===b.which||9===b.which?(this.buttonPressed_&&this.unpressButton(),9!==b.which&&b.preventDefault()):38===b.which||40===b.which?this.buttonPressed_||(this.pressButton(),b.preventDefault()):a.prototype.handleKeyPress.call(this,b)},b.prototype.handleSubmenuKeyPress=function(a){27!==a.which&&9!==a.which||(this.buttonPressed_&&this.unpressButton(),9!==a.which&&a.preventDefault())},b.prototype.pressButton=function(){this.enabled_&&(this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-expanded","true"),this.menu.focus())},b.prototype.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.el_.focus())},b.prototype.disable=function(){return this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.enabled_=!1,a.prototype.disable.call(this)},b.prototype.enable=function(){return this.enabled_=!0,a.prototype.enable.call(this)},b}(j["default"]);l["default"].registerComponent("MenuButton",u),c["default"]=u},{3:3,49:49,5:5,81:81,83:83,91:91}],48:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(88),m=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.selectable=d.selectable,g.selected(d.selected),g.selectable?g.el_.setAttribute("role","menuitemcheckbox"):g.el_.setAttribute("role","menuitem"),g}return g(b,a),b.prototype.createEl=function(b,c,d){return this.nonIconControl=!0,a.prototype.createEl.call(this,"li",(0,l.assign)({className:"vjs-menu-item",innerHTML:this.localize(this.options_.label),tabIndex:-1},c),d)},b.prototype.handleClick=function(a){this.selected(!0)},b.prototype.selected=function(a){this.selectable&&(a?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected")):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(" ")))},b}(i["default"]);k["default"].registerComponent("MenuItem",m),c["default"]=m},{3:3,5:5,88:88}],49:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.focusedChild_=-1,e.on("keydown",e.handleKeyPress),e}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(a){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.setAttribute("role","presentation"),c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepForward()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepBack())},b.prototype.stepForward=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_+1),this.focus(a)},b.prototype.stepBack=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_-1),this.focus(a)},b.prototype.focus=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,b=this.children().slice();b.length&&b[0].className&&/vjs-menu-title/.test(b[0].className)&&b.shift(),b.length>0&&(a<0?a=0:a>=b.length&&(a=b.length-1),this.focusedChild_=a,b[a].el_.focus())},b}(j["default"]);j["default"].registerComponent("Menu",q),c["default"]=q},{5:5,81:81,82:82,83:83}],50:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(81),j=e(i),k=a(83),l=e(k),m=a(5),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.opened_=e.hasBeenOpened_=e.hasBeenFilled_=!1,e.closeable(!e.options_.uncloseable),e.content(e.options_.content),e.contentEl_=j.createEl("div",{className:"vjs-modal-dialog-content"},{role:"document"}),e.descEl_=j.createEl("p",{className:"vjs-modal-dialog-description vjs-offscreen",id:e.el().getAttribute("aria-describedby")}),j.textContent(e.descEl_,e.description()),e.el_.appendChild(e.descEl_),e.el_.appendChild(e.contentEl_),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},b.prototype.buildCSSClass=function(){return"vjs-modal-dialog vjs-hidden "+a.prototype.buildCSSClass.call(this)},b.prototype.handleKeyPress=function(a){27===a.which&&this.closeable()&&this.close()},b.prototype.label=function(){return this.options_.label||this.localize("Modal Window")},b.prototype.description=function(){var a=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(a+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),a},b.prototype.open=function(){if(!this.opened_){var a=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!a.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&a.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!1),this.show(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}return this},b.prototype.opened=function(a){return"boolean"==typeof a&&this[a?"open":"close"](),this.opened_},b.prototype.close=function(){if(this.opened_){var a=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&a.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.options_.temporary&&this.dispose()}return this},b.prototype.closeable=function c(a){if("boolean"==typeof a){var c=this.closeable_=!!a,b=this.getChild("closeButton");if(c&&!b){var d=this.contentEl_;this.contentEl_=this.el_,b=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=d,this.on(b,"close",this.close)}!c&&b&&(this.off(b,"close",this.close),this.removeChild(b),b.dispose())}return this.closeable_},b.prototype.fill=function(){return this.fillWith(this.content())},b.prototype.fillWith=function(a){var b=this.contentEl(),c=b.parentNode,d=b.nextSibling
;return this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,c.removeChild(b),this.empty(),j.insertContent(b,a),this.trigger("modalfill"),d?c.insertBefore(b,d):c.appendChild(b),this},b.prototype.empty=function(){return this.trigger("beforemodalempty"),j.emptyEl(this.contentEl()),this.trigger("modalempty"),this},b.prototype.content=function(a){return void 0!==a&&(this.content_=a),this.content_},b}(n["default"]);o.prototype.options_={pauseOnOpen:!0,temporary:!0},n["default"].registerComponent("ModalDialog",o),c["default"]=o},{5:5,81:81,83:83}],51:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(94),l=e(k),m=a(95),n=e(m),o=a(82),p=d(o),q=a(81),r=d(q),s=a(83),t=d(s),u=a(85),v=d(u),w=a(78),x=d(w),y=a(86),z=e(y),A=a(91),B=e(A),C=a(90),D=a(79),E=a(89),F=d(E),G=a(44),H=e(G),I=a(46),J=e(I),K=a(97),L=e(K),M=a(88),N=a(87),O=e(N),P=a(69),Q=e(P),R=a(50),S=e(R),T=a(62),U=e(T),V=a(63),W=e(V),X=a(76),Y=e(X);a(61),a(59),a(55),a(68),a(45),a(1),a(4),a(8),a(41),a(71),a(60);var Z=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","ratechange","volumechange","texttrackchange"],$=function(a){function b(c,d,e){if(f(this,b),c.id=c.id||"vjs_video_"+v.newGUID(),d=(0,M.assign)(b.getTagSettings(c),d),d.initChildren=!1,d.createEl=!1,d.reportTouchActivity=!1,!d.language)if("function"==typeof c.closest){var h=c.closest("[lang]");h&&(d.language=h.getAttribute("lang"))}else for(var i=c;i&&1===i.nodeType;){if(r.getElAttributes(i).hasOwnProperty("lang")){d.language=i.getAttribute("lang");break}i=i.parentNode}var j=g(this,a.call(this,null,d,e));if(!j.options_||!j.options_.techOrder||!j.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(j.tag=c,j.tagAttributes=c&&r.getElAttributes(c),j.language(j.options_.language),d.languages){var k={};Object.getOwnPropertyNames(d.languages).forEach(function(a){k[a.toLowerCase()]=d.languages[a]}),j.languages_=k}else j.languages_=b.prototype.options_.languages;j.cache_={},j.poster_=d.poster||"",j.controls_=!!d.controls,c.controls=!1,j.scrubbing_=!1,j.el_=j.createEl();var l=(0,O["default"])(j.options_);if(d.plugins){var m=d.plugins;Object.getOwnPropertyNames(m).forEach(function(a){"function"==typeof this[a]?this[a](m[a]):z["default"].error("Unable to find plugin:",a)},j)}return j.options_.playerOptions=l,j.initChildren(),j.isAudio("audio"===c.nodeName.toLowerCase()),j.controls()?j.addClass("vjs-controls-enabled"):j.addClass("vjs-controls-disabled"),j.el_.setAttribute("role","region"),j.isAudio()?j.el_.setAttribute("aria-label","audio player"):j.el_.setAttribute("aria-label","video player"),j.isAudio()&&j.addClass("vjs-audio"),j.flexNotSupported_()&&j.addClass("vjs-no-flex"),x.IS_IOS||j.addClass("vjs-workinghover"),b.players[j.id_]=j,j.userActive(!0),j.reportUserActivity(),j.listenForUserActivity_(),j.on("fullscreenchange",j.handleFullscreenChange_),j.on("stageclick",j.handleStageClick_),j}return h(b,a),b.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&this.styleEl_.parentNode.removeChild(this.styleEl_),b.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var b=this.tag,c=void 0,d=this.playerElIngest_=b.parentNode&&b.parentNode.hasAttribute&&b.parentNode.hasAttribute("data-vjs-player");c=this.el_=d?b.parentNode:a.prototype.createEl.call(this,"div"),b.setAttribute("tabindex","-1"),b.removeAttribute("width"),b.removeAttribute("height");var e=r.getElAttributes(b);if(Object.getOwnPropertyNames(e).forEach(function(a){"class"===a?c.className+=" "+e[a]:c.setAttribute(a,e[a])}),b.playerId=b.id,b.id+="_html5_api",b.className="vjs-tech",b.player=c.player=this,this.addClass("vjs-paused"),n["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=F.createStyleElement("vjs-styles-dimensions");var f=r.$(".vjs-styles-defaults"),g=r.$("head");g.insertBefore(this.styleEl_,f?f.nextSibling:g.firstChild)}this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var h=b.getElementsByTagName("a"),i=0;i<h.length;i++){var j=h.item(i);r.addElClass(j,"vjs-hidden"),j.setAttribute("hidden","hidden")}return b.initNetworkState_=b.networkState,b.parentNode&&!d&&b.parentNode.insertBefore(c,b),r.insertElFirst(b,c),this.children_.unshift(b),this.el_=c,c},b.prototype.width=function(a){return this.dimension("width",a)},b.prototype.height=function(a){return this.dimension("height",a)},b.prototype.dimension=function(a,b){var c=a+"_";if(void 0===b)return this[c]||0;if(""===b)this[c]=void 0;else{var d=parseFloat(b);if(isNaN(d))return z["default"].error('Improper value "'+b+'" supplied for for '+a),this;this[c]=d}return this.updateStyleEl_(),this},b.prototype.fluid=function(a){if(void 0===a)return!!this.fluid_;this.fluid_=!!a,a?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid"),this.updateStyleEl_()},b.prototype.aspectRatio=function(a){if(void 0===a)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(a))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=a,this.fluid(!0),this.updateStyleEl_()},b.prototype.updateStyleEl_=function(){if(n["default"].VIDEOJS_NO_DYNAMIC_STYLE===!0){var a="number"==typeof this.width_?this.width_:this.options_.width,b="number"==typeof this.height_?this.height_:this.options_.height,c=this.tech_&&this.tech_.el();return void(c&&(a>=0&&(c.width=a),b>=0&&(c.height=b)))}var d=void 0,e=void 0,f=void 0,g=void 0;f=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9";var h=f.split(":"),i=h[1]/h[0];d=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/i:this.videoWidth()||300,e=void 0!==this.height_?this.height_:d*i,g=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(g),F.setTextContent(this.styleEl_,"\n      ."+g+" {\n        width: "+d+"px;\n        height: "+e+"px;\n      }\n\n      ."+g+".vjs-fluid {\n        padding-top: "+100*i+"%;\n      }\n    ")},b.prototype.loadTech_=function(a,b){var c=this;this.tech_&&this.unloadTech_(),"Html5"!==a&&this.tag&&(U["default"].getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=a,this.isReady_=!1;var d=(0,M.assign)({source:b,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+a+"_api",videoTracks:this.videoTracks_,textTracks:this.textTracks_,audioTracks:this.audioTracks_,autoplay:this.options_.autoplay,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"]},this.options_[a.toLowerCase()]);this.tag&&(d.tag=this.tag),b&&(this.currentType_=b.type,b.src===this.cache_.src&&this.cache_.currentTime>0&&(d.startTime=this.cache_.currentTime),this.cache_.sources=null,this.cache_.source=b,this.cache_.src=b.src);var e=U["default"].getTech(a);e||(e=j["default"].getComponent(a)),this.tech_=new e(d),this.tech_.ready(t.bind(this,this.handleTechReady_),!0),Q["default"].jsonToTextTracks(this.textTracksJson_||[],this.tech_),Z.forEach(function(a){c.on(c.tech_,a,c["handleTech"+(0,B["default"])(a)+"_"])}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===a&&this.tag||r.insertElFirst(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},b.prototype.unloadTech_=function(){this.videoTracks_=this.videoTracks(),this.textTracks_=this.textTracks(),this.audioTracks_=this.audioTracks(),this.textTracksJson_=Q["default"].textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},b.prototype.tech=function(a){if(a&&a.IWillNotUseThisInPlugins)return this.tech_;var b="\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";throw n["default"].alert(b),new Error(b)},b.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},b.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},b.prototype.handleTechReady_=function(){if(this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_(),(this.src()||this.currentSrc())&&this.tag&&this.options_.autoplay&&this.paused()){try{delete this.tag.poster}catch(a){(0,z["default"])("deleting tag.poster throws in some browsers",a)}this.play()}},b.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},b.prototype.hasStarted=function(a){return void 0!==a?(this.hasStarted_!==a&&(this.hasStarted_=a,a?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):!!this.hasStarted_},b.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},b.prototype.handleTechWaiting_=function(){var a=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return a.removeClass("vjs-waiting")})},b.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},b.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},b.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},b.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},b.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},b.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&(z["default"].warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},b.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},b.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},b.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},b.prototype.handleTechClick_=function(a){0===a.button&&this.controls()&&(this.paused()?this.play():this.pause())},b.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},b.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},b.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},b.prototype.handleTechTouchEnd_=function(a){a.preventDefault()},b.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},b.prototype.handleStageClick_=function(){this.reportUserActivity()},b.prototype.handleTechFullscreenChange_=function(a,b){b&&this.isFullscreen(b.isFullscreen),this.trigger("fullscreenchange")},b.prototype.handleTechError_=function(){var a=this.tech_.error();this.error(a)},b.prototype.handleTechTextData_=function(){var a=null;arguments.length>1&&(a=arguments[1]),this.trigger("textdata",a)},b.prototype.getCache=function(){return this.cache_},b.prototype.techCall_=function(a,b){if(this.tech_&&!this.tech_.isReady_)this.tech_.ready(function(){this[a](b)},!0);else try{this.tech_&&this.tech_[a](b)}catch(c){throw(0,z["default"])(c),c}},b.prototype.techGet_=function(a){if(this.tech_&&this.tech_.isReady_)try{return this.tech_[a]()}catch(b){throw void 0===this.tech_[a]?(0,z["default"])("Video.js: "+a+" method not defined for "+this.techName_+" playback technology.",b):"TypeError"===b.name?((0,z["default"])("Video.js: "+a+" unavailable on "+this.techName_+" playback technology element.",b),this.tech_.isReady_=!1):(0,z["default"])(b),b}},b.prototype.play=function(){return this.src()||this.currentSrc()?this.techCall_("play"):this.tech_.one("loadstart",function(){this.play()}),this},b.prototype.pause=function(){return this.techCall_("pause"),this},b.prototype.paused=function(){return this.techGet_("paused")!==!1},b.prototype.scrubbing=function(a){return void 0!==a?(this.scrubbing_=!!a,a?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing"),this):this.scrubbing_},b.prototype.currentTime=function(a){return void 0!==a?(this.techCall_("setCurrentTime",a),this):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},b.prototype.duration=function(a){return void 0===a?this.cache_.duration||0:(a=parseFloat(a)||0,a<0&&(a=1/0),a!==this.cache_.duration&&(this.cache_.duration=a,a===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange")),this)},b.prototype.remainingTime=function(){return this.duration()-this.currentTime()},b.prototype.buffered=function c(){var c=this.techGet_("buffered");return c&&c.length||(c=(0,C.createTimeRange)(0,0)),c},b.prototype.bufferedPercent=function(){return(0,D.bufferedPercent)(this.buffered(),this.duration())},b.prototype.bufferedEnd=function(){var a=this.buffered(),b=this.duration(),c=a.end(a.length-1);return c>b&&(c=b),c},b.prototype.volume=function(a){var b=void 0;return void 0!==a?(b=Math.max(0,Math.min(1,parseFloat(a))),this.cache_.volume=b,this.techCall_("setVolume",b),this):(b=parseFloat(this.techGet_("volume")),isNaN(b)?1:b)},b.prototype.muted=function(a){return void 0!==a?(this.techCall_("setMuted",a),this):this.techGet_("muted")||!1},b.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},b.prototype.isFullscreen=function(a){return void 0!==a?(this.isFullscreen_=!!a,this):!!this.isFullscreen_},b.prototype.requestFullscreen=function(){var a=H["default"];return this.isFullscreen(!0),a.requestFullscreen?(p.on(l["default"],a.fullscreenchange,t.bind(this,function b(c){this.isFullscreen(l["default"][a.fullscreenElement]),this.isFullscreen()===!1&&p.off(l["default"],a.fullscreenchange,b),this.trigger("fullscreenchange")})),this.el_[a.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.exitFullscreen=function(){var a=H["default"];return this.isFullscreen(!1),a.requestFullscreen?l["default"][a.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=l["default"].documentElement.style.overflow,p.on(l["default"],"keydown",t.bind(this,this.fullWindowOnEscKey)),l["default"].documentElement.style.overflow="hidden",r.addElClass(l["default"].body,"vjs-full-window"),this.trigger("enterFullWindow")},b.prototype.fullWindowOnEscKey=function(a){27===a.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},b.prototype.exitFullWindow=function(){this.isFullWindow=!1,p.off(l["default"],"keydown",this.fullWindowOnEscKey),l["default"].documentElement.style.overflow=this.docOrigOverflow,r.removeElClass(l["default"].body,"vjs-full-window"),this.trigger("exitFullWindow")},b.prototype.canPlayType=function(a){for(var b=void 0,c=0,d=this.options_.techOrder;c<d.length;c++){var e=(0,B["default"])(d[c]),f=U["default"].getTech(e);if(f||(f=j["default"].getComponent(e)),f){if(f.isSupported()&&(b=f.canPlayType(a)))return b}else z["default"].error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.')}return""},b.prototype.selectSource=function(a){var b=this,c=this.options_.techOrder.map(B["default"]).map(function(a){return[a,U["default"].getTech(a)||j["default"].getComponent(a)]}).filter(function(a){var b=a[0],c=a[1];return c?c.isSupported():(z["default"].error('The "'+b+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),d=function(a,b,c){var d=void 0;return a.some(function(a){return b.some(function(b){if(d=c(a,b))return!0})}),d},e=void 0,f=function(a){return function(b,c){return a(c,b)}},g=function(a,c){var d=a[0];if(a[1].canPlaySource(c,b.options_[d.toLowerCase()]))return{source:c,tech:d}};return e=this.options_.sourceOrder?d(a,c,f(g)):d(c,a,g),e||!1},b.prototype.src=function(a){if(void 0===a)return this.techGet_("src");var b=U["default"].getTech(this.techName_);return b||(b=j["default"].getComponent(this.techName_)),Array.isArray(a)?this.sourceList_(a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!b.canPlaySource(a,this.options_[this.techName_.toLowerCase()])?this.sourceList_([a]):(this.cache_.sources=null,this.cache_.source=a,this.cache_.src=a.src,this.currentType_=a.type||"",this.ready(function(){b.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",a):this.techCall_("src",a.src),"auto"===this.options_.preload&&this.load(),this.options_.autoplay&&this.play()},!0))),this},b.prototype.sourceList_=function(a){var b=this.selectSource(a);b?(b.tech===this.techName_?this.src(b.source):this.loadTech_(b.tech,b.source),this.cache_.sources=a):(this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),this.triggerReady())},b.prototype.load=function(){return this.techCall_("load"),this},b.prototype.reset=function(){return this.loadTech_((0,B["default"])(this.options_.techOrder[0]),null),this.techCall_("reset"),this},b.prototype.currentSources=function(){var a=this.currentSource(),b=[];return 0!==Object.keys(a).length&&b.push(a),this.cache_.sources||b},b.prototype.currentSource=function(){var a={},b=this.currentSrc();return b&&(a.src=b),this.cache_.source||a},b.prototype.currentSrc=function(){return this.techGet_("currentSrc")||this.cache_.src||""},b.prototype.currentType=function(){return this.currentType_||""},b.prototype.preload=function(a){return void 0!==a?(this.techCall_("setPreload",a),this.options_.preload=a,this):this.techGet_("preload")},b.prototype.autoplay=function(a){return void 0!==a?(this.techCall_("setAutoplay",a),this.options_.autoplay=a,this):this.techGet_("autoplay",a)},b.prototype.loop=function(a){return void 0!==a?(this.techCall_("setLoop",a),this.options_.loop=a,this):this.techGet_("loop")},b.prototype.poster=function(a){return void 0===a?this.poster_:(a||(a=""),this.poster_=a,this.techCall_("setPoster",a),this.trigger("posterchange"),this)},b.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},b.prototype.controls=function(a){return void 0!==a?(a=!!a,this.controls_!==a&&(this.controls_=a,this.usingNativeControls()&&this.techCall_("setControls",a),a?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_())),this):!!this.controls_},b.prototype.usingNativeControls=function(a){return void 0!==a?(a=!!a,this.usingNativeControls_!==a&&(this.usingNativeControls_=a,a?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):!!this.usingNativeControls_},b.prototype.error=function(a){return void 0===a?this.error_||null:null===a?(this.error_=a,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close(),this):(this.error_=new J["default"](a),this.addClass("vjs-error"),z["default"].error("(CODE:"+this.error_.code+" "+J["default"].errorTypes[this.error_.code]+")",this.error_.message,this.error_),this.trigger("error"),this)},b.prototype.reportUserActivity=function(a){this.userActivity_=!0},b.prototype.userActive=function(a){return void 0!==a?(a=!!a,a!==this.userActive_&&(this.userActive_=a,a?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech_&&this.tech_.one("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},b.prototype.listenForUserActivity_=function(){var a=void 0,b=void 0,c=void 0,d=t.bind(this,this.reportUserActivity),e=function(a){a.screenX===b&&a.screenY===c||(b=a.screenX,c=a.screenY,d())},f=function(){d(),this.clearInterval(a),a=this.setInterval(d,250)},g=function(b){d(),this.clearInterval(a)};this.on("mousedown",f),this.on("mousemove",e),this.on("mouseup",g),this.on("keydown",d),this.on("keyup",d);var h=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(h);var a=this.options_.inactivityTimeout;a>0&&(h=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},a))}},250)},b.prototype.playbackRate=function(a){return void 0!==a?(this.techCall_("setPlaybackRate",a),this):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},b.prototype.isAudio=function(a){return void 0!==a?(this.isAudio_=!!a,this):!!this.isAudio_},b.prototype.videoTracks=function(){return this.tech_?this.tech_.videoTracks():(this.videoTracks_=this.videoTracks_||new Y["default"],this.videoTracks_)},b.prototype.audioTracks=function(){return this.tech_?this.tech_.audioTracks():(this.audioTracks_=this.audioTracks_||new W["default"],this.audioTracks_)},b.prototype.textTracks=function(){if(this.tech_)return this.tech_.textTracks()},b.prototype.remoteTextTracks=function(){if(this.tech_)return this.tech_.remoteTextTracks()},b.prototype.remoteTextTrackEls=function(){if(this.tech_)return this.tech_.remoteTextTrackEls()},b.prototype.addTextTrack=function(a,b,c){if(this.tech_)return this.tech_.addTextTrack(a,b,c)},b.prototype.addRemoteTextTrack=function(a,b){if(this.tech_)return this.tech_.addRemoteTextTrack(a,b)},b.prototype.removeRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=a.track,c=void 0===b?arguments[0]:b;if(this.tech_)return this.tech_.removeRemoteTextTrack(c)},b.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},b.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},b.prototype.language=function(a){return void 0===a?this.language_:(this.language_=String(a).toLowerCase(),this)},b.prototype.languages=function(){return(0,O["default"])(b.prototype.options_.languages,this.languages_)},b.prototype.toJSON=function(){var a=(0,O["default"])(this.options_),b=a.tracks;a.tracks=[];for(var c=0;c<b.length;c++){var d=b[c];d=(0,O["default"])(d),d.player=void 0,a.tracks[c]=d}return a},b.prototype.createModal=function(a,b){var c=this;b=b||{},b.content=a||"";var d=new S["default"](this,b);return this.addChild(d),d.on("dispose",function(){c.removeChild(d)}),d.open()},b.getTagSettings=function(a){var b={sources:[],tracks:[]},c=r.getElAttributes(a),d=c["data-setup"];if(r.hasElClass(a,"vjs-fluid")&&(c.fluid=!0),null!==d){var e=(0,L["default"])(d||"{}"),f=e[0],g=e[1];f&&z["default"].error(f),(0,M.assign)(c,g)}if((0,M.assign)(b,c),a.hasChildNodes())for(var h=a.childNodes,i=0,j=h.length;i<j;i++){var k=h[i],l=k.nodeName.toLowerCase();"source"===l?b.sources.push(r.getElAttributes(k)):"track"===l&&b.tracks.push(r.getElAttributes(k))}return b},b.prototype.flexNotSupported_=function(){var a=l["default"].createElement("i");return!("flexBasis"in a.style||"webkitFlexBasis"in a.style||"mozFlexBasis"in a.style||"msFlexBasis"in a.style||"msFlexOrder"in a.style)},b}(j["default"]);$.players={};var _=n["default"].navigator;$.prototype.options_={techOrder:["html5","flash"],html5:{},flash:{},defaultVolume:0,inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:_&&(_.languages&&_.languages[0]||_.userLanguage||_.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media."},["ended","seeking","seekable","networkState","readyState"].forEach(function(a){$.prototype[a]=function(){return this.techGet_(a)}}),Z.forEach(function(a){$.prototype["handleTech"+(0,B["default"])(a)+"_"]=function(){return this.trigger(a)}}),j["default"].registerComponent("Player",$),c["default"]=$},{1:1,4:4,41:41,44:44,45:45,46:46,5:5,50:50,55:55,59:59,60:60,61:61,62:62,63:63,68:68,69:69,71:71,76:76,78:78,79:79,8:8,81:81,82:82,83:83,85:85,86:86,87:87,88:88,89:89,90:90,91:91,94:94,95:95,97:97}],52:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a(51),f=d(e),g=function(a,b){f["default"].prototype[a]=b};c["default"]=g},{51:51}],53:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b);var g=f(this,a.call(this,c,d));return g.update(),g}return g(b,a),b.prototype.update=function(){var a=this.createPopup();this.popup&&this.removeChild(this.popup),this.popup=a,this.addChild(a),this.items&&0===this.items.length?this.hide():this.items&&this.items.length>1&&this.show()},b.prototype.createPopup=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);k["default"].registerComponent("PopupButton",l),c["default"]=l},{3:3,5:5}],54:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(){return f(this,b),g(this,a.apply(this,arguments))}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"});var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b}(j["default"]);j["default"].registerComponent("Popup",q),c["default"]=q},{5:5,81:81,82:82,83:83}],55:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(81),p=d(o),q=a(78),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.update(),
c.on("posterchange",n.bind(e,e.update)),e}return h(b,a),b.prototype.dispose=function(){this.player().off("posterchange",this.update),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=p.createEl("div",{className:"vjs-poster",tabIndex:-1});return r.BACKGROUND_SIZE_SUPPORTED||(this.fallbackImg_=p.createEl("img"),a.appendChild(this.fallbackImg_)),a},b.prototype.update=function(a){var b=this.player().poster();this.setSrc(b),b?this.show():this.hide()},b.prototype.setSrc=function(a){if(this.fallbackImg_)this.fallbackImg_.src=a;else{var b="";a&&(b='url("'+a+'")'),this.el_.style.backgroundImage=b}},b.prototype.handleClick=function(a){this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause())},b}(j["default"]);l["default"].registerComponent("PosterImage",s),c["default"]=s},{3:3,5:5,78:78,81:81,83:83}],56:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){b&&(p=b),n["default"].setTimeout(q,a)}c.__esModule=!0,c.hasLoaded=c.autoSetupTimeout=c.autoSetup=void 0;var g=a(81),h=e(g),i=a(82),j=e(i),k=a(94),l=d(k),m=a(95),n=d(m),o=!1,p=void 0,q=function(){if(h.isReal()){var a=l["default"].getElementsByTagName("video"),b=l["default"].getElementsByTagName("audio"),c=[];if(a&&a.length>0)for(var d=0,e=a.length;d<e;d++)c.push(a[d]);if(b&&b.length>0)for(var g=0,i=b.length;g<i;g++)c.push(b[g]);if(c&&c.length>0)for(var j=0,k=c.length;j<k;j++){var m=c[j];if(!m||!m.getAttribute){f(1);break}if(void 0===m.player){var n=m.getAttribute("data-setup");null!==n&&p(m)}}else o||f(1)}};h.isReal()&&"complete"===l["default"].readyState?o=!0:j.one(n["default"],"load",function(){o=!0});var r=function(){return o};c.autoSetup=q,c.autoSetupTimeout=f,c.hasLoaded=r},{81:81,82:82,94:94,95:95}],57:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(88),n=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.bar=e.getChild(e.options_.barName),e.vertical(!!e.options_.vertical),e.on("mousedown",e.handleMouseDown),e.on("touchstart",e.handleMouseDown),e.on("focus",e.handleFocus),e.on("blur",e.handleBlur),e.on("click",e.handleClick),e.on(c,"controlsvisible",e.update),e.on(c,e.playerEvent,e.update),e}return h(b,a),b.prototype.createEl=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return c.className=c.className+" vjs-slider",c=(0,m.assign)({tabIndex:0},c),d=(0,m.assign)({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},d),a.prototype.createEl.call(this,b,c,d)},b.prototype.handleMouseDown=function(a){var b=this.bar.el_.ownerDocument;a.preventDefault(),l.blockTextSelection(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(b,"mousemove",this.handleMouseMove),this.on(b,"mouseup",this.handleMouseUp),this.on(b,"touchmove",this.handleMouseMove),this.on(b,"touchend",this.handleMouseUp),this.handleMouseMove(a)},b.prototype.handleMouseMove=function(a){},b.prototype.handleMouseUp=function(){var a=this.bar.el_.ownerDocument;l.unblockTextSelection(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(a,"mousemove",this.handleMouseMove),this.off(a,"mouseup",this.handleMouseUp),this.off(a,"touchmove",this.handleMouseMove),this.off(a,"touchend",this.handleMouseUp),this.update()},b.prototype.update=function(){if(this.el_){var a=this.getPercent(),b=this.bar;if(b){("number"!=typeof a||a!==a||a<0||a===1/0)&&(a=0);var c=(100*a).toFixed(2)+"%";this.vertical()?b.el().style.height=c:b.el().style.width=c}}},b.prototype.calculateDistance=function(a){var b=l.getPointerPosition(this.el_,a);return this.vertical()?b.y:b.x},b.prototype.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepBack()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepForward())},b.prototype.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleClick=function(a){a.stopImmediatePropagation(),a.preventDefault()},b.prototype.vertical=function(a){return void 0===a?this.vertical_||!1:(this.vertical_=!!a,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal"),this)},b}(j["default"]);j["default"].registerComponent("Slider",n),c["default"]=n},{5:5,81:81,88:88}],58:[function(a,b,c){"use strict";function d(a){return a.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},a.streamFromParts=function(a,b){return a+"&"+b},a.streamToParts=function(a){var b={connection:"",stream:""};if(!a)return b;var c=a.search(/&(?!\w+=)/),d=void 0;return c!==-1?d=c+1:(c=d=a.lastIndexOf("/")+1,0===c&&(c=d=a.length)),b.connection=a.substring(0,c),b.stream=a.substring(d,a.length),b},a.isStreamingType=function(b){return b in a.streamingFormats},a.RTMP_RE=/^rtmp[set]?:\/\//i,a.isStreamingSrc=function(b){return a.RTMP_RE.test(b)},a.rtmpSourceHandler={},a.rtmpSourceHandler.canPlayType=function(b){return a.isStreamingType(b)?"maybe":""},a.rtmpSourceHandler.canHandleSource=function(b,c){var d=a.rtmpSourceHandler.canPlayType(b.type);return d?d:a.isStreamingSrc(b.src)?"maybe":""},a.rtmpSourceHandler.handleSource=function(b,c,d){var e=a.streamToParts(b.src);c.setRtmpConnection(e.connection),c.setRtmpStream(e.stream)},a.registerSourceHandler(a.rtmpSourceHandler),a}c.__esModule=!0,c["default"]=d},{}],59:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a){A["set"+(a.charAt(0).toUpperCase()+a.slice(1))]=function(b){return this.el_.vjs_setProperty(a,b)}}function j(a){A[a]=function(){return this.el_.vjs_getProperty(a)}}c.__esModule=!0;for(var k=a(62),l=e(k),m=a(81),n=d(m),o=a(92),p=d(o),q=a(90),r=a(58),s=e(r),t=a(5),u=e(t),v=a(95),w=e(v),x=a(88),y=w["default"].navigator,z=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return c.source&&e.ready(function(){this.setSource(c.source)},!0),c.startTime&&e.ready(function(){this.load(),this.play(),this.currentTime(c.startTime)},!0),w["default"].videojs=w["default"].videojs||{},w["default"].videojs.Flash=w["default"].videojs.Flash||{},w["default"].videojs.Flash.onReady=b.onReady,w["default"].videojs.Flash.onEvent=b.onEvent,w["default"].videojs.Flash.onError=b.onError,e.on("seeked",function(){this.lastSeekTarget_=void 0}),e}return h(b,a),b.prototype.createEl=function(){var a=this.options_;if(!a.swf){a.swf="//vjs.zencdn.net/swf/5.3.0/video-js.swf"}var c=a.techId,d=(0,x.assign)({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.preload,loop:a.loop,muted:a.muted},a.flashVars),e=(0,x.assign)({wmode:"opaque",bgcolor:"#000000"},a.params),f=(0,x.assign)({id:c,name:c,"class":"vjs-tech"},a.attributes);return this.el_=b.embed(a.swf,d,e,f),this.el_.tech=this,this.el_},b.prototype.play=function(){this.ended()&&this.setCurrentTime(0),this.el_.vjs_play()},b.prototype.pause=function(){this.el_.vjs_pause()},b.prototype.src=function(a){return void 0===a?this.currentSrc():this.setSrc(a)},b.prototype.setSrc=function(a){var b=this;a=p.getAbsoluteURL(a),this.el_.vjs_src(a),this.autoplay()&&this.setTimeout(function(){return b.play()},0)},b.prototype.seeking=function(){return void 0!==this.lastSeekTarget_},b.prototype.setCurrentTime=function(b){var c=this.seekable();c.length&&(b=b>c.start(0)?b:c.start(0),b=b<c.end(c.length-1)?b:c.end(c.length-1),this.lastSeekTarget_=b,this.trigger("seeking"),this.el_.vjs_setProperty("currentTime",b),a.prototype.setCurrentTime.call(this))},b.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},b.prototype.duration=function c(){if(0===this.readyState())return NaN;var c=this.el_.vjs_getProperty("duration");return c>=0?c:1/0},b.prototype.load=function(){this.el_.vjs_load()},b.prototype.poster=function(){this.el_.vjs_getProperty("poster")},b.prototype.setPoster=function(){},b.prototype.seekable=function(){var a=this.duration();return 0===a?(0,q.createTimeRange)():(0,q.createTimeRange)(0,a)},b.prototype.buffered=function(){var a=this.el_.vjs_getProperty("buffered");return 0===a.length?(0,q.createTimeRange)():(0,q.createTimeRange)(a[0][0],a[0][1])},b.prototype.supportsFullScreen=function(){return!1},b.prototype.enterFullScreen=function(){return!1},b}(l["default"]),A=z.prototype,B="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),C="networkState,readyState,initialTime,startOffsetTime,paused,ended,videoWidth,videoHeight".split(","),D=0;D<B.length;D++)j(B[D]),i(B[D]);for(var E=0;E<C.length;E++)j(C[E]);z.isSupported=function(){return z.version()[0]>=10},l["default"].withSourceHandlers(z),z.nativeSourceHandler={},z.nativeSourceHandler.canPlayType=function(a){return a in z.formats?"maybe":""},z.nativeSourceHandler.canHandleSource=function(a,b){function c(a){var b=p.getFileExtension(a);return b?"video/"+b:""}var d=void 0;return d=a.type?a.type.replace(/;.*/,"").toLowerCase():c(a.src),z.nativeSourceHandler.canPlayType(d)},z.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},z.nativeSourceHandler.dispose=function(){},z.registerSourceHandler(z.nativeSourceHandler),z.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},z.onReady=function(a){var b=n.getEl(a),c=b&&b.tech;c&&c.el()&&z.checkReady(c)},z.checkReady=function(a){a.el()&&(a.el().vjs_getProperty?a.triggerReady():this.setTimeout(function(){z.checkReady(a)},50))},z.onEvent=function(a,b){var c=n.getEl(a).tech,d=Array.prototype.slice.call(arguments,2);c.setTimeout(function(){c.trigger(b,d)},1)},z.onError=function(a,b){var c=n.getEl(a).tech;if("srcnotfound"===b)return c.error(4);c.error("FLASH: "+b)},z.version=function(){var a="0,0,0";try{a=new w["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{y.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(y.plugins["Shockwave Flash 2.0"]||y.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},z.embed=function(a,b,c,d){var e=z.getEmbedCode(a,b,c,d);return n.createEl("div",{innerHTML:e}).childNodes[0]},z.getEmbedCode=function(a,b,c,d){var e="",f="",g="";return b&&Object.getOwnPropertyNames(b).forEach(function(a){e+=a+"="+b[a]+"&amp;"}),c=(0,x.assign)({movie:a,flashvars:e,allowScriptAccess:"always",allowNetworking:"all"},c),Object.getOwnPropertyNames(c).forEach(function(a){f+='<param name="'+a+'" value="'+c[a]+'" />'}),d=(0,x.assign)({data:a,width:"100%",height:"100%"},d),Object.getOwnPropertyNames(d).forEach(function(a){g+=a+'="'+d[a]+'" '}),'<object type="application/x-shockwave-flash" '+g+">"+f+"</object>"},(0,s["default"])(z),u["default"].registerComponent("Flash",z),l["default"].registerTech("Flash",z),c["default"]=z},{5:5,58:58,62:62,81:81,88:88,90:90,92:92,95:95}],60:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function h(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function i(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var j=f(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."],["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),k=a(62),l=e(k),m=a(5),n=e(m),o=a(81),p=d(o),q=a(92),r=d(q),s=a(83),t=d(s),u=a(86),v=e(u),w=a(98),x=e(w),y=a(78),z=d(y),A=a(94),B=e(A),C=a(95),D=e(C),E=a(88),F=a(87),G=e(F),H=a(91),I=e(H),J=function(a){function b(c,d){g(this,b);var e=h(this,a.call(this,c,d)),f=c.source,i=!1;if(f&&(e.el_.currentSrc!==f.src||c.tag&&3===c.tag.initNetworkState_)?e.setSource(f):e.handleLateInit_(e.el_),e.el_.hasChildNodes()){for(var k=e.el_.childNodes,l=k.length,m=[];l--;){var n=k[l];"track"===n.nodeName.toLowerCase()&&(e.featuresNativeTextTracks?(e.remoteTextTrackEls().addTrackElement_(n),e.remoteTextTracks().addTrack_(n.track),i||e.el_.hasAttribute("crossorigin")||!r.isCrossOrigin(n.src)||(i=!0)):m.push(n))}for(var o=0;o<m.length;o++)e.el_.removeChild(m[o])}return["audio","video"].forEach(function(a){var b=e.el()[a+"Tracks"],c=e[a+"Tracks"](),d=(0,I["default"])(a);e["featuresNative"+d+"Tracks"]&&b&&b.addEventListener&&(e["handle"+d+"TrackChange_"]=function(a){c.trigger({type:"change",target:c,currentTarget:c,srcElement:c})},e["handle"+d+"TrackAdd_"]=function(a){return c.addTrack(a.track)},e["handle"+d+"TrackRemove_"]=function(a){return c.removeTrack(a.track)},b.addEventListener("change",e["handle"+d+"TrackChange_"]),b.addEventListener("addtrack",e["handle"+d+"TrackAdd_"]),b.addEventListener("removetrack",e["handle"+d+"TrackRemove_"]),e["removeOld"+d+"Tracks_"]=function(a){return e.removeOldTracks_(c,b)},e.on("loadstart",e["removeOld"+d+"Tracks_"]))}),e.featuresNativeTextTracks&&(i&&v["default"].warn((0,x["default"])(j)),e.handleTextTrackChange_=t.bind(e,e.handleTextTrackChange),e.handleTextTrackAdd_=t.bind(e,e.handleTextTrackAdd),e.handleTextTrackRemove_=t.bind(e,e.handleTextTrackRemove),e.proxyNativeTextTracks_()),(z.TOUCH_ENABLED||z.IS_IPHONE||z.IS_NATIVE_ANDROID)&&c.nativeControlsForTouch===!0&&e.setControls(!0),e.proxyWebkitFullscreen_(),e.triggerReady(),e}return i(b,a),b.prototype.dispose=function(){var c=this;["audio","video","text"].forEach(function(a){var b=(0,I["default"])(a),d=c.el_[a+"Tracks"];d&&d.removeEventListener&&(d.removeEventListener("change",c["handle"+b+"TrackChange_"]),d.removeEventListener("addtrack",c["handle"+b+"TrackAdd_"]),d.removeEventListener("removetrack",c["handle"+b+"TrackRemove_"])),d&&c.off("loadstart",c["removeOld"+b+"Tracks_"])}),b.disposeMediaElement(this.el_),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=this.options_.tag;if(!a||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(a){var c=a.cloneNode(!0);a.parentNode&&a.parentNode.insertBefore(c,a),b.disposeMediaElement(a),a=c}else{a=B["default"].createElement("video");var d=this.options_.tag&&p.getElAttributes(this.options_.tag),e=(0,G["default"])({},d);z.TOUCH_ENABLED&&this.options_.nativeControlsForTouch===!0||delete e.controls,p.setElAttributes(a,(0,E.assign)(e,{id:this.options_.techId,"class":"vjs-tech"}))}a.playerId=this.options_.playerId}for(var f=["autoplay","preload","loop","muted"],g=f.length-1;g>=0;g--){var h=f[g],i={};"undefined"!=typeof this.options_[h]&&(i[h]=this.options_[h]),p.setElAttributes(a,i)}return a},b.prototype.handleLateInit_=function(a){if(0!==a.networkState&&3!==a.networkState){if(0===a.readyState){var b=!1,c=function(){b=!0};this.on("loadstart",c);var d=function(){b||this.trigger("loadstart")};return this.on("loadedmetadata",d),void this.ready(function(){this.off("loadstart",c),this.off("loadedmetadata",d),b||this.trigger("loadstart")})}var e=["loadstart"];e.push("loadedmetadata"),a.readyState>=2&&e.push("loadeddata"),a.readyState>=3&&e.push("canplay"),a.readyState>=4&&e.push("canplaythrough"),this.ready(function(){e.forEach(function(a){this.trigger(a)},this)})}},b.prototype.proxyNativeTextTracks_=function(){var a=this.el().textTracks;if(a){for(var b=0;b<a.length;b++)this.textTracks().addTrack_(a[b]);a.addEventListener&&(a.addEventListener("change",this.handleTextTrackChange_),a.addEventListener("addtrack",this.handleTextTrackAdd_),a.addEventListener("removetrack",this.handleTextTrackRemove_)),this.on("loadstart",this.removeOldTextTracks_)}},b.prototype.handleTextTrackChange=function(a){var b=this.textTracks();this.textTracks().trigger({type:"change",target:b,currentTarget:b,srcElement:b})},b.prototype.handleTextTrackAdd=function(a){this.textTracks().addTrack_(a.track)},b.prototype.handleTextTrackRemove=function(a){this.textTracks().removeTrack_(a.track)},b.prototype.removeOldTracks_=function(a,b){var c=[];if(b){for(var d=0;d<a.length;d++){for(var e=a[d],f=!1,g=0;g<b.length;g++)if(b[g]===e){f=!0;break}f||c.push(e)}for(var h=0;h<c.length;h++){var i=c[h];a.removeTrack_(i)}}},b.prototype.removeOldTextTracks_=function(a){var b=this.textTracks(),c=this.el().textTracks;this.removeOldTracks_(b,c)},b.prototype.play=function(){var a=this.el_.play();void 0!==a&&"function"==typeof a.then&&a.then(null,function(a){})},b.prototype.setCurrentTime=function(a){try{this.el_.currentTime=a}catch(b){(0,v["default"])(b,"Video is not ready. (Video.js)")}},b.prototype.duration=function(){var a=this;if(this.el_.duration===1/0&&z.IS_ANDROID&&z.IS_CHROME&&0===this.el_.currentTime){var b=function c(){a.el_.currentTime>0&&(a.el_.duration===1/0&&a.trigger("durationchange"),a.off("timeupdate",c))};return this.on("timeupdate",b),NaN}return this.el_.duration||NaN},b.prototype.width=function(){return this.el_.offsetWidth},b.prototype.height=function(){return this.el_.offsetHeight},b.prototype.proxyWebkitFullscreen_=function(){var a=this;if("webkitDisplayingFullscreen"in this.el_){var b=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},c=function(){this.one("webkitendfullscreen",b),this.trigger("fullscreenchange",{isFullscreen:!0})};this.on("webkitbeginfullscreen",c),this.on("dispose",function(){a.off("webkitbeginfullscreen",c),a.off("webkitendfullscreen",b)})}},b.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var a=D["default"].navigator&&D["default"].navigator.userAgent||"";if(/Android/.test(a)||!/Chrome|Mac OS X 10.5/.test(a))return!0}return!1},b.prototype.enterFullScreen=function(){var a=this.el_;a.paused&&a.networkState<=a.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},b.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},b.prototype.src=function(a){if(void 0===a)return this.el_.src;this.setSrc(a)},b.prototype.reset=function(){b.resetMediaElement(this.el_)},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},b.prototype.setControls=function(a){this.el_.controls=!!a},b.prototype.addTextTrack=function(b,c,d){return this.featuresNativeTextTracks?this.el_.addTextTrack(b,c,d):a.prototype.addTextTrack.call(this,b,c,d)},b.prototype.createRemoteTextTrack=function(b){if(!this.featuresNativeTextTracks)return a.prototype.createRemoteTextTrack.call(this,b);var c=B["default"].createElement("track");return b.kind&&(c.kind=b.kind),b.label&&(c.label=b.label),(b.language||b.srclang)&&(c.srclang=b.language||b.srclang),b["default"]&&(c["default"]=b["default"]),b.id&&(c.id=b.id),b.src&&(c.src=b.src),c},b.prototype.addRemoteTextTrack=function(b,c){var d=a.prototype.addRemoteTextTrack.call(this,b,c);return this.featuresNativeTextTracks&&this.el().appendChild(d),d},b.prototype.removeRemoteTextTrack=function(b){if(a.prototype.removeRemoteTextTrack.call(this,b),this.featuresNativeTextTracks)for(var c=this.$$("track"),d=c.length;d--;)b!==c[d]&&b!==c[d].track||this.el().removeChild(c[d])},b}(l["default"]);if(p.isReal()){J.TEST_VID=B["default"].createElement("video");var K=B["default"].createElement("track");K.kind="captions",K.srclang="en",K.label="English",J.TEST_VID.appendChild(K)}J.isSupported=function(){try{J.TEST_VID.volume=.5}catch(a){return!1}return!(!J.TEST_VID||!J.TEST_VID.canPlayType)},J.canControlVolume=function(){try{var a=J.TEST_VID.volume;return J.TEST_VID.volume=a/2+.1,a!==J.TEST_VID.volume}catch(b){return!1}},J.canControlPlaybackRate=function(){if(z.IS_ANDROID&&z.IS_CHROME)return!1;try{var a=J.TEST_VID.playbackRate;return J.TEST_VID.playbackRate=a/2+.1,a!==J.TEST_VID.playbackRate}catch(b){return!1}},J.supportsNativeTextTracks=function(){return z.IS_ANY_SAFARI},J.supportsNativeVideoTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.videoTracks)},J.supportsNativeAudioTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.audioTracks)},J.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","volumechange"],J.prototype.featuresVolumeControl=J.canControlVolume(),J.prototype.featuresPlaybackRate=J.canControlPlaybackRate(),J.prototype.movingMediaElementInDOM=!z.IS_IOS,J.prototype.featuresFullscreenResize=!0,J.prototype.featuresProgressEvents=!0,J.prototype.featuresTimeupdateEvents=!0,J.prototype.featuresNativeTextTracks=J.supportsNativeTextTracks(),J.prototype.featuresNativeVideoTracks=J.supportsNativeVideoTracks(),J.prototype.featuresNativeAudioTracks=J.supportsNativeAudioTracks();var L=J.TEST_VID&&J.TEST_VID.constructor.prototype.canPlayType,M=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,N=/^video\/mp4/i;J.patchCanPlayType=function(){z.ANDROID_VERSION>=4&&!z.IS_FIREFOX?J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&M.test(a)?"maybe":L.call(this,a)}:z.IS_OLD_ANDROID&&(J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&N.test(a)?"maybe":L.call(this,a)})},J.unpatchCanPlayType=function(){var a=J.TEST_VID.constructor.prototype.canPlayType;return J.TEST_VID.constructor.prototype.canPlayType=L,a},J.patchCanPlayType(),J.disposeMediaElement=function(a){if(a){for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},J.resetMediaElement=function(a){if(a){for(var b=a.querySelectorAll("source"),c=b.length;c--;)a.removeChild(b[c]);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},["paused","currentTime","buffered","volume","muted","poster","preload","autoplay","controls","loop","error","seeking","seekable","ended","defaultMuted","playbackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]}}),["volume","muted","src","poster","preload","autoplay","loop","playbackRate"].forEach(function(a){J.prototype["set"+(0,I["default"])(a)]=function(b){this.el_[a]=b}}),["pause","load"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]()}}),l["default"].withSourceHandlers(J),J.nativeSourceHandler={},J.nativeSourceHandler.canPlayType=function(a){try{return J.TEST_VID.canPlayType(a)}catch(b){return""}},J.nativeSourceHandler.canHandleSource=function(a,b){if(a.type)return J.nativeSourceHandler.canPlayType(a.type);if(a.src){var c=r.getFileExtension(a.src);return J.nativeSourceHandler.canPlayType("video/"+c)}return""},J.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},J.nativeSourceHandler.dispose=function(){},J.registerSourceHandler(J.nativeSourceHandler),n["default"].registerComponent("Html5",J),l["default"].registerTech("Html5",J),c["default"]=J},{5:5,62:62,78:78,81:81,83:83,86:86,87:87,88:88,91:91,92:92,94:94,95:95,98:98}],61:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(62),k=d(j),l=a(91),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));if(d.playerOptions.sources&&0!==d.playerOptions.sources.length)c.src(d.playerOptions.sources);else for(var j=0,l=d.playerOptions.techOrder;j<l.length;j++){var n=(0,m["default"])(l[j]),o=k["default"].getTech(n);if(n||(o=i["default"].getComponent(n)),o&&o.isSupported()){c.loadTech_(n);break}}return h}return g(b,a),b}(i["default"]);i["default"].registerComponent("MediaLoader",n),c["default"]=n},{5:5,62:62,91:91}],62:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b,c,d){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},f=a.textTracks();e.kind=b,c&&(e.label=c),d&&(e.language=d),e.tech=a;var g=new s["default"](e);return f.addTrack_(g),g}c.__esModule=!0;var j=a(5),k=e(j),l=a(66),m=e(l),n=a(65),o=e(n),p=a(87),q=e(p),r=a(72),s=e(r),t=a(70),u=e(t),v=a(76),w=e(v),x=a(63),y=e(x),z=a(83),A=d(z),B=a(86),C=e(B),D=a(90),E=a(79),F=a(46),G=e(F),H=a(95),I=e(H),J=a(94),K=e(J),L=a(88),M=function(b){function c(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};f(this,c),a.reportTouchActivity=!1;var e=g(this,b.call(this,null,a,d));return e.hasStarted_=!1,e.on("playing",function(){this.hasStarted_=!0}),e.on("loadstart",function(){this.hasStarted_=!1}),e.textTracks_=a.textTracks,e.videoTracks_=a.videoTracks,e.audioTracks_=a.audioTracks,e.featuresProgressEvents||e.manualProgressOn(),e.featuresTimeupdateEvents||e.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(b){a["native"+b+"Tracks"]===!1&&(e["featuresNative"+b+"Tracks"]=!1)}),a.nativeCaptions===!1&&(e.featuresNativeTextTracks=!1),e.featuresNativeTextTracks||e.emulateTextTracks(),e.autoRemoteTextTracks_=new u["default"],e.initTextTrackListeners(),e.initTrackListeners(),a.nativeControlsForTouch||e.emitTapEvents(),e.constructor&&(e.name_=e.constructor.name||"Unknown Tech"),e}return h(c,b),c.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},c.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},c.prototype.trackProgress=function(a){this.stopTrackingProgress(),this.progressInterval=this.setInterval(A.bind(this,function(){var a=this.bufferedPercent();this.bufferedPercent_!==a&&this.trigger("progress"),this.bufferedPercent_=a,1===a&&this.stopTrackingProgress()}),500)},c.prototype.onDurationChange=function(a){this.duration_=this.duration()},c.prototype.buffered=function(){return(0,D.createTimeRange)(0,0)},c.prototype.bufferedPercent=function(){return(0,E.bufferedPercent)(this.buffered(),this.duration_)},c.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},c.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},c.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},c.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},c.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.dispose=function(){this.clearTracks(["audio","video","text"]),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),b.prototype.dispose.call(this)},c.prototype.clearTracks=function(a){var b=this;a=[].concat(a),a.forEach(function(a){for(var c=b[a+"Tracks"]()||[],d=c.length;d--;){var e=c[d];"text"===a&&b.removeRemoteTextTrack(e),c.removeTrack_(e)}})},c.prototype.cleanupAutoTextTracks=function(){for(var a=this.autoRemoteTextTracks_||[],b=a.length;b--;){var c=a[b];this.removeRemoteTextTrack(c)}},c.prototype.reset=function(){},c.prototype.error=function(a){return void 0!==a&&(this.error_=new G["default"](a),this.trigger("error")),this.error_},c.prototype.played=function(){return this.hasStarted_?(0,D.createTimeRange)(0,0):(0,D.createTimeRange)()},c.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.initTextTrackListeners=function(){var a=A.bind(this,function(){this.trigger("texttrackchange")}),b=this.textTracks();b&&(b.addEventListener("removetrack",a),b.addEventListener("addtrack",a),this.on("dispose",A.bind(this,function(){b.removeEventListener("removetrack",a),b.removeEventListener("addtrack",a)})))},c.prototype.initTrackListeners=function(){var a=this;["video","audio"].forEach(function(b){var c=function(){a.trigger(b+"trackchange")},d=a[b+"Tracks"]();d.addEventListener("removetrack",c),
d.addEventListener("addtrack",c),a.on("dispose",function(){d.removeEventListener("removetrack",c),d.removeEventListener("addtrack",c)})})},c.prototype.addWebVttScript_=function(){var b=this;if(!I["default"].WebVTT)if(K["default"].body.contains(this.el())){var c=a(105);if(!this.options_["vtt.js"]&&(0,L.isPlain)(c)&&Object.keys(c).length>0)return void this.trigger("vttjsloaded");var d=K["default"].createElement("script");d.src=this.options_["vtt.js"]||"https://cdn.rawgit.com/gkatsev/vtt.js/vjs-v0.12.1/dist/vtt.min.js",d.onload=function(){b.trigger("vttjsloaded")},d.onerror=function(){b.trigger("vttjserror")},this.on("dispose",function(){d.onload=null,d.onerror=null}),I["default"].WebVTT=!0,this.el().parentNode.appendChild(d)}else this.ready(this.addWebVttScript_)},c.prototype.emulateTextTracks=function(){var a=this,b=this.textTracks();if(b){var c=this.remoteTextTracks(),d=function(a){return b.addTrack_(a.track)},e=function(a){return b.removeTrack_(a.track)};c.on("addtrack",d),c.on("removetrack",e),this.addWebVttScript_();var f=function(){return a.trigger("texttrackchange")},g=function(){f();for(var a=0;a<b.length;a++){var c=b[a];c.removeEventListener("cuechange",f),"showing"===c.mode&&c.addEventListener("cuechange",f)}};g(),b.addEventListener("change",g),this.on("dispose",function(){c.off("addtrack",d),c.off("removetrack",e),b.removeEventListener("change",g);for(var a=0;a<b.length;a++){b[a].removeEventListener("cuechange",f)}})}},c.prototype.videoTracks=function(){return this.videoTracks_=this.videoTracks_||new w["default"],this.videoTracks_},c.prototype.audioTracks=function(){return this.audioTracks_=this.audioTracks_||new y["default"],this.audioTracks_},c.prototype.textTracks=function(){return this.textTracks_=this.textTracks_||new u["default"],this.textTracks_},c.prototype.remoteTextTracks=function(){return this.remoteTextTracks_=this.remoteTextTracks_||new u["default"],this.remoteTextTracks_},c.prototype.remoteTextTrackEls=function(){return this.remoteTextTrackEls_=this.remoteTextTrackEls_||new o["default"],this.remoteTextTrackEls_},c.prototype.addTextTrack=function(a,b,c){if(!a)throw new Error("TextTrack kind is required but was not provided");return i(this,a,b,c)},c.prototype.createRemoteTextTrack=function(a){var b=(0,q["default"])(a,{tech:this});return new m["default"](b)},c.prototype.addRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=arguments[1],c=this.createRemoteTextTrack(a);return b!==!0&&b!==!1&&(C["default"].warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),b=!0),this.remoteTextTrackEls().addTrackElement_(c),this.remoteTextTracks().addTrack_(c.track),b!==!0&&this.autoRemoteTextTracks_.addTrack_(c.track),c},c.prototype.removeRemoteTextTrack=function(a){var b=this.remoteTextTrackEls().getTrackElementByTrack_(a);this.remoteTextTrackEls().removeTrackElement_(b),this.remoteTextTracks().removeTrack_(a),this.autoRemoteTextTracks_.removeTrack_(a)},c.prototype.setPoster=function(){},c.prototype.canPlayType=function(){return""},c.isTech=function(a){return a.prototype instanceof c||a instanceof c||a===c},c.registerTech=function(a,b){if(c.techs_||(c.techs_={}),!c.isTech(b))throw new Error("Tech "+a+" must be a Tech");return c.techs_[a]=b,b},c.getTech=function(a){return c.techs_&&c.techs_[a]?c.techs_[a]:I["default"]&&I["default"].videojs&&I["default"].videojs[a]?(C["default"].warn("The "+a+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),I["default"].videojs[a]):void 0},c}(k["default"]);M.prototype.textTracks_,M.prototype.audioTracks_,M.prototype.videoTracks_,M.prototype.featuresVolumeControl=!0,M.prototype.featuresFullscreenResize=!1,M.prototype.featuresPlaybackRate=!1,M.prototype.featuresProgressEvents=!1,M.prototype.featuresTimeupdateEvents=!1,M.prototype.featuresNativeTextTracks=!1,M.withSourceHandlers=function(a){a.registerSourceHandler=function(b,c){var d=a.sourceHandlers;d||(d=a.sourceHandlers=[]),void 0===c&&(c=d.length),d.splice(c,0,b)},a.canPlayType=function(b){for(var c=a.sourceHandlers||[],d=void 0,e=0;e<c.length;e++)if(d=c[e].canPlayType(b))return d;return""},a.selectSourceHandler=function(b,c){for(var d=a.sourceHandlers||[],e=0;e<d.length;e++)if(d[e].canHandleSource(b,c))return d[e];return null},a.canPlaySource=function(b,c){var d=a.selectSourceHandler(b,c);return d?d.canHandleSource(b,c):""},["seekable","duration"].forEach(function(a){var b=this[a];"function"==typeof b&&(this[a]=function(){return this.sourceHandler_&&this.sourceHandler_[a]?this.sourceHandler_[a].apply(this.sourceHandler_,arguments):b.apply(this,arguments)})},a.prototype),a.prototype.setSource=function(b){var c=a.selectSourceHandler(b,this.options_);return c||(a.nativeSourceHandler?c=a.nativeSourceHandler:C["default"].error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),c!==a.nativeSourceHandler&&(this.currentSource_=b,this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.one(this.el_,"loadstart",a.prototype.firstLoadStartListener_)),this.sourceHandler_=c.handleSource(b,this,this.options_),this.on("dispose",this.disposeSourceHandler),this},a.prototype.firstLoadStartListener_=function(){this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.successiveLoadStartListener_=function(){this.disposeSourceHandler(),this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},k["default"].registerComponent("Tech",M),k["default"].registerComponent("MediaTechController",M),M.registerTech("Tech",M),c["default"]=M},{105:105,46:46,5:5,63:63,65:65,66:66,70:70,72:72,76:76,79:79,83:83,86:86,87:87,88:88,90:90,94:94,95:95}],63:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].enabled=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].enabled){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.enabled&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("enabledchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],64:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.AudioTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"enabled",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("enabledchange"))}}),h.enabled&&(j.enabled=h.enabled),j.loaded_=!0,d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],65:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}c.trackElements_=[],Object.defineProperty(c,"length",{get:function(){return this.trackElements_.length}});for(var e=0,g=b.length;e<g;e++)c.addTrackElement_(b[e]);if(h.IS_IE8)return c}return a.prototype.addTrackElement_=function(a){var b=this.trackElements_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.trackElements_[b]}}),this.trackElements_.indexOf(a)===-1&&this.trackElements_.push(a)},a.prototype.getTrackElementByTrack_=function(a){for(var b=void 0,c=0,d=this.trackElements_.length;c<d;c++)if(a===this.trackElements_[c].track){b=this.trackElements_[c];break}return b},a.prototype.removeTrackElement_=function(a){for(var b=0,c=this.trackElements_.length;b<c;b++)if(a===this.trackElements_[b]){this.trackElements_.splice(b,1);break}},a}();c["default"]=k},{78:78,94:94}],66:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(42),n=d(m),o=a(72),p=d(o),q=function(a){function b(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var d=g(this,a.call(this)),e=void 0,h=d;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k=new p["default"](c);if(h.kind=k.kind,h.src=k.src,h.srclang=k.language,h.label=k.label,h["default"]=k["default"],Object.defineProperty(h,"readyState",{get:function(){return e}}),Object.defineProperty(h,"track",{get:function(){return k}}),e=0,k.addEventListener("loadeddata",function(){e=2,h.trigger({type:"load",target:h})}),j.IS_IE8){var m;return m=h,g(d,m)}return d}return h(b,a),b}(n["default"]);q.prototype.allowedEvents_={load:"load"},q.NONE=0,q.LOADING=1,q.LOADED=2,q.ERROR=3,c["default"]=q},{42:42,72:72,78:78,94:94}],67:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(b){f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}if(a.prototype.setCues_.call(c,b),Object.defineProperty(c,"length",{get:function(){return this.length_}}),h.IS_IE8)return c}return a.prototype.setCues_=function(a){var b=this.length||0,c=0,d=a.length;this.cues_=a,this.length_=a.length;var e=function(a){""+a in this||Object.defineProperty(this,""+a,{get:function(){return this.cues_[a]}})};if(b<d)for(c=b;c<d;c++)e.call(this,c)},a.prototype.getCueById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},a}();c["default"]=k},{78:78,94:94}],68:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){return"rgba("+parseInt(a[1]+a[1],16)+","+parseInt(a[2]+a[2],16)+","+parseInt(a[3]+a[3],16)+","+b+")"}function j(a,b,c){try{a.style[b]=c}catch(d){return}}c.__esModule=!0;var k=a(5),l=e(k),m=a(83),n=d(m),o=a(95),p=e(o),q={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},r=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));return c.on("loadstart",n.bind(h,h.toggleDisplay)),c.on("texttrackchange",n.bind(h,h.updateDisplay)),c.ready(n.bind(h,function(){if(c.tech_&&c.tech_.featuresNativeTextTracks)return void this.hide();c.on("fullscreenchange",n.bind(this,this.updateDisplay));for(var a=this.options_.playerOptions.tracks||[],b=0;b<a.length;b++)this.player_.addRemoteTextTrack(a[b],!0);var d={captions:1,subtitles:1},e=this.player_.textTracks(),f=void 0,g=void 0;if(e){for(var h=0;h<e.length;h++){var i=e[h];i["default"]&&("descriptions"!==i.kind||f?i.kind in d&&!g&&(g=i):f=i)}g?g.mode="showing":f&&(f.mode="showing")}})),h}return h(b,a),b.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},b.prototype.clearDisplay=function(){"function"==typeof p["default"].WebVTT&&p["default"].WebVTT.processCues(p["default"],[],this.el_)},b.prototype.updateDisplay=function(){var a=this.player_.textTracks();if(this.clearDisplay(),a){for(var b=null,c=null,d=a.length;d--;){var e=a[d];"showing"===e.mode&&("descriptions"===e.kind?b=e:c=e)}c?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(c)):b&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(b))}},b.prototype.updateForTrack=function(a){if("function"==typeof p["default"].WebVTT&&a.activeCues){for(var b=this.player_.textTrackSettings.getValues(),c=[],d=0;d<a.activeCues.length;d++)c.push(a.activeCues[d]);p["default"].WebVTT.processCues(p["default"],c,this.el_);for(var e=c.length;e--;){var f=c[e];if(f){var g=f.displayState;if(b.color&&(g.firstChild.style.color=b.color),b.textOpacity&&j(g.firstChild,"color",i(b.color||"#fff",b.textOpacity)),b.backgroundColor&&(g.firstChild.style.backgroundColor=b.backgroundColor),b.backgroundOpacity&&j(g.firstChild,"backgroundColor",i(b.backgroundColor||"#000",b.backgroundOpacity)),b.windowColor&&(b.windowOpacity?j(g,"backgroundColor",i(b.windowColor,b.windowOpacity)):g.style.backgroundColor=b.windowColor),b.edgeStyle&&("dropshadow"===b.edgeStyle?g.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===b.edgeStyle&&(g.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")),b.fontPercent&&1!==b.fontPercent){var h=p["default"].parseFloat(g.style.fontSize);g.style.fontSize=h*b.fontPercent+"px",g.style.height="auto",g.style.top="auto",g.style.bottom="2px"}b.fontFamily&&"default"!==b.fontFamily&&("small-caps"===b.fontFamily?g.firstChild.style.fontVariant="small-caps":g.firstChild.style.fontFamily=q[b.fontFamily])}}}},b}(l["default"]);l["default"].registerComponent("TextTrackDisplay",r),c["default"]=r},{5:5,83:83,95:95}],69:[function(a,b,c){"use strict";c.__esModule=!0;var d=function(a){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(b,c,d){return a[c]&&(b[c]=a[c]),b},{cues:a.cues&&Array.prototype.map.call(a.cues,function(a){return{startTime:a.startTime,endTime:a.endTime,text:a.text,id:a.id}})})},e=function(a){var b=a.$$("track"),c=Array.prototype.map.call(b,function(a){return a.track});return Array.prototype.map.call(b,function(a){var b=d(a.track);return a.src&&(b.src=a.src),b}).concat(Array.prototype.filter.call(a.textTracks(),function(a){return c.indexOf(a)===-1}).map(d))},f=function(a,b){return a.forEach(function(a){var c=b.addRemoteTextTrack(a).track;!a.src&&a.cues&&a.cues.forEach(function(a){return c.addCue(a)})}),b.textTracks()};c["default"]={textTracksToJson:e,jsonToTextTracks:f,trackToJson_:d}},{}],70:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(83),l=d(k),m=a(78),n=d(m),o=a(94),p=e(o),q=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);var h=void 0;if(n.IS_IE8){h=p["default"].createElement("custom");for(var i in j["default"].prototype)"constructor"!==i&&(h[i]=j["default"].prototype[i]);for(var k in b.prototype)"constructor"!==k&&(h[k]=b.prototype[k])}return h=c=g(this,a.call(this,e,h)),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){a.prototype.addTrack_.call(this,b),b.addEventListener("modechange",l.bind(this,function(){this.trigger("change")}))},b}(j["default"]);c["default"]=q},{74:74,78:78,83:83,94:94}],71:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){if(b&&(a=b(a)),a&&"none"!==a)return a}function j(a,b){return i(a.options[a.options.selectedIndex].value,b)}function k(a,b,c){if(b)for(var d=0;d<a.options.length;d++)if(i(a.options[d].value,c)===b){a.selectedIndex=d;break}}c.__esModule=!0;var l=a(95),m=e(l),n=a(5),o=e(n),p=a(81),q=a(83),r=d(q),s=a(88),t=d(s),u=a(86),v=e(u),w=["#000","Black"],x=["#00F","Blue"],y=["#0FF","Cyan"],z=["#0F0","Green"],A=["#F0F","Magenta"],B=["#F00","Red"],C=["#FFF","White"],D=["#FF0","Yellow"],E=["1","Opaque"],F=["0.5","Semi-Transparent"],G=["0","Transparent"],H={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[w,C,B,z,x,D,A,y]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[E,F,G]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[C,w,B,z,x,D,A,y]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],"default":2,parser:function(a){return"1.00"===a?null:Number(a)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[E,F]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[G,F,E]}};H.windowColor.options=H.backgroundColor.options;var I=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.setDefaults(),e.hide(),e.updateDisplay=r.bind(e,e.updateDisplay),void 0===d.persistTextTrackSettings&&(e.options_.persistTextTrackSettings=e.options_.playerOptions.persistTextTrackSettings),e.on(e.$(".vjs-done-button"),"click",function(){e.saveSettings(),e.hide()}),e.on(e.$(".vjs-default-button"),"click",function(){e.setDefaults(),e.updateDisplay()}),t.each(H,function(a){e.on(e.$(a.selector),"change",e.updateDisplay)}),e.options_.persistTextTrackSettings&&e.restoreSettings(),e}return h(b,a),b.prototype.createElSelect_=function(a){var b=this,c=H[a],d=c.id.replace("%s",this.id_);return[(0,p.createEl)("label",{className:"vjs-label",textContent:c.label},{"for":d}),(0,p.createEl)("select",{id:d},void 0,c.options.map(function(a){return(0,p.createEl)("option",{textContent:b.localize(a[1]),value:a[0]})}))]},b.prototype.createElFgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Text")}),b=this.createElSelect_("color"),c=(0,p.createEl)("span",{className:"vjs-text-opacity vjs-opacity"},void 0,this.createElSelect_("textOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-fg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElBgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Background")}),b=this.createElSelect_("backgroundColor"),c=(0,p.createEl)("span",{className:"vjs-bg-opacity vjs-opacity"},void 0,this.createElSelect_("backgroundOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-bg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElWinColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Window")}),b=this.createElSelect_("windowColor"),c=(0,p.createEl)("span",{className:"vjs-window-opacity vjs-opacity"},void 0,this.createElSelect_("windowOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-window-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElColors_=function(){return(0,p.createEl)("div",{className:"vjs-tracksettings-colors"},void 0,[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()])},b.prototype.createElFont_=function(){var a=(0,p.createEl)("div",{className:"vjs-font-percent vjs-tracksetting"},void 0,this.createElSelect_("fontPercent")),b=(0,p.createEl)("div",{className:"vjs-edge-style vjs-tracksetting"},void 0,this.createElSelect_("edgeStyle")),c=(0,p.createEl)("div",{className:"vjs-font-family vjs-tracksetting"},void 0,this.createElSelect_("fontFamily"));return(0,p.createEl)("div",{className:"vjs-tracksettings-font"},void 0,[a,b,c])},b.prototype.createElControls_=function(){var a=(0,p.createEl)("button",{className:"vjs-default-button",textContent:this.localize("Defaults")}),b=(0,p.createEl)("button",{className:"vjs-done-button",textContent:"Done"});return(0,p.createEl)("div",{className:"vjs-tracksettings-controls"},void 0,[a,b])},b.prototype.createEl=function(){var a=(0,p.createEl)("div",{className:"vjs-tracksettings"},void 0,[this.createElColors_(),this.createElFont_(),this.createElControls_()]),b=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogLabel-"+this.id_,textContent:"Caption Settings Dialog"},{"aria-level":"1",role:"heading"}),c=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogDescription-"+this.id_,textContent:"Beginning of dialog window. Escape will cancel and close the window."}),d=(0,p.createEl)("div",void 0,{role:"document"},[b,c,a]);return(0,p.createEl)("div",{className:"vjs-caption-settings vjs-modal-overlay",tabIndex:-1},{role:"dialog","aria-labelledby":b.id,"aria-describedby":c.id},d)},b.prototype.getValues=function(){var a=this;return t.reduce(H,function(b,c,d){var e=j(a.$(c.selector),c.parser);return void 0!==e&&(b[d]=e),b},{})},b.prototype.setValues=function(a){var b=this;t.each(H,function(c,d){k(b.$(c.selector),a[d],c.parser)})},b.prototype.setDefaults=function(){var a=this;t.each(H,function(b){var c=b.hasOwnProperty("default")?b["default"]:0;a.$(b.selector).selectedIndex=c})},b.prototype.restoreSettings=function(){var a=void 0;try{a=JSON.parse(m["default"].localStorage.getItem("vjs-text-track-settings"))}catch(b){v["default"].warn(b)}a&&this.setValues(a)},b.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var a=this.getValues();try{Object.keys(a).length?m["default"].localStorage.setItem("vjs-text-track-settings",JSON.stringify(a)):m["default"].localStorage.removeItem("vjs-text-track-settings")}catch(b){v["default"].warn(b)}}},b.prototype.updateDisplay=function(){var a=this.player_.getChild("textTrackDisplay");a&&a.updateDisplay()},b}(o["default"]);o["default"].registerComponent("TextTrackSettings",I),c["default"]=I},{5:5,81:81,83:83,86:86,88:88,95:95}],72:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(67),j=e(i),k=a(83),l=d(k),m=a(73),n=a(86),o=e(n),p=a(95),q=e(p),r=a(75),s=e(r),t=a(92),u=a(99),v=e(u),w=a(87),x=e(w),y=a(78),z=d(y),A=function(a,b){var c=new q["default"].WebVTT.Parser(q["default"],q["default"].vttjs,q["default"].WebVTT.StringDecoder()),d=[];c.oncue=function(a){b.addCue(a)},c.onparsingerror=function(a){d.push(a)},c.onflush=function(){b.trigger({type:"loadeddata",target:b})},c.parse(a),d.length>0&&(q["default"].console&&q["default"].console.groupCollapsed&&q["default"].console.groupCollapsed("Text Track parsing errors for "+b.src),d.forEach(function(a){return o["default"].error(a)}),q["default"].console&&q["default"].console.groupEnd&&q["default"].console.groupEnd()),c.flush()},B=function(a,b){var c={uri:a},d=(0,t.isCrossOrigin)(a);d&&(c.cors=d),(0,v["default"])(c,l.bind(this,function(a,c,d){if(a)return o["default"].error(a,c);if(b.loaded_=!0,"function"!=typeof q["default"].WebVTT){if(b.tech_){var e=function(){return A(d,b)};b.tech_.on("vttjsloaded",e),b.tech_.on("vttjserror",function(){o["default"].error("vttjs failed to load, stopping trying to process "+b.src),b.tech_.off("vttjsloaded",e)})}}else A(d,b)}))},C=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(f(this,b),!e.tech)throw new Error("A tech was not provided.");var h=(0,x["default"])(e,{kind:m.TextTrackKind[e.kind]||"subtitles",language:e.language||e.srclang||""}),i=m.TextTrackMode[h.mode]||"disabled",k=h["default"];"metadata"!==h.kind&&"chapters"!==h.kind||(i="hidden");var n=c=g(this,a.call(this,h));if(n.tech_=h.tech,z.IS_IE8)for(var o in b.prototype)"constructor"!==o&&(n[o]=b.prototype[o]);n.cues_=[],n.activeCues_=[];var p=new j["default"](n.cues_),q=new j["default"](n.activeCues_),r=!1,s=l.bind(n,function(){this.activeCues,r&&(this.trigger("cuechange"),r=!1)});return"disabled"!==i&&n.tech_.ready(function(){n.tech_.on("timeupdate",s)},!0),Object.defineProperty(n,"default",{get:function(){return k},set:function(){}}),Object.defineProperty(n,"mode",{get:function(){return i},set:function(a){var b=this;m.TextTrackMode[a]&&(i=a,"showing"===i&&this.tech_.ready(function(){b.tech_.on("timeupdate",s)},!0),this.trigger("modechange"))}}),Object.defineProperty(n,"cues",{get:function(){return this.loaded_?p:null},set:function(){}}),Object.defineProperty(n,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return q;for(var a=this.tech_.currentTime(),b=[],c=0,d=this.cues.length;c<d;c++){var e=this.cues[c];e.startTime<=a&&e.endTime>=a?b.push(e):e.startTime===e.endTime&&e.startTime<=a&&e.startTime+.5>=a&&b.push(e)}
if(r=!1,b.length!==this.activeCues_.length)r=!0;else for(var f=0;f<b.length;f++)this.activeCues_.indexOf(b[f])===-1&&(r=!0);return this.activeCues_=b,q.setCues_(this.activeCues_),q},set:function(){}}),h.src?(n.src=h.src,B(h.src,n)):n.loaded_=!0,d=n,g(c,d)}return h(b,a),b.prototype.addCue=function(a){var b=a;if(q["default"].vttjs&&!(a instanceof q["default"].vttjs.VTTCue)){b=new q["default"].vttjs.VTTCue(a.startTime,a.endTime,a.text);for(var c in a)c in b||(b[c]=a[c]);b.id=a.id}var d=this.tech_.textTracks();if(d)for(var e=0;e<d.length;e++)d[e]!==this&&d[e].removeCue(b);this.cues_.push(b),this.cues.setCues_(this.cues_)},b.prototype.removeCue=function(a){for(var b=!1,c=0,d=this.cues_.length;c<d;c++){this.cues_[c]===a&&(this.cues_.splice(c,1),b=!0)}b&&this.cues.setCues_(this.cues_)},b}(s["default"]);C.prototype.allowedEvents_={cuechange:"cuechange"},c["default"]=C},{67:67,73:73,75:75,78:78,83:83,86:86,87:87,92:92,95:95,99:99}],73:[function(a,b,c){"use strict";c.__esModule=!0;c.VideoTrackKind={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},c.AudioTrackKind={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},c.TextTrackKind={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},c.TextTrackMode={disabled:"disabled",hidden:"hidden",showing:"showing"}},{}],74:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(42),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;f(this,b);var h=g(this,a.call(this));if(!e&&(e=h,l.IS_IE8)){e=n["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(e[i]=b.prototype[i])}e.tracks_=[],Object.defineProperty(e,"length",{get:function(){return this.tracks_.length}});for(var j=0;j<d.length;j++)e.addTrack_(d[j]);return c=e,g(h,c)}return h(b,a),b.prototype.addTrack_=function(a){var b=this.tracks_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.tracks_[b]}}),this.tracks_.indexOf(a)===-1&&(this.tracks_.push(a),this.trigger({track:a,type:"addtrack"}))},b.prototype.removeTrack_=function(a){for(var b=void 0,c=0,d=this.length;c<d;c++)if(this[c]===a){b=this[c],b.off&&b.off(),this.tracks_.splice(c,1);break}b&&this.trigger({track:b,type:"removetrack"})},b.prototype.getTrackById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},b}(j["default"]);o.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var p in o.prototype.allowedEvents_)o.prototype["on"+p]=null;c["default"]=o},{42:42,78:78,94:94}],75:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(85),n=e(m),o=a(42),p=d(o),q=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var e=g(this,a.call(this)),h=e;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k={id:d.id||"vjs_track_"+n.newGUID(),kind:d.kind||"",label:d.label||"",language:d.language||""},m=function(a){Object.defineProperty(h,a,{get:function(){return k[a]},set:function(){}})};for(var o in k)m(o);return c=h,g(e,c)}return h(b,a),b}(p["default"]);c["default"]=q},{42:42,78:78,85:85,94:94}],76:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].selected=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].selected){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,Object.defineProperty(h,"selectedIndex",{get:function(){for(var a=0;a<this.length;a++)if(this[a].selected)return a;return-1},set:function(){}}),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.selected&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("selectedchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],77:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.VideoTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"selected",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("selectedchange"))}}),h.selected&&(j.selected=h.selected),d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],78:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0,c.BACKGROUND_SIZE_SUPPORTED=c.TOUCH_ENABLED=c.IS_ANY_SAFARI=c.IS_SAFARI=c.IE_VERSION=c.IS_IE8=c.IS_CHROME=c.IS_EDGE=c.IS_FIREFOX=c.IS_NATIVE_ANDROID=c.IS_OLD_ANDROID=c.ANDROID_VERSION=c.IS_ANDROID=c.IOS_VERSION=c.IS_IOS=c.IS_IPOD=c.IS_IPHONE=c.IS_IPAD=void 0;var f=a(81),g=e(f),h=a(95),i=d(h),j=i["default"].navigator&&i["default"].navigator.userAgent||"",k=/AppleWebKit\/([\d.]+)/i.exec(j),l=k?parseFloat(k.pop()):null,m=c.IS_IPAD=/iPad/i.test(j),n=c.IS_IPHONE=/iPhone/i.test(j)&&!m,o=c.IS_IPOD=/iPod/i.test(j),p=c.IS_IOS=n||m||o,q=(c.IOS_VERSION=function(){var a=j.match(/OS (\d+)_/i);return a&&a[1]?a[1]:null}(),c.IS_ANDROID=/Android/i.test(j)),r=c.ANDROID_VERSION=function(){var a=j.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!a)return null;var b=a[1]&&parseFloat(a[1]),c=a[2]&&parseFloat(a[2]);return b&&c?parseFloat(a[1]+"."+a[2]):b?b:null}(),s=(c.IS_OLD_ANDROID=q&&/webkit/i.test(j)&&r<2.3,c.IS_NATIVE_ANDROID=q&&r<5&&l<537,c.IS_FIREFOX=/Firefox/i.test(j),c.IS_EDGE=/Edge/i.test(j)),t=c.IS_CHROME=!s&&/Chrome/i.test(j),u=(c.IS_IE8=/MSIE\s8\.0/.test(j),c.IE_VERSION=function(a){return a&&parseFloat(a[1])}(/MSIE\s(\d+)\.\d/.exec(j)),c.IS_SAFARI=/Safari/i.test(j)&&!t&&!q&&!s);c.IS_ANY_SAFARI=u||p,c.TOUCH_ENABLED=g.isReal()&&("ontouchstart"in i["default"]||i["default"].DocumentTouch&&i["default"].document instanceof i["default"].DocumentTouch),c.BACKGROUND_SIZE_SUPPORTED=g.isReal()&&"backgroundSize"in i["default"].document.createElement("video").style},{81:81,95:95}],79:[function(a,b,c){"use strict";function d(a,b){var c=0,d=void 0,f=void 0;if(!b)return 0;a&&a.length||(a=(0,e.createTimeRange)(0,0));for(var g=0;g<a.length;g++)d=a.start(g),f=a.end(g),f>b&&(f=b),c+=f-d;return c/b}c.__esModule=!0,c.bufferedPercent=d;var e=a(90)},{90:90}],80:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!a||!b)return"";if("function"==typeof g["default"].getComputedStyle){var c=g["default"].getComputedStyle(a);return c?c[b]:""}return a.currentStyle[b]||""}c.__esModule=!0,c["default"]=e;var f=a(95),g=d(f)},{95:95}],81:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a){return"string"==typeof a&&/\S/.test(a)}function h(a){if(/\s/.test(a))throw new Error("class has illegal whitespace characters")}function i(a){return new RegExp("(^|\\s)"+a+"($|\\s)")}function j(){return N["default"]===P["default"].document&&"undefined"!=typeof N["default"].createElement}function k(a){return(0,W.isObject)(a)&&1===a.nodeType}function l(a){return function(b,c){if(!g(b))return N["default"][a](null);g(c)&&(c=N["default"].querySelector(c));var d=k(c)?c:N["default"];return d[a]&&d[a](b)}}function m(a){return 0===a.indexOf("#")&&(a=a.slice(1)),N["default"].getElementById(a)}function n(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},d=arguments[3],e=N["default"].createElement(a);return Object.getOwnPropertyNames(b).forEach(function(a){var c=b[a];a.indexOf("aria-")!==-1||"role"===a||"type"===a?(T["default"].warn((0,V["default"])(L,a,c)),e.setAttribute(a,c)):"textContent"===a?o(e,c):e[a]=c}),Object.getOwnPropertyNames(c).forEach(function(a){e.setAttribute(a,c[a])}),d&&J(e,d),e}function o(a,b){return"undefined"==typeof a.textContent?a.innerText=b:a.textContent=b,a}function p(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)}function q(a){var b=a[Y];return b||(b=a[Y]=R.newGUID()),X[b]||(X[b]={}),X[b]}function r(a){var b=a[Y];return!!b&&!!Object.getOwnPropertyNames(X[b]).length}function s(a){var b=a[Y];if(b){delete X[b];try{delete a[Y]}catch(c){a.removeAttribute?a.removeAttribute(Y):a[Y]=null}}}function t(a,b){return h(b),a.classList?a.classList.contains(b):i(b).test(a.className)}function u(a,b){return a.classList?a.classList.add(b):t(a,b)||(a.className=(a.className+" "+b).trim()),a}function v(a,b){return a.classList?a.classList.remove(b):(h(b),a.className=a.className.split(/\s+/).filter(function(a){return a!==b}).join(" ")),a}function w(a,b,c){var d=t(a,b);if("function"==typeof c&&(c=c(a,b)),"boolean"!=typeof c&&(c=!d),c!==d)return c?u(a,b):v(a,b),a}function x(a,b){Object.getOwnPropertyNames(b).forEach(function(c){var d=b[c];null===d||void 0===d||d===!1?a.removeAttribute(c):a.setAttribute(c,d===!0?"":d)})}function y(a){var b={};if(a&&a.attributes&&a.attributes.length>0)for(var c=a.attributes,d=c.length-1;d>=0;d--){var e=c[d].name,f=c[d].value;"boolean"!=typeof a[e]&&",autoplay,controls,loop,muted,default,".indexOf(","+e+",")===-1||(f=null!==f),b[e]=f}return b}function z(a,b){return a.getAttribute(b)}function A(a,b,c){a.setAttribute(b,c)}function B(a,b){a.removeAttribute(b)}function C(){N["default"].body.focus(),N["default"].onselectstart=function(){return!1}}function D(){N["default"].onselectstart=function(){return!0}}function E(a){var b=void 0;if(a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),!b)return{left:0,top:0};var c=N["default"].documentElement,d=N["default"].body,e=c.clientLeft||d.clientLeft||0,f=P["default"].pageXOffset||d.scrollLeft,g=b.left+f-e,h=c.clientTop||d.clientTop||0,i=P["default"].pageYOffset||d.scrollTop,j=b.top+i-h;return{left:Math.round(g),top:Math.round(j)}}function F(a,b){var c={},d=E(a),e=a.offsetWidth,f=a.offsetHeight,g=d.top,h=d.left,i=b.pageY,j=b.pageX;return b.changedTouches&&(j=b.changedTouches[0].pageX,i=b.changedTouches[0].pageY),c.y=Math.max(0,Math.min(1,(g-i+f)/f)),c.x=Math.max(0,Math.min(1,(j-h)/e)),c}function G(a){return(0,W.isObject)(a)&&3===a.nodeType}function H(a){for(;a.firstChild;)a.removeChild(a.firstChild);return a}function I(a){return"function"==typeof a&&(a=a()),(Array.isArray(a)?a:[a]).map(function(a){return"function"==typeof a&&(a=a()),k(a)||G(a)?a:"string"==typeof a&&/\S/.test(a)?N["default"].createTextNode(a):void 0}).filter(function(a){return a})}function J(a,b){return I(b).forEach(function(b){return a.appendChild(b)}),a}function K(a,b){return J(H(a),b)}c.__esModule=!0,c.$$=c.$=void 0;var L=f(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]);c.isReal=j,c.isEl=k,c.getEl=m,c.createEl=n,c.textContent=o,c.insertElFirst=p,c.getElData=q,c.hasElData=r,c.removeElData=s,c.hasElClass=t,c.addElClass=u,c.removeElClass=v,c.toggleElClass=w,c.setElAttributes=x,c.getElAttributes=y,c.getAttribute=z,c.setAttribute=A,c.removeAttribute=B,c.blockTextSelection=C,c.unblockTextSelection=D,c.findElPosition=E,c.getPointerPosition=F,c.isTextNode=G,c.emptyEl=H,c.normalizeContent=I,c.appendContent=J,c.insertContent=K;var M=a(94),N=e(M),O=a(95),P=e(O),Q=a(85),R=d(Q),S=a(86),T=e(S),U=a(98),V=e(U),W=a(88),X={},Y="vdata"+(new Date).getTime();c.$=l("querySelector"),c.$$=l("querySelectorAll")},{85:85,86:86,88:88,94:94,95:95,98:98}],82:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){var c=n.getElData(a);0===c.handlers[b].length&&(delete c.handlers[b],a.removeEventListener?a.removeEventListener(b,c.dispatcher,!1):a.detachEvent&&a.detachEvent("on"+b,c.dispatcher)),Object.getOwnPropertyNames(c.handlers).length<=0&&(delete c.handlers,delete c.dispatcher,delete c.disabled),0===Object.getOwnPropertyNames(c).length&&n.removeElData(a)}function g(a,b,c,d){c.forEach(function(c){a(b,c,d)})}function h(a){function b(){return!0}function c(){return!1}if(!a||!a.isPropagationStopped){var d=a||t["default"].event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyLocation"!==e&&"webkitMovementX"!==e&&"webkitMovementY"!==e&&("returnValue"===e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||v["default"]),a.relatedTarget||(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement),a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=!1,d.returnValue=!1,a.defaultPrevented=!0},a.defaultPrevented=!1,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=!0,d.cancelBubble=!0,a.isPropagationStopped=b},a.isPropagationStopped=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.isImmediatePropagationStopped=b,a.stopPropagation()},a.isImmediatePropagationStopped=c,null!==a.clientX&&void 0!==a.clientX){var f=v["default"].documentElement,g=v["default"].body;a.pageX=a.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,null!==a.button&&void 0!==a.button&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a}function i(a,b,c){if(Array.isArray(b))return g(i,a,b,c);var d=n.getElData(a);d.handlers||(d.handlers={}),d.handlers[b]||(d.handlers[b]=[]),c.guid||(c.guid=p.newGUID()),d.handlers[b].push(c),d.dispatcher||(d.disabled=!1,d.dispatcher=function(b,c){if(!d.disabled){b=h(b);var e=d.handlers[b.type];if(e)for(var f=e.slice(0),g=0,i=f.length;g<i&&!b.isImmediatePropagationStopped();g++)try{f[g].call(a,b,c)}catch(j){r["default"].error(j)}}}),1===d.handlers[b].length&&(a.addEventListener?a.addEventListener(b,d.dispatcher,!1):a.attachEvent&&a.attachEvent("on"+b,d.dispatcher))}function j(a,b,c){if(n.hasElData(a)){var d=n.getElData(a);if(d.handlers){if(Array.isArray(b))return g(j,a,b,c);var e=function(b){d.handlers[b]=[],f(a,b)};if(b){var h=d.handlers[b];if(h){if(!c)return void e(b);if(c.guid)for(var i=0;i<h.length;i++)h[i].guid===c.guid&&h.splice(i--,1);f(a,b)}}else for(var k in d.handlers)e(k)}}}function k(a,b,c){var d=n.hasElData(a)?n.getElData(a):{},e=a.parentNode||a.ownerDocument;if("string"==typeof b&&(b={type:b,target:a}),b=h(b),d.dispatcher&&d.dispatcher.call(a,b,c),e&&!b.isPropagationStopped()&&b.bubbles===!0)k.call(null,e,b,c);else if(!e&&!b.defaultPrevented){var f=n.getElData(b.target);b.target[b.type]&&(f.disabled=!0,"function"==typeof b.target[b.type]&&b.target[b.type](),f.disabled=!1)}return!b.defaultPrevented}function l(a,b,c){if(Array.isArray(b))return g(l,a,b,c);var d=function e(){j(a,b,e),c.apply(this,arguments)};d.guid=c.guid=c.guid||p.newGUID(),i(a,b,d)}c.__esModule=!0,c.fixEvent=h,c.on=i,c.off=j,c.trigger=k,c.one=l;var m=a(81),n=e(m),o=a(85),p=e(o),q=a(86),r=d(q),s=a(95),t=d(s),u=a(94),v=d(u)},{81:81,85:85,86:86,94:94,95:95}],83:[function(a,b,c){"use strict";c.__esModule=!0,c.throttle=c.bind=void 0;var d=a(85);c.bind=function(a,b,c){b.guid||(b.guid=(0,d.newGUID)());var e=function(){return b.apply(a,arguments)};return e.guid=c?c+"_"+b.guid:b.guid,e},c.throttle=function(a,b){var c=Date.now();return function(){var d=Date.now();d-c>=b&&(a.apply(void 0,arguments),c=d)}}},{85:85}],84:[function(a,b,c){"use strict";function d(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;a=a<0?0:a;var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||a===1/0)&&(e=d=c="-"),e=e>0||g>0?e+":":"",d=((e||f>=10)&&d<10?"0"+d:d)+":",c=c<10?"0"+c:c,e+d+c}c.__esModule=!0,c["default"]=d},{}],85:[function(a,b,c){"use strict";function d(){return e++}c.__esModule=!0,c.newGUID=d;var e=1},{}],86:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.logByType=void 0;var e=a(95),f=d(e),g=a(78),h=a(88),i=void 0,j=c.logByType=function(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:!!g.IE_VERSION&&g.IE_VERSION<11;"log"!==a&&b.unshift(a.toUpperCase()+":"),i.history.push(b),b.unshift("VIDEOJS:");var d=f["default"].console&&f["default"].console[a];d&&(c&&(b=b.map(function(a){if((0,h.isObject)(a)||Array.isArray(a))try{return JSON.stringify(a)}catch(b){return String(a)}return String(a)}).join(" ")),d.apply?d[Array.isArray(b)?"apply":"call"](f["default"].console,b):d(b))};i=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];j("log",b)},i.history=[],i.error=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("error",b)},i.warn=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("warn",b)},c["default"]=i},{78:78,88:88,95:95}],87:[function(a,b,c){"use strict";function d(){for(var a={},b=arguments.length,c=Array(b),f=0;f<b;f++)c[f]=arguments[f];return c.forEach(function(b){b&&(0,e.each)(b,function(b,c){if(!(0,e.isPlain)(b))return void(a[c]=b);(0,e.isPlain)(a[c])||(a[c]={}),a[c]=d(a[c],b)})}),a}c.__esModule=!0,c["default"]=d;var e=a(88)},{88:88}],88:[function(a,b,c){"use strict";function d(a,b){k(a).forEach(function(c){return b(a[c],c)})}function e(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return k(a).reduce(function(c,d){return b(c,a[d],d)},c)}function f(a){for(var b=arguments.length,c=Array(b>1?b-1:0),e=1;e<b;e++)c[e-1]=arguments[e];return Object.assign?Object.assign.apply(Object,[a].concat(c)):(c.forEach(function(b){b&&d(b,function(b,c){a[c]=b})}),a)}function g(a){return!!a&&"object"===(void 0===a?"undefined":i(a))}function h(a){return g(a)&&"[object Object]"===j.call(a)&&a.constructor===Object}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};c.each=d,c.reduce=e,c.assign=f,c.isObject=g,c.isPlain=h;var j=Object.prototype.toString,k=function(a){return g(a)?Object.keys(a):[]}},{}],89:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.setTextContent=c.createStyleElement=void 0;var e=a(94),f=d(e);c.createStyleElement=function(a){var b=f["default"].createElement("style");return b.className=a,b},c.setTextContent=function(a,b){a.styleSheet?a.styleSheet.cssText=b:a.textContent=b}},{94:94}],90:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b,c){if(b<0||b>c)throw new Error("Failed to execute '"+a+"' on 'TimeRanges': The index provided ("+b+") is greater than or equal to the maximum bound ("+c+").")}function f(a,b,c,d){return void 0===d&&(j["default"].warn("DEPRECATED: Function '"+a+"' on 'TimeRanges' called without an index argument."),d=0),e(a,d,c.length-1),c[d][b]}function g(a){return void 0===a||0===a.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:a.length,start:f.bind(null,"start",0,a),end:f.bind(null,"end",1,a)}}function h(a,b){return Array.isArray(a)?g(a):void 0===a||void 0===b?g():g([[a,b]])}c.__esModule=!0,c.createTimeRange=void 0,c.createTimeRanges=h;var i=a(86),j=d(i);c.createTimeRange=h},{86:86}],91:[function(a,b,c){"use strict";function d(a){return"string"!=typeof a?a:a.charAt(0).toUpperCase()+a.slice(1)}c.__esModule=!0,c["default"]=d},{}],92:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.isCrossOrigin=c.getFileExtension=c.getAbsoluteURL=c.parseUrl=void 0;var e=a(94),f=d(e),g=a(95),h=d(g),i=c.parseUrl=function(a){var b=["protocol","hostname","port","pathname","search","hash","host"],c=f["default"].createElement("a");c.href=a;var d=""===c.host&&"file:"!==c.protocol,e=void 0;d&&(e=f["default"].createElement("div"),e.innerHTML='<a href="'+a+'"></a>',c=e.firstChild,e.setAttribute("style","display:none; position:absolute;"),f["default"].body.appendChild(e));for(var g={},h=0;h<b.length;h++)g[b[h]]=c[b[h]];return"http:"===g.protocol&&(g.host=g.host.replace(/:80$/,"")),"https:"===g.protocol&&(g.host=g.host.replace(/:443$/,"")),d&&f["default"].body.removeChild(e),g};c.getAbsoluteURL=function(a){if(!a.match(/^https?:\/\//)){var b=f["default"].createElement("div");b.innerHTML='<a href="'+a+'">x</a>',a=b.firstChild.href}return a},c.getFileExtension=function(a){if("string"==typeof a){var b=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,c=b.exec(a);if(c)return c.pop().toLowerCase()}return""},c.isCrossOrigin=function(a){var b=h["default"].location,c=i(a);return(":"===c.protocol?b.protocol:c.protocol)+c.host!==b.protocol+b.host}},{94:94,95:95}],93:[function(b,c,d){"use strict";function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a){return a&&a.__esModule?a:{"default":a}}function g(a,b,c){var d=void 0;if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),g.getPlayers()[a])return b&&O["default"].warn('Player "'+a+'" is already initialised. Options will not be applied.'),c&&g.getPlayers()[a].ready(c),g.getPlayers()[a];d=Q.getEl(a)}else d=a;if(!d||!d.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");if(d.player||x["default"].players[d.playerId])return d.player||x["default"].players[d.playerId];b=b||{},g.hooks("beforesetup").forEach(function(a){var c=a(d,(0,B["default"])(b));if(!(0,V.isObject)(c)||Array.isArray(c))return void O["default"].error("please return an object in beforesetup hooks");b=(0,B["default"])(b,c)});var e=r["default"].getComponent("Player"),f=new e(d,b,c);return g.hooks("setup").forEach(function(a){return a(f)}),f}d.__esModule=!0;var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},i=b(95),j=f(i),k=b(94),l=f(k),m=b(56),n=e(m),o=b(89),p=e(o),q=b(5),r=f(q),s=b(42),t=f(s),u=b(82),v=e(u),w=b(51),x=f(w),y=b(52),z=f(y),A=b(87),B=f(A),C=b(83),D=e(C),E=b(72),F=f(E),G=b(64),H=f(G),I=b(77),J=f(I),K=b(90),L=b(84),M=f(L),N=b(86),O=f(N),P=b(81),Q=e(P),R=b(78),S=e(R),T=b(92),U=e(T),V=b(88),W=b(80),X=f(W),Y=b(43),Z=f(Y),$=b(99),_=f($),aa=b(62),ba=f(aa);if("undefined"==typeof HTMLVideoElement&&Q.isReal()&&(l["default"].createElement("video"),l["default"].createElement("audio"),l["default"].createElement("track")),g.hooks_={},g.hooks=function(a,b){return g.hooks_[a]=g.hooks_[a]||[],b&&(g.hooks_[a]=g.hooks_[a].concat(b)),g.hooks_[a]},g.hook=function(a,b){g.hooks(a,b)},g.removeHook=function(a,b){var c=g.hooks(a).indexOf(b);return!(c<=-1)&&(g.hooks_[a]=g.hooks_[a].slice(),g.hooks_[a].splice(c,1),!0)},j["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Q.isReal()){var ca=Q.$(".vjs-styles-defaults");if(!ca){ca=p.createStyleElement("vjs-styles-defaults");var da=Q.$("head");da&&da.insertBefore(ca,da.firstChild),p.setTextContent(ca,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}n.autoSetupTimeout(1,g),g.VERSION="5.19.0",g.options=x["default"].prototype.options_,g.getPlayers=function(){return x["default"].players},g.players=x["default"].players,g.getComponent=r["default"].getComponent,g.registerComponent=function(a,b){ba["default"].isTech(b)&&O["default"].warn("The "+a+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),r["default"].registerComponent.call(r["default"],a,b)},g.getTech=ba["default"].getTech,g.registerTech=ba["default"].registerTech,g.browser=S,g.TOUCH_ENABLED=S.TOUCH_ENABLED,g.extend=Z["default"],g.mergeOptions=B["default"],g.bind=D.bind,g.plugin=z["default"],g.addLanguage=function(a,b){var c;return a=(""+a).toLowerCase(),g.options.languages=(0,B["default"])(g.options.languages,(c={},c[a]=b,c)),g.options.languages[a]},g.log=O["default"],g.createTimeRange=g.createTimeRanges=K.createTimeRanges,g.formatTime=M["default"],g.parseUrl=U.parseUrl,g.isCrossOrigin=U.isCrossOrigin,g.EventTarget=t["default"],g.on=v.on,g.one=v.one,g.off=v.off,g.trigger=v.trigger,g.xhr=_["default"],g.TextTrack=F["default"],g.AudioTrack=H["default"],g.VideoTrack=J["default"],g.isEl=Q.isEl,g.isTextNode=Q.isTextNode,g.createEl=Q.createEl,g.hasClass=Q.hasElClass,g.addClass=Q.addElClass,g.removeClass=Q.removeElClass,g.toggleClass=Q.toggleElClass,g.setAttributes=Q.setElAttributes,g.getAttributes=Q.getElAttributes,g.emptyEl=Q.emptyEl,g.appendContent=Q.appendContent,g.insertContent=Q.insertContent,g.computedStyle=X["default"],"function"==typeof a&&a.amd?a("videojs",[],function(){return g}):"object"===(void 0===d?"undefined":h(d))&&"object"===(void 0===c?"undefined":h(c))&&(c.exports=g),d["default"]=g},{42:42,43:43,5:5,51:51,52:52,56:56,62:62,64:64,72:72,77:77,78:78,80:80,81:81,82:82,83:83,84:84,86:86,87:87,88:88,89:89,90:90,92:92,94:94,95:95,99:99}],94:[function(a,b,c){(function(c){var d=void 0!==c?c:"undefined"!=typeof window?window:{},e=a(96);if("undefined"!=typeof document)b.exports=document;else{var f=d["__GLOBAL_DOCUMENT_CACHE@4"];f||(f=d["__GLOBAL_DOCUMENT_CACHE@4"]=e),b.exports=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{96:96}],95:[function(a,b,c){(function(a){"undefined"!=typeof window?b.exports=window:void 0!==a?b.exports=a:"undefined"!=typeof self?b.exports=self:b.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],96:[function(a,b,c){},{}],97:[function(a,b,c){function d(a,b){var c,d=null;try{c=JSON.parse(a,b)}catch(e){d=e}return[d,c]}b.exports=d},{}],98:[function(a,b,c){function d(a){return a.replace(/\n\r?\s*/g,"")}b.exports=function(a){for(var b="",c=0;c<arguments.length;c++)b+=d(a[c])+(arguments[c+1]||"");return b}},{}],99:[function(a,b,c){"use strict";function d(a,b){for(var c=0;c<a.length;c++)b(a[c])}function e(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function f(a,b,c){var d=a;return l(b)?(c=b,"string"==typeof a&&(d={uri:a})):d=n(b,{uri:a}),d.callback=c,d}function g(a,b,c){return b=f(a,b,c),h(b)}function h(a){function b(){4===k.readyState&&setTimeout(f,0)}function c(){var a=void 0;if(a=k.response?k.response:k.responseText||i(k),u)try{a=JSON.parse(a)}catch(b){}return a}function d(a){return clearTimeout(o),a instanceof Error||(a=new Error(""+(a||"Unknown XMLHttpRequest Error"))),a.statusCode=0,j(a,v)}function f(){if(!n){var b;clearTimeout(o),b=a.useXDR&&void 0===k.status?200:1223===k.status?204:k.status;var d=v,e=null;return 0!==b?(d={body:c(),statusCode:b,method:q,headers:{},url:p,rawRequest:k},k.getAllResponseHeaders&&(d.headers=m(k.getAllResponseHeaders()))):e=new Error("Internal XMLHttpRequest Error"),j(e,d,d.body)}}if("undefined"==typeof a.callback)throw new Error("callback argument missing");var h=!1,j=function(b,c,d){h||(h=!0,a.callback(b,c,d))},k=a.xhr||null;k||(k=a.cors||a.useXDR?new g.XDomainRequest:new g.XMLHttpRequest)
;var l,n,o,p=k.url=a.uri||a.url,q=k.method=a.method||"GET",r=a.body||a.data,s=k.headers=a.headers||{},t=!!a.sync,u=!1,v={body:void 0,headers:{},statusCode:0,method:q,url:p,rawRequest:k};if("json"in a&&a.json!==!1&&(u=!0,s.accept||s.Accept||(s.Accept="application/json"),"GET"!==q&&"HEAD"!==q&&(s["content-type"]||s["Content-Type"]||(s["Content-Type"]="application/json"),r=JSON.stringify(a.json===!0?r:a.json))),k.onreadystatechange=b,k.onload=f,k.onerror=d,k.onprogress=function(){},k.onabort=function(){n=!0},k.ontimeout=d,k.open(q,p,!t,a.username,a.password),t||(k.withCredentials=!!a.withCredentials),!t&&a.timeout>0&&(o=setTimeout(function(){if(!n){n=!0,k.abort("timeout");var a=new Error("XMLHttpRequest timeout");a.code="ETIMEDOUT",d(a)}},a.timeout)),k.setRequestHeader)for(l in s)s.hasOwnProperty(l)&&k.setRequestHeader(l,s[l]);else if(a.headers&&!e(a.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in a&&(k.responseType=a.responseType),"beforeSend"in a&&"function"==typeof a.beforeSend&&a.beforeSend(k),k.send(r||null),k}function i(a){if("document"===a.responseType)return a.responseXML;var b=a.responseXML&&"parsererror"===a.responseXML.documentElement.nodeName;return""!==a.responseType||b?null:a.responseXML}function j(){}var k=a(95),l=a(100),m=a(103),n=a(104);b.exports=g,g.XMLHttpRequest=k.XMLHttpRequest||j,g.XDomainRequest="withCredentials"in new g.XMLHttpRequest?g.XMLHttpRequest:k.XDomainRequest,d(["get","put","post","patch","head","delete"],function(a){g["delete"===a?"del":a]=function(b,c,d){return c=f(b,c,d),c.method=a.toUpperCase(),h(c)}})},{100:100,103:103,104:104,95:95}],100:[function(a,b,c){function d(a){var b=e.call(a);return"[object Function]"===b||"function"==typeof a&&"[object RegExp]"!==b||"undefined"!=typeof window&&(a===window.setTimeout||a===window.alert||a===window.confirm||a===window.prompt)}b.exports=d;var e=Object.prototype.toString},{}],101:[function(a,b,c){function d(a,b,c){if(!h(b))throw new TypeError("iterator must be a function");arguments.length<3&&(c=this),"[object Array]"===i.call(a)?e(a,b,c):"string"==typeof a?f(a,b,c):g(a,b,c)}function e(a,b,c){for(var d=0,e=a.length;d<e;d++)j.call(a,d)&&b.call(c,a[d],d,a)}function f(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a.charAt(d),d,a)}function g(a,b,c){for(var d in a)j.call(a,d)&&b.call(c,a[d],d,a)}var h=a(100);b.exports=d;var i=Object.prototype.toString,j=Object.prototype.hasOwnProperty},{100:100}],102:[function(a,b,c){function d(a){return a.replace(/^\s*|\s*$/g,"")}c=b.exports=d,c.left=function(a){return a.replace(/^\s*/,"")},c.right=function(a){return a.replace(/\s*$/,"")}},{}],103:[function(a,b,c){var d=a(102),e=a(101),f=function(a){return"[object Array]"===Object.prototype.toString.call(a)};b.exports=function(a){if(!a)return{};var b={};return e(d(a).split("\n"),function(a){var c=a.indexOf(":"),e=d(a.slice(0,c)).toLowerCase(),g=d(a.slice(c+1));"undefined"==typeof b[e]?b[e]=g:f(b[e])?b[e].push(g):b[e]=[b[e],g]}),b}},{101:101,102:102}],104:[function(a,b,c){function d(){for(var a={},b=0;b<arguments.length;b++){var c=arguments[b];for(var d in c)e.call(c,d)&&(a[d]=c[d])}return a}b.exports=d;var e=Object.prototype.hasOwnProperty},{}],105:[function(a,b,c){var d=b.exports={WebVTT:a(106).WebVTT,VTTCue:a(107).VTTCue,VTTRegion:a(109).VTTRegion};window.vttjs=d,window.WebVTT=d.WebVTT;var e=d.VTTCue,f=d.VTTRegion,g=window.VTTCue,h=window.VTTRegion;d.shim=function(){window.VTTCue=e,window.VTTRegion=f},d.restore=function(){window.VTTCue=g,window.VTTRegion=h},window.VTTCue||d.shim()},{106:106,107:107,109:109}],106:[function(a,b,c){!function(a){function b(a,b){this.name="ParsingError",this.code=a.code,this.message=b||a.message}function c(a){function b(a,b,c,d){return 3600*(0|a)+60*(0|b)+(0|c)+(0|d)/1e3}var c=a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return c?c[3]?b(c[1],c[2],c[3].replace(":",""),c[4]):c[1]>59?b(c[1],c[2],0,c[4]):b(0,c[1],c[2],c[4]):null}function d(){this.values=p(null)}function e(a,b,c,d){var e=d?a.split(d):[a];for(var f in e)if("string"==typeof e[f]){var g=e[f].split(c);if(2===g.length){var h=g[0],i=g[1];b(h,i)}}}function f(a,f,g){function h(){var d=c(a);if(null===d)throw new b(b.Errors.BadTimeStamp,"Malformed timestamp: "+k);return a=a.replace(/^[^\sa-zA-Z-]+/,""),d}function i(a,b){var c=new d;e(a,function(a,b){switch(a){case"region":for(var d=g.length-1;d>=0;d--)if(g[d].id===b){c.set(a,g[d].region);break}break;case"vertical":c.alt(a,b,["rl","lr"]);break;case"line":var e=b.split(","),f=e[0];c.integer(a,f),c.percent(a,f)&&c.set("snapToLines",!1),c.alt(a,f,["auto"]),2===e.length&&c.alt("lineAlign",e[1],["start","middle","end"]);break;case"position":e=b.split(","),c.percent(a,e[0]),2===e.length&&c.alt("positionAlign",e[1],["start","middle","end"]);break;case"size":c.percent(a,b);break;case"align":c.alt(a,b,["start","middle","end","left","right"])}},/:/,/\s/),b.region=c.get("region",null),b.vertical=c.get("vertical",""),b.line=c.get("line","auto"),b.lineAlign=c.get("lineAlign","start"),b.snapToLines=c.get("snapToLines",!0),b.size=c.get("size",100),b.align=c.get("align","middle"),b.position=c.get("position",{start:0,left:0,middle:50,end:100,right:100},b.align),b.positionAlign=c.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},b.align)}function j(){a=a.replace(/^\s+/,"")}var k=a;if(j(),f.startTime=h(),j(),"-->"!==a.substr(0,3))throw new b(b.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+k);a=a.substr(3),j(),f.endTime=h(),j(),i(a,f)}function g(a,b){function d(){function a(a){return b=b.substr(a.length),a}if(!b)return null;var c=b.match(/^([^<]*)(<[^>]+>?)?/);return a(c[1]?c[1]:c[2])}function e(a){return q[a]}function f(a){for(;o=a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)a=a.replace(o[0],e);return a}function g(a,b){return!t[b.localName]||t[b.localName]===a.localName}function h(b,c){var d=r[b];if(!d)return null;var e=a.document.createElement(d);e.localName=d;var f=s[b];return f&&c&&(e[f]=c.trim()),e}for(var i,j=a.document.createElement("div"),k=j,l=[];null!==(i=d());)if("<"!==i[0])k.appendChild(a.document.createTextNode(f(i)));else{if("/"===i[1]){l.length&&l[l.length-1]===i.substr(2).replace(">","")&&(l.pop(),k=k.parentNode);continue}var m,n=c(i.substr(1,i.length-2));if(n){m=a.document.createProcessingInstruction("timestamp",n),k.appendChild(m);continue}var o=i.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!o)continue;if(m=h(o[1],o[3]),!m)continue;if(!g(k,m))continue;o[2]&&(m.className=o[2].substr(1).replace("."," ")),l.push(o[1]),k.appendChild(m),k=m}return j}function h(a){for(var b=0;b<u.length;b++){var c=u[b];if(a>=c[0]&&a<=c[1])return!0}return!1}function i(a){function b(a,b){for(var c=b.childNodes.length-1;c>=0;c--)a.push(b.childNodes[c])}function c(a){if(!a||!a.length)return null;var d=a.pop(),e=d.textContent||d.innerText;if(e){var f=e.match(/^.*(\n|\r)/);return f?(a.length=0,f[0]):e}return"ruby"===d.tagName?c(a):d.childNodes?(b(a,d),c(a)):void 0}var d,e=[],f="";if(!a||!a.childNodes)return"ltr";for(b(e,a);f=c(e);)for(var g=0;g<f.length;g++)if(d=f.charCodeAt(g),h(d))return"rtl";return"ltr"}function j(a){if("number"==typeof a.line&&(a.snapToLines||a.line>=0&&a.line<=100))return a.line;if(!a.track||!a.track.textTrackList||!a.track.textTrackList.mediaElement)return-1;for(var b=a.track,c=b.textTrackList,d=0,e=0;e<c.length&&c[e]!==b;e++)"showing"===c[e].mode&&d++;return++d*-1}function k(){}function l(a,b,c){var d=/MSIE\s8\.0/.test(navigator.userAgent),e="rgba(255, 255, 255, 1)",f="rgba(0, 0, 0, 0.8)";d&&(e="rgb(255, 255, 255)",f="rgb(0, 0, 0)"),k.call(this),this.cue=b,this.cueDiv=g(a,b.text);var h={color:e,backgroundColor:f,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};d||(h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl",h.unicodeBidi="plaintext"),this.applyStyles(h,this.cueDiv),this.div=a.document.createElement("div"),h={textAlign:"middle"===b.align?"center":b.align,font:c.font,whiteSpace:"pre-line",position:"absolute"},d||(h.direction=i(this.cueDiv),h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(h),this.div.appendChild(this.cueDiv);var j=0;switch(b.positionAlign){case"start":j=b.position;break;case"middle":j=b.position-b.size/2;break;case"end":j=b.position-b.size}""===b.vertical?this.applyStyles({left:this.formatStyle(j,"%"),width:this.formatStyle(b.size,"%")}):this.applyStyles({top:this.formatStyle(j,"%"),height:this.formatStyle(b.size,"%")}),this.move=function(a){this.applyStyles({top:this.formatStyle(a.top,"px"),bottom:this.formatStyle(a.bottom,"px"),left:this.formatStyle(a.left,"px"),right:this.formatStyle(a.right,"px"),height:this.formatStyle(a.height,"px"),width:this.formatStyle(a.width,"px")})}}function m(a){var b,c,d,e,f=/MSIE\s8\.0/.test(navigator.userAgent);if(a.div){c=a.div.offsetHeight,d=a.div.offsetWidth,e=a.div.offsetTop;var g=(g=a.div.childNodes)&&(g=g[0])&&g.getClientRects&&g.getClientRects();a=a.div.getBoundingClientRect(),b=g?Math.max(g[0]&&g[0].height||0,a.height/g.length):0}this.left=a.left,this.right=a.right,this.top=a.top||e,this.height=a.height||c,this.bottom=a.bottom||e+(a.height||c),this.width=a.width||d,this.lineHeight=void 0!==b?b:a.lineHeight,f&&!this.lineHeight&&(this.lineHeight=13)}function n(a,b,c,d){function e(a,b){for(var e,f=new m(a),g=1,h=0;h<b.length;h++){for(;a.overlapsOppositeAxis(c,b[h])||a.within(c)&&a.overlapsAny(d);)a.move(b[h]);if(a.within(c))return a;var i=a.intersectPercentage(c);g>i&&(e=new m(a),g=i),a=new m(f)}return e||f}var f=new m(b),g=b.cue,h=j(g),i=[];if(g.snapToLines){var k;switch(g.vertical){case"":i=["+y","-y"],k="height";break;case"rl":i=["+x","-x"],k="width";break;case"lr":i=["-x","+x"],k="width"}var l=f.lineHeight,n=l*Math.round(h),o=c[k]+l,p=i[0];Math.abs(n)>o&&(n=n<0?-1:1,n*=Math.ceil(o/l)*l),h<0&&(n+=""===g.vertical?c.height:c.width,i=i.reverse()),f.move(p,n)}else{var q=f.lineHeight/c.height*100;switch(g.lineAlign){case"middle":h-=q/2;break;case"end":h-=q}switch(g.vertical){case"":b.applyStyles({top:b.formatStyle(h,"%")});break;case"rl":b.applyStyles({left:b.formatStyle(h,"%")});break;case"lr":b.applyStyles({right:b.formatStyle(h,"%")})}i=["+y","-x","+x","-y"],f=new m(b)}var r=e(f,i);b.move(r.toCSSCompatValues(c))}function o(){}var p=Object.create||function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return a.prototype=b,new a}}();b.prototype=p(Error.prototype),b.prototype.constructor=b,b.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},d.prototype={set:function(a,b){this.get(a)||""===b||(this.values[a]=b)},get:function(a,b,c){return c?this.has(a)?this.values[a]:b[c]:this.has(a)?this.values[a]:b},has:function(a){return a in this.values},alt:function(a,b,c){for(var d=0;d<c.length;++d)if(b===c[d]){this.set(a,b);break}},integer:function(a,b){/^-?\d+$/.test(b)&&this.set(a,parseInt(b,10))},percent:function(a,b){return!!(b.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(b=parseFloat(b),b>=0&&b<=100))&&(this.set(a,b),!0)}};var q={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},r={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},s={v:"title",lang:"lang"},t={rt:"ruby"},u=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];k.prototype.applyStyles=function(a,b){b=b||this.div;for(var c in a)a.hasOwnProperty(c)&&(b.style[c]=a[c])},k.prototype.formatStyle=function(a,b){return 0===a?0:a+b},l.prototype=p(k.prototype),l.prototype.constructor=l,m.prototype.move=function(a,b){switch(b=void 0!==b?b:this.lineHeight,a){case"+x":this.left+=b,this.right+=b;break;case"-x":this.left-=b,this.right-=b;break;case"+y":this.top+=b,this.bottom+=b;break;case"-y":this.top-=b,this.bottom-=b}},m.prototype.overlaps=function(a){return this.left<a.right&&this.right>a.left&&this.top<a.bottom&&this.bottom>a.top},m.prototype.overlapsAny=function(a){for(var b=0;b<a.length;b++)if(this.overlaps(a[b]))return!0;return!1},m.prototype.within=function(a){return this.top>=a.top&&this.bottom<=a.bottom&&this.left>=a.left&&this.right<=a.right},m.prototype.overlapsOppositeAxis=function(a,b){switch(b){case"+x":return this.left<a.left;case"-x":return this.right>a.right;case"+y":return this.top<a.top;case"-y":return this.bottom>a.bottom}},m.prototype.intersectPercentage=function(a){return Math.max(0,Math.min(this.right,a.right)-Math.max(this.left,a.left))*Math.max(0,Math.min(this.bottom,a.bottom)-Math.max(this.top,a.top))/(this.height*this.width)},m.prototype.toCSSCompatValues=function(a){return{top:this.top-a.top,bottom:a.bottom-this.bottom,left:this.left-a.left,right:a.right-this.right,height:this.height,width:this.width}},m.getSimpleBoxPosition=function(a){var b=a.div?a.div.offsetHeight:a.tagName?a.offsetHeight:0,c=a.div?a.div.offsetWidth:a.tagName?a.offsetWidth:0,d=a.div?a.div.offsetTop:a.tagName?a.offsetTop:0;return a=a.div?a.div.getBoundingClientRect():a.tagName?a.getBoundingClientRect():a,{left:a.left,right:a.right,top:a.top||d,height:a.height||b,bottom:a.bottom||d+(a.height||b),width:a.width||c}},o.StringDecoder=function(){return{decode:function(a){if(!a)return"";if("string"!=typeof a)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(a))}}},o.convertCueToDOMTree=function(a,b){return a&&b?g(a,b):null};o.processCues=function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(a[b].hasBeenReset||!a[b].displayState)return!0;return!1}if(!a||!b||!c)return null;for(;c.firstChild;)c.removeChild(c.firstChild);var e=a.document.createElement("div");if(e.style.position="absolute",e.style.left="0",e.style.right="0",e.style.top="0",e.style.bottom="0",e.style.margin="1.5%",c.appendChild(e),d(b)){var f=[],g=m.getSimpleBoxPosition(e),h=Math.round(.05*g.height*100)/100,i={font:h+"px sans-serif"};!function(){for(var c,d,h=0;h<b.length;h++)d=b[h],c=new l(a,d,i),e.appendChild(c.div),n(a,c,g,f),d.displayState=c.div,f.push(m.getSimpleBoxPosition(c))}()}else for(var j=0;j<b.length;j++)e.appendChild(b[j].displayState)},o.Parser=function(a,b,c){c||(c=b,b={}),b||(b={}),this.window=a,this.vttjs=b,this.state="INITIAL",this.buffer="",this.decoder=c||new TextDecoder("utf8"),this.regionList=[]},o.Parser.prototype={reportOrThrowError:function(a){if(!(a instanceof b))throw a;this.onparsingerror&&this.onparsingerror(a)},parse:function(a){function g(){for(var a=k.buffer,b=0;b<a.length&&"\r"!==a[b]&&"\n"!==a[b];)++b;var c=a.substr(0,b);return"\r"===a[b]&&++b,"\n"===a[b]&&++b,k.buffer=a.substr(b),c}function h(a){var b=new d;if(e(a,function(a,c){switch(a){case"id":b.set(a,c);break;case"width":b.percent(a,c);break;case"lines":b.integer(a,c);break;case"regionanchor":case"viewportanchor":var e=c.split(",");if(2!==e.length)break;var f=new d;if(f.percent("x",e[0]),f.percent("y",e[1]),!f.has("x")||!f.has("y"))break;b.set(a+"X",f.get("x")),b.set(a+"Y",f.get("y"));break;case"scroll":b.alt(a,c,["up"])}},/=/,/\s/),b.has("id")){var c=new(k.vttjs.VTTRegion||k.window.VTTRegion);c.width=b.get("width",100),c.lines=b.get("lines",3),c.regionAnchorX=b.get("regionanchorX",0),c.regionAnchorY=b.get("regionanchorY",100),c.viewportAnchorX=b.get("viewportanchorX",0),c.viewportAnchorY=b.get("viewportanchorY",100),c.scroll=b.get("scroll",""),k.onregion&&k.onregion(c),k.regionList.push({id:b.get("id"),region:c})}}function i(a){var b=new d;e(a,function(a,d){switch(a){case"MPEGT":b.integer(a+"S",d);break;case"LOCA":b.set(a+"L",c(d))}},/[^\d]:/,/,/),k.ontimestampmap&&k.ontimestampmap({MPEGTS:b.get("MPEGTS"),LOCAL:b.get("LOCAL")})}function j(a){a.match(/X-TIMESTAMP-MAP/)?e(a,function(a,b){switch(a){case"X-TIMESTAMP-MAP":i(b)}},/=/):e(a,function(a,b){switch(a){case"Region":h(b)}},/:/)}var k=this;a&&(k.buffer+=k.decoder.decode(a,{stream:!0}));try{var l;if("INITIAL"===k.state){if(!/\r\n|\n/.test(k.buffer))return this;l=g();var m=l.match(/^WEBVTT([ \t].*)?$/);if(!m||!m[0])throw new b(b.Errors.BadSignature);k.state="HEADER"}for(var n=!1;k.buffer;){if(!/\r\n|\n/.test(k.buffer))return this;switch(n?n=!1:l=g(),k.state){case"HEADER":/:/.test(l)?j(l):l||(k.state="ID");continue;case"NOTE":l||(k.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(l)){k.state="NOTE";break}if(!l)continue;if(k.cue=new(k.vttjs.VTTCue||k.window.VTTCue)(0,0,""),k.state="CUE",l.indexOf("-->")===-1){k.cue.id=l;continue}case"CUE":try{f(l,k.cue,k.regionList)}catch(o){k.reportOrThrowError(o),k.cue=null,k.state="BADCUE";continue}k.state="CUETEXT";continue;case"CUETEXT":var p=l.indexOf("-->")!==-1;if(!l||p&&(n=!0)){k.oncue&&k.oncue(k.cue),k.cue=null,k.state="ID";continue}k.cue.text&&(k.cue.text+="\n"),k.cue.text+=l;continue;case"BADCUE":l||(k.state="ID");continue}}}catch(o){k.reportOrThrowError(o),"CUETEXT"===k.state&&k.cue&&k.oncue&&k.oncue(k.cue),k.cue=null,k.state="INITIAL"===k.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var a=this;try{if(a.buffer+=a.decoder.decode(),(a.cue||"HEADER"===a.state)&&(a.buffer+="\n\n",a.parse()),"INITIAL"===a.state)throw new b(b.Errors.BadSignature)}catch(c){a.reportOrThrowError(c)}return a.onflush&&a.onflush(),this}},a.WebVTT=o}(this,this.vttjs)},{}],107:[function(a,b,c){void 0!==b&&b.exports&&(this.VTTCue=this.VTTCue||a(108).VTTCue),function(a){a.VTTCue.prototype.toJSON=function(){var a={},b=this;return Object.keys(this).forEach(function(c){"getCueAsHTML"!==c&&"hasBeenReset"!==c&&"displayState"!==c&&(a[c]=b[c])}),a},a.VTTCue.create=function(b){if(!b.hasOwnProperty("startTime")||!b.hasOwnProperty("endTime")||!b.hasOwnProperty("text"))throw new Error("You must at least have start time, end time, and text.");var c=new a.VTTCue(b.startTime,b.endTime,b.text);for(var d in b)c.hasOwnProperty(d)&&(c[d]=b[d]);return c},a.VTTCue.fromJSON=function(a){return this.create(JSON.parse(a))}}(this)},{108:108}],108:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!g[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"string"==typeof a&&(!!h[a.toLowerCase()]&&a.toLowerCase())}function e(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function f(a,b,f){var g=this,h=/MSIE\s8\.0/.test(navigator.userAgent),i={};h?g=document.createElement("custom"):i.enumerable=!0,g.hasBeenReset=!1;var j="",k=!1,l=a,m=b,n=f,o=null,p="",q=!0,r="auto",s="start",t=50,u="middle",v=50,w="middle";if(Object.defineProperty(g,"id",e({},i,{get:function(){return j},set:function(a){j=""+a}})),Object.defineProperty(g,"pauseOnExit",e({},i,{get:function(){return k},set:function(a){k=!!a}})),Object.defineProperty(g,"startTime",e({},i,{get:function(){return l},set:function(a){if("number"!=typeof a)throw new TypeError("Start time must be set to a number.");l=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"endTime",e({},i,{get:function(){return m},set:function(a){if("number"!=typeof a)throw new TypeError("End time must be set to a number.");m=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"text",e({},i,{get:function(){return n},set:function(a){n=""+a,this.hasBeenReset=!0}})),Object.defineProperty(g,"region",e({},i,{get:function(){return o},set:function(a){o=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"vertical",e({},i,{get:function(){return p},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");p=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"snapToLines",e({},i,{get:function(){return q},set:function(a){q=!!a,this.hasBeenReset=!0}})),Object.defineProperty(g,"line",e({},i,{get:function(){return r},set:function(a){if("number"!=typeof a&&"auto"!==a)throw new SyntaxError("An invalid number or illegal string was specified.");r=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"lineAlign",e({},i,{get:function(){return s},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");s=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"position",e({},i,{get:function(){return t},set:function(a){if(a<0||a>100)throw new Error("Position must be between 0 and 100.");t=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"positionAlign",e({},i,{get:function(){return u},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");u=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"size",e({},i,{get:function(){return v},set:function(a){if(a<0||a>100)throw new Error("Size must be between 0 and 100.");v=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"align",e({},i,{get:function(){return w},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");w=b,this.hasBeenReset=!0}})),g.displayState=void 0,h)return g}var g={"":!0,lr:!0,rl:!0},h={start:!0,middle:!0,end:!0,left:!0,right:!0};f.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},a.VTTCue=a.VTTCue||f,b.VTTCue=f}(this,this.vttjs||{})},{}],109:[function(a,b,c){void 0!==b&&b.exports&&(this.VTTRegion=a(110).VTTRegion),function(a){a.VTTRegion.create=function(b){var c=new a.VTTRegion;for(var d in b)c.hasOwnProperty(d)&&(c[d]=b[d]);return c},a.VTTRegion.fromJSON=function(a){return this.create(JSON.parse(a))}}(this)},{110:110}],110:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!f[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"number"==typeof a&&a>=0&&a<=100}function e(){var a=100,b=3,e=0,f=100,g=0,h=100,i="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return a},set:function(b){if(!d(b))throw new Error("Width must be between 0 and 100.");a=b}},lines:{enumerable:!0,get:function(){return b},set:function(a){if("number"!=typeof a)throw new TypeError("Lines must be set to a number.");b=a}},regionAnchorY:{enumerable:!0,get:function(){return f},set:function(a){if(!d(a))throw new Error("RegionAnchorX must be between 0 and 100.");f=a}},regionAnchorX:{enumerable:!0,get:function(){return e},set:function(a){if(!d(a))throw new Error("RegionAnchorY must be between 0 and 100.");e=a}},viewportAnchorY:{enumerable:!0,get:function(){return h},set:function(a){if(!d(a))throw new Error("ViewportAnchorY must be between 0 and 100.");h=a}},viewportAnchorX:{enumerable:!0,get:function(){return g},set:function(a){if(!d(a))throw new Error("ViewportAnchorX must be between 0 and 100.");g=a}},scroll:{enumerable:!0,get:function(){return i},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");i=b}}})}var f={"":!0,up:!0};a.VTTRegion=a.VTTRegion||e,b.VTTRegion=e}(this,this.vttjs||{})},{}]},{},[93])(93)});
!function e(t,i,n){function r(s,o){if(!i[s]){if(!t[s]){var u="function"==typeof require&&require;if(!o&&u)return u(s,!0);if(a)return a(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var l=i[s]={exports:{}};t[s][0].call(l.exports,function(e){var i=t[s][1][e];return r(i?i:e)},l,l.exports,e,t,i,n)}return i[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){var i=[],n=!0,r=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(u){r=!0,a=u}finally{try{!n&&o["return"]&&o["return"]()}finally{if(r)throw a}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=e(28),s=n(a),o=function(e,t){for(var i=e.cues,n=0;n<i.length;n++){var r=i[n];if(t>=r.adStartTime&&t<=r.adEndTime)return r}return null},u=function(e,t){var i=arguments.length<=2||void 0===arguments[2]?0:arguments[2];if(e.segments)for(var n=i,a=void 0,u=0;u<e.segments.length;u++){var d=e.segments[u];if(a||(a=o(t,n+d.duration/2)),a){if("cueIn"in d){a.endTime=n,a.adEndTime=n,n+=d.duration,a=null;continue}if(n<a.endTime){n+=d.duration;continue}a.endTime+=d.duration}else if("cueOut"in d&&(a=new s["default"].VTTCue(n,n+d.duration,d.cueOut),a.adStartTime=n,a.adEndTime=n+parseFloat(d.cueOut),t.addCue(a)),"cueOutCont"in d){var l=void 0,f=void 0,c=d.cueOutCont.split("/").map(parseFloat),h=r(c,2);l=h[0],f=h[1],a=new s["default"].VTTCue(n,n+d.duration,""),a.adStartTime=n-l,a.adEndTime=a.adStartTime+f,t.addCue(a)}n+=d.duration}};i["default"]={updateAdCues:u,findAdCue:o},t.exports=i["default"]},{}],2:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t){return e.start(t)+"-"+e.end(t)},r=function(e,t){var i=e.toString(16);return"00".substring(0,2-i.length)+i+(t%2?" ":"")},a=function(e){return e>=32&&e<126?String.fromCharCode(e):"."},s=function(e){var t={};return Object.keys(e).forEach(function(i){var n=e[i];ArrayBuffer.isView(n)?t[i]={bytes:n.buffer,byteOffset:n.byteOffset,byteLength:n.byteLength}:t[i]=n}),t},o={hexDump:function(e){for(var t=Array.prototype.slice.call(e),i="",n=void 0,s=void 0,o=0;o<t.length/16;o++)n=t.slice(16*o,16*o+16).map(r).join(""),s=t.slice(16*o,16*o+16).map(a).join(""),i+=n+" "+s+"\n";return i},tagDump:function(e){return o.hexDump(e.bytes)},textRanges:function(e){var t="",i=void 0;for(i=0;i<e.length;i++)t+=n(e,i)+" ";return t},createTransferableMessage:s};i["default"]=o,t.exports=i["default"]},{}],3:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i["default"]={GOAL_BUFFER_LENGTH:30},t.exports=i["default"]},{}],4:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=e(28),a=n(r),s=e(21),o=e(2),u=function(e){e.onmessage=function(e){var t=e.data,i=new Uint8Array(t.encrypted.bytes,t.encrypted.byteOffset,t.encrypted.byteLength),n=new Uint32Array(t.key.bytes,t.key.byteOffset,t.key.byteLength/4),r=new Uint32Array(t.iv.bytes,t.iv.byteOffset,t.iv.byteLength/4);new s.Decrypter(i,n,r,function(e,i){a["default"].postMessage((0,o.createTransferableMessage)({source:t.source,decrypted:i}),[i.buffer])})}};i["default"]=function(e){return new u(e)},t.exports=i["default"]},{}],5:[function(e,t,i){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},u=e(7),d=n(u),l=e(13),f=n(l),c=e(9),h=n(c),p="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,m=n(p),g=e(1),y=n(g),v=e(16),_=n(v),b=e(62),T=e(73),S=n(T),w=e(4),k=n(w),O=void 0,P=function(e,t){if(typeof e!=typeof t)return!0;if(Object.keys(e).length!==Object.keys(t).length)return!0;for(var i in e)if(e[i]!==t[i])return!0;return!1},A=function(e){var t={codecCount:0,videoCodec:null,videoObjectTypeIndicator:null,audioProfile:null},i=void 0;return t.codecCount=e.split(",").length,t.codecCount=t.codecCount||2,i=/(^|\s|,)+(avc1)([^ ,]*)/i.exec(e),i&&(t.videoCodec=i[2],t.videoObjectTypeIndicator=i[3]),t.audioProfile=/(^|\s|,)+mp4a.[0-9A-Fa-f]+\.([0-9A-Fa-f]+)/i.exec(e),t.audioProfile=t.audioProfile&&t.audioProfile[2],t},E=function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(e){return(0,b.translateLegacyCodecs)([e])[0]})};i.mapLegacyAvcCodecs_=E;var L=function(e,t){var i="mp2t",n={videoCodec:"avc1",videoObjectTypeIndicator:".4d400d",audioProfile:"2"},r=[],a=void 0,s=null;if(!t)return[];t.segments&&t.segments.length&&t.segments[0].map&&(i="mp4"),a=t.attributes||{},a.CODECS&&function(){var e=A(a.CODECS);Object.keys(e).forEach(function(t){n[t]=e[t]||n[t]})}(),e.mediaGroups.AUDIO&&(r=e.mediaGroups.AUDIO[a.AUDIO]);for(var o in r){if(s&&!!r[o].uri!=!!s.uri)return["video/"+i+'; codecs="'+n.videoCodec+n.videoObjectTypeIndicator+", mp4a.40."+n.audioProfile+'"',"audio/"+i+'; codecs="mp4a.40.'+n.audioProfile+'"'];s=r[o]}return s&&s.uri?["video/"+i+'; codecs="'+n.videoCodec+n.videoObjectTypeIndicator+'"',"audio/"+i+'; codecs="mp4a.40.'+n.audioProfile+'"']:["video/"+i+'; codecs="'+n.videoCodec+n.videoObjectTypeIndicator+", mp4a.40."+n.audioProfile+'"']};i.mimeTypesForPlaylist_=L;var x=function(e){function t(e){var i=this;r(this,t),o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this);var n=e.url,a=e.withCredentials,s=e.mode,u=e.tech,l=e.bandwidth,c=e.externHls,h=e.useCueTags;if(!n)throw new Error("A non-empty playlist URL is required");O=c,this.withCredentials=a,this.tech_=u,this.hls_=u.hls,this.mode_=s,this.useCueTags_=h,this.useCueTags_&&(this.cueTagsTrack_=this.tech_.addTextTrack("metadata","ad-cues"),this.cueTagsTrack_.inBandMetadataTrackDispatchType=""),this.audioTracks_=[],this.requestOptions_={withCredentials:this.withCredentials,timeout:null},this.audioGroups_={},this.mediaSource=new m["default"].MediaSource({mode:s}),this.audioinfo_=null,this.mediaSource.on("audioinfo",this.handleAudioinfoUpdate_.bind(this)),this.mediaSource.addEventListener("sourceopen",this.handleSourceOpen_.bind(this)),this.seekable_=m["default"].createTimeRanges(),this.hasPlayed_=function(){return!1},this.syncController_=new _["default"],this.decrypter_=(0,S["default"])(k["default"]);var p={hls:this.hls_,mediaSource:this.mediaSource,currentTime:this.tech_.currentTime.bind(this.tech_),seekable:function(){return i.seekable()},seeking:function(){return i.tech_.seeking()},setCurrentTime:function(e){return i.tech_.setCurrentTime(e)},hasPlayed:function(){return i.hasPlayed_()},bandwidth:l,syncController:this.syncController_,decrypter:this.decrypter_,loaderType:"main"};this.masterPlaylistLoader_=new d["default"](n,this.hls_,this.withCredentials),this.setupMasterPlaylistLoaderListeners_(),this.audioPlaylistLoader_=null,this.mainSegmentLoader_=new f["default"](p),p.loaderType="audio",this.audioSegmentLoader_=new f["default"](p),this.decrypter_.onmessage=function(e){"main"===e.data.source?i.mainSegmentLoader_.handleDecrypted_(e.data):"audio"===e.data.source&&i.audioSegmentLoader_.handleDecrypted_(e.data)},this.setupSegmentLoaderListeners_(),this.masterPlaylistLoader_.start()}return a(t,e),s(t,[{key:"setupMasterPlaylistLoaderListeners_",value:function(){var e=this;this.masterPlaylistLoader_.on("loadedmetadata",function(){var t=e.masterPlaylistLoader_.media(),i=1.5*e.masterPlaylistLoader_.targetDuration*1e3;e.masterPlaylistLoader_.isLowestEnabledRendition_()?e.requestOptions_.timeout=0:e.requestOptions_.timeout=i,t.endList&&"none"!==e.tech_.preload()&&(e.mainSegmentLoader_.playlist(t,e.requestOptions_),e.mainSegmentLoader_.load()),e.fillAudioTracks_(),e.setupAudio();try{e.setupSourceBuffers_()}catch(n){return m["default"].log.warn("Failed to create SourceBuffers",n),e.mediaSource.endOfStream("decode")}e.setupFirstPlay(),e.trigger("audioupdate"),e.trigger("selectedinitialmedia")}),this.masterPlaylistLoader_.on("loadedplaylist",function(){var t=e.masterPlaylistLoader_.media();if(!t)return e.initialMedia_=e.selectPlaylist(),void e.masterPlaylistLoader_.media(e.initialMedia_);e.useCueTags_&&e.updateAdCues_(t),e.mainSegmentLoader_.playlist(t,e.requestOptions_),e.updateDuration(),t.endList||function(){var t=function(){var t=e.seekable();0!==t.length&&e.mediaSource.addSeekableRange_(t.start(0),t.end(0))};e.duration()!==1/0?function(){var i=function n(){e.duration()===1/0?t():e.tech_.one("durationchange",n)};e.tech_.one("durationchange",i)}():t()}()}),this.masterPlaylistLoader_.on("error",function(){e.blacklistCurrentPlaylist(e.masterPlaylistLoader_.error)}),this.masterPlaylistLoader_.on("mediachanging",function(){e.mainSegmentLoader_.abort(),e.mainSegmentLoader_.pause()}),this.masterPlaylistLoader_.on("mediachange",function(){var t=e.masterPlaylistLoader_.media(),i=1.5*e.masterPlaylistLoader_.targetDuration*1e3,n=void 0,r=void 0;e.masterPlaylistLoader_.isLowestEnabledRendition_()?e.requestOptions_.timeout=0:e.requestOptions_.timeout=i,e.mainSegmentLoader_.playlist(t,e.requestOptions_),e.mainSegmentLoader_.load(),n=e.activeAudioGroup(),r=n.filter(function(e){return e.enabled})[0],r||(e.setupAudio(),e.trigger("audioupdate")),e.tech_.trigger({type:"mediachange",bubbles:!0})})}},{key:"setupSegmentLoaderListeners_",value:function(){var e=this;this.mainSegmentLoader_.on("progress",function(){e.masterPlaylistLoader_.media(e.selectPlaylist()),e.trigger("progress")}),this.mainSegmentLoader_.on("error",function(){e.blacklistCurrentPlaylist(e.mainSegmentLoader_.error())}),this.mainSegmentLoader_.on("syncinfoupdate",function(){e.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("syncinfoupdate",function(){e.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("error",function(){m["default"].log.warn("Problem encountered with the current alternate audio track. Switching back to default."),e.audioSegmentLoader_.abort(),e.audioPlaylistLoader_=null,e.setupAudio()})}},{key:"handleAudioinfoUpdate_",value:function(e){if(O.supportsAudioInfoChange_()||!this.audioInfo_||!P(this.audioInfo_,e.info))return void(this.audioInfo_=e.info);var t="had different audio properties (channels, sample rate, etc.) or changed in some other way.  This behavior is currently unsupported in Firefox 48 and below due to an issue: \n\nhttps://bugzilla.mozilla.org/show_bug.cgi?id=1247138\n\n",i=this.activeAudioGroup().map(function(e){return e.enabled}).indexOf(!0),n=this.activeAudioGroup()[i],r=this.activeAudioGroup().filter(function(e){return e.properties_&&e.properties_["default"]})[0];this.audioPlaylistLoader_?(t="The audio track '"+n.label+"' that we tried to switch to "+t+" Unfortunately this means we will have to return you to the main track '"+r.label+"'. Sorry!",r.enabled=!0,this.activeAudioGroup().splice(i,1),this.trigger("audioupdate")):(t="The rendition that we tried to switch to "+t+"Unfortunately that means we will have to blacklist the current playlist and switch to another. Sorry!",this.blacklistCurrentPlaylist()),m["default"].log.warn(t),this.setupAudio()}},{key:"mediaRequests_",value:function(){return this.audioSegmentLoader_.mediaRequests+this.mainSegmentLoader_.mediaRequests}},{key:"mediaTransferDuration_",value:function(){return this.audioSegmentLoader_.mediaTransferDuration+this.mainSegmentLoader_.mediaTransferDuration}},{key:"mediaBytesTransferred_",value:function(){return this.audioSegmentLoader_.mediaBytesTransferred+this.mainSegmentLoader_.mediaBytesTransferred}},{key:"mediaSecondsLoaded_",value:function(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}},{key:"fillAudioTracks_",value:function(){var e=this.master(),t=e.mediaGroups||{};t&&t.AUDIO&&0!==Object.keys(t.AUDIO).length&&"html5"===this.mode_||(t.AUDIO={main:{"default":{"default":!0}}});for(var i in t.AUDIO){this.audioGroups_[i]||(this.audioGroups_[i]=[]);for(var n in t.AUDIO[i]){var r=t.AUDIO[i][n],a=new m["default"].AudioTrack({id:n,kind:r["default"]?"main":"alternative",enabled:!1,language:r.language,label:n});a.properties_=r,this.audioGroups_[i].push(a)}}(this.activeAudioGroup().filter(function(e){return e.properties_["default"]})[0]||this.activeAudioGroup()[0]).enabled=!0}},{key:"load",value:function(){this.mainSegmentLoader_.load(),this.audioPlaylistLoader_&&this.audioSegmentLoader_.load()}},{key:"activeAudioGroup",value:function(){var e=this.masterPlaylistLoader_.media(),t=void 0;return e.attributes&&e.attributes.AUDIO&&(t=this.audioGroups_[e.attributes.AUDIO]),t||this.audioGroups_.main}},{key:"setupAudio",value:function(){var e=this,t=this.activeAudioGroup(),i=t.filter(function(e){return e.enabled})[0];if(i||(i=t.filter(function(e){return e.properties_["default"]})[0]||t[0],i.enabled=!0),this.audioPlaylistLoader_&&(this.audioPlaylistLoader_.dispose(),this.audioPlaylistLoader_=null),this.audioSegmentLoader_.pause(),!i.properties_.resolvedUri)return void this.mainSegmentLoader_.resetEverything();this.audioSegmentLoader_.resetEverything(),this.audioPlaylistLoader_=new d["default"](i.properties_.resolvedUri,this.hls_,this.withCredentials),this.audioPlaylistLoader_.start(),this.audioPlaylistLoader_.on("loadedmetadata",function(){var t=e.audioPlaylistLoader_.media();e.audioSegmentLoader_.playlist(t,e.requestOptions_),(!e.tech_.paused()||t.endList&&"none"!==e.tech_.preload())&&e.audioSegmentLoader_.load(),t.endList||e.audioPlaylistLoader_.trigger("firstplay")}),this.audioPlaylistLoader_.on("loadedplaylist",function(){var t=void 0;if(e.audioPlaylistLoader_&&(t=e.audioPlaylistLoader_.media()),!t)return void e.audioPlaylistLoader_.media(e.audioPlaylistLoader_.playlists.master.playlists[0]);e.audioSegmentLoader_.playlist(t,e.requestOptions_)}),this.audioPlaylistLoader_.on("error",function(){m["default"].log.warn("Problem encountered loading the alternate audio track. Switching back to default."),e.audioSegmentLoader_.abort(),e.setupAudio()})}},{key:"fastQualityChange_",value:function(){var e=this.selectPlaylist();e!==this.masterPlaylistLoader_.media()&&(this.masterPlaylistLoader_.media(e),this.mainSegmentLoader_.resetLoader(),this.audiosegmentloader_&&this.audioSegmentLoader_.resetLoader())}},{key:"play",value:function(){if(!this.setupFirstPlay()){this.tech_.ended()&&this.tech_.setCurrentTime(0),this.hasPlayed_()&&this.load();var e=this.tech_.seekable();return this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0)?this.tech_.setCurrentTime(e.end(e.length-1)):void 0}}},{key:"setupFirstPlay",value:function(){var e=void 0,t=this.masterPlaylistLoader_.media();return!(!t||this.tech_.paused()||this.hasPlayed_())&&(t.endList||(this.trigger("firstplay"),e=this.seekable(),e.length&&this.tech_.setCurrentTime(e.end(0))),this.hasPlayed_=function(){return!0},this.load(),!0)}},{key:"handleSourceOpen_",value:function(){try{this.setupSourceBuffers_()}catch(e){return m["default"].log.warn("Failed to create Source Buffers",e),this.mediaSource.endOfStream("decode")}this.tech_.autoplay()&&this.tech_.play(),this.trigger("sourceopen")}},{key:"blacklistCurrentPlaylist",value:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=void 0,i=void 0;return(t=e.playlist||this.masterPlaylistLoader_.media())?(t.excludeUntil=Date.now()+3e5,(i=this.selectPlaylist())?(m["default"].log.warn("Problem encountered with the current HLS playlist. Switching to another playlist."),this.masterPlaylistLoader_.media(i)):(m["default"].log.warn("Problem encountered with the current HLS playlist. No suitable alternatives found."),this.error=e,this.mediaSource.endOfStream("network"))):(this.error=e,this.mediaSource.endOfStream("network"))}},{key:"pauseLoading",value:function(){this.mainSegmentLoader_.pause(),this.audioPlaylistLoader_&&this.audioSegmentLoader_.pause()}},{key:"setCurrentTime",value:function(e){var t=h["default"].findRange(this.tech_.buffered(),e);if(!this.masterPlaylistLoader_||!this.masterPlaylistLoader_.media())return 0;if(!this.masterPlaylistLoader_.media().segments)return 0;var i="flash"===this.mode_||"auto"===this.mode_&&!m["default"].MediaSource.supportsNativeMediaSources();if(t&&t.length&&!i)return e;this.mainSegmentLoader_.resetEverything(),this.mainSegmentLoader_.abort(),this.audioPlaylistLoader_&&(this.audioSegmentLoader_.resetEverything(),this.audioSegmentLoader_.abort()),this.tech_.paused()||(this.mainSegmentLoader_.load(),this.audioPlaylistLoader_&&this.audioSegmentLoader_.load())}},{key:"duration",value:function(){return this.masterPlaylistLoader_?this.mediaSource?this.mediaSource.duration:O.Playlist.duration(this.masterPlaylistLoader_.media()):0}},{key:"seekable",value:function(){return this.seekable_}},{key:"onSyncInfoUpdate_",value:function(){var e=void 0,t=void 0,i=void 0;this.masterPlaylistLoader_&&(e=this.masterPlaylistLoader_.media(),e&&(t=O.Playlist.seekable(e),0!==t.length&&(this.audioPlaylistLoader_&&(i=O.Playlist.seekable(this.audioPlaylistLoader_.media()),0===i.length)||(i?i.start(0)>t.end(0)||t.start(0)>i.end(0)?this.seekable_=t:this.seekable_=m["default"].createTimeRanges([[i.start(0)>t.start(0)?i.start(0):t.start(0),i.end(0)<t.end(0)?i.end(0):t.end(0)]]):this.seekable_=t,this.tech_.trigger("seekablechanged")))))}},{key:"updateDuration",value:function(){var e=this,t=this.mediaSource.duration,i=O.Playlist.duration(this.masterPlaylistLoader_.media()),n=this.tech_.buffered(),r=function a(){e.mediaSource.duration=i,e.tech_.trigger("durationchange"),e.mediaSource.removeEventListener("sourceopen",a)};n.length>0&&(i=Math.max(i,n.end(n.length-1))),t!==i&&("open"!==this.mediaSource.readyState?this.mediaSource.addEventListener("sourceopen",r):r())}},{key:"dispose",value:function(){this.decrypter_.terminate(),this.masterPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),this.audioPlaylistLoader_&&this.audioPlaylistLoader_.dispose(),this.audioSegmentLoader_.dispose()}},{key:"master",value:function(){return this.masterPlaylistLoader_.master}},{key:"media",value:function(){return this.masterPlaylistLoader_.media()||this.initialMedia_}},{key:"setupSourceBuffers_",value:function(){var e=this.masterPlaylistLoader_.media(),t=void 0;if(e&&"open"===this.mediaSource.readyState){if(t=L(this.masterPlaylistLoader_.master,e),t.length<1)return this.error="No compatible SourceBuffer configuration for the variant stream:"+e.resolvedUri,this.mediaSource.endOfStream("decode");this.mainSegmentLoader_.mimeType(t[0]),t[1]&&this.audioSegmentLoader_.mimeType(t[1]),this.excludeIncompatibleVariants_(e)}}},{key:"excludeIncompatibleVariants_",value:function(e){var t=this.masterPlaylistLoader_.master,i=2,n=null,r=void 0;e.attributes&&e.attributes.CODECS&&(r=A(e.attributes.CODECS),n=r.videoCodec,i=r.codecCount),t.playlists.forEach(function(e){var t={codecCount:2,videoCodec:null};if(e.attributes&&e.attributes.CODECS){var r=e.attributes.CODECS;t=A(r),window.MediaSource&&window.MediaSource.isTypeSupported&&!window.MediaSource.isTypeSupported('video/mp4; codecs="'+E(r)+'"')&&(e.excludeUntil=1/0)}t.codecCount!==i&&(e.excludeUntil=1/0),t.videoCodec!==n&&(e.excludeUntil=1/0)})}},{key:"updateAdCues_",value:function(e){var t=0,i=this.seekable();i.length&&(t=i.start(0)),y["default"].updateAdCues(e,this.cueTagsTrack_,t)}}]),t}(m["default"].EventTarget);i.MasterPlaylistController=x}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=e(9),u=r(o),d="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,l=r(d),f=["seeking","seeked","pause","playing","error"],c=function(){function e(t){var i=this;a(this,e),this.tech_=t.tech,this.seekable=t.seekable,this.consecutiveUpdates=0,this.lastRecordedTime=null,this.timer_=null,this.checkCurrentTimeTimeout_=null,t.debug&&(this.logger_=l["default"].log.bind(l["default"],"playback-watcher ->")),this.logger_("initialize");var n=function(){return i.waiting_()},r=function(){return i.cancelTimer_()},s=function(){return i.fixesBadSeeks_()};this.tech_.on("seekablechanged",s),this.tech_.on("waiting",n),this.tech_.on(f,r),this.monitorCurrentTime_(),this.dispose=function(){i.logger_("dispose"),i.tech_.off("seekablechanged",s),i.tech_.off("waiting",n),i.tech_.off(f,r),i.checkCurrentTimeTimeout_&&clearTimeout(i.checkCurrentTimeTimeout_),i.cancelTimer_()}}return s(e,[{key:"monitorCurrentTime_",value:function(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=setTimeout(this.monitorCurrentTime_.bind(this),250)}},{key:"checkCurrentTime_",value:function(){if(this.tech_.seeking()&&this.fixesBadSeeks_())return this.consecutiveUpdates=0,void(this.lastRecordedTime=this.tech_.currentTime());if(!this.tech_.paused()&&!this.tech_.seeking()){var e=this.tech_.currentTime();this.consecutiveUpdates>=5&&e===this.lastRecordedTime?(this.consecutiveUpdates++,this.waiting_()):e===this.lastRecordedTime?this.consecutiveUpdates++:(this.consecutiveUpdates=0,this.lastRecordedTime=e)}}},{key:"cancelTimer_",value:function(){this.consecutiveUpdates=0,this.timer_&&(this.logger_("cancelTimer_"),clearTimeout(this.timer_)),this.timer_=null}},{key:"fixesBadSeeks_",value:function(){var e=this.seekable(),t=this.tech_.currentTime();if(this.tech_.seeking()&&this.outsideOfSeekableWindow_(e,t)){var i=e.end(e.length-1);return this.logger_("Trying to seek outside of seekable at time "+t+" with seekable range "+u["default"].printableRange(e)+". Seeking to "+i+"."),this.tech_.setCurrentTime(i),!0}return!1}},{key:"waiting_",value:function(){var e=this.seekable(),t=this.tech_.currentTime();if(!(this.tech_.seeking()&&this.fixesBadSeeks_()||this.tech_.seeking()||null!==this.timer_)){if(this.fellOutOfLiveWindow_(e,t)){var i=e.end(e.length-1);return this.logger_("Fell out of live window at time "+t+". Seeking to live point (seekable end) "+i),this.cancelTimer_(),this.tech_.setCurrentTime(i),void this.tech_.trigger("liveresync")}var n=this.tech_.buffered(),r=u["default"].findNextRange(n,t);if(this.videoUnderflow_(r,n,t))return this.cancelTimer_(),this.tech_.setCurrentTime(t),void this.tech_.trigger("videounderflow");if(r.length>0){var a=r.start(0)-t;this.logger_("Stopped at "+t+", setting timer for "+a+", seeking to "+r.start(0)),this.timer_=setTimeout(this.skipTheGap_.bind(this),1e3*a,t)}}}},{key:"outsideOfSeekableWindow_",value:function(e,t){return!!e.length&&(t<e.start(0)-.1||t>e.end(e.length-1)+.1)}},{key:"fellOutOfLiveWindow_",value:function(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0))}},{key:"videoUnderflow_",value:function(e,t,i){if(0===e.length){var n=this.gapFromVideoUnderflow_(t,i);if(n)return this.logger_("Encountered a gap in video from "+n.start+" to "+n.end+". Seeking to current time "+i),!0}return!1}},{key:"skipTheGap_",value:function(e){var t=this.tech_.buffered(),i=this.tech_.currentTime(),n=u["default"].findNextRange(t,i);this.cancelTimer_(),0!==n.length&&i===e&&(this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",n.start(0)),this.tech_.setCurrentTime(n.start(0)+u["default"].TIME_FUDGE_FACTOR))}},{key:"gapFromVideoUnderflow_",value:function(e,t){for(var i=u["default"].findGaps(e),n=0;n<i.length;n++){var r=i.start(n),a=i.end(n);if(t-r<4&&t-r>2)return{start:r,end:a}}return null}},{key:"logger_",value:function(){}}]),e}();i["default"]=c,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var a=e(12),s=r(a),o="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,u=e(8),d=e(15),l=r(d),f=e(29),c=r(f),h=e(28),p=r(h),m=function(e,t,i){var n=t.slice(),r=void 0,a=void 0;for(i=i||0,r=Math.min(e.length,t.length+i),a=i;a<r;a++)n[a-i]=(0,o.mergeOptions)(e[a],n[a-i]);return n},g=function(e,t){for(var i=!1,n=(0,o.mergeOptions)(e,{}),r=e.playlists.length,a=void 0,u=void 0,d=void 0;r--;)if(a=n.playlists[r],a.uri===t.uri){if(a.segments&&t.segments&&a.segments.length===t.segments.length&&a.mediaSequence===t.mediaSequence)continue;for(n.playlists[r]=(0,o.mergeOptions)(a,t),n.playlists[t.uri]=n.playlists[r],a.segments&&(n.playlists[r].segments=m(a.segments,t.segments,t.mediaSequence-a.mediaSequence)),d=0,n.playlists[r].segments&&(d=n.playlists[r].segments.length);d--;)u=n.playlists[r].segments[d],u.resolvedUri||(u.resolvedUri=(0,s["default"])(a.resolvedUri,u.uri)),u.key&&!u.key.resolvedUri&&(u.key.resolvedUri=(0,s["default"])(a.resolvedUri,u.key.uri)),u.map&&!u.map.resolvedUri&&(u.map.resolvedUri=(0,s["default"])(a.resolvedUri,u.map.uri));i=!0}return i?n:null},y=function v(e,t,i){var n=this,r=this,a=void 0,o=void 0,d=void 0,l=void 0,f=void 0;if(v.prototype.constructor.call(this),this.hls_=t,!e)throw new Error("A non-empty playlist URL is required");l=function(e,t,i){r.setBandwidth(d||e),d=null,i&&(r.state=i),r.error={playlist:r.master.playlists[t],status:e.status,message:"HLS playlist request error at URL: "+t,responseText:e.responseText,code:e.status>=500?4:2},r.trigger("error")},f=function(e,t){var i=void 0,n=void 0,a=void 0;r.setBandwidth(d||e),d=null,r.state="HAVE_METADATA",i=new c["default"].Parser,i.push(e.responseText),i.end(),i.manifest.uri=t,a=g(r.master,i.manifest),n=1e3*(i.manifest.targetDuration||10),r.targetDuration=i.manifest.targetDuration,a?(r.master=a,r.media_=r.master.playlists[i.manifest.uri]):n/=2,r.media().endList||(p["default"].clearTimeout(o),o=p["default"].setTimeout(function(){r.trigger("mediaupdatetimeout")},n)),r.trigger("loadedplaylist")},r.state="HAVE_NOTHING",a=this.dispose,r.dispose=function(){r.stopRequest(),p["default"].clearTimeout(o),a.call(this)},r.stopRequest=function(){if(d){var e=d;d=null,e.onreadystatechange=null,e.abort()}},r.enabledPlaylists_=function(){return r.master.playlists.filter(u.isEnabled).length},r.isLowestEnabledRendition_=function(){if(1===r.master.playlists.length)return!0;var e=r.media(),t=e.attributes.BANDWIDTH||Number.MAX_VALUE;return 0===r.master.playlists.filter(function(e){if(!(0,u.isEnabled)(e))return!1;var i=0;return e&&e.attributes&&(i=e.attributes.BANDWIDTH),i<t}).length},r.media=function(e){var t=r.state,n=void 0;if(!e)return r.media_;if("HAVE_NOTHING"===r.state)throw new Error("Cannot switch media playlist from "+r.state);if("string"==typeof e){if(!r.master.playlists[e])throw new Error("Unknown playlist URI: "+e);e=r.master.playlists[e]}if(n=!r.media_||e.uri!==r.media_.uri,r.master.playlists[e.uri].endList)return d&&(d.onreadystatechange=null,d.abort(),d=null),r.state="HAVE_METADATA",r.media_=e,void(n&&(r.trigger("mediachanging"),r.trigger("mediachange")));if(n){if(r.state="SWITCHING_MEDIA",d){if((0,s["default"])(r.master.uri,e.uri)===d.url)return;d.onreadystatechange=null,d.abort(),d=null}this.media_&&this.trigger("mediachanging"),d=this.hls_.xhr({uri:(0,s["default"])(r.master.uri,e.uri),withCredentials:i},function(i,n){if(d){if(i)return l(d,e.uri,t);f(n,e.uri),"HAVE_MASTER"===t?r.trigger("loadedmetadata"):r.trigger("mediachange")}})}},r.setBandwidth=function(e){r.bandwidth=e.bandwidth},r.on("mediaupdatetimeout",function(){"HAVE_METADATA"===r.state&&(r.state="HAVE_CURRENT_METADATA",d=this.hls_.xhr({uri:(0,s["default"])(r.master.uri,r.media().uri),withCredentials:i},function(e,t){if(d)return e?l(d,r.media().uri):void f(d,r.media().uri)}))}),r.on("firstplay",function(){var e=r.media();e&&(e.syncInfo={mediaSequence:e.mediaSequence,time:0})}),r.pause=function(){r.stopRequest(),p["default"].clearTimeout(o)},r.load=function(){r.started?r.media().endList?r.trigger("loadedplaylist"):r.trigger("mediaupdatetimeout"):r.start()},r.start=function(){r.started=!0,d=n.hls_.xhr({uri:e,withCredentials:i},function(t,i){var n=void 0,a=void 0,o=void 0;if(d){if(d=null,t)return r.error={status:i.status,message:"HLS playlist request error at URL: "+e,responseText:i.responseText,code:2},r.trigger("error");if(n=new c["default"].Parser,n.push(i.responseText),n.end(),r.state="HAVE_MASTER",n.manifest.uri=e,n.manifest.playlists){for(r.master=n.manifest,o=r.master.playlists.length;o--;)a=r.master.playlists[o],r.master.playlists[a.uri]=a,a.resolvedUri=(0,s["default"])(r.master.uri,a.uri);for(var u in r.master.mediaGroups.AUDIO)for(var l in r.master.mediaGroups.AUDIO[u]){var h=r.master.mediaGroups.AUDIO[u][l];h.uri&&(h.resolvedUri=(0,s["default"])(r.master.uri,h.uri))}return r.trigger("loadedplaylist"),void(d||r.media(n.manifest.playlists[0]))}return r.master={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:p["default"].location.href,playlists:[{uri:e}]},r.master.playlists[e]=r.master.playlists[0],r.master.playlists[0].resolvedUri=e,f(i,e),r.trigger("loadedmetadata")}})}};y.prototype=new l["default"],i["default"]=y,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,i){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,a=e(28),s=n(a),o={UNSAFE_LIVE_SEGMENTS:3},u=function(e,t){var i=0,n=t-e.mediaSequence,r=e.segments[n];if(r){if("undefined"!=typeof r.start)return{result:r.start,precise:!0};if("undefined"!=typeof r.end)return{result:r.end-r.duration,precise:!0}}for(;n--;){if(r=e.segments[n],"undefined"!=typeof r.end)return{result:i+r.end,precise:!0};if(i+=r.duration,"undefined"!=typeof r.start)return{result:i+r.start,precise:!0}}return{result:i,precise:!1}},d=function(e,t){for(var i=0,n=void 0,r=t-e.mediaSequence;r<e.segments.length;r++){if(n=e.segments[r],"undefined"!=typeof n.start)return{result:n.start-i,precise:!0};if(i+=n.duration,"undefined"!=typeof n.end)return{result:n.end-i,precise:!0}}return{result:-1,precise:!1}},l=function(e,t,i){var n=void 0,r=void 0;return void 0===t&&(t=e.mediaSequence+e.segments.length),t<e.mediaSequence?0:(n=u(e,t),n.precise?n.result:(r=d(e,t),r.precise?r.result:n.result+i))},f=function(e,t,i){if(!e)return 0;if("number"!=typeof i&&(i=0),void 0===t){if(e.totalDuration)return e.totalDuration;if(!e.endList)return s["default"].Infinity}return l(e,t,i)};i.duration=f;var c=function(e,t,i){var n=0;if(t>i){var r=[i,t];t=r[0],i=r[1]}if(t<0){for(var a=t;a<Math.min(0,i);a++)n+=e.targetDuration;t=0}for(var a=t;a<i;a++)n+=e.segments[a].duration;return n};i.sumDurations=c;var h=function(e){
if(!e||!e.segments)return[null,null];for(var t=e.syncInfo||null,i=null,n=0,r=e.segments.length;n<r;n++){var a=e.segments[n];if("undefined"!=typeof a.start){i={mediaSequence:e.mediaSequence+n,time:a.start};break}}return{expiredSync:t,segmentSync:i}},p=function(e,t,i){if(t&&i){var n=t.mediaSequence-e.mediaSequence,r=i.mediaSequence-e.mediaSequence,a=void 0,s=void 0;return Math.abs(n)>Math.abs(r)?(a=r,s=-i.time):(a=n,s=t.time),Math.abs(s+c(e,a,0))}if(t){var a=t.mediaSequence-e.mediaSequence;return t.time+c(e,a,0)}if(i){var a=i.mediaSequence-e.mediaSequence;return i.time-c(e,a,0)}},m=function(e){if(!e||!e.segments)return(0,r.createTimeRange)();if(e.endList)return(0,r.createTimeRange)(0,f(e));var t=h(e),i=t.expiredSync,n=t.segmentSync;if(!i&&!n)return(0,r.createTimeRange)();var a=p(e,i,n),s=a,u=Math.max(0,e.segments.length-o.UNSAFE_LIVE_SEGMENTS),d=l(e,e.mediaSequence+u,a);return(0,r.createTimeRange)(s,d)};i.seekable=m;var g=function(e){return e-Math.floor(e)===0},y=function(e,t){if(g(t))return t+.1*e;for(var i=t.toString().split(".")[1].length,n=1;n<=i;n++){var r=Math.pow(10,n),a=t*r;if(g(a)||n===i)return(a+e)/r}},v=y.bind(null,1),_=y.bind(null,-1),b=function(e,t,i,n){var r=void 0,a=void 0,s=e.segments.length,o=t-n;if(o<0){if(i>0)for(r=i-1;r>=0;r--)if(a=e.segments[r],o+=_(a.duration),o>0)return{mediaIndex:r,startTime:n-c(e,i,r)};return{mediaIndex:0,startTime:t}}if(i<0){for(r=i;r<0;r++)if(o-=e.targetDuration,o<0)return{mediaIndex:0,startTime:t};i=0}for(r=i;r<s;r++)if(a=e.segments[r],o-=v(a.duration),o<0)return{mediaIndex:r,startTime:n+c(e,i,r)};return{mediaIndex:s-1,startTime:t}};i.getMediaInfoForTime_=b;var T=function(e){return e.excludeUntil&&e.excludeUntil>Date.now()};i.isBlacklisted=T;var S=function(e){var t=T(e);return!e.disabled&&!t};i.isEnabled=S,o.duration=f,o.seekable=m,o.getMediaInfoForTime_=b,o.isEnabled=S,o.isBlacklisted=T,i["default"]=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,i){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){var i=[],n=!0,r=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(u){r=!0,a=u}finally{try{!n&&o["return"]&&o["return"]()}finally{if(r)throw a}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a="undefined"!=typeof window?window.videojs:void 0!==e?e.videojs:null,s=n(a),o=function(e,t){var i=r(t,2),n=i[0],a=i[1];return Math.min(Math.max(n,e),a)},u=function(e,t){var i=[],n=void 0;if(e&&e.length)for(n=0;n<e.length;n++)t(e.start(n),e.end(n))&&i.push([e.start(n),e.end(n)]);return s["default"].createTimeRanges(i)},d=function(e,t){return u(e,function(e,i){return e-1/30<=t&&i+1/30>=t})},l=function(e,t){return u(e,function(e){return e-1/30>=t})},f=function(e){if(e.length<2)return s["default"].createTimeRanges();for(var t=[],i=1;i<e.length;i++){var n=e.end(i-1),r=e.start(i);t.push([n,r])}return s["default"].createTimeRanges(t)},c=function(e,t){var i=void 0,n=void 0,r=void 0,a=[],s=[],o=function(e){return e[0]<=r&&e[1]>=r};if(e)for(i=0;i<e.length;i++)n=e.start(i),r=e.end(i),s.push([n,r]);if(t)for(i=0;i<t.length;i++)n=t.start(i),r=t.end(i),s.some(o)||a.push(r);return 1!==a.length?null:a[0]},h=function(e,t){var i=null,n=null,r=0,a=[],o=[];if(!(e&&e.length&&t&&t.length))return s["default"].createTimeRange();for(var u=e.length;u--;)a.push({time:e.start(u),type:"start"}),a.push({time:e.end(u),type:"end"});for(u=t.length;u--;)a.push({time:t.start(u),type:"start"}),a.push({time:t.end(u),type:"end"});for(a.sort(function(e,t){return e.time-t.time}),u=0;u<a.length;u++)"start"===a[u].type?(r++,2===r&&(i=a[u].time)):"end"===a[u].type&&(r--,1===r&&(n=a[u].time)),null!==i&&null!==n&&(o.push([i,n]),i=null,n=null);return s["default"].createTimeRanges(o)},p=function(e,t,i,n){for(var r=t.end(0)-t.start(0),a=e.end(0)-e.start(0),s=r-a,o=h(e,n),u=h(t,n),d=0,l=0,f=o.length;f--;)d+=o.end(f)-o.start(f),o.start(f)===i&&(d+=s);for(f=u.length;f--;)l+=u.end(f)-u.start(f);return Math.max(d,l)/r*100},m=function(e,t,i,n){var r=e+t,a=s["default"].createTimeRanges([[e,r]]),u=s["default"].createTimeRanges([[o(e,[i,r]),r]]);if(u.start(0)===u.end(0))return 0;var d=p(u,a,i,n);return isNaN(d)||d===1/0||d===-(1/0)?0:d},g=function(e){var t=[];if(!e||!e.length)return"";for(var i=0;i<e.length;i++)t.push(e.start(i)+" => "+e.end(i));return t.join(", ")};i["default"]={findRange:d,findNextRange:l,findGaps:f,findSoleUncommonTimeRangesEnd:c,getSegmentBufferedPercent:m,TIME_FUDGE_FACTOR:1/30,printableRange:g},t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,i){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r="undefined"!=typeof window?window.videojs:void 0!==e?e.videojs:null,a=n(r),s={errorInterval:30,getSource:function(e){return e(this.tech({IWillNotUseThisInPlugins:!0}).currentSource_)}},o=function d(e,t){var i=0,n=0,r=a["default"].mergeOptions(s,t),o=function(){n&&e.currentTime(n)},u=function(t){null!==t&&void 0!==t&&(n=e.duration()!==1/0&&e.currentTime()||0,e.one("loadedmetadata",o),e.src(t),e.play())},l=function(){if(!(Date.now()-i<1e3*r.errorInterval))return r.getSource&&"function"==typeof r.getSource?(i=Date.now(),r.getSource.call(e,u)):void a["default"].log.error("ERROR: reloadSourceOnError - The option getSource must be a function!")},f=function h(){e.off("loadedmetadata",o),e.off("error",l),e.off("dispose",h)},c=function(t){f(),d(e,t)};e.on("error",l),e.on("dispose",f),e.reloadSourceOnError=c},u=function(e){o(this,e)};i["default"]=u,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=e(8),a=function(e,t,i,n){var a=e.master.playlists[t],s=(0,r.isBlacklisted)(a),o=(0,r.isEnabled)(a);return void 0===n?o:(n?delete a.disabled:a.disabled=!0,n===o||s||i(),n)},s=function u(e,t,i){n(this,u);var r=e.masterPlaylistController_.fastQualityChange_.bind(e.masterPlaylistController_);if(t.attributes){var s=t.attributes;if(s.RESOLUTION){var o=s.RESOLUTION;this.width=o.width,this.height=o.height}this.bandwidth=s.BANDWIDTH}this.id=i,this.enabled=a.bind(this,e.playlists,t.uri,r)},o=function(e){var t=e.playlists;e.representations=function(){return t.master.playlists.filter(function(e){return!(0,r.isBlacklisted)(e)}).map(function(t,i){return new s(e,t,t.uri)})}};i["default"]=o,t.exports=i["default"]},{}],12:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=e(59),a=n(r),s=e(28),o=n(s),u=function(e,t){return/^[a-z]+:/i.test(t)?t:(/\/\//i.test(e)||(e=a["default"].buildAbsoluteURL(o["default"].location.href,e)),a["default"].buildAbsoluteURL(e,t))};i["default"]=u,t.exports=i["default"]},{}],13:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},d=e(8),l="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,f=r(l),c=e(14),h=r(c),p=e(3),m=r(p),g=e(28),y=r(g),v=e(2),_=function(e,t,i){if(!e)return!1;var n=e.segments,r=i===n.length;return e.endList&&"open"===t.readyState&&r},b=function(e){var t=void 0,i=void 0;return i=e.offset+e.length-1,t=e.offset,"bytes="+t+"-"+i},T=function(e){var t={};return"byterange"in e&&(t.Range=b(e.byterange)),t},S=function(e){var t=e.byterange||{length:1/0,offset:0};return[t.length,t.offset,e.resolvedUri].join(",")},w=function(e){function t(e){var i=this;if(a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),!e)throw new TypeError("Initialization options are required");if("function"!=typeof e.currentTime)throw new TypeError("No currentTime getter specified");if(!e.mediaSource)throw new TypeError("No MediaSource specified");var n=f["default"].mergeOptions(f["default"].options.hls,e);this.state="INIT",this.bandwidth=n.bandwidth,this.throughput={rate:0,count:0},this.roundTrip=NaN,this.resetStats_(),this.mediaIndex=null,this.hasPlayed_=n.hasPlayed,this.currentTime_=n.currentTime,this.seekable_=n.seekable,this.seeking_=n.seeking,this.setCurrentTime_=n.setCurrentTime,this.mediaSource_=n.mediaSource,this.hls_=n.hls,this.loaderType_=n.loaderType,this.checkBufferTimeout_=null,this.error_=void 0,this.currentTimeline_=-1,this.xhr_=null,this.pendingSegment_=null,this.mimeType_=null,this.sourceUpdater_=null,this.xhrOptions_=null,this.activeInitSegmentId_=null,this.initSegments_={},this.decrypter_=n.decrypter,this.syncController_=n.syncController,this.syncPoint_={segmentIndex:0,time:0},this.syncController_.on("syncinfoupdate",function(){return i.trigger("syncinfoupdate")}),this.fetchAtBuffer_=!1,n.debug&&(this.logger_=f["default"].log.bind(f["default"],"segment-loader",this.loaderType_,"->"))}return s(t,e),o(t,[{key:"resetStats_",value:function(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0}},{key:"dispose",value:function(){this.state="DISPOSED",this.abort_(),this.sourceUpdater_&&this.sourceUpdater_.dispose(),this.resetStats_()}},{key:"abort",value:function(){if("WAITING"!==this.state)return void(this.pendingSegment_&&(this.pendingSegment_=null));this.abort_(),this.paused()||(this.state="READY",this.monitorBuffer_())}},{key:"abort_",value:function(){this.xhr_&&this.xhr_.abort(),this.pendingSegment_=null}},{key:"error",value:function(e){return void 0!==e&&(this.error_=e),this.pendingSegment_=null,this.error_}},{key:"load",value:function(){if(this.monitorBuffer_(),this.playlist_){if(this.syncController_.setDateTimeMapping(this.playlist_),"INIT"===this.state&&this.mimeType_)return this.init_();!this.sourceUpdater_||"READY"!==this.state&&"INIT"!==this.state||(this.state="READY")}}},{key:"init_",value:function(){return this.state="READY",this.sourceUpdater_=new h["default"](this.mediaSource_,this.mimeType_),this.resetEverything(),this.monitorBuffer_()}},{key:"playlist",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(e){var i=this.playlist_,n=this.pendingSegment_;if(this.playlist_=e,this.xhrOptions_=t,this.hasPlayed_()||(e.syncInfo={mediaSequence:e.mediaSequence,time:0}),this.trigger("syncinfoupdate"),this.mimeType_&&"INIT"===this.state&&!this.paused())return this.init_();if(!i||i.uri!==e.uri)return void(null!==this.mediaIndex&&this.resyncLoader());var r=e.mediaSequence-i.mediaSequence;this.logger_("mediaSequenceDiff",r),null!==this.mediaIndex&&(this.mediaIndex-=r),n&&(n.mediaIndex-=r,n.mediaIndex>=0&&(n.segment=e.segments[n.mediaIndex])),this.syncController_.saveExpiredSegmentInfo(i,e)}}},{key:"pause",value:function(){this.checkBufferTimeout_&&(y["default"].clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}},{key:"paused",value:function(){return null===this.checkBufferTimeout_}},{key:"mimeType",value:function(e){this.mimeType_||(this.mimeType_=e,this.playlist_&&"INIT"===this.state&&!this.paused()&&this.init_())}},{key:"resetEverything",value:function(){this.resetLoader(),this.remove(0,1/0)}},{key:"resetLoader",value:function(){this.fetchAtBuffer_=!1,this.resyncLoader()}},{key:"resyncLoader",value:function(){this.mediaIndex=null,this.syncPoint_=null}},{key:"remove",value:function(e,t){this.sourceUpdater_&&this.sourceUpdater_.remove(e,t)}},{key:"monitorBuffer_",value:function(){this.checkBufferTimeout_&&y["default"].clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=y["default"].setTimeout(this.monitorBufferTick_.bind(this),1)}},{key:"monitorBufferTick_",value:function(){"READY"===this.state&&this.fillBuffer_(),this.checkBufferTimeout_&&y["default"].clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=y["default"].setTimeout(this.monitorBufferTick_.bind(this),500)}},{key:"fillBuffer_",value:function(){if(!this.sourceUpdater_.updating()){this.syncPoint_||(this.syncPoint_=this.syncController_.getSyncPoint(this.playlist_,this.mediaSource_.duration,this.currentTimeline_,this.currentTime_()));var e=this.checkBuffer_(this.sourceUpdater_.buffered(),this.playlist_,this.mediaIndex,this.hasPlayed_(),this.currentTime_(),this.syncPoint_);if(e){if(_(this.playlist_,this.mediaSource_,e.mediaIndex))return void this.mediaSource_.endOfStream();(e.mediaIndex!==this.playlist_.segments.length-1||"ended"!==this.mediaSource_.readyState||this.seeking_())&&((e.timeline!==this.currentTimeline_||null!==e.startOfSegment&&e.startOfSegment<this.sourceUpdater_.timestampOffset())&&(this.syncController_.reset(),e.timestampOffset=e.startOfSegment),this.loadSegment_(e))}}}},{key:"checkBuffer_",value:function(e,t,i,n,r,a){var s=0,o=void 0;e.length&&(s=e.end(e.length-1));var u=Math.max(0,s-r);if(!t.segments.length)return null;if(u>=m["default"].GOAL_BUFFER_LENGTH)return null;if(!n&&u>=1)return null;if(this.logger_("checkBuffer_","mediaIndex:",i,"hasPlayed:",n,"currentTime:",r,"syncPoint:",a,"fetchAtBuffer:",this.fetchAtBuffer_,"bufferedTime:",u),null===a)return i=this.getSyncSegmentCandidate_(t),this.logger_("getSync","mediaIndex:",i),this.generateSegmentInfo_(t,i,null,!0);if(null!==i){this.logger_("walkForward","mediaIndex:",i+1);var l=t.segments[i];return o=l&&l.end?l.end:s,this.generateSegmentInfo_(t,i+1,o,!1)}if(this.fetchAtBuffer_){var f=(0,d.getMediaInfoForTime_)(t,s,a.segmentIndex,a.time);i=f.mediaIndex,o=f.startTime}else{var f=(0,d.getMediaInfoForTime_)(t,r,a.segmentIndex,a.time);i=f.mediaIndex,o=f.startTime}return this.logger_("getMediaIndexForTime","mediaIndex:",i,"startOfSegment:",o),this.generateSegmentInfo_(t,i,o,!1)}},{key:"getSyncSegmentCandidate_",value:function(e){var t=this;if(this.currentTimeline_===-1)return 0;var i=e.segments.map(function(e,t){return{timeline:e.timeline,segmentIndex:t}}).filter(function(e){return e.timeline===t.currentTimeline_});return i.length?i[Math.min(i.length-1,1)].segmentIndex:Math.max(e.segments.length-1,0)}},{key:"generateSegmentInfo_",value:function(e,t,i,n){if(t<0||t>=e.segments.length)return null;var r=e.segments[t];return{uri:r.resolvedUri,mediaIndex:t,isSyncRequest:n,startOfSegment:i,playlist:e,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:r.timeline,duration:r.duration,segment:r}}},{key:"loadSegment_",value:function(e){var t=this,i=void 0,n=void 0,r=void 0,a=void 0,s=0;if(s=this.trimBuffer_(e),s>0&&this.sourceUpdater_.remove(0,s),i=e.segment,i.key){var o=f["default"].mergeOptions(this.xhrOptions_,{uri:i.key.resolvedUri,responseType:"arraybuffer"});n=this.hls_.xhr(o,this.handleResponse_.bind(this))}if(i.map&&!this.initSegments_[S(i.map)]){var u=f["default"].mergeOptions(this.xhrOptions_,{uri:i.map.resolvedUri,responseType:"arraybuffer",headers:T(i.map)});r=this.hls_.xhr(u,this.handleResponse_.bind(this))}this.pendingSegment_=e;var d=f["default"].mergeOptions(this.xhrOptions_,{uri:e.uri,responseType:"arraybuffer",headers:T(i)});a=this.hls_.xhr(d,this.handleResponse_.bind(this)),a.addEventListener("progress",function(e){t.trigger(e)}),this.xhr_={keyXhr:n,initSegmentXhr:r,segmentXhr:a,abort:function(){this.segmentXhr&&(this.segmentXhr.onreadystatechange=null,this.segmentXhr.abort(),this.segmentXhr=null),this.initSegmentXhr&&(this.initSegmentXhr.onreadystatechange=null,this.initSegmentXhr.abort(),this.initSegmentXhr=null),this.keyXhr&&(this.keyXhr.onreadystatechange=null,this.keyXhr.abort(),this.keyXhr=null)}},this.state="WAITING"}},{key:"trimBuffer_",value:function(e){var t=this.seekable_(),i=this.currentTime_();return t.length&&t.start(0)>0&&t.start(0)<i?t.start(0):i-60}},{key:"handleResponse_",value:function(e,t){var i=void 0,n=void 0,r=void 0;if(this.xhr_&&(t===this.xhr_.segmentXhr||t===this.xhr_.keyXhr||t===this.xhr_.initSegmentXhr)){if(i=this.pendingSegment_,n=i.segment,t.timedout)return this.abort_(),this.bandwidth=1,this.roundTrip=NaN,this.state="READY",this.trigger("progress");if(!t.aborted&&e){var a=this.xhr_.keyXhr;return this.abort_(),this.error({status:t.status,message:t===a?"HLS key request error at URL: "+n.key.uri:"HLS segment request error at URL: "+i.uri,code:2,xhr:t}),this.state="READY",this.pause(),this.trigger("error")}if(!t.response)return void this.abort_();if(t===this.xhr_.segmentXhr&&(this.xhr_.segmentXhr=null,i.startOfAppend=Date.now(),this.roundTrip=t.roundTripTime,this.bandwidth=t.bandwidth,this.mediaBytesTransferred+=t.bytesReceived||0,this.mediaRequests+=1,this.mediaTransferDuration+=t.roundTripTime||0,n.key?i.encryptedBytes=new Uint8Array(t.response):i.bytes=new Uint8Array(t.response)),t===this.xhr_.keyXhr){if(this.xhr_.keyXhr=null,16!==t.response.byteLength)return this.abort_(),this.error({status:t.status,message:"Invalid HLS key at URL: "+n.key.uri,code:2,xhr:t}),this.state="READY",this.pause(),this.trigger("error");r=new DataView(t.response),n.key.bytes=new Uint32Array([r.getUint32(0),r.getUint32(4),r.getUint32(8),r.getUint32(12)]),n.key.iv=n.key.iv||new Uint32Array([0,0,0,i.mediaIndex+i.playlist.mediaSequence])}t===this.xhr_.initSegmentXhr&&(this.xhr_.initSegmentXhr=null,n.map.bytes=new Uint8Array(t.response),this.initSegments_[S(n.map)]=n.map),this.xhr_.segmentXhr||this.xhr_.keyXhr||this.xhr_.initSegmentXhr||(this.xhr_=null,this.processResponse_())}}},{key:"processResponse_",value:function(){if(!this.pendingSegment_)return void(this.state="READY");this.state="DECRYPTING";var e=this.pendingSegment_,t=e.segment;t.key?this.decrypter_.postMessage((0,v.createTransferableMessage)({source:this.loaderType_,encrypted:e.encryptedBytes,key:t.key.bytes,iv:t.key.iv}),[e.encryptedBytes.buffer,t.key.bytes.buffer]):this.handleSegment_()}},{key:"handleDecrypted_",value:function(e){var t=this.pendingSegment_,i=e.decrypted;t&&(t.bytes=new Uint8Array(i.bytes,i.byteOffset,i.byteLength)),this.handleSegment_()}},{key:"handleSegment_",value:function(){var e=this;if(!this.pendingSegment_)return void(this.state="READY");this.state="APPENDING";var t=this.pendingSegment_,i=t.segment;if(this.syncController_.probeSegmentInfo(t),t.isSyncRequest)return this.trigger("syncinfoupdate"),this.pendingSegment_=null,void(this.state="READY");null!==t.timestampOffset&&t.timestampOffset!==this.sourceUpdater_.timestampOffset()&&this.sourceUpdater_.timestampOffset(t.timestampOffset),i.map&&function(){var t=S(i.map);if(!e.activeInitSegmentId_||e.activeInitSegmentId_!==t){var n=e.initSegments_[t];e.sourceUpdater_.appendBuffer(n.bytes,function(){e.activeInitSegmentId_=t})}}(),t.byteLength=t.bytes.byteLength,"number"==typeof i.start&&"number"==typeof i.end?this.mediaSecondsLoaded+=i.end-i.start:this.mediaSecondsLoaded+=i.duration,this.sourceUpdater_.appendBuffer(t.bytes,this.handleUpdateEnd_.bind(this))}},{key:"handleUpdateEnd_",value:function(){if(this.logger_("handleUpdateEnd_","segmentInfo:",this.pendingSegment_),!this.pendingSegment_)return this.state="READY",void(this.paused()||this.monitorBuffer_());var e=this.pendingSegment_,t=e.segment,i=null!==this.mediaIndex;if(this.pendingSegment_=null,this.recordThroughput_(e),this.state="READY",this.mediaIndex=e.mediaIndex,this.fetchAtBuffer_=!0,this.currentTimeline_=e.timeline,this.trigger("syncinfoupdate"),t.end&&this.currentTime_()-t.end>3*e.playlist.targetDuration)return void this.resetEverything();i&&this.trigger("progress"),_(e.playlist,this.mediaSource_,this.mediaIndex+1)&&this.mediaSource_.endOfStream(),this.paused()||this.monitorBuffer_()}},{key:"recordThroughput_",value:function(e){var t=this.throughput.rate,i=Date.now()-e.startOfAppend+1,n=Math.floor(e.byteLength/i*8*1e3);this.throughput.rate+=(n-t)/++this.throughput.count}},{key:"logger_",value:function(){}}]),t}(f["default"].EventTarget);i["default"]=w,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],14:[function(e,t,i){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s="undefined"!=typeof window?window.videojs:void 0!==e?e.videojs:null,o=n(s),u=function(){function e(t,i){var n=this;r(this,e);var a=function(){n.sourceBuffer_=t.addSourceBuffer(i),n.onUpdateendCallback_=function(){var e=n.pendingCallback_;n.pendingCallback_=null,e&&e(),n.runCallback_()},n.sourceBuffer_.addEventListener("updateend",n.onUpdateendCallback_),n.runCallback_()};this.callbacks_=[],this.pendingCallback_=null,this.timestampOffset_=0,this.mediaSource=t,"closed"===t.readyState?t.addEventListener("sourceopen",a):a()}return a(e,[{key:"abort",value:function(e){var t=this;this.queueCallback_(function(){t.sourceBuffer_.abort()},e)}},{key:"appendBuffer",value:function(e,t){var i=this;this.queueCallback_(function(){i.sourceBuffer_.appendBuffer(e)},t)}},{key:"buffered",value:function(){return this.sourceBuffer_?this.sourceBuffer_.buffered:o["default"].createTimeRanges()}},{key:"duration",value:function(e){var t=this;this.queueCallback_(function(){t.sourceBuffer_.duration=e})}},{key:"remove",value:function(e,t){var i=this;this.queueCallback_(function(){i.sourceBuffer_.remove(e,t)})}},{key:"updating",value:function(){return!this.sourceBuffer_||this.sourceBuffer_.updating}},{key:"timestampOffset",value:function(e){var t=this;return void 0!==e&&(this.queueCallback_(function(){t.sourceBuffer_.timestampOffset=e}),this.timestampOffset_=e),this.timestampOffset_}},{key:"queueCallback_",value:function(e,t){this.callbacks_.push([e.bind(this),t]),this.runCallback_()}},{key:"runCallback_",value:function(){var e=void 0;this.sourceBuffer_&&!this.sourceBuffer_.updating&&this.callbacks_.length&&(e=this.callbacks_.shift(),this.pendingCallback_=e[1],e[0]())}},{key:"dispose",value:function(){this.sourceBuffer_.removeEventListener("updateend",this.onUpdateendCallback_),this.sourceBuffer_&&"open"===this.mediaSource.readyState&&this.sourceBuffer_.abort()}}]),e}();i["default"]=u,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function e(){n(this,e),this.listeners={}}return r(e,[{key:"on",value:function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"off",value:function(e,t){var i=void 0;return!!this.listeners[e]&&(i=this.listeners[e].indexOf(t),this.listeners[e].splice(i,1),i>-1)}},{key:"trigger",value:function(e){var t=void 0,i=void 0,n=void 0,r=void 0;if(t=this.listeners[e])if(2===arguments.length)for(n=t.length,i=0;i<n;++i)t[i].call(this,arguments[1]);else for(r=Array.prototype.slice.call(arguments,1),n=t.length,i=0;i<n;++i)t[i].apply(this,r)}},{key:"dispose",value:function(){this.listeners={}}},{key:"pipe",value:function(e){this.on("data",function(t){e.push(t)})}}]),e}();i["default"]=a,t.exports=i["default"]},{}],16:[function(e,t,i){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},u=e(53),d=n(u),l=e(55),f=e(8),c="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,h=n(c),p=[{name:"VOD",run:function(e,t,i,n,r){if(i!==1/0){return{time:0,segmentIndex:0}}return null}},{name:"ProgramDateTime",run:function(e,t,i,n,r){if(e.datetimeToDisplayTime&&t.dateTimeObject){return{time:t.dateTimeObject.getTime()/1e3+e.datetimeToDisplayTime,segmentIndex:0}}return null}},{name:"Segment",run:function(e,t,i,n,r){var a=t.segments,s=null,o=null;r=r||0;for(var u=0;u<a.length;u++){var d=a[u];if(d.timeline===n&&"undefined"!=typeof d.start){var l=Math.abs(r-d.start);if(null!==o&&o<l)break;(!s||null===o||o>=l)&&(o=l,s={time:d.start,segmentIndex:u})}}return s}},{name:"Discontinuity",run:function(e,t,i,n,r){var a=null;if(r=r||0,t.discontinuityStarts.length)for(var s=null,o=0;o<t.discontinuityStarts.length;o++){var u=t.discontinuityStarts[o],d=t.discontinuitySequence+o+1,l=e.discontinuities[d];if(l){var f=Math.abs(r-l.time);if(null!==s&&s<f)break;(!a||null===s||s>=f)&&(s=f,a={time:l.time,segmentIndex:u})}}return a}},{name:"Playlist",run:function(e,t,i,n,r){if(t.syncInfo){return{time:t.syncInfo.time,segmentIndex:t.syncInfo.mediaSequence-t.mediaSequence}}return null}}];i.syncPointStrategies=p;var m=function(e){function t(){r(this,t),o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.inspectCache_=void 0,this.timelines=[],this.discontinuities=[],this.datetimeToDisplayTime=null,h["default"].options.hls&&h["default"].options.hls.debug&&(this.logger_=h["default"].log.bind(h["default"],"sync-controller ->"))}return a(t,e),s(t,[{key:"getSyncPoint",value:function(e,t,i,n){for(var r=[],a=0;a<p.length;a++){var s=p[a],o=s.run(this,e,t,i,n);o&&(o.strategy=s.name,r.push({strategy:s.name,syncPoint:o}),this.logger_("syncPoint found via <"+s.name+">:",o))}if(!r.length)return null;for(var u=r[0].syncPoint,d=Math.abs(r[0].syncPoint.time-n),l=r[0].strategy,a=1;a<r.length;a++){var f=Math.abs(r[a].syncPoint.time-n);f<d&&(d=f,u=r[a].syncPoint,l=r[a].strategy)}return this.logger_("syncPoint with strategy <"+l+"> chosen: ",u),u}},{key:"saveExpiredSegmentInfo",value:function(e,t){for(var i=t.mediaSequence-e.mediaSequence,n=i-1;n>=0;n--){var r=e.segments[n];if("undefined"!=typeof r.start){t.syncInfo={mediaSequence:e.mediaSequence+n,time:r.start},this.logger_("playlist sync:",t.syncInfo),this.trigger("syncinfoupdate");break}}}},{key:"setDateTimeMapping",value:function(e){if(!this.datetimeToDisplayTime&&e.dateTimeObject){var t=e.dateTimeObject.getTime()/1e3;this.datetimeToDisplayTime=-t}}},{key:"reset",value:function(){this.inspectCache_=void 0}},{key:"probeSegmentInfo",value:function(e){var t=e.segment,i=void 0;i=t.map?this.probeMp4Segment_(e):this.probeTsSegment_(e),i&&this.calculateSegmentTimeMapping_(e,i)&&this.saveDiscontinuitySyncInfo_(e)}},{key:"probeMp4Segment_",value:function(e){var t=e.segment,i=d["default"].timescale(t.map.bytes),n=d["default"].startTime(i,e.bytes);return null!==e.timestampOffset&&(e.timestampOffset-=n),{start:n,end:n+t.duration}}},{key:"probeTsSegment_",value:function(e){var t=(0,l.inspect)(e.bytes,this.inspectCache_),i=void 0,n=void 0;return t?(t.video&&2===t.video.length?(this.inspectCache_=t.video[1].dts,i=t.video[0].dtsTime,n=t.video[1].dtsTime):t.audio&&2===t.audio.length&&(this.inspectCache_=t.audio[1].dts,i=t.audio[0].dtsTime,n=t.audio[1].dtsTime),{start:i,end:n}):null}},{key:"calculateSegmentTimeMapping_",value:function(e,t){var i=e.segment,n=this.timelines[e.timeline];if(null!==e.timestampOffset)this.logger_("tsO:",e.timestampOffset),n={time:e.timestampOffset,mapping:e.timestampOffset-t.start},this.timelines[e.timeline]=n,i.start=e.timestampOffset,i.end=t.end+n.mapping;else{if(!n)return!1;i.start=t.start+n.mapping,i.end=t.end+n.mapping}return!0}},{key:"saveDiscontinuitySyncInfo_",value:function(e){var t=e.playlist,i=e.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(t.discontinuityStarts.length)for(var n=0;n<t.discontinuityStarts.length;n++){var r=t.discontinuityStarts[n],a=t.discontinuitySequence+n+1,s=r-e.mediaIndex,o=Math.abs(s);(!this.discontinuities[a]||this.discontinuities[a].accuracy>o)&&(this.discontinuities[a]=s<0?{time:i.start-(0,f.sumDurations)(t,e.mediaIndex,r),accuracy:o}:{time:i.end+(0,f.sumDurations)(t,e.mediaIndex+1,r),accuracy:o})}}},{key:"logger_",value:function(){}}]),t}(h["default"].EventTarget);i["default"]=m}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,i){(function(e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n="undefined"!=typeof window?window.videojs:void 0!==e?e.videojs:null,r=function(){return function e(t,i){if(t=(0,n.mergeOptions)({timeout:45e3},t),e.beforeRequest&&"function"==typeof e.beforeRequest){var r=e.beforeRequest(t);r&&(t=r)}var a=(0,n.xhr)(t,function(e,t){!e&&a.response&&(a.responseTime=Date.now(),a.roundTripTime=a.responseTime-a.requestTime,a.bytesReceived=a.response.byteLength||a.response.length,a.bandwidth||(a.bandwidth=Math.floor(a.bytesReceived/a.roundTripTime*8*1e3))),e||a.timedout?a.timedout=a.timedout||"ETIMEDOUT"===e.code:a.timedout=!1,e||200===t.statusCode||206===t.statusCode||0===t.statusCode||(e=new Error("XHR Failed with a response of: "+(a&&(a.response||a.responseText)))),i(e,a)});return a.requestTime=Date.now(),a}};i["default"]=r,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){
var e=[[[],[],[],[],[]],[[],[],[],[],[]]],t=e[0],i=e[1],n=t[4],r=i[4],a=void 0,s=void 0,o=void 0,u=[],d=[],l=void 0,f=void 0,c=void 0,h=void 0,p=void 0,m=void 0;for(a=0;a<256;a++)d[(u[a]=a<<1^283*(a>>7))^a]=a;for(s=o=0;!n[s];s^=l||1,o=d[o]||1)for(h=o^o<<1^o<<2^o<<3^o<<4,h=h>>8^255&h^99,n[s]=h,r[h]=s,c=u[f=u[l=u[s]]],m=16843009*c^65537*f^257*l^16843008*s,p=257*u[h]^16843008*h,a=0;a<4;a++)t[a][s]=p=p<<24^p>>>8,i[a][h]=m=m<<24^m>>>8;for(a=0;a<5;a++)t[a]=t[a].slice(0),i[a]=i[a].slice(0);return e},s=null,o=function(){function e(t){n(this,e),s||(s=a()),this._tables=[[s[0][0].slice(),s[0][1].slice(),s[0][2].slice(),s[0][3].slice(),s[0][4].slice()],[s[1][0].slice(),s[1][1].slice(),s[1][2].slice(),s[1][3].slice(),s[1][4].slice()]];var i=void 0,r=void 0,o=void 0,u=void 0,d=void 0,l=this._tables[0][4],f=this._tables[1],c=t.length,h=1;if(4!==c&&6!==c&&8!==c)throw new Error("Invalid aes key size");for(u=t.slice(0),d=[],this._key=[u,d],i=c;i<4*c+28;i++)o=u[i-1],(i%c===0||8===c&&i%c===4)&&(o=l[o>>>24]<<24^l[o>>16&255]<<16^l[o>>8&255]<<8^l[255&o],i%c===0&&(o=o<<8^o>>>24^h<<24,h=h<<1^283*(h>>7))),u[i]=u[i-c]^o;for(r=0;i;r++,i--)o=u[3&r?i:i-4],d[r]=i<=4||r<4?o:f[0][l[o>>>24]]^f[1][l[o>>16&255]]^f[2][l[o>>8&255]]^f[3][l[255&o]]}return r(e,[{key:"decrypt",value:function(e,t,i,n,r,a){var s=this._key[1],o=e^s[0],u=n^s[1],d=i^s[2],l=t^s[3],f=void 0,c=void 0,h=void 0,p=s.length/4-2,m=void 0,g=4,y=this._tables[1],v=y[0],_=y[1],b=y[2],T=y[3],S=y[4];for(m=0;m<p;m++)f=v[o>>>24]^_[u>>16&255]^b[d>>8&255]^T[255&l]^s[g],c=v[u>>>24]^_[d>>16&255]^b[l>>8&255]^T[255&o]^s[g+1],h=v[d>>>24]^_[l>>16&255]^b[o>>8&255]^T[255&u]^s[g+2],l=v[l>>>24]^_[o>>16&255]^b[u>>8&255]^T[255&d]^s[g+3],g+=4,o=f,u=c,d=h;for(m=0;m<4;m++)r[(3&-m)+a]=S[o>>>24]<<24^S[u>>16&255]<<16^S[d>>8&255]<<8^S[255&l]^s[g++],f=o,o=u,u=d,d=l,l=f}}]),e}();i["default"]=o,t.exports=i["default"]},{}],19:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},u=e(22),d=n(u),l=function(e){function t(){r(this,t),o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,d["default"]),this.jobs=[],this.delay=1,this.timeout_=null}return a(t,e),s(t,[{key:"processJob_",value:function(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}},{key:"push",value:function(e){this.jobs.push(e),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}}]),t}(d["default"]);i["default"]=l,t.exports=i["default"]},{}],20:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=e(18),o=n(s),u=e(19),d=n(u),l=e(24),f=function(e){return e<<24|(65280&e)<<8|(16711680&e)>>8|e>>>24},c=function(e,t,i){var n=new Int32Array(e.buffer,e.byteOffset,e.byteLength>>2),r=new o["default"](Array.prototype.slice.call(t)),a=new Uint8Array(e.byteLength),s=new Int32Array(a.buffer),u=void 0,d=void 0,l=void 0,c=void 0,h=void 0,p=void 0,m=void 0,g=void 0,y=void 0;for(u=i[0],d=i[1],l=i[2],c=i[3],y=0;y<n.length;y+=4)h=f(n[y]),p=f(n[y+1]),m=f(n[y+2]),g=f(n[y+3]),r.decrypt(h,p,m,g,s,y),s[y]=f(s[y]^u),s[y+1]=f(s[y+1]^d),s[y+2]=f(s[y+2]^l),s[y+3]=f(s[y+3]^c),u=h,d=p,l=m,c=g;return a};i.decrypt=c;var h=function(){function e(t,i,n,a){r(this,e);var s=e.STEP,o=new Int32Array(t.buffer),u=new Uint8Array(t.byteLength),c=0;for(this.asyncStream_=new d["default"],this.asyncStream_.push(this.decryptChunk_(o.subarray(c,c+s),i,n,u)),c=s;c<o.length;c+=s)n=new Uint32Array([f(o[c-4]),f(o[c-3]),f(o[c-2]),f(o[c-1])]),this.asyncStream_.push(this.decryptChunk_(o.subarray(c,c+s),i,n,u));this.asyncStream_.push(function(){a(null,(0,l.unpad)(u))})}return a(e,[{key:"decryptChunk_",value:function(e,t,i,n){return function(){var r=c(e,t,i);n.set(r,e.byteOffset)}}}],[{key:"STEP",get:function(){return 32e3}}]),e}();i.Decrypter=h,i["default"]={Decrypter:h,decrypt:c}},{}],21:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=e(20),a=e(19),s=n(a);i["default"]={decrypt:r.decrypt,Decrypter:r.Decrypter,AsyncStream:s["default"]},t.exports=i["default"]},{}],22:[function(e,t,i){arguments[4][15][0].apply(i,arguments)},{}],23:[function(e,t,i){"use strict";var n;t.exports=function(e){var t=n[e.byteLength%16||0],i=new Uint8Array(e.byteLength+t.length);return i.set(e),i.set(t,e.byteLength),i},n=[[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],[15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],[14,14,14,14,14,14,14,14,14,14,14,14,14,14],[13,13,13,13,13,13,13,13,13,13,13,13,13],[12,12,12,12,12,12,12,12,12,12,12,12],[11,11,11,11,11,11,11,11,11,11,11],[10,10,10,10,10,10,10,10,10,10],[9,9,9,9,9,9,9,9,9],[8,8,8,8,8,8,8,8],[7,7,7,7,7,7,7],[6,6,6,6,6,6],[5,5,5,5,5],[4,4,4,4],[3,3,3],[2,2],[1]]},{}],24:[function(e,t,i){"use strict";i.pad=e(23),i.unpad=e(25)},{}],25:[function(e,t,i){"use strict";t.exports=function(e){return e.subarray(0,e.byteLength-e[e.byteLength-1])}},{}],26:[function(e,t,i){},{}],27:[function(e,t,i){(function(i){var n=void 0!==i?i:"undefined"!=typeof window?window:{},r=e(26);if("undefined"!=typeof document)t.exports=document;else{var a=n["__GLOBAL_DOCUMENT_CACHE@4"];a||(a=n["__GLOBAL_DOCUMENT_CACHE@4"]=r),t.exports=a}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],28:[function(e,t,i){(function(e){"undefined"!=typeof window?t.exports=window:void 0!==e?t.exports=e:"undefined"!=typeof self?t.exports=self:t.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],29:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var r=e(30),a=n(r),s=e(31),o=n(s),u=e(32),d=n(u);t.exports={LineStream:a["default"],ParseStream:o["default"],Parser:d["default"]}},{}],30:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=e(33),d=n(u),l=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.buffer="",e}return s(t,e),o(t,[{key:"push",value:function(e){var t=void 0;for(this.buffer+=e,t=this.buffer.indexOf("\n");t>-1;t=this.buffer.indexOf("\n"))this.trigger("data",this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)}}]),t}(d["default"]);i["default"]=l},{}],31:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){var i=[],n=!0,r=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(u){r=!0,a=u}finally{try{!n&&o["return"]&&o["return"]()}finally{if(r)throw a}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),d=e(33),l=n(d),f=function(){return new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')},c=function(e){for(var t=e.split(f()),i={},n=t.length,r=void 0;n--;)""!==t[n]&&(r=/([^=]*)=(.*)/.exec(t[n]).slice(1),r[0]=r[0].replace(/^\s+|\s+$/g,""),r[1]=r[1].replace(/^\s+|\s+$/g,""),r[1]=r[1].replace(/^['"](.*)['"]$/g,"$1"),i[r[0]]=r[1]);return i},h=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return s(t,e),u(t,[{key:"push",value:function(e){var t=void 0,i=void 0;if(e=e.replace(/^[\u0000\s]+|[\u0000\s]+$/g,""),0!==e.length){if("#"!==e[0])return void this.trigger("data",{type:"uri",uri:e});if(0!==e.indexOf("#EXT"))return void this.trigger("data",{type:"comment",text:e.slice(1)});if(e=e.replace("\r",""),t=/^#EXTM3U/.exec(e))return void this.trigger("data",{type:"tag",tagType:"m3u"});if(t=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(e))return i={type:"tag",tagType:"inf"},t[1]&&(i.duration=parseFloat(t[1])),t[2]&&(i.title=t[2]),void this.trigger("data",i);if(t=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(e))return i={type:"tag",tagType:"targetduration"},t[1]&&(i.duration=parseInt(t[1],10)),void this.trigger("data",i);if(t=/^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(e))return i={type:"tag",tagType:"totalduration"},t[1]&&(i.duration=parseInt(t[1],10)),void this.trigger("data",i);if(t=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(e))return i={type:"tag",tagType:"version"},t[1]&&(i.version=parseInt(t[1],10)),void this.trigger("data",i);if(t=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(e))return i={type:"tag",tagType:"media-sequence"},t[1]&&(i.number=parseInt(t[1],10)),void this.trigger("data",i);if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(e))return i={type:"tag",tagType:"discontinuity-sequence"},t[1]&&(i.number=parseInt(t[1],10)),void this.trigger("data",i);if(t=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(e))return i={type:"tag",tagType:"playlist-type"},t[1]&&(i.playlistType=t[1]),void this.trigger("data",i);if(t=/^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(e))return i={type:"tag",tagType:"byterange"},t[1]&&(i.length=parseInt(t[1],10)),t[2]&&(i.offset=parseInt(t[2],10)),void this.trigger("data",i);if(t=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(e))return i={type:"tag",tagType:"allow-cache"},t[1]&&(i.allowed=!/NO/.test(t[1])),void this.trigger("data",i);if(t=/^#EXT-X-MAP:?(.*)$/.exec(e)){if(i={type:"tag",tagType:"map"},t[1]){var n=c(t[1]);if(n.URI&&(i.uri=n.URI),n.BYTERANGE){var r=n.BYTERANGE.split("@"),a=o(r,2),s=a[0],u=a[1];i.byterange={},s&&(i.byterange.length=parseInt(s,10)),u&&(i.byterange.offset=parseInt(u,10))}}return void this.trigger("data",i)}if(t=/^#EXT-X-STREAM-INF:?(.*)$/.exec(e)){if(i={type:"tag",tagType:"stream-inf"},t[1]){if(i.attributes=c(t[1]),i.attributes.RESOLUTION){var d=i.attributes.RESOLUTION.split("x"),l={};d[0]&&(l.width=parseInt(d[0],10)),d[1]&&(l.height=parseInt(d[1],10)),i.attributes.RESOLUTION=l}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}return void this.trigger("data",i)}if(t=/^#EXT-X-MEDIA:?(.*)$/.exec(e))return i={type:"tag",tagType:"media"},t[1]&&(i.attributes=c(t[1])),void this.trigger("data",i);if(t=/^#EXT-X-ENDLIST/.exec(e))return void this.trigger("data",{type:"tag",tagType:"endlist"});if(t=/^#EXT-X-DISCONTINUITY/.exec(e))return void this.trigger("data",{type:"tag",tagType:"discontinuity"});if(t=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(e))return i={type:"tag",tagType:"program-date-time"},t[1]&&(i.dateTimeString=t[1],i.dateTimeObject=new Date(t[1])),void this.trigger("data",i);if(t=/^#EXT-X-KEY:?(.*)$/.exec(e))return i={type:"tag",tagType:"key"},t[1]&&(i.attributes=c(t[1]),i.attributes.IV&&("0x"===i.attributes.IV.substring(0,2).toLowerCase()&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),void this.trigger("data",i);if(t=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(e))return i={type:"tag",tagType:"cue-out-cont"},t[1]?i.data=t[1]:i.data="",void this.trigger("data",i);if(t=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(e))return i={type:"tag",tagType:"cue-out"},t[1]?i.data=t[1]:i.data="",void this.trigger("data",i);if(t=/^#EXT-X-CUE-IN:?(.*)?$/.exec(e))return i={type:"tag",tagType:"cue-in"},t[1]?i.data=t[1]:i.data="",void this.trigger("data",i);this.trigger("data",{type:"tag",data:e.slice(4)})}}}]),t}(l["default"]);i["default"]=h},{}],32:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},u=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),d=e(33),l=n(d),f=e(30),c=n(f),h=e(31),p=n(h),m=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.lineStream=new c["default"],e.parseStream=new p["default"],e.lineStream.pipe(e.parseStream);var i=e,n=[],s={},u=void 0,d=void 0,l=function(){},f={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},h=0;return e.manifest={allowCache:!0,discontinuityStarts:[],segments:[]},e.parseStream.on("data",function(e){var t=void 0,r=void 0;({tag:function(){(({"allow-cache":function(){this.manifest.allowCache=e.allowed,"allowed"in e||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange:function a(){var a={};"length"in e&&(s.byterange=a,a.length=e.length,"offset"in e||(this.trigger("info",{message:"defaulting offset to zero"}),e.offset=0)),"offset"in e&&(s.byterange=a,a.offset=e.offset)},endlist:function(){this.manifest.endList=!0},inf:function(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),e.duration>0&&(s.duration=e.duration),0===e.duration&&(s.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=n},key:function(){return e.attributes?"NONE"===e.attributes.METHOD?void(d=null):e.attributes.URI?(e.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),d={method:e.attributes.METHOD||"AES-128",uri:e.attributes.URI},void("undefined"!=typeof e.attributes.IV&&(d.iv=e.attributes.IV))):void this.trigger("warn",{message:"ignoring key declaration without URI"}):void this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){if(!isFinite(e.number))return void this.trigger("warn",{message:"ignoring invalid media sequence: "+e.number});this.manifest.mediaSequence=e.number},"discontinuity-sequence":function(){if(!isFinite(e.number))return void this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+e.number});this.manifest.discontinuitySequence=e.number,h=e.number},"playlist-type":function(){if(!/VOD|EVENT/.test(e.playlistType))return void this.trigger("warn",{message:"ignoring unknown playlist type: "+e.playlist});this.manifest.playlistType=e.playlistType},map:function(){u={},e.uri&&(u.uri=e.uri),e.byterange&&(u.byterange=e.byterange)},"stream-inf":function(){if(this.manifest.playlists=n,this.manifest.mediaGroups=this.manifest.mediaGroups||f,!e.attributes)return void this.trigger("warn",{message:"ignoring empty stream-inf attributes"});s.attributes||(s.attributes={}),o(s.attributes,e.attributes)},media:function(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||f,!(e.attributes&&e.attributes.TYPE&&e.attributes["GROUP-ID"]&&e.attributes.NAME))return void this.trigger("warn",{message:"ignoring incomplete or missing media group"});var i=this.manifest.mediaGroups[e.attributes.TYPE];i[e.attributes["GROUP-ID"]]=i[e.attributes["GROUP-ID"]]||{},t=i[e.attributes["GROUP-ID"]],r={"default":/yes/i.test(e.attributes.DEFAULT)},r["default"]?r.autoselect=!0:r.autoselect=/yes/i.test(e.attributes.AUTOSELECT),e.attributes.LANGUAGE&&(r.language=e.attributes.LANGUAGE),e.attributes.URI&&(r.uri=e.attributes.URI),e.attributes["INSTREAM-ID"]&&(r.instreamId=e.attributes["INSTREAM-ID"]),t[e.attributes.NAME]=r},discontinuity:function(){h+=1,s.discontinuity=!0,this.manifest.discontinuityStarts.push(n.length)},"program-date-time":function(){this.manifest.dateTimeString=e.dateTimeString,this.manifest.dateTimeObject=e.dateTimeObject},targetduration:function(){if(!isFinite(e.duration)||e.duration<0)return void this.trigger("warn",{message:"ignoring invalid target duration: "+e.duration});this.manifest.targetDuration=e.duration},totalduration:function(){if(!isFinite(e.duration)||e.duration<0)return void this.trigger("warn",{message:"ignoring invalid total duration: "+e.duration});this.manifest.totalDuration=e.duration},"cue-out":function(){s.cueOut=e.data},"cue-out-cont":function(){s.cueOutCont=e.data},"cue-in":function(){s.cueIn=e.data}})[e.tagType]||l).call(i)},uri:function(){s.uri=e.uri,n.push(s),!this.manifest.targetDuration||"duration"in s||(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),s.duration=this.manifest.targetDuration),d&&(s.key=d),s.timeline=h,u&&(s.map=u),s={}},comment:function(){}})[e.type].call(i)}),e}return s(t,e),u(t,[{key:"push",value:function(e){this.lineStream.push(e)}},{key:"end",value:function(){this.lineStream.push("\n")}}]),t}(l["default"]);i["default"]=m},{}],33:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function e(){n(this,e),this.listeners={}}return r(e,[{key:"on",value:function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"off",value:function(e,t){if(!this.listeners[e])return!1;var i=this.listeners[e].indexOf(t);return this.listeners[e].splice(i,1),i>-1}},{key:"trigger",value:function(e){var t=this.listeners[e],i=void 0,n=void 0,r=void 0;if(t)if(2===arguments.length)for(n=t.length,i=0;i<n;++i)t[i].call(this,arguments[1]);else for(r=Array.prototype.slice.call(arguments,1),n=t.length,i=0;i<n;++i)t[i].apply(this,r)}},{key:"dispose",value:function(){this.listeners={}}},{key:"pipe",value:function(e){this.on("data",function(t){e.push(t)})}}]),e}();i["default"]=a},{}],34:[function(e,t,i){"use strict";var n,r=e(58);n=function(){var e=new Uint8Array,t=0;n.prototype.init.call(this),this.setTimestamp=function(e){t=e},this.parseId3TagSize=function(e,t){var i=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9];return(16&e[t+5])>>4?i+20:i+10},this.parseAdtsSize=function(e,t){var i=(224&e[t+5])>>5,n=e[t+4]<<3;return 6144&e[t+3]|n|i},this.push=function(i){var n,r,a,s,o=0,u=0;for(e.length?(s=e.length,e=new Uint8Array(i.byteLength+s),e.set(e.subarray(0,s)),e.set(i,s)):e=i;e.length-u>=3;)if(e[u]!=="I".charCodeAt(0)||e[u+1]!=="D".charCodeAt(0)||e[u+2]!=="3".charCodeAt(0))if(e[u]&!0&&240===(240&e[u+1])){if(e.length-u<7)break;if(o=this.parseAdtsSize(e,u),o>e.length)break;a={type:"audio",data:e.subarray(u,u+o),pts:t,dts:t},this.trigger("data",a),u+=o}else u++;else{if(e.length-u<10)break;if(o=this.parseId3TagSize(e,u),o>e.length)break;r={type:"timed-metadata",data:e.subarray(u,u+o)},this.trigger("data",r),u+=o}n=e.length-u,e=n>0?e.subarray(u):new Uint8Array}},n.prototype=new r,t.exports=n},{}],35:[function(e,t,i){"use strict";var n=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],r=function(e){return e[0]<<21|e[1]<<14|e[2]<<7|e[3]},a=function(e,t,i){var n,r="";for(n=t;n<i;n++)r+="%"+("00"+e[n].toString(16)).slice(-2);return r},s=function(e,t,i){return unescape(a(e,t,i))},o=function(e,t){var i=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9];return(16&e[t+5])>>4?i+20:i+10},u=function(e,t){var i=(224&e[t+5])>>5,n=e[t+4]<<3;return 6144&e[t+3]|n|i},d=function(e,t){return e[t]==="I".charCodeAt(0)&&e[t+1]==="D".charCodeAt(0)&&e[t+2]==="3".charCodeAt(0)?"timed-metadata":e[t]&!0&&240===(240&e[t+1])?"audio":null},l=function(e){for(var t=0;t+5<e.length;){if(255===e[t]&&240===(246&e[t+1]))return n[(60&e[t+2])>>>2];t++}return null},f=function(e){var t,i,n,a;t=10,64&e[5]&&(t+=4,t+=r(e.subarray(10,14)));do{if(i=r(e.subarray(t+4,t+8)),i<1)return null;if(a=String.fromCharCode(e[t],e[t+1],e[t+2],e[t+3]),"PRIV"===a){n=e.subarray(t+10,t+i+10);for(var o=0;o<n.byteLength;o++)if(0===n[o]){var u=s(n,0,o);if("com.apple.streaming.transportStreamTimestamp"===u){var d=n.subarray(o+1),l=(1&d[3])<<30|d[4]<<22|d[5]<<14|d[6]<<6|d[7]>>>2;return l*=4,l+=3&d[7]}break}}t+=10,t+=i}while(t<e.byteLength);return null};t.exports={parseId3TagSize:o,parseAdtsSize:u,parseType:d,parseSampleRate:l,parseAacTimestamp:f}},{}],36:[function(e,t,i){"use strict";var n,r=e(58),a=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];n=function(){var e;n.prototype.init.call(this),this.push=function(t){var i,n,r,s,o,u,d=0,l=0;if("audio"===t.type)for(e?(s=e,e=new Uint8Array(s.byteLength+t.data.byteLength),e.set(s),e.set(t.data,s.byteLength)):e=t.data;d+5<e.length;)if(255===e[d]&&240===(246&e[d+1])){if(n=2*(1&~e[d+1]),i=(3&e[d+3])<<11|e[d+4]<<3|(224&e[d+5])>>5,o=1024*((3&e[d+6])+1),u=9e4*o/a[(60&e[d+2])>>>2],r=d+i,e.byteLength<r)return;if(this.trigger("data",{pts:t.pts+l*u,dts:t.dts+l*u,sampleCount:o,audioobjecttype:(e[d+2]>>>6&3)+1,channelcount:(1&e[d+2])<<2|(192&e[d+3])>>>6,samplerate:a[(60&e[d+2])>>>2],samplingfrequencyindex:(60&e[d+2])>>>2,samplesize:16,data:e.subarray(d+7+n,r)}),e.byteLength===r)return void(e=void 0);l++,e=e.subarray(r)}else d++},this.flush=function(){this.trigger("done")}},n.prototype=new r,t.exports=n},{}],37:[function(e,t,i){"use strict";var n,r,a,s=e(58),o=e(57);r=function(){var e,t,i=0;r.prototype.init.call(this),this.push=function(n){var r;for(t?(r=new Uint8Array(t.byteLength+n.data.byteLength),r.set(t),r.set(n.data,t.byteLength),t=r):t=n.data;i<t.byteLength-3;i++)if(1===t[i+2]){e=i+5;break}for(;e<t.byteLength;)switch(t[e]){case 0:if(0!==t[e-1]){e+=2;break}if(0!==t[e-2]){e++;break}i+3!==e-2&&this.trigger("data",t.subarray(i+3,e-2));do e++;while(1!==t[e]&&e<t.length);i=e-2,e+=3;break;case 1:if(0!==t[e-1]||0!==t[e-2]){e+=3;break}this.trigger("data",t.subarray(i+3,e-2)),i=e-2,e+=3;break;default:e+=3}t=t.subarray(i),e-=i,i=0},this.flush=function(){t&&t.byteLength>3&&this.trigger("data",t.subarray(i+3)),t=null,i=0,this.trigger("done")}},r.prototype=new s,a={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},n=function(){var e,t,i,s,u,d,l,f=new r;n.prototype.init.call(this),e=this,this.push=function(e){"video"===e.type&&(t=e.trackId,i=e.pts,s=e.dts,f.push(e))},f.on("data",function(n){var r={trackId:t,pts:i,dts:s,data:n};switch(31&n[0]){case 5:r.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:r.nalUnitType="sei_rbsp",r.escapedRBSP=u(n.subarray(1));break;case 7:r.nalUnitType="seq_parameter_set_rbsp",r.escapedRBSP=u(n.subarray(1)),r.config=d(r.escapedRBSP);break;case 8:r.nalUnitType="pic_parameter_set_rbsp";break;case 9:r.nalUnitType="access_unit_delimiter_rbsp"}e.trigger("data",r)}),f.on("done",function(){e.trigger("done")}),this.flush=function(){f.flush()},l=function(e,t){var i,n,r=8,a=8;for(i=0;i<e;i++)0!==a&&(n=t.readExpGolomb(),a=(r+n+256)%256),r=0===a?r:a},u=function(e){for(var t,i,n=e.byteLength,r=[],a=1;a<n-2;)0===e[a]&&0===e[a+1]&&3===e[a+2]?(r.push(a+2),a+=2):a++;if(0===r.length)return e;t=n-r.length,i=new Uint8Array(t);var s=0;for(a=0;a<t;s++,a++)s===r[0]&&(s++,r.shift()),i[a]=e[s];return i},d=function(e){var t,i,n,r,s,u,d,f,c,h,p,m,g,y=0,v=0,_=0,b=0,T=1;if(t=new o(e),i=t.readUnsignedByte(),r=t.readUnsignedByte(),n=t.readUnsignedByte(),t.skipUnsignedExpGolomb(),a[i]&&(s=t.readUnsignedExpGolomb(),3===s&&t.skipBits(1),t.skipUnsignedExpGolomb(),t.skipUnsignedExpGolomb(),t.skipBits(1),t.readBoolean()))for(p=3!==s?8:12,g=0;g<p;g++)t.readBoolean()&&(g<6?l(16,t):l(64,t));if(t.skipUnsignedExpGolomb(),u=t.readUnsignedExpGolomb(),0===u)t.readUnsignedExpGolomb();else if(1===u)for(t.skipBits(1),t.skipExpGolomb(),t.skipExpGolomb(),d=t.readUnsignedExpGolomb(),g=0;g<d;g++)t.skipExpGolomb();if(t.skipUnsignedExpGolomb(),t.skipBits(1),f=t.readUnsignedExpGolomb(),c=t.readUnsignedExpGolomb(),h=t.readBits(1),0===h&&t.skipBits(1),t.skipBits(1),t.readBoolean()&&(y=t.readUnsignedExpGolomb(),v=t.readUnsignedExpGolomb(),_=t.readUnsignedExpGolomb(),b=t.readUnsignedExpGolomb()),t.readBoolean()&&t.readBoolean()){switch(t.readUnsignedByte()){case 1:m=[1,1];break;case 2:m=[12,11];break;case 3:m=[10,11];break;case 4:m=[16,11];break;case 5:m=[40,33];break;case 6:m=[24,11];break;case 7:m=[20,11];break;case 8:m=[32,11];break;case 9:m=[80,33];break;case 10:m=[18,11];break;case 11:m=[15,11];break;case 12:m=[64,33];break;case 13:m=[160,99];break;case 14:m=[4,3];break;case 15:m=[3,2];break;case 16:m=[2,1];break;case 255:m=[t.readUnsignedByte()<<8|t.readUnsignedByte(),t.readUnsignedByte()<<8|t.readUnsignedByte()]}m&&(T=m[0]/m[1])}return{profileIdc:i,levelIdc:n,profileCompatibility:r,width:Math.ceil((16*(f+1)-2*y-2*v)*T),height:(2-h)*(c+1)*16-2*_-2*b}}},n.prototype=new s,t.exports={H264Stream:n,NalByteStream:r}},{}],38:[function(e,t,i){var n=[33,16,5,32,164,27],r=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],a=function(e){for(var t=[];e--;)t.push(0);return t},s=function(e){return Object.keys(e).reduce(function(t,i){return t[i]=new Uint8Array(e[i].reduce(function(e,t){return e.concat(t)},[])),t},{})},o={96e3:[n,[227,64],a(154),[56]],88200:[n,[231],a(170),[56]],64e3:[n,[248,192],a(240),[56]],48e3:[n,[255,192],a(268),[55,148,128],a(54),[112]],44100:[n,[255,192],a(268),[55,163,128],a(84),[112]],32e3:[n,[255,192],a(268),[55,234],a(226),[112]],24e3:[n,[255,192],a(268),[55,255,128],a(268),[111,112],a(126),[224]],16e3:[n,[255,192],a(268),[55,255,128],a(268),[111,255],a(269),[223,108],a(195),[1,192]],12e3:[r,a(268),[3,127,248],a(268),[6,255,240],a(268),[13,255,224],a(268),[27,253,128],a(259),[56]],11025:[r,a(268),[3,127,248],a(268),[6,255,240],a(268),[13,255,224],a(268),[27,255,192],a(268),[55,175,128],a(108),[112]],8e3:[r,a(268),[3,121,16],a(47),[7]]};t.exports=s(o)},{}],39:[function(e,t,i){"use strict";var n=e(58),r=function(e){this.numberOfTracks=0,this.metadataStream=e.metadataStream,this.videoTags=[],this.audioTags=[],this.videoTrack=null,this.audioTrack=null,this.pendingCaptions=[],this.pendingMetadata=[],this.pendingTracks=0,this.processedTracks=0,r.prototype.init.call(this),this.push=function(e){return e.text?this.pendingCaptions.push(e):e.frames?this.pendingMetadata.push(e):("video"===e.track.type&&(this.videoTrack=e.track,this.videoTags=e.tags,this.pendingTracks++),void("audio"===e.track.type&&(this.audioTrack=e.track,this.audioTags=e.tags,this.pendingTracks++)))}};r.prototype=new n,r.prototype.flush=function(e){var t,i,n,r,a={tags:{},captions:[],metadata:[]};if(this.pendingTracks<this.numberOfTracks){if("VideoSegmentStream"!==e&&"AudioSegmentStream"!==e)return;if(0===this.pendingTracks&&(this.processedTracks++,this.processedTracks<this.numberOfTracks))return}if(this.processedTracks+=this.pendingTracks,this.pendingTracks=0,!(this.processedTracks<this.numberOfTracks)){for(this.videoTrack?r=this.videoTrack.timelineStartInfo.pts:this.audioTrack&&(r=this.audioTrack.timelineStartInfo.pts),a.tags.videoTags=this.videoTags,a.tags.audioTags=this.audioTags,n=0;n<this.pendingCaptions.length;n++)i=this.pendingCaptions[n],i.startTime=i.startPts-r,i.startTime/=9e4,i.endTime=i.endPts-r,i.endTime/=9e4,a.captions.push(i);for(n=0;n<this.pendingMetadata.length;n++)t=this.pendingMetadata[n],t.cueTime=t.pts-r,t.cueTime/=9e4,a.metadata.push(t);a.metadata.dispatchType=this.metadataStream.dispatchType,this.videoTrack=null,this.audioTrack=null,this.videoTags=[],this.audioTags=[],this.pendingCaptions.length=0,this.pendingMetadata.length=0,this.pendingTracks=0,this.processedTracks=0,this.trigger("data",a),this.trigger("done")}},t.exports=r},{}],40:[function(e,t,i){"use strict";var n=e(41),r=function(e,t,i){var r,a,s,o=new Uint8Array(9),u=new DataView(o.buffer);return e=e||0,t=void 0===t||t,i=void 0===i||i,u.setUint8(0,70),u.setUint8(1,76),u.setUint8(2,86),u.setUint8(3,1),u.setUint8(4,(t?4:0)|(i?1:0)),u.setUint32(5,o.byteLength),e<=0?(a=new Uint8Array(o.byteLength+4),a.set(o),a.set([0,0,0,0],o.byteLength),a):(r=new n(n.METADATA_TAG),r.pts=r.dts=0,r.writeMetaDataDouble("duration",e),s=r.finalize().length,a=new Uint8Array(o.byteLength+s),a.set(o),a.set(u.byteLength,s),a)};t.exports=r},{}],41:[function(e,t,i){"use strict";var n;n=function(e,t){var i,r=0,a=16384,s=function(e,t){var i,n=e.position+t;n<e.bytes.byteLength||(i=new Uint8Array(2*n),i.set(e.bytes.subarray(0,e.position),0),e.bytes=i,e.view=new DataView(e.bytes.buffer))
},o=n.widthBytes||new Uint8Array("width".length),u=n.heightBytes||new Uint8Array("height".length),d=n.videocodecidBytes||new Uint8Array("videocodecid".length);if(!n.widthBytes){for(i=0;i<"width".length;i++)o[i]="width".charCodeAt(i);for(i=0;i<"height".length;i++)u[i]="height".charCodeAt(i);for(i=0;i<"videocodecid".length;i++)d[i]="videocodecid".charCodeAt(i);n.widthBytes=o,n.heightBytes=u,n.videocodecidBytes=d}switch(this.keyFrame=!1,e){case n.VIDEO_TAG:this.length=16,a*=6;break;case n.AUDIO_TAG:this.length=13,this.keyFrame=!0;break;case n.METADATA_TAG:this.length=29,this.keyFrame=!0;break;default:throw new Error("Unknown FLV tag type")}this.bytes=new Uint8Array(a),this.view=new DataView(this.bytes.buffer),this.bytes[0]=e,this.position=this.length,this.keyFrame=t,this.pts=0,this.dts=0,this.writeBytes=function(e,t,i){var n,r=t||0;i=i||e.byteLength,n=r+i,s(this,i),this.bytes.set(e.subarray(r,n),this.position),this.position+=i,this.length=Math.max(this.length,this.position)},this.writeByte=function(e){s(this,1),this.bytes[this.position]=e,this.position++,this.length=Math.max(this.length,this.position)},this.writeShort=function(e){s(this,2),this.view.setUint16(this.position,e),this.position+=2,this.length=Math.max(this.length,this.position)},this.negIndex=function(e){return this.bytes[this.length-e]},this.nalUnitSize=function(){return 0===r?0:this.length-(r+4)},this.startNalUnit=function(){if(r>0)throw new Error("Attempted to create new NAL wihout closing the old one");r=this.length,this.length+=4,this.position=this.length},this.endNalUnit=function(e){var t,i;this.length===r+4?this.length-=4:r>0&&(t=r+4,i=this.length-t,this.position=r,this.view.setUint32(this.position,i),this.position=this.length,e&&e.push(this.bytes.subarray(t,t+i))),r=0},this.writeMetaDataDouble=function(e,t){var i;if(s(this,2+e.length+9),this.view.setUint16(this.position,e.length),this.position+=2,"width"===e)this.bytes.set(o,this.position),this.position+=5;else if("height"===e)this.bytes.set(u,this.position),this.position+=6;else if("videocodecid"===e)this.bytes.set(d,this.position),this.position+=12;else for(i=0;i<e.length;i++)this.bytes[this.position]=e.charCodeAt(i),this.position++;this.position++,this.view.setFloat64(this.position,t),this.position+=8,this.length=Math.max(this.length,this.position),++r},this.writeMetaDataBoolean=function(e,t){var i;for(s(this,2),this.view.setUint16(this.position,e.length),this.position+=2,i=0;i<e.length;i++)s(this,1),this.bytes[this.position]=e.charCodeAt(i),this.position++;s(this,2),this.view.setUint8(this.position,1),this.position++,this.view.setUint8(this.position,t?1:0),this.position++,this.length=Math.max(this.length,this.position),++r},this.finalize=function(){var e,i;switch(this.bytes[0]){case n.VIDEO_TAG:this.bytes[11]=7|(this.keyFrame||t?16:32),this.bytes[12]=t?0:1,e=this.pts-this.dts,this.bytes[13]=(16711680&e)>>>16,this.bytes[14]=(65280&e)>>>8,this.bytes[15]=(255&e)>>>0;break;case n.AUDIO_TAG:this.bytes[11]=175,this.bytes[12]=t?0:1;break;case n.METADATA_TAG:this.position=11,this.view.setUint8(this.position,2),this.position++,this.view.setUint16(this.position,10),this.position+=2,this.bytes.set([111,110,77,101,116,97,68,97,116,97],this.position),this.position+=10,this.bytes[this.position]=8,this.position++,this.view.setUint32(this.position,r),this.position=this.length,this.bytes.set([0,0,9],this.position),this.position+=3,this.length=this.position}return i=this.length-11,this.bytes[1]=(16711680&i)>>>16,this.bytes[2]=(65280&i)>>>8,this.bytes[3]=(255&i)>>>0,this.bytes[4]=(16711680&this.dts)>>>16,this.bytes[5]=(65280&this.dts)>>>8,this.bytes[6]=(255&this.dts)>>>0,this.bytes[7]=(4278190080&this.dts)>>>24,this.bytes[8]=0,this.bytes[9]=0,this.bytes[10]=0,s(this,4),this.view.setUint32(this.length,this.length),this.length+=4,this.position+=4,this.bytes=this.bytes.subarray(0,this.length),this.frameTime=n.frameTime(this.bytes),this}},n.AUDIO_TAG=8,n.VIDEO_TAG=9,n.METADATA_TAG=18,n.isAudioFrame=function(e){return n.AUDIO_TAG===e[0]},n.isVideoFrame=function(e){return n.VIDEO_TAG===e[0]},n.isMetaData=function(e){return n.METADATA_TAG===e[0]},n.isKeyFrame=function(e){return n.isVideoFrame(e)?23===e[11]:!!n.isAudioFrame(e)||!!n.isMetaData(e)},n.frameTime=function(e){var t=e[4]<<16;return t|=e[5]<<8,t|=e[6]<<0,t|=e[7]<<24},t.exports=n},{}],42:[function(e,t,i){t.exports={tag:e(41),Transmuxer:e(44),getFlvHeader:e(40)}},{}],43:[function(e,t,i){"use strict";var n=function(){var e=this;this.list=[],this.push=function(e){this.list.push({bytes:e.bytes,dts:e.dts,pts:e.pts,keyFrame:e.keyFrame,metaDataTag:e.metaDataTag})},Object.defineProperty(this,"length",{get:function(){return e.list.length}})};t.exports=n},{}],44:[function(e,t,i){"use strict";var n,r,a,s,o,u,d=e(58),l=e(41),f=e(46),c=e(36),h=e(37).H264Stream,p=e(39),m=e(43);s=function(e,t){"number"==typeof t.pts&&(void 0===e.timelineStartInfo.pts?e.timelineStartInfo.pts=t.pts:e.timelineStartInfo.pts=Math.min(e.timelineStartInfo.pts,t.pts)),"number"==typeof t.dts&&(void 0===e.timelineStartInfo.dts?e.timelineStartInfo.dts=t.dts:e.timelineStartInfo.dts=Math.min(e.timelineStartInfo.dts,t.dts))},o=function(e,t){var i=new l(l.METADATA_TAG);return i.dts=t,i.pts=t,i.writeMetaDataDouble("videocodecid",7),i.writeMetaDataDouble("width",e.width),i.writeMetaDataDouble("height",e.height),i},u=function(e,t){var i,n=new l(l.VIDEO_TAG,!0);for(n.dts=t,n.pts=t,n.writeByte(1),n.writeByte(e.profileIdc),n.writeByte(e.profileCompatibility),n.writeByte(e.levelIdc),n.writeByte(255),n.writeByte(225),n.writeShort(e.sps[0].length),n.writeBytes(e.sps[0]),n.writeByte(e.pps.length),i=0;i<e.pps.length;++i)n.writeShort(e.pps[i].length),n.writeBytes(e.pps[i]);return n},a=function(e){var t,i=[];a.prototype.init.call(this),this.push=function(t){s(e,t),e&&void 0===e.channelcount&&(e.audioobjecttype=t.audioobjecttype,e.channelcount=t.channelcount,e.samplerate=t.samplerate,e.samplingfrequencyindex=t.samplingfrequencyindex,e.samplesize=t.samplesize,e.extraData=e.audioobjecttype<<11|e.samplingfrequencyindex<<7|e.channelcount<<3),t.pts=Math.round(t.pts/90),t.dts=Math.round(t.dts/90),i.push(t)},this.flush=function(){var n,r,a,s=new m;if(0===i.length)return void this.trigger("done","AudioSegmentStream");for(a=-(1/0);i.length;)n=i.shift(),(e.extraData!==t||n.pts-a>=1e3)&&(r=new l(l.METADATA_TAG),r.pts=n.pts,r.dts=n.dts,r.writeMetaDataDouble("audiocodecid",10),r.writeMetaDataBoolean("stereo",2===e.channelcount),r.writeMetaDataDouble("audiosamplerate",e.samplerate),r.writeMetaDataDouble("audiosamplesize",16),s.push(r.finalize()),t=e.extraData,r=new l(l.AUDIO_TAG,!0),r.pts=n.pts,r.dts=n.dts,r.view.setUint16(r.position,e.extraData),r.position+=2,r.length=Math.max(r.length,r.position),s.push(r.finalize()),a=n.pts),r=new l(l.AUDIO_TAG),r.pts=n.pts,r.dts=n.dts,r.writeBytes(n.data),s.push(r.finalize());t=null,this.trigger("data",{track:e,tags:s.list}),this.trigger("done","AudioSegmentStream")}},a.prototype=new d,r=function(e){var t,i,n=[];r.prototype.init.call(this),this.finishFrame=function(n,r){if(r){if(t&&e&&e.newMetadata&&(r.keyFrame||0===n.length)){var a=o(t,r.dts).finalize(),s=u(e,r.dts).finalize();a.metaDataTag=s.metaDataTag=!0,n.push(a),n.push(s),e.newMetadata=!1}r.endNalUnit(),n.push(r.finalize()),i=null}},this.push=function(t){s(e,t),t.pts=Math.round(t.pts/90),t.dts=Math.round(t.dts/90),n.push(t)},this.flush=function(){for(var r,a=new m;n.length&&"access_unit_delimiter_rbsp"!==n[0].nalUnitType;)n.shift();if(0===n.length)return void this.trigger("done","VideoSegmentStream");for(;n.length;)r=n.shift(),"seq_parameter_set_rbsp"===r.nalUnitType?(e.newMetadata=!0,t=r.config,e.width=t.width,e.height=t.height,e.sps=[r.data],e.profileIdc=t.profileIdc,e.levelIdc=t.levelIdc,e.profileCompatibility=t.profileCompatibility,i.endNalUnit()):"pic_parameter_set_rbsp"===r.nalUnitType?(e.newMetadata=!0,e.pps=[r.data],i.endNalUnit()):"access_unit_delimiter_rbsp"===r.nalUnitType?(i&&this.finishFrame(a,i),i=new l(l.VIDEO_TAG),i.pts=r.pts,i.dts=r.dts):("slice_layer_without_partitioning_rbsp_idr"===r.nalUnitType&&(i.keyFrame=!0),i.endNalUnit()),i.startNalUnit(),i.writeBytes(r.data);i&&this.finishFrame(a,i),this.trigger("data",{track:e,tags:a.list}),this.trigger("done","VideoSegmentStream")}},r.prototype=new d,n=function(e){var t,i,s,o,u,d,l,m,g,y,v,_,b=this;n.prototype.init.call(this),e=e||{},this.metadataStream=new f.MetadataStream,e.metadataStream=this.metadataStream,t=new f.TransportPacketStream,i=new f.TransportParseStream,s=new f.ElementaryStream,o=new f.TimestampRolloverStream("video"),u=new f.TimestampRolloverStream("audio"),d=new f.TimestampRolloverStream("timed-metadata"),l=new c,m=new h,_=new p(e),t.pipe(i).pipe(s),s.pipe(o).pipe(m),s.pipe(u).pipe(l),s.pipe(d).pipe(this.metadataStream).pipe(_),v=new f.CaptionStream,m.pipe(v).pipe(_),s.on("data",function(e){var t,i,n;if("metadata"===e.type){for(t=e.tracks.length;t--;)"video"===e.tracks[t].type?i=e.tracks[t]:"audio"===e.tracks[t].type&&(n=e.tracks[t]);i&&!g&&(_.numberOfTracks++,g=new r(i),m.pipe(g).pipe(_)),n&&!y&&(_.numberOfTracks++,y=new a(n),l.pipe(y).pipe(_))}}),this.push=function(e){t.push(e)},this.flush=function(){t.flush()},_.on("data",function(e){b.trigger("data",e)}),_.on("done",function(){b.trigger("done")})},n.prototype=new d,t.exports=n},{}],45:[function(e,t,i){"use strict";var n=e(58),r=function(e){for(var t=0,i={payloadType:-1,payloadSize:0},n=0,r=0;t<e.byteLength&&128!==e[t];){for(;255===e[t];)n+=255,t++;for(n+=e[t++];255===e[t];)r+=255,t++;if(r+=e[t++],!i.payload&&4===n){i.payloadType=n,i.payloadSize=r,i.payload=e.subarray(t,t+r);break}t+=r,n=0,r=0}return i},a=function(e){return 181!==e.payload[0]?null:49!==(e.payload[1]<<8|e.payload[2])?null:"GA94"!==String.fromCharCode(e.payload[3],e.payload[4],e.payload[5],e.payload[6])?null:3!==e.payload[7]?null:e.payload.subarray(8,e.payload.length-1)},s=function(e,t){var i,n,r,a,s=[];if(!(64&t[0]))return s;for(n=31&t[0],i=0;i<n;i++)r=3*i,a={type:3&t[r+2],pts:e},4&t[r+2]&&(a.ccData=t[r+3]<<8|t[r+4],s.push(a));return s},o=function(){o.prototype.init.call(this),this.captionPackets_=[],this.field1_=new f,this.field1_.on("data",this.trigger.bind(this,"data")),this.field1_.on("done",this.trigger.bind(this,"done"))};o.prototype=new n,o.prototype.push=function(e){var t,i;"sei_rbsp"===e.nalUnitType&&(t=r(e.escapedRBSP),4===t.payloadType&&(i=a(t),i&&(this.captionPackets_=this.captionPackets_.concat(s(e.pts,i)))))},o.prototype.flush=function(){if(!this.captionPackets_.length)return void this.field1_.flush();this.captionPackets_.forEach(function(e,t){e.presortIndex=t}),this.captionPackets_.sort(function(e,t){return e.pts===t.pts?e.presortIndex-t.presortIndex:e.pts-t.pts}),this.captionPackets_.forEach(this.field1_.push,this.field1_),this.captionPackets_.length=0,this.field1_.flush()};var u={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608},d=function(e){return null===e?"":(e=u[e]||e,String.fromCharCode(e))},l=function(){for(var e=[],t=15;t--;)e.push("");return e},f=function(){f.prototype.init.call(this),this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=l(),this.nonDisplayed_=l(),this.lastControlCode_=null,this.push=function(e){if(0===e.type){var t,i,n,r;if(t=32639&e.ccData,t===this.lastControlCode_)return void(this.lastControlCode_=null);switch(this.lastControlCode_=4096===(61440&t)?t:null,t){case 0:break;case 5152:this.mode_="popOn";break;case 5167:this.flushDisplayed(e.pts),i=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=i,this.startPts_=e.pts;break;case 5157:this.topRow_=13,this.mode_="rollUp";break;case 5158:this.topRow_=12,this.mode_="rollUp";break;case 5159:this.topRow_=11,this.mode_="rollUp";break;case 5165:this.flushDisplayed(e.pts),this.shiftRowsUp_(),this.startPts_=e.pts;break;case 5153:"popOn"===this.mode_?this.nonDisplayed_[14]=this.nonDisplayed_[14].slice(0,-1):this.displayed_[14]=this.displayed_[14].slice(0,-1);break;case 5164:this.flushDisplayed(e.pts),this.displayed_=l();break;case 5166:this.nonDisplayed_=l();break;default:if(n=t>>>8,r=255&t,n>=16&&n<=23&&r>=64&&r<=127&&(16!==n||r<96)&&(n=32,r=null),(17===n||25===n)&&r>=48&&r<=63&&(n=9834,r=""),16===(240&n))return;0===n&&(n=null),0===r&&(r=null),this[this.mode_](e.pts,n,r)}}}};f.prototype=new n,f.prototype.flushDisplayed=function(e){var t=this.displayed_.map(function(e){return e.trim()}).filter(function(e){return e.length}).join("\n");t.length&&this.trigger("data",{startPts:this.startPts_,endPts:e,text:t})},f.prototype.popOn=function(e,t,i){var n=this.nonDisplayed_[14];n+=d(t),n+=d(i),this.nonDisplayed_[14]=n},f.prototype.rollUp=function(e,t,i){var n=this.displayed_[14];""===n&&(this.flushDisplayed(e),this.startPts_=e),n+=d(t),n+=d(i),this.displayed_[14]=n},f.prototype.shiftRowsUp_=function(){var e;for(e=0;e<this.topRow_;e++)this.displayed_[e]="";for(e=this.topRow_;e<14;e++)this.displayed_[e]=this.displayed_[e+1];this.displayed_[14]=""},t.exports={CaptionStream:o,Cea608Stream:f}},{}],46:[function(e,t,i){"use strict";var n,r,a,s=e(58),o=e(45),u=e(49),d=e(50).TimestampRolloverStream,l=e(49);n=function(){var e=new Uint8Array(188),t=0;n.prototype.init.call(this),this.push=function(i){var n,r=0,a=188;for(t?(n=new Uint8Array(i.byteLength+t),n.set(e.subarray(0,t)),n.set(i,t),t=0):n=i;a<n.byteLength;)71!==n[r]||71!==n[a]?(r++,a++):(this.trigger("data",n.subarray(r,a)),r+=188,a+=188);r<n.byteLength&&(e.set(n.subarray(r),0),t=n.byteLength-r)},this.flush=function(){188===t&&71===e[0]&&(this.trigger("data",e),t=0),this.trigger("done")}},n.prototype=new s,r=function(){var e,t,i,n;r.prototype.init.call(this),n=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,e=function(e,n){var r=0;n.payloadUnitStartIndicator&&(r+=e[r]+1),"pat"===n.type?t(e.subarray(r),n):i(e.subarray(r),n)},t=function(e,t){t.section_number=e[7],t.last_section_number=e[8],n.pmtPid=(31&e[10])<<8|e[11],t.pmtPid=n.pmtPid},i=function(e,t){var i,r,a,s;if(1&e[5]){for(n.programMapTable={},i=(15&e[1])<<8|e[2],r=3+i-4,a=(15&e[10])<<8|e[11],s=12+a;s<r;)n.programMapTable[(31&e[s+1])<<8|e[s+2]]=e[s],s+=((15&e[s+3])<<8|e[s+4])+5;for(t.programMapTable=n.programMapTable;n.packetsWaitingForPmt.length;)n.processPes_.apply(n,n.packetsWaitingForPmt.shift())}},this.push=function(t){var i={},n=4;i.payloadUnitStartIndicator=!!(64&t[1]),i.pid=31&t[1],i.pid<<=8,i.pid|=t[2],(48&t[3])>>>4>1&&(n+=t[n]+1),0===i.pid?(i.type="pat",e(t.subarray(n),i),this.trigger("data",i)):i.pid===this.pmtPid?(i.type="pmt",e(t.subarray(n),i),this.trigger("data",i)):void 0===this.programMapTable?this.packetsWaitingForPmt.push([t,n,i]):this.processPes_(t,n,i)},this.processPes_=function(e,t,i){i.streamType=this.programMapTable[i.pid],i.type="pes",i.data=e.subarray(t),this.trigger("data",i)}},r.prototype=new s,r.STREAM_TYPES={h264:27,adts:15},a=function(){var e=this,t={data:[],size:0},i={data:[],size:0},n={data:[],size:0},r=function(e,t){var i;t.dataAlignmentIndicator=0!==(4&e[6]),i=e[7],192&i&&(t.pts=(14&e[9])<<27|(255&e[10])<<20|(254&e[11])<<12|(255&e[12])<<5|(254&e[13])>>>3,t.pts*=4,t.pts+=(6&e[13])>>>1,t.dts=t.pts,64&i&&(t.dts=(14&e[14])<<27|(255&e[15])<<20|(254&e[16])<<12|(255&e[17])<<5|(254&e[18])>>>3,t.dts*=4,t.dts+=(6&e[18])>>>1)),t.data=e.subarray(9+e[8])},s=function(t,i){var n,a=new Uint8Array(t.size),s={type:i},o=0;if(t.data.length){for(s.trackId=t.data[0].pid;t.data.length;)n=t.data.shift(),a.set(n.data,o),o+=n.data.byteLength;r(a,s),t.size=0,e.trigger("data",s)}};a.prototype.init.call(this),this.push=function(r){({pat:function(){},pes:function(){var e,a;switch(r.streamType){case u.H264_STREAM_TYPE:case l.H264_STREAM_TYPE:e=t,a="video";break;case u.ADTS_STREAM_TYPE:e=i,a="audio";break;case u.METADATA_STREAM_TYPE:e=n,a="timed-metadata";break;default:return}r.payloadUnitStartIndicator&&s(e,a),e.data.push(r),e.size+=r.data.byteLength},pmt:function(){var t,i,n={type:"metadata",tracks:[]},a=r.programMapTable;for(t in a)a.hasOwnProperty(t)&&(i={timelineStartInfo:{baseMediaDecodeTime:0}},i.id=+t,a[t]===l.H264_STREAM_TYPE?(i.codec="avc",i.type="video"):a[t]===l.ADTS_STREAM_TYPE&&(i.codec="adts",i.type="audio"),n.tracks.push(i));e.trigger("data",n)}})[r.type]()},this.flush=function(){s(t,"video"),s(i,"audio"),s(n,"timed-metadata"),this.trigger("done")}},a.prototype=new s;var f={PAT_PID:0,MP2T_PACKET_LENGTH:188,TransportPacketStream:n,TransportParseStream:r,ElementaryStream:a,TimestampRolloverStream:d,CaptionStream:o.CaptionStream,Cea608Stream:o.Cea608Stream,MetadataStream:e(47)};for(var c in u)u.hasOwnProperty(c)&&(f[c]=u[c]);t.exports=f},{}],47:[function(e,t,i){"use strict";var n,r=e(58),a=e(49),s=function(e,t,i){var n,r="";for(n=t;n<i;n++)r+="%"+("00"+e[n].toString(16)).slice(-2);return r},o=function(e,t,i){return decodeURIComponent(s(e,t,i))},u=function(e,t,i){return unescape(s(e,t,i))},d=function(e){return e[0]<<21|e[1]<<14|e[2]<<7|e[3]},l={TXXX:function(e){var t;if(3===e.data[0]){for(t=1;t<e.data.length;t++)if(0===e.data[t]){e.description=o(e.data,1,t),e.value=o(e.data,t+1,e.data.length-1);break}e.data=e.value}},WXXX:function(e){var t;if(3===e.data[0])for(t=1;t<e.data.length;t++)if(0===e.data[t]){e.description=o(e.data,1,t),e.url=o(e.data,t+1,e.data.length);break}},PRIV:function(e){var t;for(t=0;t<e.data.length;t++)if(0===e.data[t]){e.owner=u(e.data,0,t);break}e.privateData=e.data.subarray(t+1),e.data=e.privateData}};n=function(e){var t,i={debug:!(!e||!e.debug),descriptor:e&&e.descriptor},r=0,s=[],o=0;if(n.prototype.init.call(this),this.dispatchType=a.METADATA_STREAM_TYPE.toString(16),i.descriptor)for(t=0;t<i.descriptor.length;t++)this.dispatchType+=("00"+i.descriptor[t].toString(16)).slice(-2);this.push=function(e){var t,n,a,u,f,c;if("timed-metadata"===e.type){if(e.dataAlignmentIndicator&&(o=0,s.length=0),0===s.length&&(e.data.length<10||e.data[0]!=="I".charCodeAt(0)||e.data[1]!=="D".charCodeAt(0)||e.data[2]!=="3".charCodeAt(0)))return void(i.debug&&console.log("Skipping unrecognized metadata packet"));if(s.push(e),o+=e.data.byteLength,1===s.length&&(r=d(e.data.subarray(6,10)),r+=10),!(o<r)){for(t={data:new Uint8Array(r),frames:[],pts:s[0].pts,dts:s[0].dts},f=0;f<r;)t.data.set(s[0].data.subarray(0,r-f),f),f+=s[0].data.byteLength,o-=s[0].data.byteLength,s.shift();n=10,64&t.data[5]&&(n+=4,n+=d(t.data.subarray(10,14)),r-=d(t.data.subarray(16,20)));do{if(a=d(t.data.subarray(n+4,n+8)),a<1)return console.log("Malformed ID3 frame encountered. Skipping metadata parsing.");if(c=String.fromCharCode(t.data[n],t.data[n+1],t.data[n+2],t.data[n+3]),u={id:c,data:t.data.subarray(n+10,n+a+10)},u.key=u.id,l[u.id]&&(l[u.id](u),"com.apple.streaming.transportStreamTimestamp"===u.owner)){var h=u.data,p=(1&h[3])<<30|h[4]<<22|h[5]<<14|h[6]<<6|h[7]>>>2;p*=4,p+=3&h[7],u.timeStamp=p,void 0===t.pts&&void 0===t.dts&&(t.pts=u.timeStamp,t.dts=u.timeStamp),this.trigger("timestamp",u)}t.frames.push(u),n+=10,n+=a}while(n<r);this.trigger("data",t)}}}},n.prototype=new r,t.exports=n},{}],48:[function(e,t,i){"use strict";var n=e(49),r=function(e){var t=31&e[1];return t<<=8,t|=e[2]},a=function(e){return!!(64&e[1])},s=function(e){var t=0;return(48&e[3])>>>4>1&&(t+=e[4]+1),t},o=function(e,t){var i=r(e);return 0===i?"pat":i===t?"pmt":t?"pes":null},u=function(e){var t=a(e),i=4+s(e);return t&&(i+=e[i]+1),(31&e[i+10])<<8|e[i+11]},d=function(e){var t={},i=a(e),n=4+s(e);if(i&&(n+=e[n]+1),1&e[n+5]){var r,o,u;r=(15&e[n+1])<<8|e[n+2],o=3+r-4,u=(15&e[n+10])<<8|e[n+11];for(var d=12+u;d<o;){var l=n+d;t[(31&e[l+1])<<8|e[l+2]]=e[l],d+=((15&e[l+3])<<8|e[l+4])+5}return t}},l=function(e,t){switch(t[r(e)]){case n.H264_STREAM_TYPE:return"video";case n.ADTS_STREAM_TYPE:return"audio";case n.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},f=function(e){if(!a(e))return null;var t,i=4+s(e),n={};return t=e[i+7],192&t&&(n.pts=(14&e[i+9])<<27|(255&e[i+10])<<20|(254&e[i+11])<<12|(255&e[i+12])<<5|(254&e[i+13])>>>3,n.pts*=4,n.pts+=(6&e[i+13])>>>1,n.dts=n.pts,64&t&&(n.dts=(14&e[i+14])<<27|(255&e[i+15])<<20|(254&e[i+16])<<12|(255&e[i+17])<<5|(254&e[i+18])>>>3,n.dts*=4,n.dts+=(6&e[i+18])>>>1)),n},c=function(e){switch(e){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},h=function(e){for(var t,i=4+s(e),n=e.subarray(i),r=0,a=0,o=!1;a<n.byteLength-3;a++)if(1===n[a+2]){r=a+5;break}for(;r<n.byteLength;)switch(n[r]){case 0:if(0!==n[r-1]){r+=2;break}if(0!==n[r-2]){r++;break}a+3!==r-2&&(t=c(31&n[a+3]),"slice_layer_without_partitioning_rbsp_idr"===t&&(o=!0));do r++;while(1!==n[r]&&r<n.length);a=r-2,r+=3;break;case 1:if(0!==n[r-1]||0!==n[r-2]){r+=3;break}t=c(31&n[a+3]),"slice_layer_without_partitioning_rbsp_idr"===t&&(o=!0),a=r-2,r+=3;break;default:r+=3}return n=n.subarray(a),r-=a,a=0,n&&n.byteLength>3&&(t=c(31&n[a+3]),"slice_layer_without_partitioning_rbsp_idr"===t&&(o=!0)),o};t.exports={parseType:o,parsePat:u,parsePmt:d,parsePayloadUnitStartIndicator:a,parsePesType:l,parsePesTime:f,videoPacketContainsKeyFrame:h}},{}],49:[function(e,t,i){"use strict";t.exports={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21}},{}],50:[function(e,t,i){"use strict";var n=e(58),r=function(e,t){var i=1;for(e>t&&(i=-1);Math.abs(t-e)>4294967296;)e+=8589934592*i;return e},a=function(e){var t,i;a.prototype.init.call(this),this.type_=e,this.push=function(e){e.type===this.type_&&(void 0===i&&(i=e.dts),e.dts=r(e.dts,i),e.pts=r(e.pts,i),t=e.dts,this.trigger("data",e))},this.flush=function(){i=t,this.trigger("done")}};a.prototype=new n,t.exports={TimestampRolloverStream:a,handleRollover:r}},{}],51:[function(e,t,i){t.exports={generator:e(52),Transmuxer:e(54).Transmuxer,AudioSegmentStream:e(54).AudioSegmentStream,VideoSegmentStream:e(54).VideoSegmentStream}},{}],52:[function(e,t,i){"use strict";var n,r,a,s,o,u,d,l,f,c,h,p,m,g,y,v,_,b,T,S,w,k,O,P,A,E,L,x,I,C,U,D,M,B,R,j,N=Math.pow(2,32)-1;!function(){var e;if(O={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},"undefined"!=typeof Uint8Array){for(e in O)O.hasOwnProperty(e)&&(O[e]=[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]);P=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)]),E=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)]),A=new Uint8Array([0,0,0,1]),L=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),x=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),I={video:L,audio:x},D=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),U=new Uint8Array([0,0,0,0,0,0,0,0]),M=new Uint8Array([0,0,0,0,0,0,0,0]),B=M,R=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),j=M,C=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}}(),n=function(e){var t,i,n,r=[],a=0;for(t=1;t<arguments.length;t++)r.push(arguments[t]);for(t=r.length;t--;)a+=r[t].byteLength;for(i=new Uint8Array(a+8),n=new DataView(i.buffer,i.byteOffset,i.byteLength),n.setUint32(0,i.byteLength),i.set(e,4),t=0,a=8;t<r.length;t++)i.set(r[t],a),a+=r[t].byteLength;return i},r=function(){return n(O.dinf,n(O.dref,D))},a=function(e){return n(O.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,e.audioobjecttype<<3|e.samplingfrequencyindex>>>1,e.samplingfrequencyindex<<7|e.channelcount<<3,6,1,2]))},s=function(){return n(O.ftyp,P,A,P,E)},v=function(e){return n(O.hdlr,I[e])},o=function(e){return n(O.mdat,e)},y=function(e){var t=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,e.duration>>>24&255,e.duration>>>16&255,e.duration>>>8&255,255&e.duration,85,196,0,0]);return e.samplerate&&(t[12]=e.samplerate>>>24&255,t[13]=e.samplerate>>>16&255,t[14]=e.samplerate>>>8&255,t[15]=255&e.samplerate),n(O.mdhd,t)},g=function(e){return n(O.mdia,y(e),v(e.type),d(e))},u=function(e){return n(O.mfhd,new Uint8Array([0,0,0,0,(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e]))},d=function(e){return n(O.minf,"video"===e.type?n(O.vmhd,C):n(O.smhd,U),r(),b(e))},l=function(e,t){for(var i=[],r=t.length;r--;)i[r]=S(t[r]);return n.apply(null,[O.moof,u(e)].concat(i))},f=function(e){for(var t=e.length,i=[];t--;)i[t]=p(e[t]);return n.apply(null,[O.moov,h(4294967295)].concat(i).concat(c(e)))},c=function(e){for(var t=e.length,i=[];t--;)i[t]=w(e[t]);return n.apply(null,[O.mvex].concat(i))},h=function(e){var t=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return n(O.mvhd,t)},_=function(e){var t,i,r=e.samples||[],a=new Uint8Array(4+r.length);for(i=0;i<r.length;i++)t=r[i].flags,a[i+4]=t.dependsOn<<4|t.isDependedOn<<2|t.hasRedundancy;return n(O.sdtp,a)},b=function(e){return n(O.stbl,T(e),n(O.stts,j),n(O.stsc,B),n(O.stsz,R),n(O.stco,M))},function(){var e,t;T=function(i){return n(O.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),"video"===i.type?e(i):t(i))},e=function(e){var t,i=e.sps||[],r=e.pps||[],a=[],s=[];for(t=0;t<i.length;t++)a.push((65280&i[t].byteLength)>>>8),a.push(255&i[t].byteLength),a=a.concat(Array.prototype.slice.call(i[t]));for(t=0;t<r.length;t++)s.push((65280&r[t].byteLength)>>>8),s.push(255&r[t].byteLength),s=s.concat(Array.prototype.slice.call(r[t]));return n(O.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&e.width)>>8,255&e.width,(65280&e.height)>>8,255&e.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),n(O.avcC,new Uint8Array([1,e.profileIdc,e.profileCompatibility,e.levelIdc,255].concat([i.length]).concat(a).concat([r.length]).concat(s))),n(O.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])))},t=function(e){return n(O.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&e.channelcount)>>8,255&e.channelcount,(65280&e.samplesize)>>8,255&e.samplesize,0,0,0,0,(65280&e.samplerate)>>8,255&e.samplerate,0,0]),a(e))}}(),m=function(e){var t=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,0,(4278190080&e.duration)>>24,(16711680&e.duration)>>16,(65280&e.duration)>>8,255&e.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&e.width)>>8,255&e.width,0,0,(65280&e.height)>>8,255&e.height,0,0]);return n(O.tkhd,t)},S=function(e){var t,i,r,a,s,o,u;return t=n(O.tfhd,new Uint8Array([0,0,0,58,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),o=Math.floor(e.baseMediaDecodeTime/(N+1)),u=Math.floor(e.baseMediaDecodeTime%(N+1)),i=n(O.tfdt,new Uint8Array([1,0,0,0,o>>>24&255,o>>>16&255,o>>>8&255,255&o,u>>>24&255,u>>>16&255,u>>>8&255,255&u])),s=92,"audio"===e.type?(r=k(e,s),n(O.traf,t,i,r)):(a=_(e),r=k(e,a.length+s),n(O.traf,t,i,r,a))},p=function(e){return e.duration=e.duration||4294967295,n(O.trak,m(e),g(e))},w=function(e){var t=new Uint8Array([0,0,0,0,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return"video"!==e.type&&(t[t.length-1]=0),n(O.trex,t)},function(){var e,t,i;i=function(e,t){var i=0,n=0,r=0,a=0;return e.length&&(void 0!==e[0].duration&&(i=1),void 0!==e[0].size&&(n=2),void 0!==e[0].flags&&(r=4),void 0!==e[0].compositionTimeOffset&&(a=8)),[0,0,i|n|r|a,1,(4278190080&e.length)>>>24,(16711680&e.length)>>>16,(65280&e.length)>>>8,255&e.length,(4278190080&t)>>>24,(16711680&t)>>>16,(65280&t)>>>8,255&t]},t=function(e,t){var r,a,s,o;for(a=e.samples||[],t+=20+16*a.length,r=i(a,t),o=0;o<a.length;o++)s=a[o],r=r.concat([(4278190080&s.duration)>>>24,(16711680&s.duration)>>>16,(65280&s.duration)>>>8,255&s.duration,(4278190080&s.size)>>>24,(16711680&s.size)>>>16,(65280&s.size)>>>8,255&s.size,s.flags.isLeading<<2|s.flags.dependsOn,s.flags.isDependedOn<<6|s.flags.hasRedundancy<<4|s.flags.paddingValue<<1|s.flags.isNonSyncSample,61440&s.flags.degradationPriority,15&s.flags.degradationPriority,(4278190080&s.compositionTimeOffset)>>>24,(16711680&s.compositionTimeOffset)>>>16,(65280&s.compositionTimeOffset)>>>8,255&s.compositionTimeOffset]);return n(O.trun,new Uint8Array(r))},e=function(e,t){var r,a,s,o;for(a=e.samples||[],t+=20+8*a.length,r=i(a,t),o=0;o<a.length;o++)s=a[o],r=r.concat([(4278190080&s.duration)>>>24,(16711680&s.duration)>>>16,(65280&s.duration)>>>8,255&s.duration,(4278190080&s.size)>>>24,(16711680&s.size)>>>16,(65280&s.size)>>>8,255&s.size]);return n(O.trun,new Uint8Array(r))},k=function(i,n){return"audio"===i.type?e(i,n):t(i,n)}}(),t.exports={ftyp:s,mdat:o,moof:l,moov:f,initSegment:function(e){var t,i=s(),n=f(e);return t=new Uint8Array(i.byteLength+n.byteLength),t.set(i),t.set(n,i.byteLength),t}}},{}],53:[function(e,t,i){"use strict";var n,r,a,s;n=function(e,t){var i,a,s,o,u,d=[];if(!t.length)return null;for(i=0;i<e.byteLength;)a=e[i]<<24,a|=e[i+1]<<16,a|=e[i+2]<<8,a|=e[i+3],s=r(e.subarray(i+4,i+8)),o=a>1?i+a:e.byteLength,s===t[0]&&(1===t.length?d.push(e.subarray(i+8,o)):(u=n(e.subarray(i+8,o),t.slice(1)),u.length&&(d=d.concat(u)))),i=o;return d},r=function(e){var t="";return t+=String.fromCharCode(e[0]),t+=String.fromCharCode(e[1]),t+=String.fromCharCode(e[2]),t+=String.fromCharCode(e[3])},a=function(e){var t={};return n(e,["moov","trak"]).reduce(function(e,t){var i,r,a,s,o;return(i=n(t,["tkhd"])[0])?(r=i[0],a=0===r?12:20,s=i[a]<<24|i[a+1]<<16|i[a+2]<<8|i[a+3],(o=n(t,["mdia","mdhd"])[0])?(r=o[0],a=0===r?12:20,e[s]=o[a]<<24|o[a+1]<<16|o[a+2]<<8|o[a+3],e):null):null},t)},s=function(e,t){var i,r,a;return i=n(t,["moof","traf"]),r=[].concat.apply([],i.map(function(t){return n(t,["tfhd"]).map(function(i){var r,a,s;return r=i[4]<<24|i[5]<<16|i[6]<<8|i[7],a=e[r]||9e4,s=n(t,["tfdt"]).map(function(e){var t,i;return t=e[0],i=e[4]<<24|e[5]<<16|e[6]<<8|e[7],1===t&&(i*=Math.pow(2,32),i+=e[8]<<24|e[9]<<16|e[10]<<8|e[11]),i})[0],s=s||1/0,s/a})})),a=Math.min.apply(null,r),isFinite(a)?a:0},t.exports={parseType:r,timescale:a,startTime:s}},{}],54:[function(e,t,i){"use strict";var n,r,a,s,o,u,d,l,f,c,h,p=e(58),m=e(52),g=e(46),y=e(36),v=e(37).H264Stream,_=e(34),b=e(38),T=e(56),S=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],w=["width","height","profileIdc","levelIdc","profileCompatibility"];o=function(){return{size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0}}},u=function(e){return e[0]==="I".charCodeAt(0)&&e[1]==="D".charCodeAt(0)&&e[2]==="3".charCodeAt(0)},c=function(e,t){var i;if(e.length!==t.length)return!1;for(i=0;i<e.length;i++)if(e[i]!==t[i])return!1;return!0},h=function(e){var t,i,n=0;for(t=0;t<e.length;t++)i=e[t],n+=i.data.byteLength;return n},r=function(e){var t=[],i=0,n=0,a=0,s=1/0;r.prototype.init.call(this),this.push=function(i){d(e,i),e&&S.forEach(function(t){e[t]=i[t]}),t.push(i)},this.setEarliestDts=function(t){n=t-e.timelineStartInfo.baseMediaDecodeTime},this.setVideoBaseMediaDecodeTime=function(e){s=e},this.setAudioAppendStart=function(e){a=e},this.flush=function(){var n,r,a,s;if(0===t.length)return void this.trigger("done","AudioSegmentStream");n=this.trimAdtsFramesByEarliestDts_(t),e.baseMediaDecodeTime=f(e),this.prefixWithSilence_(e,n),e.samples=this.generateSampleTable_(n),a=m.mdat(this.concatenateFrameData_(n)),t=[],r=m.moof(i,[e]),s=new Uint8Array(r.byteLength+a.byteLength),i++,s.set(r),s.set(a,r.byteLength),l(e),this.trigger("data",{track:e,boxes:s}),this.trigger("done","AudioSegmentStream")},this.prefixWithSilence_=function(e,t){var i,n,r,o=0,u=0,d=0,l=0;if(t.length&&(i=T.audioTsToVideoTs(e.baseMediaDecodeTime,e.samplerate),o=Math.ceil(9e4/(e.samplerate/1024)),a&&s&&(u=i-Math.max(a,s),d=Math.floor(u/o),l=d*o),!(d<1||l>45e3))){
for(n=b[e.samplerate],n||(n=t[0].data),r=0;r<d;r++)t.splice(r,0,{data:n});e.baseMediaDecodeTime-=Math.floor(T.videoTsToAudioTs(l,e.samplerate))}},this.trimAdtsFramesByEarliestDts_=function(t){return e.minSegmentDts>=n?t:(e.minSegmentDts=1/0,t.filter(function(t){return t.dts>=n&&(e.minSegmentDts=Math.min(e.minSegmentDts,t.dts),e.minSegmentPts=e.minSegmentDts,!0)}))},this.generateSampleTable_=function(e){var t,i,n=[];for(t=0;t<e.length;t++)i=e[t],n.push({size:i.data.byteLength,duration:1024});return n},this.concatenateFrameData_=function(e){var t,i,n=0,r=new Uint8Array(h(e));for(t=0;t<e.length;t++)i=e[t],r.set(i.data,n),n+=i.data.byteLength;return r}},r.prototype=new p,n=function(e){var t,i,r=0,a=[];n.prototype.init.call(this),delete e.minPTS,this.gopCache_=[],this.push=function(n){d(e,n),"seq_parameter_set_rbsp"!==n.nalUnitType||t||(t=n.config,e.sps=[n.data],w.forEach(function(i){e[i]=t[i]},this)),"pic_parameter_set_rbsp"!==n.nalUnitType||i||(i=n.data,e.pps=[n.data]),a.push(n)},this.flush=function(){for(var t,i,n,s,o,u;a.length&&"access_unit_delimiter_rbsp"!==a[0].nalUnitType;)a.shift();if(0===a.length)return this.resetStream_(),void this.trigger("done","VideoSegmentStream");t=this.groupNalsIntoFrames_(a),n=this.groupFramesIntoGops_(t),n[0][0].keyFrame||(i=this.getGopForFusion_(a[0],e),i?(n.unshift(i),n.byteLength+=i.byteLength,n.nalCount+=i.nalCount,n.pts=i.pts,n.dts=i.dts,n.duration+=i.duration):n=this.extendFirstKeyFrame_(n)),d(e,n),e.samples=this.generateSampleTable_(n),o=m.mdat(this.concatenateNalData_(n)),this.gopCache_.unshift({gop:n.pop(),pps:e.pps,sps:e.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),a=[],e.baseMediaDecodeTime=f(e),this.trigger("baseMediaDecodeTime",e.baseMediaDecodeTime),this.trigger("timelineStartInfo",e.timelineStartInfo),s=m.moof(r,[e]),u=new Uint8Array(s.byteLength+o.byteLength),r++,u.set(s),u.set(o,s.byteLength),this.trigger("data",{track:e,boxes:u}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.resetStream_=function(){l(e),t=void 0,i=void 0},this.getGopForFusion_=function(t){var i,n,r,a,s,o=1/0;for(s=0;s<this.gopCache_.length;s++)a=this.gopCache_[s],r=a.gop,e.pps&&c(e.pps[0],a.pps[0])&&e.sps&&c(e.sps[0],a.sps[0])&&(r.dts<e.timelineStartInfo.dts||(i=t.dts-r.dts-r.duration,i>=-1e4&&i<=45e3&&(!n||o>i)&&(n=a,o=i)));return n?n.gop:null},this.extendFirstKeyFrame_=function(e){var t;return!e[0][0].keyFrame&&e.length>1&&(t=e.shift(),e.byteLength-=t.byteLength,e.nalCount-=t.nalCount,e[0][0].dts=t.dts,e[0][0].pts=t.pts,e[0][0].duration+=t.duration),e},this.groupNalsIntoFrames_=function(e){var t,i,n=[],r=[];for(n.byteLength=0,t=0;t<e.length;t++)i=e[t],"access_unit_delimiter_rbsp"===i.nalUnitType?(n.length&&(n.duration=i.dts-n.dts,r.push(n)),n=[i],n.byteLength=i.data.byteLength,n.pts=i.pts,n.dts=i.dts):("slice_layer_without_partitioning_rbsp_idr"===i.nalUnitType&&(n.keyFrame=!0),n.duration=i.dts-n.dts,n.byteLength+=i.data.byteLength,n.push(i));return r.length&&(!n.duration||n.duration<=0)&&(n.duration=r[r.length-1].duration),r.push(n),r},this.groupFramesIntoGops_=function(e){var t,i,n=[],r=[];for(n.byteLength=0,n.nalCount=0,n.duration=0,n.pts=e[0].pts,n.dts=e[0].dts,r.byteLength=0,r.nalCount=0,r.duration=0,r.pts=e[0].pts,r.dts=e[0].dts,t=0;t<e.length;t++)i=e[t],i.keyFrame?(n.length&&(r.push(n),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration),n=[i],n.nalCount=i.length,n.byteLength=i.byteLength,n.pts=i.pts,n.dts=i.dts,n.duration=i.duration):(n.duration+=i.duration,n.nalCount+=i.length,n.byteLength+=i.byteLength,n.push(i));return r.length&&n.duration<=0&&(n.duration=r[r.length-1].duration),r.byteLength+=n.byteLength,r.nalCount+=n.nalCount,r.duration+=n.duration,r.push(n),r},this.generateSampleTable_=function(e,t){var i,n,r,a,s,u=t||0,d=[];for(i=0;i<e.length;i++)for(a=e[i],n=0;n<a.length;n++)s=a[n],r=o(),r.dataOffset=u,r.compositionTimeOffset=s.pts-s.dts,r.duration=s.duration,r.size=4*s.length,r.size+=s.byteLength,s.keyFrame&&(r.flags.dependsOn=2),u+=r.size,d.push(r);return d},this.concatenateNalData_=function(e){var t,i,n,r,a,s,o=0,u=e.byteLength,d=e.nalCount,l=u+4*d,f=new Uint8Array(l),c=new DataView(f.buffer);for(t=0;t<e.length;t++)for(r=e[t],i=0;i<r.length;i++)for(a=r[i],n=0;n<a.length;n++)s=a[n],c.setUint32(o,s.data.byteLength),o+=4,f.set(s.data,o),o+=s.data.byteLength;return f}},n.prototype=new p,d=function(e,t){"number"==typeof t.pts&&(void 0===e.timelineStartInfo.pts&&(e.timelineStartInfo.pts=t.pts),void 0===e.minSegmentPts?e.minSegmentPts=t.pts:e.minSegmentPts=Math.min(e.minSegmentPts,t.pts),void 0===e.maxSegmentPts?e.maxSegmentPts=t.pts:e.maxSegmentPts=Math.max(e.maxSegmentPts,t.pts)),"number"==typeof t.dts&&(void 0===e.timelineStartInfo.dts&&(e.timelineStartInfo.dts=t.dts),void 0===e.minSegmentDts?e.minSegmentDts=t.dts:e.minSegmentDts=Math.min(e.minSegmentDts,t.dts),void 0===e.maxSegmentDts?e.maxSegmentDts=t.dts:e.maxSegmentDts=Math.max(e.maxSegmentDts,t.dts))},l=function(e){delete e.minSegmentDts,delete e.maxSegmentDts,delete e.minSegmentPts,delete e.maxSegmentPts},f=function(e){var t,i,n=e.minSegmentDts-e.timelineStartInfo.dts;return t=e.timelineStartInfo.baseMediaDecodeTime,t+=n,t=Math.max(0,t),"audio"===e.type&&(i=e.samplerate/9e4,t*=i,t=Math.floor(t)),t},s=function(e,t){this.numberOfTracks=0,this.metadataStream=t,"undefined"!=typeof e.remux?this.remuxTracks=!!e.remux:this.remuxTracks=!0,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,s.prototype.init.call(this),this.push=function(e){return e.text?this.pendingCaptions.push(e):e.frames?this.pendingMetadata.push(e):(this.pendingTracks.push(e.track),this.pendingBoxes.push(e.boxes),this.pendingBytes+=e.boxes.byteLength,"video"===e.track.type&&(this.videoTrack=e.track),void("audio"===e.track.type&&(this.audioTrack=e.track)))}},s.prototype=new p,s.prototype.flush=function(e){var t,i,n,r,a=0,s={captions:[],metadata:[],info:{}},o=0;if(this.pendingTracks.length<this.numberOfTracks){if("VideoSegmentStream"!==e&&"AudioSegmentStream"!==e)return;if(this.remuxTracks)return;if(0===this.pendingTracks.length)return this.emittedTracks++,void(this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0))}for(this.videoTrack?(o=this.videoTrack.timelineStartInfo.pts,w.forEach(function(e){s.info[e]=this.videoTrack[e]},this)):this.audioTrack&&(o=this.audioTrack.timelineStartInfo.pts,S.forEach(function(e){s.info[e]=this.audioTrack[e]},this)),1===this.pendingTracks.length?s.type=this.pendingTracks[0].type:s.type="combined",this.emittedTracks+=this.pendingTracks.length,n=m.initSegment(this.pendingTracks),s.initSegment=new Uint8Array(n.byteLength),s.initSegment.set(n),s.data=new Uint8Array(this.pendingBytes),r=0;r<this.pendingBoxes.length;r++)s.data.set(this.pendingBoxes[r],a),a+=this.pendingBoxes[r].byteLength;for(r=0;r<this.pendingCaptions.length;r++)t=this.pendingCaptions[r],t.startTime=t.startPts-o,t.startTime/=9e4,t.endTime=t.endPts-o,t.endTime/=9e4,s.captions.push(t);for(r=0;r<this.pendingMetadata.length;r++)i=this.pendingMetadata[r],i.cueTime=i.pts-o,i.cueTime/=9e4,s.metadata.push(i);s.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",s),this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},a=function(e){var t,i,o=this,d=!0;a.prototype.init.call(this),e=e||{},this.baseMediaDecodeTime=e.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var t={};this.transmuxPipeline_=t,t.type="aac",t.metadataStream=new g.MetadataStream,t.aacStream=new _,t.audioTimestampRolloverStream=new g.TimestampRolloverStream("audio"),t.timedMetadataTimestampRolloverStream=new g.TimestampRolloverStream("timed-metadata"),t.adtsStream=new y,t.coalesceStream=new s(e,t.metadataStream),t.headOfPipeline=t.aacStream,t.aacStream.pipe(t.audioTimestampRolloverStream).pipe(t.adtsStream),t.aacStream.pipe(t.timedMetadataTimestampRolloverStream).pipe(t.metadataStream).pipe(t.coalesceStream),t.metadataStream.on("timestamp",function(e){t.aacStream.setTimestamp(e.timeStamp)}),t.aacStream.on("data",function(e){"timed-metadata"!==e.type||t.audioSegmentStream||(i=i||{timelineStartInfo:{baseMediaDecodeTime:o.baseMediaDecodeTime},codec:"adts",type:"audio"},t.coalesceStream.numberOfTracks++,t.audioSegmentStream=new r(i),t.adtsStream.pipe(t.audioSegmentStream).pipe(t.coalesceStream))}),t.coalesceStream.on("data",this.trigger.bind(this,"data")),t.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setupTsPipeline=function(){var a={};this.transmuxPipeline_=a,a.type="ts",a.metadataStream=new g.MetadataStream,a.packetStream=new g.TransportPacketStream,a.parseStream=new g.TransportParseStream,a.elementaryStream=new g.ElementaryStream,a.videoTimestampRolloverStream=new g.TimestampRolloverStream("video"),a.audioTimestampRolloverStream=new g.TimestampRolloverStream("audio"),a.timedMetadataTimestampRolloverStream=new g.TimestampRolloverStream("timed-metadata"),a.adtsStream=new y,a.h264Stream=new v,a.captionStream=new g.CaptionStream,a.coalesceStream=new s(e,a.metadataStream),a.headOfPipeline=a.packetStream,a.packetStream.pipe(a.parseStream).pipe(a.elementaryStream),a.elementaryStream.pipe(a.videoTimestampRolloverStream).pipe(a.h264Stream),a.elementaryStream.pipe(a.audioTimestampRolloverStream).pipe(a.adtsStream),a.elementaryStream.pipe(a.timedMetadataTimestampRolloverStream).pipe(a.metadataStream).pipe(a.coalesceStream),a.h264Stream.pipe(a.captionStream).pipe(a.coalesceStream),a.elementaryStream.on("data",function(e){var s;if("metadata"===e.type){for(s=e.tracks.length;s--;)t||"video"!==e.tracks[s].type?i||"audio"!==e.tracks[s].type||(i=e.tracks[s],i.timelineStartInfo.baseMediaDecodeTime=o.baseMediaDecodeTime):(t=e.tracks[s],t.timelineStartInfo.baseMediaDecodeTime=o.baseMediaDecodeTime);t&&!a.videoSegmentStream&&(a.coalesceStream.numberOfTracks++,a.videoSegmentStream=new n(t),a.videoSegmentStream.on("timelineStartInfo",function(e){i&&(i.timelineStartInfo=e,a.audioSegmentStream.setEarliestDts(e.dts))}),a.videoSegmentStream.on("baseMediaDecodeTime",function(e){i&&a.audioSegmentStream.setVideoBaseMediaDecodeTime(e)}),a.h264Stream.pipe(a.videoSegmentStream).pipe(a.coalesceStream)),i&&!a.audioSegmentStream&&(a.coalesceStream.numberOfTracks++,a.audioSegmentStream=new r(i),a.adtsStream.pipe(a.audioSegmentStream).pipe(a.coalesceStream))}}),a.coalesceStream.on("data",this.trigger.bind(this,"data")),a.coalesceStream.on("done",this.trigger.bind(this,"done"))},this.setBaseMediaDecodeTime=function(e){var n=this.transmuxPipeline_;this.baseMediaDecodeTime=e,i&&(i.timelineStartInfo.dts=void 0,i.timelineStartInfo.pts=void 0,l(i),i.timelineStartInfo.baseMediaDecodeTime=e),t&&(n.videoSegmentStream&&(n.videoSegmentStream.gopCache_=[]),t.timelineStartInfo.dts=void 0,t.timelineStartInfo.pts=void 0,l(t),t.timelineStartInfo.baseMediaDecodeTime=e)},this.setAudioAppendStart=function(e){i&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(e)},this.push=function(e){if(d){var t=u(e);t&&"aac"!==this.transmuxPipeline_.type?this.setupAacPipeline():t||"ts"===this.transmuxPipeline_.type||this.setupTsPipeline(),d=!1}this.transmuxPipeline_.headOfPipeline.push(e)},this.flush=function(){d=!0,this.transmuxPipeline_.headOfPipeline.flush()}},a.prototype=new p,t.exports={Transmuxer:a,VideoSegmentStream:n,AudioSegmentStream:r,AUDIO_PROPERTIES:S,VIDEO_PROPERTIES:w}},{}],55:[function(e,t,i){"use strict";var n=e(49),r=e(50).handleRollover,a={};a.ts=e(48),a.aac=e(35);var s=function(e){return e[0]==="I".charCodeAt(0)&&e[1]==="D".charCodeAt(0)&&e[2]==="3".charCodeAt(0)},o=function(e,t){for(var i,n=0,r=188;r<e.byteLength;)if(71!==e[n]||71!==e[r])n++,r++;else{switch(i=e.subarray(n,r),a.ts.parseType(i,t.pid)){case"pat":t.pid||(t.pid=a.ts.parsePat(i));break;case"pmt":t.table||(t.table=a.ts.parsePmt(i))}if(t.pid&&t.table)return;n+=188,r+=188}},u=function(e,t,i){for(var n,r,s,o,u=0,d=188,l=!1;d<e.byteLength;)if(71!==e[u]||71!==e[d])u++,d++;else{switch(n=e.subarray(u,d),a.ts.parseType(n,t.pid)){case"pes":r=a.ts.parsePesType(n,t.table),s=a.ts.parsePayloadUnitStartIndicator(n),"audio"===r&&s&&(o=a.ts.parsePesTime(n),o.type="audio",i.audio.push(o),l=!0)}if(l)break;u+=188,d+=188}for(d=e.byteLength,u=d-188,l=!1;u>=0;)if(71!==e[u]||71!==e[d])u--,d--;else{switch(n=e.subarray(u,d),a.ts.parseType(n,t.pid)){case"pes":r=a.ts.parsePesType(n,t.table),s=a.ts.parsePayloadUnitStartIndicator(n),"audio"===r&&s&&(o=a.ts.parsePesTime(n),o.type="audio",i.audio.push(o),l=!0)}if(l)break;u-=188,d-=188}},d=function(e,t,i){for(var n,r,s,o,u,d,l,f=0,c=188,h=!1,p={data:[],size:0};c<e.byteLength;)if(71!==e[f]||71!==e[c])f++,c++;else{switch(n=e.subarray(f,c),a.ts.parseType(n,t.pid)){case"pes":if(r=a.ts.parsePesType(n,t.table),s=a.ts.parsePayloadUnitStartIndicator(n),"video"===r&&(s&&!h&&(o=a.ts.parsePesTime(n),o.type="video",i.video.push(o),h=!0),!i.firstKeyFrame)){if(s&&0!==p.size){for(u=new Uint8Array(p.size),d=0;p.data.length;)l=p.data.shift(),u.set(l,d),d+=l.byteLength;a.ts.videoPacketContainsKeyFrame(u)&&(i.firstKeyFrame=a.ts.parsePesTime(u),i.firstKeyFrame.type="video"),p.size=0}p.data.push(n),p.size+=n.byteLength}}if(h&&i.firstKeyFrame)break;f+=188,c+=188}for(c=e.byteLength,f=c-188,h=!1;f>=0;)if(71!==e[f]||71!==e[c])f--,c--;else{switch(n=e.subarray(f,c),a.ts.parseType(n,t.pid)){case"pes":r=a.ts.parsePesType(n,t.table),s=a.ts.parsePayloadUnitStartIndicator(n),"video"===r&&s&&(o=a.ts.parsePesTime(n),o.type="video",i.video.push(o),h=!0)}if(h)break;f-=188,c-=188}},l=function(e,t){if(e.audio&&e.audio.length){var i=t;void 0===i&&(i=e.audio[0].dts),e.audio.forEach(function(e){e.dts=r(e.dts,i),e.pts=r(e.pts,i),e.dtsTime=e.dts/9e4,e.ptsTime=e.pts/9e4})}if(e.video&&e.video.length){var n=t;if(void 0===n&&(n=e.video[0].dts),e.video.forEach(function(e){e.dts=r(e.dts,n),e.pts=r(e.pts,n),e.dtsTime=e.dts/9e4,e.ptsTime=e.pts/9e4}),e.firstKeyFrame){var a=e.firstKeyFrame;a.dts=r(a.dts,n),a.pts=r(a.pts,n),a.dtsTime=a.dts/9e4,a.ptsTime=a.dts/9e4}}},f=function(e){for(var t,i=!1,n=0,r=null,s=null,o=0,u=0;e.length-u>=3;){switch(a.aac.parseType(e,u)){case"timed-metadata":if(e.length-u<10){i=!0;break}if(o=a.aac.parseId3TagSize(e,u),o>e.length){i=!0;break}null===s&&(t=e.subarray(u,u+o),s=a.aac.parseAacTimestamp(t)),u+=o;break;case"audio":if(e.length-u<7){i=!0;break}if(o=a.aac.parseAdtsSize(e,u),o>e.length){i=!0;break}null===r&&(t=e.subarray(u,u+o),r=a.aac.parseSampleRate(t)),n++,u+=o;break;default:u++}if(i)return null}if(null===r||null===s)return null;var d=9e4/r;return{audio:[{type:"audio",dts:s,pts:s},{type:"audio",dts:s+1024*n*d,pts:s+1024*n*d}]}},c=function(e){var t={pid:null,table:null},i={};o(e,t);for(var r in t.table)if(t.table.hasOwnProperty(r)){var a=t.table[r];switch(a){case n.H264_STREAM_TYPE:i.video=[],d(e,t,i),0===i.video.length&&delete i.video;break;case n.ADTS_STREAM_TYPE:i.audio=[],u(e,t,i),0===i.audio.length&&delete i.audio}}return i},h=function(e,t){var i,n=s(e);return i=n?f(e):c(e),i&&(i.audio||i.video)?(l(i,t),i):null};t.exports={inspect:h}},{}],56:[function(e,t,i){var n,r,a,s,o,u;n=function(e){return 9e4*e},r=function(e,t){return e*t},a=function(e){return e/9e4},s=function(e,t){return e/t},o=function(e,t){return n(s(e,t))},u=function(e,t){return r(a(e),t)},t.exports={secondsToVideoTs:n,secondsToAudioTs:r,videoTsToSeconds:a,audioTsToSeconds:s,audioTsToVideoTs:o,videoTsToAudioTs:u}},{}],57:[function(e,t,i){"use strict";var n;n=function(e){var t=e.byteLength,i=0,n=0;this.length=function(){return 8*t},this.bitsAvailable=function(){return 8*t+n},this.loadWord=function(){var r=e.byteLength-t,a=new Uint8Array(4),s=Math.min(4,t);if(0===s)throw new Error("no bytes available");a.set(e.subarray(r,r+s)),i=new DataView(a.buffer).getUint32(0),n=8*s,t-=s},this.skipBits=function(e){var r;n>e?(i<<=e,n-=e):(e-=n,r=Math.floor(e/8),e-=8*r,t-=r,this.loadWord(),i<<=e,n-=e)},this.readBits=function(e){var r=Math.min(n,e),a=i>>>32-r;return n-=r,n>0?i<<=r:t>0&&this.loadWord(),r=e-r,r>0?a<<r|this.readBits(r):a},this.skipLeadingZeros=function(){var e;for(e=0;e<n;++e)if(0!==(i&2147483648>>>e))return i<<=e,n-=e,e;return this.loadWord(),e+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var e=this.skipLeadingZeros();return this.readBits(e+1)-1},this.readExpGolomb=function(){var e=this.readUnsignedExpGolomb();return 1&e?1+e>>>1:-1*(e>>>1)},this.readBoolean=function(){return 1===this.readBits(1)},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()},t.exports=n},{}],58:[function(e,t,i){"use strict";var n=function(){this.init=function(){var e={};this.on=function(t,i){e[t]||(e[t]=[]),e[t]=e[t].concat(i)},this.off=function(t,i){var n;return!!e[t]&&(n=e[t].indexOf(i),e[t]=e[t].slice(),e[t].splice(n,1),n>-1)},this.trigger=function(t){var i,n,r,a;if(i=e[t])if(2===arguments.length)for(r=i.length,n=0;n<r;++n)i[n].call(this,arguments[1]);else{for(a=[],n=arguments.length,n=1;n<arguments.length;++n)a.push(arguments[n]);for(r=i.length,n=0;n<r;++n)i[n].apply(this,a)}},this.dispose=function(){e={}}}};n.prototype.pipe=function(e){return this.on("data",function(t){e.push(t)}),this.on("done",function(t){e.flush(t)}),e},n.prototype.push=function(e){this.trigger("data",e)},n.prototype.flush=function(e){this.trigger("done",e)},t.exports=n},{}],59:[function(e,t,i){!function(e){var n={buildAbsoluteURL:function(e,t){if(t=t.trim(),/^[a-z]+:/i.test(t))return t;var i=null,r=null,a=/^([^#]*)(.*)$/.exec(t);a&&(r=a[2],t=a[1]);var s=/^([^\?]*)(.*)$/.exec(t);s&&(i=s[2],t=s[1]);var o=/^([^#]*)(.*)$/.exec(e);o&&(e=o[1]);var u=/^([^\?]*)(.*)$/.exec(e);u&&(e=u[1]);var d=/^(([a-z]+:)?\/\/[^:\/]+(:[0-9]+)?)?(\/?.*)$/i.exec(e);if(!d)throw new Error("Error trying to parse base URL.");var l=d[2]||"",f=d[1]||"",c=d[4];0!==c.indexOf("/")&&""!==f&&(c="/"+c);var h=null;return h=/^\/\//.test(t)?l+"//"+n.buildAbsolutePath("",t.substring(2)):/^\//.test(t)?f+"/"+n.buildAbsolutePath("",t.substring(1)):n.buildAbsolutePath(f+c,t),i&&(h+=i),r&&(h+=r),h},buildAbsolutePath:function(e,t){for(var i,n,r=t,a="",s=e.replace(/[^\/]*$/,r.replace(/(\/|^)(?:\.?\/+)+/g,"$1")),o=0;n=s.indexOf("/../",o),n>-1;o=n+i)i=/^\/(?:\.\.\/)*/.exec(s.slice(n))[0].length,a=(a+s.substring(o,n)).replace(new RegExp("(?:\\/+[^\\/]*){0,"+(i-1)/3+"}$"),"/");return a+s.substr(o)}};"object"==typeof i&&"object"==typeof t?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i?i.URLToolkit=n:e.URLToolkit=n}(this)},{}],60:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var a=e(28),s=r(a),o="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,u=r(o),d=function(e){Object.defineProperties(e.frame,{id:{get:function(){return u["default"].log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),e.value.key}},value:{get:function(){return u["default"].log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),e.value.data}},privateData:{get:function(){return u["default"].log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),e.value.data}}})},l=function(e){return isNaN(e)||Math.abs(e)===1/0?Number.MAX_VALUE:e},f=function(e,t,i){var n=s["default"].WebKitDataCue||s["default"].VTTCue;t&&t.forEach(function(e){this.inbandTextTrack_.addCue(new n(e.startTime+this.timestampOffset,e.endTime+this.timestampOffset,e.text))},e),i&&function(){var t=l(e.mediaSource_.duration);i.forEach(function(e){var t=e.cueTime+this.timestampOffset;e.frames.forEach(function(e){var i=new n(t,t,e.value||e.url||e.data||"");i.frame=e,i.value=e,d(i),this.metadataTrack_.addCue(i)},this)},e),e.metadataTrack_&&e.metadataTrack_.cues&&e.metadataTrack_.cues.length&&function(){for(var i=e.metadataTrack_.cues,n=[],r=0;r<i.length;r++)i[r]&&n.push(i[r]);var a=n.reduce(function(e,t){var i=e[t.startTime]||[];return i.push(t),e[t.startTime]=i,e},{}),s=Object.keys(a).sort(function(e,t){return Number(e)-Number(t)});s.forEach(function(e,i){var n=a[e],r=Number(s[i+1])||t;n.forEach(function(e){e.endTime=r})})}()}()};i["default"]={addTextTrackData:f,durationOfVideo:l},t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],61:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t,i){for(var n=e.remoteTextTracks()||[],r=0;r<n.length;r++){var a=n[r];a.kind===t&&a.label===i&&e.removeRemoteTextTrack(a)}};i.removeExistingTrack=n;var r=function(e){n(e,"captions","cc1"),n(e,"metadata","Timed Metadata")};i.cleanupTextTracks=r},{}],62:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e){return/mp4a\.\d+.\d+/i.test(e)},r=function(e){return/avc1\.[\da-f]+/i.test(e)},a=function(e){var t={type:"",parameters:{}},i=e.trim().split(";");return t.type=i.shift().trim(),i.forEach(function(e){var i=e.trim().split("=");if(i.length>1){var n=i[0].replace(/"/g,"").trim(),r=i[1].replace(/"/g,"").trim();t.parameters[n]=r}}),t},s=function(e){return e.map(function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(e,t,i){return"avc1."+("00"+Number(t).toString(16)).slice(-2)+"00"+("00"+Number(i).toString(16)).slice(-2)})})};i["default"]={isAudioCodec:n,parseContentType:a,isVideoCodec:r,translateLegacyCodecs:s},t.exports=i["default"]},{}],63:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(61),r=function(e,t,i){var r=t.player_;i.captions&&i.captions.length&&!e.inbandTextTrack_&&((0,n.removeExistingTrack)(r,"captions","cc1"),e.inbandTextTrack_=r.addRemoteTextTrack({kind:"captions",label:"cc1"},!1).track),i.metadata&&i.metadata.length&&!e.metadataTrack_&&((0,n.removeExistingTrack)(r,"metadata","Timed Metadata",!0),e.metadataTrack_=r.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,e.metadataTrack_.inBandMetadataTrackDispatchType=i.metadata.dispatchType)};i["default"]=r,t.exports=i["default"]},{}],64:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={TIME_BETWEEN_CHUNKS:1,BYTES_PER_CHUNK:32768};i["default"]=n,t.exports=i["default"]},{}],65:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},d=e(27),l=r(d),f="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,c=r(f),h=e(66),p=r(h),m=e(64),g=r(m),y=e(62),v=e(61),_=function(e){function t(){var e=this;a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.sourceBuffers=[],this.readyState="closed",this.on(["sourceopen","webkitsourceopen"],function(t){e.swfObj=l["default"].getElementById(t.swfId),e.player_=(0,c["default"])(e.swfObj.parentNode),e.tech_=e.swfObj.tech,e.readyState="open",e.tech_.on("seeking",function(){for(var t=e.sourceBuffers.length;t--;)e.sourceBuffers[t].abort()}),e.tech_.hls&&e.tech_.hls.on("dispose",function(){(0,v.cleanupTextTracks)(e.player_)}),e.swfObj&&e.swfObj.vjs_load()})}return s(t,e),o(t,[{key:"addSeekableRange_",value:function(){}},{key:"addSourceBuffer",value:function(e){var t=(0,y.parseContentType)(e),i=void 0;if("video/mp2t"!==t.type)throw new Error("NotSupportedError (Video.js)");return i=new p["default"](this),this.sourceBuffers.push(i),i}},{key:"endOfStream",value:function(e){"network"===e?this.tech_.error(2):"decode"===e&&this.tech_.error(3),"ended"!==this.readyState&&(this.readyState="ended",this.swfObj.vjs_endOfStream())}}]),t}(c["default"].EventTarget);i["default"]=_;try{Object.defineProperty(_.prototype,"duration",{get:function(){return this.swfObj?this.swfObj.vjs_getProperty("duration"):NaN},set:function(e){var t=void 0,i=this.swfObj.vjs_getProperty("duration");if(this.swfObj.vjs_setProperty("duration",e),e<i)for(t=0;t<this.sourceBuffers.length;t++)this.sourceBuffers[t].remove(e,i);return e}})}catch(b){_.prototype.duration=NaN}for(var T in g["default"])_[T]=g["default"][T];t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],66:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},d=e(28),l=r(d),f="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,c=r(f),h=e(42),p=r(h),m=e(69),g=r(m),y=e(63),v=r(y),_=e(60),b=e(67),T=r(b),S=e(73),w=r(S),k=e(64),O=r(k),P=function(e){l["default"].setTimeout(e,O["default"].TIME_BETWEEN_CHUNKS)},A=function(){return Math.random().toString(36).slice(2,8)},E=function(e,t){("number"!=typeof t||t<0)&&(t=0);var i=Math.pow(10,t);return Math.round(e*i)/i},L=function(e){function t(e){var i=this;a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this);var n=void 0;this.chunkSize_=O["default"].BYTES_PER_CHUNK,this.buffer_=[],this.bufferSize_=0,this.basePtsOffset_=NaN,this.mediaSource_=e,this.audioBufferEnd_=NaN,this.videoBufferEnd_=NaN,this.updating=!1,this.timestampOffset_=0,n=l["default"].btoa(String.fromCharCode.apply(null,Array.prototype.slice.call(p["default"].getFlvHeader())));var r=this.mediaSource_.player_.id().replace(/[^a-zA-Z0-9]/g,"_");this.flashEncodedHeaderName_="vjs_flashEncodedHeader_"+r+A(),this.flashEncodedDataName_="vjs_flashEncodedData_"+r+A(),l["default"][this.flashEncodedHeaderName_]=function(){return delete l["default"][i.flashEncodedHeaderName_],n},this.mediaSource_.swfObj.vjs_appendChunkReady(this.flashEncodedHeaderName_),this.transmuxer_=(0,w["default"])(T["default"]),this.transmuxer_.postMessage({action:"init",options:{}}),this.transmuxer_.onmessage=function(e){"data"===e.data.action&&i.receiveBuffer_(e.data.segment)},this.one("updateend",function(){i.mediaSource_.tech_.trigger("loadedmetadata")}),Object.defineProperty(this,"timestampOffset",{get:function(){return this.timestampOffset_},set:function(e){"number"==typeof e&&e>=0&&(this.timestampOffset_=e,this.mediaSource_.swfObj.vjs_discontinuity(),this.basePtsOffset_=NaN,this.audioBufferEnd_=NaN,this.videoBufferEnd_=NaN,this.transmuxer_.postMessage({action:"reset"}))}}),Object.defineProperty(this,"buffered",{get:function(){if(!(this.mediaSource_&&this.mediaSource_.swfObj&&"vjs_getProperty"in this.mediaSource_.swfObj))return c["default"].createTimeRange();var e=this.mediaSource_.swfObj.vjs_getProperty("buffered");return e&&e.length&&(e[0][0]=E(e[0][0],3),e[0][1]=E(e[0][1],3)),c["default"].createTimeRanges(e)}}),this.mediaSource_.player_.on("seeked",function(){(0,g["default"])(0,1/0,i.metadataTrack_),(0,g["default"])(0,1/0,i.inbandTextTrack_)}),this.mediaSource_.player_.tech_.hls.on("dispose",function(){i.transmuxer_.terminate()})}return s(t,e),o(t,[{key:"appendBuffer",value:function(e){var t=void 0;if(this.updating)throw t=new Error("SourceBuffer.append() cannot be called while an update is in progress"),t.name="InvalidStateError",t.code=11,t;this.updating=!0,this.mediaSource_.readyState="open",this.trigger({type:"update"}),this.transmuxer_.postMessage({action:"push",data:e.buffer,byteOffset:e.byteOffset,byteLength:e.byteLength},[e.buffer]),this.transmuxer_.postMessage({action:"flush"})}},{key:"abort",value:function(){this.buffer_=[],this.bufferSize_=0,this.mediaSource_.swfObj.vjs_abort(),this.updating&&(this.updating=!1,this.trigger({type:"updateend"}))}},{key:"remove",value:function(e,t){(0,g["default"])(e,t,this.metadataTrack_),(0,g["default"])(e,t,this.inbandTextTrack_),this.trigger({type:"update"}),this.trigger({type:"updateend"})}},{key:"receiveBuffer_",value:function(e){var t=this;(0,v["default"])(this,this.mediaSource_,e),(0,_.addTextTrackData)(this,e.captions,e.metadata),P(function(){var i=t.convertTagsToData_(e);0===t.buffer_.length&&P(t.processBuffer_.bind(t)),i&&(t.buffer_.push(i),t.bufferSize_+=i.byteLength)})}},{key:"processBuffer_",value:function(){var e=this,t=O["default"].BYTES_PER_CHUNK;if(!this.buffer_.length)return void(this.updating!==!1&&(this.updating=!1,this.trigger({type:"updateend"})));var i=this.buffer_[0].subarray(0,t);i.byteLength<t||this.buffer_[0].byteLength===t?this.buffer_.shift():this.buffer_[0]=this.buffer_[0].subarray(t),this.bufferSize_-=i.byteLength;for(var n=[],r=i.byteLength,a=0;a<r;a++)n.push(String.fromCharCode(i[a]));var s=l["default"].btoa(n.join(""));l["default"][this.flashEncodedDataName_]=function(){return P(e.processBuffer_.bind(e)),delete l["default"][e.flashEncodedDataName_],s},this.mediaSource_.swfObj.vjs_appendChunkReady(this.flashEncodedDataName_)}},{key:"convertTagsToData_",value:function(e){var t=0,i=this.mediaSource_.tech_,n=0,r=void 0,a=e.tags.videoTags,s=e.tags.audioTags;if(isNaN(this.basePtsOffset_)&&(a.length||s.length)){var o=a[0]||{pts:1/0},u=s[0]||{pts:1/0};this.basePtsOffset_=Math.min(u.pts,o.pts)}i.seeking()&&(this.videoBufferEnd_=NaN,this.audioBufferEnd_=NaN),isNaN(this.videoBufferEnd_)?(i.buffered().length&&(n=i.buffered().end(0)-this.timestampOffset),i.seeking()&&(n=Math.max(n,i.currentTime()-this.timestampOffset)),n*=1e3,n+=this.basePtsOffset_):n=this.videoBufferEnd_+.1;var d=a.length;if(d&&a[d-1].pts>=n){for(;--d;){var l=a[d];if(!(l.pts>n)&&(l.keyFrame||l.metaDataTag))break}for(;d;){if(!a[d-1].metaDataTag)break;d--}}var f=a.slice(d),c=void 0;for(c=isNaN(this.audioBufferEnd_)?n:this.audioBufferEnd_+.1,f.length&&(c=Math.min(c,f[0].pts)),d=0;d<s.length&&!(s[d].pts>=c);)d++;var h=s.slice(d);h.length&&(this.audioBufferEnd_=h[h.length-1].pts),f.length&&(this.videoBufferEnd_=f[f.length-1].pts);var p=this.getOrderedTags_(f,h);if(0!==p.length){if(p[0].pts<n&&i.seeking()){var m=i.currentTime(),g=(n-p[0].pts)/1e3,y=m-g;y<1/30&&(y=0);try{this.mediaSource_.swfObj.vjs_adjustCurrentTime(y)}catch(v){}}for(var _=0;_<p.length;_++)t+=p[_].bytes.byteLength;r=new Uint8Array(t)
;for(var _=0,b=0;_<p.length;_++)r.set(p[_].bytes,b),b+=p[_].bytes.byteLength;return r}}},{key:"getOrderedTags_",value:function(e,t){for(var i=void 0,n=[];e.length||t.length;)i=e.length?t.length&&t[0].dts<e[0].dts?t.shift():e.shift():t.shift(),n.push(i);return n}}]),t}(c["default"].EventTarget);i["default"]=L,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],67:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=e(28),o=n(s),u=e(42),d=n(u),l=function(e){e.on("data",function(e){o["default"].postMessage({action:"data",segment:e})}),e.on("done",function(e){o["default"].postMessage({action:"done"})})},f=function(){function e(t){r(this,e),this.options=t||{},this.init()}return a(e,[{key:"init",value:function(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new d["default"].Transmuxer(this.options),l(this.transmuxer)}},{key:"push",value:function(e){var t=new Uint8Array(e.data,e.byteOffset,e.byteLength);this.transmuxer.push(t)}},{key:"reset",value:function(){this.init()}},{key:"flush",value:function(){this.transmuxer.flush()}}]),e}(),c=function(e){e.onmessage=function(e){if("init"===e.data.action&&e.data.options)return void(this.messageHandlers=new f(e.data.options));this.messageHandlers||(this.messageHandlers=new f),e.data&&e.data.action&&"init"!==e.data.action&&this.messageHandlers[e.data.action]&&this.messageHandlers[e.data.action](e.data)}};i["default"]=function(e){return new c(e)},t.exports=i["default"]},{}],68:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},d=e(28),l=r(d),f=e(27),c=r(f),h="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,p=r(h),m=e(72),g=r(m),y=e(60),v=e(62),_=e(61),b=function(e){function t(){var e=this;a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this);var i=void 0;this.nativeMediaSource_=new l["default"].MediaSource;for(i in this.nativeMediaSource_)i in t.prototype||"function"!=typeof this.nativeMediaSource_[i]||(this[i]=this.nativeMediaSource_[i].bind(this.nativeMediaSource_));this.duration_=NaN,Object.defineProperty(this,"duration",{get:function(){return this.duration_===1/0?this.duration_:this.nativeMediaSource_.duration},set:function(e){if(this.duration_=e,e!==1/0)return void(this.nativeMediaSource_.duration=e)}}),Object.defineProperty(this,"seekable",{get:function(){return this.duration_===1/0?p["default"].createTimeRanges([[0,this.nativeMediaSource_.duration]]):this.nativeMediaSource_.seekable}}),Object.defineProperty(this,"readyState",{get:function(){return this.nativeMediaSource_.readyState}}),Object.defineProperty(this,"activeSourceBuffers",{get:function(){return this.activeSourceBuffers_}}),this.sourceBuffers=[],this.activeSourceBuffers_=[],this.updateActiveSourceBuffers_=function(){e.activeSourceBuffers_.length=0;for(var t=!1,i=!0,n=0;n<e.player_.audioTracks().length;n++){var r=e.player_.audioTracks()[n];if(r.enabled&&"main"!==r.kind){t=!0,i=!1;break}}e.sourceBuffers.forEach(function(n){if(n.appendAudioInitSegment_=!0,n.videoCodec_&&n.audioCodec_)n.audioDisabled_=t;else if(n.videoCodec_&&!n.audioCodec_)n.audioDisabled_=!0,i=!1;else if(!n.videoCodec_&&n.audioCodec_&&(n.audioDisabled_=i,i))return;e.activeSourceBuffers_.push(n)})},this.onPlayerMediachange_=function(){e.sourceBuffers.forEach(function(e){e.appendAudioInitSegment_=!0})},["sourceopen","sourceclose","sourceended"].forEach(function(e){this.nativeMediaSource_.addEventListener(e,this.trigger.bind(this))},this),this.on("sourceopen",function(t){var i=c["default"].querySelector('[src="'+e.url_+'"]');i&&(e.player_=(0,p["default"])(i.parentNode),e.player_.audioTracks&&e.player_.audioTracks()&&(e.player_.audioTracks().on("change",e.updateActiveSourceBuffers_),e.player_.audioTracks().on("addtrack",e.updateActiveSourceBuffers_),e.player_.audioTracks().on("removetrack",e.updateActiveSourceBuffers_)),e.player_.on("mediachange",e.onPlayerMediachange_))}),this.on("sourceended",function(t){for(var i=(0,y.durationOfVideo)(e.duration),n=0;n<e.sourceBuffers.length;n++){var r=e.sourceBuffers[n],a=r.metadataTrack_&&r.metadataTrack_.cues;a&&a.length&&(a[a.length-1].endTime=i)}}),this.on("sourceclose",function(e){this.sourceBuffers.forEach(function(e){e.transmuxer_&&e.transmuxer_.terminate()}),this.sourceBuffers.length=0,this.player_&&((0,_.cleanupTextTracks)(this.player_),this.player_.audioTracks&&this.player_.audioTracks()&&(this.player_.audioTracks().off("change",this.updateActiveSourceBuffers_),this.player_.audioTracks().off("addtrack",this.updateActiveSourceBuffers_),this.player_.audioTracks().off("removetrack",this.updateActiveSourceBuffers_)),this.player_.el_&&this.player_.off("mediachange",this.onPlayerMediachange_))})}return s(t,e),o(t,[{key:"addSeekableRange_",value:function(e,t){var i=void 0;if(this.duration!==1/0)throw i=new Error("MediaSource.addSeekableRange() can only be invoked when the duration is Infinity"),i.name="InvalidStateError",i.code=11,i;(t>this.nativeMediaSource_.duration||isNaN(this.nativeMediaSource_.duration))&&(this.nativeMediaSource_.duration=t)}},{key:"addSourceBuffer",value:function(e){var t=void 0,i=(0,v.parseContentType)(e);if(/^(video|audio)\/mp2t$/i.test(i.type)){var n=[];i.parameters&&i.parameters.codecs&&(n=i.parameters.codecs.split(","),n=(0,v.translateLegacyCodecs)(n),n=n.filter(function(e){return(0,v.isAudioCodec)(e)||(0,v.isVideoCodec)(e)})),0===n.length&&(n=["avc1.4d400d","mp4a.40.2"]),t=new g["default"](this,n),0!==this.sourceBuffers.length&&(this.sourceBuffers[0].createRealSourceBuffers_(),t.createRealSourceBuffers_(),this.sourceBuffers[0].audioDisabled_=!0)}else t=this.nativeMediaSource_.addSourceBuffer(e);return this.sourceBuffers.push(t),t}}]),t}(p["default"].EventTarget);i["default"]=b,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],69:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t,i){var n=void 0,r=void 0;if(i&&i.cues)for(n=i.cues.length;n--;)r=i.cues[n],r.startTime<=t&&r.endTime>=e&&i.removeCue(r)};i["default"]=n,t.exports=i["default"]},{}],70:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=e(28),o=n(s),u=e(51),d=n(u),l=function(e){e.on("data",function(e){var t=e.initSegment;e.initSegment={data:t.buffer,byteOffset:t.byteOffset,byteLength:t.byteLength};var i=e.data;e.data=i.buffer,o["default"].postMessage({action:"data",segment:e,byteOffset:i.byteOffset,byteLength:i.byteLength},[e.data])}),e.captionStream&&e.captionStream.on("data",function(e){o["default"].postMessage({action:"caption",data:e})}),e.on("done",function(e){o["default"].postMessage({action:"done"})})},f=function(){function e(t){r(this,e),this.options=t||{},this.init()}return a(e,[{key:"init",value:function(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new d["default"].Transmuxer(this.options),l(this.transmuxer)}},{key:"push",value:function(e){var t=new Uint8Array(e.data,e.byteOffset,e.byteLength);this.transmuxer.push(t)}},{key:"reset",value:function(){this.init()}},{key:"setTimestampOffset",value:function(e){var t=e.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(9e4*t))}},{key:"setAudioAppendStart",value:function(e){this.transmuxer.setAudioAppendStart(Math.ceil(9e4*e.appendStart))}},{key:"flush",value:function(e){this.transmuxer.flush()}}]),e}(),c=function(e){e.onmessage=function(e){if("init"===e.data.action&&e.data.options)return void(this.messageHandlers=new f(e.data.options));this.messageHandlers||(this.messageHandlers=new f),e.data&&e.data.action&&"init"!==e.data.action&&this.messageHandlers[e.data.action]&&this.messageHandlers[e.data.action](e.data)}};i["default"]=function(e){return new c(e)},t.exports=i["default"]},{}],71:[function(e,t,i){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(i,"__esModule",{value:!0});var r=e(28),a=n(r),s=e(65),o=n(s),u=e(68),d=n(u),l="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,f=n(l),c=0,h={mode:"auto"};f["default"].mediaSources={};var p=function(e,t){var i=f["default"].mediaSources[e];if(!i)throw new Error("Media Source not found (Video.js)");i.trigger({type:"sourceopen",swfId:t})},m=function(){return!!a["default"].MediaSource&&!!a["default"].MediaSource.isTypeSupported&&a["default"].MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"')},g=function(e){var t=f["default"].mergeOptions(h,e);if(this.MediaSource={open:p,supportsNativeMediaSources:m},"html5"===t.mode||"auto"===t.mode&&m())return new d["default"];if(f["default"].getTech("Flash"))return new o["default"];throw new Error("Cannot use Flash or Html5 to create a MediaSource for this video")};i.MediaSource=g,g.open=p,g.supportsNativeMediaSources=m;var y={createObjectURL:function(e){var t=void 0;return e instanceof d["default"]?(t=a["default"].URL.createObjectURL(e.nativeMediaSource_),e.url_=t,t):e instanceof o["default"]?(t="blob:vjs-media-source/"+c,c++,f["default"].mediaSources[t]=e,t):(t=a["default"].URL.createObjectURL(e),e.url_=t,t)}};i.URL=y,f["default"].MediaSource=g,f["default"].URL=y}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],72:[function(e,t,i){(function(n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},d="undefined"!=typeof window?window.videojs:void 0!==n?n.videojs:null,l=r(d),f=e(63),c=r(f),h=e(69),p=r(h),m=e(60),g=e(73),y=r(g),v=e(70),_=r(v),b=e(62),T=function(e){function t(e,i){var n=this;a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,l["default"].EventTarget),this.timestampOffset_=0,this.pendingBuffers_=[],this.bufferUpdating_=!1,this.mediaSource_=e,this.codecs_=i,this.audioCodec_=null,this.videoCodec_=null,this.audioDisabled_=!1,this.appendAudioInitSegment_=!0;var r={remux:!1};this.codecs_.forEach(function(e){(0,b.isAudioCodec)(e)?n.audioCodec_=e:(0,b.isVideoCodec)(e)&&(n.videoCodec_=e)}),this.transmuxer_=(0,y["default"])(_["default"]),this.transmuxer_.postMessage({action:"init",options:r}),this.transmuxer_.onmessage=function(e){return"data"===e.data.action?n.data_(e):"done"===e.data.action?n.done_(e):void 0},Object.defineProperty(this,"timestampOffset",{get:function(){return this.timestampOffset_},set:function(e){"number"==typeof e&&e>=0&&(this.timestampOffset_=e,this.appendAudioInitSegment_=!0,this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e}))}}),Object.defineProperty(this,"appendWindowStart",{get:function(){return(this.videoBuffer_||this.audioBuffer_).appendWindowStart},set:function(e){this.videoBuffer_&&(this.videoBuffer_.appendWindowStart=e),this.audioBuffer_&&(this.audioBuffer_.appendWindowStart=e)}}),Object.defineProperty(this,"updating",{get:function(){return!!(this.bufferUpdating_||!this.audioDisabled_&&this.audioBuffer_&&this.audioBuffer_.updating||this.videoBuffer_&&this.videoBuffer_.updating)}}),Object.defineProperty(this,"buffered",{get:function(){var e=null,t=null,i=0,n=[],r=[];if(!this.videoBuffer_&&!this.audioBuffer_)return l["default"].createTimeRange();if(!this.videoBuffer_)return this.audioBuffer_.buffered;if(!this.audioBuffer_)return this.videoBuffer_.buffered;if(this.audioDisabled_)return this.videoBuffer_.buffered;if(0===this.videoBuffer_.buffered.length&&0===this.audioBuffer_.buffered.length)return l["default"].createTimeRange();for(var a=this.videoBuffer_.buffered,s=this.audioBuffer_.buffered,o=a.length;o--;)n.push({time:a.start(o),type:"start"}),n.push({time:a.end(o),type:"end"});for(o=s.length;o--;)n.push({time:s.start(o),type:"start"}),n.push({time:s.end(o),type:"end"});for(n.sort(function(e,t){return e.time-t.time}),o=0;o<n.length;o++)"start"===n[o].type?(i++,2===i&&(e=n[o].time)):"end"===n[o].type&&(i--,1===i&&(t=n[o].time)),null!==e&&null!==t&&(r.push([e,t]),e=null,t=null);return l["default"].createTimeRanges(r)}})}return s(t,e),o(t,[{key:"data_",value:function(e){var t=e.data.segment;t.data=new Uint8Array(t.data,e.data.byteOffset,e.data.byteLength),t.initSegment=new Uint8Array(t.initSegment.data,t.initSegment.byteOffset,t.initSegment.byteLength),(0,c["default"])(this,this.mediaSource_,t),this.pendingBuffers_.push(t)}},{key:"done_",value:function(e){this.processPendingSegments_()}},{key:"createRealSourceBuffers_",value:function(){var e=this,t=["audio","video"];t.forEach(function(i){if(e[i+"Codec_"]&&!e[i+"Buffer_"]){var n=null;e.mediaSource_[i+"Buffer_"]?n=e.mediaSource_[i+"Buffer_"]:(n=e.mediaSource_.nativeMediaSource_.addSourceBuffer(i+'/mp4;codecs="'+e[i+"Codec_"]+'"'),e.mediaSource_[i+"Buffer_"]=n),e[i+"Buffer_"]=n,["update","updatestart","updateend"].forEach(function(r){n.addEventListener(r,function(){if("audio"!==i||!e.audioDisabled_){return t.every(function(t){return!("audio"!==t||!e.audioDisabled_)||(i===t||!e[t+"Buffer_"]||!e[t+"Buffer_"].updating)})?e.trigger(r):void 0}})})}})}},{key:"appendBuffer",value:function(e){if(this.bufferUpdating_=!0,this.audioBuffer_&&this.audioBuffer_.buffered.length){var t=this.audioBuffer_.buffered;this.transmuxer_.postMessage({action:"setAudioAppendStart",appendStart:t.end(t.length-1)})}this.transmuxer_.postMessage({action:"push",data:e.buffer,byteOffset:e.byteOffset,byteLength:e.byteLength},[e.buffer]),this.transmuxer_.postMessage({action:"flush"})}},{key:"remove",value:function(e,t){this.videoBuffer_&&this.videoBuffer_.remove(e,t),this.audioBuffer_&&this.audioBuffer_.remove(e,t),(0,p["default"])(e,t,this.metadataTrack_),(0,p["default"])(e,t,this.inbandTextTrack_)}},{key:"processPendingSegments_",value:function(){var e={video:{segments:[],bytes:0},audio:{segments:[],bytes:0},captions:[],metadata:[]};e=this.pendingBuffers_.reduce(function(e,t){var i=t.type,n=t.data,r=t.initSegment;return e[i].segments.push(n),e[i].bytes+=n.byteLength,e[i].initSegment=r,t.captions&&(e.captions=e.captions.concat(t.captions)),t.info&&(e[i].info=t.info),t.metadata&&(e.metadata=e.metadata.concat(t.metadata)),e},e),this.videoBuffer_||this.audioBuffer_||(0===e.video.bytes&&(this.videoCodec_=null),0===e.audio.bytes&&(this.audioCodec_=null),this.createRealSourceBuffers_()),e.audio.info&&this.mediaSource_.trigger({type:"audioinfo",info:e.audio.info}),e.video.info&&this.mediaSource_.trigger({type:"videoinfo",info:e.video.info}),this.appendAudioInitSegment_&&(!this.audioDisabled_&&this.audioBuffer_&&(e.audio.segments.unshift(e.audio.initSegment),e.audio.bytes+=e.audio.initSegment.byteLength),this.appendAudioInitSegment_=!1),this.videoBuffer_&&(e.video.segments.unshift(e.video.initSegment),e.video.bytes+=e.video.initSegment.byteLength,this.concatAndAppendSegments_(e.video,this.videoBuffer_),(0,m.addTextTrackData)(this,e.captions,e.metadata)),!this.audioDisabled_&&this.audioBuffer_&&this.concatAndAppendSegments_(e.audio,this.audioBuffer_),this.pendingBuffers_.length=0,this.bufferUpdating_=!1}},{key:"concatAndAppendSegments_",value:function(e,t){var i=0,n=void 0;if(e.bytes){n=new Uint8Array(e.bytes),e.segments.forEach(function(e){n.set(e,i),i+=e.byteLength});try{t.appendBuffer(n)}catch(r){this.mediaSource_.player_&&this.mediaSource_.player_.error({code:-3,type:"APPEND_BUFFER_ERR",message:r.message,originalError:r})}}}},{key:"abort",value:function(){this.videoBuffer_&&this.videoBuffer_.abort(),this.audioBuffer_&&this.audioBuffer_.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"reset"}),this.pendingBuffers_.length=0,this.bufferUpdating_=!1}}]),t}(l["default"].EventTarget);i["default"]=T,t.exports=i["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],73:[function(e,t,i){var n=arguments[3],r=arguments[4],a=arguments[5],s=JSON.stringify;t.exports=function(e){for(var t,i=Object.keys(a),o=0,u=i.length;o<u;o++){var d=i[o];if(a[d].exports===e){t=d;break}}if(!t){t=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var l={},o=0,u=i.length;o<u;o++){var d=i[o];l[d]=d}r[t]=[Function(["require","module","exports"],"("+e+")(self)"),l]}var f=Math.floor(Math.pow(16,8)*Math.random()).toString(16),c={};c[t]=t,r[f]=[Function(["require"],"require("+s(t)+")(self)"),c];var h="("+n+")({"+Object.keys(r).map(function(e){return s(e)+":["+r[e][0]+","+s(r[e][1])+"]"}).join(",")+"},{},["+s(f)+"])",p=window.URL||window.webkitURL||window.mozURL||window.msURL;return new Worker(p.createObjectURL(new Blob([h],{type:"text/javascript"})))}},{}],74:[function(e,t,i){(function(i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(e,t,i){for(var n=!0;n;){var r=e,a=t,s=i;n=!1,null===r&&(r=Function.prototype);var o=Object.getOwnPropertyDescriptor(r,a);if(void 0!==o){if("value"in o)return o.value;var u=o.get;if(void 0===u)return;return u.call(s)}var d=Object.getPrototypeOf(r);if(null===d)return;e=d,t=a,i=s,n=!0,o=d=void 0}},u=e(27),d=n(u),l=e(7),f=n(l),c=e(8),h=n(c),p=e(17),m=n(p),g=e(21),y=e(2),v=n(y),_=e(71),b=e(29),T=n(b),S="undefined"!=typeof window?window.videojs:void 0!==i?i.videojs:null,w=n(S),k=e(5),O=e(3),P=n(O),A=e(11),E=n(A),L=e(28),x=n(L),I=e(6),C=n(I),U=e(10),D=n(U),M={PlaylistLoader:f["default"],Playlist:h["default"],Decrypter:g.Decrypter,AsyncStream:g.AsyncStream,decrypt:g.decrypt,utils:v["default"],xhr:(0,m["default"])()};Object.defineProperty(M,"GOAL_BUFFER_LENGTH",{get:function(){return w["default"].log.warn("using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure you know what you are doing"),P["default"].GOAL_BUFFER_LENGTH},set:function(e){if(w["default"].log.warn("using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure you know what you are doing"),"number"!=typeof e||e<=0)return void w["default"].log.warn("value passed to Hls.GOAL_BUFFER_LENGTH must be a number and greater than 0");P["default"].GOAL_BUFFER_LENGTH=e}});var B=function(e,t){var i=void 0;return e?(i=x["default"].getComputedStyle(e),i?i[t]:""):""},R=function(e,t){for(var i=t.media(),n=-1,r=0;r<e.length;r++)if(e[r].id===i.uri){n=r;break}e.selectedIndex_=n,e.trigger({selectedIndex:n,type:"change"})},j=function(e,t){t.representations().forEach(function(t){e.addQualityLevel(t)}),R(e,t.playlists)},N=function(e,t){var i=e.slice();e.sort(function(e,n){var r=t(e,n);return 0===r?i.indexOf(e)-i.indexOf(n):r})};M.STANDARD_PLAYLIST_SELECTOR=function(){var e=this.playlists.master.playlists.slice(),t=[],i=void 0,n=void 0,r=void 0,a=void 0,s=void 0,o=void 0,u=void 0,d=[],l=[],f=[];return N(e,M.comparePlaylistBandwidth),e=e.filter(h["default"].isEnabled),o=this.systemBandwidth,t=e.filter(function(e){return e.attributes&&e.attributes.BANDWIDTH&&1.2*e.attributes.BANDWIDTH<o}),i=t.filter(function(e){return e.attributes.BANDWIDTH===t[t.length-1].attributes.BANDWIDTH})[0],N(t,M.comparePlaylistResolution),a=parseInt(B(this.tech_.el(),"width"),10),s=parseInt(B(this.tech_.el(),"height"),10),u=t.filter(function(e){return e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&e.attributes.RESOLUTION.height}),f=u.filter(function(e){return e.attributes.RESOLUTION.width===a&&e.attributes.RESOLUTION.height===s}),r=f.filter(function(e){return e.attributes.BANDWIDTH===f[f.length-1].attributes.BANDWIDTH})[0],r||(d=u.filter(function(e){return e.attributes.RESOLUTION.width>a||e.attributes.RESOLUTION.height>s}),l=d.filter(function(e){return e.attributes.RESOLUTION.width===d[0].attributes.RESOLUTION.width&&e.attributes.RESOLUTION.height===d[0].attributes.RESOLUTION.height}),n=l.filter(function(e){return e.attributes.BANDWIDTH===l[l.length-1].attributes.BANDWIDTH})[0]),n||r||i||e[0]},M.canPlaySource=function(){return w["default"].log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")},M.supportsNativeHls=function(){var e=d["default"].createElement("video");return!!w["default"].getTech("Html5").isSupported()&&["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(e.canPlayType(t))})}(),M.isSupported=function(){return w["default"].log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")};var F=x["default"].navigator&&x["default"].navigator.userAgent||"";M.supportsAudioInfoChange_=function(){if(w["default"].browser.IS_FIREFOX){var e=/Firefox\/([\d.]+)/i.exec(F);return parseInt(e[1],10)>=49}return!0};var G=w["default"].getComponent("Component"),q=function(e){function t(e,i,n){var a=this;if(r(this,t),o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,i),i.options_&&i.options_.playerId){var s=(0,w["default"])(i.options_.playerId);s.hasOwnProperty("hls")||Object.defineProperty(s,"hls",{get:function(){return w["default"].log.warn("player.hls is deprecated. Use player.tech_.hls instead."),a}})}if(w["default"].options.hls.overrideNative&&(i.featuresNativeVideoTracks||i.featuresNativeAudioTracks))throw new Error("Overriding native HLS requires emulated tracks. See https://git.io/vMpjB");this.tech_=i,this.source_=e,this.stats={},this.ignoreNextSeekingEvent_=!1,this.options_=w["default"].mergeOptions(w["default"].options.hls||{},n.hls),this.setOptions_(),this.on(d["default"],["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],function(e){var t=d["default"].fullscreenElement||d["default"].webkitFullscreenElement||d["default"].mozFullScreenElement||d["default"].msFullscreenElement;t&&t.contains(a.tech_.el())&&a.masterPlaylistController_.fastQualityChange_()}),this.on(this.tech_,"seeking",function(){if(this.ignoreNextSeekingEvent_)return void(this.ignoreNextSeekingEvent_=!1);this.setCurrentTime(this.tech_.currentTime())}),this.on(this.tech_,"error",function(){this.masterPlaylistController_&&this.masterPlaylistController_.pauseLoading()}),this.audioTrackChange_=function(){a.masterPlaylistController_.setupAudio()},this.on(this.tech_,"play",this.play)}return a(t,e),s(t,[{key:"setOptions_",value:function(){var e=this;this.options_.withCredentials=this.options_.withCredentials||!1,"number"!=typeof this.options_.bandwidth&&(this.options_.bandwidth=4194304),["withCredentials","bandwidth"].forEach(function(t){"undefined"!=typeof e.source_[t]&&(e.options_[t]=e.source_[t])}),this.bandwidth=this.options_.bandwidth}},{key:"src",value:function(e){var t=this;e&&(this.setOptions_(),this.options_.url=this.source_.src,this.options_.tech=this.tech_,this.options_.externHls=M,this.masterPlaylistController_=new k.MasterPlaylistController(this.options_),this.playbackWatcher_=new C["default"](w["default"].mergeOptions(this.options_,{seekable:function(){return t.seekable()}})),this.masterPlaylistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):M.STANDARD_PLAYLIST_SELECTOR.bind(this),this.playlists=this.masterPlaylistController_.masterPlaylistLoader_,this.mediaSource=this.masterPlaylistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get:function(){return this.masterPlaylistController_.selectPlaylist},set:function(e){this.masterPlaylistController_.selectPlaylist=e.bind(this)}},throughput:{get:function(){return this.masterPlaylistController_.mainSegmentLoader_.throughput.rate},set:function(e){this.masterPlaylistController_.mainSegmentLoader_.throughput.rate=e,this.masterPlaylistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get:function(){return this.masterPlaylistController_.mainSegmentLoader_.bandwidth},set:function(e){this.masterPlaylistController_.mainSegmentLoader_.bandwidth=e,this.masterPlaylistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get:function(){var e=1/(this.bandwidth||1),t=void 0;return t=this.throughput>0?1/this.throughput:0,Math.floor(1/(e+t))},set:function(){w["default"].log.error('The "systemBandwidth" property is read-only')}}}),Object.defineProperties(this.stats,{bandwidth:{get:function(){return t.bandwidth||0},enumerable:!0},mediaRequests:{get:function(){return t.masterPlaylistController_.mediaRequests_()||0},enumerable:!0},mediaTransferDuration:{get:function(){return t.masterPlaylistController_.mediaTransferDuration_()||0},enumerable:!0},mediaBytesTransferred:{get:function(){return t.masterPlaylistController_.mediaBytesTransferred_()||0},enumerable:!0},mediaSecondsLoaded:{get:function(){return t.masterPlaylistController_.mediaSecondsLoaded_()||0},enumerable:!0}}),this.tech_.one("canplay",this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_)),this.masterPlaylistController_.on("sourceopen",function(){t.tech_.audioTracks().addEventListener("change",t.audioTrackChange_)}),this.masterPlaylistController_.on("selectedinitialmedia",function(){(0,E["default"])(t)}),this.masterPlaylistController_.on("audioupdate",function(){t.tech_.clearTracks("audio"),t.masterPlaylistController_.activeAudioGroup().forEach(function(e){t.tech_.audioTracks().addTrack(e)})}),this.on(this.masterPlaylistController_,"progress",function(){this.tech_.trigger("progress")}),this.on(this.masterPlaylistController_,"firstplay",function(){this.ignoreNextSeekingEvent_=!0}),this.tech_.ready(function(){return t.setupQualityLevels_()}),this.tech_.el()&&this.tech_.src(w["default"].URL.createObjectURL(this.masterPlaylistController_.mediaSource)))}},{key:"setupQualityLevels_",value:function(){var e=this,t=w["default"].players[this.tech_.options_.playerId];t&&t.qualityLevels&&(this.qualityLevels_=t.qualityLevels(),this.masterPlaylistController_.on("selectedinitialmedia",function(){j(e.qualityLevels_,e)}),this.playlists.on("mediachange",function(){R(e.qualityLevels_,e.playlists)}))}},{key:"activeAudioGroup_",value:function(){return this.masterPlaylistController_.activeAudioGroup()}},{key:"play",value:function(){this.masterPlaylistController_.play()}},{key:"setCurrentTime",value:function(e){this.masterPlaylistController_.setCurrentTime(e)}},{key:"duration",value:function(){return this.masterPlaylistController_.duration()}},{key:"seekable",value:function(){return this.masterPlaylistController_.seekable()}},{key:"dispose",value:function(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.masterPlaylistController_&&this.masterPlaylistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),this.tech_.audioTracks().removeEventListener("change",this.audioTrackChange_),o(Object.getPrototypeOf(t.prototype),"dispose",this).call(this)}}]),t}(G),H=function X(e){return{canHandleSource:function(t){return(!w["default"].options.hls||!w["default"].options.hls.mode||w["default"].options.hls.mode===e)&&X.canPlayType(t.type)},handleSource:function(t,i,n){"flash"===e&&i.setTimeout(function(){i.trigger("loadstart")},1);var r=w["default"].mergeOptions(n,{hls:{mode:e}});return i.hls=new q(t,i,r),i.hls.xhr=(0,m["default"])(),w["default"].Hls.xhr.beforeRequest&&(i.hls.xhr.beforeRequest=w["default"].Hls.xhr.beforeRequest),i.hls.src(t.src),i.hls},canPlayType:function(e){return X.canPlayType(e)?"maybe":""}}};M.comparePlaylistBandwidth=function(e,t){var i=void 0,n=void 0;return e.attributes&&e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH),i=i||x["default"].Number.MAX_VALUE,t.attributes&&t.attributes.BANDWIDTH&&(n=t.attributes.BANDWIDTH),n=n||x["default"].Number.MAX_VALUE,i-n},M.comparePlaylistResolution=function(e,t){var i=void 0,n=void 0;return e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width),i=i||x["default"].Number.MAX_VALUE,t.attributes&&t.attributes.RESOLUTION&&t.attributes.RESOLUTION.width&&(n=t.attributes.RESOLUTION.width),n=n||x["default"].Number.MAX_VALUE,i===n&&e.attributes.BANDWIDTH&&t.attributes.BANDWIDTH?e.attributes.BANDWIDTH-t.attributes.BANDWIDTH:i-n},H.canPlayType=function(e){if(w["default"].browser.IE_VERSION&&w["default"].browser.IE_VERSION<=10)return!1;var t=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i;return!(!w["default"].options.hls.overrideNative&&M.supportsNativeHls)&&t.test(e)},"undefined"!=typeof w["default"].MediaSource&&"undefined"!=typeof w["default"].URL||(w["default"].MediaSource=_.MediaSource,w["default"].URL=_.URL);var V=w["default"].getTech("Flash");_.MediaSource.supportsNativeMediaSources()&&w["default"].getTech("Html5").registerSourceHandler(H("html5"),0),x["default"].Uint8Array&&V&&V.registerSourceHandler(H("flash")),w["default"].HlsHandler=q,w["default"].HlsSourceHandler=H,w["default"].Hls=M,w["default"].use||w["default"].registerComponent("Hls",M),w["default"].m3u8=T["default"],w["default"].options.hls=w["default"].options.hls||{},
w["default"].registerPlugin?w["default"].registerPlugin("reloadSourceOnError",D["default"]):w["default"].plugin("reloadSourceOnError",D["default"]),t.exports={Hls:M,HlsHandler:q,HlsSourceHandler:H}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[74]);
!function e(t,n,a){function d(o,s){if(!n[o]){if(!t[o]){var r="function"==typeof require&&require;if(!s&&r)return r(o,!0);if(i)return i(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return d(n?n:e)},u,u.exports,e,t,n,a)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)d(a[o]);return d}({1:[function(e,t,n){(function(t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function d(e){if(!e.ads.cancelPlayTimeout){if(u["default"].browser.IS_IOS&&u["default"].browser.IS_IPHONE&&!e.el_.hasAttribute("playsinline")){var t=e.currentWidth?e.currentWidth():e.width(),n=e.currentHeight?e.currentHeight():e.height(),a=r["default"].createElement("div");a.style.width=t+"px",a.style.height=n+"px",a.style.background="black",e.el_.parentNode.insertBefore(a,e.el_),e.el_.style.display="none",e.one(["adstart","adtimeout","adserror","adscanceled","adskip","playing"],function(){e.el_.style.display="block",a.remove()}),e.on("fullscreenchange",function(){a&&!e.isFullscreen()&&(e.el_.style.display="block",a.remove())})}e.ads.cancelPlayTimeout=o["default"].setTimeout(function(){e.ads.cancelPlayTimeout=null,e.paused()||e.pause(),e.ads.cancelledPlay=!0},1)}}n.__esModule=!0,n["default"]=d;var i=e(9),o=a(i),s=e(8),r=a(s),l="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,u=a(l)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict";function a(e){e.ads.contentSrc=e.currentSrc();var t=function(){if("ad-playback"!==e.ads.state){var t=e.currentSrc();t!==e.ads.contentSrc&&(e.trigger({type:"contentupdate",oldValue:e.ads.contentSrc,newValue:t}),e.ads.contentSrc=t)}};e.on("loadstart",t),i["default"].setTimeout(t,1)}n.__esModule=!0,n["default"]=a;var d=e(9),i=function(e){return e&&e.__esModule?e:{"default":e}}(d)},{}],3:[function(e,t,n){(function(e){"use strict";function t(e,t){var n=e.textTracks(),a=function(n){"metadata"===n.kind&&(e.ads.cueTextTracks.setMetadataTrackMode(n),t(e,n))};if(n.length>0)for(var d=0;d<n.length;d++){var i=n[d];a(i)}else n.addEventListener("addtrack",function(e){a(e.track)})}function a(e){}function d(e,t){return t}function i(e,t){return t.id}function o(e,t,n,a){e.ads.includedCues={};for(var d=0;d<t.length;d++){var i=t[d],o=this.getSupportedAdCue(e,i);if(o===-1)return void r["default"].log.warn("Skipping as this is not a supported ad cue.",i);var s=this.getCueId(e,i),c=i.startTime;if(l(e,s))return void r["default"].log("Skipping ad already seen with ID "+s);n(e,o,s,c),u(e,s),a!==undefined&&a(e,o)}}n.__esModule=!0,n.processMetadataTracks=t,n.setMetadataTrackMode=a,n.getSupportedAdCue=d,n.getCueId=i,n.processAdTrack=o;var s="undefined"!=typeof window?window.videojs:void 0!==e?e.videojs:null,r=function(e){return e&&e.__esModule?e:{"default":e}}(s),l=function(e,t){return t!==undefined&&e.ads.includedCues[t]},u=function(e,t){t!==undefined&&""!==t&&(e.ads.includedCues[t]=!0)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(e,t,n){(function(t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function d(e,t,n){t===undefined&&(t=!1);var a={};n!==undefined&&(a=n),a["{player.id}"]=this.options_["data-player"],a["{mediainfo.id}"]=this.mediainfo?this.mediainfo.id:"",a["{mediainfo.name}"]=this.mediainfo?this.mediainfo.name:"",a["{mediainfo.description}"]=this.mediainfo?this.mediainfo.description:"",a["{mediainfo.tags}"]=this.mediainfo?this.mediainfo.tags:"",a["{mediainfo.reference_id}"]=this.mediainfo?this.mediainfo.reference_id:"",a["{mediainfo.duration}"]=this.mediainfo?this.mediainfo.duration:"",a["{mediainfo.ad_keys}"]=this.mediainfo?this.mediainfo.ad_keys:"",a["{player.duration}"]=this.duration(),a["{timestamp}"]=(new Date).getTime(),a["{document.referrer}"]=l["default"].referrer,a["{window.location.href}"]=s["default"].location.href,a["{random}"]=Math.floor(1e12*Math.random()),p(this.mediainfo,a,"custom_fields"),p(this.mediainfo,a,"customFields");for(var d in a)e=e.split(d).join(f(a[d],t));return e=e.replace(/{pageVariable\.([^}]+)}/g,function(e,n){for(var a=void 0,d=s["default"],o=n.split("."),r=0;r<o.length;r++)r===o.length-1?a=d[o[r]]:d=d[o[r]];var l=void 0===a?"undefined":i(a);return null===a?"null":a===undefined?(c["default"].log.warn('Page variable "'+n+'" not found'),""):"string"!==l&&"number"!==l&&"boolean"!==l?(c["default"].log.warn('Page variable "'+n+'" is not a supported type'),""):f(String(a),t)})}n.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n["default"]=d;var o=e(9),s=a(o),r=e(8),l=a(r),u="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,c=a(u),f=function(e,t){return t?encodeURIComponent(e):e},p=function(e,t,n){if(e&&e[n])for(var a=e[n],d=Object.keys(a),i=0;i<d.length;i++){var o="{mediainfo."+n+"."+d[i]+"}";t[o]=a[d[i]]}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(e,t,n){"use strict";function a(e){if("playing"===e.type&&"preroll?"===this.ads.state)i(this,"ad",e);else if("playing"!==e.type||"ad-playback"!==this.ads.state||this.ads.videoElementRecycled())if("playing"===e.type&&"ads-ready?"===this.ads.state)i(this,"ad",e);else{if("playing"===e.type&&"ad-playback"===this.ads.state&&this.ads.videoElementRecycled())return void d(this,e);if("ad-playback"===this.ads.state)(this.ads.videoElementRecycled()||this.ads.stitchedAds())&&i(this,"ad",e);else if("content-playback"===this.ads.state&&"ended"===e.type)i(this,"content",e);else if("content-resuming"===this.ads.state){if(this.ads.snapshot&&this.currentSrc()!==this.ads.snapshot.currentSrc){if("loadstart"===e.type)return;return i(this,"content",e)}if(this.ads.snapshot&&this.ads.snapshot.ended){if("pause"===e.type||"ended"===e.type)return;return i(this,"content",e)}"playing"!==e.type&&i(this,"content",e)}}else i(this,"ad",e)}n.__esModule=!0,n["default"]=a;var d=function(e,t){t.isImmediatePropagationStopped=function(){return!0},t.cancelBubble=!0,t.isPropagationStopped=function(){return!0}},i=function(e,t,n){d(e,n),e.trigger({type:t+n.type,state:e.ads.state,originalEvent:n})}},{}],6:[function(e,t,n){(function(t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function d(e){var t=void 0;t=l["default"].browser.IS_IOS&&e.ads.isLive(e)&&e.seekable().length>0?e.currentTime()-e.seekable().end(0):e.currentTime();var n=e.$(".vjs-tech"),a=e.remoteTextTracks?e.remoteTextTracks():[],d=e.textTracks?e.textTracks():[],i=[],o=[],s={ended:e.ended(),currentSrc:e.currentSrc(),src:e.src(),currentTime:t,type:e.currentType()};n&&(s.nativePoster=n.poster,s.style=n.getAttribute("style"));for(var r=0;r<a.length;r++){var u=a[r];i.push({track:u,mode:u.mode}),u.mode="disabled"}s.suppressedRemoteTracks=i;for(var c=0;c<d.length;c++){var f=d[c];o.push({track:f,mode:f.mode}),f.mode="disabled"}return s.suppressedTracks=o,s}function i(e,t){if(e.ads.disableNextSnapshotRestore===!0)return void(e.ads.disableNextSnapshotRestore=!1);var n=e.$(".vjs-tech"),a=20,d=t.suppressedRemoteTracks,i=t.suppressedTracks,o=void 0,r=function(){for(var e=0;e<d.length;e++)o=d[e],o.track.mode=o.mode;for(var t=0;t<i.length;t++)o=i[t],o.track.mode=o.mode},u=function(){var n=void 0;l["default"].browser.IS_IOS&&e.ads.isLive(e)?t.currentTime<0&&(n=e.seekable().length>0?e.seekable().end(0)+t.currentTime:e.currentTime(),e.currentTime(n)):t.ended?e.currentTime(e.duration()):e.currentTime(t.currentTime),t.ended||e.play()},c=function f(){if(e.off("contentcanplay",f),e.ads.tryToResumeTimeout_&&(e.clearTimeout(e.ads.tryToResumeTimeout_),e.ads.tryToResumeTimeout_=null),n=e.el().querySelector(".vjs-tech"),n.readyState>1)return u();if(n.seekable===undefined)return u();if(n.seekable.length>0)return u();if(a--)s["default"].setTimeout(f,50);else try{u()}catch(t){l["default"].log.warn("Failed to resume the content after an advertisement",e)}};t.nativePoster&&(n.poster=t.nativePoster),"style"in t&&n.setAttribute("style",t.style||""),e.ads.videoElementRecycled()?(e.one("contentloadedmetadata",r),e.src({src:t.currentSrc,type:t.type}),e.load(),e.one("contentcanplay",c),e.ads.tryToResumeTimeout_=e.setTimeout(c,2e3)):e.ended()&&t.ended||(r(),e.play())}n.__esModule=!0,n.getPlayerSnapshot=d,n.restorePlayerSnapshot=i;var o=e(9),s=a(o),r="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,l=a(r)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,n){},{}],8:[function(e,t,n){(function(n){var a=void 0!==n?n:"undefined"!=typeof window?window:{},d=e(7);if("undefined"!=typeof document)t.exports=document;else{var i=a["__GLOBAL_DOCUMENT_CACHE@4"];i||(i=a["__GLOBAL_DOCUMENT_CACHE@4"]=d),t.exports=i}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,n){(function(e){"undefined"!=typeof window?t.exports=window:void 0!==e?t.exports=e:"undefined"!=typeof self?t.exports=self:t.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,n){(function(t){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}var d=e(9),i=a(d),o="undefined"!=typeof window?window.videojs:void 0!==t?t.videojs:null,s=a(o),r=e(5),l=a(r),u=e(6),c=n(u),f=e(2),p=a(f),y=e(1),h=a(y),m=e(4),v=a(m),g=e(3),T=n(g),b=s["default"].getTech("Html5").Events,w=function(e){var t=e.$(".vjs-tech");t&&t.removeAttribute("poster")},k={timeout:5e3,prerollTimeout:100,postrollTimeout:100,debug:!1,stitchedAds:!1},_=function(e){var t=this,n=s["default"].mergeOptions(k,e),a=b.concat(["firstplay","loadedalldata","playing"]);t.on(a,l["default"]),t.on("ended",function(){t.hasClass("vjs-has-started")||t.addClass("vjs-has-started")}),t.on(["addurationchange","adcanplay"],function(){t.currentSrc()!==t.ads.snapshot.currentSrc&&t.play()}),t.on("nopreroll",function(){t.ads.nopreroll_=!0}),t.on("nopostroll",function(){t.ads.nopostroll_=!0}),t.on(["ads-ad-started","playing"],function(){t.removeClass("vjs-ad-loading")}),t.ads={state:"content-set",disableNextSnapshotRestore:!1,_contentHasEnded:!1,adType:null,VERSION:"4.2.5",reset:function(){t.ads.disableNextSnapshotRestore=!1,t.ads._contentHasEnded=!1,t.ads.snapshot=null,t.ads.adType=null},startLinearAdMode:function(){"preroll?"!==t.ads.state&&"content-playback"!==t.ads.state&&"postroll?"!==t.ads.state||t.trigger("adstart")},endLinearAdMode:function(){"ad-playback"===t.ads.state&&(t.trigger("adend"),t.removeClass("vjs-ad-loading"))},skipLinearAdMode:function(){"ad-playback"!==t.ads.state&&t.trigger("adskip")},stitchedAds:function(e){return e!==undefined&&(this._stitchedAds=!!e),this._stitchedAds},videoElementRecycled:function(){if(!this.snapshot)throw new Error("You cannot use videoElementRecycled while there is no snapshot.");var e=t.src()!==this.snapshot.src,n=t.currentSrc()!==this.snapshot.currentSrc;return e||n},isLive:function(e){return e.duration()===Infinity||"8"===s["default"].browser.IOS_VERSION&&0===e.duration()},shouldPlayContentBehindAd:function(e){return!s["default"].browser.IS_IOS&&!s["default"].browser.IS_ANDROID&&e.duration()===Infinity}},t.ads.stitchedAds(n.stitchedAds),t.ads.cueTextTracks=T,t.ads.adMacroReplacement=v["default"].bind(t),(0,p["default"])(t),t.on("contentupdate",t.ads.reset);var d={"content-set":{events:{adscanceled:function(){this.state="content-playback"},adsready:function(){this.state="ads-ready"},play:function(){this.state="ads-ready?",(0,h["default"])(t),w(t)},adserror:function(){this.state="content-playback"},adskip:function(){this.state="content-playback"}}},"ads-ready":{events:{play:function(){this.state="preroll?",(0,h["default"])(t)},adskip:function(){this.state="content-playback"},adserror:function(){this.state="content-playback"}}},"preroll?":{enter:function(){t.ads.nopreroll_?(t.trigger("readyforpreroll"),i["default"].setTimeout(function(){t.trigger("nopreroll")},1)):(t.addClass("vjs-ad-loading"),t.ads.adTimeoutTimeout=i["default"].setTimeout(function(){t.trigger("adtimeout")},n.prerollTimeout),t.trigger("readyforpreroll"))},leave:function(){i["default"].clearTimeout(t.ads.adTimeoutTimeout)},events:{play:function(){(0,h["default"])(t)},adstart:function(){this.state="ad-playback",t.ads.adType="preroll"},adskip:function(){this.state="content-playback"},adtimeout:function(){this.state="content-playback"},adserror:function(){this.state="content-playback"},nopreroll:function(){this.state="content-playback"}}},"ads-ready?":{enter:function(){t.addClass("vjs-ad-loading"),t.ads.adTimeoutTimeout=i["default"].setTimeout(function(){t.trigger("adtimeout")},n.timeout)},leave:function(){i["default"].clearTimeout(t.ads.adTimeoutTimeout),t.removeClass("vjs-ad-loading")},events:{play:function(){(0,h["default"])(t)},adscanceled:function(){this.state="content-playback"},adsready:function(){this.state="preroll?"},adskip:function(){this.state="content-playback"},adtimeout:function(){this.state="content-playback"},adserror:function(){this.state="content-playback"}}},"ad-playback":{enter:function(){t.ads.shouldPlayContentBehindAd(t)||(this.snapshot=c.getPlayerSnapshot(t)),t.ads.shouldPlayContentBehindAd(t)&&(this.preAdVolume_=t.volume(),t.volume(0)),t.addClass("vjs-ad-playing"),t.hasClass("vjs-live")&&t.removeClass("vjs-live"),w(t),t.ads.cancelPlayTimeout&&i["default"].setTimeout(function(){i["default"].clearTimeout(t.ads.cancelPlayTimeout),t.ads.cancelPlayTimeout=null},1)},leave:function(){t.removeClass("vjs-ad-playing"),t.ads.isLive(t)&&t.addClass("vjs-live"),t.ads.shouldPlayContentBehindAd(t)||c.restorePlayerSnapshot(t,this.snapshot),t.ads.shouldPlayContentBehindAd(t)&&t.volume(this.preAdVolume_)},events:{adend:function(){this.state="content-resuming",t.ads.adType=null},adserror:function(){this.state="content-resuming",t.trigger("adend")}}},"content-resuming":{enter:function(){this._contentHasEnded&&(i["default"].clearTimeout(t.ads._fireEndedTimeout),t.ads._fireEndedTimeout=i["default"].setTimeout(function(){t.trigger("ended")},1e3))},leave:function(){i["default"].clearTimeout(t.ads._fireEndedTimeout)},events:{contentupdate:function(){this.state="content-set"},contentresumed:function(){this.state="content-playback"},playing:function(){this.state="content-playback"},ended:function(){this.state="content-playback"}}},"postroll?":{enter:function(){this.snapshot=c.getPlayerSnapshot(t),t.ads.nopostroll_?i["default"].setTimeout(function(){t.ads.state="content-resuming",t.trigger("ended")},1):(t.addClass("vjs-ad-loading"),t.ads.adTimeoutTimeout=i["default"].setTimeout(function(){t.trigger("adtimeout")},n.postrollTimeout))},leave:function(){i["default"].clearTimeout(t.ads.adTimeoutTimeout),t.removeClass("vjs-ad-loading")},events:{adstart:function(){this.state="ad-playback",t.ads.adType="postroll"},adskip:function(){this.state="content-resuming",i["default"].setTimeout(function(){t.trigger("ended")},1)},adtimeout:function(){this.state="content-resuming",i["default"].setTimeout(function(){t.trigger("ended")},1)},adserror:function(){this.state="content-resuming",i["default"].setTimeout(function(){t.trigger("ended")},1)},contentupdate:function(){this.state="ads-ready?"}}},"content-playback":{enter:function(){t.ads.cancelPlayTimeout&&(i["default"].clearTimeout(t.ads.cancelPlayTimeout),t.ads.cancelPlayTimeout=null),t.trigger({type:"contentplayback",triggerevent:t.ads.triggerevent}),t.ads.cancelledPlay&&(t.ads.cancelledPlay=!1,t.paused()&&t.play())},events:{adsready:function(){t.trigger("readyforpreroll")},adstart:function(){this.state="ad-playback","preroll"!==t.ads.adType&&(t.ads.adType="midroll")},contentupdate:function(){t.ads.shouldPlayContentBehindAd(t)||(0,h["default"])(t),t.paused()?this.state="content-set":this.state="ads-ready?"},contentended:function(){if(this._contentHasEnded)return void(this.state="content-resuming");this._contentHasEnded=!0,this.state="postroll?"}}}},o=function(e){var a=t.ads.state,i=d[a].events;if(i){var o=i[e.type];o&&o.apply(t.ads)}if(a!==t.ads.state){var r=a,l=t.ads.state;t.ads.triggerevent=e.type,d[r].leave&&d[r].leave.apply(t.ads),d[l].enter&&d[l].enter.apply(t.ads),n.debug&&s["default"].log("ads",t.ads.triggerevent+" triggered: "+r+" -> "+l)}};t.on(b.concat(["adtimeout","contentupdate","contentplaying","contentended","contentresumed","adstart","adend","adskip","adsready","adserror","adscanceled","nopreroll"]),o),t.paused()||o({type:"play"})};(s["default"].registerPlugin||s["default"].plugin)("ads",_)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10]);
/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

(function(factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['video.js', 'videojs-contrib-ads'], function(videojs){ factory(window, document, videojs) });
  } else if (typeof exports === 'object' && typeof module === 'object') {
    var vjs = require('video.js');
    require('videojs-contrib-ads');
    factory(window, document, vjs);
  } else {
    factory(window, document, videojs);
  }
})(function(window, document, videojs) {
  "use strict";

  var extend = function(obj) {
    var arg;
    var index;
    var key;
    for (index = 1; index < arguments.length; index++) {
      arg = arguments[index];
      for (key in arg) {
        if (arg.hasOwnProperty(key)) {
          obj[key] = arg[key];
        }
      }
    }
    return obj;
  };

  var ima_defaults = {
    debug: false,
    timeout: 5000,
    prerollTimeout: 100,
    adLabel: 'Advertisement',
    showControlsForJSAds: true
  };

  var init = function(options, readyCallback) {
    this.ima = new ImaPlugin(this, options, readyCallback);
  };

  var ImaPlugin = function(player, options, readyCallback) {
    this.player = player;

    /**
     * Assigns the unique id and class names to the given element as well as the style class
     * @param element
     * @param controlName
     * @private
     */
    var assignControlAttributes_ = function(element, controlName) {
      element.id = this.controlPrefix + controlName;
      element.className = this.controlPrefix + controlName + ' ' + controlName;
    }.bind(this);

    /**
     * Returns a regular expression to test a string for the given className
     * @param className
     * @returns {RegExp}
     * @private
     */
    var getClassRegexp_ = function(className){
      // Matches on
      // (beginning of string OR NOT word char)
      // classname
      // (negative lookahead word char OR end of string)
      return new RegExp('(^|[^A-Za-z-])' + className + '((?![A-Za-z-])|$)', 'gi');
    };

    /**
     * Adds a class to the given element if it doesn't already have the class
     * @param element
     * @param classToAdd
     * @private
     */
    var addClass_ = function(element, classToAdd){
      if(getClassRegexp_(classToAdd).test(element.className)){
        return element;
      }

      return element.className = element.className.trim() + ' ' + classToAdd;
    };

    /**
     * Removes a class from the given element if it has the given class
     * @param element
     * @param classToRemove
     * @private
     */
    var removeClass_ = function(element, classToRemove){
      var classRegexp = getClassRegexp_(classToRemove);

      if(!classRegexp.test(element.className)){
        return element;
      }

      return element.className = element.className.trim().replace(classRegexp, '');
    };

    /**
     * Creates the ad container passed to the IMA SDK.
     * @private
     */
    var createAdContainer_ = function() {
      // The adContainerDiv is the DOM of the element that will house
      // the ads and ad controls.
      this.vjsControls = this.player.getChild('controlBar');
      this.adContainerDiv =
          this.vjsControls.el().parentNode.appendChild(
              document.createElement('div'));
      assignControlAttributes_(this.adContainerDiv, 'ima-ad-container');
      this.adContainerDiv.style.position = "absolute";
      this.adContainerDiv.style.zIndex = 1111;
      this.adContainerDiv.addEventListener(
          'mouseenter',
          showAdControls_,
          false);
      this.adContainerDiv.addEventListener(
          'mouseleave',
          hideAdControls_,
          false);
      createControls_();
      this.adDisplayContainer =
          new google.ima.AdDisplayContainer(this.adContainerDiv, this.contentPlayer);
    }.bind(this);

    /**
     * Creates the controls for the ad.
     * @private
     */
    var createControls_ = function() {
      this.controlsDiv = document.createElement('div');
      assignControlAttributes_(this.controlsDiv, 'ima-controls-div');
      this.controlsDiv.style.width = '100%';
      this.countdownDiv = document.createElement('div');
      assignControlAttributes_(this.countdownDiv, 'ima-countdown-div');
      this.countdownDiv.innerHTML = this.settings.adLabel;
      this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
      this.seekBarDiv = document.createElement('div');
      assignControlAttributes_(this.seekBarDiv, 'ima-seek-bar-div');
      this.seekBarDiv.style.width = '100%';
      this.progressDiv = document.createElement('div');
      assignControlAttributes_(this.progressDiv, 'ima-progress-div');
      this.playPauseDiv = document.createElement('div');
      assignControlAttributes_(this.playPauseDiv, 'ima-play-pause-div');
      addClass_(this.playPauseDiv, 'ima-playing');
      this.playPauseDiv.addEventListener(
          'click',
          onAdPlayPauseClick_,
          false);
      this.muteDiv = document.createElement('div');
      assignControlAttributes_(this.muteDiv, 'ima-mute-div');
      addClass_(this.muteDiv, 'ima-non-muted');
      this.muteDiv.addEventListener(
          'click',
          onAdMuteClick_,
          false);
      this.sliderDiv = document.createElement('div');
      assignControlAttributes_(this.sliderDiv, 'ima-slider-div');
      this.sliderDiv.addEventListener(
          'mousedown',
          onAdVolumeSliderMouseDown_,
          false);
      this.sliderLevelDiv = document.createElement('div');
      assignControlAttributes_(this.sliderLevelDiv, 'ima-slider-level-div');
      this.fullscreenDiv = document.createElement('div');
      assignControlAttributes_(this.fullscreenDiv, 'ima-fullscreen-div');
      addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
      this.fullscreenDiv.addEventListener(
          'click',
          onAdFullscreenClick_,
          false);
      this.adContainerDiv.appendChild(this.controlsDiv);
      this.controlsDiv.appendChild(this.countdownDiv);
      this.controlsDiv.appendChild(this.seekBarDiv);
      this.controlsDiv.appendChild(this.playPauseDiv);
      this.controlsDiv.appendChild(this.muteDiv);
      this.controlsDiv.appendChild(this.sliderDiv);
      this.controlsDiv.appendChild(this.fullscreenDiv);
      this.seekBarDiv.appendChild(this.progressDiv);
      this.sliderDiv.appendChild(this.sliderLevelDiv);
    }.bind(this);

    /**
     * Initializes the AdDisplayContainer. On mobile, this must be done as a
     * result of user action.
     */
    this.initializeAdDisplayContainer = function() {
      this.adDisplayContainerInitialized = true;
      this.adDisplayContainer.initialize();
    }.bind(this);

    /**
     * Creates the AdsRequest and request ads through the AdsLoader.
     */
    this.requestAds = function() {
      if (!this.adDisplayContainerInitialized) {
        this.adDisplayContainer.initialize();
      }
      var adsRequest = new google.ima.AdsRequest();
      if (this.settings.adTagUrl) {
        adsRequest.adTagUrl = this.settings.adTagUrl;
      } else {
        adsRequest.adsResponse = this.settings.adsResponse;
      }
      if (this.settings.forceNonLinearFullSlot) {
        adsRequest.forceNonLinearFullSlot = true;
      }

      adsRequest.linearAdSlotWidth = this.getPlayerWidth();
      adsRequest.linearAdSlotHeight = this.getPlayerHeight();
      adsRequest.nonLinearAdSlotWidth =
          this.settings.nonLinearWidth || this.getPlayerWidth();
      adsRequest.nonLinearAdSlotHeight =
          this.settings.nonLinearHeight || (this.getPlayerHeight() / 3);

      this.adsLoader.requestAds(adsRequest);
    }.bind(this);

    /**
     * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
     * sets up event listeners, and triggers the 'adsready' event for
     * videojs-ads-contrib.
     * @private
     */
    var onAdsManagerLoaded_ = function(adsManagerLoadedEvent) {
      this.adsManager = adsManagerLoadedEvent.getAdsManager(
          this.contentPlayheadTracker, this.adsRenderingSettings);

      this.adsManager.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          onAdError_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.AD_BREAK_READY,
          onAdBreakReady_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          this.onContentPauseRequested_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          this.onContentResumeRequested_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
          onAllAdsCompleted_);

      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.LOADED,
          onAdLoaded_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.STARTED,
          onAdStarted_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CLICK,
          onAdPlayPauseClick_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.COMPLETE,
          this.onAdComplete_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.SKIPPED,
          this.onAdComplete_);

      if (!this.autoPlayAdBreaks) {
        try {
          var initWidth = this.getPlayerWidth();
          var initHeight = this.getPlayerHeight();
          this.adsManagerDimensions.width = initWidth;
          this.adsManagerDimensions.height = initHeight;
          this.adsManager.init(
              initWidth,
              initHeight,
              google.ima.ViewMode.NORMAL);
          this.adsManager.setVolume(this.player.muted() ? 0 : this.player.volume());
        } catch (adError) {
          onAdError_(adError);
        }
      }

      this.player.trigger('adsready');
    }.bind(this);

    /**
     * DEPRECATED: Use startFromReadyCallback
     * Start ad playback, or content video playback in the absence of a
     * pre-roll.
     */
    this.start = function() {
      window.console.log(
          'WARNING: player.ima.start is deprecated. Use ' +
              'player.ima.startFromReadyCallback instead.');
    };

    /**
     * Start ad playback, or content video playback in the absence of a
     * pre-roll. **NOTE**: This method only needs to be called if you provide
     * your own readyCallback as the second parameter to player.ima(). If you
     * only provide options and do not provide your own readyCallback,
     * **DO NOT** call this method. If you do provide your own readyCallback,
     * you should call this method in the last line of that callback. For more
     * info, see this method's usage in our advanced and playlist examples.
     */
    this.startFromReadyCallback = function() {
      if (this.autoPlayAdBreaks) {
        try {
          this.adsManager.init(
              this.getPlayerWidth(),
              this.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
          this.adsManager.setVolume(this.player.muted() ? 0 : this.player.volume());
          this.adsManager.start();
        } catch (adError) {
          onAdError_(adError);
        }
      }
    }.bind(this);

    /**
     * Listener for errors fired by the AdsLoader.
     * @param {google.ima.AdErrorEvent} event The error event thrown by the
     *     AdsLoader. See
     *     https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError.Type
     * @private
     */
    var onAdsLoaderError_ = function(event) {
      window.console.log('AdsLoader error: ' + event.getError());
      this.adContainerDiv.style.display = 'none';
      if (this.adsManager) {
        this.adsManager.destroy();
      }
      this.player.trigger({type: 'adserror', data: { AdError: event.getError(), AdErrorEvent: event }});
    }.bind(this);

    /**
     * Listener for errors thrown by the AdsManager.
     * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
     *     the AdsManager.
     * @private
     */
    var onAdError_ = function(adErrorEvent) {
      var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
      window.console.log('Ad error: ' + errorMessage);
      this.vjsControls.show();
      this.adsManager.destroy();
      this.adContainerDiv.style.display = 'none';
      this.player.trigger({ type: 'adserror', data: { AdError: errorMessage, AdErrorEvent: adErrorEvent }});
    }.bind(this);

    /**
     * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
     * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdBreakReady_ = function(adEvent) {
      this.adBreakReadyListener(adEvent);
    }.bind(this);

    /**
     * Called by publishers in manual ad break playback mode to start an ad
     * break.
     */
    this.playAdBreak = function() {
      if (!this.autoPlayAdBreaks) {
        this.adsManager.start();
      }
    }.bind(this);

    /**
     * Pauses the content video and displays the ad container so ads can play.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentPauseRequested_ = function(adEvent) {
      this.adsActive = true;
      this.adPlaying = true;
      this.contentSource = this.player.currentSrc();
      this.player.off('ended', this.localContentEndedListener);
      if (adEvent.getAd().getAdPodInfo().getPodIndex() != -1) {
        // Skip this call for post-roll ads
        this.player.ads.startLinearAdMode();
      }
      this.adContainerDiv.style.display = 'block';

      var contentType = adEvent.getAd().getContentType();
      if ((contentType === 'application/javascript') && !this.settings.showControlsForJSAds) {
        this.controlsDiv.style.display = 'none';
      } else {
        this.controlsDiv.style.display = 'block';
      }

      this.vjsControls.hide();
      showPlayButton();
      this.player.pause();
    }.bind(this);

    /**
     * Resumes content video and hides the ad container.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentResumeRequested_ = function(adEvent) {
      this.adsActive = false;
      this.adPlaying = false;
      this.player.on('ended', this.localContentEndedListener);
      if (this.currentAd == null || // hide for post-roll only playlist
          this.currentAd.isLinear()) { // don't hide for non-linear ads
        this.adContainerDiv.style.display = 'none';
      }
      this.vjsControls.show();
      if (!this.currentAd) {
        // Something went wrong playing the ad
        this.player.ads.endLinearAdMode();
      } else if (!this.contentComplete &&
          // Don't exit linear mode after post-roll or content will auto-replay
          this.currentAd.getAdPodInfo().getPodIndex() != -1 ) {
        this.player.ads.endLinearAdMode();
      }
      // Hide controls in case of future non-linear ads. They'll be unhidden in
      // content_pause_requested.
      this.controlsDiv.style.display = 'none';
      this.countdownDiv.innerHTML = '';
    }.bind(this);

    /**
     * Records that ads have completed and calls contentAndAdsEndedListeners
     * if content is also complete.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAllAdsCompleted_ = function(adEvent) {
      this.allAdsCompleted = true;
      this.adContainerDiv.style.display = 'none';
      if (this.contentComplete == true) {
        if (this.contentPlayer.src != this.contentSource) {
          this.player.src(this.contentSource);
        }
        for (var index in this.contentAndAdsEndedListeners) {
          this.contentAndAdsEndedListeners[index]();
        }
      }
    }.bind(this);

    /**
     * Starts the content video when a non-linear ad is loaded.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
   var onAdLoaded_ = function(adEvent) {
      if (!adEvent.getAd().isLinear()) {
        this.player.play();
      }
    }.bind(this);

    /**
     * Starts the interval timer to check the current ad time when an ad starts
     * playing.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdStarted_ = function(adEvent) {
      this.currentAd = adEvent.getAd();
      if (this.currentAd.isLinear()) {
        this.adTrackingTimer = setInterval(
            onAdPlayheadTrackerInterval_, 250);
        // Don't bump container when controls are shown
        removeClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
      } else {
        // Bump container when controls are shown
       addClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
      }
      // For non-linear ads that show after a linear ad.
      this.adContainerDiv.style.display = 'block';
    }.bind(this);

    /**
     * Clears the interval timer for current ad time when an ad completes.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onAdComplete_ = function(adEvent) {
      if (this.currentAd.isLinear()) {
        clearInterval(this.adTrackingTimer);
      }
    }.bind(this);

    /**
     * Gets the current time and duration of the ad and calls the method to
     * update the ad UI.
     * @private
     */
    var onAdPlayheadTrackerInterval_ = function() {
      var remainingTime = this.adsManager.getRemainingTime();
      var duration =  this.currentAd.getDuration();
      var currentTime = duration - remainingTime;
      currentTime = currentTime > 0 ? currentTime : 0;
      var isPod = false;
      var totalAds = 0;
      var adPosition;
      if (this.currentAd.getAdPodInfo()) {
        isPod = true;
        adPosition = this.currentAd.getAdPodInfo().getAdPosition();
        totalAds = this.currentAd.getAdPodInfo().getTotalAds();
      }

      // Update countdown timer data
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);
      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }
      var podCount = ': ';
      if (isPod && (totalAds > 1)) {
        podCount = ' (' + adPosition + ' of ' + totalAds + '): ';
      }
      this.countdownDiv.innerHTML =
          this.settings.adLabel + podCount +
          remainingMinutes + ':' + remainingSeconds;

      // Update UI
      var playProgressRatio = currentTime / duration;
      var playProgressPercent = playProgressRatio * 100;
      this.progressDiv.style.width = playProgressPercent + '%';
    }.bind(this);

    this.getPlayerWidth = function() {
      var retVal = parseInt(getComputedStyle(this.player.el()).width, 10) ||
          this.player.width();
      return retVal;
    }.bind(this);

    this.getPlayerHeight = function() {
      var retVal = parseInt(getComputedStyle(this.player.el()).height, 10) ||
          this.player.height();
      return retVal;
    }.bind(this);

    /**
     * Hides the ad controls on mouseout.
     * @private
     */
    var hideAdControls_ = function() {
      this.controlsDiv.style.height = '14px';
      this.playPauseDiv.style.display = 'none';
      this.muteDiv.style.display = 'none';
      this.sliderDiv.style.display = 'none';
      this.fullscreenDiv.style.display = 'none';
    }.bind(this);

    /**
     * Shows ad controls on mouseover.
     * @private
     */
    var showAdControls_ = function() {
      this.controlsDiv.style.height = '37px';
      this.playPauseDiv.style.display = 'block';
      this.muteDiv.style.display = 'block';
      this.sliderDiv.style.display = 'block';
      this.fullscreenDiv.style.display = 'block';
    }.bind(this);

    /**
     * Show pause and hide play button
     */
    var showPauseButton = function() {
      addClass_(this.playPauseDiv, 'ima-paused');
      removeClass_(this.playPauseDiv, 'ima-playing');
    }.bind(this);

    /**
     * Show play and hide pause button
     */
    var showPlayButton = function() {
      addClass_(this.playPauseDiv, 'ima-playing');
      removeClass_(this.playPauseDiv, 'ima-paused');
    }.bind(this);

    /**
     * Listener for clicks on the play/pause button during ad playback.
     * @private
     */
    var onAdPlayPauseClick_ = function() {
      if (this.adPlaying) {
        showPauseButton();
        this.adsManager.pause();
        this.adPlaying = false;
      } else {
        showPlayButton();
        this.adsManager.resume();
        this.adPlaying = true;
      }
    }.bind(this);

    /**
     * Listener for clicks on the mute button during ad playback.
     * @private
     */
    var onAdMuteClick_ = function() {
      if (this.adMuted) {
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.adsManager.setVolume(1);
        // Bubble down to content player
        this.player.muted(false);
        this.adMuted = false;
        this.sliderLevelDiv.style.width = this.player.volume() * 100 + "%";
      } else {
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.adsManager.setVolume(0);
        // Bubble down to content player
        this.player.muted(true);
        this.adMuted = true;
        this.sliderLevelDiv.style.width = "0%";
      }
    }.bind(this);

    /* Listener for mouse down events during ad playback. Used for volume.
     * @private
     */
    var onAdVolumeSliderMouseDown_ = function() {
       document.addEventListener('mouseup', onMouseUp_, false);
       document.addEventListener('mousemove', onMouseMove_, false);
    };

    /* Mouse movement listener used for volume slider.
     * @private
     */
    var onMouseMove_ = function(event) {
      setVolumeSlider_(event);
    };

    /* Mouse release listener used for volume slider.
     * @private
     */
    var onMouseUp_ = function(event) {
      setVolumeSlider_(event);
      document.removeEventListener('mousemove', onMouseMove_);
      document.removeEventListener('mouseup', onMouseUp_);
    };

    /* Utility function to set volume and associated UI
     * @private
     */
    var setVolumeSlider_ = function(event) {
      var percent =
          (event.clientX - this.sliderDiv.getBoundingClientRect().left) /
              this.sliderDiv.offsetWidth;
      percent *= 100;
      //Bounds value 0-100 if mouse is outside slider region.
      percent = Math.min(Math.max(percent, 0), 100);
      this.sliderLevelDiv.style.width = percent + "%";
      this.player.volume(percent / 100); //0-1
      this.adsManager.setVolume(percent / 100);
      if (this.player.volume() == 0) {
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.player.muted(true);
        this.adMuted = true;
      }
      else
      {
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.player.muted(false);
        this.adMuted = false;
      }
    }.bind(this);

    /**
     * Listener for clicks on the fullscreen button during ad playback.
     * @private
     */
    var onAdFullscreenClick_ = function() {
      if (this.player.isFullscreen()) {
        this.player.exitFullscreen();
      } else {
        this.player.requestFullscreen();
      }
    }.bind(this);

    /**
     * Listens for the video.js player to change its fullscreen status. This
     * keeps the fullscreen-ness of the AdContainer in sync with the player.
     * @private
     */
    var onFullscreenChange_ = function() {
      if (this.player.isFullscreen()) {
        addClass_(this.fullscreenDiv, 'ima-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(
              window.screen.width,
              window.screen.height,
              google.ima.ViewMode.FULLSCREEN);
        }
      } else {
        addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(
              this.getPlayerWidth(),
              this.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
        }
      }
    }.bind(this);

    /**
     * Listens for the video.js player to change its volume. This keeps the ad
     * volume in sync with the content volume if the volume of the player is
     * changed while content is playing
     * @private
     */
    var onVolumeChange_ = function() {
      var newVolume = this.player.muted() ? 0 : this.player.volume();
      if (this.adsManager) {
        this.adsManager.setVolume(newVolume);
      }
      // Update UI
      if (newVolume == 0) {
        this.adMuted = true;
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.sliderLevelDiv.style.width = '0%';
      } else {
        this.adMuted = false;
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.sliderLevelDiv.style.width = newVolume * 100 + '%';
      }
    }.bind(this);

    /**
     * Seeks content to 00:00:00. This is used as an event handler for the
     * loadedmetadata event, since seeking is not possible until that event has
     * fired.
     * @private
     */
    var seekContentToZero_ = function() {
      this.player.off('loadedmetadata', seekContentToZero_);
      this.player.currentTime(0);
    }.bind(this);

    /**
     * Seeks content to 00:00:00 and starts playback. This is used as an event
     * handler for the loadedmetadata event, since seeking is not possible until
     * that event has fired.
     * @private
     */
    var playContentFromZero_ = function() {
      this.player.off('loadedmetadata', playContentFromZero_);
      this.player.currentTime(0);
      this.player.play();
    }.bind(this);

    /**
     * Destroys the AdsManager, sets it to null, and calls contentComplete to
     * reset correlators. Once this is done it requests ads again to keep the
     * inventory available.
     * @private
     */
    var resetIMA_ = function() {
      this.adsActive = false;
      this.adPlaying = false;
      this.player.on('ended', this.localContentEndedListener);
      if (this.currentAd && this.currentAd.isLinear()) {
        this.adContainerDiv.style.display = 'none';
      }
      this.vjsControls.show();
      this.player.ads.endLinearAdMode();
      if (this.adTrackingTimer) {
        // If this is called while an ad is playing, stop trying to get that
        // ad's current time.
        clearInterval(this.adTrackingTimer);
      }
      if (this.adsManager) {
        this.adsManager.destroy();
        this.adsManager = null;
      }
      if (this.adsLoader && !this.contentComplete) {
        this.adsLoader.contentComplete();
      }
      this.contentComplete = false;
      this.allAdsCompleted = false;
    }.bind(this);

    /**
     * Ads an EventListener to the AdsManager. For a list of available events,
     * see
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
     * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to listen.
     * @param {function} callback The method to call when the event is fired.
     */
    this.addEventListener = function(event, callback) {
      if (this.adsManager) {
        this.adsManager.addEventListener(event, callback);
      }
    }.bind(this);

    /**
     * Returns the instance of the AdsManager.
     * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
     */
    this.getAdsManager = function() {
      return this.adsManager;
    }.bind(this);

    /**
     * DEPRECATED: Use setContentWithAdTag.
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ad tag is
     * requested when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adTag The ad tag to be requested when the content loads.
     *     Leave blank to use the existing ad tag.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContent = function(contentSrc, adTag, playOnLoad) {
      window.console.log(
          'WARNING: player.ima.setContent is deprecated. Use ' +
              'player.ima.setContentWithAdTag instead.');
      this.setContentWithAdTag(contentSrc, adTag, playOnLoad);
    }.bind(this);

    /**
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ad tag is
     * requested when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adTag The ad tag to be requested when the content loads.
     *     Leave blank to use the existing ad tag.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContentWithAdTag = function(contentSrc, adTag, playOnLoad) {
      resetIMA_();
      this.settings.adTagUrl = adTag ? adTag : this.settings.adTagUrl;
      changeSource_(contentSrc, playOnLoad);
    }.bind(this);

    /**
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ads response is
     * used when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adsResponse The ads response to be requested when the
     *     content loads. Leave blank to use the existing ads response.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContentWithAdsResponse = function(contentSrc, adsResponse, playOnLoad) {
      resetIMA_();
      this.settings.adsResponse = adsResponse ? adsResponse : this.settings.adsResponse;
      changeSource_(contentSrc, playOnLoad);
    }.bind(this);

    /**
     * Changes the ad tag. You will need to call requestAds after this method
     * for the new ads to be requested.
     * @param {?string} adTag The ad tag to be requested the next time requestAds
     *     is called.
     */
    this.changeAdTag = function(adTag) {
      resetIMA_();
      this.settings.adTagUrl = adTag;
    }.bind(this);

    /**
     * Changes the player source.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     * @private
     */
    var changeSource_ = function(contentSrc, playOnLoad) {
      // Only try to pause the player when initialised with a source already
      if (!!this.player.currentSrc()) {
        this.player.currentTime(0);
        this.player.pause();
      }
      if (contentSrc) {
        this.player.src(contentSrc);
      }
      if (playOnLoad) {
        this.player.on('loadedmetadata', playContentFromZero_);
      } else {
        this.player.on('loadedmetadata', seekContentToZero_);
      }
    }.bind(this);

    /**
     * Adds a listener for the 'ended' event of the video player. This should be
     * used instead of setting an 'ended' listener directly to ensure that the
     * ima can do proper cleanup of the SDK before other event listeners
     * are called.
     * @param {function} listener The listener to be called when content completes.
     */
    this.addContentEndedListener = function(listener) {
      this.contentEndedListeners.push(listener);
    }.bind(this);

    /**
     * Adds a listener that will be called when content and all ads have
     * finished playing.
     * @param {function} listener The listener to be called when content and ads complete.
     */
    this.addContentAndAdsEndedListener = function(listener) {
      this.contentAndAdsEndedListeners.push(listener);
    }.bind(this);

    /**
     * Sets the listener to be called to trigger manual ad break playback.
     * @param {function} listener The listener to be called to trigger manual ad break playback.
     */
    this.setAdBreakReadyListener = function(listener) {
      this.adBreakReadyListener = listener;
    }.bind(this);

    /**
     * Pauses the ad.
     */
    this.pauseAd = function() {
      if (this.adsActive && this.adPlaying) {
        showPauseButton();
        this.adsManager.pause();
        this.adPlaying = false;
      }
    }.bind(this);

    /**
     * Resumes the ad.
     */
    this.resumeAd = function() {
      if (this.adsActive && !this.adPlaying) {
        showPlayButton();
        this.adsManager.resume();
        this.adPlaying = true;
      }
    }.bind(this);

    /**
     * Set up intervals to check for seeking and update current video time.
     * @private
     */
    var setUpPlayerIntervals_ = function() {
      this.updateTimeIntervalHandle =
          setInterval(updateCurrentTime_, this.seekCheckInterval);
      this.seekCheckIntervalHandle =
          setInterval(checkForSeeking_, this.seekCheckInterval);
      this.resizeCheckIntervalHandle =
          setInterval(checkForResize_, this.resizeCheckInterval);
    }.bind(this);

    /**
     * Updates the current time of the video
     * @private
     */
    var updateCurrentTime_ = function() {
      if (!this.contentPlayheadTracker.seeking) {
        this.contentPlayheadTracker.currentTime = this.player.currentTime();
      }
    }.bind(this);

    /**
     * Detects when the user is seeking through a video.
     * This is used to prevent mid-rolls from playing while a user is seeking.
     *
     * There *is* a seeking property of the HTML5 video element, but it's not
     * properly implemented on all platforms (e.g. mobile safari), so we have to
     * check ourselves to be sure.
     *
     * @private
     */
    var checkForSeeking_ = function() {
      var tempCurrentTime = this.player.currentTime();
      var diff = (tempCurrentTime - this.contentPlayheadTracker.previousTime) * 1000;
      if (Math.abs(diff) > this.seekCheckInterval + this.seekThreshold) {
        this.contentPlayheadTracker.seeking = true;
      } else {
        this.contentPlayheadTracker.seeking = false;
      }
      this.contentPlayheadTracker.previousTime = this.player.currentTime();
    }.bind(this);

    /**
     * Detects when the player is resized (for fluid support) and resizes the
     * ads manager to match.
     *
     * @private
     */
    var checkForResize_ = function() {
      var currentWidth = this.getPlayerWidth();
      var currentHeight = this.getPlayerHeight();

      if (this.adsManager && (currentWidth != this.adsManagerDimensions.width ||
          currentHeight != this.adsManagerDimensions.height)) {
        this.adsManagerDimensions.width = currentWidth;
        this.adsManagerDimensions.height = currentHeight;
        this.adsManager.resize(currentWidth, currentHeight, google.ima.ViewMode.NORMAL);
      }
    }.bind(this);

    /**
     * Changes the flag to show or hide the ad countdown timer.
     *
     * @param {boolean} showCountdownIn Show or hide the countdown timer.
     */
    this.setShowCountdown = function(showCountdownIn) {
      this.showCountdown = showCountdownIn;
      this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
    }.bind(this);

    /**
     * Current plugin version.
     */
    this.VERSION = '0.2.0';

    /**
     * Stores user-provided settings.
     */
    this.settings;

    /**
     * Used to prefix videojs ima
     */
    this.controlPrefix;

    /**
     * Video element playing content.
     */
    this.contentPlayer;

    /**
     * Boolean flag to show or hide the ad countdown timer.
     */
    this.showCountdown;

    /**
     * Boolena flag to enable manual ad break playback.
     */
    this.autoPlayAdBreaks;

    /**
     * Video.js control bar.
     */
    this.vjsControls;

    /**
     * Div used as an ad container.
     */
    this.adContainerDiv;

    /**
     * Div used to display ad controls.
     */
    this.controlsDiv;

    /**
     * Div used to display ad countdown timer.
     */
    this.countdownDiv;

    /**
     * Div used to display add seek bar.
     */
    this.seekBarDiv;

    /**
     * Div used to display ad progress (in seek bar).
     */
    this.progressDiv;

    /**
     * Div used to display ad play/pause button.
     */
    this.playPauseDiv;

    /**
     * Div used to display ad mute button.
     */
    this.muteDiv;

    /**
     * Div used by the volume slider.
     */
    this.sliderDiv;

    /**
     * Volume slider level visuals
     */
    this.sliderLevelDiv;

    /**
     * Div used to display ad fullscreen button.
     */
    this.fullscreenDiv;

    /**
     * IMA SDK AdDisplayContainer.
     */
    this.adDisplayContainer;

    /**
     * True if the AdDisplayContainer has been initialized. False otherwise.
     */
    this.adDisplayContainerInitialized = false;

    /**
     * IMA SDK AdsLoader
     */
    this.adsLoader;

    /**
     * IMA SDK AdsManager
     */
    this.adsManager;

    /**
     * IMA SDK AdsRenderingSettings.
     */
    this.adsRenderingSettings = null;

    /**
     * Ad tag URL. Should return VAST, VMAP, or ad rules.
     */
    this.adTagUrl;

    /**
     * VAST, VMAP, or ad rules response. Used in lieu of fetching a response
     * from an ad tag URL.
     */
    this.adsResponse;

    /**
     * Current IMA SDK Ad.
     */
    this.currentAd;

    /**
     * Timer used to track content progress.
     */
    this.contentTrackingTimer;

    /**
     * Timer used to track ad progress.
     */
    this.adTrackingTimer;

    /**
     * True if ads are currently displayed, false otherwise.
     * True regardless of ad pause state if an ad is currently being displayed.
     */
    this.adsActive = false;

    /**
     * True if ad is currently playing, false if ad is paused or ads are not
     * currently displayed.
     */
    this.adPlaying = false;

    /**
     * True if the ad is muted, false otherwise.
     */
    this.adMuted = false;

    /**
     * True if our content video has completed, false otherwise.
     */
    this.contentComplete = false;

    /**
     * True if ALL_ADS_COMPLETED has fired, false until then.
     */
     this.allAdsCompleted = false;

    /**
     * Handle to interval that repeatedly updates current time.
     */
    this.updateTimeIntervalHandle;

    /**
     * Handle to interval that repeatedly checks for seeking.
     */
    this.seekCheckIntervalHandle;

    /**
     * Interval (ms) on which to check if the user is seeking through the
     * content.
     */
    this.seekCheckInterval = 1000;

    /**
     * Handle to interval that repeatedly checks for player resize.
     */
    this.resizeCheckIntervalHandle;

    /**
     * Interval (ms) to check for player resize for fluid support.
     */
    this.resizeCheckInterval = 250;

    /**
     * Threshold by which to judge user seeking. We check every 1000 ms to see
     * if the user is seeking. In order for us to decide that they are *not*
     * seeking, the content video playhead must only change by 900-1100 ms
     * between checks. Any greater change and we assume the user is seeking
     * through the video.
     */
    this.seekThreshold = 100;

    /**
     * Stores data for the content playhead tracker.
     */
    this.contentPlayheadTracker = {
      currentTime: 0,
      previousTime: 0,
      seeking: false,
      duration: 0
    };

    /**
     * Stores data for the ad playhead tracker.
     */
    this.adPlayheadTracker = {
      currentTime: 0,
      duration: 0,
      isPod: false,
      adPosition: 0,
      totalAds: 0
    };

    /**
     * Stores the dimensions for the ads manager.
     */
    this.adsManagerDimensions = {
      width: 0,
      height: 0
    };

    /**
     * Content ended listeners passed by the publisher to the plugin. Publishers
     * should allow the plugin to handle content ended to ensure proper support
     * of custom ad playback.
     */
    this.contentEndedListeners = [];

    /**
     * Content and ads ended listeners passed by the publisher to the plugin.
     * These will be called when the plugin detects that content *and all
     * ads* have completed. This differs from the contentEndedListeners in that
     * contentEndedListeners will fire between content ending and a post-roll
     * playing, whereas the contentAndAdsEndedListeners will fire after the
     * post-roll completes.
     */
    this.contentAndAdsEndedListeners = [];

     /**
      * Listener to be called to trigger manual ad break playback.
      */
    this.adBreakReadyListener = undefined;

    /**
     * Stores the content source so we can re-populate it manually after a
     * post-roll on iOS.
     */
    this.contentSource = '';

    /**
     * Local content ended listener for contentComplete.
     */
    this.localContentEndedListener = function() {
      if (this.adsLoader && !this.contentComplete) {
        this.adsLoader.contentComplete();
        this.contentComplete = true;
      }
      for (var index in this.contentEndedListeners) {
        this.contentEndedListeners[index]();
      }
      if (this.allAdsCompleted) {
        for (var index in this.contentAndAdsEndedListeners) {
          this.contentAndAdsEndedListeners[index]();
        }
      }
      clearInterval(this.updateTimeIntervalHandle);
      clearInterval(this.seekCheckIntervalHandle);
      clearInterval(this.resizeCheckIntervalHandle);
      if(this.player.el()) {
        this.player.one('play', setUpPlayerIntervals_);
      }
    }.bind(this);

    this.playerDisposedListener = function(){
      this.contentEndedListeners, this.contentAndAdsEndedListeners = [], [];
      this.contentComplete = true;
      this.player.off('ended', this.localContentEndedListener);

      // Bug fix: https://github.com/googleads/videojs-ima/issues/306
      if (this.player.ads.adTimeoutTimeout) {
        clearTimeout(this.player.ads.adTimeoutTimeout);
      }

      var intervalsToClear = [this.updateTimeIntervalHandle, this.seekCheckIntervalHandle,
        this.adTrackingTimer, this.resizeCheckIntervalHandle];
      for (var index in intervalsToClear) {
        var interval = intervalsToClear[index];
        if (interval) {
          clearInterval(interval);
        }
      }
      if (this.adsManager) {
        this.adsManager.destroy();
        this.adsManager = null;
      }
    }.bind(this);

    this.settings = extend({}, ima_defaults, options || {});

    // Currently this isn't used but I can see it being needed in the future, so
    // to avoid implementation problems with later updates I'm requiring it.
    if (!this.settings['id']) {
      window.console.log('Error: must provide id of video.js div');
      return;
    }

    this.controlPrefix = (this.settings.id + '_') || '';

    this.contentPlayer = document.getElementById(this.settings['id'] + '_html5_api');
    // Default showing countdown timer to true.
    this.showCountdown = true;
    if (this.settings['showCountdown'] == false) {
      this.showCountdown = false;
    }

    this.autoPlayAdBreaks = true;
    if (this.settings['autoPlayAdBreaks'] == false) {
      this.autoPlayAdBreaks = false;
    }

    player.one('play', setUpPlayerIntervals_);

    player.on('ended', this.localContentEndedListener);
    player.on('dispose', this.playerDisposedListener);

    var contrib_ads_defaults = {
      debug: this.settings.debug,
      timeout: this.settings.timeout,
      prerollTimeout: this.settings.prerollTimeout
    };

    var ads_plugin_settings =
        extend({}, contrib_ads_defaults, options['contribAdsSettings'] || {});

    player.ads(ads_plugin_settings);

    this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    if (this.settings['adsRenderingSettings']) {
      for (var setting in this.settings['adsRenderingSettings']) {
        this.adsRenderingSettings[setting] =
            this.settings['adsRenderingSettings'][setting];
      }
    }

    if (this.settings['locale']) {
      google.ima.settings.setLocale(this.settings['locale']);
    }

    createAdContainer_();
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

    this.adsLoader.getSettings().setVpaidMode(
        google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    if (this.settings.vpaidAllowed == false) {
      this.adsLoader.getSettings().setVpaidMode(
          google.ima.ImaSdkSettings.VpaidMode.DISABLED);
    }
    if (this.settings.vpaidMode) {
      this.adsLoader.getSettings().setVpaidMode(this.settings.vpaidMode);
    }

    if (this.settings.locale) {
      this.adsLoader.getSettings().setLocale(this.settings.locale);
    }

    if (this.settings.numRedirects) {
      this.adsLoader.getSettings().setNumRedirects(this.settings.numRedirects);
    }

    this.adsLoader.getSettings().setPlayerType('videojs-ima');
    this.adsLoader.getSettings().setPlayerVersion(this.VERSION);
    this.adsLoader.getSettings().setAutoPlayAdBreaks(this.autoPlayAdBreaks);

    this.adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded_,
      false);
    this.adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdsLoaderError_,
      false);

    if (!readyCallback) {
      readyCallback = this.startFromReadyCallback;
    }
    player.on('readyforpreroll', readyCallback);
    player.ready(function() {
      player.on('fullscreenchange', onFullscreenChange_);
      player.on('volumechange', onVolumeChange_);
    });
  };

  videojs.plugin('ima', init);
});


/**
 * videojs-contextmenu
 * @version 1.2.0
 * @copyright 2016 Brightcove, Inc.
 * @license Apache-2.0
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.videojsContextmenu=e()}}(function(){return function e(t,n,o){function i(r,c){if(!n[r]){if(!t[r]){var f="function"==typeof require&&require;if(!c&&f)return f(r,!0);if(u)return u(r,!0);var s=new Error("Cannot find module '"+r+"'");throw s.code="MODULE_NOT_FOUND",s}var d=n[r]={exports:{}};t[r][0].call(d.exports,function(e){var n=t[r][1][e];return i(n?n:e)},d,d.exports,e,t,n,o)}return n[r].exports}for(var u="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(e.contextmenu.options.disabled)return e;var n={target:e,type:h};return["clientX","clientY","pageX","pageY","screenX","screenY"].forEach(function(e){n[e]=t[e]}),e.trigger(n)}function u(e){var t=this.contextmenu.current;if(t){var n=this.contextmenu.options.wait;"touchend"===e.type&&Number(new Date)-t.time>=n&&i(this,e),this.contextmenu.current=null}}function r(e){var t=this.contextmenu.current;if(t){var n=e.touches[0],o=this.contextmenu.options.sensitivity;(n.screenX-t.screenX>o||n.screenY-t.screenY>o)&&(this.contextmenu.current=null)}}function c(e){if(!this.contextmenu.current){var t=e.touches[0];this.contextmenu.current={screenX:t.screenX,screenY:t.screenY,time:Number(new Date)}}}function f(e){this.contextmenu.options.cancel&&!this.contextmenu.options.disabled&&e.preventDefault(),i(this,e).off(["touchcancel","touchend"],u).off("touchmove",r).off("touchstart",c)}function s(e){var t=this,n=this.contextmenu===s;n&&(this.contextmenu=function(){s.apply(this,arguments)},this.contextmenu.VERSION="1.2.0"),this.contextmenu.options=a.default.mergeOptions(l,e),n&&(this.on("contextmenu",f).on(["touchcancel","touchend"],u).on("touchmove",r).on("touchstart",c),this.ready(function(){return t.addClass(h)}))}Object.defineProperty(n,"__esModule",{value:!0});var d="undefined"!=typeof window?window.videojs:"undefined"!=typeof e?e.videojs:null,a=o(d),l={cancel:!0,sensitivity:10,wait:500,disabled:!1},h="vjs-contextmenu";a.default.plugin("contextmenu",s),s.VERSION="1.2.0",n.default=s,t.exports=n.default}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
/**
 * videojs-contextmenu-ui
 * @version 3.0.3
 * @copyright 2016 Brightcove, Inc.
 * @license Apache-2.0
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.videojsContextmenuUi=e()}}(function(){return function e(t,n,o){function i(r,f){if(!n[r]){if(!t[r]){var l="function"==typeof require&&require;if(!f&&l)return l(r,!0);if(u)return u(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var a=n[r]={exports:{}};t[r][0].call(a.exports,function(e){var n=t[r][1][e];return i(n?n:e)},a,a.exports,e,t,n,o)}return n[r].exports}for(var u="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){(function(o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e,t,n){for(var o=!0;o;){var i=e,u=t,r=n;o=!1,null===i&&(i=Function.prototype);var f=Object.getOwnPropertyDescriptor(i,u);if(void 0!==f){if("value"in f)return f.value;var l=f.get;if(void 0===l)return;return l.call(r)}var d=Object.getPrototypeOf(i);if(null===d)return;e=d,t=u,n=r,o=!0,f=d=void 0}},d=e("global/window"),a=i(d),c="undefined"!=typeof window?window.videojs:"undefined"!=typeof o?o.videojs:null,s=i(c),p=s.default.getComponent("MenuItem"),y=function(e){function t(){u(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),f(t,[{key:"handleClick",value:function(e){var n=this;l(Object.getPrototypeOf(t.prototype),"handleClick",this).call(this),this.options_.listener(),a.default.setTimeout(function(){n.player().contextmenuUI.menu.dispose()},1)}}]),t}(p);n.default=y,t.exports=n.default}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"global/window":6}],2:[function(e,t,n){(function(o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e,t,n){for(var o=!0;o;){var i=e,u=t,r=n;o=!1,null===i&&(i=Function.prototype);var f=Object.getOwnPropertyDescriptor(i,u);if(void 0!==f){if("value"in f)return f.value;var l=f.get;if(void 0===l)return;return l.call(r)}var d=Object.getPrototypeOf(i);if(null===d)return;e=d,t=u,n=r,o=!0,f=d=void 0}},d=e("global/window"),a=i(d),c="undefined"!=typeof window?window.videojs:"undefined"!=typeof o?o.videojs:null,s=i(c),p=e("./context-menu-item"),y=i(p),h=s.default.getComponent("Menu"),w=function(e){function t(e,n){var o=this;u(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,n),this.dispose=s.default.bind(this,this.dispose),n.content.forEach(function(t){var n=function(){};"function"==typeof t.listener?n=t.listener:"string"==typeof t.href&&(n=function(){return a.default.open(t.href)}),o.addItem(new y.default(e,{label:t.label,listener:s.default.bind(e,n)}))})}return r(t,e),f(t,[{key:"createEl",value:function(){var e=l(Object.getPrototypeOf(t.prototype),"createEl",this).call(this);return s.default.addClass(e,"vjs-contextmenu-ui-menu"),e.style.left=this.options_.position.left+"px",e.style.top=this.options_.position.top+"px",e}}]),t}(h);n.default=w,t.exports=n.default}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./context-menu-item":1,"global/window":6}],3:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){var t=void 0;if(e.getBoundingClientRect&&e.parentNode&&(t=e.getBoundingClientRect()),!t)return{left:0,top:0};var n=f.default.documentElement,o=f.default.body,i=n.clientLeft||o.clientLeft||0,u=d.default.pageXOffset||o.scrollLeft,r=t.left+u-i,l=n.clientTop||o.clientTop||0,a=d.default.pageYOffset||o.scrollTop,c=t.top+a-l;return{left:Math.round(r),top:Math.round(c)}}function u(e,t){var n={},o=i(e),u=e.offsetWidth,r=e.offsetHeight,f=o.top,l=o.left,d=t.pageY,a=t.pageX;return t.changedTouches&&(a=t.changedTouches[0].pageX,d=t.changedTouches[0].pageY),n.y=Math.max(0,Math.min(1,(f-d+r)/r)),n.x=Math.max(0,Math.min(1,(a-l)/u)),n}Object.defineProperty(n,"__esModule",{value:!0}),n.findElPosition=i,n.getPointerPosition=u;var r=e("global/document"),f=o(r),l=e("global/window"),d=o(l)},{"global/document":5,"global/window":6}],4:[function(e,t,n){},{}],5:[function(e,t,n){(function(n){var o="undefined"!=typeof n?n:"undefined"!=typeof window?window:{},i=e("min-document");if("undefined"!=typeof document)t.exports=document;else{var u=o["__GLOBAL_DOCUMENT_CACHE@4"];u||(u=o["__GLOBAL_DOCUMENT_CACHE@4"]=i),t.exports=u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"min-document":4}],6:[function(e,t,n){(function(e){"undefined"!=typeof window?t.exports=window:"undefined"!=typeof e?t.exports=e:"undefined"!=typeof self?t.exports=self:t.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,n){(function(o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function u(e){return e.hasOwnProperty("contextmenuUI")&&e.contextmenuUI.hasOwnProperty("menu")&&e.contextmenuUI.menu.el()}function r(e,t){return{left:Math.round(t.width*e.x),top:Math.round(t.height-t.height*e.y)}}function f(e){var t=this;if(u(this))return s.default.log("contextmenu-ui: saw vjs-contextmenu, but menu open"),void this.contextmenuUI.menu.dispose();this.contextmenu.options.cancel=!1;var n=(0,h.getPointerPosition)(this.el(),e),o=this.el().getBoundingClientRect(),i=r(n,o);e.preventDefault(),s.default.log("contextmenu-ui: saw vjs-contextmenu",e,n,o,i);var f=this.contextmenuUI.menu=new y.default(this,{content:this.contextmenuUI.content,position:i});this.contextmenuUI.closeMenu=function(){s.default.warn("player.contextmenuUI.closeMenu() is deprecated, please use player.contextmenuUI.menu.dispose() instead!"),f.dispose()},f.on("dispose",function(){s.default.log("contextmenu-ui: disposed menu"),t.contextmenu.options.cancel=!0,s.default.off(a.default,["click","tap"],f.dispose),t.removeChild(f),delete t.contextmenuUI.menu}),this.addChild(f),s.default.on(a.default,["click","tap"],f.dispose)}function l(e){var t=this;if(!Array.isArray(e.content))throw new Error('"content" required');u(this)&&(this.contextmenuUI.menu.dispose(),this.off("vjs-contextmenu",this.contextmenuUI.onVjsContextMenu),delete this.contextmenuUI),this.contextmenu();var n=this.contextmenuUI=function(){l.apply(this,arguments)};n.onVjsContextMenu=s.default.bind(this,f),n.content=e.content,n.VERSION="3.0.3",this.on("vjs-contextmenu",n.onVjsContextMenu).ready(function(){return t.addClass("vjs-contextmenu-ui")})}Object.defineProperty(n,"__esModule",{value:!0});var d=e("global/document"),a=i(d),c="undefined"!=typeof window?window.videojs:"undefined"!=typeof o?o.videojs:null,s=i(c),p=e("./context-menu"),y=i(p),h=e("./util");s.default.plugin("contextmenuUI",l),l.VERSION="3.0.3",n.default=l,t.exports=n.default}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./context-menu":2,"./util":3,"global/document":5}]},{},[7])(7)});
/**
 * videojs-replay
 * @version 1.1.0
 * @copyright 2017 Derk-Jan Hartman
 * @license (MIT OR Apache-2.0)
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.videojsReplay=e()}}(function(){return function e(n,o,t){function i(f,r){if(!o[f]){if(!n[f]){var d="function"==typeof require&&require;if(!r&&d)return d(f,!0);if(l)return l(f,!0);var u=new Error("Cannot find module '"+f+"'");throw u.code="MODULE_NOT_FOUND",u}var a=o[f]={exports:{}};n[f][0].call(a.exports,function(e){var o=n[f][1][e];return i(o?o:e)},a,a.exports,e,n,o,t)}return o[f].exports}for(var l="function"==typeof require&&require,f=0;f<t.length;f++)i(t[f]);return i}({1:[function(e,n,o){(function(e){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(o,"__esModule",{value:!0});var i="undefined"!=typeof window?window.videojs:"undefined"!=typeof e?e.videojs:null,l=t(i),f={},r=function(e){e.duration()!==1/0&&e.addClass("vjs-replay").getChild("controlBar").getChild("playToggle").controlText(e.localize("Replay"))},d=function(e){var n=void 0;e.hasClass("vjs-replay")&&(n=e.paused()?e.localize("Play"):e.localize("Pause"),e.removeClass("vjs-replay").getChild("controlBar").getChild("playToggle").controlText(n))},u=function(e,n){e.on("ended",function(){r(e)}),e.on(["play","seeking"],function(){d(e)})},a=function(e){var n=this;this.ready(function(){u(n,l.default.mergeOptions(f,e))})};l.default.plugin("replayButton",a),a.VERSION="1.1.0",o.default=a,n.exports=o.default}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
/**
 * blogg-embed
 * @version 1.2.5
 * @copyright 2017 blogg.no
 */
(function($, videojs, window) {
    'use strict';
    if (window.embedMedia)
        return;
    var APIlist = {
        plays: function(mediaId, blogId) {
            return $.getJSON("http://hits.blogsoft.org?callback=?", {
                id: blogId,
                vid: mediaId
            });
        },
        track: function(eventName, mediaId, blogId) {
            return $.getJSON("http://hits.blogsoft.org/track?callback=?", {
                e: eventName,
                id: blogId,
                vid: mediaId
            });
        }
    };

    var embedMedia = function(mediaType, mediaId, blogId) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _emLang = {
            CLOSE_SHARE: { en: "Close share box", no: "kk del boks" },
            CLOSE_PLAYLIST: { en: "Close playlist box", no: "Lukk spilleliste boksen" },
            ADVERTISEMENT: { en: "Advertisement", no: "Annonse" },
            COPY_SCRIPT: { en: "Copy embed script code", no: "Kopier skriptkode" },
            COPY_EMBED: { en: "Copy embed iframe code", no: "Kopier embed iframe-koden" }
        };
        var _isDemo = JSON.parse("false"),
            _mediaPlayListUrls = [],
            _currentMedia = {
                type: mediaType,
                id: 0,
                bid: blogId || 0,
                vid: mediaId || 0,
                player: null,
                plugins: null,
                src: '',
                playsCounter: 0,
                index: -1
            },
            _idSelector = '#embedMedia',
            _timeupWaitingID = 0,
            _culture = 'no',
            _lastEventName = '';

        var _getDefaultSetup = function() {
            var defaultOpt = {
                controls: true,
                autoplay: false,
                loop: false,
                preload: "none",
                html5: {
                    hlsjsConfig: {}
                },
                inactivityTimeout: 500,
                controlBar: {
                    fullscreenToggle: true
                }
            };

            switch (_currentMedia.type) {
                case 'audio':
                    defaultOpt.height = 50;
                    defaultOpt.controlBar.fullscreenToggle = false;
                    break;
                default:
                    defaultOpt.controlBar.volumeMenuButton = {
                        inline: false,
                        vertical: true
                    };
            };
            return defaultOpt;
        };

        var _getPluginDefaultOptions = function() {
            var vjPlgOpt = {
                    watermark: {
                        position: 'bottom-right',
                        url: '',
                        image: '',
                        fadeTime: null
                    },
                    ima: {
                        id: _idSelector.replace('#', ''),
                        showControlsForJSAds: false,
                        adLabel: _emLang.ADVERTISEMENT[_culture],
                        adTagUrl: '',
                        prerollTimeout: 5000
                    },
                    contextmenuUI: {
                        content: [{
                            label: _emLang.COPY_SCRIPT[_culture],
                            listener: function() {
                                //$('#shareBtn').trigger('click');
                                _copyToClipboard($('#inputEmbedScript').val());
                            }
                        }, {
                            label: _emLang.COPY_EMBED[_culture],
                            listener: function() {
                                _copyToClipboard($('#inputEmbedIframe').val());
                            }
                        }]
                    },
                    replayButton: {}
                },
                selectedPlugins = {},
                plg = {
                    video: ["watermark", "ima", "contextmenuUI", "replayButton"],
                    audio: ["replayButton"]
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
        };

        var _notifyToParent = function(msg) {
            var message = $.extend({ frameid: (window.name ? window.name.replace("em-iframe-", "") : '') }, msg);
            window.parent.postMessage('em|' + JSON.stringify(message), "*");
        };


        var _copyToClipboard = function(text) {
            if (typeof text != "string")
                return;
            var textArea = $('<textarea></textarea>').css({
                'position': 'absolute',
                'left': '-9999px',
                'top': '0'
            }).val(text);
            $('body').append(textArea);
            textArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            textArea.remove();

        };

        var _playsAPICall = function() {
            if (_isDemo || _currentMedia.type == 'audio' || !_currentMedia.vid) return 0;
            APIlist.plays(_currentMedia.vid, _currentMedia.bid).done(function(msg) {
                //console.log(msg);
                _currentMedia.playsCounter++;
            });
        };
        var _trackAPICall = function(eventName) {
            if (eventName && _lastEventName != eventName) {
                console.log('Track:', eventName);
                _lastEventName = eventName;
            } else return 0;
            if (_isDemo || !_currentMedia.vid) return 0;

            APIlist.track(eventName, _currentMedia.vid, _currentMedia.bid).done(function(msg) {
                console.log(eventName, msg);
            });
        };
        var _getUrlQueries = function(queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function(key, value) {
                var i = value.split('=');
                if (i.length == 2)
                    out[i[0].toString()] = i[1].toString();
            });
            return out;
        };
        var _getEmbedId = function() {
            if (!_isDemo) {
                var parts = location.pathname.split('/');
                return parts[parts.length - 1];
            } else {
                var queries = _getUrlQueries(document.location.search.substr(1));
                return _currentMedia.type == 'video' ? queries.v : queries.id;
            }
        };

        var _setMediaUrlId = function() {
            _mediaPlayListUrls = [];
            _mediaPlayListUrls.push(window.location.href);
            _currentMedia.index = 0;
            _currentMedia.id = _getEmbedId();
        };

        var _loadAds = function(player) {
            //console.log('ads load', 'autoplay: ' + player.autoplay());
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
        };

        var _removeAds = function(player) {
            player.ima.getAdsManager() && player.ima.getAdsManager().discardAdBreak();
            player.ima.adContainerDiv && player.ima.adContainerDiv.remove();
            $('#' + player.id()).removeClass('vjs-ad-loading vjs-ad-playing');
        };

        var _runPlugin = function(player, plugins) {
            for (var plugin in plugins) {
                switch (plugin) {
                    case 'ima':
                        if (plugins.ima.adTagUrl) {
                            player.ima(plugins.ima);

                            if (!player.autoplay()) {
                                player.one(_startEvent, function() {
                                    _loadAds(player);
                                });
                            } else {
                                setTimeout((function() {
                                    _loadAds(player);
                                }).bind(this), 100);
                            };
                            player.one('adsready', function() {
                                //console.log('ads ready');
                                _notifyToParent({ emmethod: "adsready" });
                                _trackAPICall('adsReady');
                                player.pause();
                            });
                            player.one('contentended', function() {
                                _notifyToParent({ emmethod: "contentended" });
                                _removeAds(player);
                            });
                        }
                        break;
                    default:
                        if (typeof player[plugin] === 'function')
                            player[plugin](plugins[plugin]);
                }
            }
        };
        var _getSrc = function($player) {
            var src = null;
            var source = $player.find("source");

            if (source.length) {
                src = source.attr("src");
                /*if (_currentMedia.type == 'audio') {
                    $player[0].pause();
                    source.remove();
                }*/
            }
            /*if (_currentMedia.type == 'audio')
                $player[0].load();*/
            return src;
        };

        var _setAttrsForMobile = function() {
            var contentPlayer = $(_idSelector)[0];
            if ((navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/Android/i)) &&
                contentPlayer.hasAttribute('controls')) {
                contentPlayer.removeAttribute('controls');
            }
        };

        var createPlayer = function(element, setup, callback) {
            var defaultSetup = _getDefaultSetup();
            _idSelector = element || _idSelector;
            var settings = $.extend({}, defaultSetup, setup);
            //var srcPl = _getSrc($(_idSelector));
            _setAttrsForMobile();
            var playerCallback = function() {
                switch (_currentMedia.type) {
                    case 'video':
                        if (_isDemo && _currentMedia.id) {
                            this.src([{ type: "video/mp4", src: "resources/videos/" + _currentMedia.id + ".mp4" }]);
                            this.poster('resources/videos/posters/' + _currentMedia.id + '.jpg');
                        }
                        break;
                    case 'audio':
                        if (_isDemo && _currentMedia.id) {
                            this.src([{ type: "audio/mp3", src: "resources/audios/" + _currentMedia.id + ".mp3" }]);
                        }
                };
                if (callback) callback();
                _runPlugin(this, $.extend({}, plgOpts, _currentMedia.plugins));
            }

            var player = videojs(_idSelector, settings, playerCallback);
            var plgOpts = _getPluginDefaultOptions(player.id());
            player.on('play', onMediaPlayEvent.bind(this));
            player.on('pause', onMediaPauseEvent.bind(this));
            player.on('ended', onMediaEndEvent.bind(this));
            player.on('adstart', onMediaAdStartEvent.bind(this));
            player.on('adend', onMediaAdEndEvent.bind(this));
            player.on('adskip', onMediaAdCancelEvent.bind(this));
            player.on('adserror', onMediaAdErrorEvent.bind(this));

            _currentMedia.player = player;

            return player;
        };

        var _stopTimer = function() {
            window.clearTimeout(_timeupWaitingID);
            $('#circulerTimer').remove();
        };
        var _addCirculerTimer = function() {
            var circulerTimer = '<div id="circulerTimer" class="radial-timer s-animate">' +
                '<div class="radial-timer-half"></div>' +
                '<div class="radial-timer-half"></div>' +
                '</div>'
            $(circulerTimer).appendTo(_idSelector);
        };

        var onMediaPlayEvent = function(event) {
            _notifyToParent({ emmethod: "play" });
            if (_lastEventName == 'ended')
                _trackAPICall('replays');
            _lastEventName = 'plays';
            _stopTimer();
            _currentMedia.playsCounter++;
            if (_currentMedia.playsCounter === 1
                /*&&
                               !(_currentMedia.plugins.ima &&
                                   (_currentMedia.plugins.ima.adTagUrl &&
                                       !_currentMedia.plugins.ima.error))*/
            ) {
                _playsAPICall();
            }
        };
        var onMediaPauseEvent = function(event) {
            _notifyToParent({ emmethod: "paused" });
            _trackAPICall('paused');
        };
        var onMediaEndEvent = function() {
            _notifyToParent({ emmethod: "ended" });
            _trackAPICall('ended');
            var waitTime = 3000;
            var nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia) {
                _stopTimer();
                _addCirculerTimer();
                _timeupWaitingID = window.setTimeout((function() {
                    window.location.href = nextMedia;
                }).bind(this), waitTime);
            } else _currentMedia.playsCounter = 0;
        };
        var onMediaAdStartEvent = function(event) {
            _notifyToParent({ emmethod: "adstart" });
            _trackAPICall('adStarted');
        };
        var onMediaAdEndEvent = function(event) {
            _notifyToParent({ emmethod: "adend" });
            _trackAPICall('adEnded');
            if (_currentMedia.playsCounter === 1) {
                _notifyToParent({ emmethod: "videostart" });
            }
        };
        var onMediaAdCancelEvent = function(event) {
            _trackAPICall('adCanceled');
        };
        var onMediaAdErrorEvent = function(event) {
            _notifyToParent({ emmethod: "adserror" });
            _currentMedia.plugins.ima.error = true;
            _trackAPICall('adsError');
            //_removeAds(_currentMedia.player);
        };

        var _boxCloseControl = function(boxClass, title) {
            var closebtn = $('<a>', {
                title: title,
                href: "#",
                class: "media-icon",
                click: function(event) {
                    event.stopPropagation();
                    $(boxClass + '.drawer').removeClass("open");
                    //_currentMedia.player.play();
                    return false;
                }
            });

            closebtn.html('&times;')
                .wrap('<div class="media-close text-muted"></div>')
                .parent()
                .prependTo(boxClass);

            $(boxClass).on('click', function(event) {
                event.stopPropagation();
            });
        };
        var _setShareDrawer = function() {
            $('#shareBtn').show();
            _boxCloseControl(".media-share", _emLang.CLOSE_SHARE[_culture]);
            $('#inputEmbedScript, #inputEmbedIframe').on('focus', function() {
                var $this = $(this);
                $this.prev().hide();
                window.setTimeout(function() {
                    $this.select();
                });
            }).on('blur', function() {
                $(this).prev().removeAttr("style");
            });
        };
        var _setTitle = function() {
            $('.media-title a, .media-playlist__header__title a').on('click', function(event) {
                event.stopPropagation();
                _currentMedia.player.pause();
            });
        };
        var _setHeader = function() {
            if (_currentMedia.type == 'video') {
                var $emHeader = $(_idSelector).next('.media-header');
                $emHeader.appendTo(_idSelector);
            }
            _setTitle();
        };
        var _setButtons = function() {
            var btnGroups = $('[data-embutton]');
            btnGroups.on('click', function(event) {
                event.stopPropagation();
                if (this.id && $('.drawer[data-btnid=' + this.id + ']').length > 0) {
                    $('.drawer[data-btnid=' + this.id + ']').addClass('open');
                    _currentMedia.player.pause();
                }
                return false;
            });
        };
        var _openWindow = function(url, title, opt) {
            var width = opt.width,
                height = opt.height,
                scrollbars = opt.scrollbars || 'yes',
                resizable = opt.resizable || 'yes',
                toolbar = opt.toolbar || 'no',
                winPosY = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - height / 2,
                winPosX = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - width / 2;
            if (window.chrome && window.navigator.userAgent.toLowerCase().indexOf("mac os x") !== -1)
                height += 27;
            if (window.safari)
                height += 47;
            var winOpt = "width=" + width +
                ",height=" + height +
                ",left=" + winPosX +
                ",top=" + winPosY +
                ",scrollbars=" + scrollbars +
                ",resizable=" + resizable +
                ",toolbar=" + toolbar;
            return window.open(url, title, winOpt);
        };
        var _setShare = function() {
            $('.media-share .buttons a').on('click', function(event) {
                event.stopPropagation();
                if ($(this).hasClass('email'))
                    return true;
                _openWindow(this.href,
                    this.class, {
                        width: 500,
                            height: 400
                    });
                return false;
            });
            _setShareDrawer();
        };

        var setMediaPlayer = function(domId, setup, callback) {
            if (typeof domId != 'undefined' && !(domId && $(domId).length)) {
                console.log('Not found');
                return this;
            }
            _setMediaUrlId();

            createPlayer(domId, setup, callback);
            _currentMedia.playsCounter = 0;
            _setHeader();
            _setButtons();
            _setShare();

            return this;
        };

        var setPlugins = function(plugins) {
            if (!_currentMedia.player || !plugins)
                return this;
            var videoJsPluginOptions = _getPluginDefaultOptions();
            if (!_currentMedia.plugins)
                _currentMedia.plugins = videoJsPluginOptions;
            for (var plugin in plugins) {
                if (plugin in _currentMedia.player) {
                    _currentMedia.plugins[plugin] = $.extend({}, videoJsPluginOptions[plugin], plugins[plugin]);
                }
            }
            return this;
        };

        var getMediaPlayer = function() {
            return _currentMedia.player;
        };

        var _getList = function($tracksDom) {
            var mediaLinkList = [];
            $tracksDom.each(function(index) {
                var queries = _getUrlQueries(this.href.split('?')[1]);
                var $li = $(this).parent();
                if (queries) {
                    mediaLinkList[index] = this.href;
                    if (window.location.href.indexOf(this.href) > -1) {
                        $li.addClass("currently-playing");
                        _currentMedia.index = index;
                        if (index > 0)
                            _currentMedia.player.autoplay(true);
                        $li.parent().animate({
                            scrollTop: index * $li.outerHeight() + 1
                        }, 500);
                    }
                }
            });
            return mediaLinkList;
        };

        var _setTrackNumber = function() {
            var $trackNum = $(".media-playlist__header__info span");
            $trackNum.text((_currentMedia.index + 1) + '/' + _mediaPlayListUrls.length);
        };

        var _setPlaylistDrawer = function() {
            $('#playListBtn').show();
            _boxCloseControl(".media-playlist", _emLang.CLOSE_PLAYLIST[_culture]);
        };

        var setPlayList = function(domList) {
            if (!_currentMedia.player) return;
            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                _mediaPlayListUrls = _getList($tracksDom);
                if (_currentMedia.type == 'video') {
                    _setPlaylistDrawer();
                }
                _setTrackNumber();
            }
            return this;
        };

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
            messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        window[eventMethod](messageEvent, function(e) {
            var message = e.data;
            if (typeof message == "string" && message.indexOf("em|") > -1) {
                message = JSON.parse(message.split("|")[1]);
                switch (message.emmethod) {
                    case "pause":
                        _currentMedia.player.pause();
                        break;
                    case "play":
                        _currentMedia.player.play();
                        break;
                }
            }
        }, false);

        return {
            createPlayer: createPlayer,
            setMediaPlayer: setMediaPlayer,
            getMediaPlayer: getMediaPlayer,
            setPlayList: setPlayList,
            setPlugins: setPlugins
        };
    };
    window.embedMedia = embedMedia || {};

})(jQuery, videojs, window);