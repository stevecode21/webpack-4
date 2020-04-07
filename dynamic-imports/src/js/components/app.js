import React, { useState } from 'react'
import data from './data.json'
import Loader from './loader'
import logo from '../../images/platzi.png'
import video from '../../video/conversation.mp4'

import'../../sass/sass.scss'
import'../../less/less.less'
import'../../stylus/stylus.styl'

console.log(data)
function App(){
    const [loaderList, setLoaderList] = useState([])
    async function handleClick(){
        setLoaderList(data.loaders)
       const {alerta} = await import('./alert.js')
       alerta('omg, este modulo ha cargado dinamicamente')
    }
    return(
        <div>
            
            <p className="sass">
                Esto es sass
            </p>
            <p className="less">
                Esto es Less
            </p>
            
            <p className="stylus">
                Esto es Stylus
            </p>
            <p className="post-css">
                Esto es Postcss
            </p>
            
            Qué linda aplicación hecha en ReactJS!
            <video src={video} width={360} controls poster={logo}></video>
            <p>
                <img src={logo} alt="" width={40}/>
            </p>
            <ul>
                {
                    loaderList.map(item=><Loader {...item} key={item.id}/>)
                }
            </ul>
            <button onClick={handleClick}>Mostrar lo aprendido hasta el momento</button>

        </div>
    )
}

export default App