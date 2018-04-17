function log(text){
    var time = new Date();
    console.log("[" + time.toLocaleTimeString() + "] " + text.toString());
}

function log_error(text){
    var time = new Date();
    console.log("[" + time.toLocaleTimeString() + "] " + text.toString());
}

function createGuid() {  
    function _p8(s) {  
       var p = (Math.random().toString(16)+"000000000").substr(2,8);  
       return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
    }  
    return _p8() + _p8(true) + _p8(true) + _p8();  
}