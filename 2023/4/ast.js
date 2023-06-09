const fs = require('fs');
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const {assertArray} = require("@babel/core/lib/config/validation/option-assertions");
const generator = require("@babel/generator").default;
globalThis.generator = generator;
const log = console.log;
console.log = function () {
    let args = [(new Date).toLocaleString("zh").replaceAll("/", "-") + "     | INFO     | __main__:subprocess:** - ", ...arguments];
    log.apply(this, args)
};


//js混淆代码读取
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
let path = "./code/" + new Date().Format("yyyy-MM-dd") + "/test";
path = "./input";
encodeFile = process.argv.length > 2 ? process.argv[2] : path + "/sourceCode.js";
decodeFile = process.argv.length > 3 ? process.argv[3] : path + "/decodeResult.js";


const sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let code = sourceCode;
let ast = parser.parse(code);


console.time("处理完毕，耗时");


const constantFold =
    {
        "BinaryExpression|UnaryExpression"(path) {
            if (path.isUnaryExpression({operator: "-"}) ||
                path.isUnaryExpression({operator: "void"})) {
                return;
            }
            const {confident, value} = path.evaluate();
            if (!confident || value === "Infinity") return;
            globalThis.Replace = true;
            path.replaceWith(types.valueToNode(value));
            path.scope.crawl()

        },
    };

// traverse(ast, constantFold);


function replaceA(name, scope, newNode) {
    let binding = scope.getBinding(name);
    for (const refer of binding.referencePaths) {
        let parentPath = refer.parentPath;

        refer.replaceWith(newNode);
        if (types.isVariableDeclarator(parentPath)) {
            let {node} = parentPath;
            let {id} = node;
            replaceA(id.name, parentPath.scope, newNode)
            parentPath.remove();
        }
    }
}

const yinyong =
    {
        VariableDeclarator(path) {
            let {node, scope} = path;
            // console.log(path.toString());
            let {id, init} = node;
            if (!types.isIdentifier(id)) return;
            if (!init) return;
            if (!types.isStringLiteral(init)) return;


            let binding = scope.getBinding(id.name);
            if (!binding.constant) return;
            for (const refer of binding.referencePaths) {
                let parentPath = refer.parentPath;
                refer.replaceWith(init);
            }
            path.remove();
        }
    };
// traverse(ast, yinyong);


// case 排序
if (true){
    let caseKey = "";
let sortArray = [295,97,73,26,53,100,4,92,7,143,112,107,140,91,171,155,156,3,164,172,37,55,11,67,323,128,324,243,215,51,332,203,28,98,312,93,175,253,161,240,179,199,32,85,178,34,121,360,139,180,291,21,135,330,195,296,122,272,262,306,228,124,49,197,221,35,166,169,66,151,196,237,129,316,331,257,244,336,36,217,288,165,191,236,209,50,17,333,201,207,163,226,341,40,147,152,57,311,118,254,131,8,2,350,271,117,144,108,182,106,337,19,71,314,345,268,371,349,364,81,300,116,99,1,24,290,260,47,233,362,292,6,255,174,194,136,328,25,76,153,273,308,276,14,13,132,284,218,208,285,299,125,65,61,231,265,157,74,289,264,223,310,31,301,95,64,232,193,137,52,353,29,5,322,70,352,183,303,365,374,80,378,77,148,103,120,10,176,90,313,335,68,141,20,329,111,134,213,304,344,130,354,261,94,229,79,82,43,297,287,39,110,256,242,238,104,41,212,372,87,78,56,200,154,69,105,293,309,224,281,219,59,269,170,366,22,294,270,274,367,225,102,246,101,12,46,325,375,361,158,72,250,123,278,234,160,239,319,202,187,115,283,138,84,327,211,258,317,60,114,263,241,340,216,343,249,286,214,338,363,126,334,127,315,16,358,198,307,159,168,326,33,282,58,45,279,355,146,188,54,259,89,210,62,267,359,251,23,235,162,342,83,227,277,133,348,113,321,119,42,15,230,44,247,339,142,63,181,185,245,318,48,222,206,9,370,30,373,27,38,346,189,177,377,75,192,266,320,351,305,184,248,298,376,280,86,252,190,369,150,88,275,204,356,96,173,145,186,109,167,205,347,149,357,220,18,368,302];
let caseObj = {};
const sortCase = {
    SwitchCase(path) {
        let {test, consequent} = path.node;
        if (!types.isNumericLiteral(test)) return;
        if (test.value === undefined) return;
        caseObj[test.value] = path.node;
    }
};
traverse(ast, sortCase);
let caseArray = [];
for (let index of sortArray) {
    caseArray.push(caseObj[index])
}
const newS = {
    SwitchStatement: {
        exit(path) {
            let exs = [];
            for (const caseArrayElement of caseArray) {
                for (const consequest of caseArrayElement.consequent) {
                    if (types.isBreakStatement(consequest)) continue;
                    if (types.isExpressionStatement(consequest)) {
                        let {left, operator, right} = consequest.expression;
                        if (types.isIdentifier(left, {name: caseKey}) && ["+=", "-=", "="].includes(operator)) {
                            continue
                        }
                    }

                    exs.push(consequest)
                }
            }
            let newPath = types.BlockStatement(exs);
            path.replaceWith(newPath)
            path.traverse({
                AssignmentExpression(_path) {
                    let {left, operator, right} = _path.node;
                    if (!types.isIdentifier(left, {name: caseKey})) return;
                    if (!types.isNumericLiteral(right)) return;
                    if (!["+=", "-=", "="].includes(operator)) return;
                    console.log(_path.toString());
                    _path.remove();
                }
            })
            path.scope.crawl();
        }
    }
}
traverse(ast, newS);
}


