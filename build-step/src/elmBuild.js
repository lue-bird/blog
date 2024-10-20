// -- (function(scope){
// -- 'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


/*
function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/


/*
function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$Build$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$append = _Utils_append;
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 'I8':
			return 1;
		case 'I16':
			return 2;
		case 'I32':
			return 4;
		case 'U8':
			return 1;
		case 'U16':
			return 2;
		case 'U32':
			return 4;
		case 'F32':
			return 4;
		case 'F64':
			return 8;
		case 'Seq':
			var w = builder.a;
			return w;
		case 'Utf8':
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = {$: 'LE'};
var $elm$core$Basics$eq = _Utils_equal;
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 'I8':
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 'I16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'I32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U8':
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 'U16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F64':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f64,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'Seq':
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 'Utf8':
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $lue_bird$elm_state_interface_experimental$Node$FileWrite = function (a) {
	return {$: 'FileWrite', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $lue_bird$elm_state_interface_experimental$StructuredId$ofInt = $elm$json$Json$Encode$int;
var $lue_bird$elm_state_interface_experimental$StructuredId$ofList = F2(
	function (elementToStructuredId, structuredIds) {
		return A2($elm$json$Json$Encode$list, elementToStructuredId, structuredIds);
	});
var $lue_bird$elm_state_interface_experimental$StructuredId$ofParts = function (fieldValueStructureIds) {
	return A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, fieldValueStructureIds);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $lue_bird$elm_state_interface_experimental$StructuredId$ofString = $elm$json$Json$Encode$string;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit = $elm$json$Json$Encode$null;
var $lue_bird$elm_state_interface_experimental$StructuredId$ofVariant = function (variant) {
	return $lue_bird$elm_state_interface_experimental$StructuredId$ofParts(
		_List_fromArray(
			[
				$lue_bird$elm_state_interface_experimental$StructuredId$ofString(variant.tag),
				variant.value
			]));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixToStructureId = function (timePosix) {
	return $lue_bird$elm_state_interface_experimental$StructuredId$ofInt(
		$elm$time$Time$posixToMillis(timePosix));
};
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleToStructuredId = function (interfaceSingle) {
	return $lue_bird$elm_state_interface_experimental$StructuredId$ofVariant(
		function () {
			switch (interfaceSingle.$) {
				case 'HttpRequestSend':
					var request = interfaceSingle.a;
					return {
						tag: 'HttpRequestSend',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(request.url)
					};
				case 'HttpRequestListen':
					var listen = interfaceSingle.a;
					return {
						tag: 'HttpRequestListen',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofInt(listen.portNumber)
					};
				case 'HttpResponseSend':
					var send = interfaceSingle.a;
					return {
						tag: 'HttpResponseSend',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'port',
									$lue_bird$elm_state_interface_experimental$StructuredId$ofInt(send.portNumber)),
									_Utils_Tuple2(
									'statusCode',
									$lue_bird$elm_state_interface_experimental$StructuredId$ofInt(send.statusCode)),
									_Utils_Tuple2(
									'headers',
									A2(
										$lue_bird$elm_state_interface_experimental$StructuredId$ofList,
										function (header) {
											return $elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'name',
														$lue_bird$elm_state_interface_experimental$StructuredId$ofString(header.name)),
														_Utils_Tuple2(
														'value',
														$lue_bird$elm_state_interface_experimental$StructuredId$ofString(header.value))
													]));
										},
										send.headers)),
									_Utils_Tuple2(
									'dataUnsignedInt8s',
									A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, send.dataUnsignedInt8s))
								]))
					};
				case 'TimePosixRequest':
					return {tag: 'TimePosixRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'TimezoneOffsetRequest':
					return {tag: 'TimezoneOffsetRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'TimezoneNameRequest':
					return {tag: 'TimezoneNameRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'TimeOnce':
					var once = interfaceSingle.a;
					return {
						tag: 'TimeOnce',
						value: $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixToStructureId(once.pointInTime)
					};
				case 'RandomUnsignedInt32sRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'RandomUnsignedInt32sRequest',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofInt(request.count)
					};
				case 'TimePeriodicallyListen':
					var listen = interfaceSingle.a;
					return {
						tag: 'TimePeriodicallyListen',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofInt(listen.intervalDurationMilliSeconds)
					};
				case 'Exit':
					return {tag: 'Exit', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'DirectoryMake':
					var make = interfaceSingle.a;
					return {
						tag: 'DirectoryMake',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(make.path)
					};
				case 'FileRemove':
					var path = interfaceSingle.a;
					return {
						tag: 'FileRemove',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(path)
					};
				case 'FileWrite':
					var write = interfaceSingle.a;
					return {
						tag: 'FileWrite',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofParts(
							_List_fromArray(
								[
									$lue_bird$elm_state_interface_experimental$StructuredId$ofString(write.path),
									A2($lue_bird$elm_state_interface_experimental$StructuredId$ofList, $lue_bird$elm_state_interface_experimental$StructuredId$ofInt, write.contentUnsignedInt8s)
								]))
					};
				case 'FileRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'FileRequest',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(request.path)
					};
				case 'FileChangeListen':
					var listen = interfaceSingle.a;
					return {
						tag: 'FileChangeListen',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(listen.path)
					};
				case 'FileInfoRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'FileInfoRequest',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(request.path)
					};
				case 'DirectorySubPathsRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'DirectorySubPathsRequest',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(request.path)
					};
				case 'WorkingDirectoryPathRequest':
					return {tag: 'WorkingDirectoryPathRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'LaunchArgumentsRequest':
					return {tag: 'LaunchArgumentsRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'TerminalSizeRequest':
					return {tag: 'TerminalSizeRequest', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'TerminalSizeChangeListen':
					return {tag: 'TerminalSizeChangeListen', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				case 'ProcessTitleSet':
					var title = interfaceSingle.a;
					return {
						tag: 'ProcessTitleSet',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(title)
					};
				case 'StandardOutWrite':
					var text = interfaceSingle.a;
					return {
						tag: 'StandardOutWrite',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(text)
					};
				case 'StandardErrWrite':
					var text = interfaceSingle.a;
					return {
						tag: 'StandardErrWrite',
						value: $lue_bird$elm_state_interface_experimental$StructuredId$ofString(text)
					};
				case 'StandardInListen':
					return {tag: 'StandardInListen', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
				default:
					return {tag: 'StandardInRawListen', value: $lue_bird$elm_state_interface_experimental$StructuredId$ofUnit};
			}
		}());
};
var $miniBill$elm_fast_dict$Internal$Black = {$: 'Black'};
var $miniBill$elm_fast_dict$Internal$Dict = F2(
	function (a, b) {
		return {$: 'Dict', a: a, b: b};
	});
var $miniBill$elm_fast_dict$Internal$InnerNode = F5(
	function (a, b, c, d, e) {
		return {$: 'InnerNode', a: a, b: b, c: c, d: d, e: e};
	});
var $miniBill$elm_fast_dict$Internal$Leaf = {$: 'Leaf'};
var $miniBill$elm_fast_dict$FastDict$singleton = F2(
	function (key, value) {
		return A2(
			$miniBill$elm_fast_dict$Internal$Dict,
			1,
			A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, key, value, $miniBill$elm_fast_dict$Internal$Leaf, $miniBill$elm_fast_dict$Internal$Leaf));
	});
var $lue_bird$elm_state_interface_experimental$StructuredId$toJson = function (structuredId) {
	return structuredId;
};
var $lue_bird$elm_state_interface_experimental$StructuredId$toString = function (structuredId) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$lue_bird$elm_state_interface_experimental$StructuredId$toJson(structuredId));
};
var $lue_bird$elm_state_interface_experimental$Node$interfaceFromSingle = function (interfaceSingle) {
	return A2(
		$miniBill$elm_fast_dict$FastDict$singleton,
		$lue_bird$elm_state_interface_experimental$StructuredId$toString(
			$lue_bird$elm_state_interface_experimental$Node$interfaceSingleToStructuredId(interfaceSingle)),
		interfaceSingle);
};
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0.a;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$bytes$Bytes$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0.a;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (step.$ === 'Loop') {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return $elm$bytes$Bytes$Decode$Decoder(
			A2($elm$bytes$Bytes$Decode$loopHelp, state, callback));
	});
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v1 = A2(decodeA, bites, offset);
					var aOffset = _v1.a;
					var a = _v1.b;
					return _Utils_Tuple2(
						aOffset,
						func(a));
				}));
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (_v0, offset) {
				return _Utils_Tuple2(offset, a);
			}));
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = $elm$bytes$Bytes$Decode$Decoder(_Bytes_read_u8);
var $lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$unsignedInt8ListBytesDecoder = function (length) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{elements: _List_Nil, remainingLength: length},
		function (soFar) {
			return (soFar.remainingLength <= 0) ? $elm$bytes$Bytes$Decode$succeed(
				$elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(soFar.elements))) : A2(
				$elm$bytes$Bytes$Decode$map,
				function (_byte) {
					return $elm$bytes$Bytes$Decode$Loop(
						{
							elements: A2($elm$core$List$cons, _byte, soFar.elements),
							remainingLength: soFar.remainingLength - 1
						});
				},
				$elm$bytes$Bytes$Decode$unsignedInt8);
		});
};
var $elm$bytes$Bytes$width = _Bytes_width;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$toUnsignedInt8List = function (bytes) {
	return A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		A2(
			$elm$bytes$Bytes$Decode$decode,
			$lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$unsignedInt8ListBytesDecoder(
				$elm$bytes$Bytes$width(bytes)),
			bytes));
};
var $lue_bird$elm_state_interface_experimental$Node$fileWrite = function (write) {
	return $lue_bird$elm_state_interface_experimental$Node$interfaceFromSingle(
		$lue_bird$elm_state_interface_experimental$Node$FileWrite(
			{
				contentUnsignedInt8s: $lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$toUnsignedInt8List(write.content),
				path: write.path
			}));
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Build$fromJs = _Platform_incomingPort('fromJs', $elm$json$Json$Decode$value);
var $miniBill$elm_fast_dict$FastDict$empty = A2($miniBill$elm_fast_dict$Internal$Dict, 0, $miniBill$elm_fast_dict$Internal$Leaf);
var $miniBill$elm_fast_dict$FastDict$foldlInner = F3(
	function (func, acc, dict) {
		foldlInner:
		while (true) {
			if (dict.$ === 'Leaf') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($miniBill$elm_fast_dict$FastDict$foldlInner, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldlInner;
			}
		}
	});
var $miniBill$elm_fast_dict$FastDict$foldl = F3(
	function (func, acc, _v0) {
		var dict = _v0.b;
		return A3($miniBill$elm_fast_dict$FastDict$foldlInner, func, acc, dict);
	});
var $miniBill$elm_fast_dict$Internal$Red = {$: 'Red'};
var $miniBill$elm_fast_dict$FastDict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'InnerNode') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'InnerNode') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$miniBill$elm_fast_dict$Internal$InnerNode,
					$miniBill$elm_fast_dict$Internal$Red,
					key,
					value,
					A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, lK, lV, lLeft, lRight),
					A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$miniBill$elm_fast_dict$Internal$InnerNode,
					color,
					rK,
					rV,
					A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'InnerNode') && (left.a.$ === 'Red')) && (left.d.$ === 'InnerNode')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$miniBill$elm_fast_dict$Internal$InnerNode,
					$miniBill$elm_fast_dict$Internal$Red,
					lK,
					lV,
					A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, llK, llV, llLeft, llRight),
					A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, key, value, lRight, right));
			} else {
				return A5($miniBill$elm_fast_dict$Internal$InnerNode, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $miniBill$elm_fast_dict$FastDict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'Leaf') {
			return _Utils_Tuple2(
				A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Red, key, value, $miniBill$elm_fast_dict$Internal$Leaf, $miniBill$elm_fast_dict$Internal$Leaf),
				true);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					var _v2 = A3($miniBill$elm_fast_dict$FastDict$insertHelp, key, value, nLeft);
					var newLeft = _v2.a;
					var isNew = _v2.b;
					return _Utils_Tuple2(
						A5($miniBill$elm_fast_dict$FastDict$balance, nColor, nKey, nValue, newLeft, nRight),
						isNew);
				case 'EQ':
					return _Utils_Tuple2(
						A5($miniBill$elm_fast_dict$Internal$InnerNode, nColor, nKey, value, nLeft, nRight),
						false);
				default:
					var _v3 = A3($miniBill$elm_fast_dict$FastDict$insertHelp, key, value, nRight);
					var newRight = _v3.a;
					var isNew = _v3.b;
					return _Utils_Tuple2(
						A5($miniBill$elm_fast_dict$FastDict$balance, nColor, nKey, nValue, nLeft, newRight),
						isNew);
			}
		}
	});
var $miniBill$elm_fast_dict$FastDict$insertInner = F3(
	function (key, value, dict) {
		var _v0 = A3($miniBill$elm_fast_dict$FastDict$insertHelp, key, value, dict);
		if ((_v0.a.$ === 'InnerNode') && (_v0.a.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var _v2 = _v1.a;
			var k = _v1.b;
			var v = _v1.c;
			var l = _v1.d;
			var r = _v1.e;
			var isNew = _v0.b;
			return _Utils_Tuple2(
				A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, k, v, l, r),
				isNew);
		} else {
			var x = _v0;
			return x;
		}
	});
var $miniBill$elm_fast_dict$FastDict$insert = F3(
	function (key, value, _v0) {
		var sz = _v0.a;
		var dict = _v0.b;
		var _v1 = A3($miniBill$elm_fast_dict$FastDict$insertInner, key, value, dict);
		var result = _v1.a;
		var isNew = _v1.b;
		return isNew ? A2($miniBill$elm_fast_dict$Internal$Dict, sz + 1, result) : A2($miniBill$elm_fast_dict$Internal$Dict, sz, result);
	});
var $miniBill$elm_fast_dict$FastDict$insertHelpNoReplace = F3(
	function (key, value, dict) {
		if (dict.$ === 'Leaf') {
			return _Utils_Tuple2(
				A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Red, key, value, $miniBill$elm_fast_dict$Internal$Leaf, $miniBill$elm_fast_dict$Internal$Leaf),
				true);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					var _v2 = A3($miniBill$elm_fast_dict$FastDict$insertHelpNoReplace, key, value, nLeft);
					var newLeft = _v2.a;
					var isNew = _v2.b;
					return _Utils_Tuple2(
						A5($miniBill$elm_fast_dict$FastDict$balance, nColor, nKey, nValue, newLeft, nRight),
						isNew);
				case 'EQ':
					return _Utils_Tuple2(dict, false);
				default:
					var _v3 = A3($miniBill$elm_fast_dict$FastDict$insertHelpNoReplace, key, value, nRight);
					var newRight = _v3.a;
					var isNew = _v3.b;
					return _Utils_Tuple2(
						A5($miniBill$elm_fast_dict$FastDict$balance, nColor, nKey, nValue, nLeft, newRight),
						isNew);
			}
		}
	});
var $miniBill$elm_fast_dict$FastDict$insertInnerNoReplace = F3(
	function (key, value, dict) {
		var _v0 = A3($miniBill$elm_fast_dict$FastDict$insertHelpNoReplace, key, value, dict);
		if ((_v0.a.$ === 'InnerNode') && (_v0.a.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var _v2 = _v1.a;
			var k = _v1.b;
			var v = _v1.c;
			var l = _v1.d;
			var r = _v1.e;
			var isNew = _v0.b;
			return _Utils_Tuple2(
				A5($miniBill$elm_fast_dict$Internal$InnerNode, $miniBill$elm_fast_dict$Internal$Black, k, v, l, r),
				isNew);
		} else {
			var x = _v0;
			return x;
		}
	});
var $miniBill$elm_fast_dict$FastDict$insertNoReplace = F3(
	function (key, value, _v0) {
		var sz = _v0.a;
		var dict = _v0.b;
		var _v1 = A3($miniBill$elm_fast_dict$FastDict$insertInnerNoReplace, key, value, dict);
		var result = _v1.a;
		var isNew = _v1.b;
		return isNew ? A2($miniBill$elm_fast_dict$Internal$Dict, sz + 1, result) : A2($miniBill$elm_fast_dict$Internal$Dict, sz, result);
	});
var $miniBill$elm_fast_dict$FastDict$union = F2(
	function (t1, t2) {
		var s1 = t1.a;
		var s2 = t2.a;
		return (_Utils_cmp(s1, s2) > 0) ? A3($miniBill$elm_fast_dict$FastDict$foldl, $miniBill$elm_fast_dict$FastDict$insertNoReplace, t1, t2) : A3($miniBill$elm_fast_dict$FastDict$foldl, $miniBill$elm_fast_dict$FastDict$insert, t2, t1);
	});
var $lue_bird$elm_state_interface_experimental$Node$interfaceBatch = function (interfaces) {
	return A3($elm$core$List$foldl, $miniBill$elm_fast_dict$FastDict$union, $miniBill$elm_fast_dict$FastDict$empty, interfaces);
};
var $lue_bird$elm_state_interface_experimental$Node$DirectoryMake = function (a) {
	return {$: 'DirectoryMake', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$DirectorySubPathsRequest = function (a) {
	return {$: 'DirectorySubPathsRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$Exit = function (a) {
	return {$: 'Exit', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$FileChangeListen = function (a) {
	return {$: 'FileChangeListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$FileInfoRequest = function (a) {
	return {$: 'FileInfoRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$FileRemove = function (a) {
	return {$: 'FileRemove', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$FileRequest = function (a) {
	return {$: 'FileRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$HttpRequestListen = function (a) {
	return {$: 'HttpRequestListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$HttpRequestSend = function (a) {
	return {$: 'HttpRequestSend', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$HttpResponseSend = function (a) {
	return {$: 'HttpResponseSend', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$LaunchArgumentsRequest = function (a) {
	return {$: 'LaunchArgumentsRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$ProcessTitleSet = function (a) {
	return {$: 'ProcessTitleSet', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$RandomUnsignedInt32sRequest = function (a) {
	return {$: 'RandomUnsignedInt32sRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$StandardErrWrite = function (a) {
	return {$: 'StandardErrWrite', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$StandardInListen = function (a) {
	return {$: 'StandardInListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$StandardInRawListen = function (a) {
	return {$: 'StandardInRawListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$StandardOutWrite = function (a) {
	return {$: 'StandardOutWrite', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TerminalSizeChangeListen = function (a) {
	return {$: 'TerminalSizeChangeListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TerminalSizeRequest = function (a) {
	return {$: 'TerminalSizeRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TimeOnce = function (a) {
	return {$: 'TimeOnce', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TimePeriodicallyListen = function (a) {
	return {$: 'TimePeriodicallyListen', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TimePosixRequest = function (a) {
	return {$: 'TimePosixRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TimezoneNameRequest = function (a) {
	return {$: 'TimezoneNameRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$TimezoneOffsetRequest = function (a) {
	return {$: 'TimezoneOffsetRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$WorkingDirectoryPathRequest = function (a) {
	return {$: 'WorkingDirectoryPathRequest', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleFutureMap = F2(
	function (futureChange, interfaceSingle) {
		switch (interfaceSingle.$) {
			case 'HttpRequestSend':
				var send = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$HttpRequestSend(
					{
						bodyUnsignedInt8s: send.bodyUnsignedInt8s,
						headers: send.headers,
						method: send.method,
						on: function (responseBytes) {
							return futureChange(
								send.on(responseBytes));
						},
						url: send.url
					});
			case 'HttpRequestListen':
				var listen = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$HttpRequestListen(
					{
						on: function (request) {
							return futureChange(
								listen.on(request));
						},
						portNumber: listen.portNumber
					});
			case 'HttpResponseSend':
				var send = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$HttpResponseSend(send);
			case 'TimePosixRequest':
				var requestTimeNow = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TimePosixRequest(
					function (event) {
						return futureChange(
							requestTimeNow(event));
					});
			case 'TimezoneOffsetRequest':
				var requestTimezone = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TimezoneOffsetRequest(
					function (event) {
						return futureChange(
							requestTimezone(event));
					});
			case 'TimezoneNameRequest':
				var requestTimezoneName = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TimezoneNameRequest(
					function (event) {
						return futureChange(
							requestTimezoneName(event));
					});
			case 'TimeOnce':
				var once = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TimeOnce(
					{
						on: function (event) {
							return futureChange(
								once.on(event));
						},
						pointInTime: once.pointInTime
					});
			case 'RandomUnsignedInt32sRequest':
				var request = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$RandomUnsignedInt32sRequest(
					{
						count: request.count,
						on: function (ints) {
							return futureChange(
								request.on(ints));
						}
					});
			case 'TimePeriodicallyListen':
				var periodicallyListen = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TimePeriodicallyListen(
					{
						intervalDurationMilliSeconds: periodicallyListen.intervalDurationMilliSeconds,
						on: function (posix) {
							return futureChange(
								periodicallyListen.on(posix));
						}
					});
			case 'Exit':
				var code = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$Exit(code);
			case 'DirectoryMake':
				var make = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$DirectoryMake(
					{
						on: function (result) {
							return futureChange(
								make.on(result));
						},
						path: make.path
					});
			case 'FileRemove':
				var path = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$FileRemove(path);
			case 'FileWrite':
				var write = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$FileWrite(write);
			case 'FileRequest':
				var request = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$FileRequest(
					{
						on: function (content) {
							return futureChange(
								request.on(content));
						},
						path: request.path
					});
			case 'FileChangeListen':
				var listen = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$FileChangeListen(
					{
						on: function (fileChange) {
							return futureChange(
								listen.on(fileChange));
						},
						path: listen.path
					});
			case 'FileInfoRequest':
				var request = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$FileInfoRequest(
					{
						on: function (info) {
							return futureChange(
								request.on(info));
						},
						path: request.path
					});
			case 'DirectorySubPathsRequest':
				var request = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$DirectorySubPathsRequest(
					{
						on: function (subNames) {
							return futureChange(
								request.on(subNames));
						},
						path: request.path
					});
			case 'WorkingDirectoryPathRequest':
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$WorkingDirectoryPathRequest(
					function (path) {
						return futureChange(
							on(path));
					});
			case 'LaunchArgumentsRequest':
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$LaunchArgumentsRequest(
					function (_arguments) {
						return futureChange(
							on(_arguments));
					});
			case 'TerminalSizeRequest':
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TerminalSizeRequest(
					function (size) {
						return futureChange(
							on(size));
					});
			case 'TerminalSizeChangeListen':
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$TerminalSizeChangeListen(
					function (size) {
						return futureChange(
							on(size));
					});
			case 'ProcessTitleSet':
				var newTitle = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$ProcessTitleSet(newTitle);
			case 'StandardOutWrite':
				var text = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$StandardOutWrite(text);
			case 'StandardErrWrite':
				var text = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$StandardErrWrite(text);
			case 'StandardInListen':
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$StandardInListen(
					function (size) {
						return futureChange(
							on(size));
					});
			default:
				var on = interfaceSingle.a;
				return $lue_bird$elm_state_interface_experimental$Node$StandardInRawListen(
					function (size) {
						return futureChange(
							on(size));
					});
		}
	});
var $miniBill$elm_fast_dict$FastDict$mapInner = F2(
	function (func, dict) {
		if (dict.$ === 'Leaf') {
			return $miniBill$elm_fast_dict$Internal$Leaf;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$miniBill$elm_fast_dict$Internal$InnerNode,
				color,
				key,
				A2(func, key, value),
				A2($miniBill$elm_fast_dict$FastDict$mapInner, func, left),
				A2($miniBill$elm_fast_dict$FastDict$mapInner, func, right));
		}
	});
var $miniBill$elm_fast_dict$FastDict$map = F2(
	function (func, _v0) {
		var sz = _v0.a;
		var dict = _v0.b;
		return A2(
			$miniBill$elm_fast_dict$Internal$Dict,
			sz,
			A2($miniBill$elm_fast_dict$FastDict$mapInner, func, dict));
	});
var $lue_bird$elm_state_interface_experimental$Node$interfaceFutureMap = F2(
	function (futureChange, _interface) {
		return A2(
			$miniBill$elm_fast_dict$FastDict$map,
			F2(
				function (_v0, interfaceSingle) {
					return A2($lue_bird$elm_state_interface_experimental$Node$interfaceSingleFutureMap, futureChange, interfaceSingle);
				}),
			_interface);
	});
var $lue_bird$elm_state_interface_experimental$Node$interfaceNone = $miniBill$elm_fast_dict$FastDict$empty;
var $lue_bird$elm_state_interface_experimental$Node$Add = function (a) {
	return {$: 'Add', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$variant = function (tagAndValue) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'tag',
				$elm$json$Json$Encode$string(tagAndValue.tag)),
				_Utils_Tuple2('value', tagAndValue.value)
			]));
};
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleEditToJson = function (edit) {
	return $lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$variant(
		function () {
			var ever = edit.a;
			return $elm$core$Basics$never(ever);
		}());
};
var $lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$nullable = F2(
	function (valueToJson, maybe) {
		if (maybe.$ === 'Nothing') {
			return $elm$json$Json$Encode$null;
		} else {
			var value = maybe.a;
			return valueToJson(value);
		}
	});
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleToJson = function (interfaceSingle) {
	return $lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$variant(
		function () {
			switch (interfaceSingle.$) {
				case 'HttpRequestSend':
					var send = interfaceSingle.a;
					return {
						tag: 'HttpRequestSend',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'url',
									$elm$json$Json$Encode$string(send.url)),
									_Utils_Tuple2(
									'method',
									$elm$json$Json$Encode$string(send.method)),
									_Utils_Tuple2(
									'headers',
									A2(
										$elm$json$Json$Encode$list,
										function (header) {
											return $elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'name',
														$elm$json$Json$Encode$string(header.name)),
														_Utils_Tuple2(
														'value',
														$elm$json$Json$Encode$string(header.value))
													]));
										},
										send.headers)),
									_Utils_Tuple2(
									'bodyUnsignedInt8s',
									A2(
										$lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$nullable,
										$elm$json$Json$Encode$list($elm$json$Json$Encode$int),
										send.bodyUnsignedInt8s))
								]))
					};
				case 'HttpRequestListen':
					var listen = interfaceSingle.a;
					return {
						tag: 'HttpRequestListen',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'port',
									$elm$json$Json$Encode$int(listen.portNumber))
								]))
					};
				case 'HttpResponseSend':
					var send = interfaceSingle.a;
					return {
						tag: 'HttpResponseSend',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'port',
									$elm$json$Json$Encode$int(send.portNumber)),
									_Utils_Tuple2(
									'statusCode',
									$elm$json$Json$Encode$int(send.statusCode)),
									_Utils_Tuple2(
									'headers',
									A2(
										$elm$json$Json$Encode$list,
										function (header) {
											return $elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'name',
														$elm$json$Json$Encode$string(header.name)),
														_Utils_Tuple2(
														'value',
														$elm$json$Json$Encode$string(header.value))
													]));
										},
										send.headers)),
									_Utils_Tuple2(
									'dataUnsignedInt8s',
									A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, send.dataUnsignedInt8s))
								]))
					};
				case 'TimePosixRequest':
					return {tag: 'TimePosixRequest', value: $elm$json$Json$Encode$null};
				case 'TimezoneOffsetRequest':
					return {tag: 'TimezoneOffsetRequest', value: $elm$json$Json$Encode$null};
				case 'TimezoneNameRequest':
					return {tag: 'TimezoneNameRequest', value: $elm$json$Json$Encode$null};
				case 'TimeOnce':
					var once = interfaceSingle.a;
					return {
						tag: 'TimeOnce',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'pointInTime',
									$elm$json$Json$Encode$int(
										$elm$time$Time$posixToMillis(once.pointInTime)))
								]))
					};
				case 'RandomUnsignedInt32sRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'RandomUnsignedInt32sRequest',
						value: $elm$json$Json$Encode$int(request.count)
					};
				case 'TimePeriodicallyListen':
					var intervalDuration = interfaceSingle.a;
					return {
						tag: 'TimePeriodicallyListen',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'milliSeconds',
									$elm$json$Json$Encode$int(intervalDuration.intervalDurationMilliSeconds))
								]))
					};
				case 'Exit':
					var code = interfaceSingle.a;
					return {
						tag: 'Exit',
						value: $elm$json$Json$Encode$int(code)
					};
				case 'DirectoryMake':
					var make = interfaceSingle.a;
					return {
						tag: 'DirectoryMake',
						value: $elm$json$Json$Encode$string(make.path)
					};
				case 'FileRemove':
					var path = interfaceSingle.a;
					return {
						tag: 'FileRemove',
						value: $elm$json$Json$Encode$string(path)
					};
				case 'FileWrite':
					var write = interfaceSingle.a;
					return {
						tag: 'FileWrite',
						value: $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'path',
									$elm$json$Json$Encode$string(write.path)),
									_Utils_Tuple2(
									'contentUnsignedInt8s',
									A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, write.contentUnsignedInt8s))
								]))
					};
				case 'FileRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'FileRequest',
						value: $elm$json$Json$Encode$string(request.path)
					};
				case 'FileChangeListen':
					var listen = interfaceSingle.a;
					return {
						tag: 'FileChangeListen',
						value: $elm$json$Json$Encode$string(listen.path)
					};
				case 'FileInfoRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'FileInfoRequest',
						value: $elm$json$Json$Encode$string(request.path)
					};
				case 'DirectorySubPathsRequest':
					var request = interfaceSingle.a;
					return {
						tag: 'DirectorySubPathsRequest',
						value: $elm$json$Json$Encode$string(request.path)
					};
				case 'WorkingDirectoryPathRequest':
					return {tag: 'WorkingDirectoryPathRequest', value: $elm$json$Json$Encode$null};
				case 'LaunchArgumentsRequest':
					return {tag: 'LaunchArgumentsRequest', value: $elm$json$Json$Encode$null};
				case 'TerminalSizeRequest':
					return {tag: 'TerminalSizeRequest', value: $elm$json$Json$Encode$null};
				case 'TerminalSizeChangeListen':
					return {tag: 'TerminalSizeChangeListen', value: $elm$json$Json$Encode$null};
				case 'ProcessTitleSet':
					var newTitle = interfaceSingle.a;
					return {
						tag: 'ProcessTitleSet',
						value: $elm$json$Json$Encode$string(newTitle)
					};
				case 'StandardOutWrite':
					var text = interfaceSingle.a;
					return {
						tag: 'StandardOutWrite',
						value: $elm$json$Json$Encode$string(text)
					};
				case 'StandardErrWrite':
					var text = interfaceSingle.a;
					return {
						tag: 'StandardErrWrite',
						value: $elm$json$Json$Encode$string(text)
					};
				case 'StandardInListen':
					return {tag: 'StandardInListen', value: $elm$json$Json$Encode$null};
				default:
					return {tag: 'StandardInRawListen', value: $elm$json$Json$Encode$null};
			}
		}());
};
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleDiffToJson = function (diff) {
	return $lue_bird$elm_state_interface_experimental$Json$Encode$LocalExtra$variant(
		function () {
			switch (diff.$) {
				case 'Add':
					var interfaceSingleInfo = diff.a;
					return {
						tag: 'Add',
						value: $lue_bird$elm_state_interface_experimental$Node$interfaceSingleToJson(interfaceSingleInfo)
					};
				case 'Edit':
					var edit = diff.a;
					return {
						tag: 'Edit',
						value: $lue_bird$elm_state_interface_experimental$Node$interfaceSingleEditToJson(edit)
					};
				default:
					return {tag: 'Remove', value: $elm$json$Json$Encode$null};
			}
		}());
};
var $lue_bird$elm_state_interface_experimental$Node$toJsToJson = function (toJs) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$string(toJs.id)),
				_Utils_Tuple2(
				'diff',
				$lue_bird$elm_state_interface_experimental$Node$interfaceSingleDiffToJson(toJs.diff))
			]));
};
var $lue_bird$elm_state_interface_experimental$Node$programInit = function (appConfig) {
	var initialInterface = appConfig._interface(appConfig.initialState);
	return _Utils_Tuple2(
		$lue_bird$elm_state_interface_experimental$Node$State(
			{appState: appConfig.initialState, _interface: initialInterface}),
		$elm$core$Platform$Cmd$batch(
			A3(
				$miniBill$elm_fast_dict$FastDict$foldl,
				F3(
					function (id, _new, soFar) {
						return A2(
							$elm$core$List$cons,
							appConfig.ports.toJs(
								$lue_bird$elm_state_interface_experimental$Node$toJsToJson(
									{
										diff: $lue_bird$elm_state_interface_experimental$Node$Add(_new),
										id: id
									})),
							soFar);
					}),
				_List_Nil,
				initialInterface)));
};
var $lue_bird$elm_state_interface_experimental$Node$JsEventEnabledConstructionOfNewAppState = function (a) {
	return {$: 'JsEventEnabledConstructionOfNewAppState', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$JsEventFailedToDecode = function (a) {
	return {$: 'JsEventFailedToDecode', a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $miniBill$elm_fast_dict$FastDict$getInner = F2(
	function (targetKey, dict) {
		getInner:
		while (true) {
			if (dict.$ === 'Leaf') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue getInner;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue getInner;
				}
			}
		}
	});
var $miniBill$elm_fast_dict$FastDict$get = F2(
	function (targetKey, _v0) {
		var dict = _v0.b;
		return A2($miniBill$elm_fast_dict$FastDict$getInner, targetKey, dict);
	});
var $lue_bird$elm_state_interface_experimental$Node$FileAddedOrChanged = function (a) {
	return {$: 'FileAddedOrChanged', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$FileRemoved = function (a) {
	return {$: 'FileRemoved', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$KindDirectory = {$: 'KindDirectory'};
var $lue_bird$elm_state_interface_experimental$Node$KindFile = {$: 'KindFile'};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$onlyString = function (specificAllowedString) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (str) {
			return _Utils_eq(str, specificAllowedString) ? $elm$json$Json$Decode$succeed(_Utils_Tuple0) : $elm$json$Json$Decode$fail(
				$elm$core$String$concat(
					_List_fromArray(
						['expected only \"', specificAllowedString, '\"'])));
		},
		$elm$json$Json$Decode$string);
};
var $lue_bird$elm_state_interface_experimental$Node$fileKindJsonDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			function (_v0) {
				return $lue_bird$elm_state_interface_experimental$Node$KindFile;
			},
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$onlyString('File')),
			A2(
			$elm$json$Json$Decode$map,
			function (_v1) {
				return $lue_bird$elm_state_interface_experimental$Node$KindDirectory;
			},
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$onlyString('Directory'))
		]));
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 'Seq', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 'U8', a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$fromUnsignedInt8List = function (uint8s) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			A2($elm$core$List$map, $elm$bytes$Bytes$Encode$unsignedInt8, uint8s)));
};
var $lue_bird$elm_state_interface_experimental$Node$HttpBadUrl = {$: 'HttpBadUrl'};
var $lue_bird$elm_state_interface_experimental$Node$HttpNetworkError = function (a) {
	return {$: 'HttpNetworkError', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$httpErrorJsonDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			function (_v0) {
				return $lue_bird$elm_state_interface_experimental$Node$HttpBadUrl;
			},
			A2(
				$elm$json$Json$Decode$field,
				'cause',
				A2(
					$elm$json$Json$Decode$field,
					'code',
					$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$onlyString('BAD_URL')))),
			A2(
			$elm$json$Json$Decode$map,
			$lue_bird$elm_state_interface_experimental$Node$HttpNetworkError,
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
						$elm$json$Json$Decode$succeed('')
					])))
		]));
var $lue_bird$elm_state_interface_experimental$Node$HttpRequestReceived = function (a) {
	return {$: 'HttpRequestReceived', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$HttpResponseSent = {$: 'HttpResponseSent'};
var $lue_bird$elm_state_interface_experimental$Node$HttpServerFailed = function (a) {
	return {$: 'HttpServerFailed', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$HttpServerOpened = {$: 'HttpServerOpened'};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant = F2(
	function (name, valueJsonDecoder) {
		return A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (_v0, variantValue) {
					return variantValue;
				}),
			A2(
				$elm$json$Json$Decode$field,
				'tag',
				$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$onlyString(name)),
			A2($elm$json$Json$Decode$field, 'value', valueJsonDecoder));
	});
var $lue_bird$elm_state_interface_experimental$Node$httpServerEventJsonDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
			'HttpServerOpened',
			$elm$json$Json$Decode$null($lue_bird$elm_state_interface_experimental$Node$HttpServerOpened)),
			A2(
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
			'HttpRequestReceived',
			A4(
				$elm$json$Json$Decode$map3,
				F3(
					function (method, headers, data) {
						return $lue_bird$elm_state_interface_experimental$Node$HttpRequestReceived(
							{data: data, headers: headers, method: method});
					}),
				A2($elm$json$Json$Decode$field, 'method', $elm$json$Json$Decode$string),
				A2(
					$elm$json$Json$Decode$field,
					'headers',
					$elm$json$Json$Decode$list(
						A3(
							$elm$json$Json$Decode$map2,
							F2(
								function (name, value) {
									return {name: name, value: value};
								}),
							A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
							A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string)))),
				A2(
					$elm$json$Json$Decode$field,
					'data',
					A2(
						$elm$json$Json$Decode$map,
						$lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$fromUnsignedInt8List,
						$elm$json$Json$Decode$list($elm$json$Json$Decode$int))))),
			A2(
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
			'HttpResponseSent',
			$elm$json$Json$Decode$null($lue_bird$elm_state_interface_experimental$Node$HttpResponseSent)),
			A2(
			$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
			'HttpServerFailed',
			A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (code, message) {
						return $lue_bird$elm_state_interface_experimental$Node$HttpServerFailed(
							{code: code, message: message});
					}),
				A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
				A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string)))
		]));
var $lue_bird$elm_state_interface_experimental$Node$HttpBadStatus = function (a) {
	return {$: 'HttpBadStatus', a: a};
};
var $elm$core$Basics$ge = _Utils_ge;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $lue_bird$elm_state_interface_experimental$Node$httpResponseJsonDecoder = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (statusCode, statusText, headers, body) {
			return {body: body, headers: headers, statusCode: statusCode, statusText: statusText};
		}),
	A2($elm$json$Json$Decode$field, 'statusCode', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'statusText', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'headers',
		$elm$json$Json$Decode$list(
			A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (name, value) {
						return {name: name, value: value};
					}),
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
				A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string)))),
	A2(
		$elm$json$Json$Decode$field,
		'bodyUnsignedInt8s',
		A2(
			$elm$json$Json$Decode$map,
			$lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$fromUnsignedInt8List,
			$elm$json$Json$Decode$list($elm$json$Json$Decode$int))));
var $lue_bird$elm_state_interface_experimental$Node$httpSuccessResponseJsonDecoder = A2(
	$elm$json$Json$Decode$map,
	function (response) {
		return ((response.statusCode >= 200) && (response.statusCode < 300)) ? $elm$core$Result$Ok(response.body) : $elm$core$Result$Err(
			$lue_bird$elm_state_interface_experimental$Node$HttpBadStatus(response));
	},
	$lue_bird$elm_state_interface_experimental$Node$httpResponseJsonDecoder);
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixJsonDecoder = A2($elm$json$Json$Decode$map, $elm$time$Time$millisToPosix, $elm$json$Json$Decode$int);
var $lue_bird$elm_state_interface_experimental$Node$terminalSizeJsonDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (lines, columns) {
			return {columns: columns, lines: lines};
		}),
	A2($elm$json$Json$Decode$field, 'lines', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'columns', $elm$json$Json$Decode$int));
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleFutureJsonDecoder = function (_interface) {
	switch (_interface.$) {
		case 'HttpRequestSend':
			var send = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					send.on,
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								A2($lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant, 'Success', $lue_bird$elm_state_interface_experimental$Node$httpSuccessResponseJsonDecoder),
								A2(
								$elm$json$Json$Decode$map,
								$elm$core$Result$Err,
								A2($lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant, 'Error', $lue_bird$elm_state_interface_experimental$Node$httpErrorJsonDecoder))
							]))));
		case 'HttpRequestListen':
			var listen = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, listen.on, $lue_bird$elm_state_interface_experimental$Node$httpServerEventJsonDecoder));
		case 'HttpResponseSend':
			return $elm$core$Maybe$Nothing;
		case 'TimePosixRequest':
			var toFuture = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, toFuture, $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixJsonDecoder));
		case 'TimezoneOffsetRequest':
			var toFuture = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, toFuture, $elm$json$Json$Decode$int));
		case 'TimePeriodicallyListen':
			var periodicallyListen = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, periodicallyListen.on, $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixJsonDecoder));
		case 'TimeOnce':
			var once = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, once.on, $lue_bird$elm_state_interface_experimental$Time$LocalExtra$posixJsonDecoder));
		case 'TimezoneNameRequest':
			var toFuture = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, toFuture, $elm$json$Json$Decode$string));
		case 'RandomUnsignedInt32sRequest':
			var request = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					request.on,
					$elm$json$Json$Decode$list($elm$json$Json$Decode$int)));
		case 'Exit':
			return $elm$core$Maybe$Nothing;
		case 'DirectoryMake':
			var make = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					make.on,
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Ok',
								$elm$json$Json$Decode$null(
									$elm$core$Result$Ok(_Utils_Tuple0))),
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Err',
								A3(
									$elm$json$Json$Decode$map2,
									F2(
										function (code, message) {
											return $elm$core$Result$Err(
												{code: code, message: message});
										}),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											])),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											]))))
							]))));
		case 'FileRemove':
			return $elm$core$Maybe$Nothing;
		case 'FileWrite':
			return $elm$core$Maybe$Nothing;
		case 'FileRequest':
			var request = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					request.on,
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Ok',
								A2(
									$elm$json$Json$Decode$map,
									$elm$core$Result$Ok,
									A2(
										$elm$json$Json$Decode$map,
										$lue_bird$elm_state_interface_experimental$Bytes$LocalExtra$fromUnsignedInt8List,
										$elm$json$Json$Decode$list($elm$json$Json$Decode$int)))),
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Err',
								A3(
									$elm$json$Json$Decode$map2,
									F2(
										function (code, message) {
											return $elm$core$Result$Err(
												{code: code, message: message});
										}),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											])),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											]))))
							]))));
		case 'FileChangeListen':
			var listen = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					listen.on,
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Removed',
								A2($elm$json$Json$Decode$map, $lue_bird$elm_state_interface_experimental$Node$FileRemoved, $elm$json$Json$Decode$string)),
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'AddedOrChanged',
								A2($elm$json$Json$Decode$map, $lue_bird$elm_state_interface_experimental$Node$FileAddedOrChanged, $elm$json$Json$Decode$string))
							]))));
		case 'FileInfoRequest':
			var request = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					request.on,
					$elm$json$Json$Decode$nullable(
						A4(
							$elm$json$Json$Decode$map3,
							F3(
								function (kind, byteCount, lastContentChangeTime) {
									return {byteCount: byteCount, kind: kind, lastContentChangeTime: lastContentChangeTime};
								}),
							A2($elm$json$Json$Decode$field, 'kind', $lue_bird$elm_state_interface_experimental$Node$fileKindJsonDecoder),
							A2($elm$json$Json$Decode$field, 'byteCount', $elm$json$Json$Decode$int),
							A2(
								$elm$json$Json$Decode$field,
								'lastContentChangePosixMilliseconds',
								A2($elm$json$Json$Decode$map, $elm$time$Time$millisToPosix, $elm$json$Json$Decode$int))))));
		case 'DirectorySubPathsRequest':
			var request = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					request.on,
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Ok',
								A2(
									$elm$json$Json$Decode$map,
									$elm$core$Result$Ok,
									$elm$json$Json$Decode$list($elm$json$Json$Decode$string))),
								A2(
								$lue_bird$elm_state_interface_experimental$Json$Decode$LocalExtra$variant,
								'Err',
								A3(
									$elm$json$Json$Decode$map2,
									F2(
										function (code, message) {
											return $elm$core$Result$Err(
												{code: code, message: message});
										}),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											])),
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[
												A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed('')
											]))))
							]))));
		case 'WorkingDirectoryPathRequest':
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, on, $elm$json$Json$Decode$string));
		case 'LaunchArgumentsRequest':
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$json$Json$Decode$map,
					on,
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
		case 'TerminalSizeRequest':
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, on, $lue_bird$elm_state_interface_experimental$Node$terminalSizeJsonDecoder));
		case 'TerminalSizeChangeListen':
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, on, $lue_bird$elm_state_interface_experimental$Node$terminalSizeJsonDecoder));
		case 'ProcessTitleSet':
			return $elm$core$Maybe$Nothing;
		case 'StandardOutWrite':
			return $elm$core$Maybe$Nothing;
		case 'StandardErrWrite':
			return $elm$core$Maybe$Nothing;
		case 'StandardInListen':
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, on, $elm$json$Json$Decode$string));
		default:
			var on = _interface.a;
			return $elm$core$Maybe$Just(
				A2($elm$json$Json$Decode$map, on, $elm$json$Json$Decode$string));
	}
};
var $miniBill$elm_fast_dict$FastDict$foldrInner = F3(
	function (func, acc, t) {
		foldrInner:
		while (true) {
			if (t.$ === 'Leaf') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($miniBill$elm_fast_dict$FastDict$foldrInner, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldrInner;
			}
		}
	});
var $miniBill$elm_fast_dict$FastDict$foldr = F3(
	function (func, acc, _v0) {
		var dict = _v0.b;
		return A3($miniBill$elm_fast_dict$FastDict$foldrInner, func, acc, dict);
	});
var $miniBill$elm_fast_dict$FastDict$toList = function (dict) {
	return A3(
		$miniBill$elm_fast_dict$FastDict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $lue_bird$elm_state_interface_experimental$Result$LocalExtra$valueOrOnError = F2(
	function (errorToValue, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return value;
		} else {
			var error = result.a;
			return errorToValue(error);
		}
	});
var $lue_bird$elm_state_interface_experimental$Node$programSubscriptions = F2(
	function (appConfig, _v0) {
		var state = _v0.a;
		return appConfig.ports.fromJs(
			function (interfaceJson) {
				return A2(
					$lue_bird$elm_state_interface_experimental$Result$LocalExtra$valueOrOnError,
					$lue_bird$elm_state_interface_experimental$Node$JsEventFailedToDecode,
					A2(
						$elm$json$Json$Decode$decodeValue,
						A2(
							$elm$json$Json$Decode$map,
							$lue_bird$elm_state_interface_experimental$Node$JsEventEnabledConstructionOfNewAppState,
							A2(
								$elm$json$Json$Decode$andThen,
								function (originalInterfaceId) {
									var _v1 = A2($miniBill$elm_fast_dict$FastDict$get, originalInterfaceId, state._interface);
									if (_v1.$ === 'Just') {
										var interfaceSingleAcceptingFuture = _v1.a;
										var _v2 = $lue_bird$elm_state_interface_experimental$Node$interfaceSingleFutureJsonDecoder(interfaceSingleAcceptingFuture);
										if (_v2.$ === 'Just') {
											var eventDataDecoder = _v2.a;
											return A2($elm$json$Json$Decode$field, 'eventData', eventDataDecoder);
										} else {
											return $elm$json$Json$Decode$fail('interface did not expect any events');
										}
									} else {
										return $elm$json$Json$Decode$fail(
											'no associated interface found among ids\n' + A2(
												$elm$core$String$join,
												'\n',
												A2(
													$elm$core$List$map,
													$elm$core$Tuple$first,
													$miniBill$elm_fast_dict$FastDict$toList(state._interface))));
									}
								},
								A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string))),
						interfaceJson));
			});
	});
var $lue_bird$elm_state_interface_experimental$Node$Edit = function (a) {
	return {$: 'Edit', a: a};
};
var $lue_bird$elm_state_interface_experimental$List$LocalExtra$appendFast = F2(
	function (listA, listB) {
		appendFast:
		while (true) {
			if (!listA.b) {
				return listB;
			} else {
				var x = listA.a;
				var xs = listA.b;
				var $temp$listA = xs,
					$temp$listB = A2($elm$core$List$cons, x, listB);
				listA = $temp$listA;
				listB = $temp$listB;
				continue appendFast;
			}
		}
	});
var $lue_bird$elm_state_interface_experimental$Node$interfaceSingleEditsMap = F2(
	function (fromSingeEdit, interfaces) {
		var _v0 = interfaces.old;
		switch (_v0.$) {
			case 'HttpRequestSend':
				return _List_Nil;
			case 'HttpRequestListen':
				return _List_Nil;
			case 'HttpResponseSend':
				return _List_Nil;
			case 'TimePosixRequest':
				return _List_Nil;
			case 'TimezoneOffsetRequest':
				return _List_Nil;
			case 'TimeOnce':
				return _List_Nil;
			case 'TimePeriodicallyListen':
				return _List_Nil;
			case 'TimezoneNameRequest':
				return _List_Nil;
			case 'RandomUnsignedInt32sRequest':
				return _List_Nil;
			case 'Exit':
				return _List_Nil;
			case 'DirectoryMake':
				return _List_Nil;
			case 'FileRemove':
				return _List_Nil;
			case 'FileWrite':
				return _List_Nil;
			case 'FileChangeListen':
				return _List_Nil;
			case 'FileRequest':
				return _List_Nil;
			case 'FileInfoRequest':
				return _List_Nil;
			case 'DirectorySubPathsRequest':
				return _List_Nil;
			case 'WorkingDirectoryPathRequest':
				return _List_Nil;
			case 'LaunchArgumentsRequest':
				return _List_Nil;
			case 'TerminalSizeRequest':
				return _List_Nil;
			case 'TerminalSizeChangeListen':
				return _List_Nil;
			case 'ProcessTitleSet':
				return _List_Nil;
			case 'StandardOutWrite':
				return _List_Nil;
			case 'StandardErrWrite':
				return _List_Nil;
			case 'StandardInListen':
				return _List_Nil;
			default:
				return _List_Nil;
		}
	});
var $miniBill$elm_fast_dict$FastDict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$miniBill$elm_fast_dict$FastDict$foldl,
			stepState,
			_Utils_Tuple2(
				$miniBill$elm_fast_dict$FastDict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $lue_bird$elm_state_interface_experimental$Node$Remove = function (a) {
	return {$: 'Remove', a: a};
};
var $lue_bird$elm_state_interface_experimental$Node$remove = $lue_bird$elm_state_interface_experimental$Node$Remove(_Utils_Tuple0);
var $lue_bird$elm_state_interface_experimental$Node$interfacesDiffMap = F2(
	function (idAndDiffCombine, interfaces) {
		return A6(
			$miniBill$elm_fast_dict$FastDict$merge,
			F3(
				function (removedId, _v0, soFar) {
					return A2(
						$elm$core$List$cons,
						idAndDiffCombine(
							{diff: $lue_bird$elm_state_interface_experimental$Node$remove, id: removedId}),
						soFar);
				}),
			F4(
				function (id, old, updated, soFar) {
					return A2(
						$lue_bird$elm_state_interface_experimental$List$LocalExtra$appendFast,
						A2(
							$lue_bird$elm_state_interface_experimental$Node$interfaceSingleEditsMap,
							function (edit) {
								return idAndDiffCombine(
									{
										diff: $lue_bird$elm_state_interface_experimental$Node$Edit(edit),
										id: id
									});
							},
							{old: old, updated: updated}),
						soFar);
				}),
			F3(
				function (addedId, onlyNew, soFar) {
					return A2(
						$elm$core$List$cons,
						idAndDiffCombine(
							{
								diff: $lue_bird$elm_state_interface_experimental$Node$Add(onlyNew),
								id: addedId
							}),
						soFar);
				}),
			interfaces.old,
			interfaces.updated,
			_List_Nil);
	});
var $lue_bird$elm_state_interface_experimental$Node$programUpdate = F3(
	function (appConfig, event, state) {
		if (event.$ === 'JsEventFailedToDecode') {
			var jsonError = event.a;
			return _Utils_Tuple2(
				state,
				function () {
					var notifyOfBugInterface = $lue_bird$elm_state_interface_experimental$Node$StandardErrWrite(
						$elm$core$String$concat(
							_List_fromArray(
								[
									'bug: js event failed to decode: ',
									$elm$json$Json$Decode$errorToString(jsonError),
									'. Please open an issue on github.com/lue-bird/elm-state-interface-experimental\n'
								])));
					return appConfig.ports.toJs(
						$lue_bird$elm_state_interface_experimental$Node$toJsToJson(
							{
								diff: $lue_bird$elm_state_interface_experimental$Node$Add(notifyOfBugInterface),
								id: $lue_bird$elm_state_interface_experimental$StructuredId$toString(
									$lue_bird$elm_state_interface_experimental$Node$interfaceSingleToStructuredId(notifyOfBugInterface))
							}));
				}());
		} else {
			var updatedAppState = event.a;
			var updatedInterface = appConfig._interface(updatedAppState);
			var _v1 = state;
			var oldState = _v1.a;
			return _Utils_Tuple2(
				$lue_bird$elm_state_interface_experimental$Node$State(
					{appState: updatedAppState, _interface: updatedInterface}),
				$elm$core$Platform$Cmd$batch(
					A2(
						$lue_bird$elm_state_interface_experimental$Node$interfacesDiffMap,
						function (diff) {
							return appConfig.ports.toJs(
								$lue_bird$elm_state_interface_experimental$Node$toJsToJson(diff));
						},
						{old: oldState._interface, updated: updatedInterface})));
		}
	});
var $elm$core$Platform$worker = _Platform_worker;
var $lue_bird$elm_state_interface_experimental$Node$program = function (appConfig) {
	return $elm$core$Platform$worker(
		{
			init: function (_v0) {
				return $lue_bird$elm_state_interface_experimental$Node$programInit(appConfig);
			},
			subscriptions: function (state) {
				return A2($lue_bird$elm_state_interface_experimental$Node$programSubscriptions, appConfig, state);
			},
			update: F2(
				function (event, state) {
					return A3($lue_bird$elm_state_interface_experimental$Node$programUpdate, appConfig, event, state);
				})
		});
};
var $author$project$Articles$Paragraph = function (a) {
	return {$: 'Paragraph', a: a};
};
var $author$project$Articles$Sequence = function (a) {
	return {$: 'Sequence', a: a};
};
var $author$project$Articles$Text = function (a) {
	return {$: 'Text', a: a};
};
var $author$project$Articles$InlineElmCode = function (a) {
	return {$: 'InlineElmCode', a: a};
};
var $author$project$Articles$Link = function (a) {
	return {$: 'Link', a: a};
};
var $author$project$Articles$Published = function (a) {
	return {$: 'Published', a: a};
};
var $author$project$Articles$Section = function (a) {
	return {$: 'Section', a: a};
};
var $author$project$ElmSyntaxHighlight$Type = {$: 'Type'};
var $author$project$Articles$ElmCode = function (a) {
	return {$: 'ElmCode', a: a};
};
var $elm_community$list_extra$List$Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					var $temp$predicate = predicate,
						$temp$list = xs;
					predicate = $temp$predicate;
					list = $temp$list;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm_community$list_extra$List$Extra$dropWhileRight = function (p) {
	return A2(
		$elm$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && $elm$core$List$isEmpty(xs)) ? _List_Nil : A2($elm$core$List$cons, x, xs);
			}),
		_List_Nil);
};
var $author$project$ElmSyntaxHighlight$DeclarationRelated = {$: 'DeclarationRelated'};
var $author$project$ElmSyntaxHighlight$Variable = {$: 'Variable'};
var $author$project$ElmSyntaxHighlight$Variant = {$: 'Variant'};
var $author$project$RangeDict$RangeDict = function (a) {
	return {$: 'RangeDict', a: a};
};
var $author$project$RangeDict$empty = $author$project$RangeDict$RangeDict($miniBill$elm_fast_dict$FastDict$empty);
var $author$project$ElmSyntaxHighlight$Field = {$: 'Field'};
var $author$project$ElmSyntaxHighlight$Flow = {$: 'Flow'};
var $stil4m$elm_syntax$Elm$Syntax$Node$Node = F2(
	function (a, b) {
		return {$: 'Node', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$empty = {
	end: {column: 0, row: 0},
	start: {column: 0, row: 0}
};
var $author$project$RangeDict$rangeToComparable = function (range) {
	return _Utils_Tuple2(
		_Utils_Tuple2(range.start.row, range.start.column),
		_Utils_Tuple2(range.end.row, range.end.column));
};
var $author$project$RangeDict$insert = F3(
	function (range, value, _v0) {
		var rangeDict = _v0.a;
		return $author$project$RangeDict$RangeDict(
			A3(
				$miniBill$elm_fast_dict$FastDict$insert,
				$author$project$RangeDict$rangeToComparable(range),
				value,
				rangeDict));
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $author$project$ElmSyntaxHighlight$nameIsUppercase = function (string) {
	var _v0 = $elm$core$String$uncons(string);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var firstChar = _v1.a;
		return $elm$core$Char$isUpper(firstChar);
	} else {
		return false;
	}
};
var $author$project$ElmSyntaxHighlight$locationAddColumn = function (columnPlus) {
	return function (location) {
		return _Utils_update(
			location,
			{column: location.column + columnPlus});
	};
};
var $author$project$RangeDict$mapFromList = F2(
	function (toAssociation, list) {
		return $author$project$RangeDict$RangeDict(
			A3(
				$elm$core$List$foldl,
				F2(
					function (element, acc) {
						var _v0 = toAssociation(element);
						var range = _v0.a;
						var v = _v0.b;
						return A3(
							$miniBill$elm_fast_dict$FastDict$insert,
							$author$project$RangeDict$rangeToComparable(range),
							v,
							acc);
					}),
				$miniBill$elm_fast_dict$FastDict$empty,
				list));
	});
var $elm$core$String$length = _String_length;
var $author$project$ElmSyntaxHighlight$qualifiedRangeLength = function (_v0) {
	var moduleName = _v0.a;
	var name = _v0.b;
	if (!moduleName.b) {
		return $elm$core$String$length(name);
	} else {
		var moduleNamePart0 = moduleName.a;
		var moduleNamePart1Up = moduleName.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (part, soFar) {
					return soFar + $elm$core$String$length(part);
				}),
			($elm$core$String$length(moduleNamePart0) + 1) + $elm$core$String$length(name),
			moduleNamePart1Up);
	}
};
var $author$project$ElmSyntaxHighlight$ModuleNameOrAlias = {$: 'ModuleNameOrAlias'};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$RangeDict$singleton = F2(
	function (range, value) {
		return $author$project$RangeDict$RangeDict(
			A2(
				$miniBill$elm_fast_dict$FastDict$singleton,
				$author$project$RangeDict$rangeToComparable(range),
				value));
	});
var $author$project$ElmSyntaxHighlight$qualifiedSyntaxKindMap = function (kind) {
	return function (_v0) {
		var qualifiedRange = _v0.a;
		var _v1 = _v0.b;
		var qualification = _v1.a;
		var name = _v1.b;
		if (!qualification.b) {
			return A2($author$project$RangeDict$singleton, qualifiedRange, kind);
		} else {
			return A3(
				$author$project$RangeDict$insert,
				{
					end: qualifiedRange.end,
					start: A2(
						$author$project$ElmSyntaxHighlight$locationAddColumn,
						-$elm$core$String$length(name),
						qualifiedRange.end)
				},
				kind,
				A3(
					$author$project$RangeDict$insert,
					{
						end: A2(
							$author$project$ElmSyntaxHighlight$locationAddColumn,
							-$elm$core$String$length(name),
							qualifiedRange.end),
						start: qualifiedRange.start
					},
					$author$project$ElmSyntaxHighlight$ModuleNameOrAlias,
					$author$project$RangeDict$empty));
		}
	};
};
var $author$project$RangeDict$union = F2(
	function (_v0, _v1) {
		var aRangeDict = _v0.a;
		var bRangeDict = _v1.a;
		return $author$project$RangeDict$RangeDict(
			A2($miniBill$elm_fast_dict$FastDict$union, aRangeDict, bRangeDict));
	});
var $author$project$RangeDict$unionFromListMap = function (elementToDict) {
	return function (list) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (el, soFar) {
					return A2(
						$author$project$RangeDict$union,
						elementToDict(el),
						soFar);
				}),
			$author$project$RangeDict$empty,
			list);
	};
};
function $author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap() {
	return function (_v0) {
		var patternRange = _v0.a;
		var pattern = _v0.b;
		switch (pattern.$) {
			case 'AllPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variable);
			case 'VarPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variable);
			case 'UnitPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'CharPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'StringPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'IntPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'HexPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'FloatPattern':
				return A2($author$project$RangeDict$singleton, patternRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'TuplePattern':
				var parts = pattern.a;
				return A2(
					$author$project$RangeDict$unionFromListMap,
					$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap(),
					parts);
			case 'RecordPattern':
				var fieldVariables = pattern.a;
				return A2(
					$author$project$RangeDict$mapFromList,
					function (_v2) {
						var variableRange = _v2.a;
						return _Utils_Tuple2(variableRange, $author$project$ElmSyntaxHighlight$Variable);
					},
					fieldVariables);
			case 'UnConsPattern':
				var head = pattern.a;
				var tail = pattern.b;
				return A2(
					$author$project$RangeDict$union,
					$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap()(head),
					$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap()(tail));
			case 'ListPattern':
				var elements = pattern.a;
				return A2(
					$author$project$RangeDict$unionFromListMap,
					$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap(),
					elements);
			case 'NamedPattern':
				var qualifiedRecord = pattern.a;
				var _arguments = pattern.b;
				var qualified = _Utils_Tuple2(qualifiedRecord.moduleName, qualifiedRecord.name);
				return A2(
					$author$project$RangeDict$union,
					A2(
						$author$project$ElmSyntaxHighlight$qualifiedSyntaxKindMap,
						$author$project$ElmSyntaxHighlight$Variant,
						A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: A2(
									$author$project$ElmSyntaxHighlight$locationAddColumn,
									$author$project$ElmSyntaxHighlight$qualifiedRangeLength(qualified),
									patternRange.start),
								start: patternRange.start
							},
							qualified)),
					A2(
						$author$project$RangeDict$unionFromListMap,
						$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap(),
						_arguments));
			case 'AsPattern':
				var inner = pattern.a;
				var _v3 = pattern.b;
				var variableRange = _v3.a;
				return A3(
					$author$project$RangeDict$insert,
					variableRange,
					$author$project$ElmSyntaxHighlight$Variable,
					$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap()(inner));
			default:
				var inner = pattern.a;
				return $author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap()(inner);
		}
	};
}
try {
	var $author$project$ElmSyntaxHighlight$patternSyntaxKindMap = $author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap();
	$author$project$ElmSyntaxHighlight$cyclic$patternSyntaxKindMap = function () {
		return $author$project$ElmSyntaxHighlight$patternSyntaxKindMap;
	};
} catch ($) {
	throw 'Some top-level definitions from `ElmSyntaxHighlight` are causing infinite recursion:\n\n  ┌─────┐\n  │    patternSyntaxKindMap\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$Elm$Syntax$Node$range = function (_v0) {
	var r = _v0.a;
	return r;
};
function $author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap() {
	return function (_v0) {
		var typeRange = _v0.a;
		var type_ = _v0.b;
		switch (type_.$) {
			case 'GenericType':
				return A2($author$project$RangeDict$singleton, typeRange, $author$project$ElmSyntaxHighlight$Variable);
			case 'Typed':
				var qualified = type_.a;
				var _arguments = type_.b;
				return A2(
					$author$project$RangeDict$union,
					A2($author$project$ElmSyntaxHighlight$qualifiedSyntaxKindMap, $author$project$ElmSyntaxHighlight$Type, qualified),
					A2(
						$author$project$RangeDict$unionFromListMap,
						$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap(),
						_arguments));
			case 'Unit':
				return A2($author$project$RangeDict$singleton, typeRange, $author$project$ElmSyntaxHighlight$Type);
			case 'Tupled':
				var parts = type_.a;
				return A2(
					$author$project$RangeDict$unionFromListMap,
					$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap(),
					parts);
			case 'Record':
				var fields = type_.a;
				return A2(
					$author$project$RangeDict$unionFromListMap,
					function (_v2) {
						var _v3 = _v2.b;
						var _v4 = _v3.a;
						var fieldNameRange = _v4.a;
						var field = _v3.b;
						return A3(
							$author$project$RangeDict$insert,
							fieldNameRange,
							$author$project$ElmSyntaxHighlight$Field,
							$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap()(field));
					},
					fields);
			case 'GenericRecord':
				var _v5 = type_.a;
				var variableRange = _v5.a;
				var _v6 = type_.b;
				var additionalFields = _v6.b;
				return A3(
					$author$project$RangeDict$insert,
					variableRange,
					$author$project$ElmSyntaxHighlight$Variable,
					A2(
						$author$project$RangeDict$unionFromListMap,
						function (_v7) {
							var _v8 = _v7.b;
							var field = _v8.b;
							return $author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap()(field);
						},
						additionalFields));
			default:
				var input = type_.a;
				var output = type_.b;
				return A2(
					$author$project$RangeDict$union,
					$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap()(input),
					$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap()(output));
		}
	};
}
try {
	var $author$project$ElmSyntaxHighlight$typeAnnotationSyntaxKindMap = $author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap();
	$author$project$ElmSyntaxHighlight$cyclic$typeAnnotationSyntaxKindMap = function () {
		return $author$project$ElmSyntaxHighlight$typeAnnotationSyntaxKindMap;
	};
} catch ($) {
	throw 'Some top-level definitions from `ElmSyntaxHighlight` are causing infinite recursion:\n\n  ┌─────┐\n  │    typeAnnotationSyntaxKindMap\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$ElmSyntaxHighlight$signatureSyntaxKindMap = function (signature) {
	return A3(
		$author$project$RangeDict$insert,
		$stil4m$elm_syntax$Elm$Syntax$Node$range(signature.name),
		$author$project$ElmSyntaxHighlight$Variable,
		$author$project$ElmSyntaxHighlight$typeAnnotationSyntaxKindMap(signature.typeAnnotation));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findMap = F2(
	function (f, list) {
		findMap:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var a = list.a;
				var tail = list.b;
				var _v1 = f(a);
				if (_v1.$ === 'Just') {
					var b = _v1.a;
					return $elm$core$Maybe$Just(b);
				} else {
					var $temp$f = f,
						$temp$list = tail;
					f = $temp$f;
					list = $temp$list;
					continue findMap;
				}
			}
		}
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$compareLocations = F2(
	function (left, right) {
		return (_Utils_cmp(left.row, right.row) < 0) ? $elm$core$Basics$LT : ((_Utils_cmp(left.row, right.row) > 0) ? $elm$core$Basics$GT : A2($elm$core$Basics$compare, left.column, right.column));
	});
var $author$project$ElmSyntaxHighlight$rangeContainsLocation = function (location) {
	return function (range) {
		var _v0 = A2($stil4m$elm_syntax$Elm$Syntax$Range$compareLocations, range.start, location);
		switch (_v0.$) {
			case 'GT':
				return false;
			case 'EQ':
				return false;
			default:
				var _v1 = A2($stil4m$elm_syntax$Elm$Syntax$Range$compareLocations, range.end, location);
				switch (_v1.$) {
					case 'GT':
						return true;
					case 'LT':
						return false;
					default:
						return false;
				}
		}
	};
};
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $author$project$ElmSyntaxHighlight$stringLinesSlice = function (range) {
	return function (lines) {
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (row, line) {
						return ((_Utils_cmp(row, range.start.row - 1) < 0) || (_Utils_cmp(row, range.end.row - 1) > 0)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
							(_Utils_eq(row, range.start.row - 1) ? $elm$core$String$dropLeft(range.start.column - 1) : $elm$core$Basics$identity)(
								(_Utils_eq(row, range.end.row - 1) ? $elm$core$String$left(range.end.column - 1) : $elm$core$Basics$identity)(line)));
					}),
				lines));
	};
};
var $author$project$ElmSyntaxHighlight$tokenFindRangeIn = F2(
	function (searchRange, context) {
		return function (token) {
			var searchLines = A2($author$project$ElmSyntaxHighlight$stringLinesSlice, searchRange, context.rawSourceCode);
			var operatorStartLocationFound = A2(
				$elm_community$list_extra$List$Extra$findMap,
				function (_v1) {
					var searchLineIndex = _v1.a;
					var searchLine = _v1.b;
					return A2(
						$elm_community$list_extra$List$Extra$findMap,
						function (operatorOffset) {
							var operatorStartLocation = function () {
								if (!searchLineIndex) {
									return {column: searchRange.start.column + operatorOffset, row: searchRange.start.row};
								} else {
									var searchLineAfterFirstIndex = searchLineIndex;
									return {column: operatorOffset + 1, row: searchRange.start.row + searchLineAfterFirstIndex};
								}
							}();
							var isPartOfComment = A2(
								$elm$core$List$any,
								function (commentRange) {
									return A2($author$project$ElmSyntaxHighlight$rangeContainsLocation, operatorStartLocation, commentRange);
								},
								context.commentRanges);
							return isPartOfComment ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(operatorStartLocation);
						},
						A2($elm$core$String$indexes, token, searchLine));
				},
				A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, searchLines));
			if (operatorStartLocationFound.$ === 'Just') {
				var operatorStartLocation = operatorStartLocationFound.a;
				return $elm$core$Maybe$Just(
					{
						end: {
							column: operatorStartLocation.column + $elm$core$String$length(token),
							row: operatorStartLocation.row
						},
						start: operatorStartLocation
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$value = function (_v0) {
	var v = _v0.b;
	return v;
};
var $author$project$ElmSyntaxHighlight$expressionSyntaxKindMap = function (context) {
	var step = function (sub) {
		return A2($author$project$ElmSyntaxHighlight$expressionSyntaxKindMap, context, sub);
	};
	return function (_v6) {
		var expressionRange = _v6.a;
		var expression = _v6.b;
		switch (expression.$) {
			case 'UnitExpr':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'Application':
				var applicationParts = expression.a;
				return A2($author$project$RangeDict$unionFromListMap, step, applicationParts);
			case 'OperatorApplication':
				var operatorSymbol = expression.a;
				var left = expression.c;
				var right = expression.d;
				return function () {
					var operatorRange = function (_v9) {
						return A2(
							$elm$core$Maybe$withDefault,
							$stil4m$elm_syntax$Elm$Syntax$Range$empty,
							A3(
								$author$project$ElmSyntaxHighlight$tokenFindRangeIn,
								{
									end: $stil4m$elm_syntax$Elm$Syntax$Node$range(right).start,
									start: $stil4m$elm_syntax$Elm$Syntax$Node$range(left).end
								},
								context,
								operatorSymbol));
					};
					switch (operatorSymbol) {
						case '|>':
							return A2(
								$author$project$RangeDict$insert,
								operatorRange(_Utils_Tuple0),
								$author$project$ElmSyntaxHighlight$Flow);
						case '<|':
							return A2(
								$author$project$RangeDict$insert,
								operatorRange(_Utils_Tuple0),
								$author$project$ElmSyntaxHighlight$Flow);
						default:
							return $elm$core$Basics$identity;
					}
				}()(
					A2(
						$author$project$RangeDict$union,
						step(left),
						step(right)));
			case 'FunctionOrValue':
				var moduleName = expression.a;
				var name = expression.b;
				return A2(
					$author$project$ElmSyntaxHighlight$qualifiedSyntaxKindMap,
					$author$project$ElmSyntaxHighlight$nameIsUppercase(name) ? $author$project$ElmSyntaxHighlight$Variant : $author$project$ElmSyntaxHighlight$Variable,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						expressionRange,
						_Utils_Tuple2(moduleName, name)));
			case 'IfBlock':
				var condition = expression.a;
				var onTrue = expression.b;
				var onFalse = expression.c;
				return A3(
					$author$project$RangeDict$insert,
					A2(
						$elm$core$Maybe$withDefault,
						$stil4m$elm_syntax$Elm$Syntax$Range$empty,
						A3(
							$author$project$ElmSyntaxHighlight$tokenFindRangeIn,
							{
								end: $stil4m$elm_syntax$Elm$Syntax$Node$range(onFalse).start,
								start: $stil4m$elm_syntax$Elm$Syntax$Node$range(onTrue).end
							},
							context,
							'else')),
					$author$project$ElmSyntaxHighlight$Flow,
					A3(
						$author$project$RangeDict$insert,
						A2(
							$elm$core$Maybe$withDefault,
							$stil4m$elm_syntax$Elm$Syntax$Range$empty,
							A3(
								$author$project$ElmSyntaxHighlight$tokenFindRangeIn,
								{
									end: $stil4m$elm_syntax$Elm$Syntax$Node$range(onTrue).start,
									start: $stil4m$elm_syntax$Elm$Syntax$Node$range(condition).end
								},
								context,
								'then')),
						$author$project$ElmSyntaxHighlight$Flow,
						A3(
							$author$project$RangeDict$insert,
							{
								end: {column: expressionRange.start.column + 2, row: expressionRange.start.row},
								start: expressionRange.start
							},
							$author$project$ElmSyntaxHighlight$Flow,
							A2(
								$author$project$RangeDict$unionFromListMap,
								step,
								_List_fromArray(
									[condition, onTrue, onFalse])))));
			case 'PrefixOperator':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variable);
			case 'Operator':
				return $author$project$RangeDict$empty;
			case 'Integer':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'Hex':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'Floatable':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'Negation':
				var inner = expression.a;
				return step(inner);
			case 'Literal':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'CharLiteral':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Variant);
			case 'TupledExpression':
				var parts = expression.a;
				return A2($author$project$RangeDict$unionFromListMap, step, parts);
			case 'ParenthesizedExpression':
				var inner = expression.a;
				return step(inner);
			case 'LetExpression':
				var letIn = expression.a;
				return function () {
					var _v10 = $elm_community$list_extra$List$Extra$last(letIn.declarations);
					if (_v10.$ === 'Nothing') {
						return $elm$core$Basics$identity;
					} else {
						var _v11 = _v10.a;
						var lastDeclarationRange = _v11.a;
						return A2(
							$author$project$RangeDict$insert,
							A2(
								$elm$core$Maybe$withDefault,
								$stil4m$elm_syntax$Elm$Syntax$Range$empty,
								A3(
									$author$project$ElmSyntaxHighlight$tokenFindRangeIn,
									{
										end: $stil4m$elm_syntax$Elm$Syntax$Node$range(letIn.expression).start,
										start: lastDeclarationRange.end
									},
									context,
									'in')),
							$author$project$ElmSyntaxHighlight$DeclarationRelated);
					}
				}()(
					A3(
						$author$project$RangeDict$insert,
						{
							end: {column: expressionRange.start.column + 3, row: expressionRange.start.row},
							start: expressionRange.start
						},
						$author$project$ElmSyntaxHighlight$DeclarationRelated,
						A2(
							$author$project$RangeDict$union,
							A2(
								$author$project$RangeDict$unionFromListMap,
								$author$project$ElmSyntaxHighlight$letDeclarationSyntaxKindMap(context),
								letIn.declarations),
							step(letIn.expression))));
			case 'CaseExpression':
				var caseOf = expression.a;
				return function () {
					var _v14 = caseOf.cases;
					if (!_v14.b) {
						return $elm$core$Basics$identity;
					} else {
						var _v15 = _v14.a;
						var _v16 = _v15.a;
						var firstCasePatternRange = _v16.a;
						return A2(
							$author$project$RangeDict$insert,
							A2(
								$elm$core$Maybe$withDefault,
								$stil4m$elm_syntax$Elm$Syntax$Range$empty,
								A3(
									$author$project$ElmSyntaxHighlight$tokenFindRangeIn,
									{
										end: firstCasePatternRange.start,
										start: $stil4m$elm_syntax$Elm$Syntax$Node$range(caseOf.expression).end
									},
									context,
									'of')),
							$author$project$ElmSyntaxHighlight$Flow);
					}
				}()(
					A3(
						$author$project$RangeDict$insert,
						{
							end: {column: expressionRange.start.column + 4, row: expressionRange.start.row},
							start: expressionRange.start
						},
						$author$project$ElmSyntaxHighlight$Flow,
						A2(
							$author$project$RangeDict$union,
							step(caseOf.expression),
							A2(
								$author$project$RangeDict$unionFromListMap,
								function (_v12) {
									var casePattern = _v12.a;
									var caseExpression = _v12.b;
									var _v13 = casePattern;
									var lastPatternRange = _v13.a;
									return A3(
										$author$project$RangeDict$insert,
										{
											end: {column: lastPatternRange.end.column + 3, row: lastPatternRange.end.row},
											start: {column: lastPatternRange.end.column + 1, row: lastPatternRange.end.row}
										},
										$author$project$ElmSyntaxHighlight$Flow,
										A2(
											$author$project$RangeDict$union,
											$author$project$ElmSyntaxHighlight$patternSyntaxKindMap(casePattern),
											step(caseExpression)));
								},
								caseOf.cases))));
			case 'LambdaExpression':
				var lambda = expression.a;
				return function () {
					var _v17 = $elm_community$list_extra$List$Extra$last(lambda.args);
					if (_v17.$ === 'Just') {
						var _v18 = _v17.a;
						var lastPatternRange = _v18.a;
						return A2(
							$author$project$RangeDict$insert,
							{
								end: {column: lastPatternRange.end.column + 3, row: lastPatternRange.end.row},
								start: {column: lastPatternRange.end.column + 1, row: lastPatternRange.end.row}
							},
							$author$project$ElmSyntaxHighlight$Flow);
					} else {
						return $elm$core$Basics$identity;
					}
				}()(
					A3(
						$author$project$RangeDict$insert,
						{
							end: {column: expressionRange.start.column + 1, row: expressionRange.start.row},
							start: expressionRange.start
						},
						$author$project$ElmSyntaxHighlight$Flow,
						A2(
							$author$project$RangeDict$union,
							A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$patternSyntaxKindMap, lambda.args),
							step(lambda.expression))));
			case 'RecordExpr':
				var fields = expression.a;
				return A2(
					$author$project$RangeDict$unionFromListMap,
					function (_v19) {
						var _v20 = _v19.b;
						var _v21 = _v20.a;
						var fieldRange = _v21.a;
						var fieldValue = _v20.b;
						return A3(
							$author$project$RangeDict$insert,
							fieldRange,
							$author$project$ElmSyntaxHighlight$Field,
							step(fieldValue));
					},
					fields);
			case 'ListExpr':
				var elements = expression.a;
				return A2($author$project$RangeDict$unionFromListMap, step, elements);
			case 'RecordAccess':
				var record = expression.a;
				var _v22 = expression.b;
				var fieldRange = _v22.a;
				return A3(
					$author$project$RangeDict$insert,
					fieldRange,
					$author$project$ElmSyntaxHighlight$Field,
					step(record));
			case 'RecordAccessFunction':
				return A2($author$project$RangeDict$singleton, expressionRange, $author$project$ElmSyntaxHighlight$Field);
			case 'RecordUpdateExpression':
				var _v23 = expression.a;
				var variableRange = _v23.a;
				var fields = expression.b;
				return A3(
					$author$project$RangeDict$insert,
					variableRange,
					$author$project$ElmSyntaxHighlight$Variable,
					A2(
						$author$project$RangeDict$unionFromListMap,
						function (_v24) {
							var _v25 = _v24.b;
							var _v26 = _v25.a;
							var fieldRange = _v26.a;
							var fieldValue = _v25.b;
							return A3(
								$author$project$RangeDict$insert,
								fieldRange,
								$author$project$ElmSyntaxHighlight$Field,
								step(fieldValue));
						},
						fields));
			default:
				return $author$project$RangeDict$empty;
		}
	};
};
var $author$project$ElmSyntaxHighlight$letDeclarationSyntaxKindMap = function (context) {
	return function (_v0) {
		var letDeclaration = _v0.b;
		if (letDeclaration.$ === 'LetDestructuring') {
			var pattern = letDeclaration.a;
			var destructuredExpression = letDeclaration.b;
			return A3(
				$author$project$RangeDict$insert,
				function () {
					var tokenBeforeEqualsEnd = $stil4m$elm_syntax$Elm$Syntax$Node$range(pattern).end;
					return {
						end: {column: tokenBeforeEqualsEnd.column + 2, row: tokenBeforeEqualsEnd.row},
						start: {column: tokenBeforeEqualsEnd.column + 1, row: tokenBeforeEqualsEnd.row}
					};
				}(),
				$author$project$ElmSyntaxHighlight$DeclarationRelated,
				A2(
					$author$project$RangeDict$union,
					$author$project$ElmSyntaxHighlight$patternSyntaxKindMap(pattern),
					A2($author$project$ElmSyntaxHighlight$expressionSyntaxKindMap, context, destructuredExpression)));
		} else {
			var fnDeclaration = letDeclaration.a;
			return A2(
				$author$project$RangeDict$union,
				function () {
					var _v2 = fnDeclaration.signature;
					if (_v2.$ === 'Just') {
						var _v3 = _v2.a;
						var signature = _v3.b;
						return $author$project$ElmSyntaxHighlight$signatureSyntaxKindMap(signature);
					} else {
						return $author$project$RangeDict$empty;
					}
				}(),
				function () {
					var implementation = $stil4m$elm_syntax$Elm$Syntax$Node$value(fnDeclaration.declaration);
					var implementationNameRange = $stil4m$elm_syntax$Elm$Syntax$Node$range(implementation.name);
					return A3(
						$author$project$RangeDict$insert,
						function () {
							var tokenBeforeEqualsEnd = function () {
								var _v4 = $elm_community$list_extra$List$Extra$last(implementation._arguments);
								if (_v4.$ === 'Just') {
									var _v5 = _v4.a;
									var lastPatternRange = _v5.a;
									return lastPatternRange.end;
								} else {
									return implementationNameRange.end;
								}
							}();
							return {
								end: {column: tokenBeforeEqualsEnd.column + 2, row: tokenBeforeEqualsEnd.row},
								start: {column: tokenBeforeEqualsEnd.column + 1, row: tokenBeforeEqualsEnd.row}
							};
						}(),
						$author$project$ElmSyntaxHighlight$DeclarationRelated,
						A3(
							$author$project$RangeDict$insert,
							implementationNameRange,
							$author$project$ElmSyntaxHighlight$Variable,
							A2(
								$author$project$RangeDict$union,
								A2($author$project$ElmSyntaxHighlight$expressionSyntaxKindMap, context, implementation.expression),
								A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$patternSyntaxKindMap, implementation._arguments))));
				}());
		}
	};
};
var $author$project$ElmSyntaxHighlight$declarationSyntaxKindMap = function (context) {
	return function (_v0) {
		var declarationRange = _v0.a;
		var declaration = _v0.b;
		switch (declaration.$) {
			case 'FunctionDeclaration':
				var fnDeclaration = declaration.a;
				return A2(
					$author$project$RangeDict$union,
					function () {
						var _v2 = fnDeclaration.signature;
						if (_v2.$ === 'Just') {
							var _v3 = _v2.a;
							var signature = _v3.b;
							return $author$project$ElmSyntaxHighlight$signatureSyntaxKindMap(signature);
						} else {
							return $author$project$RangeDict$empty;
						}
					}(),
					function () {
						var implementation = $stil4m$elm_syntax$Elm$Syntax$Node$value(fnDeclaration.declaration);
						var implementationNameRange = $stil4m$elm_syntax$Elm$Syntax$Node$range(implementation.name);
						return A3(
							$author$project$RangeDict$insert,
							function () {
								var tokenBeforeEqualsEnd = function () {
									var _v4 = $elm_community$list_extra$List$Extra$last(implementation._arguments);
									if (_v4.$ === 'Just') {
										var _v5 = _v4.a;
										var lastPatternRange = _v5.a;
										return lastPatternRange.end;
									} else {
										return implementationNameRange.end;
									}
								}();
								return {
									end: {column: tokenBeforeEqualsEnd.column + 2, row: tokenBeforeEqualsEnd.row},
									start: {column: tokenBeforeEqualsEnd.column + 1, row: tokenBeforeEqualsEnd.row}
								};
							}(),
							$author$project$ElmSyntaxHighlight$DeclarationRelated,
							A3(
								$author$project$RangeDict$insert,
								implementationNameRange,
								$author$project$ElmSyntaxHighlight$Variable,
								A2(
									$author$project$RangeDict$union,
									A2($author$project$ElmSyntaxHighlight$expressionSyntaxKindMap, context, implementation.expression),
									A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$patternSyntaxKindMap, implementation._arguments))));
					}());
			case 'AliasDeclaration':
				var aliasTypeDeclaration = declaration.a;
				return A3(
					$author$project$RangeDict$insert,
					function () {
						var tokenBeforeEqualsEnd = function () {
							var _v7 = $elm_community$list_extra$List$Extra$last(aliasTypeDeclaration.generics);
							if (_v7.$ === 'Just') {
								var _v8 = _v7.a;
								var lastPatternRange = _v8.a;
								return lastPatternRange.end;
							} else {
								return $stil4m$elm_syntax$Elm$Syntax$Node$range(aliasTypeDeclaration.name).end;
							}
						}();
						return {
							end: {column: tokenBeforeEqualsEnd.column + 2, row: tokenBeforeEqualsEnd.row},
							start: {column: tokenBeforeEqualsEnd.column + 1, row: tokenBeforeEqualsEnd.row}
						};
					}(),
					$author$project$ElmSyntaxHighlight$DeclarationRelated,
					A3(
						$author$project$RangeDict$insert,
						{
							end: {column: declarationRange.start.column + 10, row: declarationRange.start.row},
							start: declarationRange.start
						},
						$author$project$ElmSyntaxHighlight$DeclarationRelated,
						A3(
							$author$project$RangeDict$insert,
							$stil4m$elm_syntax$Elm$Syntax$Node$range(aliasTypeDeclaration.name),
							$author$project$ElmSyntaxHighlight$Type,
							A2(
								$author$project$RangeDict$union,
								$author$project$ElmSyntaxHighlight$typeAnnotationSyntaxKindMap(aliasTypeDeclaration.typeAnnotation),
								A2(
									$author$project$RangeDict$mapFromList,
									function (_v6) {
										var variableRange = _v6.a;
										return _Utils_Tuple2(variableRange, $author$project$ElmSyntaxHighlight$Variable);
									},
									aliasTypeDeclaration.generics)))));
			case 'CustomTypeDeclaration':
				var choiceTypeDeclaration = declaration.a;
				return A3(
					$author$project$RangeDict$insert,
					{
						end: {column: declarationRange.start.column + 4, row: declarationRange.start.row},
						start: declarationRange.start
					},
					$author$project$ElmSyntaxHighlight$DeclarationRelated,
					A3(
						$author$project$RangeDict$insert,
						$stil4m$elm_syntax$Elm$Syntax$Node$range(choiceTypeDeclaration.name),
						$author$project$ElmSyntaxHighlight$Type,
						A2(
							$author$project$RangeDict$union,
							A2(
								$author$project$RangeDict$unionFromListMap,
								function (_v9) {
									var variant = _v9.b;
									var variantNameRange = $stil4m$elm_syntax$Elm$Syntax$Node$range(variant.name);
									return A3(
										$author$project$RangeDict$insert,
										{
											end: {column: variantNameRange.start.column - 1, row: variantNameRange.start.row},
											start: {column: variantNameRange.start.column - 2, row: variantNameRange.start.row}
										},
										$author$project$ElmSyntaxHighlight$DeclarationRelated,
										A3(
											$author$project$RangeDict$insert,
											variantNameRange,
											$author$project$ElmSyntaxHighlight$Variant,
											A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$typeAnnotationSyntaxKindMap, variant._arguments)));
								},
								choiceTypeDeclaration.constructors),
							A2(
								$author$project$RangeDict$mapFromList,
								function (_v10) {
									var variableRange = _v10.a;
									return _Utils_Tuple2(variableRange, $author$project$ElmSyntaxHighlight$Variable);
								},
								choiceTypeDeclaration.generics))));
			case 'PortDeclaration':
				var signature = declaration.a;
				return A3(
					$author$project$RangeDict$insert,
					{
						end: {column: declarationRange.start.column + 4, row: declarationRange.start.row},
						start: declarationRange.start
					},
					$author$project$ElmSyntaxHighlight$DeclarationRelated,
					$author$project$ElmSyntaxHighlight$signatureSyntaxKindMap(signature));
			case 'InfixDeclaration':
				return $author$project$RangeDict$empty;
			default:
				return $author$project$RangeDict$empty;
		}
	};
};
var $author$project$RangeDict$locationFromTuple = function (_v0) {
	var row = _v0.a;
	var column = _v0.b;
	return {column: column, row: row};
};
var $author$project$RangeDict$rangeFromTupleTuple = function (_v0) {
	var start = _v0.a;
	var end = _v0.b;
	return {
		end: $author$project$RangeDict$locationFromTuple(end),
		start: $author$project$RangeDict$locationFromTuple(start)
	};
};
var $author$project$RangeDict$foldl = F3(
	function (reduce, initialFolded, _v0) {
		var rangeDict = _v0.a;
		return A3(
			$miniBill$elm_fast_dict$FastDict$foldl,
			F2(
				function (range, value) {
					return A2(
						reduce,
						$author$project$RangeDict$rangeFromTupleTuple(range),
						value);
				}),
			initialFolded,
			rangeDict);
	});
var $author$project$RangeDict$justValuesMap = function (rangeAndValueMap) {
	return function (rangeDict) {
		return A3(
			$author$project$RangeDict$foldl,
			F3(
				function (range, value, soFar) {
					var _v0 = A2(rangeAndValueMap, range, value);
					if (_v0.$ === 'Nothing') {
						return soFar;
					} else {
						var valueMapped = _v0.a;
						return A3($author$project$RangeDict$insert, range, valueMapped, soFar);
					}
				}),
			$author$project$RangeDict$empty,
			rangeDict);
	};
};
var $elm$core$String$lines = _String_lines;
var $stil4m$elm_syntax$Rope$empty = $elm$core$Maybe$Nothing;
var $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration = function (a) {
	return {$: 'AliasDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration = function (a) {
	return {$: 'CustomTypeDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration = function (a) {
	return {$: 'FunctionDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$PortDeclaration = function (a) {
	return {$: 'PortDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Signature$Signature = F2(
	function (name, typeAnnotation) {
		return {name: name, typeAnnotation: typeAnnotation};
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$combine = F3(
	function (f, a, b) {
		var start = a.a.start;
		var end = b.a.end;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			{end: end, start: start},
			A2(f, a, b));
	});
var $stil4m$elm_syntax$ParserFast$Done = function (a) {
	return {$: 'Done', a: a};
};
var $stil4m$elm_syntax$ParserFast$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $stil4m$elm_syntax$ParserFast$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$ExpectingAnyChar = F2(
	function (a, b) {
		return {$: 'ExpectingAnyChar', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$Good = F2(
	function (a, b) {
		return {$: 'Good', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$core$String$any = _String_any;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $stil4m$elm_syntax$Char$Extra$isUtf16Surrogate = function (c) {
	return $elm$core$Basics$isNaN(
		$elm$core$Char$toCode(c));
};
var $stil4m$elm_syntax$ParserFast$charStringIsUtf16HighSurrogate = function (charString) {
	return A2($elm$core$String$any, $stil4m$elm_syntax$Char$Extra$isUtf16Surrogate, charString);
};
var $stil4m$elm_syntax$ParserFast$charOrEnd = F2(
	function (offset, string) {
		var actualChar = A3($elm$core$String$slice, offset, offset + 1, string);
		switch (actualChar) {
			case '\n':
				return -2;
			case '':
				return -1;
			default:
				return $stil4m$elm_syntax$ParserFast$charStringIsUtf16HighSurrogate(actualChar) ? (offset + 2) : (offset + 1);
		}
	});
var $stil4m$elm_syntax$ParserFast$skipWhileHelp = F6(
	function (isGood, offset, row, col, src, indent) {
		skipWhileHelp:
		while (true) {
			var actualChar = A3($elm$core$String$slice, offset, offset + 1, src);
			if (A2($elm$core$String$any, isGood, actualChar)) {
				if (actualChar === '\n') {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileHelp;
				}
			} else {
				if ($stil4m$elm_syntax$ParserFast$charStringIsUtf16HighSurrogate(actualChar) && A2(
					$elm$core$String$any,
					isGood,
					A3($elm$core$String$slice, offset, offset + 2, src))) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 2,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileHelp;
				} else {
					return {col: col, indent: indent, offset: offset, row: row, src: src};
				}
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$anyCharFollowedByWhileMap = F2(
	function (consumedStringToRes, afterFirstIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var firstOffset = A2($stil4m$elm_syntax$ParserFast$charOrEnd, s.offset, s.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingAnyChar, s.row, s.col));
				} else {
					var s1 = _Utils_eq(firstOffset, -2) ? A6($stil4m$elm_syntax$ParserFast$skipWhileHelp, afterFirstIsOkay, s.offset + 1, s.row + 1, 1, s.src, s.indent) : A6($stil4m$elm_syntax$ParserFast$skipWhileHelp, afterFirstIsOkay, firstOffset, s.row, s.col + 1, s.src, s.indent);
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						consumedStringToRes(
							A3($elm$core$String$slice, s.offset, s1.offset, s.src)),
						s1);
				}
			});
	});
var $elm$core$String$cons = _String_cons;
var $stil4m$elm_syntax$ParserFast$loopHelp = F5(
	function (committedSoFar, state, element, reduce, s0) {
		loopHelp:
		while (true) {
			var parseElement = element.a;
			var _v0 = parseElement(s0);
			if (_v0.$ === 'Good') {
				var step = _v0.a;
				var s1 = _v0.b;
				var _v1 = A2(reduce, step, state);
				if (_v1.$ === 'Loop') {
					var newState = _v1.a;
					var $temp$committedSoFar = true,
						$temp$state = newState,
						$temp$element = element,
						$temp$reduce = reduce,
						$temp$s0 = s1;
					committedSoFar = $temp$committedSoFar;
					state = $temp$state;
					element = $temp$element;
					reduce = $temp$reduce;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = _v1.a;
					return A2($stil4m$elm_syntax$ParserFast$Good, result, s1);
				}
			} else {
				var elementCommitted = _v0.a;
				var x = _v0.b;
				return A2($stil4m$elm_syntax$ParserFast$Bad, committedSoFar || elementCommitted, x);
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$loop = F3(
	function (state, element, reduce) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				return A5($stil4m$elm_syntax$ParserFast$loopHelp, false, state, element, reduce, s);
			});
	});
var $stil4m$elm_syntax$ParserFast$map2WithRange = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var committed = _v2.a;
					var x = _v2.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v2.a;
					var s1 = _v2.b;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var x = _v3.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v3.a;
						var s2 = _v3.b;
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							A3(
								func,
								{
									end: {column: s2.col, row: s2.row},
									start: {column: s0.col, row: s0.row}
								},
								a,
								b),
							s2);
					}
				}
			});
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $stil4m$elm_syntax$ParserFast$ExpectingOneOf = F3(
	function (a, b, c) {
		return {$: 'ExpectingOneOf', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$ParserFast$oneOf2 = F2(
	function (_v0, _v1) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v2 = attemptFirst(s);
				if (_v2.$ === 'Good') {
					var firstGood = _v2;
					return firstGood;
				} else {
					var firstBad = _v2;
					var firstCommitted = firstBad.a;
					var firstX = firstBad.b;
					if (firstCommitted) {
						return firstBad;
					} else {
						var _v3 = attemptSecond(s);
						if (_v3.$ === 'Good') {
							var secondGood = _v3;
							return secondGood;
						} else {
							var secondBad = _v3;
							var secondCommitted = secondBad.a;
							var secondX = secondBad.b;
							return secondCommitted ? secondBad : A2(
								$stil4m$elm_syntax$ParserFast$Bad,
								false,
								A3($stil4m$elm_syntax$ParserFast$ExpectingOneOf, firstX, secondX, _List_Nil));
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$oneOf3 = F3(
	function (_v0, _v1, _v2) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		var attemptThird = _v2.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v3 = attemptFirst(s);
				if (_v3.$ === 'Good') {
					var firstGood = _v3;
					return firstGood;
				} else {
					var firstBad = _v3;
					var firstCommitted = firstBad.a;
					var firstX = firstBad.b;
					if (firstCommitted) {
						return firstBad;
					} else {
						var _v4 = attemptSecond(s);
						if (_v4.$ === 'Good') {
							var secondGood = _v4;
							return secondGood;
						} else {
							var secondBad = _v4;
							var secondCommitted = secondBad.a;
							var secondX = secondBad.b;
							if (secondCommitted) {
								return secondBad;
							} else {
								var _v5 = attemptThird(s);
								if (_v5.$ === 'Good') {
									var thirdGood = _v5;
									return thirdGood;
								} else {
									var thirdBad = _v5;
									var thirdCommitted = thirdBad.a;
									var thirdX = thirdBad.b;
									return thirdCommitted ? thirdBad : A2(
										$stil4m$elm_syntax$ParserFast$Bad,
										false,
										A3(
											$stil4m$elm_syntax$ParserFast$ExpectingOneOf,
											firstX,
											secondX,
											_List_fromArray(
												[thirdX])));
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$ExpectingSymbol = F3(
	function (a, b, c) {
		return {$: 'ExpectingSymbol', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$ParserFast$symbol = F2(
	function (str, res) {
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + strLength;
				return _Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					str + '') ? A2(
					$stil4m$elm_syntax$ParserFast$Good,
					res,
					{col: s.col + strLength, indent: s.indent, offset: newOffset, row: s.row, src: s.src}) : A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s.row, s.col, str));
			});
	});
var $stil4m$elm_syntax$ParserFast$pStepCommit = function (pStep) {
	if (pStep.$ === 'Good') {
		var good = pStep;
		return good;
	} else {
		var x = pStep.b;
		return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
	}
};
var $stil4m$elm_syntax$ParserFast$symbolFollowedBy = F2(
	function (str, _v0) {
		var parseNext = _v0.a;
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + strLength;
				return _Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					str + '') ? $stil4m$elm_syntax$ParserFast$pStepCommit(
					parseNext(
						{col: s.col + strLength, indent: s.indent, offset: newOffset, row: s.row, src: s.src})) : A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s.row, s.col, str));
			});
	});
var $stil4m$elm_syntax$ParserFast$while = function (isGood) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileHelp, isGood, s0.offset, s0.row, s0.col, s0.src, s0.indent);
			return A2(
				$stil4m$elm_syntax$ParserFast$Good,
				A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
				s1);
		});
};
var $stil4m$elm_syntax$ParserFast$nestableMultiCommentMapWithRange = F3(
	function (rangeContentToRes, _v0, _v1) {
		var openChar = _v0.a;
		var openTail = _v0.b;
		var closeChar = _v1.a;
		var closeTail = _v1.b;
		var open = A2($elm$core$String$cons, openChar, openTail);
		var isNotRelevant = function (_char) {
			return (!_Utils_eq(_char, openChar)) && ((!_Utils_eq(_char, closeChar)) && (!$stil4m$elm_syntax$Char$Extra$isUtf16Surrogate(_char)));
		};
		var close = A2($elm$core$String$cons, closeChar, closeTail);
		return A3(
			$stil4m$elm_syntax$ParserFast$map2WithRange,
			F3(
				function (range, afterOpen, contentAfterAfterOpen) {
					return A2(
						rangeContentToRes,
						range,
						_Utils_ap(
							open,
							_Utils_ap(
								afterOpen,
								_Utils_ap(contentAfterAfterOpen, close))));
				}),
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				open,
				$stil4m$elm_syntax$ParserFast$while(isNotRelevant)),
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				A2($stil4m$elm_syntax$ParserFast$symbol, close, ''),
				A3(
					$stil4m$elm_syntax$ParserFast$loop,
					_Utils_Tuple2('', 1),
					A3(
						$stil4m$elm_syntax$ParserFast$oneOf3,
						A2(
							$stil4m$elm_syntax$ParserFast$symbol,
							close,
							_Utils_Tuple2(close, -1)),
						A2(
							$stil4m$elm_syntax$ParserFast$symbol,
							open,
							_Utils_Tuple2(open, 1)),
						A2(
							$stil4m$elm_syntax$ParserFast$anyCharFollowedByWhileMap,
							function (consumed) {
								return _Utils_Tuple2(consumed, 0);
							},
							isNotRelevant)),
					F2(
						function (_v2, _v3) {
							var toAppend = _v2.a;
							var nestingChange = _v2.b;
							var soFarContent = _v3.a;
							var soFarNesting = _v3.b;
							var newNesting = soFarNesting + nestingChange;
							return (!newNesting) ? $stil4m$elm_syntax$ParserFast$Done(soFarContent) : $stil4m$elm_syntax$ParserFast$Loop(
								_Utils_Tuple2(soFarContent + (toAppend + ''), newNesting));
						}))));
	});
var $stil4m$elm_syntax$Elm$Parser$Comments$multiLineCommentNoCheck = A3(
	$stil4m$elm_syntax$ParserFast$nestableMultiCommentMapWithRange,
	$stil4m$elm_syntax$Elm$Syntax$Node$Node,
	_Utils_Tuple2(
		_Utils_chr('{'),
		'-'),
	_Utils_Tuple2(
		_Utils_chr('-'),
		'}'));
var $stil4m$elm_syntax$Elm$Parser$Comments$declarationDocumentation = $stil4m$elm_syntax$Elm$Parser$Comments$multiLineCommentNoCheck;
var $stil4m$elm_syntax$Rope$Branch2 = F2(
	function (a, b) {
		return {$: 'Branch2', a: a, b: b};
	});
var $stil4m$elm_syntax$Rope$filledPrependTo = F2(
	function (right, leftLikelyFilled) {
		if (right.$ === 'Nothing') {
			return $elm$core$Maybe$Just(leftLikelyFilled);
		} else {
			var rightLikelyFilled = right.a;
			return $elm$core$Maybe$Just(
				A2($stil4m$elm_syntax$Rope$Branch2, leftLikelyFilled, rightLikelyFilled));
		}
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$FunctionDeclarationAfterDocumentation = function (a) {
	return {$: 'FunctionDeclarationAfterDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Application = function (a) {
	return {$: 'Application', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression = function (a) {
	return {$: 'CaseExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expression$ExtendRightByOperation = function (a) {
	return {$: 'ExtendRightByOperation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expression$FieldsFirstValue = function (a) {
	return {$: 'FieldsFirstValue', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock = F3(
	function (a, b, c) {
		return {$: 'IfBlock', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression = function (a) {
	return {$: 'LambdaExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Left = {$: 'Left'};
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring = F2(
	function (a, b) {
		return {$: 'LetDestructuring', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression = function (a) {
	return {$: 'LetExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction = function (a) {
	return {$: 'LetFunction', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr = function (a) {
	return {$: 'ListExpr', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Negation = function (a) {
	return {$: 'Negation', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Non = {$: 'Non'};
var $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression = function (a) {
	return {$: 'ParenthesizedExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess = F2(
	function (a, b) {
		return {$: 'RecordAccess', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr = function (a) {
	return {$: 'RecordExpr', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression = F2(
	function (a, b) {
		return {$: 'RecordUpdateExpression', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$RecordUpdateFirstSetter = function (a) {
	return {$: 'RecordUpdateFirstSetter', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Right = {$: 'Right'};
var $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression = function (a) {
	return {$: 'TupledExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expression$TupledParenthesizedFollowedByRecordAccesses = function (a) {
	return {$: 'TupledParenthesizedFollowedByRecordAccesses', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expression$TupledTwoOrThree = function (a) {
	return {$: 'TupledTwoOrThree', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr = {$: 'UnitExpr'};
var $stil4m$elm_syntax$Elm$Syntax$Expression$PrefixOperator = function (a) {
	return {$: 'PrefixOperator', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$isAllowedOperatorToken = function (operatorCandidateToValidate) {
	switch (operatorCandidateToValidate) {
		case '==':
			return true;
		case '/=':
			return true;
		case '::':
			return true;
		case '++':
			return true;
		case '+':
			return true;
		case '*':
			return true;
		case '<|':
			return true;
		case '|>':
			return true;
		case '||':
			return true;
		case '<=':
			return true;
		case '>=':
			return true;
		case '|=':
			return true;
		case '|.':
			return true;
		case '//':
			return true;
		case '</>':
			return true;
		case '<?>':
			return true;
		case '^':
			return true;
		case '<<':
			return true;
		case '>>':
			return true;
		case '<':
			return true;
		case '>':
			return true;
		case '/':
			return true;
		case '&&':
			return true;
		case '-':
			return true;
		default:
			return false;
	}
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$isOperatorSymbolChar = function (c) {
	switch (c.valueOf()) {
		case '+':
			return true;
		case '-':
			return true;
		case '/':
			return true;
		case '*':
			return true;
		case '=':
			return true;
		case '.':
			return true;
		case '<':
			return true;
		case '>':
			return true;
		case ':':
			return true;
		case '&':
			return true;
		case '|':
			return true;
		case '^':
			return true;
		case '?':
			return true;
		default:
			return false;
	}
};
var $stil4m$elm_syntax$ParserFast$ExpectingStringSatisfyingPredicate = F2(
	function (a, b) {
		return {$: 'ExpectingStringSatisfyingPredicate', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakAnd2PartUtf16Help = F3(
	function (isGood, offset, src) {
		skipWhileWithoutLinebreakAnd2PartUtf16Help:
		while (true) {
			if (A2(
				$elm$core$String$any,
				isGood,
				A3($elm$core$String$slice, offset, offset + 1, src))) {
				var $temp$isGood = isGood,
					$temp$offset = offset + 1,
					$temp$src = src;
				isGood = $temp$isGood;
				offset = $temp$offset;
				src = $temp$src;
				continue skipWhileWithoutLinebreakAnd2PartUtf16Help;
			} else {
				return offset;
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$whileWithoutLinebreakAnd2PartUtf16ValidateMapWithRangeBacktrackableFollowedBySymbol = F4(
	function (whileRangeAndContentToRes, whileCharIsOkay, whileResultIsOkay, mandatoryFinalSymbol) {
		var mandatoryFinalSymbolLength = $elm$core$String$length(mandatoryFinalSymbol);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var s1Offset = A3($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakAnd2PartUtf16Help, whileCharIsOkay, s0.offset, s0.src);
				var whileContent = A3($elm$core$String$slice, s0.offset, s1Offset, s0.src);
				if (_Utils_eq(
					A3($elm$core$String$slice, s1Offset, s1Offset + mandatoryFinalSymbolLength, s0.src),
					mandatoryFinalSymbol + '') && whileResultIsOkay(whileContent)) {
					var s1Column = s0.col + (s1Offset - s0.offset);
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A2(
							whileRangeAndContentToRes,
							{
								end: {column: s1Column, row: s0.row},
								start: {column: s0.col, row: s0.row}
							},
							whileContent),
						{col: s1Column + mandatoryFinalSymbolLength, indent: s0.indent, offset: s1Offset + mandatoryFinalSymbolLength, row: s0.row, src: s0.src});
				} else {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingStringSatisfyingPredicate, s0.row, s0.col + 1));
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$allowedPrefixOperatorFollowedByClosingParensOneOf = A4(
	$stil4m$elm_syntax$ParserFast$whileWithoutLinebreakAnd2PartUtf16ValidateMapWithRangeBacktrackableFollowedBySymbol,
	F2(
		function (operatorRange, operator) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					{
						end: {column: operatorRange.end.column + 1, row: operatorRange.end.row},
						start: {column: operatorRange.start.column - 1, row: operatorRange.start.row}
					},
					$stil4m$elm_syntax$Elm$Syntax$Expression$PrefixOperator(operator))
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$isOperatorSymbolChar,
	$stil4m$elm_syntax$Elm$Parser$Tokens$isAllowedOperatorToken,
	')');
var $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication = F4(
	function (a, b, c, d) {
		return {$: 'OperatorApplication', a: a, b: b, c: c, d: d};
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$applyExtensionRight = F2(
	function (_v0, leftNode) {
		var operation = _v0.a;
		var leftRange = leftNode.a;
		var rightExpressionNode = operation.expression;
		var rightExpressionRange = rightExpressionNode.a;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			{end: rightExpressionRange.end, start: leftRange.start},
			A4($stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication, operation.symbol, operation.direction, leftNode, rightExpressionNode));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$CharLiteral = function (a) {
	return {$: 'CharLiteral', a: a};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $stil4m$elm_syntax$ParserFast$anyChar = $stil4m$elm_syntax$ParserFast$Parser(
	function (s) {
		var newOffset = A2($stil4m$elm_syntax$ParserFast$charOrEnd, s.offset, s.src);
		if (_Utils_eq(newOffset, -1)) {
			return A2(
				$stil4m$elm_syntax$ParserFast$Bad,
				false,
				A2($stil4m$elm_syntax$ParserFast$ExpectingAnyChar, s.row, s.col));
		} else {
			if (_Utils_eq(newOffset, -2)) {
				return A2(
					$stil4m$elm_syntax$ParserFast$Good,
					_Utils_chr('\n'),
					{col: 1, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src});
			} else {
				var _v0 = $elm$core$String$toList(
					A3($elm$core$String$slice, s.offset, newOffset, s.src));
				if (!_v0.b) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingAnyChar, s.row, s.col));
				} else {
					var c = _v0.a;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						c,
						{col: s.col + 1, indent: s.indent, offset: newOffset, row: s.row, src: s.src});
				}
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$followedBySymbol = F2(
	function (str, _v0) {
		var parsePrevious = _v0.a;
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parsePrevious(s0);
				if (_v1.$ === 'Good') {
					var res = _v1.a;
					var s1 = _v1.b;
					var newOffset = s1.offset + strLength;
					return _Utils_eq(
						A3($elm$core$String$slice, s1.offset, newOffset, s1.src),
						str + '') ? A2(
						$stil4m$elm_syntax$ParserFast$Good,
						res,
						{col: s1.col + strLength, indent: s1.indent, offset: newOffset, row: s1.row, src: s1.src}) : A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						true,
						A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s1.row, s1.col, str));
				} else {
					var bad = _v1;
					return bad;
				}
			});
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $stil4m$elm_syntax$Elm$Parser$Tokens$charToHex = function (c) {
	switch (c.valueOf()) {
		case '0':
			return 0;
		case '1':
			return 1;
		case '2':
			return 2;
		case '3':
			return 3;
		case '4':
			return 4;
		case '5':
			return 5;
		case '6':
			return 6;
		case '7':
			return 7;
		case '8':
			return 8;
		case '9':
			return 9;
		case 'a':
			return 10;
		case 'b':
			return 11;
		case 'c':
			return 12;
		case 'd':
			return 13;
		case 'e':
			return 14;
		case 'f':
			return 15;
		case 'A':
			return 10;
		case 'B':
			return 11;
		case 'C':
			return 12;
		case 'D':
			return 13;
		case 'E':
			return 14;
		default:
			return 15;
	}
};
var $elm$core$Basics$pow = _Basics_pow;
var $stil4m$elm_syntax$Elm$Parser$Tokens$hexStringToInt = function (string) {
	return A3(
		$elm$core$String$foldr,
		F2(
			function (c, soFar) {
				return {
					exponent: soFar.exponent + 1,
					result: soFar.result + (A2($elm$core$Basics$pow, 16, soFar.exponent) * $stil4m$elm_syntax$Elm$Parser$Tokens$charToHex(c))
				};
			}),
		{exponent: 0, result: 0},
		string).result;
};
var $stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate = F2(
	function (a, b) {
		return {$: 'ExpectingCharSatisfyingPredicate', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak = F3(
	function (predicate, offset, string) {
		var actualChar = A3($elm$core$String$slice, offset, offset + 1, string);
		return A2($elm$core$String$any, predicate, actualChar) ? (offset + 1) : (($stil4m$elm_syntax$ParserFast$charStringIsUtf16HighSurrogate(actualChar) && A2(
			$elm$core$String$any,
			predicate,
			A3($elm$core$String$slice, offset, offset + 2, string))) ? (offset + 2) : (-1));
	});
var $stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp = F6(
	function (isGood, offset, row, col, src, indent) {
		skipWhileWithoutLinebreakHelp:
		while (true) {
			var actualChar = A3($elm$core$String$slice, offset, offset + 1, src);
			if (A2($elm$core$String$any, isGood, actualChar)) {
				var $temp$isGood = isGood,
					$temp$offset = offset + 1,
					$temp$row = row,
					$temp$col = col + 1,
					$temp$src = src,
					$temp$indent = indent;
				isGood = $temp$isGood;
				offset = $temp$offset;
				row = $temp$row;
				col = $temp$col;
				src = $temp$src;
				indent = $temp$indent;
				continue skipWhileWithoutLinebreakHelp;
			} else {
				if ($stil4m$elm_syntax$ParserFast$charStringIsUtf16HighSurrogate(actualChar) && A2(
					$elm$core$String$any,
					isGood,
					A3($elm$core$String$slice, offset, offset + 2, src))) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 2,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileWithoutLinebreakHelp;
				} else {
					return {col: col, indent: indent, offset: offset, row: row, src: src};
				}
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$ifFollowedByWhileMapWithoutLinebreak = F3(
	function (consumedStringToRes, firstIsOkay, afterFirstIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var firstOffset = A3($stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak, firstIsOkay, s0.offset, s0.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate, s0.row, s0.col));
				} else {
					var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, afterFirstIsOkay, firstOffset, s0.row, s0.col + 1, s0.src, s0.indent);
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						consumedStringToRes(
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src)),
						s1);
				}
			});
	});
var $elm$core$Char$isHexDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return ((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 70)) || ((97 <= code) && (code <= 102)));
};
var $stil4m$elm_syntax$ParserFast$oneOf7 = F7(
	function (_v0, _v1, _v2, _v3, _v4, _v5, _v6) {
		var attempt0 = _v0.a;
		var attempt1 = _v1.a;
		var attempt2 = _v2.a;
		var attempt3 = _v3.a;
		var attempt4 = _v4.a;
		var attempt5 = _v5.a;
		var attempt6 = _v6.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v7 = attempt0(s);
				if (_v7.$ === 'Good') {
					var good = _v7;
					return good;
				} else {
					var bad0 = _v7;
					var committed0 = bad0.a;
					var x0 = bad0.b;
					if (committed0) {
						return bad0;
					} else {
						var _v8 = attempt1(s);
						if (_v8.$ === 'Good') {
							var good = _v8;
							return good;
						} else {
							var bad1 = _v8;
							var committed1 = bad1.a;
							var x1 = bad1.b;
							if (committed1) {
								return bad1;
							} else {
								var _v9 = attempt2(s);
								if (_v9.$ === 'Good') {
									var good = _v9;
									return good;
								} else {
									var bad2 = _v9;
									var committed2 = bad2.a;
									var x2 = bad2.b;
									if (committed2) {
										return bad2;
									} else {
										var _v10 = attempt3(s);
										if (_v10.$ === 'Good') {
											var good = _v10;
											return good;
										} else {
											var bad3 = _v10;
											var committed3 = bad3.a;
											var x3 = bad3.b;
											if (committed3) {
												return bad3;
											} else {
												var _v11 = attempt4(s);
												if (_v11.$ === 'Good') {
													var good = _v11;
													return good;
												} else {
													var bad4 = _v11;
													var committed4 = bad4.a;
													var x4 = bad4.b;
													if (committed4) {
														return bad4;
													} else {
														var _v12 = attempt5(s);
														if (_v12.$ === 'Good') {
															var good = _v12;
															return good;
														} else {
															var bad5 = _v12;
															var committed5 = bad5.a;
															var x5 = bad5.b;
															if (committed5) {
																return bad5;
															} else {
																var _v13 = attempt6(s);
																if (_v13.$ === 'Good') {
																	var good = _v13;
																	return good;
																} else {
																	var bad6 = _v13;
																	var committed6 = bad6.a;
																	var x6 = bad6.b;
																	return committed6 ? bad6 : A2(
																		$stil4m$elm_syntax$ParserFast$Bad,
																		false,
																		A3(
																			$stil4m$elm_syntax$ParserFast$ExpectingOneOf,
																			x0,
																			x1,
																			_List_fromArray(
																				[x2, x3, x4, x5, x6])));
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValueMap = function (charToRes) {
	return A7(
		$stil4m$elm_syntax$ParserFast$oneOf7,
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'\'',
			charToRes(
				_Utils_chr('\''))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'\"',
			charToRes(
				_Utils_chr('\"'))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'n',
			charToRes(
				_Utils_chr('\n'))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			't',
			charToRes(
				_Utils_chr('\t'))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'r',
			charToRes(
				_Utils_chr('\u000D'))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'\\',
			charToRes(
				_Utils_chr('\\'))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'u{',
			A2(
				$stil4m$elm_syntax$ParserFast$followedBySymbol,
				'}',
				A3(
					$stil4m$elm_syntax$ParserFast$ifFollowedByWhileMapWithoutLinebreak,
					function (hex) {
						return charToRes(
							$elm$core$Char$fromCode(
								$stil4m$elm_syntax$Elm$Parser$Tokens$hexStringToInt(hex)));
					},
					$elm$core$Char$isHexDigit,
					$elm$core$Char$isHexDigit))));
};
var $stil4m$elm_syntax$ParserFast$oneOf2MapWithStartRowColumnAndEndRowColumn = F4(
	function (firstToChoice, _v0, secondToChoice, _v1) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v2 = attemptFirst(s);
				if (_v2.$ === 'Good') {
					var first = _v2.a;
					var s1 = _v2.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A5(firstToChoice, s.row, s.col, first, s1.row, s1.col),
						s1);
				} else {
					var firstCommitted = _v2.a;
					var firstX = _v2.b;
					if (firstCommitted) {
						return A2($stil4m$elm_syntax$ParserFast$Bad, firstCommitted, firstX);
					} else {
						var _v3 = attemptSecond(s);
						if (_v3.$ === 'Good') {
							var second = _v3.a;
							var s1 = _v3.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A5(secondToChoice, s.row, s.col, second, s1.row, s1.col),
								s1);
						} else {
							var secondCommitted = _v3.a;
							var secondX = _v3.b;
							return secondCommitted ? A2($stil4m$elm_syntax$ParserFast$Bad, secondCommitted, secondX) : A2(
								$stil4m$elm_syntax$ParserFast$Bad,
								false,
								A3($stil4m$elm_syntax$ParserFast$ExpectingOneOf, firstX, secondX, _List_Nil));
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteralMapWithRange = function (rangeAndCharToRes) {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'\'',
		A2(
			$stil4m$elm_syntax$ParserFast$followedBySymbol,
			'\'',
			A4(
				$stil4m$elm_syntax$ParserFast$oneOf2MapWithStartRowColumnAndEndRowColumn,
				F5(
					function (startRow, startColumn, _char, endRow, endColumn) {
						return A2(
							rangeAndCharToRes,
							{
								end: {column: endColumn + 1, row: endRow},
								start: {column: startColumn - 1, row: startRow}
							},
							_char);
					}),
				A2(
					$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
					'\\',
					$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValueMap($elm$core$Basics$identity)),
				F5(
					function (startRow, startColumn, _char, endRow, endColumn) {
						return A2(
							rangeAndCharToRes,
							{
								end: {column: endColumn + 1, row: endRow},
								start: {column: startColumn - 1, row: startRow}
							},
							_char);
					}),
				$stil4m$elm_syntax$ParserFast$anyChar)));
};
var $stil4m$elm_syntax$Elm$Parser$Expression$charLiteralExpression = $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteralMapWithRange(
	F2(
		function (range, _char) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Expression$CharLiteral(_char))
			};
		}));
var $stil4m$elm_syntax$Elm$Parser$Expression$errUnknownInfixOperator = $elm$core$Result$Err('unknown infix operator');
var $stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateMapWithRangeWithoutLinebreak = F4(
	function (toResult, firstIsOkay, afterFirstIsOkay, resultIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var firstOffset = A3($stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak, firstIsOkay, s0.offset, s0.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate, s0.row, s0.col));
				} else {
					var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, afterFirstIsOkay, firstOffset, s0.row, s0.col + 1, s0.src, s0.indent);
					var name = A3($elm$core$String$slice, s0.offset, s1.offset, s0.src);
					return resultIsOkay(name) ? A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A2(
							toResult,
							{
								end: {column: s1.col, row: s1.row},
								start: {column: s0.col, row: s0.row}
							},
							name),
						s1) : A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingStringSatisfyingPredicate, s0.row, s0.col + 1));
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$isNotReserved = function (name) {
	switch (name) {
		case 'module':
			return false;
		case 'exposing':
			return false;
		case 'import':
			return false;
		case 'as':
			return false;
		case 'if':
			return false;
		case 'then':
			return false;
		case 'else':
			return false;
		case 'let':
			return false;
		case 'in':
			return false;
		case 'case':
			return false;
		case 'of':
			return false;
		case 'port':
			return false;
		case 'type':
			return false;
		case 'where':
			return false;
		default:
			return true;
	}
};
var $stil4m$elm_syntax$Char$Extra$charCodeIsDigit = function (code) {
	return (code <= 57) && (48 <= code);
};
var $stil4m$elm_syntax$Char$Extra$charCodeIsLower = function (code) {
	return (97 <= code) && (code <= 122);
};
var $stil4m$elm_syntax$Char$Extra$charCodeIsUpper = function (code) {
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast = function (c) {
	var code = $elm$core$Char$toCode(c);
	return $stil4m$elm_syntax$Char$Extra$charCodeIsLower(code) || ($stil4m$elm_syntax$Char$Extra$charCodeIsUpper(code) || ($stil4m$elm_syntax$Char$Extra$charCodeIsDigit(code) || ((code === 95) || (((code !== 32) && (code !== 10)) && ((code < 256) ? (((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 90)) || (((97 <= code) && (code <= 122)) || ((code === 170) || (((178 <= code) && (code <= 179)) || ((code === 181) || (((185 <= code) && (code <= 186)) || (((188 <= code) && (code <= 190)) || (((192 <= code) && (code <= 214)) || (((216 <= code) && (code <= 246)) || ((248 <= code) && (code <= 255)))))))))))) : ((code < 43700) ? ((code < 4347) ? ((code < 2868) ? ((code < 2364) ? ((code < 1648) ? ((code < 930) ? (((256 <= code) && (code <= 705)) || (((710 <= code) && (code <= 721)) || (((736 <= code) && (code <= 740)) || (((880 <= code) && (code <= 884)) || (((886 <= code) && (code <= 887)) || (((890 <= code) && (code <= 893)) || ((code === 895) || ((code === 902) || (((904 <= code) && (code <= 906)) || ((code === 908) || (((910 <= code) && (code <= 929)) || ((!A2($elm$core$Basics$modBy, 2, code)) && ((748 <= code) && (code <= 750)))))))))))))) : (((931 <= code) && (code <= 1013)) || (((1015 <= code) && (code <= 1153)) || (((1162 <= code) && (code <= 1327)) || (((1329 <= code) && (code <= 1366)) || ((code === 1369) || (((1376 <= code) && (code <= 1416)) || (((1488 <= code) && (code <= 1514)) || (((1519 <= code) && (code <= 1522)) || (((1568 <= code) && (code <= 1610)) || (((1632 <= code) && (code <= 1641)) || ((1646 <= code) && (code <= 1647))))))))))))) : ((code < 2041) ? (((1649 <= code) && (code <= 1747)) || ((code === 1749) || (((1765 <= code) && (code <= 1766)) || (((1774 <= code) && (code <= 1788)) || ((code === 1791) || ((code === 1808) || (((1810 <= code) && (code <= 1839)) || (((1869 <= code) && (code <= 1957)) || ((code === 1969) || (((1984 <= code) && (code <= 2026)) || ((2036 <= code) && (code <= 2037)))))))))))) : ((code === 2042) || (((2048 <= code) && (code <= 2069)) || ((code === 2074) || ((code === 2084) || ((code === 2088) || (((2112 <= code) && (code <= 2136)) || (((2144 <= code) && (code <= 2154)) || (((2160 <= code) && (code <= 2183)) || (((2185 <= code) && (code <= 2190)) || (((2208 <= code) && (code <= 2249)) || ((2308 <= code) && (code <= 2361)))))))))))))) : ((code < 2609) ? ((code < 2492) ? ((code === 2365) || ((code === 2384) || (((2392 <= code) && (code <= 2401)) || (((2406 <= code) && (code <= 2415)) || (((2417 <= code) && (code <= 2432)) || (((2437 <= code) && (code <= 2444)) || (((2447 <= code) && (code <= 2448)) || (((2451 <= code) && (code <= 2472)) || (((2474 <= code) && (code <= 2480)) || ((code === 2482) || ((2486 <= code) && (code <= 2489)))))))))))) : ((code === 2493) || ((code === 2510) || (((2524 <= code) && (code <= 2525)) || (((2527 <= code) && (code <= 2529)) || (((2534 <= code) && (code <= 2545)) || (((2548 <= code) && (code <= 2553)) || ((code === 2556) || (((2565 <= code) && (code <= 2570)) || (((2575 <= code) && (code <= 2576)) || (((2579 <= code) && (code <= 2600)) || ((2602 <= code) && (code <= 2608))))))))))))) : ((code < 2737) ? (((2610 <= code) && (code <= 2611)) || (((2613 <= code) && (code <= 2614)) || (((2616 <= code) && (code <= 2617)) || (((2649 <= code) && (code <= 2652)) || ((code === 2654) || (((2662 <= code) && (code <= 2671)) || (((2674 <= code) && (code <= 2676)) || (((2693 <= code) && (code <= 2701)) || (((2703 <= code) && (code <= 2705)) || (((2707 <= code) && (code <= 2728)) || ((2730 <= code) && (code <= 2736)))))))))))) : (((2738 <= code) && (code <= 2739)) || (((2741 <= code) && (code <= 2745)) || ((code === 2749) || ((code === 2768) || (((2784 <= code) && (code <= 2785)) || (((2790 <= code) && (code <= 2799)) || ((code === 2809) || (((2821 <= code) && (code <= 2828)) || (((2831 <= code) && (code <= 2832)) || (((2835 <= code) && (code <= 2856)) || (((2858 <= code) && (code <= 2864)) || ((2866 <= code) && (code <= 2867)))))))))))))))) : ((code < 3411) ? ((code < 3132) ? ((code < 2971) ? (((2869 <= code) && (code <= 2873)) || ((code === 2877) || (((2908 <= code) && (code <= 2909)) || (((2911 <= code) && (code <= 2913)) || (((2918 <= code) && (code <= 2927)) || (((2929 <= code) && (code <= 2935)) || ((code === 2947) || (((2949 <= code) && (code <= 2954)) || (((2958 <= code) && (code <= 2960)) || (((2962 <= code) && (code <= 2965)) || ((2969 <= code) && (code <= 2970)))))))))))) : ((code === 2972) || (((2974 <= code) && (code <= 2975)) || (((2979 <= code) && (code <= 2980)) || (((2984 <= code) && (code <= 2986)) || (((2990 <= code) && (code <= 3001)) || ((code === 3024) || (((3046 <= code) && (code <= 3058)) || (((3077 <= code) && (code <= 3084)) || (((3086 <= code) && (code <= 3088)) || (((3090 <= code) && (code <= 3112)) || ((3114 <= code) && (code <= 3129))))))))))))) : ((code < 3252) ? ((code === 3133) || (((3160 <= code) && (code <= 3162)) || ((code === 3165) || (((3168 <= code) && (code <= 3169)) || (((3174 <= code) && (code <= 3183)) || (((3192 <= code) && (code <= 3198)) || ((code === 3200) || (((3205 <= code) && (code <= 3212)) || (((3214 <= code) && (code <= 3216)) || (((3218 <= code) && (code <= 3240)) || ((3242 <= code) && (code <= 3251)))))))))))) : (((3253 <= code) && (code <= 3257)) || ((code === 3261) || (((3293 <= code) && (code <= 3294)) || (((3296 <= code) && (code <= 3297)) || (((3302 <= code) && (code <= 3311)) || (((3313 <= code) && (code <= 3314)) || (((3332 <= code) && (code <= 3340)) || (((3342 <= code) && (code <= 3344)) || (((3346 <= code) && (code <= 3386)) || ((code === 3389) || (code === 3406))))))))))))) : ((code < 3775) ? ((code < 3633) ? (((3412 <= code) && (code <= 3414)) || (((3416 <= code) && (code <= 3425)) || (((3430 <= code) && (code <= 3448)) || (((3450 <= code) && (code <= 3455)) || (((3461 <= code) && (code <= 3478)) || (((3482 <= code) && (code <= 3505)) || (((3507 <= code) && (code <= 3515)) || ((code === 3517) || (((3520 <= code) && (code <= 3526)) || (((3558 <= code) && (code <= 3567)) || ((3585 <= code) && (code <= 3632)))))))))))) : (((3634 <= code) && (code <= 3635)) || (((3648 <= code) && (code <= 3654)) || (((3664 <= code) && (code <= 3673)) || (((3713 <= code) && (code <= 3714)) || ((code === 3716) || (((3718 <= code) && (code <= 3722)) || (((3724 <= code) && (code <= 3747)) || ((code === 3749) || (((3751 <= code) && (code <= 3760)) || (((3762 <= code) && (code <= 3763)) || (code === 3773)))))))))))) : ((code < 4175) ? (((3776 <= code) && (code <= 3780)) || ((code === 3782) || (((3792 <= code) && (code <= 3801)) || (((3804 <= code) && (code <= 3807)) || ((code === 3840) || (((3872 <= code) && (code <= 3891)) || (((3904 <= code) && (code <= 3911)) || (((3913 <= code) && (code <= 3948)) || (((3976 <= code) && (code <= 3980)) || (((4096 <= code) && (code <= 4138)) || ((4159 <= code) && (code <= 4169)))))))))))) : (((4176 <= code) && (code <= 4181)) || (((4186 <= code) && (code <= 4189)) || ((code === 4193) || (((4197 <= code) && (code <= 4198)) || (((4206 <= code) && (code <= 4208)) || (((4213 <= code) && (code <= 4225)) || ((code === 4238) || (((4240 <= code) && (code <= 4249)) || (((4256 <= code) && (code <= 4293)) || ((code === 4295) || ((code === 4301) || ((4304 <= code) && (code <= 4346))))))))))))))))) : ((code < 8454) ? ((code < 6527) ? ((code < 5760) ? ((code < 4801) ? (((4348 <= code) && (code <= 4680)) || (((4682 <= code) && (code <= 4685)) || (((4688 <= code) && (code <= 4694)) || ((code === 4696) || (((4698 <= code) && (code <= 4701)) || (((4704 <= code) && (code <= 4744)) || (((4746 <= code) && (code <= 4749)) || (((4752 <= code) && (code <= 4784)) || (((4786 <= code) && (code <= 4789)) || (((4792 <= code) && (code <= 4798)) || (code === 4800))))))))))) : (((4802 <= code) && (code <= 4805)) || (((4808 <= code) && (code <= 4822)) || (((4824 <= code) && (code <= 4880)) || (((4882 <= code) && (code <= 4885)) || (((4888 <= code) && (code <= 4954)) || (((4969 <= code) && (code <= 4988)) || (((4992 <= code) && (code <= 5007)) || (((5024 <= code) && (code <= 5109)) || (((5112 <= code) && (code <= 5117)) || (((5121 <= code) && (code <= 5740)) || ((5743 <= code) && (code <= 5759))))))))))))) : ((code < 6111) ? (((5761 <= code) && (code <= 5786)) || (((5792 <= code) && (code <= 5866)) || (((5870 <= code) && (code <= 5880)) || (((5888 <= code) && (code <= 5905)) || (((5919 <= code) && (code <= 5937)) || (((5952 <= code) && (code <= 5969)) || (((5984 <= code) && (code <= 5996)) || (((5998 <= code) && (code <= 6000)) || (((6016 <= code) && (code <= 6067)) || ((code === 6103) || (code === 6108))))))))))) : (((6112 <= code) && (code <= 6121)) || (((6128 <= code) && (code <= 6137)) || (((6160 <= code) && (code <= 6169)) || (((6176 <= code) && (code <= 6264)) || (((6272 <= code) && (code <= 6276)) || (((6279 <= code) && (code <= 6312)) || ((code === 6314) || (((6320 <= code) && (code <= 6389)) || (((6400 <= code) && (code <= 6430)) || (((6470 <= code) && (code <= 6509)) || ((6512 <= code) && (code <= 6516)))))))))))))) : ((code < 7417) ? ((code < 7042) ? (((6528 <= code) && (code <= 6571)) || (((6576 <= code) && (code <= 6601)) || (((6608 <= code) && (code <= 6618)) || (((6656 <= code) && (code <= 6678)) || (((6688 <= code) && (code <= 6740)) || (((6784 <= code) && (code <= 6793)) || (((6800 <= code) && (code <= 6809)) || ((code === 6823) || (((6917 <= code) && (code <= 6963)) || (((6981 <= code) && (code <= 6988)) || ((6992 <= code) && (code <= 7001)))))))))))) : (((7043 <= code) && (code <= 7072)) || (((7086 <= code) && (code <= 7141)) || (((7168 <= code) && (code <= 7203)) || (((7232 <= code) && (code <= 7241)) || (((7245 <= code) && (code <= 7293)) || (((7296 <= code) && (code <= 7304)) || (((7312 <= code) && (code <= 7354)) || (((7357 <= code) && (code <= 7359)) || (((7401 <= code) && (code <= 7404)) || (((7406 <= code) && (code <= 7411)) || ((7413 <= code) && (code <= 7414))))))))))))) : ((code < 8129) ? ((code === 7418) || (((7424 <= code) && (code <= 7615)) || (((7680 <= code) && (code <= 7957)) || (((7960 <= code) && (code <= 7965)) || (((7968 <= code) && (code <= 8005)) || (((8008 <= code) && (code <= 8013)) || (((8016 <= code) && (code <= 8023)) || (((8032 <= code) && (code <= 8061)) || (((8064 <= code) && (code <= 8116)) || (((8118 <= code) && (code <= 8124)) || ((code === 8126) || ((A2($elm$core$Basics$modBy, 2, code) === 1) && ((8025 <= code) && (code <= 8031)))))))))))))) : (((8130 <= code) && (code <= 8132)) || (((8134 <= code) && (code <= 8140)) || (((8144 <= code) && (code <= 8147)) || (((8150 <= code) && (code <= 8155)) || (((8160 <= code) && (code <= 8172)) || (((8178 <= code) && (code <= 8180)) || (((8182 <= code) && (code <= 8188)) || (((8304 <= code) && (code <= 8305)) || (((8308 <= code) && (code <= 8313)) || (((8319 <= code) && (code <= 8329)) || (((8336 <= code) && (code <= 8348)) || (code === 8450))))))))))))))) : ((code < 12783) ? ((code < 11647) ? ((code < 9449) ? ((code === 8455) || (((8458 <= code) && (code <= 8467)) || ((code === 8469) || (((8473 <= code) && (code <= 8477)) || (((8490 <= code) && (code <= 8493)) || (((8495 <= code) && (code <= 8505)) || (((8508 <= code) && (code <= 8511)) || (((8517 <= code) && (code <= 8521)) || ((code === 8526) || (((8528 <= code) && (code <= 8585)) || (((9312 <= code) && (code <= 9371)) || ((!A2($elm$core$Basics$modBy, 2, code)) && ((8484 <= code) && (code <= 8488)))))))))))))) : (((9450 <= code) && (code <= 9471)) || (((10102 <= code) && (code <= 10131)) || (((11264 <= code) && (code <= 11492)) || (((11499 <= code) && (code <= 11502)) || (((11506 <= code) && (code <= 11507)) || ((code === 11517) || (((11520 <= code) && (code <= 11557)) || ((code === 11559) || ((code === 11565) || (((11568 <= code) && (code <= 11623)) || (code === 11631)))))))))))) : ((code < 12320) ? (((11648 <= code) && (code <= 11670)) || (((11680 <= code) && (code <= 11686)) || (((11688 <= code) && (code <= 11694)) || (((11696 <= code) && (code <= 11702)) || (((11704 <= code) && (code <= 11710)) || (((11712 <= code) && (code <= 11718)) || (((11720 <= code) && (code <= 11726)) || (((11728 <= code) && (code <= 11734)) || (((11736 <= code) && (code <= 11742)) || ((code === 11823) || ((12293 <= code) && (code <= 12295)))))))))))) : (((12321 <= code) && (code <= 12329)) || (((12337 <= code) && (code <= 12341)) || (((12344 <= code) && (code <= 12348)) || (((12353 <= code) && (code <= 12438)) || (((12445 <= code) && (code <= 12447)) || (((12449 <= code) && (code <= 12538)) || (((12540 <= code) && (code <= 12543)) || (((12549 <= code) && (code <= 12591)) || (((12593 <= code) && (code <= 12686)) || (((12690 <= code) && (code <= 12693)) || ((12704 <= code) && (code <= 12735)))))))))))))) : ((code < 43019) ? ((code < 42559) ? (((12784 <= code) && (code <= 12799)) || (((12832 <= code) && (code <= 12841)) || (((12872 <= code) && (code <= 12879)) || (((12881 <= code) && (code <= 12895)) || (((12928 <= code) && (code <= 12937)) || (((12977 <= code) && (code <= 12991)) || (((13312 <= code) && (code <= 19903)) || (((19968 <= code) && (code <= 42124)) || (((42192 <= code) && (code <= 42237)) || (((42240 <= code) && (code <= 42508)) || ((42512 <= code) && (code <= 42539)))))))))))) : (((42560 <= code) && (code <= 42606)) || (((42623 <= code) && (code <= 42653)) || (((42656 <= code) && (code <= 42735)) || (((42775 <= code) && (code <= 42783)) || (((42786 <= code) && (code <= 42888)) || (((42891 <= code) && (code <= 42954)) || (((42960 <= code) && (code <= 42961)) || (((42966 <= code) && (code <= 42969)) || (((42994 <= code) && (code <= 43009)) || (((43011 <= code) && (code <= 43013)) || (((43015 <= code) && (code <= 43018)) || ((A2($elm$core$Basics$modBy, 2, code) === 1) && ((42963 <= code) && (code <= 42965))))))))))))))) : ((code < 43395) ? (((43020 <= code) && (code <= 43042)) || (((43056 <= code) && (code <= 43061)) || (((43072 <= code) && (code <= 43123)) || (((43138 <= code) && (code <= 43187)) || (((43216 <= code) && (code <= 43225)) || (((43250 <= code) && (code <= 43255)) || ((code === 43259) || (((43261 <= code) && (code <= 43262)) || (((43264 <= code) && (code <= 43301)) || (((43312 <= code) && (code <= 43334)) || ((43360 <= code) && (code <= 43388)))))))))))) : (((43396 <= code) && (code <= 43442)) || (((43471 <= code) && (code <= 43481)) || (((43488 <= code) && (code <= 43492)) || (((43494 <= code) && (code <= 43518)) || (((43520 <= code) && (code <= 43560)) || (((43584 <= code) && (code <= 43586)) || (((43588 <= code) && (code <= 43595)) || (((43600 <= code) && (code <= 43609)) || (((43616 <= code) && (code <= 43638)) || ((code === 43642) || (((43646 <= code) && (code <= 43695)) || (code === 43697))))))))))))))))) : ((code < 71351) ? ((code < 67671) ? ((code < 65548) ? ((code < 64286) ? ((code < 43867) ? (((43701 <= code) && (code <= 43702)) || (((43705 <= code) && (code <= 43709)) || (((43739 <= code) && (code <= 43741)) || (((43744 <= code) && (code <= 43754)) || (((43762 <= code) && (code <= 43764)) || (((43777 <= code) && (code <= 43782)) || (((43785 <= code) && (code <= 43790)) || (((43793 <= code) && (code <= 43798)) || (((43808 <= code) && (code <= 43814)) || (((43816 <= code) && (code <= 43822)) || (((43824 <= code) && (code <= 43866)) || ((!A2($elm$core$Basics$modBy, 2, code)) && ((43712 <= code) && (code <= 43714)))))))))))))) : (((43868 <= code) && (code <= 43881)) || (((43888 <= code) && (code <= 44002)) || (((44016 <= code) && (code <= 44025)) || (((44032 <= code) && (code <= 55203)) || (((55216 <= code) && (code <= 55238)) || (((55243 <= code) && (code <= 55291)) || (((63744 <= code) && (code <= 64109)) || (((64112 <= code) && (code <= 64217)) || (((64256 <= code) && (code <= 64262)) || (((64275 <= code) && (code <= 64279)) || (code === 64285)))))))))))) : ((code < 65135) ? (((64287 <= code) && (code <= 64296)) || (((64298 <= code) && (code <= 64310)) || (((64312 <= code) && (code <= 64316)) || ((code === 64318) || (((64320 <= code) && (code <= 64321)) || (((64323 <= code) && (code <= 64324)) || (((64326 <= code) && (code <= 64433)) || (((64467 <= code) && (code <= 64829)) || (((64848 <= code) && (code <= 64911)) || (((64914 <= code) && (code <= 64967)) || ((65008 <= code) && (code <= 65019)))))))))))) : (((65136 <= code) && (code <= 65140)) || (((65142 <= code) && (code <= 65276)) || (((65296 <= code) && (code <= 65305)) || (((65313 <= code) && (code <= 65338)) || (((65345 <= code) && (code <= 65370)) || (((65382 <= code) && (code <= 65470)) || (((65474 <= code) && (code <= 65479)) || (((65482 <= code) && (code <= 65487)) || (((65490 <= code) && (code <= 65495)) || (((65498 <= code) && (code <= 65500)) || ((65536 <= code) && (code <= 65547)))))))))))))) : ((code < 66775) ? ((code < 66272) ? (((65549 <= code) && (code <= 65574)) || (((65576 <= code) && (code <= 65594)) || (((65596 <= code) && (code <= 65597)) || (((65599 <= code) && (code <= 65613)) || (((65616 <= code) && (code <= 65629)) || (((65664 <= code) && (code <= 65786)) || (((65799 <= code) && (code <= 65843)) || (((65856 <= code) && (code <= 65912)) || (((65930 <= code) && (code <= 65931)) || (((66176 <= code) && (code <= 66204)) || ((66208 <= code) && (code <= 66256)))))))))))) : (((66273 <= code) && (code <= 66299)) || (((66304 <= code) && (code <= 66339)) || (((66349 <= code) && (code <= 66378)) || (((66384 <= code) && (code <= 66421)) || (((66432 <= code) && (code <= 66461)) || (((66464 <= code) && (code <= 66499)) || (((66504 <= code) && (code <= 66511)) || (((66513 <= code) && (code <= 66517)) || (((66560 <= code) && (code <= 66717)) || (((66720 <= code) && (code <= 66729)) || ((66736 <= code) && (code <= 66771))))))))))))) : ((code < 67071) ? (((66776 <= code) && (code <= 66811)) || (((66816 <= code) && (code <= 66855)) || (((66864 <= code) && (code <= 66915)) || (((66928 <= code) && (code <= 66938)) || (((66940 <= code) && (code <= 66954)) || (((66956 <= code) && (code <= 66962)) || (((66964 <= code) && (code <= 66965)) || (((66967 <= code) && (code <= 66977)) || (((66979 <= code) && (code <= 66993)) || (((66995 <= code) && (code <= 67001)) || ((67003 <= code) && (code <= 67004)))))))))))) : (((67072 <= code) && (code <= 67382)) || (((67392 <= code) && (code <= 67413)) || (((67424 <= code) && (code <= 67431)) || (((67456 <= code) && (code <= 67461)) || (((67463 <= code) && (code <= 67504)) || (((67506 <= code) && (code <= 67514)) || (((67584 <= code) && (code <= 67589)) || ((code === 67592) || (((67594 <= code) && (code <= 67637)) || (((67639 <= code) && (code <= 67640)) || ((code === 67644) || ((67647 <= code) && (code <= 67669)))))))))))))))) : ((code < 69871) ? ((code < 68471) ? ((code < 68116) ? (((67672 <= code) && (code <= 67702)) || (((67705 <= code) && (code <= 67742)) || (((67751 <= code) && (code <= 67759)) || (((67808 <= code) && (code <= 67826)) || (((67828 <= code) && (code <= 67829)) || (((67835 <= code) && (code <= 67867)) || (((67872 <= code) && (code <= 67897)) || (((67968 <= code) && (code <= 68023)) || (((68028 <= code) && (code <= 68047)) || (((68050 <= code) && (code <= 68096)) || ((68112 <= code) && (code <= 68115)))))))))))) : (((68117 <= code) && (code <= 68119)) || (((68121 <= code) && (code <= 68149)) || (((68160 <= code) && (code <= 68168)) || (((68192 <= code) && (code <= 68222)) || (((68224 <= code) && (code <= 68255)) || (((68288 <= code) && (code <= 68295)) || (((68297 <= code) && (code <= 68324)) || (((68331 <= code) && (code <= 68335)) || (((68352 <= code) && (code <= 68405)) || (((68416 <= code) && (code <= 68437)) || ((68440 <= code) && (code <= 68466))))))))))))) : ((code < 69423) ? (((68472 <= code) && (code <= 68497)) || (((68521 <= code) && (code <= 68527)) || (((68608 <= code) && (code <= 68680)) || (((68736 <= code) && (code <= 68786)) || (((68800 <= code) && (code <= 68850)) || (((68858 <= code) && (code <= 68899)) || (((68912 <= code) && (code <= 68921)) || (((69216 <= code) && (code <= 69246)) || (((69248 <= code) && (code <= 69289)) || (((69296 <= code) && (code <= 69297)) || ((69376 <= code) && (code <= 69415)))))))))))) : (((69424 <= code) && (code <= 69445)) || (((69457 <= code) && (code <= 69460)) || (((69488 <= code) && (code <= 69505)) || (((69552 <= code) && (code <= 69579)) || (((69600 <= code) && (code <= 69622)) || (((69635 <= code) && (code <= 69687)) || (((69714 <= code) && (code <= 69743)) || (((69745 <= code) && (code <= 69746)) || ((code === 69749) || (((69763 <= code) && (code <= 69807)) || ((69840 <= code) && (code <= 69864)))))))))))))) : ((code < 70404) ? ((code < 70112) ? (((69872 <= code) && (code <= 69881)) || (((69891 <= code) && (code <= 69926)) || (((69942 <= code) && (code <= 69951)) || ((code === 69956) || ((code === 69959) || (((69968 <= code) && (code <= 70002)) || ((code === 70006) || (((70019 <= code) && (code <= 70066)) || (((70081 <= code) && (code <= 70084)) || (((70096 <= code) && (code <= 70106)) || (code === 70108))))))))))) : (((70113 <= code) && (code <= 70132)) || (((70144 <= code) && (code <= 70161)) || (((70163 <= code) && (code <= 70187)) || (((70207 <= code) && (code <= 70208)) || (((70272 <= code) && (code <= 70278)) || ((code === 70280) || (((70282 <= code) && (code <= 70285)) || (((70287 <= code) && (code <= 70301)) || (((70303 <= code) && (code <= 70312)) || (((70320 <= code) && (code <= 70366)) || ((70384 <= code) && (code <= 70393))))))))))))) : ((code < 70735) ? (((70405 <= code) && (code <= 70412)) || (((70415 <= code) && (code <= 70416)) || (((70419 <= code) && (code <= 70440)) || (((70442 <= code) && (code <= 70448)) || (((70450 <= code) && (code <= 70451)) || (((70453 <= code) && (code <= 70457)) || ((code === 70461) || ((code === 70480) || (((70493 <= code) && (code <= 70497)) || (((70656 <= code) && (code <= 70708)) || ((70727 <= code) && (code <= 70730)))))))))))) : (((70736 <= code) && (code <= 70745)) || (((70751 <= code) && (code <= 70753)) || (((70784 <= code) && (code <= 70831)) || (((70852 <= code) && (code <= 70853)) || ((code === 70855) || (((70864 <= code) && (code <= 70873)) || (((71040 <= code) && (code <= 71086)) || (((71128 <= code) && (code <= 71131)) || (((71168 <= code) && (code <= 71215)) || ((code === 71236) || (((71248 <= code) && (code <= 71257)) || ((71296 <= code) && (code <= 71338))))))))))))))))) : ((code < 119893) ? ((code < 73727) ? ((code < 72703) ? ((code < 71959) ? ((code === 71352) || (((71360 <= code) && (code <= 71369)) || (((71424 <= code) && (code <= 71450)) || (((71472 <= code) && (code <= 71483)) || (((71488 <= code) && (code <= 71494)) || (((71680 <= code) && (code <= 71723)) || (((71840 <= code) && (code <= 71922)) || (((71935 <= code) && (code <= 71942)) || ((code === 71945) || (((71948 <= code) && (code <= 71955)) || ((71957 <= code) && (code <= 71958)))))))))))) : (((71960 <= code) && (code <= 71983)) || (((72016 <= code) && (code <= 72025)) || (((72096 <= code) && (code <= 72103)) || (((72106 <= code) && (code <= 72144)) || ((code === 72192) || (((72203 <= code) && (code <= 72242)) || ((code === 72250) || ((code === 72272) || (((72284 <= code) && (code <= 72329)) || ((code === 72349) || (((72368 <= code) && (code <= 72440)) || ((A2($elm$core$Basics$modBy, 2, code) === 1) && (((71999 <= code) && (code <= 72001)) || ((72161 <= code) && (code <= 72163)))))))))))))))) : ((code < 73062) ? (((72704 <= code) && (code <= 72712)) || (((72714 <= code) && (code <= 72750)) || ((code === 72768) || (((72784 <= code) && (code <= 72812)) || (((72818 <= code) && (code <= 72847)) || (((72960 <= code) && (code <= 72966)) || (((72968 <= code) && (code <= 72969)) || (((72971 <= code) && (code <= 73008)) || ((code === 73030) || (((73040 <= code) && (code <= 73049)) || ((73056 <= code) && (code <= 73061)))))))))))) : (((73063 <= code) && (code <= 73064)) || (((73066 <= code) && (code <= 73097)) || ((code === 73112) || (((73120 <= code) && (code <= 73129)) || (((73440 <= code) && (code <= 73458)) || ((code === 73474) || (((73476 <= code) && (code <= 73488)) || (((73490 <= code) && (code <= 73523)) || (((73552 <= code) && (code <= 73561)) || ((code === 73648) || ((73664 <= code) && (code <= 73684)))))))))))))) : ((code < 94098) ? ((code < 92863) ? (((73728 <= code) && (code <= 74649)) || (((74752 <= code) && (code <= 74862)) || (((74880 <= code) && (code <= 75075)) || (((77712 <= code) && (code <= 77808)) || (((77824 <= code) && (code <= 78895)) || (((78913 <= code) && (code <= 78918)) || (((82944 <= code) && (code <= 83526)) || (((92160 <= code) && (code <= 92728)) || (((92736 <= code) && (code <= 92766)) || (((92768 <= code) && (code <= 92777)) || ((92784 <= code) && (code <= 92862)))))))))))) : (((92864 <= code) && (code <= 92873)) || (((92880 <= code) && (code <= 92909)) || (((92928 <= code) && (code <= 92975)) || (((92992 <= code) && (code <= 92995)) || (((93008 <= code) && (code <= 93017)) || (((93019 <= code) && (code <= 93025)) || (((93027 <= code) && (code <= 93047)) || (((93053 <= code) && (code <= 93071)) || (((93760 <= code) && (code <= 93846)) || (((93952 <= code) && (code <= 94026)) || (code === 94032)))))))))))) : ((code < 110927) ? (((94099 <= code) && (code <= 94111)) || (((94176 <= code) && (code <= 94177)) || ((code === 94179) || (((94208 <= code) && (code <= 100343)) || (((100352 <= code) && (code <= 101589)) || (((101632 <= code) && (code <= 101640)) || (((110576 <= code) && (code <= 110579)) || (((110581 <= code) && (code <= 110587)) || (((110589 <= code) && (code <= 110590)) || (((110592 <= code) && (code <= 110882)) || (code === 110898))))))))))) : (((110928 <= code) && (code <= 110930)) || ((code === 110933) || (((110948 <= code) && (code <= 110951)) || (((110960 <= code) && (code <= 111355)) || (((113664 <= code) && (code <= 113770)) || (((113776 <= code) && (code <= 113788)) || (((113792 <= code) && (code <= 113800)) || (((113808 <= code) && (code <= 113817)) || (((119488 <= code) && (code <= 119507)) || (((119520 <= code) && (code <= 119539)) || (((119648 <= code) && (code <= 119672)) || ((119808 <= code) && (code <= 119892)))))))))))))))) : ((code < 124911) ? ((code < 120597) ? ((code < 120085) ? (((119894 <= code) && (code <= 119964)) || (((119966 <= code) && (code <= 119967)) || ((code === 119970) || (((119973 <= code) && (code <= 119974)) || (((119977 <= code) && (code <= 119980)) || (((119982 <= code) && (code <= 119993)) || ((code === 119995) || (((119997 <= code) && (code <= 120003)) || (((120005 <= code) && (code <= 120069)) || (((120071 <= code) && (code <= 120074)) || ((120077 <= code) && (code <= 120084)))))))))))) : (((120086 <= code) && (code <= 120092)) || (((120094 <= code) && (code <= 120121)) || (((120123 <= code) && (code <= 120126)) || (((120128 <= code) && (code <= 120132)) || ((code === 120134) || (((120138 <= code) && (code <= 120144)) || (((120146 <= code) && (code <= 120485)) || (((120488 <= code) && (code <= 120512)) || (((120514 <= code) && (code <= 120538)) || (((120540 <= code) && (code <= 120570)) || ((120572 <= code) && (code <= 120596))))))))))))) : ((code < 123135) ? (((120598 <= code) && (code <= 120628)) || (((120630 <= code) && (code <= 120654)) || (((120656 <= code) && (code <= 120686)) || (((120688 <= code) && (code <= 120712)) || (((120714 <= code) && (code <= 120744)) || (((120746 <= code) && (code <= 120770)) || (((120772 <= code) && (code <= 120779)) || (((120782 <= code) && (code <= 120831)) || (((122624 <= code) && (code <= 122654)) || (((122661 <= code) && (code <= 122666)) || ((122928 <= code) && (code <= 122989)))))))))))) : (((123136 <= code) && (code <= 123180)) || (((123191 <= code) && (code <= 123197)) || (((123200 <= code) && (code <= 123209)) || ((code === 123214) || (((123536 <= code) && (code <= 123565)) || (((123584 <= code) && (code <= 123627)) || (((123632 <= code) && (code <= 123641)) || (((124112 <= code) && (code <= 124139)) || (((124144 <= code) && (code <= 124153)) || (((124896 <= code) && (code <= 124902)) || (((124904 <= code) && (code <= 124907)) || ((124909 <= code) && (code <= 124910))))))))))))))) : ((code < 126560) ? ((code < 126463) ? (((124912 <= code) && (code <= 124926)) || (((124928 <= code) && (code <= 125124)) || (((125127 <= code) && (code <= 125135)) || (((125184 <= code) && (code <= 125251)) || ((code === 125259) || (((125264 <= code) && (code <= 125273)) || (((126065 <= code) && (code <= 126123)) || (((126125 <= code) && (code <= 126127)) || (((126129 <= code) && (code <= 126132)) || (((126209 <= code) && (code <= 126253)) || ((126255 <= code) && (code <= 126269)))))))))))) : (((126464 <= code) && (code <= 126467)) || (((126469 <= code) && (code <= 126495)) || (((126497 <= code) && (code <= 126498)) || ((code === 126500) || ((code === 126503) || (((126505 <= code) && (code <= 126514)) || (((126516 <= code) && (code <= 126519)) || ((code === 126530) || (((126541 <= code) && (code <= 126543)) || (((126545 <= code) && (code <= 126546)) || ((code === 126548) || ((A2($elm$core$Basics$modBy, 2, code) === 1) && (((126521 <= code) && (code <= 126523)) || (((126535 <= code) && (code <= 126539)) || ((126551 <= code) && (code <= 126559))))))))))))))))) : ((code < 126634) ? (((126561 <= code) && (code <= 126562)) || ((code === 126564) || (((126567 <= code) && (code <= 126570)) || (((126572 <= code) && (code <= 126578)) || (((126580 <= code) && (code <= 126583)) || (((126585 <= code) && (code <= 126588)) || ((code === 126590) || (((126592 <= code) && (code <= 126601)) || (((126603 <= code) && (code <= 126619)) || (((126625 <= code) && (code <= 126627)) || ((126629 <= code) && (code <= 126633)))))))))))) : (((126635 <= code) && (code <= 126651)) || (((127232 <= code) && (code <= 127244)) || (((130032 <= code) && (code <= 130041)) || (((131072 <= code) && (code <= 173791)) || (((173824 <= code) && (code <= 177977)) || (((177984 <= code) && (code <= 178205)) || (((178208 <= code) && (code <= 183969)) || (((183984 <= code) && (code <= 191456)) || (((191472 <= code) && (code <= 192093)) || (((194560 <= code) && (code <= 195101)) || (((196608 <= code) && (code <= 201546)) || ((201552 <= code) && (code <= 205743))))))))))))))))))))))));
};
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$toUpper = _String_toUpper;
var $stil4m$elm_syntax$Char$Extra$unicodeIsLowerFast = function (c) {
	var code = $elm$core$Char$toCode(c);
	var cString = $elm$core$String$fromChar(c);
	return $stil4m$elm_syntax$Char$Extra$charCodeIsLower(code) || ((_Utils_eq(
		$elm$core$String$toLower(cString),
		cString + '') && (!_Utils_eq(
		$elm$core$String$toUpper(cString),
		cString + ''))) ? ((code <= 836) || (((838 <= code) && (code <= 8559)) || (((8576 <= code) && (code <= 9423)) || ((9450 <= code) && (code <= 983040))))) : ((code < 43001) ? ((code < 8457) ? ((code < 590) ? (((311 <= code) && (code <= 312)) || (((396 <= code) && (code <= 397)) || (((409 <= code) && (code <= 411)) || (((426 <= code) && (code <= 427)) || (((441 <= code) && (code <= 442)) || (((445 <= code) && (code <= 447)) || ((code === 545) || ((563 <= code) && (code <= 569))))))))) : (((591 <= code) && (code <= 659)) || (((661 <= code) && (code <= 687)) || (((1019 <= code) && (code <= 1020)) || (((1376 <= code) && (code <= 1416)) || (((7424 <= code) && (code <= 7467)) || (((7531 <= code) && (code <= 7543)) || (((7545 <= code) && (code <= 7578)) || (((7829 <= code) && (code <= 7837)) || (code === 7839)))))))))) : ((code < 11376) ? ((code === 8458) || (((8462 <= code) && (code <= 8463)) || ((code === 8467) || ((code === 8495) || ((code === 8500) || ((code === 8505) || (((8508 <= code) && (code <= 8509)) || ((8518 <= code) && (code <= 8521))))))))) : ((code === 11377) || (((11379 <= code) && (code <= 11380)) || (((11382 <= code) && (code <= 11387)) || (((11491 <= code) && (code <= 11492)) || (((42799 <= code) && (code <= 42801)) || (((42865 <= code) && (code <= 42872)) || ((code === 42894) || (((42899 <= code) && (code <= 42901)) || ((code === 42927) || ((A2($elm$core$Basics$modBy, 2, code) === 1) && ((42963 <= code) && (code <= 42965)))))))))))))) : ((code < 120353) ? ((code < 119994) ? ((code === 43002) || (((43824 <= code) && (code <= 43866)) || (((43872 <= code) && (code <= 43880)) || (((119834 <= code) && (code <= 119859)) || (((119886 <= code) && (code <= 119892)) || (((119894 <= code) && (code <= 119911)) || (((119938 <= code) && (code <= 119963)) || ((119990 <= code) && (code <= 119993))))))))) : ((code === 119995) || (((119997 <= code) && (code <= 120003)) || (((120005 <= code) && (code <= 120015)) || (((120042 <= code) && (code <= 120067)) || (((120094 <= code) && (code <= 120119)) || (((120146 <= code) && (code <= 120171)) || (((120198 <= code) && (code <= 120223)) || (((120250 <= code) && (code <= 120275)) || ((120302 <= code) && (code <= 120327))))))))))) : ((code < 120655) ? (((120354 <= code) && (code <= 120379)) || (((120406 <= code) && (code <= 120431)) || (((120458 <= code) && (code <= 120485)) || (((120514 <= code) && (code <= 120538)) || (((120540 <= code) && (code <= 120545)) || (((120572 <= code) && (code <= 120596)) || (((120598 <= code) && (code <= 120603)) || ((120630 <= code) && (code <= 120654))))))))) : (((120656 <= code) && (code <= 120661)) || (((120688 <= code) && (code <= 120712)) || (((120714 <= code) && (code <= 120719)) || (((120746 <= code) && (code <= 120770)) || (((120772 <= code) && (code <= 120777)) || ((code === 120779) || (((122624 <= code) && (code <= 122633)) || (((122635 <= code) && (code <= 122654)) || ((122661 <= code) && (code <= 122666))))))))))))));
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode = A4($stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateMapWithRangeWithoutLinebreak, $stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Char$Extra$unicodeIsLowerFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast, $stil4m$elm_syntax$Elm$Parser$Tokens$isNotReserved);
var $stil4m$elm_syntax$Elm$Syntax$Expression$GLSLExpression = function (a) {
	return {$: 'GLSLExpression', a: a};
};
var $stil4m$elm_syntax$ParserFast$loopUntilHelp = F7(
	function (committedSoFar, endParser, element, soFar, reduce, foldedToRes, s0) {
		loopUntilHelp:
		while (true) {
			var parseEnd = endParser.a;
			var parseElement = element.a;
			var _v0 = parseEnd(s0);
			if (_v0.$ === 'Good') {
				var s1 = _v0.b;
				return A2(
					$stil4m$elm_syntax$ParserFast$Good,
					foldedToRes(soFar),
					s1);
			} else {
				var endCommitted = _v0.a;
				var endX = _v0.b;
				if (endCommitted) {
					return A2($stil4m$elm_syntax$ParserFast$Bad, true, endX);
				} else {
					var _v1 = parseElement(s0);
					if (_v1.$ === 'Good') {
						var elementResult = _v1.a;
						var s1 = _v1.b;
						var $temp$committedSoFar = true,
							$temp$endParser = endParser,
							$temp$element = element,
							$temp$soFar = A2(reduce, elementResult, soFar),
							$temp$reduce = reduce,
							$temp$foldedToRes = foldedToRes,
							$temp$s0 = s1;
						committedSoFar = $temp$committedSoFar;
						endParser = $temp$endParser;
						element = $temp$element;
						soFar = $temp$soFar;
						reduce = $temp$reduce;
						foldedToRes = $temp$foldedToRes;
						s0 = $temp$s0;
						continue loopUntilHelp;
					} else {
						var elementCommitted = _v1.a;
						var x = _v1.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, committedSoFar || elementCommitted, x);
					}
				}
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$loopUntil = F5(
	function (endParser, element, initialFolded, reduce, foldedToRes) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				return A7($stil4m$elm_syntax$ParserFast$loopUntilHelp, false, endParser, element, initialFolded, reduce, foldedToRes, s);
			});
	});
var $stil4m$elm_syntax$ParserFast$mapWithRange = F2(
	function (combineStartAndResult, _v0) {
		var parse = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var a = _v1.a;
					var s1 = _v1.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A2(
							combineStartAndResult,
							{
								end: {column: s1.col, row: s1.row},
								start: {column: s0.col, row: s0.row}
							},
							a),
						s1);
				} else {
					var committed = _v1.a;
					var x = _v1.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$glslExpressionAfterOpeningSquareBracket = A2(
	$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
	'glsl|',
	A2(
		$stil4m$elm_syntax$ParserFast$mapWithRange,
		F2(
			function (range, s) {
				return {
					comments: $stil4m$elm_syntax$Rope$empty,
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						{
							end: {column: range.end.column + 2, row: range.end.row},
							start: {column: range.start.column - 6, row: range.start.row}
						},
						$stil4m$elm_syntax$Elm$Syntax$Expression$GLSLExpression(s))
				};
			}),
		A5(
			$stil4m$elm_syntax$ParserFast$loopUntil,
			A2($stil4m$elm_syntax$ParserFast$symbol, '|]', _Utils_Tuple0),
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				A2($stil4m$elm_syntax$ParserFast$symbol, '|', '|'),
				$stil4m$elm_syntax$ParserFast$while(
					function (c) {
						return !_Utils_eq(
							c,
							_Utils_chr('|'));
					})),
			'',
			F2(
				function (extension, soFar) {
					return soFar + (extension + '');
				}),
			$elm$core$Basics$identity)));
var $stil4m$elm_syntax$ParserFast$ExpectingKeyword = F3(
	function (a, b, c) {
		return {$: 'ExpectingKeyword', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$Char$Extra$isLatinAlphaNumOrUnderscoreFast = function (c) {
	var code = $elm$core$Char$toCode(c);
	return $stil4m$elm_syntax$Char$Extra$charCodeIsLower(code) || ($stil4m$elm_syntax$Char$Extra$charCodeIsUpper(code) || ($stil4m$elm_syntax$Char$Extra$charCodeIsDigit(code) || (code === 95)));
};
var $stil4m$elm_syntax$ParserFast$isSubCharAlphaNumOrUnderscore = F2(
	function (offset, string) {
		return A2(
			$elm$core$String$any,
			$stil4m$elm_syntax$Char$Extra$isLatinAlphaNumOrUnderscoreFast,
			A3($elm$core$String$slice, offset, offset + 1, string));
	});
var $stil4m$elm_syntax$ParserFast$keyword = F2(
	function (kwd, res) {
		var kwdLength = $elm$core$String$length(kwd);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + kwdLength;
				return (_Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					kwd + '') && (!A2($stil4m$elm_syntax$ParserFast$isSubCharAlphaNumOrUnderscore, newOffset, s.src))) ? A2(
					$stil4m$elm_syntax$ParserFast$Good,
					res,
					{col: s.col + kwdLength, indent: s.indent, offset: newOffset, row: s.row, src: s.src}) : A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A3($stil4m$elm_syntax$ParserFast$ExpectingKeyword, s.row, s.col, kwd));
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$inToken = A2($stil4m$elm_syntax$ParserFast$keyword, 'in', _Utils_Tuple0);
var $stil4m$elm_syntax$ParserFast$keywordFollowedBy = F2(
	function (kwd, _v0) {
		var parseNext = _v0.a;
		var kwdLength = $elm$core$String$length(kwd);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + kwdLength;
				return (_Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					kwd + '') && (!A2($stil4m$elm_syntax$ParserFast$isSubCharAlphaNumOrUnderscore, newOffset, s.src))) ? $stil4m$elm_syntax$ParserFast$pStepCommit(
					parseNext(
						{col: s.col + kwdLength, indent: s.indent, offset: newOffset, row: s.row, src: s.src})) : A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A3($stil4m$elm_syntax$ParserFast$ExpectingKeyword, s.row, s.col, kwd));
			});
	});
var $stil4m$elm_syntax$ParserFast$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var committed = _v2.a;
					var x = _v2.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v2.a;
					var s1 = _v2.b;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var x = _v3.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v3.a;
						var s2 = _v3.b;
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$columnIndentAndThen = function (callback) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s) {
			var _v0 = A2(callback, s.col, s.indent);
			var parse = _v0.a;
			return parse(s);
		});
};
var $stil4m$elm_syntax$ParserFast$ExpectingCustom = F3(
	function (a, b, c) {
		return {$: 'ExpectingCustom', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$ParserFast$problem = function (msg) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s) {
			return A2(
				$stil4m$elm_syntax$ParserFast$Bad,
				false,
				A3($stil4m$elm_syntax$ParserFast$ExpectingCustom, s.row, s.col, msg));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Layout$problemTopIndentation = $stil4m$elm_syntax$ParserFast$problem('must be on top indentation');
var $stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy = function (nextParser) {
	return $stil4m$elm_syntax$ParserFast$columnIndentAndThen(
		F2(
			function (column, indent) {
				return (!(column - indent)) ? nextParser : $stil4m$elm_syntax$Elm$Parser$Layout$problemTopIndentation;
			}));
};
var $stil4m$elm_syntax$ParserFast$skipWhileWhitespaceHelp = F5(
	function (offset, row, col, src, indent) {
		skipWhileWhitespaceHelp:
		while (true) {
			var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
			switch (_v0) {
				case ' ':
					var $temp$offset = offset + 1,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileWhitespaceHelp;
				case '\n':
					var $temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileWhitespaceHelp;
				case '\u000D':
					var $temp$offset = offset + 1,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					continue skipWhileWhitespaceHelp;
				default:
					return {col: col, indent: indent, offset: offset, row: row, src: src};
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$followedBySkipWhileWhitespace = function (_v0) {
	var parseBefore = _v0.a;
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var _v1 = parseBefore(s0);
			if (_v1.$ === 'Good') {
				var res = _v1.a;
				var s1 = _v1.b;
				var s2 = A5($stil4m$elm_syntax$ParserFast$skipWhileWhitespaceHelp, s1.offset, s1.row, s1.col, s1.src, s1.indent);
				return A2($stil4m$elm_syntax$ParserFast$Good, res, s2);
			} else {
				var bad = _v1;
				return bad;
			}
		});
};
var $stil4m$elm_syntax$ParserFast$map2OrSucceed = F4(
	function (func, _v0, _v1, fallback) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var c1 = _v2.a;
					var x = _v2.b;
					return c1 ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2($stil4m$elm_syntax$ParserFast$Good, fallback, s0);
				} else {
					var a = _v2.a;
					var s1 = _v2.b;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var x = _v3.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v3.a;
						var s2 = _v3.b;
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$offsetSourceAndThen = function (callback) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s) {
			var _v0 = A2(callback, s.offset, s.src);
			var parse = _v0.a;
			return parse(s);
		});
};
var $stil4m$elm_syntax$Elm$Parser$Comments$problemUnexpectedDocumentation = $stil4m$elm_syntax$ParserFast$problem('unexpected documentation comment');
var $stil4m$elm_syntax$Elm$Parser$Comments$multilineComment = $stil4m$elm_syntax$ParserFast$offsetSourceAndThen(
	F2(
		function (offset, source) {
			var _v0 = A3($elm$core$String$slice, offset + 2, offset + 3, source);
			if (_v0 === '|') {
				return $stil4m$elm_syntax$Elm$Parser$Comments$problemUnexpectedDocumentation;
			} else {
				return $stil4m$elm_syntax$Elm$Parser$Comments$multiLineCommentNoCheck;
			}
		}));
var $stil4m$elm_syntax$Rope$Leaf = F2(
	function (a, b) {
		return {$: 'Leaf', a: a, b: b};
	});
var $stil4m$elm_syntax$Rope$one = function (onlyElement) {
	return A2($stil4m$elm_syntax$Rope$Leaf, onlyElement, _Utils_Tuple0);
};
var $stil4m$elm_syntax$ParserFast$loopWhileSucceedsHelp = F5(
	function (element, soFar, reduce, foldedToRes, s0) {
		loopWhileSucceedsHelp:
		while (true) {
			var parseElement = element.a;
			var _v0 = parseElement(s0);
			if (_v0.$ === 'Good') {
				var elementResult = _v0.a;
				var s1 = _v0.b;
				var $temp$element = element,
					$temp$soFar = A2(reduce, elementResult, soFar),
					$temp$reduce = reduce,
					$temp$foldedToRes = foldedToRes,
					$temp$s0 = s1;
				element = $temp$element;
				soFar = $temp$soFar;
				reduce = $temp$reduce;
				foldedToRes = $temp$foldedToRes;
				s0 = $temp$s0;
				continue loopWhileSucceedsHelp;
			} else {
				var elementCommitted = _v0.a;
				var x = _v0.b;
				return elementCommitted ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2(
					$stil4m$elm_syntax$ParserFast$Good,
					foldedToRes(soFar),
					s0);
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$loopWhileSucceeds = F4(
	function (element, initialFolded, reduce, foldedToRes) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				return A5($stil4m$elm_syntax$ParserFast$loopWhileSucceedsHelp, element, initialFolded, reduce, foldedToRes, s);
			});
	});
var $stil4m$elm_syntax$Rope$prependToFilled = F2(
	function (rightLikelyFilled, left) {
		if (left.$ === 'Nothing') {
			return $elm$core$Maybe$Just(rightLikelyFilled);
		} else {
			var leftLikelyFilled = left.a;
			return $elm$core$Maybe$Just(
				A2($stil4m$elm_syntax$Rope$Branch2, leftLikelyFilled, rightLikelyFilled));
		}
	});
var $stil4m$elm_syntax$ParserFast$whileMapWithRange = F2(
	function (isGood, rangeAndConsumedStringToRes) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileHelp, isGood, s0.offset, s0.row, s0.col, s0.src, s0.indent);
				return A2(
					$stil4m$elm_syntax$ParserFast$Good,
					A2(
						rangeAndConsumedStringToRes,
						{
							end: {column: s1.col, row: s1.row},
							start: {column: s0.col, row: s0.row}
						},
						A3($elm$core$String$slice, s0.offset, s1.offset, s0.src)),
					s1);
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Comments$singleLineComment = A2(
	$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
	'--',
	A2(
		$stil4m$elm_syntax$ParserFast$whileMapWithRange,
		function (c) {
			return (!_Utils_eq(
				c,
				_Utils_chr('\u000D'))) && ((!_Utils_eq(
				c,
				_Utils_chr('\n'))) && (!$stil4m$elm_syntax$Char$Extra$isUtf16Surrogate(c)));
		},
		F2(
			function (range, content) {
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					{
						end: {column: range.end.column, row: range.start.row},
						start: {column: range.start.column - 2, row: range.start.row}
					},
					'--' + content);
			})));
var $stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmptyLoop = A4(
	$stil4m$elm_syntax$ParserFast$loopWhileSucceeds,
	$stil4m$elm_syntax$ParserFast$followedBySkipWhileWhitespace(
		A2($stil4m$elm_syntax$ParserFast$oneOf2, $stil4m$elm_syntax$Elm$Parser$Comments$singleLineComment, $stil4m$elm_syntax$Elm$Parser$Comments$multilineComment)),
	$stil4m$elm_syntax$Rope$empty,
	F2(
		function (right, soFar) {
			return A2(
				$stil4m$elm_syntax$Rope$prependToFilled,
				$stil4m$elm_syntax$Rope$one(right),
				soFar);
		}),
	$elm$core$Basics$identity);
var $stil4m$elm_syntax$Elm$Parser$Layout$fromMultilineCommentNodeOrEmptyOnProblem = A4(
	$stil4m$elm_syntax$ParserFast$map2OrSucceed,
	F2(
		function (comment, commentsAfter) {
			return A2(
				$stil4m$elm_syntax$Rope$filledPrependTo,
				commentsAfter,
				$stil4m$elm_syntax$Rope$one(comment));
		}),
	$stil4m$elm_syntax$ParserFast$followedBySkipWhileWhitespace($stil4m$elm_syntax$Elm$Parser$Comments$multilineComment),
	$stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmptyLoop,
	$stil4m$elm_syntax$Rope$empty);
var $stil4m$elm_syntax$Elm$Parser$Layout$fromSingleLineCommentNode = A3(
	$stil4m$elm_syntax$ParserFast$map2,
	F2(
		function (content, commentsAfter) {
			return A2(
				$stil4m$elm_syntax$Rope$filledPrependTo,
				commentsAfter,
				$stil4m$elm_syntax$Rope$one(content));
		}),
	$stil4m$elm_syntax$ParserFast$followedBySkipWhileWhitespace($stil4m$elm_syntax$Elm$Parser$Comments$singleLineComment),
	$stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmptyLoop);
var $stil4m$elm_syntax$ParserFast$offsetSourceAndThenOrSucceed = F2(
	function (callback, fallback) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v0 = A2(callback, s.offset, s.src);
				if (_v0.$ === 'Nothing') {
					return A2($stil4m$elm_syntax$ParserFast$Good, fallback, s);
				} else {
					var parse = _v0.a.a;
					return parse(s);
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$skipWhileWhitespaceFollowedBy = function (_v0) {
	var parseNext = _v0.a;
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var s1 = A5($stil4m$elm_syntax$ParserFast$skipWhileWhitespaceHelp, s0.offset, s0.row, s0.col, s0.src, s0.indent);
			return $stil4m$elm_syntax$ParserFast$pStepCommit(
				parseNext(s1));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmpty = $stil4m$elm_syntax$ParserFast$skipWhileWhitespaceFollowedBy(
	A2(
		$stil4m$elm_syntax$ParserFast$offsetSourceAndThenOrSucceed,
		F2(
			function (offset, source) {
				var _v0 = A3($elm$core$String$slice, offset, offset + 2, source);
				switch (_v0) {
					case '--':
						return $elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Parser$Layout$fromSingleLineCommentNode);
					case '{-':
						return $elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Parser$Layout$fromMultilineCommentNodeOrEmptyOnProblem);
					default:
						return $elm$core$Maybe$Nothing;
				}
			}),
		$stil4m$elm_syntax$Rope$empty));
var $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout = $stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmpty;
var $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedBy = function (nextParser) {
	return A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (commentsBefore, after) {
				return {comments: commentsBefore, syntax: after};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(nextParser));
};
var $stil4m$elm_syntax$ParserFast$lazy = function (thunk) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $stil4m$elm_syntax$ParserFast$whileWithoutLinebreak = function (isGood) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, isGood, s0.offset, s0.row, s0.col, s0.src, s0.indent);
			return A2(
				$stil4m$elm_syntax$ParserFast$Good,
				A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
				s1);
		});
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$singleQuotedStringLiteralAfterDoubleQuote = A5(
	$stil4m$elm_syntax$ParserFast$loopUntil,
	A2($stil4m$elm_syntax$ParserFast$symbol, '\"', _Utils_Tuple0),
	A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'\\',
			$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValueMap($elm$core$String$fromChar)),
		$stil4m$elm_syntax$ParserFast$whileWithoutLinebreak(
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('\"'))) && ((!_Utils_eq(
					c,
					_Utils_chr('\\'))) && (!$stil4m$elm_syntax$Char$Extra$isUtf16Surrogate(c)));
			})),
	'',
	F2(
		function (extension, soFar) {
			return soFar + (extension + '');
		}),
	$elm$core$Basics$identity);
var $stil4m$elm_syntax$Elm$Parser$Tokens$tripleQuotedStringLiteralOfterTripleDoubleQuote = A5(
	$stil4m$elm_syntax$ParserFast$loopUntil,
	A2($stil4m$elm_syntax$ParserFast$symbol, '\"\"\"', _Utils_Tuple0),
	A3(
		$stil4m$elm_syntax$ParserFast$oneOf3,
		A2($stil4m$elm_syntax$ParserFast$symbol, '\"', '\"'),
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'\\',
			$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValueMap($elm$core$String$fromChar)),
		$stil4m$elm_syntax$ParserFast$while(
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('\"'))) && ((!_Utils_eq(
					c,
					_Utils_chr('\\'))) && (!$stil4m$elm_syntax$Char$Extra$isUtf16Surrogate(c)));
			})),
	'',
	F2(
		function (extension, soFar) {
			return soFar + (extension + '');
		}),
	$elm$core$Basics$identity);
var $stil4m$elm_syntax$Elm$Parser$Tokens$singleOrTripleQuotedStringLiteralMapWithRange = function (rangeAndStringToRes) {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'\"',
		A4(
			$stil4m$elm_syntax$ParserFast$oneOf2MapWithStartRowColumnAndEndRowColumn,
			F5(
				function (startRow, startColumn, string, endRow, endColumn) {
					return A2(
						rangeAndStringToRes,
						{
							end: {column: endColumn, row: endRow},
							start: {column: startColumn - 1, row: startRow}
						},
						string);
				}),
			A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '\"\"', $stil4m$elm_syntax$Elm$Parser$Tokens$tripleQuotedStringLiteralOfterTripleDoubleQuote),
			F5(
				function (startRow, startColumn, string, endRow, endColumn) {
					return A2(
						rangeAndStringToRes,
						{
							end: {column: endColumn, row: endRow},
							start: {column: startColumn - 1, row: startRow}
						},
						string);
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$singleQuotedStringLiteralAfterDoubleQuote));
};
var $stil4m$elm_syntax$Elm$Parser$Expression$literalExpression = $stil4m$elm_syntax$Elm$Parser$Tokens$singleOrTripleQuotedStringLiteralMapWithRange(
	F2(
		function (range, string) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Expression$Literal(string))
			};
		}));
var $stil4m$elm_syntax$ParserFast$loopWhileSucceedsOntoResultFromParser = F4(
	function (element, _v0, reduce, foldedToRes) {
		var parseInitialFolded = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parseInitialFolded(s0);
				if (_v1.$ === 'Good') {
					var initialFolded = _v1.a;
					var s1 = _v1.b;
					return A5($stil4m$elm_syntax$ParserFast$loopWhileSucceedsHelp, element, initialFolded, reduce, foldedToRes, s1);
				} else {
					var committed = _v1.a;
					var x = _v1.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				}
			});
	});
var $stil4m$elm_syntax$Rope$prependTo = F2(
	function (right, left) {
		if (left.$ === 'Nothing') {
			return right;
		} else {
			var leftLikelyFilled = left.a;
			if (right.$ === 'Nothing') {
				return left;
			} else {
				var rightLikelyFilled = right.a;
				return $elm$core$Maybe$Just(
					A2($stil4m$elm_syntax$Rope$Branch2, leftLikelyFilled, rightLikelyFilled));
			}
		}
	});
var $stil4m$elm_syntax$ParserWithComments$many = function (p) {
	return A4(
		$stil4m$elm_syntax$ParserFast$loopWhileSucceeds,
		p,
		_Utils_Tuple2($stil4m$elm_syntax$Rope$empty, _List_Nil),
		F2(
			function (pResult, _v0) {
				var commentsSoFar = _v0.a;
				var itemsSoFar = _v0.b;
				return _Utils_Tuple2(
					A2($stil4m$elm_syntax$Rope$prependTo, pResult.comments, commentsSoFar),
					A2($elm$core$List$cons, pResult.syntax, itemsSoFar));
			}),
		function (_v1) {
			var commentsSoFar = _v1.a;
			var itemsSoFar = _v1.b;
			return {
				comments: commentsSoFar,
				syntax: $elm$core$List$reverse(itemsSoFar)
			};
		});
};
var $stil4m$elm_syntax$ParserWithComments$manyWithoutReverse = function (p) {
	return A4(
		$stil4m$elm_syntax$ParserFast$loopWhileSucceeds,
		p,
		_Utils_Tuple2($stil4m$elm_syntax$Rope$empty, _List_Nil),
		F2(
			function (pResult, _v0) {
				var commentsSoFar = _v0.a;
				var itemsSoFar = _v0.b;
				return _Utils_Tuple2(
					A2($stil4m$elm_syntax$Rope$prependTo, pResult.comments, commentsSoFar),
					A2($elm$core$List$cons, pResult.syntax, itemsSoFar));
			}),
		function (_v1) {
			var commentsSoFar = _v1.a;
			var itemsSoFar = _v1.b;
			return {comments: commentsSoFar, syntax: itemsSoFar};
		});
};
var $stil4m$elm_syntax$ParserFast$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var a = _v1.a;
					var s1 = _v1.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						func(a),
						s1);
				} else {
					var committed = _v1.a;
					var x = _v1.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v3 = parseA(s0);
				if (_v3.$ === 'Bad') {
					var committed = _v3.a;
					var x = _v3.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v3.a;
					var s1 = _v3.b;
					var _v4 = parseB(s1);
					if (_v4.$ === 'Bad') {
						var x = _v4.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v4.a;
						var s2 = _v4.b;
						var _v5 = parseC(s2);
						if (_v5.$ === 'Bad') {
							var x = _v5.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v5.a;
							var s3 = _v5.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A3(func, a, b, c),
								s3);
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map3WithStartLocation = F4(
	function (func, _v0, _v1, _v2) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v3 = parseA(s0);
				if (_v3.$ === 'Bad') {
					var committed = _v3.a;
					var x = _v3.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v3.a;
					var s1 = _v3.b;
					var _v4 = parseB(s1);
					if (_v4.$ === 'Bad') {
						var x = _v4.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v4.a;
						var s2 = _v4.b;
						var _v5 = parseC(s2);
						if (_v5.$ === 'Bad') {
							var x = _v5.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v5.a;
							var s3 = _v5.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A4(
									func,
									{column: s0.col, row: s0.row},
									a,
									b,
									c),
								s3);
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map4 = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v4 = parseA(s0);
				if (_v4.$ === 'Bad') {
					var committed = _v4.a;
					var x = _v4.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v4.a;
					var s1 = _v4.b;
					var _v5 = parseB(s1);
					if (_v5.$ === 'Bad') {
						var x = _v5.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v5.a;
						var s2 = _v5.b;
						var _v6 = parseC(s2);
						if (_v6.$ === 'Bad') {
							var x = _v6.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v6.a;
							var s3 = _v6.b;
							var _v7 = parseD(s3);
							if (_v7.$ === 'Bad') {
								var x = _v7.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v7.a;
								var s4 = _v7.b;
								return A2(
									$stil4m$elm_syntax$ParserFast$Good,
									A4(func, a, b, c, d),
									s4);
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map4OrSucceed = F6(
	function (func, _v0, _v1, _v2, _v3, fallback) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v4 = parseA(s0);
				if (_v4.$ === 'Bad') {
					var c1 = _v4.a;
					var x = _v4.b;
					return c1 ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2($stil4m$elm_syntax$ParserFast$Good, fallback, s0);
				} else {
					var a = _v4.a;
					var s1 = _v4.b;
					var _v5 = parseB(s1);
					if (_v5.$ === 'Bad') {
						var x = _v5.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v5.a;
						var s2 = _v5.b;
						var _v6 = parseC(s2);
						if (_v6.$ === 'Bad') {
							var x = _v6.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v6.a;
							var s3 = _v6.b;
							var _v7 = parseD(s3);
							if (_v7.$ === 'Bad') {
								var x = _v7.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v7.a;
								var s4 = _v7.b;
								return A2(
									$stil4m$elm_syntax$ParserFast$Good,
									A4(func, a, b, c, d),
									s4);
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map4WithRange = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v4 = parseA(s0);
				if (_v4.$ === 'Bad') {
					var committed = _v4.a;
					var x = _v4.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v4.a;
					var s1 = _v4.b;
					var _v5 = parseB(s1);
					if (_v5.$ === 'Bad') {
						var x = _v5.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v5.a;
						var s2 = _v5.b;
						var _v6 = parseC(s2);
						if (_v6.$ === 'Bad') {
							var x = _v6.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v6.a;
							var s3 = _v6.b;
							var _v7 = parseD(s3);
							if (_v7.$ === 'Bad') {
								var x = _v7.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v7.a;
								var s4 = _v7.b;
								return A2(
									$stil4m$elm_syntax$ParserFast$Good,
									A5(
										func,
										{
											end: {column: s4.col, row: s4.row},
											start: {column: s0.col, row: s0.row}
										},
										a,
										b,
										c,
										d),
									s4);
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v5 = parseA(s0);
				if (_v5.$ === 'Bad') {
					var committed = _v5.a;
					var x = _v5.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v5.a;
					var s1 = _v5.b;
					var _v6 = parseB(s1);
					if (_v6.$ === 'Bad') {
						var x = _v6.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v6.a;
						var s2 = _v6.b;
						var _v7 = parseC(s2);
						if (_v7.$ === 'Bad') {
							var x = _v7.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v7.a;
							var s3 = _v7.b;
							var _v8 = parseD(s3);
							if (_v8.$ === 'Bad') {
								var x = _v8.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v8.a;
								var s4 = _v8.b;
								var _v9 = parseE(s4);
								if (_v9.$ === 'Bad') {
									var x = _v9.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v9.a;
									var s5 = _v9.b;
									return A2(
										$stil4m$elm_syntax$ParserFast$Good,
										A5(func, a, b, c, d, e),
										s5);
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map5WithRange = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v5 = parseA(s0);
				if (_v5.$ === 'Bad') {
					var committed = _v5.a;
					var x = _v5.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v5.a;
					var s1 = _v5.b;
					var _v6 = parseB(s1);
					if (_v6.$ === 'Bad') {
						var x = _v6.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v6.a;
						var s2 = _v6.b;
						var _v7 = parseC(s2);
						if (_v7.$ === 'Bad') {
							var x = _v7.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v7.a;
							var s3 = _v7.b;
							var _v8 = parseD(s3);
							if (_v8.$ === 'Bad') {
								var x = _v8.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v8.a;
								var s4 = _v8.b;
								var _v9 = parseE(s4);
								if (_v9.$ === 'Bad') {
									var x = _v9.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v9.a;
									var s5 = _v9.b;
									return A2(
										$stil4m$elm_syntax$ParserFast$Good,
										A6(
											func,
											{
												end: {column: s5.col, row: s5.row},
												start: {column: s0.col, row: s0.row}
											},
											a,
											b,
											c,
											d,
											e),
										s5);
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map5WithStartLocation = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v5 = parseA(s0);
				if (_v5.$ === 'Bad') {
					var committed = _v5.a;
					var x = _v5.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v5.a;
					var s1 = _v5.b;
					var _v6 = parseB(s1);
					if (_v6.$ === 'Bad') {
						var x = _v6.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v6.a;
						var s2 = _v6.b;
						var _v7 = parseC(s2);
						if (_v7.$ === 'Bad') {
							var x = _v7.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v7.a;
							var s3 = _v7.b;
							var _v8 = parseD(s3);
							if (_v8.$ === 'Bad') {
								var x = _v8.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v8.a;
								var s4 = _v8.b;
								var _v9 = parseE(s4);
								if (_v9.$ === 'Bad') {
									var x = _v9.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v9.a;
									var s5 = _v9.b;
									return A2(
										$stil4m$elm_syntax$ParserFast$Good,
										A6(
											func,
											{column: s0.col, row: s0.row},
											a,
											b,
											c,
											d,
											e),
										s5);
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map6WithStartLocation = F7(
	function (func, _v0, _v1, _v2, _v3, _v4, _v5) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		var parseF = _v5.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v6 = parseA(s0);
				if (_v6.$ === 'Bad') {
					var committed = _v6.a;
					var x = _v6.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v6.a;
					var s1 = _v6.b;
					var _v7 = parseB(s1);
					if (_v7.$ === 'Bad') {
						var x = _v7.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v7.a;
						var s2 = _v7.b;
						var _v8 = parseC(s2);
						if (_v8.$ === 'Bad') {
							var x = _v8.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v8.a;
							var s3 = _v8.b;
							var _v9 = parseD(s3);
							if (_v9.$ === 'Bad') {
								var x = _v9.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v9.a;
								var s4 = _v9.b;
								var _v10 = parseE(s4);
								if (_v10.$ === 'Bad') {
									var x = _v10.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v10.a;
									var s5 = _v10.b;
									var _v11 = parseF(s5);
									if (_v11.$ === 'Bad') {
										var x = _v11.b;
										return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
									} else {
										var f = _v11.a;
										var s6 = _v11.b;
										return A2(
											$stil4m$elm_syntax$ParserFast$Good,
											A7(
												func,
												{column: s0.col, row: s0.row},
												a,
												b,
												c,
												d,
												e,
												f),
											s6);
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map8WithStartLocation = F9(
	function (func, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		var parseF = _v5.a;
		var parseG = _v6.a;
		var parseH = _v7.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v8 = parseA(s0);
				if (_v8.$ === 'Bad') {
					var committed = _v8.a;
					var x = _v8.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v8.a;
					var s1 = _v8.b;
					var _v9 = parseB(s1);
					if (_v9.$ === 'Bad') {
						var x = _v9.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v9.a;
						var s2 = _v9.b;
						var _v10 = parseC(s2);
						if (_v10.$ === 'Bad') {
							var x = _v10.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v10.a;
							var s3 = _v10.b;
							var _v11 = parseD(s3);
							if (_v11.$ === 'Bad') {
								var x = _v11.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v11.a;
								var s4 = _v11.b;
								var _v12 = parseE(s4);
								if (_v12.$ === 'Bad') {
									var x = _v12.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v12.a;
									var s5 = _v12.b;
									var _v13 = parseF(s5);
									if (_v13.$ === 'Bad') {
										var x = _v13.b;
										return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
									} else {
										var f = _v13.a;
										var s6 = _v13.b;
										var _v14 = parseG(s6);
										if (_v14.$ === 'Bad') {
											var x = _v14.b;
											return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
										} else {
											var g = _v14.a;
											var s7 = _v14.b;
											var _v15 = parseH(s7);
											if (_v15.$ === 'Bad') {
												var x = _v15.b;
												return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
											} else {
												var h = _v15.a;
												var s8 = _v15.b;
												return A2(
													$stil4m$elm_syntax$ParserFast$Good,
													A9(
														func,
														{column: s0.col, row: s0.row},
														a,
														b,
														c,
														d,
														e,
														f,
														g,
														h),
													s8);
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$validateEndColumnIndentation = F3(
	function (isOkay, problemOnIsNotOkay, _v0) {
		var parse = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var good = _v1;
					var s1 = good.b;
					return A2(isOkay, s1.col, s1.indent) ? good : A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						true,
						A3($stil4m$elm_syntax$ParserFast$ExpectingCustom, s1.row, s1.col, problemOnIsNotOkay));
				} else {
					var bad = _v1;
					return bad;
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Layout$endsPositivelyIndented = function (parser) {
	return A3(
		$stil4m$elm_syntax$ParserFast$validateEndColumnIndentation,
		F2(
			function (column, indent) {
				return _Utils_cmp(column, indent) > 0;
			}),
		'must be positively indented',
		parser);
};
var $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout = $stil4m$elm_syntax$Elm$Parser$Layout$endsPositivelyIndented($stil4m$elm_syntax$Elm$Parser$Layout$whitespaceAndCommentsOrEmpty);
var $stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides = function (x) {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (before, v, after) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						after,
						A2($stil4m$elm_syntax$Rope$prependTo, v.comments, before)),
					syntax: v.syntax
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		x,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout);
};
var $stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccess = A4(
	$stil4m$elm_syntax$ParserFast$loopWhileSucceeds,
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '.', $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode),
	_List_Nil,
	$elm$core$List$cons,
	$elm$core$List$reverse);
var $stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccessMap = function (fieldsToRes) {
	return A4(
		$stil4m$elm_syntax$ParserFast$loopWhileSucceeds,
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '.', $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode),
		_List_Nil,
		$elm$core$List$cons,
		function (reversed) {
			return fieldsToRes(
				$elm$core$List$reverse(reversed));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Expression$negationWhitespaceProblem = $stil4m$elm_syntax$ParserFast$problem('if a negation sign is not preceded by whitespace, it\'s considered subtraction');
var $stil4m$elm_syntax$Elm$Parser$Tokens$equal = A2($stil4m$elm_syntax$ParserFast$symbol, '=', _Utils_Tuple0);
var $stil4m$elm_syntax$Elm$Syntax$Pattern$AsPattern = F2(
	function (a, b) {
		return {$: 'AsPattern', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ListPattern = function (a) {
	return {$: 'ListPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern = F2(
	function (a, b) {
		return {$: 'NamedPattern', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern = function (a) {
	return {$: 'ParenthesizedPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithAs = function (a) {
	return {$: 'PatternComposedWithAs', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithCons = function (a) {
	return {$: 'PatternComposedWithCons', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithNothing = function (a) {
	return {$: 'PatternComposedWithNothing', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$TuplePattern = function (a) {
	return {$: 'TuplePattern', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$UnConsPattern = F2(
	function (a, b) {
		return {$: 'UnConsPattern', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern = {$: 'UnitPattern'};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$AllPattern = {$: 'AllPattern'};
var $stil4m$elm_syntax$ParserFast$symbolWithRange = F2(
	function (str, startAndEndLocationToRes) {
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + strLength;
				if (_Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					str + '')) {
					var newCol = s.col + strLength;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						startAndEndLocationToRes(
							{
								end: {column: newCol, row: s.row},
								start: {column: s.col, row: s.row}
							}),
						{col: newCol, indent: s.indent, offset: newOffset, row: s.row, src: s.src});
				} else {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s.row, s.col, str));
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Patterns$allPattern = A2(
	$stil4m$elm_syntax$ParserFast$symbolWithRange,
	'_',
	function (range) {
		return {
			comments: $stil4m$elm_syntax$Rope$empty,
			syntax: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, $stil4m$elm_syntax$Elm$Syntax$Pattern$AllPattern)
		};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$CharPattern = function (a) {
	return {$: 'CharPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$charPattern = $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteralMapWithRange(
	F2(
		function (range, _char) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$CharPattern(_char))
			};
		}));
var $stil4m$elm_syntax$Elm$Syntax$Pattern$HexPattern = function (a) {
	return {$: 'HexPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$IntPattern = function (a) {
	return {$: 'IntPattern', a: a};
};
var $stil4m$elm_syntax$ParserFast$ExpectingNumber = F2(
	function (a, b) {
		return {$: 'ExpectingNumber', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$Decimal = {$: 'Decimal'};
var $stil4m$elm_syntax$ParserFast$Hexadecimal = {$: 'Hexadecimal'};
var $stil4m$elm_syntax$ParserFast$convert0OrMore0To9s = F3(
	function (soFar, offset, src) {
		convert0OrMore0To9s:
		while (true) {
			var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
			switch (_v0) {
				case '0':
					var $temp$soFar = soFar * 10,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '1':
					var $temp$soFar = (soFar * 10) + 1,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '2':
					var $temp$soFar = (soFar * 10) + 2,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '3':
					var $temp$soFar = (soFar * 10) + 3,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '4':
					var $temp$soFar = (soFar * 10) + 4,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '5':
					var $temp$soFar = (soFar * 10) + 5,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '6':
					var $temp$soFar = (soFar * 10) + 6,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '7':
					var $temp$soFar = (soFar * 10) + 7,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '8':
					var $temp$soFar = (soFar * 10) + 8,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				case '9':
					var $temp$soFar = (soFar * 10) + 9,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMore0To9s;
				default:
					return {_int: soFar, offset: offset};
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal = F3(
	function (soFar, offset, src) {
		convert0OrMoreHexadecimal:
		while (true) {
			var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
			switch (_v0) {
				case '0':
					var $temp$soFar = soFar * 16,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '1':
					var $temp$soFar = (soFar * 16) + 1,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '2':
					var $temp$soFar = (soFar * 16) + 2,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '3':
					var $temp$soFar = (soFar * 16) + 3,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '4':
					var $temp$soFar = (soFar * 16) + 4,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '5':
					var $temp$soFar = (soFar * 16) + 5,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '6':
					var $temp$soFar = (soFar * 16) + 6,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '7':
					var $temp$soFar = (soFar * 16) + 7,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '8':
					var $temp$soFar = (soFar * 16) + 8,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case '9':
					var $temp$soFar = (soFar * 16) + 9,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'a':
					var $temp$soFar = (soFar * 16) + 10,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'A':
					var $temp$soFar = (soFar * 16) + 10,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'b':
					var $temp$soFar = (soFar * 16) + 11,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'B':
					var $temp$soFar = (soFar * 16) + 11,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'c':
					var $temp$soFar = (soFar * 16) + 12,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'C':
					var $temp$soFar = (soFar * 16) + 12,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'd':
					var $temp$soFar = (soFar * 16) + 13,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'D':
					var $temp$soFar = (soFar * 16) + 13,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'e':
					var $temp$soFar = (soFar * 16) + 14,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'E':
					var $temp$soFar = (soFar * 16) + 14,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'f':
					var $temp$soFar = (soFar * 16) + 15,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				case 'F':
					var $temp$soFar = (soFar * 16) + 15,
						$temp$offset = offset + 1,
						$temp$src = src;
					soFar = $temp$soFar;
					offset = $temp$offset;
					src = $temp$src;
					continue convert0OrMoreHexadecimal;
				default:
					return {_int: soFar, offset: offset};
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$convert1OrMoreHexadecimal = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '0':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 0, offset + 1, src);
			case '1':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 1, offset + 1, src);
			case '2':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 2, offset + 1, src);
			case '3':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 3, offset + 1, src);
			case '4':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 4, offset + 1, src);
			case '5':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 5, offset + 1, src);
			case '6':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 6, offset + 1, src);
			case '7':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 7, offset + 1, src);
			case '8':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 8, offset + 1, src);
			case '9':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 9, offset + 1, src);
			case 'a':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 10, offset + 1, src);
			case 'A':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 10, offset + 1, src);
			case 'b':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 11, offset + 1, src);
			case 'B':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 11, offset + 1, src);
			case 'c':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 12, offset + 1, src);
			case 'C':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 12, offset + 1, src);
			case 'd':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 13, offset + 1, src);
			case 'D':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 13, offset + 1, src);
			case 'e':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 14, offset + 1, src);
			case 'E':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 14, offset + 1, src);
			case 'f':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 15, offset + 1, src);
			case 'F':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMoreHexadecimal, 15, offset + 1, src);
			default:
				return {_int: 0, offset: -1};
		}
	});
var $stil4m$elm_syntax$ParserFast$errorAsBaseOffsetAndInt = {
	base: $stil4m$elm_syntax$ParserFast$Decimal,
	offsetAndInt: {_int: 0, offset: -1}
};
var $stil4m$elm_syntax$ParserFast$convertIntegerDecimalOrHexadecimal = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '0':
				var _v1 = A3($elm$core$String$slice, offset + 1, offset + 2, src);
				if (_v1 === 'x') {
					var hex = A2($stil4m$elm_syntax$ParserFast$convert1OrMoreHexadecimal, offset + 2, src);
					return {
						base: $stil4m$elm_syntax$ParserFast$Hexadecimal,
						offsetAndInt: {_int: hex._int, offset: hex.offset}
					};
				} else {
					return {
						base: $stil4m$elm_syntax$ParserFast$Decimal,
						offsetAndInt: {_int: 0, offset: offset + 1}
					};
				}
			case '1':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 1, offset + 1, src)
				};
			case '2':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 2, offset + 1, src)
				};
			case '3':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 3, offset + 1, src)
				};
			case '4':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 4, offset + 1, src)
				};
			case '5':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 5, offset + 1, src)
				};
			case '6':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 6, offset + 1, src)
				};
			case '7':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 7, offset + 1, src)
				};
			case '8':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 8, offset + 1, src)
				};
			case '9':
				return {
					base: $stil4m$elm_syntax$ParserFast$Decimal,
					offsetAndInt: A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 9, offset + 1, src)
				};
			default:
				return $stil4m$elm_syntax$ParserFast$errorAsBaseOffsetAndInt;
		}
	});
var $stil4m$elm_syntax$ParserFast$integerDecimalOrHexadecimalMapWithRange = F2(
	function (rangeAndIntDecimalToRes, rangeAndIntHexadecimalToRes) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var s1 = A2($stil4m$elm_syntax$ParserFast$convertIntegerDecimalOrHexadecimal, s0.offset, s0.src);
				if (_Utils_eq(s1.offsetAndInt.offset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingNumber, s0.row, s0.col));
				} else {
					var newColumn = s0.col + (s1.offsetAndInt.offset - s0.offset);
					var range = {
						end: {column: newColumn, row: s0.row},
						start: {column: s0.col, row: s0.row}
					};
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						function () {
							var _v0 = s1.base;
							if (_v0.$ === 'Decimal') {
								return A2(rangeAndIntDecimalToRes, range, s1.offsetAndInt._int);
							} else {
								return A2(rangeAndIntHexadecimalToRes, range, s1.offsetAndInt._int);
							}
						}(),
						{col: newColumn, indent: s0.indent, offset: s1.offsetAndInt.offset, row: s0.row, src: s0.src});
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Patterns$numberPart = A2(
	$stil4m$elm_syntax$ParserFast$integerDecimalOrHexadecimalMapWithRange,
	F2(
		function (range, n) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$IntPattern(n))
			};
		}),
	F2(
		function (range, n) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$HexPattern(n))
			};
		}));
var $stil4m$elm_syntax$ParserFast$oneOf2OrSucceed = F3(
	function (_v0, _v1, thirdRes) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v2 = attemptFirst(s);
				if (_v2.$ === 'Good') {
					var firstGood = _v2;
					return firstGood;
				} else {
					var firstBad = _v2;
					var firstCommitted = firstBad.a;
					if (firstCommitted) {
						return firstBad;
					} else {
						var _v3 = attemptSecond(s);
						if (_v3.$ === 'Good') {
							var secondGood = _v3;
							return secondGood;
						} else {
							var secondBad = _v3;
							var secondCommitted = secondBad.a;
							return secondCommitted ? secondBad : A2($stil4m$elm_syntax$ParserFast$Good, thirdRes, s);
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$oneOf9 = F9(
	function (_v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7, _v8) {
		var attempt0 = _v0.a;
		var attempt1 = _v1.a;
		var attempt2 = _v2.a;
		var attempt3 = _v3.a;
		var attempt4 = _v4.a;
		var attempt5 = _v5.a;
		var attempt6 = _v6.a;
		var attempt7 = _v7.a;
		var attempt8 = _v8.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v9 = attempt0(s);
				if (_v9.$ === 'Good') {
					var good = _v9;
					return good;
				} else {
					var bad0 = _v9;
					var committed0 = bad0.a;
					var x0 = bad0.b;
					if (committed0) {
						return bad0;
					} else {
						var _v10 = attempt1(s);
						if (_v10.$ === 'Good') {
							var good = _v10;
							return good;
						} else {
							var bad1 = _v10;
							var committed1 = bad1.a;
							var x1 = bad1.b;
							if (committed1) {
								return bad1;
							} else {
								var _v11 = attempt2(s);
								if (_v11.$ === 'Good') {
									var good = _v11;
									return good;
								} else {
									var bad2 = _v11;
									var committed2 = bad2.a;
									var x2 = bad2.b;
									if (committed2) {
										return bad2;
									} else {
										var _v12 = attempt3(s);
										if (_v12.$ === 'Good') {
											var good = _v12;
											return good;
										} else {
											var bad3 = _v12;
											var committed3 = bad3.a;
											var x3 = bad3.b;
											if (committed3) {
												return bad3;
											} else {
												var _v13 = attempt4(s);
												if (_v13.$ === 'Good') {
													var good = _v13;
													return good;
												} else {
													var bad4 = _v13;
													var committed4 = bad4.a;
													var x4 = bad4.b;
													if (committed4) {
														return bad4;
													} else {
														var _v14 = attempt5(s);
														if (_v14.$ === 'Good') {
															var good = _v14;
															return good;
														} else {
															var bad5 = _v14;
															var committed5 = bad5.a;
															var x5 = bad5.b;
															if (committed5) {
																return bad5;
															} else {
																var _v15 = attempt6(s);
																if (_v15.$ === 'Good') {
																	var good = _v15;
																	return good;
																} else {
																	var bad6 = _v15;
																	var committed6 = bad6.a;
																	var x6 = bad6.b;
																	if (committed6) {
																		return bad6;
																	} else {
																		var _v16 = attempt7(s);
																		if (_v16.$ === 'Good') {
																			var good = _v16;
																			return good;
																		} else {
																			var bad7 = _v16;
																			var committed7 = bad7.a;
																			var x7 = bad7.b;
																			if (committed7) {
																				return bad7;
																			} else {
																				var _v17 = attempt8(s);
																				if (_v17.$ === 'Good') {
																					var good = _v17;
																					return good;
																				} else {
																					var bad8 = _v17;
																					var committed8 = bad8.a;
																					var x8 = bad8.b;
																					return committed8 ? bad8 : A2(
																						$stil4m$elm_syntax$ParserFast$Bad,
																						false,
																						A3(
																							$stil4m$elm_syntax$ParserFast$ExpectingOneOf,
																							x0,
																							x1,
																							_List_fromArray(
																								[x2, x3, x4, x5, x6, x7, x8])));
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Patterns$patternListEmpty = $stil4m$elm_syntax$Elm$Syntax$Pattern$ListPattern(_List_Nil);
var $stil4m$elm_syntax$Elm$Parser$Layout$problemPositivelyIndented = $stil4m$elm_syntax$ParserFast$problem('must be positively indented');
var $stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy = function (nextParser) {
	return $stil4m$elm_syntax$ParserFast$columnIndentAndThen(
		F2(
			function (column, indent) {
				return (_Utils_cmp(column, indent) > 0) ? nextParser : $stil4m$elm_syntax$Elm$Parser$Layout$problemPositivelyIndented;
			}));
};
var $stil4m$elm_syntax$ParserFast$ifFollowedByWhileWithoutLinebreak = F2(
	function (firstIsOkay, afterFirstIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var firstOffset = A3($stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak, firstIsOkay, s.offset, s.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate, s.row, s.col));
				} else {
					var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, afterFirstIsOkay, firstOffset, s.row, s.col + 1, s.src, s.indent);
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A3($elm$core$String$slice, s.offset, s1.offset, s.src),
						s1);
				}
			});
	});
var $stil4m$elm_syntax$Char$Extra$unicodeIsUpperFast = function (c) {
	var code = $elm$core$Char$toCode(c);
	return $stil4m$elm_syntax$Char$Extra$charCodeIsUpper(code) || function () {
		var cString = $elm$core$String$fromChar(c);
		return (_Utils_eq(
			$elm$core$String$toUpper(cString),
			cString + '') && (!_Utils_eq(
			$elm$core$String$toLower(cString),
			cString + ''))) ? ((code <= 8543) || (((8560 <= code) && (code <= 9397)) || ((9424 <= code) && (code <= 983040)))) : ((code < 120015) ? ((code < 8509) ? (((978 <= code) && (code <= 980)) || ((code === 8450) || ((code === 8455) || (((8459 <= code) && (code <= 8461)) || (((8464 <= code) && (code <= 8466)) || ((code === 8469) || (((8473 <= code) && (code <= 8477)) || ((code === 8484) || ((code === 8488) || (((8490 <= code) && (code <= 8493)) || ((8496 <= code) && (code <= 8499)))))))))))) : (((8510 <= code) && (code <= 8511)) || ((code === 8517) || (((119808 <= code) && (code <= 119833)) || (((119860 <= code) && (code <= 119885)) || (((119912 <= code) && (code <= 119937)) || ((code === 119964) || (((119966 <= code) && (code <= 119967)) || ((code === 119970) || (((119973 <= code) && (code <= 119974)) || (((119977 <= code) && (code <= 119980)) || ((119982 <= code) && (code <= 119989))))))))))))) : ((code < 120223) ? (((120016 <= code) && (code <= 120041)) || (((120068 <= code) && (code <= 120069)) || (((120071 <= code) && (code <= 120074)) || (((120077 <= code) && (code <= 120084)) || (((120086 <= code) && (code <= 120092)) || (((120120 <= code) && (code <= 120121)) || (((120123 <= code) && (code <= 120126)) || (((120128 <= code) && (code <= 120132)) || ((code === 120134) || (((120138 <= code) && (code <= 120144)) || ((120172 <= code) && (code <= 120197)))))))))))) : (((120224 <= code) && (code <= 120249)) || (((120276 <= code) && (code <= 120301)) || (((120328 <= code) && (code <= 120353)) || (((120380 <= code) && (code <= 120405)) || (((120432 <= code) && (code <= 120457)) || (((120488 <= code) && (code <= 120512)) || (((120546 <= code) && (code <= 120570)) || (((120604 <= code) && (code <= 120628)) || (((120662 <= code) && (code <= 120686)) || (((120720 <= code) && (code <= 120744)) || (code === 120778)))))))))))));
	}();
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$typeName = A2($stil4m$elm_syntax$ParserFast$ifFollowedByWhileWithoutLinebreak, $stil4m$elm_syntax$Char$Extra$unicodeIsUpperFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast);
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeDotTypeNamesTuple() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map2OrSucceed,
		F2(
			function (startName, afterStartName) {
				if (afterStartName.$ === 'Nothing') {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(_List_Nil, startName));
				} else {
					var _v1 = afterStartName.a;
					var qualificationAfter = _v1.a;
					var unqualified = _v1.b;
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(
							A2($elm$core$List$cons, startName, qualificationAfter),
							unqualified));
				}
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '.', $stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v2) {
				return $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeDotTypeNamesTuple();
			}),
		$elm$core$Maybe$Nothing);
}
try {
	var $stil4m$elm_syntax$Elm$Parser$Patterns$maybeDotTypeNamesTuple = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeDotTypeNamesTuple();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeDotTypeNamesTuple = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$maybeDotTypeNamesTuple;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.Patterns` are causing infinite recursion:\n\n  ┌─────┐\n  │    maybeDotTypeNamesTuple\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedNameRefNode = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, firstName, after) {
			return A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				range,
				function () {
					if (after.$ === 'Nothing') {
						return {moduleName: _List_Nil, name: firstName};
					} else {
						var _v1 = after.a;
						var qualificationAfter = _v1.a;
						var unqualified = _v1.b;
						return {
							moduleName: A2($elm$core$List$cons, firstName, qualificationAfter),
							name: unqualified
						};
					}
				}());
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
	$stil4m$elm_syntax$Elm$Parser$Patterns$maybeDotTypeNamesTuple);
var $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternWithoutConsumeArgs = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, firstName, after) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
						function () {
							if (after.$ === 'Nothing') {
								return {moduleName: _List_Nil, name: firstName};
							} else {
								var _v1 = after.a;
								var qualificationAfter = _v1.a;
								var unqualified = _v1.b;
								return {
									moduleName: A2($elm$core$List$cons, firstName, qualificationAfter),
									name: unqualified
								};
							}
						}(),
						_List_Nil))
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
	$stil4m$elm_syntax$Elm$Parser$Patterns$maybeDotTypeNamesTuple);
var $stil4m$elm_syntax$Elm$Syntax$Pattern$RecordPattern = function (a) {
	return {$: 'RecordPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$recordPattern = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, commentsBeforeElements, elements) {
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, elements.comments, commentsBeforeElements),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$RecordPattern(elements.syntax))
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '{', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		A2(
			$stil4m$elm_syntax$ParserFast$followedBySymbol,
			'}',
			A4(
				$stil4m$elm_syntax$ParserFast$map3,
				F3(
					function (head, commentsAfterHead, tail) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, tail.comments, commentsAfterHead),
							syntax: A2($elm$core$List$cons, head, tail.syntax)
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$ParserWithComments$many(
					A2(
						$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
						',',
						A4(
							$stil4m$elm_syntax$ParserFast$map3,
							F3(
								function (beforeName, name, afterName) {
									return {
										comments: A2($stil4m$elm_syntax$Rope$prependTo, afterName, beforeName),
										syntax: name
									};
								}),
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
							$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))))),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'}',
			{comments: $stil4m$elm_syntax$Rope$empty, syntax: _List_Nil})));
var $stil4m$elm_syntax$Elm$Syntax$Pattern$StringPattern = function (a) {
	return {$: 'StringPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$stringPattern = $stil4m$elm_syntax$Elm$Parser$Tokens$singleOrTripleQuotedStringLiteralMapWithRange(
	F2(
		function (range, string) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$StringPattern(string))
			};
		}));
var $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern = function (a) {
	return {$: 'VarPattern', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange = function (rangeAndNameToResult) {
	return A4($stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateMapWithRangeWithoutLinebreak, rangeAndNameToResult, $stil4m$elm_syntax$Char$Extra$unicodeIsLowerFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast, $stil4m$elm_syntax$Elm$Parser$Tokens$isNotReserved);
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$varPattern = $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange(
	F2(
		function (range, _var) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(_var))
			};
		}));
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePatternTryToCompose() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (x, commentsAfterLeft, maybeComposedWithResult) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						maybeComposedWithResult.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterLeft, x.comments)),
					syntax: function () {
						var _v7 = maybeComposedWithResult.syntax;
						switch (_v7.$) {
							case 'PatternComposedWithNothing':
								return x.syntax;
							case 'PatternComposedWithAs':
								var anotherName = _v7.a;
								return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Pattern$AsPattern, x.syntax, anotherName);
							default:
								var y = _v7.a;
								return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Pattern$UnConsPattern, x.syntax, y);
						}
					}()
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern(),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeComposedWith());
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern() {
	return A9(
		$stil4m$elm_syntax$ParserFast$oneOf9,
		$stil4m$elm_syntax$Elm$Parser$Patterns$varPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternWithConsumeArgs(),
		$stil4m$elm_syntax$Elm$Parser$Patterns$allPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern(),
		$stil4m$elm_syntax$Elm$Parser$Patterns$recordPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$stringPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern(),
		$stil4m$elm_syntax$Elm$Parser$Patterns$numberPart,
		$stil4m$elm_syntax$Elm$Parser$Patterns$charPattern);
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternWithConsumeArgs() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (_v4, afterStartName, argsReverse) {
				var nameRange = _v4.a;
				var name = _v4.b;
				var range = function () {
					var _v5 = argsReverse.syntax;
					if (!_v5.b) {
						return nameRange;
					} else {
						var _v6 = _v5.a;
						var lastArgRange = _v6.a;
						return {end: lastArgRange.end, start: nameRange.start};
					}
				}();
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, argsReverse.comments, afterStartName),
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						A2(
							$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
							name,
							$elm$core$List$reverse(argsReverse.syntax)))
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedNameRefNode,
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
			$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy(
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (arg, commentsAfterArg) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterArg, arg.comments),
								syntax: arg.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$patternNotDirectlyComposing(),
					$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout))));
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$patternNotDirectlyComposing() {
	return A9(
		$stil4m$elm_syntax$ParserFast$oneOf9,
		$stil4m$elm_syntax$Elm$Parser$Patterns$varPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternWithoutConsumeArgs,
		$stil4m$elm_syntax$Elm$Parser$Patterns$allPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern(),
		$stil4m$elm_syntax$Elm$Parser$Patterns$recordPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$stringPattern,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern(),
		$stil4m$elm_syntax$Elm$Parser$Patterns$numberPart,
		$stil4m$elm_syntax$Elm$Parser$Patterns$charPattern);
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern() {
	return A3(
		$stil4m$elm_syntax$ParserFast$map2WithRange,
		F3(
			function (range, commentsBeforeElements, maybeElements) {
				if (maybeElements.$ === 'Nothing') {
					return {
						comments: commentsBeforeElements,
						syntax: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, $stil4m$elm_syntax$Elm$Parser$Patterns$patternListEmpty)
					};
				} else {
					var elements = maybeElements.a;
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, elements.comments, commentsBeforeElements),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							range,
							$stil4m$elm_syntax$Elm$Syntax$Pattern$ListPattern(elements.syntax))
					};
				}
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '[', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		A2(
			$stil4m$elm_syntax$ParserFast$oneOf2,
			A2($stil4m$elm_syntax$ParserFast$symbol, ']', $elm$core$Maybe$Nothing),
			A2(
				$stil4m$elm_syntax$ParserFast$followedBySymbol,
				']',
				A4(
					$stil4m$elm_syntax$ParserFast$map3,
					F3(
						function (head, commentsAfterHead, tail) {
							return $elm$core$Maybe$Just(
								{
									comments: A2(
										$stil4m$elm_syntax$Rope$prependTo,
										commentsAfterHead,
										A2($stil4m$elm_syntax$Rope$prependTo, tail.comments, head.comments)),
									syntax: A2($elm$core$List$cons, head.syntax, tail.syntax)
								});
						}),
					$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern(),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$ParserWithComments$many(
						A2(
							$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
							',',
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
								$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern())))))));
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeComposedWith() {
	return A3(
		$stil4m$elm_syntax$ParserFast$oneOf2OrSucceed,
		A2(
			$stil4m$elm_syntax$ParserFast$keywordFollowedBy,
			'as',
			A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsAfterAs, name) {
						return {
							comments: commentsAfterAs,
							syntax: $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithAs(name)
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode)),
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'::',
			A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsAfterCons, patternResult) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterCons, patternResult.comments),
							syntax: $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithCons(patternResult.syntax)
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern())),
		{
			comments: $stil4m$elm_syntax$Rope$empty,
			syntax: $stil4m$elm_syntax$Elm$Parser$Patterns$PatternComposedWithNothing(_Utils_Tuple0)
		});
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'(',
		A3(
			$stil4m$elm_syntax$ParserFast$map2WithRange,
			F3(
				function (range, commentsBeforeHead, contentResult) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, contentResult.comments, commentsBeforeHead),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: range.end,
								start: {column: range.start.column - 1, row: range.start.row}
							},
							contentResult.syntax)
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				A2(
					$stil4m$elm_syntax$ParserFast$symbol,
					')',
					{comments: $stil4m$elm_syntax$Rope$empty, syntax: $stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern}),
				A4(
					$stil4m$elm_syntax$ParserFast$map3,
					F3(
						function (headResult, commentsAfterHead, tailResult) {
							return {
								comments: A2(
									$stil4m$elm_syntax$Rope$prependTo,
									tailResult.comments,
									A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterHead, headResult.comments)),
								syntax: function () {
									var _v1 = tailResult.syntax;
									if (_v1.$ === 'Nothing') {
										return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(headResult.syntax);
									} else {
										var secondAndMaybeThirdPart = _v1.a;
										var _v2 = secondAndMaybeThirdPart.maybeThirdPart;
										if (_v2.$ === 'Nothing') {
											return $stil4m$elm_syntax$Elm$Syntax$Pattern$TuplePattern(
												_List_fromArray(
													[headResult.syntax, secondAndMaybeThirdPart.secondPart]));
										} else {
											var thirdPart = _v2.a;
											return $stil4m$elm_syntax$Elm$Syntax$Pattern$TuplePattern(
												_List_fromArray(
													[headResult.syntax, secondAndMaybeThirdPart.secondPart, thirdPart]));
										}
									}
								}()
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern(),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					A2(
						$stil4m$elm_syntax$ParserFast$oneOf2,
						A2(
							$stil4m$elm_syntax$ParserFast$symbol,
							')',
							{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}),
						A2(
							$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
							',',
							A5(
								$stil4m$elm_syntax$ParserFast$map4,
								F4(
									function (commentsBefore, secondPart, commentsAfter, maybeThirdPart) {
										return {
											comments: A2(
												$stil4m$elm_syntax$Rope$prependTo,
												maybeThirdPart.comments,
												A2(
													$stil4m$elm_syntax$Rope$prependTo,
													commentsAfter,
													A2($stil4m$elm_syntax$Rope$prependTo, secondPart.comments, commentsBefore))),
											syntax: $elm$core$Maybe$Just(
												{maybeThirdPart: maybeThirdPart.syntax, secondPart: secondPart.syntax})
										};
									}),
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
								$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern(),
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
								A2(
									$stil4m$elm_syntax$ParserFast$oneOf2,
									A2(
										$stil4m$elm_syntax$ParserFast$symbol,
										')',
										{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}),
									A2(
										$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
										',',
										A2(
											$stil4m$elm_syntax$ParserFast$followedBySymbol,
											')',
											A4(
												$stil4m$elm_syntax$ParserFast$map3,
												F3(
													function (commentsBefore, thirdPart, commentsAfter) {
														return {
															comments: A2(
																$stil4m$elm_syntax$Rope$prependTo,
																commentsAfter,
																A2($stil4m$elm_syntax$Rope$prependTo, thirdPart.comments, commentsBefore)),
															syntax: $elm$core$Maybe$Just(thirdPart.syntax)
														};
													}),
												$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
												$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern(),
												$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)))))))))));
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern() {
	return $stil4m$elm_syntax$ParserFast$lazy(
		function (_v0) {
			return $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePatternTryToCompose();
		});
}
try {
	var $stil4m$elm_syntax$Elm$Parser$Patterns$composablePatternTryToCompose = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePatternTryToCompose();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePatternTryToCompose = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$composablePatternTryToCompose;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$composablePattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$composablePattern;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternWithConsumeArgs = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternWithConsumeArgs();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternWithConsumeArgs = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternWithConsumeArgs;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$patternNotDirectlyComposing();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$patternNotDirectlyComposing = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$listPattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$listPattern;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$maybeComposedWith = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeComposedWith();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$maybeComposedWith = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$maybeComposedWith;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$parensPattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$parensPattern;
	};
	var $stil4m$elm_syntax$Elm$Parser$Patterns$pattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern();
	$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern = function () {
		return $stil4m$elm_syntax$Elm$Parser$Patterns$pattern;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.Patterns` are causing infinite recursion:\n\n  ┌─────┐\n  │    composablePatternTryToCompose\n  │     ↓\n  │    composablePattern\n  │     ↓\n  │    qualifiedPatternWithConsumeArgs\n  │     ↓\n  │    patternNotDirectlyComposing\n  │     ↓\n  │    listPattern\n  │     ↓\n  │    maybeComposedWith\n  │     ↓\n  │    parensPattern\n  │     ↓\n  │    pattern\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$ParserWithComments$until = F2(
	function (end, element) {
		return A5(
			$stil4m$elm_syntax$ParserFast$loopUntil,
			end,
			element,
			_Utils_Tuple2($stil4m$elm_syntax$Rope$empty, _List_Nil),
			F2(
				function (pResult, _v0) {
					var commentsSoFar = _v0.a;
					var itemsSoFar = _v0.b;
					return _Utils_Tuple2(
						A2($stil4m$elm_syntax$Rope$prependTo, pResult.comments, commentsSoFar),
						A2($elm$core$List$cons, pResult.syntax, itemsSoFar));
				}),
			function (_v1) {
				var commentsSoFar = _v1.a;
				var itemsSoFar = _v1.b;
				return {
					comments: commentsSoFar,
					syntax: $elm$core$List$reverse(itemsSoFar)
				};
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$parameterPatternsEqual = A2(
	$stil4m$elm_syntax$ParserWithComments$until,
	$stil4m$elm_syntax$Elm$Parser$Tokens$equal,
	A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (patternResult, commentsAfterPattern) {
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterPattern, patternResult.comments),
					syntax: patternResult.syntax
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout));
var $stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedPlusFollowedBy = F2(
	function (extraIndent, nextParser) {
		return $stil4m$elm_syntax$ParserFast$columnIndentAndThen(
			F2(
				function (column, indent) {
					return (_Utils_cmp(column, indent + extraIndent) > 0) ? nextParser : $stil4m$elm_syntax$Elm$Parser$Layout$problemPositivelyIndented;
				}));
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$problemCannotMixNonAssociativeInfixOperators = $stil4m$elm_syntax$ParserFast$problem('cannot mix non-associative infix operators without parenthesis');
var $stil4m$elm_syntax$Elm$Parser$Expression$rangeMoveStartLeftByOneColumn = function (range) {
	return {
		end: range.end,
		start: {column: range.start.column - 1, row: range.start.row}
	};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccessFunction = function (a) {
	return {$: 'RecordAccessFunction', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expression$recordAccessFunctionExpression = A2(
	$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
	'.',
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange(
		F2(
			function (range, field) {
				return {
					comments: $stil4m$elm_syntax$Rope$empty,
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						$stil4m$elm_syntax$Elm$Parser$Expression$rangeMoveStartLeftByOneColumn(range),
						$stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccessFunction('.' + field))
				};
			})));
var $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable = function (a) {
	return {$: 'Floatable', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Hex = function (a) {
	return {$: 'Hex', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Integer = function (a) {
	return {$: 'Integer', a: a};
};
var $stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9 = F2(
	function (offset, src) {
		skip0OrMoreDigits0To9:
		while (true) {
			var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
			switch (_v0) {
				case '0':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '1':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '2':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '3':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '4':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '5':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '6':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '7':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '8':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				case '9':
					var $temp$offset = offset + 1,
						$temp$src = src;
					offset = $temp$offset;
					src = $temp$src;
					continue skip0OrMoreDigits0To9;
				default:
					return offset;
			}
		}
	});
var $stil4m$elm_syntax$ParserFast$skip1OrMoreDigits0To9 = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '0':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '1':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '2':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '3':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '4':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '5':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '6':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '7':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '8':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			case '9':
				return A2($stil4m$elm_syntax$ParserFast$skip0OrMoreDigits0To9, offset + 1, src);
			default:
				return -1;
		}
	});
var $stil4m$elm_syntax$ParserFast$skipAfterFloatExponentMark = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '+':
				return A2($stil4m$elm_syntax$ParserFast$skip1OrMoreDigits0To9, offset + 1, src);
			case '-':
				return A2($stil4m$elm_syntax$ParserFast$skip1OrMoreDigits0To9, offset + 1, src);
			default:
				return A2($stil4m$elm_syntax$ParserFast$skip1OrMoreDigits0To9, offset, src);
		}
	});
var $stil4m$elm_syntax$ParserFast$skipFloatAfterIntegerDecimal = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '.':
				var offsetAfterDigits = A2($stil4m$elm_syntax$ParserFast$skip1OrMoreDigits0To9, offset + 1, src);
				if (_Utils_eq(offsetAfterDigits, -1)) {
					return -1;
				} else {
					var _v1 = A3($elm$core$String$slice, offsetAfterDigits, offsetAfterDigits + 1, src);
					switch (_v1) {
						case 'e':
							return A2($stil4m$elm_syntax$ParserFast$skipAfterFloatExponentMark, offsetAfterDigits + 1, src);
						case 'E':
							return A2($stil4m$elm_syntax$ParserFast$skipAfterFloatExponentMark, offsetAfterDigits + 1, src);
						default:
							return offsetAfterDigits;
					}
				}
			case 'e':
				return A2($stil4m$elm_syntax$ParserFast$skipAfterFloatExponentMark, offset + 1, src);
			case 'E':
				return A2($stil4m$elm_syntax$ParserFast$skipAfterFloatExponentMark, offset + 1, src);
			default:
				return -1;
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $stil4m$elm_syntax$ParserFast$floatOrIntegerDecimalOrHexadecimalMapWithRange = F3(
	function (rangeAndFloatToRes, rangeAndIntDecimalToRes, rangeAndIntHexadecimalToRes) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var s1 = A2($stil4m$elm_syntax$ParserFast$convertIntegerDecimalOrHexadecimal, s0.offset, s0.src);
				if (_Utils_eq(s1.offsetAndInt.offset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingNumber, s0.row, s0.col));
				} else {
					var offsetAfterFloat = A2($stil4m$elm_syntax$ParserFast$skipFloatAfterIntegerDecimal, s1.offsetAndInt.offset, s0.src);
					if (_Utils_eq(offsetAfterFloat, -1)) {
						var newColumn = s0.col + (s1.offsetAndInt.offset - s0.offset);
						var range = {
							end: {column: newColumn, row: s0.row},
							start: {column: s0.col, row: s0.row}
						};
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							function () {
								var _v0 = s1.base;
								if (_v0.$ === 'Decimal') {
									return A2(rangeAndIntDecimalToRes, range, s1.offsetAndInt._int);
								} else {
									return A2(rangeAndIntHexadecimalToRes, range, s1.offsetAndInt._int);
								}
							}(),
							{col: newColumn, indent: s0.indent, offset: s1.offsetAndInt.offset, row: s0.row, src: s0.src});
					} else {
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s0.offset, offsetAfterFloat, s0.src));
						if (_v1.$ === 'Just') {
							var _float = _v1.a;
							var newColumn = s0.col + (offsetAfterFloat - s0.offset);
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A2(
									rangeAndFloatToRes,
									{
										end: {column: newColumn, row: s0.row},
										start: {column: s0.col, row: s0.row}
									},
									_float),
								{col: newColumn, indent: s0.indent, offset: offsetAfterFloat, row: s0.row, src: s0.src});
						} else {
							return A2(
								$stil4m$elm_syntax$ParserFast$Bad,
								false,
								A2($stil4m$elm_syntax$ParserFast$ExpectingNumber, s0.row, s0.col));
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$numberExpression = A3(
	$stil4m$elm_syntax$ParserFast$floatOrIntegerDecimalOrHexadecimalMapWithRange,
	F2(
		function (range, n) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Expression$Floatable(n))
			};
		}),
	F2(
		function (range, n) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Expression$Integer(n))
			};
		}),
	F2(
		function (range, n) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Expression$Hex(n))
			};
		}));
var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue = F2(
	function (a, b) {
		return {$: 'FunctionOrValue', a: a, b: b};
	});
var $stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateWithoutLinebreak = F3(
	function (firstIsOkay, afterFirstIsOkay, resultIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var firstOffset = A3($stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak, firstIsOkay, s.offset, s.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate, s.row, s.col));
				} else {
					var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, afterFirstIsOkay, firstOffset, s.row, s.col + 1, s.src, s.indent);
					var name = A3($elm$core$String$slice, s.offset, s1.offset, s.src);
					return resultIsOkay(name) ? A2($stil4m$elm_syntax$ParserFast$Good, name, s1) : A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingStringSatisfyingPredicate, s.row, s.col + 1));
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$functionName = A3($stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateWithoutLinebreak, $stil4m$elm_syntax$Char$Extra$unicodeIsLowerFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast, $stil4m$elm_syntax$Elm$Parser$Tokens$isNotReserved);
var $stil4m$elm_syntax$ParserFast$oneOf2Map = F4(
	function (firstToChoice, _v0, secondToChoice, _v1) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v2 = attemptFirst(s);
				if (_v2.$ === 'Good') {
					var first = _v2.a;
					var s1 = _v2.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						firstToChoice(first),
						s1);
				} else {
					var firstCommitted = _v2.a;
					var firstX = _v2.b;
					if (firstCommitted) {
						return A2($stil4m$elm_syntax$ParserFast$Bad, firstCommitted, firstX);
					} else {
						var _v3 = attemptSecond(s);
						if (_v3.$ === 'Good') {
							var second = _v3.a;
							var s1 = _v3.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								secondToChoice(second),
								s1);
						} else {
							var secondCommitted = _v3.a;
							var secondX = _v3.b;
							return secondCommitted ? A2($stil4m$elm_syntax$ParserFast$Bad, secondCommitted, secondX) : A2(
								$stil4m$elm_syntax$ParserFast$Bad,
								false,
								A3($stil4m$elm_syntax$ParserFast$ExpectingOneOf, firstX, secondX, _List_Nil));
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$orSucceed = F2(
	function (_v0, secondRes) {
		var attemptFirst = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v1 = attemptFirst(s);
				if (_v1.$ === 'Good') {
					var firstGood = _v1;
					return firstGood;
				} else {
					var firstBad = _v1;
					var firstCommitted = firstBad.a;
					return firstCommitted ? firstBad : A2($stil4m$elm_syntax$ParserFast$Good, secondRes, s);
				}
			});
	});
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$maybeDotReferenceExpressionTuple() {
	return A2(
		$stil4m$elm_syntax$ParserFast$orSucceed,
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'.',
			A4(
				$stil4m$elm_syntax$ParserFast$oneOf2Map,
				$elm$core$Maybe$Just,
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (firstName, after) {
							if (after.$ === 'Nothing') {
								return _Utils_Tuple3(_List_Nil, firstName, _List_Nil);
							} else {
								var _v1 = after.a;
								var qualificationAfter = _v1.a;
								var unqualified = _v1.b;
								var recordAccess = _v1.c;
								return _Utils_Tuple3(
									A2($elm$core$List$cons, firstName, qualificationAfter),
									unqualified,
									recordAccess);
							}
						}),
					$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
					$stil4m$elm_syntax$ParserFast$lazy(
						function (_v2) {
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$maybeDotReferenceExpressionTuple();
						})),
				$elm$core$Basics$identity,
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (name, recordAccesses) {
							return $elm$core$Maybe$Just(
								_Utils_Tuple3(_List_Nil, name, recordAccesses));
						}),
					$stil4m$elm_syntax$Elm$Parser$Tokens$functionName,
					$stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccess))),
		$elm$core$Maybe$Nothing);
}
try {
	var $stil4m$elm_syntax$Elm$Parser$Expression$maybeDotReferenceExpressionTuple = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$maybeDotReferenceExpressionTuple();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$maybeDotReferenceExpressionTuple = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$maybeDotReferenceExpressionTuple;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.Expression` are causing infinite recursion:\n\n  ┌─────┐\n  │    maybeDotReferenceExpressionTuple\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$Elm$Parser$Expression$qualifiedOrVariantOrRecordConstructorReferenceExpressionFollowedByRecordAccess = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, firstName, after) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: function () {
					if (after.$ === 'Nothing') {
						return A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							range,
							A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, firstName));
					} else {
						var _v1 = after.a;
						var qualificationAfter = _v1.a;
						var unqualified = _v1.b;
						var recordAccesses = _v1.c;
						if (!recordAccesses.b) {
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								range,
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue,
									A2($elm$core$List$cons, firstName, qualificationAfter),
									unqualified));
						} else {
							var _v3 = recordAccesses.a;
							var firstRecordAccessRange = _v3.a;
							var referenceNode = A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{
									end: {column: firstRecordAccessRange.start.column - 1, row: firstRecordAccessRange.start.row},
									start: range.start
								},
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue,
									A2($elm$core$List$cons, firstName, qualificationAfter),
									unqualified));
							return A3(
								$elm$core$List$foldl,
								F2(
									function (fieldNode, leftNode) {
										var fieldRange = fieldNode.a;
										var leftRange = leftNode.a;
										return A2(
											$stil4m$elm_syntax$Elm$Syntax$Node$Node,
											{end: fieldRange.end, start: leftRange.start},
											A2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess, leftNode, fieldNode));
									}),
								referenceNode,
								recordAccesses);
						}
					}
				}()
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
	$stil4m$elm_syntax$Elm$Parser$Expression$maybeDotReferenceExpressionTuple);
var $stil4m$elm_syntax$Elm$Parser$Expression$unqualifiedFunctionReferenceExpressionFollowedByRecordAccess = A3(
	$stil4m$elm_syntax$ParserFast$map2,
	F2(
		function (leftestResult, recordAccesses) {
			if (!recordAccesses.b) {
				return leftestResult;
			} else {
				return {
					comments: leftestResult.comments,
					syntax: A3(
						$elm$core$List$foldl,
						F2(
							function (fieldNode, leftNode) {
								var fieldRange = fieldNode.a;
								var leftRange = leftNode.a;
								return A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									{end: fieldRange.end, start: leftRange.start},
									A2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess, leftNode, fieldNode));
							}),
						leftestResult.syntax,
						recordAccesses)
				};
			}
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange(
		F2(
			function (range, unqualified) {
				return {
					comments: $stil4m$elm_syntax$Rope$empty,
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, unqualified))
				};
			})),
	$stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccess);
var $stil4m$elm_syntax$Elm$Parser$Expression$referenceOrNumberExpression = A3($stil4m$elm_syntax$ParserFast$oneOf3, $stil4m$elm_syntax$Elm$Parser$Expression$qualifiedOrVariantOrRecordConstructorReferenceExpressionFollowedByRecordAccess, $stil4m$elm_syntax$Elm$Parser$Expression$unqualifiedFunctionReferenceExpressionFollowedByRecordAccess, $stil4m$elm_syntax$Elm$Parser$Expression$numberExpression);
var $stil4m$elm_syntax$ParserFast$symbolBacktrackableFollowedBy = F2(
	function (str, _v0) {
		var parseNext = _v0.a;
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + strLength;
				return _Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					str + '') ? parseNext(
					{col: s.col + strLength, indent: s.indent, offset: newOffset, row: s.row, src: s.src}) : A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s.row, s.col, str));
			});
	});
var $stil4m$elm_syntax$ParserFast$symbolWithEndLocation = F2(
	function (str, endLocationToRes) {
		var strLength = $elm$core$String$length(str);
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var newOffset = s.offset + strLength;
				if (_Utils_eq(
					A3($elm$core$String$slice, s.offset, newOffset, s.src),
					str + '')) {
					var newCol = s.col + strLength;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						endLocationToRes(
							{column: newCol, row: s.row}),
						{col: newCol, indent: s.indent, offset: newOffset, row: s.row, src: s.src});
				} else {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A3($stil4m$elm_syntax$ParserFast$ExpectingSymbol, s.row, s.col, str));
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$temporaryErrPrecedenceTooHigh = $elm$core$Result$Err('infix operator precedence too high');
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$FieldsAfterName = function (a) {
	return {$: 'FieldsAfterName', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation = F2(
	function (a, b) {
		return {$: 'FunctionTypeAnnotation', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord = F2(
	function (a, b) {
		return {$: 'GenericRecord', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record = function (a) {
	return {$: 'Record', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$RecordExtensionExpressionAfterName = function (a) {
	return {$: 'RecordExtensionExpressionAfterName', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled = function (a) {
	return {$: 'Tupled', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed = F2(
	function (a, b) {
		return {$: 'Typed', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit = {$: 'Unit'};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType = function (a) {
	return {$: 'GenericType', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange(
	F2(
		function (range, _var) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(_var))
			};
		}));
var $stil4m$elm_syntax$ParserFast$map3WithRange = F4(
	function (func, _v0, _v1, _v2) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v3 = parseA(s0);
				if (_v3.$ === 'Bad') {
					var committed = _v3.a;
					var x = _v3.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v3.a;
					var s1 = _v3.b;
					var _v4 = parseB(s1);
					if (_v4.$ === 'Bad') {
						var x = _v4.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v4.a;
						var s2 = _v4.b;
						var _v5 = parseC(s2);
						if (_v5.$ === 'Bad') {
							var x = _v5.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v5.a;
							var s3 = _v5.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A4(
									func,
									{
										end: {column: s3.col, row: s3.row},
										start: {column: s0.col, row: s0.row}
									},
									a,
									b,
									c),
								s3);
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$map6WithRange = F7(
	function (func, _v0, _v1, _v2, _v3, _v4, _v5) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		var parseF = _v5.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v6 = parseA(s0);
				if (_v6.$ === 'Bad') {
					var committed = _v6.a;
					var x = _v6.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v6.a;
					var s1 = _v6.b;
					var _v7 = parseB(s1);
					if (_v7.$ === 'Bad') {
						var x = _v7.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v7.a;
						var s2 = _v7.b;
						var _v8 = parseC(s2);
						if (_v8.$ === 'Bad') {
							var x = _v8.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v8.a;
							var s3 = _v8.b;
							var _v9 = parseD(s3);
							if (_v9.$ === 'Bad') {
								var x = _v9.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v9.a;
								var s4 = _v9.b;
								var _v10 = parseE(s4);
								if (_v10.$ === 'Bad') {
									var x = _v10.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v10.a;
									var s5 = _v10.b;
									var _v11 = parseF(s5);
									if (_v11.$ === 'Bad') {
										var x = _v11.b;
										return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
									} else {
										var f = _v11.a;
										var s6 = _v11.b;
										return A2(
											$stil4m$elm_syntax$ParserFast$Good,
											A7(
												func,
												{
													end: {column: s6.col, row: s6.row},
													start: {column: s0.col, row: s0.row}
												},
												a,
												b,
												c,
												d,
												e,
												f),
											s6);
									}
								}
							}
						}
					}
				}
			});
	});
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$maybeDotTypeNamesTuple() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map2OrSucceed,
		F2(
			function (firstName, afterFirstName) {
				if (afterFirstName.$ === 'Nothing') {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(_List_Nil, firstName));
				} else {
					var _v1 = afterFirstName.a;
					var qualificationAfter = _v1.a;
					var unqualified = _v1.b;
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(
							A2($elm$core$List$cons, firstName, qualificationAfter),
							unqualified));
				}
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '.', $stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v2) {
				return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$maybeDotTypeNamesTuple();
			}),
		$elm$core$Maybe$Nothing);
}
try {
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$maybeDotTypeNamesTuple = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$maybeDotTypeNamesTuple();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$maybeDotTypeNamesTuple = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$maybeDotTypeNamesTuple;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.TypeAnnotation` are causing infinite recursion:\n\n  ┌─────┐\n  │    maybeDotTypeNamesTuple\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$ParserFast$oneOf4 = F4(
	function (_v0, _v1, _v2, _v3) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		var attemptThird = _v2.a;
		var attemptFourth = _v3.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v4 = attemptFirst(s);
				if (_v4.$ === 'Good') {
					var firstGood = _v4;
					return firstGood;
				} else {
					var firstBad = _v4;
					var firstCommitted = firstBad.a;
					var firstX = firstBad.b;
					if (firstCommitted) {
						return firstBad;
					} else {
						var _v5 = attemptSecond(s);
						if (_v5.$ === 'Good') {
							var secondGood = _v5;
							return secondGood;
						} else {
							var secondBad = _v5;
							var secondCommitted = secondBad.a;
							var secondX = secondBad.b;
							if (secondCommitted) {
								return secondBad;
							} else {
								var _v6 = attemptThird(s);
								if (_v6.$ === 'Good') {
									var thirdGood = _v6;
									return thirdGood;
								} else {
									var thirdBad = _v6;
									var thirdCommitted = thirdBad.a;
									var thirdX = thirdBad.b;
									if (thirdCommitted) {
										return thirdBad;
									} else {
										var _v7 = attemptFourth(s);
										if (_v7.$ === 'Good') {
											var fourthGood = _v7;
											return fourthGood;
										} else {
											var fourthBad = _v7;
											var fourthCommitted = fourthBad.a;
											var fourthX = fourthBad.b;
											return fourthCommitted ? fourthBad : A2(
												$stil4m$elm_syntax$ParserFast$Bad,
												false,
												A3(
													$stil4m$elm_syntax$ParserFast$ExpectingOneOf,
													firstX,
													secondX,
													_List_fromArray(
														[thirdX, fourthX])));
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationRecordEmpty = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(_List_Nil);
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotationWithoutArguments = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, startName, afterStartName) {
			var name = function () {
				if (afterStartName.$ === 'Nothing') {
					return _Utils_Tuple2(_List_Nil, startName);
				} else {
					var _v1 = afterStartName.a;
					var qualificationAfterStartName = _v1.a;
					var unqualified = _v1.b;
					return _Utils_Tuple2(
						A2($elm$core$List$cons, startName, qualificationAfterStartName),
						unqualified);
				}
			}();
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, name),
						_List_Nil))
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$maybeDotTypeNamesTuple);
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnIncludingTypedWithArguments() {
	return A4(
		$stil4m$elm_syntax$ParserFast$oneOf4,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation(),
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typedTypeAnnotationWithArgumentsOptimisticLayout(),
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation());
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typedTypeAnnotationWithArgumentsOptimisticLayout() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (nameNode, commentsAfterName, argsReverse) {
				var nameRange = nameNode.a;
				var range = function () {
					var _v8 = argsReverse.syntax;
					if (!_v8.b) {
						return nameRange;
					} else {
						var _v9 = _v8.a;
						var lastArgRange = _v9.a;
						return {end: lastArgRange.end, start: nameRange.start};
					}
				}();
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, argsReverse.comments, commentsAfterName),
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						A2(
							$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
							nameNode,
							$elm$core$List$reverse(argsReverse.syntax)))
				};
			}),
		A3(
			$stil4m$elm_syntax$ParserFast$map2WithRange,
			F3(
				function (range, startName, afterStartName) {
					var name = function () {
						if (afterStartName.$ === 'Nothing') {
							return _Utils_Tuple2(_List_Nil, startName);
						} else {
							var _v11 = afterStartName.a;
							var qualificationAfterStartName = _v11.a;
							var unqualified = _v11.b;
							return _Utils_Tuple2(
								A2($elm$core$List$cons, startName, qualificationAfterStartName),
								unqualified);
						}
					}();
					return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, name);
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$maybeDotTypeNamesTuple),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
			$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy(
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (typeAnnotationResult, commentsAfter) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, typeAnnotationResult.comments),
								syntax: typeAnnotationResult.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnExcludingTypedWithArguments(),
					$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout))));
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnExcludingTypedWithArguments() {
	return A4(
		$stil4m$elm_syntax$ParserFast$oneOf4,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation(),
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotationWithoutArguments,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation());
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'(',
		A2(
			$stil4m$elm_syntax$ParserFast$oneOf2,
			A2(
				$stil4m$elm_syntax$ParserFast$symbolWithEndLocation,
				')',
				function (end) {
					return {
						comments: $stil4m$elm_syntax$Rope$empty,
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: end,
								start: {column: end.column - 2, row: end.row}
							},
							$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit)
					};
				}),
			A5(
				$stil4m$elm_syntax$ParserFast$map4WithRange,
				F5(
					function (rangeAfterOpeningParens, commentsBeforeFirstPart, firstPart, commentsAfterFirstPart, lastToSecondPart) {
						return {
							comments: A2(
								$stil4m$elm_syntax$Rope$prependTo,
								lastToSecondPart.comments,
								A2(
									$stil4m$elm_syntax$Rope$prependTo,
									commentsAfterFirstPart,
									A2($stil4m$elm_syntax$Rope$prependTo, firstPart.comments, commentsBeforeFirstPart))),
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{
									end: rangeAfterOpeningParens.end,
									start: {column: rangeAfterOpeningParens.start.column - 1, row: rangeAfterOpeningParens.start.row}
								},
								function () {
									var _v5 = lastToSecondPart.syntax;
									if (_v5.$ === 'Nothing') {
										var _v6 = firstPart.syntax;
										var firstPartType = _v6.b;
										return firstPartType;
									} else {
										var firstAndMaybeThirdPart = _v5.a;
										var _v7 = firstAndMaybeThirdPart.maybeThirdPart;
										if (_v7.$ === 'Nothing') {
											return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
												_List_fromArray(
													[firstPart.syntax, firstAndMaybeThirdPart.secondPart]));
										} else {
											var thirdPart = _v7.a;
											return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
												_List_fromArray(
													[firstPart.syntax, firstAndMaybeThirdPart.secondPart, thirdPart]));
										}
									}
								}())
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				A2(
					$stil4m$elm_syntax$ParserFast$oneOf2,
					A2(
						$stil4m$elm_syntax$ParserFast$symbol,
						')',
						{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}),
					A2(
						$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
						',',
						A5(
							$stil4m$elm_syntax$ParserFast$map4,
							F4(
								function (commentsBefore, secondPartResult, commentsAfter, maybeThirdPartResult) {
									return {
										comments: A2(
											$stil4m$elm_syntax$Rope$prependTo,
											commentsAfter,
											A2($stil4m$elm_syntax$Rope$prependTo, secondPartResult.comments, commentsBefore)),
										syntax: $elm$core$Maybe$Just(
											{maybeThirdPart: maybeThirdPartResult.syntax, secondPart: secondPartResult.syntax})
									};
								}),
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
							$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
							A2(
								$stil4m$elm_syntax$ParserFast$oneOf2,
								A2(
									$stil4m$elm_syntax$ParserFast$symbol,
									')',
									{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}),
								A2(
									$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
									',',
									A2(
										$stil4m$elm_syntax$ParserFast$followedBySymbol,
										')',
										A4(
											$stil4m$elm_syntax$ParserFast$map3,
											F3(
												function (commentsBefore, thirdPartResult, commentsAfter) {
													return {
														comments: A2(
															$stil4m$elm_syntax$Rope$prependTo,
															commentsAfter,
															A2($stil4m$elm_syntax$Rope$prependTo, thirdPartResult.comments, commentsBefore)),
														syntax: $elm$core$Maybe$Just(thirdPartResult.syntax)
													};
												}),
											$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
											$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
											$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))))))))));
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation() {
	return A3(
		$stil4m$elm_syntax$ParserFast$map2WithRange,
		F3(
			function (range, commentsBefore, afterCurly) {
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, afterCurly.comments, commentsBefore),
					syntax: function () {
						var _v3 = afterCurly.syntax;
						if (_v3.$ === 'Nothing') {
							return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationRecordEmpty);
						} else {
							var afterCurlyResult = _v3.a;
							return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, afterCurlyResult);
						}
					}()
				};
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '{', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		A2(
			$stil4m$elm_syntax$ParserFast$oneOf2,
			A2(
				$stil4m$elm_syntax$ParserFast$followedBySymbol,
				'}',
				A4(
					$stil4m$elm_syntax$ParserFast$map3,
					F3(
						function (firstNameNode, commentsAfterFirstName, afterFirstName) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, afterFirstName.comments, commentsAfterFirstName),
								syntax: $elm$core$Maybe$Just(
									function () {
										var _v4 = afterFirstName.syntax;
										if (_v4.$ === 'RecordExtensionExpressionAfterName') {
											var fields = _v4.a;
											return A2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord, firstNameNode, fields);
										} else {
											var fieldsAfterName = _v4.a;
											return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
												A2(
													$elm$core$List$cons,
													A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $elm$core$Tuple$pair, firstNameNode, fieldsAfterName.firstFieldValue),
													fieldsAfterName.tailFields));
										}
									}())
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					A2(
						$stil4m$elm_syntax$ParserFast$oneOf2,
						A2(
							$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
							'|',
							A4(
								$stil4m$elm_syntax$ParserFast$map3WithRange,
								F4(
									function (range, commentsBefore, head, tail) {
										return {
											comments: A2(
												$stil4m$elm_syntax$Rope$prependTo,
												tail.comments,
												A2($stil4m$elm_syntax$Rope$prependTo, head.comments, commentsBefore)),
											syntax: $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$RecordExtensionExpressionAfterName(
												A2(
													$stil4m$elm_syntax$Elm$Syntax$Node$Node,
													range,
													A2($elm$core$List$cons, head.syntax, tail.syntax)))
										};
									}),
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
								$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition(),
								$stil4m$elm_syntax$ParserWithComments$many(
									A2(
										$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
										',',
										A3(
											$stil4m$elm_syntax$ParserFast$map2,
											F2(
												function (commentsBefore, field) {
													return {
														comments: A2($stil4m$elm_syntax$Rope$prependTo, field.comments, commentsBefore),
														syntax: field.syntax
													};
												}),
											$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
											$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition()))))),
						A2(
							$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
							':',
							A5(
								$stil4m$elm_syntax$ParserFast$map4,
								F4(
									function (commentsBeforeFirstFieldValue, firstFieldValue, commentsAfterFirstFieldValue, tailFields) {
										return {
											comments: A2(
												$stil4m$elm_syntax$Rope$prependTo,
												tailFields.comments,
												A2(
													$stil4m$elm_syntax$Rope$prependTo,
													commentsAfterFirstFieldValue,
													A2($stil4m$elm_syntax$Rope$prependTo, firstFieldValue.comments, commentsBeforeFirstFieldValue))),
											syntax: $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$FieldsAfterName(
												{firstFieldValue: firstFieldValue.syntax, tailFields: tailFields.syntax})
										};
									}),
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
								$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
								A2(
									$stil4m$elm_syntax$ParserFast$orSucceed,
									A2(
										$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
										',',
										$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation()),
									{comments: $stil4m$elm_syntax$Rope$empty, syntax: _List_Nil})))))),
			A2(
				$stil4m$elm_syntax$ParserFast$symbol,
				'}',
				{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing})));
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (commentsBefore, head, tail) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						tail.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, head.comments, commentsBefore)),
					syntax: A2($elm$core$List$cons, head.syntax, tail.syntax)
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition(),
		$stil4m$elm_syntax$ParserWithComments$many(
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				',',
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (commentsBefore, field) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, field.comments, commentsBefore),
								syntax: field.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition()))));
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition() {
	return A7(
		$stil4m$elm_syntax$ParserFast$map6WithRange,
		F7(
			function (range, commentsBeforeFunctionName, name, commentsAfterFunctionName, commentsAfterColon, value, commentsAfterValue) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterValue,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							value.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterColon,
								A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterFunctionName, commentsBeforeFunctionName)))),
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						_Utils_Tuple2(name, value.syntax))
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout);
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (inType, commentsAfterIn, maybeOut) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						maybeOut.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterIn, inType.comments)),
					syntax: function () {
						var _v0 = maybeOut.syntax;
						if (_v0.$ === 'Nothing') {
							return inType.syntax;
						} else {
							var out = _v0.a;
							return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation, inType.syntax, out);
						}
					}()
				};
			}),
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v1) {
				return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnIncludingTypedWithArguments();
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		A4(
			$stil4m$elm_syntax$ParserFast$map2OrSucceed,
			F2(
				function (commentsAfterArrow, typeAnnotationResult) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, typeAnnotationResult.comments, commentsAfterArrow),
						syntax: $elm$core$Maybe$Just(typeAnnotationResult.syntax)
					};
				}),
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				'->',
				A2($stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedPlusFollowedBy, 2, $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)),
			$stil4m$elm_syntax$ParserFast$lazy(
				function (_v2) {
					return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation();
				}),
			{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}));
}
try {
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFnIncludingTypedWithArguments = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnIncludingTypedWithArguments();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnIncludingTypedWithArguments = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFnIncludingTypedWithArguments;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotationWithArgumentsOptimisticLayout = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typedTypeAnnotationWithArgumentsOptimisticLayout();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typedTypeAnnotationWithArgumentsOptimisticLayout = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotationWithArgumentsOptimisticLayout;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFnExcludingTypedWithArguments = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnExcludingTypedWithArguments();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotationNoFnExcludingTypedWithArguments = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFnExcludingTypedWithArguments;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$parensTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$parensTypeAnnotation;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordTypeAnnotation;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldsTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldsTypeAnnotation;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldDefinition = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldDefinition;
	};
	var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation();
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation = function () {
		return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.TypeAnnotation` are causing infinite recursion:\n\n  ┌─────┐\n  │    typeAnnotationNoFnIncludingTypedWithArguments\n  │     ↓\n  │    typedTypeAnnotationWithArgumentsOptimisticLayout\n  │     ↓\n  │    typeAnnotationNoFnExcludingTypedWithArguments\n  │     ↓\n  │    parensTypeAnnotation\n  │     ↓\n  │    recordTypeAnnotation\n  │     ↓\n  │    recordFieldsTypeAnnotation\n  │     ↓\n  │    recordFieldDefinition\n  │     ↓\n  │    typeAnnotation\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$ParserFast$validate = F3(
	function (isOkay, problemOnNotOkay, _v0) {
		var parseA = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var committed = _v1.a;
					var x = _v1.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var good = _v1;
					var a = good.a;
					var s1 = good.b;
					return isOkay(a) ? good : A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						true,
						A3($stil4m$elm_syntax$ParserFast$ExpectingCustom, s1.row, s1.col, problemOnNotOkay));
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$whileWithoutLinebreakAnd2PartUtf16ToResultAndThen = F3(
	function (whileCharIsOkay, consumedStringToIntermediateOrErr, intermediateToFollowupParser) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var s1Offset = A3($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakAnd2PartUtf16Help, whileCharIsOkay, s0.offset, s0.src);
				var whileContent = A3($elm$core$String$slice, s0.offset, s1Offset, s0.src);
				var _v0 = consumedStringToIntermediateOrErr(whileContent);
				if (_v0.$ === 'Err') {
					var problemMessage = _v0.a;
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A3($stil4m$elm_syntax$ParserFast$ExpectingCustom, s0.row, s0.col, problemMessage));
				} else {
					var intermediate = _v0.a;
					var s1Column = s0.col + (s1Offset - s0.offset);
					var _v1 = intermediateToFollowupParser(intermediate);
					var parseFollowup = _v1.a;
					return $stil4m$elm_syntax$ParserFast$pStepCommit(
						parseFollowup(
							{col: s1Column, indent: s0.indent, offset: s1Offset, row: s0.row, src: s0.src}));
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$changeIndent = F2(
	function (newIndent, s) {
		return {col: s.col, indent: newIndent, offset: s.offset, row: s.row, src: s.src};
	});
var $stil4m$elm_syntax$ParserFast$withIndentSetToColumn = function (_v0) {
	var parse = _v0.a;
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var _v1 = parse(
				A2($stil4m$elm_syntax$ParserFast$changeIndent, s0.col, s0));
			if (_v1.$ === 'Good') {
				var a = _v1.a;
				var s1 = _v1.b;
				return A2(
					$stil4m$elm_syntax$ParserFast$Good,
					a,
					A2($stil4m$elm_syntax$ParserFast$changeIndent, s0.indent, s1));
			} else {
				var bad = _v1;
				return bad;
			}
		});
};
var $stil4m$elm_syntax$ParserFast$withIndentSetToColumnMinus = F2(
	function (columnToMoveIndentationBaseBackBy, _v0) {
		var parse = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parse(
					A2($stil4m$elm_syntax$ParserFast$changeIndent, s0.col - columnToMoveIndentationBaseBackBy, s0));
				if (_v1.$ === 'Good') {
					var a = _v1.a;
					var s1 = _v1.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						a,
						A2($stil4m$elm_syntax$ParserFast$changeIndent, s0.indent, s1));
				} else {
					var bad = _v1;
					return bad;
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$extendedSubExpressionOptimisticLayout = F2(
	function (toResult, afterCommitting) {
		return A4(
			$stil4m$elm_syntax$ParserFast$loopWhileSucceedsOntoResultFromParser,
			$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy(
				A2($stil4m$elm_syntax$Elm$Parser$Expression$infixOperatorAndThen, toResult, afterCommitting)),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpressionMaybeAppliedOptimisticLayout(),
			F2(
				function (extensionRightResult, leftNodeWithComments) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, extensionRightResult.comments, leftNodeWithComments.comments),
						syntax: A2($stil4m$elm_syntax$Elm$Parser$Expression$applyExtensionRight, extensionRightResult.syntax, leftNodeWithComments.syntax)
					};
				}),
			$elm$core$Basics$identity);
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$infixLeft = F2(
	function (leftPrecedence, symbol) {
		return {
			extensionRight: A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsBeforeFirst, first) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, first.comments, commentsBeforeFirst),
							syntax: $stil4m$elm_syntax$Elm$Parser$Expression$ExtendRightByOperation(
								{direction: $stil4m$elm_syntax$Elm$Syntax$Infix$Left, expression: first.syntax, symbol: symbol})
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				A2(
					$stil4m$elm_syntax$Elm$Parser$Expression$extendedSubExpressionOptimisticLayout,
					function (info) {
						return (_Utils_cmp(info.leftPrecedence, leftPrecedence) > 0) ? $elm$core$Result$Ok(info) : $stil4m$elm_syntax$Elm$Parser$Expression$temporaryErrPrecedenceTooHigh;
					},
					function ($) {
						return $.extensionRight;
					})),
			leftPrecedence: leftPrecedence,
			symbol: symbol
		};
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative = F2(
	function (leftPrecedence, symbol) {
		return {
			extensionRight: A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsBefore, right) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, right.comments, commentsBefore),
							syntax: $stil4m$elm_syntax$Elm$Parser$Expression$ExtendRightByOperation(
								{direction: $stil4m$elm_syntax$Elm$Syntax$Infix$Non, expression: right.syntax, symbol: symbol})
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				A2(
					$stil4m$elm_syntax$Elm$Parser$Expression$extendedSubExpressionOptimisticLayout,
					function (info) {
						return (_Utils_cmp(info.leftPrecedence, leftPrecedence) > -1) ? $elm$core$Result$Ok(info) : $stil4m$elm_syntax$Elm$Parser$Expression$temporaryErrPrecedenceTooHigh;
					},
					function (info) {
						return _Utils_eq(info.leftPrecedence, leftPrecedence) ? $stil4m$elm_syntax$Elm$Parser$Expression$problemCannotMixNonAssociativeInfixOperators : info.extensionRight;
					})),
			leftPrecedence: leftPrecedence,
			symbol: symbol
		};
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$infixOperatorAndThen = F2(
	function (toResult, afterCommitting) {
		return A3(
			$stil4m$elm_syntax$ParserFast$whileWithoutLinebreakAnd2PartUtf16ToResultAndThen,
			$stil4m$elm_syntax$Elm$Parser$Tokens$isOperatorSymbolChar,
			function (operator) {
				switch (operator) {
					case '|>':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApR());
					case '++':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5append());
					case '<|':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApL());
					case '>>':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeR());
					case '==':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Eq());
					case '*':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Mul());
					case '::':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Cons());
					case '+':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Add());
					case '-':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Sub());
					case '|.':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Ignore());
					case '&&':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence3And());
					case '|=':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Keep());
					case '<<':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeL());
					case '/=':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Neq());
					case '//':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Idiv());
					case '/':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Fdiv());
					case '</>':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Slash());
					case '||':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence2Or());
					case '<=':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Le());
					case '>=':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Ge());
					case '>':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Gt());
					case '<?>':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8QuestionMark());
					case '<':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Lt());
					case '^':
						return toResult(
							$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8Pow());
					default:
						return $stil4m$elm_syntax$Elm$Parser$Expression$errUnknownInfixOperator;
				}
			},
			afterCommitting);
	});
var $stil4m$elm_syntax$Elm$Parser$Expression$infixRight = F2(
	function (leftPrecedence, symbol) {
		return {
			extensionRight: A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsBeforeFirst, first) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, first.comments, commentsBeforeFirst),
							syntax: $stil4m$elm_syntax$Elm$Parser$Expression$ExtendRightByOperation(
								{direction: $stil4m$elm_syntax$Elm$Syntax$Infix$Right, expression: first.syntax, symbol: symbol})
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				A2(
					$stil4m$elm_syntax$Elm$Parser$Expression$extendedSubExpressionOptimisticLayout,
					function (info) {
						return (_Utils_cmp(info.leftPrecedence, leftPrecedence) > -1) ? $elm$core$Result$Ok(info) : $stil4m$elm_syntax$Elm$Parser$Expression$temporaryErrPrecedenceTooHigh;
					},
					function ($) {
						return $.extensionRight;
					})),
			leftPrecedence: leftPrecedence,
			symbol: symbol
		};
	});
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letOrUnqualifiedReferenceExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letExpression(),
		$stil4m$elm_syntax$Elm$Parser$Expression$unqualifiedFunctionReferenceExpressionFollowedByRecordAccess);
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$keywordFollowedBy,
		'let',
		A4(
			$stil4m$elm_syntax$ParserFast$map3WithStartLocation,
			F4(
				function (start, declarations, commentsAfterIn, expressionResult) {
					var _v38 = expressionResult.syntax;
					var expressionRange = _v38.a;
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							expressionResult.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterIn, declarations.comments)),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: expressionRange.end,
								start: {column: start.column - 3, row: start.row}
							},
							$stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression(
								{declarations: declarations.declarations, expression: expressionResult.syntax}))
					};
				}),
			A2(
				$stil4m$elm_syntax$ParserFast$withIndentSetToColumnMinus,
				3,
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (commentsAfterLet, declarations) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, declarations.comments, commentsAfterLet),
								declarations: declarations.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$ParserFast$withIndentSetToColumn(
						$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDeclarationsIn()))),
			A2($stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedPlusFollowedBy, 2, $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDeclarationsIn() {
	return $stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(
		A4(
			$stil4m$elm_syntax$ParserFast$map3,
			F3(
				function (headLetResult, commentsAfter, tailLetResult) {
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							tailLetResult.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, headLetResult.comments)),
						syntax: A2($elm$core$List$cons, headLetResult.syntax, tailLetResult.syntax)
					};
				}),
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letFunction(),
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDestructuringDeclaration()),
			$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
			A2(
				$stil4m$elm_syntax$ParserWithComments$until,
				$stil4m$elm_syntax$Elm$Parser$Tokens$inToken,
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$blockElement())));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$blockElement() {
	return $stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(
		A3(
			$stil4m$elm_syntax$ParserFast$map2,
			F2(
				function (letDeclarationResult, commentsAfter) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, letDeclarationResult.comments),
						syntax: letDeclarationResult.syntax
					};
				}),
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letFunction(),
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDestructuringDeclaration()),
			$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseOrUnqualifiedReferenceExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseExpression(),
		$stil4m$elm_syntax$Elm$Parser$Expression$unqualifiedFunctionReferenceExpressionFollowedByRecordAccess);
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$keywordFollowedBy,
		'case',
		A6(
			$stil4m$elm_syntax$ParserFast$map5WithStartLocation,
			F6(
				function (start, commentsAfterCase, casedExpressionResult, commentsBeforeOf, commentsAfterOf, casesResult) {
					var _v32 = casesResult.syntax;
					var firstCase = _v32.a;
					var lastToSecondCase = _v32.b;
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							casesResult.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterOf,
								A2(
									$stil4m$elm_syntax$Rope$prependTo,
									commentsBeforeOf,
									A2($stil4m$elm_syntax$Rope$prependTo, casedExpressionResult.comments, commentsAfterCase)))),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: function () {
									if (lastToSecondCase.b) {
										var _v34 = lastToSecondCase.a;
										var _v35 = _v34.b;
										var lastCaseExpressionRange = _v35.a;
										return lastCaseExpressionRange.end;
									} else {
										var _v36 = firstCase;
										var _v37 = _v36.b;
										var firstCaseExpressionRange = _v37.a;
										return firstCaseExpressionRange.end;
									}
								}(),
								start: {column: start.column - 4, row: start.row}
							},
							$stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
								{
									cases: A2(
										$elm$core$List$cons,
										firstCase,
										$elm$core$List$reverse(lastToSecondCase)),
									expression: casedExpressionResult.syntax
								}))
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'of', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$ParserFast$withIndentSetToColumn(
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatements())));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatements() {
	return A6(
		$stil4m$elm_syntax$ParserFast$map5,
		F5(
			function (firstCasePatternResult, commentsAfterFirstCasePattern, commentsAfterFirstCaseArrowRight, firstCaseExpressionResult, lastToSecondCase) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						lastToSecondCase.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							firstCaseExpressionResult.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterFirstCaseArrowRight,
								A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterFirstCasePattern, firstCasePatternResult.comments)))),
					syntax: _Utils_Tuple2(
						_Utils_Tuple2(firstCasePatternResult.syntax, firstCaseExpressionResult.syntax),
						lastToSecondCase.syntax)
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$pattern,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '->', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
		$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatement()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatement() {
	return $stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(
		A5(
			$stil4m$elm_syntax$ParserFast$map4,
			F4(
				function (pattern, commentsBeforeArrowRight, commentsAfterArrowRight, expr) {
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							expr.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterArrowRight,
								A2($stil4m$elm_syntax$Rope$prependTo, commentsBeforeArrowRight, pattern.comments))),
						syntax: _Utils_Tuple2(pattern.syntax, expr.syntax)
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Patterns$pattern,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '->', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionIfNecessaryFollowedByRecordAccess() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'(',
		A3(
			$stil4m$elm_syntax$ParserFast$oneOf3,
			A2(
				$stil4m$elm_syntax$ParserFast$symbolWithEndLocation,
				')',
				function (end) {
					return {
						comments: $stil4m$elm_syntax$Rope$empty,
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: end,
								start: {column: end.column - 2, row: end.row}
							},
							$stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr)
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Expression$allowedPrefixOperatorFollowedByClosingParensOneOf,
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionInnerAfterOpeningParens()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionInnerAfterOpeningParens() {
	return A5(
		$stil4m$elm_syntax$ParserFast$map4WithRange,
		F5(
			function (rangeAfterOpeningParens, commentsBeforeFirstPart, firstPart, commentsAfterFirstPart, tailParts) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						tailParts.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsAfterFirstPart,
							A2($stil4m$elm_syntax$Rope$prependTo, firstPart.comments, commentsBeforeFirstPart))),
					syntax: function () {
						var _v27 = tailParts.syntax;
						if (_v27.$ === 'TupledParenthesizedFollowedByRecordAccesses') {
							var recordAccesses = _v27.a;
							if (!recordAccesses.b) {
								return A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									{
										end: rangeAfterOpeningParens.end,
										start: {column: rangeAfterOpeningParens.start.column - 1, row: rangeAfterOpeningParens.start.row}
									},
									$stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(firstPart.syntax));
							} else {
								var _v29 = recordAccesses.a;
								var firstRecordAccessRange = _v29.a;
								var range = {
									end: {column: firstRecordAccessRange.start.column - 1, row: firstRecordAccessRange.start.row},
									start: {column: rangeAfterOpeningParens.start.column - 1, row: rangeAfterOpeningParens.start.row}
								};
								var parenthesizedNode = A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									range,
									$stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(firstPart.syntax));
								return A3(
									$elm$core$List$foldl,
									F2(
										function (fieldNode, leftNode) {
											var fieldRange = fieldNode.a;
											var leftRange = leftNode.a;
											return A2(
												$stil4m$elm_syntax$Elm$Syntax$Node$Node,
												{end: fieldRange.end, start: leftRange.start},
												A2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess, leftNode, fieldNode));
										}),
									parenthesizedNode,
									recordAccesses);
							}
						} else {
							var _v30 = _v27.a;
							var secondPart = _v30.a;
							var maybeThirdPart = _v30.b;
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{
									end: rangeAfterOpeningParens.end,
									start: {column: rangeAfterOpeningParens.start.column - 1, row: rangeAfterOpeningParens.start.row}
								},
								function () {
									if (maybeThirdPart.$ === 'Nothing') {
										return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
											_List_fromArray(
												[firstPart.syntax, secondPart]));
									} else {
										var thirdPart = maybeThirdPart.a;
										return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
											_List_fromArray(
												[firstPart.syntax, secondPart, thirdPart]));
									}
								}());
						}
					}()
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A2(
			$stil4m$elm_syntax$ParserFast$oneOf2,
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				')',
				$stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccessMap(
					function (recordAccesses) {
						return {
							comments: $stil4m$elm_syntax$Rope$empty,
							syntax: $stil4m$elm_syntax$Elm$Parser$Expression$TupledParenthesizedFollowedByRecordAccesses(recordAccesses)
						};
					})),
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				',',
				A5(
					$stil4m$elm_syntax$ParserFast$map4,
					F4(
						function (commentsBefore, partResult, commentsAfter, maybeThirdPart) {
							return {
								comments: A2(
									$stil4m$elm_syntax$Rope$prependTo,
									maybeThirdPart.comments,
									A2(
										$stil4m$elm_syntax$Rope$prependTo,
										commentsAfter,
										A2($stil4m$elm_syntax$Rope$prependTo, partResult.comments, commentsBefore))),
								syntax: $stil4m$elm_syntax$Elm$Parser$Expression$TupledTwoOrThree(
									_Utils_Tuple2(partResult.syntax, maybeThirdPart.syntax))
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					A2(
						$stil4m$elm_syntax$ParserFast$oneOf2,
						A2(
							$stil4m$elm_syntax$ParserFast$symbol,
							')',
							{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}),
						A2(
							$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
							',',
							A2(
								$stil4m$elm_syntax$ParserFast$followedBySymbol,
								')',
								A4(
									$stil4m$elm_syntax$ParserFast$map3,
									F3(
										function (commentsBefore, partResult, commentsAfter) {
											return {
												comments: A2(
													$stil4m$elm_syntax$Rope$prependTo,
													commentsAfter,
													A2($stil4m$elm_syntax$Rope$prependTo, partResult.comments, commentsBefore)),
												syntax: $elm$core$Maybe$Just(partResult.syntax)
											};
										}),
									$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
									$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
									$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))))))));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordExpressionFollowedByRecordAccess() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'{',
		A3(
			$stil4m$elm_syntax$ParserFast$map2,
			F2(
				function (leftestResult, recordAccesses) {
					if (!recordAccesses.b) {
						return leftestResult;
					} else {
						return {
							comments: leftestResult.comments,
							syntax: A3(
								$elm$core$List$foldl,
								F2(
									function (fieldNode, leftNode) {
										var fieldRange = fieldNode.a;
										var leftRange = leftNode.a;
										return A2(
											$stil4m$elm_syntax$Elm$Syntax$Node$Node,
											{end: fieldRange.end, start: leftRange.start},
											A2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess, leftNode, fieldNode));
									}),
								leftestResult.syntax,
								recordAccesses)
						};
					}
				}),
			A3(
				$stil4m$elm_syntax$ParserFast$map2WithRange,
				F3(
					function (range, commentsBefore, afterCurly) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, afterCurly.comments, commentsBefore),
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								$stil4m$elm_syntax$Elm$Parser$Expression$rangeMoveStartLeftByOneColumn(range),
								afterCurly.syntax)
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordContentsCurlyEnd()),
			$stil4m$elm_syntax$Elm$Parser$Expression$multiRecordAccess));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordContentsCurlyEnd() {
	return A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		A6(
			$stil4m$elm_syntax$ParserFast$map5,
			F5(
				function (nameNode, commentsAfterFunctionName, afterNameBeforeFields, tailFields, commentsBeforeClosingCurly) {
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsBeforeClosingCurly,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								tailFields.comments,
								A2($stil4m$elm_syntax$Rope$prependTo, afterNameBeforeFields.comments, commentsAfterFunctionName))),
						syntax: function () {
							var _v25 = afterNameBeforeFields.syntax;
							if (_v25.$ === 'RecordUpdateFirstSetter') {
								var firstField = _v25.a;
								return A2(
									$stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression,
									nameNode,
									A2($elm$core$List$cons, firstField, tailFields.syntax));
							} else {
								var firstFieldValue = _v25.a;
								return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
									A2(
										$elm$core$List$cons,
										A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $elm$core$Tuple$pair, nameNode, firstFieldValue),
										tailFields.syntax));
							}
						}()
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				A2(
					$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
					'|',
					A3(
						$stil4m$elm_syntax$ParserFast$map2,
						F2(
							function (commentsBefore, setterResult) {
								return {
									comments: A2($stil4m$elm_syntax$Rope$prependTo, setterResult.comments, commentsBefore),
									syntax: $stil4m$elm_syntax$Elm$Parser$Expression$RecordUpdateFirstSetter(setterResult.syntax)
								};
							}),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
						$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordSetterNodeWithLayout())),
				A2(
					$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
					'=',
					A4(
						$stil4m$elm_syntax$ParserFast$map3,
						F3(
							function (commentsBefore, expressionResult, commentsAfter) {
								return {
									comments: A2(
										$stil4m$elm_syntax$Rope$prependTo,
										commentsAfter,
										A2($stil4m$elm_syntax$Rope$prependTo, expressionResult.comments, commentsBefore)),
									syntax: $stil4m$elm_syntax$Elm$Parser$Expression$FieldsFirstValue(expressionResult.syntax)
								};
							}),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
						$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordFields(),
			A2($stil4m$elm_syntax$ParserFast$followedBySymbol, '}', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)),
		A2(
			$stil4m$elm_syntax$ParserFast$symbol,
			'}',
			{
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(_List_Nil)
			}));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordFields() {
	return $stil4m$elm_syntax$ParserWithComments$many(
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			',',
			A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (commentsBefore, setterResult) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, setterResult.comments, commentsBefore),
							syntax: setterResult.syntax
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordSetterNodeWithLayout())));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordSetterNodeWithLayout() {
	return A6(
		$stil4m$elm_syntax$ParserFast$map5WithRange,
		F6(
			function (range, name, commentsAfterFunctionName, commentsAfterEquals, expressionResult, commentsAfterExpression) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterExpression,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							expressionResult.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterEquals, commentsAfterFunctionName))),
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						_Utils_Tuple2(name, expressionResult.syntax))
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '=', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout);
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letFunction() {
	return A3(
		$stil4m$elm_syntax$ParserFast$validate,
		function (result) {
			var _v18 = result.syntax;
			var letDeclaration = _v18.b;
			if (letDeclaration.$ === 'LetDestructuring') {
				return true;
			} else {
				var letFunctionDeclaration = letDeclaration.a;
				var _v20 = letFunctionDeclaration.signature;
				if (_v20.$ === 'Nothing') {
					return true;
				} else {
					var _v21 = _v20.a;
					var signature = _v21.b;
					var _v22 = signature.name;
					var signatureName = _v22.b;
					var _v23 = letFunctionDeclaration.declaration;
					var implementation = _v23.b;
					var _v24 = implementation.name;
					var implementationName = _v24.b;
					return _Utils_eq(implementationName, signatureName + '');
				}
			}
		},
		'Expected to find the same name for declaration and signature',
		A7(
			$stil4m$elm_syntax$ParserFast$map6WithStartLocation,
			F7(
				function (startNameStart, startNameNode, commentsAfterStartName, maybeSignature, _arguments, commentsAfterEqual, expressionResult) {
					var allComments = A2(
						$stil4m$elm_syntax$Rope$prependTo,
						expressionResult.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsAfterEqual,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								_arguments.comments,
								function () {
									if (maybeSignature.$ === 'Nothing') {
										return commentsAfterStartName;
									} else {
										var signature = maybeSignature.a;
										return A2($stil4m$elm_syntax$Rope$prependTo, signature.comments, commentsAfterStartName);
									}
								}())));
					if (maybeSignature.$ === 'Nothing') {
						var _v14 = expressionResult.syntax;
						var expressionRange = _v14.a;
						return {
							comments: allComments,
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: expressionRange.end, start: startNameStart},
								$stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction(
									{
										declaration: A2(
											$stil4m$elm_syntax$Elm$Syntax$Node$Node,
											{end: expressionRange.end, start: startNameStart},
											{_arguments: _arguments.syntax, expression: expressionResult.syntax, name: startNameNode}),
										documentation: $elm$core$Maybe$Nothing,
										signature: $elm$core$Maybe$Nothing
									}))
						};
					} else {
						var signature = maybeSignature.a;
						var _v15 = signature.implementationName;
						var implementationNameRange = _v15.a;
						var _v16 = expressionResult.syntax;
						var expressionRange = _v16.a;
						return {
							comments: allComments,
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: expressionRange.end, start: startNameStart},
								$stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction(
									{
										declaration: A2(
											$stil4m$elm_syntax$Elm$Syntax$Node$Node,
											{end: expressionRange.end, start: implementationNameRange.start},
											{_arguments: _arguments.syntax, expression: expressionResult.syntax, name: signature.implementationName}),
										documentation: $elm$core$Maybe$Nothing,
										signature: $elm$core$Maybe$Just(
											A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Signature$Signature, startNameNode, signature.typeAnnotation))
									}))
						};
					}
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A6(
				$stil4m$elm_syntax$ParserFast$map4OrSucceed,
				F4(
					function (commentsBeforeTypeAnnotation, typeAnnotationResult, implementationName, afterImplementationName) {
						return $elm$core$Maybe$Just(
							{
								comments: A2(
									$stil4m$elm_syntax$Rope$prependTo,
									afterImplementationName,
									A2(
										$stil4m$elm_syntax$Rope$prependTo,
										implementationName.comments,
										A2($stil4m$elm_syntax$Rope$prependTo, typeAnnotationResult.comments, commentsBeforeTypeAnnotation))),
								implementationName: implementationName.syntax,
								typeAnnotation: typeAnnotationResult.syntax
							});
					}),
				A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
				$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
				$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedBy($stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
				$elm$core$Maybe$Nothing),
			$stil4m$elm_syntax$Elm$Parser$Expression$parameterPatternsEqual,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDestructuringDeclaration() {
	return A5(
		$stil4m$elm_syntax$ParserFast$map4,
		F4(
			function (pattern, commentsAfterPattern, commentsAfterEquals, expressionResult) {
				var _v11 = pattern.syntax;
				var start = _v11.a.start;
				var _v12 = expressionResult.syntax;
				var end = _v12.a.end;
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						expressionResult.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsAfterEquals,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterPattern, pattern.comments))),
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						{end: end, start: start},
						A2($stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring, pattern.syntax, expressionResult.syntax))
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '=', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression());
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$lambdaExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'\\',
		A7(
			$stil4m$elm_syntax$ParserFast$map6WithStartLocation,
			F7(
				function (start, commentsAfterBackslash, firstArg, commentsAfterFirstArg, secondUpArgs, commentsAfterArrow, expressionResult) {
					var _v10 = expressionResult.syntax;
					var expressionRange = _v10.a;
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							expressionResult.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterArrow,
								A2(
									$stil4m$elm_syntax$Rope$prependTo,
									secondUpArgs.comments,
									A2(
										$stil4m$elm_syntax$Rope$prependTo,
										commentsAfterFirstArg,
										A2($stil4m$elm_syntax$Rope$prependTo, firstArg.comments, commentsAfterBackslash))))),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: expressionRange.end,
								start: {column: start.column - 1, row: start.row}
							},
							$stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
								{
									args: A2($elm$core$List$cons, firstArg.syntax, secondUpArgs.syntax),
									expression: expressionResult.syntax
								}))
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2(
				$stil4m$elm_syntax$ParserWithComments$until,
				A2($stil4m$elm_syntax$ParserFast$symbol, '->', _Utils_Tuple0),
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (patternResult, commentsAfter) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, patternResult.comments),
								syntax: patternResult.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing,
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifOrUnqualifiedReferenceExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifBlockExpression(),
		$stil4m$elm_syntax$Elm$Parser$Expression$unqualifiedFunctionReferenceExpressionFollowedByRecordAccess);
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifBlockExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$keywordFollowedBy,
		'if',
		A9(
			$stil4m$elm_syntax$ParserFast$map8WithStartLocation,
			F9(
				function (start, commentsAfterIf, condition, commentsBeforeThen, commentsAfterThen, ifTrue, commentsBeforeElse, commentsAfterElse, ifFalse) {
					var _v9 = ifFalse.syntax;
					var ifFalseRange = _v9.a;
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							ifFalse.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterElse,
								A2(
									$stil4m$elm_syntax$Rope$prependTo,
									commentsBeforeElse,
									A2(
										$stil4m$elm_syntax$Rope$prependTo,
										ifTrue.comments,
										A2(
											$stil4m$elm_syntax$Rope$prependTo,
											commentsAfterThen,
											A2(
												$stil4m$elm_syntax$Rope$prependTo,
												commentsBeforeThen,
												A2($stil4m$elm_syntax$Rope$prependTo, condition.comments, commentsAfterIf))))))),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: ifFalseRange.end,
								start: {column: start.column - 2, row: start.row}
							},
							A3($stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock, condition.syntax, ifTrue.syntax, ifFalse.syntax))
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'then', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'else', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$listOrGlslExpression() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'[',
		$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expressionAfterOpeningSquareBracket());
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expressionAfterOpeningSquareBracket() {
	return A2(
		$stil4m$elm_syntax$ParserFast$oneOf2,
		$stil4m$elm_syntax$Elm$Parser$Expression$glslExpressionAfterOpeningSquareBracket,
		A3(
			$stil4m$elm_syntax$ParserFast$map2WithRange,
			F3(
				function (range, commentsBefore, elements) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, elements.comments, commentsBefore),
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{
								end: range.end,
								start: {column: range.start.column - 1, row: range.start.row}
							},
							elements.syntax)
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			A2(
				$stil4m$elm_syntax$ParserFast$oneOf2,
				A2(
					$stil4m$elm_syntax$ParserFast$symbol,
					']',
					{
						comments: $stil4m$elm_syntax$Rope$empty,
						syntax: $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(_List_Nil)
					}),
				A2(
					$stil4m$elm_syntax$ParserFast$followedBySymbol,
					']',
					A4(
						$stil4m$elm_syntax$ParserFast$map3,
						F3(
							function (head, commentsAfterHead, tail) {
								return {
									comments: A2(
										$stil4m$elm_syntax$Rope$prependTo,
										tail.comments,
										A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterHead, head.comments)),
									syntax: $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(
										A2($elm$core$List$cons, head.syntax, tail.syntax))
								};
							}),
						$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression(),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
						$stil4m$elm_syntax$ParserWithComments$many(
							A2(
								$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
								',',
								$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
									$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression()))))))));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression() {
	return A2(
		$stil4m$elm_syntax$Elm$Parser$Expression$extendedSubExpressionOptimisticLayout,
		$elm$core$Result$Ok,
		function ($) {
			return $.extensionRight;
		});
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeL() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 9, '<<');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8QuestionMark() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 8, '<?>');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Mul() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 7, '*');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Idiv() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 7, '//');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Fdiv() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 7, '/');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Sub() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 6, '-');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Ignore() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 6, '|.');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Add() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 6, '+');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Keep() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 5, '|=');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApR() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixLeft, 1, '|>');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Neq() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '/=');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Lt() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '<');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Le() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '<=');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Gt() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '>');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Ge() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '>=');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Eq() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixNonAssociative, 4, '==');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeR() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 9, '>>');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8Pow() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 8, '^');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Slash() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 7, '</>');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5append() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 5, '++');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Cons() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 5, '::');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence3And() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 3, '&&');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence2Or() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 2, '||');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApL() {
	return A2($stil4m$elm_syntax$Elm$Parser$Expression$infixRight, 1, '<|');
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus() {
	return A2(
		$stil4m$elm_syntax$ParserFast$map,
		function (subExpressionResult) {
			var _v6 = subExpressionResult.syntax;
			var subExpressionRange = _v6.a;
			return {
				comments: subExpressionResult.comments,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					{
						end: subExpressionRange.end,
						start: {column: subExpressionRange.start.column - 1, row: subExpressionRange.start.row}
					},
					$stil4m$elm_syntax$Elm$Syntax$Expression$Negation(subExpressionResult.syntax))
			};
		},
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v7) {
				return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression();
			}));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationOperation() {
	return A2(
		$stil4m$elm_syntax$ParserFast$symbolBacktrackableFollowedBy,
		'-',
		$stil4m$elm_syntax$ParserFast$offsetSourceAndThen(
			F2(
				function (offset, source) {
					var _v5 = A3($elm$core$String$slice, offset - 2, offset - 1, source);
					switch (_v5) {
						case ' ':
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
						case '(':
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
						case ')':
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
						case '}':
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
						case '':
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
						default:
							return $stil4m$elm_syntax$Elm$Parser$Expression$negationWhitespaceProblem;
					}
				})));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression() {
	return $stil4m$elm_syntax$ParserFast$offsetSourceAndThen(
		F2(
			function (offset, source) {
				var _v4 = A3($elm$core$String$slice, offset, offset + 1, source);
				switch (_v4) {
					case '\"':
						return $stil4m$elm_syntax$Elm$Parser$Expression$literalExpression;
					case '(':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionIfNecessaryFollowedByRecordAccess();
					case '[':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$listOrGlslExpression();
					case '{':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordExpressionFollowedByRecordAccess();
					case 'c':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseOrUnqualifiedReferenceExpression();
					case '\\':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$lambdaExpression();
					case 'l':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letOrUnqualifiedReferenceExpression();
					case 'i':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifOrUnqualifiedReferenceExpression();
					case '.':
						return $stil4m$elm_syntax$Elm$Parser$Expression$recordAccessFunctionExpression;
					case '-':
						return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationOperation();
					case '\'':
						return $stil4m$elm_syntax$Elm$Parser$Expression$charLiteralExpression;
					default:
						return $stil4m$elm_syntax$Elm$Parser$Expression$referenceOrNumberExpression;
				}
			}));
}
function $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpressionMaybeAppliedOptimisticLayout() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (leftExpressionResult, commentsBeforeExtension, maybeArgsReverse) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						maybeArgsReverse.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsBeforeExtension, leftExpressionResult.comments)),
					syntax: function () {
						var _v0 = maybeArgsReverse.syntax;
						if (!_v0.b) {
							return leftExpressionResult.syntax;
						} else {
							var argsReverse = _v0;
							var _v1 = argsReverse.a;
							var lastArgRange = _v1.a;
							var leftNode = leftExpressionResult.syntax;
							var leftRange = leftNode.a;
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: lastArgRange.end, start: leftRange.start},
								$stil4m$elm_syntax$Elm$Syntax$Expression$Application(
									A2(
										$elm$core$List$cons,
										leftNode,
										$elm$core$List$reverse(argsReverse))));
						}
					}()
				};
			}),
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v2) {
				return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression();
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
			A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (arg, commentsAfter) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, arg.comments),
							syntax: arg.syntax
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy(
					$stil4m$elm_syntax$ParserFast$lazy(
						function (_v3) {
							return $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression();
						})),
				$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout)));
}
try {
	var $stil4m$elm_syntax$Elm$Parser$Expression$letOrUnqualifiedReferenceExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letOrUnqualifiedReferenceExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letOrUnqualifiedReferenceExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$letOrUnqualifiedReferenceExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$letExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$letExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$letDeclarationsIn = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDeclarationsIn();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDeclarationsIn = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$letDeclarationsIn;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$blockElement = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$blockElement();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$blockElement = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$blockElement;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$caseOrUnqualifiedReferenceExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseOrUnqualifiedReferenceExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseOrUnqualifiedReferenceExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$caseOrUnqualifiedReferenceExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$caseExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$caseExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$caseStatements = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatements();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatements = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$caseStatements;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$caseStatement = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatement();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$caseStatement = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$caseStatement;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$tupledExpressionIfNecessaryFollowedByRecordAccess = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionIfNecessaryFollowedByRecordAccess();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionIfNecessaryFollowedByRecordAccess = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$tupledExpressionIfNecessaryFollowedByRecordAccess;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$tupledExpressionInnerAfterOpeningParens = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionInnerAfterOpeningParens();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$tupledExpressionInnerAfterOpeningParens = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$tupledExpressionInnerAfterOpeningParens;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$recordExpressionFollowedByRecordAccess = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordExpressionFollowedByRecordAccess();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordExpressionFollowedByRecordAccess = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$recordExpressionFollowedByRecordAccess;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$recordContentsCurlyEnd = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordContentsCurlyEnd();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordContentsCurlyEnd = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$recordContentsCurlyEnd;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$recordFields = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordFields();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordFields = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$recordFields;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$recordSetterNodeWithLayout = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordSetterNodeWithLayout();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$recordSetterNodeWithLayout = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$recordSetterNodeWithLayout;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$letFunction = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letFunction();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letFunction = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$letFunction;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$letDestructuringDeclaration = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDestructuringDeclaration();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$letDestructuringDeclaration = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$letDestructuringDeclaration;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$lambdaExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$lambdaExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$lambdaExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$lambdaExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$ifOrUnqualifiedReferenceExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifOrUnqualifiedReferenceExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifOrUnqualifiedReferenceExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$ifOrUnqualifiedReferenceExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$ifBlockExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifBlockExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$ifBlockExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$ifBlockExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$listOrGlslExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$listOrGlslExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$listOrGlslExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$listOrGlslExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$expressionAfterOpeningSquareBracket = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expressionAfterOpeningSquareBracket();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expressionAfterOpeningSquareBracket = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$expressionAfterOpeningSquareBracket;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$expression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$expression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$expression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence9ComposeL = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeL();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeL = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence9ComposeL;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence8QuestionMark = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8QuestionMark();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8QuestionMark = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence8QuestionMark;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Mul = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Mul();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Mul = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Mul;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Idiv = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Idiv();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Idiv = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Idiv;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Fdiv = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Fdiv();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Fdiv = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Fdiv;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Sub = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Sub();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Sub = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Sub;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Ignore = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Ignore();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Ignore = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Ignore;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Add = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Add();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence6Add = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence6Add;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence5Keep = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Keep();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Keep = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence5Keep;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence1ApR = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApR();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApR = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence1ApR;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Neq = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Neq();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Neq = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Neq;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Lt = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Lt();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Lt = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Lt;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Le = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Le();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Le = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Le;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Gt = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Gt();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Gt = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Gt;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Ge = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Ge();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Ge = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Ge;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Eq = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Eq();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence4Eq = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence4Eq;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence9ComposeR = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeR();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence9ComposeR = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence9ComposeR;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence8Pow = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8Pow();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence8Pow = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence8Pow;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Slash = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Slash();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence7Slash = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence7Slash;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence5append = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5append();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5append = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence5append;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence5Cons = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Cons();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence5Cons = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence5Cons;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence3And = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence3And();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence3And = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence3And;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence2Or = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence2Or();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence2Or = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence2Or;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$precedence1ApL = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApL();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$precedence1ApL = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$precedence1ApL;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$negationAfterMinus = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationAfterMinus = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$negationAfterMinus;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$negationOperation = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationOperation();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$negationOperation = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$negationOperation;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$subExpression = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpression = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$subExpression;
	};
	var $stil4m$elm_syntax$Elm$Parser$Expression$subExpressionMaybeAppliedOptimisticLayout = $stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpressionMaybeAppliedOptimisticLayout();
	$stil4m$elm_syntax$Elm$Parser$Expression$cyclic$subExpressionMaybeAppliedOptimisticLayout = function () {
		return $stil4m$elm_syntax$Elm$Parser$Expression$subExpressionMaybeAppliedOptimisticLayout;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.Expression` are causing infinite recursion:\n\n  ┌─────┐\n  │    letOrUnqualifiedReferenceExpression\n  │     ↓\n  │    letExpression\n  │     ↓\n  │    letDeclarationsIn\n  │     ↓\n  │    blockElement\n  │     ↓\n  │    caseOrUnqualifiedReferenceExpression\n  │     ↓\n  │    caseExpression\n  │     ↓\n  │    caseStatements\n  │     ↓\n  │    caseStatement\n  │     ↓\n  │    tupledExpressionIfNecessaryFollowedByRecordAccess\n  │     ↓\n  │    tupledExpressionInnerAfterOpeningParens\n  │     ↓\n  │    recordExpressionFollowedByRecordAccess\n  │     ↓\n  │    recordContentsCurlyEnd\n  │     ↓\n  │    recordFields\n  │     ↓\n  │    recordSetterNodeWithLayout\n  │     ↓\n  │    letFunction\n  │     ↓\n  │    letDestructuringDeclaration\n  │     ↓\n  │    lambdaExpression\n  │     ↓\n  │    ifOrUnqualifiedReferenceExpression\n  │     ↓\n  │    ifBlockExpression\n  │     ↓\n  │    listOrGlslExpression\n  │     ↓\n  │    expressionAfterOpeningSquareBracket\n  │     ↓\n  │    expression\n  │     ↓\n  │    extendedSubExpressionOptimisticLayout\n  │     ↓\n  │    precedence9ComposeL\n  │     ↓\n  │    precedence8QuestionMark\n  │     ↓\n  │    precedence7Mul\n  │     ↓\n  │    precedence7Idiv\n  │     ↓\n  │    precedence7Fdiv\n  │     ↓\n  │    precedence6Sub\n  │     ↓\n  │    precedence6Ignore\n  │     ↓\n  │    precedence6Add\n  │     ↓\n  │    precedence5Keep\n  │     ↓\n  │    precedence1ApR\n  │     ↓\n  │    infixLeft\n  │     ↓\n  │    precedence4Neq\n  │     ↓\n  │    precedence4Lt\n  │     ↓\n  │    precedence4Le\n  │     ↓\n  │    precedence4Gt\n  │     ↓\n  │    precedence4Ge\n  │     ↓\n  │    precedence4Eq\n  │     ↓\n  │    infixNonAssociative\n  │     ↓\n  │    infixOperatorAndThen\n  │     ↓\n  │    precedence9ComposeR\n  │     ↓\n  │    precedence8Pow\n  │     ↓\n  │    precedence7Slash\n  │     ↓\n  │    precedence5append\n  │     ↓\n  │    precedence5Cons\n  │     ↓\n  │    precedence3And\n  │     ↓\n  │    precedence2Or\n  │     ↓\n  │    precedence1ApL\n  │     ↓\n  │    infixRight\n  │     ↓\n  │    negationAfterMinus\n  │     ↓\n  │    negationOperation\n  │     ↓\n  │    subExpression\n  │     ↓\n  │    subExpressionMaybeAppliedOptimisticLayout\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $stil4m$elm_syntax$ParserFast$map6 = F7(
	function (func, _v0, _v1, _v2, _v3, _v4, _v5) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		var parseF = _v5.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v6 = parseA(s0);
				if (_v6.$ === 'Bad') {
					var committed = _v6.a;
					var x = _v6.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v6.a;
					var s1 = _v6.b;
					var _v7 = parseB(s1);
					if (_v7.$ === 'Bad') {
						var x = _v7.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v7.a;
						var s2 = _v7.b;
						var _v8 = parseC(s2);
						if (_v8.$ === 'Bad') {
							var x = _v8.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v8.a;
							var s3 = _v8.b;
							var _v9 = parseD(s3);
							if (_v9.$ === 'Bad') {
								var x = _v9.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v9.a;
								var s4 = _v9.b;
								var _v10 = parseE(s4);
								if (_v10.$ === 'Bad') {
									var x = _v10.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v10.a;
									var s5 = _v10.b;
									var _v11 = parseF(s5);
									if (_v11.$ === 'Bad') {
										var x = _v11.b;
										return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
									} else {
										var f = _v11.a;
										var s6 = _v11.b;
										return A2(
											$stil4m$elm_syntax$ParserFast$Good,
											A6(func, a, b, c, d, e, f),
											s6);
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$parameterPatternsEqual = A2(
	$stil4m$elm_syntax$ParserWithComments$until,
	$stil4m$elm_syntax$Elm$Parser$Tokens$equal,
	A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (patternResult, commentsAfterPattern) {
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterPattern, patternResult.comments),
					syntax: patternResult.syntax
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Patterns$patternNotDirectlyComposing,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout));
var $stil4m$elm_syntax$Elm$Parser$Declarations$functionAfterDocumentation = A7(
	$stil4m$elm_syntax$ParserFast$map6,
	F6(
		function (startName, commentsAfterStartName, maybeSignature, _arguments, commentsAfterEqual, result) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					result.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterEqual,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							_arguments.comments,
							function () {
								if (maybeSignature.$ === 'Nothing') {
									return commentsAfterStartName;
								} else {
									var signature = maybeSignature.a;
									return A2($stil4m$elm_syntax$Rope$prependTo, signature.comments, commentsAfterStartName);
								}
							}()))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$FunctionDeclarationAfterDocumentation(
					{
						_arguments: _arguments.syntax,
						expression: result.syntax,
						signature: A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.syntax;
							},
							maybeSignature),
						startName: startName
					})
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	A6(
		$stil4m$elm_syntax$ParserFast$map4OrSucceed,
		F4(
			function (commentsBeforeTypeAnnotation, typeAnnotationResult, implementationName, afterImplementationName) {
				return $elm$core$Maybe$Just(
					{
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							afterImplementationName,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								implementationName.comments,
								A2($stil4m$elm_syntax$Rope$prependTo, typeAnnotationResult.comments, commentsBeforeTypeAnnotation))),
						syntax: {implementationName: implementationName.syntax, typeAnnotation: typeAnnotationResult.syntax}
					});
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
		$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedBy($stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$elm$core$Maybe$Nothing),
	$stil4m$elm_syntax$Elm$Parser$Declarations$parameterPatternsEqual,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Expression$expression);
var $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedByWithComments = function (nextParser) {
	return A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (commentsBefore, after) {
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, after.comments, commentsBefore),
					syntax: after.syntax
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(nextParser));
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$PortDeclarationAfterDocumentation = function (a) {
	return {$: 'PortDeclarationAfterDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$portDeclarationAfterDocumentation = A6(
	$stil4m$elm_syntax$ParserFast$map5,
	F5(
		function (commentsAfterPort, name, commentsAfterName, commentsAfterColon, typeAnnotationResult) {
			var nameRange = name.a;
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					commentsAfterColon,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						typeAnnotationResult.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterName, commentsAfterPort))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$PortDeclarationAfterDocumentation(
					{
						name: name,
						startLocation: {column: 1, row: nameRange.start.row},
						typeAnnotation: typeAnnotationResult.syntax
					})
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'port', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation);
var $stil4m$elm_syntax$Elm$Parser$Declarations$TypeDeclarationAfterDocumentation = function (a) {
	return {$: 'TypeDeclarationAfterDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$typeGenericListEquals = A2(
	$stil4m$elm_syntax$ParserWithComments$until,
	$stil4m$elm_syntax$Elm$Parser$Tokens$equal,
	A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (name, commentsAfterName) {
				return {comments: commentsAfterName, syntax: name};
			}),
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout));
var $stil4m$elm_syntax$ParserFast$ifFollowedByWhileMapWithRangeWithoutLinebreak = F3(
	function (rangeAndConsumedStringToRes, firstIsOkay, afterFirstIsOkay) {
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var firstOffset = A3($stil4m$elm_syntax$ParserFast$isSubCharWithoutLinebreak, firstIsOkay, s0.offset, s0.src);
				if (_Utils_eq(firstOffset, -1)) {
					return A2(
						$stil4m$elm_syntax$ParserFast$Bad,
						false,
						A2($stil4m$elm_syntax$ParserFast$ExpectingCharSatisfyingPredicate, s0.row, s0.col));
				} else {
					var s1 = A6($stil4m$elm_syntax$ParserFast$skipWhileWithoutLinebreakHelp, afterFirstIsOkay, firstOffset, s0.row, s0.col + 1, s0.src, s0.indent);
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						A2(
							rangeAndConsumedStringToRes,
							{
								end: {column: s1.col, row: s1.row},
								start: {column: s0.col, row: s0.row}
							},
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src)),
						s1);
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode = A3($stil4m$elm_syntax$ParserFast$ifFollowedByWhileMapWithRangeWithoutLinebreak, $stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Char$Extra$unicodeIsUpperFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast);
var $stil4m$elm_syntax$Elm$Parser$Declarations$valueConstructorOptimisticLayout = A4(
	$stil4m$elm_syntax$ParserFast$map3,
	F3(
		function (name, commentsAfterName, argumentsReverse) {
			var nameRange = name.a;
			var fullRange = function () {
				var _v0 = argumentsReverse.syntax;
				if (_v0.b) {
					var _v1 = _v0.a;
					var lastArgRange = _v1.a;
					return {end: lastArgRange.end, start: nameRange.start};
				} else {
					return nameRange;
				}
			}();
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, argumentsReverse.comments, commentsAfterName),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					fullRange,
					{
						_arguments: $elm$core$List$reverse(argumentsReverse.syntax),
						name: name
					})
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
	$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
		$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedFollowedBy(
			A3(
				$stil4m$elm_syntax$ParserFast$map2,
				F2(
					function (typeAnnotationResult, commentsAfter) {
						return {
							comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, typeAnnotationResult.comments),
							syntax: typeAnnotationResult.syntax
						};
					}),
				$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFnExcludingTypedWithArguments,
				$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout))));
var $stil4m$elm_syntax$Elm$Parser$Declarations$customTypeDefinitionAfterDocumentationAfterTypePrefix = A7(
	$stil4m$elm_syntax$ParserFast$map6,
	F6(
		function (name, commentsAfterName, parameters, commentsAfterEqual, headVariant, tailVariantsReverse) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					tailVariantsReverse.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						headVariant.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsAfterEqual,
							A2($stil4m$elm_syntax$Rope$prependTo, parameters.comments, commentsAfterName)))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$TypeDeclarationAfterDocumentation(
					{headVariant: headVariant.syntax, name: name, parameters: parameters.syntax, tailVariantsReverse: tailVariantsReverse.syntax})
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$typeGenericListEquals,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$valueConstructorOptimisticLayout,
	$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'|',
			A2(
				$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedPlusFollowedBy,
				1,
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (commentsBeforePipe, variantResult) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, variantResult.comments, commentsBeforePipe),
								syntax: variantResult.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$Elm$Parser$Declarations$valueConstructorOptimisticLayout)))));
var $stil4m$elm_syntax$Elm$Parser$Declarations$TypeAliasDeclarationAfterDocumentation = function (a) {
	return {$: 'TypeAliasDeclarationAfterDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$typeAliasDefinitionAfterDocumentationAfterTypePrefix = A7(
	$stil4m$elm_syntax$ParserFast$map6,
	F6(
		function (commentsAfterAlias, name, commentsAfterName, parameters, commentsAfterEquals, typeAnnotationResult) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					typeAnnotationResult.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterEquals,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							parameters.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterName, commentsAfterAlias)))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$TypeAliasDeclarationAfterDocumentation(
					{name: name, parameters: parameters.syntax, typeAnnotation: typeAnnotationResult.syntax})
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'alias', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$typeGenericListEquals,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation);
var $stil4m$elm_syntax$Elm$Parser$Declarations$typeOrTypeAliasDefinitionAfterDocumentation = A3(
	$stil4m$elm_syntax$ParserFast$map2,
	F2(
		function (commentsAfterType, declarationAfterDocumentation) {
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, declarationAfterDocumentation.comments, commentsAfterType),
				syntax: declarationAfterDocumentation.syntax
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'type', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2($stil4m$elm_syntax$ParserFast$oneOf2, $stil4m$elm_syntax$Elm$Parser$Declarations$typeAliasDefinitionAfterDocumentationAfterTypePrefix, $stil4m$elm_syntax$Elm$Parser$Declarations$customTypeDefinitionAfterDocumentationAfterTypePrefix));
var $stil4m$elm_syntax$Elm$Parser$Declarations$declarationWithDocumentation = A3(
	$stil4m$elm_syntax$ParserFast$validate,
	function (result) {
		var _v11 = result.syntax;
		var decl = _v11.b;
		if (decl.$ === 'FunctionDeclaration') {
			var letFunctionDeclaration = decl.a;
			var _v13 = letFunctionDeclaration.signature;
			if (_v13.$ === 'Nothing') {
				return true;
			} else {
				var _v14 = _v13.a;
				var signature = _v14.b;
				var _v15 = signature.name;
				var signatureName = _v15.b;
				var _v16 = letFunctionDeclaration.declaration;
				var implementation = _v16.b;
				var _v17 = implementation.name;
				var implementationName = _v17.b;
				return _Utils_eq(implementationName, signatureName + '');
			}
		} else {
			return true;
		}
	},
	'Expected to find the same name for declaration and signature',
	A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (documentation, afterDocumentation) {
				var start = $stil4m$elm_syntax$Elm$Syntax$Node$range(documentation).start;
				var _v0 = afterDocumentation.syntax;
				switch (_v0.$) {
					case 'FunctionDeclarationAfterDocumentation':
						var functionDeclarationAfterDocumentation = _v0.a;
						var _v1 = functionDeclarationAfterDocumentation.signature;
						if (_v1.$ === 'Just') {
							var signature = _v1.a;
							var _v2 = signature.implementationName;
							var implementationNameRange = _v2.a;
							var _v3 = functionDeclarationAfterDocumentation.expression;
							var expressionRange = _v3.a;
							return {
								comments: afterDocumentation.comments,
								syntax: A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									{end: expressionRange.end, start: start},
									$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
										{
											declaration: A2(
												$stil4m$elm_syntax$Elm$Syntax$Node$Node,
												{end: expressionRange.end, start: implementationNameRange.start},
												{_arguments: functionDeclarationAfterDocumentation._arguments, expression: functionDeclarationAfterDocumentation.expression, name: signature.implementationName}),
											documentation: $elm$core$Maybe$Just(documentation),
											signature: $elm$core$Maybe$Just(
												A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Signature$Signature, functionDeclarationAfterDocumentation.startName, signature.typeAnnotation))
										}))
							};
						} else {
							var _v4 = functionDeclarationAfterDocumentation.startName;
							var startNameRange = _v4.a;
							var _v5 = functionDeclarationAfterDocumentation.expression;
							var expressionRange = _v5.a;
							return {
								comments: afterDocumentation.comments,
								syntax: A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									{end: expressionRange.end, start: start},
									$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
										{
											declaration: A2(
												$stil4m$elm_syntax$Elm$Syntax$Node$Node,
												{end: expressionRange.end, start: startNameRange.start},
												{_arguments: functionDeclarationAfterDocumentation._arguments, expression: functionDeclarationAfterDocumentation.expression, name: functionDeclarationAfterDocumentation.startName}),
											documentation: $elm$core$Maybe$Just(documentation),
											signature: $elm$core$Maybe$Nothing
										}))
							};
						}
					case 'TypeDeclarationAfterDocumentation':
						var typeDeclarationAfterDocumentation = _v0.a;
						var end = function () {
							var _v6 = typeDeclarationAfterDocumentation.tailVariantsReverse;
							if (_v6.b) {
								var _v7 = _v6.a;
								var range = _v7.a;
								return range.end;
							} else {
								var _v8 = typeDeclarationAfterDocumentation.headVariant;
								var headVariantRange = _v8.a;
								return headVariantRange.end;
							}
						}();
						return {
							comments: afterDocumentation.comments,
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: end, start: start},
								$stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
									{
										constructors: A2(
											$elm$core$List$cons,
											typeDeclarationAfterDocumentation.headVariant,
											$elm$core$List$reverse(typeDeclarationAfterDocumentation.tailVariantsReverse)),
										documentation: $elm$core$Maybe$Just(documentation),
										generics: typeDeclarationAfterDocumentation.parameters,
										name: typeDeclarationAfterDocumentation.name
									}))
						};
					case 'TypeAliasDeclarationAfterDocumentation':
						var typeAliasDeclarationAfterDocumentation = _v0.a;
						var _v9 = typeAliasDeclarationAfterDocumentation.typeAnnotation;
						var typeAnnotationRange = _v9.a;
						return {
							comments: afterDocumentation.comments,
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: typeAnnotationRange.end, start: start},
								$stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
									{
										documentation: $elm$core$Maybe$Just(documentation),
										generics: typeAliasDeclarationAfterDocumentation.parameters,
										name: typeAliasDeclarationAfterDocumentation.name,
										typeAnnotation: typeAliasDeclarationAfterDocumentation.typeAnnotation
									}))
						};
					default:
						var portDeclarationAfterName = _v0.a;
						var _v10 = portDeclarationAfterName.typeAnnotation;
						var typeAnnotationRange = _v10.a;
						return {
							comments: A2(
								$stil4m$elm_syntax$Rope$filledPrependTo,
								afterDocumentation.comments,
								$stil4m$elm_syntax$Rope$one(documentation)),
							syntax: A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								{end: typeAnnotationRange.end, start: portDeclarationAfterName.startLocation},
								$stil4m$elm_syntax$Elm$Syntax$Declaration$PortDeclaration(
									{name: portDeclarationAfterName.name, typeAnnotation: portDeclarationAfterName.typeAnnotation}))
						};
				}
			}),
		$stil4m$elm_syntax$Elm$Parser$Comments$declarationDocumentation,
		$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedByWithComments(
			A3($stil4m$elm_syntax$ParserFast$oneOf3, $stil4m$elm_syntax$Elm$Parser$Declarations$functionAfterDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$typeOrTypeAliasDefinitionAfterDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$portDeclarationAfterDocumentation))));
var $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNotInfixNode = A4(
	$stil4m$elm_syntax$ParserFast$ifFollowedByWhileValidateMapWithRangeWithoutLinebreak,
	$stil4m$elm_syntax$Elm$Syntax$Node$Node,
	$stil4m$elm_syntax$Char$Extra$unicodeIsLowerFast,
	$stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast,
	function (name) {
		return (name !== 'infix') && $stil4m$elm_syntax$Elm$Parser$Tokens$isNotReserved(name);
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$functionDeclarationWithoutDocumentation = A3(
	$stil4m$elm_syntax$ParserFast$validate,
	function (result) {
		var _v5 = result.syntax;
		var decl = _v5.b;
		if (decl.$ === 'FunctionDeclaration') {
			var letFunctionDeclaration = decl.a;
			var _v7 = letFunctionDeclaration.signature;
			if (_v7.$ === 'Nothing') {
				return true;
			} else {
				var _v8 = _v7.a;
				var signature = _v8.b;
				var _v9 = signature.name;
				var signatureName = _v9.b;
				var _v10 = letFunctionDeclaration.declaration;
				var implementation = _v10.b;
				var _v11 = implementation.name;
				var implementationName = _v11.b;
				return _Utils_eq(implementationName, signatureName + '');
			}
		} else {
			return true;
		}
	},
	'Expected to find the same name for declaration and signature',
	A7(
		$stil4m$elm_syntax$ParserFast$map6WithStartLocation,
		F7(
			function (startNameStart, startNameNode, commentsAfterStartName, maybeSignature, _arguments, commentsAfterEqual, result) {
				var allComments = A2(
					$stil4m$elm_syntax$Rope$prependTo,
					result.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterEqual,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							_arguments.comments,
							function () {
								if (maybeSignature.$ === 'Nothing') {
									return commentsAfterStartName;
								} else {
									var signature = maybeSignature.a;
									return A2($stil4m$elm_syntax$Rope$prependTo, signature.comments, commentsAfterStartName);
								}
							}())));
				if (maybeSignature.$ === 'Nothing') {
					var _v1 = result.syntax;
					var expressionRange = _v1.a;
					return {
						comments: allComments,
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{end: expressionRange.end, start: startNameStart},
							$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
								{
									declaration: A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										{end: expressionRange.end, start: startNameStart},
										{_arguments: _arguments.syntax, expression: result.syntax, name: startNameNode}),
									documentation: $elm$core$Maybe$Nothing,
									signature: $elm$core$Maybe$Nothing
								}))
					};
				} else {
					var signature = maybeSignature.a;
					var _v2 = signature.implementationName;
					var implementationNameRange = _v2.a;
					var _v3 = result.syntax;
					var expressionRange = _v3.a;
					return {
						comments: allComments,
						syntax: A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{end: expressionRange.end, start: startNameStart},
							$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
								{
									declaration: A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										{end: expressionRange.end, start: implementationNameRange.start},
										{_arguments: _arguments.syntax, expression: result.syntax, name: signature.implementationName}),
									documentation: $elm$core$Maybe$Nothing,
									signature: $elm$core$Maybe$Just(
										A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Signature$Signature, startNameNode, signature.typeAnnotation))
								}))
					};
				}
			}),
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNotInfixNode,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		A6(
			$stil4m$elm_syntax$ParserFast$map4OrSucceed,
			F4(
				function (commentsBeforeTypeAnnotation, typeAnnotationResult, implementationName, afterImplementationName) {
					return $elm$core$Maybe$Just(
						{
							comments: A2(
								$stil4m$elm_syntax$Rope$prependTo,
								afterImplementationName,
								A2(
									$stil4m$elm_syntax$Rope$prependTo,
									implementationName.comments,
									A2($stil4m$elm_syntax$Rope$prependTo, typeAnnotationResult.comments, commentsBeforeTypeAnnotation))),
							implementationName: implementationName.syntax,
							typeAnnotation: typeAnnotationResult.syntax
						});
				}),
			A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
			$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedBy($stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$elm$core$Maybe$Nothing),
		$stil4m$elm_syntax$Elm$Parser$Declarations$parameterPatternsEqual,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$Elm$Parser$Expression$expression));
var $stil4m$elm_syntax$Elm$Syntax$Declaration$InfixDeclaration = function (a) {
	return {$: 'InfixDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$infixDirection = A3(
	$stil4m$elm_syntax$ParserFast$oneOf3,
	A2(
		$stil4m$elm_syntax$ParserFast$mapWithRange,
		$stil4m$elm_syntax$Elm$Syntax$Node$Node,
		A2($stil4m$elm_syntax$ParserFast$keyword, 'right', $stil4m$elm_syntax$Elm$Syntax$Infix$Right)),
	A2(
		$stil4m$elm_syntax$ParserFast$mapWithRange,
		$stil4m$elm_syntax$Elm$Syntax$Node$Node,
		A2($stil4m$elm_syntax$ParserFast$keyword, 'left', $stil4m$elm_syntax$Elm$Syntax$Infix$Left)),
	A2(
		$stil4m$elm_syntax$ParserFast$mapWithRange,
		$stil4m$elm_syntax$Elm$Syntax$Node$Node,
		A2($stil4m$elm_syntax$ParserFast$keyword, 'non', $stil4m$elm_syntax$Elm$Syntax$Infix$Non)));
var $stil4m$elm_syntax$ParserFast$errorAsOffsetAndInt = {_int: 0, offset: -1};
var $stil4m$elm_syntax$ParserFast$convertIntegerDecimal = F2(
	function (offset, src) {
		var _v0 = A3($elm$core$String$slice, offset, offset + 1, src);
		switch (_v0) {
			case '0':
				return {_int: 0, offset: offset + 1};
			case '1':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 1, offset + 1, src);
			case '2':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 2, offset + 1, src);
			case '3':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 3, offset + 1, src);
			case '4':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 4, offset + 1, src);
			case '5':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 5, offset + 1, src);
			case '6':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 6, offset + 1, src);
			case '7':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 7, offset + 1, src);
			case '8':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 8, offset + 1, src);
			case '9':
				return A3($stil4m$elm_syntax$ParserFast$convert0OrMore0To9s, 9, offset + 1, src);
			default:
				return $stil4m$elm_syntax$ParserFast$errorAsOffsetAndInt;
		}
	});
var $stil4m$elm_syntax$ParserFast$integerDecimalMapWithRange = function (rangeAndIntToRes) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s0) {
			var s1 = A2($stil4m$elm_syntax$ParserFast$convertIntegerDecimal, s0.offset, s0.src);
			if (_Utils_eq(s1.offset, -1)) {
				return A2(
					$stil4m$elm_syntax$ParserFast$Bad,
					false,
					A2($stil4m$elm_syntax$ParserFast$ExpectingNumber, s0.row, s0.col));
			} else {
				var newColumn = s0.col + (s1.offset - s0.offset);
				return A2(
					$stil4m$elm_syntax$ParserFast$Good,
					A2(
						rangeAndIntToRes,
						{
							end: {column: newColumn, row: s0.row},
							start: {column: s0.col, row: s0.row}
						},
						s1._int),
					{col: newColumn, indent: s0.indent, offset: s1.offset, row: s0.row, src: s0.src});
			}
		});
};
var $stil4m$elm_syntax$ParserFast$map9WithRange = function (func) {
	return function (_v0) {
		return function (_v1) {
			return function (_v2) {
				return function (_v3) {
					return function (_v4) {
						return function (_v5) {
							return function (_v6) {
								return function (_v7) {
									return function (_v8) {
										var parseA = _v0.a;
										var parseB = _v1.a;
										var parseC = _v2.a;
										var parseD = _v3.a;
										var parseE = _v4.a;
										var parseF = _v5.a;
										var parseG = _v6.a;
										var parseH = _v7.a;
										var parseI = _v8.a;
										return $stil4m$elm_syntax$ParserFast$Parser(
											function (s0) {
												var _v9 = parseA(s0);
												if (_v9.$ === 'Bad') {
													var committed = _v9.a;
													var x = _v9.b;
													return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
												} else {
													var a = _v9.a;
													var s1 = _v9.b;
													var _v10 = parseB(s1);
													if (_v10.$ === 'Bad') {
														var x = _v10.b;
														return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
													} else {
														var b = _v10.a;
														var s2 = _v10.b;
														var _v11 = parseC(s2);
														if (_v11.$ === 'Bad') {
															var x = _v11.b;
															return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
														} else {
															var c = _v11.a;
															var s3 = _v11.b;
															var _v12 = parseD(s3);
															if (_v12.$ === 'Bad') {
																var x = _v12.b;
																return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
															} else {
																var d = _v12.a;
																var s4 = _v12.b;
																var _v13 = parseE(s4);
																if (_v13.$ === 'Bad') {
																	var x = _v13.b;
																	return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
																} else {
																	var e = _v13.a;
																	var s5 = _v13.b;
																	var _v14 = parseF(s5);
																	if (_v14.$ === 'Bad') {
																		var x = _v14.b;
																		return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
																	} else {
																		var f = _v14.a;
																		var s6 = _v14.b;
																		var _v15 = parseG(s6);
																		if (_v15.$ === 'Bad') {
																			var x = _v15.b;
																			return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
																		} else {
																			var g = _v15.a;
																			var s7 = _v15.b;
																			var _v16 = parseH(s7);
																			if (_v16.$ === 'Bad') {
																				var x = _v16.b;
																				return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
																			} else {
																				var h = _v16.a;
																				var s8 = _v16.b;
																				var _v17 = parseI(s8);
																				if (_v17.$ === 'Bad') {
																					var x = _v17.b;
																					return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
																				} else {
																					var i = _v17.a;
																					var s9 = _v17.b;
																					return A2(
																						$stil4m$elm_syntax$ParserFast$Good,
																						func(
																							{
																								end: {column: s9.col, row: s9.row},
																								start: {column: s0.col, row: s0.row}
																							})(a)(b)(c)(d)(e)(f)(g)(h)(i),
																						s9);
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											});
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$infixDeclaration = $stil4m$elm_syntax$ParserFast$map9WithRange(
	function (range) {
		return function (commentsAfterInfix) {
			return function (direction) {
				return function (commentsAfterDirection) {
					return function (precedence) {
						return function (commentsAfterPrecedence) {
							return function (operator) {
								return function (commentsAfterOperator) {
									return function (commentsAfterEqual) {
										return function (fn) {
											return {
												comments: A2(
													$stil4m$elm_syntax$Rope$prependTo,
													commentsAfterEqual,
													A2(
														$stil4m$elm_syntax$Rope$prependTo,
														commentsAfterOperator,
														A2(
															$stil4m$elm_syntax$Rope$prependTo,
															commentsAfterPrecedence,
															A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterDirection, commentsAfterInfix)))),
												syntax: A2(
													$stil4m$elm_syntax$Elm$Syntax$Node$Node,
													range,
													$stil4m$elm_syntax$Elm$Syntax$Declaration$InfixDeclaration(
														{direction: direction, _function: fn, operator: operator, precedence: precedence}))
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	})(
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'infix', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))($stil4m$elm_syntax$Elm$Parser$Declarations$infixDirection)($stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)(
	$stil4m$elm_syntax$ParserFast$integerDecimalMapWithRange($stil4m$elm_syntax$Elm$Syntax$Node$Node))($stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)(
	A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'(',
		A4(
			$stil4m$elm_syntax$ParserFast$whileWithoutLinebreakAnd2PartUtf16ValidateMapWithRangeBacktrackableFollowedBySymbol,
			F2(
				function (operatorRange, operator) {
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						{
							end: {column: operatorRange.end.column + 1, row: operatorRange.end.row},
							start: {column: operatorRange.start.column - 1, row: operatorRange.start.row}
						},
						operator);
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$isOperatorSymbolChar,
			$stil4m$elm_syntax$Elm$Parser$Tokens$isAllowedOperatorToken,
			')')))($stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)(
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '=', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout))($stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode);
var $stil4m$elm_syntax$ParserFast$oneOf5 = F5(
	function (_v0, _v1, _v2, _v3, _v4) {
		var attemptFirst = _v0.a;
		var attemptSecond = _v1.a;
		var attemptThird = _v2.a;
		var attemptFourth = _v3.a;
		var attemptFifth = _v4.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s) {
				var _v5 = attemptFirst(s);
				if (_v5.$ === 'Good') {
					var firstGood = _v5;
					return firstGood;
				} else {
					var firstBad = _v5;
					var firstCommitted = firstBad.a;
					var firstX = firstBad.b;
					if (firstCommitted) {
						return firstBad;
					} else {
						var _v6 = attemptSecond(s);
						if (_v6.$ === 'Good') {
							var secondGood = _v6;
							return secondGood;
						} else {
							var secondBad = _v6;
							var secondCommitted = secondBad.a;
							var secondX = secondBad.b;
							if (secondCommitted) {
								return secondBad;
							} else {
								var _v7 = attemptThird(s);
								if (_v7.$ === 'Good') {
									var thirdGood = _v7;
									return thirdGood;
								} else {
									var thirdBad = _v7;
									var thirdCommitted = thirdBad.a;
									var thirdX = thirdBad.b;
									if (thirdCommitted) {
										return thirdBad;
									} else {
										var _v8 = attemptFourth(s);
										if (_v8.$ === 'Good') {
											var fourthGood = _v8;
											return fourthGood;
										} else {
											var fourthBad = _v8;
											var fourthCommitted = fourthBad.a;
											var fourthX = fourthBad.b;
											if (fourthCommitted) {
												return fourthBad;
											} else {
												var _v9 = attemptFifth(s);
												if (_v9.$ === 'Good') {
													var fifthGood = _v9;
													return fifthGood;
												} else {
													var fifthBad = _v9;
													var fifthCommitted = fifthBad.a;
													var fifthX = fifthBad.b;
													return fifthCommitted ? fifthBad : A2(
														$stil4m$elm_syntax$ParserFast$Bad,
														false,
														A3(
															$stil4m$elm_syntax$ParserFast$ExpectingOneOf,
															firstX,
															secondX,
															_List_fromArray(
																[thirdX, fourthX, fifthX])));
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$portDeclarationWithoutDocumentation = A6(
	$stil4m$elm_syntax$ParserFast$map5,
	F5(
		function (commentsAfterPort, name, commentsAfterName, commentsAfterColon, typeAnnotationResult) {
			var nameRange = name.a;
			var _v0 = typeAnnotationResult.syntax;
			var end = _v0.a.end;
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					typeAnnotationResult.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterColon,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterName, commentsAfterPort))),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					{
						end: end,
						start: {column: 1, row: nameRange.start.row}
					},
					$stil4m$elm_syntax$Elm$Syntax$Declaration$PortDeclaration(
						{name: name, typeAnnotation: typeAnnotationResult.syntax}))
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'port', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, ':', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation);
var $stil4m$elm_syntax$Elm$Parser$Declarations$TypeDeclarationWithoutDocumentation = function (a) {
	return {$: 'TypeDeclarationWithoutDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$customTypeDefinitionWithoutDocumentationAfterTypePrefix = A7(
	$stil4m$elm_syntax$ParserFast$map6,
	F6(
		function (name, commentsAfterName, parameters, commentsAfterEqual, headVariant, tailVariantsReverse) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					tailVariantsReverse.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						headVariant.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							commentsAfterEqual,
							A2($stil4m$elm_syntax$Rope$prependTo, parameters.comments, commentsAfterName)))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$TypeDeclarationWithoutDocumentation(
					{headVariant: headVariant.syntax, name: name, parameters: parameters.syntax, tailVariantsReverse: tailVariantsReverse.syntax})
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$typeGenericListEquals,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$valueConstructorOptimisticLayout,
	$stil4m$elm_syntax$ParserWithComments$manyWithoutReverse(
		A2(
			$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
			'|',
			A2(
				$stil4m$elm_syntax$Elm$Parser$Layout$positivelyIndentedPlusFollowedBy,
				1,
				A3(
					$stil4m$elm_syntax$ParserFast$map2,
					F2(
						function (commentsBeforePipe, variantResult) {
							return {
								comments: A2($stil4m$elm_syntax$Rope$prependTo, variantResult.comments, commentsBeforePipe),
								syntax: variantResult.syntax
							};
						}),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
					$stil4m$elm_syntax$Elm$Parser$Declarations$valueConstructorOptimisticLayout)))));
var $stil4m$elm_syntax$ParserFast$map2WithStartLocation = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var committed = _v2.a;
					var x = _v2.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v2.a;
					var s1 = _v2.b;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var x = _v3.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v3.a;
						var s2 = _v3.b;
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							A3(
								func,
								{column: s0.col, row: s0.row},
								a,
								b),
							s2);
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$TypeAliasDeclarationWithoutDocumentation = function (a) {
	return {$: 'TypeAliasDeclarationWithoutDocumentation', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$typeAliasDefinitionWithoutDocumentationAfterTypePrefix = A7(
	$stil4m$elm_syntax$ParserFast$map6,
	F6(
		function (commentsAfterAlias, name, commentsAfterName, parameters, commentsAfterEqual, typeAnnotationResult) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					typeAnnotationResult.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterEqual,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							parameters.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterName, commentsAfterAlias)))),
				syntax: $stil4m$elm_syntax$Elm$Parser$Declarations$TypeAliasDeclarationWithoutDocumentation(
					{name: name, parameters: parameters.syntax, typeAnnotation: typeAnnotationResult.syntax})
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'alias', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Declarations$typeGenericListEquals,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation);
var $stil4m$elm_syntax$Elm$Parser$Declarations$typeOrTypeAliasDefinitionWithoutDocumentation = A3(
	$stil4m$elm_syntax$ParserFast$map2WithStartLocation,
	F3(
		function (start, commentsAfterType, afterStart) {
			var allComments = A2($stil4m$elm_syntax$Rope$prependTo, afterStart.comments, commentsAfterType);
			var _v0 = afterStart.syntax;
			if (_v0.$ === 'TypeDeclarationWithoutDocumentation') {
				var typeDeclarationAfterDocumentation = _v0.a;
				var end = function () {
					var _v1 = typeDeclarationAfterDocumentation.tailVariantsReverse;
					if (_v1.b) {
						var _v2 = _v1.a;
						var range = _v2.a;
						return range.end;
					} else {
						var _v3 = typeDeclarationAfterDocumentation.headVariant;
						var headVariantRange = _v3.a;
						return headVariantRange.end;
					}
				}();
				return {
					comments: allComments,
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						{end: end, start: start},
						$stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
							{
								constructors: A2(
									$elm$core$List$cons,
									typeDeclarationAfterDocumentation.headVariant,
									$elm$core$List$reverse(typeDeclarationAfterDocumentation.tailVariantsReverse)),
								documentation: $elm$core$Maybe$Nothing,
								generics: typeDeclarationAfterDocumentation.parameters,
								name: typeDeclarationAfterDocumentation.name
							}))
				};
			} else {
				var typeAliasDeclarationAfterDocumentation = _v0.a;
				var _v4 = typeAliasDeclarationAfterDocumentation.typeAnnotation;
				var typeAnnotationRange = _v4.a;
				return {
					comments: allComments,
					syntax: A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						{end: typeAnnotationRange.end, start: start},
						$stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
							{documentation: $elm$core$Maybe$Nothing, generics: typeAliasDeclarationAfterDocumentation.parameters, name: typeAliasDeclarationAfterDocumentation.name, typeAnnotation: typeAliasDeclarationAfterDocumentation.typeAnnotation}))
				};
			}
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'type', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2($stil4m$elm_syntax$ParserFast$oneOf2, $stil4m$elm_syntax$Elm$Parser$Declarations$typeAliasDefinitionWithoutDocumentationAfterTypePrefix, $stil4m$elm_syntax$Elm$Parser$Declarations$customTypeDefinitionWithoutDocumentationAfterTypePrefix));
var $stil4m$elm_syntax$Elm$Parser$Declarations$declaration = A5($stil4m$elm_syntax$ParserFast$oneOf5, $stil4m$elm_syntax$Elm$Parser$Declarations$functionDeclarationWithoutDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$declarationWithDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$typeOrTypeAliasDefinitionWithoutDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$portDeclarationWithoutDocumentation, $stil4m$elm_syntax$Elm$Parser$Declarations$infixDeclaration);
var $stil4m$elm_syntax$ParserFast$columnAndThen = function (callback) {
	return $stil4m$elm_syntax$ParserFast$Parser(
		function (s) {
			var _v0 = callback(s.col);
			var parse = _v0.a;
			return parse(s);
		});
};
var $stil4m$elm_syntax$Elm$Parser$Layout$problemModuleLevelIndentation = $stil4m$elm_syntax$ParserFast$problem('must be on module-level indentation');
var $stil4m$elm_syntax$Elm$Parser$Layout$moduleLevelIndentationFollowedBy = function (nextParser) {
	return $stil4m$elm_syntax$ParserFast$columnAndThen(
		function (column) {
			return (column === 1) ? nextParser : $stil4m$elm_syntax$Elm$Parser$Layout$problemModuleLevelIndentation;
		});
};
var $stil4m$elm_syntax$Elm$Parser$File$fileDeclarations = $stil4m$elm_syntax$ParserWithComments$many(
	$stil4m$elm_syntax$Elm$Parser$Layout$moduleLevelIndentationFollowedBy(
		A3(
			$stil4m$elm_syntax$ParserFast$map2,
			F2(
				function (declarationParsed, commentsAfter) {
					return {
						comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, declarationParsed.comments),
						syntax: declarationParsed.syntax
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Declarations$declaration,
			$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout)));
var $stil4m$elm_syntax$Elm$Syntax$Exposing$All = function (a) {
	return {$: 'All', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit = function (a) {
	return {$: 'Explicit', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose = function (a) {
	return {$: 'FunctionExpose', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expose$functionExpose = $stil4m$elm_syntax$Elm$Parser$Tokens$functionNameMapWithRange(
	F2(
		function (range, name) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose(name))
			};
		}));
var $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose = function (a) {
	return {$: 'InfixExpose', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$parensEnd = A2($stil4m$elm_syntax$ParserFast$symbol, ')', _Utils_Tuple0);
var $stil4m$elm_syntax$Elm$Parser$Expose$infixExpose = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, infixName, _v0) {
			return {
				comments: $stil4m$elm_syntax$Rope$empty,
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose(infixName))
			};
		}),
	A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'(',
		A2(
			$stil4m$elm_syntax$ParserFast$ifFollowedByWhileWithoutLinebreak,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr(')'))) && ((!_Utils_eq(
					c,
					_Utils_chr('\n'))) && (!_Utils_eq(
					c,
					_Utils_chr(' '))));
			},
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr(')'))) && ((!_Utils_eq(
					c,
					_Utils_chr('\n'))) && (!_Utils_eq(
					c,
					_Utils_chr(' '))));
			})),
	$stil4m$elm_syntax$Elm$Parser$Tokens$parensEnd);
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose = function (a) {
	return {$: 'TypeExpose', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose = function (a) {
	return {$: 'TypeOrAliasExpose', a: a};
};
var $stil4m$elm_syntax$ParserFast$map2WithRangeOrSucceed = F4(
	function (func, _v0, _v1, fallback) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var c1 = _v2.a;
					var x = _v2.b;
					return c1 ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2($stil4m$elm_syntax$ParserFast$Good, fallback, s0);
				} else {
					var a = _v2.a;
					var s1 = _v2.b;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var x = _v3.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v3.a;
						var s2 = _v3.b;
						return A2(
							$stil4m$elm_syntax$ParserFast$Good,
							A3(
								func,
								{
									end: {column: s2.col, row: s2.row},
									start: {column: s0.col, row: s0.row}
								},
								a,
								b),
							s2);
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Expose$typeExpose = A4(
	$stil4m$elm_syntax$ParserFast$map3,
	F3(
		function (_v0, commentsBeforeMaybeOpen, maybeOpen) {
			var typeNameRange = _v0.a;
			var typeName = _v0.b;
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, maybeOpen.comments, commentsBeforeMaybeOpen),
				syntax: function () {
					var _v1 = maybeOpen.syntax;
					if (_v1.$ === 'Nothing') {
						return A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							typeNameRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(typeName));
					} else {
						var openRange = _v1.a;
						return A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							{end: openRange.end, start: typeNameRange.start},
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								{name: typeName, open: maybeOpen.syntax}));
					}
				}()
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode,
	$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
	A4(
		$stil4m$elm_syntax$ParserFast$map2WithRangeOrSucceed,
		F3(
			function (range, left, right) {
				return {
					comments: A2($stil4m$elm_syntax$Rope$prependTo, right, left),
					syntax: $elm$core$Maybe$Just(range)
				};
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '(', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		A2(
			$stil4m$elm_syntax$ParserFast$followedBySymbol,
			')',
			A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '..', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)),
		{comments: $stil4m$elm_syntax$Rope$empty, syntax: $elm$core$Maybe$Nothing}));
var $stil4m$elm_syntax$Elm$Parser$Expose$exposable = A3($stil4m$elm_syntax$ParserFast$oneOf3, $stil4m$elm_syntax$Elm$Parser$Expose$functionExpose, $stil4m$elm_syntax$Elm$Parser$Expose$typeExpose, $stil4m$elm_syntax$Elm$Parser$Expose$infixExpose);
var $stil4m$elm_syntax$Elm$Parser$Expose$exposingListInner = A2(
	$stil4m$elm_syntax$ParserFast$oneOf2,
	A4(
		$stil4m$elm_syntax$ParserFast$map3,
		F3(
			function (headElement, commentsAfterHeadElement, tailElements) {
				return {
					comments: A2(
						$stil4m$elm_syntax$Rope$prependTo,
						tailElements.comments,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterHeadElement, headElement.comments)),
					syntax: $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
						A2($elm$core$List$cons, headElement.syntax, tailElements.syntax))
				};
			}),
		$stil4m$elm_syntax$Elm$Parser$Expose$exposable,
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
		$stil4m$elm_syntax$ParserWithComments$many(
			A2(
				$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
				',',
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides($stil4m$elm_syntax$Elm$Parser$Expose$exposable)))),
	A2(
		$stil4m$elm_syntax$ParserFast$mapWithRange,
		F2(
			function (range, commentsAfterDotDot) {
				return {
					comments: commentsAfterDotDot,
					syntax: $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range)
				};
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '..', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout)));
var $stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition = A4(
	$stil4m$elm_syntax$ParserFast$map3WithRange,
	F4(
		function (range, commentsAfterExposing, commentsBefore, exposingListInnerResult) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					exposingListInnerResult.comments,
					A2($stil4m$elm_syntax$Rope$prependTo, commentsBefore, commentsAfterExposing)),
				syntax: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, exposingListInnerResult.syntax)
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, 'exposing', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '(', $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout),
	A2($stil4m$elm_syntax$ParserFast$followedBySymbol, ')', $stil4m$elm_syntax$Elm$Parser$Expose$exposingListInner));
var $stil4m$elm_syntax$ParserFast$map3OrSucceed = F5(
	function (func, _v0, _v1, _v2, fallback) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v3 = parseA(s0);
				if (_v3.$ === 'Bad') {
					var c1 = _v3.a;
					var x = _v3.b;
					return c1 ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2($stil4m$elm_syntax$ParserFast$Good, fallback, s0);
				} else {
					var a = _v3.a;
					var s1 = _v3.b;
					var _v4 = parseB(s1);
					if (_v4.$ === 'Bad') {
						var x = _v4.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v4.a;
						var s2 = _v4.b;
						var _v5 = parseC(s2);
						if (_v5.$ === 'Bad') {
							var x = _v5.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v5.a;
							var s3 = _v5.b;
							return A2(
								$stil4m$elm_syntax$ParserFast$Good,
								A3(func, a, b, c),
								s3);
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$ParserFast$mapOrSucceed = F3(
	function (valueChange, _v0, fallback) {
		var parse = _v0.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var value = _v1.a;
					var s1 = _v1.b;
					return A2(
						$stil4m$elm_syntax$ParserFast$Good,
						valueChange(value),
						s1);
				} else {
					var firstCommitted = _v1.a;
					var x = _v1.b;
					return firstCommitted ? A2($stil4m$elm_syntax$ParserFast$Bad, true, x) : A2($stil4m$elm_syntax$ParserFast$Good, fallback, s0);
				}
			});
	});
function $stil4m$elm_syntax$Elm$Parser$Base$cyclic$moduleNameOrEmpty() {
	return A4(
		$stil4m$elm_syntax$ParserFast$map2OrSucceed,
		F2(
			function (head, tail) {
				return A2($elm$core$List$cons, head, tail);
			}),
		A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '.', $stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
		$stil4m$elm_syntax$ParserFast$lazy(
			function (_v0) {
				return $stil4m$elm_syntax$Elm$Parser$Base$cyclic$moduleNameOrEmpty();
			}),
		_List_Nil);
}
try {
	var $stil4m$elm_syntax$Elm$Parser$Base$moduleNameOrEmpty = $stil4m$elm_syntax$Elm$Parser$Base$cyclic$moduleNameOrEmpty();
	$stil4m$elm_syntax$Elm$Parser$Base$cyclic$moduleNameOrEmpty = function () {
		return $stil4m$elm_syntax$Elm$Parser$Base$moduleNameOrEmpty;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Parser.Base` are causing infinite recursion:\n\n  ┌─────┐\n  │    moduleNameOrEmpty\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $stil4m$elm_syntax$Elm$Parser$Base$moduleName = A3(
	$stil4m$elm_syntax$ParserFast$map2WithRange,
	F3(
		function (range, head, tail) {
			return A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				range,
				A2($elm$core$List$cons, head, tail));
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
	$stil4m$elm_syntax$Elm$Parser$Base$moduleNameOrEmpty);
var $stil4m$elm_syntax$Elm$Parser$Tokens$typeNameMapWithRange = function (rangeAndNameToRes) {
	return A3($stil4m$elm_syntax$ParserFast$ifFollowedByWhileMapWithRangeWithoutLinebreak, rangeAndNameToRes, $stil4m$elm_syntax$Char$Extra$unicodeIsUpperFast, $stil4m$elm_syntax$Char$Extra$unicodeIsAlphaNumOrUnderscoreFast);
};
var $stil4m$elm_syntax$Elm$Parser$Imports$importDefinition = A7(
	$stil4m$elm_syntax$ParserFast$map6WithStartLocation,
	F7(
		function (start, commentsAfterImport, mod, commentsAfterModuleName, maybeModuleAlias, maybeExposingList, commentsAfterEverything) {
			var modRange = mod.a;
			var endRange = function () {
				if (maybeModuleAlias.$ === 'Just') {
					var moduleAliasValue = maybeModuleAlias.a;
					var _v3 = moduleAliasValue.syntax;
					var range = _v3.a;
					return range;
				} else {
					if (maybeExposingList.$ === 'Just') {
						var exposingListValue = maybeExposingList.a;
						var _v5 = exposingListValue.syntax;
						var range = _v5.a;
						return range;
					} else {
						return modRange;
					}
				}
			}();
			return {
				comments: function () {
					var commentsBeforeAlias = A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterModuleName, commentsAfterImport);
					var commentsBeforeExposingList = function () {
						if (maybeModuleAlias.$ === 'Nothing') {
							return commentsBeforeAlias;
						} else {
							var moduleAliasValue = maybeModuleAlias.a;
							return A2($stil4m$elm_syntax$Rope$prependTo, moduleAliasValue.comments, commentsBeforeAlias);
						}
					}();
					return A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterEverything,
						function () {
							if (maybeExposingList.$ === 'Nothing') {
								return commentsBeforeExposingList;
							} else {
								var exposingListValue = maybeExposingList.a;
								return A2($stil4m$elm_syntax$Rope$prependTo, exposingListValue.comments, commentsBeforeExposingList);
							}
						}());
				}(),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					{end: endRange.end, start: start},
					{
						exposingList: A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.syntax;
							},
							maybeExposingList),
						moduleAlias: A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.syntax;
							},
							maybeModuleAlias),
						moduleName: mod
					})
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'import', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Base$moduleName,
	$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
	A5(
		$stil4m$elm_syntax$ParserFast$map3OrSucceed,
		F3(
			function (commentsBefore, moduleAliasNode, commentsAfter) {
				return $elm$core$Maybe$Just(
					{
						comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfter, commentsBefore),
						syntax: moduleAliasNode
					});
			}),
		A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'as', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
		$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameMapWithRange(
			F2(
				function (range, moduleAlias) {
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						_List_fromArray(
							[moduleAlias]));
				})),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$elm$core$Maybe$Nothing),
	A3($stil4m$elm_syntax$ParserFast$mapOrSucceed, $elm$core$Maybe$Just, $stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition, $elm$core$Maybe$Nothing),
	$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout);
var $stil4m$elm_syntax$Elm$Parser$Layout$endsTopIndented = function (parser) {
	return A3(
		$stil4m$elm_syntax$ParserFast$validateEndColumnIndentation,
		F2(
			function (column, indent) {
				return !(column - indent);
			}),
		'must be on top indentation',
		parser);
};
var $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict = $stil4m$elm_syntax$Elm$Parser$Layout$endsTopIndented($stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout);
var $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedByComments = function (nextParser) {
	return A3(
		$stil4m$elm_syntax$ParserFast$map2,
		F2(
			function (commentsBefore, afterComments) {
				return A2($stil4m$elm_syntax$Rope$prependTo, afterComments, commentsBefore);
			}),
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		$stil4m$elm_syntax$Elm$Parser$Layout$onTopIndentationFollowedBy(nextParser));
};
var $stil4m$elm_syntax$Elm$Syntax$Module$EffectModule = function (a) {
	return {$: 'EffectModule', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClause = A5(
	$stil4m$elm_syntax$ParserFast$map4,
	F4(
		function (fnName, commentsAfterFnName, commentsAfterEqual, typeName_) {
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterEqual, commentsAfterFnName),
				syntax: _Utils_Tuple2(fnName, typeName_)
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Tokens$functionName,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	A2($stil4m$elm_syntax$ParserFast$symbolFollowedBy, '=', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeNameNode);
var $stil4m$elm_syntax$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(x);
				} else {
					var $temp$predicate = predicate,
						$temp$list = xs;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $stil4m$elm_syntax$Elm$Parser$Modules$whereBlock = A2(
	$stil4m$elm_syntax$ParserFast$followedBySymbol,
	'}',
	A2(
		$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
		'{',
		A5(
			$stil4m$elm_syntax$ParserFast$map4,
			F4(
				function (commentsBeforeHead, head, commentsAfterHead, tail) {
					var pairs = A2($elm$core$List$cons, head.syntax, tail.syntax);
					return {
						comments: A2(
							$stil4m$elm_syntax$Rope$prependTo,
							tail.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterHead,
								A2($stil4m$elm_syntax$Rope$prependTo, head.comments, commentsBeforeHead))),
						syntax: {
							command: A2(
								$elm$core$Maybe$map,
								$elm$core$Tuple$second,
								A2(
									$stil4m$elm_syntax$List$Extra$find,
									function (_v0) {
										var fnName = _v0.a;
										return fnName === 'command';
									},
									pairs)),
							subscription: A2(
								$elm$core$Maybe$map,
								$elm$core$Tuple$second,
								A2(
									$stil4m$elm_syntax$List$Extra$find,
									function (_v1) {
										var fnName = _v1.a;
										return fnName === 'subscription';
									},
									pairs))
						}
					};
				}),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClause,
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
			$stil4m$elm_syntax$ParserWithComments$many(
				A2(
					$stil4m$elm_syntax$ParserFast$symbolFollowedBy,
					',',
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides($stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClause))))));
var $stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClauses = A3(
	$stil4m$elm_syntax$ParserFast$map2,
	F2(
		function (commentsBefore, whereResult) {
			return {
				comments: A2($stil4m$elm_syntax$Rope$prependTo, whereResult.comments, commentsBefore),
				syntax: whereResult.syntax
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'where', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Modules$whereBlock);
var $stil4m$elm_syntax$ParserFast$map7WithRange = F8(
	function (func, _v0, _v1, _v2, _v3, _v4, _v5, _v6) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		var parseC = _v2.a;
		var parseD = _v3.a;
		var parseE = _v4.a;
		var parseF = _v5.a;
		var parseG = _v6.a;
		return $stil4m$elm_syntax$ParserFast$Parser(
			function (s0) {
				var _v7 = parseA(s0);
				if (_v7.$ === 'Bad') {
					var committed = _v7.a;
					var x = _v7.b;
					return A2($stil4m$elm_syntax$ParserFast$Bad, committed, x);
				} else {
					var a = _v7.a;
					var s1 = _v7.b;
					var _v8 = parseB(s1);
					if (_v8.$ === 'Bad') {
						var x = _v8.b;
						return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
					} else {
						var b = _v8.a;
						var s2 = _v8.b;
						var _v9 = parseC(s2);
						if (_v9.$ === 'Bad') {
							var x = _v9.b;
							return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
						} else {
							var c = _v9.a;
							var s3 = _v9.b;
							var _v10 = parseD(s3);
							if (_v10.$ === 'Bad') {
								var x = _v10.b;
								return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
							} else {
								var d = _v10.a;
								var s4 = _v10.b;
								var _v11 = parseE(s4);
								if (_v11.$ === 'Bad') {
									var x = _v11.b;
									return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
								} else {
									var e = _v11.a;
									var s5 = _v11.b;
									var _v12 = parseF(s5);
									if (_v12.$ === 'Bad') {
										var x = _v12.b;
										return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
									} else {
										var f = _v12.a;
										var s6 = _v12.b;
										var _v13 = parseG(s6);
										if (_v13.$ === 'Bad') {
											var x = _v13.b;
											return A2($stil4m$elm_syntax$ParserFast$Bad, true, x);
										} else {
											var g = _v13.a;
											var s7 = _v13.b;
											return A2(
												$stil4m$elm_syntax$ParserFast$Good,
												A8(
													func,
													{
														end: {column: s7.col, row: s7.row},
														start: {column: s0.col, row: s0.row}
													},
													a,
													b,
													c,
													d,
													e,
													f,
													g),
												s7);
										}
									}
								}
							}
						}
					}
				}
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Modules$effectModuleDefinition = A8(
	$stil4m$elm_syntax$ParserFast$map7WithRange,
	F8(
		function (range, commentsAfterEffect, commentsAfterModule, name, commentsAfterName, whereClauses, commentsAfterWhereClauses, exp) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					exp.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterWhereClauses,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							whereClauses.comments,
							A2(
								$stil4m$elm_syntax$Rope$prependTo,
								commentsAfterName,
								A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterModule, commentsAfterEffect))))),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Module$EffectModule(
						{command: whereClauses.syntax.command, exposingList: exp.syntax, moduleName: name, subscription: whereClauses.syntax.subscription}))
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'effect', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'module', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Base$moduleName,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClauses,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition);
var $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule = function (a) {
	return {$: 'NormalModule', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$normalModuleDefinition = A5(
	$stil4m$elm_syntax$ParserFast$map4WithRange,
	F5(
		function (range, commentsAfterModule, moduleName, commentsAfterModuleName, exposingList) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					exposingList.comments,
					A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterModuleName, commentsAfterModule)),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Module$NormalModule(
						{exposingList: exposingList.syntax, moduleName: moduleName}))
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'module', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Base$moduleName,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition);
var $stil4m$elm_syntax$Elm$Syntax$Module$PortModule = function (a) {
	return {$: 'PortModule', a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$portModuleDefinition = A6(
	$stil4m$elm_syntax$ParserFast$map5WithRange,
	F6(
		function (range, commentsAfterPort, commentsAfterModule, moduleName, commentsAfterModuleName, exposingList) {
			return {
				comments: A2(
					$stil4m$elm_syntax$Rope$prependTo,
					exposingList.comments,
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						commentsAfterModuleName,
						A2($stil4m$elm_syntax$Rope$prependTo, commentsAfterModule, commentsAfterPort))),
				syntax: A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					$stil4m$elm_syntax$Elm$Syntax$Module$PortModule(
						{exposingList: exposingList.syntax, moduleName: moduleName}))
			};
		}),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'port', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	A2($stil4m$elm_syntax$ParserFast$keywordFollowedBy, 'module', $stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout),
	$stil4m$elm_syntax$Elm$Parser$Base$moduleName,
	$stil4m$elm_syntax$Elm$Parser$Layout$maybeLayout,
	$stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition);
var $stil4m$elm_syntax$Elm$Parser$Modules$moduleDefinition = A3($stil4m$elm_syntax$ParserFast$oneOf3, $stil4m$elm_syntax$Elm$Parser$Modules$normalModuleDefinition, $stil4m$elm_syntax$Elm$Parser$Modules$portModuleDefinition, $stil4m$elm_syntax$Elm$Parser$Modules$effectModuleDefinition);
var $stil4m$elm_syntax$Elm$Parser$Comments$moduleDocumentation = $stil4m$elm_syntax$Elm$Parser$Comments$declarationDocumentation;
var $stil4m$elm_syntax$Rope$ropeLikelyFilledToListInto = F2(
	function (initialAcc, ropeLikelyFilled) {
		ropeLikelyFilledToListInto:
		while (true) {
			if (ropeLikelyFilled.$ === 'Leaf') {
				var onlyElement = ropeLikelyFilled.a;
				return A2($elm$core$List$cons, onlyElement, initialAcc);
			} else {
				var left = ropeLikelyFilled.a;
				var right = ropeLikelyFilled.b;
				var $temp$initialAcc = A2($stil4m$elm_syntax$Rope$ropeLikelyFilledToListInto, initialAcc, right),
					$temp$ropeLikelyFilled = left;
				initialAcc = $temp$initialAcc;
				ropeLikelyFilled = $temp$ropeLikelyFilled;
				continue ropeLikelyFilledToListInto;
			}
		}
	});
var $stil4m$elm_syntax$Rope$toList = function (rope) {
	if (rope.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var ropeLikelyFilled = rope.a;
		return A2($stil4m$elm_syntax$Rope$ropeLikelyFilledToListInto, _List_Nil, ropeLikelyFilled);
	}
};
var $stil4m$elm_syntax$Elm$Parser$File$file = A5(
	$stil4m$elm_syntax$ParserFast$map4,
	F4(
		function (moduleDefinition, moduleComments, imports, declarations) {
			return {
				comments: $stil4m$elm_syntax$Rope$toList(
					A2(
						$stil4m$elm_syntax$Rope$prependTo,
						declarations.comments,
						A2(
							$stil4m$elm_syntax$Rope$prependTo,
							imports.comments,
							A2($stil4m$elm_syntax$Rope$prependTo, moduleComments, moduleDefinition.comments)))),
				declarations: declarations.syntax,
				imports: imports.syntax,
				moduleDefinition: moduleDefinition.syntax
			};
		}),
	$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedByWithComments($stil4m$elm_syntax$Elm$Parser$Modules$moduleDefinition),
	$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrictFollowedByComments(
		A4(
			$stil4m$elm_syntax$ParserFast$map2OrSucceed,
			F2(
				function (moduleDocumentation, commentsAfter) {
					return A2(
						$stil4m$elm_syntax$Rope$filledPrependTo,
						commentsAfter,
						$stil4m$elm_syntax$Rope$one(moduleDocumentation));
				}),
			$stil4m$elm_syntax$Elm$Parser$Comments$moduleDocumentation,
			$stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict,
			$stil4m$elm_syntax$Rope$empty)),
	$stil4m$elm_syntax$ParserWithComments$many($stil4m$elm_syntax$Elm$Parser$Imports$importDefinition),
	$stil4m$elm_syntax$Elm$Parser$File$fileDeclarations);
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$ExpectingNumber = {$: 'ExpectingNumber'};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $stil4m$elm_syntax$ParserFast$ropeFilledToList = F2(
	function (problemToConvert, soFar) {
		switch (problemToConvert.$) {
			case 'ExpectingOneOf':
				var firstTry = problemToConvert.a;
				var secondTry = problemToConvert.b;
				var thirdTryUp = problemToConvert.c;
				return A2(
					$stil4m$elm_syntax$ParserFast$ropeFilledToList,
					firstTry,
					A2(
						$stil4m$elm_syntax$ParserFast$ropeFilledToList,
						secondTry,
						A3($elm$core$List$foldr, $stil4m$elm_syntax$ParserFast$ropeFilledToList, soFar, thirdTryUp)));
			case 'ExpectingNumber':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				return A2(
					$elm$core$List$cons,
					{col: col, problem: $elm$parser$Parser$ExpectingNumber, row: row},
					soFar);
			case 'ExpectingSymbol':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				var symbolString = problemToConvert.c;
				return A2(
					$elm$core$List$cons,
					{
						col: col,
						problem: $elm$parser$Parser$ExpectingSymbol(symbolString),
						row: row
					},
					soFar);
			case 'ExpectingAnyChar':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				return A2(
					$elm$core$List$cons,
					{
						col: col,
						problem: $elm$parser$Parser$Problem('expecting any char'),
						row: row
					},
					soFar);
			case 'ExpectingKeyword':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				var keywordString = problemToConvert.c;
				return A2(
					$elm$core$List$cons,
					{
						col: col,
						problem: $elm$parser$Parser$ExpectingKeyword(keywordString),
						row: row
					},
					soFar);
			case 'ExpectingCharSatisfyingPredicate':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				return A2(
					$elm$core$List$cons,
					{col: col, problem: $elm$parser$Parser$UnexpectedChar, row: row},
					soFar);
			case 'ExpectingStringSatisfyingPredicate':
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				return A2(
					$elm$core$List$cons,
					{
						col: col,
						problem: $elm$parser$Parser$Problem('expected string to pass validation'),
						row: row
					},
					soFar);
			default:
				var row = problemToConvert.a;
				var col = problemToConvert.b;
				var customMessage = problemToConvert.c;
				return A2(
					$elm$core$List$cons,
					{
						col: col,
						problem: $elm$parser$Parser$Problem(customMessage),
						row: row
					},
					soFar);
		}
	});
var $stil4m$elm_syntax$ParserFast$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.a;
			var finalState = _v1.b;
			return (!(finalState.offset - $elm$core$String$length(finalState.src))) ? $elm$core$Result$Ok(value) : $elm$core$Result$Err(
				_List_fromArray(
					[
						{col: finalState.col, problem: $elm$parser$Parser$ExpectingEnd, row: finalState.row}
					]));
		} else {
			var deadEnds = _v1.b;
			return $elm$core$Result$Err(
				A2($stil4m$elm_syntax$ParserFast$ropeFilledToList, deadEnds, _List_Nil));
		}
	});
var $stil4m$elm_syntax$Elm$Parser$parseToFile = function (input) {
	return A2($stil4m$elm_syntax$ParserFast$run, $stil4m$elm_syntax$Elm$Parser$File$file, input);
};
var $elm$core$String$startsWith = _String_startsWith;
var $author$project$RangeDict$foldr = F3(
	function (reduce, initialFolded, _v0) {
		var rangeDict = _v0.a;
		return A3(
			$miniBill$elm_fast_dict$FastDict$foldr,
			F2(
				function (range, value) {
					return A2(
						reduce,
						$author$project$RangeDict$rangeFromTupleTuple(range),
						value);
				}),
			initialFolded,
			rangeDict);
	});
var $author$project$RangeDict$toListMap = function (rangeAndValueToElement) {
	return function (rangeDict) {
		return A3(
			$author$project$RangeDict$foldr,
			F3(
				function (range, value, soFar) {
					return A2(
						$elm$core$List$cons,
						A2(rangeAndValueToElement, range, value),
						soFar);
				}),
			_List_Nil,
			rangeDict);
	};
};
var $author$project$ElmSyntaxHighlight$commentSyntaxKindMap = function (_v0) {
	var commentRange = _v0.a;
	var comment = _v0.b;
	if (A2($elm$core$String$startsWith, '--: ', comment)) {
		var rawModuleSourceCode = 'module A exposing (..)\ntype alias A =\n    ' + A2($elm$core$String$dropLeft, 4, comment);
		var _v1 = $stil4m$elm_syntax$Elm$Parser$parseToFile(rawModuleSourceCode);
		if (_v1.$ === 'Ok') {
			var fileWithoutHeaderAndFnDeclarationHeader = _v1.a;
			return A2(
				$author$project$RangeDict$mapFromList,
				$elm$core$Basics$identity,
				A2(
					$author$project$RangeDict$toListMap,
					F2(
						function (range, syntaxKind) {
							return _Utils_Tuple2(
								{
									end: {column: (commentRange.start.column + range.end.column) - 1, row: commentRange.start.row},
									start: {column: (commentRange.start.column + range.start.column) - 1, row: commentRange.start.row}
								},
								syntaxKind);
						}),
					A2(
						$author$project$RangeDict$justValuesMap,
						F2(
							function (range, value) {
								return (range.start.row <= 2) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value);
							}),
						A2(
							$author$project$RangeDict$unionFromListMap,
							$author$project$ElmSyntaxHighlight$declarationSyntaxKindMap(
								{
									commentRanges: _List_Nil,
									rawSourceCode: $elm$core$String$lines(rawModuleSourceCode)
								}),
							fileWithoutHeaderAndFnDeclarationHeader.declarations))));
		} else {
			return $author$project$RangeDict$empty;
		}
	} else {
		return $author$project$RangeDict$empty;
	}
};
var $author$project$ElmSyntaxHighlight$exposingSyntaxKindMap = function (_v0) {
	var exposingRange = _v0.a;
	var exposing_ = _v0.b;
	var exposingKeywordRange = {
		end: {column: exposingRange.start.column + 8, row: exposingRange.start.row},
		start: {column: exposingRange.start.column, row: exposingRange.start.row}
	};
	if (exposing_.$ === 'All') {
		return A2($author$project$RangeDict$singleton, exposingKeywordRange, $author$project$ElmSyntaxHighlight$DeclarationRelated);
	} else {
		var exposedMembers = exposing_.a;
		return A3(
			$author$project$RangeDict$insert,
			exposingKeywordRange,
			$author$project$ElmSyntaxHighlight$DeclarationRelated,
			A2(
				$author$project$RangeDict$unionFromListMap,
				function (_v2) {
					var exposedMemberRange = _v2.a;
					var exposedMember = _v2.b;
					switch (exposedMember.$) {
						case 'InfixExpose':
							return $author$project$RangeDict$empty;
						case 'FunctionExpose':
							return A2($author$project$RangeDict$singleton, exposedMemberRange, $author$project$ElmSyntaxHighlight$Variable);
						case 'TypeOrAliasExpose':
							return A2($author$project$RangeDict$singleton, exposedMemberRange, $author$project$ElmSyntaxHighlight$Type);
						default:
							var exposedType = exposedMember.a;
							var _v4 = exposedType.open;
							if (_v4.$ === 'Nothing') {
								return A2($author$project$RangeDict$singleton, exposedMemberRange, $author$project$ElmSyntaxHighlight$Type);
							} else {
								var openRange = _v4.a;
								return A3(
									$author$project$RangeDict$insert,
									openRange,
									$author$project$ElmSyntaxHighlight$Variant,
									A2(
										$author$project$RangeDict$singleton,
										{end: openRange.start, start: exposedMemberRange.start},
										$author$project$ElmSyntaxHighlight$Type));
							}
					}
				},
				exposedMembers));
	}
};
var $author$project$ElmSyntaxHighlight$importSyntaxKindMap = function (_v0) {
	var importRange = _v0.a;
	var import_ = _v0.b;
	return A2(
		$author$project$RangeDict$union,
		A3(
			$author$project$RangeDict$insert,
			$stil4m$elm_syntax$Elm$Syntax$Node$range(import_.moduleName),
			$author$project$ElmSyntaxHighlight$ModuleNameOrAlias,
			A3(
				$author$project$RangeDict$insert,
				{
					end: {column: importRange.start.column + 6, row: importRange.start.row},
					start: importRange.start
				},
				$author$project$ElmSyntaxHighlight$DeclarationRelated,
				function () {
					var _v1 = import_.exposingList;
					if (_v1.$ === 'Nothing') {
						return $author$project$RangeDict$empty;
					} else {
						var exposingList = _v1.a;
						return $author$project$ElmSyntaxHighlight$exposingSyntaxKindMap(exposingList);
					}
				}())),
		function () {
			var _v2 = import_.moduleAlias;
			if (_v2.$ === 'Nothing') {
				return $author$project$RangeDict$empty;
			} else {
				var _v3 = _v2.a;
				var aliasRange = _v3.a;
				return A3(
					$author$project$RangeDict$insert,
					{
						end: {column: aliasRange.start.column - 1, row: aliasRange.start.row},
						start: {column: aliasRange.start.column - 3, row: aliasRange.start.row}
					},
					$author$project$ElmSyntaxHighlight$DeclarationRelated,
					A2($author$project$RangeDict$singleton, aliasRange, $author$project$ElmSyntaxHighlight$ModuleNameOrAlias));
			}
		}());
};
var $author$project$ElmSyntaxHighlight$moduleHeaderSyntaxKindMap = function (_v0) {
	var moduleHeaderRange = _v0.a;
	var moduleHeader = _v0.b;
	switch (moduleHeader.$) {
		case 'EffectModule':
			return $author$project$RangeDict$empty;
		case 'NormalModule':
			var normalModuleHeader = moduleHeader.a;
			return A3(
				$author$project$RangeDict$insert,
				{
					end: {column: moduleHeaderRange.start.column + 6, row: moduleHeaderRange.start.row},
					start: moduleHeaderRange.start
				},
				$author$project$ElmSyntaxHighlight$DeclarationRelated,
				A3(
					$author$project$RangeDict$insert,
					$stil4m$elm_syntax$Elm$Syntax$Node$range(normalModuleHeader.moduleName),
					$author$project$ElmSyntaxHighlight$ModuleNameOrAlias,
					$author$project$ElmSyntaxHighlight$exposingSyntaxKindMap(normalModuleHeader.exposingList)));
		default:
			var portModuleHeader = moduleHeader.a;
			return A3(
				$author$project$RangeDict$insert,
				{
					end: {column: moduleHeaderRange.start.column + 6, row: moduleHeaderRange.start.row},
					start: moduleHeaderRange.start
				},
				$author$project$ElmSyntaxHighlight$DeclarationRelated,
				A3(
					$author$project$RangeDict$insert,
					$stil4m$elm_syntax$Elm$Syntax$Node$range(portModuleHeader.moduleName),
					$author$project$ElmSyntaxHighlight$ModuleNameOrAlias,
					$author$project$ElmSyntaxHighlight$exposingSyntaxKindMap(portModuleHeader.exposingList)));
	}
};
var $author$project$ElmSyntaxHighlight$rangeAddColumn = function (columnPlus) {
	return function (range) {
		return {
			end: A2($author$project$ElmSyntaxHighlight$locationAddColumn, columnPlus, range.end),
			start: A2($author$project$ElmSyntaxHighlight$locationAddColumn, columnPlus, range.start)
		};
	};
};
var $author$project$ElmSyntaxHighlight$locationAddRow = function (rowPlus) {
	return function (location) {
		return _Utils_update(
			location,
			{row: location.row + rowPlus});
	};
};
var $author$project$ElmSyntaxHighlight$rangeAddRow = function (rowPlus) {
	return function (range) {
		return {
			end: A2($author$project$ElmSyntaxHighlight$locationAddRow, rowPlus, range.end),
			start: A2($author$project$ElmSyntaxHighlight$locationAddRow, rowPlus, range.start)
		};
	};
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$ElmSyntaxHighlight$for = function (rawSourceCodeWithDotDotAndQuestionMarkQuestionMarks) {
	var rawSourceCode = A3(
		$elm$core$String$replace,
		'??Type??',
		'TypeQ___',
		A3(
			$elm$core$String$replace,
			'..Type..',
			'TypeD___',
			A3(
				$elm$core$String$replace,
				'??expression??',
				'expressionQ___',
				A3($elm$core$String$replace, '..expression..', 'expressionD___', rawSourceCodeWithDotDotAndQuestionMarkQuestionMarks))));
	var rawSourceCodeLines = $elm$core$String$lines(rawSourceCode);
	var syntaxKindByRange = A2(
		$elm$core$Maybe$withDefault,
		$author$project$RangeDict$empty,
		A2(
			$elm_community$list_extra$List$Extra$findMap,
			function (f) {
				return f(_Utils_Tuple0);
			},
			_List_fromArray(
				[
					function (_v6) {
					var _v7 = $stil4m$elm_syntax$Elm$Parser$parseToFile(rawSourceCode);
					if (_v7.$ === 'Ok') {
						var file = _v7.a;
						return $elm$core$Maybe$Just(
							A2(
								$author$project$RangeDict$unionFromListMap,
								$elm$core$Basics$identity,
								_List_fromArray(
									[
										$author$project$ElmSyntaxHighlight$moduleHeaderSyntaxKindMap(file.moduleDefinition),
										A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$commentSyntaxKindMap, file.comments),
										A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$importSyntaxKindMap, file.imports),
										A2(
										$author$project$RangeDict$unionFromListMap,
										$author$project$ElmSyntaxHighlight$declarationSyntaxKindMap(
											{
												commentRanges: A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, file.comments),
												rawSourceCode: $elm$core$String$lines(rawSourceCode)
											}),
										file.declarations)
									])));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				},
					function (_v8) {
					var moduleSourceCode = 'module A exposing (..)\n' + rawSourceCode;
					var _v9 = $stil4m$elm_syntax$Elm$Parser$parseToFile(moduleSourceCode);
					if (_v9.$ === 'Ok') {
						var fileWithoutHeader = _v9.a;
						return $elm$core$Maybe$Just(
							A2(
								$author$project$RangeDict$mapFromList,
								$elm$core$Basics$identity,
								A2(
									$author$project$RangeDict$toListMap,
									F2(
										function (range, syntaxKind) {
											return _Utils_Tuple2(
												A2($author$project$ElmSyntaxHighlight$rangeAddRow, -1, range),
												syntaxKind);
										}),
									A2(
										$author$project$RangeDict$justValuesMap,
										F2(
											function (range, value) {
												return (range.start.row <= 1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value);
											}),
										A2(
											$author$project$RangeDict$unionFromListMap,
											$elm$core$Basics$identity,
											_List_fromArray(
												[
													A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$importSyntaxKindMap, fileWithoutHeader.imports),
													A2(
													$author$project$RangeDict$unionFromListMap,
													$author$project$ElmSyntaxHighlight$declarationSyntaxKindMap(
														{
															commentRanges: A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, fileWithoutHeader.comments),
															rawSourceCode: $elm$core$String$lines(moduleSourceCode)
														}),
													fileWithoutHeader.declarations),
													A2($author$project$RangeDict$unionFromListMap, $author$project$ElmSyntaxHighlight$commentSyntaxKindMap, fileWithoutHeader.comments)
												]))))));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				},
					function (_v10) {
					var moduleSourceCode = 'module A exposing (..)\na =\n' + A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$map,
							function (line) {
								return '    ' + line;
							},
							$elm$core$String$lines(rawSourceCode)));
					var _v11 = $stil4m$elm_syntax$Elm$Parser$parseToFile(moduleSourceCode);
					if (_v11.$ === 'Ok') {
						var fileWithoutHeaderAndFnDeclarationHeader = _v11.a;
						return $elm$core$Maybe$Just(
							A2(
								$author$project$RangeDict$mapFromList,
								$elm$core$Basics$identity,
								A2(
									$author$project$RangeDict$toListMap,
									F2(
										function (range, syntaxKind) {
											return _Utils_Tuple2(
												A2(
													$author$project$ElmSyntaxHighlight$rangeAddColumn,
													-4,
													A2($author$project$ElmSyntaxHighlight$rangeAddRow, -2, range)),
												syntaxKind);
										}),
									A2(
										$author$project$RangeDict$justValuesMap,
										F2(
											function (range, value) {
												return (range.start.row <= 2) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value);
											}),
										A2(
											$author$project$RangeDict$unionFromListMap,
											$author$project$ElmSyntaxHighlight$declarationSyntaxKindMap(
												{
													commentRanges: A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, fileWithoutHeaderAndFnDeclarationHeader.comments),
													rawSourceCode: $elm$core$String$lines(moduleSourceCode)
												}),
											fileWithoutHeaderAndFnDeclarationHeader.declarations)))));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
				])));
	var segmented = A3(
		$author$project$RangeDict$foldl,
		F3(
			function (range, syntaxKind, state) {
				return {
					location: range.end,
					segmentsReverse: _Utils_eq(state.location, range.start) ? A2(
						$elm$core$List$cons,
						{
							range: range,
							syntaxKind: $elm$core$Maybe$Just(syntaxKind)
						},
						state.segmentsReverse) : A2(
						$elm$core$List$cons,
						{
							range: range,
							syntaxKind: $elm$core$Maybe$Just(syntaxKind)
						},
						A2(
							$elm$core$List$cons,
							{
								range: {end: range.start, start: state.location},
								syntaxKind: $elm$core$Maybe$Nothing
							},
							state.segmentsReverse))
				};
			}),
		{
			location: {column: 1, row: 1},
			segmentsReverse: _List_Nil
		},
		syntaxKindByRange);
	return A2(
		$elm$core$List$map,
		function (segment) {
			var _v1 = _Utils_Tuple2(
				A2(
					$elm$core$String$join,
					'\n',
					A2($author$project$ElmSyntaxHighlight$stringLinesSlice, segment.range, rawSourceCodeLines)),
				segment.syntaxKind);
			_v1$4:
			while (true) {
				if (_v1.b.$ === 'Just') {
					switch (_v1.b.a.$) {
						case 'Variable':
							switch (_v1.a) {
								case 'expressionD___':
									var _v2 = _v1.b.a;
									return {string: '...', syntaxKind: $elm$core$Maybe$Nothing};
								case 'expressionQ___':
									var _v3 = _v1.b.a;
									return {string: '??', syntaxKind: $elm$core$Maybe$Nothing};
								default:
									break _v1$4;
							}
						case 'Type':
							switch (_v1.a) {
								case 'TypeD___':
									var _v4 = _v1.b.a;
									return {string: '...', syntaxKind: $elm$core$Maybe$Nothing};
								case 'TypeQ___':
									var _v5 = _v1.b.a;
									return {string: '??', syntaxKind: $elm$core$Maybe$Nothing};
								default:
									break _v1$4;
							}
						default:
							break _v1$4;
					}
				} else {
					break _v1$4;
				}
			}
			var nonSpecialCaseString = _v1.a;
			var syntaxKind = _v1.b;
			return {string: nonSpecialCaseString, syntaxKind: syntaxKind};
		},
		$elm$core$List$reverse(
			A2(
				$elm$core$List$cons,
				{
					range: {
						end: {
							column: function () {
								var _v0 = $elm_community$list_extra$List$Extra$last(rawSourceCodeLines);
								if (_v0.$ === 'Just') {
									var last = _v0.a;
									return $elm$core$String$length(last) + 1;
								} else {
									return 0;
								}
							}(),
							row: $elm$core$List$length(rawSourceCodeLines) + 1
						},
						start: segmented.location
					},
					syntaxKind: $elm$core$Maybe$Nothing
				},
				segmented.segmentsReverse)));
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm_community$string_extra$String$Extra$isBlank = function (string) {
	return A2(
		$elm$regex$Regex$contains,
		$elm_community$string_extra$String$Extra$regexFromString('^\\s*$'),
		string);
};
var $author$project$Articles$elmCodeFromRaw = function (raw) {
	var rawStrippedOfBlankStartAndEnd = A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm_community$list_extra$List$Extra$dropWhileRight,
			$elm_community$string_extra$String$Extra$isBlank,
			A2(
				$elm_community$list_extra$List$Extra$dropWhile,
				$elm_community$string_extra$String$Extra$isBlank,
				$elm$core$String$lines(raw))));
	return $author$project$ElmSyntaxHighlight$for(rawStrippedOfBlankStartAndEnd);
};
var $author$project$Articles$elmCode = function (raw) {
	return $author$project$Articles$ElmCode(
		$author$project$Articles$elmCodeFromRaw(raw));
};
var $author$project$Articles$inlineElmCode = function (raw) {
	return $author$project$Articles$InlineElmCode(
		$author$project$Articles$elmCodeFromRaw(raw));
};
var $author$project$Articles$textOnlyParagraph = function (text) {
	return $author$project$Articles$Paragraph(
		_List_fromArray(
			[
				$author$project$Articles$Text(text)
			]));
};
var $author$project$Articles$aFunnyIdeaForRepresentingAFractionSafelyArticle = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$Published(
			$elm$time$Time$millisToPosix(1705449600000)),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$textOnlyParagraph('A definition like ↓ seems intuitive'),
					$author$project$Articles$elmCode('\ntype Rational\n    = N0\n    | Signed { sign : Sign, numerator : Natural1Up, denominator : Natural1Up }\n\ntype Sign\n    = Positive\n    | Negative\n'),
					$author$project$Articles$textOnlyParagraph('Looks pretty safe.\nAnnoyingly,\nthere can be different elm values that represent the same number\nsince numerator and denominator can share factors, like 3/7 and 6/14.\nChecking these for equality would return false, ugh.\nPackages usually resolve this by making the type opaque – surprisingly, we can do better!'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Just before we get to that, let\'s define '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Natural1Up',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text('.')
						])),
					$author$project$Articles$elmCode('\ntype Natural1Up\n    = N1\n    | Successor Natural1Up\n'),
					$author$project$Articles$textOnlyParagraph('↑ This won\'t do. Just adding 1000000 + 1000000 would take 1000000 steps (in elm at least).'),
					$author$project$Articles$elmCode('\ntype Natural1Up\n    = Natural1Up (NonEmptyList Bit)\n\ntype Bit\n    = O\n    | I\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('↑ looks the most intuitive but similar to the '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Rational',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text(' type above,\nif we allow users to prepend '),
							$author$project$Articles$inlineElmCode('O'),
							$author$project$Articles$Text('s, multiple elm values could represent the same number.')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('\nSo... we do have to make the type opaque, just as '),
							$author$project$Articles$Link(
							{description: 'elm-radio taught us', url: 'https://elm-radio.com/episode/intro-to-opaque-types'}),
							$author$project$Articles$Text('?\nNot so fast, the solution doesn\'t actually mean more work:')
						])),
					$author$project$Articles$elmCode('\ntype Natural1Up\n    = Natural1Up { bit1FollowedBy : List Bit }\n'),
					$author$project$Articles$textOnlyParagraph('A little awkward but it mirrors reality.\nOki, enough about natural numbers. Have a look at this cute representation of a rational number:'),
					$author$project$Articles$elmCode('\ntype alias Rational =\n    Dict\n        Prime\n        { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator\n        , exponent : Natural1Up\n        }\n\ntype Prime\n    = PrimeAtIndex Natural0Up\n\ntype PrimeFactorInNumeratorOrDenominator\n    = PrimeFactorInNumerator\n    | PrimeFactorInDenominator\n'),
					$author$project$Articles$textOnlyParagraph('For the relevant primes, we write down whether the numerator or denominator has its corresponding prime as a factor and how often.\nThis works because in a simplified fraction, a prime can\'t be both a factor of the numerator and the denominator.\nLooks all cool and clean!\nBut oh well..., actually making such a dict without opaque types is even beyond what lue can do...'),
					$author$project$Articles$textOnlyParagraph('Turns out we don\'t need a dict for this.'),
					$author$project$Articles$elmCode('\ntype Rational\n    = N0\n    | Signed\n        { sign : Sign\n        , absolute :\n            List (Maybe { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up })\n        }\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Each index in the list corresponds to the same index in the list of primes: '),
							$author$project$Articles$inlineElmCode('[ 2, 3, 5, 7, 11, 13, 17, ..expression.. ]'),
							$author$project$Articles$Text('.\nThen, for each index, we write down whether the numerator or denominator has its corresponding prime as a factor and how often,\nor if neither of them have that factor.\nSo to represent e.g. 8/5:')
						])),
					$author$project$Articles$elmCode('\nSigned\n    { sign = Positive\n    , absolute =\n        [ {-2-} Just { inNumeratorOrDenominator = PrimeFactorInNumerator, exponent = Natural.n3 }\n        , {-3-} Nothing\n        , {-5-} Just { inNumeratorOrDenominator = PrimeFactorInDenominator, exponent = Natural.n1 }\n        ]\n    }\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('You might have noticed that this is still not better than our original solution because users can add '),
							$author$project$Articles$inlineElmCode('Nothing'),
							$author$project$Articles$Text('s to the end of the list without the mathematical value changing.\nWe can use a trick similar to the one we used for natural numbers:\nsplit the list into the last element which can not contain '),
							$author$project$Articles$inlineElmCode('Nothing'),
							$author$project$Articles$Text(' and everything before which can:')
						])),
					$author$project$Articles$elmCode('\ntype Rational\n    = N0\n    | Signed\n        { sign : Sign\n        , absolute :\n            { beforeLast : List (Maybe { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up })\n            , last : { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up }\n            }\n        }\n'),
					$author$project$Articles$textOnlyParagraph('beautiful.'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Extra: Implementing operations on these number types is ongoing in '),
							$author$project$Articles$Link(
							{description: 'elm-number-safe', url: 'https://github.com/lue-bird/elm-number-safe'})
						]))
				])),
		description: 'We can define non-opaque, safe number types where every value is unique.',
		title: 'A funny idea for representing a fraction safely'
	});
var $author$project$Articles$introduction = $author$project$Articles$Sequence(
	_List_fromArray(
		[
			$author$project$Articles$textOnlyParagraph('Yahallo! 🐦'),
			$author$project$Articles$Paragraph(
			_List_fromArray(
				[
					$author$project$Articles$Link(
					{description: 'Subscribe via rss', url: 'https://lue-bird.github.io/blog/feed.xml'}),
					$author$project$Articles$Text(' to get the latest articles. Suggest improvements '),
					$author$project$Articles$Link(
					{description: 'on github', url: 'https://github.com/lue-bird/blog'}),
					$author$project$Articles$Text('.')
				]))
		]));
var $author$project$Articles$InProgress = function (a) {
	return {$: 'InProgress', a: a};
};
var $author$project$Articles$UnorderedList = function (a) {
	return {$: 'UnorderedList', a: a};
};
var $author$project$Articles$recommendationsForFurtherSurfing = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$InProgress('always changing, never \"done\"'),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'articles about an open web by Rohan Kumar', url: 'https://seirdy.one/posts/'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'articles about static analysis by Jeroen Engels', url: 'https://jfmengels.net/'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'podcast about personal programmer stories by Lindsay Wardell', url: 'https://podcasters.spotify.com/pod/show/humansideofdev/episodes/8---All-About-Management-with-Blake-Thomas-e2j7s2h'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'articles mostly about functional programming by Michael Hendricks', url: 'https://m.ndrix.org/a/'})
								]))
						])),
					$author$project$Articles$textOnlyParagraph('all support rss')
				])),
		description: 'A bunch of places you might want to visit from here',
		title: 'recommendations for further surfing'
	});
var $author$project$Articles$packageLink = function (name) {
	return $author$project$Articles$Link(
		{
			description: name,
			url: $elm$core$String$concat(
				_List_fromArray(
					['https://dark.elm.dmy.fr/packages/', name, '/latest/']))
		});
};
var $author$project$Articles$theElmIcebergArticle = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$InProgress('still collecting bits and pieces and code formatting'),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$textOnlyParagraph('Crust'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$textOnlyParagraph('record setter can\'t directly update qualified reference'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('The same qualification can point to different modules → '),
									$author$project$Articles$inlineElmCode('import List.Extra as List')
								])),
							$author$project$Articles$textOnlyParagraph('some literals have no corresponding patterns → negative Int, Float'),
							$author$project$Articles$textOnlyParagraph('main can be of type Html'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('== can crash → '),
									$author$project$Articles$Link(
									{description: 'function, Json.Decode.Value, Regex', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#=='})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('Html.Attributes are sometimes not equivalent to the html attributes with the same name → '),
									$author$project$Articles$Link(
									{description: 'Html.Attributes.value is a js property', url: 'https://github.com/elm/html/blob/1.0.0/src/Html/Attributes.elm#L439-L441'}),
									$author$project$Articles$Text(', ...')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('elm can run outside of the browser → '),
									$author$project$Articles$Link(
									{description: 'Platform.worker', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#worker'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('elm on the backend → '),
									$author$project$Articles$Link(
									{description: 'elm studio', url: 'https://www.elm.studio/'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'lamdera', url: 'https://www.lamdera.com/'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'pine', url: 'https://github.com/pine-vm/pine'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'elm-pages', url: 'https://elm-pages.com/'}),
									$author$project$Articles$Text(', ...')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('json encoder and decoder can be created in one: '),
									$author$project$Articles$packageLink('miniBill/elm-codec'),
									$author$project$Articles$Text(', '),
									$author$project$Articles$packageLink('MartinSStewart/elm-serialize'),
									$author$project$Articles$Text(', ...')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('Dict and Set types with arbitrary key types exist → '),
									$author$project$Articles$packageLink('pzp1997/assoc-list'),
									$author$project$Articles$Text(', '),
									$author$project$Articles$packageLink('owanturist/elm-avl-dict'),
									$author$project$Articles$Text(', '),
									$author$project$Articles$packageLink('miniBill/elm-generic-dict'),
									$author$project$Articles$Text(', '),
									$author$project$Articles$packageLink('turboMaCk/any-dict'),
									$author$project$Articles$Text(', ...')
								])),
							$author$project$Articles$textOnlyParagraph('import aliases can\'t contain dots'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('elm-lang.org contains a TODO → '),
									$author$project$Articles$Link(
									{description: 'section on url parsing', url: 'https://guide.elm-lang.org/webapps/url_parsing'}),
									$author$project$Articles$Text(' under Synthesis')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('there is a type for a value that\'s impossible to ever construct and it\'s very useful → '),
									$author$project$Articles$Link(
									{description: 'Never', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#Never'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'never', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#never'})
								]))
						])),
					$author$project$Articles$textOnlyParagraph('Mantle'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$inlineElmCode('andMap = map2 (|>)'),
									$author$project$Articles$Text(' → '),
									$author$project$Articles$Link(
									{description: 'article \"Running Out of Maps\" by Joël Quenneville', url: 'https://thoughtbot.com/blog/running-out-of-maps'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$inlineElmCode('modBy 0'),
									$author$project$Articles$Text(' and other operations can throw runtime errors')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('Int is unsound → '),
									$author$project$Articles$inlineElmCode('2^ -1 == 0.5'),
									$author$project$Articles$Text(' : Int')
								])),
							$author$project$Articles$textOnlyParagraph('main can be of type Svg'),
							$author$project$Articles$textOnlyParagraph('type parameters that aren\'t used still make the base type different to the compiler → phantom types'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('the implicit record type alias constructor functions are not created when there is indirection or the record is extensible → '),
									$author$project$Articles$Link(
									{description: 'summary on situations where constructor is not created', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-no-record-type-alias-constructor-function/latest#only-works-in-very-limited-scenarios'})
								])),
							$author$project$Articles$textOnlyParagraph('effect module where'),
							$author$project$Articles$textOnlyParagraph('It\'s basically impossible to use both Parser and Parser.Advanced in the same module → both expose the same operators and these can\'t be qualified'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'Bitwise.shiftRightZfBy', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Bitwise#shiftRightZfBy'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('thread blocked indefinitely in an MVar operation and Map.!: given key is not an element in the map → let, (mutual) recursion, lambda, exports, missing annotations → '),
									$author$project$Articles$Link(
									{description: 'summary issue on blocking', url: 'https://github.com/gren-lang/compiler/issues/105'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'summary issue on missing key', url: 'https://github.com/gren-lang/compiler/issues/104'}),
									$author$project$Articles$Text(' ...')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('elm was picked partially because it sounds like element → '),
									$author$project$Articles$Link(
									{description: 'google groups chat with evan', url: 'https://groups.google.com/g/elm-discuss/c/S4zbHJWPXvU/m/JyavEHDDQucJ'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$inlineElmCode('import List exposing (List)'),
									$author$project$Articles$Text(' is invalid → '),
									$author$project$Articles$Link(
									{description: 'elm/core issue', url: 'https://github.com/elm/core/issues/1037'})
								]))
						])),
					$author$project$Articles$textOnlyParagraph('Outer core'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('fold/TCO recursion into generators, decoders or anything represented as a function is stack unsafe → '),
									$author$project$Articles$Link(
									{description: 'article \"An Elm debugging story\" by Joël Quenneville', url: 'https://thoughtbot.com/blog/elm-debugging-story'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('Micro performance improvements → adding '),
									$author$project$Articles$inlineElmCode('variable ++ \"\"'),
									$author$project$Articles$Text(' to a appended string variables, converting '),
									$author$project$Articles$inlineElmCode('aComparable /= bComparable'),
									$author$project$Articles$Text(' to '),
									$author$project$Articles$inlineElmCode('aComparable < bComparable || aComparable > bComparable'),
									$author$project$Articles$Text(', avoiding currying and composition')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('obscure Platform primitives → '),
									$author$project$Articles$Link(
									{description: 'Platform.sendToSelf', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#sendToSelf'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'Platform.sendToApp', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#sendToApp'}),
									$author$project$Articles$Text(', ...')
								])),
							$author$project$Articles$textOnlyParagraph('main is kind of a reserved word → you can\'t have a top-level expose with that name if the type is not either Html, Svg or Program'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('multiline string pattern is valid elm → '),
									$author$project$Articles$Link(
									{description: 'issue in elm-syntax', url: 'https://github.com/stil4m/elm-syntax/issues/134'})
								])),
							$author$project$Articles$textOnlyParagraph('the fish operators'),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('a phantom type can store an arbitrary, extensible amount of knowledge about the contained value → extensible phantom record builder, see e.g. '),
									$author$project$Articles$Link(
									{description: 'video The phantom builder pattern by Jeroen Engels', url: 'https://www.youtube.com/watch?v=Trp3tmpMb-o'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$inlineElmCode('(&&)'),
									$author$project$Articles$Text(' binds more than '),
									$author$project$Articles$inlineElmCode('(||)'),
									$author$project$Articles$Text(' → '),
									$author$project$Articles$inlineElmCode('False && False || True'),
									$author$project$Articles$Text(' is '),
									$author$project$Articles$inlineElmCode('True'),
									$author$project$Articles$Text(' while '),
									$author$project$Articles$inlineElmCode('False && (False || True)'),
									$author$project$Articles$Text(' is '),
									$author$project$Articles$inlineElmCode('False')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('you don\'t have to nest andThens → '),
									$author$project$Articles$packageLink('mtamc/and-collect')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('crash through packages → '),
									$author$project$Articles$packageLink('jjant/unwrap')
								]))
						])),
					$author$project$Articles$textOnlyParagraph('Inner core'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Sequence(
							_List_fromArray(
								[
									$author$project$Articles$Paragraph(
									_List_fromArray(
										[
											$author$project$Articles$Text('you can the called function itself can provide itself to its argument, allowing single calls with variable arguments and result types like '),
											$author$project$Articles$inlineElmCode('(|>) 3 plus 4 plus 5 identity'),
											$author$project$Articles$Text(' being equal to '),
											$author$project$Articles$inlineElmCode('12'),
											$author$project$Articles$Text(' → '),
											$author$project$Articles$Link(
											{description: 'nice, in-depth article \"Fold\" by by Matthew Fluet', url: 'http://mlton.org/Fold'}),
											$author$project$Articles$Text(', and if you have trouble understanding the initial code, try my plus example, work up your understanding from ')
										])),
									$author$project$Articles$elmCode('\nplus : Int -> Int -> (Int -> next) -> next\nplus toAdd =\n    \\soFar -> (|>) (soFar + toAdd)\n\nsummed =\n    (|>) 0 (plus 1) (plus 2) (plus 3) identity\n\n\nplus2 : Int -> Int -> (Int -> next) -> next\nplus2 =\n    \\soFar -> \\toAdd -> (|>) (soFar + toAdd)\n\nsummed2 =\n    (|>) 0 plus 1 plus 2 plus 3 identity\n'),
									$author$project$Articles$Paragraph(
									_List_fromArray(
										[
											$author$project$Articles$Text('The fact that we can also build up a function that we can generically run in the end is then not quite as surprising and more an extra')
										]))
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('typesafe n-vectors → '),
									$author$project$Articles$Link(
									{description: 'static-array', url: 'https://dark.elm.dmy.fr/packages/Orasund/elm-static-array/latest/'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'typesafe-array', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-typesafe-array/latest/'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Link(
									{description: 'List.minimum', url: 'https://dark.elm.dmy.fr/packages/elm/core/latest/List#minimum'}),
									$author$project$Articles$Text(' & friends are different depending on list order → having tuples with NaN first lets elm keep the first one, see e.g. '),
									$author$project$Articles$Link(
									{description: 'elm-review-simplify comment', url: 'https://github.com/jfmengels/elm-review-simplify/issues/306#issuecomment-2063461710'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('elm once had higher-kinded types and typeclasses on it\'s rough roadmap → '),
									$author$project$Articles$Link(
									{description: 'issue comment about higher-kinded types', url: 'https://github.com/elm/compiler/issues/396#issuecomment-128190898'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'youtube video mentioning typeclass plans around 5:40', url: 'https://www.youtube.com/watch?v=vF03oQu7rkw'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('endo operation type arguments can be hidden through recursion → '),
									$author$project$Articles$Link(
									{description: 'Demystifying Jeremy\'s interfaces', url: 'https://discourse.elm-lang.org/t/demystifying-jeremys-interfaces/8834'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('you can monkey patch elm\'s Http requests to perform tasks → '),
									$author$project$Articles$Link(
									{description: 'lobanov/elm-taskport', url: 'https://dark.elm.dmy.fr/packages/lobanov/elm-taskport/latest/'})
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('you can edit a js object prototype to overwrite existing features')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('you can set js variables with the same name as generated by elm to e.g. create an elm equivalent of ts any → '),
									$author$project$Articles$packageLink('linsyking/elm-anytype')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('you can directly call js functions from elm and some packages use it → '),
									$author$project$Articles$Link(
									{description: 'randomness ellie', url: 'https://ellie-app.com/hpXzJxh4HRda1'}),
									$author$project$Articles$Text(', '),
									$author$project$Articles$Link(
									{description: 'WebAudio.Context.currentTime', url: 'https://dark.elm.dmy.fr/packages/hayleigh-dot-dev/elm-web-audio/latest/WebAudio-Context#currentTime'})
								])),
							$author$project$Articles$textOnlyParagraph('semantic versioning is broken in small details → e.g. number → comparable for result types not being considered major')
						])),
					$author$project$Articles$textOnlyParagraph('No light reaches this place'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('edkelly303/elm-any-type-forms, edkelly303/elm-multitool → '),
									$author$project$Articles$Link(
									{description: 'Control.tag0', url: 'https://dark.elm.dmy.fr/packages/edkelly303/elm-any-type-forms/latest/Control#tag0'}),
									$author$project$Articles$Text(' and friends')
								]))
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Hey, there\'s likely a lot more out there that I forgor or don\'t know about. Please '),
							$author$project$Articles$Link(
							{description: 'suggest them', url: 'https://github.com/lue-bird/blog/issues/new'}),
							$author$project$Articles$Text(' so they can be added here')
						]))
				])),
		description: 'what deep secrets lie below us',
		title: 'The elm iceberg'
	});
var $author$project$Articles$Italic = function (a) {
	return {$: 'Italic', a: a};
};
var $author$project$Articles$theSimplestAppDefinitionArticle = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$Published(
			$elm$time$Time$millisToPosix(1712426002312)),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$textOnlyParagraph('🔦 Imagine a flashlight app with a switch that turns on the light when it\'s off and vice versa.'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$textOnlyParagraph('📡💭 The app can detect the exact moment the switch is toggled. Since the switch should to do the opposite on the next press, it can remember whether the light was switched on or off'),
							$author$project$Articles$textOnlyParagraph('✎ The app can turn the physical light on or off')
						])),
					$author$project$Articles$textOnlyParagraph('So in general, an app definition has to allow'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$textOnlyParagraph('📡💭 detecting and remembering what happens on the outside'),
							$author$project$Articles$textOnlyParagraph('✎ triggering actions on the outside')
						])),
					$author$project$Articles$textOnlyParagraph('In the simplest app definition I could come up with, we end up with'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('💭 A value to represent what the app remembers or better: what it knows. Let\'s call it '),
									$author$project$Articles$Italic('state')
								])),
							$author$project$Articles$textOnlyParagraph('💭 A state to represent that the app has just been started and so doesn\'t remember anything'),
							$author$project$Articles$textOnlyParagraph('✎ A way to trigger actions on the outside based on what the app knows'),
							$author$project$Articles$textOnlyParagraph('📡 A way to keep an eye on stuff on the outside depending on what the app knows, coupled with how something detected on the outside changes the state')
						])),
					$author$project$Articles$textOnlyParagraph('so in code this would look something like this:'),
					$author$project$Articles$elmCode('\ntype InterfaceWithTheOutside whatComesBack\n    = DetectorOnTheOutside (DetectorOnTheOutside whatComesBack)\n    | ActionOnTheOutside ActionOnTheOutside\n\ntype JustStartedOr runningState\n    = JustStartedSoItKnowsNothing\n    | RunningState runningState\n\nanyApp : JustStartedOr runningState -> List (InterfaceWithTheOutside runningState)\nanyApp = ..expression..\n'),
					$author$project$Articles$textOnlyParagraph('The whole app signature defined in one line as a single function, almost insulting!'),
					$author$project$Articles$textOnlyParagraph('How these \"interface\" types look like depends on the platform, nothing you have to do as a user. For our flashlight, it\'s something like'),
					$author$project$Articles$elmCode('\ntype DetectorOnTheOutside whatComesBack\n    = SwitchToggled whatComesBack\n\ntype ActionOnTheOutside\n    = PhysicalLightOn\n    | PhysicalLightOff\n'),
					$author$project$Articles$textOnlyParagraph('A flashlight app which on startup sets the light to on could look something like'),
					$author$project$Articles$elmCode('\n\ntype LightActivation\n    = LightOn\n    | LightOff\n\nflashlightApp : JustStartedOr LightActivation -> List (InterfaceWithTheOutside LightActivation)\nflashlightApp =\n    \\justStartedOrRunning ->\n        let\n            lightActivation : LightActivation\n            lightActivation =\n                case justStartedOrRunning of\n                    JustStartedSoItKnowsNothing ->\n                        LightOn\n                    \n                    RunningState lightActivation ->\n                        lightActivation\n        in\n        case lightActivation of\n            LightOn ->\n                [ ActionOnTheOutside PhysicalLightOn\n                , DetectorOnTheOutside (SwitchToggled LightOff)\n                ]\n\n            LightOff ->\n                [ ActionOnTheOutside PhysicalLightOff\n                , DetectorOnTheOutside (SwitchToggled LightOn)\n                ]\n'),
					$author$project$Articles$textOnlyParagraph('It\'s almost eerie how we can say \"That\'s it!\"'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('In practice, the state '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'JustStartedSoItKnowsNothing',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Variant)
								}
								])),
							$author$project$Articles$Text(' is always equivalent to some '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'RunningState',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Variant)
								}
								])),
							$author$project$Articles$Text('. Like, when you have a home screen, you want to be able to return to it. So we can make this simplification')
						])),
					$author$project$Articles$elmCode('\ntype InterfaceWithTheOutside whatComesBack\n    = DetectorOnTheOutside ..Type..\n    | ActionOnTheOutside ..Type..\n\nanyApp :\n    { initialState : state\n    , interface : state -> List (InterfaceWithTheOutside state)\n    }\nanyApp = ..expression..\n'),
					$author$project$Articles$textOnlyParagraph('With that, our flashlight app is now'),
					$author$project$Articles$elmCode('\n\ntype LightActivation\n    = LightOn\n    | LightOff\n\nflashlightApp : LightActivation -> List (InterfaceWithTheOutside LightActivation)\nflashlightApp =\n    { initialState = LightOn\n    , interface =\n        \\lightActivation ->\n            case lightActivation of\n                LightOn ->\n                    [ ActionOnTheOutside PhysicalLightOn\n                    , DetectorOnTheOutside (SwitchToggled LightOff)\n                    ]\n\n                LightOff ->\n                    [ ActionOnTheOutside PhysicalLightOff\n                    , DetectorOnTheOutside (SwitchToggled LightOn)\n                    ]\n    }\n'),
					$author$project$Articles$textOnlyParagraph('Pretty cool, ey?'),
					$author$project$Articles$textOnlyParagraph('And we almost by accident managed to avoid hard problems that almost every framework has:'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$textOnlyParagraph('Seeing stuff on the outside that should be impossible based on what we remember, like seeing a click on a button on a different page'),
							$author$project$Articles$textOnlyParagraph('Triggering an outside action based on a specific user action. For example, having to edit relevant parts of the ui, the url, the stored files, the currently playing audios etc based on user behaviour')
						])),
					$author$project$Articles$textOnlyParagraph('Try going through frameworks you already know and find cases where these issues pop up.'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Good news at the end: For the web, this architecture has already been implemented: '),
							$author$project$Articles$Link(
							{description: 'elm-state-interface', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-state-interface/latest/'})
						]))
				])),
		description: 'The simplest architecture to define apps',
		title: 'The simplest app definition'
	});
var $author$project$Articles$typedValue8Article = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$Published(
			$elm$time$Time$millisToPosix(1698065536000)),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Let\'s build a generic set type which doesn\'t store functions but still safely allows custom, user-provided order functions similar to '),
							$author$project$Articles$Link(
							{description: 'KeysSet', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/'}),
							$author$project$Articles$Text('. Showing the power of being able to wrap a generic typed, enabled by '),
							$author$project$Articles$Link(
							{description: 'Typed', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/'}),
							$author$project$Articles$Text(' 8 (we\'ll get to what this means exactly, don\'t worry)')
						])),
					$author$project$Articles$elmCode('\ntype alias GenericSet element uniqueOrder = ..Type..\ntype alias Ordering subject unique = ..Type..\n\ninsert :\n    Ordering element unique\n    -> element\n    -> (GenericSet element unique -> GenericSet element unique)\ninsert elementOrdering elementToInsert = ..expression..\n\nremove :\n    Ordering element unique\n    -> element\n    -> (GenericSet element unique -> GenericSet element unique)\nremove elementOrdering elementToRemove = ..expression..\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('To guarantee that the order function inside a given '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Ordering',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text(' is the same for every operation,')
						])),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$Text('each unique '),
									$author$project$Articles$InlineElmCode(
									_List_fromArray(
										[
											{
											string: 'Ordering',
											syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
										}
										])),
									$author$project$Articles$Text(' needs to have a unique last type argument.')
								])),
							$author$project$Articles$Paragraph(
							_List_fromArray(
								[
									$author$project$Articles$InlineElmCode(
									_List_fromArray(
										[
											{
											string: 'GenericSet',
											syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
										}
										])),
									$author$project$Articles$Text(' needs to enforce that all operations need an '),
									$author$project$Articles$InlineElmCode(
									_List_fromArray(
										[
											{
											string: 'Ordering',
											syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
										}
										])),
									$author$project$Articles$Text(' with the same '),
									$author$project$Articles$inlineElmCode('unique'),
									$author$project$Articles$Text(' type argument.')
								]))
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Why not just use a normal opaque type which wraps the order function to order the elements instead of this '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Ordering',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text(' type? Not a bad idea! But try to get the actual order function out of any opaque type... Any attempts to create a public accessor don\'t quite work either, for example')
						])),
					$author$project$Articles$elmCode('\ntype alias Ordering subject opaque =\n    { opaque : opaque, toFunction : opaque -> (( subject, subject ) -> Order) }\n\nfakeOrdering : Ordering ..Type.. RealOpaque\nfakeOrdering =\n    { opaque = realOrdering.opaque, toFunction = \\_ -> fakeFunction }\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Unlike opaque types, '),
							$author$project$Articles$Link(
							{description: 'Typed', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/'}),
							$author$project$Articles$Text(' gives you control over who can access the inner order function:')
						])),
					$author$project$Articles$elmCode('\ntype alias Ordering subject tag =\n    Typed\n        Checked -- only constructible using the tag ↓\n        tag\n        Public -- everyone can access\n        (( subject, subject ) -> Order)\n'),
					$author$project$Articles$elmCode('\nmodule Int.Order exposing (increasing, Increasing)\n\nincreasing : Ordering Int Increasing\nincreasing =\n    Typed.tag Increasing compare\n\ntype Increasing\n    = Increasing -- variant not exposed\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('First attempt to fake it:')
						])),
					$author$project$Articles$elmCode('\nfakeIntOrder : Ordering Int Int.Order.Increasing\nfakeIntOrder =\n    -- type error: is Tagged but should be Checked\n    Int.Order.increasing |> Typed.map (\\_ -> \\_ -> EQ)\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Second attempt to fake it:')
						])),
					$author$project$Articles$elmCode('\nmodule Int.FakeOrder exposing (increasing, Increasing)\n\nincreasing : Ordering Int Increasing\nincreasing =\n    Typed.tag Increasing (\\_ -> EQ)\n\ntype Increasing\n    = Increasing\n'),
					$author$project$Articles$elmCode('\nGenericSet.empty\n    |> GenericSet.insert Int.Order.increasing 3\n    |> GenericSet.remove Int.FakeOrder.increasing 3 -- compile-time error\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('All that was already possible way before 8.0.0.')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Now... How do we define '),
							$author$project$Articles$inlineElmCode('type alias GenericSet element uniqueOrder = ..Type..'),
							$author$project$Articles$Text(' or an '),
							$author$project$Articles$inlineElmCode('Order.reverse'),
							$author$project$Articles$Text(' which sorts in opposite order?')
						])),
					$author$project$Articles$elmCode('\ntype Reverse tag\n    = Reverse tag\n\nreverse : Ordering subject tag -> Ordering subject (Reverse tag)\nreverse =\n    Typed.mapTo (Reverse ??expression??) (\\order -> \\( a, b ) -> order ( b, a ))\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Intuitively, you might want to reach for unsafe phantom types 🤮')
						])),
					$author$project$Articles$elmCode('\ntype Reverse reverseOrderTag = Reverse\n\nreverse : Ordering subject tag -> Ordering subject (Reverse tag)\nreverse =\n    Typed.mapTo Reverse (\\order -> \\a b -> order b a)\n\nreverseOops : Ordering subject orderTag -> Ordering subject (Reverse tag)\nreverseOops =\n    Typed.mapTo Reverse (\\order -> \\a b -> order b a)\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$inlineElmCode('orderTag'),
							$author$project$Articles$Text(' and '),
							$author$project$Articles$inlineElmCode('tag'),
							$author$project$Articles$Text(' are different type variables, so the tag of the reversed ordering can accidentally be anything. It\'s a free variable :(')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Here\'s a similarly buggy example:')
						])),
					$author$project$Articles$elmCode('\ntype GenericSet element orderTag\n    = GenericSet (Internals element)\n\nfromListOops :\n    Ordering element tag\n    -> (List element -> GenericSet element orderTag)\nfromListOops elementOrdering =\n    \\list ->\n        GenericSet (Internals.fromList (elementOrdering |> Typed.untag) list)\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text(' What\'s new in 8.0.0 is how we can preserve tags in the type while wrapping a '),
							$author$project$Articles$Link(
							{description: 'Typed', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/'}),
							$author$project$Articles$Text(':')
						])),
					$author$project$Articles$elmCode('\ntype Reverse\n    = Reverse\n\nreverse : Ordering subject tag -> Ordering subject ( Reverse, tag )\nreverse =\n    Typed.mapToWrap Reverse (\\order -> \\( a, b ) -> order ( b, a ))\n'),
					$author$project$Articles$textOnlyParagraph('Notice how we don\'t have access to the tag of the argument\nbut can still safely show it in the signature.'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('We can use the same technique to finally fill in the '),
							$author$project$Articles$inlineElmCode('type alias GenericSet element uniqueOrder = ..Type..'),
							$author$project$Articles$Text(':')
						])),
					$author$project$Articles$elmCode('\ntype alias GenericSet element orderTag =\n    Typed Checked ( GenericSetTag, orderTag ) Internal (Internals element)\n\ntype GenericSetTag = GenericSetTag -- variant not exposed\n\nfromList :\n    Ordering element tag\n    -> (List element -> GenericSet element tag)\nfromList elementOrdering =\n    \\list ->\n        elementOrdering\n            |> Typed.mapToWrap GenericSetTag\n                (\\orderFunction -> Internals.fromList orderFunction list)\n'),
					$author$project$Articles$textOnlyParagraph('Frankly, using tuples for multiple tag arguments in type signatures can get a bit unreadable. A quick solution:'),
					$author$project$Articles$elmCode('\ntype alias Reverse reverseOrderTag =\n    ( ReverseTag, reverseOrderTag )\n\ntype ReverseTag\n    = Reverse\n\nreverse : Ordering subject tag -> Ordering subject (Reverse tag)\nreverse =\n    Typed.mapToWrap Reverse (\\order -> \\a b -> order b a)\n'),
					$author$project$Articles$textOnlyParagraph('Still as safe and readers will be happy, too!'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('I\'ll leave you with one last example, showing how '),
							$author$project$Articles$Link(
							{description: 'KeysSet', url: 'https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/'}),
							$author$project$Articles$Text(', which is more like a dict than a set, safely stores its sorting:')
						])),
					$author$project$Articles$elmCode('\ntype SortingTag\n    = Sorting\n\ntype alias Sorting element tag key =\n    Typed\n        Checked\n        ( SortingTag, tag )\n        Public\n        { toKey : element -> key\n        , keyOrder : element -> element -> Order\n        }\n\nsortingKey :\n    Typed Checked keyTag Public (element -> key)\n    -> Ordering key keyOrderTag\n    -> Sorting element ( keyTag, keyOrderTag ) key\nsortingKey toKeyTyped keyOrdering =\n    toKeyTyped\n        |> Typed.wrapAnd keyOrdering\n        --: Typed ( keyTag, keyOrderTag ) Tagged Public {- ... -}\n        |> Typed.mapToWrap Sorting\n            (\\( toKey, keyOrder ) ->\n                { toKey = toKey\n                , keyOrder = keyOrder\n                }\n            )\n')
				])),
		description: 'Preserving the knowledge of what was wrapped when wrapping again.\ntyped-value 8.0.0 makes this safe.',
		title: 'Wrapping wrappers safely: typed-value 8.0.0'
	});
var $author$project$Articles$whatToDoWithElmReviewErrorsArticle = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$InProgress('Barely anything here yet. Come back in a month!'),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$textOnlyParagraph('Ever wanted to add helpers but introducing them at once would start a chain reaction of refactors?\nEspecially when the new helper will make existing helpers irrelevant, it can feel simplest to just get the big refactor done with.'),
					$author$project$Articles$elmCode('\nisNotFunction : Expression -> Bool\nisNotFunction expression =\n    case expression of\n        Expression.Variable ( "Basics", "not" ) ->\n            True\n        \n        _ ->\n            False\n\nisNegateFunction : Expression -> Bool\nisNegateFunction expression =\n    case expression of\n        Expression.Variable ( "Basics", "negate" ) ->\n            True\n        \n        _ ->\n            False\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('and you want to add')
						])),
					$author$project$Articles$elmCode('\nisSpecificVariable specificFullyQualifiedVariableName =\n    case expression of\n        Expression.Variable fullyQualifiedVariableName ->\n            fullyQualifiedVariableName == specificFullyQualifiedVariableName\n        \n        _ ->\n            False\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('If you feel like this (just like past and sometimes current lue), here\'s an alternative to try:')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Do a small, local, immediate step. '),
							$author$project$Articles$Italic('Commit'),
							$author$project$Articles$Text('. If you\'re happy, slowly follow '),
							$author$project$Articles$Link(
							{description: 'elm-review', url: 'https://dark.elm.dmy.fr/packages/jfmengels/elm-review/latest/'}),
							$author$project$Articles$Text(' and compiler errors and your project\'s refactoring todo list items one at a time.')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Or just leave them for some time in the future.')
						])),
					$author$project$Articles$elmCode('\nlistUnzipCheck =\n    case lastArgument partitionCall of\n        Just listArgument ->\n            let error = TODO\n            in\n            case listArgument of\n                Expression.Tuple2Literal tuple2 ->\n                    Just error\n                \n                nonTuple2Literal ->\n                    nonTuple2Literal\n                        |> Elm.Syntax.Expression.Extra.parseSpecificFnCall "Tuple.pair"\n                        |> Maybe.map (\\_ -> error)\n        \n        Just TODO -> TODO\n\nlistPartitionCheck partitionCall =\n    case fullyAppliedLastArg partitionCall.arguments of\n        TODO -> TODO\n'),
					$author$project$Articles$elmCode('\nmodule Elm.Syntax.Expression.Extra exposing (getTuple2)\ngetTuple2 = ...\n'),
					$author$project$Articles$textOnlyParagraph('Oh no! The editor gives me squigglies, the CI is red, what to do?'),
					$author$project$Articles$textOnlyParagraph('Most of these do not need to be fixed immediately!'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('They are like leaving '),
							$author$project$Articles$inlineElmCode('Debug.todo'),
							$author$project$Articles$Text(' or failing test somewhere.\nYou know, the stuff that allows you to keep less things in your mind that "you still need to do".')
						])),
					$author$project$Articles$textOnlyParagraph('In that way, they are like an automated todo list for you and your whole team.'),
					$author$project$Articles$textOnlyParagraph('If you think there won\'t be an automated error for something on the way, make it a new item in a todo list.\nAggregating errors isn\'t scary. They have your back.'),
					$author$project$Articles$textOnlyParagraph('TODO: Show step-by-step refactor of adding helper, adding @deprecated, fixing the issues one by one'),
					$author$project$Articles$textOnlyParagraph('If possible I\'d like if elm-review doesn\'t slow this exploration phase...\n→ Also, elm-review rules don\'t really "slow down development" because they just hint at and remind you of what\'s left to do eventually without forcing you to do anything. (e.g. you added this helper? Do your thing but I always have your back so you don\'t forget that you wanted to use this helper somewhere) TODO integrate')
				])),
		description: 'Something to try: Not fixing all elm-review errors immediately.',
		title: 'What to do with elm-review errors?'
	});
var $author$project$Articles$yourAstAllowsListsWithDifferentElementTypesWhyArticle = $author$project$Articles$Section(
	{
		completion: $author$project$Articles$Published(
			$elm$time$Time$millisToPosix(1697846400000)),
		content: $author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('There was a time when '),
							$author$project$Articles$Link(
							{description: 'elm-codegen', url: 'https://github.com/mdgriffith/elm-codegen'}),
							$author$project$Articles$Text(' and friends like '),
							$author$project$Articles$Link(
							{description: 'review-todo-it-for-me', url: 'https://github.com/MartinSStewart/elm-review-todo-it-for-me'}),
							$author$project$Articles$Text(' were not around. Code generation felt under-explored and in need of a framework to generate helpers like record update functions, codecs, html from strings and whatever based on existing elm code.')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('A good chunk of work later there were significant parts in place of an ambitious '),
							$author$project$Articles$Link(
							{description: 'lue-bird/generate-elm', url: 'https://github.com/lue-bird/generate-elm'}),
							$author$project$Articles$Text('.')
						])),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('To generate elm code, the decision was made to not directly use '),
							$author$project$Articles$Link(
							{description: 'elm-syntax', url: 'https://dark.elm.dmy.fr/packages/stil4m/elm-syntax/latest/'}),
							$author$project$Articles$Text(' for '),
							$author$project$Articles$Italic('countless'),
							$author$project$Articles$Text(' reasons like not allowing users to generate '),
							$author$project$Articles$inlineElmCode('3.2 // \'a\''),
							$author$project$Articles$Text(' or avoiding empty nodes.')
						])),
					$author$project$Articles$textOnlyParagraph('Creating a perfectly type-safe AST + builder was actually working out surprisingly well and was both challenging and fun... until problems like the one in this article\'s title came up.'),
					$author$project$Articles$textOnlyParagraph('And... We will solve this now ◝(ᵔᵕᵔ)◜, illustrated on a simple language with strings, ints, bools, lists and ==.\nStarting with a classic but unsafe AST:'),
					$author$project$Articles$elmCode('\ntype Expression\n    = String String\n    | Int Int\n    | Bool Bool\n    | List (List Expression)\n    | Equals { left : Expression, right : Expression }\n'),
					$author$project$Articles$textOnlyParagraph('↑ This is "probably fine" ™ practically but...'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Sequence(
							_List_fromArray(
								[
									$author$project$Articles$textOnlyParagraph('it allows users to generate incorrect expressions'),
									$author$project$Articles$elmCode('\nList [ String "My name is ", Int 5 ]\n'),
									$author$project$Articles$textOnlyParagraph('or'),
									$author$project$Articles$elmCode('\nEquals { left = String "High", right = Int 5 }\n')
								])),
							$author$project$Articles$textOnlyParagraph('it has impossible variants you are forced to case on')
						])),
					$author$project$Articles$textOnlyParagraph('How hard can it be to make this small language completely type-safe?'),
					$author$project$Articles$textOnlyParagraph('Naively, we could represent each kind of list and equals by it\'s own variant'),
					$author$project$Articles$elmCode('\ntype Expression\n    = String String\n    | Int Int\n    | Bool Bool\n    | List ListExpression\n    | Equals EqualsExpression\n\n\ntype alias EqualsOf specificExpression =\n    { left : specificExpression, right : specificExpression }\n\ntype EqualsExpression\n    = EqualsOfString (EqualsOf String)\n    | EqualsOfInt (EqualsOf Int)\n    | EqualsOfBool (EqualsOf BoolExpression)\n    | EqualsOfList (EqualsOf ??Type??)\n\ntype ListExpression\n    = ListOfString (List String)\n    | ListOfInt (List Int)\n    | ListOfBool (List BoolExpression)\n    | ListOfList (List ??Type??)\n\ntype BoolExpression\n    = BoolLiteral Bool\n    | EqualsExpression EqualsExpression\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('The '),
							$author$project$Articles$Italic('??'),
							$author$project$Articles$Text(' just keep on expanding, let\'s take for example the case '),
							$author$project$Articles$inlineElmCode('EqualsOfList')
						])),
					$author$project$Articles$elmCode('\ntype EqualsExpression\n    = {- ... | -} EqualsOfList EqualsExpressionOfList\n\ntype EqualsExpressionOfList\n    = EqualsOfListOfString (EqualsOf (List String))\n    | EqualsOfListOfInt (EqualsOf (List Int))\n    | EqualsOfListOfBool (EqualsOf (List BoolExpression))\n    | EqualsOfListOfList (EqualsOf (List ??Type??))\n'),
					$author$project$Articles$textOnlyParagraph('We just run into the same problem recursively.'),
					$author$project$Articles$textOnlyParagraph('We can apply some smart-smart to solve this!'),
					$author$project$Articles$elmCode('\ntype alias EqualsOf specificExpression =\n    { left : specificExpression, right : specificExpression }\n\ntype EqualsExpression string int bool\n    = EqualsOfString (EqualsOf string)\n    | EqualsOfInt (EqualsOf int)\n    | EqualsOfBool (EqualsOf bool)\n    | EqualsOfList (EqualsExpression (List string) (List int) (List bool))\n\n\ntype ListExpression string int bool\n    = ListOfString (List string)\n    | ListOfInt (List int)\n    | ListOfBool (List bool)\n    | ListOfList (ListExpression (List string) (List int) (List bool))\n\ntype BoolKnown\n    = BoolLiteral Bool\n    | Equals (EqualsExpression String Int BoolKnown)\n\ntype Expression\n    = String String\n    | Int Int\n    | Bool Bool\n    | List (ListExpression String Int BoolKnown)\n    | Equals (EqualsExpression String Int BoolKnown)\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Quite cool how this works. For example, to represent a list of strings, we go down '),
							$author$project$Articles$inlineElmCode('ListOfString String'),
							$author$project$Articles$Text(' with the String type directly passed from above. And if the string list is the element type of another list, we go through '),
							$author$project$Articles$inlineElmCode('ListOfList (ListOfString (List String))'),
							$author$project$Articles$Text(' where the \"wrapping into a list type\" is passed down recursively.')
						])),
					$author$project$Articles$elmCode('\nList\n    (ListOfList\n        (ListOfBool\n            [ [ BoolLiteral True ]\n            , [ Equals\n                    (EqualsOfList\n                        (EqualsOfString\n                            { left = [ "Hello", "world" ]\n                            , right = [ "Hello", "expression" ]\n                            }\n                        )\n                    )\n              , BoolLiteral False\n              ]\n            ]\n        )\n    )\n'),
					$author$project$Articles$textOnlyParagraph('All these recursive types follow the same shape shown below. Can we abstract this somehow in elm?'),
					$author$project$Articles$elmCode('\n-- with Outer being (Type -> Type)\ntype ByExpressionType string int bool\n    = String (Outer string)\n    | Int (Outer int)\n    | Bool (Outer bool)\n    | List (ByExpressionType (List string) (List int) (List bool))\n\ntype alias Expression =\n    -- with Outer a = a\n    ByExpressionType String Int BoolKnown\n\ntype alias ListExpression =\n    -- with Outer a = List a\n    ByExpressionType String Int BoolKnown\n\ntype alias EqualsExpression =\n    -- with Outer a = EqualsOf a\n    ByExpressionType String Int BoolKnown\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('The '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Outer',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text(' is what makes this tricky since '),
							$author$project$Articles$InlineElmCode(
							_List_fromArray(
								[
									{
									string: 'Outer',
									syntaxKind: $elm$core$Maybe$Just($author$project$ElmSyntaxHighlight$Type)
								}
								])),
							$author$project$Articles$Text(' can only be at that level: We want to represent \"list of a == list of a\", not \"list of (a == a)\".')
						])),
					$author$project$Articles$textOnlyParagraph('Having one type for all expression kinds in a single place is still a nice idea, tho:'),
					$author$project$Articles$elmCode('\ntype ByExpressionType string int bool list\n    = String string\n    | Int int\n    | Bool bool\n    | List list\n\ntype alias Expression =\n    ByExpressionType String Int BoolKnown (ListExpression String Int BoolKnown)\n\ntype ListExpression string int bool =\n    ByExpressionType\n        (List string)\n        (List int)\n        (List bool)\n        (ListExpression (List string) (List int) (List bool))\n\ntype alias EqualsOf specificExpression =\n    { left : specificExpression, right : specificExpression }\n\ntype alias EqualsExpression string int bool =\n    ByExpressionType\n        (EqualsOf string)\n        (EqualsOf int)\n        (EqualsOf bool)\n        (EqualsExpression string int bool)\n\ntype BoolKnown\n    = BoolLiteral Bool\n    | Equals (EqualsExpression String Int BoolKnown)\n'),
					$author$project$Articles$textOnlyParagraph('which actually looks pretty nice?'),
					$author$project$Articles$elmCode('\nList\n    (List\n        (Bool\n            [ [ BoolLiteral True ]\n            , [ Equals\n                    (List\n                        (String\n                            { left = [ "Hello", "world" ]\n                            , right = [ "Hello", "expression" ]\n                            }\n                        )\n                    )\n              , BoolLiteral False\n              ]\n            ]\n        )\n    )\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Well, it doesn\'t compile because \"recursive type aliases\" but the fix is as simple as converting each alias to a '),
							$author$project$Articles$inlineElmCode('type')
						])),
					$author$project$Articles$elmCode('\ntype ListExpression string int bool\n    = ListExpression\n        (ByExpressionType\n            (List string)\n            (List int)\n            (List bool)\n            (ListExpression (List string) (List int) (List bool))\n        )\n\ntype EqualsExpression string int bool\n    = EqualsExpression\n        (ByExpressionType\n            (EqualsOf string)\n            (EqualsOf int)\n            (EqualsOf bool)\n            (EqualsExpression (List string) (List int) (List bool))\n        )\n'),
					$author$project$Articles$textOnlyParagraph('the result looks less nice but acceptable I guess'),
					$author$project$Articles$elmCode('\nList\n    (ListExpression\n        (List\n            (ListExpression\n                (Bool\n                    [ [ BoolLiteral True ]\n                    , [ Equals\n                            (EqualsExpression\n                                (List\n                                    (EqualsExpression\n                                        (String\n                                            { left = [ "Hello", "world" ]\n                                            , right = [ "Hello", "expression" ]\n                                            }\n                                        )\n                                    )\n                                )\n                            )\n                      , BoolLiteral False\n                      ]\n                    ]\n                )\n            )\n        )\n    )\n'),
					$author$project$Articles$textOnlyParagraph('Let\'s add triples to that language'),
					$author$project$Articles$elmCode('\ntype ByExpressionType string int bool triple list\n    = String string\n    | Int int\n    | Bool bool\n    | Triple triple\n    | List list\n\ntype Expression\n    = Expression\n        (ByExpressionType\n            String\n            Int\n            BoolKnown\n            (TripleOf Expression Expression Expression)\n            (ListExpression String Int BoolKnown)\n        )\n  \ntype alias TripleOf first second third =\n    { first : first, second : second, third : third }\n\ntype ListExpression string int bool\n    = ListExpression\n        (ByExpressionType\n            (List string)\n            (List int)\n            (List bool)\n            (List ??Type??)\n            (ListExpression (List string) (List int) (List bool))\n        )\n\ntype alias EqualsOf specificExpression =\n    { left : specificExpression, right : specificExpression }\n\ntype EqualsExpression string int bool\n    = EqualsExpression\n        (ByExpressionType\n            (EqualsOf string)\n            (EqualsOf int)\n            (EqualsOf bool)\n            (EqualsOf ??Type??)\n            (EqualsExpression string int bool)\n        )\n\ntype BoolKnown\n    = BoolLiteral Bool\n    | Equals (EqualsExpression String Int BoolKnown)\n'),
					$author$project$Articles$textOnlyParagraph('The pieces don\'t seem to fit.'),
					$author$project$Articles$textOnlyParagraph('Do we need to start even simpler? Maybe with a simpler AST of only int, tuple and equals and a naive approach... Well, what would be a naive approach?'),
					$author$project$Articles$textOnlyParagraph('Tuples and especially triples made past lue lose hope of being able to safely represent them like this in an ast.\nSo much so in fact that past lue was slowly losing interest and abandoned this project after a while. (╥﹏╥)'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Much, much later... in fact only when writing this did '),
							$author$project$Articles$Italic('two'),
							$author$project$Articles$Text('-ish solutions reveal themselves that would have saved a good chunk of past lue\'s sanity.\nI know you\'re smarter than me, so if you have a free afternoon or whatever, maybe use this as a brain exercise?\nOr just look at the solutions below.')
						])),
					$author$project$Articles$textOnlyParagraph('First the -ish solution:'),
					$author$project$Articles$elmCode('\ntype Expression\n    = Int Int\n    | Tuple (TupleOf Expression Expression)\n    | Equals EqualsExpression\n\ntype alias TupleOf first second =\n    { first : first, second : second }\n\ntype alias EqualsOf specificExpression =\n    { left : specificExpression, right : specificExpression }\n\ntype EqualsExpressionByType int equals\n    = EqualsOfInt (EqualsOf int)\n    | EqualsOfEqualsExpression (EqualsOf equals)\n    | EqualsOfTupleExtendedByFirstInt (EqualsExpressionByType (TupleOf Int int) (TupleOf Int equals))\n    | EqualsOfTupleExtendedByFirstEqualsExpression (EqualsExpressionByType (TupleOf EqualsExpression int) (TupleOf EqualsExpression equals))\n    | EqualsOfTupleExtendedBySecondInt (EqualsExpressionByType (TupleOf int Int) (TupleOf equals Int))\n    | EqualsOfTupleExtendedBySecondEqualsExpression (EqualsExpressionByType (TupleOf int EqualsExpression) (TupleOf equals EqualsExpression))\n\ntype EqualsExpression\n    = EqualsExpression (EqualsExpressionByType Int EqualsExpression)\n'),
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Expressions written down look passable. Here for '),
							$author$project$Articles$inlineElmCode('( 0, 0 == 0 ) == ( 0, 0 == 0 )')
						])),
					$author$project$Articles$elmCode('\nEquals\n    (EqualsExpression\n        (EqualsOfTupleExtendedByFirstInt\n            (EqualsOfEqualsExpression\n                { left =\n                    { first = 0\n                    , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })\n                    }\n                , right =\n                    { first = 0\n                    , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })\n                    }\n                }\n            )\n        )\n    )\n'),
					$author$project$Articles$textOnlyParagraph('The one unsatisfying parts'),
					$author$project$Articles$UnorderedList(
					_List_fromArray(
						[
							$author$project$Articles$Sequence(
							_List_fromArray(
								[
									$author$project$Articles$Paragraph(
									_List_fromArray(
										[
											$author$project$Articles$inlineElmCode('ExtendFirstX (OfY xy)'),
											$author$project$Articles$Text(' and '),
											$author$project$Articles$inlineElmCode('ExtendedSecondY (OfX xy)'),
											$author$project$Articles$Text(' are equivalent if the '),
											$author$project$Articles$inlineElmCode('xy'),
											$author$project$Articles$Text(' isn\'t nested further (and so only flat tuples are compared)')
										])),
									$author$project$Articles$UnorderedList(
									_List_fromArray(
										[
											$author$project$Articles$textOnlyParagraph('This, I\'m sure can be ironed out on the type level [Citation needed]')
										]))
								])),
							$author$project$Articles$Sequence(
							_List_fromArray(
								[
									$author$project$Articles$textOnlyParagraph('I cannot, even now, think of a safe equivalent for triples'),
									$author$project$Articles$UnorderedList(
									_List_fromArray(
										[
											$author$project$Articles$textOnlyParagraph('If it exists, it probably also grows rapidly in variant count'),
											$author$project$Articles$textOnlyParagraph('If you think you found something, even if cursed, I beg you to drop me a line @lue on slack')
										]))
								]))
						])),
					$author$project$Articles$textOnlyParagraph('Strangely, with the second solution everything becomes eerily simple:'),
					$author$project$Articles$elmCode('\ntype EqualsExpression\n    = EqualsOfInt (EqualsOf Int)\n    | EqualsOfExpression (EqualsOf EqualsExpression)\n    | EqualsOfTuple { firsts : EqualsExpression, seconds : EqualsExpression }\n    | EqualsOfTriple { firsts : EqualsExpression, seconds : EqualsExpression, thirds : EqualsExpression }\n    -- even records!\n    | EqualsOfRecord (Dict String EqualsExpression)\n'),
					$author$project$Articles$textOnlyParagraph('Wtf?')
				])),
		description: 'Can you represent a list expression where all elements have the same type? Yes.\nAnd what about operations like (==) on infinitely nested triples?',
		title: 'Your AST allows lists with different element types. Why?'
	});
var $author$project$Articles$all = $author$project$Articles$Sequence(
	_List_fromArray(
		[
			$author$project$Articles$introduction,
			$author$project$Articles$recommendationsForFurtherSurfing,
			$author$project$Articles$yourAstAllowsListsWithDifferentElementTypesWhyArticle,
			$author$project$Articles$aFunnyIdeaForRepresentingAFractionSafelyArticle,
			$author$project$Articles$typedValue8Article,
			$author$project$Articles$theSimplestAppDefinitionArticle,
			$author$project$Articles$theElmIcebergArticle,
			$author$project$Articles$whatToDoWithElmReviewErrorsArticle,
			$author$project$Articles$Sequence(
			_List_fromArray(
				[
					$author$project$Articles$Paragraph(
					_List_fromArray(
						[
							$author$project$Articles$Text('Oki, that\'s it for the articles.')
						]))
				])),
			$author$project$Articles$textOnlyParagraph('⸜(｡˃ ᵕ ˂ )⸝♡')
		]));
var $dillonkearns$elm_rss$Rss$DateTime = function (a) {
	return {$: 'DateTime', a: a};
};
var $zwilias$elm_html_string$Html$Types$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $zwilias$elm_html_string$Html$Types$Regular = function (a) {
	return {$: 'Regular', a: a};
};
var $zwilias$elm_html_string$Html$String$node = F3(
	function (tag, attributes, children) {
		return A3(
			$zwilias$elm_html_string$Html$Types$Node,
			tag,
			attributes,
			$zwilias$elm_html_string$Html$Types$Regular(children));
	});
var $zwilias$elm_html_string$Html$String$a = $zwilias$elm_html_string$Html$String$node('a');
var $zwilias$elm_html_string$Html$String$code = $zwilias$elm_html_string$Html$String$node('code');
var $zwilias$elm_html_string$Html$Types$StringProperty = F2(
	function (a, b) {
		return {$: 'StringProperty', a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$stringProperty = $zwilias$elm_html_string$Html$Types$StringProperty;
var $zwilias$elm_html_string$Html$String$Attributes$href = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'href', val);
};
var $zwilias$elm_html_string$Html$String$i = $zwilias$elm_html_string$Html$String$node('i');
var $zwilias$elm_html_string$Html$Types$TextNode = function (a) {
	return {$: 'TextNode', a: a};
};
var $zwilias$elm_html_string$Html$String$text = $zwilias$elm_html_string$Html$Types$TextNode;
var $author$project$Build$articlesParagraphPartToStringifiable = function (paragraphPart) {
	switch (paragraphPart.$) {
		case 'Text':
			var string = paragraphPart.a;
			return $zwilias$elm_html_string$Html$String$text(string);
		case 'Italic':
			var string = paragraphPart.a;
			return A2(
				$zwilias$elm_html_string$Html$String$i,
				_List_Nil,
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$text(string)
					]));
		case 'InlineElmCode':
			var syntaxHighlightable = paragraphPart.a;
			return A2(
				$zwilias$elm_html_string$Html$String$code,
				_List_Nil,
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$text(
						$elm$core$String$concat(
							A2(
								$elm$core$List$map,
								function ($) {
									return $.string;
								},
								syntaxHighlightable)))
					]));
		default:
			var link = paragraphPart.a;
			return A2(
				$zwilias$elm_html_string$Html$String$a,
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$Attributes$href(link.url)
					]),
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$text(link.description)
					]));
	}
};
var $zwilias$elm_html_string$Html$String$div = $zwilias$elm_html_string$Html$String$node('div');
var $zwilias$elm_html_string$Html$String$h3 = $zwilias$elm_html_string$Html$String$node('h3');
var $zwilias$elm_html_string$Html$String$li = $zwilias$elm_html_string$Html$String$node('li');
var $zwilias$elm_html_string$Html$String$p = $zwilias$elm_html_string$Html$String$node('p');
var $zwilias$elm_html_string$Html$String$pre = $zwilias$elm_html_string$Html$String$node('pre');
var $zwilias$elm_html_string$Html$String$section = $zwilias$elm_html_string$Html$String$node('section');
var $zwilias$elm_html_string$Html$String$ul = $zwilias$elm_html_string$Html$String$node('ul');
var $author$project$Build$articlesContentToHtmlStringifiable = function (articleContent) {
	switch (articleContent.$) {
		case 'Section':
			var section = articleContent.a;
			return A2(
				$zwilias$elm_html_string$Html$String$section,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$zwilias$elm_html_string$Html$String$h3,
						_List_Nil,
						_List_fromArray(
							[
								$zwilias$elm_html_string$Html$String$text(section.title)
							])),
						$author$project$Build$articlesContentToHtmlStringifiable(section.content)
					]));
		case 'Paragraph':
			var parts = articleContent.a;
			return A2(
				$zwilias$elm_html_string$Html$String$p,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Build$articlesParagraphPartToStringifiable, parts));
		case 'ElmCode':
			var syntaxHighlightable = articleContent.a;
			return A2(
				$zwilias$elm_html_string$Html$String$pre,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$zwilias$elm_html_string$Html$String$code,
						_List_Nil,
						_List_fromArray(
							[
								$zwilias$elm_html_string$Html$String$text(
								$elm$core$String$concat(
									A2(
										$elm$core$List$map,
										function ($) {
											return $.string;
										},
										syntaxHighlightable)))
							]))
					]));
		case 'Sequence':
			var contentList = articleContent.a;
			return A2(
				$zwilias$elm_html_string$Html$String$div,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Build$articlesContentToHtmlStringifiable, contentList));
		default:
			var unorderedList = articleContent.a;
			return A2(
				$zwilias$elm_html_string$Html$String$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (item) {
						return A2(
							$zwilias$elm_html_string$Html$String$li,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Build$articlesContentToHtmlStringifiable(item)
								]));
					},
					unorderedList));
	}
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$Articles$sectionTitleToUrl = function (title) {
	return $elm$url$Url$percentEncode(title);
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $zwilias$elm_html_string$Html$Types$indent = F3(
	function (perLevel, level, x) {
		return _Utils_ap(
			A2($elm$core$String$repeat, perLevel * level, ' '),
			x);
	});
var $zwilias$elm_html_string$Html$Types$join = F2(
	function (between, list) {
		if (!list.b) {
			return '';
		} else {
			if (!list.b.b) {
				var x = list.a;
				return x;
			} else {
				var x = list.a;
				var xs = list.b;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (y, acc) {
							return _Utils_ap(
								y,
								_Utils_ap(between, acc));
						}),
					x,
					xs);
			}
		}
	});
var $zwilias$elm_html_string$Html$Types$closingTag = function (tagName) {
	return '</' + (tagName + '>');
};
var $zwilias$elm_html_string$Html$Types$escapeHtmlText = A2(
	$elm$core$Basics$composeR,
	A2($elm$core$String$replace, '&', '&amp;'),
	A2(
		$elm$core$Basics$composeR,
		A2($elm$core$String$replace, '<', '&lt;'),
		A2($elm$core$String$replace, '>', '&gt;')));
var $elm$core$String$foldl = _String_foldl;
var $zwilias$elm_html_string$Html$Types$escape = A2(
	$elm$core$String$foldl,
	F2(
		function (_char, acc) {
			return _Utils_eq(
				_char,
				_Utils_chr('\"')) ? (acc + '\\\"') : _Utils_ap(
				acc,
				$elm$core$String$fromChar(_char));
		}),
	'');
var $elm$core$Char$toLower = _Char_toLower;
var $zwilias$elm_html_string$Html$Types$hyphenate = A2(
	$elm$core$String$foldl,
	F2(
		function (_char, acc) {
			return $elm$core$Char$isUpper(_char) ? (acc + ('-' + $elm$core$String$fromChar(
				$elm$core$Char$toLower(_char)))) : _Utils_ap(
				acc,
				$elm$core$String$fromChar(_char));
		}),
	'');
var $zwilias$elm_html_string$Html$Types$buildProp = F2(
	function (key, value) {
		return $zwilias$elm_html_string$Html$Types$hyphenate(key) + ('=\"' + ($zwilias$elm_html_string$Html$Types$escape(value) + '\"'));
	});
var $NoRedInk$elm_string_conversions$String$Conversions$fromValue = function (value) {
	return A2($elm$json$Json$Encode$encode, 0, value);
};
var $zwilias$elm_html_string$Html$Types$propName = function (prop) {
	switch (prop) {
		case 'className':
			return 'class';
		case 'defaultValue':
			return 'value';
		case 'htmlFor':
			return 'for';
		default:
			return prop;
	}
};
var $zwilias$elm_html_string$Html$Types$addAttribute = F2(
	function (attribute, acc) {
		var classes = acc.a;
		var styles = acc.b;
		var attrs = acc.c;
		switch (attribute.$) {
			case 'Attribute':
				var key = attribute.a;
				var value = attribute.b;
				return _Utils_Tuple3(
					classes,
					styles,
					A2(
						$elm$core$List$cons,
						A2($zwilias$elm_html_string$Html$Types$buildProp, key, value),
						attrs));
			case 'StringProperty':
				if (attribute.a === 'className') {
					var value = attribute.b;
					return _Utils_Tuple3(
						A2($elm$core$List$cons, value, classes),
						styles,
						attrs);
				} else {
					var string = attribute.a;
					var value = attribute.b;
					return _Utils_Tuple3(
						classes,
						styles,
						A2(
							$elm$core$List$cons,
							A2(
								$zwilias$elm_html_string$Html$Types$buildProp,
								$zwilias$elm_html_string$Html$Types$propName(string),
								value),
							attrs));
				}
			case 'BoolProperty':
				var string = attribute.a;
				var enabled = attribute.b;
				return enabled ? _Utils_Tuple3(
					classes,
					styles,
					A2(
						$elm$core$List$cons,
						$zwilias$elm_html_string$Html$Types$hyphenate(
							$zwilias$elm_html_string$Html$Types$propName(string)),
						attrs)) : acc;
			case 'ValueProperty':
				var string = attribute.a;
				var value = attribute.b;
				return _Utils_Tuple3(
					classes,
					styles,
					A2(
						$elm$core$List$cons,
						A2(
							$zwilias$elm_html_string$Html$Types$buildProp,
							$zwilias$elm_html_string$Html$Types$propName(string),
							$NoRedInk$elm_string_conversions$String$Conversions$fromValue(value)),
						attrs));
			case 'Style':
				var key = attribute.a;
				var value = attribute.b;
				return _Utils_Tuple3(
					classes,
					A2(
						$elm$core$List$cons,
						$zwilias$elm_html_string$Html$Types$escape(key) + (': ' + $zwilias$elm_html_string$Html$Types$escape(value)),
						styles),
					attrs);
			default:
				return acc;
		}
	});
var $zwilias$elm_html_string$Html$Types$withClasses = F2(
	function (classes, attrs) {
		if (!classes.b) {
			return attrs;
		} else {
			return A2(
				$elm$core$List$cons,
				A2(
					$zwilias$elm_html_string$Html$Types$buildProp,
					'class',
					A2($zwilias$elm_html_string$Html$Types$join, ' ', classes)),
				attrs);
		}
	});
var $zwilias$elm_html_string$Html$Types$withStyles = F2(
	function (styles, attrs) {
		if (!styles.b) {
			return attrs;
		} else {
			return A2(
				$elm$core$List$cons,
				A2(
					$zwilias$elm_html_string$Html$Types$buildProp,
					'style',
					A2($zwilias$elm_html_string$Html$Types$join, '; ', styles)),
				attrs);
		}
	});
var $zwilias$elm_html_string$Html$Types$attributesToString = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$zwilias$elm_html_string$Html$Types$addAttribute,
		_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
		attrs);
	var classes = _v0.a;
	var styles = _v0.b;
	var regular = _v0.c;
	return A2(
		$zwilias$elm_html_string$Html$Types$withStyles,
		styles,
		A2($zwilias$elm_html_string$Html$Types$withClasses, classes, regular));
};
var $zwilias$elm_html_string$Html$Types$tag = F2(
	function (tagName, attributes) {
		return '<' + (A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$cons,
				tagName,
				$zwilias$elm_html_string$Html$Types$attributesToString(attributes))) + '>');
	});
var $zwilias$elm_html_string$Html$Types$toStringHelper = F3(
	function (indenter, tags, acc) {
		toStringHelper:
		while (true) {
			if (!tags.b) {
				var _v1 = acc.stack;
				if (!_v1.b) {
					return acc;
				} else {
					var _v2 = _v1.a;
					var tagName = _v2.a;
					var cont = _v2.b;
					var rest = _v1.b;
					var $temp$indenter = indenter,
						$temp$tags = cont,
						$temp$acc = _Utils_update(
						acc,
						{
							depth: acc.depth - 1,
							result: A2(
								$elm$core$List$cons,
								A2(
									indenter,
									acc.depth - 1,
									$zwilias$elm_html_string$Html$Types$closingTag(tagName)),
								acc.result),
							stack: rest
						});
					indenter = $temp$indenter;
					tags = $temp$tags;
					acc = $temp$acc;
					continue toStringHelper;
				}
			} else {
				if (tags.a.$ === 'Node') {
					var _v3 = tags.a;
					var tagName = _v3.a;
					var attributes = _v3.b;
					var children = _v3.c;
					var rest = tags.b;
					switch (children.$) {
						case 'NoChildren':
							var $temp$indenter = indenter,
								$temp$tags = rest,
								$temp$acc = _Utils_update(
								acc,
								{
									result: A2(
										$elm$core$List$cons,
										A2(
											indenter,
											acc.depth,
											A2($zwilias$elm_html_string$Html$Types$tag, tagName, attributes)),
										acc.result)
								});
							indenter = $temp$indenter;
							tags = $temp$tags;
							acc = $temp$acc;
							continue toStringHelper;
						case 'Regular':
							var childNodes = children.a;
							var $temp$indenter = indenter,
								$temp$tags = childNodes,
								$temp$acc = _Utils_update(
								acc,
								{
									depth: acc.depth + 1,
									result: A2(
										$elm$core$List$cons,
										A2(
											indenter,
											acc.depth,
											A2($zwilias$elm_html_string$Html$Types$tag, tagName, attributes)),
										acc.result),
									stack: A2(
										$elm$core$List$cons,
										_Utils_Tuple2(tagName, rest),
										acc.stack)
								});
							indenter = $temp$indenter;
							tags = $temp$tags;
							acc = $temp$acc;
							continue toStringHelper;
						default:
							var childNodes = children.a;
							var $temp$indenter = indenter,
								$temp$tags = A2($elm$core$List$map, $elm$core$Tuple$second, childNodes),
								$temp$acc = _Utils_update(
								acc,
								{
									depth: acc.depth + 1,
									result: A2(
										$elm$core$List$cons,
										A2(
											indenter,
											acc.depth,
											A2($zwilias$elm_html_string$Html$Types$tag, tagName, attributes)),
										acc.result),
									stack: A2(
										$elm$core$List$cons,
										_Utils_Tuple2(tagName, rest),
										acc.stack)
								});
							indenter = $temp$indenter;
							tags = $temp$tags;
							acc = $temp$acc;
							continue toStringHelper;
					}
				} else {
					var string = tags.a.a;
					var rest = tags.b;
					var $temp$indenter = indenter,
						$temp$tags = rest,
						$temp$acc = _Utils_update(
						acc,
						{
							result: A2(
								$elm$core$List$cons,
								A2(
									indenter,
									acc.depth,
									$zwilias$elm_html_string$Html$Types$escapeHtmlText(string)),
								acc.result)
						});
					indenter = $temp$indenter;
					tags = $temp$tags;
					acc = $temp$acc;
					continue toStringHelper;
				}
			}
		}
	});
var $zwilias$elm_html_string$Html$Types$toString = F2(
	function (depth, html) {
		var joinString = function () {
			if (!depth) {
				return '';
			} else {
				return '\n';
			}
		}();
		var initialAcc = {depth: 0, result: _List_Nil, stack: _List_Nil};
		var indenter = function () {
			if (!depth) {
				return $elm$core$Basics$always($elm$core$Basics$identity);
			} else {
				return $zwilias$elm_html_string$Html$Types$indent(depth);
			}
		}();
		return A2(
			$zwilias$elm_html_string$Html$Types$join,
			joinString,
			A3(
				$zwilias$elm_html_string$Html$Types$toStringHelper,
				indenter,
				_List_fromArray(
					[html]),
				initialAcc).result);
	});
var $zwilias$elm_html_string$Html$String$toString = function (indent) {
	return $zwilias$elm_html_string$Html$Types$toString(indent);
};
var $author$project$Build$articleSectionsToRssItems = function (articleContent) {
	switch (articleContent.$) {
		case 'Section':
			var section = articleContent.a;
			var _v1 = section.completion;
			if (_v1.$ === 'InProgress') {
				return _List_Nil;
			} else {
				var publishTime = _v1.a;
				return _List_fromArray(
					[
						{
						author: 'lue',
						categories: _List_Nil,
						content: $elm$core$Maybe$Nothing,
						contentEncoded: $elm$core$Maybe$Just(
							A2(
								$zwilias$elm_html_string$Html$String$toString,
								0,
								$author$project$Build$articlesContentToHtmlStringifiable(articleContent))),
						description: section.description,
						enclosure: $elm$core$Maybe$Nothing,
						pubDate: $dillonkearns$elm_rss$Rss$DateTime(publishTime),
						title: section.title,
						url: $author$project$Articles$sectionTitleToUrl('#' + section.title)
					}
					]);
			}
		case 'Paragraph':
			return _List_Nil;
		case 'ElmCode':
			return _List_Nil;
		case 'UnorderedList':
			return _List_Nil;
		default:
			var sequence = articleContent.a;
			return A2($elm$core$List$concatMap, $author$project$Build$articleSectionsToRssItems, sequence);
	}
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $billstclair$elm_xml_eeue56$Xml$Encode$boolToString = function (b) {
	return b ? 'true' : 'false';
};
var $billstclair$elm_xml_eeue56$Xml$predefinedEntities = _List_fromArray(
	[
		_Utils_Tuple2(
		_Utils_chr('\"'),
		'quot'),
		_Utils_Tuple2(
		_Utils_chr('\''),
		'apos'),
		_Utils_Tuple2(
		_Utils_chr('<'),
		'lt'),
		_Utils_Tuple2(
		_Utils_chr('>'),
		'gt'),
		_Utils_Tuple2(
		_Utils_chr('&'),
		'amp')
	]);
var $billstclair$elm_xml_eeue56$Xml$encodeXmlEntities = function (s) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (_v0, z) {
				var x = _v0.a;
				var y = _v0.b;
				return A3(
					$elm$core$String$replace,
					$elm$core$String$fromChar(x),
					'&' + (y + ';'),
					z);
			}),
		s,
		$billstclair$elm_xml_eeue56$Xml$predefinedEntities);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $billstclair$elm_xml_eeue56$Xml$Encode$needsIndent = function (nextValue) {
	switch (nextValue.$) {
		case 'Object':
			if (!nextValue.a.b) {
				return false;
			} else {
				return true;
			}
		case 'Tag':
			return true;
		default:
			return false;
	}
};
var $billstclair$elm_xml_eeue56$Xml$Encode$propToString = function (value) {
	switch (value.$) {
		case 'StrNode':
			var str = value.a;
			return $billstclair$elm_xml_eeue56$Xml$encodeXmlEntities(str);
		case 'IntNode':
			var n = value.a;
			return $elm$core$String$fromInt(n);
		case 'BoolNode':
			var b = value.a;
			return $billstclair$elm_xml_eeue56$Xml$Encode$boolToString(b);
		case 'FloatNode':
			var f = value.a;
			return $elm$core$String$fromFloat(f);
		default:
			return '';
	}
};
var $billstclair$elm_xml_eeue56$Xml$Encode$propsToString = function (props) {
	return function (x) {
		return ($elm$core$String$length(x) > 0) ? (' ' + x) : '';
	}(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				function (_v0) {
					var key = _v0.a;
					var value = _v0.b;
					return key + ('=\"' + ($billstclair$elm_xml_eeue56$Xml$Encode$propToString(value) + '\"'));
				},
				$elm$core$Dict$toList(props))));
};
var $billstclair$elm_xml_eeue56$Xml$Encode$valueToString = F3(
	function (level, indent, value) {
		switch (value.$) {
			case 'Tag':
				var name = value.a;
				var props = value.b;
				var nextValue = value.c;
				var indentString = $billstclair$elm_xml_eeue56$Xml$Encode$needsIndent(nextValue) ? '\n' : '';
				var indentClosing = $billstclair$elm_xml_eeue56$Xml$Encode$needsIndent(nextValue) ? A2($elm$core$String$repeat, level * indent, ' ') : '';
				return A2($elm$core$String$repeat, level * indent, ' ') + ('<' + (name + ($billstclair$elm_xml_eeue56$Xml$Encode$propsToString(props) + ('>' + (indentString + (A3($billstclair$elm_xml_eeue56$Xml$Encode$valueToString, level, indent, nextValue) + (indentString + (indentClosing + ('</' + (name + '>'))))))))));
			case 'StrNode':
				var str = value.a;
				return $billstclair$elm_xml_eeue56$Xml$encodeXmlEntities(str);
			case 'IntNode':
				var n = value.a;
				return $elm$core$String$fromInt(n);
			case 'FloatNode':
				var n = value.a;
				return $elm$core$String$fromFloat(n);
			case 'BoolNode':
				var b = value.a;
				return $billstclair$elm_xml_eeue56$Xml$Encode$boolToString(b);
			case 'Object':
				var xs = value.a;
				return A2(
					$elm$core$String$join,
					'\n',
					A2(
						$elm$core$List$map,
						A2($billstclair$elm_xml_eeue56$Xml$Encode$valueToString, level + 1, indent),
						xs));
			default:
				var name = value.a;
				var props = value.b;
				return '<?' + (name + ($billstclair$elm_xml_eeue56$Xml$Encode$propsToString(props) + '?>'));
		}
	});
var $billstclair$elm_xml_eeue56$Xml$Encode$encode = F2(
	function (indent, value) {
		return A3($billstclair$elm_xml_eeue56$Xml$Encode$valueToString, -1, indent, value);
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $ryan_haskell$date_format$DateFormat$DayOfMonthFixed = {$: 'DayOfMonthFixed'};
var $ryan_haskell$date_format$DateFormat$dayOfMonthFixed = $ryan_haskell$date_format$DateFormat$DayOfMonthFixed;
var $ryan_haskell$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {toAmPm: toAmPm, toMonthAbbreviation: toMonthAbbreviation, toMonthName: toMonthName, toOrdinalSuffix: toOrdinalSuffix, toWeekdayAbbreviation: toWeekdayAbbreviation, toWeekdayName: toWeekdayName};
	});
var $ryan_haskell$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $ryan_haskell$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryan_haskell$date_format$DateFormat$Language$english = A6(
	$ryan_haskell$date_format$DateFormat$Language$Language,
	$ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryan_haskell$date_format$DateFormat$Language$toEnglishAmPm,
	$ryan_haskell$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryan_haskell$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.toAmPm(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $ryan_haskell$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $ryan_haskell$date_format$DateFormat$days = _List_fromArray(
	[$elm$time$Time$Sun, $elm$time$Time$Mon, $elm$time$Time$Tue, $elm$time$Time$Wed, $elm$time$Time$Thu, $elm$time$Time$Fri, $elm$time$Time$Sat]);
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return $elm$time$Time$Thu;
			case 1:
				return $elm$time$Time$Fri;
			case 2:
				return $elm$time$Time$Sat;
			case 3:
				return $elm$time$Time$Sun;
			case 4:
				return $elm$time$Time$Mon;
			case 5:
				return $elm$time$Time$Tue;
			default:
				return $elm$time$Time$Wed;
		}
	});
var $ryan_haskell$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, $elm$time$Time$Sun),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryan_haskell$date_format$DateFormat$days)))));
	});
var $ryan_haskell$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryan_haskell$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $ryan_haskell$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $ryan_haskell$date_format$DateFormat$months = _List_fromArray(
	[$elm$time$Time$Jan, $elm$time$Time$Feb, $elm$time$Time$Mar, $elm$time$Time$Apr, $elm$time$Time$May, $elm$time$Time$Jun, $elm$time$Time$Jul, $elm$time$Time$Aug, $elm$time$Time$Sep, $elm$time$Time$Oct, $elm$time$Time$Nov, $elm$time$Time$Dec]);
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $ryan_haskell$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, $elm$time$Time$Jan),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryan_haskell$date_format$DateFormat$months))));
	});
var $ryan_haskell$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryan_haskell$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $ryan_haskell$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryan_haskell$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryan_haskell$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryan_haskell$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $ryan_haskell$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$Basics$round = _Basics_round;
var $ryan_haskell$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryan_haskell$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryan_haskell$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryan_haskell$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryan_haskell$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 'MonthNumber':
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthNameAbbreviated':
				return language.toMonthAbbreviation(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'MonthNameFull':
				return language.toMonthName(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'QuarterNumber':
				return $elm$core$String$fromInt(
					1 + A2($ryan_haskell$date_format$DateFormat$quarter, zone, posix));
			case 'QuarterSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					1 + A2($ryan_haskell$date_format$DateFormat$quarter, zone, posix));
			case 'DayOfMonthNumber':
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					3,
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfWeekNumber':
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekNameAbbreviated':
				return language.toWeekdayAbbreviation(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'DayOfWeekNameFull':
				return language.toWeekdayName(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'WeekOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 'YearNumberLastTwo':
				return A2(
					$elm$core$String$right,
					2,
					A2($ryan_haskell$date_format$DateFormat$year, zone, posix));
			case 'YearNumber':
				return A2($ryan_haskell$date_format$DateFormat$year, zone, posix);
			case 'AmPmUppercase':
				return $elm$core$String$toUpper(
					A3($ryan_haskell$date_format$DateFormat$amPm, language, zone, posix));
			case 'AmPmLowercase':
				return $elm$core$String$toLower(
					A3($ryan_haskell$date_format$DateFormat$amPm, language, zone, posix));
			case 'HourMilitaryNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourNumber':
				return $elm$core$String$fromInt(
					$ryan_haskell$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					$ryan_haskell$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourMilitaryFromOneNumber':
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFromOneFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'MinuteNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 'MinuteFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 'SecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 'SecondFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 'MillisecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 'MillisecondFixed':
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryan_haskell$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryan_haskell$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryan_haskell$date_format$DateFormat$format = $ryan_haskell$date_format$DateFormat$formatWithLanguage($ryan_haskell$date_format$DateFormat$Language$english);
var $ryan_haskell$date_format$DateFormat$DayOfWeekNameFull = {$: 'DayOfWeekNameFull'};
var $ryan_haskell$date_format$DateFormat$dayOfWeekNameFull = $ryan_haskell$date_format$DateFormat$DayOfWeekNameFull;
var $dmy$elm_imf_date_time$Imf$DateTime$formatDay = F2(
	function (tz, posix) {
		return A2(
			$elm$core$String$left,
			3,
			A3(
				$ryan_haskell$date_format$DateFormat$format,
				_List_fromArray(
					[$ryan_haskell$date_format$DateFormat$dayOfWeekNameFull]),
				tz,
				posix));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $dmy$elm_imf_date_time$Imf$DateTime$formatZone = F2(
	function (tz, posix) {
		var minuteOffset = A2($justinmimbs$time_extra$Time$Extra$toOffset, tz, posix);
		var minute = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2(
					$elm$core$Basics$modBy,
					60,
					$elm$core$Basics$abs(minuteOffset))));
		var hour = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				($elm$core$Basics$abs(minuteOffset) / 60) | 0));
		return $elm$core$String$concat(
			_List_fromArray(
				[
					(minuteOffset >= 0) ? '+' : '-',
					hour,
					minute
				]));
	});
var $ryan_haskell$date_format$DateFormat$HourMilitaryFixed = {$: 'HourMilitaryFixed'};
var $ryan_haskell$date_format$DateFormat$hourMilitaryFixed = $ryan_haskell$date_format$DateFormat$HourMilitaryFixed;
var $ryan_haskell$date_format$DateFormat$MinuteFixed = {$: 'MinuteFixed'};
var $ryan_haskell$date_format$DateFormat$minuteFixed = $ryan_haskell$date_format$DateFormat$MinuteFixed;
var $ryan_haskell$date_format$DateFormat$MonthNameAbbreviated = {$: 'MonthNameAbbreviated'};
var $ryan_haskell$date_format$DateFormat$monthNameAbbreviated = $ryan_haskell$date_format$DateFormat$MonthNameAbbreviated;
var $ryan_haskell$date_format$DateFormat$SecondFixed = {$: 'SecondFixed'};
var $ryan_haskell$date_format$DateFormat$secondFixed = $ryan_haskell$date_format$DateFormat$SecondFixed;
var $ryan_haskell$date_format$DateFormat$Text = function (a) {
	return {$: 'Text', a: a};
};
var $ryan_haskell$date_format$DateFormat$text = $ryan_haskell$date_format$DateFormat$Text;
var $ryan_haskell$date_format$DateFormat$YearNumber = {$: 'YearNumber'};
var $ryan_haskell$date_format$DateFormat$yearNumber = $ryan_haskell$date_format$DateFormat$YearNumber;
var $dmy$elm_imf_date_time$Imf$DateTime$fromPosix = F2(
	function (tz, posix) {
		return A3(
			$ryan_haskell$date_format$DateFormat$format,
			_List_fromArray(
				[
					$ryan_haskell$date_format$DateFormat$text(
					A2($dmy$elm_imf_date_time$Imf$DateTime$formatDay, tz, posix)),
					$ryan_haskell$date_format$DateFormat$text(', '),
					$ryan_haskell$date_format$DateFormat$dayOfMonthFixed,
					$ryan_haskell$date_format$DateFormat$text(' '),
					$ryan_haskell$date_format$DateFormat$monthNameAbbreviated,
					$ryan_haskell$date_format$DateFormat$text(' '),
					$ryan_haskell$date_format$DateFormat$yearNumber,
					$ryan_haskell$date_format$DateFormat$text(' '),
					$ryan_haskell$date_format$DateFormat$hourMilitaryFixed,
					$ryan_haskell$date_format$DateFormat$text(':'),
					$ryan_haskell$date_format$DateFormat$minuteFixed,
					$ryan_haskell$date_format$DateFormat$text(':'),
					$ryan_haskell$date_format$DateFormat$secondFixed,
					$ryan_haskell$date_format$DateFormat$text(' '),
					$ryan_haskell$date_format$DateFormat$text(
					A2($dmy$elm_imf_date_time$Imf$DateTime$formatZone, tz, posix))
				]),
			tz,
			posix);
	});
var $billstclair$elm_xml_eeue56$Xml$Object = function (a) {
	return {$: 'Object', a: a};
};
var $billstclair$elm_xml_eeue56$Xml$Tag = F3(
	function (a, b, c) {
		return {$: 'Tag', a: a, b: b, c: c};
	});
var $billstclair$elm_xml_eeue56$Xml$Encode$object = function (values) {
	return $billstclair$elm_xml_eeue56$Xml$Object(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var name = _v0.a;
				var props = _v0.b;
				var value = _v0.c;
				return A3($billstclair$elm_xml_eeue56$Xml$Tag, name, props, value);
			},
			values));
};
var $billstclair$elm_xml_eeue56$Xml$StrNode = function (a) {
	return {$: 'StrNode', a: a};
};
var $billstclair$elm_xml_eeue56$Xml$Encode$string = $billstclair$elm_xml_eeue56$Xml$StrNode;
var $dillonkearns$elm_rss$Rss$encodeCategory = function (category) {
	return $billstclair$elm_xml_eeue56$Xml$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple3(
				'category',
				$elm$core$Dict$empty,
				$billstclair$elm_xml_eeue56$Xml$Encode$string(category))
			]));
};
var $billstclair$elm_xml_eeue56$Xml$Encode$null = $billstclair$elm_xml_eeue56$Xml$Encode$object(_List_Nil);
var $dillonkearns$elm_rss$Rss$encodeEnclosure = function (enclosure) {
	return $billstclair$elm_xml_eeue56$Xml$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple3(
				'enclosure',
				$elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'url',
							$billstclair$elm_xml_eeue56$Xml$Encode$string(enclosure.url)),
							_Utils_Tuple2(
							'length',
							$billstclair$elm_xml_eeue56$Xml$Encode$string('0')),
							_Utils_Tuple2(
							'type',
							$billstclair$elm_xml_eeue56$Xml$Encode$string(enclosure.mimeType))
						])),
				$billstclair$elm_xml_eeue56$Xml$Encode$null)
			]));
};
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$day = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.day;
	});
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthNumber = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToNumber);
var $justinmimbs$date$Date$ordinalDay = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.ordinalDay;
	});
var $justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				$elm$core$String$padLeft,
				length,
				_Utils_chr('0'),
				$elm$core$String$fromInt(
					$elm$core$Basics$abs(_int))));
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = $justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(jan4));
};
var $justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _v0 = A2($elm$core$Basics$max, 1, wdn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Mon;
		case 2:
			return $elm$time$Time$Tue;
		case 3:
			return $elm$time$Time$Wed;
		case 4:
			return $elm$time$Time$Thu;
		case 5:
			return $elm$time$Time$Fri;
		case 6:
			return $elm$time$Time$Sat;
		default:
			return $elm$time$Time$Sun;
	}
};
var $justinmimbs$date$Date$toWeekDate = function (_v0) {
	var rd = _v0.a;
	var wdn = $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(rd));
	var wy = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd + (4 - wdn)));
	var week1Day1 = $justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		weekNumber: 1 + (((rd - week1Day1) / 7) | 0),
		weekYear: wy,
		weekday: $justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var $justinmimbs$date$Date$weekNumber = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekNumber;
	});
var $justinmimbs$date$Date$weekYear = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekYear;
	});
var $justinmimbs$date$Date$weekday = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$weekdayNumber, $justinmimbs$date$Date$numberToWeekday);
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2($elm$core$Basics$modBy, 100, n);
	var _v0 = A2(
		$elm$core$Basics$min,
		(nn < 20) ? nn : A2($elm$core$Basics$modBy, 10, nn),
		4);
	switch (_v0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var $justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$justinmimbs$date$Date$ordinalSuffix(n));
};
var $justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char.valueOf()) {
			case 'y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 4:
						return $justinmimbs$date$Date$withOrdinalSuffix(
							$justinmimbs$date$Date$quarter(date));
					case 5:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language.monthNameShort(
							$justinmimbs$date$Date$month(date));
					case 4:
						return language.monthName(
							$justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.monthNameShort(
								$justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$day(date)));
					case 3:
						return language.dayWithSuffix(
							$justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							$elm$core$String$padLeft,
							3,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 2:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 3:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 4:
						return language.weekdayName(
							$justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							$elm$core$String$left,
							2,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4(
							$justinmimbs$date$Date$formatField,
							language,
							_Utils_chr('E'),
							length,
							date);
				}
			default:
				return '';
		}
	});
var $justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (token.$ === 'Field') {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4($justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var $justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $justinmimbs$date$Pattern$escapedQuote = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(
		$justinmimbs$date$Pattern$Literal('\'')),
	$elm$parser$Parser$token('\'\''));
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$getOffset = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _v0 = $elm$core$String$toList(str);
	if (_v0.b && (!_v0.b.b)) {
		var _char = _v0.a;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2($justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$getOffset,
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(_char)))),
			$elm$parser$Parser$getOffset);
	} else {
		return $elm$parser$Parser$problem('expected exactly one char');
	}
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $justinmimbs$date$Pattern$field = A2(
	$elm$parser$Parser$andThen,
	$justinmimbs$date$Pattern$fieldRepeats,
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)));
var $justinmimbs$date$Pattern$finalize = A2(
	$elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _v0 = _Utils_Tuple2(token, tokens);
			if (((_v0.a.$ === 'Literal') && _v0.b.b) && (_v0.b.a.$ === 'Literal')) {
				var x = _v0.a.a;
				var _v1 = _v0.b;
				var y = _v1.a.a;
				var rest = _v1.b;
				return A2(
					$elm$core$List$cons,
					$justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2($elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (!_Utils_eq(
		_char,
		_Utils_chr('\''))) && (!$elm$core$Char$isAlpha(_char));
};
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $justinmimbs$date$Pattern$literal = A2(
	$elm$parser$Parser$map,
	$justinmimbs$date$Pattern$Literal,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$chompIf($justinmimbs$date$Pattern$isLiteralChar)),
			$elm$parser$Parser$chompWhile($justinmimbs$date$Pattern$isLiteralChar))));
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $justinmimbs$date$Pattern$quotedHelp = function (result) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (str) {
					return $justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				$elm$parser$Parser$getChompedString(
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(_Utils_Tuple0),
							$elm$parser$Parser$chompIf(
								$elm$core$Basics$neq(
									_Utils_chr('\'')))),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$neq(
								_Utils_chr('\'')))))),
				A2(
				$elm$parser$Parser$andThen,
				function (_v0) {
					return $justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				$elm$parser$Parser$token('\'\'')),
				$elm$parser$Parser$succeed(result)
			]));
};
var $justinmimbs$date$Pattern$quoted = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($justinmimbs$date$Pattern$Literal),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('\'')))),
	A2(
		$elm$parser$Parser$ignorer,
		$justinmimbs$date$Pattern$quotedHelp(''),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(
						_Utils_chr('\''))),
					$elm$parser$Parser$end
				]))));
var $justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (token) {
					return $justinmimbs$date$Pattern$patternHelp(
						A2($elm$core$List$cons, token, tokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$justinmimbs$date$Pattern$field, $justinmimbs$date$Pattern$literal, $justinmimbs$date$Pattern$escapedQuote, $justinmimbs$date$Pattern$quoted]))),
				$elm$parser$Parser$lazy(
				function (_v0) {
					return $elm$parser$Parser$succeed(
						$justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		$elm$core$Result$withDefault,
		_List_fromArray(
			[
				$justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			$elm$parser$Parser$run,
			$justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var $justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = $elm$core$List$reverse(
			$justinmimbs$date$Pattern$fromString(pattern));
		return A2($justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var $justinmimbs$date$Date$monthToName = function (m) {
	switch (m.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $justinmimbs$date$Date$language_en = {
	dayWithSuffix: $justinmimbs$date$Date$withOrdinalSuffix,
	monthName: $justinmimbs$date$Date$monthToName,
	monthNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$monthToName,
		$elm$core$String$left(3)),
	weekdayName: $justinmimbs$date$Date$weekdayToName,
	weekdayNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$weekdayToName,
		$elm$core$String$left(3))
};
var $justinmimbs$date$Date$format = function (pattern) {
	return A2($justinmimbs$date$Date$formatWithLanguage, $justinmimbs$date$Date$language_en, pattern);
};
var $dillonkearns$elm_rss$Rss$formatDate = function (date) {
	return A2($justinmimbs$date$Date$format, 'EEE, dd MMM yyyy', date) + ' 00:00:00 GMT';
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $dillonkearns$elm_rss$Rss$formatDateOrTime = function (dateOrTime) {
	if (dateOrTime.$ === 'Date') {
		var date = dateOrTime.a;
		return $dillonkearns$elm_rss$Rss$formatDate(date);
	} else {
		var posix = dateOrTime.a;
		return A2($dmy$elm_imf_date_time$Imf$DateTime$fromPosix, $elm$time$Time$utc, posix);
	}
};
var $dillonkearns$elm_rss$Path$dropLeading = function (url) {
	return A2($elm$core$String$startsWith, '/', url) ? A2($elm$core$String$dropLeft, 1, url) : url;
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $dillonkearns$elm_rss$Path$dropTrailing = function (url) {
	return A2($elm$core$String$endsWith, '/', url) ? A2($elm$core$String$dropRight, 1, url) : url;
};
var $dillonkearns$elm_rss$Path$dropBoth = function (url) {
	return $dillonkearns$elm_rss$Path$dropTrailing(
		$dillonkearns$elm_rss$Path$dropLeading(url));
};
var $dillonkearns$elm_rss$Path$join = function (urls) {
	return A2(
		$elm$core$String$join,
		'/',
		A2($elm$core$List$map, $dillonkearns$elm_rss$Path$dropBoth, urls));
};
var $dillonkearns$elm_rss$Rss$keyValue = F2(
	function (key, value) {
		return $billstclair$elm_xml_eeue56$Xml$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple3(
					key,
					$elm$core$Dict$empty,
					$billstclair$elm_xml_eeue56$Xml$Encode$string(value))
				]));
	});
var $billstclair$elm_xml_eeue56$Xml$Encode$list = function (values) {
	return $billstclair$elm_xml_eeue56$Xml$Object(values);
};
var $dillonkearns$elm_rss$Rss$wrapInCdata = function (content) {
	return '<![CDATA[' + (content + ']]>');
};
var $dillonkearns$elm_rss$Rss$itemXml = F2(
	function (siteUrl, item) {
		return $billstclair$elm_xml_eeue56$Xml$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple3(
					'item',
					$elm$core$Dict$empty,
					$billstclair$elm_xml_eeue56$Xml$Encode$list(
						_Utils_ap(
							_List_fromArray(
								[
									A2($dillonkearns$elm_rss$Rss$keyValue, 'title', item.title),
									A2($dillonkearns$elm_rss$Rss$keyValue, 'description', item.description),
									A2(
									$dillonkearns$elm_rss$Rss$keyValue,
									'link',
									$dillonkearns$elm_rss$Path$join(
										_List_fromArray(
											[siteUrl, item.url]))),
									A2(
									$dillonkearns$elm_rss$Rss$keyValue,
									'guid',
									$dillonkearns$elm_rss$Path$join(
										_List_fromArray(
											[siteUrl, item.url]))),
									A2(
									$dillonkearns$elm_rss$Rss$keyValue,
									'pubDate',
									$dillonkearns$elm_rss$Rss$formatDateOrTime(item.pubDate))
								]),
							_Utils_ap(
								A2($elm$core$List$map, $dillonkearns$elm_rss$Rss$encodeCategory, item.categories),
								A2(
									$elm$core$List$filterMap,
									$elm$core$Basics$identity,
									_List_fromArray(
										[
											A2(
											$elm$core$Maybe$map,
											function (content) {
												return A2($dillonkearns$elm_rss$Rss$keyValue, 'content', content);
											},
											item.content),
											A2(
											$elm$core$Maybe$map,
											function (content) {
												return A2(
													$dillonkearns$elm_rss$Rss$keyValue,
													'content:encoded',
													$dillonkearns$elm_rss$Rss$wrapInCdata(content));
											},
											item.contentEncoded),
											A2($elm$core$Maybe$map, $dillonkearns$elm_rss$Rss$encodeEnclosure, item.enclosure)
										]))))))
				]));
	});
var $dillonkearns$elm_rss$Rss$generate = function (feed) {
	return A2(
		$billstclair$elm_xml_eeue56$Xml$Encode$encode,
		0,
		$billstclair$elm_xml_eeue56$Xml$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple3(
					'rss',
					$elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'xmlns:dc',
								$billstclair$elm_xml_eeue56$Xml$Encode$string('http://purl.org/dc/elements/1.1/')),
								_Utils_Tuple2(
								'xmlns:content',
								$billstclair$elm_xml_eeue56$Xml$Encode$string('http://purl.org/rss/1.0/modules/content/')),
								_Utils_Tuple2(
								'xmlns:atom',
								$billstclair$elm_xml_eeue56$Xml$Encode$string('http://www.w3.org/2005/Atom')),
								_Utils_Tuple2(
								'version',
								$billstclair$elm_xml_eeue56$Xml$Encode$string('2.0'))
							])),
					$billstclair$elm_xml_eeue56$Xml$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple3(
								'channel',
								$elm$core$Dict$empty,
								$billstclair$elm_xml_eeue56$Xml$Encode$list(
									$elm$core$List$concat(
										_List_fromArray(
											[
												_List_fromArray(
												[
													A2($dillonkearns$elm_rss$Rss$keyValue, 'title', feed.title),
													A2($dillonkearns$elm_rss$Rss$keyValue, 'description', feed.description),
													A2($dillonkearns$elm_rss$Rss$keyValue, 'link', feed.url),
													A2(
													$dillonkearns$elm_rss$Rss$keyValue,
													'lastBuildDate',
													A2($dmy$elm_imf_date_time$Imf$DateTime$fromPosix, $elm$time$Time$utc, feed.lastBuildTime))
												]),
												A2(
												$elm$core$List$filterMap,
												$elm$core$Basics$identity,
												_List_fromArray(
													[
														A2(
														$elm$core$Maybe$map,
														$dillonkearns$elm_rss$Rss$keyValue('generator'),
														feed.generator)
													])),
												A2(
												$elm$core$List$map,
												$dillonkearns$elm_rss$Rss$itemXml(feed.siteUrl),
												feed.items)
											]))))
							])))
				])));
};
var $author$project$Build$rssGenerate = function (buildData) {
	return A3(
		$elm$core$String$replace,
		']]&gt;',
		'',
		A3(
			$elm$core$String$replace,
			'&lt;![CDATA[',
			'',
			$dillonkearns$elm_rss$Rss$generate(
				{
					description: 'lue\'s thoughts',
					generator: $elm$core$Maybe$Just('dillonkearns/elm-rss'),
					items: $author$project$Build$articleSectionsToRssItems($author$project$Articles$all),
					lastBuildTime: buildData.currentTime,
					siteUrl: 'https://lue-bird.github.io/blog/',
					title: 'lue blog',
					url: 'https://lue-bird.github.io/blog/'
				})));
};
var $elm$bytes$Bytes$Encode$Utf8 = F2(
	function (a, b) {
		return {$: 'Utf8', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$string = function (str) {
	return A2(
		$elm$bytes$Bytes$Encode$Utf8,
		_Bytes_getStringWidth(str),
		str);
};
var $lue_bird$elm_state_interface_experimental$Node$timePosixRequest = $lue_bird$elm_state_interface_experimental$Node$interfaceFromSingle(
	$lue_bird$elm_state_interface_experimental$Node$TimePosixRequest($elm$core$Basics$identity));
var $author$project$Build$toJs = _Platform_outgoingPort('toJs', $elm$core$Basics$identity);
var $lue_bird$elm_state_interface_experimental$Node$workingDirectoryPathRequest = $lue_bird$elm_state_interface_experimental$Node$interfaceFromSingle(
	$lue_bird$elm_state_interface_experimental$Node$WorkingDirectoryPathRequest($elm$core$Basics$identity));
var $author$project$Build$main = $lue_bird$elm_state_interface_experimental$Node$program(
	{
		initialState: $author$project$Build$State(
			{currentTime: $elm$core$Maybe$Nothing, runDirectory: $elm$core$Maybe$Nothing}),
		_interface: function (_v0) {
			var state = _v0.a;
			var _v1 = _Utils_Tuple2(state.runDirectory, state.currentTime);
			if ((_v1.a.$ === 'Just') && (_v1.b.$ === 'Just')) {
				var runDirectory = _v1.a.a;
				var currentTime = _v1.b.a;
				return $lue_bird$elm_state_interface_experimental$Node$fileWrite(
					{
						content: $elm$bytes$Bytes$Encode$encode(
							$elm$bytes$Bytes$Encode$string(
								$author$project$Build$rssGenerate(
									{currentTime: currentTime}))),
						path: runDirectory + '/../feed.xml'
					});
			} else {
				var maybeRunDirectory = _v1.a;
				var maybeCurrentTime = _v1.b;
				return $lue_bird$elm_state_interface_experimental$Node$interfaceBatch(
					_List_fromArray(
						[
							function () {
							if (maybeRunDirectory.$ === 'Just') {
								return $lue_bird$elm_state_interface_experimental$Node$interfaceNone;
							} else {
								return A2(
									$lue_bird$elm_state_interface_experimental$Node$interfaceFutureMap,
									function (runDirectory) {
										return $author$project$Build$State(
											{
												currentTime: maybeCurrentTime,
												runDirectory: $elm$core$Maybe$Just(runDirectory)
											});
									},
									$lue_bird$elm_state_interface_experimental$Node$workingDirectoryPathRequest);
							}
						}(),
							function () {
							if (maybeCurrentTime.$ === 'Just') {
								return $lue_bird$elm_state_interface_experimental$Node$interfaceNone;
							} else {
								return A2(
									$lue_bird$elm_state_interface_experimental$Node$interfaceFutureMap,
									function (currentTime) {
										return $author$project$Build$State(
											{
												currentTime: $elm$core$Maybe$Just(currentTime),
												runDirectory: maybeRunDirectory
											});
									},
									$lue_bird$elm_state_interface_experimental$Node$timePosixRequest);
							}
						}()
						]));
			}
		},
		ports: {fromJs: $author$project$Build$fromJs, toJs: $author$project$Build$toJs}
	});
/*
_Platform_export({'Build':{'init':$author$project$Build$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
*/
export const Elm = {'Build':{'init':$author$project$Build$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}};
  