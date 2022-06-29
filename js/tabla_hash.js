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
        var resultado = 30 % id_categoria;
        var resultado = this.buscar_posicion(resultado);
        var finalizar = false;
        while(finalizar == false){
            if (resultado.id_categoria == null) {
                resultado.id_categoria = id_categoria;
                resultado.company = company;
                finalizar = true;
            }else{
                resultado = resultado.siguiente;
            }
        }
    }

    graficar_lista() {
        var codigodot = "digraph G{\nlabel=\" Clasificación Usuarios \";\n node [shape=box];\n";
        var actual = this.primero;
        var recto = "";
        while (actual != null) {
            codigodot += actual.id_categoria + " [label=\"" + actual.company + "\"];";
            if (actual.abajo != null) {
                recto += actual.id_categoria + " -> " + actual.abajo.id_categoria + ";";
            }
            actual = actual.abajo;
        }
        codigodot += "}";
        codigodot += "{rank=same;\n"+recto+"\n}\n";
        codigodot += "}";
        console.log(codigodot);
        d3.select("#lienzo2").graphviz()
        .renderDot(codigodot)
    }


}

var lista = new Lista_tabla();
