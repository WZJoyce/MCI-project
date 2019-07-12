var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/', function (req, res) {
    
    res.sendFile(__dirname+"/sign-in.html");

})

var tmpUser = "";
var tmpPassword = "";

router.post('/postUser', function (req, res) {
    
    //console.log(req.body);
    tmpUser = (JSON.parse(JSON.stringify(req.body))).user ;
    tmpPassword = (JSON.parse(JSON.stringify(req.body))).mypassword;
    res.json(req.body);
})

router.get('/verifyUser', function (req, res) {
        //console.log(tmpUser);
         var data = fs.readFileSync('user.json');
          var feedback = data.toString();
          feedback = JSON.parse(feedback);
          for(var i = 0;i<feedback.length;i++){
              if(tmpUser==feedback[i].user){
                if(feedback[i].mypassword == tmpPassword){
                         
                         var feedback1 = {"year":"2019","teachingPeriod":"Semester1","person":tmpUser,"type":feedback[i].type};
                         //feedback = JSON.parse(feedback);
                         //feedback.year = "2019";
                         //feedback.teachingPeriod = "Semester1";
                         var str = JSON.stringify(feedback1);
                         fs.writeFileSync('path.json',str);
                        //console.log(feedback[i].type);
                    
                    res.json(feedback[i]);
                    return;
                }else{
                    res.json({"type":"wrong password"});
                    return;
                }
              }
          }
         res.json({"type":"no this person"});
         return;
          
 
 })
 




module.exports = router;