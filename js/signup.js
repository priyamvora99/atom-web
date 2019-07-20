$(document).ready(function(){
    $('#signup').click(function(){
        var details={};
        
        details.email=$('#email').val();
        details.password=$('#password').val();
        details.phone=$('#phone').val().toString();
        console.log(details.phone);
       $.ajax({
            url:'http://127.0.0.1:3000/signup',
            type:'POST',
            data:details,
           
            crossDomain:true,
            success:(data)=>{
                console.log(data);
                
                window.location.href='../html/login.html';
               
                
            },error:(err)=>{
                var a=err.responseJSON;
                var errmsg='';
                if(a.hasOwnProperty('errors')){
                    if(a.errors.email){
                        errmsg=a.errors.email.message;
                    }else if(a.errors.password){
                        errmsg='Password shorter than 6 characters.';
                    }else{
                        errmsg='Phone number is not valid';
                    }
                }else{
                    errmsg='User already registered please log in to continue.';
                }
                
                
                $('#signupError').show();
                $('#signupText').text(errmsg);
                console.log("Ajax err ",err);
                
            }
       });

    });
});