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

  //Metodos de Clase
}
