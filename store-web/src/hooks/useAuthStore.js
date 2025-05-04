import { useDispatch, useSelector } from 'react-redux'
import { clearErrorMessage, onChecking, onLogin, onLogout} from '../store'
import { productApi } from '../api'

export const useAuthStore = () => {
  // DONE: Uso de nuestro Store
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // DONE: Métodos para login
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await productApi.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      localStorage.setItem('user', JSON.stringify(data))

      dispatch(
        onLogin({ fullName: data.fullName, rol: data.rol, email: data.email }),
      )
    } catch (error) {
      console.error(error)
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 500)
    }
  }

  // DONE: PRUEBA FINAL, Métodos para register
  const startRegister = async ({ fullName, email, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await productApi.post('/auth/register', {
        fullName,
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      localStorage.setItem('user', JSON.stringify(data))
      
      dispatch(
        onRegisterSuccess({ fullName: data.fullName, rol: data.rol, email: data.email }),
      )
      dispatch(onLogin({ fullName: data.fullName, rol: data.rol, email: data.email }))
      return { ok: true }
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'Error al registrar usuario'
      dispatch(onLogout(message))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 1500)
      return { ok: false, msg: message }
    }
  }
  /*const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await productApi.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }*/
  const checkAuthToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    const tokenInitDate = localStorage.getItem('token-init-date')
    const diffTime = new Date().getTime() - tokenInitDate
    const diffMinutes = diffTime / (1000 * 60)
    if (diffMinutes >= 60) {
      localStorage.clear()
      dispatch(onLogout())
    } else {
      const localUser = JSON.parse(localStorage.getItem('user'))
      dispatch(onLogin(localUser))
    }
  }

  // DONE: Logout
  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  return {
    // DONE: Propiedades
    status,
    user,
    errorMessage,

    // DONE: Métodos
    startLogin,
    startLogout,
    checkAuthToken,
    startRegister,
    // TODO: PRUEBA FINAL, Método Register
  }
}
