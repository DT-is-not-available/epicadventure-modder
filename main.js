let data
let project

let events = []

events.push({ // todo: the fuck is going on here
	type: 0,
	includedEventSheet: 1,
	variableName: 1,
	or: 2,
	isString: 2,
	defaultValue: 3,
	SID: 4,
	conditions: 5,
	actions: 6,
	var_SID: 6,
	$actions: [{
		objectType: 0,
		action: 1,
		SID: 3,
		arguments: 5,
		$arguments: [{
			argument: 1,
		}],
	}],
	subEvents: 7,
	$subEvents: events,
})

const effect = {
	id: 0,
	name: 1,
	params: 2,
}

const instance = {
	commonProperties: 0,
	$commonProperties: {
		x: 0,
		y: 1,
		z: 2,
		width: 3,
		height: 4,
		depth: 5,
		angle: 6,
		opacity: 7,
		hotspotX: 8,
		hotspotY: 9,
		blendMode: 10,
		effectFallback: 11,
		effects: 12,
		$effects: [effect],
	},
	objectType: 1,
	UID: 2,
	instanceVariables: 3,
	$instanceVariables: [{
		value: 0,
		name: 1,
	}],
	behaviorProperties: 4,
	pluginProperties: 5,
}

let projectTemplate = {
	name: 0,
	startingLayout: 1,
	plugins: 2,
	$plugins: [{
		id: 0,
		singleGlobal: 1,
		isWorld: 2,
		canPosition: 3,
		canResize: 4,
		canRotate: 5,
		hasAppearance: 6,
		hasZOrder: 7,
		hasEffects: 8,
		mustPredraw: 9,
	}],
	objects: 3,
	$objects: [{
		name: 0,
		plugin: 1,
		isFamily: 2,
		instanceVarSIDs: 3,
		behaviorCount: 4,
		effectCount: 5,
		texture: 6,
		$texture: {
			textureUrl: 0,
			textureFilesize: 1,
			pixelFormat: 2,
		},
		animations: 7,
		$animations: [{
			name: 0,
			speed: 1,
			loop: 2,
			repeatCount: 3,
			repeatTo: 4,
			pingPong: 5,
			SID: 6,
			frames: 7,
			$frames: [{
				textureUrl: 0,
				textureFilesize: 1,
				sourceX: 2,
				sourceY: 3,
				width: 4,
				height: 5,
				frameLength: 6,
				hotspotX: 7,
				hotspotY: 8,
				imagePoints: 9,
				collisionPoints: 10,
				pixelFormat: 11,
			}],
		}],
		behaviors: 8,
		$behaviors: [{
			name: 0,
			behaviorType: 1,
			SID: 2,
		}],
		isGlobal: 9,
		isOnLoaderLayout: 10,
		SID: 11,
		effects: 12,
		$effects: [effect],
		tilePolyData: 13,

	}],
	families: 4,
	$families: [{
		familyType: 0,
	}],
	layouts: 5,
	$layouts: [{
		name: 0,
		width: 1,
		height: 2,
		unboundedScrolling: 3,
		eventSheet: 4,
		SID: 5,
		layers: 6,
		$layers: [{
			name: 0,
			index: 1,
			SID: 2,
			visible: 3,
			backgroundColor: 4,
			transparentBackground: 5,
			paralaxX: 6,
			paralaxY: 7,
			opacity: 8,
			forceOwnTexture: 9,
			useRenderCells: 10,
			zoomRate: 11,
			blendMode: 12,
			effectFallback: 13,
			instances: 14,
			$instances: [instance],
			effects: 15,
			$effects: [effect],
		}],
		nonworldInstances: 7,
		$nonworldInstanes: [instance],
		effects: 8,
		$effects: [effect],

	}],
	eventSheets: 6,
    $eventSheets: [{
        name: 0,
        events: 1,
        $events: events,
    }],
	soundsToPreload: 7,
	$soundsToPreload: [{
		filename: 0,
		halfSize: 1,
	}],
	mediaPath: 8,
	pixelRounding: 9,
	viewportWidth: 10,
	viewportHeight: 11,
	fullscreenScaling: 12,
	enableWebGL: 13,
	linearSampling: 14,
	clearBackground: 15,
	version: 16,
	useHighDpi: 17,
	usesLoaderLayout: 18,
	loaderStyle: 19,
	orientation: 20,
	nextUID: 21,
	pauseOnBlur: 22,
	highQualityFullscreenScaling: 23,
	downscalingQuality: 24,
	preloadSounds: 25,
	projectName: 26,
	frontToBackRenderer: 27,
	containers: 28,
}

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

async function openDataFromURL(url, preserveUnused=false) {
	return new Promise(resolve => {
		fetch(url).then(res => res.json()).then(data => {
            resolve(verbosify(data.project, projectTemplate, preserveUnused))
        })
	})
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

function load() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText)
			project = verbosify(data.project, projectTemplate, true)
		}
	}
	xhttp.open("GET", "./play/data.js", true)
	xhttp.send()

	Result = document.getElementById("result")
	
	gameTitle = document.getElementById("gameTitle")
	gameTitle.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].instances[0].instanceVariables[0][0] = gameTitle.value.toUpperCase()
		project.layouts[1].layers[1].instances[1].instanceVariables[0][0] = gameTitle.value
	})
	
	gameTitleAbove = document.getElementById("gameTitleAbove")
	gameTitleAbove.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].instances[2].pluginProperties[3] = gameTitleAbove.value
	})
	
	gameTitleBelow = document.getElementById("gameTitleBelow")
	gameTitleBelow.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].instances[4].pluginProperties[3] = gameTitleBelow.value
	})
	
	gameTitleBelow = document.getElementById("gameTitleBelowShadow")
	gameTitleBelow.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].instances[3].pluginProperties[3] = gameTitleBelow.value
	})
	
	startingLayout = document.getElementById("Starting Layout")
	startingLayout.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.startingLayout = startingLayout.value
	})
	
	width = document.getElementById("width")
	width.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.viewportWidth = width.value
	})
	
	height = document.getElementById("height")
	height.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.viewportHeight = height.value
	})
	
	shop1 = document.getElementById("shop1")
	shop1.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[4].layers[0].instances[5].instanceVariables[0][0] = shop1.value.replace(/\n/g, ";");
	})
	
	shop1talk = document.getElementById("shop1talk")
	shop1talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[4].layers[0].instances[4].instanceVariables[0][0] = shop1talk.value
	})
	
	shop2 = document.getElementById("shop2")
	shop2.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[5].layers[0].instances[5].instanceVariables[0][0] = shop2.value.replace(/\n/g, ";");
	})
	
	shop2talk = document.getElementById("shop2talk")
	shop2talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[5].layers[0].instances[4].instanceVariables[0][0] = shop2talk.value
	})
	
	shop3 = document.getElementById("shop3")
	shop3.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[6].layers[0].instances[5].instanceVariables[0] = shop3.value.replace(/\n/g, ";");
	})
	
	shop3talk = document.getElementById("shop3talk")
	shop3talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[6].layers[0].instances[4].instanceVariables[0] = shop3talk.value
	})
}
function playMod() {
	document.getElementById("result").innerText = JSON.stringify({project:deverbosify(project, projectTemplate)})
}
window.onload = load
