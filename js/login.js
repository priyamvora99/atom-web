$(document).ready(function(){
    $('#login').click(function(){
        var details={};
        
        details.email=$('#email').val();
        details.password=$('#password').val();
        
       $.ajax({
            url:'http://127.0.0.1:3000/login',
            type:'POST',
            data:details,
           
            crossDomain:true,
            success:(data)=>{
                console.log(data);
                
                window.location.href='../html/home.html';
               
                
            },error:(err)=>{
                var a=err.responseText;
                $('#loginError').show();
                $('#loginText').text(a);
                console.log("Ajax err ",err);
                
            }
       });

    });
});