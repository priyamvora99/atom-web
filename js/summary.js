$(document).ready(function(){
  
    var url='https://arcane-waters-75160.herokuapp.com/getYear';
    $.get(url,function(data){
        var newOptions='';
        for (var id in data) {
            newOptions += '<option value="' + data[id] + '">' + data[id] + '</option>';
        }
        $('.selectYear').html(newOptions)
        .select2({dropdownAutoWidth : true,
            width:'resolve',
            theme:'classic',
            placeholder:'Select Year'
        });

    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('.selectMonth').select2({
    dropdownAutoWidth : true,
    width:'resolve',
    theme:'classic',
 
   
});
   
    $('#submitData').click(function(){
        var month=$('.selectMonth').val();
        var year=$('.selectYear').val();
        var substr=month + ' ' + year;
        var url='https://arcane-waters-75160.herokuapp.com/getSummary';
        $.get(url,{'substr':substr},(data)=>{
            console.log(data);
            $('#tableContainer').show();

        var table = $('#example').DataTable( {
            data: data,
            columns: [
            { data: "employeeno" },
            { data: "name" },
            { data: "hod" },
            { data: "leaves" },
            {data:"halfDayLeave"},
            {data:"penaltyForFlexiHours"}
            ]
            } );
            $('#example tbody').on( 'click', 'tr', function () {
                var a=table.row( this ).data();
                window.location.href="../html/detailSummary.html?substr="+encodeURIComponent(substr)+"&eid="+encodeURIComponent(a.employeeno);
                
            } );
            
        }).fail((err)=>{
          alert("No data found for selected month or year");
        });
        
        
    });
   
});