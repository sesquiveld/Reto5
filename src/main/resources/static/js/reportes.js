
function traerReporte(){
    let fechaInicio = document.getElementById("startDate").value;
    let fechaFin= document.getElementById("devolutionDate").value;
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-dates/'+fechaInicio+"/"+fechaFin,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarReportes(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarReportes(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>TOTAL</th><th>"+items.length+"</th></tr>";
    myTable += "<tr><th>ID</th><th>START DATE</th><th>FINISH DATE</th><th>CAR</th><th>CLIENT</th></tr>";
    for(i=0;i<items.length;i++){
       let  start = items[i].startDate;
       let fin = items[i].devolutionDate;
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+start.slice(0,10)+"</td>";
        myTable+="<td>"+fin.slice(0,10)+"</td>";
        myTable+="<td>"+items[i].car.description+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#conteoReservas").empty()
    $("#conteoReservas").append(myTable);
}


function traerReservas(){
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-dates_total/',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarReservas(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarReservas(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>COMPLETED</th><th>CANCELLED</th></tr>";
        myTable+="<tr>";
        myTable+="<td>"+items.completed+"</td>";
        myTable+="<td>"+items.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#totalReservas").empty()
    $("#totalReservas").append(myTable);
}


function topClients(){
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-clients/',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarTopClients(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarTopClients(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>TOTAL</th><th>IDCLIENT</th><th>NAME</th><th>EMAIL</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].total+"</td>";
        myTable+="<td>"+items[i].client.idClient+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].client.email+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tablaReporte").empty()
    $("#tablaReporte").append(myTable);
}
