// *************************************************************************
//          ************************************CLIENT
function infoClient(){
    $.ajax({
        url:'http://localhost:8080/api/Client/all',
        type:"GET",
        datatype:"JSON",
        success : function(respuesta) {
           pintarClient(respuesta)
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function pintarClient(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>EMAIL</th><th>NAME</th><th>AGE</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarClient("+items[i].idClient+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailClient("+items[i].idClient+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#clients").empty()
    $("#clients").append(myTable);
}


function getClientInfo(){
    let id=$("#idClient").val();
    let email=$("#emailClient").val();
    let password=$("#password").val();
    let name=$("#nameClient").val();
    let age=$("#ageClient").val();

    let client={
        idClient:id,
        email:email,
        password:password,
        name:name,
        age:age
    };

    return client;
}
function cleanInputs(){
    $("#idClient").val("");
    $("#emailClient").val("");
    $("#password").val("");
    $("#nameClient").val("");
    $("#ageClient").val("");
}

function guardarClient(){
    let data=getClientInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Client/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(clients) {
            cleanInputs();
            infoClient();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function editarClient(){
    let data=getClientInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Client/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputs();
            infoClient();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailClient(idClient){

    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'GET',
        dataType : 'json',
        success : function(Client) {
            let cs=Client;

            $("#idClient").val(cs.idClient);
            $("#emailClient").val(cs.email);
            $("#password").val(cs.password);
            $("#nameClient").val(cs.name);
            $("#ageClient").val(cs.age);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarClient(idClient){
     let data={idClient:idClient};
     let dataToSend=JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function() {
            cleanInputs();
            infoClient()();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
