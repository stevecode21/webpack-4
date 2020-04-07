//Gracias a webpack podré invocar mi css dentro de mi JS de esta manera
import '../css/index.css'

// document.body.innerHTML =  '<p>Hola mundo desde Webpack, home</p>'
import text from './text'

text()

if(module.hot){
    module.hot.accept('./text.js', function(){
        console.log('He recargado en caliente')
        text()
    })
}
