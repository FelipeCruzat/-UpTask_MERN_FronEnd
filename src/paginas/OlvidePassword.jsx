import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()
        if (email === '' || email.lenght < 6) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        try {
            // TODO _ Mover hacia un cliente Axios
            const { data } = await axios.post(`http://localhost:4000/api/usuarios/olvide-password`, { email })
            
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta
    console.log(msg)

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">No pierdas tus password y no pierdas acceso a tus {' '}
                <span className="text-slate-700"> proyectos</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu email"
                        className="w-full mt-3 p-3 border rounder-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Enviar instrucciones"
                    className="bg-sky-800 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between ">
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                > No tienes una cuenta? Inicia Sesión</Link>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? Regístrate</Link>

            </nav>
        </>
    )
}

export default OlvidePassword

