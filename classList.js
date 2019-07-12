var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var archiver = require('archiver');
var csv=require('csvtojson');





router.use(multer({ dest: './data/tmp'}).array('feedback'));

var choosedStudent = "";
var choosedSubmission = "";
router.post('/chooseStudent', function (req, res) {
        //console.log(req.body);
        choosedStudent = JSON.parse(JSON.stringify(req.body)).IDandName;
        //console.log(choosedStudent);
        res.end();
})

router.post('/downloadFeedback', function (req, res) {
    var output = fs.createWriteStream(__dirname+'/data/tmp/MarksandFeedbacks.zip');
    var archive = archiver('zip');
    archive.on('error', function(err){
        throw err;
    });
    archive.pipe(output);

    var data = fs.readFileSync('path.json');
     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
    var data1 = fs.readFileSync(tmpPath+'/classList.json');
    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);

    for(var i = 0;i<feedback1.length;i++){
        
        archive.file(__dirname+"/data/student/"+feedback1[i].IDandName+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment+"/submissionList.json", { name: feedback1[i].IDandName+".json" });
            console.log("111");
    }
    archive.finalize();
    //console.log("222");
    res.json(feedback);
    
})

router.post('/downloadAllCode', function (req, res) {
    //console.log("222");
    var data = fs.readFileSync('path.json');
    var feedback = data.toString();
    feedback = JSON.parse(feedback);
    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
  
    var output = fs.createWriteStream(__dirname+'/data/tmp/allCode.zip');
    var archive = archiver('zip');
    archive.on('error', function(err){
        throw err;
    });
    archive.pipe(output);

    var data1 = fs.readFileSync(tmpPath+'/classList.json');
    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    
    for(var i = 0;i<feedback1.length;i++){
        
        archive.directory(__dirname+"/data/student/"+feedback1[i].IDandName+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment, feedback1[i].IDandName);
            //console.log("111");
    }
    archive.finalize();
    
    res.json(feedback);
    
})

router.post('/downloadOneCode', function (req, res) {

    var data = fs.readFileSync('path.json');
    var feedback = data.toString();
    feedback = JSON.parse(feedback);
  
    var output = fs.createWriteStream(__dirname+'/data/tmp/Code.zip');
    var archive = archiver('zip');
    archive.on('error', function(err){
        throw err;
    });
    archive.pipe(output);

    
    archive.directory(__dirname+"/data/student/"+JSON.parse(JSON.stringify(req.body)).IDandName+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment, JSON.parse(JSON.stringify(req.body)).IDandName);
            console.log("111");
    archive.finalize();
    //console.log("222");
    res.json(feedback);
    
})




router.post('/chooseSubmission', function (req, res) {
        
    choosedSubmission = JSON.parse(JSON.stringify(req.body)).submission;
    res.end();
})

router.get('/getName', function (req, res) {
    
   res.json({"data":choosedStudent});

})

router.get('/getSubmissionList', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/student/"+choosedStudent+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;

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
     var tmpPath = __dirname+"/data/student/"+choosedStudent+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
    var data1 = fs.readFileSync(tmpPath+'/submissionList.json');
    var feedback1 = data1.toString();
    //console.log("yyy");
    feedback1 = JSON.parse(feedback1);
    for(var i = 0; i < feedback1.length;i++){
        //console.log("xxx");
        if(choosedSubmission == feedback1[i].submission){
            var feedbacksend = [{"feedback":""}];
            for(var j = 0; j < (feedback1[i].feedback).length;j++){
                feedbacksend[0].feedback = feedbacksend[0].feedback+"\n"+feedback1[i].feedback[j];
                //console.log("zzz");
                
            }
            res.json(feedbacksend);
            return;
            
        }
    }
    res.json(feedback1);
})

router.get('/getClassList', function (req, res) {
    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;

    var data1 = fs.readFileSync(tmpPath+'/classList.json')
 

   var feedback1 = data1.toString();
   feedback1 = JSON.parse(feedback1);
   res.json(feedback1);


})

