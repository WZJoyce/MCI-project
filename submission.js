var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var sd = require('silly-datetime');
var logger = require('logger');
var bodyParser = require('body-parser');
var Docker = require('dockerode');
var stream = require('stream');
var moment = require('moment');
var docker = new Docker({
   socketPath: '/var/run/docker.sock'
 });

router.use(multer({ dest: './data/tmp'}).array('file'));

router.use(bodyParser.urlencoded({ extended: false }));


router.post('/chooseSubmission', function (req, res) {
        
        var data = fs.readFileSync('path.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.submission = JSON.parse(JSON.stringify(req.body)).submission;
         var str = JSON.stringify(feedback);
         fs.writeFileSync('path.json',str);
         res.json(feedback.submission);
        
})

router.get('/getSubmissionList', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/student/"+feedback.person+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
     var data1 = fs.readFileSync(tmpPath+'/submissionList.json');
    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    //console.log(feedback1);
    res.json(feedback1);

})

router.get('/getFeedback', function (req, res) {

    var data = fs.readFileSync('path.json');
     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/student/"+feedback.person+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
    var data1 = fs.readFileSync(tmpPath+'/submissionList.json');
    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    for(var i = 0; i < feedback1.length;i++){
        if(feedback.submission == feedback1[i].submission){
            var feedbacksend = [{"feedback":"Start"}];
            for(var j = 0; j < (feedback1[i].feedback).length;j++){
                feedbacksend[0].feedback = feedbacksend[0].feedback+"<br>"+feedback1[i].feedback[j];
                
            }
            res.json(feedbacksend);
            return;
            
        }
    }

    

})

router.get('/getFeedbackStu', function (req, res) {

  var data = fs.readFileSync('path.json');
   var feedback = data.toString();
   feedback = JSON.parse(feedback);
   var tmpPath = __dirname+"/data/student/"+feedback.person+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
   var tmpPath1 = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;

   var data0 = fs.readFileSync(tmpPath1+'/assignmentDetail.json');
  var feedback0 = data0.toString();
  feedback0 = JSON.parse(feedback0);
  
  if(feedback0.ShowFeedbacktoStudent=="Y"){
    var feedbacksend = [{"feedback":"Start"}];
      var data1 = fs.readFileSync(tmpPath+'/submissionList.json');
      var feedback1 = data1.toString();
      feedback1 = JSON.parse(feedback1);
      for(var i = 0; i < feedback1.length;i++){
          if(feedback.submission == feedback1[i].submission){
              
              for(var j = 0; j < (feedback1[i].feedback).length;j++){
                  feedbacksend[0].feedback = feedbacksend[0].feedback+"<br>"+feedback1[i].feedback[j];
                  
              }
              res.json(feedbacksend);
              return;
              
          }
      }
  }else{
    res.json(feedbacksend);
  }
})

