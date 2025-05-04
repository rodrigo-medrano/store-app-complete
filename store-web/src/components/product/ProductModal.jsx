import { useState, useMemo } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { es } from 'date-fns/locale'
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm, useUiStore, useProductStore } from '../../hooks'
import { addDays, differenceInSeconds, subDays } from 'date-fns'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const today = new Date()

const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()

const productFormValues = {
  name: '',
  product_date: today,
  expiration_date: addDays(new Date(year, month, day), 30),
  stock: 100,
  price: '',
}

const productValidations = {
  name: [value => value.length > 2, 'Debe ingresar producto valido'],
  stock: [
    [value => +value, 'Debe ingresar número'],
    [value => +value > 29, 'Debe ingresar mínimo 30 unidades'],
  ],
  price: [value => +value > 0, 'Debe ingresar precio'],
}

export const ProductModal = () => {
  // Custom Hooks
  const { isProductModalOpen, closeProductModal } = useUiStore()
  const { startSavingProduct } = useProductStore()
  const {
    name,
    product_date,
    expiration_date,
    stock,
    price,
    formValues,
    onInputChange,
    onResetForm,

    isFormValid,
    nameValid,
    stockValid,
    priceValid,
  } = useForm(productFormValues, productValidations)

  // Estados locales
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [tags, setTags] = useState([])

  // Funciones que devuelven un class CSS
  const nameClass = useMemo(() => {
    if (!formSubmitted) return ''

    return !nameValid ? '' : 'is-invalid'
  }, [formSubmitted, nameValid])

  const stockClass = useMemo(() => {
    if (!formSubmitted) return ''

    return !stockValid ? '' : 'is-invalid'
  }, [formSubmitted, stockValid])

  const priceClass = useMemo(() => {
    if (!formSubmitted) return ''

    return !priceValid ? '' : 'is-invalid'
  }, [formSubmitted, priceValid])

  // Función para el cambio de los DatePicker
  const onDateChange = (value, changing) => {
    onInputChange({ target: { name: changing, value } })
  }

  // Cierra el modal y resetea el formulario
  const onCloseModal = () => {
    closeProductModal()
    onResetForm()
    setFormSubmitted(false)
    setTags([])
  }

  // Ejecuta el evento submit
  const onSubmit = async event => {
    event.preventDefault() // Evita el Full refresh
    setFormSubmitted(true) // Cuando hacemos click la primera vez en el boton de 'guardar'

    const difference = differenceInSeconds(expiration_date, product_date)

    // DONE: Validaciones de fecha
    if (isNaN(difference) || difference < 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    // DONE: Si el form es invalid no dejar pasar
    if (!isFormValid) {
      Swal.fire(
        'Formulario Inválido',
        'Revisa los campos del formulario',
        'error',
      )
      return
    }

    // DONE: Armar nuesta data
    const data = { ...formValues, tags: tags.map(({ text }) => text) }
    console.log(data)
    // DONE: Enviar esta data por HTTP
    await startSavingProduct(data)
    // DONE: Cerrar el modal, resetear estados por defecto
    onCloseModal()

    // <--- Revisar: date picker --->
    // minTime={new Date().setHours(0, 0, 0)}
    // maxTime={new Date().setHours()}
  }

  /* Manejo de ReactTags */
  const handleDelete = index => {
    setTags(tags.filter((_, i) => i !== index))
  }
  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags]
    updatedTags.splice(index, 1, newTag)
    setTags(updatedTags)
  }
  const handleAddition = tag => {
    setTags(prevTags => {
      return [...prevTags, tag]
    })
  }
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
  }
  const onClearAll = () => {
    setTags([])
  }
  /* FIN Manejo de ReactTags */

  return (
    <Modal
      isOpen={isProductModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}>
      <h1>Nuevo Producto</h1>
      <hr />

      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha de compra</label>
          <DatePicker
            minDate={subDays(new Date(), 10)}
            maxDate={new Date()}
            selected={product_date}
            className="form-control"
            onChange={value => onDateChange(value, 'product_date')}
            locale="es"
            timeCaption="Hora"
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha de expiración</label>
          <DatePicker
            minDate={addDays(new Date(), 10)}
            selected={expiration_date}
            className="form-control"
            onChange={value => onDateChange(value, 'expiration_date')}
            locale="es"
            dateFormat="P"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Producto</label>
          <input
            type="text"
            className={`form-control ${nameClass}`}
            placeholder="Nombre del producto"
            name="name"
            autoComplete="off"
            value={name}
            onChange={onInputChange}
          />
          {nameValid && formSubmitted && (
            <small className="invalid-feedback">{nameValid}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Stock</label>
          <input
            type="text"
            className={`form-control ${stockClass}`}
            placeholder="Unidades disponibles"
            name="stock"
            autoComplete="off"
            value={stock}
            onChange={onInputChange}
          />
          {stockValid?.length > 0 &&
            formSubmitted &&
            stockValid.map(msgError => (
              <div key={msgError} className="invalid-feedback">
                <span>{msgError}</span>
              </div>
            ))}
        </div>

        <div className="form-group mb-2">
          <label>Precio</label>
          <input
            type="text"
            className={`form-control ${priceClass}`}
            placeholder="Bs.-"
            name="price"
            value={price}
            onChange={onInputChange}
          />
          {priceValid && formSubmitted && (
            <small className="invalid-feedback">{priceValid}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Características</label>
          <ReactTags
            tags={tags}
            separators={[SEPARATORS.ENTER, SEPARATORS.TAB, SEPARATORS.COMMA]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            onTagUpdate={onTagUpdate}
            inputFieldPosition="inline"
            inline
            editable
            clearAll
            onClearAll={onClearAll}
            maxTags={7}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
