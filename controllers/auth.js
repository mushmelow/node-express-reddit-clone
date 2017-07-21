var express = require('express');

module.exports = function(myReddit) {
    var authController = express.Router();
    
    authController.get('/login', function(request, response) {
         response.render('login-form');
    });
    
    authController.post('/login', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
       
        myReddit.checkUserLogin(username, password)
        .then( data => {
            console.log(data);
            
            //console.log("id is "+data.id);
            
            //return a bycript user id
            
                        //npm install cookie-parser
          
            myReddit.createUserSession(data.id)
            .then(sessionId=>{
                response.cookie("SESSION", sessionId);
                //console.log("cookies ",request.cookies);
                response.redirect('/');
            })
            
            
          

            

        })
        .catch(error=>{
            response.sendStatus(401)
        })
         
         
        
    });
    
    authController.get('/signup', function(request, response) {
       response.render('signup-form');
       
    });
    
    authController.post('/signup', function(request, response) {
       
     
       var userInfo={
           username:request.body.username,
           password:request.body.password
       }
     
        myReddit.createUser(userInfo)
        .then(data=>{
            console.log('success'+ data)
            
        response.redirect('/auth/login')
        })
        .catch(function(error) {
            response.render('error', {error: error});
        })
        
     
      
    })
       
       
       
       
     
    
    return authController;
}