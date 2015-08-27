var http = require("http");
var url = require("url");

function start() {
    function onRequest(request, response) {
        var content = "" ;
        var str = request.url.slice(1,request.url.length) ;
        
        //var el = request.document.getElementById("submit");
        //el.addEventListener("click", function(){
            //var num = request.document.getElementById("nums").value;
            //console.log(num);

        if(str!='favicon.ico'){
            var num = parseInt(str);
            if(num<=0 || isNaN(num)){
                content = "Please enter a positive number after the port number<br>For example:8888/10";
            }
            else content = matrixFunction(num);
        }

        response.writeHead(200, {"Content-Type": "text/html"});

        response.write(content);
        
        response.end();

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}



function matrixFunction(num) {
    var n = num;
    var array = new Array();
    if (n == 0) {
        return "none";
    }
    else if (n == 1) {
        return "<html><head><style>th,td{border:1px solid black; text-align:center}</style></head><body><table><tr><td>1</td></tr></table></body></html>" ;
    }
    for (var i = 0; i < n; i++) {
        array[i] = new Array();
    }
    var count = 1;
    var rB = 0, rE = n - 1, cB = 0, cE = n - 1;
    while (rB <= rE && cB <= cE) {
        for (var j = cB; j <= cE; j++) {
            array[rB][j] = count++;
        }
        rB++;
        for (var j = rB; j <= rE; j++) {
            array[j][cE] = count++;
        }
        cE--;
        if (rB < rE) {
            for (var j = cE; j >= cB; j--) {
                array[rE][j] = count++;
            }
            rE--;
        }
        if (cB < cE) {
            for (var j = rE; j >= rB; j--) {
                array[j][cB] = count++;
            }
            cB++;
        }
    }
    var res = "";
    res += "<html><head><style>th,td{border:1px solid black; text-align:center}</style></head><body><table>" ;
    for (var i = 0; i < n; i++) {
        res += "<tr>" ;
        for (var j = 0; j < n; j++) {
            res += "<td>" + array[i][j] + "</td>";
        }
        res += "</tr>" ;
        console.log(array[i]) ;
    }
    res += "</table></body>" ;
    res += "</html>" ;
    return res ;
}

exports.start = start;