//Lets require/import the HTTP module
var http = require('http');
var node_static = require('node-static');

var React = require('react/addons');
var TreeApp = React.createFactory(require('./flux.js').ReactClass);

//Lets define a port we want to listen to
const PORT=8080; 


var public_ = new node_static.Server('./pub');

//We need a function which handles requests and send response
function handleRequest(request, response){


  if(request.url === '/') {
    response.end('<html><head><style type="text/css">div{border:solid black 1px;display:inline-block;padding:10px;margin:10px;font-size:1.3em;}.selected{color:blue;}</style></head><body><div id="root">' + 
      React.renderToString(TreeApp({})) + 
      '</div><script src="/client-init.js"></script></body>');
    return; 
  }

    public_.serve(request, response);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});