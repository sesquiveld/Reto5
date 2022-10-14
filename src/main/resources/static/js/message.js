
// ********************************************MESSAGE

function infoMsg(){
    $.ajax({
        url:'http://localhost:8080/api/Message/all',
        type : 'GET',
        dataType : 'json',
        success : function(message) {
            pintarMsg(message);

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function pintarMsg(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>MESSAGE</th><th>CLIENTE</th><th>CAR</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idMessage+"</td>";
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarMsg("+items[i].idMessage+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailMsg("+items[i].idMessage+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoM").empty()
    $("#resultadoM").append(myTable);
}

function getMsgInfo(){
    let idMessage=$("#idMessage").val();
    let messageText=$("#messageText").val();
    let idClient=$("#idClientM").val();
    let idCar=$("#idCarM").val();

    let message={
        idMessage:idMessage,
        messageText:messageText,
        "client":{"idClient":idClient},
        "car":{"idCar":idCar}
    };

    return message;
}
function cleanInputsMsg(){
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#idClientM").val("");
    $("#idCarM").val("");

}

function guardarMsg(){
    let data=getMsgInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url : 'http://localhost:8080/api/Message/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}


function editarMsg(){
    let data=getMsgInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Message/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function getDetailMsg(idMessage) {

    $.ajax({
        url: 'http://localhost:8080/api/Message/'+idMessage,
        type: 'GET',
        dataType: 'json',
        success: function (Message) {
            let cs = Message;

            $("#idMessage").val(cs.idMessage);
            $("#messageText").val(cs.messageText);
            $("#idClientM").val(cs.client.idClient);
            $("#idCarM").val(cs.car.idCar);

        },
        error: function (xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarMsg(idMessage){
    let data={id:idMessage};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Message/'+idMessage,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(message) {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}