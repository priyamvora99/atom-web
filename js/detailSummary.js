$(document).ready(function(){
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    var urlParams = new URLSearchParams(window.location.search);
    var substr=urlParams.get("substr");
    var eid=urlParams.get("eid");
    var name=urlParams.get("ename");
   
    var html='';
    html+='<div class="col-lg-3">';
    html+='<div class="card-deck">';
    html+='<div class="card" style="margin-bottom:20px;">';
    html+='<div class="card-header text-center"></div>'
    html+='<div class="card-body">';
    html+=' <h5 class="card-title text-center">Panel title</h5>'
    html+='<p class="card-text in-time" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text out-time" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text hours" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text cafeteria" style="margin:0px !important;" >This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text recreation" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text outofturnstile" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';
    html+='<p class="card-text total" style="margin:0px !important;">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>';

    html+='<p class="card-text arrivalAfterFlexiHours" style="margin:0px !important;"><b>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</b></p>';

    html+='<p class="card-text fulldayLeave" style="margin:0px !important;"><b>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</b></p>';

    html+='<p class="card-text halfdayLeave" style="margin:0px !important;"><b>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</b></p>';


    html+='</div></div></div></div>';
    //var html1='<div class="col-lg-3"</div><div class="col-lg-3"><ul class="legend"><li><span class="superawesome"></span> Super Awesome</li><li><span class="awesome"></span> Awesome</li><li><span class="kindaawesome"></span> Kinda Awesome</li><li><span class="notawesome"></span> Not Awesome</li></ul></div>';
    $('#detailsPanel').show();
   
    var url='https://arcane-waters-75160.herokuapp.com/detailSummary';

    $.get(url,{'substr':substr,'eid':eid},(data)=>{
         
        var obj=data[0];
        var key=Object.keys(obj);
        var key1=Object.keys(obj[key]);
        $('#employeeName').show();
        $('#headerName').text("Details for "+obj[key][key1[0]]+" for "+substr+".");
        console.log(data);
        key1.splice(0,1);
       for(var i=0;i<key1.length;i++){
          
           $('#detailsPanel').append(html);
           $('.card-header:eq('+i+')').text(key1[i]);
           $('.card-title:eq('+i+')').text(obj[key][key1[i]].day)
           $('.in-time:eq('+i+')').text("Intime: "+obj[key][key1[i]].intime);
           $('.out-time:eq('+i+')').text("Outtime: "+obj[key][key1[i]].outtime);
           $('.hours:eq('+i+')').text("Total working hours: "+obj[key][key1[i]].hours);
           $('.cafeteria:eq('+i+')').text("Cafeterial: "+obj[key][key1[i]].cafeteria);
           $('.recreation:eq('+i+')').text("Recreation: "+obj[key][key1[i]].recreation);
           $('.outofturnstile:eq('+i+')').text("Out Of Turnstile: "+obj[key][key1[i]].outOfTurnstile);
           $('.total:eq('+i+')').text("Total: "+obj[key][key1[i]].total);
           $('.arrivalAfterFlexiHours:eq('+i+')').text("Arrival After Flexi Hours? "+obj[key][key1[i]].lateArrivalAfterFlexiHoursCount).css('font-weight','bold');
           $('.fulldayLeave:eq('+i+')').text("Leave? "+obj[key][key1[i]].fullDayLeave).css('font-weight','bold');
           if(obj[key][key1[i]].halfDayLeaveNumber === undefined){
            $('.halfdayLeave:eq('+i+')').text("Half day leave? "+"No").css('font-weight','bold');
           }else{
            $('.halfdayLeave:eq('+i+')').text("Half day leave? "+obj[key][key1[i]].halfDayLeaveNumber).css('font-weight','bold');
           }
           if(obj[key][key1[i]].lateArrivalAfterFlexiHoursCount !== "No"){
            $('.card:eq('+(i+1)+')').addClass('border-danger');
           }
        }
       // $('#detailsPanel').append(html1);
    }).fail((err)=>{
        console.log(err);
    });
});