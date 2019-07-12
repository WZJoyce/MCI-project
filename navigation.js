var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


var stream = require('stream');

router.use(bodyParser.urlencoded({ extended: false }));

var fs = require('fs');

router.post('/year', function (req, res) {
   
    year = JSON.parse(JSON.stringify(req.body)).year;
    
        var data = fs.readFileSync('path.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.year = JSON.parse(JSON.stringify(req.body)).year;
         var str = JSON.stringify(feedback);

         fs.writeFileSync('path.json',str);
         res.json(feedback);
        

})

router.post('/teachingPeriod', function (req, res) {
   
    teachingPeriod = JSON.parse(JSON.stringify(req.body)).teachingPeriod;
    
        var data = fs.readFileSync('path.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.teachingPeriod = JSON.parse(JSON.stringify(req.body)).teachingPeriod;
         var str = JSON.stringify(feedback);
         fs.writeFileSync('path.json',str);
         res.json(feedback);

})

router.post('/course', function (req, res) {
   
    course = JSON.parse(JSON.stringify(req.body)).AnchorText2;
    
        var data = fs.readFileSync('path.json');
       

         var feedback = JSON.parse(data.toString());

         feedback.course = JSON.parse(JSON.stringify(req.body)).AnchorText2;

         var str = JSON.stringify(feedback);
         fs.writeFileSync('path.json',str);
        res.json(feedback);
        
})

router.post('/assignment', function (req, res) {
   //console.log(req.body);
    assignment = JSON.parse(JSON.stringify(req.body)).AnchorText;
    
        var data = fs.readFileSync('path.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         feedback.assignment = JSON.parse(JSON.stringify(req.body)).AnchorText;
         var str = JSON.stringify(feedback);
         fs.writeFileSync('path.json',str);
        res.json(feedback);
         

})


router.get('/getCourse', function (req, res) {
   
        var data = fs.readFileSync('path.json');

         var feedback = data.toString();
         feedback = JSON.parse(feedback);
         var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod;

         feedback.course = "";
         var str = JSON.stringify(feedback);
         fs.writeFileSync('path.json',str);
         var data1 = fs.readFileSync(tmpPath+'/courseList.json');
            
    
        var feedback1 = data1.toString();
        feedback1 = JSON.parse(feedback1);
        res.json(feedback1);
        res.end();
        

})

router.get('/getAssignment', function (req, res) {
   
        var data = fs.readFileSync('path.json');

         var feedback = JSON.parse(data.toString());

         var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course;

         var data1 = fs.readFileSync(tmpPath+'/assignmentList.json')
      
    
        var feedback1 = data1.toString();
        feedback1 = JSON.parse(feedback1);
        res.json(feedback1);
             

})

router.get('/getCourseStu', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod;

     feedback.course = "";
     var str = JSON.stringify(feedback);
     fs.writeFileSync('path.json',str);
     var data1 = fs.readFileSync(tmpPath+'/courseList.json');
        

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    var feedback2 = [];
    for(var i = 0;i<feedback1.length;i++){
        if(feedback1[i].showCourseToStudent=="Y"){
            feedback2.push(feedback1[i]);
        }
    }
    res.json(feedback2);
    res.end();
    

})

router.get('/getAssignmentStu', function (req, res) {

    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+feedback.course;

     var data1 = fs.readFileSync(tmpPath+'/assignmentList.json')
    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    var feedback2 = [];
    for(var i = 0;i<feedback1.length;i++){
        if(feedback1[i].ShowAssignment=="Y"){
            feedback2.push(feedback1[i]);
        }
    }
    res.json(feedback2);
    res.end();
         

})

module.exports = router;