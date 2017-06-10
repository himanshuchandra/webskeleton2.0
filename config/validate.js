'use strict';

const validate={

  username:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[A-Za-z0-9._]+$/;
      if(string.length<5 || string.length>20 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      } 
  },
  password:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[a-z0-9]+$/;
      if(string.length!=32 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      } 
  },
  email:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[A-Z0-9a-z!@#$%&*+-/=?^_`'{|}~]+$/;
      if(string.length<5 || string.length>50 || string.match(letters)===null || string.match("@")===null){
          return false;
      }
      else{
          return true;
      }   
  },
  mobile:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[0-9]+$/;
      if(string.length!=10 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      }  
  },
  number:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[0-9]+$/;
      if(string.length<3 || string.length>15 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      }   
  },
  string:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[A-Za-z0-9-/_',. ]+$/;
      if(string.length<2 || string.length>60 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      }  
  },
  name:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[A-Za-z ]+$/;
      if(string.length<3 || string.length>30 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      }  
  },
  code:function(string){
      if(string===undefined){
          return false;
      }
      var string=string.trim();
      var letters = /^[A-Za-z0-9+]+$/;
      if(string.length<2 || string.length>16 || string.match(letters)===null){
          return false;
      }
      else{
          return true;
      }  
  }
};

module.exports=validate;
