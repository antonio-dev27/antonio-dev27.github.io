var consultarReportexFecha = function(){
    let fi = $("#fechaInicial").val();
    let ff = $("#fechaFinal").val();
    console.log(fi);
    console.log(ff);
    
    $.ajax({
        url: "/api/Reservation/report-dates/" + fi + "/" + ff,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxFecha(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxFecha = function (items) {
    var tabla = `<table class="table">
                  <tr>
                    <th>FECHA INICIO</th>
                    <th>FECHA FIN</th>
                    <th>STATUS</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].startDate.substring(0, 10)}</td>
                   <td>${items[i].devolutionDate.substring(0, 10)}</td>
                   <td>${items[i].status}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}


var consultarReportexCliente = function(){
    $.ajax({
        url: "/api/Reservation/report-clients",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxCliente(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxCliente = function(items){
    var tabla = `<table class="table">
                  <tr>
                    <th>TOTAL RESERVAS</th>
                    <th>CLIENTE</th>
                    <th>EMAIL</th>
                    <th>EDAD</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].total}</td>
                   <td>${items[i].client.name}</td>
                   <td>${items[i].client.email}</td>
                   <td>${items[i].client.age}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

/**
var consultarReportexStatus = function(){
    $.ajax({
        url: "/api/Reservation/report-status",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxStatus(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxStatus = function(items){
    var tabla = `<table class="table">
                  <tr>
                    <th>RESERVAS COMPLETADAS</th>
                    <th>RESERVAS CANCELADAS</th>
                  </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].completed}</td>
                   <td>${items[i].cancelled}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}
 */

function consultarReportexStatus(){
    console.log("test");
    $.ajax({
        url:"/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarRespuestaxStatus(respuesta);
        }
    });
}
function mostrarRespuestaxStatus(respuesta){

    let tabla="<center><table></center>";    
    tabla+="<tr>";
        tabla+="<th>COMPLETADAS</th><br/>";  
        tabla+="<th> </th>";
        tabla+="<td>"+respuesta.completed+"</td> <hr>";
        tabla+="<th> </th>";
        tabla+="<th>CANCELADAS</th>";
        tabla+="<th> </th>";
        tabla+="<td>"+respuesta.cancelled+"</td>";
        tabla+="</tr>";
    tabla+="</table>";
    $("#tabla").html(tabla);
}
