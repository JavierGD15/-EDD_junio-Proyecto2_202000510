// Create node
class Node {
    constructor(valor = null, id_pelicula, nombre_pelicula,descripcion, puntuacion_star, precio_Q) {
      this.valor = valor;
      this.altura = 1;
      this.izquierda = null;
      this.derecha = null;
      this.id_pelicula = id_pelicula;
      this.nombre_pelicula = nombre_pelicula;
      this.descripcion = descripcion;
      this.puntuacion_star = puntuacion_star;
      this.precio_Q = precio_Q;

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
          var tblDatos = document.getElementById("tblpeliculas").insertRow(-1);


          


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
          btn.setAttribute("onclick", "Informacion("+inicio.id_pelicula+")");
          cell7.appendChild(btn);

          let cell8 = tblDatos.insertCell(-1);
          let btn1 = document.createElement("button");
          btn1.innerHTML = "Alquilar";
          btn1.setAttribute("type", "submit");         
          btn1.setAttribute("onclick", "pila("+inicio.id_pelicula+")");
          cell8.appendChild(btn1);    

          let cell4 = tblDatos.insertCell(-1);            
          cell4.innerHTML = "Q"+inicio.precio_Q;
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
      
      this.agregar_info(this.root, json[i].id_pelicula, json[i].nombre_pelicula, json[i].descripcion, json[i].puntuacion_star, json[i].precio_Q);      
    }
    
