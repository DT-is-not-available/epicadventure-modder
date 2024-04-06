void function() {

    let project

    Result = document.getElementById("result")

    const gameTitle = document.getElementById("gameTitle")
    gameTitle.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[1].layers[1].instances[0].instanceVariables[0].value = gameTitle.value.toUpperCase()
        project.layouts[1].layers[1].instances[1].instanceVariables[0].value = gameTitle.value
    })

    const gameTitleAbove = document.getElementById("gameTitleAbove")
    gameTitleAbove.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[1].layers[1].instances[2].pluginProperties[3] = gameTitleAbove.value
    })

    const gameTitleBelow = document.getElementById("gameTitleBelow")
    gameTitleBelow.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[1].layers[1].instances[4].pluginProperties[3] = gameTitleBelow.value
    })

    const gameTitleBelowShadow = document.getElementById("gameTitleBelowShadow")
    gameTitleBelowShadow.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[1].layers[1].instances[3].pluginProperties[3] = gameTitleBelowShadow.value
    })

    const startingLayout = document.getElementById("Starting Layout")
    startingLayout.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.startingLayout = startingLayout.value
    })

    const width = document.getElementById("width")
    width.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.viewportWidth = width.value
    })

    const height = document.getElementById("height")
    height.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.viewportHeight = height.value
    })

    const shop1 = document.getElementById("shop1")
    shop1.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[4].layers[0].instances[5].instanceVariables[0].value = shop1.innerText.replace(/\n/g, ";");
    })

    const shop1talk = document.getElementById("shop1talk")
    shop1talk.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[4].layers[0].instances[4].instanceVariables[0].value = shop1talk.value
    })

    const shop2 = document.getElementById("shop2")
    shop2.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[5].layers[0].instances[5].instanceVariables[0].value = shop2.innerText.replace(/\n/g, ";");
    })

    const shop2talk = document.getElementById("shop2talk")
    shop2talk.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[5].layers[0].instances[4].instanceVariables[0].value = shop2talk.value
    })

    const shop3 = document.getElementById("shop3")
    shop3.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[6].layers[0].instances[5].instanceVariables[0] = shop3.innerText.replace(/\n/g, ";");
    })

    const shop3talk = document.getElementById("shop3talk")
    shop3talk.addEventListener('change', function(){
        document.getElementById("result").innerText = "please recompile"
        project.layouts[6].layers[0].instances[4].instanceVariables[0] = shop3talk.value
    })
    function playMod() {
        document.getElementById('result').innerText = JSON.stringify({project:deverbosify(project, projectTemplate)})
    }
    window.playMod = playMod

    window.oldeditorHandler = function(p) {
        if (p) {
            project = p
            window.project = p
        }
        gameTitle.value = project.layouts[1].layers[1].instances[0].instanceVariables[0].value
        gameTitle.value = project.layouts[1].layers[1].instances[1].instanceVariables[0].value
        gameTitleAbove.value = project.layouts[1].layers[1].instances[2].pluginProperties[3]
        gameTitleBelow.value = project.layouts[1].layers[1].instances[4].pluginProperties[3]
        gameTitleBelowShadow.value = project.layouts[1].layers[1].instances[3].pluginProperties[3]
        startingLayout.value = project.startingLayout
        width.value = project.viewportWidth
        height.value = project.viewportHeight
        shop1.innerText = project.layouts[4].layers[0].instances[5].instanceVariables[0].value.replace(/;/g, "\n")
        shop1talk.value = project.layouts[4].layers[0].instances[4].instanceVariables[0].value
        shop2.innerText = project.layouts[5].layers[0].instances[5].instanceVariables[0].value.replace(/;/g, "\n")
        shop2talk.value = project.layouts[5].layers[0].instances[4].instanceVariables[0].value
        shop3.innerText = project.layouts[6].layers[0].instances[5].instanceVariables[0].value.replace(/;/g, "\n")
        shop3talk.value = project.layouts[6].layers[0].instances[4].instanceVariables[0].value
    }

} ()