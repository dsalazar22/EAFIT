/*!
 * pserve.js
 *
 * Copyright © 2017 Jorge M. Peláez
 * Para uso exclusivo de Planta de Servicios
 * Enka de Colombia S.A.
 *
 * Miscellaneous javascript enhancements to the DOM
 * for responsive webapps.
 * 
 * This library makes use of Promises. There is a polyfill implementation
 * to cover old browsers. 
 * 
 */

if (!('Promise' in window)) {

  (function (root) {

	// Store setTimeout reference so promise-polyfill will be unaffected by
	// other code modifying setTimeout (like sinon.useFakeTimers())
	var setTimeoutFunc = setTimeout;

	function noop() {
	}

	// Use polyfill for setImmediate for performance gains
	var asap = (typeof setImmediate === 'function' && setImmediate) ||
	  function (fn) {
		setTimeoutFunc(fn, 0);
	  };

	var onUnhandledRejection = function onUnhandledRejection(err) {
	  if (typeof console !== 'undefined' && console) {
		console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	  }
	};

	// Polyfill for Function.prototype.bind
	function bind(fn, thisArg) {
	  return function () {
		fn.apply(thisArg, arguments);
	  };
	}

	function Promise(fn) {
	  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	  if (typeof fn !== 'function') throw new TypeError('not a function');
	  this._state = 0;
	  this._handled = false;
	  this._value = undefined;
	  this._deferreds = [];

	  doResolve(fn, this);
	}

	function handle(self, deferred) {
	  while (self._state === 3) {
		self = self._value;
	  }
	  if (self._state === 0) {
		self._deferreds.push(deferred);
		return;
	  }
	  self._handled = true;
	  asap(function () {
		var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
		if (cb === null) {
		  (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
		  return;
		}
		var ret;
		try {
		  ret = cb(self._value);
		} catch (e) {
		  reject(deferred.promise, e);
		  return;
		}
		resolve(deferred.promise, ret);
	  });
	}

	function resolve(self, newValue) {
	  try {
		// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
		if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
		if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
		  var then = newValue.then;
		  if (newValue instanceof Promise) {
			self._state = 3;
			self._value = newValue;
			finale(self);
			return;
		  } else if (typeof then === 'function') {
			doResolve(bind(then, newValue), self);
			return;
		  }
		}
		self._state = 1;
		self._value = newValue;
		finale(self);
	  } catch (e) {
		reject(self, e);
	  }
	}

	function reject(self, newValue) {
	  self._state = 2;
	  self._value = newValue;
	  finale(self);
	}

	function finale(self) {
	  if (self._state === 2 && self._deferreds.length === 0) {
		asap(function() {
		  if (!self._handled) {
			onUnhandledRejection(self._value);
		  }
		});
	  }

	  for (var i = 0, len = self._deferreds.length; i < len; i++) {
		handle(self, self._deferreds[i]);
	  }
	  self._deferreds = null;
	}

	function Handler(onFulfilled, onRejected, promise) {
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, self) {
	  var done = false;
	  try {
		fn(function (value) {
		  if (done) return;
		  done = true;
		  resolve(self, value);
		}, function (reason) {
		  if (done) return;
		  done = true;
		  reject(self, reason);
		});
	  } catch (ex) {
		if (done) return;
		done = true;
		reject(self, ex);
	  }
	}

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};

	Promise.prototype.then = function (onFulfilled, onRejected) {
	  var prom = new (this.constructor)(noop);

	  handle(this, new Handler(onFulfilled, onRejected, prom));
	  return prom;
	};

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);

	  return new Promise(function (resolve, reject) {
		if (args.length === 0) return resolve([]);
		var remaining = args.length;

		function res(i, val) {
		  try {
			if (val && (typeof val === 'object' || typeof val === 'function')) {
			  var then = val.then;
			  if (typeof then === 'function') {
				then.call(val, function (val) {
				  res(i, val);
				}, reject);
				return;
			  }
			}
			args[i] = val;
			if (--remaining === 0) {
			  resolve(args);
			}
		  } catch (ex) {
			reject(ex);
		  }
		}

		for (var i = 0; i < args.length; i++) {
		  res(i, args[i]);
		}
	  });
	};

	Promise.resolve = function (value) {
	  if (value && typeof value === 'object' && value.constructor === Promise) {
		return value;
	  }

	  return new Promise(function (resolve) {
		resolve(value);
	  });
	};

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
		reject(value);
	  });
	};

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
		for (var i = 0, len = values.length; i < len; i++) {
		  values[i].then(resolve, reject);
		}
	  });
	};

	/**
	 * Set the immediate function to execute callbacks
	 * @param fn {function} Function to execute
	 * @private
	 */
	Promise._setImmediateFn = function _setImmediateFn(fn) {
	  asap = fn;
	};

	Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	  onUnhandledRejection = fn;
	};

	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = Promise;
	} else if (!root.Promise) {
	  root.Promise = Promise;
	}

  })(this);
}

