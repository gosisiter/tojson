## tojson
1. 将数据转化为json格式
2. 特点： 可以转化function、object、array
3. 深层次迭代转化

### 示例

1. Array

```javascript
	const arr = [1,'2','my array']
	const tojson = new TOJSON()
	const arrJson = tojson.getString(arr)
	// arrJson => "[1,'2','my array']"
```

2. Object

```javascript
	const obj = {k1:'big'}
	const tojson = new TOJSON()
	const objJson = tojson.getString(obj)
	// objJson => "{k1:'big'}"
	
	const deepObj = {k1:'deep', child:[{k2:'level2'}]}
	//deepObjJson => "{k1:'deep', child:[{k2:'level2'}]}"
	
```

3. function

```javascript
	const func = function(){console.log('func':'it's me')}
	const tojson = new TOJSON()
	const funcJson = tojson.functionToString(func)
	// funcJson => "function(){console.log('func':'it's me')}"
	
```







