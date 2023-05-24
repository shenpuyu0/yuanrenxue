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
    defaultView: globalThis,
    ownerDocument: null,
    readyState: "complete",
    createElement: function (e) {
        console.log("CALL: document.createElement: ", e)
        return createProxy({
                nodeName: e.toUpperCase(),
                getAttribute: function getAttribute(e) {
                    console.log("getAttribute", e);
                    return this[e];
                },
                setAttribute:function(k, v){
                    console.log("CALL document.createElement > " + e.toUpperCase() + " > setAttribute");
                    if (v === "width: calc((1px))"){
                        v = "width: calc(1px);"
                    }
                    this[k] = v;
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
    },
    createDocumentFragment:function createDocumentFragment(){
        console.log("CALL document.createDocumentFragment");
        return createProxy({
            appendChild: function(){
                console.log("document.createDocumentFragment > appendChild");

            }
        }, "document.createDocumentFragment")
    }

}
globalThis.document = createProxy(doc, "document")


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

globalThis.navigator = createProxy({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
}, "navigator")

globalThis.window = globalThis;


exports.globalThis = globalThis


