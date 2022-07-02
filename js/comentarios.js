class Nodo {
    constructor(id,nombre, comentario) {
        this.id = id;
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
    insertar(id,nombre, comentario) {
        var nuevo = new Nodo(id,nombre, comentario);
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
    
    var local1 = localStorage.getItem("json_info");  
    var json1 = JSON.parse(local1);

    
    for(var i = 0; i < json.length; i++){
        
        if(json[i].id == json1[0].id_pelicula){
            
            this.insertar(json1[0].id_pelicula,json[i].nombre, json[i].comentario);
        }
    }  
    console.log(this.primero);
    this.tabla_comentarios(); 
  }

  tabla_comentarios(){
    var actual = this.primero;

    while(actual != null){
        let tblDatos = document.getElementById("tabla_comentarios").insertRow(-1);
        let cell2 = tblDatos.insertCell(-1);
        let cell3 = tblDatos.insertCell(-1);
        cell2.innerHTML = actual.nombre;
        cell3.innerHTML = actual.comentario;
        actual = actual.siguiente;
    }
        

    
  }

  gurdar_comentario(){
    var guardar = [];
    var guardar1 = {};
    var ayuda = this.primero;
    while(ayuda != null){
        guardar1 = {
            id: ayuda.id,
            nombre: ayuda.nombre,
            comentario: ayuda.comentario
        }
        guardar.push(guardar1);
        ayuda = ayuda.siguiente;
        
    }
    ayuda = this.primero;
    var local = localStorage.getItem("json_comentarios");  
    if(local != null){
        var json = JSON.parse(local);   
    
    for(var i = 0; i < json.length; i++){
        if(json[i].id != ayuda.id){
            console.log(json[i]);
            guardar1 = {
                id: json[i].id,
                nombre: json[i].nombre,
                comentario: json[i].comentario
    
            }
            guardar.push(guardar1);
            
        }
        
    } 
    }
    
    localStorage.removeItem("json_comentarios");
    localStorage.setItem("json_comentarios", JSON.stringify(guardar));

    
  }
}
var lista = new Lista_comentarios();
var formulario = document.getElementById("lienzo2");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    var datos = new FormData(document.getElementById("formulario2"));
    var local = localStorage.getItem("json_info");  
    var json = JSON.parse(local); 
    var user = localStorage.getItem("usuario_activo");

    lista.insertar(json[0].id_pelicula,user,datos.get("Comentario"));
    lista.gurdar_comentario();
    location.reload();        

})
try{
    lista.cargar_comentarios();
} catch(e){}