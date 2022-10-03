class profesor {
    constructor(documento, nombre, apellido, rol,correo,clave) {
      this.documento = documento;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.clave = clave;   
      this.rol = rol;
    }
}

//  fetch('data.json').then(r=> r.json()).then(j => cargarDatos(j));
        
 cargarDatos();

 async function cargarDatos(){

     let data = await fetch('data.json').then(r=> r.json());

     let lista = '';
     
     for (const key in data) {
        
     }
     document.getElementById('listado').innerHTML = lista;
 }