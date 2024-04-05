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