var dbOperations= {

checkUser:function (userObject,response){
    
    var User = require("./schemadefine");
    console.log("schemadefine");
    User.find({"useremail":userObject.useremail},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");
            response.json({msg:"Email already registered"});
        }
        else
            {
                console.log("notfound");
                caller.checkusernamecaller(userObject,response);
            }
        //response.json({result});
        
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,   
checkUsername:function (userObject,response){
    
    var User = require("./schemadefine");
    
    User.find({"username":userObject.username},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
      console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");
            response.json({msg:"Username is already taken"});
        }
        else
            {
                console.log("notfound");
                caller.registercaller(userObject,response);
            }
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,   
addUser:function(data,response){
var User = require("./schemadefine");
User.create(data,function(error,result){
    
     //User.create({"name":"Ram","phone":[2222,3333],"address":[{"state":"Delhi","pincode":2222},{"state":"Delhi","pincode":2222}]},function(error,response){
   if(error){
       response.json({"msg":"Can't Add Error Occured "});
   }
    else{
       response.json({"msg":"Register SuccessFully...","finaldata":result});
        console.log(result);
   }

});
}
,
doLogin:function (loginObject,response){
    
    var User = require("./schemadefine");
    
    User.find({
     "$and":[
        {
            "$or": [{
        "useremail":loginObject.loginid
        }, 
                       {
        "username": loginObject.loginid
        }]
        },
         {
             "password1":loginObject.loginpassword
         }
      ]
    },function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result.data);
        response.json({result});
        //response.json({msg:"Logged in SuccessFully..."});
       
   }
});
}
,
sendCode:function (codeObject,response){
    
    var User = require("./schemadefine");
   
    User.find({"useremail":codeObject.cemail},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");

            var code = (Math.floor(100000 + Math.random() * 900000)).toString();
            code = Math.floor(code.substring(-2)/100);   
            if(code<1000)
            {
                code=code+1000;
            }

            codeObject.fcode=code;
            caller.savecode(codeObject,response);

        }
        else
            {
                console.log("notfound");
                response.json({msg:"Email not registered"});
            }
       
   }
});
},

forgotpass:function (codeObject,response){
    
    var User = require("./schemadefine");
  
    console.log(codeObject.fcode);
    User.update({useremail:codeObject.cemail}, {$set:{forgotpasscode:codeObject.fcode}},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
       response.json({msg:"found",code:codeObject.fcode});
       
   }
});
}  

}
module.exports =dbOperations; 

var caller={
    
    checkusernamecaller:function(data,response){
        dbOperations.checkUsername(data,response);
    },
    registercaller:function(data,response){
        dbOperations.addUser(data,response);
    },
    savecode:function(data,response){
        dbOperations.forgotpass(data,response);
    }
}
//findUser("Ram");
