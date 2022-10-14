//             *************************  GAMA
function getGama() {
    $.ajax({
        url: 'http://localhost:8080/api/Gama/all',
        type : 'GET',
        dataType : 'json',
        success : function(gamas) {
            let cs=gamas;
            $("#resultadoGama").empty();
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idGama+" "+cs[i].name+" "+cs[i].description+" <button onclick='borrarGama("+cs[i].idGama+")'>borrar</button>";
                k+=" <button onclick='getDetailGama("+cs[i].idGama+")'>actualizar</button><br>"
                $("#resultadoGama").append(k);
            }

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
function getGamaInfo(){
    let idGama=$("#idGama").val();
    let name=$("#nameGama").val();
    let description=$("#descriptionG").val();

    let gamas={
        idGama:idGama,
        name:name,
        description:description,
    };

    return gamas;
}
function cleanInputsG(){
    $("#idGama").val("");
    $("#nameGama").val("");
    $("#descriptionG").val("");
}


function guardarGama(){
    let data=getGamaInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Gama/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function editarGama(){
    let data=getGamaInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Gama/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailGama(idGama){
    console.log(idGama);

    $.ajax({
        url : 'http://localhost:8080/api/Gama/'+idGama,
        type : 'GET',
        dataType : 'json',
        success : function(resultadoGama) {
            let cs=resultadoGama.items;
            $("#idGama").val(cs[0].id);
            $("#nameGama").val(cs[0].name);
            $("#descriptionG").val(cs[0].description);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarGama(idGama){
    let data={id:idGama};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Gama/'+idGama,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

//   *******************************************CAR

function getCars(){
    $.ajax({
        url:'http://localhost:8080/api/Car/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;
            $("#resultado").empty();
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idCar+" "+cs[i].name+" "+cs[i].brand+" "+cs[i].year+" "+cs[i].description+"+ "+parseInt(cs[i].gama)+"<button onclick='deleteCar("+cs[i].idCar+")'>borrar</button>";
                k+=" <button onclick='getDetailCar("+cs[i].idCar+")'>actualizar</button><br>"
                $("#resultado").append(k);
            }

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function getCarInfo(){
    let idCar=$("#id").val();
    let name=$("#name").val();
    let brand=$("#brand").val();
    let year=$("#year").val();
    let description=$("#description").val();
    let idGama=$("#idGamaC").val();

    let car={
        idCar:idCar,
        name:name,
        brand:brand,
        year:year,
        description:description,
        "gama":{"idGama":idGama}
    };

    return car;
}
function cleanInputsC(){
    $("#id").val("");
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("");
    $("#idGamaC").val("");
}

function saveCar(){
    let data=getCarInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Car/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function updateCar(){
    let data=getCarInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Car/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(cars) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function getDetailCar(idCar){

    $.ajax({
        url : 'http://localhost:8080/api/Car/'+idCar,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;

            $("#id").val(cs[0].idCar);
            $("#brand").val(cs[0].brand);
            $("#year").val(cs[0].year);
            $("#description").val(cs[0].description);
            $("#idGamaC").val(cs[0].idGama);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function deleteCar(idCar){
    let data={id:idCar};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Car/'+idCar,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

// *************************************************************************
//          ************************************CLIENT
function infoClient(){
    $.ajax({
        url:'http://localhost:8080/api/Client/all',
        type:"GET",
        datatype:"JSON",
        success : function(clients) {
            let cs=clients;
            $("#clients").empty();
            let myTable ="<table>";
            myTable += "<tr><th>ID</th><th>email</th><th>Password</th><th>Name</th><th>Age</th></tr>";
            myTable+="</table>";
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idClient+" "+cs[i].email+"  "+cs[i].password+"  "+cs[i].name+"  "+cs[i].age+" <button onclick='borrarClient("+cs[i].idClient+")'>borrar</button>";
                k+=" <button onclick='getDetailClient("+cs[i].idClient+")'>actualizar</button><br>"
                console.log(cs[i].id);
                $("#clients").append(k);
            }

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

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
        success : function(clients) {
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

            $("#idClient").val(cs[0].idClient);
            $("#emailClient").val(cs[0].email);
            $("#password").val(cs[0].password);
            $("#nameClient").val(cs[0].name);
            $("#ageClient").val(cs[0].age);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarClient(idClient){
    let myDataM = {
        id: idClient
    };
    let dataToSend = JSON.stringify(myDataM);
   // let data={idClient:idClient};
   // let dataToSend=JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(clients) {
            cleanInputs();
            infoClient()();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

// ********************************************MESSAGE

function infoMsg(){
    $.ajax({
        url:'http://localhost:8080/api/Message/all',
        type : 'GET',
        dataType : 'json',
        success : function(message) {
            let cs=message;
            $("#resultadoM").empty();
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idMessage+" "+cs[i].messageText+" "+cs[i].idClient+" "+cs[i].idCar+"<button onclick='borrarMsg("+cs[i].idMessage+")'>borrar</button>";
                k+=" <button onclick='getDetailMsg("+cs[i].idMessage+")'>actualizar</button><br>"
                $("#resultadoM").append(k);
            }

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
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
        success : function(resultadoM) {
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
        success : function(resultadoM) {
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

            $("#idMessage").val(cs[0].idMessage);
            $("#messageText").val(cs[0].messageText);
            $("#idClientM").val(cs[0].idClient);
            $("#idCarM").val(cs[0].idCar);

        },
        error: function (xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
function borrarMsg(idMessage) {
    let data={id:idMessage};
    let dataToSend=JSON.stringify(data);

    $.ajax({
        url: 'http://localhost:8080/api/Message/'+idMessage,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoM) {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}
// ****************************Reservation *********************

function infoReservation(){

    $.ajax({
        url : 'http://localhost:8080/api/Message/all',
        type : 'GET',
        dataType : 'json',
        success : function(reservation) {
            let cs=reservation;
            $("#resultadoR").empty();
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idReservation+" "+cs[i].startDate+" "+cs[i].devolutionDate+" "+cs[i].status+"+ "+cs[i].idCar+" "+cs[i].idClient+" "+cs[i].idScore+"<button onclick='borrarReservation("+cs[i].idReservation+")'>borrar</button>";
                k+=" <button onclick='getDetailReservation("+cs[i].idReservation+")'>actualizar</button><br>"
                $("#resultadoR").append(k);
            }

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
function getReservationInfo(){
    let idReservation=$("#idReservation").val();
    let startDate=$("#startDate").val();
    let devolutionDate=$("#devolutionDate").val();
    let status=$("#status").val();
    let idClient=$("#idClientR").val();
    let idCar=$("#idCarR").val();
    let idScore=$("#idScore").val();

    let reservation={
        idReservation:idReservation,
        startDate:startDate,
        devolutionDate:devolutionDate,
        status:status,
        client:{"idClient":idClient},
        car:{"idCar":idCar},
        score:{"idScore":idscore}
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
    $("#idScore").val("");
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
        success : function(response) {
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
        url : 'http://localhost:8080/api/Gama/'+idReservation,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoR) {
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
        success : function(resultadoR) {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}
function getDetailReservation(idReservation){

    $.ajax({
        url : 'http://localhost:8080/api/Reservation'+"/"+idReservation,
        type : 'GET',
        dataType : 'json',
        success : function(postReservation) {
            let cs=postReservation;

            $("#idReservation").val(cs[0].idReservation);
            $("#startDate").val(cs[0].startDate);
            $("#devolutionDate").val(cs[0].devolutionDate);
            $("#status").val(cs[0].status);
            $("#idClientR").val(cs[0].idClient);
            $("#idCarR").val(cs[0].idCar);
            $("#idScore").val(cs[0].idScore);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


