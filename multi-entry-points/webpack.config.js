//Llamamos el modulo path que viene nativamente desde node
const path = require('path')

//Exportaremos el archivo de configuración, exportandolo como un objeto
//También exportaremos el entry y el output de nuestra aplicación
//Path permitirá manipular o enlazar rutas, el modulo se encargará de interpretarlas
//Resolve me devolverá una ruta absoluta de mi sistema operativo
//__dirname me setea el entorno en donde estoy corriendo el comando, es decir la ruta en donde "estamos parados"
//filename será el nombre de salida de mi archivo
//Dentro de la comunidad de javascript acostumbran a poner los output de webpack (los compilados) por lo general la nombran "dist"
module.exports = {
    entry: {
        home: path.resolve(__dirname, 'src/js/index.js'),
        prices: path.resolve(__dirname, 'src/js/prices.js'),
        contact: path.resolve(__dirname, 'src/js/contact.js')
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    }
}