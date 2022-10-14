//   *******************************************CAR

function getCars(){
    $.ajax({
        url:'http://localhost:8080/api/Car/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarCar(resultado)
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
//"+parseInt(cs[i].gama)+"
function pintarCar(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>NAME</th><th>BRAND</th><th>YEAR</th><th>DESCRIPTION</th><th>GAMA</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idCar+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td>"+items[i].gama.name+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='deleteCar("+items[i].idCar+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailCar("+items[i].idCar+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").empty()
    $("#resultado").append(myTable);
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

            $("#id").val(cs.idCar);
            $("#brand").val(cs.brand);
            $("#year").val(cs.year);
            $("#description").val(cs.description);
            $("#idGamaC").val(cs.idGama);

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
        success : function() {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}