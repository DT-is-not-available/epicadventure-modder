void async function() {

	async function openData(url, preserveUnused=false) {
		return new Promise(resolve => {
			fetch(url).then(res => res.json()).then(data => {
				let project = verbosify(data.project, projectTemplate, preserveUnused)
				resolve(project)
			})
		})
	}

	let project = await openData("./play/data.js", true)

	function type(v) {
		if (Array.isArray(v)) return "array"
		if (v == null) return "null"
		return typeof v
	}

	const pathinp = document.getElementById("path")
	pathinp.addEventListener("input", autoBuildTree)

	autoBuildTree()

	function autoBuildTree() {
		if (pathinp.value.length == 0) {
			buildTree(project, document.getElementById("window"))
		} else {
			const path = pathinp.value.replace(/^\./,"").split(".")
			let current = project
			let parent = project
			try {
				for (let i = 0; i < path.length; i++) {
					parent = current
					current = current[path[i]]
				}
				if (typeof current !== "object") {
					if (typeof current == "undefined") {
						document.getElementById("window").innerText = "That path is invalid"
					} else {
						document.getElementById("window").innerText = "That path points to a "+(typeof current)+", go up a layer"
					}
				} else {
					buildTree(current, document.getElementById("window"))
					const upval = document.createElement("button")
					upval.classList.add("upval")
					upval.addEventListener("click", function() {
						pathinp.value = pathinp.value.replace(/\.?\w+$/, "")
						autoBuildTree()
					})
					upval.innerText = "Go up a layer (go back)"
					document.getElementById("window").prepend(upval)
				}
			} catch (e) {
				document.getElementById("window").innerText = "That path is invalid"
			}
		}
	}

	function reseizeTextArea(inp) {
		inp.style.height = '0px';
		inp.style.height = (inp.scrollHeight) + "px";
	}

	function buildTree(obj, outer) {
		outer.innerHTML = ""
		for (const [k, v] of Object.entries(obj)) {
			const wrapper = document.createElement("div")
			wrapper.classList.add("row")
			wrapper.append(document.createTextNode(k+":"))
			switch (type(v)) {
				case "boolean": {
					const inp = document.createElement("input")
					inp.type = "checkbox"
					wrapper.append(inp)
					inp.addEventListener("input", function() {
						obj[k] = inp.checked
					})
					inp.checked = v
				} break;
				case "number": {
					const inp = document.createElement("input")
					inp.type = "number"
					wrapper.append(inp)
					inp.addEventListener("input", function() {
						obj[k] = parseFloat(inp.value)
					})
					inp.value = v
				} break;
				case "string": {
					const inp = document.createElement("textarea")
					inp.classList.add("inp")
					wrapper.append(inp)
					inp.addEventListener("input", function() {
						reseizeTextArea(inp)
						obj[k] = inp.value
					})
					requestAnimationFrame(()=>reseizeTextArea(inp))
					inp.value = v
				} break;
				case "null": {
					const inp = document.createElement("strong")
					inp.innerText = "null"
					wrapper.append(inp)
				} break;
				case "object": {
					const inp = document.createElement("button")
					inp.innerText = "{...}"
					inp.addEventListener("click", function() {
						pathinp.value += "."+k
						autoBuildTree()
					})
					wrapper.append(inp)
				} break;
				case "array": {
					const inp = document.createElement("button")
					inp.innerText = "["+v.length+"]"
					inp.addEventListener("click", function() {
						pathinp.value += "."+k
						autoBuildTree()
					})
					wrapper.append(inp)
				} break;
			}
			outer.append(wrapper)
		}
	}

	window.copyMod = function() {
		navigator.clipboard.writeText(JSON.stringify({project:deverbosify(project, projectTemplate)}))
		alert("Copied!")
	}

	window.pasteMod = function() {
		let p = prompt("Input valid data.js data")
		try {
			project = verbosify(JSON.parse(p).project, projectTemplate, true)
			pathinp.value = ""
			autoBuildTree()
		} catch(e) {
			console.error(e)
			alert("Invalid data, did not load")
		}
	}

} ()