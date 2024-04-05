function type(v) {
	if (Array.isArray(v)) return "array"
	if (v == null) return "null"
	return typeof v
}

function verbosify(source, template, preserveUnused=true, ret={}) {
	if (source == null) {
		console.warn("null found")
		return null
	}
	let sourceKeys = {}
	for (const [k, v] of Object.entries(template)) {
		if (type(v) == "object" || type(v) == "array") {
			if (k[0] != "$") throw TypeError("Only $ properties can use sub-templates")
			const nk = k.replace("$","")
			//console.log("DOING", nk)
			if (type(v) == "array") {
				//console.log("LIST")
				const sa = source[template[nk]]
				if (type(sa) == "array") {
					ret[nk] = []
					const len = sa.length
					for (let i = 0; i < len; i++) {
						//console.log("i",i)
						let cv = v[0]
						let fv = sa[i]
						if (fv != null && typeof fv !== "undefined") fv = verbosify(sa[i], cv, preserveUnused)
						ret[nk].push(fv)
					}
				} else {
					if (typeof sa !== "undefined") ret[nk] = sa
				}
				sourceKeys[template[nk]] = true
			} else {
				//console.log("STRUCT")
				ret[nk] = verbosify(source[template[nk]], v, preserveUnused)
				sourceKeys[template[nk]] = true
			}
		} else {
			if (typeof source[v] !== "undefined") ret[k] = source[v]
			sourceKeys[v] = true
		}
	}
	if (preserveUnused) {
		for (const k of Object.keys(source)) {
			if (!sourceKeys[k]) Object.defineProperty(ret, k, {
				writable: true,
				enumerable: false,
				value: source[k],
			})
		}
	}
	return ret
}

function deverbosify(source, template) {
	if (source == null) {
		console.warn("null found")
		return null
	}
	let ret = {}
	let sourceKeys = {}
	let isArray = true
	for (const [k, v] of Object.entries(template)) {
		if (typeof v === "object" && v != null) {
			if (k[0] != "$") throw TypeError("Only $ properties can use sub-templates")
			const nk = k.replace("$","")
			const id = template[nk]
			//console.log("DOING", nk)
			if (Array.isArray(v)) {
				//console.log("LIST")
				const sa = source[nk]
				if (type(sa) === "array") {
					ret[id] = []
					const len = sa.length
					for (let i = 0; i < len; i++) {
						//console.log("i",i)
						let cv = v[0]
						let fv = sa[i]
						if (fv != null && typeof fv !== "undefined") fv = deverbosify(fv, cv)
						ret[id].push(fv)
					}
				} else {
					if (typeof sa !== "undefined") ret[id] = sa
				}
				sourceKeys[k] = true
			} else {
				//console.log("STRUCT")
				ret[id] = deverbosify(source[nk], v)
				sourceKeys[k] = true
			}
		} else {
			if (typeof source[k] !== "undefined") ret[v] = source[k]
			sourceKeys[k] = true
			if (typeof v !== "number") isArray = false
		}
	}
	for (const [k, v] of forceEntries(source)) {
		if (!sourceKeys[k] && typeof v !== "function") {
			ret[k] = v
		}
	}
	if (isArray) {
		let obj = ret
		ret = []
		for (const [k, v] of Object.entries(obj)) {
			ret[k] = v
		}
	}
	return ret
}

function forceEntries(obj) {
	const keys = Object.getOwnPropertyNames(obj)
	const ret = []
	for (let i = 0; i < keys.length; i++) {
		ret.push([keys[i], obj[keys[i]]])
	}
	return ret
}

function searchV(obj, value, arrayform=false, path="") {
    let results = []
    for (const [k, v] of forceEntries(obj)) {
        const np = (path+"/"+k)
        if (typeof v === "object" && v != null) results.push(...searchV(v, value, arrayform, np))
        if (v === value) {
            if (arrayform) {
                const a = np.split("/")
                a.shift()
                results.push({[a]:v})
            } else results.push({[np]:v})
        }
    }
    return results
}
function searchK(obj, value, arrayform=false, path="") {
    let results = []
    for (const [k, v] of forceEntries(obj)) {
        const np = (path+"/"+k)
        if (typeof v === "object" && v != null) results.push(...searchK(v, value, arrayform, np))
        if (k === value) {
            if (arrayform) {
                const a = np.split("/")
                a.shift()
                results.push({[a]:v})
            } else results.push({[np]:v})
        }
    }
    return results
}