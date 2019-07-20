$(document).ready(function(){
    $('#login').click(function(){
        var details={};
        
        details.email=$('#email').val();
        details.password=$('#password').val();
        
       $.ajax({
            url:'https://arcane-waters-75160.herokuapp.com/login',
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