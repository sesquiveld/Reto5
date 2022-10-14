//             *************************  GAMA
function getAdmin() {
    $.ajax({
        url: 'http://localhost:8080/api/Admin/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarAdmin(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function pintarAdmin(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>NAME</th><th>EMAIL</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idAdmin+"</td>";
      //  myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarAdmin("+items[i].idAdmin+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailAdmin("+items[i].idAdmin+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoAdmin").empty();
    $("#resultadoAdmin").append(myTable);
}

function getAdminInfo(){
    let idAdmin=$("#idAdmin").val();
    let password=$("#password").val();
    let name=$("#name").val();
    let email=$("#email").val();

    let admin={
        idAdmin:idAdmin,
        password:password,
        name:name,
        email:email,
    };

    return admin;
}
function cleanInputsA(){
    $("#idAdmin").val("");
    $("#password").val("");
    $("#name").val("");
    $("#email").val("");
}


function guardarAdmin(){
    let data=getAdminInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Admin/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsA();
            getAdmin();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function editarAdmin(){
    let data=getAdminInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Admin/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailAdmin(idAdmin){
    console.log(idAdmin);

    $.ajax({
        url : 'http://localhost:8080/api/Admin/'+idAdmin,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;
            console.log(cs);
            $("#idAdmin").val(cs.idAdmin);
            $("password").val(cs.email);
            $("#email").val(cs.email);
            $("#name").val(cs.name);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarAdmin(idAdmin){
    let data={id:idAdmin};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Admin/'+idAdmin,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsA();
            getAdmin();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
