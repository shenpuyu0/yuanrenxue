RegExp.prototype.test = function () {
    return true
}

function createProxy(obj, targetTag) {
    return new Proxy(obj, {
        get(target, prop) {
            console.log("PROXY GET: ", targetTag, prop);
            return Reflect.get(...arguments)
        },
        set(target, prop, value) {
            console.log("PROXY SET: ", targetTag, prop, " ==> ", value);
            return Reflect.set(...arguments)
        },
    })
}

window = globalThis;
let doc = {
    addEventListener: function () {
        console.log("document.addEventListener")
    },
    documentElement: createProxy({
        style: createProxy({
            transform: ""
        }, "document.documentElement.style"),
        nodeName: "HTML",

    }, "document.documentElement"),
    childNodes: [],
    nodeType: 9,
    defaultView: window,
    ownerDocument: null,
    createElement: function (e) {
        console.log("CALL: document.createElement: ", e)
        return createProxy({
                nodeName: e.toUpperCase(),
                getAttribute: function getAttribute(e) {
                    console.log("getAttribute", e);
                    return this[e]
                },
                parentNode: createProxy({
                    removeChild: function(){
                        console.log("document.createElement > " + e.toUpperCase() + " > parentNode" + " > removeChild")
                    }
                }, "document.createElement > " + e.toUpperCase() + " > parentNode")
            }
            , "document.createElement > " + e.toUpperCase())
    },
    matches: function matches() {
        console.log("CALL: document.matches")
    },
    appendChild: function(e){
        return createProxy({}, "document.appendChild > " + e.nodeName)
    },
    querySelectorAll:function(e){
        return createProxy({}, "document.querySelectorAll > " + e)
    }

}
window.document = createProxy(doc, "document")


globalThis.deleteNodeEnv = function deleteNodeEnv() {
    delete global;
    delete process;
    delete setImmediate;
    delete Buffer;

    // 虽然返回undefined，但变量还存在
    exports = undefined;
    module = undefined;
    require = undefined;
}

globalThis = createProxy({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
}, "navigator")

exports.globalThis = globalThis