router.post('/uploadNewSubmission', function (req, res) {
 
    var data = fs.readFileSync('path.json');
    //console.log(">0");
    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/student/"+feedback.person+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var data2 = fs.readFileSync(tmpPath+'/submissionList.json');
    var feedback2 = data2.toString();
    feedback2 = JSON.parse(feedback2);
    var des_file = tmpPath + "/" + 'NO.'+feedback2.length+'-'+time;
    var data = fs.readFileSync(__dirname+"/"+ req.files[0].path);
    fs.writeFileSync(des_file,data);
    var feedback1 = {"submission":'NO.'+(feedback2.length+1)+'-'+time,"submissionScore":"0","manualMark":"0","finalMark":"0","feedback":[],"time":time,"extension":"N"};
    //console.log(">0");
    //+run container
    //+put log to submissionscore & feedback
    var tmpPath1 = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;

   var data0 = fs.readFileSync(tmpPath1+'/assignmentDetail.json');
  var feedback0 = data0.toString();
  feedback0 = JSON.parse(feedback0);
  var duedate = moment(feedback0.DueDate);
  
  if(moment(time).unix()-moment(duedate).unix()>0){
    console.log(">0");
      var dataList = fs.readFileSync(tmpPath1+'/extensionLists.json');
      var feedbackList = dataList.toString();
      feedbackList = JSON.parse(feedbackList);
      for(var j = 0; j < feedbackList.length;j++){
        if(feedbackList[j].Username == feedback.person){
          var tmpDate = moment(feedbackList[j].DueDate2);
          if(moment(time).unix()-moment(tmpDate)>0){
            res.json(feedback0);
            return;
          }else{
            feedback1.extension = "Y";
            break;
          }
        }
        if(j==feedbackList.length-1){
          res.json(feedback0);
          return;
        }
      }
  }
  
  

  if(feedback0.RunAssignmentTestScript=="Y"){
    fs.writeFileSync(__dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment+"/"+ req.files[0].originalname,data);
    
    docker.buildImage({
      context: tmpPath1,
      src: ['Dockerfile',req.files[0].originalname]
    }, {
        t: (feedback.assignment).toLowerCase()
    }, function(error, stream) {
        if (error) {
          res.json(feedback0);
        return console.error(error);
        }
        stream.pipe(process.stdout, {
        end: true
        });
    

        stream.on('end', function() {
          done();
        });
        
        
        //console.log("image create \n");
    });
    
    
    function done() {
        docker.createContainer({
        Image: (feedback.assignment).toLowerCase(), 
        name: (feedback.person+"-"+feedback.year+"-"+feedback.teachingPeriod+"-"+feedback.course+"-"+feedback.assignment+"-"+feedback.person).toLowerCase(),
        //Cmd: ['java','testScript'],
        'Volumes': {
          '/usr/src/tmp': {}
        },
        'HostConfig': {
          'Binds': [__dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment+':/usr/src/tmp']
        }
        }, function(err, container) {
          if (err) console.log(err+"111");
          container.attach({
            stream: true,
            stdout: true,
            stderr: true,
            tty: true
          }, function(err, stream) {
            if (err) return;
           //console.log(container.logs());
            stream.pipe(process.stdout);
            
            response = 'create & start container\n';
            console.log(response);
            container.start(function(err, data) {
              //runExec(container);
              containerLogs(container);
              /*

              */
            });
              if (err) return;
            });
           
               
          
        });
      }
  
      function runExec(container) {

        var options = {
          Cmd: ['javac', 'testScript'],
          //Env: ['VAR=ttslkfjsdalkfj'],
          AttachStdout: true,
          AttachStderr: true
        };
      
        container.exec(options, function(err, exec) {
          if (err) return;
          exec.start(function(err, stream) {
            if (err) return;
      
            container.modem.demuxStream(stream, process.stdout, process.stderr);
      
            exec.inspect(function(err, data) {
              if (err) return;
              console.log(data);
            });
          });
        });
      }

      function containerLogs(container) {
  
        // create a single stream for stdin and stdout
        var logStream = new stream.PassThrough();
        logStream.on('data', function(chunk){
            
            //var data3 = fs.readFileSync(tmpPath+'/submissionList.json');
            //var feedback3 = data3.toString();
            //feedback3 = JSON.parse(feedback3);
            //for(var i = 0; i < feedback3.length;i++){
                //if(("NO."+feedback3.length+"-"+time) == feedback3[i].submission){
                    console.log("enter");
                    feedback1.feedback.push(chunk.toString());
                //}
            //}
           
        });
      
        container.logs({
          follow: true,
          stdout: true,
          stderr: true
        }, function(err, stream){
          if(err) {
            return err.message;
          }
          container.modem.demuxStream(stream, logStream, logStream);
          stream.on('end', function(){
            logStream.end('END',function(){
              container.remove({
                force: true
              }, function() {
                var data4 = fs.readFileSync(tmpPath1+'/assignmentDetail.json');
                var feedback4 = data4.toString();
                feedback4 = JSON.parse(feedback4);
                var tmpFeedback = feedback1.feedback;
                feedback1.submissionScore = tmpFeedback[(tmpFeedback.length)-2];
                var data6 = fs.readFileSync(tmpPath1+'/classList.json');
                var feedback6 = data6.toString();
                feedback6 = JSON.parse(feedback6);
                var tmpFinalScore = 0;
                if (feedback4.FinalMark=="") {
                    tmpFinalScore =  parseInt(feedback1.submissionScore);
                    //console.log("111"+tmpFinalScore);
                } else if(feedback4.FinalMark=="Manual Mark"){
                    tmpFinalScore =  parseInt(feedback1.manualMark);
                } else if(feedback4.FinalMark=="Feedback Mark"){
                  
                    tmpFinalScore =  parseInt(feedback1.submissionScore);
                    //console.log("111"+tmpFinalScore);
                } else{
                    if (parseInt(feedback1.submissionScore)>= parseInt(feedback1.manualMark)) {
                        tmpFinalScore = parseInt(feedback1.submissionScore);
                    } else {
                        tmpFinalScore =  parseInt(feedback1.manualMark);
                    }
                }
                if (parseInt(feedback4.MaximumFeedbackMark)<tmpFinalScore) {
                    tmpFinalScore = parseInt(feedback4.MaximumFeedbackMark);
                }
                if (parseInt(feedback4.MaximumMark)<tmpFinalScore) {
                  tmpFinalScore = parseInt(feedback4.MaximumMark);
                }
                if (feedback1.extension == "Y") {

                    var data7 = fs.readFileSync(tmpPath1+'/extensionLists.json');
                    var feedback7 = data7.toString();
                    feedback7 = JSON.parse(feedback7);
                    for (let i = 0; i < feedback7.length; i++) {
                        if (feedback7[i].Username == feedback.person) {
                            if ( parseInt(feedback7[i].MaximumMark)<tmpFinalScore) {
                                tmpFinalScore =  parseInt(feedback2[i].MaximumMark);
                                break;
                            }
                        } 
                    }
                }
                feedback1.finalMark = tmpFinalScore;
                for (let i = 0; i < feedback6.length; i++) {
                  if (feedback6[i].IDandName == feedback.person) {
                    if ( parseInt(feedback6[i].Score)<tmpFinalScore) {
                      //console.log(tmpFinalScore);
                      feedback6[i].Score=tmpFinalScore;
                      break;
                    }

                  }
                  
                }
                
                feedback2.push(feedback1);
                var str = JSON.stringify(feedback2);
                fs.writeFileSync(tmpPath+'/submissionList.json',str);  
                var str6 = JSON.stringify(feedback6);
                fs.writeFileSync(tmpPath1+'/classList.json',str6);  
                console.log('container removed');
                res.json(feedback0);
              });
            });
            
          });
      
          //setTimeout(function() {
            //stream.destroy();
          //}, 20000);
        });
      }
    
    
    }



 
 })

module.exports = router;