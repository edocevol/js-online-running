// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    var Pos = CodeMirror.Pos;

    //定义一个内容函数
    function forEach(arr, f) {
        for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    }
    //判断是否包含关键字，用来做去重
    function arrayContains(arr, item) {
        if (!Array.prototype.indexOf) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }
        return arr.indexOf(item) != -1;
    }

    //这是处理关键字匹配的关键函数实现
    function scriptHint(editor, keywords, ukeys,getToken, options) {
        // Find the token at the cursor
        var cur = editor.getCursor(), token = getToken(editor, cur);
        if (/\b(?:string|comment)\b/.test(token.type)) return;
        token.state = CodeMirror.innerMode(editor.getMode(), token.state).state;

        // If it's not a 'word-style' token, ignore the token.
        if (!/^[\w$_]*$/.test(token.string)) {
            token = {
                start: cur.ch, end: cur.ch, string: "", state: token.state,
                type: token.string == "." ? "property" : null
            };
        } else if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        var tprop = token;
        // If it is a property, find out what it is a property of.
        while (tprop.type == "property") {
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (tprop.string != ".") return;
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (!context) var context = [];
            context.push(tprop);
        }
        return {
            list: getCompletions(token, context, keywords,ukeys, options),
            from: Pos(cur.line, token.start),
            to: Pos(cur.line, token.end)
        };
    }

    /**
     * 主调函数，加入了我自己定义的一个CodeMirror.ukeys变量，用来向CodeMirror传递用户
     * 输入的所有的单词
     * @param editor
     * @param options
     * @returns {{list, from, to}|*}
     */
    function javascriptHint(editor, options) {

        var ukeys =  CodeMirror.ukeys;//获取用户的所有的输入的单词
        return scriptHint(editor, javascriptKeywords,ukeys,
            function (e, cur) {
                return e.getTokenAt(cur);
            },
            options);
    };
    CodeMirror.registerHelper("hint", "javascript", javascriptHint);

    function getCoffeeScriptToken(editor, cur) {
        // This getToken, it is for coffeescript, imitates the behavior of
        // getTokenAt method in javascript.js, that is, returning "property"
        // type and treat "." as indepenent token.
        var token = editor.getTokenAt(cur);
        if (cur.ch == token.start + 1 && token.string.charAt(0) == '.') {
            token.end = token.start;
            token.string = '.';
            token.type = "property";
        }
        else if (/^\.[\w$_]*$/.test(token.string)) {
            token.type = "property";
            token.start++;
            token.string = token.string.replace(/\./, '');
        }
        return token;
    }

    function coffeescriptHint(editor, options) {
        return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
    }

    CodeMirror.registerHelper("hint", "coffeescript", coffeescriptHint);


    /**
     * 下方是所有的内置的关键字列表，是静态的，主要是作为关键字的显示。
     * @type {Array}
     */
    var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
    "toUpperCase toLowerCase split concat match replace search").split(" ");
    var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
    "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
    var funcProps = "prototype apply call bind".split(" ");
    var javascriptKeywords = ("break case catch continue debugger default delete do of  else false finally for function " +
    "if in instanceof new null return switch throw true try typeof var void while with").split(" ");
    var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for " +
    "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");

    function forAllProps(obj, callback) {
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
            for (var name in obj) callback(name)
        } else {
            for (var o = obj; o; o = Object.getPrototypeOf(o))
                Object.getOwnPropertyNames(o).forEach(callback)
        }
    }

    /**
     *
     * @param token 当前光标下用户正在输入的单词
     * @param context
     * @param keywords 关键字列表，本文件内定义
     * @param ukeys 用户添加的关键字
     * @param options
     * @returns {*}
     */
    function getCompletions(token, context, keywords, ukeys,options) {

        //这里是处理没有任何字母输入时也会有代码提示的原因。
        if (token.string == "") {
            return {list:{}};
        }
        var found = [], start = token.string, global = options && options.globalScope || window;

        function maybeAdd(str) {
            if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
        }

        function gatherCompletions(obj) {
            if (typeof obj == "string") forEach(stringProps, maybeAdd);
            else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
            else if (obj instanceof Function) forEach(funcProps, maybeAdd);
            forEach(ukeys,maybeAdd);//匹配我们传进来的用户输入的代码中的所有的单词
            forAllProps(obj, maybeAdd)
        }

        if (context && context.length) {
            // If this is a property, see if it belongs to some object we can
            // find in the current environment.
            var obj = context.pop(), base;
            if (obj.type && obj.type.indexOf("variable") === 0) {
                if (options && options.additionalContext)
                    base = options.additionalContext[obj.string];
                if (!options || options.useGlobalScope !== false)
                    base = base || global[obj.string];
            } else if (obj.type == "string") {
                base = "";
            } else if (obj.type == "atom") {
                base = 1;
            } else if (obj.type == "function") {
                if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
                    (typeof global.jQuery == 'function'))
                    base = global.jQuery();
                else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
                    base = global._();
            }
            while (base != null && context.length)
                base = base[context.pop().string];
            if (base != null) gatherCompletions(base);
        } else {
            // If not, just look in the global object and any local scope
            // (reading into JS mode internals to get at the local and global variables)
            for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
            for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
            if (!options || options.useGlobalScope !== false)
                gatherCompletions(global);
            forEach(keywords, maybeAdd);
        }
        //console.log(found);
        return found;
    }
});
