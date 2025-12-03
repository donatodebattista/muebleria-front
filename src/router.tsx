import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthView from './views/AuthView'
import AuthLayout from './layouts/AuthLayout'
import ClientesView from './views/ClientesView'
import NuevoClienteView from './views/ClienteNuevoView'
import ClienteDetalleView from './views/ClienteDetalleView'
import NotFoundView from './views/NotFoundView'
import AppLayout from './layouts/AppLayout'



export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth' element={<AuthView/>}></Route>
                </Route>

                <Route path='/clientes' element={<AppLayout/>}>
                    <Route index={true} element={<ClientesView/>}></Route>
                    <Route path='nuevo' element={<NuevoClienteView/>}></Route>
                    <Route path=':id' element={<ClienteDetalleView/>}></Route>
                </Route>

                <Route path='/404' element={<AuthLayout/>}>
                    <Route index={true} element={<NotFoundView/>}></Route>
                </Route>     
            </Routes>
        </BrowserRouter>
    )
}