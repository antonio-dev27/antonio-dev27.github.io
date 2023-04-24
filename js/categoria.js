var urlBaseCategoria = "/api/Category";

var consultarCategorias = function(){
    $.ajax({
        url: urlBaseCategoria + "/all",
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
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CANTIDAD DE PASAJEROS</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].cantidad}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].cantidad}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
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
    consultarCategorias();
});

var nuevaCategoria = function () {
    $("#tituloModalCategoria").html('Nuevo Tipo de Vehiculo');
    $("#id").val('');
    $("#nombre").val('');
    $('#modalCategoria').modal('show');
}

var cerrarModal = function () {
    $('#modalCategoria').modal('hide');
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
        ruta = urlBaseCategoria + "/update";
        payload = {
            id: +$("#id").val(),
            name: $("#nombre").val(),
            cantidad: $("#cantidad").val()
        };
        method = "PUT";
        msg = "Se ha actualizado el tipo de vehiculo";
    } else {
        ruta = urlBaseCategoria + "/save";
        payload = {
            name: $("#nombre").val(),
            cantidad: $("#cantidad").val()
        };
        method = "POST";
        msg = "Se ha creado el tipo de vehiculo";
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
                consultarCategorias();
            }
        },
    });
}

var editar = function (id, name, cantidad) {
    $("#tituloModalCategoria").html('Actualizar Categoria');
    $("#id").val(id);
    $("#nombre").val(name);
    $("#cantidad").val(cantidad);
    $('#modalCategoria').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseCategoria + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el tipop de vehiculo');
                cerrarModal();
                consultarCategorias();
            }
        },
    });
}