class C2IndexOf {
    constructor(list, index) {
        this.list = list
        this.value = list[index]
    }
    flatten() {
        return this.list.indexOf(this.value)
    }
}

class C2NameOf {
    constructor(list, name) {
        this.list = list
        this.value = list.find(e=>e.name==name)
    }
    flatten() {
        return this.value.name
    }
}

class C2Name extends String {}

class C2Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class C2Project {
    #sids
    #path
    #annotations
    constructor(data, path) {
        this.#path = path || data.path
        this.#annotations = data.annotations || {}
        this.#sids = []
        this.name = data.project[0]
        this.plugins = C2List.from(data.project[2], m => new C2Plugin(m, this))
        this.objects = C2List.from(data.project[3], m => new C2Object(m, this))
        this.families = C2List.from(data.project[4], m => new C2Family(m, this))
        this.layouts = C2List.from(data.project[5])
        // this.startingLayout = new C2NameOf(this.layouts, data.project[1])
        this.startingLayout = data.project[1]
        this.eventSheets = C2List.from(data.project[6])
        this.soundsToPreload = C2List.from(data.project[7])
        this.mediaPath = data.project[8]
        this.pixelRounding = data.project[9]
        this.viewportSize = new C2Point(data.project[10], data.project[11])
        this.fullscreenInBrowser = new C2IndexOf(["Off", "Crop", "Scale inner", "Scale outer", "Letterbox scale", "Integer letterbox scale"], data.project[12])
        this.enableWebGL = data.project[13]
        this.linearSampling = data.project[14]
        this.clearBackground = data.project[15]
        this.version = data.project[16]
        this.useHighDpi = data.project[17]
        this.usesLoaderLayout = data.project[18]
        this.loaderStyle = new C2IndexOf(["Progress bar & Logo", "Progress bar only", "Percentage text", "Nothing (not recommended)", "Construct 2 splash"], data.project[19])
        this.orientations = new C2IndexOf(["Any", "Portrait", "Landscape"], data.project[20])
        this.nextUID = data.project[21]
        this.pauseOnBlur = data.project[22]
        this.highQualityFullscreenScaling = data.project[23]
        this.downscalingQuality = new C2IndexOf(["Low Quality", "Medium Quality", "High Quality"], data.project[24])
        this.preloadSounds = data.project[25]
        this.projectName = data.project[26]
        this.frontToBackRenderer = new C2IndexOf(["Disabled", "Enabled"], data.project[27])
        this.containers = C2List.from(data.project[28])
    }
    resolve(url) {
        return this.#path.replace(/data\.js(?:on)?$/, url)
    }
    addSID(v) {
        this.#sids.push(v)
    }
    static flattenAll(o) {
        const r = []
        for (let i = 0; i < o.length; i++) {
            let e = o[i]
            if (e != null && e.flatten) {
                e = e.flatten()
            }
            if (Array.isArray(e)) {
                r.push(C2Project.flattenAll(e))
            } else {
                r.push(e)
            }
        }
        return r
    }
    flatten() {
        return {
            annotations: this.#annotations,
            project: C2Project.flattenAll([
                this.name,
                this.startingLayout,
                this.plugins,
                this.objects,
                this.families,
                this.layouts,
                this.eventSheets,
                this.soundsToPreload,
                this.mediaPath,
                this.pixelRounding,
                this.viewportSize.x,
                this.viewportSize.y,
                this.fullscreenInBrowser,
                this.enableWebGL,
                this.linearSampling,
                this.clearBackground,
                this.version,
                this.useHighDpi,
                this.usesLoaderLayout,
                this.loaderStyle,
                this.orientations,
                this.nextUID,
                this.pauseOnBlur,
                this.highQualityFullscreenScaling,
                this.downscalingQuality,
                this.preloadSounds,
                this.projectName,
                this.frontToBackRenderer,
                this.containers
            ]),
            path: this.#path
        }
    }
    generateSID() {
        let SID
        do {
            SID = Math.floor(Math.random()*900000000000000)+100000000000000
        } while (this.#sids.includes(SID))
        this.#sids.push(SID)
        return SID
    }
}

class C2List extends Array {
    flatten() {
        let ret = []
        for (let i = 0; i < this.length; i++) {
            let el = this[i]
            if (el != null && Object.hasOwn(el, "flatten")) el = el.flatten()
            ret.push(el)
        }
        return ret
    }
    static from(arr, cb = e => e) {
        const n = new C2List
        for (let i = 0; i < arr.length; i++) {
            n.push(cb(arr[i], i, arr))
        }
        return n
    }
}

class C2Plugin {
    #project
    constructor(m, project) {
        this.#project = project
        this.id = m[0]
        this.singleGlobal = m[1]
        this.isWorld = m[2]
        this.canPosition = m[3]
        this.canResize = m[4]
        this.canRotate = m[5]
        this.hasAppearance = m[6]
        this.hasZOrder = m[7]
        this.hasEffects = m[8]
        this.mustPredraw = m[9]
    }
    toString() {
        return "Plugin: "+this.id
    }
    flatten() {
        return [
            this.id,
            this.singleGlobal,
            this.isWorld,
            this.canPosition,
            this.canResize,
            this.canRotate,
            this.hasAppearance,
            this.hasZOrder,
            this.hasEffects,
            this.mustPredraw
        ]
    }
}

class C2Object {
    #project
    constructor(m, project) {
        this.#project = project
        this.name = m[0]
        this.plugin = new C2IndexOf(project.plugins, m[1])
        this.isFamily = m[2]
        this.instanceVarSIDs = m[3]
        this.texture = m[6]
        if (this.texture) {
            this.texture = new C2Texture(this.texture, project)
        }
        this.animations = m[7]
        this.behaviors = m[8]
        this.isGlobal = m[9]
        this.isOnLoaderLayout = m[10]
        this.SID = m[11]
        this.effects = m[12]
        this.tilePolyData = m[13]
        this.globalProperties = m[14]
        project.addSID(this.SID)
        this.instanceVarSIDs.forEach(e=>project.addSID(e))
    }
    toString() {
        return "Object: "+this.name
    }
    flatten() {
        const obj = [
            this.name,
            this.plugin,
            this.isFamily,
            this.instanceVarSIDs,
            this.behaviors.length,
            this.effects.length,
            this.texture,
            this.animations,
            this.behaviors,
            this.isGlobal,
            this.isOnLoaderLayout,
            this.SID,
            this.effects,
            this.tilePolyData,
        ]
        if (this.globalProperties) obj.push(this.globalProperties)
        return obj
    }
}

class C2Texture {
    #project
    constructor(m, project) {
        this.#project = project
        this.url = m[0]
        this.size = m[1]
        this.format = m[2]
    }
    toString() {
        return "Texture: "+this.url
    }
    flatten() {
        return [this.url, this.size, this.format]
    }
}

class C2Family {
    #project
    constructor(m, project) {
        this.#project = project
        const [objid, ...members] = m
        this.object = new C2IndexOf(project.objects, objid)
        this.members = C2List.from(members, e => new C2IndexOf(project.objects, e))
    }
    toString() {
        return "Family: "+this.object.value.name
    }
    flatten() {
        return [
            this.object,
            ...this.members.flatten()
        ]
    }
}