function asyncText(method, url, args) {
  if(args === undefined) { args = null; }
  var xhr = new XMLHttpRequest();
//	if (method.toUpperCase() == 'GET') url = url.replace(/(.*)\??(\w*)/,'$1?time='+
//		Date.now()+'&$2');
	xhr.open(method, url, true);
	//* It causes problems with CORS preflight during requests:
	xhr.setRequestHeader("Cache-Control", "no-cache");
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.setRequestHeader("Expires",0);
	return new Promise(function(resolve, reject) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				switch (xhr.status) {
				case 0:
				case 200:
				case 201:
					resolve(xhr.responseText);
					break;
				case 400: //400 Bad Request
				case 401: //401 Unauthorized
				case 412: //412 Precondition Failed
					//break;
				default:
					reject(xhr.responseText);
				}
			}
		};
		if (self.basicauth && self.basicauth!=="")
			xhr.setRequestHeader('Authorization', 'Basic ' + self.basicauth);
		if (args && (method === 'POST' || method === 'PUT')) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(args));
		} else {
			xhr.send();
		}
  });
}

function asyncSafe(method, user, key, url, args) {
  if(args === undefined) { args = null; }
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return new Promise(function(resolve, reject) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				switch (xhr.status) {
				case 0:
				case 200:
				case 201:
					resolve(xhr.responseText);
					break;
				case 400: //400 Bad Request
				case 401: //401 Unauthorized
				case 412: //412 Precondition Failed
					//break;
				default:
					reject(xhr.responseText);
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader("Authorization", "Basic " + window.btoa(user+":"+key));
		if (args && (method === 'POST' || method === 'PUT')) {
			xhr.send(JSON.stringify(args));
		} else {
			xhr.send(null);
		}
  });
}

function require(script) {
  return new Promise(function(resolve,reject) {
		var scripts = document.scripts;
		var a = document.createElement('a');
		a.href = script;
		for (var s = 0; s < scripts.length; s++) {
			if (a.href == scripts[s].src) resolve(true);
		}
		asyncText('GET',script).then(function(data) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var new_script = document.createElement("script");
			new_script.type = "text/javascript";
			//new_script.src = script;
			new_script.appendChild( document.createTextNode(data));
			head.insertBefore(new_script, head.firstChild);
			//head.removeChild(new_script);
			resolve(true);
		}).catch(function(err) {
			reject(false);
		});
  });
}

var getText = function(obj,uri) {
  var page = uri.split('?');
  if (page=="") uri = "inicio.lsp";
  if (page.length>1) {
	var args = page[1].split('&');
	var hash = args[0].split('#');
	if (args.length>0) obj.queryParams = qs(args);
	if (!page[0])
	  uri = ""+(hash[0]||"inicio")+".lsp"+"#"+(hash[1]||"")+"?"+page[1];
  }
  asyncText('GET',uri).then(function(data){
		obj.appendElements(data);
		if (hash&&hash.length>1) {
			var hashtag = (document.getElementById(hash[1])||document.getElementsByName(hash[1])[0]);
			hashtag.scrollIntoView();
		}
  }).catch(function(err){
		console.log("getText error:",err);
  });
}

HTMLElement.prototype.appendElements = function(html) {

  function nodeName(elem,name) {
	return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
  }

  var scripts = [];
  var temp = document.createElement("div");
  temp.innerHTML = html
  var ret = temp.childNodes;
  for (var i=0;i<ret.length; i++) {
	if (scripts && nodeName(ret[i], "script")
	  && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
	  scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
	} else {
			var node = ret[i].cloneNode(true);
	  this.appendChild(node);
	  //this.appendChild(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
	}
  }
  for(script in scripts) {
	var data = (scripts[script].text || scripts[script].textContent || scripts[script].innerHTML || "");
	var head = document.getElementsByTagName("head")[0] || document.documentElement;
	var temp = document.createElement("script");
	if (scripts[script].src!="") temp.src = scripts[script].src;
	if (scripts[script].onload) temp.onload = scripts[script].onload;
	temp.type = "text/javascript";
	temp.appendChild(document.createTextNode(data));
	head.insertBefore(temp, head.firstChild);
	head.removeChild(temp);
	if (scripts[script].parentNode) {
	  scripts[script].parentNode.removeChild(scripts[script]);
	}
  }
}

