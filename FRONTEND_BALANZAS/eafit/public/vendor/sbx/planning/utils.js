/*!
 * utils.js
 *
 * Copyright © 2017 Jorge M. Peláez
 *
 * Miscellaneous javascript enhancements
 * 
 */

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
