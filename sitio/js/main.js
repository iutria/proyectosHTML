class profesor {
    constructor(documento, nombre, apellido, rol) {
      this.documento = documento;
      this.nombre = nombre;
      this.apellido = apellido;
      this.rol = rol;
    }
}

let personas = [];

const listado = document.getElementById('listado');

cargar_datos();

function cargar_datos(){
    let item = '';
    listado.innerHTML = '';
    for (let index = 0; index < personas.length; index++) {
        item += `
            <tr>
                <th scope="row">${personas[index].documento}</th>
                <td>${personas[index].nombre}</td>
                <td>${personas[index].apellido}</td>
                <td>${personas[index].rol}</td>
                <td><button type="button" class="btn btn-primary" onclick="cargar(${personas[index].documento})"><i class="bi bi-pen"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="eliminar(${personas[index].documento})"><i class="bi bi-trash"></i></td>
            </tr>
        `;
    }
    listado.innerHTML = item;
}

function accion(){
    let boton = document.getElementById('boton-accion');
    
    documento = document.getElementById('documento').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    rol = document.getElementById('rol').value;
    let persona = new profesor(documento,nombre,apellido,rol);

    if(boton.innerHTML=='Agregar'){
        Agregar(persona);
    }else{
        editar(persona);
    }
}

function Agregar(persona){

    if(persona.documento.trim() == ''){
        mostrarToast('documento no valido','#c0392b');
        return;
    }
    if(existe(persona.documento.trim())){
        mostrarToast('esta persona ya esta registrada','#c0392b');
        return;
    }

    personas.push(persona);
    mostrarToast('Agregado correctamente','#16a085');
    cargar_datos();
    limpiar();
}

function editar(persona){
    for (let i = 0; i < personas.length; i++) {
        if(personas[i].documento==persona.documento){
            mostrarToast('Modificado correctamente','#2980b9');
            personas[i] = persona;
            cargar_datos();
            limpiar();
            return;
        }
    }    
}

function limpiar(){
    document.getElementById('documento').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('rol').value = 'seleccione';
    document.getElementById('documento').disabled = false;
    document.getElementById('boton-accion').innerHTML = 'Agregar';
}

function cargar(documento){
    for (let i = 0; i < personas.length; i++) {
        if(personas[i].documento==documento){
            document.getElementById('boton-accion').innerHTML = 'Editar';
            document.getElementById('documento').disabled = true;
            document.getElementById('documento').value= personas[i].documento;
            document.getElementById('nombre').value= personas[i].nombre;
            document.getElementById('apellido').value= personas[i].apellido;
            document.getElementById('rol').value = personas[i].rol;
            return;
        }
    }
}

function existe(documento){
    for (let i = 0; i < personas.length; i++) {
        if(personas[i].documento==documento){
            return true;
        }
    }
    return false;
}

function eliminar(documento){
    for (let i = 0; i < personas.length; i++) {
        if(personas[i].documento==documento){
            mostrarToast('Eliminado correctamente','#c0392b');
            personas.splice(i, 1);
            cargar_datos();
            return;
        }
    }
}


function mostrarToast(mensaje, color){
    let notificacion = document.getElementById('liveToast');
    let txtmensaje = document.getElementById('text-toast');
    txtmensaje.innerHTML = mensaje;
    notificacion.style.background = color;
    var toast = new bootstrap.Toast(notificacion);
    toast.show()
}