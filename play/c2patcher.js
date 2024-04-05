void async function(self) {

    async function wait(s) {
        return new Promise(resolve => {
            setTimeout(resolve, s*1000)
        })
    }
    
    async function waitFor(cond, timeout) {
        return new Promise(resolve => {
            let i
            i = setInterval(()=>{
                if (cond()) resolve(clearInterval(i))
            }, timeout)
        })
    }

    // config screen
    const textscreen = document.createElement("pre")
    textscreen.style = `
    position: fixed;
    z-index: 99999;
    background: black;
    font-size: 2em;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    padding: 20px;
    `
    textscreen.innerText = "Fetching and patching c2runtime.js..."
    document.body.append(textscreen)

    const enum0 = {
        [Symbol.iterator]: function* () {
            let i = 0
            while (true) {
                yield i++
            }
        }
    }

    const enum1 = {
        [Symbol.iterator]: function* () {
            let i = 0
            while (true) {
                yield i++
            }
        }
    }

    const [none, url, object, ask] = enum0

    // configuration (eventually will be customizable)
    let config = {
        runtimePath: "c2runtime.js",
        override: ask,
        url: "data.js",
        object: {},
        mutate: null,
    }

    let urlData = null

    // get the file
    const res = await fetch(config.runtimePath)
    let js = await res.text()

    if (config.override == url) {
        // pre get data
        textscreen.innerText = "Fetching data.js..."
        const res = await fetch(config.url)
        urlData = await res.json()
    }

    // project getter
    function projectGetter(vanillaData) {
        let data
        switch (config.override) {
            case url:
                data = urlData
            break;
            case object:
                data = config.object
            break;
            case ask:
                try {
                    data = JSON.parse(prompt("Please input data.js contents:")) || vanillaData
                    break;
                } catch (e) {
                    alert("Invalid JSON! Defaulting to vanilla...")
                }
            default:
                data = vanillaData
            break;
        }
        // for now, trust that it is a valid data object
        if (config.mutate) {
            for (const [k, v] of Object.entries(config.mutate)) {
                const path = k.split(".")
                let current = data
                let parent = data
                for (let i = 0; i < path.length - 1; i++) {
                    parent = current
                    current = current[path[i]]
                }
                if (path.at(-1) == "@push") {
                    current.push(v)
                } else if (path.at(-1) == "@delete") {
                    delete current[v]
                } else {
                    current[path.at(-1)] = v
                }
            }
        }
        return data.project
    }
    
    // patch it to use projectGetter
    js = js.replace(/(\w+)\s*=\s*\w+\.project/gm, "$1=projectGetter($1)")

    // expose projectGetter so c2runtime can access it
    window.projectGetter = projectGetter
    
    // add it to the page
    const script = document.createElement("script")
    script.id = "modifiedRuntime"
    script.innerHTML = js
    document.body.append(script)

    // hide config screen
    textscreen.remove()

    // await waitFor(()=>Object.hasOwnProperty(window, "cr_createRuntime"), 100)

    // fuck off
    // cr_createRuntime("c2canvas")

    requestAnimationFrame(()=>cr_createRuntime("c2canvas"))

    self.remove()

} (document.currentScript)
