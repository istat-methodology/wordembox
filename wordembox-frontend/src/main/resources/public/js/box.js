var smallWindow = 560;
var load = true;





$(document).ajaxError(function (e, request, errorThrown, exception) {
	 
    if (request.status == "302") {
 
        window.location = request.getResponseHeader('location');
 
    }
 
});



function doToggling(w){
    if (w <= smallWindow) {
        $("aside").addClass("toggle-off");
        $("section").addClass("toggle-off");
        $("footer").addClass("toggle-off");
        $("#toggle-menu").removeClass("fa-chevron-left");
        $("#toggle-menu").addClass("fa-chevron-right");
        $(".sidebar .nav span").addClass("hide-text");
        $(".sidebar .nav i").addClass("push-icon-right");
        $(".sidebar-subnav>li>a").addClass("less-padding-icon-menu");       
        
    } else {        
        $("aside").removeClass("toggle-off");
        $("section").removeClass("toggle-off");
        $("footer").removeClass("toggle-off");
        $("#toggle-menu").removeClass("fa-chevron-right");
        $("#toggle-menu").addClass("fa-chevron-left");
        $(".sidebar .nav span").removeClass("hide-text");
        $(".sidebar .nav i").removeClass("push-icon-right");
        $(".sidebar-subnav>li>a").removeClass("less-padding-icon-menu");        
    }
}

function toggleMenu() {
    var w = 0;
    if (load){
        w = $(window).width();
    }else if ( $("aside").hasClass("toggle-off") ){
        w = smallWindow + 1;
    }
    doToggling(w); 
    load = false;
}



$( window ).resize(function() { 
    doToggling($(window).width());
});
    
$(function () {
    toggleMenu();
    $('.towait').click(function(){ 		$('#loading').modal('show');	           });
});

//Set menu active
function setMenuActive(id) {
    $("#" + id).addClass("active");
    $("#" + id + " a").addClass('active').parent().parent().addClass('in').parent();
}




function format(n) {
    return ("" + n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatPercentage(a, b) {
    return Math.round(1000. * a / b) / 10 + "%";
}

//write REST response user
function writeMsgs(data, iddiv_msgs) {

    $.each(data, function (index, msg) {
        var classs = 'alert alert-info';
        if (msg.type == 'INFO')
            classs = 'alert alert-success';
        else if (msg.type == 'ERROR')
            classs = 'alert alert-danger';
        var div = $('<div class="' + classs + '"><strong>' + msg.type
                + '</strong>: ' + msg.text + ' </div>"');
        $("#" + iddiv_msgs).append(div);

    });
}
//write REST response user
function writeMsgsError(msg, iddiv_msgs) {

    var classs = 'alert alert-danger';
    var div = $('<div class="' + classs + '">' + msg + ' </div>"');
    $("#" + iddiv_msgs).append(div);

}

//function to render table

function renderTable(id, defBtns,defCols,arrLabelData) {
    $("#" + id).DataTable({
        bDestroy: true,
        dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        autoWidth: false,
        responsive: true,
        ordering: false,
        pageLength: 20,
        bPaginate: false,
        buttons: defBtns,
        columns: defCols,
        data:arrLabelData
        
    });
    //table.buttons().container().appendTo('#religionlist_wrapper .col-sm-6:eq(0)');
}

//function to render chart: type Doughnut
function renderDoughnut(arrData, arrColor, arrLabel) {

    var configDoughnut = {
        type: 'doughnut',
        data: {
            datasets: [{
                    data: arrData,
                    backgroundColor: arrColor
                }],
            labels: arrLabel
        },
        options: {
            responsive: true,
            legend: {
                position: 'right'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    var myChartDoughnut = document.getElementById("doughnut-chart-area").getContext("2d");
    var myDoughnut = new Chart(myChartDoughnut, configDoughnut);
}

//function to render chart: type Bar
function renderBar(objDataset, textTitle) {
    var configBar = {
        type: 'bar',
        data: {
            labels: arrLabel,
            datasets: objDataset
        },
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: textTitle
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    var myChartBar = document.getElementById("bar-chart-area").getContext("2d");
    var myBar = new Chart(myChartBar, configBar);

}

function callBackHide() {
    setTimeout(function () {
        $("#center").fadeOut();
    }, 1000);
}

function callBackShow() {
    setTimeout(function () {
        $("#center").fadeIn();
    }, 1000);
}