Number.prototype.format = function() {
  var x = this.toString().split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

Number.prototype.pad = function(size) {
	return ('000000000' + this).substr(-size);
}

if (!Object.values) {
	Object.values = function (obj) {
		var vals = [];
		for( var key in obj ) {
			if ( obj.hasOwnProperty(key) ) {
				vals.push(obj[key]);
			}
		}
		return vals;
	}
};

var qs = function(a) {
	if (a == "") return {};
	var b = {};
	for (var i = 0; i < a.length; ++i)
	{
		var p=a[i].split('=', 2);
		if (p.length == 1)
			b[decodeURIComponent(p[0])] = "";
		else
			b[decodeURIComponent(p[0])] = decodeURIComponent(p[1].replace(/\+/g, " "));
	}
	return b;
}

var updateParameters = function(params){
	var l = window.location;

	/* build old old_params */
	var old_params = {};        
	var x = /(?:\??)([^=&?]+)=?([^&?]*)/g;        
	var s = l.search;
	for(var r = x.exec(s); r; r = x.exec(s))
	{
			r[1] = decodeURIComponent(r[1]);
			if (!r[2]) r[2] = '%%';
			old_params[r[1]] = r[2];
	}
	/* set old_params */
	for (var param in params) {
		old_params[param] = encodeURIComponent(params[param]);
	}

	/* build search */
	var search = [];
	for(var i in old_params)
	{
			var p = encodeURIComponent(i);
			var v = old_params[i];
			if (v != '%%' && v != "") {
				p += '=' + v;
				search.push(p);
			} 
	}
	search = search.join('&');

	/* execute search */
	l.search = search;
}

if (!Date.prototype.toYMD) {
	Date.prototype.toYMD = function() {
	  return this.getFullYear()+"-"+(this.getMonth()+1).pad(2)+"-"+this.getDate().pad(2);
	};
}

if (!Date.prototype.toYMDHM) {
	Date.prototype.toYMDHM = function() {
		return this.getFullYear()+"-"+(this.getMonth()+1).pad(2)+"-"+this.getDate().pad(2)+
			"T"+this.getHours().pad(2)+":"+this.getMinutes().pad(2)+":00";
	};
}

Date.prototype.addDays = function(days) {
	this.setDate(this.getDate() + parseInt(days));
	return this;
};

Date.prototype.nextDay = function() {
	var nd = new Date(this.addDays(1).toYMD()+"T00:00:00");
	this.setTime(nd.getTime());
	return this;
};

/* This function returns a string indicating the time
 * elapsed from the date and a reference date or the
 * current date if none is given
*/
Date.prototype.timeElapsed = function(toDate) {
	if (!toDate) var toDate = new Date();
	var e = parseInt((toDate-this)/86400000);
	if (e<365) return (e+" días");
	if (e<730) return ("1 año y "+(e%365)+" días");
	return (parseInt(e/365)+" años y "+(e%365)+" días");
};

/* This function calculates the week number based on
 * first_dow := day of week for January 1st
 * ISO weeks requires first_dow = 3
 * Enka's week requires first_dow = 4
 */
Date.prototype.getWeek = function(first_dow) {
  var y = this.getFullYear(),m=this.getMonth(),d=this.getDate();
  var dow = this.getDay();
  var dow0101 = new Date(y,0,1,0,0,0).getDay();
  var dowN0101 = new Date(parseInt(y+1),0,1,0,0,0).getDay();
  if ((m==0)&&(((first_dow-1)<dow0101)&(dow0101<(8-d)))) {
		y--; // week number is last year's week
		m=11; // december, base 0
		d=31;
		dow=dow0101-1;
		dowN0101=dow0101;
		var dowN0101 = new Date(parseInt(y+1),0,1,0,0,0).getDay();
	}
	if (m==11 && (((31-d)<dowN0101) && (dowN0101<=first_dow))) {
		return 1;
	}
	return(parseInt(
		((new Date(y,0,1,0,0,0).getDay()<= first_dow)?1:0)+
		4*m+(2*m+(d-1)+dow0101-dow+6)*36/256
	));
};

/* To fix wrong parsing of dates in IE */
function newDate(str){
	if(!str) return new Date();
	var a=str.split(" ");
	var d=a[0].split("-");
	if(a[1]) var t=a[1].split(":");
	else t=[0,0,0];
	if(!t[2]) t[2]=0;
	var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
	return date;
}

var CustMap = function(list){
	var self = {};
	var data = list;
	
	self.add = function(obj) {
		for (var key in obj) {
			data[key] = obj[key];
		}
	};

	self.get = function(obj) {
		return data[obj];
	};

	return self;
};

var formatText = function(text) {
	return(text.replace(/\n\n/g,"</p><p>"));
}

function sha256(str) {
	// We transform the string into an arraybuffer.
	var buffer = new TextEncoder("utf-8").encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
		return hex(hash);
	});
}

function hex(buffer) {
	var hexCodes = [];
	var view = new DataView(buffer);
	for (var i = 0; i < view.byteLength; i += 4) {
		// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
		var value = view.getUint32(i)
		// toString(16) will give the hex representation of the number without padding
		var stringValue = value.toString(16)
		// We use concatenation and slice for padding
		var padding = '00000000'
		var paddedValue = (padding + stringValue).slice(-padding.length)
		hexCodes.push(paddedValue);
	}

	// Join all the hex strings into one
	return hexCodes.join("");
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1. 
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

/* Fixing menu for touch devices */
document.addEventListener("touchstart", function(){}, true);

