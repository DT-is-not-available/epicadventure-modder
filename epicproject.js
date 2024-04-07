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

class C2Project {
    #sids
    constructor(data) {
        this.#sids = []
        this.name = data.project[0]
        this.plugins = C2List.from(data.project[2], m => new C2Plugin(m, this))
        this.objects = C2List.from(data.project[3], m => new C2Object(m, this))
        this.families = C2List.from(data.project[4], m => new C2Family(m, this))
        this.layouts = C2List.from(data.project[5])
        this.startingLayout = new C2NameOf(this.layouts, data.project[1])
        this.eventSheets = C2List.from(data.project[6])
        this.soundsToPreload = C2List.from(data.project[7])
        this.mediaPath = data.project[8]
        this.pixelRounding = data.project[9]
        this.viewportWidth = data.project[10]
        this.viewportHeight = data.project[11]
        this.fullscreenScaling = data.project[12]
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
    addSID(v) {
        this.#sids.push(v)
    }
    flatten() {
        return {
            annotations: this.annotations,
            project: [
                this.name, this.startingLayout.flatten(), this.plugins.flatten(),
                this.objects.flatten(), this.families.flatten(),
                this.layouts.flatten(), this.eventSheets.flatten(),
                this.soundsToPreload.flatten(), 
            ]
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
            ret.push(this[i].flatten())
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
        this.animations = m[7]
        this.behaviors = m[8]
        this.isGlobal = m[9]
        this.isOnLoaderLayout = m[10]
        this.SID = m[11]
        this.effects = m[12]
        this.tilePolyData = m[13]
        project.addSID(this.SID)
    }
    toString() {
        return "Object: "+this.name
    }
    flatten() {
        return [
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
            this.tilePolyData
        ]
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