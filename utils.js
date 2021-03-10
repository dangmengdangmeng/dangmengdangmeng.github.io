var spineDemos = {
    HOVER_COLOR_INNER: new spine.Color(0.478, 0, 0, 0.25),
    HOVER_COLOR_OUTER: new spine.Color(1, 1, 1, 1),
    NON_HOVER_COLOR_INNER: new spine.Color(0.478, 0, 0, 0.5),
    NON_HOVER_COLOR_OUTER: new spine.Color(1, 0, 0, 0.8),
    assetManager: new spine.SharedAssetManager("assets/"),
    demos: [],
    loopRunning: false,
    canvases: []
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
    const string = msg.toLowerCase()
    const substring = "script error"
    if (string.indexOf(substring) > -1) {
        throw 'Script Error: See Browser Console for Detail'
    } else {
        throw [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ')
    }
};

(function () {
    const timeKeeper = new spine.TimeKeeper()
    let loopTimer = null
    const fps = 20

    function loop() {
        timeKeeper.update()

        const {demos} = spineDemos
        for (let i = 0; i < demos.length; i++) {
            const demo = demos[i]
            checkElementVisible(demo)
            renderDemo(demo)
        }
        if (!loopTimer) {
            loopTimer = setInterval(() => {
                loop()
            }, 1000 / fps)
        }
    }

    function renderDemo(demo) {
        const {canvas, visible, placeholder} = demo
        if (!spineDemos.assetManager.isLoadingComplete(demo.DEMO_NAME)) {
            if (visible) {
                if (canvas.parentElement !== placeholder) {
                    placeholder.appendChild(canvas)
                }
                demo.loadingScreen.draw()
            }
        } else {
            if (!demo.loaded) {
                demo.loadingComplete()
                demo.loaded = true
            }

            if (visible) {
                if (canvas.parentElement !== placeholder) {
                    placeholder.appendChild(canvas)
                }
                demo.render()
                demo.loadingScreen.draw(true)
            }
        }
    }

    function checkElementVisible(demo) {
        const rect = demo.placeholder.getBoundingClientRect()
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth)
        const vertInView = (rect.top <= windowHeight * 1.1) && ((rect.top + rect.height) >= windowHeight * -0.1)
        const horInView = (rect.left <= windowWidth * 1.1) && ((rect.left + rect.width) >= windowWidth * -0.1)
        demo.visible = (vertInView && horInView)
    }

    function createCanvases(numCanvases) {
        for (let i = 0; i < numCanvases; i++) {
            const canvas = document.createElement("canvas")
            canvas.width = 1
            canvas.height = 1
            canvas.ctx = new spine.webgl.ManagedWebGLRenderingContext(canvas, {alpha: true})
            canvas.id = "canvas-" + i
            spineDemos.canvases.push(canvas)
        }
    }

    spineDemos.init = function () {
        const numCanvases = 1
        createCanvases(numCanvases)
        loop()
    }

    spineDemos.addDemo = function (demo, placeholder) {
        const canvas = spineDemos.canvases[spineDemos.demos.length % spineDemos.canvases.length]
        demo(canvas)
        demo.placeholder = placeholder
        demo.canvas = canvas
        demo.visible = false
        const renderer = new spine.webgl.SceneRenderer(canvas, canvas.ctx.gl)
        demo.loadingScreen = new spine.webgl.LoadingScreen(renderer)
        spineDemos.demos.push(demo)
    }
})()
