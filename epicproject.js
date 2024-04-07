class EpicProject {
    constructor(data) {
        this.sids = []
        this.name = data.project[0]
        this.startingLayout = data.project[1]
        this.plugins = EpicList.from(data.project[2], m => new EpicPlugin(m, this))
        this.objects = EpicList.from(data.project[3])
        this.families = EpicList.from(data.project[4])
        this.layouts = EpicList.from(data.project[5])
        this.eventSheets = EpicList.from(data.project[6])
        this.soundsToPreload = EpicList.from(data.project[7])
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
        this.loaderStyle = data.project[19]
        this.orientation = data.project[20]
        this.nextUID = data.project[21]
        this.pauseOnBlur = data.project[22]
        this.highQualityFullscreenScaling = data.project[23]
        this.downscalingQuality = data.project[24]
        this.preloadSounds = data.project[25]
        this.projectName = data.project[26]
        this.frontToBackRenderer = data.project[27]
        this.containers = EpicList.from(data.project[28])
    }
    flatten() {
        return {
            annotations: this.annotations,
            project: [
                this.name, this.startingLayout, this.plugins.flatten()
            ]
        }
    }
    generateSID() {
        let SID
        do {
            SID = Math.floor(Math.random()*900000000000000)+100000000000000
        } while (this.sids.includes(SID))
        this.sids.push(SID)
        return SID
    }
}

class EpicList extends Array {
    flatten() {
        let ret = []
        for (let i = 0; i < this.length; i++) {
            ret.push(this[i].flatten())
        }
        return ret
    }
    static from(arr, cb = e => e) {
        const n = new EpicList
        for (let i = 0; i < arr.length; i++) {
            n.push(cb(arr[i], i, arr))
        }
        return n
    }
}

class EpicPlugin {
    constructor(m, project) {

    }
}