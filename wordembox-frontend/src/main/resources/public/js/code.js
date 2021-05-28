var soglia_nodi=1000;

$(document).ready(function () {
    $( "#target" ).click(function() {
        var widthOfGraph = $("#width").val();
        var iterationOfGraph = $("#iterations").val();
        var modoOfGraph = $('#modo option:selected').html().toUpperCase();
        var wordsOfGraph = $("#words").val();        
        var iLayout = 0;
	iLayout = parseInt($('#select-layout option:selected').val());      
	
if( $("#width").val().trim().length==0|| $("#iterations").val().trim().length==0|| $("#words").val().trim().length==0) {
			$('#errorModal').modal('toggle')
			return false;
		}

    renderGraphJQ( widthOfGraph, iterationOfGraph, modoOfGraph, wordsOfGraph, iLayout);
 
    });


    function renderGraphJQ(widthOfGraph, iterationOfGraph, modoOfGraph, wordsOfGraph, iLayout){
        var xmlhttp = new XMLHttpRequest();
        var objLayout = layout[iLayout];
        var url = _pythonServer+"/graph/" + widthOfGraph + "/" + iterationOfGraph + "/" + modoOfGraph + "/[" + wordsOfGraph + "]/json";
        $('#loading').modal('toggle');
    	$.ajax({
			type : 'GET',
			dataType : 'JSON',
			url :url,
			success : function(data) {
				// var data = JSON.parse(dataj);
                  var element = [];
                  for (n in data.nodes) {
                          var value = data.nodes[n].id;
                          element.push({
                                  "data": {
                                          "id": 'n-'+n,
                                          "name": value
                                  },
                                  "group": "nodes"
                          });
                  }
                  for (l in data.links) {
                          var source = data.links[l].source;
                          var target = data.links[l].target;

                          element.push({
                                  "data": {
                                          "source": 'n-'+source,
                                          "target": 'n-'+target
                                  },
                                  "group": "edges"
                          });
                  }
                  var cy = window.cy = cytoscape({
                          container: document.getElementById('cy'),
                          style: style,
                          elements: element,
                          wheelSensitivity :0.08,
                          layout: objLayout
                  });                        
                  var pr = cy.elements().pageRank();
                  var arrayRank = [];
                  cy.nodes().forEach(function( ele ){
                  	arrayRank.push( pr.rank('#'+ele.id()) );
                  	 
                  	  
                  	});
              var max=  Math.max.apply(null,arrayRank);  
              var min=   Math.min.apply(null,arrayRank);
             
                  cy.nodes().forEach(function( ele ){
                  	 
                  	console.log( ele.id()+' - '+ele.data( "name" )+' - ' + pr.rank('#'+ele.id())+' --  '+ getColorN(pr.rank('#'+ele.id()),max,min)  );
                  	ele.css({"background-color": getColorN(pr.rank('#'+ele.id()),max,min) });
                  	  
                  	});
                  
                  
                  
                  cy.panzoom({
				// options here...
			});          
 
                  $('#loading').modal('toggle');
			},
		      error: function (xhr, ajaxOptions, thrownError) {
		    	  $('#cy').html('');
		    	  $('#loading').modal('toggle');
		     	  $('#error-text').text( xhr.responseText);
		    	  $('#errorModal').modal('toggle');
		    	 
		        }
		});

      }

    
    function renderGraph(widthOfGraph, iterationOfGraph, modoOfGraph, wordsOfGraph, iLayout){
        var xmlhttp = new XMLHttpRequest();
        var objLayout = layout[iLayout];
        xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                	 $('#loading').modal('toggle');
                        var dataj = this.responseText;
                        var data;
                        data = JSON.parse(dataj);
                        var element = [];
                        for (n in data.nodes) {
                                var value = data.nodes[n].id;
                                element.push({
                                        "data": {
                                                "id": 'n-'+n,
                                                "name": value
                                        },
                                        "group": "nodes"
                                });
                        }
                        for (l in data.links) {
                                var source = data.links[l].source;
                                var target = data.links[l].target;

                                element.push({
                                        "data": {
                                                "source": 'n-'+source,
                                                "target": 'n-'+target
                                        },
                                        "group": "edges"
                                });
                        }
                        var cy = window.cy = cytoscape({
                                container: document.getElementById('cy'),
                                style: style,
                                elements: element,
                                wheelSensitivity :0.08,
                                layout: objLayout
                        });                        
                        var pr = cy.elements().pageRank();
                        var arrayRank = [];
                        cy.nodes().forEach(function( ele ){
                        	arrayRank.push( pr.rank('#'+ele.id()) );
                        	 
                        	  
                        	});
                        var max=  Math.max.apply(null,arrayRank);  
                        var min=   Math.min.apply(null,arrayRank);
                      
                        cy.nodes().forEach(function( ele ){
                        	 
                        	console.log( ele.id()+' - '+ele.data( "name" )+' - ' + pr.rank('#'+ele.id())+' --  '+ getColorN(pr.rank('#'+ele.id()),max,min)  );
                        	ele.css({"background-color": getColorN(pr.rank('#'+ele.id()),max,min) });
                        	  
                        	});
                        
                        
                        
                        cy.panzoom({
					// options here...
				});          
                     
                                
                }
               
        };
        
      // var url = _ctx+ "/graphpy/graph/" + widthOfGraph + "/" + iterationOfGraph + "/" + modoOfGraph + "/[" + wordsOfGraph + "]/json";
        var url = _pythonServer+"/graph/" + widthOfGraph + "/" + iterationOfGraph + "/" + modoOfGraph + "/[" + wordsOfGraph + "]/json";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        $('#loading').modal('toggle');
    }

		
});

function getColor(value){
    //value from 0 to 1
    var hue=((1-value)*200).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}


function getColorN(value,max,min){
    //value from 0 to 1
	value=(value-min)/(max-min);
    var hue=((1-value)*120).toString(10);
    var s=(100-20)*value+20;
    var v= 	(30-90)*value+90;
    var hue="120";
    return ["hsl(",hue,","+s+"%,"+v+"%)"].join("");
}
function getColorN2(value,max,min){
    //value from 0 to 1
	value=(value-min)/(max-min);
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}



function checkGEO(w,i){
	if(parseInt(w) == 1 &&  parseInt(i)>  soglia_nodi) return false;
	if(parseInt(w) == 1 &&  parseInt(i)<=  soglia_nodi) return true;
	var n= (Math.pow(w, (parseInt(i)+parseInt(1)))-1)/(w-1) 
			console.log(w+' - '+i+' - '+ n );
    
       return (n <soglia_nodi);
}
function checkLINEAR(w,i){
	var n= parseInt((parseInt(w*i)+parseInt(i)));
	console.log(w+' - '+i+' - '+ n );
    return ( n <soglia_nodi);
}

function checkGEOO(w,i){
	if(parseInt(w) == 1 &&  parseInt(i)>  soglia_nodi) return false;
	if(parseInt(w) == 1 &&  parseInt(i)<=  soglia_nodi) return true;
	var n= ((Math.pow(w, (parseInt(i)+parseInt(1)))-1)/(w-1)*1/2 );
	console.log(w+' - '+i+' - '+ n );
    return (n <soglia_nodi);
}

function checkNodi( width, iteration, modo){
    return true
    /*
	switch(modo) {
    case 'GEO':
       return checkGEO(width,iteration);
        break;
    case 'LINEAR':
    	  return checkLINEAR(width,iteration);
        break;
    case 'GEO_ORIENT':
    	  return checkGEOO(width,iteration);
        break;
    default:
       return true;
} 

*/
}


 



