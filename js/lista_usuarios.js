class Nodo {
    constructor(dpi, nombre, usuario, correo, contraseña, telefono) {
        this.dpi = dpi;
        this.nombre = nombre;
        this.usuario = usuario;
        this.correo = correo;        
        this.contraseña = contraseña;
        this.telefono = telefono;      
        this.siguiente = null;
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;    
    }

    //insertar usuario predeterminado
    insertar_predeterminado() {
        this.insertar(2354168452525, "Wilfred Perez", "Wilfred", "Wilfred@gmail.com", "123", "+502 (123) 123-4567");
    }

   //insertar usuario
   insertar(dpi, nombre, usuario, correo, contraseña, telefono) {
       var nuevo = new Nodo(dpi, nombre, usuario, correo, contraseña, telefono);
         if (this.primero == null) {
                this.primero = nuevo;
                this.ultimo = nuevo;
            }             
            else {
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;                
            }
   }

   //imprimir lista
    imprimir() {
        var actual = this.primero.siguiente;
        var detener = this.primero;
        console.log(detener.dpi + " " + detener.nombre + " " + detener.usuario + " " + detener.correo + " " + detener.rol + " " + detener.contraseña + " " + detener.telefono);
        while (actual != detener) {
            console.log(actual.dpi + " " + actual.nombre + " " + actual.usuario + " " + actual.correo + " " + actual.rol + " " + actual.contraseña + " " + actual.telefono);
            actual = actual.siguiente;            
        }
    }


    graficar_lista(){
        var codigodot = "digraph G{\nlabel=\" Clasificación Usuarios \";\n node [shape=box];\n";
        var actual = this.primero;
        var recto = "";
        
        
        //fila
        
        while (actual != null) {
            codigodot += actual.dpi + " [label=\"" + actual.nombre +"\n"+ actual.correo + "\"];";
            if(actual.siguiente != null){ recto += actual.dpi + " -> " + actual.siguiente.dpi+ ";";
            actual = actual.siguiente;}
            else{
            actual = actual.siguiente;
        }}

        codigodot += "{rank=same;\n"+recto+"\n}\n";
        codigodot += "}";
        
        d3.select("#lienzo2").graphviz()
        .renderDot(codigodot)
        
    }

   
}

var formulario = document.getElementById("lienzo2");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    //recibir documento de formulario    
    let file = document.querySelector('#file');
    var lista = new Lista();
    if (file == null){
           
    //recibir datos de formulario
    var datos = new FormData(document.getElementById("formulario"));

    if(datos.get("user") == "" || datos.get("contraseña") == ""){
        alert("No se puede dejar campos vacios");
    }
    else if(datos.get("user") == "EDD" && datos.get("contraseña") == "123"){
        lista.insertar_predeterminado();
        if(datos.get("checkbox") == "on"){                        
            location.href = "templates/admin.html";
            opcion = true;
            }
            else{
            opcion = true;
            localStorage.setItem("usuario_activo", "Wilfred");
            location.href = "templates/tienda.html";
        }
    }
    else{        
        var opcion = false;
        let json_usuarios = JSON.parse(localStorage.getItem("json_clientes"));
        if(json_usuarios != null){
            for (var i = 0; i < json_usuarios.length; i++) {
                if(datos.get("user") == json_usuarios[i].nombre_usuario && datos.get("contraseña") == json_usuarios[i].contrasenia){  
                    if(datos.get("checkbox") == "on"){                        
                    location.href = "templates/admin.html";
                    opcion = true;
                    }
                    else{
                    opcion = true;
                    localStorage.setItem("usuario_activo", json_usuarios[i].nombre_usuario);
                    location.href = "templates/tienda.html";
                }
                }
            }
            if(opcion == false){
                alert("Usuario o contraseña incorrectos");
            }
            
        }else{
            alert("Usuario o contraseña incorrectos :(");
        }
        
    }

    }else{
        let reader = new FileReader();
        reader.readAsText(file.files[0]);
        reader.onload = function(e){
            let contenido = e.target.result;
            var json = JSON.parse(contenido);

            localStorage.setItem("json_clientes", contenido);            
    
            for (var i = 0; i < json.length; i++) {
                lista.insertar(json[i].dpi, json[i].nombre_completo, json[i].nombre_usuario, json[i].correo, json[i].contrasenia, json[i].telefono);
            }
            lista.graficar_lista();
        }
    }


})






