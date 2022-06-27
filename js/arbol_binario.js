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
    preorden(raiz) {
        if (raiz != null) {
            console.log(raiz.nombre_actor);
            this.preorden(raiz.izquierda);
            this.preorden(raiz.derecha);
        }
    }
    inorden(raiz) {
        if (raiz != null) {
            this.inorden(raiz.izquierda);
            console.log(raiz.nombre_actor);
            this.inorden(raiz.derecha);
        }
    }
    postorden(raiz) {
        if (raiz != null) {
            this.postorden(raiz.izquierda);
            this.postorden(raiz.derecha);
            console.log(raiz.nombre_actor);
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
    enviar_tabla(raiz){
        if (raiz != null) {
            let tblDatos = document.getElementById("tblautores").insertRow(-1);
            //insertar imagen
            let cellImg = tblDatos.insertCell(-1);
            let img = document.createElement("img");
            img.src = "../img/pro.jpg";
            img.width = "100";
            img.height = "100";
            cellImg.appendChild(img);
            let cell2 = tblDatos.insertCell(-1);
            let cell3 = tblDatos.insertCell(-1);
            let cell4 = tblDatos.insertCell(-1);
            let cell5 = tblDatos.insertCell(-1);
            
            let cell7 = tblDatos.insertCell(-1);  

            cell2.innerHTML = raiz.nombre_actor;
            cell3.innerHTML = raiz.correo;
            cell4.innerHTML = raiz.telefono;
            cell5.innerHTML = raiz.descripcion;
            
            cell7.innerHTML = raiz.dni;
            
            this.enviar_tabla(raiz.izquierda);
            this.enviar_tabla(raiz.derecha);
        }            
        
        
       

    }

}

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

//var auto = new Arbol();

//auto.enviar_tabla(auto.iniciar_lista());



