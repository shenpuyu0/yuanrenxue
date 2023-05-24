
const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
globalThis.generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./input/sourceCode.js";
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./output/decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

function A11() {
    // console.debug("called: A12");
    var aG = d || 8;
    for (; ;) if (aG < 8) {
        if (aG < 4) {
            if (aG < 2) {
                if (aG < 1) {
                    aG += (aH[aI](aO), 6);
                } else {
                    aI = "pop", aG += 6;
                }
            } else {
                if (aG < 3) {
                    aG += (aH = a1, 7);
                } else {
                    aG += (aJ = a1, 10);
                }
            }
        } else {
            if (aG < 6) {
                if (aG < 5) {
                    aG -= (aK = aJ, 2);
                } else {
                    aG += (aN = aK, 6);
                }
            } else {
                if (aG < 7) return; else aJ = aH[aI](), aG -= 3;
            }
        }
    } else {
        if (aG < 12) {
            if (aG < 10) {
                if (aG < 9) {
                    var aH, aI, aJ, aK, aL, aM, aN, aO;
                    aG += 2;
                } else aI = "push", aG -= 6;
            } else {
                if (aG < 11) {
                    aH = a1, aG -= 9;
                } else {
                    aG -= (aO = aM in aN, 11);
                }
            }
        } else {
            if (aG < 13) {
                aM = aJ["pop"](), aG -= 7;
            } else {
                aL = "pop", aG -= 1;
            }
        }
    }
}
sourceCode = A11 + ""
let ast = parser.parse(sourceCode);


console.time("处理完毕，耗时");


function collectSwitchCase(WhilePath, name) {
    let ifNodes = [];

    WhilePath.traverse({
        "IfStatement"(path) {//遍历所有的ifStatement;
            let {test, consequent, alternate} = path.node; //获取子节点

            let {left, operator, right} = test; // 必定是BinaryExpression

            if (!types.isIdentifier(left, {name: name}) || operator != '<' || !types.isNumericLiteral(right)) {//条件过滤
                return;
            }

            let value = right.value;
            let body;
            if (types.isReturnStatement(consequent)){
                body = [consequent];
            }else{
                body = consequent.body || [consequent];
            }
            ifNodes[right.value - 1] = body;   //保存整个body，记得生成switchCase节点的时候加上break节点。
            if (!ifNodes[right.value - 1]){
                debugger
            }
            if (!types.isIfStatement(alternate)) {
                ifNodes[right.value] = alternate.body || types.BlockStatement([alternate]).body;  //最后一个else，其实就是上一个else-if 的 test.right的值

            }
            if (!ifNodes[right.value]){
                debugger
            }
        },
    })

    return ifNodes;
}


const for2While = {
    ForStatement(path){
        let {node, scope} = path;
        let {init, test, update, body} = node;
        if (init || test || update)return;
        if (!types.isBlockStatement(body)){
            body = types.BlockStatement([body])
        }
        path.replaceWith(types.WhileStatement(types.NumericLiteral(1), body));
        scope.crawl()
    }
};
traverse(ast, for2While)

const IfToSwitchNode = {
    "WhileStatement"(path) {
        let {test, body} = path.node;

        if (!(types.isNumericLiteral(test, {value: 1})) || body.body.length != 1) {//条件过滤
            return;
        }

        let gParent = path.parentPath;
        while (types.isBlockStatement(gParent)){
            gParent = gParent.parentPath;
        }

        let parent = path.parentPath;
        if (!types.isFunctionDeclaration(gParent) && !types.isFunctionExpression(gParent))return;

        if (parent.node.body.length !== 2)return;
        let blockBody = parent.node.body;
        if (!types.isVariableDeclaration(blockBody[0]) || !types.isWhileStatement(blockBody[1])) {//条件过滤
            return;
        }

        if (blockBody[0].declarations.length !== 1)return;

        let switchId = blockBody[0].declarations[0].id;  //变量名
        let {name} = switchId;
        let ifNodes = collectSwitchCase(path, name);   //收集case

        if (ifNodes.length === 0) return;   //无case，直接返回。

        let len = ifNodes.length;
        for (let i = 0; i < len; i++) {
            if (!types.isReturnStatement(ifNodes[i])){
                ifNodes[i].push(types.BreakStatement());  //每一个case最后都加break
            }
            ifNodes[i] = types.SwitchCase(test = types.valueToNode(i), consequent = ifNodes[i]);  //生成SwitchCase节点
        }

        let switchNode = types.SwitchStatement(switchId, ifNodes);   //生成SwitchCase节点

        path.node.body.body = [switchNode]; //最后的while节点只有一个Switch Node;

    },
}


traverse(ast, IfToSwitchNode);

console.timeEnd("处理完毕，耗时");


let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});

fs.writeFile(decodeFile, code, (err) => {
});


