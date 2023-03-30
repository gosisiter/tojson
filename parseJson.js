class PARSEJSON {
  CONFIG;
  THIS_METH_KEY_SPECIAL = ["FUNCTION","DATE","REGEXP", "LONGNUMBER"];
  constructor(conf) {
    this.CONFIG = conf;
  }
  isJson(data) {
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      return false;
    }
  }
  hasSingleQuotes(data) {
    const has = data.match("'");
    return !!has?.length;
  }

  mkValidJSONString(invalid) {
    let jo = invalid;
    if (this.hasSingleQuotes(jo)) {
      jo = this.transQuotes(jo);
    }

    return jo;
  }
  transQuotes(invalid) {
    return invalid.replace(/'/g, '"');
  }
  mkDate(data) {
    return new Date(data);
  }
  mkRegexp(data) {
    const s = data.indexOf('/')
    const e = data.lastIndexOf('/')
    const bodyStr = data.slice(s+1, e)
    const conStr = data.slice(e+1)
    return new RegExp(bodyStr, conStr);
  }
  mkFunction(funcStr) {
    const af = new Function(`return ${funcStr}`);
    if (typeof af === "function") {
      return af();
    }
    return new Function();
  }
  mkLongnumber(data){
    return Number(data)
  }
  _searchData(data) {
    for (const key in data) {
      data[key] = this._recursionData(data[key]);
    }
    return data;
  }
  _recursionData(data) {
    let dataT = Object.prototype.toString.call(data);
    // search data
    if (dataT === "[object Object]" || dataT === "[object Array]") {
      return this._searchData(data);
    }
    // special data
    if (dataT === "[object String]" && this.THIS_METH_KEY_SPECIAL.some(key=>{
      if(data.indexOf(`_${key}_`)>-1){
        dataT = key
        return true
      }
      return false
    })) {
      const meth = `mk${dataT.charAt(0)}${dataT.slice(1).toLowerCase()}`
      const idx = `_${dataT}_`.length
      return this[meth]?this[meth](data.slice(idx)):data;
    }
    // normal
    return data;
  }
  get(data) {
    let jo = data;
    if (typeof jo === "string") {
      jo = this.isJson(jo);
      if (jo === false) {
        jo = JSON.parse(this.mkValidJSONString(data));
      }
    }
    return this._recursionData(jo);
  }

  parse(data) {
    const jo = data || this.CONFIG.data;
    const is = this.isJson(jo);
    return this.get(is);
  }
}

module.exports = PARSEJSON;