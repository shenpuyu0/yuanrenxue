var Zk = function (afv) {
    var afw = d || 0x0;
    for (; ;)
        if (afw < 0x8) {
            if (afw < 0x4) {
                if (afw < 0x2) {
                    if (afw < 0x1) {
                        var afx, afy, afz, afA, afB, afC, afD, afE, afF, afG, afH, afI, afJ, afK, afL, afM, afN, afO,
                            afP, afQ, afR, afS, afT, afU, afV, afW, afX, afY, afZ, ag0, ag1, ag2, ag3, ag4, ag5, ag6,
                            ag7, ag8, ag9, aga, agb, agc, agd, age, agf, agg;
                        afw += 0x5;
                    } else
                        afw += ((afJ = (afI = (afH = a7f) && 0x0 || afF + afE + afG) && undefined || uo) && undefined || (afK = afH[afI](afJ)) && 0x0 || (afL = afK),
                            0x8);
                } else
                    afw < 0x3 ? (afC = yW,
                        afw += 0x6) : (afG = AH,
                        afw -= 0x2);
            } else {
                if (afw < 0x6) {
                    if (afw < 0x5)
                        return;
                    else
                        afx = v5,
                            afw += 0x6;
                } else
                    afw < 0x7 ? afw -= (afB = uq,
                        0x4) : afw -= (afF = yU,
                        0x4);
            }
        } else {
            if (afw < 0xc) {
                if (afw < 0xa) {
                    if (afw < 0x9)
                        afw += (afD = yX,
                            0x5);
                    else {
                        try {
                            return ((afJ = (afI = ((afH = afL) || 0x8) && afv(afH)) && 0x0 || !afI) || 0x2) && (afK = !afJ),
                                afK;
                        } catch (agh) {
                            return (((afJ = (afI = (afH = a5h) && null || a2K) && 0x0 || a2K) && undefined || (afN = (afM = (afK = afI * afJ) && undefined || a2M) && null || afK * afM) || 0x9) && (afQ = (afP = ((afO = afH - afN) || 0x4) && a2O) && null || a2P) && null || (afT = ((afS = ((afR = afP * afQ) || 0x6) && a2P) || 0x6) && afR * afS) && null || (afW = ((afV = (afU = afO - afT) && undefined || a2I) || 0x4) && a2O) && undefined || (afZ = ((afY = ((afX = afV * afW) || 0x5) && a2O) || 0x8) && afX * afY) || 0x7) && (ag2 = (ag1 = ((ag0 = afU - afZ) || 0xa) && a2I) && undefined || a2M) && 0x0 || (ag5 = (ag4 = (ag3 = ag1 * ag2) && 0x0 || a2I) && undefined || ag3 * ag4) && null || (ag6 = ag0 - ag5) && 0x0 || (ag7 = !ag6),
                                ag7;
                        } finally {
                            ((ag8 = afL) && undefined || (ag9 = afD + afC) && undefined || (aga = ag8[ag9]) || 0xa) && (aga && ((((agb = afL) || 0x2) && ((agc = afA + afB) || 0x5) && (agd = agb[agc]) && 0x0 || (age = afx + afz + afy) || 0x4) && (agf = afL) && null || agd[age](agf)) || 0x3) && (agg = null) && null || (afL = agg);
                        }
                        afw -= 0x5;
                    }
                } else
                    afw < 0xb ? (afA = IO,
                        afw -= 0x4) : afw += (afy = us,
                        0x1);
            } else
                afw < 0xd ? afw -= (afz = ur,
                    0x2) : (afE = up,
                    afw -= 0x6);
        }
};


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
                body = consequent.body;
            }
            ifNodes[right.value - 1] = body;   //保存整个body，记得生成switchCase节点的时候加上break节点。

            if (!types.isIfStatement(alternate)) {
                ifNodes[right.value] = alternate.body || types.BlockStatement([alternate]).body;  //最后一个else，其实就是上一个else-if 的 test.right的值

            }
            if (ifNodes.at(-1) === undefined || ifNodes.length === 21)debugger
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
        if (!types.isFunctionDeclaration(gParent))return;

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
            if (!types.isReturnStatement){
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