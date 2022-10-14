//             *************************  GAMA
function getGama() {
    $.ajax({
        url: 'http://localhost:8080/api/Gama/all',
        type : 'GET',
        dataType : 'json',
        success : function(gamas) {
            pintarGama(gamas);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function pintarGama(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>NAME</th><th>DESCRIPTION</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idGama+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarGama("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailGama("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoGama").empty()
    $("#resultadoGama").append(myTable);
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
        success : function(resultado) {
            let cs=resultado;
            console.log(cs);
            $("#idGama").val(cs.idGama);
            $("#nameGama").val(cs.name);
            $("#descriptionG").val(cs.description);
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

