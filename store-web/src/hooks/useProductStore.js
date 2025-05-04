import { useDispatch, useSelector } from 'react-redux'

import { onAddNewProduct, onSetActiveProduct } from '../store'
import { productApi } from '../api'

export const useProductStore = () => {
  // Declaraciones de variables
  const dispatch = useDispatch()
  const { products, activeProduct } = useSelector(state => state.product)

  // Definir mis Métodos...
  const setActiveProduct = product => {
    dispatch(onSetActiveProduct(product))
  }

  const startSavingProduct = async product => {
    // DONE: llegar al backend HTTP

    // Todo sale bien
    if (product._id) {
      // Actualizar la BBDD (Update)
      console.log('Update')
    } else {
      // Crear nuevo producto (Create)
      const { data } = await productApi.post('/products', product)
      dispatch(onAddNewProduct({ ...product, _id: data._id }))
    }
  }

  // Devolución
  return {
    //* Propiedades
    products,
    activeProduct,

    //* Métodos
    setActiveProduct,
    startSavingProduct,
  }
}
