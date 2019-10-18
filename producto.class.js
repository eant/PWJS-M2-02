class Producto {
  //Constructor
  constructor(n, s, p, d = true){
    //Atributos
    this.nombre = n
    this.stock = s
    this.precio = p
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
  Mostrar(){
    let color = this.disponible ? "green" : "red"

    document.write(`<p style="color:${color}">Hay <strong>${this.stock}</strong> unid. de <strong>${this.nombre}</strong> que valen <em>ARG${this.precio}</em> c/u</p>`)
  }

  aplicarDescuento(valor){
    let importe = (this.precio * valor) / 100

    this.precio = this.precio - importe
  }

  //Metodos de Clase (estáticos)
  static parse(json){ //<-- Ej: '[{"nombre":"Café Torrado","stock":600,"precio":85.65,"disponible":false},{"nombre":"Jugo de Naranja","stock":450,"precio":15.45,"disponible":true}]'
    //Acá hay que h acer magia para que se conviertan en objetos 'Producto'
    let datos = JSON.parse(json) //<-- de JSON a Object

    console.log("Estos son los datos:")
    console.log(datos)

    if( datos instanceof Array ){

      //1) Crear un Array nuevo para guardar los objetos Producto
      let productos = new Array()

      //2) Recorrer el Array de Object para instanciar objetos Producto
      datos.forEach(item => {
        
        //3) Instanciar un objeto Producto con los datos de cada Object
        let producto = new Producto(item.nombre, item.stock, item.precio, item.disponible)
        
        //4) Guardar el objeto Producto instanciado en el Array nuevo
        productos.push(producto)
        
      })
      //5) Retornar el Array nuevo una vez que se hayan instanciado todos los objetos Producto
      return productos

    } else if( datos instanceof Object ){

      let producto = new Producto(datos.nombre, datos.stock, datos.precio, datos.disponible)
      return producto

    } else {
      console.error("Ya fue... no convierto nada en Producto")
    }

  }
}









