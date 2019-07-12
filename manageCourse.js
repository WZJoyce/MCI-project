var express = require('express');
var router = express.Router();

var fs = require('fs');

var choosedCourse = "";

router.post('/chooseCourse', function (req, res) {
        
        choosedCourse = JSON.parse(JSON.stringify(req.body)).AnchorText2;
        //console.log(choosedCourse);
        res.end();
})

router.get('/getCourseList', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = data.toString();
     feedback = JSON.parse(feedback);
     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod;

     var data1 = fs.readFileSync(tmpPath+'/courseList.json');

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    res.json(feedback1);
    res.end();
    

})

router.get('/getCourseDetail', function (req, res) {
    //console.log("111");
    var data = fs.readFileSync('path.json');
    var feedback = JSON.parse(data.toString());
    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
    //console.log(tmpPath);
    var data1 = fs.readFileSync(tmpPath+'/courseDetail.json');
    //console.log(JSON.parse( data1.toString()));
    res.json(JSON.parse( data1.toString()));


})

router.post('/createCourse', function (req, res) {
    
    var data0 = fs.readFileSync('path.json');

     var feedback0 = data0.toString();
     feedback0 = JSON.parse(feedback0);
    var tmpPath = __dirname+"/data/course/"+feedback0.year+"/"+feedback0.teachingPeriod;
    var path = tmpPath+"/"+(JSON.parse(JSON.stringify(req.body)).AnchorText2);

    fs.mkdir(path, function (err) {
        if(err) {
        console.log(err);
        }
        fs.readFile(tmpPath+'/courseList.json',function(err,data){
            if(err){
                return console.error(err);
             }
    
             var feedback = data.toString();
             feedback = JSON.parse(feedback);
             if (!(JSON.parse(JSON.stringify(req.body)).AnchorText2 in feedback)) {
                 //console.log(JSON.parse(JSON.stringify(req.body)));
                feedback1 = {"AnchorText2":"","CourseDirectory":"","showCourseToStudent":"N"};
                var tmpFeedback = JSON.parse(JSON.stringify(req.body));
                feedback1.AnchorText2 = tmpFeedback.AnchorText2;
                feedback1.CourseDirectory = "/"+feedback0.year+"/"+feedback0.teachingPeriod+"/"+tmpFeedback.AnchorText2;
                feedback.push(feedback1);
                var str = JSON.stringify(feedback);
                fs.writeFile(tmpPath+'/courseList.json',str,function(err){
                    var feedback2 = {"showCourseToStudent":"N","usePramarker":"N","courseAnchortext":JSON.parse(JSON.stringify(req.body)).AnchorText2,"coursedirectory":feedback1.CourseDirectory};
                    var str2 = JSON.stringify(feedback2);
                    fs.writeFile(path+'/courseDetail.json',str2,function(err){
                        var feedback3 = [];
                        var str3 = JSON.stringify(feedback3);
                        fs.writeFile(path+'/assignmentList.json',str3,function(err){
                            
                                fs.writeFile(path+'/guest.json',str3,function(err){
                                    fs.writeFile(path+'/marker.json',str3,function(err){
                            
                                    });
                                    res.json(feedback);
                                });
                           
                           
                        });
                        
                    });
                    
                });
                
                
    
             }else{
                return console.log("repeat anchortext");
             }
             
        });
    })

    
})


router.post('/courseAnchortext', function (req, res) {

    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;

    var data1 = fs.readFileSync(tmpPath+'/courseDetail.json');

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    feedback1.courseAnchortext = JSON.parse(JSON.stringify(req.body)).courseAnchortext;
    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/courseDetail.json',str);
    res.json(feedback1);

})

router.post('/showCourseToStudent', function (req, res) {

    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;

    var data1 = fs.readFileSync(tmpPath+'/courseDetail.json');

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    feedback1.showCourseToStudent = JSON.parse(JSON.stringify(req.body)).showCourseToStudent;
    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/courseDetail.json',str);

    var data2 = fs.readFileSync(__dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+'/courseList.json');

    var feedback2 = data2.toString();
    feedback2 = JSON.parse(feedback2);

    for(var i = 0;i<feedback2.length;i++){
        if(choosedCourse==feedback2[i].AnchorText2){
            feedback2[i].showCourseToStudent = JSON.parse(JSON.stringify(req.body)).showCourseToStudent;      
            var str2 = JSON.stringify(feedback2);
            fs.writeFileSync(__dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+'/courseList.json',str2);
              
              res.json(feedback2[i]);
              return;
          }
    }

})

router.post('/usePramarker', function (req, res) {

    var data = fs.readFileSync('path.json');

    var feedback = JSON.parse(data.toString());

    var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;

    var data1 = fs.readFileSync(tmpPath+'/courseDetail.json');

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    feedback1.usePramarker = JSON.parse(JSON.stringify(req.body)).usePramarker;
    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/courseDetail.json',str);
    res.json(feedback1);

})

router.get('/getMarker', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
     //console.log(tmpPath);
     var data1 = fs.readFileSync(tmpPath+'/marker.json')


    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    res.json(feedback1);
         
})

router.post('/addMarker', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;     var data1 = fs.readFileSync(tmpPath+'/marker.json')
     var feedback1 = JSON.parse(data1.toString());
     var tmpReq = JSON.parse(JSON.stringify(req.body));
    feedback1.push(tmpReq);

    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/marker.json',str);
    res.json(feedback1);
         
})

router.post('/deleteMarker', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
     var data1 = fs.readFileSync(tmpPath+'/marker.json')
     var feedback1 = JSON.parse(data1.toString());
     var tmpReq = JSON.parse(JSON.stringify(req.body));

     for(var i = 0; i < feedback1.length;i++){
        if(tmpReq.CurrentMarkers == feedback1[i].CurrentMarkers){
            //console.log("enter");
            feedback1.splice(i,1);
        }
    }

    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/marker.json',str);
    res.json(feedback1);
         
})

router.get('/getGuest', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
     var data1 = fs.readFileSync(tmpPath+'/guest.json')
  

    var feedback1 = data1.toString();
    feedback1 = JSON.parse(feedback1);
    res.json(feedback1);
         
})

router.post('/addGuest', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
     var data1 = fs.readFileSync(tmpPath+'/guest.json')
     var feedback1 = JSON.parse(data1.toString());
     var tmpReq = JSON.parse(JSON.stringify(req.body));
    feedback1.push(tmpReq);

    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/guest.json',str);
    res.json(feedback1);
         
})

router.post('/deleteGuest', function (req, res) {
   
    var data = fs.readFileSync('path.json');

     var feedback = JSON.parse(data.toString());

     var tmpPath = __dirname+"/data/course/"+feedback.year+"/"+feedback.teachingPeriod+"/"+choosedCourse;
     var data1 = fs.readFileSync(tmpPath+'/guest.json')
     var feedback1 = JSON.parse(data1.toString());
     var tmpReq = JSON.parse(JSON.stringify(req.body));

     for(var i = 0; i < feedback1.length;i++){
        if(tmpReq.CurrentGuests == feedback1[i].CurrentGuests){
            //console.log("enter");
            feedback1.splice(i,1);
        }
    }

    var str = JSON.stringify(feedback1);
    fs.writeFileSync(tmpPath+'/guest.json',str);
    res.json(feedback1);     
})

module.exports = router;