// 为没有continue的case节点添加continue（适应顺延下一节点）
// 对case对象的 +=，-= 操作统一转换为 = 操作
if (false){
    Array.prototype.insert = function insert(index, value) {
        return this.splice(index, 0, value)
    }
    let caseKey = "_$Xr";
    // case Key and case Path
    let caseMap = {};
    // next case Key and case Key
    let caseMap2 = {}
    const getCase = {
        SwitchCase(path) {
            let {test, consequent} = path.node;
            if (!types.isNumericLiteral(test)) {
                return console.error("ERROR ");
            }
            if (test.value === undefined) {
                return console.error("ERROR ");
            }
            caseMap[test.value] = path
        }
    };
    traverse(ast, getCase);

    let switchReturnPaths = {};
    while (true) {
        let breakSign = true;
        for (const caseIndex in caseMap) {
            let casePath = caseMap[caseIndex];
            let {test, consequent} = casePath.node;
            if (types.isReturnStatement(consequent.at(-1))) {
                switchReturnPaths[test.value] = [];
                continue
            }

            let nextCaseValue = test.value;
            if (types.isContinueStatement(consequent.at(-1)) || types.isBreakStatement(consequent.at(-1))) {
                casePath.traverse({
                    AssignmentExpression(_path) {
                        let {left, operator, right} = _path.node;
                        if (!types.isIdentifier(left, {name: caseKey}) || !["+=", "-=", "="].includes(operator)) return;
                        if (!types.isNumericLiteral(right)) return
                        switch (operator) {
                            case "+=":
                                nextCaseValue += right.value;
                                break
                            case "=":
                                nextCaseValue = right.value;
                                break
                            case "-=":
                                nextCaseValue -= right.value;
                                break
                        }
                        _path.remove()
                    }
                })
                let last = consequent.pop();
                casePath.node.consequent.push(types.ExpressionStatement(types.AssignmentExpression("=", types.Identifier(caseKey), types.NumericLiteral(nextCaseValue))));
                casePath.node.consequent.push(last);
                caseMap2[nextCaseValue] = test.value;
            } else {
                breakSign = false;
                casePath.traverse({
                    AssignmentExpression(_path) {
                        let {left, operator, right} = _path.node;
                        if (!types.isIdentifier(left, {name: caseKey}) || !["+=", "-=", "="].includes(operator)) return;
                        if (!types.isNumericLiteral(right)) return
                        switch (operator) {
                            case "+=":
                                nextCaseValue += right.value;
                                break
                            case "=":
                                nextCaseValue = right.value;
                                break
                            case "-=":
                                nextCaseValue -= right.value;
                                break
                        }
                        _path.remove()
                    }
                });
                casePath.node.consequent.push(types.ExpressionStatement(types.AssignmentExpression("=", types.Identifier(caseKey), types.NumericLiteral(test.value + 1))));
                casePath.node.consequent.push(types.BreakStatement());
                // casePath.node.consequent.push(types.ContinueStatement());
                if (!caseMap[test.value + 1])debugger;
                caseMap[test.value + 1].node.consequent.splice(0, 0, types.ExpressionStatement(types.AssignmentExpression("=", types.Identifier(caseKey), types.NumericLiteral(nextCaseValue))));
            }
        }
        if (breakSign) break
    }

    let newCases = [];
    for (const switchReturnPathsKey in switchReturnPaths) {
        let caseNumber = switchReturnPathsKey;
        while(caseNumber !== undefined){
            switchReturnPaths[switchReturnPathsKey].insert(0, parseInt(caseNumber));
            caseNumber = caseMap2[caseNumber]
        }
        let codes = [];
        for (const caseNum of switchReturnPaths[switchReturnPathsKey]) {
            let consequents = caseMap[caseNum].node.consequent;
            for (const consequent of consequents) {
                if (types.isContinueStatement(consequent) || types.isBreakStatement(consequent))continue;
                if (types.isExpressionStatement(consequent)){
                    if(types.isAssignmentExpression(consequent.expression) && types.isIdentifier(consequent.expression.left, {name:caseKey}))continue;
                }
                codes.push(consequent);
            }
        }
        newCases.push(types.SwitchCase(types.NumericLiteral(switchReturnPaths[switchReturnPathsKey][0]), [types.BlockStatement(codes)]))
    }

    let newSwitchNode = types.SwitchStatement(types.Identifier(caseKey), newCases)
    debugger;
    let p = caseMap[Object.keys(caseMap)[0]];
    while (!types.isSwitchStatement(p)){
        p = p.parentPath;
    }
    p.replaceWith(newSwitchNode)

}
// 三目表达式还原1
let ifNODETEP = template(`if(A){B;}else{C;}`)
const ConditionTolf = {
    ConditionalExpression: {
        exit(path) {
            // console.log(path.toString());
            let {test, consequent, alternate} = path.node;
            let ifStateNode = ifNODETEP({"A": test, "B": consequent, "C": alternate});
            // console.log(generator(ifStateNode).code);
            // types.ifStatement(test, consequent, alternate)
            path.replaceWithMultiple(ifStateNode);
            path.skip();
            // console.log(path.toString());
        }
    }
};
// traverse(ast, ConditionTolf)

