var urlBaseCliente = "/api/Client";

var consultarClientes = function(){
    $.ajax({
        url: urlBaseCliente + "/all",
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
                    <th>ID CLIENTE</th>
                    <th>NOMBRE</th>
                    <th>CEDULA</th>
                    <th>CELULAR</th>
                    <th>EMAIL</th>
                    <th>DIRECCION</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idClient}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].dni}</td>
                   <td>${items[i].cell}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].address}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].idClient}, '${items[i].name}', '${items[i].dni}', '${items[i].cell}','${items[i].email} ${items[i].address})">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idClient})">
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
    consultarClientes();
});

var nuevoCliente = function () {
    $("#tituloModalCliente").html('Nuevo Cliente');
    $("#id").val('');
    $("#nombre").val('');
    $("#cedula").val('');
    $("#celular").val('');
    $("#email").val('');
    $("#direccion").val('')
    $('#modalCliente').modal('show');
}

var cerrarModal = function () {
    $('#modalCliente').modal('hide');
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
        ruta = urlBaseCliente + "/update";
        payload = {
            idClient: +$("#id").val(),
            name: $("#nombre").val(),
            dni: $("#cedula").val(),
            cell: $("#celular").val(),
            email: +$("#email").val(),
            address: +$("#direccion").val(),
        };
        method = "PUT";
        msg = "Se ha actualizado el Cliente";
    } else {
        ruta = urlBaseCliente + "/save";
        payload = {
            name: $("#nombre").val(),
            dni: $("#cedula").val(),
            cell: $("#celular").val(),
            email: +$("#email").val(),
            address: +$("#direccion").val(),
        };
        method = "POST";
        msg = "Se ha creado el Cliente";
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
                consultarClientes();
            }
        },
    });
}

var editar = function (idClient, name, dni, cell, email, address ) {
    $("#tituloModalCliente").html('Actualizar Cliente');
    $("#id").val(idClient);
    $("#nombre").val(name);
    $("#cedula").val(dni);
    $("#celular").val(cell);
    $("#email").val(email);
    $("#direccion").val(address);
    $('#modalCliente').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseCliente + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el Cliente');
                cerrarModal();
                consultarClientes();
            }
        },
    });
}