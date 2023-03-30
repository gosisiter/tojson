class TOJSON {
  CONFIG;
  THIS_METH_KEY_SPECIAL = [
    "isObject",
    "isArray",
    "isDate",
    "isFunction",
    "isRegExp",
  ];
  constructor(conf) {
    this.CONFIG = conf;
  }
  // conf type
  hasToString(data) {
    const oo = data || this.CONFIG;
    return oo.toString && ["string", "number"].includes(typeof oo);
  }
  isString(data) {
    const oo = data || this.CONFIG;
    return typeof oo === "string";
  }
  isObject(data) {
    const oo = data || this.CONFIG;
    return Object.prototype.toString.call(oo) === "[object Object]";
  }
  isArray(data) {
    const oo = data || this.CONFIG;
    return Object.prototype.toString.call(oo) === "[object Array]";
  }
  isFunction(data) {
    const oo = data || this.CONFIG;
    return Object.prototype.toString.call(oo) === "[object Function]";
  }
  isDate(data) {
    const oo = data || this.CONFIG;
    return Object.prototype.toString.call(oo) === "[object Date]";
  }
  isRegExp(data) {
    const oo = data || this.CONFIG;
    return Object.prototype.toString.call(oo) === "[object RegExp]";
  }
  isLongNumber(data){
    const oo = data || this.CONFIG
    const oos = `${oo}`
    return oos.length > 15 || oos.indexOf('e') >-1
  }
  isNullOrUndefinde(data) {
    const oo = data || this.CONFIG;
    const prototypeCall = Object.prototype.toString.call(oo);
    return (
      prototypeCall === "[object Null]" ||
      prototypeCall === "[object Undefined]"
    );
  }
  // array to string
  arrayToString(data) {
    const oo = data || this.CONFIG;
    let vals = [],
      val;
    for (const value of oo) {
      val = this.recursionData(value);
      vals.push(val);
    }
    return vals?.length ? "[" + vals.join(",") + "]" : "[]";
  }
  // object to string
  objectToString(data) {
    const oo = data || this.CONFIG;
    let vals = [],
      val;
    for (const key in oo) {
      val = this.recursionData(oo[key]);
      vals.push(`"${key}": ${val}`);
    }
    return vals?.length ? "{" + vals.join(",") + "}" : "{}";
  }
  // function to string
  functionToString(data) {
    const oo = data || this.CONFIG;
    return '"' + "_FUNCTION_"+  oo + '"'; 
  }
  // date to string
  dateToString(data) {
    const oo = data || this.CONFIG;
    return '"' + "_DATE_" + oo + '"';
  }
  // RegExp to string
  regexpToString(data) {
    const oo = data || this.CONFIG;
    return '"' + "_REGEXP_" + oo + '"';
  }
  // long number to string
  longnumberToString(data){
    const oo = data || this.CONFIG;
    return '"' + "_LONGNUMBER_" + oo + '"';
  }

  // recursion data for deep stringing
  recursionData(data) {
    if (
      this.THIS_METH_KEY_SPECIAL.some(
        (it) =>
          `[object ${it.slice(2)}]` === Object.prototype.toString.call(data)
      )
    ) {
      // special datas
      return this.specialDataString(data, this.THIS_METH_KEY_SPECIAL);
    }
    //is number
    if(this.isLongNumber(data)){
      return this.specialDataString(data, ["isLongNumber"]);
    }
    // keep string data
    if (this.isString(data)) {
      return '"' + data + '"';
    }
    // do nothing data
    return data;
  }

  // special data types
  specialDataString(data, keys) {
    const oo = data || this.CONFIG;
    const thisMeth = keys || this.THIS_METH_KEY_SPECIAL;
    for (const meth of thisMeth) {
      if (this[meth] && this[meth](oo)) {
        const thisMethToStr = meth.slice(2).toLowerCase() + "ToString";
        return this[thisMethToStr]? this[thisMethToStr](oo): JSON.stringify(oo);
      }
    }
  }
  // no idea of the date type
  getString(data) {
    //
    const oo = data || this.CONFIG;
    if (this.hasToString(oo)) {
      return JSON.stringify(oo);
    }
    if (this.isNullOrUndefinde(oo)) {
      return String(oo);
    }
    // special data type
    return this.specialDataString(oo);
  }
}

module.exports = TOJSON;
