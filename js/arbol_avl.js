// Create node
class Node {
    constructor(valor = null, id_pelicula, nombre_pelicula,descripcion, puntuacion_star, precion_Q) {
      this.valor = valor;
      this.altura = 1;
      this.izquierda = null;
      this.derecha = null;
      this.id_pelicula = id_pelicula;
      this.nombre_pelicula = nombre_pelicula;
      this.descripcion = descripcion;
      this.puntuacion_star = puntuacion_star;
      this.precion_Q = precion_Q;

    }
  }
  
  class AVLTree {
    constructor() {
      this.root = null;
    }
  
    altura(N) {
      if (N === null) {
        return 0;
      }
      return N.altura;
    }
  
    derechaRotate(y) {
      let x = y.izquierda;
      let T2 = x.derecha;
      x.derecha = y;
      y.izquierda = T2;
      y.altura = Math.max(this.altura(y.izquierda), this.altura(y.derecha)) + 1;
      x.altura = Math.max(this.altura(x.izquierda), this.altura(x.derecha)) + 1;
      return x;
    }
  
    izquierdaRotate(x) {
      let y = x.derecha;
      let T2 = y.izquierda;
      y.izquierda = x;
      x.derecha = T2;
      x.altura = Math.max(this.altura(x.izquierda), this.altura(x.derecha)) + 1;
      y.altura = Math.max(this.altura(y.izquierda), this.altura(y.derecha)) + 1;
      return y;
    }
  
    getBalanceFactor(N) {
      if (N == null) {
        return 0;
      }
  
      return this.altura(N.izquierda) - this.altura(N.derecha);
    }
  
    insertNodeHelper(node, valor) {
  
      if (node == null) {
        return (new Node(valor));
      }
  
      if (valor < node.valor) {
        node.izquierda = this.insertNodeHelper(node.izquierda, valor);
      } else if (valor > node.valor) {
        node.derecha = this.insertNodeHelper(node.derecha, valor);
      } else {
        return node;
      }
  
      node.altura = 1 + Math.max(this.altura(node.izquierda), this.altura(node.derecha));
      let balanceFactor = this.getBalanceFactor(node);
  
      if (balanceFactor > 1) {
        if (valor < node.izquierda.valor) {
          return this.derechaRotate(node);
        } else if (valor > node.izquierda.valor) {
          node.izquierda = this.izquierdaRotate(node.izquierda);
          return this.derechaRotate(node);
        }
      }
  
      if (balanceFactor < -1) {
        if (valor > node.derecha.valor) {
          return this.izquierdaRotate(node);
        } else if (valor < node.derecha.valor) {
          node.derecha = this.derechaRotate(node.derecha);
          return this.izquierdaRotate(node);
        }
      }
      return node;
    }
  
    insertNode(valor) {
      this.root = this.insertNodeHelper(this.root, valor);
    }
  
    nodeWithMimumValue(node) {
      let current = node;
      while (current.izquierda !== null) {
        current = current.izquierda;
      }
      return current;
    }
  
    deleteNodeHelper(node, valor) {
  
      if (node == null) {
        return node;
      }
      if (valor < node.valor) {
        node.izquierda = deleteNodeHelper(node.izquierda, valor);
      } else if (valor > node.valor) {
        node.derecha = deleteNodeHelper(node.derecha, valor);
      } else {
        if ((node.izquierda === null) || (node.derecha === null)) {
          let temp = null;
          if (temp == node.izquierda) {
            temp = node.derecha;
          } else {
            temp = node.izquierda;
          }
  
          if (temp == null) {
            temp = this.root;
            this.root = null;
          } else {
            this.root = temp;
          }
        } else {
          let temp = this.nodeWithMimumValue(this.root.derecha);
          this.root.valor = temp.valor;
          this.root.derecha = deleteNodeHelper(this.root.derecha, temp.valor);
        }
      }
      if (root == null) {
        return root;
      }
  
      this.root.altura = Math.max(this.altura(this.root.izquierda), this.altura(this.root.derecha)) + 1;
  
      let balanceFactor = this.getBalanceFactor(root);
      if (balanceFactor > 1) {
        if (this.getBalanceFactor(this.root.izquierda) >= 0) {
          return this.derechaRotate(this.root);
        } else {
          root.izquierda = this.izquierdaRotate(this.root.izquierda);
          return this.derechaRotate(this.root);
        }
      }
      if (balanceFactor < -1) {
        if (this.getBalanceFactor(this.root.derecha) <= 0) {
          return this.izquierdaRotate(this.root);
        } else {
          root.derecha = this.derechaRotate(this.root.derecha);
          return this.izquierdaRotate(this.root);
        }
      }
      return root;
    }
  
    deleteNode(valor) {
      root = deleteNodeHelper(this.root, valor);
    }
  
    preOrder() {
      this.preOrderHelper(this.root);
    }
  
    preOrderHelper(node) {
      if (node) {
        console.log(node.valor);
        this.preOrderHelper(node.izquierda);
        this.preOrderHelper(node.derecha);
      }
    }
    graficar(){
      this.texto = "";
      var codigodot = "digraph G{\n graph[size = \"11.70,6.25\" ] \nlabel=\" Autores-Arbol \";\n";
      
      var derecha = this.root;
     
      
      this.texto += derecha.valor + " [label=\"" + derecha.valor + "\"];";
      this.texto += derecha.valor + " -> " + derecha.izquierda.valor+ ";";
      this.texto += derecha.valor + " -> " + derecha.derecha.valor+ ";";
      
      
      this.graficar_lados(derecha.izquierda);
      this.graficar_lados(derecha.derecha);
      
      codigodot += "\n"+this.texto+"\n";
      
      codigodot += "}";
      
      d3.select("#lienzo1").graphviz()
      .renderDot(codigodot)
  }
  obtetener_nodo(valor){
          var inicio = valor;
          let tblDatos = document.getElementById("tblpeliculas").insertRow(-1);

          //insertar imagen
          let cellImg = tblDatos.insertCell(-1);
          let img = document.createElement("img");
          img.src = "../img/poster.jpg";
          img.width = "200";
          img.height = "200";
          cellImg.appendChild(img);
          
          let cell2 = tblDatos.insertCell(-1);
          let cell3 = tblDatos.insertCell(-1);              
          
          cell2.innerHTML = inicio.nombre_pelicula;
          cell3.innerHTML = inicio.descripcion;
          
          //enviar boton
          let cell7 = tblDatos.insertCell(-1);
          let btn = document.createElement("button");
          btn.innerHTML = "Informacion";
          btn.setAttribute("type", "submit");        
          btn.setAttribute("onclick", "comprar_libros()");
          cell7.appendChild(btn);

          let cell8 = tblDatos.insertCell(-1);
          let btn1 = document.createElement("button");
          btn1.innerHTML = "Alquilar";
          btn1.setAttribute("type", "submit");         
          btn1.setAttribute("onclick", "pila()");
          cell8.appendChild(btn1);    

          let cell4 = tblDatos.insertCell(-1);            
          cell4.innerHTML = "Q"+inicio.precion_Q;
    if(inicio.izquierda != null){
      this.obtetener_nodo(inicio.izquierda);
    }
    if(inicio.derecha != null){
      this.obtetener_nodo(inicio.derecha);
    }

  }
  
  graficar_lados(nodo){
      this.texto += nodo.valor + " [label=\"" + nodo.valor + "\"];\n";
      if(nodo.izquierda != null){
          this.texto += nodo.valor + " -> " + nodo.izquierda.valor+ ";\n";
          this.graficar_lados(nodo.izquierda);
      }
      if(nodo.derecha != null){
          this.texto += nodo.valor + " -> " + nodo.derecha.valor+ ";\n";
          this.graficar_lados(nodo.derecha);
      }      
  }

  obtener_local(){
    //obtener localstorage
    var local = localStorage.getItem("json_peliculas");
    var json = JSON.parse(local);            
    for (var i = 0; i < json.length; i++) {          
      this.insertNode(json[i].id_pelicula);   
          
    }
   
    for (var i = 0; i < json.length; i++) {        
      
      this.agregar_info(this.root, json[i].id_pelicula, json[i].nombre_pelicula, json[i].descripcion, json[i].puntuacion_star, json[i].precion_Q);      
    }
    
    this.iniciar_tabla();

  }

  agregar_info(nodo,id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precion_Q){
    var inicio = nodo;
    
    if(inicio.valor == id_pelicula){
      inicio.id_pelicula = id_pelicula;
      inicio.nombre_pelicula = nombre_pelicula;
      inicio.descripcion = descripcion;
      inicio.puntuacion_star = puntuacion_star;
      inicio.precion_Q = precion_Q;
    }else{
      if(inicio.izquierda != null){
        this.agregar_info(inicio.izquierda, id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precion_Q);
      }
      if(inicio.derecha != null){
        this.agregar_info(inicio.derecha, id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precion_Q);
      }
    }
  }

  iniciar_tabla(){    
        
          var inicio = this.root; 
          console.log(inicio);         
          let tblDatos = document.getElementById("tblpeliculas").insertRow(-1);
          //insertar imagen
          let cellImg = tblDatos.insertCell(-1);
          let img = document.createElement("img");
          img.src = "../img/poster.jpg";
          img.width = "200";
          img.height = "200";
          cellImg.appendChild(img);
          
          let cell2 = tblDatos.insertCell(-1);
          let cell3 = tblDatos.insertCell(-1);              
          
          cell2.innerHTML = inicio.nombre_pelicula;
          cell3.innerHTML = inicio.descripcion;
          
          //enviar boton
          let cell7 = tblDatos.insertCell(-1);
          let btn = document.createElement("button");
          btn.innerHTML = "Informacion";
          btn.setAttribute("type", "submit");        
          btn.setAttribute("onclick", "comprar_libros()");
          cell7.appendChild(btn);

          let cell8 = tblDatos.insertCell(-1);
          let btn1 = document.createElement("button");
          btn1.innerHTML = "Alquilar";
          btn1.setAttribute("type", "submit");         
          btn1.setAttribute("onclick", "pila()");
          cell8.appendChild(btn1);    

          let cell4 = tblDatos.insertCell(-1);            
          cell4.innerHTML = "Q"+inicio.precion_Q;

          this.obtetener_nodo(inicio.izquierda);
          this.obtetener_nodo(inicio.derecha);

  }
  
  }


var formulario = document.getElementById("lienzo1");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Formulario enviado");
    //recibir documento de formulario
    let file = document.querySelector('#file1');
    let reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function(e){
        //guardar documento        
        var arbol = new AVLTree();
        let contenido = e.target.result;
        var json = JSON.parse(contenido);
        
        //guarda el json en el localStorage
        localStorage.setItem("json_peliculas", contenido);
        
        
        for (var i = 0; i < json.length; i++) {          
          arbol.insertNode(json[i].id_pelicula);    
        }
        arbol.graficar();     
        
    }

})
var arbol1 = new AVLTree();
arbol1.obtener_local();


