import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import { useForm } from '../../hooks/useForm'

import './LoginPage.css'
import { useAuthStore } from '../../hooks'
import { set } from 'date-fns'

const loginFormValues = {
  email: '',
  password: '',
}

const loginValidations = {
  email: [
    value => value.includes('@') && value.includes('.'),
    'El correo debe tener "@" y un "."',
  ],
  password: [
    value => value.length >= 6, // 1 letra (1 Mayuscula, 1 Minúscula), 1 numero, 1 caracter especial
    'El password debe de tener más de 6 letras',
  ],
}

const registerFormValues = {
  fullName: '',
  email: '',
  password: '',
  passwordRepeat: '',
}

const registerValidations = {
  fullName: [
    value => value.trim().length > 0,
    'El nombre completo no debe estar vacío',
  ],
  email: [
    value => value.includes('@') && value.includes('.'),
    'El correo debe tener "@" y un "."',
  ],
  password: [
    value =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&\-_.])[A-Za-z\d@$!%*#?&\-_.]{6,}$/.test(
        value,
      ),
    'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
  ],
  passwordRepeat: [
    value => value.length >= 6,
    'La repetición de contraseña debe tener al menos 6 caracteres',
    value => value === registerFormValues.password,
    'Las contraseñas no coinciden',
  ],
}

function LoginPage() {
  // Custom Hooks
  const {
    errorMessage,

    startLogin,
    // Done: PRUEBA FINAL, Método Register
    startRegister,
  } = useAuthStore()
  const {
    email: loginEmail,
    password: loginPassword,
    formValues: formLogin,
    onInputChange: onLoginInputChange,

    isFormValid: isLoginFormValid,
    emailValid: emailValid,
    passwordValid: passwordValid,
  } = useForm(loginFormValues, loginValidations)
  const {
    fullName: registerFullName,
    email: registerEmail,
    password: registerPassword,
    passwordRepeat: registerPasswordRepeat,

    isFormValid: isRegisterFormValid,
    fullNameValid: registerFullNameValid,
    emailValid: registerEmailValid,
    passwordValid: registerPasswordValid,
    passwordRepeatValid: registerPasswordRepeatValid,
    formValues: formRegister,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormValues, registerValidations)

  // Estados Locales
  const [loginSubmitted, setLoginSubmitted] = useState(false)
  const [registerSubmitted, setRegisterSubmitted] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const loginSubmit = event => {
    event.preventDefault()
    setLoginSubmitted(true)

    if (!isLoginFormValid) return

    // Thunk HTTP API
    startLogin(formLogin)
  }

  const registerSubmit = event => {
    event.preventDefault()

    setRegisterSubmitted(true)
    //console.log('registerPasswordRepeat', registerPasswordRepeat)
    //console.log('registerPassword', registerPassword)
    if (registerPassword !== registerPasswordRepeat) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
      return
    }
    if (!isRegisterFormValid) return

    setIsRegistering(true)
    try {
        startRegister(formRegister)
        setIsRegistering(false)
    } catch (error) {
      console.error('Error durante el registro:', error)
    } finally {
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={loginEmail}
                onChange={onLoginInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!emailValid && loginSubmitted && (
                <div>
                  <span>{emailValid}</span>
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={loginPassword}
                onChange={onLoginInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!passwordValid && loginSubmitted && (
                <div>
                  <span>{passwordValid}</span>
                </div>
              )}
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className={`btnSubmit ${!isLoginFormValid && loginSubmitted ? 'btn-disabled' : ''}`}
                disabled={!isLoginFormValid && loginSubmitted}>
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="fullName"
                value={registerFullName}
                onChange={onRegisterInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!registerFullNameValid && registerSubmitted && (
                <div>
                  <span>{registerFullNameValid}</span>
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={registerEmail}
                onChange={onRegisterInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!registerEmailValid && registerSubmitted && (
                <div>
                  <span>{registerEmailValid}</span>
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={registerPassword}
                onChange={onRegisterInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!registerPasswordValid && registerSubmitted && (
                <div>
                  <span>{registerPasswordValid}</span>
                </div>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="passwordRepeat"
                value={registerPasswordRepeat}
                onChange={onRegisterInputChange}
                autoComplete="off"
                spellCheck="false"
              />
              {!!registerPasswordRepeatValid && registerSubmitted && (
                <div>
                  <span>{registerPasswordRepeatValid}</span>
                </div>
              )}
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className={`btnSubmit ${(!isRegisterFormValid && registerSubmitted) || isRegistering ? 'btn-disabled' : ''}`}
                disabled={!isRegisterFormValid && registerSubmitted}>
                {isRegistering ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Registrando...
                  </>
                ) : (
                  'Crear cuenta'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
