var urlBaseProducto = "/api/Vehicle";
var urlBaseCategoria = "/api/Category";

var consultarCategorias = function (idcategoria) {
    $.ajax({
        url: urlBaseCategoria + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="category">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#categoria-select").html(select);
            
            if (idcategoria!=='undefined' && idcategoria!==null){
                $("#categoria").val(idcategoria);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var consultar = function () {
    $.ajax({
        url: urlBaseProducto + "/all",
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
                    <th>PLACA</th>
                    <th>MODELO</th>
                    <th>AÑO</th>
                    <th>TIPO DE VEHICULO</th>
                    <th>ACCIONES</th>
                   
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].patent}</td>
                   <td>${items[i].model}</td>
                   <td>${items[i].year}</td>
                   <td>${items[i].category.name}</td>
                   
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].patent}', '${items[i].model}','${items[i].year}', '${items[i].category.name}')">
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
    consultar();
});

var nuevoVehiculo = function () {
    consultarCategorias(null);
    $("#tituloModalProducto").html('Nuevo Vehiculo');
    $("#id").val('');
    $("#placa").val('');
    $("#modelo").val('');
    $("#año").val('');
    $('#modalProducto').modal('show');
}

var cerrarModal = function () {
    $('#modalProducto').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
    var payload;
    var method;
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseProducto + "/update";
        payload = {
            id: +$("#id").val(),
            patent: $("#placa").val(),
            model: $("#modelo").val(),
            year: +$("#año").val(),
            category: {
                id: +$("#category").val()
            }
        };
        method = "PUT";
        msg = "Se ha actualizado el vehiculo";
    } else {
        ruta = urlBaseProducto + "/save";
        payload = {
            patent: $("#placa").val(),
            model: $("#mopdelo").val(),
            year: +$("#año").val(),
            category: {
                id: +$("#category").val()
            }
        };
        method = "POST";
        msg = "Se ha creado el vehiculo";
    }

    console.log("guardando ", payload)
    console.log("metodo ", method, "a", ruta)

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
                consultar();
            }
        },
    });
}

var editar = function (id, name, brand, year , idcategoria) {
    console.log(name, brand, year, idcategoria);
    consultarCategorias(idcategoria);
    $("#tituloModalProducto").html('Actualizar Vehiculo');
    $("#id").val(id);
    $("#placa").val(name);
    $("#modelo").val(brand);
    $("#año").val(year);
     
    $('#modalProducto').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseProducto + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el Vehiculo');
                cerrarModal();
                consultar();
            }
        },
    });
}
