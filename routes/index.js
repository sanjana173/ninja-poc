var express = require('express');
var router = express.Router();
var User = require('../models/user');
var userName1;
var localStorage = require('localStorage');

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({username:req.body.username},function(err,data){
		if(data){
			
            if (data.password == req.body.password) {
            
                req.session.userId = data.unique_id;

                res.send({ "Success": "Success!" });
            
            } else {
                res.send({ "Success": "Wrong password!" });
            }
            }else{
			res.send({"Success":"This user Is not registered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		userName1 = data.username;
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username});
		}
	});
});
localStorage.setItem("localUser",userName1);

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/login');
    	}
    });
}
});



	

module.exports = router;