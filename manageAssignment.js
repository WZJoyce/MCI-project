var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Docker = require('dockerode');
var multer  = require('multer');
var stream = require('stream');
var docker = new Docker({
   socketPath: '/var/run/docker.sock'
 });
 var fs = require('fs');
 var extract = require('extract-zip');
 
 
router.use(multer({ dest: './data/tmp'}).array('dockerfile'));

router.use(bodyParser.urlencoded({ extended: false }));
var fs = require('fs');

var choosedAssignment = "";

router.post('/uploadDockerfile', function (req, res) {
 
    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+choosedAssignment;
    var des_file = tmpPath + "/" + "Dockerfile&TestScript.zip";
    var data = fs.readFileSync(__dirname+"/"+ req.files[0].path);
    fs.writeFileSync(des_file,data);
    
    
    extract(des_file, {dir: tmpPath}, function (err) {
 // extraction is complete. make sure to handle the err

        
        res.json(feedback);
    })
 })

router.post('/chooseAssignment', function (req, res) {
        
        choosedAssignment = JSON.parse(JSON.stringify(req.body)).AnchorText;
        res.end();
})

router.get('/getAssignmentList', function (req, res) {
    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course;

    var data1 = fs.readFileSync(tmpPath+'/assignmentList.json')
 

   var feedback1 = data1.toString();
   feedback1 = JSON.parse(feedback1);
   res.json(feedback1);

})

router.get('/getAssignmentDetail', function (req, res) {

    var data = fs.readFileSync('path.json');
    var feedback = JSON.parse(data.toString());
    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course+"/"+choosedAssignment;
    //console.log(tmpPath);
    var data1 = fs.readFileSync(tmpPath+'/assignmentDetail.json');
    //console.log(JSON.parse( data1.toString()));
    res.json(JSON.parse( data1.toString()));


})



router.post('/AnchorText', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;
    

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.AnchorText = JSON.parse(JSON.stringify(req.body)).AnchorText;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);

         res.json(feedback);

})
router.post('/ShowAssignment', function (req, res) {
    var data0 = fs.readFileSync('path.json');
    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;
    
    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

    var feedback = data.toString();
    feedback = JSON.parse(feedback);
    feedback.ShowAssignment = JSON.parse(JSON.stringify(req.body)).ShowAssignment;
    var str = JSON.stringify(feedback);
    fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);

    var data2 = fs.readFileSync(__dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+'/assignmentList.json');

    var feedback2 = data2.toString();
    feedback2 = JSON.parse(feedback2);
    for(var i = 0;i<feedback2.length;i++){
        if(feedback2[i].AnchorText==choosedAssignment){
            feedback2[i].ShowAssignment = JSON.parse(JSON.stringify(req.body)).ShowAssignment;
            var str2 = JSON.stringify(feedback2);
            fs.writeFileSync(__dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+'/assignmentList.json',str2);
            res.json(feedback);
        }
    }
    
    

})

router.post('/AllowStudentSubmissions', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');


         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.AllowStudentSubmissions = JSON.parse(JSON.stringify(req.body)).AllowStudentSubmissions;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);

         res.json(feedback);

})

router.post('/ShowFeedbacktoStudent', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');


         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.ShowFeedbacktoStudent = JSON.parse(JSON.stringify(req.body)).ShowFeedbacktoStudent;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);

         res.json(feedback);

})

router.post('/RepositoryPath', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.RepositoryPath = JSON.parse(JSON.stringify(req.body)).RepositoryPath;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);

})

router.post('/RunAssignmentTestScript', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.RunAssignmentTestScript = JSON.parse(JSON.stringify(req.body)).RunAssignmentTestScript;
         var str = JSON.stringify(feedback);
         fs.writeFile(tmpPath+'/assignmentDetail.json',str,function(err){
            
        })
        res.json(feedback);
})

