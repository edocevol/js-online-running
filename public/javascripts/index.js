var jsdecoder;
var code = '';
var time = 0;
function decodeJsCode() {
    code = '';
    jsdecoder = new JsDecoder();
    jsdecoder.s = editor.getValue();
    do_decode_init();
}

function do_decode_init() {
    $$$('msg').innerHTML = 'Decoding .. ';
    $('#msg_alert').alert();//bootstrap的alert样式需要引入jquery
    setTimeout(do_decode, 100);
}

function do_decode() {
    time = time_start();
    try {
        code = jsdecoder.decode();
        editor.setValue(code);
    } catch (e) {
        $$$('msg').innerHTML += 'error<br><br>' + new String(e).replace(/\n/g, '<br>');
        $('#msg_alert').alert();//bootstrap的alert样式需要引入jquery
        return;
    }
    $$$('msg').innerHTML += 'ok (' + time_end(time) + ' sec)<br>';
    $('#msg_alert').alert();//bootstrap的alert样式需要引入jquery

}
function $$$(id) {
    return document.getElementById(id);
}

function time_micro() {
    var micro = new String(new Date().getTime());
    micro = micro.substr(0, micro.length - 3) + '.' + micro.substr(micro.length - 3, 3);
    return parseFloat(micro);
}
function time_start() {
    return time_micro();
}
function time_get(start) {
    return time_micro() - start;
}
function time_end(start) {
    return time_round(time_micro() - start);
}
function time_round(time) {
    time = Math.round(time * 100) / 100;
    if (time === 0) {
        time = 0.01;
    }
    return time;
}

/**
 * 生成指定数量的TAB,这里的TAB是用TAB来代替的
 * @param num
 * @returns {string}
 */
var getTabByNum = function (num) {
    var cal = "";
    for (var j = 0; j < num; j++) {
        for (var i = 0; i < 4; i++) {
            cal += "&nbsp;";
        }
    }
    return cal;
};

