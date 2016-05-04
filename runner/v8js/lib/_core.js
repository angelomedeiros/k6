speedboat = {
	_modules: {},
	_require: {},
	_data: {},
};

speedboat._require.float64 = function(v) {
	out = parseFloat(v);
	if (isNaN(out)) {
		throw new Error("not a float: " + v);
	}
	return out
}
speedboat._require.float32 = speedboat._require.float64

speedboat._require.int = function(v) {
	out = parseInt(v);
	if (isNaN(out)) {
		throw new Error("not an int: " + v);
	}
	return out
}

speedboat._require.string = function(v) {
	return (v || "").toString();
}

speedboat._require.interface = function(v) {
	return v;
}

speedboat._require.struct = function(spec, v) {
	for (key in Object.keys(v)) {
		v[key] = speedboat._require[spec[v]];
	}
	return v;
}

speedboat._invoke = function(mod, fn, args, async) {
	var send = async ? $send : $sendSync
	var res = send(JSON.stringify({ m: mod, f: fn, a: args }));
	if (res) {
		var obj = JSON.parse(res);
		if (obj._error) {
			throw new Error(obj._error);
		}
		return obj;
	}
}

$recvSync(function(raw) {
	if (raw == 'run') {
		__run__();
	}
});