// Selección de Elementos HTML
const node = document.getElementById('miforma');
const p = document.getElementById('llenar');

const observable = Rx.Observable.fromEvent(node, 'keyup')

let mirrorText = ''



const miSuscripcion = observable.subscribe(event => {
    mirrorText += event.key

    if (mirrorText.includes("error")) {
      miSuscripcion.error("Se ingreso Error")
    }
    if (mirrorText.includes("complete")) {
      miSuscripcion.complete()
    }

    p.textContent = mirrorText.split('').reverse().join('')


    setTimeout(() => {
      miSuscripcion.unsubscribe()
      clean()
    }, 30000)


  }, error => {
    clean()
    console.log(error)

  },
  () => {
    clean()
    console.log("se Ingreso Complete")
  })




const clean = () => {
  p.textContent = ""
  node.value = ""
  node.disabled = true
  mirrorText = ""
}