---
title: js在线学习平台的介绍及安装
---

# nodejs+express搭建javascript在线IDE
## 项目地址
github:[https://github.com/sixtrees/js-online-running][1]
## 背景
这两天在看阮一峰的《ES6标准入门》，对其中涉及到的代码示例部分，感觉到很不方便，不知道阮老师是如何进行代码调试的。可能是在nodejs环境或者直接在浏览器的控制台中进行调试。我每次都是在nodejs命令行中进行代码编写，由于命令行本身的特点，有一句代码编写错误，都可能导致需要重写所有的代码。

像下图中所示的情况一样，当我们由java或者其他语言的编写习惯造成的语法错误`for (var item of set )`，导致测试代码没能得到正确的输出，这时候我们就需要重头来过，这体验当然是不好的，在浏览器的控制台中这种情况，会好一点。但是，一旦我们不小心触碰到了`ENTER按键`，那就悲剧了。
![enter description here][2]

我也曾异想天开的认为既然nodejs可以使用`node app.js`来启动nodejs程序，那为什么不试试用`node test.js`来进行代码测试呢。经过测试，发现是可以的，但是这样，我每一次都要在命令行和文本编辑器之间进行切换。

![enter description here][3]

由于，我想简单点，开发一个基于web的IDE来运行我们输入的`javascript`或者`es2015也就是es6`代码。经过一个晚上加一个上午的构思和代码编写，已经完成了基础代码的编写。下图就是这个项目的一个运行示例。利用`CodeMirror`插件来作为代码编辑插件，并且根据需要，改写了`CodeMirror`官方的`javascript-hint.js`文件，使得代码提示的效果更丰富，同时也发现了网上大多数坑人的帖子带来的问题，后面都要有详细的说明。先来简单的看一下我们的系统长什么样吧，至于界面的设计，大家就将就的看一下，毕竟功能才是我们所需要的。


![enter description here][4]


## 如何安装
目前，我已经将代码托管至[github(点我)][5]。下面，我来演示如何安装本平台，请大家放心，不会涉及太多复杂的东西，因为这个系统只是一个很简单的IDE环境。

先在webstorm下看一下项目结构：
![enter description here][6]

下面开始进入安装阶段。
项目采用的是express进行开发的，因此，主要的npm依赖见下面的代码区。
```
  "dependencies": {
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "hbs": "~4.0.1",
    "morgan": "~1.8.1",
    "serve-favicon": "~2.4.2"
  }
```
好了，我们开始连接服务器或者在自己的电脑上打开命令行（我用的msysgit，大家也可以用[cmder][7]）
进入到我们的工作文件夹，我这里用的是自己的D盘下面的nodejs文件夹，可以使用如下命令进行快速进入
```bash
Administrator@neil-PC MINGW64 /d/nodejs
$ cd
$ cd d:/nodejs
$ pwd
/d/nodejs
$ git clone https://github.com/sixtrees/js-online-running.git
```
![enter description here][8]

克隆完成后，进入`js-online-running`文件夹。
![enter description here][9]

执行npm安装项目的依赖，关于`npm install 如何安装package.json文件夹下的依赖`，请大家自行了解其中缘由。
```bash
$ npm install
js-online-running@0.0.0 D:\nodejs\js-online-running
+-- body-parser@1.17.2
+-- cookie-parser@1.4.3
+-- debug@2.6.8
+-- express@4.15.3
+-- hbs@4.0.1
+-- morgan@1.8.1
`-- serve-favicon@2.4.3
```

![enter description here][10]

安装好npm的依赖之后，我们就可以使用` node bin/www`来运行项目了。`bin/www`文件时系统启动文件，请不要用`node app.js`来试图运行本系统。
还有就是不要在`bin`之前加`/`，这是画蛇添足。执行`node bin/www`后，node就会启动`localhost:3000`作为项目的部署地址了，端口号可以在`bin/www`文件中进行修改。此时，是没有任何输出的，如果你是用webstorm打开的，推荐大家使用`nodemon`等热部署解决方法。具体的方法，请自己自行上网查找解决方案，反正就是很简答的那种。像用IDEA来开发java， 我会推荐大家使用JRebel来进行热部署。这样的东西是可以提供编程的效率的。

![enter description here][11]

此时，打开浏览器，输入`localhost:3000`，就可以看到我们的页面了。

![enter description here][12]

此时，`nodejs`控制台也会输入所有的资源请求情况。
![enter description here][13]

到这里，系统的部署就完成了。就可以用这个平台来进行js代码的运行测试了。
总结一下，启动项目，使用`node bin/www`，如果想随电脑启动，请自行查找如何在`windows`或者`linux`平台下，让`nodejs`项目对计算机启动而启动。

## 使用
下面，我使用阮一峰的《es6标准入门》的一个案例代码来演示如何使用本平台，其实这个平台的初衷就是学了配合阮老师的书来学习的。
阮老师的代码传送门：[在此][14]
```
var a = [1,2,3,4];
var set = neww Set(a);
for(var item of a) {
  console.log(item);
}
```
这个代码的演示程序，如下图所示

![enter description here][15]


## 本系统的特点
系统采用`nodejs+express`进行开发的。但是主要的实现都是靠`html+javascript`来实现的，我当时是想用户传递自己输入的`javascript`语句到后台进行执行，但是根据常识，浏览器是可以直接运行`javascript`代码的，因此，就想到了`eval`这个让大家又爱又怕的函数来执行我们输入的`javascript`语句，并且捕获异常，将捕获的异常信息做为`bootstrap-treeview`插件的数据来显示具有层次结果的错误信息。（这里我可能描述的不够准备，捕获的是Error.

总结几个特点：
1. 使用最新的的`CodeMirrror`，包含了所有的样式和addon。用户可以根据自己喜欢来设置自己喜欢的代码编辑区的配色方案。
2. 利用`CodeMirror`的`cursorActivity`事件来完成代码提示的触发。网上一群坑爹的货，居然说用`onChange`事件，老子的浏览器选项卡直接卡死，在仔细看了官方的文档后，发现`cursorActivity`事件才是解决代码提示的正确道路。
3. 利用`split`函数将用户输入的所有的代码按照空格进行分割，获取所有的英文单词，将这些单词传递给一个自定义的全局变量CodeMirror.ukeys，结合`javascript`的关键字来实现代码提示，所以，本系统能够实现实时的代码提示，而且可以提示用户出入的变量名，不仅仅是`javascript`关键词，从而给人更真实的`IDE感`。
4. 由于时间较多，没有做很多的后台的程序的编写， 大家有兴趣的，可以`mysql`或者`mongodb`来实现类似于`HUE`的在线IDE。


## 关于CodeMirror如何实现实时提示
这个问题在原生的`CodeMirror`有两个问题，
### 问题1
一个问题就是代码提示的时候，在没有任何输入的时候就会弹出所有的提示关键词，这一点让人很讨厌，那么该如何改进呢。由于我们这里使用的`javascript-hint.js`来进行`javascript`代码的提示，那我们可以修改的文件就应该是`public/codemirror/addon/hint/javascript-hint.js`文件，如果大家仔细的阅读了`CodeMirror`的代码，就会发现在`javascript-hint.js`文件中有一个函数`getCompletions`，该函数有一个参数叫`token`,这个`token`其实是编译原理中所说的`token`，也就是一个语法分割单位，这个`token`是我们代码提示的关键，所有的关键字就要跟`token`进行比对，如果发现`token`是某些关键字的前缀，那么这些单词都要作为当前的关键字提示给用户。
例如，下图中，我们正在输入的语法单词是`se`，那么此时触发的`cursorActivity`事件调用`showHint`方法，经过一系列的函数判断，最重获取到当前的`token`是`se`，则我们需要将所有以`se`为首的单词进行弹出提示。那么，针对我们正在说的这个事情：`CodeMirror`在我们没有任何输入的时候，也会进行代码提示，那根据分析没有任何输入时，触发`cursorActivity`事件时，得到的`token`的值是`""`，我们只需要在`getCompletions函数(这个函数就是获取和当前用户正在输入的语法单词匹配的所有关键词的函数)`的开始判断`token==""`，如果是`true`，则直接返回一个空的list{}。

![enter description here][16]
改写的代码如下：
```
    function getCompletions(token, context, keywords,options) {

        //这里是处理没有任何字母输入时也会有代码提示的原因。
        if (token.string == "") {
            return {list:{}};;
        }
		...
}
```
### 问题2
另外一个问题就是`CodeMirror`能提供的`auto-complete(代码自动完成)`是需要进行按键绑定的，用户通过某个按键组合才能触发`autocomplete`事件，这对于我们写代码的速度肯定影响是很大。因此，我们希望在我们输入字符的同时，界面可以给出我们实时的代码提示，而不需要进行按键组合来触发。一般网上的示例都是比较坑爹的，代码示例如下：
```javascript?linenums
editor.on("change", function () {
     editor.showHint();
});
```
如果你是这么用`CodeMirror`的，或者你正在发愁的时候，我希望我的这的总结能够给你提供比较`稳`的帮助。继续说，上面的代码示例千万不要用，因为这样做了，浏览器会卡死的，而造成这种现象 的原因可能是`CodeMirror`内部处理的问题，我没有仔细研究，但是经过我的仔细阅读官方文档和不断摸索，我给出一个比较正确的方案来实现代码的实时提示。
```
//不要用change
editor.on("cursorActivity", function () {
            //调用显示提示
            editor.showHint();
});
```
如果，你是这么做的或者你刚好这么改正了，那么恭喜你，你应该得到了你要的效果。

好了，这两个问题，就简单论述到这里，下面还有更重要的东西需要我来论述的。

## 如何增加`CodeMirror`代码提示的关键字
![enter description here][17]

不失一般性，我这里就描述一下这个项目中，我是如何获取更多的关键字（这里的关键字是指匹配用户输入的提示单词）并且将这样单词进行匹配并跟随原有的关键字进行实时提示的。

还记得刚才看过的那个代码片段吧，上面的代码是我为了给大家描述如何来触发代码实时提示的解决方案的。下面才是本项目中实际用到的代码。下面的代码注释已经写的很清楚的，首先就是利用`CodeMirror`的`API`来获取用户输入代码（注意是纯代码），然后利用正则来提取出所有的单词，用`match`匹配后得到的是一个数组，然后将该数组传递给我们拓展在`CodeMirror`全局变量的上一个属性`ukeys`。然后再调用`editor.showHint()`来处理实际的代码提示。
```javascript
 /**
 * 用来实时对用户的输入进行提示
 */
editor.on("cursorActivity", function () {
	//获取用户当前的编辑器中的编写的代码
	var words = editor.getValue() + "";
	//利用正则取出用户输入的所有的英文的字母
	words = words.replace(/[a-z]+[\-|\']+[a-z]+/ig, '').match(/([a-z]+)/ig);
	//将获取到的用户的单词传入CodeMirror,并在javascript-hint中做匹配
	CodeMirror.ukeys = words;
	//调用显示提示
	editor.showHint();
});

```

上面的描述希望没有给您带来阅读上的不顺畅，下面，我将描述一下如何在`javascript-hint.js`文件中如何接受我们传入的`ukeys`以及如何利用内置的函数快速完成关键字的匹配并将匹配的结果叠加进行关键字的提示。

### 首先是javascript-hint.js中`javascript`代码提示的主调函数
如果你对下面的文字描述不感兴趣，请移步[github(点我)][18]，直接看源码（有注释）.
```javascript

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
```
如上面的代码所示，在`javascriptHint`函数中，我们获取到`CodeMirror.ukeys`，并将`ukeys`传递给`scriptHint`函数。`scriptHint`函数的主要代码如下：
```javascript

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

```
从上面的代码中，可以看到`scriptHint`函数主要是获取`list(匹配的关键字)`。这也印证了上面我在处理没有任何输入时，判断`token==""`返回的是`{list:{}}`是正确的写法。这个函数的改动很小，主要还是将`ukeys`继续向下传递` list: getCompletions(token, context, keywords,ukeys, options)`。所以的单词匹配都是在`getCompletions`函数中实现的，在这个函数中，提供了很多内置函数，我们只需要添加几行代码就可以完成附加关键词的功能了。该函数的改动后的代码如下所示：
```javascript
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
```
我们只在`gatherCompletions`函数中添加了一条语句
好了，如果你这么做了，就可以完成我们输入的变量也会出现在CodeMirror中了。



## 附赠的福利
CodeMirror还提供了`sql`的代码提示的附加功能。主要针对的有`MSSQL`、`mysql`、`mariadb`以及`PLSQL`。本文以一个实际的项目中的实际使用来演示如何按照上文的描述来修改对应的`sql-hint.js`中的内容来完成：
1. 取消没有输入任何有效字符时的代码提示问题
2. 用`cursorActivity`设置代码实时提示
3. 增加表的字段到代码提示中去。

### 问题1
sql对应的关键字信息在`CodeMirror/mode/sql/sql.js`中，我在项目中用的是类似于`oracle`的数据库，因此我们在`sql.js`增加了`PLSQL`的部分关键字，如下图所示（更详细的信息，请参考[我的github][19]）

![enter description here][20]

然后修改`CodeMirror/addon/hint/sql-hint.js`中的``` CodeMirror.registerHelper("hint", "sql", function (editor, options) {```函数中添加如下图所示的代码，同样是判断`token`是否`==""`.
![enter description here][21]

## 问题2及问题3
由于问题2和问题三都是在`cursorActivity`中编写。直接上代码来描述吧。
**获取所有的表字段**
我的项目中，在编写`sql`的页面有所有的字段信息，所以我就用`jquery`直接获取了，如果大家的字段不在页面中，那就用ajax请求在页面一次加载的时候就保存在页面的一个全局变量中吧。一定不要让浏览器都去发ajax请求去获取字段列表，那样不卡死才怪。
```
 $(function(){
        console.log("get field");
        $(".field .easytree-title").each(function (){
            var tmp =$(this).html();
            tmp = tmp.substring(0,tmp.indexOf("["));
            window.fields.push(tmp);
        })
    });
```
上面的代码获取了我的项目中的所有的字段，并作为一个数组存储在全局变量`window.fields`上。然后再在`cursorActivity`中传递到`sql-hint.js`中。
**字段传递及关键字的匹配**
```
 editor.on("cursorActivity",function(){
        CodeMirror.ukeys =  window.fields;
        editor.showHint();
    });
```

**sql-hint.js文件的改写2**
在` CodeMirror.registerHelper("hint", "sql", function (editor, options) {`中添加如下图所示的代码，就完成了单词的匹配及后续的匹配到的单词的显示。

![enter description here][22]

上图的代码也就是利用封装好的函数读取`CodeMirror.ukeys`并进行关键字匹配，如果匹配成功则加入到`result`中，最后返回的`list`就是`result`.

最后上一个效果图。所有改动后的文件都在本次示例的项目中。[github地址(点我)][23]

![enter description here][24]


  [1]: https://github.com/sixtrees/js-online-running
  [2]: http://ojcybdsyq.bkt.clouddn.com/1495451166258.jpg "1495451166258"
  [3]: http://ojcybdsyq.bkt.clouddn.com/1495451538553.jpg "1495451538553"
  [4]: http://ojcybdsyq.bkt.clouddn.com/1495450964467.jpg "1495450964467"
  [5]: https://github.com/sixtrees/js-online-running.git
  [6]: http://ojcybdsyq.bkt.clouddn.com/1495452002298.jpg "1495452002298"
  [7]: http://cmder.net/
  [8]: http://ojcybdsyq.bkt.clouddn.com/1495452621375.jpg "1495452621375"
  [9]: http://ojcybdsyq.bkt.clouddn.com/1495452660091.jpg "1495452660091"
  [10]: http://ojcybdsyq.bkt.clouddn.com/1495452792570.jpg "1495452792570"
  [11]: http://ojcybdsyq.bkt.clouddn.com/1495453131157.jpg "1495453131157"
  [12]: http://ojcybdsyq.bkt.clouddn.com/1495453322744.jpg "1495453322744"
  [13]: http://ojcybdsyq.bkt.clouddn.com/1495453368083.jpg "1495453368083"
  [14]: http://es6.ruanyifeng.com/#docs/set-map
  [15]: http://ojcybdsyq.bkt.clouddn.com/%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E6%BC%94%E7%A4%BA.gif "一个简单的演示"
  [16]: http://ojcybdsyq.bkt.clouddn.com/1495456159072.jpg "1495456159072"
  [17]: http://ojcybdsyq.bkt.clouddn.com/GIF2.gif "GIF2"
  [18]: https://github.com/sixtrees/js-online-running.git
  [19]: https://github.com/sixtrees/js-online-running/blob/master/public/codemirror/mode/sql/sql.js
  [20]: http://ojcybdsyq.bkt.clouddn.com/1495459098757.jpg "1495459098757"
  [21]: http://ojcybdsyq.bkt.clouddn.com/1495459235620.jpg "1495459235620"
  [22]: http://ojcybdsyq.bkt.clouddn.com/1495459728750.jpg "1495459728750"
  [23]: https://github.com/sixtrees/js-online-running
  [24]: http://ojcybdsyq.bkt.clouddn.com/GIF3.gif "GIF3"