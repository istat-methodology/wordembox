$(document).ready(
        function () {

            $("#button").button();
            $("#button_a").button();

            $('.numeric').keypress(validateNumber);

            $("#button").click(
                    function () {
                        var displayResources = $('#resp');
                        var np = $("#np").val();
                        var text = $("#text").val();
                        if ($("#text").val().trim().length == 0 || $("#np").val() > 100) {
                            $('#errorModal').modal('toggle')
                            return false;
                        }
                        $(displayResources).text(
                                'Loading data from JSON source...');
                        $.ajax({
                            type: 'GET',
                            dataType: 'JSON',
                            url:_pythonServer+'/dist/' + np + '/['
                                    + text + ']/json',

                            success: function (data) {

                                // creates table
                                var table = $('<table/>')
                                        .attr('id', 'datalist').addClass(
                                        'table table-striped');
                                var tr = $('<tr/>'); // creates row
                                var th = $('<th/>'); // creates table header
                                // cells
                                var td = $('<td/>'); // creates table cells

                                var header = tr.clone() // creates header row
                                header.append(th.clone().text('Word'));
                                header.append(th.clone().text('Distance'));
                                // attaches header row
                                table.append($('<thead/>').append(header))

                                // creates
                                var tbody = $('<tbody/>')

                                $.each(data, function (key, value) {
                                    var row = tr.clone() // creates a row
                                    row.append(td.clone().text(key)) // fills
                                    // in
                                    // the
                                    // row
                                    row.append(td.clone().text(value)) // fills
                                    // in
                                    // the
                                    // row
                                    tbody.append(row) // puts row on the tbody
                                });
                                $(displayResources).html(table.append(tbody));
                                $("#datalist").DataTable({
                                    "order": [1, 'desc'],
                                    "searching": false,
                                    paging: false
                                });
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                $('#error-text').text(xhr.responseText);
                                $('#errorModal').modal('toggle');
                                $(displayResources).text('');
                            }
                        });

                    });


            $("#text,#np").on('keyup', function (e) {
                if (e.keyCode == 13) {

                    $("#button").click();
                }
            });


            $("#text1,#text2,#text3,#np_a").on('keyup', function (e) {
                if (e.keyCode == 13) {

                    $("#button_a").click();
                }
            });

            $("#width,#iterations,#words").on('keyup', function (e) {
                if (e.keyCode == 13) {

                    $("#target").click();
                }
            });




            $("#button_a").click(
                    function () {
                        var displayResources = $('#resp_a');


                        var np = $("#np_a").val();
                        var text1 = $("#text1").val();
                        var text2 = $("#text2").val();
                        var text3 = $("#text3").val();
                        if ($("#text1").val().trim().length == 0 || $("#text2").val().trim().length == 0 || $("#text3").val().trim().length == 0 || $("#np_a").val() > 100) {
                            $('#errorModal').modal('toggle')
                            return false;
                        }
                        $(displayResources).text(
                                'Loading data from JSON source...');
                        $.ajax({
                            type: 'GET',
                            dataType: 'JSON',
                            url: _pythonServer+'/analogy/' + np
                                    + '/' + text1 + '/' + text2 + '/' + text3
                                    + '/json',

                            success: function (data) {

                                // creates table
                                var table = $('<table/>')
                                        .attr('id', 'datalist').addClass(
                                        'table table-striped ');
                                var tr = $('<tr/>'); // creates row
                                var th = $('<th/>'); // creates table header
                                // cells
                                var td = $('<td/>'); // creates table cells

                                var header = tr.clone() // creates header row
                          
                                header.append(th.clone().text('Word'));
                                header.append(th.clone().text('Distance'));
                                // attaches header row
                                table.append($('<thead/>').append(header))

                                // creates
                                var tbody = $('<tbody/>')
                              
                                $.each(data, function (key, value) {
                                    var row = tr.clone() // creates a row
                                   
                                    row.append(td.clone().text(key)); // fills
                                    // in
                                    // the
                                    // row
                                    row.append(td.clone().text(value)) // fills
                                    // in
                                    // the
                                    // row
                                    tbody.append(row) // puts row on the tbody
                                     
                                });
                                $(displayResources).html(table.append(tbody));
                                $("#datalist").DataTable({
                                    "order": [1, 'desc'],
                                    "searching": false,
                                    paging: false
                                });

                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                xhr.responseText
                                $('#error-text').text(xhr.responseText);
                                $('#errorModal').modal('toggle');
                                $(displayResources).text('');
                            }

                        });

                    });

            $("#button_suggest_an").click(function () {

                $.get('suggest_an.txt', function (data) {
                    var lines = data.split("\n");
                    var sizel = lines.length;
                    var rn = Math.floor((Math.random() * sizel));
                    var row = lines[rn];
                    var elems = row.split(",");
                    $('#resp_a').html('');
                    $("#text1").val(elems[0]);
                    $("#text2").val(elems[1]);
                    $("#text3").val(elems[2]);
                    $("#text3").focus();

                }, "text");
            });

            $("#button_suggest_dist").click(function () {

                $.get('suggest_dist.txt', function (data) {
                    $('#resp').html('');
                    var lines = data.split("\n");
                    var sizel = lines.length;
                    var rn = Math.floor((Math.random() * sizel));
                    var row = lines[rn];
                    $("#text").val(row.toString());
                    $("#text").focus();
                }, "text");
            });

            $("#btn_cancella_dist").click(function () {
                $("#text").val('');
                $("#np").val(10);
                $('#resp').html('');
            });
            $("#btn_cancella_an").click(function () {
                $("#text1").val('');
                $("#text2").val('');
                $("#text3").val('');
                $("#np_a").val(10);
                $('#resp_a').html('');
            });

            $("#btn_cancella_graph").click(function () {
                $("#width").val('4');
                $("#iterations").val('3');
                $("#words").val('istat');

                $('#cy').html('');
            });


            $('#errorModal').on('hidden.bs.modal', function (e) {
                $('#error-text').text('I dati inserito non sono corretti.');
            })


        });
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}
;