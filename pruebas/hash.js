class Nodo_tabla {
    constructor(id_categoria, company) {
        this.posicion = null;
        this.id_categoria = id_categoria;
        this.company = company;
        this.siguiente = null;
        this.abajo = null;
    }
}

class Lista_tabla {

    constructor() {
        this.primero = null;
        this.ultimo = null;  
        this.x = 0;  
    }

    insertar() {
        var nuevo = new Nodo_tabla(null, null);
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.primero.posicion = this.x;
            this.x++;
        } else {
            this.ultimo.abajo = nuevo;
            this.ultimo = nuevo;
            this.ultimo.posicion = this.x;
            this.x++;
        }
    }

    imprimir() {
        var ayuda = this.primero;
        while (ayuda != null) {
            console.log(ayuda.id_categoria + " " + ayuda.company+ " " + ayuda.posicion);
            ayuda = ayuda.abajo;
        }
    }

    buscar_posicion(respuesta) {
        var ayuda = this.primero;
        while (ayuda != null) {
            if (ayuda.posicion == respuesta) {
                return ayuda;
            }
            ayuda = ayuda.abajo;
        }
    }

    calcular_insercion(id_categoria, company) {
        
        var calculo =  id_categoria % 30;
        var resultado = this.buscar_posicion(calculo);
        var finalizar = false;
        while(finalizar == false){
                        
                if(resultado.siguiente == null){
                    resultado.siguiente = new Nodo_tabla(id_categoria, company);                    
                    resultado.siguiente.posicion = resultado.posicion;                    
                    finalizar = true;
                }
                resultado = resultado.siguiente;            
        }
    }

    graficar_lista() {
        var codigodot = "digraph G{\nlabel=\" Tabla Hash \";\n node [shape=box];\n";
        var actual = this.primero;
        var recto = "";
        var filas = "";
        while (actual != null) {
            codigodot += actual.posicion + " [label=\"" +"Posición: "+actual.posicion  + "\"];";
            if (actual.abajo != null) {
                recto += actual.posicion + " -> " + actual.abajo.posicion + ";\n";
            }

            //conexion recta 
            var ayuda_columnas = actual.siguiente;
            var y = 60;
            if(ayuda_columnas != null){
                filas += actual.posicion + " -> " + ayuda_columnas.posicion+""+ y + ";\n";
                while(ayuda_columnas != null){
                    
                    codigodot += ayuda_columnas.posicion+""+ y + " [label=\"" + ayuda_columnas.id_categoria  + "\"];";
                    if(ayuda_columnas.siguiente != null){
                        filas += ayuda_columnas.posicion+""+ y + " -> " + ayuda_columnas.posicion+""+ (y+1) + ";\n";                        
                    }
                    ayuda_columnas = ayuda_columnas.siguiente;
                    y++;
                }
            }

            codigodot += "{rank=same;\n"+filas+"\n}\n";
            filas = "";
            actual = actual.abajo;
        }
        codigodot += "\n"+recto+"\n";
        codigodot += "{rank=same;\n"+filas+"\n}\n";
        codigodot += "}";
        console.log(codigodot);
        d3.select("#lienzo2").graphviz()
        .renderDot(codigodot)
    }


}

var lista = new Lista_tabla();
for (let index = 0; index < 30; index++) {
    lista.insertar();            
}
lista.calcular_insercion(15, "google");
lista.calcular_insercion(35, "facebook");
lista.calcular_insercion(68, "twitter");
lista.calcular_insercion(54, "instagram");
lista.calcular_insercion(21, "youtube");
lista.calcular_insercion(85, "linkedin");
lista.calcular_insercion(35, "pinterest");
lista.calcular_insercion(36, "tumblr");
lista.calcular_insercion(32, "reddit");
lista.calcular_insercion(10, "snapchat");
lista.calcular_insercion(25, "vine");
lista.calcular_insercion(35, "flickr");
lista.calcular_insercion(68, "quora");
lista.calcular_insercion(68, "github");
lista.calcular_insercion(9, "bitbucket");
lista.calcular_insercion(54, "stackoverflow");
lista.calcular_insercion(87, "bitly");
lista.graficar_lista();

