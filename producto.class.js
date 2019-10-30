class Producto {
  //Constructor
  constructor(n, s, p, i, d = true){
    //Atributos
    this.nombre = n
    this.stock = s
    this.precio = p
    this.imagen = i
    this.disponible = d //<-- Por default asigna "true"
  }

  //Propiedades Lectura/Escritura (getters & setters)
  get Precio(){
    return "U$S" + (this.precio * 1.21).toFixed(2)
  }

  set Precio(value){

    if( isNaN(value) != true ){
      this.precio = value
    } else {
      console.error("ERROR: Valor ingresado NO válido")
    }

  }

  set Disponible(value){

    if( value == this.disponible ){
      alert("La disponibilidad ya está en: " + value)
      return
    }

    let estado = value ? "habilitar" : "deshabilitar"

    if( confirm(`Desea ${estado} el producto "${this.nombre}"`) ){
      this.disponible = value
    }

  }

  //Metodos de Instancia
  Mostrar(selector){ //← Ej: "#productos-destacados"
    let ficha = document.createElement("article") // ← <article></article>

        ficha.classList.add("col-lg-4", "col-md-6", "mb-4", "producto")// ← <article class="col-lg-4 col-md-6 mb-4s producto"></article>

        ficha.innerHTML = `<div class="card h-100 bg-dark text-light">
                            <a href="#">
                              <img class="card-img-top" src="${this.imagen}" alt="${this.nombre}">
                            </a>
                            <div class="card-body">
                              <h4 class="card-title">
                                <a href="#">${this.nombre}</a>
                              </h4>
                              <h5 class="btn btn-warning">${this.Precio}</h5>
                              <p class="card-text">${this.stock} unid.</p>
                            </div>
                          </div>`

    document.querySelector(selector).appendChild( ficha )

    console.log( ficha )
  }

  aplicarDescuento(valor){
    let importe = (this.precio * valor) / 100

    this.precio = this.precio - importe
  }

  //Metodos de Clase (estáticos)
  static parse(json){ //<-- Ej: '[{"nombre":"Café Torrado","stock":600,"precio":85.65,"disponible":false},{"nombre":"Jugo de Naranja","stock":450,"precio":15.45,"disponible":true}]'
    //Acá hay que h acer magia para que se conviertan en objetos 'Producto'
    //let datos = JSON.parse(json) //<-- de JSON a Object
    //let datos = json //<-- de JSON a Object

    let datos = (typeof json == "string") ? JSON.parse(json) : json

    console.log("Estos son los datos:")
    console.log(datos)

    if( datos instanceof Array ){

      //1) Recorrer el Array de Object para instanciar objetos Producto y retornarlos
      return datos.map(item => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen) ) //2) <-- Instanciar un objeto Producto con los datos de cada Object

    } else if( datos instanceof Object ){

      return new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.Imagen)

    } else {
      console.error("Ya fue... no convierto nada en Producto")
    }

  }
}









