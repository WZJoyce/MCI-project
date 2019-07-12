function done(){
var express = require('express');
var app = express();
var fs = require("fs");
var Docker = require('dockerode');
var bodyParser = require('body-parser');
var multer  = require('multer');
var stream = require('stream');
var docker = new Docker({
   socketPath: '/var/run/docker.sock'
 });





app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('dockerfile'));


  var feedback = {data:[]};
   var str = JSON.stringify(feedback);
   fs.writeFile('data.json', str, function (err) {});
   docker.buildImage({
      context: __dirname,
      src: ['Dockerfile']
    }, {
      t: 'firstimage2'
    }, function(error, stream) {
      if (error) {
         return console.error(error);
      }
      stream.pipe(process.stdout, {
         end: true
       });
     

       stream.on('end', function() {
        docker.createContainer({
          Image: 'firstimage2', 
          name: 'testcon1',
            HostConfig: {
              Privileged: true
            }
          }, function(err, container) {
            container.attach({
              stream: true,
              stdout: true,
              stderr: true,
              tty: true
            }, function(err, stream) {
              if (err) return err;
             //console.log(container.logs());
              stream.pipe(process.stdout);
              containerid = container.id;
              
              response = 'create & start container\n';
             
              container.start(function(err, data) {
                containerLogs(container);
                
                if (err) return err;
              });
             
                 
            });
          }); 
       });
       
         
       response = "image create \n";
    });
   
   return 1;
}
module.exports = done;
