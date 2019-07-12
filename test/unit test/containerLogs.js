
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
    
      function containerLogs() {
     
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
            if (err) return;
           //console.log(container.logs());
            stream.pipe(process.stdout);
            containerid = container.id;
            
            response = 'create & start container\n';
            
            container.start(function(err, data) {
              var logStream = new stream.PassThrough();
        logStream.on('data', function(chunk){
              var data = fs.readFileSync("data.json");
              var feedback = data.toString();
              feedback = JSON.parse(feedback);
              feedback.data.push(chunk.toString());
              var str = JSON.stringify(feedback);
              fs.writeFile('data.json',str,function(err){
                 
              });
              console.log(str.toString());
              
          
           
        });
      
        container.logs({
          follow: true,
          stdout: true,
          stderr: true
        }, function(err, stream){
          if(err) {
            return logger.error(err.message);
          }
          container.modem.demuxStream(stream, logStream, logStream);
          stream.on('end', function(){
            logStream.end('!stop!',function(){
              fs.readFile('data.json',function(err,data){
                 if(err){
                    console.log(err);
                 }
                 res.json(JSON.parse( data.toString()));
                 
                 console.log(data.toString());
               });
            });
            
          });
      
          setTimeout(function() {
            stream.destroy();
          }, 2000);
        });
        
              
        if (err) return;
            });
           
               
          });
        });
        return 1;
      }


      module.exports=containerLogs;
    
