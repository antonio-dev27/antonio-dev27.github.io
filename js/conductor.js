var urlBaseConductor = "/api/Driver";

var consultarConductores = function(){
    $.ajax({
        url: urlBaseConductor + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var actualizarTabla = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID CONDUCTOR</th>
                    <th>NOMBRE</th>
                    <th>CEDULA</th>
                    <th>LICENCIA</th>
                    <th>CELULAR</th>
                    <th>EMAIL</th>
                    <th>DIRECCION</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idDriver}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].dni}</td>
                   <td>${items[i].license}</td>
                   <td>${items[i].cell}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].address}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].idDriver}, '${items[i].name}', '${items[i].dni}', '${items[i].license}' '${items[i].cell}','${items[i].email} ${items[i].address})">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idDriver})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarConductores();
});

var nuevoConductor = function () {
    $("#tituloModalConductor").html('Nuevo Conductor');
    $("#id").val('');
    $("#nombre").val('');
    $("#cedula").val('');
    $("#licencia").val('');
    $("#celular").val('');
    $("#email").val('');
    $("#direccion").val('')
    $('#modalConductor').modal('show');
}

var cerrarModal = function () {
    $('#modalConductor').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
    var payload;
    var method;
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseConductor + "/update";
        payload = {
            idDriver: +$("#id").val(),
            name: $("#nombre").val(),
            dni: $("#cedula").val(),
            license: $("#licencia").val(),
            cell: $("#celular").val(),
            email: +$("#email").val(),
            address: +$("#direccion").val(),
        };
        method = "PUT";
        msg = "Se ha actualizado el Conductor";
    } else {
        ruta = urlBaseConductor + "/save";
        payload = {
            name: $("#nombre").val(),
            dni: $("#cedula").val(),
            license: $("#licencia").val(),
            cell: $("#celular").val(),
            email: +$("#email").val(),
            address: +$("#direccion").val(),
        };
        method = "POST";
        msg = "Se ha creado el Conductor";
    }

    console.log("guardando ", payload)
    console.log("ruta ", ruta)
    console.log("method ", method)

    $.ajax({
        url: ruta,
        type: method,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje(msg);
                cerrarModal();
                consultarConductores();
            }
        },
    });
}

var editar = function (idDriver, name, dni, license, cell, email, address ) {
    $("#tituloModalConductor").html('Actualizar Conductor');
    $("#id").val(idDriver);
    $("#nombre").val(name);
    $("#cedula").val(dni);
    $("#licencia").val(license);
    $("#celular").val(cell);
    $("#email").val(email);
    $("#direccion").val(address);
    $('#modalConductor').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseConductor + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el Conductor');
                cerrarModal();
                consultarConductores();
            }
        },
    });
}