router.post('/ReturnorExportPreviousSubmission', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.ReturnorExportPreviousSubmission = JSON.parse(JSON.stringify(req.body)).ReturnorExportPreviousSubmission;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/RevisionstoReturnorExport', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.RevisionstoReturnorExport = JSON.parse(JSON.stringify(req.body)).RevisionstoReturnorExport;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/ConfirmResubmissionRequest', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');
         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.ConfirmResubmissionRequest = JSON.parse(JSON.stringify(req.body)).ConfirmResubmissionRequest;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/DueDate', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.DueDate = JSON.parse(JSON.stringify(req.body)).DueDate;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/CourseWeight', function (req, res) {
    //console.log(req.body);
    
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.CourseWeight = JSON.parse(JSON.stringify(req.body)).CourseWeight;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/MaximumMark', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.MaximumMark = JSON.parse(JSON.stringify(req.body)).MaximumMark;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/MaximumFeedbackMark', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.MaximumFeedbackMark = JSON.parse(JSON.stringify(req.body)).MaximumFeedbackMark;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/FinalMark', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.FinalMark = JSON.parse(JSON.stringify(req.body)).FinalMark;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/FeedbackMark', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;

    var data = fs.readFileSync(tmpPath+'/assignmentDetail.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.FeedbackMark = JSON.parse(JSON.stringify(req.body)).FeedbackMark;
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/assignmentDetail.json',str);
         res.json(feedback);
})

router.post('/NewExtension', function (req, res) {
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+choosedAssignment;
    //console.log(tmpPath);
    var data = fs.readFileSync(tmpPath+'/extensionLists.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.push(JSON.parse(JSON.stringify(req.body)));
         var str = JSON.stringify(feedback);
         fs.writeFileSync(tmpPath+'/extensionLists.json',str);
         res.json(feedback);
})



router.post('/createAssignment', function (req, res) {
    //console.log(req.body);
    var data0 = fs.readFileSync('path.json');

    var feedback0 = data0.toString();
    feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course;
    var path = tmpPath+"/"+(JSON.parse(JSON.stringify(req.body)).AnchorText);

    fs.mkdir(path, function (err) {
        if(err) {
        console.log(err);
        }
        fs.readFile(tmpPath+'/assignmentList.json',function(err,data){
            if(err){
                return console.error(err);
             }
    
             var feedback = data.toString();
             feedback = JSON.parse(feedback);
             if (!(JSON.parse(JSON.stringify(req.body)).AnchorText in feedback)) {
                feedback1 = {"AnchorText":"",
                "RepositoryPath1": "",
                "AnchorText1": ""};
                var tmpFeedback = JSON.parse(JSON.stringify(req.body));
                feedback1.AnchorText = tmpFeedback.AnchorText;
                feedback1.AnchorText1 = tmpFeedback.AnchorText;
                feedback1.RepositoryPath1 = "/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+feedback0.course+"/"+tmpFeedback.AnchorText;
                feedback.push(feedback1);
                var str = JSON.stringify(feedback);
                fs.writeFile(tmpPath+'/assignmentList.json',str,function(err){
                    var feedback2 = {"AnchorText":JSON.parse(JSON.stringify(req.body)).AnchorText,"ShowAssignment":"N","AllowStudentSubmissions":"N","ShowFeedbacktoStudent":"N","RepositoryPath":feedback1.RepositoryPath1,"RunAssignmentTestScript":"N","ReturnorExportPreviousSubmission":"","RevisionstoReturnorExport":"","ConfirmResubmissionRequest":"N","DueDate":"","CourseWeight":"","MaximumFeedbackMark":"","MaximumMark":"","FinalMark":"","FeedbackMark":"","CourseWeight":""};
                    var str2 = JSON.stringify(feedback2);
                    fs.writeFile(path+'/assignmentDetail.json',str2,function(err){
                        fs.writeFile(path+'/extensionLists.json','[]',function(err){
                            fs.writeFile(path+'/classList.json','[]',function(err){
                            });
                            res.json(feedback);
                        });
                    });
                    
                });
                
                
    
             }else{
                return console.log("repeat anchortext");
             }
             
        });
    })

    
})


module.exports = router;