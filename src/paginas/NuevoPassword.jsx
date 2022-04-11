import { useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {

    const [tokenValido,setTokenValido]= useState(false)
    const [alerta,setAlerta]= useState({})
    const params = useParams()
    const {token} = params

    console.log(params)
    useEffect(()=> {
        const comprobarToken = async () => {
            try {
                // TODO: Mover hacia un lcientes Axios
                const {data } = await axios(`htttp://localhost:4000/api/usuarios/olvide-password/${token}`)
                console.log(data)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    },[])

    const {msg} = alerta
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y no pierdas acceso a tus {' '}
        <span className="text-slate-700"> proyectos</span>
    </h1>

    {msg && <Alerta alerta={alerta}/> }
    { tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg p-10">
        
        

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
            >Nuevo Password
            </label>
            <input
                id="password"
                type="password"
                placeholder="Escribe tu nuevo Password"
                className="w-full mt-3 p-3 border rounder-xl bg-gray-50"
            />
        </div>

        

        <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-800 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />

    </form>

    )}
</>
  )
}

export default NuevoPassword
