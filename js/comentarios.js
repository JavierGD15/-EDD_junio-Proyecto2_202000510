class Nodo {
    constructor(nombre, comentario) {
        this.nombre = nombre;
        this.comentario = comentario;   
        this.siguiente = null;
    }
}

class Lista_comentarios {
    constructor() {
        this.primero = null;
        this.ultimo = null;    
    }
    insertar(nombre, comentario) {
        var nuevo = new Nodo(nombre, comentario);
          if (this.primero == null) {
                 this.primero = nuevo;
                 this.ultimo = nuevo;
             }             
             else {
                 this.ultimo.siguiente = nuevo;
                 this.ultimo = nuevo;                
             }
    }
  cargar_comentarios(){
    var local = localStorage.getItem("json_comentarios");    
    var json = JSON.parse(local);            
    for(var i = 0; i < json.length; i++){
        this.insertar(json[i].nombre, json[i].comentario);
    }  
    this.tabla_comentarios(); 
  }

  tabla_comentarios(){
    var local = localStorage.getItem("json_comentarios");    
    var json = JSON.parse(local);            
    for(var i = 0; i < json.length; i++){
        let tblDatos = document.getElementById("tabla_comentarios").insertRow(-1);
        let cell2 = tblDatos.insertCell(-1);
        let cell3 = tblDatos.insertCell(-1);
        cell2.innerHTML = json[i].nombre;
        cell3.innerHTML = json[i].comentario;

    }   
  }

  gurdar_comentario(){
    var guardar = [];
    var guardar1 = {};
    var ayuda = this.primero;
    while(ayuda != null){
        guardar1 = {
            nombre: ayuda.nombre,
            comentario: ayuda.comentario
        }
        guardar.push(guardar1);
        ayuda = ayuda.siguiente;
    }
    localStorage.setItem("json_comentarios", JSON.stringify(guardar));

    
    
    
  }
}
var lista = new Lista_comentarios();
var formulario = document.getElementById("lienzo2");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    var datos = new FormData(document.getElementById("formulario2"));
    var user = localStorage.getItem("usuario_activo");
    lista.insertar(user,datos.get("Comentario"));
    lista.gurdar_comentario();
    location.reload();        

})
lista.cargar_comentarios();