// 三目表达式还原2
const ConditionTolf2 = {
    ConditionalExpression: {
        exit(path) {
            // console.log(path.toString());
            let {test, consequent, alternate} = path.node;
            if (types.isSequenceExpression(consequent)) {
                let expressions = consequent.expressions;
                let retBody = [];
                for (let expression of expressions) {
                    retBody.push(types.ExpressionStatement(expression))
                }
                consequent = types.BlockStatement(retBody)
            } else {
                consequent = types.ExpressionStatement(consequent);
                consequent = types.BlockStatement([consequent]);
            }
            if (types.isBlockStatement(alternate)) {
                let expressions = alternate.expressions;
                let retBody = [];
                for (let expression of expressions) {
                    retBody.push(types.ExpressionStatement(expression))
                }
                alternate = types.BlockStatement(retBody)
            } else {
                alternate = types.ExpressionStatement(alternate);
                alternate = types.BlockStatement([alternate]);
            }
            let ifStateNode = types.ifStatement(test, consequent, alternate);
            // console.log(generator(ifStateNode).code)
            path.replaceWithMultiple(ifStateNode);
            path.skip();
            // console.log(path.toString());

        }
    }
};
// traverse(ast, ConditionTolf2)

// 字符串还原
const str2 = {
    // VariableDeclarator(path) {
    //     let {node} = path;
    //     let {id, init} = node;
    //     if (!types.isLiteral(init)) return;
    //     console.log(path.toString());
    // },
    AssignmentExpression(path) {
        let {node, scope} = path;
        if (path.toString().includes("Zk = \"Settin\"")) debugger;
        let {left, operator, right} = node;
        if (!types.isIdentifier(left) || operator !== "=" || !types.isStringLiteral(right)) return;
        if (path.parentPath.key === "alternate") return
        // console.log(path.toString());
        let binding = scope.getBinding(left.name);
        if (!binding) return;
        let varPath = binding.path;
        if (!(types.isIdentifier(varPath.node) || types.isVariableDeclarator(varPath) && varPath.node.init === null)) return;

        let len = types.isIdentifier(varPath.node) ? 1 : 2;
        if (binding.constantViolations.length > len) return;
        console.log("Path: ", path.toString())

        let setValueCount = 0;
        let constantChangeCount = 0;
        for (const constantViolation of binding.constantViolations) {
            // if (types.isAssignmentExpression(constantViolation)){
            //
            // }
            if (types.isVariableDeclarator(constantViolation) && constantViolation.init === undefined) {
                continue
            }
            if (types.isUpdateExpression(constantViolation)) {
                console.warn("RETURN: constantViolation: ", constantViolation.toString())
                return
            }
            ;
            constantChangeCount++
        }
        if (constantChangeCount > 1) {
            console.warn("RETURN: constantChangeCount: ", constantChangeCount, path.toString())
            return
        }
        ;
        for (const referPath of binding.referencePaths) {
            let referParent = referPath.parentPath;
            // if (!(types.isAssignmentExpression(referParent) || types.isBinaryExpression(referParent)) || referParent.node.right.name !== left.name){
            //     continue
            // }
            console.log("referencePaths: ", referParent.toString());
            referPath.replaceWith(right);
        }
    }
}

