var http = require('http').createServer(handler); 
var fs = require('fs'); 
var io = require('socket.io')(http) 

http.listen(8080); 

function handler (req, res) { //create server
  fs.readFile(__dirname + '/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
    var switcher = false;
  socket.on('switcher', function(data) { //get light switch status from client
    switcher = data;
    if (switcher) {
      console.log("turn on light"); //turn LED on or off, for now we will just show it in console.log
    }else {
        console.log("turn off light");
    }
  });
});