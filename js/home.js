$(document).ready(function(){
    $('#uploadFile').submit(function(e){    
        e.preventDefault();
       var fileName=$('#fileName').val();
     
       var file= $('input[type=file]')[0].files[0];
       console.log(file);
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
           console.log();
          
           if(uploaded[1] !== fileExtension){
            $('#acknowledgement').hide();
            $('#uploaded').hide();
            alert('Upload attendance in xlsx format');
           }else{

            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result,sendObject.modelName,sendObject.fileName);
                    };
                    reader.readAsBinaryString(file);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data,sendObject.modelName,sendObject.fileName);
                    };
                    reader.readAsArrayBuffer(file);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        }
       }
    });

    function ProcessExcel(data,modelName,fileName) {
        console.log(modelName);
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        excelRows[0].modelName=modelName;
        excelRows[0].fileName=fileName;
        
        console.log(excelRows);
        $.ajax({
            url:'https://arcane-waters-75160.herokuapp.com/uploadAttendance',
            type:'POST',
            data:JSON.stringify(excelRows),
            crossDomain:true,
            contentType:'application/json',
            // contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
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