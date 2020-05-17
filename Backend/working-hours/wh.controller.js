
const whmodele = require('./wh.model');

const mongoose = require('mongoose');





module.exports.addWh = function(req, res) {
    whmodele.find({userId: req.body.userId , workDay : new Date(req.body.workDay)}, function(err, rslt) {
      if (err) {
        console.log(err);
      }
      if (rslt.length === 0 ) {
        const wh = new whmodele({
          workDay: new Date(req.body.workDay),
          arrivingHour :req.body.arrivingHour ,
          exithour : req.body.exithour,
          lunchbreak: req.body.lunchbreak,
          userId: req.body.userId,
           
         });
        wh.save(function(err, data) {
          if (err) res.send({ err: err });
          else {
            
            res.status(200).json(data);
          }
        });
      } else {
        res.send({ message: "you already added your working hours for this day" });
       
      }
    });
   
  };
  var whs = mongoose.model('WorkingHours');


  module.exports.getWh = function(req, res) {
    whmodele.find({}, function(err, rslt) {
      if (err) {
        console.log(err);
      }
      if (!rslt) {
        
        res.send({ message: "error" });
      } else {
        
   
var rstt = [];
        rslt.forEach(element => {
            var x = element.toObject();
            
          var workinghours1=msToHMS(calculateTimeDifference(element.arrivingHour,element.exithour));
          var workinghours =msToHMS(calculateTimeDifference(element.lunchbreak,workinghours1))


          x.workinghours = workinghours;
          rstt.push(x);

                     });
        res.status(200).json(rstt);
      }
    });
  };

  module.exports.getOneWh = function(req, res) {
    whmodele.find ({userId: req.params.userId}, function(err, rslt) {

      console.log(rslt);
      if (err) {
        console.log(err);
      }
      if (!rslt) {
        res.send({ message: "error" });
      } else {
        var rstt = [];
        rslt.forEach(element => {
            var x = element.toObject();
            
          var workinghours1=msToHMS(calculateTimeDifference(element.arrivingHour,element.exithour));
          var workinghours =msToHMS(calculateTimeDifference(element.lunchbreak,workinghours1))


          x.workinghours = workinghours;
          rstt.push(x);

                     });
        res.status(200).json(rstt);
       
      }
    });
  };


  function calculateTimeDifference(ArH,ExH) {
  
    var date1=new Date("01-01-2020 " + ExH + ":00");
var date2=new Date("01-01-2020 " + ArH + ":00");
//diff will be the number of milliseconds between the two times.
var diff = Math.abs(date1 - date2);
return diff;
}
function msToHMS( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return hours+":"+minutes+":"+seconds;
}
