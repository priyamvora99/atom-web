$(document).ready(function(){
    $('#submitFile').click(function(){
       var fileName=$('#fileName').val();
       if(fileName==""){
        //    $('#noFileError').show();
        //    $('#fileErrorText').text('Select a file to upload');
        alert("Select a file");
       }else{
           var fileExtension='xlsx';
           var uploaded=fileName.split('.');
           var modelName=uploaded[0];
           var sendObject={};
           sendObject.modelName=modelName;
           sendObject.fileName=fileName;
          
           if(uploaded[1] !== fileExtension){
            $('#acknowledgement').hide();
            $('#uploaded').hide();
            alert('Upload attendance in xlsx format');
           }else{
                //here do computation and upload data to database!
                 $.ajax({
                    url:'http://127.0.0.1:3000/uploadAttendance',
                    type:'POST',
                    data:sendObject,
                    crossDomain:true,
                    success:(data)=>{
                        console.log("in sucess");
                        if(data===true){
                            $('#acknowledgement').hide();
                            $('#uploaded').show();
                            $('#uploadedText').text("Data already uploaded.Head over to ");
                            $('.summary').html("<a href='../html/summary.html'>Summary Section.</a>");
                        }else{
                            $('#uploaded').hide();
                            $('#acknowledgement').show();
                            $('#ackText').text(data+"Head over to ");
                            $('.summary').html("<a href='../html/summary.html'>Summary Section.</a>");
                        }
                        
                        
                    },error:(err)=>{
                        console.log("in err");
                        console.log(err);
                    }

                 });
           }
       }
    });
    function bs_input_file() {
        $(".input-file").before(
            function() {
                if ( ! $(this).prev().hasClass('input-ghost') ) {
                    var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                    element.attr("name",$(this).attr("name"));
                    element.change(function(){
                        element.next(element).find('input').val((element.val()).split('\\').pop());
                    });
                    $(this).find("button.btn-choose").click(function(){
                        element.click();
                    });
                    $(this).find("button.btn-reset").click(function(){
                        element.val(null);
                        $(this).parents(".input-file").find('input').val('');
                    });
                    $(this).find('input').css("cursor","pointer");
                    $(this).find('input').mousedown(function() {
                        $(this).parents('.input-file').prev().click();
                        return false;
                    });
                    return element;
                }
            }
        );
    }
    
    $(function() {
        bs_input_file();
    });
   

});