router.post('/uploadFeedback', function (req, res) {
 
    var data = fs.readFileSync('path.json');
    var feedback = JSON.parse(data.toString());
    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
    var des_file = tmpPath + "/" + "feedback.csv";
    var data = fs.readFileSync(__dirname+"/"+ req.files[0].path);
    fs.writeFileSync(des_file,data);
    csv().fromFile(des_file).then((feedback0)=>{
        //console.log(feedback0);
    
        //console.log("111"+feedback0[0].toString());
        var data4 = fs.readFileSync(tmpPath+'/assignmentDetail.json');
        
        var data1 = fs.readFileSync(tmpPath+'/classList.json')
        var feedback1 = data1.toString();
        feedback1 = JSON.parse(feedback1);

        
        for (let i = 0; i < feedback0.length; i++) {
            for (let j = 0; j < feedback1.length; j++) {
                //console.log("111"+feedback1[j].IDandName+feedback0[i]);
                if (feedback1[j].IDandName == feedback0[i]["ID and Name"]) {
                        feedback1[j].manualMark = feedback0[i]["Manual Mark"];
                        //console.log("111"+feedback1[j].manualMark);
                        feedback1[j].feedback = feedback0[i].Comment;
                        
                        var tmpPath1 = __dirname+"/data/student/"+feedback1[j].IDandName+"/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+feedback.assignment;
                        
                        var data4 = fs.readFileSync(tmpPath+'/assignmentDetail.json');
                        var feedback4 = data4.toString();
                        feedback4 = JSON.parse(feedback4);
                        var data5 = fs.readFileSync(tmpPath1+'/submissionList.json');
                        var feedback5 = data5.toString();
                        feedback5 = JSON.parse(feedback5);
                        feedback5[feedback5.length-1].manualMark = feedback0[i]["Manual Mark"];
                        //console.log("333"+feedback5[feedback5.length-1].manualMark);
                        
                        var tmpFinalScore =  parseInt(feedback5[feedback5.length-1].finalMark);
                        if(feedback4.FinalMark=="Manual Mark"){
                            //console.log("222"+feedback1[j].manualMark);
                            tmpFinalScore =  parseInt(feedback5[feedback5.length-1].manualMark);
                        } else if(feedback4.FinalMark=="Best Mark"){
                            if ( parseInt(tmpFinalScore)< parseInt(feedback5[feedback5.length-1].manualMark)) {
                                
                                tmpFinalScore =  parseInt(feedback5[feedback5.length-1].manualMark);
                                //console.log("555"+tmpFinalScore);
                            }
                        }
                        if (parseInt(feedback4.MaximumFeedbackMark)<tmpFinalScore) {
                            tmpFinalScore = parseInt(feedback4.MaximumFeedbackMark);
                        }
                        if (parseInt(feedback4.MaximumMark)<tmpFinalScore) {
                            tmpFinalScore = parseInt(feedback4.MaximumMark);
                        }
                        if (feedback5[feedback5.length-1].extension == "Y") {

                            var data7 = fs.readFileSync(tmpPath+'/extensionLists.json');
                            var feedback7 = data7.toString();
                            feedback7 = JSON.parse(feedback7);
                            for (let i = 0; i < feedback7.length; i++) {
                                if (feedback7[i].Username == feedback1[j].IDandName) {
                                    if ( parseInt(feedback7[i].MaximumMark)<tmpFinalScore) {
                                        tmpFinalScore =  parseInt(feedback2[i].MaximumMark);
                                        break;
                                    }
                                } 
                            }
                        }
                        feedback5[feedback5.length-1].finalMark = tmpFinalScore;
                        
                        feedback1[j].Score=tmpFinalScore;
                        //console.log("444"+tmpFinalScore);
                        var str5 = JSON.stringify(feedback5);
                        fs.writeFileSync(tmpPath1+'/submissionList.json',str5);  

                    }
                
            }
            
        }
        var str = JSON.stringify(feedback1);
        fs.writeFileSync(tmpPath+'/classList.json',str);  

        res.json(feedback1);
    });

 
 })

module.exports = router;