// traverse(ast, str2)


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
            if (types.isReturnStatement(consequent)) {
                body = [consequent];
            } else {
                body = consequent.body || [consequent];
            }
            ifNodes[right.value - 1] = body;   //保存整个body，记得生成switchCase节点的时候加上break节点。
            if (!ifNodes[right.value - 1]) {
                debugger
            }
            if (!types.isIfStatement(alternate)) {
                ifNodes[right.value] = alternate.body || types.BlockStatement([alternate]).body;  //最后一个else，其实就是上一个else-if 的 test.right的值

            }
            if (!ifNodes[right.value]) {
                debugger
            }
        },
    })

    return ifNodes;
}


const for2While = {
    ForStatement(path) {
        let {node, scope} = path;
        let {init, test, update, body} = node;
        if (init || test || update) return;
        if (!types.isBlockStatement(body)) {
            body = types.BlockStatement([body])
        }
        path.replaceWith(types.WhileStatement(types.NumericLiteral(1), body));
        scope.crawl()
    }
};
// traverse(ast, for2While)

const IfToSwitchNode = {
    "WhileStatement"(path) {
        let {test, body} = path.node;

        if (!(types.isNumericLiteral(test, {value: 1})) || body.body.length != 1) {//条件过滤
            return;
        }

        let gParent = path.parentPath;
        while (types.isBlockStatement(gParent)) {
            gParent = gParent.parentPath;
        }

        let parent = path.parentPath;
        if (!types.isFunctionDeclaration(gParent) && !types.isFunctionExpression(gParent)) return;

        if (parent.node.body.length !== 2) return;
        let blockBody = parent.node.body;
        if (!types.isVariableDeclaration(blockBody[0]) || !types.isWhileStatement(blockBody[1])) {//条件过滤
            return;
        }

        if (blockBody[0].declarations.length !== 1) return;

        let switchId = blockBody[0].declarations[0].id;  //变量名
        let {name} = switchId;
        let ifNodes = collectSwitchCase(path, name);   //收集case

        if (ifNodes.length === 0) return;   //无case，直接返回。

        let len = ifNodes.length;
        for (let i = 0; i < len; i++) {
            if (!types.isReturnStatement(ifNodes[i])) {
                ifNodes[i].push(types.BreakStatement());  //每一个case最后都加break
            }
            ifNodes[i] = types.SwitchCase(test = types.valueToNode(i), consequent = ifNodes[i]);  //生成SwitchCase节点
        }

        let switchNode = types.SwitchStatement(switchId, ifNodes);   //生成SwitchCase节点

        path.node.body.body = [switchNode]; //最后的while节点只有一个Switch Node;

    },
}


// traverse(ast, IfToSwitchNode);


console.timeEnd("处理完毕，耗时");


// let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});
code = generator(ast, opts = {}).code;

fs.writeFile(decodeFile, code, (err) => {
    console.log("保存 decodeFile: ", err)
});