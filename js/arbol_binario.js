class Nodo_arbol {
    constructor(dni, nombre_actor, correo, descripcion) {
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo = correo;        
        this.descripcion = descripcion;       
        this.izquierda = null;
        this.derecha = null;
    }
}

class Arbol{
    
    constructor() {
        this.raiz = null;
        this.texto = "";
    }
    insertar(dni, nombre_actor, correo, descripcion) {
        var nuevo = new Nodo_arbol(dni, nombre_actor, correo, descripcion);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            var actual = this.raiz;
            var padre;
            while (true) {
                padre = actual;
                if (dni < actual.dni) {
                    actual = actual.izquierda;
                    if (actual == null) {
                        padre.izquierda = nuevo;
                        break;
                    }
                } else {
                    actual = actual.derecha;
                    if (actual == null) {
                        padre.derecha = nuevo;
                        break;
                    }
                }
            }
        }
    }
    preorden(raiz,lista) {
        
        if (raiz != null) {
            lista.push(raiz.dni);            
            this.preorden(raiz.izquierda,lista);
            this.preorden(raiz.derecha,lista);
            return lista;
        }
       
    }
    inorden(raiz,lista) {
        
        if (raiz != null) {
            this.inorden(raiz.izquierda,lista);
            lista.push(raiz.dni);
            this.inorden(raiz.derecha,lista);
            return lista;
        }
        
    }
    postorden(raiz,lista) {
        
        if (raiz != null) {
            this.postorden(raiz.izquierda,lista);
            this.postorden(raiz.derecha,lista);
            lista.push(raiz.dni);
            return lista;
        }
        
    }
    buscar_Nodo_arbol(dni) {
        var actual = this.raiz;
        while (actual != null) {
            if (dni == actual.dni) {
                return actual;
            } else if (dni < actual.dni) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }   return null;
    }

    graficar(){
        this.texto = "";
        var codigodot = "digraph G{\n graph[size = \"11.70,6.25\" ] \nlabel=\" Actores-Arbol \";\n";
        
        var derecha = this.raiz;
       
        
        this.texto += derecha.dni + " [label=\"" + derecha.nombre_actor + "\"];";
        this.texto += derecha.dni + " -> " + derecha.izquierda.dni+ ";";
        this.texto += derecha.dni + " -> " + derecha.derecha.dni+ ";";
        
        
        this.graficar_lados(derecha.izquierda);
        this.graficar_lados(derecha.derecha);
        
        codigodot += "\n"+this.texto+"\n";
        
        codigodot += "}";
        
        
        d3.select("#lienzo4").graphviz()
        .renderDot(codigodot)
        //generar imagen

        d3.select("#lienzo4").graphviz()
        .renderDot(codigodot)
        html2canvas(document.body, {
            onrendered (canvas) {
              var link = document.getElementById('download');
              var image = canvas.toDataURL();
              console.log(image);
              link.href = image;
              link.download = 'screenshot.png';
            }
           });

        

        

    }
    
    graficar_lados(nodo){
        this.texto += nodo.dni + " [label=\"" + nodo.nombre_actor + "\"];\n";
        if(nodo.izquierda != null){
            this.texto += nodo.dni + " -> " + nodo.izquierda.dni+ ";\n";
            this.graficar_lados(nodo.izquierda);
        }
        if(nodo.derecha != null){
            this.texto += nodo.dni + " -> " + nodo.derecha.dni+ ";\n";
            this.graficar_lados(nodo.derecha);
        }        

    }
    iniciar_lista(){
        let json_fantasia = JSON.parse(localStorage.getItem("json_Actores_pelis"));
        if(json_fantasia != null){
            
        for (var i = 0; i < json_fantasia.length; i++) {
            this.insertar(json_fantasia[i].dni, json_fantasia[i].nombre_actor, json_fantasia[i].correo,json_fantasia[i].descripcion);
        }
        this.graficar();
        return this.raiz;
        }
        
    }
    enviar_tabla(tabla){
        if (tabla != null) {
            for (var i = 0; i < tabla.length; i++) {
                var nodo = this.buscar_Nodo_arbol(tabla[i]);
                var tabla_actores = document.getElementById("tblactores");
                var fila = tabla_actores.insertRow(-1);                 
                var celda_nombre = fila.insertCell(-1);                
                var celda_descripcion = fila.insertCell(-1);
                
                celda_nombre.innerHTML = nodo.nombre_actor;
                
                celda_descripcion.innerHTML = nodo.descripcion;
            }
            
        }  
        else{
            return null;
        }     
    }

    iniciar_lista_arbol(){
        let json_fantasia = JSON.parse(localStorage.getItem("json_Actores_pelis"));
        if(json_fantasia != null){
            
        for (var i = 0; i < json_fantasia.length; i++) {
            this.insertar(json_fantasia[i].dni, json_fantasia[i].nombre_actor, json_fantasia[i].correo,json_fantasia[i].descripcion);
        }
        var lista = [];
        var tablas = this.preorden(this.raiz,lista);
        this.enviar_tabla(tablas);
        }
    }

}
var auto = new Arbol();
try{
   
auto.iniciar_lista_arbol();
}
catch(e){
}

try{
    document.getElementById('mostrar').addEventListener('click', function() {
        let elementoActivo = document.querySelector('input[name="status"]:checked');
       if(elementoActivo) {
           if(elementoActivo.value == "In orden"){
               let Table = document.getElementById("tblactores");
               Table.innerHTML = "";
               var lista = [];
               var tablas = auto.inorden(auto.raiz,lista);
               auto.enviar_tabla(tablas);
               
           }
           else if(elementoActivo.value == "Pre orden"){
               let Table = document.getElementById("tblactores");
               Table.innerHTML = "";
           var lista = [];
           var tablas = auto.preorden(auto.raiz,lista);
           auto.enviar_tabla(tablas);
   
           }
           else if(elementoActivo.value == "Post orden"){
               let Table = document.getElementById("tblactores");
               Table.innerHTML = "";
               var lista = [];
           var tablas = auto.postorden(auto.raiz,lista);
           auto.enviar_tabla(tablas);
           }
       } else {
           alert('No hay ninún elemento activo');
       }
   });
   
   document.getElementById('setear').addEventListener('click', function() {
       setRadio('status', 'interesado')
   });
   
   function setRadio(name, value) {
       document.querySelectorAll(`input[name="${name}"]`).forEach(element => {
           if(element.value === value) {
               element.checked = true;
           }
       });
   }
}catch(e){}


var formulario = document.getElementById("lienzo4");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    //recibir documento de formulario
    let file = document.querySelector('#file4');
    let reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function(e){
        let contenido = e.target.result;
        var json = JSON.parse(contenido);
        localStorage.setItem("json_Actores_pelis", contenido);
        var arbol = new Arbol();
        for (var i = 0; i < json.length; i++) {
            var resultado = arbol.buscar_Nodo_arbol(json[i].dni);
            if(resultado == null){
            arbol.insertar(json[i].dni, json[i].nombre_actor, json[i].correo,  json[i].descripcion);}

        }
        arbol.graficar();
        
    }
})








