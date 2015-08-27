var querystring = require("querystring");

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="1" cols="10"></textarea>'+
		'<input type="submit" value="Submit" />'+
		'</form>'+
		'</body>'+
		'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write("You've sent: " + postData);
    var content = "" ;
    var str = postData.slice(5,postData.length)
    var num = parseInt(str); 
    response.writeHead(200, {"Content-Type": "text/html"});  
    if(num<=0 || isNaN(num)){
        response.write('Please enter a positive number');
        }
    else {
        content = matrixFunction(num);
        response.write('<html><head></head><body><table border="1">')
        for (var i = 0; i < num; i++) {
            if(i%2){
                response.write('<tr>');
            }
            for (var j = 0; j < num; j++) {
                response.write('<td>' + content[i][j] + " " + '</td>');
            };
            response.write('</tr>');
        };
        response.write('</table><br></body></html>');
    }
    response.end();
}


function matrixFunction(num) {
    var n = num;
    var array = new Array();
    if (n == 0) {
        return "none";
    }
    else if (n == 1) {
        return "1" ;
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
    
    if (n % 2 != 0) {
        array[(n - 1) / 2][(n - 1) / 2] = count;
    };
    console.log(n);
    for (i = 1; i < n; i++) {
        console.log(array[i]);
        array[i][0] = "\n" + array[i][0];
    };
    return array;


}


exports.start = start;
exports.upload = upload;

