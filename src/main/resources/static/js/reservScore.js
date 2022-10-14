
function getScores(){
    $.ajax({
        url:'http://localhost:8080/api/Score/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarScore(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarScore(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>STARS</th><th>MESSAGE</th><th>RESERVATION</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idScore+"</td>";
        myTable+="<td>"+items[i].star+"</td>";
        myTable+="<td>"+items[i].message+"</td>";
        myTable+="<td>"+items[i].reservation.idReservation+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='deleteScore("+items[i].idScore+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailScore("+items[i].idScore+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoS").empty()
    $("#resultadoS").append(myTable);
}
function guardarScore(items){
    let data=getScoreInfo();
    let dataToSend=JSON.stringify(data);
    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Score/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getScoreInfo(){
    let star=$("#starR").val();
    let message=$("#message").val();
    let idReservation= $("#idReservationS").val();

    let score={
        star:star,
        message:message,
        "reservation":{"idReservation":parseInt(idReservation)}
    };
    console.log(score);
    return score;
}

function cleanInputsS(){
    $("#idScoreS").val("");
    $("#starR").val("");
    $("#message").val("");
    $("#idReservationS").val("");
}



function updateScore(){
    let data=getScoreInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Score/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function getDetailScore(idScore){
    $.ajax({
        url : 'http://localhost:8080/api/Score/'+idScore,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;

            $("#idScore").val(cs.idScore);
            $("#starR").val(cs.star);
            $("#message").val(cs.message);
            $("#didReservation").val(cs.idReservation);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function getDetailScoreR(idReservation){
    $.ajax({
        url : 'http://localhost:8080/api/Reservation/'+idReservation,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;
            $("#idReservationS").val(cs.idReservation);


        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
function deleteScore(idScore){
    let data={id:idScore};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Score/'+idScore,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

// ****************************Reservation *********************

function infoReservation(){

    $.ajax({
        url : 'http://localhost:8080/api/Reservation/all',
        type : 'GET',
        dataType : 'json',
        success : function(respuesta) {
            pintarReservation(respuesta)
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function pintarReservation(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>START DATE</th><th>DEVOLUTION DATE</th><th>STATUS</th><th>CAR</th><th>CLIENT</th><th>SCORE</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
//        myTable+="<td>"+items[i].score.star+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailScoreR("+items[i].idReservation+")'>Score</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarReservation("+items[i].idReservation+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailReservation("+items[i].idReservation+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoR").empty()
    $("#resultadoR").append(myTable);
}

function getReservationInfo(){
    let idReservation=$("#idReservation").val();
    let startDate=$("#startDate").val();
    let devolutionDate=$("#devolutionDate").val();
    let status=$("#status").val();
    let idClient=$("#idClientR").val();
    let idCar=$("#idCarR").val();
  //  let star=$("#star").val();

    let reservation={
        idReservation:idReservation,
        startDate:startDate,
        devolutionDate:devolutionDate,
        status:status,
        client:{"idClient":idClient},
        car:{"idCar":idCar},
    //    score:{"star":star}
    };
    return reservation;
}

function cleanInputsR(){
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#idClientR").val("");
    $("#idCarR").val("");
  //  $("#starR").val("");
}

function guardarReservation(){
    let data=getReservationInfo();
    let dataToSend=JSON.stringify(data);
    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url : 'http://localhost:8080/api/Reservation/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function borrarReservation(idReservation){
    let data={id:idReservation};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:8080/api/Reservation/'+idReservation,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function editarReservation(){
    let data=getReservationInfo();
    let dataToSend=JSON.stringify(data);
    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url : 'http://localhost:8080/api/Reservation/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}
function getDetailReservation(idReservation) {
    $.ajax({
        url: 'http://localhost:8080/api/Reservation/'+idReservation,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            let cs = respuesta;

            $("#idReservation").val(cs.idReservation);
            $("#startDate").val(cs.startDate);
            $("#devolutionDate").val(cs.devolutionDate);
            $("#status").val(cs.status);
            $("#idClientR").val(cs.client.idClient);
            $("#idCarR").val(cs.car.idCar);
          //  $("#starR").val(cs.score.star);
        },
        error: function (xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