    this.iniciar_tabla();

  }

  agregar_info(nodo,id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q){
    var inicio = nodo;
    
    if(inicio.valor == id_pelicula){
      inicio.id_pelicula = id_pelicula;
      inicio.nombre_pelicula = nombre_pelicula;
      inicio.descripcion = descripcion;
      inicio.puntuacion_star = puntuacion_star;
      inicio.precio_Q = precio_Q;
    }else{
      if(inicio.izquierda != null){
        this.agregar_info(inicio.izquierda, id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q);
      }
      if(inicio.derecha != null){
        this.agregar_info(inicio.derecha, id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q);
      }
    }
  }

  buscar_nodo_devolver(nodo,id_pelicula){
    if (nodo== null){
      var inicio = this.root;
    }
    else{
      var inicio = nodo;
    }
    
   
   
    
    if(inicio.valor == id_pelicula){
      
      this.gurdar_info(inicio);
      this.llenar_info(inicio);
    }else{
      if(inicio.izquierda != null){
        this.buscar_nodo_devolver(inicio.izquierda, id_pelicula);
      }
      if(inicio.derecha != null){
        this.buscar_nodo_devolver(inicio.derecha, id_pelicula);
      }
    }
  }

  buscar_nodo(nodo,id_pelicula, logica, fila){
    var inicio = nodo;   
    
    if(inicio.valor == id_pelicula){
      if(logica == false){
        this.llenar_info(inicio);
      }else if(logica == true){       
     
     this.llenar_descendente(inicio,fila);

      }else{     
     this.llenar_descendente(inicio,fila);
      }
      
    }
    
    
    else{
      if(inicio.izquierda != null){
        this.buscar_nodo(inicio.izquierda, id_pelicula, logica, fila);
      }
      if(inicio.derecha != null){
        this.buscar_nodo(inicio.derecha, id_pelicula, logica, fila);
      }
    }
  }

  iniciar_tabla(){            
          var inicio = this.root;   
          var tblDatos = document.getElementById("tblpeliculas").insertRow(-1);
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
          btn.setAttribute("onclick", "Informacion("+inicio.id_pelicula+")");
          cell7.appendChild(btn);

          let cell8 = tblDatos.insertCell(-1);
          let btn1 = document.createElement("button");
          btn1.innerHTML = "Alquilar";
          btn1.setAttribute("type", "submit");         
          btn1.setAttribute("onclick", "pila("+inicio.id_pelicula+")");
          cell8.appendChild(btn1);    

          let cell4 = tblDatos.insertCell(-1);            
          cell4.innerHTML = "Q"+inicio.precio_Q;

          this.obtetener_nodo(inicio.izquierda);
          this.obtetener_nodo(inicio.derecha);

  }

  
  llenar_descendente(inicio, fila){
       
       var tblDatos = document.getElementById("tblpeliculas").insertRow(-1);
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
       btn.setAttribute("onclick", "Informacion("+inicio.id_pelicula+")");
       cell7.appendChild(btn);

       let cell8 = tblDatos.insertCell(-1);
       let btn1 = document.createElement("button");
       btn1.innerHTML = "Alquilar";
       btn1.setAttribute("type", "submit");         
       btn1.setAttribute("onclick", "pila("+inicio.id_pelicula+")");
       cell8.appendChild(btn1);    

       let cell4 = tblDatos.insertCell(-1);            
       cell4.innerHTML = "Q"+inicio.precio_Q;
        
  }


  //esta malo
  llenar_info(){
    var local = localStorage.getItem("json_info");    
    var json = JSON.parse(local);
    for (var i = 0; i < json.length; i++) {
      

    
    
    let tblDatos = document.getElementById("tblinfo").insertRow(-1);    
    
    let cell1 = tblDatos.insertCell(-1);    
    let cell3 = tblDatos.insertCell(-1);   
    
    cell1.innerHTML = json[i].nombre_pelicula;
    cell3.innerHTML = json[i].descripcion;

    if(json[i].puntuacion_star == 1){
    let cellImg = tblDatos.insertCell(-1);
    let img = document.createElement("img");
    img.src = "../img/one.png";
    img.width = "300";
    img.height = "80";
    cellImg.appendChild(img);
    } else if(json[i].puntuacion_star == 2){
    let cellImg = tblDatos.insertCell(-1);
    let img = document.createElement("img");
    img.src = "../img/two.png";
    img.width = "300";
    img.height = "80";
    cellImg.appendChild(img);
    } else if(json[i].puntuacion_star == 3){
    let cellImg = tblDatos.insertCell(-1);
    let img = document.createElement("img");
    img.src = "../img/three.png";
    img.width = "300";
    img.height = "80";
    cellImg.appendChild(img);
    } else if(json[i].puntuacion_star == 4){
    let cellImg = tblDatos.insertCell(-1);
    let img = document.createElement("img");
    img.src = "../img/four.png";
    img.width = "300";
    img.height = "80";
    cellImg.appendChild(img);
    } else if(json[i].puntuacion_star == 5){
    let cellImg = tblDatos.insertCell(-1);
    let img = document.createElement("img");
    img.src = "../img/five.png";
    img.width = "300";
    img.height = "80";
    cellImg.appendChild(img);
    }
    
    let cell8 = tblDatos.insertCell(-1);
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Alquilar";
    btn1.setAttribute("type", "submit");         
    btn1.setAttribute("onclick", "pila("+json[i].id_pelicula+")");
    cell8.appendChild(btn1);    

    let cell4 = tblDatos.insertCell(-1);            
    cell4.innerHTML = "Q"+json[i].precio_Q;
    }

    
  }

  gurdar_info(nodo){    
    var enviar =[]
    var enviar1 ={}
    enviar1.id_pelicula = nodo.id_pelicula;
    enviar1.nombre_pelicula = nodo.nombre_pelicula;
    enviar1.descripcion = nodo.descripcion;
    enviar1.puntuacion_star = nodo.puntuacion_star;
    enviar1.precio_Q = nodo.precio_Q;    
    enviar.push(enviar1);
    localStorage.removeItem("json_info");
    localStorage.setItem("json_info", JSON.stringify(enviar));
    location.href = "../templates/vista_pelicula.html";
  
  }

  guardar_alquiler(id){
    var enviar =[]
    var enviar1 ={}

    var local = localStorage.getItem("json_peliculas");
    var json = JSON.parse(local);
    
    for(var i = 0; i < json.length; i++){
      if(json[i].id_pelicula == id){
        console.log(json[i]);
        var alquiladas = localStorage.getItem("json_alquiler");

        var usuario = localStorage.getItem("usuario_activo");
        if(alquiladas == null){
          
        enviar1.nombre_pelicula = json[i].nombre_pelicula;
        enviar1.usuario = usuario;
        enviar.push(enviar1);
        localStorage.setItem("json_alquiler", JSON.stringify(enviar));
        
          location.reload();
          break
        }
        else{
          var json1 = JSON.parse(alquiladas);
          enviar1.nombre_pelicula = json[i].nombre_pelicula;
          enviar1.usuario = usuario;
          json1.push(enviar1);
          localStorage.setItem("json_alquiler", JSON.stringify(json1));
          //location.href = "../templates/vista_alquiler.html";
          //recargar
          location.reload();
          break
        }
      }
    }


  }


  
  }
  var arbol1 = new AVLTree();
  try{
    
  arbol1.obtener_local();
  }catch(e){}
  try{
    
     arbol1.llenar_info();
    }catch(e){}

  try{
      arbol1.cargar_comentarios();
    }catch(e){}
 

  try{
    document.getElementById('mostrar1').addEventListener('click', function() {
      let elementoActivo = document.querySelector('input[name="status1"]:checked');
     if(elementoActivo) {
         if(elementoActivo.value == "Ascendente"){
           let Table = document.getElementById("tblpeliculas");
           Table.innerHTML = "";
            //obtener localstorage
           var local = localStorage.getItem("json_peliculas");
           var json = JSON.parse(local);        
           var lista_ayuda = [];    
           for (var i = 0; i < json.length; i++) {          
             lista_ayuda.push(json[i].id_pelicula);   

           }
           const arreglo = lista_ayuda;
          arreglo.sort((unNumero, otroNumero) => unNumero - otroNumero);
          
         
           
           
           for (var i = 0; i < lista_ayuda.length; i++) {
             arbol1.buscar_nodo(arbol1.root, arreglo[i], null, i);
           }
             
             
         }
         else if(elementoActivo.value == "Descendente"){
           let Table = document.getElementById("tblpeliculas");
         Table.innerHTML = "";
           //obtener localstorage
           var local = localStorage.getItem("json_peliculas");
           var json = JSON.parse(local);        
           var lista_ayuda = [];    
           for (var i = 0; i < json.length; i++) {          
             lista_ayuda.push(json[i].id_pelicula);   

           }
           const arreglo = lista_ayuda;
            
            arreglo.sort((unNumero, otroNumero) => otroNumero - unNumero);
          
           for (var i = 0; i < lista_ayuda.length; i++) {
             arbol1.buscar_nodo(arbol1.root, arreglo[i], true, i);
           }
            
 
         }
     } else {
         alert('No hay nin??n elemento activo');
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

    
  
function Informacion(nodo){  
  console.log(nodo);
  arbol1.buscar_nodo_devolver(null, nodo);
}

function pila(nombre){  
  console.log(nombre);
  arbol1.guardar_alquiler(nombre);
}









var formulario = document.getElementById("lienzo1");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
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




